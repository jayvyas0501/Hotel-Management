import React, { useState, useEffect } from "react";
import Slider from "../../Componets/Slider";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import apiRequest from "../../lib/axiosInstance"; // axios instance with base URL

const Login = () => {
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth(); // grab login and setUser from context

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Auto-redirect if user already logged in
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser && storedUser !== "undefined") {
        const userData = JSON.parse(storedUser);
        if (userData) {
          if (userData.role === "admin") {
            navigate("/adminpanel");
          } else if (userData.role === "manager") {
            navigate("/manager");
          } else {
            navigate("/");
          }
        }
      }
    } catch (error) {
      console.error("Error checking stored user:", error);
      localStorage.removeItem("user");
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    setLoading(true);
    setAuthError("");

    try {
      const response = await apiRequest.post("/auth/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { token, user } = response.data;

      // Store in context and localStorage
      login(user, token);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Navigate based on role
      if (user.role === "admin") {
        navigate("/adminpanel");
      } else if (user.role === "manager") {
        navigate("/manager");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setAuthError("❌ Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-[200px] w-screen mx-10 p-1 py-5 items-center">
      {/* Left - Slider */}
      <div className="w-[900px] h-[520px]">
        <Slider />
      </div>

      {/* Right - Login Form */}
      <div className="flex flex-col items-center w-[400px] h-[500px] bg-blue-100 shadow-2xl border border-gray-300 rounded-3xl p-6 mx-auto">
        <h2 className="text-5xl font-bold text-gray-900 mb-10 font-serif">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full space-y-5">
          {/* Email */}
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 text-gray-800 placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          {/* Password */}
          <input
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
            })}
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 text-gray-800 placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          {/* Error Message */}
          {authError && <p className="text-red-500 text-sm">{authError}</p>}

          {/* Loading */}
          {loading && (
            <div className="text-center py-2">
              <span className="text-blue-600">🔄 Logging in...</span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition duration-300 font-medium"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-gray-600 text-md">
          Don't have an account?
          <Link to="/register" className="text-blue-600 hover:underline ml-1">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
