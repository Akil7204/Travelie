"use client"

import React, { useEffect, useState } from 'react';

const BookingConfirmation = () => {
    const [bookingDetails, setBookingDetails] = useState<any>(null);

    // Fetch booking details from the API
    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const response = await fetch('/api/bookingDetails'); // Adjust the API endpoint accordingly
                const data = await response.json();
                setBookingDetails(data);
            } catch (error) {
                console.error('Error fetching booking details:', error);
            }
        };

        fetchBookingDetails();
    }, []);

    if (!bookingDetails) {
        return <p>Loading booking details...</p>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <div className="w-full max-w-md p-4 bg-white shadow-lg rounded-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Secure your reservation</h2>

                {/* Booking Details */}
                <div className="border p-4 rounded-lg mb-4">
                    <h3 className="text-lg font-medium text-gray-700 mb-2 capitalize">{bookingDetails.tripName}</h3>
                    <p className="text-sm text-gray-600 mb-1">
                        ⭐ {bookingDetails.rating} ({bookingDetails.reviews} Reviews)
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                        Starting date: {new Date(bookingDetails.startDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                        Return date: {new Date(bookingDetails.returnDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">{bookingDetails.duration} days trip</p>
                </div>

                {/* Price Details */}
                <div className="border p-4 rounded-lg bg-green-100">
                    <h4 className="text-md font-semibold text-gray-800 mb-2">Price Details</h4>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>{bookingDetails.duration} days trip</span>
                        <span>₹ {bookingDetails.price}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Tax and service fees</span>
                        <span>₹ {bookingDetails.taxFees}</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold text-gray-800 mt-2">
                        <span>Total</span>
                        <span>₹ {bookingDetails.total}</span>
                    </div>
                </div>

                {/* Coupon Code */}
                <div className="border p-4 rounded-lg mt-4">
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
                </div>

                {/* Complete Booking Button */}
                <div className="mt-6">
                    <button className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg font-medium hover:bg-blue-600 transition">
                        Complete Booking
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingConfirmation;
