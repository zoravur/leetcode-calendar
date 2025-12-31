function RecentWriteups({ problems }) {
  if (!problems || problems.length === 0) {
    return (
      <div className="writeups">
        <h2>Recent Writeups</h2>
        <p>No problems yet. Run <code>lc new &lt;problem-name&gt;</code> to create your first one!</p>
      </div>
    );
  }

  return (
    <div className="writeups">
      <h2>Recent Writeups</h2>
      {problems.map((problem, index) => (
        <div key={index} className="writeup-item">
          <div className="writeup-date">{problem.date}</div>
          <a
            href={`https://github.com/zoravur/leetcode-calendar/tree/main/problems/${problem.slug}`}
            className="writeup-title"
            target="_blank"
            rel="noopener noreferrer"
          >
            {problem.problem || problem.slug}
          </a>
          <div className="writeup-tags">
            {problem.language && <span className="tag">{problem.language}</span>}
            {problem.source && <span className="tag">{problem.source}</span>}
            {problem.difficulty && <span className="tag">{problem.difficulty}</span>}
            {problem.topics && problem.topics.map((topic, i) => (
              <span key={i} className="tag">{topic}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecentWriteups;
