import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

const PrivateRoute = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    // Optional: Show a loader while auth state is being checked
    return <div className="text-center mt-20">Loading...</div>;
  }

  // If user exists, render child routes (Outlet), else redirect to login
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
