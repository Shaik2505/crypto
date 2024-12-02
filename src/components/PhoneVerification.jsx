import React, { useState, useEffect } from "react";

const PhoneVerification = ({ phoneNumber, setPhoneNumber }) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [savedCode, setSavedCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false); // Track if code was sent
  const [resendTimer, setResendTimer] = useState(0); // Timer for resend
  const [timerInterval, setTimerInterval] = useState(null); // Store interval ID

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate sending verification code
    const code = Math.floor(1000 + Math.random() * 9000).toString(); // Random 4-digit code
    setSavedCode(code);

    try {
      // Save phone number and verification code to the JSON server
      const response = await fetch("http://localhost:5000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber, code }),
      });

      if (response.ok) {
        alert(`Verification code sent to ${phoneNumber}: ${code}`);
        setIsCodeSent(true); // Mark the code as sent
        setResendTimer(30); // Start the resend timer (30 seconds)
      } else {
        alert("Error saving phone number");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error sending verification code");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    if (verificationCode === savedCode) {
      setIsVerified(true);
      alert("Your phone number has been successfully verified!");

      // Update the contact number in profile after verification
      setPhoneNumber(phoneNumber); // Update parent component state

      // Reset state after verification
      setVerificationCode("");
      setIsVerified(false);
      setIsCodeSent(false);
      setResendTimer(0);
    } else {
      alert("Incorrect verification code.");
    }
  };

  const handleResendCode = () => {
    if (resendTimer === 0) {
      handleSubmit({ preventDefault: () => {} });
    }
  };

  useEffect(() => {
    if (resendTimer > 0) {
      const interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      setTimerInterval(interval);
    } else {
      if (timerInterval) clearInterval(timerInterval);
    }

    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [resendTimer]);

  return (
    <div className=" bg-gray-100 flex justify-center items-center p-6 dark:bg-darkGrey">
      <div className="bg-white p-6 rounded-lg shadow-md w-full sm:max-w-md dark:bg-offBlack dark:shadow-white border">
        <h2 className="text-2xl font-semibold text-center mb-4 dark:text-white">
          Phone Number Verification
        </h2>

        {!isVerified && !isCodeSent ? (
          <>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700 dark:text-white"
                  htmlFor="phoneNumber"
                >
                  Enter your phone number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md dark:bg-darkGrey"
                  placeholder="(555) 123-4567"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className={`w-full py-2 px-4 bg-primary hover:bg-primary/70 text-white rounded-md hover:bg-primry/50 disabled:bg-blue-500`}
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Verification Code"}
              </button>
            </form>
          </>
        ) : isCodeSent ? (
          <>
            <form onSubmit={handleVerifyCode}>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="verificationCode"
                >
                  Enter Verification Code
                </label>
                <input
                  type="text"
                  id="verificationCode"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  placeholder="1234"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary/80"
              >
                Verify Code
              </button>
            </form>

            <div className="mt-4 text-center">
              {resendTimer > 0 ? (
                <p className="text-sm text-gray-500">
                  Resend code in {resendTimer}s
                </p>
              ) : (
                <button
                  onClick={handleResendCode}
                  className="text-sm text-primary hover:text-blue-700"
                >
                  Resend Code
                </button>
              )}
            </div>
          </>
        ) : null}

        {isVerified && (
          <div className="mt-4 text-center text-primary">
            <p>Your phone number has been successfully verified!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhoneVerification;
