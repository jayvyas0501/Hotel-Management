import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ManagerNavbar from "../managernavbar";
import apiRequest from "../../../lib/axiosInstance";
import { useNavigate } from "react-router-dom";

const CreateRoom = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("roomNumber", data.roomNumber);
      formData.append("type", data.roomType);
      formData.append("price", data.roomPrice);
      formData.append("capacity", data.roomCapacity);
      formData.append("availableCount", data.roomCapacity);
      formData.append("description", data.roomDescription);
      formData.append("amenities", JSON.stringify(data.roomAmenities.split(",")));

      // Append selected images
      images.forEach((img) => {
        formData.append("images", img);
      });

      const res = await apiRequest.post("/manager/create-rooms", formData);

      if (res.status === 201) {
        alert("Room created successfully!");
        reset();
        setImages([]);
        navigate("/manager");
      }
    } catch (error) {
      console.error("Room creation error:", error?.response?.data || error.message);
      alert("Failed to create room.");
    }
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  return (
    <>
      <ManagerNavbar />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-8">
            Create a New Room
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-5">
            <input
              placeholder="Room Number"
              {...register("roomNumber", { required: "Room Number is required" })}
              className="w-full p-3 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500"
            />
            {errors.roomNumber && <p className="text-sm text-red-500">{errors.roomNumber.message}</p>}

            <input
              placeholder="Room Type (e.g., Single, Double, Deluxe)"
              {...register("roomType", { required: "Room Type is required" })}
              className="w-full p-3 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500"
            />
            {errors.roomType && <p className="text-sm text-red-500">{errors.roomType.message}</p>}

            <input
              type="number"
              step="0.01"
              placeholder="Room Price"
              {...register("roomPrice", { required: "Room Price is required" })}
              className="w-full p-3 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500"
            />
            {errors.roomPrice && <p className="text-sm text-red-500">{errors.roomPrice.message}</p>}

            <input
              type="number"
              placeholder="Room Capacity"
              {...register("roomCapacity", { required: "Room Capacity is required" })}
              className="w-full p-3 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500"
            />
            {errors.roomCapacity && <p className="text-sm text-red-500">{errors.roomCapacity.message}</p>}

            <input
              placeholder="Amenities (comma separated)"
              {...register("roomAmenities", { required: "Amenities are required" })}
              className="w-full p-3 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500"
            />
            {errors.roomAmenities && <p className="text-sm text-red-500">{errors.roomAmenities.message}</p>}

            <textarea
              placeholder="Room Description"
              {...register("roomDescription", { required: "Description is required" })}
              className="w-full p-3 border border-gray-300 rounded-md resize-none text-gray-800 placeholder-gray-500"
              rows={4}
            />
            {errors.roomDescription && <p className="text-sm text-red-500">{errors.roomDescription.message}</p>}

            <div>
              <label className="block text-sm text-gray-700 mb-1">Upload Room Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="w-full p-2 border border-gray-300 text-gray-800 rounded-md bg-white"
              />
              <p className="text-xs text-gray-500 mt-1">You can upload multiple images (max 10)</p>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-medium py-3 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Create Room
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateRoom;
