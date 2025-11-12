import React, { useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { Trash, Plus } from "lucide-react";

const EditServiceModal = ({ service, providerEmail, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    ...service,
    _id: service._id.toString(),
    whatIncluded: service.whatIncluded?.length ? service.whatIncluded : [""],
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIncludedChange = (index, value) => {
    const updated = [...formData.whatIncluded];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, whatIncluded: updated }));
  };

  const addIncludedField = () =>
    setFormData((prev) => ({
      ...prev,
      whatIncluded: [...prev.whatIncluded, ""],
    }));

  const removeIncludedField = (index) =>
    setFormData((prev) => ({
      ...prev,
      whatIncluded: prev.whatIncluded.filter((_, i) => i !== index),
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        serviceName: formData.serviceName,
        category: formData.category,
        price: parseFloat(formData.price),
        description: formData.description,
        longDescription: formData.longDescription,
        estimatedDuration: formData.estimatedDuration,
        customerBenefits: formData.customerBenefits,
        imageUrl: formData.imageUrl,
        whatIncluded: formData.whatIncluded,
        email: providerEmail.trim().toLowerCase(),
      };

      const res = await fetch(
        `http://localhost:3000/services/${formData._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const updatedService = await res.json();

      if (!res.ok)
        throw new Error(updatedService?.message || "Failed to update service");

      await Swal.fire("Success", "Service updated successfully!", "success");

      onUpdate(updatedService);
      onClose();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err.message || "Failed to update service", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white w-11/12 md:w-3/4 lg:w-2/4 rounded-2xl shadow-xl p-6 max-h-[90vh] overflow-y-auto"
      >
        <h3 className="text-3xl font-bold mb-6 text-secondary">Edit Service</h3>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="serviceName"
              placeholder="Service Name"
              value={formData.serviceName}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-400 focus:outline-none w-full"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400 focus:outline-none w-full"
            />
            <input
              type="text"
              name="estimatedDuration"
              placeholder="Estimated Duration"
              value={formData.estimatedDuration}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-400 focus:outline-none w-full"
            />
          </div>

          <textarea
            name="description"
            placeholder="Short Description"
            value={formData.description}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"
          />
          <textarea
            name="longDescription"
            placeholder="Long Description"
            value={formData.longDescription}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"
          />
          <textarea
            name="customerBenefits"
            placeholder="Customer Benefits"
            value={formData.customerBenefits}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400 focus:outline-none w-full"
          />
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL or Base64"
            value={formData.imageUrl}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"
          />

          {/* What’s Included */}
          <div>
            <label className="block font-semibold mb-2 text-gray-700">
              What’s Included
            </label>
            {formData.whatIncluded.map((item, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleIncludedChange(index, e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"
                  required
                />
                {formData.whatIncluded.length > 1 && (
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeIncludedField(index)}
                    className="text-red-500 p-2 rounded-full hover:bg-red-100 transition-all"
                  >
                    <Trash size={18} />
                  </motion.button>
                )}
              </div>
            ))}
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addIncludedField}
              className="mt-2 flex items-center gap-2 text-blue-500 font-medium hover:underline"
            >
              <Plus size={18} /> Add Item
            </motion.button>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-5">
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-all"
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 rounded-lg bg-secondary text-accent hover:bg-primary transition-all"
            >
              {loading ? "Updating..." : "Update"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EditServiceModal;
