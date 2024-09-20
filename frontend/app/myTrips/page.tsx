"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link"; // Assuming you have a Layout component
import Profile from "@/components/profile/Profile";
import Footer from "@/components/Footer";
import { getUserBookingsAPI } from "../services/allAPI";

interface Trip {
  _id: string;
  tripName: string;
  images: string;
  startingDate: string;
  endingDate: string;
  days: number;
  price: number;
  discountedPrice: number;
}

interface Booking {
  _id: string;
  tripId: Trip;
  seats: number;
  totalAmount: number;
  createdAt: string;
}

const MyTrips: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Fetch bookings for the user
  const fetchBookings = async () => {
    try {
      const response = await getUserBookingsAPI(); // Replace `userId` with the current logged-in user's ID
      setBookings(response);
      console.log(response);
      
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <>
      <Profile>
        <div className="p-8 bg-gray-100 min-h-screen">
          <h1 className="text-3xl font-bold mb-8">My Trips</h1>
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white shadow-lg rounded-lg p-6 mb-6 flex justify-between items-center"
              >
                <div className="flex items-center">
                  {/* Trip Image */}
                  <img
                    src={booking.tripId.images[0]} // Assuming `image` is part of the trip data
                    alt={booking.tripId.tripName}
                    className="w-32 h-32 rounded-lg object-cover"
                  />
                  <div className="ml-4">
                    {/* Trip Name */}
                    <h2 className="text-xl font-semibold">
                      {booking.tripId.tripName}
                    </h2>
                    {/* Rating (example value) */}
                    {/* <p className="text-yellow-500">★ 4.5 (1200 Reviews)</p> */}
                    {/* Trip Dates */}
                    <p>
                      Starting date:{" "}
                      {new Date(booking.tripId.startingDate).toDateString()}
                    </p>
                    <p>
                      Total seats:{" "}
                      {booking.seats}
                    </p>
                    <p>{booking.tripId.days} Days trip</p>
                  </div>
                </div>
                <div className="text-right">
                  {/* Original Price, Discounted Price */}
                  {/* <p className="line-through text-gray-500">
                    ₹{booking.tripId.price}
                  </p> */}
                  <p className="text-2xl text-red-500">
                    ₹{booking.totalAmount}
                  </p>
                  <p className="text-sm text-gray-500">
                    Includes taxes and fees
                  </p>
                  {/* View Ticket Button */}
                  <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                    <Link href={`/tickets/${booking._id}`}>View Ticket</Link>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No trips booked yet.</p>
          )}
        </div>
      </Profile>
      <Footer />
    </>
  );
};

export default MyTrips;
