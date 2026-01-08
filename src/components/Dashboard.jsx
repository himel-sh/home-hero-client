import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router";
import AdminDashboard from "./dashboards/AdminDashboard";
import ProviderDashboard from "./dashboards/ProviderDashboard";
import UserDashboard from "./dashboards/UserDashboard";

const Dashboard = () => {
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

  const role = user.role || "user";

  return (
    <div className="min-h-screen bg-base-100">
      {role === "admin" && <AdminDashboard />}
      {role === "provider" && <ProviderDashboard />}
      {role === "user" && <UserDashboard />}
    </div>
  );
};

export default Dashboard;
