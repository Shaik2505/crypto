import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as PieTooltip,
  ResponsiveContainer,
} from "recharts";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDebounce } from "use-debounce"; // A simple hook for debouncing
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";

function Dashboard() {
  const [portfolioData, setPortfolioData] = useState([]);
  const [marketData, setMarketData] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500); // Debounced search query

  // Fetch portfolio and market data
  useEffect(() => {
    const fetchPortfolioData = async () => {
      setLoading(true);
      try {
        const portfolioResponse = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              ids: "bitcoin,litecoin,ethereum,solana", // Top 4 cryptos
            },
          }
        );

        setPortfolioData(portfolioResponse.data);

        const total = portfolioResponse.data.reduce((acc, item) => {
          return acc + item.current_price * 10; // Assuming 10 units for each coin
        }, 0);

        setTotalBalance(total);
      } catch (error) {
        console.error("Error fetching portfolio data from CoinGecko", error);
      }
      setLoading(false);
    };

    const fetchMarketData = async () => {
      try {
        const marketResponse = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 5,
              page: 1,
            },
          }
        );
        setMarketData(marketResponse.data);
      } catch (error) {
        console.error("Error fetching market data from CoinGecko", error);
      }
    };

    fetchPortfolioData();
    fetchMarketData();
    const interval = setInterval(fetchMarketData, 5000); // Update market data every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter data based on search query
  const filteredData = portfolioData.filter((item) => {
    const lowercasedQuery = debouncedSearchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(lowercasedQuery) ||
      item.symbol.toLowerCase().includes(lowercasedQuery) ||
      item.current_price.toString().includes(lowercasedQuery) ||
      item.market_cap.toString().includes(lowercasedQuery)
    );
  });

  // Pie Chart Colors
  const COLORS = ["#FFBB28", "#00C49F", "#FF8042", "#0088FE"];

  return (
    <div className="pt-20 flex flex-col py-12 min-h-screen bg-white text-blue-500 dark:bg-offBlack dark:text-white">
      {/* Navbar and Profile */}
      <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 items-center justify-between px-8 mb-8 gap-6">
        <input
          type="text"
          placeholder="Search by name, symbol, price, market cap..."
          className="px-4 py-2 rounded-md text-back bg-white border-2 border-blue-400 w-full dark:bg-darkGrey text-white"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Link
          to={"/profile"}
          className="bg-gradient-to-r from-yellow-400 via-primary to-offWhite text-white p-6 sm:p-8 cursor-pointer rounded-lg shadow-xl flex items-center space-x-4 animate-pulse hover:scale-105 duration-200"
        >
          <span className="text-3xl">😎</span>
          <div>
            <div className="text-sm font-semibold">Hello, User!</div>
            <div className="text-xs">Welcome back to your dashboard!</div>
          </div>
        </Link>
      </div>

      {/* Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-8">
        {/* My Portfolio */}
        <div className="bg-white p-6 rounded-lg border-2 border-blue-400 dark:bg-gradient-to-b from-offBlack to-primary shadow-lg dark:shadow-white">
          <h2 className="text-xl font-bold mb-4 text-blue-500 dark:text-white">My Portfolio</h2>
          {loading ? (
            <Spinner />
          ) : (
            <Slider
              dots={true}
              infinite={true}
              speed={500}
              slidesToShow={2}
              slidesToScroll={1}
              autoplay={true}
            >
              {filteredData.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row justify-between py-5 px-4 sm:px-12 border-b border-blue-400 "
                >
                  <div className="text-xl sm:text-2xl font-semibold text-blue-500">
                    {item.name} ({item.symbol.toUpperCase()})
                  </div>
                  <div className="text-lg sm:text-xl text-yellow-400">
                    {`$${item.current_price.toLocaleString()}`}
                  </div>
                  <div
                    className={`${
                      item.price_change_percentage_24h < 0
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {item.price_change_percentage_24h.toFixed(2)}%
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>

        {/* Portfolio Distribution */}
        <div className="bg-white p-6 rounded-lg border-2 border-blue-400 dark:bg-gradient-to-b from-offBlack to-primary shadow-lg dark:shadow-white">
          <h2 className="text-xl font-bold mb-4 text-blue-500 dark:text-white">
            Portfolio Distribution
          </h2>
          {loading ? (
            <Spinner />
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={filteredData}
                  dataKey="current_price"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {filteredData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <PieTooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Market Analysis */}
        <div className="bg-white p-6 rounded-lg border-2 border-blue-400 dark:bg-gradient-to-b from-offBlack to-primary shadow-lg dark:shadow-white  ">
          <h2 className="text-xl font-bold mb-4 text-blue-500 dark:text-white">
            Market Analysis
          </h2>
          {loading ? (
            <Spinner />
          ) : (
            <table className="w-full text-left text-sm text-blue-500 dark:text-white">
              <thead>
                <tr>
                  <th className="py-2">Name</th>
                  <th className="py-2">Price</th>
                  <th className="py-2">24h Change</th>
                </tr>
              </thead>
              <tbody>
                {marketData.map((coin) => (
                  <tr key={coin.id}>
                    <td className="py-2">{coin.name}</td>
                    <td className="py-2">
                      ${coin.current_price.toLocaleString()}
                    </td>
                    <td
                      className={`py-2 ${
                        coin.price_change_percentage_24h < 0
                          ? "text-red-500 font-bold"
                          : "text-green-500"
                      }`}
                    >
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Extended Total Balance */}
        <div className="bg-white p-6 rounded-lg border-2 border-blue-400 dark:bg-gradient-to-b from-offBlack to-primary shadow-lg dark:shadow-white">
          <h2 className="text-xl font-bold mb-4 text-blue-500 dark:text-white">
            Total Balance
          </h2>
          {loading ? (
            <Spinner />
          ) : (
            <div className="text-4xl font-bold text-yellow-800 mb-4 dark:text-offWhite">
              ${totalBalance.toLocaleString()}
            </div>
          )}
          <div className="space-y-2 ">
            <div className="text-green-500 text-xl dark:text-white">+0.25% Today</div>
            <div className="text-green-500 text-xl dark:text-white">+4.25% This Week</div>
            <div className="text-green-500 text-xl dark:text-white">+11.5% This Month</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
