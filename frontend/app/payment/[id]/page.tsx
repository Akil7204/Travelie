"use client";

import { fetchBookedData } from "@/app/services/allAPI";
import Navbar from "@/components/NavBar";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const BookingConfirmation = () => {
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const params = useParams();

  const bookingId: any = params.id;
  console.log(bookingId);

  // Fetch booking details from the API
  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await fetchBookedData(bookingId); // Adjust the API endpoint accordingly
        console.log(response);

        setBookingDetails(response);
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    };

    fetchBookingDetails();
  }, []);

  if (!bookingDetails) {
    return <p>Loading booking details...</p>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-4 bg-white shadow-lg rounded-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Secure your reservation
          </h2>

          {/* Booking Details */}
          <div className="border p-4 rounded-lg mb-4">
            <h3 className="text-lg font-extrabold text-gray-900 mb-2 capitalize">
              {bookingDetails.tripId.tripName}
            </h3>
            {/* <p className="text-sm text-gray-600 mb-1">
                        ⭐ {bookingDetails.rating} ({bookingDetails.reviews} Reviews)
                    </p> */}
            <p className="text-sm text-gray-600 mb-1">
              Starting date:{" "}
              {new Date(
                bookingDetails.tripId.startingDate
              ).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              Return date:{" "}
              {new Date(bookingDetails.tripId.endingDate).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-600">
              {bookingDetails.tripId.days} days trip
            </p>
          </div>

          {/* Price Details */}
          <div className="border p-4 rounded-lg bg-green-100">
            <h4 className="text-md font-semibold text-gray-800 mb-2">
              Price Details
            </h4>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span> price per seat</span>
              <span>₹ {bookingDetails.tripId.price}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Total seats you booked</span>
              <span>{bookingDetails.seats}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold text-gray-800 mt-2">
              <span>Total</span>
              <span>₹ {bookingDetails.totalAmount}</span>
            </div>
          </div>

          {/* Coupon Code */}
          {/* <div className="border p-4 rounded-lg mt-4">
                    <p className="text-blue-500 text-sm mb-2">
                        <a href="#">Use a coupon, credit, or promotional code</a>
                    </p>
                    <div className="flex">
                        <input
                            type="text"
                            placeholder="Coupon code"
                            className="w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button className="bg-gray-800 text-white px-4 py-2 rounded-r-md">
                            Apply Coupon
                        </button>
                    </div>
                </div> */}

          {/* Complete Booking Button */}
          <div className="mt-6">
            <button className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-600 transition">
              proceed to payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingConfirmation;
