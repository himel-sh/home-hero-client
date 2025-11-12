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

  // Handle basic input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle "What’s Included" array changes
  const handleIncludedChange = (index, value) => {
    const updated = [...formData.whatIncluded];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, whatIncluded: updated }));
  };

  const addIncludedField = () => {
    setFormData((prev) => ({
      ...prev,
      whatIncluded: [...prev.whatIncluded, ""],
    }));
  };

  const removeIncludedField = (index) => {
    setFormData((prev) => ({
      ...prev,
      whatIncluded: prev.whatIncluded.filter((_, i) => i !== index),
    }));
  };

  // Submit PATCH request
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
        email: providerEmail,
      };

      const res = await fetch(
        `http://localhost:3000/services/${formData._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      // Handle possible empty JSON response
      let updatedService;
      try {
        updatedService = await res.json();
      } catch {
        updatedService = { ...formData }; // fallback
      }

      if (!res.ok) {
        throw new Error(updatedService?.message || "Failed to update service");
      }

      // SweetAlert success
      await Swal.fire("Success", "Service updated successfully!", "success");

      // Update parent state immediately
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-6 rounded-2xl w-11/12 md:w-3/4 max-h-[90vh] overflow-y-auto"
      >
        <h3 className="text-2xl font-bold mb-4">Edit Service</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="serviceName"
              placeholder="Service Name"
              value={formData.serviceName}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              name="estimatedDuration"
              placeholder="Estimated Duration"
              value={formData.estimatedDuration}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>

          {/* Textareas */}
          <textarea
            name="description"
            placeholder="Short Description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <textarea
            name="longDescription"
            placeholder="Long Description"
            value={formData.longDescription}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <textarea
            name="customerBenefits"
            placeholder="Customer Benefits"
            value={formData.customerBenefits}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL or Base64"
            value={formData.imageUrl}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />

          {/* What’s Included */}
          <div>
            <label className="block font-semibold mb-1">What’s Included</label>
            {formData.whatIncluded.map((item, index) => (
              <div key={index} className="flex items-center gap-2 mb-1">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleIncludedChange(index, e.target.value)}
                  className="border p-2 rounded w-full"
                  required
                />
                {formData.whatIncluded.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeIncludedField(index)}
                    className="text-red-500"
                  >
                    <Trash size={18} />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addIncludedField}
              className="mt-1 text-blue-500 flex items-center gap-1"
            >
              <Plus size={18} /> Add Item
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded bg-green-500 text-white"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EditServiceModal;
