# LeetCode Calendar

A static site generator for tracking competitive programming progress.

## Live Site

[zoravur.com/leetcode-calendar](https://zoravur.com/leetcode-calendar)

## Quick Start

```bash
# Create a new problem
./lc new two-sum

# Build the static site
./lc build
```

## Structure

```
leetcode-calendar/
  /problems
    /two-sum
      README.md       # frontmatter + writeup
      solution.py     # or any language
  /src
    build.js          # generates static site from /problems
  /docs               # GitHub Pages output
    index.html
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

- GitHub-style contribution heatmap
- Cumulative progress chart with 1/day trendline
- Recent writeups with tags
- Pure static site, no backend needed
- Data lives in git

## GitHub Pages Setup

1. Push to GitHub
2. Go to Settings → Pages
3. Source: Deploy from branch
4. Branch: `main`, Folder: `/docs`
5. Save

The site will be available at `https://<username>.github.io/leetcode-calendar`
