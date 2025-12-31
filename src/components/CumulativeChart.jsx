import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function CumulativeChart({ data, theme }) {
  const isDark = theme === 'dark';

  const chartData = {
    labels: data.dates,
    datasets: [
      {
        label: 'Actual Progress',
        data: data.actual,
        borderColor: isDark ? '#58a6ff' : '#0969da',
        backgroundColor: isDark ? 'rgba(88, 166, 255, 0.1)' : 'rgba(9, 105, 218, 0.1)',
        fill: true,
        tension: 0.1
      },
      {
        label: 'Target (1/day)',
        data: data.trend,
        borderColor: isDark ? '#8b949e' : '#656d76',
        backgroundColor: 'transparent',
        borderDash: [5, 5],
        fill: false,
        tension: 0
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    interaction: {
      intersect: false,
      mode: 'index'
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: isDark ? '#8b949e' : '#656d76' },
        grid: { color: isDark ? '#21262d' : '#d0d7de' }
      },
      x: {
        ticks: {
          color: isDark ? '#8b949e' : '#656d76',
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 10
        },
        grid: { color: isDark ? '#21262d' : '#d0d7de' }
      }
    },
    plugins: {
      legend: {
        labels: { color: isDark ? '#c9d1d9' : '#24292f' }
      }
    }
  };

  return <Line data={chartData} options={options} />;
}

export default CumulativeChart;
