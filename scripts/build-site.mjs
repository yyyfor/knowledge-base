import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");
const contentRoot = path.join(repoRoot, "knowledge-domains");
const outputRoot = path.join(repoRoot, "docs");
const staticRoot = path.join(repoRoot, "site");
const miniappKnowledgePath = "/Users/ming/Documents/github/office-ratio-miniapp/miniprogram/data/knowledge-content.generated.js";
let miniappKnowledgeContent = {};
try {
  miniappKnowledgeContent = require(miniappKnowledgePath);
} catch (error) {
  miniappKnowledgeContent = {};
}

const miniappDomainMap = {
  "investment-banking": "investment-banking",
  "system-design": "system-design",
  "coding-interview-playbook": "coding-interview",
  "quant-programmer-roadmap": "quant-programmer",
  "investing-and-asset-allocation": "investing-allocation",
  "google-generative-ai-leader-certification": "genai-leader"
};

const domainProfiles = {
  "investment-banking": {
    label: "Investment Banking",
    workflow: "定价、风险、估值和交易技术",
    scenario: "适用于衍生品定价、风险计量、估值调整和交易平台场景。",
    pitfall: "常见误区是只背公式或术语，不说明它在交易、风险或平台链路里的实际作用。",
    interview: "回答时先讲业务语境，再讲模型、数据、系统和风险控制如何串起来。"
  },
  "system-design": {
    label: "System Design",
    workflow: "需求澄清、架构拆分、容量规划和稳定性治理",
    scenario: "适用于需要拆组件、扩容量、降延迟或提可靠性的系统设计场景。",
    pitfall: "常见误区是只堆组件名，却没有说明请求链路、数据流和 trade-off。",
    interview: "回答时先澄清约束，再讲主链路、瓶颈、可靠性和演进路径。"
  },
  "coding-interview-playbook": {
    label: "Coding Interview",
    workflow: "题目澄清、问题建模、求解优化和 follow-up 沟通",
    scenario: "适用于 LeetCode、白板题、现场 coding 和需要一边建模一边表达的编码面试场景。",
    pitfall: "常见误区是一上来写代码，没有先澄清约束、建立模型和讲复杂度。",
    interview: "回答时先澄清约束，再讲建模、brute force、优化、复杂度和 edge case。"
  },
  "quant-programmer-roadmap": {
    label: "Quant Programmer",
    workflow: "研究、回测、生产化和性能优化",
    scenario: "适用于量化研究、数据处理、风险分析和性能优化相关场景。",
    pitfall: "常见误区是只谈数学或只谈代码，没有把数据质量、实验设计和工程落地放在一起。",
    interview: "回答时先讲问题背景，再讲数据链路、算法直觉、复杂度和工程实现。"
  },
  "investing-and-asset-allocation": {
    label: "Investing and Asset Allocation",
    workflow: "长期目标设定、组合配置、再平衡和行为纪律",
    scenario: "适用于长期投资、资产配置、风险管理和行为纪律相关场景。",
    pitfall: "常见误区是把投资简化成择时或选股，忽略目标、风险承受力、成本和纪律。",
    interview: "回答时先讲目标和约束，再讲配置逻辑、风险控制和长期执行。"
  },
  "google-generative-ai-leader-certification": {
    label: "Google GenAI Leader",
    workflow: "业务落地、模型选择、检索增强、工具编排和治理",
    scenario: "适用于企业知识问答、检索增强生成、AI agent 和办公提效相关场景。",
    pitfall: "常见误区是只谈模型能力，不说明数据来源、权限、安全、延迟和成本。",
    interview: "回答时先讲业务价值，再讲模型、检索、工具和治理各自负责什么。"
  }
};

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
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function normalizeText(text) {
  return String(text || "")
    .replace(/\r\n/g, "\n")
    .replace(/\[\[([^\]]+)\]\]/g, "$1")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeKey(text) {
  return normalizeText(text)
    .toLowerCase()
    .replace(/[“”"'‘’`]/g, "")
    .replace(/[。！？!?.,，；;:：()\[\]{}<>/\\\-_]/g, "")
    .trim();
}

function dedupeTextList(items, limit) {
  const result = [];
  const seen = new Set();
  for (const item of items || []) {
    const text = normalizeText(item);
    const key = normalizeKey(text);
    if (!text || !key || seen.has(key)) {
      continue;
    }
    seen.add(key);
    result.push(text);
    if (limit && result.length >= limit) {
      break;
    }
  }
  return result;
}

function splitSentences(text) {
  return normalizeText(text)
    .split(/[。！？!?；;\n]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function pickSentences(text, keywords, limit) {
  const sentences = splitSentences(text);
  const picked = [];
  for (const sentence of sentences) {
    if (keywords.some((keyword) => sentence.includes(keyword))) {
      picked.push(sentence);
    }
    if (picked.length >= limit) {
      break;
    }
  }
  return picked;
}

function ensureMinimumItems(items, minimum, fallbacks) {
  const result = dedupeTextList(items);
  for (const fallback of fallbacks || []) {
    if (result.length >= minimum) {
      break;
    }
    const text = normalizeText(fallback);
    if (text && !result.includes(text)) {
      result.push(text);
    }
  }
  return dedupeTextList(result).slice(0, Math.max(minimum, result.length));
}

function extractWikiTitles(content) {
  const matches = [...String(content || "").matchAll(/\[\[([^\]]+)\]\]/g)];
  return dedupeTextList(matches.map((match) => match[1].trim()), 12);
}

function slugSegments(relPath) {
  return relPath.split(path.sep).map((segment) => encodeURIComponent(segment));
}

function outputHtmlPath(note) {
  return path.join(outputRoot, ...note.relDirSegments, `${note.baseName}.html`);
}

function relativeHref(fromFile, toFile) {
  const rel = path.relative(path.dirname(fromFile), toFile).split(path.sep).join("/");
  return encodeURI(rel);
}

function groupKey(note) {
  return note.relDirSegments[0] || "root";
}

function groupLabel(note) {
  const key = groupKey(note);
  return domainProfiles[key]?.label || key;
}

function folderLabel(note) {
  return note.relDirSegments.slice(1).join(" / ") || "Root";
}

function outputHref(note) {
  return `/${slugSegments(path.relative(repoRoot, outputHtmlPath(note))).join("/")}`;
}

function noteHrefFromTitle(currentNote, targetTitle, notesByTitle) {
  const target = notesByTitle.get(targetTitle);
  if (!target) {
    return "";
  }
  return relativeHref(outputHtmlPath(currentNote), outputHtmlPath(target));
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

function renderMarkdownBody(note, notesByTitle) {
  const lines = stripFrontmatter(note.content).replace(/\r\n/g, "\n").split("\n");
  const html = [];
  let i = 0;

  while (i < lines.length) {
    const trimmed = lines[i].trim();

    if (!trimmed) {
      i += 1;
      continue;
    }

    if (/^```/.test(trimmed)) {
      const language = trimmed.slice(3).trim();
      const codeLines = [];
      i += 1;
      while (i < lines.length && !/^```/.test(lines[i].trim())) {
        codeLines.push(lines[i]);
        i += 1;
      }
      if (i < lines.length && /^```/.test(lines[i].trim())) {
        i += 1;
      }
      const languageLabel = language ? `<div class="detail-raw-code-language">${escapeHtml(language)}</div>` : "";
      html.push(
        `<div class="detail-raw-code">${languageLabel}<pre class="detail-code-block"><code>${escapeHtml(codeLines.join("\n"))}</code></pre></div>`
      );
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
      const currentTrimmed = lines[i].trim();
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

    html.push(`<p>${inlineFormat(paragraph.join("<br />"), note, notesByTitle)}</p>`);
  }

  return html.join("\n");
}

function isStandaloneLabel(line) {
  const trimmed = line.trim();
  if (!trimmed) return false;
  if (trimmed.startsWith("#")) return false;
  if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) return false;
  if (!(trimmed.endsWith("：") || trimmed.endsWith(":"))) return false;
  return trimmed.length <= 48;
}

function stripLabel(line) {
  return normalizeText(line.replace(/[：:]$/, ""));
}

function parseStructuredNote(note, notesByTitle) {
  const content = stripFrontmatter(note.content).replace(/\r\n/g, "\n");
  const lines = content.split("\n");
  const blocks = [];
  let currentLabel = "";
  let buffer = [];

  const flushText = () => {
    const joined = normalizeText(buffer.join(" "));
    if (joined) {
      blocks.push({ type: "text", label: currentLabel, text: joined });
    }
    buffer = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushText();
      continue;
    }
    if (/^#{1,6}\s+/.test(trimmed)) {
      flushText();
      currentLabel = "";
      continue;
    }
    if (isStandaloneLabel(trimmed)) {
      flushText();
      currentLabel = stripLabel(trimmed);
      continue;
    }
    if (/^[-*]\s+/.test(trimmed)) {
      flushText();
      blocks.push({ type: "bullet", label: currentLabel, text: normalizeText(trimmed.replace(/^[-*]\s+/, "")) });
      continue;
    }
    buffer.push(trimmed);
  }
  flushText();

  const paragraphs = blocks.filter((block) => block.type === "text");
  const bullets = blocks.filter((block) => block.type === "bullet");
  const summary = paragraphs[0]?.text || note.title;
  const body = dedupeTextList(paragraphs.slice(1, 4).map((block) => block.text), 3);
  const relatedLabelPattern = /^(相关|补充|继续看|从哪里继续看|从这里继续看|from where to continue|backlinks)$/i;
  const points = [];
  const related = [];

  for (const bullet of bullets) {
    if (relatedLabelPattern.test(bullet.label)) {
      related.push(...extractWikiTitles(bullet.text));
      continue;
    }
    points.push(bullet.text);
    related.push(...extractWikiTitles(bullet.text));
  }

  const explicitLinks = extractWikiTitles(content);
  const profile = domainProfiles[groupKey(note)] || domainProfiles["system-design"];
  const combined = [summary, ...body, ...points].join("。");
  const useCases = ensureMinimumItems(
    pickSentences(combined, ["适合", "用于", "场景", "常见", "通常", "如果", "当", "需要"], 2),
    2,
    [
      profile.scenario,
      `如果题目涉及 ${note.title}，最好同时说明它在 ${profile.workflow} 里的位置和上下游关系。`
    ]
  );
  const pitfalls = ensureMinimumItems(
    pickSentences(combined, ["不要", "不是", "避免", "误区", "风险", "难点", "容易", "注意"], 2),
    2,
    [
      profile.pitfall,
      `另一个误区是只会定义 ${note.title}，却不说明它为什么重要、何时适用以及代价是什么。`
    ]
  );

  const primaryLinks = dedupeTextList([...related, ...explicitLinks].filter((title) => title !== note.title), 12);
  const supplemental = ensureMinimumItems(
    pickSentences(combined, ["局限", "区别", "trade-off", "如果", "为什么", "代价", "影响"], 2),
    2,
    [
      `延伸思路：把 ${note.title} 和 ${(primaryLinks.slice(0, 2).join("、") || folderLabel(note))} 的边界说清楚，通常比重复定义更有价值。`,
      `继续深挖时，优先补它的输入、输出、适用边界和代价，这些往往才是面试官真正会追问的部分。`
    ]
  );
  const interview = groupKey(note) === "system-design"
    ? [
        `面试官在听：你是否知道 ${note.title} 解决哪类系统约束，而不是只会背定义。`,
        "候选人开场：先复述业务目标和约束，不要直接堆组件。",
        `展开顺序：需求/约束 -> 请求链路或数据流 -> 关键瓶颈 -> trade-off -> 监控与演进。`,
        `追问准备：优先准备流量规模、数据规模、一致性要求、失败处理，以及它和相邻模式的边界。`,
        "高分信号：答案里既有架构选择，也有观测指标和故障处理。"
      ]
    : [
        `面试官在听：你是否理解 ${note.title} 解决什么问题、何时适用、代价是什么。`,
        `候选人开场：先用一句话定义 ${note.title}，再说明它在 ${profile.workflow} 里的位置。`,
        "展开顺序：定义 -> 真实场景 -> 输入输出或关键机制 -> 限制和取舍。",
        `追问准备：准备说明它和相邻主题的边界，以及条件变化时你的判断会不会变。`,
        "高分信号：答案不只停在概念层，而是能顺着一个真实流程讲到落地。"
      ];

  return {
    summary,
    body: body.length ? body : [summary],
    points: dedupeTextList(points, 6),
    related: primaryLinks,
    useCases,
    pitfalls,
    supplemental,
    interview
  };
}

function resolveNoteDetails(note, notesByTitle) {
  const parsed = parseStructuredNote(note, notesByTitle);
  const miniappDomainId = miniappDomainMap[groupKey(note)];
  const sectionTitle = noteSectionLookup.get(`${groupKey(note)}::${note.title}`);
  const generated = miniappKnowledgeContent?.[miniappDomainId]?.[sectionTitle]?.[note.title];

  if (!generated) {
    return Object.assign({ solutions: [] }, parsed);
  }

  return {
    summary: generated.summary || parsed.summary,
    body: Array.isArray(generated.body) && generated.body.length ? dedupeTextList(generated.body, 6) : parsed.body,
    points: Array.isArray(generated.points) && generated.points.length ? dedupeTextList(generated.points, 12) : parsed.points,
    related: Array.isArray(generated.related) && generated.related.length ? dedupeTextList(generated.related, 12) : parsed.related,
    useCases: Array.isArray(generated.useCases) && generated.useCases.length ? dedupeTextList(generated.useCases, 6) : parsed.useCases,
    pitfalls: Array.isArray(generated.pitfalls) && generated.pitfalls.length ? dedupeTextList(generated.pitfalls, 6) : parsed.pitfalls,
    supplemental: Array.isArray(generated.supplemental) && generated.supplemental.length ? dedupeTextList(generated.supplemental, 6) : parsed.supplemental,
    interview: Array.isArray(generated.interview) && generated.interview.length ? dedupeTextList(generated.interview, 12) : parsed.interview,
    solutions: Array.isArray(generated.solutions) ? generated.solutions : []
  };
}

function renderSolutions(note, details) {
  if (!details.solutions || !details.solutions.length) {
    return "";
  }

  return `
        <section class="detail-section detail-section-code">
          <h2>经典解法（Kotlin）</h2>
          <div class="detail-solution-list">
            ${details.solutions.map((solution) => `
            <article class="detail-solution-card">
              <div class="detail-solution-head">
                <h3>${escapeHtml(solution.title || "Solution")}</h3>
                <span class="detail-solution-language">${escapeHtml(solution.language || "Kotlin")}</span>
              </div>
              ${solution.strategy ? `<p class="detail-solution-text">${escapeHtml(solution.strategy)}</p>` : ""}
              ${solution.complexity ? `<p class="detail-solution-meta">${escapeHtml(solution.complexity)}</p>` : ""}
              <pre class="detail-code-block"><code>${escapeHtml(solution.code || "")}</code></pre>
            </article>`).join("")}
          </div>
        </section>`;
}

function renderLinkedChips(items, note, notesByTitle, emptyText) {
  if (!items.length) {
    return `<p class="muted">${escapeHtml(emptyText)}</p>`;
  }
  return `<div class="detail-chip-row">${items
    .map((title) => {
      const href = noteHrefFromTitle(note, title, notesByTitle);
      return href
        ? `<a class="detail-chip detail-chip-link" href="${href}">${escapeHtml(title)}</a>`
        : `<span class="detail-chip">${escapeHtml(title)}</span>`;
    })
    .join("")}</div>`;
}

function parseDirectorySections(note) {
  const sections = [];
  let currentSection = null;
  const lines = stripFrontmatter(note.content).replace(/\r\n/g, "\n").split("\n");

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      continue;
    }

    const headingMatch = line.match(/^##\s+(.+)$/);
    if (headingMatch) {
      currentSection = {
        title: normalizeText(headingMatch[1]),
        noteTitles: []
      };
      sections.push(currentSection);
      continue;
    }

    const noteMatch = line.match(/^-\s+\[\[([^\]]+)\]\]$/);
    if (noteMatch) {
      if (!currentSection) {
        currentSection = {
          title: "Overview",
          noteTitles: []
        };
        sections.push(currentSection);
      }
      currentSection.noteTitles.push(normalizeText(noteMatch[1]));
    }
  }

  return sections.filter((section) => section.noteTitles.length);
}

function buildDirectoryOrder(notesByTitle) {
  const order = new Map();
  const rootMap = notesByTitle.get("Knowledge Base Map");
  if (rootMap) {
    order.set("root", parseDirectorySections(rootMap));
  }

  for (const note of notesByTitle.values()) {
    if (!note.title.endsWith("Knowledge Map") || note.title === "Knowledge Base Map") {
      continue;
    }
    order.set(groupKey(note), parseDirectorySections(note));
  }

  return order;
}

function buildDirectoryGroups(note, notesByTitle) {
  const currentGroup = groupKey(note);
  const sections = directoryOrder.get(currentGroup);
  if (sections && sections.length) {
    if (currentGroup === "root") {
      return sections
        .map((section) => ({
          title: section.title,
          items: section.noteTitles
            .map((title) => notesByTitle.get(title))
            .filter(Boolean)
        }))
        .filter((section) => section.items.length);
    }

    return sections
      .map((section) => ({
        title: section.title,
        items: section.noteTitles
          .map((title) => notesByTitle.get(title))
          .filter((candidate) => candidate && groupKey(candidate) === currentGroup)
      }))
      .filter((section) => section.items.length);
  }

  const notes = [...notesByTitle.values()].filter((candidate) => groupKey(candidate) === currentGroup);
  if (!notes.length) {
    return [];
  }

  return [{
    title: currentGroup === "root" ? "Overview" : `${groupLabel(note)} Overview`,
    items: notes.sort((a, b) => a.title.localeCompare(b.title, "en"))
  }];
}

function renderSidebarDirectory(note, notesByTitle) {
  const groups = buildDirectoryGroups(note, notesByTitle);

  if (!groups.length) {
    return `<p class="muted">No directory items yet.</p>`;
  }

  return `<div class="sidebar-directory">${groups
    .map((group) => {
      const links = group.items
        .map((item) => {
          const href = relativeHref(outputHtmlPath(note), outputHtmlPath(item));
          const currentClass = item.title === note.title ? " is-current" : "";
          return `<a class="sidebar-directory-link${currentClass}" href="${href}">${escapeHtml(item.title)}</a>`;
        })
        .join("");

      return `<div class="sidebar-directory-group">
        <div class="sidebar-directory-group-title">${escapeHtml(group.title)}</div>
        <div class="sidebar-directory-links">${links}</div>
      </div>`;
    })
    .join("")}</div>`;
}

function buildLinearDirectoryItems(note, notesByTitle) {
  const groups = buildDirectoryGroups(note, notesByTitle);
  const ordered = [];
  const seen = new Set();

  for (const group of groups) {
    for (const item of group.items || []) {
      if (!item || seen.has(item.title)) {
        continue;
      }
      seen.add(item.title);
      ordered.push(item);
    }
  }

  return ordered;
}

function renderPrevNextNavigation(note, notesByTitle) {
  const ordered = buildLinearDirectoryItems(note, notesByTitle);
  const index = ordered.findIndex((item) => item.title === note.title);
  if (index === -1) {
    return "";
  }

  const previous = index > 0 ? ordered[index - 1] : null;
  const next = index < ordered.length - 1 ? ordered[index + 1] : null;
  if (!previous && !next) {
    return "";
  }

  const renderLink = (label, item, direction) => {
    if (!item) {
      return `<div class="pager-card pager-card-empty"></div>`;
    }
    const href = relativeHref(outputHtmlPath(note), outputHtmlPath(item));
    return `<a class="pager-card pager-card-${direction}" href="${href}">
      <span class="pager-label">${label}</span>
      <span class="pager-title">${escapeHtml(item.title)}</span>
    </a>`;
  };

  return `<nav class="detail-pager" aria-label="Page navigation">
    ${renderLink('上一页', previous, 'prev')}
    ${renderLink('下一页', next, 'next')}
  </nav>`;
}

function renderPagerShortcutScript() {
  return `<script>
    (() => {
      const isEditableTarget = (target) => {
        if (!target || !(target instanceof HTMLElement)) {
          return false;
        }
        if (target.isContentEditable) {
          return true;
        }
        const tagName = target.tagName;
        return tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT";
      };

      document.addEventListener("keydown", (event) => {
        if (!event.metaKey || event.ctrlKey || event.altKey || event.shiftKey || isEditableTarget(event.target)) {
          return;
        }

        let selector = "";
        if (event.key === "ArrowLeft") {
          selector = ".pager-card-prev";
        } else if (event.key === "ArrowRight") {
          selector = ".pager-card-next";
        } else {
          return;
        }

        const link = document.querySelector(selector);
        if (!(link instanceof HTMLAnchorElement) || !link.href) {
          return;
        }

        event.preventDefault();
        window.location.href = link.href;
      });
    })();
  </script>`;
}

function renderCardList(items, note, notesByTitle, mode = "text") {
  return items
    .map((item) => {
      if (mode === "link") {
        const href = noteHrefFromTitle(note, item, notesByTitle);
        const content = href ? `<a href="${href}">${escapeHtml(item)}</a>` : escapeHtml(item);
        return `<div class="detail-card detail-card-link">${content}</div>`;
      }
      return `<div class="detail-card">${inlineFormat(item, note, notesByTitle)}</div>`;
    })
    .join("\n");
}

function renderStructuredNote(note, notesByTitle, backlinksByTitle) {
  const details = resolveNoteDetails(note, notesByTitle);
  const backlinks = (backlinksByTitle.get(note.title) || []).map((source) => source.title);
  const uniqueBacklinks = dedupeTextList(backlinks, 12);
  const uniqueRelated = dedupeTextList(details.related, 12);
  const rawBody = renderMarkdownBody(note, notesByTitle);
  const directoryHtml = renderSidebarDirectory(note, notesByTitle);
  const pagerHtml = renderPrevNextNavigation(note, notesByTitle);

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
          <a class="home-link" href="${relativeHref(outputHtmlPath(note), path.join(outputRoot, "index.html"))}">Knowledge Base Home</a>
        </div>
        <div class="sidebar-block">
          <div class="sidebar-title">Current Note</div>
          <div class="sidebar-note">${escapeHtml(note.title)}</div>
          <div class="sidebar-meta">${escapeHtml(groupLabel(note))}</div>
        </div>
        <div class="sidebar-block">
          <div class="sidebar-title">目录</div>
          ${directoryHtml}
        </div>
        <div class="sidebar-block">
          <div class="sidebar-title">相关条目</div>
          ${renderLinkedChips(uniqueRelated, note, notesByTitle, "No related topics yet.")}
        </div>
        <div class="sidebar-block">
          <div class="sidebar-title">Backlinks</div>
          ${renderLinkedChips(uniqueBacklinks, note, notesByTitle, "No backlinks yet.")}
        </div>
      </aside>
      <main class="content detail-content">
        <section class="detail-hero">
          <div class="eyebrow">${escapeHtml(groupLabel(note))}</div>
          <h1>${escapeHtml(note.title)}</h1>
          <p class="detail-summary">${inlineFormat(details.summary, note, notesByTitle)}</p>
          <div class="detail-meta-grid">
            <div class="detail-meta-card">
              <div class="detail-meta-label">Domain</div>
              <div class="detail-meta-value">${escapeHtml(groupLabel(note))}</div>
            </div>
            <div class="detail-meta-card">
              <div class="detail-meta-label">Folder</div>
              <div class="detail-meta-value">${escapeHtml(folderLabel(note))}</div>
            </div>
            <div class="detail-meta-card">
              <div class="detail-meta-label">Source</div>
              <div class="detail-meta-value">${escapeHtml(path.relative(repoRoot, note.file))}</div>
            </div>
          </div>
        </section>

        <section class="detail-section detail-section-raw detail-section-raw-featured">
          <h2>原始笔记</h2>
          <div class="detail-raw-markdown">
            ${rawBody}
          </div>
        </section>

        <section class="detail-section detail-section-explain">
          <h2>详细说明</h2>
          <div class="detail-stack">
            ${renderCardList(details.body.length ? details.body : [details.summary], note, notesByTitle)}
          </div>
        </section>

        <section class="detail-section">
          <h2>关键要点</h2>
          <div class="detail-grid">
            ${renderCardList(details.points.length ? details.points : [details.summary], note, notesByTitle, "link")}
          </div>
        </section>

        ${details.useCases.length ? `
        <section class="detail-section detail-section-application">
          <h2>适用场景</h2>
          <div class="detail-stack">
            ${renderCardList(details.useCases, note, notesByTitle)}
          </div>
        </section>` : ""}

        ${details.pitfalls.length ? `
        <section class="detail-section detail-section-warning">
          <h2>常见误区</h2>
          <div class="detail-stack">
            ${renderCardList(details.pitfalls, note, notesByTitle)}
          </div>
        </section>` : ""}

        ${details.interview.length ? `
        <section class="detail-section detail-section-guide">
          <h2>面试回答方式</h2>
          <div class="detail-stack">
            ${renderCardList(details.interview, note, notesByTitle)}
          </div>
        </section>` : ""}

        ${details.supplemental && details.supplemental.length ? `
        <section class="detail-section">
          <h2>补充内容</h2>
          <div class="detail-stack">
            ${renderCardList(details.supplemental, note, notesByTitle)}
          </div>
        </section>` : ""}

        ${renderSolutions(note, details)}

        <section class="detail-section">
          <h2>相关条目</h2>
          ${renderLinkedChips(uniqueRelated, note, notesByTitle, "No related topics yet.")}
        </section>

        ${pagerHtml}
      </main>
    </div>
    ${renderPagerShortcutScript()}
  </body>
</html>`;
}

function buildIndex(notes) {
  const rootNote = notes.find((note) => note.title === "Knowledge Base Map");
  const rootSections = directoryOrder.get("root") || [];

  const sections = rootSections
    .map((section) => {
      const items = section.noteTitles
        .map((title) => notesByTitle.get(title))
        .filter(Boolean)
        .map((note) => `<li><a href="${relativeHref(path.join(outputRoot, "index.html"), outputHtmlPath(note))}">${escapeHtml(note.title)}</a></li>`)
        .join("");
      return items ? `<section class="card"><h2>${escapeHtml(section.title)}</h2><ul>${items}</ul></section>` : "";
    })
    .filter(Boolean)
    .join("\n");

  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Knowledge Base</title>
    <link rel="stylesheet" href="assets/styles.css" />
  </head>
  <body>
    <main class="landing">
      <div class="hero">
        <div class="eyebrow">GitHub Pages Preview</div>
        <h1>Knowledge Base</h1>
        <p>知识库页面现在优先突出原始笔记，同时保留关键要点和补充内容，方便快速跳转和继续深挖。</p>
        <a class="primary-link" href="${rootNote ? relativeHref(path.join(outputRoot, "index.html"), outputHtmlPath(rootNote)) : "#"}">Open Root Map</a>
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
    relDirSegments: relDir ? relDir.split(path.sep) : []
  };
});

const notesByTitle = new Map(notes.map((note) => [note.title, note]));
const directoryOrder = buildDirectoryOrder(notesByTitle);
const noteSectionLookup = new Map();
for (const [group, sections] of directoryOrder.entries()) {
  for (const section of sections) {
    for (const title of section.noteTitles) {
      noteSectionLookup.set(`${group}::${title}`, section.title);
    }
  }
}
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
  fs.writeFileSync(filePath, renderStructuredNote(note, notesByTitle, backlinksByTitle));
}

fs.writeFileSync(path.join(outputRoot, "index.html"), buildIndex(notes));

// Run content validation
console.log('\n🔍 Running content validation...');
try {
  const { execSync } = require('child_process');
  execSync('node scripts/validate-content.js knowledge-domains', {
    cwd: repoRoot,
    stdio: 'inherit'
  });
} catch (error) {
  console.warn('⚠️  Content validation failed, but site was built successfully');
}
