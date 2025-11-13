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
  Star,
} from "lucide-react";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "My Bookings - HomeHero";
  }, []);

  // Fetch bookings and attach service reviews
  useEffect(() => {
    if (!user?.email) return;
    setLoading(true);

    fetch(
      `https://home-hero-server-zeta.vercel.app/bookings?email=${user.email}`
    )
      .then((res) => res.json())
      .then(async (data) => {
        const bookingsWithReviews = await Promise.all(
          data.map(async (b) => {
            try {
              const resService = await fetch(
                `https://home-hero-server-zeta.vercel.app/services/${b.serviceId}`
              );
              const service = await resService.json();
              const reviews = service.reviews || [];
              const avgRating =
                reviews.length > 0
                  ? (
                      reviews.reduce((acc, r) => acc + r.rating, 0) /
                      reviews.length
                    ).toFixed(1)
                  : null;
              return { ...b, avgRating };
            } catch (err) {
              console.error("Error fetching service reviews:", err);
              return { ...b, avgRating: null };
            }
          })
        );
        setBookings(bookingsWithReviews);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
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
        fetch(`https://home-hero-server-zeta.vercel.app/bookings/${id}`, {
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

  // Submit rating
  const handleRating = (serviceId) => {
    Swal.fire({
      title: "Submit Your Rating",
      html: `
      <div class="flex flex-col gap-3">
        <label class="text-gray-700 font-medium">Rating (1-5)</label>
        <input type="number" id="rating" min="1" max="5" class="swal2-input text-center text-lg font-semibold" placeholder="1-5">
        <label class="text-gray-700 font-medium">Comment (optional)</label>
        <textarea id="comment" class="swal2-textarea" placeholder="Share your experience..." style="min-height:80px;"></textarea>
      </div>
    `,
      showCancelButton: true,
      confirmButtonText: "Submit",
      cancelButtonText: "Cancel",
      showCloseButton: true,
      customClass: {
        popup: "rounded-2xl p-6 shadow-xl max-w-md mx-auto",
        confirmButton:
          "bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold px-6 py-2 rounded-xl hover:opacity-90 transition",
        cancelButton:
          "bg-gray-200 text-gray-700 px-6 py-2 rounded-xl hover:bg-gray-300 transition",
      },
      preConfirm: () => {
        const rating = Number(document.getElementById("rating").value);
        const comment = document.getElementById("comment").value;

        if (!rating || rating < 1 || rating > 5) {
          Swal.showValidationMessage("Rating must be between 1 and 5");
          return;
        }

        return { rating, comment };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const review = {
          userEmail: user.email,
          rating: result.value.rating,
          comment: result.value.comment,
          createdAt: new Date(),
        };

        fetch(
          `https://home-hero-server-zeta.vercel.app/services/${serviceId}/reviews`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ review }),
          }
        )
          .then((res) => res.json())
          .then(() => {
            Swal.fire(
              "Thank you!",
              "Your review has been submitted.",
              "success"
            );
            setBookings((prev) =>
              prev.map((b) =>
                b.serviceId === serviceId
                  ? { ...b, avgRating: review.rating }
                  : b
              )
            );
          })
          .catch((err) => {
            Swal.fire("Error", "Failed to submit review.", "error");
            console.error(err);
          });
      }
    });
  };

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
      <div className="flex items-center justify-center gap-3 mb-8">
        <ClipboardList className="text-secondary" size={36} />
        <h2 className="text-4xl font-bold text-gray-800">My Bookings</h2>
      </div>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No bookings found.</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto rounded-xl shadow-md border border-gray-200">
            <motion.table
              layout
              className="table-auto w-full border-collapse bg-white rounded-xl overflow-hidden"
            >
              <thead className="bg-blue-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-gray-700">
                    Service
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-gray-700">
                    Provider
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-gray-700">
                    Price
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-gray-700">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-gray-700">
                    Rating
                  </th>
                  <th className="px-4 py-3 text-center font-bold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>

              <motion.tbody layout>
                {bookings.map((b, index) => (
                  <motion.tr
                    key={b._id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b hover:bg-blue-50 transition-all"
                  >
                    <td className="px-4 py-3 text-gray-800 font-medium">
                      {b.serviceName}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {b.providerName}
                    </td>
                    <td className="px-4 py-3 text-gray-700 font-semibold">
                      ৳ {b.price}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{b.bookingDate}</td>
                    <td className="px-4 py-3 text-yellow-500 font-semibold">
                      {b.avgRating ? (
                        <>
                          <Star size={16} className="inline mr-1" />
                          {b.avgRating}
                        </>
                      ) : (
                        "No rating"
                      )}
                    </td>
                    <td className="px-4 py-3 text-center flex flex-col gap-2 items-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleCancel(b._id)}
                        className="bg-primary text-red-600 px-3 py-1 rounded hover:text-white hover:font-bold hover:bg-red-600 w-full"
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleRating(b.serviceId)}
                        className="bg-secondary text-accent px-3 py-1 rounded hover:text-white hover:font-bold w-full"
                      >
                        <Star size={16} className="inline mr-1" /> Rate
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </motion.table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden flex flex-col gap-4">
            {bookings.map((b) => (
              <motion.div
                key={b._id}
                className="bg-white shadow rounded-lg p-4 border border-gray-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {b.serviceName}
                  </h3>
                  <span className="text-yellow-500 font-semibold">
                    {b.avgRating ? (
                      <>
                        <Star size={16} className="inline mr-1" />
                        {b.avgRating}
                      </>
                    ) : (
                      "No rating"
                    )}
                  </span>
                </div>
                <p className="text-gray-600">
                  <User size={14} className="inline mr-1" />
                  {b.providerName}
                </p>
                <p className="text-gray-700 font-semibold">
                  <DollarSign size={14} className="inline mr-1" /> ৳ {b.price}
                </p>
                <p className="text-gray-600">
                  <CalendarDays size={14} className="inline mr-1" />
                  {b.bookingDate}
                </p>
                <div className="flex gap-2 mt-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCancel(b._id)}
                    className="flex-1 bg-primary text-red-600 px-3 py-1 rounded hover:text-white hover:font-bold hover:bg-red-600"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleRating(b.serviceId)}
                    className="flex-1 bg-secondary text-accent px-3 py-1 rounded hover:text-white hover:font-bold "
                  >
                    <Star size={16} className="inline mr-1" /> Rate
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default MyBookings;
