import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import {
  Trash2,
  CalendarDays,
  User,
  DollarSign,
  ClipboardList,
} from "lucide-react";

const MyBookings = () => {
  useEffect(() => {
    document.title = "My Bookings - HomeHero"; // sets browser tab title
  }, []);
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch logged-in user's bookings
  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:3000/bookings?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
        setLoading(false);
      });
  }, [user?.email]);

  // Cancel booking
  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This booking will be cancelled!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/bookings/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Cancelled!", "Booking has been cancelled.", "success");
              setBookings((prev) => prev.filter((b) => b._id !== id));
            } else {
              Swal.fire("Error", "Failed to cancel booking.", "error");
            }
          })
          .catch((err) => {
            Swal.fire("Error", "Something went wrong.", "error");
            console.error(err);
          });
      }
    });
  };

  // Loading animation
  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full"
        />
      </div>
    );

  return (
    <motion.div
      className="w-11/12 mx-auto py-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Title */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <ClipboardList className="text-secondary" size={36} />
        <h2 className="text-4xl font-bold text-gray-800">My Bookings</h2>
      </div>

      {/* Table */}
      {bookings.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No bookings found.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200">
          <motion.table
            layout
            className="table-auto w-full border-collapse bg-white rounded-xl overflow-hidden"
          >
            <thead className="bg-blue-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left font-bold text-gray-700">
                  Service Name
                </th>
                <th className="px-6 py-3 text-left font-bold text-gray-700">
                  <User size={16} className="inline mr-1 text-secondary" />
                  Provider
                </th>
                <th className="px-6 py-3 text-left font-bold text-gray-700">
                  <DollarSign
                    size={16}
                    className="inline mr-1 text-green-600"
                  />
                  Price
                </th>
                <th className="px-6 py-3 text-left font-bold text-gray-700">
                  <CalendarDays
                    size={16}
                    className="inline mr-1 text-orange-600"
                  />
                  Booking Date
                </th>
                <th className="px-6 py-3 text-center font-bold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            <motion.tbody layout>
              {bookings.map((booking, index) => (
                <motion.tr
                  key={booking._id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b hover:bg-blue-50 transition-all"
                >
                  <td className="px-6 py-3 text-gray-800 font-medium">
                    {booking.serviceName}
                  </td>
                  <td className="px-6 py-3 text-gray-600">
                    {booking.providerName}
                  </td>
                  <td className="px-6 py-3 text-gray-700 font-semibold">
                    ৳ {booking.price}
                  </td>
                  <td className="px-6 py-3 text-gray-600">
                    {booking.bookingDate}
                  </td>
                  <td className="px-6 py-3 text-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCancel(booking._id)}
                      className="flex items-center justify-center gap-2 mx-auto bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
                    >
                      <Trash2 size={16} /> Cancel
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </motion.table>
        </div>
      )}
    </motion.div>
  );
};

export default MyBookings;
