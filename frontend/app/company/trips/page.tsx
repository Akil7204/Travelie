"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "@/components/company/Layout";
import { getAllTripsAPI } from "@/app/services/companyAPI";
import { AxiosResponse } from "axios";
import Pagination from "@/components/page/Pagination";
// import { FaEdit, FaTrash } from 'react-icons/fa';

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


const TripList: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [formattedDates, setFormattedDates] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Total pages will be dynamic
  const tripsPerPage = 4; // Adjust as needed

  // Handle page change in pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Fetch trips with pagination
  const fetchTrips = async (page: number) => {
    try {
      const response = await getAllTripsAPI(page, tripsPerPage); // Fetch trips from API with pagination
      console.log("API Response:", response); // Log API response

      setTrips(response.trips); // Set fetched trips
      setTotalPages(Math.ceil(response.totalCount / tripsPerPage)); // Calculate total pages dynamically
    } catch (error) {
      console.error("Failed to fetch trips:", error);
    }
  };

  // Fetch trips whenever currentPage changes
  useEffect(() => {
    fetchTrips(currentPage);
  }, [currentPage]);

  // Format trip starting dates
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
    <Layout>
      <div className="p-8 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold">Trip</h2>
          <button className="bg-purple-600 text-white py-2 px-4 rounded-lg flex items-center">
            <Link href={"/company/addTrip"}> + Add Trip </Link>
          </button>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="mb-4">
            <ul className="flex space-x-4 text-gray-500">
              <li className="cursor-pointer text-blue-600 border-b-2 border-blue-600">
                All Trip
              </li>
              {/* <li className="cursor-pointer">Upcoming</li>
              <li className="cursor-pointer">Completed</li> */}
            </ul>
          </div>
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-3 px-4 text-left">Trip</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Available Seat</th>
                <th className="py-3 px-4 text-left">Booked Seat</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Starting on</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {trips.map((trip, index) => (
                <tr key={trip._id} className="border-b">
                  <td className="py-3 px-4">{trip.tripName}</td>
                  <td className="py-3 px-4">{trip.category}</td>
                  <td className="py-3 px-4">{trip.seats}</td>
                  <td className="py-3 px-4">{trip.bookedSeats}</td>
                  <td className="py-3 px-4">{trip.price}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-sm font-semibold ${
                        trip.status === "Upcoming"
                          ? "text-green-500"
                          : trip.status === "Filled"
                          ? "text-red-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {trip.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">{formattedDates[index]}</td>
                  <td className="py-3 px-4 flex space-x-2">
                    <Link href={`/company/edit/${trip._id}`} passHref>
                      edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-between items-center">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TripList;
