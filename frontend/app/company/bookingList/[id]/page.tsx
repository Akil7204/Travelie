"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/company/Layout";
import { getCompanyBookingsAPI } from "@/app/services/companyAPI";

interface Booking {
  _id: string;
  userId: {
    username: string;
    email: string;
  };
  seats: number;
  totalAmount: number;
}

const TripDetailsPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [tripName, setTripName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const id: any  = params.id;
  console.log({id});
  
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response: any = await getCompanyBookingsAPI(id);
        console.log(response);
        
        setBookings(response.data.bookings);
        setTripName(response.data.tripName);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Error fetching bookings");
      }
    };

    fetchBookings();
  }, [id]);

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Bookings for {tripName}</h1>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking._id} className="bg-white shadow-lg rounded-lg p-4 mb-4">
              <p><strong>User:</strong> {booking.userId.username}</p>
              <p><strong>Email:</strong> {booking.userId.email}</p>
              <p><strong>Seats:</strong> {booking.seats}</p>
              <p><strong>Total Amount:</strong> {booking.totalAmount}</p>
            </div>
          ))
        ) : (
          <p>No one has booked this trip yet.</p>
        )}
      </div>
    </Layout>
  );
};

export default TripDetailsPage;
