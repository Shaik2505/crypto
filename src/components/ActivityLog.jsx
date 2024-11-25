import React from "react";

const ActivityLog = () => {
  return (
    <div className="bg-white p-6 sm:p-4 rounded-lg shadow-md">
      <h2 className="text-xl sm:text-lg font-bold text-gray-800 mb-4 text-center sm:text-left">
        Activity Log
      </h2>
      <ul className="list-disc pl-5 text-gray-600 space-y-2 text-sm sm:text-base">
        <li>Logged in on 20th Nov, 2024</li>
        <li>Updated email address on 15th Nov, 2024</li>
        <li>Verified phone number on 10th Nov, 2024</li>
      </ul>
    </div>
  );
};

export default ActivityLog;
