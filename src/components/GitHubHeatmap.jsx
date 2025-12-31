import { useMemo, useEffect, useRef } from 'react';
import ActivityCalendar from 'react-activity-calendar';

function GitHubHeatmap({ data, theme, dateRange }) {
  const isDark = theme === 'dark';
  const containerRef = useRef(null);

  // Filter data based on dateRange query params
  const filteredData = useMemo(() => {
    if (!dateRange?.from && !dateRange?.to) {
      return data;
    }

    const fromDate = dateRange.from ? new Date(dateRange.from) : null;
    const toDate = dateRange.to ? new Date(dateRange.to) : null;

    return data.filter(item => {
      const itemDate = new Date(item.date);
      if (fromDate && itemDate < fromDate) return false;
      if (toDate && itemDate > toDate) return false;
      return true;
    });
  }, [data, dateRange]);

  // GitHub theme colors
  const explodingSquareTheme = isDark
    ? {
        light: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
        dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
      }
    : {
        light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
        dark: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39']
      };

  // Scroll to right (most recent) on mount
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = containerRef.current.scrollWidth;
    }
  }, []);

  // Don't render if there's no data
  if (filteredData.length === 0) {
    return (
      <div className="heatmap-container" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
        No activity data yet. Start solving problems!
      </div>
    );
  }

  return (
    <div className="heatmap-container" ref={containerRef}>
      <ActivityCalendar
        data={filteredData}
        theme={explodingSquareTheme}
        colorScheme={isDark ? 'dark' : 'light'}
        blockSize={12}
        blockMargin={4}
        fontSize={14}
        hideColorLegend={false}
        hideTotalCount={false}
        showWeekdayLabels={true}
      />
    </div>
  );
}

export default GitHubHeatmap;
