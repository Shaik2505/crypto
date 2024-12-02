import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast"; // Importing toast

const EditProfile = ({ profile, setProfile, setActiveTab }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);

  // Reset form when the profile changes (when the form is opened)
  useEffect(() => {
    setName("");
    setEmail("");
    setImage(null);
  }, [profile]); // This effect runs whenever 'profile' changes

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
    // Update profile and notify
    const updatedProfile = { ...profile, name, email, image };
    setProfile(updatedProfile); // This updates the profile in the parent component

    // Show success toast
    toast.success("Profile updated!");

    // Switch to the "Profile" tab after a brief delay
    setActiveTab("Profile");
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md max-w-lg mx-auto dark:bg-offBlack dark:border dark:shadow-white ">
      <h2 className="text-xl sm:text-2xl font-bold text-black mb-6 text-center dark:text-white">
        Edit Profile
      </h2>
      <div className="grid grid-cols-1 gap-6">
        {/* Name Input */}
        <div>
          <label className="text-sm text-black dark:text-white">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-3 rounded-lg mt-1 text-sm sm:text-base text-black dark:bg-darkGrey dark:text-white"
          />
        </div>

        {/* Email Input */}
        <div>
          <label className="text-sm text-black dark:text-white">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3 rounded-lg mt-1 text-sm sm:text-base text-black dark:bg-darkGrey dark:text-white "
          />
        </div>

        {/* Profile Image Upload */}
        <div>
          <label className="text-sm text-black dark:text-white">Profile Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full border p-3 rounded-lg mt-1 text-sm sm:text-base text-black dark:bg-darkGrey dark:text-white"
          />
          {image && (
            <div className="mt-4 flex justify-center">
              <img
                src={image}
                alt="Selected"
                className="w-24 h-24 rounded-full border object-cover "
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
