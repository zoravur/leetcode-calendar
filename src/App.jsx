import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useSearchParams } from 'react-router-dom';
import Home from './components/Home';
import ProblemDetail from './components/ProblemDetail';
import WriteupsList from './components/WriteupsList';

function HomeWrapper({ data, theme }) {
  const [searchParams] = useSearchParams();
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  const dateRange = {
    from: from || null,
    to: to || null
  };

  return <Home data={data} theme={theme} dateRange={dateRange} />;
}

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
    <BrowserRouter>
      <div className="app">
        <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        <Routes>
          <Route path="/leetcode-calendar/" element={<HomeWrapper data={data} theme={theme} />} />
          <Route
            path="/leetcode-calendar/writeups"
            element={<WriteupsList problems={data.problems} />}
          />
          <Route
            path="/leetcode-calendar/problems/:slug"
            element={<ProblemDetail problems={data.problems} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
