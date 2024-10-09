"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Pagination from "@/components/page/Pagination";
import { getAllTripsAPI } from "@/app/services/companyAPI";
import Layout from "@/components/company/Layout";

interface Trip {
  _id: string;
  tripName: string;
  description: string;
  images: string[];
  startingFrom: string;
  startingDate: string;
  endingAt: string;
  seats: number;
  bookedSeats: number;
}

const TripsListPage: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const tripsPerPage = 10;
  const router = useRouter();

  const fetchTrips = async (page: number) => {
    try {
      const response: any = await getAllTripsAPI(page, tripsPerPage);

      setTrips(response.allTrips);
      setTotalPages(Math.ceil(response.totalCount / tripsPerPage));
    } catch (err) {
      console.error("Error fetching trips:", err);
    }
  };

  useEffect(() => {
    fetchTrips(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleTripClick = (tripId: string) => {
    console.log({tripId});
    
    router.push(`/company/bookingList/${tripId}`);
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Trips List</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {trips.map((trip) => (
            <div
              key={trip._id}
              className="bg-white shadow-lg rounded-lg p-4 cursor-pointer"
              onClick={() => handleTripClick(trip._id)}
            >
              <img
                src={trip.images[0]}
                alt={trip.tripName}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{trip.tripName}</h3>
                <p>{trip.description}</p>
                <p>
                  <strong>From:</strong> {trip.startingFrom} -{" "}
                  {new Date(trip.startingDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>To:</strong> {trip.endingAt}
                </p>
                <p>
                  <strong>Seats:</strong> {trip.seats}
                </p>
                <p>
                  <strong>Booked Seats:</strong> {trip.bookedSeats}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between items-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </Layout>
  );
};

export default TripsListPage;
