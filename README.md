# LeetCode Calendar

A React-based static site generator for tracking competitive programming progress.

## Live Site

[zoravur.com/leetcode-calendar](https://zoravur.com/leetcode-calendar)

## Quick Start

```bash
# Install dependencies
npm install

# Create a new problem
./lc new two-sum

# Build the static site
./lc build

# Or develop locally
npm run dev
```

## Structure

```
leetcode-calendar/
  /problems
    /two-sum
      README.md       # frontmatter + writeup
      solution.py     # or any language
  /src
    build.js          # generates data.json from /problems
    components/       # React components
    App.jsx
    main.jsx
    styles.css
  /docs               # GitHub Pages output (built by Vite)
  lc                  # CLI script
```

## Problem Format

Each problem has a `README.md` with YAML frontmatter:

```yaml
---
date: 2025-12-31
problem: two-sum
source: leetcode
difficulty: easy
time_minutes: 15
topics: [hash-map, arrays]
language: python
---

## Approach
...

## Complexity
...
```

## Features

- **GitHub-style contribution heatmap** using [react-calendar-heatmap](https://github.com/kevinsqi/react-calendar-heatmap)
- **Cumulative progress chart** with 1/day trendline (Chart.js)
- **Light/Dark mode toggle** with localStorage persistence
- **Recent writeups** with tags
- Pure static site built with React + Vite
- Data lives in git

## Tech Stack

- React 18
- Vite 6
- react-calendar-heatmap
- Chart.js + react-chartjs-2
- gray-matter (YAML parsing)

## GitHub Pages Setup

1. Push to GitHub
2. Go to Settings → Pages
3. Source: Deploy from branch
4. Branch: `main`, Folder: `/docs`
5. Save

The site will be available at `https://<username>.github.io/leetcode-calendar`
