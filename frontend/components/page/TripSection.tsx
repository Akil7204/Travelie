"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { allTripsAPI } from "@/app/services/allAPI";
import { DNA } from "react-loader-spinner";

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

interface TripSectionProps {
  trips: Trip[];
  loading: boolean;
}

const TripSection: React.FC<TripSectionProps> = ({ trips, loading }) => {


  return (
    <>
      {loading ? ( // Show loader while loading is true
        <div className="flex justify-center items-center h-screen w-full">
          <DNA
            visible={true}
            height="100"
            width="100"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </div>
      ) : (
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
      )}
    </>
  );
};

export default TripSection;
