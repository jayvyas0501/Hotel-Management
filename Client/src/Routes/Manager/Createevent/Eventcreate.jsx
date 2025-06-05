import React, { useState } from "react";
import apiRequest from "../../../lib/axiosInstance";
import { useForm } from "react-hook-form";
import ManagerNavbar from "../managernavbar";

const EventCreate = () => {
  const { register, handleSubmit, reset } = useForm();
  const [images, setImages] = useState([]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("location", data.location);
    formData.append("date", data.date);
    formData.append("capacity", data.capacity);
    formData.append("price", data.price);

    // Append all selected images
    images.forEach((image) => {
      formData.append("images", image); // Make sure this matches your backend field name
    });

    try {
      const res = await apiRequest.post("/manager/create-event", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(res.data.message || "Event created successfully!");
      reset();
      setImages([]);
    } catch (err) {
      console.error("Event creation error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to create event");
    }
  };

  return (
    <>
    
    <ManagerNavbar />
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg mt-6 text-black">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Create New Event
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Event Name</label>
          <input
            {...register("name")}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            {...register("description")}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none text-black"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Location</label>
          <input
            {...register("location")}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Date</label>
          <input
            type="date"
            {...register("date")}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Capacity</label>
          <input
            type="number"
            {...register("capacity")}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Price</label>
          <input
            type="number"
            {...register("price")}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-black"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Images (multiple allowed)
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImages(Array.from(e.target.files))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-black"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
        >
          Create Event
        </button>
      </form>
    </div>
    </>
  );
};

export default EventCreate;
