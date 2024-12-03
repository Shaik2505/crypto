import React, { useState, useEffect } from "react";
import CryptoTable from "../components/PriceTracker/CryptoTable";
import CryptoCharts from "../components/PriceTracker/CryptoCharts";

const staticCoins = [
  {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    current_price: 47000,
    market_cap: 880000000000,
    total_volume: 35000000000,
    price_change_percentage_24h: -1.2,
  },
  {
    id: "ethereum",
    symbol: "eth",
    name: "Ethereum",
    current_price: 3200,
    market_cap: 380000000000,
    total_volume: 20000000000,
    price_change_percentage_24h: 2.3,
  },
  {
    id: "litecoin",
    symbol: "ltc",
    name: "Litecoin",
    current_price: 250,
    market_cap: 16000000000,
    total_volume: 3000000000,
    price_change_percentage_24h: 1.1,
  },
  // Add more static coin data as needed
];

const staticCoinHistory = {
  bitcoin: [
    { time: "11/22/2024", price: 47000 },
    { time: "11/23/2024", price: 47200 },
    { time: "11/24/2024", price: 46800 },
    // Add more history data as needed
  ],
  ethereum: [
    { time: "11/22/2024", price: 3200 },
    { time: "11/23/2024", price: 3250 },
    { time: "11/24/2024", price: 3150 },
    // Add more history data as needed
  ],
  litecoin: [
    { time: "11/22/2024", price: 250 },
    { time: "11/23/2024", price: 260 },
    { time: "11/24/2024", price: 240 },
    // Add more history data as needed
  ],
  // Add more coin history as needed
};

const PriceTracking = () => {
  const [coins, setCoins] = useState(staticCoins);
  const [currency, setCurrency] = useState("usd");
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [coinHistory, setCoinHistory] = useState(staticCoinHistory);
  const [loading, setLoading] = useState(false);

  const currencySymbols = {
    usd: "$",
    eur: "€",
    btc: "₿",
  };

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search) ||
      coin.symbol.toLowerCase().includes(search)
  );

  return (
    <div className="pt-12 bg-white text-blue-500 min-h-screen dark:bg-offBlack dark:text-white">
      <div className="container mx-auto p-6">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <h1 className="text-3xl font-bold w-full sm:w-auto md:w-auto">
            Crypto Price Tracker
          </h1>
          <div className="flex items-center space-x-4 w-full sm:w-auto mt-4 sm:mt-0">
            <input
              type="text"
              placeholder="Search coins"
              className="border border-blue-400 p-2 rounded-md bg-white text-blue-500 w-full sm:w-auto"
              onChange={handleSearch}
            />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="border border-blue-400 p-2 rounded-md bg-white text-blue-500 w-full sm:w-auto"
            >
              <option value="usd">USD</option>
              <option value="eur">EUR</option>
              <option value="btc">BTC</option>
            </select>
          </div>
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="spinner-border animate-spin w-16 h-16 border-t-4 border-blue-500 rounded-full"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 items- justify-center gap-8">
            <CryptoTable
              coins={filteredCoins}
              currencySymbols={currencySymbols}
              currency={currency}
            />
            <CryptoCharts
              coinHistory={coinHistory}
              filteredCoins={filteredCoins}
              currencySymbols={currencySymbols}
              currency={currency}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceTracking;
