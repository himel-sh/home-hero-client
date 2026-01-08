import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Users, BarChart3, AlertCircle } from "lucide-react";
import Swal from "sweetalert2";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    providers: 0,
    regularUsers: 0,
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch(
        `https://home-hero-server-zeta.vercel.app/users?adminEmail=${user.email}`
      );
      const data = await res.json();

      if (res.ok) {
        setUsers(data);
        setStats({
          totalUsers: data.length,
          providers: data.filter((u) => u.role === "provider").length,
          regularUsers: data.filter((u) => u.role === "user").length,
        });
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await fetch(
        `https://home-hero-server-zeta.vercel.app/users/${userId}/role`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: newRole, adminEmail: user.email }),
        }
      );

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Role Updated",
          text: `User role changed to ${newRole}`,
          timer: 2000,
          showConfirmButton: false,
        });
        fetchUsers();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update user role",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-accent mb-8">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
          <div className="flex items-center gap-4">
            <Users className="text-primary" size={32} />
            <div>
              <p className="text-accent/70 text-sm">Total Users</p>
              <p className="text-3xl font-bold text-accent">
                {stats.totalUsers}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-secondary/10 p-6 rounded-lg border border-secondary/20">
          <div className="flex items-center gap-4">
            <BarChart3 className="text-secondary" size={32} />
            <div>
              <p className="text-accent/70 text-sm">Service Providers</p>
              <p className="text-3xl font-bold text-accent">
                {stats.providers}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-accent/10 p-6 rounded-lg border border-accent/20">
          <div className="flex items-center gap-4">
            <AlertCircle className="text-accent" size={32} />
            <div>
              <p className="text-accent/70 text-sm">Regular Users</p>
              <p className="text-3xl font-bold text-accent">
                {stats.regularUsers}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-base-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-base-300">
              <tr>
                <th className="px-6 py-4 text-left text-accent font-semibold">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-accent font-semibold">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-accent font-semibold">
                  Current Role
                </th>
                <th className="px-6 py-4 text-left text-accent font-semibold">
                  Change Role
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr
                  key={u._id}
                  className="border-t border-base-300 hover:bg-base-100"
                >
                  <td className="px-6 py-4 text-accent">{u.name || "N/A"}</td>
                  <td className="px-6 py-4 text-accent text-sm">{u.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        u.role === "admin"
                          ? "bg-red-500/20 text-red-600"
                          : u.role === "provider"
                          ? "bg-blue-500/20 text-blue-600"
                          : "bg-green-500/20 text-green-600"
                      }`}
                    >
                      {u.role || "user"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={u.role || "user"}
                      onChange={(e) => handleRoleChange(u._id, e.target.value)}
                      className="select select-sm select-bordered bg-base-100 text-accent"
                    >
                      <option value="user">User</option>
                      <option value="provider">Provider</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
