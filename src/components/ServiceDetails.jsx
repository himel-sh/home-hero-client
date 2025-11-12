import React from "react";
import { useLoaderData } from "react-router";
import { motion } from "framer-motion";
import { CheckCircle, Clock, User, Tag, Briefcase } from "lucide-react";
import { FaArrowRight } from "react-icons/fa";

const ServiceDetails = () => {
  const service = useLoaderData();
  const {
    serviceName,
    category,
    price,
    description,
    longDescription,
    whatIncluded,
    estimatedDuration,
    customerBenefits,
    imageUrl,
    providerName,
  } = service;

  return (
    <motion.div
      className="w-11/12 mx-auto py-10 space-y-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* --- Header / Hero Section --- */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg">
        <motion.img
          src={imageUrl}
          alt={serviceName}
          className="w-full h-[400px] object-cover brightness-90"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
          <motion.h1
            className="text-3xl md:text-5xl font-extrabold"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {serviceName}
          </motion.h1>
          <div className="flex items-center gap-3 mt-3 text-sm md:text-base text-gray-200">
            <Tag size={18} />
            <span>{category}</span>
            <Clock size={18} className="ml-4" />
            <span>{estimatedDuration}</span>
          </div>
        </div>
      </div>

      {/* --- Main Content --- */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {/* --- Left: Details --- */}
        <div className="md:col-span-2 space-y-6">
          <motion.h2
            className="text-2xl font-bold text-neutral"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            Overview
          </motion.h2>
          <p className="text-gray-700 leading-relaxed">{description}</p>
          <p className="text-gray-700 leading-relaxed">{longDescription}</p>

          {/* --- What's Included --- */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold flex items-center gap-2 mb-3">
              <Briefcase size={20} /> What’s Included
            </h3>
            <ul className="space-y-2 text-gray-700">
              {whatIncluded?.map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-2"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <CheckCircle size={18} className="text-secondary mt-1" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* --- Customer Benefits --- */}
          <div className="mt-8 bg-base-300 p-5  shadow-2xl rounded-xl border-l-4 border-secondary">
            <p className="text-gray-800 font-medium">{customerBenefits}</p>
          </div>
        </div>

        {/* --- Right: Booking Card --- */}
        <motion.div
          className="p-6 bg-base-300 rounded-2xl shadow-xl  space-y-5 h-fit sticky top-20"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <div className="flex items-center gap-3">
            <User className="text-gray-600" />
            <div>
              <p className="text-sm text-gray-500">Service Provider</p>
              <p className="font-semibold text-gray-800">{providerName}</p>
            </div>
          </div>

          <div className="text-2xl font-bold text-secondary mt-4">
            ৳ {price}
            <span className="text-base text-gray-500 font-normal">
              {" "}
              / service
            </span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-primary py-3 rounded-xl flex items-center justify-center gap-2 font-semibold mt-5 hover:bg-secondary transition"
          >
            Book Now <FaArrowRight />
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ServiceDetails;
