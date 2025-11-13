import React, { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import { auth } from "../firebase/firebase.init";

const Profile = () => {
  const { user, setUser, updateUserProfile } = useContext(AuthContext);
  const [formData, setFormData] = useState({ name: "", photoURL: "" });
  const [loading, setLoading] = useState(false);

  // Initialize formData when user becomes available
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.displayName || user.name || "",
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
      const encodedEmail = encodeURIComponent(user.email.toLowerCase());

      const res = await fetch(
        `https://home-hero-server-zeta.vercel.app/users/email/${encodedEmail}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const backendData = await res.json();
      if (!res.ok) throw new Error(backendData.message || "Update failed");

      if (auth.currentUser) {
        await updateUserProfile({
          displayName: formData.name,
          photoURL: formData.photoURL,
        });
      }

      setUser((prev) => ({
        ...prev,
        displayName: formData.name,
        photoURL: formData.photoURL,
        ...backendData,
      }));

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
      <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-2xl border-2 border-secondary/30">
        <h2 className="text-3xl font-bold text-accent mb-8 text-center">
          My Profile
        </h2>

        {/* Profile Info */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
          <img
            src={formData.photoURL || "/default-avatar.png"}
            alt={formData.name || "User"}
            className="w-32 h-32 rounded-full object-cover border-2 border-secondary shadow-sm"
          />
          <div className="flex-1 text-center md:text-left">
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p className="text-gray-700 mb-1">
              <span className="font-semibold">Last Login:</span>{" "}
              {user.lastLogin
                ? new Date(user.lastLogin).toLocaleString()
                : "N/A"}
            </p>
          </div>
        </div>

        {/* Update Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-semibold mb-2 text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="input input-bordered w-full rounded-xl border-secondary/50 shadow-sm focus:border-secondary focus:ring-1 focus:ring-secondary transition"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-2 text-gray-700">
              Profile Image URL
            </label>
            <input
              type="text"
              name="photoURL"
              value={formData.photoURL}
              onChange={handleChange}
              placeholder="Enter image URL"
              className="input input-bordered w-full rounded-xl border-secondary/50 shadow-sm focus:border-secondary focus:ring-1 focus:ring-secondary transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 bg-gradient-to-r from-secondary to-primary text-accent font-semibold rounded-xl shadow-md hover:shadow-xl hover:text-white transition-all duration-300"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Profile;
