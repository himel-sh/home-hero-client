import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const HomeLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      <header className="sticky top-0 z-50 bg-base-100 shadow-xl backdrop-blur-md bg-opacity-95 border-b border-gray-100">
        <Navbar />
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="py-6 text-center text-sm text-accent opacity-70 border-t border-base-200">
        © {new Date().getFullYear()} HomeHero. All rights reserved.
      </footer>
    </div>
  );
};

export default HomeLayout;
