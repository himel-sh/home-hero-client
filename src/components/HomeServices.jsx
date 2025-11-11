import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Wrench, Plug, Hammer, Paintbrush, Layers, Home } from "lucide-react";
import { useNavigate } from "react-router";
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const iconMap = {
  Plumbing: Wrench,
  Electrical: Plug,
  Carpentry: Hammer,
  Painting: Paintbrush,
  Flooring: Layers,
  "Home Renovation": Home,
};

const HomeServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:3000/services")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch services");
        return res.json();
      })
      .then((data) => setServices(data.slice(0, 6)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <span className="loading loading-spinner text-accent text-3xl"></span>
      </div>
    );

  if (error)
    return <div className="text-center text-red-500 mt-10">Error: {error}</div>;

  return (
    <section className="py-20 bg-base-200">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="uppercase tracking-widest text-2xl text-secondary font-extrabold mb-2">
            Services
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-accent">
            We can handle all types of handyman services
          </h2>
        </motion.div>

        {/* Service Cards */}
        {services.length === 0 ? (
          <p className="text-center text-gray-500">No services available.</p>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service, index) => {
              const Icon =
                iconMap[service.serviceName] ||
                Object.values(iconMap)[index % Object.values(iconMap).length];

              return (
                <motion.div
                  key={service._id}
                  onClick={() => navigate("/services")}
                  variants={fadeInUp}
                  className="relative group bg-base-300 p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between cursor-pointer"
                >
                  {/* Icon */}
                  <div className="absolute -top-6 left-6 p-3 rounded-md bg-secondary transition-colors duration-300 group-hover:bg-primary">
                    <Icon className="w-8 h-8 text-white transition-colors duration-300 group-hover:text-black" />
                  </div>

                  {/* Content */}
                  <div className="mt-8">
                    <h3 className="text-xl font-bold text-accent mb-2">
                      {service.serviceName}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {service.description.length > 100
                        ? service.description.slice(0, 100) + "..."
                        : service.description}
                    </p>

                    <div className="flex items-center gap-1 mt-2">
                      <span
                        className="text-accent font-semibold opacity-0 -translate-x-2 
                        group-hover:opacity-100 group-hover:translate-x-0 
                        transition-all duration-300"
                      >
                        Read More →
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default HomeServices;
