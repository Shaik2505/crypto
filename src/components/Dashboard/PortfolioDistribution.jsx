import React from "react";
import { PieChart, Pie, Cell, Tooltip as PieTooltip, ResponsiveContainer } from "recharts";
import Spinner from "../Spinner";

const CRYPTO_COLORS = {
  bitcoin: "#F7931A",
  ethereum: "#3C3C3D",
  litecoin: "#A6A9AA",
  solana: "#9945FF",
};

const getFillColor = (name) => CRYPTO_COLORS[name.toLowerCase()] || "#CCCCCC";

const PortfolioDistribution = ({ loading, data }) => {
  const fallbackData = [
    { name: "Bitcoin", value: 30000 },
    { name: "Ethereum", value: 20000 },
    { name: "Litecoin", value: 15000 },
    { name: "Solana", value: 10000 },
  ];

  const chartData = data.length > 0
    ? data.map((item) => ({
        name: item.name,
        value: item.current_price * 10,
      }))
    : fallbackData;

  const renderLabel = ({ name, percent }) =>
    `${name} (${(percent * 100).toFixed(1)}%)`;

  return (
    <div className="bg-white p-6 rounded-lg border-2 border-blue-400 dark:bg-gradient-to-b from-offBlack to-primary shadow-lg dark:shadow-white">
      <h2 className="text-xl font-bold mb-4 text-blue-500 dark:text-white">Portfolio Distribution</h2>
      {loading ? (
        <Spinner />
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              innerRadius={60}
              paddingAngle={5}
              label={renderLabel}
            >
              {chartData.map((item, index) => (
                <Cell key={`cell-${index}`} fill={getFillColor(item.name)} />
              ))}
            </Pie>
            <PieTooltip />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default PortfolioDistribution;
