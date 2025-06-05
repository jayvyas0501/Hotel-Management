import React, { useEffect, useState } from "react";
import axios from "axios";
import Adminnavbar from "../Adminnavbar";

const Managerdelet = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/get", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = res?.data?.data || [];
      setUsers(data);
    } catch (error) {
      console.error("❌ Error fetching users:", error);
      alert("Failed to fetch users.");
    }
  };

  const deleteUser = async (email, role) => {
    if (role === "admin") {
      alert("❌ You cannot delete an admin account.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await axios.delete("http://localhost:5000/api/admin/delete", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: { email },
      });

      alert(res.data.message);
      fetchUsers();
    } catch (err) {
      console.error("❌ Error deleting user:", err);
      alert(err.response?.data?.message || "Error deleting user.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <Adminnavbar />
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">All Accounts</h1>

        {users.length === 0 ? (
          <p className="text-gray-500 text-lg">No users found.</p>
        ) : (
          <div className="overflow-x-auto shadow-md rounded-lg bg-white">
            <table className="min-w-full text-black rounded-lg overflow-hidden">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">Name</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">Email</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">Phone</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">Role</th>
                  <th className="py-4 px-6 text-center text-sm font-semibold uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user._id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-100 transition duration-200`}
                  >
                    <td className="py-4 px-6">{user.name}</td>
                    <td className="py-4 px-6">{user.email}</td>
                    <td className="py-4 px-6">{user.phone}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-white text-xs font-medium ${
                          user.role === "admin"
                            ? "bg-blue-600"
                            : user.role === "manager"
                            ? "bg-green-600"
                            : "bg-gray-600"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      {user.role === "admin" ? (
                        <span className="text-gray-400 text-sm">Not Allowed</span>
                      ) : (
                        <button
                          onClick={() => deleteUser(user.email, user.role)}
                          className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-full text-sm shadow-sm transition"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Managerdelet;
