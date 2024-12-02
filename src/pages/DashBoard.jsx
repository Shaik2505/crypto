import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDebounce } from "use-debounce";
import { Link } from "react-router-dom";
import PortfolioTable from "../components/Dashboard/PortfolioTable";
import PortfolioDistribution from "../components/Dashboard/PortfolioDistribution";
import MarketAnalysis from "../components/Dashboard/MarketAnalysis";
import PriceTrend from "../components/Dashboard/PriceTrend";
import MarketComparison from "../components/Dashboard/MarketComparison";
import TradingVolume from "../components/Dashboard/TradingVolume";
import TotalBalance from "../components/Dashboard/TotalBalance";

function Dashboard() {
  const [portfolioData, setPortfolioData] = useState([]);
  const [marketData, setMarketData] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  const portfolio = [
    { id: "bitcoin", quantity: 10 },
    { id: "litecoin", quantity: 10 },
    { id: "ethereum", quantity: 10 },
    { id: "solana", quantity: 10 },
  ];

  const dummyData = [
    { id: "bitcoin", current_price: 30000, name: "Bitcoin" },
    { id: "litecoin", current_price: 150, name: "Litecoin" },
    { id: "ethereum", current_price: 2000, name: "Ethereum" },
    { id: "solana", current_price: 100, name: "Solana" },
  ];

  const fetchWithRetry = async (url, options = {}, retries = 3, delay = 1000) => {
    try {
      const response = await axios(url, options);
      return response;
    } catch (error) {
      if (retries > 0 && error.response && error.response.status === 429) {
        // Extract the 'Retry-After' header if available (in seconds)
        const retryAfter = error.response.headers["retry-after"]
          ? parseInt(error.response.headers["retry-after"], 10) * 1000 // Convert to ms
          : delay;

        console.log(`Rate limit exceeded, retrying after ${retryAfter}ms...`);
        await new Promise((resolve) => setTimeout(resolve, retryAfter)); // Wait before retrying
        return fetchWithRetry(url, options, retries - 1, retryAfter);
      } else {
        throw error; // Rethrow if no retries left or error is not 429
      }
    }
  };

  useEffect(() => {
    const fetchPortfolioData = async () => {
      setLoading(true);
      try {
        const portfolioResponse = await fetchWithRetry(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              ids: portfolio.map((coin) => coin.id).join(","),
            },
          }
        );

        if (portfolioResponse.data.length > 0) {
          setPortfolioData(portfolioResponse.data);
        } else {
          setPortfolioData(dummyData);
        }

        // Calculate the total portfolio value (assuming 10 units of each coin)
        const total = (portfolioResponse.data.length > 0 ? portfolioResponse.data : dummyData).reduce(
          (acc, item) => {
            const coin = portfolio.find((c) => c.id === item.id);
            return acc + item.current_price * coin.quantity;
          },
          0
        );

        setTotalBalance(total);
      } catch (error) {
        console.error("Error fetching portfolio data, using dummy data", error);
        setPortfolioData(dummyData);
        const total = dummyData.reduce((acc, item) => {
          const coin = portfolio.find((c) => c.id === item.id);
          return acc + item.current_price * coin.quantity;
        }, 0);
        setTotalBalance(total);
      }
      setLoading(false);
    };

    const fetchMarketData = async () => {
      try {
        const marketResponse = await fetchWithRetry(
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
        console.error("Error fetching market data", error);
      }
    };

    fetchPortfolioData();
    fetchMarketData();

    const interval = setInterval(fetchMarketData, 60000); // Refresh market data every 60 seconds
    return () => clearInterval(interval);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = portfolioData.filter((item) => {
    const lowercasedQuery = debouncedSearchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(lowercasedQuery) ||
      item.symbol.toLowerCase().includes(lowercasedQuery) ||
      item.current_price.toString().includes(lowercasedQuery) ||
      item.market_cap.toString().includes(lowercasedQuery)
    );
  });

  return (
    <div className="pt-20 flex flex-col py-12 min-h-screen bg-white text-blue-500 dark:bg-offBlack dark:text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 items-center justify-between px-8 mb-8 gap-6">
        <input
          type="text"
          placeholder="Search by name, symbol, price, market cap..."
          className="px-4 py-2 rounded-md text-black bg-white border-2 border-blue-400 w-full dark:bg-darkGrey dark:text-white"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Link
          to={"/profile"}
          className="bg-gradient-to-r from-yellow-200 via-primary to-offWhite text-white p-6 sm:p-8 cursor-pointer rounded-lg shadow-xl flex items-center space-x-4 animate-pulse hover:scale-105 duration-200"
        >
          <span className="text-3xl">😎</span>
          <div>
            <div className="text-sm font-semibold">Hello, User!</div>
            <div className="text-xs">Welcome back to your dashboard!</div>
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-8">
        <PortfolioTable loading={loading} data={filteredData} />
        <PortfolioDistribution loading={loading} data={filteredData} />
        <MarketAnalysis loading={loading} data={marketData} />
        <PriceTrend loading={loading} data={filteredData} />
        <MarketComparison loading={loading} data={marketData} />
        <TradingVolume loading={loading} data={filteredData} />
        <TotalBalance loading={loading} totalBalance={totalBalance} portfolioData={portfolioData} />
      </div>
    </div>
  );
}

export default Dashboard;
