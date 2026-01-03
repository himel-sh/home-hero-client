import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Swal from "sweetalert2";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "Thank you for contacting us. We'll get back to you soon.",
        timer: 3000,
        showConfirmButton: false,
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to send message. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-accent mb-4">Contact Us</h1>
          <p className="text-xl text-accent/80">
            We'd love to hear from you. Get in touch with us today.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-accent mb-8">
              Get In Touch
            </h2>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Mail className="text-primary" size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-accent mb-1">Email</h3>
                  <p className="text-accent/80">support@homehero.com</p>
                  <p className="text-accent/80">info@homehero.com</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Phone className="text-secondary" size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-accent mb-1">Phone</h3>
                  <p className="text-accent/80">+1 (555) 123-4567</p>
                  <p className="text-accent/80">+1 (555) 987-6543</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <MapPin className="text-accent" size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-accent mb-1">Address</h3>
                  <p className="text-accent/80">
                    123 HomeHero Street
                    <br />
                    New York, NY 10001
                    <br />
                    United States
                  </p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="mt-8 p-6 bg-base-200 rounded-lg">
              <h3 className="font-bold text-accent mb-4">Business Hours</h3>
              <div className="space-y-2 text-accent/80">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-accent font-semibold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-base-300 rounded-lg focus:outline-none focus:border-primary bg-base-100 text-accent"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-accent font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-base-300 rounded-lg focus:outline-none focus:border-primary bg-base-100 text-accent"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-accent font-semibold mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-base-300 rounded-lg focus:outline-none focus:border-primary bg-base-100 text-accent"
                  placeholder="Subject"
                />
              </div>

              <div>
                <label className="block text-accent font-semibold mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-2 border border-base-300 rounded-lg focus:outline-none focus:border-primary bg-base-100 text-accent resize-none"
                  placeholder="Your message..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn btn-primary text-accent font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-transform"
              >
                <Send size={20} />
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
