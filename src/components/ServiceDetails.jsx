import React, { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Clock, User, Tag, Briefcase } from "lucide-react";
import { FaArrowRight } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";
import { useLoaderData } from "react-router";

const ServiceDetails = () => {
  const service = useLoaderData();
  const { user } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  if (!service) return <p>Loading...</p>;

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
    _id: serviceId,
  } = service;

  useEffect(() => {
    if (!user?.email || !serviceId) return;

    fetch(
      `http://localhost:3000/bookings/check?userEmail=${user.email}&serviceId=${serviceId}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.booked) setIsBooked(true);
      })
      .catch((err) => console.error("Error checking booking:", err));
  }, [user?.email, serviceId]);

  const handleBooking = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    fetch("http://localhost:3000/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire("Success", "Booking confirmed!", "success");
        e.target.reset();
        setModalOpen(false);
        setIsBooked(true);
      })
      .catch(() => {
        Swal.fire("Error", "Booking failed. Try again.", "error");
      });
  };

  return (
    <motion.div
      className="w-11/12 mx-auto py-10 space-y-16"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Header / Hero Section */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg">
        <motion.img
          src={imageUrl}
          alt={serviceName}
          className="w-full h-[400px] md:h-[600px] object-cover brightness-90"
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

      {/* Main Content */}
      <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left */}
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

          <div className="mt-8 bg-base-300 p-5 shadow-2xl rounded-xl border-l-4 border-secondary">
            <p className="text-gray-800 font-medium">{customerBenefits}</p>
          </div>
        </div>

        {/* Right Booking Card */}
        <motion.div
          className="p-6 bg-base-300 rounded-2xl shadow-xl space-y-5 h-fit sticky top-20"
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
            whileHover={{ scale: isBooked ? 1 : 1.05 }}
            whileTap={{ scale: isBooked ? 1 : 0.95 }}
            className={`w-full py-3 rounded-xl flex items-center justify-center gap-2 font-semibold 
              ${
                isBooked
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-primary text-accent hover:bg-secondary"
              }`}
            onClick={() => setModalOpen(true)}
            disabled={isBooked}
          >
            {isBooked ? "Booked" : "Book Now"} <FaArrowRight />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Booking Modal */}
      {modalOpen && !isBooked && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl relative"
          >
            <h3 className="text-xl font-bold mb-4">{serviceName}</h3>
            <p className="mb-4">{description}</p>

            <form onSubmit={handleBooking} className="space-y-4">
              <div className="flex flex-col gap-2">
                <label>Email</label>
                <input
                  type="email"
                  name="userEmail"
                  value={user?.email || ""}
                  readOnly
                  className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label>Booking Date</label>
                <input
                  type="date"
                  name="bookingDate"
                  required
                  className="input input-bordered w-full"
                />
              </div>

              <input type="hidden" name="serviceId" value={serviceId} />
              <input type="hidden" name="price" value={price} />
              <input type="hidden" name="serviceName" value={serviceName} />
              <input type="hidden" name="providerName" value={providerName} />

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-primary text-accent py-3 rounded-xl flex items-center justify-center gap-2 font-semibold"
              >
                Confirm Booking
              </motion.button>
            </form>

            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 font-bold text-xl"
            >
              ✕
            </button>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default ServiceDetails;
