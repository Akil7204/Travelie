import Footer from "@/components/Footer";
import Login from "@/components/login/login";
import Navbar from "@/components/NavBar";
import FilterSection from "@/components/page/FilterSection";
import TripSection from "@/components/page/TripSection";
import React from "react";

function discover() {
  return (
    <div className="flex flex-col overflow-x-hidden">
      <Navbar />
      <div className="min-h-screen mt-10 bg-gray-100 p-8 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        <FilterSection />
        <TripSection />
      </div>

      <Footer />
    </div>
  );
}

export default discover;
