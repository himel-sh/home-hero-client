import React, { useEffect, useState } from "react";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://home-hero-server-zeta.vercel.app/testimonials")
      .then((res) => res.json())
      .then((data) => {
        setTestimonials(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching testimonials:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="bg-base-300 py-20 px-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center mb-12"
      >
        <p className="uppercase tracking-widest text-2xl text-secondary font-extrabold mb-2">
          Testimonials
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-accent">
          Happy Clients say <br /> About Us
        </h2>
      </motion.div>

      {loading ? (
        <p className="text-center text-gray-500">Loading testimonials...</p>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8"
        >
          {testimonials.map((item) => (
            <motion.div
              key={item._id}
              variants={cardVariants}
              whileHover={{ scale: 1.03, y: -5 }}
              className="bg-white relative rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 px-8 py-10 border-t-4 border-transparent hover:border-secondary"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                className="absolute -top-5 left-8 bg-secondary p-2 rounded"
              >
                <Quote className="text-white w-5 h-5" />
              </motion.div>

              <p className="text-gray-600 mt-4 text-sm leading-relaxed">
                "{item.text}"
              </p>

              <div className="flex items-center gap-4 mt-6">
                <motion.img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover"
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  transition={{ type: "spring", stiffness: 200 }}
                />
                <div>
                  <h4 className="font-semibold text-gray-800">{item.name}</h4>
                  <p className="text-xs text-gray-500">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default Testimonial;
