"use client"
import React from "react";
import Link from "next/link";
import Layout from "@/components/company/Layout";
// import { FaEdit, FaTrash } from 'react-icons/fa';

const trips = [
  {
    id: 1,
    name: "Varkala",
    category: "Bus",
    bookedSeat: 35,
    availableSeat: 57,
    price: "₹121.00",
    status: "Opening",
    startDate: "29 Dec 2022",
  },
  {
    id: 2,
    name: "Ooty",
    category: "Traveller",
    bookedSeat: 14,
    availableSeat: 36,
    price: "₹590.00",
    status: "Opening",
    startDate: "24 Dec 2022",
  },
  // Add more trip objects as needed
];

const TripList: React.FC = () => {
  return (
    <Layout>
      <div className="p-8 bg-gray-100 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold">Trip</h2>
          <button className="bg-purple-600 text-white py-2 px-4 rounded-lg flex items-center">
            <Link href={"/company/addTrip"} > + Add Trip </Link>
          </button>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="mb-4">
            <ul className="flex space-x-4 text-gray-500">
              <li className="cursor-pointer text-blue-600 border-b-2 border-blue-600">
                All Trip
              </li>
              <li className="cursor-pointer">Upcoming</li>
              <li className="cursor-pointer">Completed</li>
            </ul>
          </div>
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-3 px-4 text-left">Trip</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Booked Seat</th>
                <th className="py-3 px-4 text-left">Available Seat</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Starting on</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {trips.map((trip) => (
                <tr key={trip.id} className="border-b">
                  <td className="py-3 px-4">{trip.name}</td>
                  <td className="py-3 px-4">{trip.category}</td>
                  <td className="py-3 px-4">{trip.bookedSeat}</td>
                  <td className="py-3 px-4">{trip.availableSeat}</td>
                  <td className="py-3 px-4">{trip.price}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`text-sm font-semibold ${
                        trip.status === "Opening"
                          ? "text-green-500"
                          : trip.status === "Filled"
                          ? "text-red-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {trip.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">{trip.startDate}</td>
                  <td className="py-3 px-4 flex space-x-2">
                    <Link href={`/edit/${trip.id}`} passHref>
                      edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-between items-center">
            <p className="text-gray-500">Showing 1-10 from 100</p>
            <div className="flex space-x-2">
              <button className="py-1 px-2 bg-gray-200 text-gray-500 rounded">
                1
              </button>
              <button className="py-1 px-2 bg-gray-200 text-gray-500 rounded">
                2
              </button>
              <button className="py-1 px-2 bg-gray-200 text-gray-500 rounded">
                3
              </button>
              <button className="py-1 px-2 bg-gray-200 text-gray-500 rounded">
                ...
              </button>
              <button className="py-1 px-2 bg-gray-200 text-gray-500 rounded">
                5
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TripList;
