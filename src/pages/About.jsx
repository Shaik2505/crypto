import React from "react";
import Footer from "../components/Footer";


const About = () => {
  return (
    <div className="py-20 min-h-screen bg-primary text-gray-200 font-sans dark:bg-offBlack">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-primary to-primary p-8">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold">
              Welcome to CryptoX
            </h1>
            <p className="mt-4 text-lg lg:text-xl">
              The future of decentralized finance. Invest, trade, and grow with
              confidence.
            </p>
            <button className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-lg">
              Learn More
            </button>
          </div>
          <img
            src="https://img.freepik.com/free-vector/digital-bitcoin-symbol-dark-blue-technology-background_1017-11757.jpg"
            alt="Crypto Illustration"
            className="mt-8 lg:mt-0 lg:w-1/2 object-center"
          />
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 ">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose CryptoX?
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 bg">
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

      {/* Call to Action */}
      <div className="bg-primary py-12 dark:bg-darkGrey">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">
            Ready to start your crypto journey?
          </h2>
          <p className="mt-4 text-gray-400">
            Join millions of users already investing and trading with CryptoX.
          </p>
          <button className="mt-6 px-6 py-3 bg-primary hover:bg-primary/70 rounded-md text-white text-lg">
            Get Started
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
