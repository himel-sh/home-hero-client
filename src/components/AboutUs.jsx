import React from "react";
import { Users, Target, Heart } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-base-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-accent mb-4">
            About HomeHero
          </h1>
          <p className="text-xl text-accent/80">
            Connecting homeowners with trusted service professionals
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-primary/10 p-8 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Target className="text-primary" size={32} />
              <h2 className="text-2xl font-bold text-accent">Our Mission</h2>
            </div>
            <p className="text-accent/80">
              HomeHero is dedicated to making home services accessible,
              affordable, and reliable. We believe every homeowner deserves
              quality service from vetted professionals who care about their
              work.
            </p>
          </div>

          <div className="bg-secondary/10 p-8 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="text-secondary" size={32} />
              <h2 className="text-2xl font-bold text-accent">Our Values</h2>
            </div>
            <p className="text-accent/80">
              Trust, quality, and customer satisfaction are at the heart of
              everything we do. We're committed to building a community where
              service providers and homeowners can connect with confidence.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-base-200 p-8 rounded-lg mb-12">
          <div className="flex items-center gap-3 mb-6">
            <Users className="text-primary" size={32} />
            <h2 className="text-2xl font-bold text-accent">
              Why Choose HomeHero?
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold text-accent mb-2">
                Verified Professionals
              </h3>
              <p className="text-accent/80">
                All service providers are thoroughly vetted and verified for
                quality and reliability.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-accent mb-2">Easy Booking</h3>
              <p className="text-accent/80">
                Simple and intuitive platform to find, compare, and book
                services in minutes.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-accent mb-2">Customer Support</h3>
              <p className="text-accent/80">
                Dedicated support team ready to help with any questions or
                concerns.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-primary/10 rounded-lg">
            <p className="text-3xl font-bold text-primary">500+</p>
            <p className="text-accent/80">Service Providers</p>
          </div>
          <div className="text-center p-6 bg-secondary/10 rounded-lg">
            <p className="text-3xl font-bold text-secondary">10K+</p>
            <p className="text-accent/80">Happy Customers</p>
          </div>
          <div className="text-center p-6 bg-accent/10 rounded-lg">
            <p className="text-3xl font-bold text-accent">50+</p>
            <p className="text-accent/80">Service Categories</p>
          </div>
          <div className="text-center p-6 bg-primary/10 rounded-lg">
            <p className="text-3xl font-bold text-primary">4.8★</p>
            <p className="text-accent/80">Average Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
