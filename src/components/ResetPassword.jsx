import React from "react";
import toast, { Toaster } from "react-hot-toast";

const ResetPassword = () => {
  const handleSendResetLink = () => {
    // Simulate sending reset link
    toast.success("Reset link sent to your email!");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md dark:bg-offBlack dark:shadow-white border">
      <h2 className="text-xl font-bold text-gray-800 mb-4 dark:text-white">Reset Password</h2>
      <p className="text-gray-600 dark:text-white">
        Click the button below to reset your password. A reset link will be sent
        to your registered email.
      </p>
      <button
        onClick={handleSendResetLink}
        className="mt-4 bg-primary hover:bg-primary/70 text-white px-4 py-2 rounded-lg"
      >
        Send Reset Link
      </button>

    
      <Toaster position="top-center" />
    </div>
  );
};

export default ResetPassword;
