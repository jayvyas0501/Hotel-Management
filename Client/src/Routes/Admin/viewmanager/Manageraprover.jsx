import React, { useEffect, useState } from "react";
import axios from "axios";
import Adminnavbar from "../Adminnavbar";

const Manageraprover = () => {
  const [managers, setManagers] = useState([]);

  const fetchManagers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/get", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const allManagers = res?.data?.data || [];
      const unapproved = allManagers.filter((m) => !m.isApproved);
      setManagers(unapproved);
    } catch (error) {
      console.error("❌ Error fetching managers:", error);
      alert("Failed to fetch managers.");
    }
  };

  const approveManager = async (email) => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/admin/approve",
        { email },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert(res.data.message);
      fetchManagers();
    } catch (err) {
      console.error("❌ Error approving manager:", err);
      alert(err.response?.data?.message || "Error approving manager.");
    }
  };

  const rejectManager = async (id) => {
    if (!window.confirm("Are you sure you want to reject this manager?")) return;

    try {
      const res = await axios.delete(`http://localhost:5000/api/admin/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert(res.data.message);
      fetchManagers();
    } catch (err) {
      console.error("❌ Error rejecting manager:", err);
      alert(err.response?.data?.message || "Error rejecting manager.");
    }
  };

  useEffect(() => {
    fetchManagers();
  }, []);

  return (
    <>
      <Adminnavbar />

      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Pending Manager Approvals</h1>

        {managers.length === 0 ? (
          <p className="text-gray-500 text-lg">No unapproved managers found.</p>
        ) : (
          <div className="overflow-x-auto shadow-md rounded-lg bg-white">
            <table className="min-w-full text-black rounded-lg overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">Name</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">Email</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">Phone</th>
                  <th className="py-4 px-6 text-center text-sm font-semibold uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {managers.map((manager, index) => (
                  <tr
                    key={manager._id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition duration-200`}
                  >
                    <td className="py-4 px-6">{manager.name}</td>
                    <td className="py-4 px-6">{manager.email}</td>
                    <td className="py-4 px-6">{manager.phone}</td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={() => approveManager(manager.email)}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-full text-sm shadow-sm transition"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => rejectManager(manager._id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-full text-sm shadow-sm transition"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Manageraprover;
