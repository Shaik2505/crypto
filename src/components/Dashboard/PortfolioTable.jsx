import React from "react";
import Spinner from "../Spinner";

const PortfolioTable = ({ loading, data }) => {
  // Fallback data similar to PortfolioDistribution
  const fallbackData = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      current_price: 30000,
      price_change_percentage_24h: 2.5,
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      current_price: 20000,
      price_change_percentage_24h: -1.2,
    },
    {
      name: "Litecoin",
      symbol: "LTC",
      current_price: 15000,
      price_change_percentage_24h: 3.1,
    },
    {
      name: "Solana",
      symbol: "SOL",
      current_price: 10000,
      price_change_percentage_24h: 0.5,
    },
  ];

  // Use the provided data or fallback data if the data is empty
  const tableData = data.length > 0 ? data : fallbackData;

  return (
    <div className="bg-white p-6 rounded-lg border-2 border-blue-400 dark:bg-gradient-to-b from-offBlack to-primary shadow-lg dark:shadow-white">
      <h2 className="text-xl font-bold mb-4 text-blue-500 dark:text-white">My Portfolio</h2>
      {loading ? (
        <Spinner />
      ) : (
        <div className="overflow-auto max-h-[400px]">
          <table className="min-w-full text-left text-sm text-blue-500 dark:text-white">
            <thead>
              <tr>
                <th className="py-2">Name</th>
                <th className="py-2">Symbol</th>
                <th className="py-2">Price</th>
                <th className="py-2">24h Change</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <tr key={index} className="border-b border-blue-400">
                  <td className="py-2">{item.name}</td>
                  <td className="py-2">{item.symbol ? item.symbol.toUpperCase() : "N/A"}</td>
                  <td className="py-2 text-yellow-400">${item.current_price.toLocaleString()}</td>
                  <td
                    className={`py-2 ${
                      item.price_change_percentage_24h < 0 ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {item.price_change_percentage_24h !== undefined
                      ? item.price_change_percentage_24h.toFixed(2)
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

export default PortfolioTable;
