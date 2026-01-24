#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkDirective from 'remark-directive';
import remarkStringify from 'remark-stringify';
import { visit } from 'unist-util-visit';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROBLEMS_DIR = path.join(__dirname, '../problems');
const PUBLIC_DIR = path.join(__dirname, '../public');
const OUTPUT_FILE = path.join(PUBLIC_DIR, 'data.json');

// Remark plugin to handle file includes
function remarkInclude(problemPath) {
  return () => {
    return (tree) => {
      visit(tree, 'leafDirective', (node) => {
        if (node.name !== 'include') return;

        const filename = node.attributes?.file;
        if (!filename) return;

        const filePath = path.join(problemPath, filename);

        if (!fs.existsSync(filePath)) {
          console.warn(`Warning: Include file not found: ${filePath}`);
          return;
        }

        const content = fs.readFileSync(filePath, 'utf8');
        const ext = path.extname(filename).slice(1);
        const lang = ext === 'py' ? 'python' : ext;

        // Replace directive with code block
        node.type = 'code';
        node.lang = lang;
        node.value = content;
        delete node.name;
        delete node.attributes;
        delete node.children;
      });
    };
  };
}

// Parse all problem README files
function parseProblems() {
  const problems = [];

  if (!fs.existsSync(PROBLEMS_DIR)) {
    return problems;
  }

  const problemDirs = fs.readdirSync(PROBLEMS_DIR);

  for (const dir of problemDirs) {
    const problemPath = path.join(PROBLEMS_DIR, dir);
    const readmePath = path.join(problemPath, 'README.md');

    if (fs.statSync(problemPath).isDirectory() && fs.existsSync(readmePath)) {
      const content = fs.readFileSync(readmePath, 'utf8');
      const { data, content: markdown } = matter(content);

      // Normalize date to YYYY-MM-DD string
      let dateStr;
      if (data.date instanceof Date) {
        dateStr = data.date.toISOString().split('T')[0];
      } else if (typeof data.date === 'string') {
        dateStr = data.date.split('T')[0]; // Remove time if present
      } else {
        dateStr = data.date;
      }

      // Process markdown to handle includes
      const processedMarkdown = unified()
        .use(remarkParse)
        .use(remarkDirective)
        .use(remarkInclude(problemPath))
        .use(remarkStringify)
        .processSync(markdown)
        .toString();

      problems.push({
        slug: dir,
        ...data,
        date: dateStr,
        markdown: processedMarkdown
      });
    }
  }

  return problems.sort((a, b) => b.date.localeCompare(a.date));
}

// Helper to increment a YYYY-MM-DD date string by one day (UTC)
function addDay(dateStr) {
  const date = new Date(dateStr + 'T00:00:00Z'); // Parse as UTC midnight
  date.setUTCDate(date.getUTCDate() + 1);
  return date.toISOString().split('T')[0];
}

// Generate heatmap data for react-activity-calendar
function generateHeatmapData(problems) {
  const countByDate = {};

  // Count problems by date (already normalized in parseProblems)
  for (const problem of problems) {
    const dateStr = problem.date;
    countByDate[dateStr] = (countByDate[dateStr] || 0) + 1;
  }

  // Calculate max count for level scaling
  const maxCount = Math.max(...Object.values(countByDate), 1);

  // Get today's date as YYYY-MM-DD (UTC) and add 30 days buffer for future builds
  const today = new Date();
  const futureDate = new Date(today);
  futureDate.setDate(futureDate.getDate() + 30);
  const futureDateStr = futureDate.toISOString().split('T')[0];

  // Hardcoded start date: January 1st, 2026
  const startDateStr = '2026-01-01';

  const heatmapData = [];
  let currentDate = startDateStr;

  while (currentDate <= futureDateStr) {
    const count = countByDate[currentDate] || 0;

    // Calculate level (0-4) based on count
    let level = 0;
    if (count > 0) {
      level = Math.min(4, Math.ceil((count / maxCount) * 4));
    }

    heatmapData.push({
      date: currentDate,
      count: count,
      level: level
    });

    currentDate = addDay(currentDate);
  }

  return heatmapData;
}

// Generate cumulative data with 1/day trendline
function generateCumulativeData(problems) {
  if (problems.length === 0) {
    return { dates: [], actual: [], trend: [] };
  }

  const sortedProblems = [...problems].sort((a, b) => new Date(a.date) - new Date(b.date));

  const firstDate = new Date(sortedProblems[0].date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Add 30 days buffer for future builds
  const futureDate = new Date(today);
  futureDate.setDate(futureDate.getDate() + 30);

  const dates = [];
  const actual = [];
  const trend = [];

  let currentCount = 0;
  let problemIndex = 0;

  for (let d = new Date(firstDate); d <= futureDate; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0];
    dates.push(dateStr);

    // Count problems on this date
    while (problemIndex < sortedProblems.length && sortedProblems[problemIndex].date === dateStr) {
      currentCount++;
      problemIndex++;
    }

    actual.push(currentCount);

    // Trend: 1 problem per day from start
    const daysSinceStart = Math.floor((d - firstDate) / (1000 * 60 * 60 * 24));
    trend.push(daysSinceStart + 1);
  }

  return { dates, actual, trend };
}

// Main build function
function build() {
  console.log('Scanning problems...');
  const problems = parseProblems();
  console.log(`Found ${problems.length} problem(s)`);

  console.log('Generating data...');
  const heatmapData = generateHeatmapData(problems);
  const cumulativeData = generateCumulativeData(problems);

  const data = {
    problems,
    heatmapData,
    cumulativeData
  };

  // Ensure public directory exists
  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2));
  console.log(`✓ Generated data at: ${OUTPUT_FILE}`);
}

build();
