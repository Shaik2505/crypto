import React, { useState } from "react";

const EditProfile = ({ profile, setProfile }) => {
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [image, setImage] = useState(profile.image);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setProfile({ ...profile, name, email, image });
    alert("Profile updated!");
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md max-w-lg mx-auto dark:bg-offBlack dark:border border-white text-white">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center dark:text-white">
        Edit Profile
      </h2>
      <div className="grid grid-cols-1 gap-6">
        {/* Name Input */}
        <div>
          <label className="text-sm text-gray-500 dark:text-white">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-3 rounded-lg mt-1 text-sm sm:text-base"
          />
        </div>

        {/* Email Input */}
        <div>
          <label className="text-sm text-gray-500 dark:text-white">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3 rounded-lg mt-1 text-sm sm:text-base"
          />
        </div>

        {/* Profile Image Upload */}
        <div>
          <label className="text-sm text-gray-500 dark:text-white">
            Profile Image
          </label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full border p-3 rounded-lg mt-1 text-sm sm:text-base"
          />
          {image && (
            <div className="mt-4 flex justify-center">
              <img
                src={image}
                alt="Selected"
                className="w-24 h-24 rounded-full border object-cover"
              />
            </div>
          )}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handleSave}
          className="bg-primary text-white px-6 py-3 rounded-lg text-sm sm:text-base hover:bg-primary/80"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
