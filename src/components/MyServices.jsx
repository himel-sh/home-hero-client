import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { Trash, Edit } from "lucide-react";
import EditServiceModal from "./EditServiceModal";

const MyServices = ({ providerEmail }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState(null);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:3000/provider/services?email=${providerEmail}`
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
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`http://localhost:3000/services/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: providerEmail }),
      });
      if (!res.ok) throw new Error("Failed to delete service");

      Swal.fire("Deleted!", "Service has been deleted.", "success");
      setServices((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to delete service", "error");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Services</h2>
      <motion.table
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full border-collapse shadow-md"
      >
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">Service Name</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <motion.tr
              key={service._id}
              whileHover={{ scale: 1.02 }}
              className="border-t hover:bg-gray-50"
            >
              <td className="p-3">{service.serviceName}</td>
              <td className="p-3">{service.category}</td>
              <td className="p-3">${service.price}</td>
              <td className="p-3 space-x-2">
                <button
                  onClick={() => setEditingService(service)}
                  className="bg-blue-500 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-blue-600 transition"
                >
                  <Edit size={16} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(service._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-red-600 transition"
                >
                  <Trash size={16} /> Delete
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>

      {services.length === 0 && (
        <p className="text-center mt-6 text-gray-500">No services found.</p>
      )}

      {editingService && (
        <EditServiceModal
          service={editingService}
          providerEmail={providerEmail}
          onClose={() => setEditingService(null)}
          onUpdate={(updatedService) => {
            setServices((prev) =>
              prev.map((s) =>
                s._id === updatedService._id ? updatedService : s
              )
            );
          }}
        />
      )}
    </div>
  );
};

export default MyServices;
