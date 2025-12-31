#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const PROBLEMS_DIR = path.join(__dirname, '../problems');
const OUTPUT_FILE = path.join(__dirname, '../docs/index.html');

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

      problems.push({
        slug: dir,
        ...data,
        markdown
      });
    }
  }

  return problems.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Generate heatmap data (count by date)
function generateHeatmapData(problems) {
  const countByDate = {};

  for (const problem of problems) {
    const date = problem.date;
    countByDate[date] = (countByDate[date] || 0) + 1;
  }

  return countByDate;
}

// Generate cumulative data with 1/day trendline
function generateCumulativeData(problems) {
  if (problems.length === 0) return { dates: [], actual: [], trend: [] };

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

// Generate heatmap calendar data (GitHub-style)
function generateCalendarHeatmap(problems, year = new Date().getFullYear()) {
  const countByDate = generateHeatmapData(problems);

  // Generate all days for the year
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);

  const days = [];
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0];
    const count = countByDate[dateStr] || 0;
    days.push({ date: dateStr, count });
  }

  return days;
}

// Generate HTML page
function generateHTML(problems) {
  const currentYear = new Date().getFullYear();
  const heatmapDays = generateCalendarHeatmap(problems, currentYear);
  const { dates, actual, trend } = generateCumulativeData(problems);

  const maxCount = Math.max(...heatmapDays.map(d => d.count), 1);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Zoravur's LeetCode Calendar</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      max-width: 1400px;
      margin: 0 auto;
      padding: 20px;
      background: #0d1117;
      color: #c9d1d9;
    }
    h1 {
      text-align: center;
      font-size: 2rem;
      margin-bottom: 2rem;
      color: #58a6ff;
    }
    .charts-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 40px;
    }
    @media (max-width: 768px) {
      .charts-container {
        grid-template-columns: 1fr;
      }
    }
    .chart-box {
      background: #161b22;
      border: 1px solid #30363d;
      border-radius: 6px;
      padding: 20px;
    }
    .chart-box h2 {
      margin-top: 0;
      font-size: 1.2rem;
      color: #58a6ff;
    }
    .heatmap-grid {
      display: grid;
      grid-template-columns: repeat(53, 1fr);
      gap: 3px;
      margin: 10px 0;
    }
    .heatmap-cell {
      aspect-ratio: 1;
      border-radius: 2px;
      cursor: pointer;
      position: relative;
    }
    .heatmap-cell:hover::after {
      content: attr(data-date) ": " attr(data-count) " problems";
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      background: #21262d;
      border: 1px solid #30363d;
      padding: 4px 8px;
      border-radius: 4px;
      white-space: nowrap;
      font-size: 12px;
      z-index: 10;
    }
    .heatmap-legend {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 12px;
      margin-top: 10px;
    }
    .legend-box {
      width: 12px;
      height: 12px;
      border-radius: 2px;
    }
    .writeups {
      background: #161b22;
      border: 1px solid #30363d;
      border-radius: 6px;
      padding: 20px;
    }
    .writeups h2 {
      margin-top: 0;
      color: #58a6ff;
    }
    .writeup-item {
      padding: 12px 0;
      border-bottom: 1px solid #21262d;
    }
    .writeup-item:last-child {
      border-bottom: none;
    }
    .writeup-date {
      color: #8b949e;
      font-size: 0.9rem;
    }
    .writeup-title {
      font-weight: 600;
      color: #58a6ff;
      text-decoration: none;
      font-size: 1.1rem;
    }
    .writeup-title:hover {
      text-decoration: underline;
    }
    .writeup-tags {
      margin-top: 4px;
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .tag {
      background: #21262d;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 0.85rem;
      color: #8b949e;
    }
    canvas {
      max-height: 300px;
    }
  </style>
</head>
<body>
  <h1>Zoravur's LeetCode Calendar (${currentYear})</h1>

  <div class="charts-container">
    <div class="chart-box">
      <h2>GitHub-style Heatmap</h2>
      <div class="heatmap-grid">
        ${heatmapDays.map(day => {
          const intensity = day.count === 0 ? 0 : Math.ceil((day.count / maxCount) * 4);
          const colors = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'];
          return `<div class="heatmap-cell" style="background: ${colors[intensity]}"
                       data-date="${day.date}" data-count="${day.count}"></div>`;
        }).join('')}
      </div>
      <div class="heatmap-legend">
        <span>Less</span>
        <div class="legend-box" style="background: #161b22"></div>
        <div class="legend-box" style="background: #0e4429"></div>
        <div class="legend-box" style="background: #006d32"></div>
        <div class="legend-box" style="background: #26a641"></div>
        <div class="legend-box" style="background: #39d353"></div>
        <span>More</span>
      </div>
    </div>

    <div class="chart-box">
      <h2>Cumulative Progress</h2>
      <canvas id="cumulativeChart"></canvas>
    </div>
  </div>

  <div class="writeups">
    <h2>Recent Writeups</h2>
    ${problems.length === 0 ? '<p>No problems yet. Run <code>lc new &lt;problem-name&gt;</code> to create your first one!</p>' : ''}
    ${problems.map(p => `
      <div class="writeup-item">
        <div class="writeup-date">${p.date}</div>
        <a href="https://github.com/zoravur/leetcode-calendar/tree/main/problems/${p.slug}"
           class="writeup-title" target="_blank">${p.problem || p.slug}</a>
        <div class="writeup-tags">
          ${p.language ? `<span class="tag">${p.language}</span>` : ''}
          ${p.source ? `<span class="tag">${p.source}</span>` : ''}
          ${p.difficulty ? `<span class="tag">${p.difficulty}</span>` : ''}
          ${(p.topics || []).map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      </div>
    `).join('')}
  </div>

  <script>
    const ctx = document.getElementById('cumulativeChart');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ${JSON.stringify(dates)},
        datasets: [{
          label: 'Actual Progress',
          data: ${JSON.stringify(actual)},
          borderColor: '#58a6ff',
          backgroundColor: 'rgba(88, 166, 255, 0.1)',
          fill: true,
          tension: 0.1
        }, {
          label: 'Target (1/day)',
          data: ${JSON.stringify(trend)},
          borderColor: '#8b949e',
          backgroundColor: 'transparent',
          borderDash: [5, 5],
          fill: false,
          tension: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        interaction: {
          intersect: false,
          mode: 'index'
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: '#8b949e' },
            grid: { color: '#21262d' }
          },
          x: {
            ticks: {
              color: '#8b949e',
              maxRotation: 0,
              autoSkip: true,
              maxTicksLimit: 10
            },
            grid: { color: '#21262d' }
          }
        },
        plugins: {
          legend: {
            labels: { color: '#c9d1d9' }
          }
        }
      }
    });
  </script>
</body>
</html>`;
}

// Main build function
function build() {
  console.log('Scanning problems...');
  const problems = parseProblems();
  console.log(`Found ${problems.length} problem(s)`);

  console.log('Generating HTML...');
  const html = generateHTML(problems);

  const docsDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, html);
  console.log(`✓ Built site at: ${OUTPUT_FILE}`);
}

build();
