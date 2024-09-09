"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
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

const TripSection: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [formattedDates, setFormattedDates] = useState<string[]>([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await allTripsAPI(); // Fetch trips from API
        console.log("API Response:", response); // Log API response

        setTrips(response); // Update state with fetched trips
      } catch (error) {
        console.error("Failed to fetch trips:", error);
      }
    };

    fetchTrips(); // Call fetch function when component mounts
  }, []);

  useEffect(() => {
    if (trips.length > 0) {
      const dates = trips.map((trip) => {
        const startingDate = new Date(trip.startingDate);
        return startingDate.toLocaleDateString("en-US", {
          month: "short", // Short month name, e.g., "Sep"
          day: "2-digit", // Two-digit day, e.g., "01"
          year: "numeric", // Full year, e.g., "2024"
        });
      });
      setFormattedDates(dates);
    }
  }, [trips]);

  return (
    <section className="w-full md:w-3/4 p-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Best Packages For You
      </h2>
      <div className="space-y-6">
        {trips.map((trip, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row h-64"
          >
            <div className="h-full w-60 md:w-1/5 flex-shrink-0">
              <img
                className="h-full w-full object-cover"
                src={trip.images[0]}
                alt={trip.tripName}
              />
            </div>
            <div className="p-4 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {trip.tripName}
                </h3>
                <p className="text-gray-600 mt-2">{trip.description}</p>
                <div className="flex items-center mt-4 space-x-4">
                  <p className="text-black mt-2">Per head /</p>
                  <span className="text-green-500 mt-2">
                    Rs. {trip.price}
                  </span>
                </div>
              </div>
              <button className="mt-4 px-4 py-2 w-40 bg-blue-500 text-white rounded-lg">
                <a href={`/discover/${trip._id}`}>See availability</a>
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-8 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg">
        Load more results
      </button>
    </section>
  );
};

export default TripSection;
