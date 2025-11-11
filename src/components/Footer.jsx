import React from "react";
import { Link } from "react-router";

import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
      <div className="w-11/12 mx-auto flex flex-col sm:flex-row justify-between gap-10">
        {/* Logo & Brand */}
        <aside className="flex flex-col gap-2">
          <Link
            to="/"
            className="text-2xl lg:text-3xl font-extrabold flex items-center gap-2 text-neutral-content"
          >
            <img
              src="/logo1.svg"
              alt="HomeHero Logo"
              className="h-10 w-10 lg:h-12  lg:w-12"
            />
            <span className="text-primary">HomeHero</span>
          </Link>
          <p className="mt-2 text-sm opacity-80">
            Providing reliable home services <br /> since 2024
          </p>

          {/* Social Media */}
          <div className="flex gap-4 mt-4 text-xl">
            <Link to="/" className="hover:text-yellow-500">
              <FaXTwitter />
            </Link>
            <Link to="/" className="hover:text-blue-700">
              <FaFacebookF />
            </Link>
            <Link to="/" className="hover:text-pink-500">
              <FaInstagram />
            </Link>
            <Link to="/" className="hover:text-red-600">
              <FaYoutube />
            </Link>
          </div>
        </aside>

        {/* Services Section */}
        <nav className="flex flex-col gap-2">
          <h6 className="footer-title">Services</h6>
          <Link to="/services" className="link link-hover">
            Home Cleaning
          </Link>
          <Link to="/services" className="link link-hover">
            Plumbing
          </Link>
          <Link to="/services" className="link link-hover">
            Electrical
          </Link>
          <Link to="/services" className="link link-hover">
            Maintenance
          </Link>
        </nav>

        {/* Company Section */}
        <nav className="flex flex-col gap-2">
          <h6 className="footer-title">Company</h6>
          <Link to="/" className="link link-hover">
            About us
          </Link>
          <Link to="/" className="link link-hover">
            Contact
          </Link>
          <Link to="/" className="link link-hover">
            Careers
          </Link>
          <Link to="/" className="link link-hover">
            Press kit
          </Link>
        </nav>

        {/* Legal Section */}
        <nav className="flex flex-col gap-2">
          <h6 className="footer-title">Legal</h6>
          <Link to="/" className="link link-hover">
            Terms of use
          </Link>
          <Link to="/" className="link link-hover">
            Privacy policy
          </Link>
          <Link to="/" className="link link-hover">
            Cookie policy
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
