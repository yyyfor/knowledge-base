import fs from "fs";
import path from "path";

const repoRoot = path.resolve("/Users/ming/Documents/github/knowledge-base");
const contentRoot = path.join(repoRoot, "finance", "investment-banking");
const outputRoot = path.join(repoRoot, "docs");
const staticRoot = path.join(repoRoot, "site");

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }
  return files;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function cleanDir(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
  ensureDir(dir);
}

function stripFrontmatter(content) {
  if (!content.startsWith("---\n")) return content;
  const end = content.indexOf("\n---\n", 4);
  if (end === -1) return content;
  return content.slice(end + 5);
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function slugSegments(relPath) {
  return relPath.split(path.sep).map((segment) => encodeURIComponent(segment));
}

function outputHtmlPath(note) {
  return path.join(outputRoot, ...note.relDirSegments, `${note.baseName}.html`);
}

function outputHref(note) {
  return `/${slugSegments(path.relative(repoRoot, outputHtmlPath(note))).join("/")}`;
}

function relativeHref(fromFile, toFile) {
  const rel = path.relative(path.dirname(fromFile), toFile).split(path.sep).join("/");
  return encodeURI(rel);
}

function inlineFormat(text, note, notesByTitle) {
  let html = escapeHtml(text);
  html = html.replace(/\[\[([^\]]+)\]\]/g, (_, rawTarget) => {
    const target = notesByTitle.get(rawTarget.trim());
    if (!target) {
      return `<span class="broken-link">${escapeHtml(rawTarget.trim())}</span>`;
    }
    return `<a href="${relativeHref(outputHtmlPath(note), outputHtmlPath(target))}">${escapeHtml(rawTarget.trim())}</a>`;
  });
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  return html;
}

function renderMarkdown(note, notesByTitle, backlinksByTitle) {
  const lines = stripFrontmatter(note.content).replace(/\r\n/g, "\n").split("\n");
  const html = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i += 1;
      continue;
    }

    if (/^#{1,6}\s/.test(trimmed)) {
      const level = trimmed.match(/^#+/)[0].length;
      const text = trimmed.slice(level).trim();
      html.push(`<h${level}>${inlineFormat(text, note, notesByTitle)}</h${level}>`);
      i += 1;
      continue;
    }

    if (trimmed === "---" || trimmed === "***") {
      html.push("<hr />");
      i += 1;
      continue;
    }

    if (/^\|.+\|$/.test(trimmed)) {
      const rows = [];
      while (i < lines.length && /^\|.+\|$/.test(lines[i].trim())) {
        rows.push(lines[i].trim());
        i += 1;
      }
      const parsedRows = rows
        .filter((row, index) => !(index === 1 && /^\|[\s:-|]+\|$/.test(row)))
        .map((row) => row.slice(1, -1).split("|").map((cell) => cell.trim()));

      const [head, ...body] = parsedRows;
      html.push("<table>");
      html.push("<thead><tr>");
      for (const cell of head) {
        html.push(`<th>${inlineFormat(cell, note, notesByTitle)}</th>`);
      }
      html.push("</tr></thead>");
      if (body.length) {
        html.push("<tbody>");
        for (const row of body) {
          html.push("<tr>");
          for (const cell of row) {
            html.push(`<td>${inlineFormat(cell, note, notesByTitle)}</td>`);
          }
          html.push("</tr>");
        }
        html.push("</tbody>");
      }
      html.push("</table>");
      continue;
    }

    if (/^- /.test(trimmed)) {
      html.push("<ul>");
      while (i < lines.length && /^- /.test(lines[i].trim())) {
        const item = lines[i].trim().slice(2).trim();
        html.push(`<li>${inlineFormat(item, note, notesByTitle)}</li>`);
        i += 1;
      }
      html.push("</ul>");
      continue;
    }

    const paragraph = [];
    while (i < lines.length) {
      const current = lines[i];
      const currentTrimmed = current.trim();
      if (
        !currentTrimmed ||
        /^#{1,6}\s/.test(currentTrimmed) ||
        currentTrimmed === "---" ||
        currentTrimmed === "***" ||
        /^\|.+\|$/.test(currentTrimmed) ||
        /^- /.test(currentTrimmed)
      ) {
        break;
      }
      paragraph.push(currentTrimmed);
      i += 1;
    }

    const paragraphHtml = paragraph
      .join("<br />")
      .replace(/  <br \/>/g, "<br />")
      .replace(/  /g, "&nbsp;&nbsp;");
    html.push(`<p>${inlineFormat(paragraphHtml, note, notesByTitle)}</p>`);
  }

  const backlinks = backlinksByTitle.get(note.title) || [];
  const backlinksHtml =
    backlinks.length === 0
      ? "<p class=\"muted\">No backlinks yet.</p>"
      : `<ul>${backlinks
          .map((source) => `<li><a href="${relativeHref(outputHtmlPath(note), outputHtmlPath(source))}">${escapeHtml(source.title)}</a></li>`)
          .join("")}</ul>`;

  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(note.title)}</title>
    <link rel="stylesheet" href="${relativeHref(outputHtmlPath(note), path.join(outputRoot, "assets", "styles.css"))}" />
  </head>
  <body>
    <div class="layout">
      <aside class="sidebar">
        <div class="sidebar-block">
          <div class="eyebrow">Knowledge Base</div>
          <a class="home-link" href="${relativeHref(outputHtmlPath(note), path.join(outputRoot, "index.html"))}">Investment Banking</a>
        </div>
        <div class="sidebar-block">
          <div class="sidebar-title">Current Note</div>
          <div class="sidebar-note">${escapeHtml(note.title)}</div>
        </div>
        <div class="sidebar-block">
          <div class="sidebar-title">Backlinks</div>
          ${backlinksHtml}
        </div>
      </aside>
      <main class="content">
        ${html.join("\n")}
      </main>
    </div>
  </body>
</html>`;
}

function buildIndex(notes) {
  const rootNote = notes.find((note) => note.title === "Investment Banking Knowledge Map");
  const grouped = new Map();
  for (const note of notes) {
    const group = note.relDirSegments[0] || "root";
    if (!grouped.has(group)) grouped.set(group, []);
    grouped.get(group).push(note);
  }

  const sections = Array.from(grouped.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([group, groupNotes]) => {
      const items = groupNotes
        .sort((a, b) => a.title.localeCompare(b.title))
        .map((note) => `<li><a href="${relativeHref(path.join(outputRoot, "index.html"), outputHtmlPath(note))}">${escapeHtml(note.title)}</a></li>`)
        .join("");
      return `<section class="card"><h2>${escapeHtml(group)}</h2><ul>${items}</ul></section>`;
    })
    .join("\n");

  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Investment Banking Knowledge Base</title>
    <link rel="stylesheet" href="assets/styles.css" />
  </head>
  <body>
    <main class="landing">
      <div class="hero">
        <div class="eyebrow">GitHub Pages Preview</div>
        <h1>Investment Banking Knowledge Base</h1>
        <p>远端预览站点，按 Obsidian 笔记结构生成，支持基础双链跳转与反向链接浏览。</p>
        <a class="primary-link" href="${rootNote ? relativeHref(path.join(outputRoot, "index.html"), outputHtmlPath(rootNote)) : "#"}">Open Knowledge Map</a>
      </div>
      <div class="grid">
        ${sections}
      </div>
    </main>
  </body>
</html>`;
}

const markdownFiles = walk(contentRoot);
const notes = markdownFiles.map((file) => {
  const relPath = path.relative(contentRoot, file);
  const relDir = path.dirname(relPath) === "." ? "" : path.dirname(relPath);
  const baseName = path.basename(file, ".md");
  return {
    file,
    content: fs.readFileSync(file, "utf8"),
    title: baseName,
    baseName,
    relDirSegments: relDir ? relDir.split(path.sep) : [],
  };
});

const notesByTitle = new Map(notes.map((note) => [note.title, note]));
const backlinksByTitle = new Map(notes.map((note) => [note.title, []]));

for (const note of notes) {
  const matches = [...note.content.matchAll(/\[\[([^\]]+)\]\]/g)];
  for (const match of matches) {
    const target = notesByTitle.get(match[1].trim());
    if (target) {
      backlinksByTitle.get(target.title).push(note);
    }
  }
}

cleanDir(outputRoot);
ensureDir(path.join(outputRoot, "assets"));
fs.copyFileSync(path.join(staticRoot, "styles.css"), path.join(outputRoot, "assets", "styles.css"));
fs.writeFileSync(path.join(outputRoot, ".nojekyll"), "");

for (const note of notes) {
  const filePath = outputHtmlPath(note);
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, renderMarkdown(note, notesByTitle, backlinksByTitle));
}

fs.writeFileSync(path.join(outputRoot, "index.html"), buildIndex(notes));

