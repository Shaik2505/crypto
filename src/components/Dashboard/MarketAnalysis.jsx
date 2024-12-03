import React from "react";
import Spinner from "../Spinner";

const MarketAnalysis = ({ loading, data }) => {
  const fallbackData = [
    {
      id: "bitcoin",
      name: "Bitcoin",
      current_price: 30000,
      price_change_percentage_24h: 2.5,
    },
    {
      id: "ethereum",
      name: "Ethereum",
      current_price: 2000,
      price_change_percentage_24h: -1.2,
    },
    {
      id: "litecoin",
      name: "Litecoin",
      current_price: 150,
      price_change_percentage_24h: 0.8,
    },
    {
      id: "solana",
      name: "Solana",
      current_price: 100,
      price_change_percentage_24h: -0.5,
    },
  ];

  const tableData = data.length > 0 ? data : fallbackData;

  return (
    <div className="bg-white p-6 rounded-lg border-2 border-blue-400 dark:bg-gradient-to-b from-offBlack to-primary shadow-lg dark:shadow-white">
      <h2 className="text-xl font-bold mb-4 text-blue-500 dark:text-white">Market Analysis</h2>
      {loading ? (
        <Spinner />
      ) : (
        <div className="overflow-auto max-h-[400px]">
          <table className="w-full text-left text-sm text-blue-500 dark:text-white">
            <thead>
              <tr>
                <th className="py-2">Name</th>
                <th className="py-2">Price</th>
                <th className="py-2">24h Change</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((coin) => (
                <tr key={coin.id}>
                  <td className="py-2">{coin.name}</td>
                  <td className="py-2 text-yellow-400">
                    ${coin.current_price.toLocaleString()}
                  </td>
                  <td
                    className={`py-2 ${
                      coin.price_change_percentage_24h < 0
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {coin.price_change_percentage_24h !== undefined
                      ? coin.price_change_percentage_24h.toFixed(2)
                      : "N/A"}%
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

export default MarketAnalysis;
