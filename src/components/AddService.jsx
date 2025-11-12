import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";
import { PlusCircle, Trash2, Plus } from "lucide-react";

const AddService = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    serviceName: "",
    category: "",
    price: "",
    description: "",
    longDescription: "",
    estimatedDuration: "",
    customerBenefits: "",
    imageUrl: "",
    whatIncluded: [""],
  });
  const [loading, setLoading] = useState(false);

  // Handle normal input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle dynamic list (whatIncluded)
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
    const updated = formData.whatIncluded.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, whatIncluded: updated }));
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.serviceName ||
      !formData.category ||
      !formData.price ||
      !formData.description ||
      !formData.imageUrl
    ) {
      return Swal.fire("Error", "Please fill in all required fields.", "error");
    }

    const newService = {
      ...formData,
      price: parseFloat(formData.price),
      providerName: user?.displayName || "Unknown Provider",
      email: user?.email || "unknown@email.com",
    };

    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newService),
      });

      const data = await res.json();

      if (data.insertedId || data.acknowledged) {
        Swal.fire("Success", "Service added successfully!", "success");
        setFormData({
          serviceName: "",
          category: "",
          price: "",
          description: "",
          longDescription: "",
          estimatedDuration: "",
          customerBenefits: "",
          imageUrl: "",
          whatIncluded: [""],
        });
      } else {
        Swal.fire("Error", "Failed to add service.", "error");
      }
    } catch (err) {
      console.error("Error adding service:", err);
      Swal.fire("Error", "Something went wrong!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="w-11/12 md:w-3/4 mx-auto py-10"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <PlusCircle className="text-secondary" size={36} />
        <h2 className="text-4xl font-bold text-gray-800">Add New Service</h2>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-md p-8 space-y-6 border border-gray-100"
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        {/* Basic Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Service Name
            </label>
            <input
              type="text"
              name="serviceName"
              value={formData.serviceName}
              onChange={handleChange}
              placeholder="e.g. Refrigerator Repair"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-secondary"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g. Electrician, Plumbing, Cleaning"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-secondary"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Price (৳)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              min={500}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-secondary"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Estimated Duration
            </label>
            <input
              type="text"
              name="estimatedDuration"
              value={formData.estimatedDuration}
              onChange={handleChange}
              placeholder="e.g. 2–4 hours"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-secondary"
            />
          </div>
        </div>

        {/* Description Fields */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">
            Short Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="2"
            placeholder="Write a short summary..."
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-secondary"
          ></textarea>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">
            Long Description
          </label>
          <textarea
            name="longDescription"
            value={formData.longDescription}
            onChange={handleChange}
            rows="4"
            placeholder="Write full detailed description..."
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-secondary"
          ></textarea>
        </div>

        {/* Customer Benefits */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">
            Customer Benefits
          </label>
          <textarea
            name="customerBenefits"
            value={formData.customerBenefits}
            onChange={handleChange}
            rows="2"
            placeholder="Why should customers choose this service?"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-secondary"
          ></textarea>
        </div>

        {/* What’s Included */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block font-semibold text-gray-700">
              What’s Included
            </label>
            <button
              type="button"
              onClick={addIncludedField}
              className="flex items-center text-accent hover:text-secondary gap-1"
            >
              <Plus size={18} /> Add Item
            </button>
          </div>
          {formData.whatIncluded.map((item, index) => (
            <div key={index} className="flex items-center gap-3 mb-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handleIncludedChange(index, e.target.value)}
                placeholder={`Included item ${index + 1}`}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-secondary"
              />
              {formData.whatIncluded.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeIncludedField(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Image URL + Preview */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">
            Image URL
          </label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/service-image.jpg"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-secondary"
          />
          {formData.imageUrl && (
            <img
              src={formData.imageUrl}
              alt="Preview"
              className="mt-3 w-full max-h-64 object-cover rounded-lg shadow"
              onError={(e) => (e.target.style.display = "none")}
            />
          )}
        </div>

        {/* Provider Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Provider Name
            </label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="w-full border border-gray-200 bg-gray-100 rounded-lg p-3 text-gray-600 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-2">
              Provider Email
            </label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full border border-gray-200 bg-gray-100 rounded-lg p-3 text-gray-600 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={`w-full py-3 rounded-lg font-semibold text-accent transition-all ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-secondary hover:bg-primary"
          }`}
        >
          {loading ? "Adding Service..." : "Add Service"}
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default AddService;
