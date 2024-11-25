import React, { useState, useEffect } from "react";
import ProfileTab from "../components/ProfileTab";
import EditProfile from "../components/EditProfile";
import PhoneVerification from "../components/PhoneVerification";
import IDVerification from "../components/IdVerification";
import ResetPassword from "../components/ResetPassword";
import ActivityLog from "../components/ActivityLog";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    image: "",
    contact: "", // This will be updated after phone verification
    status: "Active",
  });

  // Load profile data from localStorage on initial load
  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem("profile"));
    if (storedProfile) {
      setProfile(storedProfile);
    }
  }, []);

  // Save profile data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(profile));
  }, [profile]);

  const handlePhoneNumberUpdate = (newPhoneNumber) => {
    // Update profile contact number after verification
    const updatedProfile = { ...profile, contact: newPhoneNumber };
    setProfile(updatedProfile);
    localStorage.setItem("profile", JSON.stringify(updatedProfile)); // Save to localStorage
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Profile":
        return <ProfileTab profile={profile} />;
      case "Edit Profile":
        return <EditProfile profile={profile} setProfile={setProfile} />;
      case "Phone Verification":
        return <PhoneVerification phoneNumber={profile.contact} setPhoneNumber={handlePhoneNumberUpdate} />;
      case "ID Verification":
        return <IDVerification />;
      case "Reset Password":
        return <ResetPassword />;
      case "Activity Log":
        return <ActivityLog />;
      default:
        return <ProfileTab profile={profile} />;
    }
  };

  return (
    <div className="pt-16 bg-gray-100 font-sans min-h-screen  dark:bg-slate-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-blue-800 py-6 sm:py-4   ">
        <div className="container mx-auto px-6 sm:px-4 flex flex-col md:flex-row justify-between items-center ">
          <h1 className="text-white text-2xl sm:text-lg font-bold text-center md:text-left">
            My Profile
          </h1>
          <div className="text-sm text-white mt-4 md:mt-0 text-center md:text-right">
            <div>
              <span className="font-semibold">Available Balance:</span>{" "}
              <span className="text-green-400">987.25600000 BTC</span>
            </div>
            <div>
              <span className="font-semibold">Pending Withdrawal:</span>{" "}
              <span className="text-orange-400">675.57894000 BTC</span>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs Navigation */}
      <main className="container mx-auto px-6 sm:px-4 py-10 sm:py-6 max-w-screen-lg dark:bg-darkGrey ">
        <div className="bg-white shadow-lg rounded-lg dark:bg-darkGrey border-4 border-primary">
          {/* Tabs */}
          <nav className="flex space-x-4 border-b border-gray-200 px-6 sm:px-4 py-4 overflow-x-auto ">
            {[
              "Profile",
              "Edit Profile",
              "Phone Verification",
              "ID Verification",
              "Reset Password",
              "Activity Log",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-sm font-medium whitespace-nowrap ${
                  activeTab === tab
                    ? "text-primary border-b-2 border-primary pb-2"
                    : "text-gray-500 hover:text-primary"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>

          {/* Static Content with Padding */}
          <div className="px-6 sm:px-4 py-10 sm:py-6 min-h-[200px]">
            {/* Content stays in the same space */}
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
