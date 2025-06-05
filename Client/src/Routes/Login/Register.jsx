import React, { useEffect } from "react";
import Slider from "../../Componets/Slider";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import apiRequest from "../../lib/axiosInstance";

// ✅ Validation Schema
const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  image: Yup.mixed().test(
    "required",
    "Profile image is required",
    (value) => value && value.length > 0
  ),
  role: Yup.string().required("Role is required"),
});

const Register = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // ⛔ Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user, navigate]);

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("phone", data.phone);
    formData.append("role", data.role);
    formData.append("image", data.image[0]); // ✅ Matches backend field

    try {
      const response = await apiRequest.post("/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        alert("✅ Registration successful!");
        navigate("/login");
      } else {
        alert("❌ " + response.data.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("❌ Registration failed! " + (error.response?.data?.message || ""));
    }
  };

  return (
    <div className="grid grid-cols-2 gap-[200px] w-screen mx-10 p-1 py-5 items-center">
      {/* Left - Slider */}
      <div className="w-[900px] h-[520px]">
        <Slider />
      </div>

      {/* Right - Register Form */}
      <div className="flex flex-col items-center justify-self-end w-[400px] min-h-fit bg-blue-100 shadow-2xl shadow-gray-200 border-2 border-gray-400 rounded-3xl p-6 mx-auto">
        <h2 className="text-5xl font-bold text-gray-900 mb-10 font-serif">Register</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full space-y-5">
          {/* Username */}
          <input
            {...register("username")}
            type="text"
            placeholder="Username"
            className="input input-bordered w-full bg-gray-100 text-gray-600"
          />
          {errors.username && <p className="text-red-500">{errors.username.message}</p>}

          {/* Email */}
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="input input-bordered w-full bg-gray-100 text-gray-600"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}

          {/* Password */}
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="input input-bordered w-full bg-gray-100 text-gray-600"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}

          {/* Phone */}
          <input
            {...register("phone")}
            type="tel"
            placeholder="Phone Number"
            className="input input-bordered w-full bg-gray-100 text-gray-600"
          />
          {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

          {/* File Upload */}
          <input
            {...register("image")}
            type="file"
            accept="image/*"
            className="w-full text-gray-400 file:py-2 file:px-4 file:border-2 file:border-gray-300 file:bg-gray-100 file:rounded-lg file:text-blue-500 hover:file:bg-blue-200"
          />
          {errors.image && <p className="text-red-500">{errors.image.message}</p>}

          {/* Role Select */}
          <select
            {...register("role")}
            className="select select-md w-full bg-gray-100 text-gray-600"
          >
            <option disabled value="">Select Role</option>
            <option value="user">User</option>
            <option value="manager">Manager</option>
          </select>
          {errors.role && <p className="text-red-500">{errors.role.message}</p>}

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full">
            Submit
          </button>
        </form>

        <p className="mt-4 text-gray-600 text-md">
          Already have an account?
          <Link to="/login" className="text-blue-600 hover:underline"> Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
