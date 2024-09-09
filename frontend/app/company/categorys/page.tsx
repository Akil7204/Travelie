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
  const [categorys, setCategory] = useState<Trip[]>([]);
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

      setCategory(response.allCategory); // Set fetched trips
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
    if (categorys.length > 0) {
      const dates = categorys.map((trip) => {
        const startingDate = new Date(trip.startingDate);
        return startingDate.toLocaleDateString("en-US", {
          month: "short", // Short month name, e.g., "Sep"
          day: "2-digit", // Two-digit day, e.g., "01"
          year: "numeric", // Full year, e.g., "2024"
        });
      });
      setFormattedDates(dates);
    }
  }, [categorys]);


  return (
    <Layout>
      <div className="p-8 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold">Trip</h2>
          <button className="bg-purple-600 text-white py-2 px-4 rounded-lg flex items-center">
            <Link href={"/company/addCategory"}> + Add Category </Link>
          </button>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="mb-4">
            <ul className="flex space-x-4 text-gray-500">
              <li className="cursor-pointer text-blue-600 border-b-2 border-blue-600">
                All Category
              </li>
              {/* <li className="cursor-pointer">Upcoming</li>
              <li className="cursor-pointer">Completed</li> */}
            </ul>
          </div>
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-3 px-4 text-left">Category Id</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {categorys.map((category, index) => (
                <tr key={category._id} className="border-b">
                  <td className="py-3 px-4">{category.tripName}</td>
                  <td className="py-3 px-4">{formattedDates[index]}</td>
                  <td className="py-3 px-4 flex space-x-2">
                    <Link href={`/company/editCategory/${category._id}`} passHref>
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
