import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

function ProblemDetail({ problems, slug }) {
  const [theme, setTheme] = useState('dark');

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.body.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.setAttribute('data-theme', newTheme);
  };

  const problem = problems.find(p => p.slug === slug);

  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${monthNames[parseInt(month) - 1]} ${parseInt(day)}, ${year}`;
  };

  if (!problem) {
    return (
      <>
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <div className="problem-detail">
          <div className="problem-header">
            <a href="/leetcode-calendar/" className="back-link">← Back to Calendar</a>
          </div>
          <div className="problem-not-found">
            <h1>Problem not found</h1>
            <p>The problem "{slug}" doesn't exist.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
      <div className="problem-detail">
        <div className="problem-header">
          <a href="/leetcode-calendar/" className="back-link">← Back to Calendar</a>
        </div>

      <div className="problem-meta">
        <h1>{problem.problem || problem.slug}</h1>
        <div className="problem-info">
          <span className="info-item">📅 {formatDate(problem.date)}</span>
          {problem.source && <span className="info-item">🔗 {problem.source}</span>}
          {problem.difficulty && (
            <span className={`info-item difficulty-${problem.difficulty}`}>
              {problem.difficulty}
            </span>
          )}
          {problem.time_minutes && (
            <span className="info-item">⏱️ {problem.time_minutes} minutes</span>
          )}
          {problem.language && <span className="info-item">💻 {problem.language}</span>}
        </div>
        {problem.topics && problem.topics.length > 0 && (
          <div className="problem-topics">
            {problem.topics.map((topic, i) => (
              <span key={i} className="topic-tag">{topic}</span>
            ))}
          </div>
        )}
      </div>

      <div className="problem-content markdown-body">
        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
          {problem.markdown}
        </ReactMarkdown>
      </div>
    </div>
    </>
  );
}

export default ProblemDetail;
