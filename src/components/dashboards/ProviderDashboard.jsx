import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router";
import {
  Plus,
  Edit2,
  Trash2,
  TrendingUp,
  Calendar,
  User,
  DollarSign,
} from "lucide-react";
import Swal from "sweetalert2";

const ProviderDashboard = () => {
  const { user } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("services");

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      const [servicesRes, bookingsRes] = await Promise.all([
        fetch(
          `https://home-hero-server-zeta.vercel.app/provider/services?email=${user.email}`
        ),
        fetch(
          `https://home-hero-server-zeta.vercel.app/provider/bookings?email=${user.email}`
        ),
      ]);

      const servicesData = await servicesRes.json();
      const bookingsData = await bookingsRes.json();

      setServices(servicesData);
      setBookings(bookingsData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteService = async (serviceId) => {
    Swal.fire({
      title: "Delete Service?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(
            `https://home-hero-server-zeta.vercel.app/services/${serviceId}`,
            {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: user.email }),
            }
          );

          if (res.ok) {
            Swal.fire({
              icon: "success",
              title: "Deleted",
              text: "Service deleted successfully",
              timer: 2000,
              showConfirmButton: false,
            });
            fetchData();
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to delete service",
          });
        }
      }
    });
  };

  const handleUpdateBookingStatus = async (bookingId, newStatus) => {
    try {
      const res = await fetch(
        `https://home-hero-server-zeta.vercel.app/bookings/${bookingId}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status: newStatus,
            providerEmail: user.email,
          }),
        }
      );

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Updated",
          text: `Booking status changed to ${newStatus}`,
          timer: 2000,
          showConfirmButton: false,
        });
        fetchData();
      } else {
        const error = await res.json();
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message || "Failed to update booking status",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update booking status",
      });
    }
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
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-accent">Provider Dashboard</h1>
        <Link
          to="/addService"
          className="btn btn-primary text-accent flex items-center gap-2"
        >
          <Plus size={20} />
          Add New Service
        </Link>
      </div>

      {/* Tabs */}
      <div className="tabs tabs-bordered mb-8">
        <button
          className={`tab ${activeTab === "services" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("services")}
        >
          My Services ({services.length})
        </button>
        <button
          className={`tab ${activeTab === "bookings" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("bookings")}
        >
          Bookings ({bookings.length})
        </button>
      </div>

      {/* Services Tab */}
      {activeTab === "services" && (
        <>
          {/* Stats */}
          <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 mb-8">
            <div className="flex items-center gap-4">
              <TrendingUp className="text-primary" size={32} />
              <div>
                <p className="text-accent/70 text-sm">Total Services</p>
                <p className="text-3xl font-bold text-accent">
                  {services.length}
                </p>
              </div>
            </div>
          </div>

          {services.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-accent/70 text-lg mb-4">No services yet</p>
              <Link to="/addService" className="btn btn-primary text-accent">
                Create Your First Service
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div
                  key={service._id}
                  className="bg-base-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <img
                    src={service.image}
                    alt={service.serviceName}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-accent text-lg mb-2">
                      {service.serviceName}
                    </h3>
                    <p className="text-accent/70 text-sm mb-3 line-clamp-2">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-primary font-bold text-lg">
                        ${service.price}
                      </span>
                      <span className="text-xs bg-base-300 px-2 py-1 rounded text-accent">
                        {service.category}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        to={`/services/${service._id}`}
                        className="btn btn-sm btn-secondary text-accent flex-1"
                      >
                        <Edit2 size={16} />
                        View
                      </Link>
                      <button
                        onClick={() => handleDeleteService(service._id)}
                        className="btn btn-sm btn-error text-white"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Bookings Tab */}
      {activeTab === "bookings" && (
        <>
          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
              <div className="flex items-center gap-4">
                <Calendar className="text-primary" size={32} />
                <div>
                  <p className="text-accent/70 text-sm">Total Bookings</p>
                  <p className="text-3xl font-bold text-accent">
                    {bookings.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-500/10 p-6 rounded-lg border border-yellow-500/20">
              <div className="flex items-center gap-4">
                <Calendar className="text-yellow-600" size={32} />
                <div>
                  <p className="text-accent/70 text-sm">Pending</p>
                  <p className="text-3xl font-bold text-accent">
                    {bookings.filter((b) => b.status === "pending").length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-500/10 p-6 rounded-lg border border-green-500/20">
              <div className="flex items-center gap-4">
                <Calendar className="text-green-600" size={32} />
                <div>
                  <p className="text-accent/70 text-sm">Approved</p>
                  <p className="text-3xl font-bold text-accent">
                    {bookings.filter((b) => b.status === "approved").length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {bookings.length === 0 ? (
            <div className="text-center py-12 bg-base-200 rounded-lg">
              <p className="text-accent/70 text-lg">No bookings yet</p>
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
                          <User size={18} />
                          <span>{booking.userEmail}</span>
                        </div>
                        <div className="flex items-center gap-3 text-accent/80">
                          <Calendar size={18} />
                          <span>
                            {new Date(
                              booking.date || booking.bookingDate
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-accent/80">
                          <DollarSign size={18} />
                          <span>${booking.price}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <div>
                        <p className="text-accent/70 text-sm mb-2">Status</p>
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-semibold inline-block ${
                            booking.status === "approved"
                              ? "bg-green-500/20 text-green-600"
                              : booking.status === "pending"
                              ? "bg-yellow-500/20 text-yellow-600"
                              : "bg-red-500/20 text-red-600"
                          }`}
                        >
                          {booking.status || "pending"}
                        </span>
                      </div>

                      <div className="mt-4 flex gap-2">
                        {(!booking.status || booking.status === "pending") && (
                          <button
                            type="button"
                            onClick={() => {
                              console.log("Approving booking:", booking._id);
                              handleUpdateBookingStatus(
                                booking._id,
                                "approved"
                              );
                            }}
                            className="btn btn-sm btn-success text-white flex-1"
                          >
                            Approve
                          </button>
                        )}

                        {booking.status === "approved" && (
                          <button
                            type="button"
                            onClick={() => {
                              console.log("Marking as pending:", booking._id);
                              handleUpdateBookingStatus(booking._id, "pending");
                            }}
                            className="btn btn-sm btn-warning text-white flex-1"
                          >
                            Pending
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProviderDashboard;
