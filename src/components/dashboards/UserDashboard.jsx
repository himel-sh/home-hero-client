import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Calendar, MapPin, DollarSign, Clock } from "lucide-react";
import Swal from "sweetalert2";

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const fetchBookings = async () => {
    try {
      const res = await fetch(
        `https://home-hero-server-zeta.vercel.app/bookings?email=${user.email}`
      );
      const data = await res.json();
      setBookings(data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    Swal.fire({
      title: "Cancel Booking?",
      text: "Are you sure you want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Cancel Booking",
      cancelButtonText: "Keep It",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(
            `https://home-hero-server-zeta.vercel.app/bookings/${bookingId}`,
            {
              method: "DELETE",
            }
          );

          if (res.ok) {
            Swal.fire({
              icon: "success",
              title: "Cancelled",
              text: "Booking cancelled successfully",
              timer: 2000,
              showConfirmButton: false,
            });
            fetchBookings();
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to cancel booking",
          });
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-accent mb-8">My Bookings</h1>

      {/* Stats */}
      <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 mb-8">
        <div className="flex items-center gap-4">
          <Calendar className="text-primary" size={32} />
          <div>
            <p className="text-accent/70 text-sm">Total Bookings</p>
            <p className="text-3xl font-bold text-accent">{bookings.length}</p>
          </div>
        </div>
      </div>

      {/* Bookings List */}
      {bookings.length === 0 ? (
        <div className="text-center py-12 bg-base-200 rounded-lg">
          <p className="text-accent/70 text-lg">No bookings yet</p>
          <p className="text-accent/50 text-sm mt-2">
            Browse services and make your first booking
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-base-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-accent mb-4">
                    {booking.serviceName}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-accent/80">
                      <MapPin size={18} />
                      <span>{booking.location || "N/A"}</span>
                    </div>
                    <div className="flex items-center gap-3 text-accent/80">
                      <Calendar size={18} />
                      <span>{new Date(booking.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-3 text-accent/80">
                      <Clock size={18} />
                      <span>{booking.time || "N/A"}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between">
                  <div>
                    <p className="text-accent/70 text-sm mb-2">Service Price</p>
                    <p className="text-3xl font-bold text-primary">
                      ${booking.price}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        booking.status === "confirmed"
                          ? "bg-green-500/20 text-green-600"
                          : booking.status === "pending"
                          ? "bg-yellow-500/20 text-yellow-600"
                          : "bg-red-500/20 text-red-600"
                      }`}
                    >
                      {booking.status || "pending"}
                    </span>
                    <button
                      onClick={() => handleCancelBooking(booking._id)}
                      className="btn btn-sm btn-error text-white"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
