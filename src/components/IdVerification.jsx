import React from "react";

const IDVerification = () => {
  return (
    <div className=" bg-gray-100 py-2 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-primary text-center mb-4">
          Let's verify your identity
        </h1>
        <p className="text-gray-600 text-center mb-6">
          We're required by state law to verify you are who you say you are.
          Don't worry, our site is secure, and we never store social security
          information.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Verify Identity (KBA) Card */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-md text-center">
            <div className="text-2xl text-gray-700 mb-4">
              <i className="fas fa-id-card"></i> {/* Icon for Identity */}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Permanent Account Number(PAN)
            </h3>
            <button className="mt-4 bg-primary text-white py-2 px-4 rounded-full hover:bg-green-600">
              Start
            </button>
          </div>

          {/* Verify Documents Card */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-md text-center">
            <div className="text-2xl text-gray-700 mb-4">
              <i className="fas fa-id-card-alt"></i> {/* Icon for Documents */}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Verify Documents
            </h3>
            <button className="mt-4 bg-primary text-white py-2 px-4 rounded-full hover:bg-primary">
              Start
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IDVerification;
