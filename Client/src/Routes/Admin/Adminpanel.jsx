// src/pages/Adminpanel.jsx
import React from "react";
import { Link } from "react-router-dom";
import { adminActions } from "./Admin";
import Adminnavbar from "./Adminnavbar";

const Adminpanel = () => {
  return (
    <>
    <Adminnavbar/>
    <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-5xl font-bold text-black text-center p-10">Admin Panel</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {adminActions.map((action, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${action.color} text-white p-6 rounded-3xl shadow-lg border border-white/10`}
          >
            <div className="flex justify-center mb-4">
              <img src={action.image} alt={action.title} className="w-14 h-14" />
            </div>
            <h2 className="text-xl font-bold text-center mb-2">{action.title}</h2>
            <p className="text-sm text-center mb-4">{action.description}</p>
            <div className="text-center">
              <Link
                to={action.path}
                className="bg-white text-gray-800 font-semibold px-10 py-2 rounded-lg hover:opacity-90 transition"
              >
                Go
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Adminpanel;
