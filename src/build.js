#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROBLEMS_DIR = path.join(__dirname, '../problems');
const PUBLIC_DIR = path.join(__dirname, '../public');
const OUTPUT_FILE = path.join(PUBLIC_DIR, 'data.json');

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

      problems.push({
        slug: dir,
        ...data,
        date: dateStr,
        markdown
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

  // Get today's date as YYYY-MM-DD (UTC)
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  // Hardcoded start date: December 31st, 2025
  const startDateStr = '2025-12-31';

  const heatmapData = [];
  let currentDate = startDateStr;

  while (currentDate <= todayStr) {
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

  const dates = [];
  const actual = [];
  const trend = [];

  let currentCount = 0;
  let problemIndex = 0;

  for (let d = new Date(firstDate); d <= today; d.setDate(d.getDate() + 1)) {
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
