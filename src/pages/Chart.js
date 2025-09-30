import { Chart as ChartJS } from 'chart.js/auto';
import { Bar, Line, Pie, Doughnut, Radar, PolarArea, Scatter, Bubble } from 'react-chartjs-2';

const MyChart = () => {
  const data = {
    labels: ['Presidents', 'Countries', 'Richest', 'Biographies', 'World Records'],
    datasets: [
      {
        label: 'APIs',
        data: [9, 19, 25, 15, 16],
      },
    ],
  };

  return <Doughnut data={data} style={{ width: '100%', height: '' }} />;
};

export default MyChart;
