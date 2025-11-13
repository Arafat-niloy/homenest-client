import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div>
      <div className="bg-gradient-to-b from-[#c9d6ff80] to-[#e2e2e260]">
        <Navbar />

        <main className="min-h-[calc(100vh-300px)]  ">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
