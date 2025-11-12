import { Link } from "react-router";
import React, { useEffect, useState } from "react";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/services")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch services");
        }
        return res.json();
      })
      .then((data) => setServices(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner text-accent text-3xl"></span>
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
    <section className="py-16 bg-base-200">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-accent">
          Our Services
        </h2>

        {services.length === 0 ? (
          <p className="text-center text-gray-500">No services available.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service._id}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <figure>
                  <img
                    src={service.imageUrl}
                    alt={service.serviceName}
                    className="w-full h-56 object-cover"
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
                  <div className="card-actions justify-start mt-4">
                    <Link
                      to={`/services/${service._id}`}
                      className="btn btn-secondary text-accent font-bold px-4 py-2 rounded-lg shadow-lg hover:scale-105 transition-transform"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
