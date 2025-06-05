import React, { useEffect, useState } from "react";
import apiRequest from "../../../lib/axiosInstance";
import ManagerNavbar from "../managernavbar";

const Roomstatus = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    try {
      const response = await apiRequest.get("/manager/bookings");

      // ✅ Filter out bookings where the room is deleted (roomId is null or undefined)
      const validBookings = response.data.data.filter(
        (booking) => booking.roomId !== null && booking.roomId !== undefined
      );

      setBookings(validBookings);
    } catch (err) {
      console.error("❌ Error fetching bookings:", err);
      setError("Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCheckIn = async (id) => {
    try {
      await apiRequest.put(`/manager/check-in/${id}`);
      const today = new Date().toISOString().split("T")[0];
      setBookings((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, isCheckedIn: true, checkInDate: today } : b
        )
      );
    } catch (err) {
      alert(err.response?.data?.message || "Check-in failed.");
    }
  };

  const handleCheckOut = async (id) => {
    try {
      await apiRequest.put(`/manager/check-out/${id}`);
      const today = new Date().toISOString().split("T")[0];
      setBookings((prev) =>
        prev.map((b) =>
          b._id === id ? { ...b, isCheckedOut: true, checkOutDate: today } : b
        )
      );
    } catch (err) {
      alert(err.response?.data?.message || "Check-out failed.");
    }
  };

  const getStatus = (booking) => {
    if (booking.isCheckedOut) return "Checked-out";
    if (booking.isCheckedIn) return "Checked-in";
    return "Booked";
  };

  return (
    <>
      <ManagerNavbar />
      <div className="p-6 bg-white text-gray-800 min-h-screen">
        <h2 className="text-3xl font-bold mb-6">Room Booking Status</h2>

        {loading && <p>Loading bookings...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
              <thead className="bg-blue-100 text-blue-800">
                <tr>
                  <th className="py-3 px-4 text-left">Room No.</th>
                  <th className="py-3 px-4 text-left">Room Type</th>
                  <th className="py-3 px-4 text-left">Guest Name</th>
                  <th className="py-3 px-4 text-left">Guests</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Check-in</th>
                  <th className="py-3 px-4 text-left">Check-out</th>
                  <th className="py-3 px-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id} className="border-t hover:bg-gray-50">
                    <td className="py-3 px-4">
                      {booking.roomId?.roomNumber || "N/A"}
                    </td>
                    <td className="py-3 px-4">
                      {booking.roomId?.type || "N/A"}
                    </td>
                    <td className="py-3 px-4">
                      {booking.userId?.name || "N/A"}
                    </td>
                    <td className="py-3 px-4">{booking.numberOfGuests}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded text-sm font-medium ${
                          getStatus(booking) === "Booked"
                            ? "bg-green-200 text-green-800"
                            : getStatus(booking) === "Checked-in"
                            ? "bg-yellow-200 text-yellow-800"
                            : "bg-gray-300 text-gray-700"
                        }`}
                      >
                        {getStatus(booking)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {booking.checkInDate
                        ? new Date(booking.checkInDate).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )
                        : "--"}
                    </td>
                    <td className="py-3 px-4">
                      {booking.checkOutDate
                        ? new Date(booking.checkOutDate).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )
                        : "--"}
                    </td>
                    <td className="py-3 px-4 space-x-2">
                      <button
                        onClick={() => handleCheckIn(booking._id)}
                        disabled={booking.isCheckedIn || booking.isCheckedOut}
                        className={`px-3 py-1 rounded text-white text-sm transition ${
                          booking.isCheckedIn || booking.isCheckedOut
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                      >
                        Check-In
                      </button>
                      <button
                        onClick={() => handleCheckOut(booking._id)}
                        disabled={!booking.isCheckedIn || booking.isCheckedOut}
                        className={`px-3 py-1 rounded text-white text-sm transition ${
                          !booking.isCheckedIn || booking.isCheckedOut
                            ? "bg-gray-300 cursor-not-allowed"
                            : "bg-red-600 hover:bg-red-700"
                        }`}
                      >
                        Check-Out
                      </button>
                    </td>
                  </tr>
                ))}
                {bookings.length === 0 && (
                  <tr>
                    <td colSpan="8" className="py-4 text-center text-gray-500">
                      No bookings available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Roomstatus;
