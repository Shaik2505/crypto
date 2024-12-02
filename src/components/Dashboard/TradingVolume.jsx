// components/TradingVolume.js
import React from "react";
import Spinner from "../Spinner";

const TradingVolume = ({ loading, data }) => {
  // Fallback data similar to previous examples
  const fallbackData = [
    {
      id: "bitcoin",
      name: "Bitcoin",
      total_volume: 3000000000,
    },
    {
      id: "ethereum",
      name: "Ethereum",
      total_volume: 1500000000,
    },
    {
      id: "litecoin",
      name: "Litecoin",
      total_volume: 500000000,
    },
    {
      id: "solana",
      name: "Solana",
      total_volume: 400000000,
    },
  ];

  // Use the provided data or fallback data if the data is empty
  const tableData = data.length > 0 ? data : fallbackData;

  return (
    <div className="bg-white p-6 rounded-lg border-2 border-blue-400 dark:bg-gradient-to-b from-offBlack to-primary shadow-lg dark:shadow-white">
      <h2 className="text-xl font-bold mb-4 text-blue-500 dark:text-white">Trading Volume</h2>
      {loading ? (
        <Spinner />
      ) : (
        <div className="overflow-auto max-h-[400px]">
          <table className="w-full text-left text-sm text-blue-500 dark:text-white">
            <thead>
              <tr>
                <th className="py-2">Name</th>
                <th className="py-2">24h Trading Volume</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((coin) => (
                <tr key={coin.id}>
                  <td className="py-2">{coin.name}</td>
                  <td className="py-2 text-yellow-400">
                    ${coin.total_volume.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TradingVolume;
