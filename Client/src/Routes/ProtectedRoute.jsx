import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth(); // ✅ get loading state
  const location = useLocation();

  if (loading) {
    return <div className="text-center py-20 text-lg">Loading...</div>; // 👈 loading state while checking user
  }

  // If no user or user doesn't have the required role
  if (!user || (allowedRoles && !allowedRoles.includes(user.role))) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default ProtectedRoute;
