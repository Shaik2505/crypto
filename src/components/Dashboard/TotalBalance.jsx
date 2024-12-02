import React from "react";
import Spinner from "../Spinner";

const TotalBalance = ({ loading, totalBalance, portfolioData }) => {
  return (
    <div className="bg-white p-6 rounded-lg border-2 border-blue-400 dark:bg-gradient-to-b from-offBlack to-primary shadow-lg dark:shadow-white">
      <h2 className="text-xl font-bold mb-4 text-blue-500 dark:text-white">
        Total Portfolio Balance
      </h2>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <div className="mt-4 text-sm text-primary dark:text-white">
            <p>
              Your total portfolio balance is the sum of the current value of
              each cryptocurrency in your portfolio.
            </p>
            <ul className="mt-4">
              {portfolioData.map((coin) => {
                // Find the data for the coin
                const coinData = portfolioData.find(
                  (item) => item.id === coin.id
                );

                // If coin data is not available, display fallback info
                if (!coinData || !coinData.current_price) {
                  return (
                    <li key={coin.id} className="mb-2 text-red-500">
                      <span className="font-semibold">{coin.name}</span>:
                      <span className="text-yellow-400"> Data unavailable</span>
                    </li>
                  );
                }

                const coinValue = coinData.current_price * coin.quantity;

                return (
                  <li key={coin.id} className="mb-2">
                    <span className="font-semibold">{coinData.name}</span>:
                    <span className="text-yellow-400">
                      ${coinValue.toLocaleString()}
                    </span>{" "}
                    ({coin.quantity} units)
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="text-2xl text-yellow-400 font-semibold dark:text-white">
            <span className="text-green-600 dark:text-gray-700 ">Total:</span> $
            {totalBalance.toLocaleString()} {/* Formats the total balance */}
          </div>
        </div>
      )}
    </div>
  );
};

export default TotalBalance;
