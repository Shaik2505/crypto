import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaBitcoin,
  FaMobileAlt,
  FaShieldAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import ThemeBtn from "../components/ThemeBtn";
import Footer from "../components/Footer";

const Landing = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Toggles the mobile menu
  const toggleMobileMenu = () => {
    return setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Closes the mobile menu
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Smooth scrolling function
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    closeMobileMenu();
  };

  useEffect(() => {
    // Fetch data from CoinGecko
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 10, // Number of cryptocurrencies to fetch
              page: 1,
              sparkline: false,
            },
          }
        );
        setCryptoData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cryptocurrency data:", error);
        setLoading(false);
      }
    };
    fetchCryptoData();
  }, []);

  const formInputStyle = "w-full px-4 py-2 mt-2 border rounded-md bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:text-darkGrey"

  return (
    <div className="bg-white text-primary font-sans dark:bg-gray-800">
      {/* Navbar */}
      <nav className="sticky top-0 z-10 bg-primary text-offWhite px-4 py-3 flex justify-between items-center dark:bg-darkGrey">
        {/* Logo */}
        <Link
          onClick={() => scrollToSection("home")}
          className="flex items-center space-x-4"
        >
          <img src="" alt="Techno Logo" className="h-8" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-4 items-center">
          <Link
            onClick={() => scrollToSection("home")}
            className="cursor-pointer"
          >
            Home
          </Link>
          <Link
            onClick={() => scrollToSection("about")}
            className="cursor-pointer"
          >
            About
          </Link>
          <Link
            onClick={() => scrollToSection("contact")}
            className="cursor-pointer"
          >
            Contact Us
          </Link>

          {/* Buttons */}
          <div className="hidden md:flex space-x-4">
            <span>
              <ThemeBtn className="pt-2" />
            </span>
            <Link
              to={"/form"}
              className="bg-white text-primary px-4 py-2 rounded-md transform hover:scale-105 hover:bg-primary/80 transition-transform border border-white hover:shadow-sm duration-500 hover:shadow-darkGray hover:text-white dark:bg-darkGray"
            >
              Sign Up
            </Link>
            <Link
              to={"/form"}
              className="border border-white text-white px-4 py-2 rounded-md transform hover:scale-105 hover:bg-white hover:text-primary transition-transform duration-500 dark:text-primary dark:border-primary"
            >
              Log In
            </Link>
          </div>
        </div>

        {/* Burger Menu Icon */}
        <div className="md:hidden">
          <ThemeBtn className="px-2" />
          <button
            onClick={toggleMobileMenu}
            className="text-white text-2xl dark:text-offWhite"
          >
            <FaBars />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="bg-primary md:hidden fixed inset-0 flex flex-col items-center space-y-6 pt-20 z-50 dark:bg-offBlack">
          <ul className="space-y-4">
            <li
              className=" text-white hover:text-primary cursor-pointer transition-all duration-300"
              onClick={() => scrollToSection("about")}
            >
              About
            </li>
            <li
              className="text-white hover:text-primary cursor-pointer transition-all duration-300"
              onClick={() => scrollToSection("contact")}
            >
              Contact Us
            </li>
          </ul>
          <div className="space-y-4">
            <Link
              to={"/form"}
              className="bg-white text-primary mr-2 px-4 py-2 rounded-md transform hover:scale-105 hover:primary transition-transform duration-300 dark:text-offBlack"
              onClick={closeMobileMenu}
            >
              Sign Up
            </Link>
            <Link
              to={"/form"}
              className="border border-white text-white px-4 py-2 rounded-md transform hover:scale-105 transition-transform duration-300 dark:"
              onClick={closeMobileMenu}
            >
              Log In
            </Link>
            <div to={"/"} className="flex justify-center items-center">
              <FaTimes
                className="text-white size-9 mt-5"
                onClick={closeMobileMenu}
              />
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <header
        id="home"
        className="bg-white text-center py-20 animate-fade-in dark:bg-offBlack"
      >
        <h1 className="text-4xl font-bold m-4">
          Buy, Trade, and Hold 350+ Cryptocurrencies
        </h1>
        <p className="text-gray-400 mb-6">
          Join millions of users in the world's leading crypto exchange.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-primary text-white border hover:border-primary px-6 py-3 rounded-md transform hover:scale-110 hover:bg-white dark:bg-primary/50 hover:text-primary transition-transform duration-500">
            Get Started
          </button>
          <button className="border border-primary px-6 py-3 rounded-md transform hover:scale-110 hover:text-white hover:bg-primary transition-transform duration-500 dark:hover:bg-primary dark:hover:text-white">
            Learn More
          </button>
        </div>
      </header>

      {/* About Section */}

      <section className="py-16" id="about">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose CryptoX?
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Secure Transactions",
                description:
                  "Experience the highest level of security for your transactions.",
                icon: "🔒",
              },
              {
                title: "Low Fees",
                description: "Save more with competitive transaction fees.",
                icon: "💰",
              },
              {
                title: "Global Access",
                description:
                  "Trade and invest from anywhere in the world, anytime.",
                icon: "🌍",
              },
              {
                title: "Real-Time Insights",
                description:
                  "Get live market data and trends for better decision-making.",
                icon: "📈",
              },
              {
                title: "Decentralized",
                description: "Power your investments through blockchain tech.",
                icon: "🌐",
              },
              {
                title: "24/7 Support",
                description: "Our team is here to help you, around the clock.",
                icon: "📞",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg text-center dark:bg-darkGrey"
              >
                <div className="text-4xl">{feature.icon}</div>
                <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact us */}
      {/* Contact Us Section */}
      <section
        id="contact"
        className="py-16 px-6 bg-gray-100 dark:bg-darkGrey text-primary"
      >
        <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
        <p className="text-center text-gray-500 mb-8">
          We'd love to hear from you! Please fill out the form below and we will
          get back to you as soon as possible.
        </p>

        {/* Contact Form */}
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg dark:bg-offBlack border-white">
          <form>
            <div className="mb-4 ">
              <label
                htmlFor="name"
                className="block text-lg font-medium text-gray-700 dark:text-gray-300"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                className={formInputStyle}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-lg font-medium text-gray-700 dark:text-gray-300"
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className={formInputStyle}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-lg font-medium text-gray-700 dark:text-gray-300"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                placeholder="Enter your message"
                className={formInputStyle}
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-primary text-white px-6 py-3 rounded-md transform hover:scale-110 hover:primary transition-transform duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Market Overview Section */}
      <section className="py-16 px-6 bg-gray-200 text-primary dark:bg-offBlack">
        <h2 className="text-3xl font-bold text-center mb-8">Market Overview</h2>
        {loading ? (
          <p className="text-center text-gray-400">Loading data...</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {cryptoData.map((crypto) => (
              <div
                key={crypto.id}
                className="bg-white p-6 rounded-lg shadow-lg text-center dark:bg-darkGrey"
              >
                <h3 className="text-xl font-semibold">{crypto.name}</h3>
                <p className="text-gray-400">${crypto.current_price}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
