import React, { useState, useEffect } from "react";
import { FaBell, FaSearch, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import ThemeBtn from "./ThemeBtn";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Popup visibility
  const [searchQuery, setSearchQuery] = useState(""); // Search input state
  const [cryptoData, setCryptoData] = useState([]); // Cryptocurrency data
  const [initialData, setInitialData] = useState([]); // Initial data for display

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Retry logic for API requests in case of rate-limiting
  const fetchWithRetry = (url, options, retries = 3, delay = 1000) => {
    return new Promise((resolve, reject) => {
      fetch(url, options)
        .then((response) => {
          if (response.status === 429 && retries > 0) {
            setTimeout(() => {
              fetchWithRetry(url, options, retries - 1, delay).then(resolve).catch(reject);
            }, delay);
          } else if (response.ok) {
            resolve(response.json());
          } else {
            reject(new Error(`Request failed with status ${response.status}`));
          }
        })
        .catch(reject);
    });
  };

  // Fetch initial cryptocurrency data to display in the modal
  useEffect(() => {
    const cachedData = localStorage.getItem("cryptoData");

    if (cachedData) {
      // Use cached data if available
      setInitialData(JSON.parse(cachedData));
    } else {
      // Construct the query string
      const url = new URL("https://api.coingecko.com/api/v3/coins/markets");
      const params = {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 5,
        page: 1,
      };
      url.search = new URLSearchParams(params).toString(); // Add query parameters to the URL

      fetchWithRetry(url.toString(), {
        method: "GET",
      })
        .then((data) => {
          console.log("Initial data fetched:", data); // Log the initial data
          setInitialData(data);
          // Cache the data for future use
          localStorage.setItem("cryptoData", JSON.stringify(data));
        })
        .catch((error) => console.error("Error fetching initial data:", error));
    }
  }, []);

  // API call to fetch cryptocurrency data based on the search query
  useEffect(() => {
    if (searchQuery.length > 0) {
      fetchWithRetry(`https://api.coingecko.com/api/v3/search?query=${searchQuery}`)
        .then((data) => {
          console.log("Search data fetched:", data); // Log the search data
          setCryptoData(data.coins || []); // Ensure we handle the response correctly
        })
        .catch((error) => console.error("Error fetching data:", error));
    } else {
      setCryptoData([]); // Clear search results when query is empty
    }
  }, [searchQuery]);

  const navLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/pricetracking", label: "Price Tracking" },
    { to: "/profile", label: <FaSearch size={25} onClick={() => setIsSearchOpen(!isSearchOpen)} /> }, // Open/close the search popup
    { to: "/notification", label: <FaBell size={25} /> },
    { to: "/profile", label: <FaUser size={25} /> },
  ];

  const buttonClasses =
    "text-sm text-primary rounded-md bg-white py-2 px-4 dark:bg-primary dark:text-white transition-all duration-300 transform hover:scale-105";

  return (
    <div className="bg-primary text-white fixed top-0 w-full z-50 shadow-md dark:bg-darkGrey">
      <div className="container  mx-auto flex flex-wrap justify-between items-center p-4 transition-all duration-500">
        <Link to={"/"}>
          <div className="text-lg font-bold text-yellow-300 hover:text-white transition-all duration-300">
            Techno Clone
          </div>
        </Link>
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link, index) => (
            <Link key={index} to={link.to} className="hover:text-offWhite transition-all duration-300" onClick={() => setIsSidebarOpen(false)}>
              {link.label}
            </Link>
          ))}
          <ThemeBtn className="mb-2" />
          <Link to={"/"} className="hover:text-offWhite">
            <button className={buttonClasses}>Log Out</button>
          </Link>
        </div>

        <div className="md:hidden cursor-pointer" onClick={toggleSidebar}>
          {isSidebarOpen ? "✖" : "☰"}
        </div>
      </div>

      {isSidebarOpen && (
        <div className="md:hidden flex items-center flex-col gap-2 bg-gray-700 w-full p-4 transition-all duration-500">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsSidebarOpen(false)} // Collapse sidebar on link click
              className="block text-sm text-white py-2 hover:text-offWhite transition-all duration-300"
            >
              {link.label}
            </Link>
          ))}
          <ThemeBtn />
          <Link to={"/"}>
            <button className={`${buttonClasses} mt-4`}>Log Out</button>
          </Link>
        </div>
      )}

      {/* Search Popup with transition */}
      {isSearchOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-1/2 max-h-[80vh] overflow-y-auto transition-transform duration-500 transform scale-110">
            <input
              type="text"
              className="w-full p-2 border text-black border-gray-300 rounded-md"
              placeholder="Search for cryptocurrencies"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Initial Data (Table) */}
            {searchQuery.length === 0 && initialData.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-bold mb-2">Top Cryptocurrencies</h3>
                <table className="w-full table-auto border-collapse">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border">Name</th>
                      <th className="py-2 px-4 border">Price (USD)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {initialData.map((crypto) => (
                      <tr key={crypto.id} className="hover:bg-gray-100 transition-all duration-300">
                        <td className="py-2 px-4 border">{crypto.name}</td>
                        <td className="py-2 px-4 border">${crypto.current_price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Search Results */}
            <div className="mt-4">
              {cryptoData.length > 0 ? (
                <ul>
                  {cryptoData.map((crypto) => (
                    <li
                      key={crypto.id}
                      className="flex justify-between p-2 text-black hover:bg-gray-200 rounded-md transition-all duration-300"
                    >
                      <span>{crypto.name}</span>
                      <span>{crypto.current_price ? `$${crypto.current_price}` : "N/A"}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No results found</p>
              )}
            </div>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="mt-4 w-full py-2 bg-blue-500 text-white rounded-md transition-all duration-300 hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
