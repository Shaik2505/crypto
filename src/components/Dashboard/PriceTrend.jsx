import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Spinner from "../Spinner";

const PriceTrend = ({ loading, data }) => {
  const fallbackData = [
    { name: "Bitcoin", price: 30000, time: "10:00 AM" },
    { name: "Ethereum", price: 2000, time: "10:00 AM" },
    { name: "Litecoin", price: 150, time: "10:00 AM" },
    { name: "Solana", price: 100, time: "10:00 AM" },
  ];

  const trendData =
    data.length > 0
      ? data.map((item) => ({
          name: item.name,
          price: item.current_price,
          time: new Date().toLocaleTimeString(),
        }))
      : fallbackData;

  return (
    <div className="bg-white p-6 rounded-lg border-2 border-blue-400 dark:bg-gradient-to-b from-offBlack to-primary shadow-lg dark:shadow-white ">
      <h2 className="text-xl font-bold mb-4 text-blue-500 dark:text-white">
        Price Trend
      </h2>
      {loading ? (
        <Spinner />
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <CartesianGrid
              strokeDasharray="3 3"
              className="dark:stroke-gray-200 "
            />
            <XAxis
              dataKey="time"
              tick={{ fill: "orange" }}
              
            />
            <YAxis
              tick={{ fill: "orange" }}
              
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                borderColor: "#4b5563",
                color: "#ffffff",
              }}
              itemStyle={{
                color: "#fffff",
              }}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ fill: "#8884d8", r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default PriceTrend;
