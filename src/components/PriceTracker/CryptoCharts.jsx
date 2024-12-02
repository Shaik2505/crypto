import React from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CryptoCharts = ({ coinHistory, filteredCoins, currencySymbols, currency }) => {
  const combinedData = [];

  // Combine the data for all filtered coins
  filteredCoins.forEach((coin) => {
    if (coinHistory[coin.id]) {
      coinHistory[coin.id].forEach((dataPoint, index) => {
        if (!combinedData[index]) {
          combinedData[index] = { time: dataPoint.time };
        }
        combinedData[index][coin.id] = dataPoint.price;
      });
    }
  });

  const colors = ["#82ca9d", "#8884d8", "#ffc658", "#d0ed57", "#a4de6c"]; // Different colors for different coins

  return (
    <div className="mt-8">
      <h2 className="text-2xl mb-4">Price History (7 Days)</h2>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={combinedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip
            formatter={(value) => `${currencySymbols[currency]}${value}`}
          />
          {filteredCoins.map((coin, index) => (
            <Bar
              key={coin.id}
              dataKey={coin.id}
              fill={colors[index % colors.length]} // Use different colors for each coin
              name={coin.name}
              barSize={20} // Thinner bars
            />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CryptoCharts;
