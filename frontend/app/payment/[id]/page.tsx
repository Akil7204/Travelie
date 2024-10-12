"use client";

import { fetchBookedData, walletPayment } from "@/app/services/allAPI";
import Navbar from "@/components/NavBar";
import PayUComponent from "@/components/payment/payUComponent";
import { generateTxnId } from "@/utils/generateTxnId";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const BookingConfirmation = () => {
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const router = useRouter();
  const params = useParams();

  const bookingId: any = params.id;
  console.log(bookingId);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await fetchBookedData(bookingId);
        console.log(response);

        setBookingDetails(response);
      } catch (error: any) {
        if (error.response.status === 403) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          router.push("/login");
        }
        console.error("Error fetching booking details:", error);
      }
    };

    fetchBookingDetails();
  }, []);

  const txnidRef = useRef(generateTxnId(8));
  const handleWalletPayment = async () => {
    try {
      const txnid = txnidRef.current;
      const amount = bookingDetails.totalAmount; 
      const productinfo = bookingDetails._id;
      const { username, phone, email } = bookingDetails.userId;
      const data = { txnid, amount, productinfo, username, email, phone };
      console.log({data});

      const response = await walletPayment(data)
      console.log("Payment successful", response.data);
      
    } catch (error) {
      console.log(error);
      
    }
  }

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

          {/* Complete Booking Button */}
          <div className="mt-6">
            <PayUComponent BookedData={bookingDetails} />
            <button
              onClick={handleWalletPayment}
              className="w-full mt-4 bg-blue-500 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-600 transition"
            >
              Pay with Wallet
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingConfirmation;
