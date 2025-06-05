import React, { useEffect, useState } from "react";
import ManagerNavbar from "../managernavbar";
import apiRequest from "../../../lib/axiosInstance";

const EventStatus = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await apiRequest.get("/manager/get-all-event");
      console.log("Booking data:", res.data);

      const fetchedBookings = res.data.data || res.data.Data || [];
      setBookings(fetchedBookings);
    } catch (err) {
      console.error("Error fetching event bookings:", err);
      alert("You are not authorized to view event status.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <>
      <ManagerNavbar />
      <div className="min-h-screen bg-gray-100 p-6 text-black">
        <h2 className="text-3xl font-bold text-center mb-6">Event Booking Status</h2>

        {loading ? (
          <p className="text-center text-lg text-gray-600">Loading...</p>
        ) : (
          <div className="overflow-x-auto bg-white shadow-md rounded-xl">
            <table className="min-w-full text-center border border-gray-300">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="py-3 px-4 border">Event Name</th>
                  <th className="py-3 px-4 border">Price</th>
                  <th className="py-3 px-4 border">Location</th>
                  <th className="py-3 px-4 border">Capacity</th>
                  <th className="py-3 px-4 border">Booking Date</th>
               
                </tr>
              </thead>
              <tbody>
                {bookings.length > 0 ? (
                  bookings.map((booking, index) => (
                    <tr key={index} className="border-t hover:bg-gray-50 transition">
                      <td className="py-3 px-4">{booking.name || "N/A"}</td>
                      <td className="py-3 px-4">₹{booking.price || "N/A"}</td>
                      <td className="py-3 px-4">{booking.location || "N/A"}</td>
                      <td className="py-3 px-4">{booking.capacity || "N/A"}</td>
                      <td className="py-3 px-4">{formatDate(booking.date)}</td>
                    
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-4 text-gray-500">
                      No event bookings found.
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

export default EventStatus;
