import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiRequest from "../../lib/axiosInstance";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await apiRequest.get("/user/all-events");
        setEvents(res.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load events.");
        console.error(err);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div className="text-center py-10 text-lg font-semibold">Loading events...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="p-10">
      <h1 className="text-5xl text-center font-extrabold font-serif text-blue-600 mb-10">
        All Events
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transform transition duration-300 ease-in-out hover:scale-105 overflow-hidden"
          >
            <img
              src={event.images?.[0]?.url || "/placeholder.jpg"}
              alt={event.name}
              className="w-[300px] justify-self-center object-cover"
              onError={(e) => (e.target.src = "/placeholder.jpg")}
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold font-serif text-gray-800 mb-2 text-center">
                {event.name}
              </h2>
              <p className="text-gray-600 text-center">
                {event.description?.length > 120
                  ? `${event.description.slice(0, 120)}...`
                  : event.description}
              </p>
              <div className="mt-4 flex justify-center">
                <Link to={`/eventbooking/${event._id}`}>
                  <button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out">
                    Book Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllEvents;
