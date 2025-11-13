import { Link } from "react-router";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import { Wrench } from "lucide-react";

const Services = () => {
  const { user } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    document.title = "Our Services - HomeHero";
  }, []);

  const fetchServices = () => {
    setLoading(true);
    setError(null);

    let query = [];
    if (minPrice) query.push(`minPrice=${minPrice}`);
    if (maxPrice) query.push(`maxPrice=${maxPrice}`);
    const queryString = query.length ? `?${query.join("&")}` : "";

    fetch(`https://home-hero-server-zeta.vercel.app/services${queryString}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch services");
        return res.json();
      })
      .then((data) => setServices(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleReset = () => {
    setMinPrice("");
    setMaxPrice("");
    fetchServices();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10 text-lg">
        Error: {error}
      </div>
    );
  }

  return (
    <motion.section
      className="py-16 bg-base-200"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        {/* Title and Filter */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Wrench className="text-secondary" size={36} />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Our Services
            </h2>
          </div>

          {/* Filter Box */}
          <div className="flex gap-2 items-center mt-4 md:mt-0">
            <input
              type="number"
              placeholder="Min ৳"
              value={minPrice}
              onChange={(e) => setMinPrice(Math.max(0, Number(e.target.value)))}
              className="input input-bordered input-sm w-20"
            />
            <input
              type="number"
              placeholder="Max ৳"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Math.max(0, Number(e.target.value)))}
              className="input input-bordered input-sm w-20"
            />
            <button
              onClick={fetchServices}
              className="btn btn-secondary text-accent hover:text-white btn-sm px-3 py-1"
            >
              Filter
            </button>
            <button
              onClick={handleReset}
              className="btn btn-outline btn-sm px-3 py-1"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Services Grid */}
        {services.length === 0 ? (
          <p className="text-center text-gray-500">No services available.</p>
        ) : (
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {services.map((service, index) => (
              <motion.div
                key={service._id}
                className="card bg-base-100 shadow-lg rounded-lg overflow-hidden"
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, delay: index * 0.05 },
                  },
                }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
                }}
              >
                <figure>
                  <img
                    src={service.imageUrl}
                    alt={service.serviceName}
                    className="w-full h-48 object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title text-lg font-semibold text-accent">
                    {service.serviceName}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {service.description.length > 100
                      ? service.description.slice(0, 100) + "..."
                      : service.description}
                  </p>
                  <p className="text-gray-700 font-semibold mt-2">
                    Price: ৳{service.price}
                  </p>
                  <div className="card-actions justify-start mt-3">
                    <Link
                      to={`/services/${service._id}`}
                      className={`btn btn-secondary text-accent font-bold px-4 py-2 rounded-lg shadow-lg transition-transform ${
                        user?.email === service.email
                          ? "opacity-50 cursor-not-allowed pointer-events-none"
                          : "hover:scale-105"
                      }`}
                    >
                      {user?.email === service.email
                        ? "Your Service"
                        : "Book Now"}
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default Services;
