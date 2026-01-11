import { useState, useEffect } from 'react';

function WriteupsList({ data }) {
  const [activeFilter, setActiveFilter] = useState(null);
  const [theme, setTheme] = useState('dark');

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[parseInt(month) - 1]} ${parseInt(day)}, ${year}`;
  };

  const handleTagClick = (tag) => {
    setActiveFilter(tag === activeFilter ? null : tag);
  };

  const clearFilter = () => {
    setActiveFilter(null);
  };

  // Filter problems based on active filter
  const filteredProblems = activeFilter
    ? data.problems.filter(problem => {
        if (problem.language === activeFilter) return true;
        if (problem.source === activeFilter) return true;
        if (problem.difficulty === activeFilter) return true;
        if (problem.topics && problem.topics.includes(activeFilter)) return true;
        return false;
      })
    : data.problems;

  return (
    <>
      <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
      <div className="writeups-list-page">
        <div className="page-header">
          <a href="/leetcode-calendar/" className="back-link">← Back to Calendar</a>
        </div>

      <h1>All Writeups ({data.problems.length})</h1>

      {/* Active filter indicator */}
      {activeFilter && (
        <div className="filter-indicator">
          <span>Filtering by: <strong>{activeFilter}</strong></span>
          <button onClick={clearFilter} className="clear-filter">✕</button>
        </div>
      )}

      {filteredProblems.length === 0 ? (
        <div className="writeups">
          <p>No problems found with tag: <strong>{activeFilter}</strong></p>
        </div>
      ) : (
        <div className="writeups">
          {filteredProblems.map((problem, index) => (
            <div key={index} className="writeup-item">
              <div className="writeup-date">{formatDate(problem.date)}</div>
              <a
                href={`/leetcode-calendar/problems/${problem.slug}`}
                className="writeup-title"
              >
                {problem.problem || problem.slug}
              </a>
              <div className="writeup-tags">
                {problem.language && (
                  <span
                    className={`tag tag-clickable ${activeFilter === problem.language ? 'tag-active' : ''}`}
                    onClick={() => handleTagClick(problem.language)}
                  >
                    {problem.language}
                  </span>
                )}
                {problem.source && (
                  <span
                    className={`tag tag-clickable ${activeFilter === problem.source ? 'tag-active' : ''}`}
                    onClick={() => handleTagClick(problem.source)}
                  >
                    {problem.source}
                  </span>
                )}
                {problem.difficulty && (
                  <span
                    className={`tag tag-clickable ${activeFilter === problem.difficulty ? 'tag-active' : ''}`}
                    onClick={() => handleTagClick(problem.difficulty)}
                  >
                    {problem.difficulty}
                  </span>
                )}
                {problem.topics && problem.topics.map((topic, i) => (
                  <span
                    key={i}
                    className={`tag tag-clickable ${activeFilter === topic ? 'tag-active' : ''}`}
                    onClick={() => handleTagClick(topic)}
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
}

export default WriteupsList;
