"use client";

import Footer from "@/components/Footer";
import Login from "@/components/login/login";
import Navbar from "@/components/NavBar";
import FilterSection from "@/components/page/FilterSection";
import TripSection from "@/components/page/TripSection";
import React, { useEffect, useState } from "react";
import { allTripsAPI } from "@/app/services/allAPI";

interface Trip {
  _id: string;
  tripName: string;
  description: string;
  images: string[];
  days: number;
  startingFrom: string;
  endingAt: string;
  startingDate: Date;
  endingDate: Date;
  price: number;
  locations: string[];
  status: string;
  companyId: string;
  category: string;
  seats: number;
  bookedSeats?: number;
}

const discover: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [filteredTrips, setFilteredTrips] = useState<Trip[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [budgetRange, setBudgetRange] = useState<string[]>([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await allTripsAPI();
        setTrips(response);
        setFilteredTrips(response); 
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Failed to fetch trips:", error);
      }
    };
    fetchTrips();
  }, []);

  useEffect(() => {
    let newFilteredTrips = trips;

    
    if (searchTerm) {
      newFilteredTrips = newFilteredTrips.filter((trip) =>
        trip.tripName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    
    if (budgetRange.length > 0) {
      newFilteredTrips = newFilteredTrips.filter((trip) => {
        return budgetRange.some((range) => {
          const [min, max] = range.split("-").map(Number);
          return trip.price >= min && trip.price <= max;
        });
      });
    }

    setFilteredTrips(newFilteredTrips);
  }, [searchTerm, budgetRange, trips]);

  return (
    <div className="flex flex-col overflow-x-hidden">
      <Navbar />
      <div className="min-h-screen mt-10 bg-gray-100 p-8 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        <FilterSection
          setSearchTerm={setSearchTerm}
          setBudgetRange={setBudgetRange}
        />
        <TripSection trips={filteredTrips} loading={loading} />
      </div>

      <Footer />
    </div>
  );
};

export default discover;
