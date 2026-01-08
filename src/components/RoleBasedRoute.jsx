import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router";

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  const userRole = user.role || "user";

  if (!allowedRoles.includes(userRole)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-base-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-accent mb-4">Access Denied</h1>
          <p className="text-accent/70 mb-6">
            You don't have permission to access this page.
          </p>
          <a href="/" className="btn btn-primary text-accent">
            Go Home
          </a>
        </div>
      </div>
    );
  }

  return children;
};

export default RoleBasedRoute;
