"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { useParams } from "next/navigation";
import { detailTripsAPI } from "@/app/services/allAPI";

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

const params = useParams(); // Access the dynamic parameters
const tripId: any = params.id;




const TripPage: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await detailTripsAPI(tripId); // Fetch trips from API
        console.log("Detail API:", response); // Log API response

        setTrips(response); // Update state with fetched trips
      } catch (error) {
        console.error("Failed to fetch trips:", error);
      }
    };

    fetchTrips(); // Call fetch function when component mounts
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-5xl mx-auto p-6 pt-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <div className="col-span-1">
            <Image
              src="/img/GettyImages-483645840-5a06b125da27150037f954d1.jpg" // Replace with your main image path
              alt="Varkala"
              width={800}
              height={400}
              className="rounded-md h-[450px] object-cover transition-all duration-200"
            />
          </div>
          <div className="col-span-1">
            <div className="grid grid-rows-4 gap-4">
              <Image
                src="/img/GettyImages-483645840-5a06b125da27150037f954d1.jpg" // Replace with your image path
                alt="Varkala Beach"
                width={300}
                height={200}
                className="rounded-md h-[100px] object-cover cursor-pointer transition-all duration-700"
              />
              <Image
                src="/img/GettyImages-483645840-5a06b125da27150037f954d1.jpg" // Replace with your image path
                alt="Varkala Cliff"
                width={300}
                height={200}
                className="rounded-md h-[100px] object-cover cursor-pointer transition-all duration-700"
              />
              <Image
                src="/img/GettyImages-483645840-5a06b125da27150037f954d1.jpg" // Replace with your image path
                alt="Varkala Market"
                width={300}
                height={200}
                className="rounded-md h-[100px] object-cover cursor-pointer transition-all duration-700"
              />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h1 className="text-4xl font-bold text-blue-600 capitalize">
            Varkala
          </h1>
          <p className="text-gray-600">
            <span className="text-yellow-500">★ 4.5</span> (1200 Reviews)
          </p>
          <p className="text-gray-600 mt-2">
            <i className="fas fa-map-marker-alt"></i> Lorem ipsum road, Tantri
            nagar, 2322, Varkala, Kerala
          </p>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Overview</h2>
          <p className="text-gray-700 mt-2">
            Varkala Beach, also known as Papanasam Beach, is situated in the
            town of Varkala. It’s part of the Indian Ocean and known for its
            cliffs and serene beauty.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold">Trip Details</h3>
            <ul className="list-disc list-inside text-gray-700 mt-2">
              <li>
                <strong>From:</strong> Palakkad Fort
              </li>
              <li>
                <strong>To:</strong> Varkala
              </li>
              <li>
                <strong>Duration:</strong> 3 Days
              </li>
              <li>
                <strong>Vehicle:</strong> Bus
              </li>
              <li>
                <strong>Start Date:</strong> 04-Aug-2024
              </li>
              <li>
                <strong>Return Date:</strong> 06-Aug-2024
              </li>
              <li>
                <strong>Time:</strong> 3:00 PM
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Things to See & Do</h3>
            <ul className="list-disc list-inside text-gray-700 mt-2">
              <li>Varkala Beach</li>
              <li>Kappil Lake</li>
              <li>Anjengo Fort</li>
              <li>Varkala Fort</li>
              <li>Ponnumthuruthu Island</li>
              <li>Thiruvambadi Beach</li>
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            Book
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TripPage;
