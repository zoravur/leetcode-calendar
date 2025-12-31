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
      const { data } = matter(content);

      problems.push({
        slug: dir,
        ...data
      });
    }
  }

  return problems.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Generate heatmap data for react-calendar-heatmap
function generateHeatmapData(problems) {
  const currentYear = new Date().getFullYear();
  const countByDate = {};

  // Count problems by date
  for (const problem of problems) {
    const date = problem.date;
    countByDate[date] = (countByDate[date] || 0) + 1;
  }

  // Generate all days for the year
  const startDate = new Date(currentYear, 0, 1);
  const endDate = new Date(currentYear, 11, 31);

  const heatmapData = [];
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0];
    heatmapData.push({
      date: dateStr,
      count: countByDate[dateStr] || 0
    });
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
