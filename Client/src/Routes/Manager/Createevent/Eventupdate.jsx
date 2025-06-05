import React, { useEffect, useState } from "react";
import ManagerNavbar from "../managernavbar";
import apiRequest from "../../../lib/axiosInstance";
import { useForm } from "react-hook-form";

const UpdateEvent = () => {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Fetch all events
  const fetchEvents = async () => {
    try {
      const res = await apiRequest.get("/manager/get-all-event");
      const fetchedEvents = res.data?.Data || res.data?.data || res.data || [];
      setEvents(fetchedEvents);
    } catch (err) {
      console.error("Failed to fetch events", err);
      alert("You are not authorized to access events.");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Delete Event
  const handleDelete = async (id) => {
    try {
      await apiRequest.delete(`/manager/delete-event/${id}`);
      setEvents(events.filter((event) => event._id !== id));
      alert("Event deleted successfully!");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete event.");
    }
  };

  // Load Event in Form
  const handleEdit = (event) => {
    setEditingEvent(event);
    setValue("name", event.name);
    setValue("description", event.description);
    setValue("location", event.location);
    setValue("date", event.date?.slice(0, 10)); // To match input type=date
    setValue("capacity", event.capacity);
    setValue("price", event.price);
  };

  // Update Event
  const onSubmit = async (data) => {
    try {
      await apiRequest.put(`/manager/update-event/${editingEvent._id}`, data);
      fetchEvents(); // Refresh table
      reset();
      setEditingEvent(null);
      alert("Event updated successfully!");
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update event.");
    }
  };

  return (
    <>
      <ManagerNavbar />
      <div className="min-h-screen bg-gray-50 p-6 text-black">
        <h2 className="text-3xl font-bold text-center mb-6">
          Update or Delete Events
        </h2>

        {/* Event Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-md mb-10">
          <table className="min-w-full table-auto border-collapse text-black">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4 border">Event Name</th>
                <th className="py-3 px-4 border">Price</th>
                <th className="py-3 px-4 border">Location</th>
                <th className="py-3 px-4 border">Capacity</th>
                <th className="py-3 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id} className="text-center border-t">
                  <td className="py-2 px-4">{event.name}</td>
                  <td className="py-2 px-4">₹{event.price}</td>
                  <td className="py-2 px-4">{event.location}</td>
                  <td className="py-2 px-4">{event.capacity}</td>
                  <td className="py-2 px-4 space-x-2">
                    <button
                      onClick={() => handleEdit(event)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-black py-1 px-3 rounded"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="bg-red-500 hover:bg-red-600 text-black py-1 px-3 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {events.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center text-gray-500 py-4">
                    No events found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Edit Form */}
        {editingEvent && (
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Edit Event: {editingEvent.name}
            </h3>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-4"
            >
              <input
                {...register("name", { required: true })}
                placeholder="Event Name"
                className="p-3 border border-gray-300 rounded-md"
              />
              <input
                type="number"
                step="0.01" // allows decimal values
                {...register("price", { required: true })}
                placeholder="Price"
                className="p-3 border border-gray-300 rounded-md"
              />

              <input
                {...register("location", { required: true })}
                placeholder="Location"
                className="p-3 border border-gray-300 rounded-md"
              />
              <input
                type="date"
                {...register("date", { required: true })}
                className="p-3 border border-gray-300 rounded-md"
              />
              <input
                type="number"
                {...register("capacity", { required: true })}
                placeholder="Capacity"
                className="p-3 border border-gray-300 rounded-md"
              />

              <textarea
                {...register("description", { required: true })}
                placeholder="Event Description"
                rows={3}
                className="p-3 border border-gray-300 rounded-md"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    reset();
                    setEditingEvent(null);
                  }}
                  className="bg-gray-400 text-black py-2 px-4 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-black py-2 px-4 rounded hover:bg-green-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default UpdateEvent;
