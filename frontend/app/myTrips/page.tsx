"use client";
import React, { useEffect, useState } from "react";
import { cancelBooking, getUserBookingsAPI } from "../services/allAPI";
import Pagination from "@/components/page/Pagination";
import Navbar from "@/components/NavBar";
import Profile from "@/components/profile/Profile";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";

interface Trip {
  _id: string;
  tripName: string;
  images: string[];
  startingDate: string;
  endingDate: string;
  days: number;
  price: number;
  description: string;
  discountedPrice: number;
}

interface Booking {
  _id: string;
  tripId: Trip;
  seats: number;
  totalAmount: number;
  createdAt: string;
  paymentStatus: string;
  paymentType: string;
  txnId: string;
}

const MyTrips: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const bookingPerPage = 5;

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const openModal = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setSelectedBooking(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const fetchBookings = async (page: number) => {
    try {
      const response: any = await getUserBookingsAPI(page, bookingPerPage);
      setBookings(response.bookings);
      console.log(response.bookings);

      setTotalPages(Math.ceil(response.totalCount / bookingPerPage));
    } catch (error: any) {
      if (error.response.status === 403) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        router.push("/login");
      }
    }
  };

  useEffect(() => {
    fetchBookings(currentPage);
  }, [currentPage]);

  const cancelTripAPI = async (bookingId: string) => {
    try {
      console.log(bookingId);

      const response = await cancelBooking(bookingId);
      console.log(response);
      if (!response) {
        throw new Error("Failed to cancel trip");
      }

      // const result = await response.json();
      if (response?.status == 200) {
        router.push("/myTrips");
        console.log("Trip cancelled:", response);
        closeModal();
        fetchBookings(currentPage);
      }
    } catch (error) {
      console.error("Error cancelling trip:", error);
    }
  };

  const downloadTicket = async () => {
    if (selectedBooking) {
      const doc = new jsPDF();

      doc.setFontSize(30);
      doc.setTextColor(33, 150, 243);
      doc.text("Travelie", 105, 20, { align: "center" });

      doc.setFontSize(22);
      doc.setTextColor(44, 62, 80);
      doc.text("Trip Ticket", 105, 35, { align: "center" });

      doc.setDrawColor(44, 62, 80);
      doc.line(20, 40, 190, 40);

      doc.setFontSize(18);
      doc.setTextColor(34, 153, 84);
      doc.text("Trip Details", 20, 50);

      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`Trip Name: ${selectedBooking.tripId.tripName}`, 20, 60);
      doc.text(
        `Starting Date: ${new Date(
          selectedBooking.tripId.startingDate
        ).toDateString()}`,
        20,
        70
      );
      doc.text(`Seats: ${selectedBooking.seats}`, 20, 80);
      doc.text(`Duration: ${selectedBooking.tripId.days} Days`, 20, 90);

      doc.setFontSize(18);
      doc.setTextColor(34, 153, 84);
      doc.text("Transaction Details", 20, 110);

      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`Transaction ID: ${selectedBooking.txnId}`, 20, 120);
      doc.text(`Total Price: INR ${selectedBooking.totalAmount}`, 20, 130);
      doc.text(`Payment Status: ${selectedBooking.paymentStatus}`, 20, 140);

      doc.setFontSize(18);
      doc.setTextColor(34, 153, 84);
      doc.text("Description", 20, 160);

      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(selectedBooking.tripId.description, 20, 170, { maxWidth: 170 });

      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text("For any queries, contact us at: support@travelie.com", 20, 280);
      doc.text("Thank you for choosing Travelie!", 20, 290);

      doc.save(
        `Travelie_Ticket_${
          selectedBooking.tripId.tripName
        }_${new Date().toLocaleDateString()}.pdf`
      );
    }
  };

  return (
    <>
      <Navbar />
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
                    src={booking.tripId.images[0]}
                    alt={booking.tripId.tripName}
                    className="w-32 h-32 rounded-lg object-cover"
                  />
                  <div className="ml-4">
                    {/* Trip Name */}
                    <h2 className="text-xl font-semibold">
                      {booking.tripId.tripName}
                    </h2>
                    {/* Trip Dates */}
                    <p>
                      Starting date:{" "}
                      {new Date(booking.tripId.startingDate).toDateString()}
                    </p>
                    <p>Total seats: {booking.seats}</p>
                    <p>{booking.tripId.days} Days trip</p>
                    {booking.paymentStatus === "cancelled" && (
                      <p className="text-red-500 font-bold mt-2">Cancelled</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  {/* Total Amount */}
                  <p className="text-2xl text-red-500">
                    ₹{booking.totalAmount}
                  </p>
                  <p className="text-sm text-gray-500">
                    Includes taxes and fees
                  </p>
                  {/* View Ticket Button */}
                  <button
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                    onClick={() => openModal(booking)}
                  >
                    View Ticket
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No trips booked yet.</p>
          )}
        </div>

        <div className="mt-4 flex justify-between items-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>

        {/* Modal */}
        {isOpen && selectedBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white w-11/12 md:w-1/2 lg:w-1/3 p-6 rounded-lg shadow-lg">
              {/* Close Button */}
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                onClick={closeModal}
              >
                ✕
              </button>

              {/* Ticket Content */}
              <div className="text-center">
                <h2 className="text-lg font-bold text-gray-800 mb-2">
                  Your Trip Ticket
                </h2>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="text-xl font-semibold mb-3">
                    {new Date(
                      selectedBooking.tripId.startingDate
                    ).toDateString()}
                  </p>

                  <p className="text-sm text-gray-600">Trip Name</p>
                  <h3 className="text-2xl font-bold mb-3">
                    {selectedBooking.tripId.tripName}
                  </h3>

                  <div className="flex justify-around mb-3">
                    <div>
                      <p className="text-sm text-gray-600">Seats</p>
                      <p className="text-lg font-medium">
                        {selectedBooking.seats}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Days</p>
                      <p className="text-lg font-medium">
                        {selectedBooking.tripId.days}
                      </p>
                    </div>
                  </div>

                  {/* Added Transaction ID */}
                  <div className="mb-3">
                    <p className="text-sm text-gray-600">Transaction ID</p>
                    <p className="text-lg font-medium">
                      {selectedBooking.txnId}
                    </p>
                  </div>

                  {/* Added Total Price */}
                  <div className="mb-3">
                    <p className="text-sm text-gray-600">Total Price</p>
                    <p className="text-lg font-medium text-red-500">
                      ₹{selectedBooking.totalAmount}
                    </p>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm text-gray-600">Payment Status</p>
                    <p className="text-lg font-medium capitalize">
                      {selectedBooking.paymentStatus}
                    </p>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm text-gray-600">Description</p>
                    <p className="text-sm text-gray-700">
                      {selectedBooking.tripId.description}
                    </p>
                  </div>
                  {selectedBooking.paymentStatus === "cancelled" ? (
                    <div className="text-red-500 font-bold">
                      Your trip is cancelled, and your amount will be added to
                      your wallet.
                    </div>
                  ) : (
                    <>
                      <button
                        className="w-full py-2 mt-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition"
                        onClick={downloadTicket}
                      >
                        Download Ticket
                      </button>
                      <button
                        className="w-full py-2 mt-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition"
                        onClick={() => cancelTripAPI(selectedBooking?._id)}
                      >
                        Cancel Trip
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </Profile>
      <Footer />
    </>
  );
};

export default MyTrips;
