<<<<<<< HEAD
// src/components/SpendingChart.js
/*
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SpendingChart = ({ transactions }) => {
  if (!transactions || transactions.length === 0) {
    return <p style={{ textAlign: 'center' }}>No transactions available to display chart.</p>;
  }

  // Extract unique categories
  const categories = [...new Set(transactions.map((t) => t.category))];

  // Prepare data for the chart
  const data = {
    labels: categories,
    datasets: [
      {
        label: 'Spending by Category',
        data: categories.map((category) =>
          transactions
            .filter((t) => t.category === category)
            .reduce((sum, t) => sum + t.amount, 0)
        ),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="chart-container">
      <h2>Spending Overview</h2>
      <Bar data={data} />
    </div>
  );
};

export default SpendingChart;
=======
// src/components/SpendingChart.js
/*
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SpendingChart = ({ transactions }) => {
  if (!transactions || transactions.length === 0) {
    return <p style={{ textAlign: 'center' }}>No transactions available to display chart.</p>;
  }

  // Extract unique categories
  const categories = [...new Set(transactions.map((t) => t.category))];

  // Prepare data for the chart
  const data = {
    labels: categories,
    datasets: [
      {
        label: 'Spending by Category',
        data: categories.map((category) =>
          transactions
            .filter((t) => t.category === category)
            .reduce((sum, t) => sum + t.amount, 0)
        ),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="chart-container">
      <h2>Spending Overview</h2>
      <Bar data={data} />
    </div>
  );
};

export default SpendingChart;
>>>>>>> 57f81fe8120fb207422d8efecef0bc43655bf735
*/