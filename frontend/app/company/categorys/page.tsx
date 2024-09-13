"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "@/components/company/Layout";
import { getAllCategoryAPI, getAllTripsAPI } from "@/app/services/companyAPI";
import { AxiosResponse } from "axios";
import Pagination from "@/components/page/Pagination";
// import { FaEdit, FaTrash } from 'react-icons/fa';

interface Category {
  _id: string;
  name: string;
}


const TripList: React.FC = () => {
  const [categorys, setCategory] = useState<Category[]>([]);
  const [formattedDates, setFormattedDates] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Total pages will be dynamic
  const categoyPerPage = 5; // Adjust as needed

  // Handle page change in pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Fetch trips with pagination
  const fetchTrips = async (page: number) => {
    try {
      const response = await getAllCategoryAPI(page, categoyPerPage); // Fetch trips from API with pagination
      console.log("API Response:", response); // Log API response

      setCategory(response.allCategory); // Set fetched trips
      setTotalPages(Math.ceil(response.totalCount / categoyPerPage)); // Calculate total pages dynamically
    } catch (error) {
      console.error("Failed to fetch trips:", error);
    }
  };

  // Fetch trips whenever currentPage changes
  useEffect(() => {
    fetchTrips(currentPage);
  }, [currentPage]);


  return (
    <Layout>
      <div className="p-8 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold">Category</h2>
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
          <table className=" min-w-full justify-evenly bg-white border">
            <thead>
              <tr>
                <th className="py-3 px-4 text-left">Category Id</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {categorys?.map((category, index) => (
                <tr key={category._id} className="border-b">
                  <td className="py-3 px-4">{category._id}</td>
                  <td className="py-3 px-4">{category.name}</td>
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
