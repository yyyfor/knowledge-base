const fs = require('fs');
const path = require('path');

class ContentValidator {
  constructor(contentRoot) {
    this.contentRoot = contentRoot;
    this.errors = [];
    this.warnings = [];
    this.stats = {
      totalFiles: 0,
      validFiles: 0,
      invalidFiles: 0,
      totalLinks: 0,
      brokenLinks: 0,
      orphanFiles: 0
    };
  }

  validate() {
    console.log('🔍 Starting content validation...\n');

    this.collectAllFiles();
    this.validateFrontmatter();
    this.validateLinks();
    this.validateOrphanFiles();
    this.validateContentQuality();
    this.generateReport();

    return this.errors.length === 0;
  }

  collectAllFiles() {
    this.files = [];
    this.filesByTitle = new Map();

    const walk = (dir) => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          walk(fullPath);
        } else if (entry.isFile() && entry.name.endsWith('.md')) {
          const content = fs.readFileSync(fullPath, 'utf8');
          const relPath = path.relative(this.contentRoot, fullPath);
          const title = this.extractTitle(content);

          const fileInfo = {
            path: fullPath,
            relPath,
            title,
            content,
            links: this.extractLinks(content),
            frontmatter: this.extractFrontmatter(content)
          };

          this.files.push(fileInfo);
          if (title) {
            this.filesByTitle.set(title, fileInfo);
          }
        }
      }
    };

    walk(this.contentRoot);
    this.stats.totalFiles = this.files.length;
  }

  extractTitle(content) {
    const match = content.match(/^#\s+(.+)$/m);
    return match ? match[1].trim() : null;
  }

  extractLinks(content) {
    const wikiLinks = [];
    const wikiLinkRegex = /\[\[([^\]]+)\]\]/g;
    let match;

    while ((match = wikiLinkRegex.exec(content)) !== null) {
      wikiLinks.push(match[1].trim());
    }

    return wikiLinks;
  }

  extractFrontmatter(content) {
    if (!content.startsWith('---\n')) return null;

    const end = content.indexOf('\n---\n', 4);
    if (end === -1) return null;

    const frontmatterText = content.slice(4, end);
    const frontmatter = {};

    const lines = frontmatterText.split('\n');
    for (const line of lines) {
      const match = line.match(/^(\w+):\s*(.*)$/);
      if (match) {
        const key = match[1];
        let value = match[2].trim();

        if (value.startsWith('[') && value.endsWith(']')) {
          value = value.slice(1, -1).split(',').map(v => v.trim().replace(/['"]/g, ''));
        }
        frontmatter[key] = value;
      }
    }

    return frontmatter;
  }

  validateFrontmatter() {
    console.log('📝 Validating frontmatter...');

    for (const file of this.files) {
      if (!file.frontmatter) {
        this.addWarning(file, 'Missing frontmatter');
        this.stats.invalidFiles++;
        continue;
      }

      // Check required fields
      const requiredFields = ['title', 'tags', 'difficulty', 'estimated_time', 'last_reviewed'];
      for (const field of requiredFields) {
        if (!file.frontmatter[field]) {
          this.addError(file, `Missing required frontmatter field: ${field}`);
        }
      }

      // Validate field formats
      if (file.frontmatter.difficulty && !['beginner', 'intermediate', 'advanced'].includes(file.frontmatter.difficulty)) {
        this.addError(file, `Invalid difficulty: ${file.frontmatter.difficulty}`);
      }

      if (file.frontmatter.estimated_time) {
        const timePattern = /^\d+\s*(min|hour|hours)/;
        if (!timePattern.test(file.frontmatter.estimated_time)) {
          this.addWarning(file, `Invalid estimated_time format: ${file.frontmatter.estimated_time}`);
        }
      }

      if (file.frontmatter.last_reviewed) {
        const datePattern = /^\d{4}-\d{2}-\d{2}$/;
        if (!datePattern.test(file.frontmatter.last_reviewed)) {
          this.addError(file, `Invalid last_reviewed date format: ${file.frontmatter.last_reviewed}`);
        }
      }

      // Check if title matches frontmatter title
      if (file.frontmatter.title && file.title && file.frontmatter.title !== file.title) {
        this.addWarning(file, `Frontmatter title "${file.frontmatter.title}" doesn't match content title "${file.title}"`);
      }

      this.stats.validFiles++;
    }
  }

  validateLinks() {
    console.log('🔗 Validating links...');

    for (const file of this.files) {
      for (const link of file.links) {
        this.stats.totalLinks++;

        const target = this.filesByTitle.get(link);
        if (!target) {
          this.addError(file, `Broken link: [[${link}]]`);
          this.stats.brokenLinks++;
        }
      }
    }
  }

  validateOrphanFiles() {
    console.log('👶 Checking for orphan files...');

    const linkedFiles = new Set();

    // Collect all files that are linked to
    for (const file of this.files) {
      for (const link of file.links) {
        const target = this.filesByTitle.get(link);
        if (target) {
          linkedFiles.add(target.relPath);
        }
      }
    }

    // Check for unlinked files (except index/map files)
    for (const file of this.files) {
      const isIndexFile = file.relPath.endsWith('Map.md') ||
                         file.relPath.endsWith('index.md') ||
                         file.relPath.endsWith('README.md');

      if (!isIndexFile && !linkedFiles.has(file.relPath)) {
        this.addWarning(file, 'Orphan file: not linked to by any other file');
        this.stats.orphanFiles++;
      }
    }
  }

  validateContentQuality() {
    console.log('✨ Checking content quality...');

    for (const file of this.files) {
      // Check for very short files
      const wordCount = file.content.split(/\s+/).length;
      if (wordCount < 50 && !file.relPath.includes('Map') && !file.relPath.includes('index')) {
        this.addWarning(file, `Very short content: ${wordCount} words`);
      }

      // Check for missing sections (for knowledge files, not maps)
      if (!file.relPath.includes('Map') && !file.relPath.includes('index')) {
        const hasExamples = /## Typical Problems|## Example|## Code Solution|```kotlin|```python/.test(file.content);
        const tags = file.frontmatter?.tags || [];
        if (!hasExamples && (tags.includes('coding-interview') || tags.includes('algorithms'))) {
          this.addWarning(file, 'Missing code examples for coding interview topic');
        }
      }

      // Check for outdated content
      const lastReviewed = file.frontmatter?.last_reviewed;
      if (lastReviewed) {
        const reviewDate = new Date(lastReviewed);
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        if (reviewDate < sixMonthsAgo) {
          this.addWarning(file, `Content not reviewed for over 6 months (last: ${lastReviewed})`);
        }
      }
    }
  }

  addError(file, message) {
    this.errors.push({
      file: file.relPath,
      message,
      severity: 'error'
    });
  }

  addWarning(file, message) {
    this.warnings.push({
      file: file.relPath,
      message,
      severity: 'warning'
    });
  }

  generateReport() {
    console.log('\n📊 Validation Report\n');
    console.log('='.repeat(60));

    // Statistics
    console.log('\n📈 Statistics:');
    console.log(`  Total Files:     ${this.stats.totalFiles}`);
    console.log(`  Valid Files:     ${this.stats.validFiles}`);
    console.log(`  Invalid Files:   ${this.stats.invalidFiles}`);
    console.log(`  Total Links:     ${this.stats.totalLinks}`);
    console.log(`  Broken Links:    ${this.stats.brokenLinks}`);
    console.log(`  Orphan Files:    ${this.stats.orphanFiles}`);

    // Errors
    if (this.errors.length > 0) {
      console.log(`\n❌ Errors (${this.errors.length}):`);
      for (const error of this.errors.slice(0, 20)) { // Limit to first 20
        console.log(`  ${error.file}`);
        console.log(`    ${error.message}`);
      }
      if (this.errors.length > 20) {
        console.log(`  ... and ${this.errors.length - 20} more errors`);
      }
    }

    // Warnings
    if (this.warnings.length > 0) {
      console.log(`\n⚠️  Warnings (${this.warnings.length}):`);
      for (const warning of this.warnings.slice(0, 20)) { // Limit to first 20
        console.log(`  ${warning.file}`);
        console.log(`    ${warning.message}`);
      }
      if (this.warnings.length > 20) {
        console.log(`  ... and ${this.warnings.length - 20} more warnings`);
      }
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log('✅ All checks passed!');
    } else if (this.errors.length === 0) {
      console.log(`✅ No errors, ${this.warnings.length} warnings`);
    } else {
      console.log(`❌ ${this.errors.length} errors, ${this.warnings.length} warnings`);
    }
    console.log('='.repeat(60) + '\n');
  }
}

// CLI interface
function main() {
  const contentRoot = process.argv[2] || path.join(__dirname, '..', 'knowledge-domains');

  if (!fs.existsSync(contentRoot)) {
    console.error(`Error: Content root not found: ${contentRoot}`);
    process.exit(1);
  }

  const validator = new ContentValidator(contentRoot);
  const success = validator.validate();

  process.exit(success ? 0 : 1);
}

if (require.main === module) {
  main();
}

module.exports = { ContentValidator };
