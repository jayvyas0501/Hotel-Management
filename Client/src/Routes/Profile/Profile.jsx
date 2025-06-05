import React from "react";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-2xl text-red-500 font-semibold">
          You are not logged in.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center px-6">
      <div className="bg-white rounded-xl shadow-lg p-10 flex flex-col items-center w-full max-w-xl">
        {/* Profile Image */}
        <div className="w-40 h-40 mb-6 overflow-hidden rounded-full border-4 border-blue-600 shadow-lg hover:scale-105 transform transition duration-300 ease-in-out">
          <img
            src={user.url}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* User Name */}
        <h1 className="text-4xl font-semibold text-blue-900 mb-3">{user.name}</h1>

        <p className="text-gray-600 text-lg mb-6">Welcome back to Dazzling Dice!</p>

        {/* User Info */}
        <div className="w-full space-y-4 text-left text-lg text-gray-700">
          <p className="flex items-center"><strong className="mr-2 text-blue-600">👤 Name:</strong> {user.name}</p>
          <p className="flex items-center"><strong className="mr-2 text-blue-600">📧 Email:</strong> {user.email}</p>
          <p className="flex items-center"><strong className="mr-2 text-blue-600">📞 Phone:</strong> {user.phone}</p>
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="mt-8 py-3 px-6 bg-red-500 text-white font-semibold rounded-full shadow-md hover:bg-red-600 transition duration-200 ease-in-out"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
