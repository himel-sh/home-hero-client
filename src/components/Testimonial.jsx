import React from "react";
import { Quote } from "lucide-react";

const Testimonial = ({ testimonials }) => {
  if (!testimonials || testimonials.length === 0)
    return (
      <p className="text-center text-gray-500">No testimonials available.</p>
    );

  return (
    <section className="bg-base-300 py-20 px-6 overflow-hidden">
      <div className="text-center mb-12">
        <p className="uppercase tracking-widest text-2xl text-secondary font-extrabold mb-2">
          Testimonials
        </p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-accent">
          Happy Clients say <br /> About Us
        </h2>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {testimonials.map((item) => (
          <div
            key={item._id}
            className="bg-white relative rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 px-8 py-10 border-t-4 border-transparent hover:border-secondary"
          >
            <div className="absolute -top-5 left-8 bg-secondary p-2 rounded">
              <Quote className="text-white w-5 h-5" />
            </div>

            <p className="text-gray-600 mt-4 text-sm leading-relaxed">
              "{item.text}"
            </p>

            <div className="flex items-center gap-4 mt-6">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-gray-800">{item.name}</h4>
                <p className="text-xs text-gray-500">{item.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
