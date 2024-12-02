import React from 'react';

const CryptoTable = ({ coins, currencySymbols, currency }) => {
  return (
    <div className="overflow-x-auto mb-8">
      <table className="table-auto w-full text-center">
        <thead>
          <tr>
            <th className="border border-blue-400 px-2 py-1 text-xs sm:text-sm">
              Name
            </th>
            <th className="border border-blue-400 px-2 py-1 text-xs sm:text-sm">
              Price
            </th>
            <th className="border border-blue-400 px-2 py-1 text-xs sm:text-sm">
              Market Cap
            </th>
            <th className="border border-blue-400 px-2 py-1 text-xs sm:text-sm">
              Volume
            </th>
            <th className="border border-blue-400 px-2 py-1 text-xs sm:text-sm">
              24h Change (%)
            </th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr
              key={coin.id}
              className="hover:bg-blue-100 cursor-pointer dark:hover:bg-darkGrey"
            >
              <td className="border border-blue-400 px-2 py-1 text-xs sm:text-sm">
                {coin.name} ({coin.symbol.toUpperCase()})
              </td>
              <td className="border border-blue-400 px-2 py-1 text-xs sm:text-sm">
                {currencySymbols[currency]}
                {coin.current_price}
              </td>
              <td className="border border-blue-400 px-2 py-1 text-xs sm:text-sm">
                {currencySymbols[currency]}
                {coin.market_cap.toLocaleString()}
              </td>
              <td className="border border-blue-400 px-2 py-1 text-xs sm:text-sm">
                {currencySymbols[currency]}
                {coin.total_volume.toLocaleString()}
              </td>
              <td
                className={`border border-blue-400 px-2 py-1 text-xs sm:text-sm ${
                  coin.price_change_percentage_24h >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;
