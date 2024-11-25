import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CryptoTracker = () => {
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState("usd");
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [coinHistory, setCoinHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from API
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets`,
        {
          params: {
            vs_currency: currency,
            order: "market_cap_desc",
            per_page: 10,
            page: 1,
          },
        }
      );
      setCoins(response.data);
      setError("");
      fetchCoinHistory(response.data[0].id); // Fetch history for the first coin
    } catch (error) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  // Fetch price history data for a specific coin
  const fetchCoinHistory = async (coinId) => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`,
        {
          params: {
            vs_currency: currency,
            days: 7, // Fetching 7-day history
          },
        }
      );
      const formattedData = response.data.prices.map(([time, price]) => ({
        time: new Date(time).toLocaleDateString(),
        price,
      }));
      setCoinHistory(formattedData);
    } catch (error) {
      setError("Error fetching coin history");
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [currency]);

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search) ||
      coin.symbol.toLowerCase().includes(search)
  );

  return (
    <div className="pt-12 bg-white text-blue-500 min-h-screen dark:bg-offBlack dark:text-white ">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Crypto Price Tracker</h1>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search coins"
              className="border border-blue-400 p-2 rounded-md bg-white text-blue-500"
              onChange={handleSearch}
            />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="border border-blue-400 p-2 rounded-md bg-white text-blue-500"
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
          <>
            <div className="overflow-x-auto mb-8">
              <table className="table-auto w-full text-center ">
                <thead>
                  <tr>
                    <th className="border border-blue-400 hover:bg-blue-400 cursor hover:text-white px-4 py-2 ">Name</th>
                    <th className="border border-blue-400 hover:bg-blue-400 cursor hover:text-white px-4 py-2">Price</th>
                    <th className="border border-blue-400 hover:bg-blue-400 cursor hover:text-white px-4 py-2">Market Cap</th>
                    <th className="border border-blue-400 hover:bg-blue-400 cursor hover:text-white px-4 py-2">Volume</th>
                    <th className="border border-blue-400 hover:bg-blue-400 cursor hover:text-white px-4 py-2">24h Change (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCoins.map((coin) => (
                    <tr
                      key={coin.id}
                      className="hover:bg-blue-100 cursor-pointer dark:hover:bg-darkGrey"
                    >
                      <td className="border border-blue-400 px-4 py-2">
                        {coin.name} ({coin.symbol.toUpperCase()})
                      </td>
                      <td className="border border-blue-400 px-4 py-2">
                        ${coin.current_price}
                      </td>
                      <td className="border border-blue-400 px-4 py-2">
                        ${coin.market_cap.toLocaleString()}
                      </td>
                      <td className="border border-blue-400 px-4 py-2">
                        ${coin.total_volume.toLocaleString()}
                      </td>
                      <td
                        className={`border border-blue-400 px-4 py-2 ${
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

            <div className="mt-8">
              <h2 className="text-2xl mb-4">Price History (7 Days)</h2>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={coinHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="#8884d8"
                    fill="url(#gradient)"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
              {filteredCoins.map((coin) => (
                <div
                  key={coin.id}
                  className="rounded-lg p-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-xl transition-shadow "
                >
                  <h2 className="text-xl font-semibold">
                    {coin.name} ({coin.symbol.toUpperCase()})
                  </h2>
                  <p className="text-lg mt-2">Price: ${coin.current_price}</p>
                  <p className="mt-1">
                    Market Cap: ${coin.market_cap.toLocaleString()}
                  </p>
                  <p className="mt-1">
                    24h Volume: ${coin.total_volume.toLocaleString()}
                  </p>
                  <p
                    className={`mt-1 ${
                      coin.price_change_percentage_24h >= 0
                        ? "text-green-500"
                        : "text-red-500 font-bold"
                    }`}
                  >
                    24h Change: {coin.price_change_percentage_24h.toFixed(2)}%
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CryptoTracker;
