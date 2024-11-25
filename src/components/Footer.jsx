import {
    FaDiscord,
    FaTelegram,
    FaFacebook,
    FaReddit,
    FaInstagram,
    FaYoutube,
    FaRegCopyright,
  } from "react-icons/fa";
  import { IoCloseCircleSharp } from "react-icons/io5";
  import { SiCoinmarketcap } from "react-icons/si";
  import { BsTwitterX } from "react-icons/bs";
  
  const Footer = () => {
    return (
      <footer className="bg-white py-12 text-gray-400 dark:bg-darkGrey">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8">
          {/* Community Column */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4">Community</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://discord.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-white transition-colors"
                >
                  <FaDiscord size={20} className="mr-2" /> Discord
                </a>
              </li>
              <li>
                <a
                  href="https://telegram.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-white transition-colors"
                >
                  <FaTelegram size={20} className="mr-2" /> Telegram
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-white transition-colors"
                >
                  <FaFacebook size={20} className="mr-2" /> Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://coinmarketcap.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-white transition-colors"
                >
                  <SiCoinmarketcap size={20} className="mr-2" /> CoinMarketCap
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-white transition-colors"
                >
                  <BsTwitterX size={20} className="mr-2" /> TwitterX
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-white transition-colors"
                >
                  <FaYoutube size={20} className="mr-2" /> YouTube
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-white transition-colors"
                >
                  <FaInstagram size={20} className="mr-2" /> Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.reddit.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-white transition-colors"
                >
                  <FaReddit size={20} className="mr-2" /> Reddit
                </a>
              </li>
              <li>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-white transition-colors"
                >
                  <IoCloseCircleSharp size={20} className="mr-2" /> Close
                </a>
              </li>
            </ul>
          </div>
          {/* Other Columns */}
          {[
            {
              title: "About Us",
              links: [
                "About",
                "Careers",
                "Announcements",
                "News",
                "Legal",
                "Terms",
                "Privacy",
                "Building Trust",
                "Blog",
                "Community",
                "Risk Warning",
                "Notices",
                "Downloads",
                "Desktop Application",
              ],
            },
            {
              title: "Products",
              links: [
                "Exchange",
                "Buy Crypto",
                "Pay",
                "NFT",
                "Live",
                "Tax",
                "Gift Card",
                "Launchpool",
                "Auto-Invest",
                "ETH Staking",
                "Research",
                "Charity",
              ],
            },
            {
              title: "Business",
              links: [
                "P2P Merchant Application",
                "P2Pro Merchant Application",
                "Listing Application",
                "NFT",
                "Institutional & VIP Services",
                "Labs",
                "Techno Connect",
              ],
            },
            {
              title: "Learn",
              links: [
                "Learn & Earn",
                "Browse Crypto Prices",
                "Bitcoin Price",
                "Ethereum Price",
                "Crypto Price Predictions",
                "Ethereum Upgrade (Pectra)",
                "Buy Bitcoin",
                "Buy Ethereum",
                "Buy Altcoins",
              ],
            },
            {
              title: "Service",
              links: [
                "Affiliate",
                "Referral",
                "OTC Trading",
                "Historical Market Data",
                "Proof of Reserves",
              ],
            },
            {
              title: "Support",
              links: [
                "24/7 Support",
                "Support Center",
                "Product Feedback",
                "Fees",
                "APIs",
                "Trading Rules",
                "Law Enforcement Requests",
              ],
            },
          ].map((column, idx) => (
            <div key={idx}>
              <h3 className="text-white text-sm font-semibold mb-4">{column.title}</h3>
              <ul className="space-y-2 text-xs">
                {column.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p className="flex items-center justify-center text-xs">
            <FaRegCopyright className="mr-2" /> 2024 Techno Tide. All Rights
            Reserved.
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  