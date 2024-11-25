import React from "react";

const ResetPassword = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Reset Password</h2>
      <p className="text-gray-600">
        Click the button below to reset your password. A reset link will be sent
        to your registered email.
      </p>
      <button className="mt-4 bg-primary text-white px-4 py-2 rounded-lg">
        Send Reset Link
      </button>
    </div>
  );
};

export default ResetPassword;
