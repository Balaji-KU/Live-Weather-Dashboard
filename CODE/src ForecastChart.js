import React from "react";
import { Line } from "react-chartjs-2";

const ForecastChart = ({ forecast }) => {
  // prepare data: say take 8 points (next 24 hours, 3h interval)
  const list = forecast.list.slice(0, 8);
  const labels = list.map((item) => {
    const dt = new Date(item.dt * 1000);
    return dt.getHours() + ":00";
  });
  const temps = list.map((item) => item.main.temp);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Temp (°C)",
        data: temps,
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
    ],
  };

  return (
    <div className="chart-container">
      <Line data={chartData} />
    </div>
  );
};

export default ForecastChart;
