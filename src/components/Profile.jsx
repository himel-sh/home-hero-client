import React, { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext); // get setUser from context
  const [formData, setFormData] = useState({ name: "", photoURL: "" });
  const [loading, setLoading] = useState(false);

  // Set document title
  useEffect(() => {
    document.title = "My Profile - HomeHero";
  }, []);

  // Populate form with user data
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        photoURL: user.photoURL || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Use email to identify user
      const res = await fetch(
        `http://localhost:3000/users/email/${user.email}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || "Update failed");
      }

      // Update context
      setUser(data);

      Swal.fire("Success", "Profile updated successfully!", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err.message || "Failed to update profile", "error");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <motion.div
      className="py-16 bg-base-200 min-h-[80vh] flex justify-center items-start"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">
        {/* Header */}
        <h2 className="text-3xl font-bold text-accent mb-6">My Profile</h2>

        {/* Profile Info */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          <img
            src={formData.photoURL || "/default-avatar.png"}
            alt={user.name}
            className="w-32 h-32 rounded-full object-cover border-2 border-secondary"
          />
          <div className="flex-1">
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">Last Login:</span>{" "}
              {new Date(user.lastLogin).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Update Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">
              Profile Image URL
            </label>
            <input
              type="text"
              name="photoURL"
              value={formData.photoURL}
              onChange={handleChange}
              placeholder="Enter image URL"
              className="input input-bordered w-full"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-secondary w-full mt-2"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Profile;
