import React from "react";
import { Wrench, Plug, Hammer, Paintbrush, Layers, Home } from "lucide-react";
import { useNavigate } from "react-router";

const iconMap = {
  Plumbing: Wrench,
  Electrical: Plug,
  Carpentry: Hammer,
  Painting: Paintbrush,
  Flooring: Layers,
  "Home Renovation": Home,
};

const HomeServices = ({ services }) => {
  const navigate = useNavigate();

  if (!services || services.length === 0)
    return <p className="text-center text-gray-500">No services available.</p>;

  return (
    <section className="py-20 bg-base-200">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="uppercase tracking-widest text-2xl text-secondary font-extrabold mb-2">
            Services
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-accent">
            We can handle all types of handyman services
          </h2>
        </div>

        {/* Cards */}
        <div className="grid gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon =
              iconMap[service.serviceName] ||
              Object.values(iconMap)[index % Object.values(iconMap).length];

            return (
              <div
                key={service._id}
                onClick={() => navigate(`/services/${service._id}`)}
                className="relative group bg-base-300 p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                {/* Icon */}
                <div className="absolute -top-6 left-6 p-3 rounded-md bg-secondary group-hover:bg-primary transition-all">
                  <Icon className="w-8 h-8 text-white group-hover:text-black" />
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

                  <span
                    className="text-accent font-semibold opacity-0 -translate-x-2 
                    group-hover:opacity-100 group-hover:translate-x-0 
                    transition-all duration-300"
                  >
                    Read More →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeServices;
