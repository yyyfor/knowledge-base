const fs = require('fs');
const path = require('path');

const DOMAIN_TAGS = {
  'coding-interview-playbook': ['coding-interview', 'algorithms'],
  'system-design': ['system-design', 'architecture'],
  'quant-programmer-roadmap': ['quant', 'programming'],
  'investment-banking': ['investment-banking', 'finance'],
  'investing-and-asset-allocation': ['investing', 'asset-allocation'],
  'google-generative-ai-leader-certification': ['genai', 'machine-learning']
};

const DIFFICULTY_DEFAULTS = {
  'coding-interview-playbook': 'intermediate',
  'system-design': 'intermediate',
  'quant-programmer-roadmap': 'advanced',
  'investment-banking': 'intermediate',
  'investing-and-asset-allocation': 'beginner',
  'google-generative-ai-leader-certification': 'intermediate'
};

function getDomainFromPath(filePath) {
  const parts = filePath.split(path.sep);
  for (let i = 0; i < parts.length; i++) {
    if (parts[i] === 'knowledge-domains' && i + 1 < parts.length) {
      return parts[i + 1];
    }
  }
  return null;
}

function extractTitleFromContent(content) {
  const titleMatch = content.match(/^#\s+(.+)$/m);
  return titleMatch ? titleMatch[1].trim() : null;
}

function estimateReadingTime(content) {
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return minutes <= 5 ? `${minutes} min` : `${Math.ceil(minutes / 60 * 10) / 10} hours`;
}

function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

function updateFrontmatter(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const domain = getDomainFromPath(filePath);

  if (!domain) {
    console.log(`Skipping ${filePath}: Cannot determine domain`);
    return;
  }

  const title = extractTitleFromContent(content);
  if (!title) {
    console.log(`Skipping ${filePath}: Cannot extract title`);
    return;
  }

  // Extract existing frontmatter
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const existingFrontmatter = content.match(frontmatterRegex);

  let frontmatter = {};

  if (existingFrontmatter) {
    // Parse existing frontmatter
    const lines = existingFrontmatter[1].split('\n');
    for (const line of lines) {
      const match = line.match(/^(\w+):\s*(.*)$/);
      if (match) {
        const key = match[1];
        let value = match[2].trim();

        // Parse arrays and special values
        if (value.startsWith('[') && value.endsWith(']')) {
          value = value.slice(1, -1).split(',').map(v => v.trim().replace(/['"]/g, ''));
        }
        frontmatter[key] = value;
      }
    }
  }

  // Ensure required fields
  frontmatter.title = title;
  frontmatter.tags = frontmatter.tags || DOMAIN_TAGS[domain] || ['knowledge-base'];
  frontmatter.difficulty = frontmatter.difficulty || DIFFICULTY_DEFAULTS[domain] || 'intermediate';
  frontmatter.estimated_time = frontmatter.estimated_time || estimateReadingTime(content);
  frontmatter.last_reviewed = frontmatter.last_reviewed || getCurrentDate();

  // Build new frontmatter string
  let newFrontmatter = '---\n';
  for (const [key, value] of Object.entries(frontmatter)) {
    if (Array.isArray(value)) {
      newFrontmatter += `${key}: [${value.map(v => `"${v}"`).join(', ')}]\n`;
    } else {
      newFrontmatter += `${key}: ${value}\n`;
    }
  }
  newFrontmatter += '---\n';

  // Update content
  let newContent;
  if (existingFrontmatter) {
    newContent = content.replace(frontmatterRegex, newFrontmatter.trim());
  } else {
    newContent = newFrontmatter.trim() + '\n\n' + content;
  }

  fs.writeFileSync(filePath, newContent);
  console.log(`✓ Updated: ${filePath}`);
}

function main() {
  const targetPath = process.argv[2];

  if (!targetPath) {
    console.log('Usage: node update-frontmatter.js <file-or-directory>');
    process.exit(1);
  }

  const stat = fs.statSync(targetPath);

  if (stat.isDirectory()) {
    const walk = (dir) => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          walk(fullPath);
        } else if (entry.isFile() && entry.name.endsWith('.md')) {
          updateFrontmatter(fullPath);
        }
      }
    };
    walk(targetPath);
  } else if (targetPath.endsWith('.md')) {
    updateFrontmatter(targetPath);
  } else {
    console.log('Error: Target must be a .md file or directory');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { updateFrontmatter };
