import { useState } from 'react';
import GitHubHeatmap from './GitHubHeatmap';
import CumulativeChart from './CumulativeChart';
import RecentWriteups from './RecentWriteups';

function Home({ data, theme, dateRange }) {
  const [activeChart, setActiveChart] = useState('heatmap');
  const [activeFilter, setActiveFilter] = useState(null);

  // Calculate summary stats
  const totalProblems = data.problems.length;

  // Calculate problems in last 365 days
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  const problemsLastYear = data.problems.filter(p => {
    const problemDate = new Date(p.date);
    return problemDate >= oneYearAgo;
  }).length;

  // Filter problems based on active filter
  const filteredProblems = activeFilter
    ? data.problems.filter(problem => {
        // Check if the filter matches language, source, difficulty, or topics
        if (problem.language === activeFilter) return true;
        if (problem.source === activeFilter) return true;
        if (problem.difficulty === activeFilter) return true;
        if (problem.topics && problem.topics.includes(activeFilter)) return true;
        return false;
      })
    : data.problems;

  const handleTagClick = (tag) => {
    setActiveFilter(tag === activeFilter ? null : tag);
  };

  const clearFilter = () => {
    setActiveFilter(null);
  };

  return (
    <>
      <header>
        <h1>Zoravur's LeetCode Calendar</h1>
      </header>

      {/* Summary stats */}
      <div className="summary-stats">
        <div className="stat-item">
          <span className="stat-value">{totalProblems}</span>
          <span className="stat-label">Total Problems</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{problemsLastYear}</span>
          <span className="stat-label">Last Year</span>
        </div>
      </div>

      {/* Active filter indicator */}
      {activeFilter && (
        <div className="filter-indicator">
          <span>Filtering by: <strong>{activeFilter}</strong></span>
          <button onClick={clearFilter} className="clear-filter">✕</button>
        </div>
      )}

      {/* Mobile chart toggle */}
      <div className="chart-toggle-mobile">
        <button
          className={`toggle-btn ${activeChart === 'heatmap' ? 'active' : ''}`}
          onClick={() => setActiveChart('heatmap')}
        >
          Heatmap
        </button>
        <button
          className={`toggle-btn ${activeChart === 'progress' ? 'active' : ''}`}
          onClick={() => setActiveChart('progress')}
        >
          Progress
        </button>
      </div>

      <div className="charts-container">
        <div className={`chart-box ${activeChart === 'heatmap' ? 'active-mobile' : 'inactive-mobile'}`}>
          <GitHubHeatmap data={data.heatmapData} theme={theme} dateRange={dateRange} />
        </div>

        <div className={`chart-box ${activeChart === 'progress' ? 'active-mobile' : 'inactive-mobile'}`}>
          <h2>Cumulative Progress</h2>
          <CumulativeChart data={data.cumulativeData} theme={theme} />
        </div>
      </div>

      <RecentWriteups
        problems={filteredProblems.slice(0, 10)}
        activeFilter={activeFilter}
        onTagClick={handleTagClick}
        showViewAll={filteredProblems.length > 10}
      />
    </>
  );
}

export default Home;
