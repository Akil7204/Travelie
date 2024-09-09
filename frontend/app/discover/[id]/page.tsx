"use client";

import React, { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useParams } from "next/navigation";
import { detailTripsAPI } from "@/app/services/allAPI";
import { DNA, InfinitySpin } from "react-loader-spinner";

interface Trip {
  _id: string;
  tripName: string;
  description: string;
  images: string[];
  days: number;
  startingFrom: string;
  endingAt: string;
  startingDate: any;
  endingDate: any;
  price: number;
  locations: string[];
  status: string;
  companyId: string;
  category: string;
  seats: number;
  bookedSeats?: number;
}

const TripPage: React.FC = () => {
  const [tripData, setTripData] = useState<Trip | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams(); // Access the dynamic parameters
  const tripId: any = params.id;

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await detailTripsAPI(tripId); // Fetch trips from API
        console.log("Detail API:", response); // Log API response

        setTripData(response); // Update state with fetched trips;
        setLoading(false);
        // tripData.endingDate = formatDateToDDMMYYYY(tripData?.endingDate)
      } catch (error) {
        setLoading(false);
        console.error("Failed to fetch trips:", error);
      }
    };

    fetchTrips(); // Call fetch function when component mounts
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto p-6 pt-14">
        {loading ? ( // Show loader while loading is true
          <div className="flex justify-center items-center min-h-[500px]">
            <DNA
              visible={true}
              height="80"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              {/* Main Image */}
              <div className="col-span-1">
                {tripData?.images[0] && (
                  <Image
                    src={tripData?.images[0]} // Main image from the trip data
                    alt="image1"
                    width={800}
                    height={400}
                    className="rounded-md h-[450px] object-cover transition-all duration-200"
                  />
                )}
              </div>

              {/* Small Images */}
              <div className="col-span-1">
                <div className="grid grid-rows-4 gap-4">
                  {tripData?.images?.map((image: string, index: number) => (
                    <Image
                      key={index}
                      src={image}
                      alt={`Image ${index + 1}`}
                      width={300}
                      height={200}
                      className="rounded-md h-[100px] object-cover cursor-pointer transition-all duration-700"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8">
              {tripData?.tripName && (
                <h1 className="text-4xl font-bold text-blue-600 capitalize">
                  {tripData.tripName}
                </h1>
              )}
              <p className="text-gray-600 mt-2">
                <i className="fas fa-map-marker-alt"></i> {tripData?.tripName}
              </p>
            </div>

            <div className="mt-6">
              <h2 className="text-2xl font-semibold">Overview</h2>
              <p className="text-gray-700 mt-2">{tripData?.description}</p>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold">Trip Details</h3>
                <ul className="list-disc list-inside text-gray-700 mt-2">
                  <li>
                    <strong>From:</strong> {tripData?.startingFrom}
                  </li>
                  <li>
                    <strong>To:</strong> {tripData?.tripName}
                  </li>
                  <li>
                    <strong>No. of Days:</strong> {tripData?.days}
                  </li>
                  <li>
                    <strong>Vehicle:</strong> {tripData?.category}
                  </li>
                  <li>
                    <strong>Start Date:</strong>{" "}
                    {new Date(tripData?.startingDate).toLocaleDateString()}
                  </li>
                  <li>
                    <strong>Return Date:</strong>{" "}
                    {new Date(tripData?.endingDate).toLocaleDateString()}
                  </li>
                  {tripData && (
                    <li>
                      <strong>Available Seats:</strong>{" "}
                      {tripData?.seats - (tripData?.bookedSeats || 0) === 0
                        ? "Seat full"
                        : tripData?.seats - (tripData?.bookedSeats || 0)}
                    </li>
                  )}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold">Things to See & Do</h3>
                <ul className="list-disc list-inside text-gray-700 mt-2">
                  {tripData?.locations.map((thing: string, index: number) => (
                    <li key={index}>{thing}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8">
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                Book
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default TripPage;
