import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

function GitHubHeatmap({ data }) {
  const currentYear = new Date().getFullYear();
  const startDate = new Date(currentYear, 0, 1);
  const endDate = new Date(currentYear, 11, 31);

  const getClassForValue = (value) => {
    if (!value || value.count === 0) return 'color-empty';
    if (value.count === 1) return 'color-scale-1';
    if (value.count === 2) return 'color-scale-2';
    if (value.count === 3) return 'color-scale-3';
    return 'color-scale-4';
  };

  const tooltipDataAttrs = (value) => {
    if (!value || !value.date) return null;
    return {
      'data-tip': `${value.date}: ${value.count || 0} problem${value.count !== 1 ? 's' : ''}`
    };
  };

  return (
    <div className="heatmap-container">
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={data}
        classForValue={getClassForValue}
        tooltipDataAttrs={tooltipDataAttrs}
        showWeekdayLabels={true}
      />
      <div className="heatmap-legend">
        <span>Less</span>
        <div className="legend-box color-empty"></div>
        <div className="legend-box color-scale-1"></div>
        <div className="legend-box color-scale-2"></div>
        <div className="legend-box color-scale-3"></div>
        <div className="legend-box color-scale-4"></div>
        <span>More</span>
      </div>
    </div>
  );
}

export default GitHubHeatmap;
