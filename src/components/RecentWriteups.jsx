function RecentWriteups({ problems, activeFilter, onTagClick, showViewAll }) {
  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[parseInt(month) - 1]} ${parseInt(day)}, ${year}`;
  };

  if (!problems || problems.length === 0) {
    return (
      <div className="writeups">
        <h2>Recent Writeups</h2>
        {activeFilter ? (
          <p>No problems found with tag: <strong>{activeFilter}</strong></p>
        ) : (
          <p>No problems yet. Run <code>lc new &lt;problem-name&gt;</code> to create your first one!</p>
        )}
      </div>
    );
  }

  return (
    <div className="writeups">
      <div className="writeups-header">
        <h2>Recent Writeups</h2>
        {showViewAll && (
          <a href="/leetcode-calendar/writeups" className="view-all-link">
            View all →
          </a>
        )}
      </div>
      {problems.map((problem, index) => (
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
                onClick={() => onTagClick(problem.language)}
              >
                {problem.language}
              </span>
            )}
            {problem.source && (
              <span
                className={`tag tag-clickable ${activeFilter === problem.source ? 'tag-active' : ''}`}
                onClick={() => onTagClick(problem.source)}
              >
                {problem.source}
              </span>
            )}
            {problem.difficulty && (
              <span
                className={`tag tag-clickable ${activeFilter === problem.difficulty ? 'tag-active' : ''}`}
                onClick={() => onTagClick(problem.difficulty)}
              >
                {problem.difficulty}
              </span>
            )}
            {problem.topics && problem.topics.map((topic, i) => (
              <span
                key={i}
                className={`tag tag-clickable ${activeFilter === topic ? 'tag-active' : ''}`}
                onClick={() => onTagClick(topic)}
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecentWriteups;
