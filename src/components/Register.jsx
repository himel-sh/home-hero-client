import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, useLocation, Link } from "react-router";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  document.title = "Register - Home Hero";
  const { createUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Password validation
  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(formData.password)) {
      Swal.fire(
        "Invalid Password",
        "Password must be at least 6 characters and contain one uppercase and one lowercase letter.",
        "warning"
      );
      return;
    }

    setLoading(true);
    try {
      const result = await createUser(formData.email, formData.password);

      const newUser = {
        name: formData.name,
        email: formData.email,
        photoURL: formData.photoURL,
      };

      await fetch("https://home-hero-server-zeta.vercel.app/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      Swal.fire("Success", "Registration successful!", "success");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err.message || "Registration failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithGoogle();
      const newUser = {
        name: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
      };

      await fetch("https://home-hero-server-zeta.vercel.app/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      Swal.fire("Success", "Logged in with Google!", "success");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err.message || "Google sign-in failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-base-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border-2 border-secondary/50">
        <h2 className="text-3xl font-bold text-accent text-center mb-6">
          User Registration
        </h2>

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
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Photo URL</label>
            <input
              type="text"
              name="photoURL"
              value={formData.photoURL}
              onChange={handleChange}
              placeholder="Enter image URL"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="input input-bordered w-full"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-secondary text-accent hover:btn-secondary hover:text-white w-full mt-2"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="divider">OR</div>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="btn btn-outline btn-secondary w-full flex items-center justify-center gap-2"
        >
          <FcGoogle size={20} /> Continue with Google
        </button>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="link text-primary font-extrabold hover:text-secondary"
          >
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Register;
