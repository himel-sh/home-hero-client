import React from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="flex flex-col justify-center items-center min-h-screen bg-base-200 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-8xl font-extrabold text-secondary mb-6">404</h1>
      <p className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4 text-center">
        Oops! Page not found.
      </p>
      <p className="text-gray-500 mb-8 text-center">
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 mt-2 bg-gradient-to-r from-secondary to-primary text-accent font-semibold rounded-xl shadow-md hover:shadow-xl hover:text-white transition-all duration-300"
      >
        Back to Home
      </button>
    </motion.div>
  );
};

export default Error404;
