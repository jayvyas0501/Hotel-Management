import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import ManagerNavbar from "../managernavbar";
import { managerEventActions } from "../../../Constant/manager";

const EventManagementPage = () => {
  const { user } = useAuth();

  if (user?.role !== "manager") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100 text-red-700 text-xl font-semibold">
        Access Denied. You are not authorized to view this page.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <ManagerNavbar />
      <div className="flex-1 bg-gradient-to-br from-gray-100 to-gray-200 py-8 px-4 overflow-y-auto">
        <div className="max-w-7xl mx-auto text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Event Management</h1>
          <p className="text-gray-600 text-lg">Manage all your hotel event operations here.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {managerEventActions.map((action, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${action.color} text-white p-6 rounded-3xl shadow-xl border border-white/10 transition-all duration-300`}
            >
              <div className="flex justify-center mb-4">
                <img
                  src={action.image}
                  alt={action.title}
                  className="w-14 h-14 object-contain"
                />
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-center">{action.title}</h3>
              <p className="text-sm mb-6 text-center">{action.description}</p>
              <div className="text-center">
                <Link
                  to={action.path}
                  className="inline-block bg-white text-gray-800 font-bold px-5 py-2 rounded-lg hover:bg-opacity-90 transition"
                >
                  Go to {action.title}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventManagementPage;
