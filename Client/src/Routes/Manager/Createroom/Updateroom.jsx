import React, { useEffect, useState } from "react";
import ManagerNavbar from "../managernavbar";
import apiRequest from "../../../lib/axiosInstance";
import { useForm } from "react-hook-form";

const Updateroom = () => {
  const [rooms, setRooms] = useState([]);
  const [editingRoom, setEditingRoom] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Fetch all rooms
  const fetchRooms = async () => {
    try {
      const res = await apiRequest.get("/manager/get-all-rooms");
      setRooms(res.data.Data || []);
    } catch (err) {
      console.error("Failed to fetch rooms", err);
      alert("You are not authorized to access rooms (403 Forbidden)");
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // Delete Room
  const handleDelete = async (id) => {
    try {
      await apiRequest.delete(`/manager/delete-rooms/${id}`);
      setRooms(rooms.filter((room) => room._id !== id));
      alert("Room deleted successfully!");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete room.");
    }
  };

  // Load Room in Form
  const handleEdit = (room) => {
    setEditingRoom(room);
    setValue("roomNumber", room.roomNumber);
    setValue("type", room.type);
    setValue("price", room.price);
    setValue("capacity", room.capacity);
    setValue("description", room.description);
    setValue("amenities", room.amenities.join(", "));
  };

  // Update Room
  const onSubmit = async (data) => {
    try {
      const updatedData = {
        ...data,
        amenities: data.amenities.split(",").map((a) => a.trim()),
      };
      console.log(editingRoom._id);
      console.log(updatedData);
      
      await apiRequest.put(`/manager/update-rooms/${editingRoom._id}`, updatedData);
      fetchRooms();
      reset();
      setEditingRoom(null);
      alert("Room updated successfully!");
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update room.");
    }
  };

  return (
    <>
      <ManagerNavbar />
      <div className="min-h-screen bg-gray-50 p-6 text-black">
        <h2 className="text-3xl font-bold text-center mb-6">Update or Delete Rooms</h2>

        {/* Room Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-md mb-10 text-black">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-3 px-4 border">Room No</th>
                <th className="py-3 px-4 border">Type</th>
                <th className="py-3 px-4 border">Price</th>
                <th className="py-3 px-4 border">Capacity</th>
                <th className="py-3 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room._id} className="text-center border-t text-black">
                  <td className="py-2 px-4">{room.roomNumber}</td>
                  <td className="py-2 px-4">{room.type}</td>
                  <td className="py-2 px-4">₹{room.price}</td>
                  <td className="py-2 px-4">{room.capacity}</td>
                  <td className="py-2 px-4 space-x-2">
                    <button
                      onClick={() => handleEdit(room)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-black py-1 px-3 rounded"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(room._id)}
                      className="bg-red-500 hover:bg-red-600 text-black py-1 px-3 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {rooms.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 py-4">
                    No rooms found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Edit Room Form */}
        {editingRoom && (
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg text-black">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Edit Room #{editingRoom.roomNumber}
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
              <input
                {...register("roomNumber", { required: true })}
                placeholder="Room Number"
                className="p-3 border border-gray-300 rounded-md text-black"
              />
              <input
                {...register("type", { required: true })}
                placeholder="Room Type"
                className="p-3 border border-gray-300 rounded-md text-black"
              />
              <input
                type="number"
                {...register("price", { required: true })}
                placeholder="Price"
                className="p-3 border border-gray-300 rounded-md text-black"
              />
              <input
                type="number"
                {...register("capacity", { required: true })}
                placeholder="Capacity"
                className="p-3 border border-gray-300 rounded-md text-black"
              />
              <input
                {...register("amenities")}
                placeholder="Amenities (comma separated)"
                className="p-3 border border-gray-300 rounded-md text-black"
              />
              <textarea
                {...register("description")}
                placeholder="Room Description"
                rows={3}
                className="p-3 border border-gray-300 rounded-md text-black"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    reset();
                    setEditingRoom(null);
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

export default Updateroom;
