import React from "react";

const ProfileTab = ({ profile }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md dark:bg-offBlack dark:text-white">
      <h2 className="text-xl font-bold text-gray-800 mb-4 dark:text-white">
        Profile Information
      </h2>
      <div className="flex items-center mb-6">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary">
          <img
            src={profile.image || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {profile.name}
          </h3>
          <p className="text-sm text-gray-500">{profile.email}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm text-gray-500 dark:text-white">Contact</h3>
          <p className="text-gray-800 dark:text-white">{profile.contact || ""}</p>
        </div>
        <div>
          <h3 className="text-sm text-gray-500 dark:text-white">Status</h3>
          <p className="text-green-500 font-semibold">
            {profile.status || "Active"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
