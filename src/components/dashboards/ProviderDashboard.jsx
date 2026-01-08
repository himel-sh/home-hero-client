import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router";
import { Plus, Edit2, Trash2, TrendingUp } from "lucide-react";
import Swal from "sweetalert2";

const ProviderDashboard = () => {
  const { user } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, [user]);

  const fetchServices = async () => {
    try {
      const res = await fetch(
        `https://home-hero-server-zeta.vercel.app/provider/services?email=${user.email}`
      );
      const data = await res.json();
      setServices(data);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (serviceId) => {
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
            fetchServices();
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

      {/* Stats */}
      <div className="bg-primary/10 p-6 rounded-lg border border-primary/20 mb-8">
        <div className="flex items-center gap-4">
          <TrendingUp className="text-primary" size={32} />
          <div>
            <p className="text-accent/70 text-sm">Total Services</p>
            <p className="text-3xl font-bold text-accent">{services.length}</p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
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
                    onClick={() => handleDelete(service._id)}
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
    </div>
  );
};

export default ProviderDashboard;
