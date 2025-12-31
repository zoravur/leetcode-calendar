import { useState, useEffect } from 'react';
import GitHubHeatmap from './components/GitHubHeatmap';
import CumulativeChart from './components/CumulativeChart';
import RecentWriteups from './components/RecentWriteups';

function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || 'dark';
  });
  const [data, setData] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    fetch('/leetcode-calendar/data.json')
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error('Failed to load data:', err));
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  if (!data) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app">
      <header>
        <h1>Zoravur's LeetCode Calendar ({new Date().getFullYear()})</h1>
        <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </header>

      <div className="charts-container">
        <div className="chart-box">
          <h2>GitHub-style Heatmap</h2>
          <GitHubHeatmap data={data.heatmapData} />
        </div>

        <div className="chart-box">
          <h2>Cumulative Progress</h2>
          <CumulativeChart data={data.cumulativeData} theme={theme} />
        </div>
      </div>

      <RecentWriteups problems={data.problems} />
    </div>
  );
}

export default App;
