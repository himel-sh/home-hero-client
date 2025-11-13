import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import {
  Edit,
  Trash2,
  ClipboardList,
  DollarSign,
  Layers,
  Wrench,
} from "lucide-react";
import EditServiceModal from "./EditServiceModal";

const MyServices = ({ providerEmail }) => {
  useEffect(() => {
    document.title = "My Services - HomeHero";
  }, []);

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState(null);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://home-hero-server-zeta.vercel.app/provider/services?email=${providerEmail}`
      );
      if (!res.ok) throw new Error("Failed to fetch services");
      const data = await res.json();
      setServices(data.map((s) => ({ ...s, _id: s._id.toString() })));
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch services", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This service will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(
        `https://home-hero-server-zeta.vercel.app/services/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: providerEmail }),
        }
      );
      if (!res.ok) throw new Error("Failed to delete service");

      Swal.fire("Deleted!", "Service has been removed.", "success");
      fetchServices();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to delete service", "error");
    }
  };

  // Loading spinner
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
        <Wrench className="text-secondary" size={36} />
        <h2 className="text-4xl font-bold text-gray-800">My Services</h2>
      </div>

      {/* Table */}
      {services.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No services found.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200">
          <motion.table
            layout
            className="table-auto w-full border-collapse bg-white rounded-xl overflow-hidden"
          >
            <thead className="bg-blue-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left font-bold text-gray-700">
                  <ClipboardList
                    size={16}
                    className="inline mr-1 text-secondary"
                  />
                  Service Name
                </th>
                <th className="px-6 py-3 text-left font-bold text-gray-700">
                  <Layers size={16} className="inline mr-1 text-purple-600" />
                  Category
                </th>
                <th className="px-6 py-3 text-left font-bold text-gray-700">
                  <DollarSign
                    size={16}
                    className="inline mr-1 text-green-600"
                  />
                  Price
                </th>
                <th className="px-6 py-3 text-center font-bold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            <motion.tbody layout>
              {services.map((service, index) => (
                <motion.tr
                  key={service._id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b hover:bg-blue-50 transition-all"
                >
                  <td className="px-6 py-3 text-gray-800 font-medium">
                    {service.serviceName}
                  </td>
                  <td className="px-6 py-3 text-gray-600">
                    {service.category}
                  </td>
                  <td className="px-6 py-3 text-gray-700 font-semibold">
                    ৳ {service.price}
                  </td>
                  <td className="px-6 py-3 text-center flex justify-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setEditingService(service)}
                      className="flex items-center gap-2 bg-secondary text-accent px-4 py-2 rounded-lg hover:bg-primary hover:font-bold transition-all"
                    >
                      <Edit size={16} /> Edit
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(service._id)}
                      className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 hover:font-bold transition-all"
                    >
                      <Trash2 size={16} /> Delete
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </motion.table>
        </div>
      )}

      {/* Edit Modal */}
      {editingService && (
        <EditServiceModal
          service={editingService}
          providerEmail={providerEmail}
          onClose={() => setEditingService(null)}
          onUpdate={fetchServices}
        />
      )}
    </motion.div>
  );
};

export default MyServices;
