import React, { useEffect, useState } from "react";
import axios from "axios";
import Adminnavbar from "../Adminnavbar";
import apiRequest from "../../../lib/axiosInstance";

const Managerall = () => {
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchManagers = async () => {
    try {
      const res = await apiRequest.get("/admin/get", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("✅ Manager data:", res.data);
      setManagers(res.data.data || []);
    } catch (error) {
      console.error("❌ Error fetching managers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchManagers();
  }, []);

  return (
    <>
      <Adminnavbar />
      <div className="min-h-screen bg-gray-50 py-10 px-6 text-black">
        <h1 className="text-3xl font-bold text-center mb-8">Manager Panel</h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading managers...</p>
        ) : managers.length === 0 ? (
          <p className="text-center text-red-500">No managers found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {managers.map((manager) => (
              <div
                key={manager._id}
                className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition duration-300"
              >
                <div className="flex flex-col items-center">
                  <img
                    src={manager.url || "https://via.placeholder.com/100"}
                    alt={manager.name}
                    className="w-28 h-28 rounded-full border-4 border-blue-200 object-cover mb-4"
                  />
                  <h2 className="text-lg font-semibold">{manager.name}</h2>
                  <p className="text-gray-600 text-sm">{manager.email}</p>
                  <div className="mt-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        manager.isApproved
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {manager.isApproved ? "Approved" : "Not Approved"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Managerall;
