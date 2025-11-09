import React from "react";
import { Outlet } from "react-router";
import Header from "../components/Header";

const HomeLayout = () => {
  return (
    <div>
      <header>
        <Header></Header>
      </header>
      <main className="min-h-screen  bg-base-300 ">
        <Outlet></Outlet>
      </main>
      <footer></footer>
    </div>
  );
};

export default HomeLayout;
