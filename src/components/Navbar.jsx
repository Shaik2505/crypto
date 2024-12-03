import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import ThemeBtn from "./ThemeBtn";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cryptoData, setCryptoData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const sidebarRef = useRef(null);
  const modalRef = useRef(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const openSearchModal = () => {
    setIsSearchOpen(true);
    setIsSidebarOpen(false); // Ensure the sidebar closes
  };

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsSearchOpen(false);
      setSearchQuery("");
      setCryptoData([]);
    }
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchWithRetry = (url, options, retries = 3, delay = 1000) => {
    return new Promise((resolve, reject) => {
      fetch(url, options)
        .then((response) => {
          if (response.status === 429 && retries > 0) {
            setTimeout(() => {
              fetchWithRetry(url, options, retries - 1, delay)
                .then(resolve)
                .catch(reject);
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

  useEffect(() => {
    const cachedData = localStorage.getItem("cryptoData");
    if (cachedData) {
      setInitialData(JSON.parse(cachedData));
    } else {
      const url = new URL("https://api.coingecko.com/api/v3/coins/markets");
      const params = {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 5,
        page: 1,
      };
      url.search = new URLSearchParams(params).toString();

      fetchWithRetry(url.toString(), { method: "GET" })
        .then((data) => {
          setInitialData(data);
          localStorage.setItem("cryptoData", JSON.stringify(data));
        })
        .catch((error) => console.error("Error fetching initial data:", error));
    }
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      fetchWithRetry(
        `https://api.coingecko.com/api/v3/search?query=${searchQuery}`
      )
        .then((data) => setCryptoData(data.coins || []))
        .catch((error) => console.error("Error fetching data:", error));
    } else {
      setCryptoData([]);
    }
  }, [searchQuery]);

  const navLinks = [
    { to: "/dashboard", label: "Dashboard", key: "dashboard" },
    { to: "/pricetracking", label: "Price Tracking", key: "pricetracking" },
    { to: "/notification", label: "Notification", key: "notification" },
    { to: "/profile", label: "Profile", key: "profile" },
  ];

  const buttonClasses =
    "text-sm text-primary rounded-md bg-white py-2 px-4 dark:bg-primary dark:text-white transition-all duration-300 transform hover:scale-105";

  return (
    <div className="bg-primary text-white fixed top-0 w-full z-50 shadow-md dark:bg-darkGrey">
      <div className="container mx-auto flex flex-wrap justify-between items-center p-4">
        <Link
          to="/dashboard"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="text-lg font-bold text-white dark:text-primary transition-all duration-300">
            Techno Clone
          </div>
        </Link>
        <div className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <React.Fragment key={link.key}>
              <Link
                to={link.to}
                className="hover:text-offWhite transition-all duration-300"
              >
                {link.label}
              </Link>
            </React.Fragment>
          ))}
          <FaSearch
            size={25}
            className="cursor-pointer hover:text-offWhite transition-all duration-300"
            onClick={openSearchModal}
          />
          <ThemeBtn className="mb-2" />
          <Link to={"/"} className="hover:text-offWhite">
            <button className={buttonClasses}>Log Out</button>
          </Link>
        </div>
        <div className="md:hidden cursor-pointer flex gap-2 items-center">
          <FaSearch
            size={25}
            className="cursor-pointer hover:text-offWhite transition-all duration-300"
            onClick={openSearchModal}
          />
          <ThemeBtn />
          <span className="text-xl font-bold" onClick={toggleSidebar}>
            {isSidebarOpen ? "✖" : "☰"}
          </span>
        </div>
      </div>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40">
          <div
            ref={sidebarRef}
            className="flex items-center flex-col gap-2 bg-gray-700 w-full p-4"
          >
            {navLinks.map((link) => (
              <React.Fragment key={link.key}>
                <Link
                  to={link.to}
                  onClick={() => setIsSidebarOpen(false)}
                  className="block text-sm text-white py-2 hover:text-offWhite"
                >
                  {link.label}
                </Link>
              </React.Fragment>
            ))}
            <Link to={"/"}>
              <button className={`${buttonClasses} mt-4`}>Log Out</button>
            </Link>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center pointer-events-auto">
          <div
            ref={modalRef}
            className="relative w-11/12 sm:w-1/2 lg:w-1/3 bg-white text-black rounded-lg shadow-lg p-6 max-h-[80vh] overflow-y-auto dark:bg-darkGrey"
          >
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
              onClick={() => {
                setIsSearchOpen(false);
                setSearchQuery("");
                setCryptoData([]);
              }}
            >
              ✖
            </button>
            <h3 className="text-lg font-bold text-primary mb-4">
              Search Cryptocurrencies
            </h3>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md dark:bg-offBlack dark:text-white"
              placeholder="Search for cryptocurrencies"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <ul className="mt-4 space-y-2">
              {(searchQuery.length > 0 ? cryptoData : initialData).map(
                (crypto) => (
                  <li
                    key={crypto.id}
                    className="flex justify-between p-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-all duration-300 dark:bg-offBlack dark:text-white"
                  >
                    <span>{crypto.name}</span>
                    <span>
                      {crypto.current_price
                        ? `$${crypto.current_price}`
                        : "N/A"}
                    </span>
                  </li>
                )
              )}
            </ul>
            {cryptoData.length === 0 && searchQuery.length > 0 && (
              <p className="text-gray-500 mt-4">No results found</p>
            )}
            <button
              onClick={() => {
                setIsSearchOpen(false);
                setSearchQuery("");
                setCryptoData([]);
              }}
              className="mt-6 w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
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
