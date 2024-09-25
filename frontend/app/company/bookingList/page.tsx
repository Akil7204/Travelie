"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/components/company/Layout";
import Table from "@/components/page/Table";
import { getCompanyBookingsAPI } from "@/app/services/companyAPI";
import Pagination from "@/components/page/Pagination";

interface Booking {
  _id: string;
  tripId: {
    tripName: string;
    date: string;
  };
  userId: {
    username: string;
  };
  seats: number;
  totalAmount: number;
  paymentType: string;
  paymentStatus: string;
  txnId?: string;
  createdAt: Date;
}

const BookingListPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const bookingPerPage = 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchBookings = async (page: number) => {
      try {
        const response: any = await getCompanyBookingsAPI(page, bookingPerPage);
        setBookings(response.data);
        setTotalPages(Math.ceil(response.totalCount / bookingPerPage));
        console.log(response);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Error fetching bookings");
      }
    };

    fetchBookings(currentPage);
  }, [currentPage]);

  const headers = [
    "ID",
    "Trip Name",
    "User Name",
    "Seats",
    "Total Amount",
    "Payment Status",
    "Payment Type",
    "Txn ID",
  ];

  const renderBookingRow = (booking: Booking) => (
    <>
      <td className="px-6 py-4 border-b">{booking._id}</td>
      <td className="px-6 py-4 border-b">{booking.tripId.tripName}</td>
      <td className="px-6 py-4 border-b">{booking.userId.username}</td>
      <td className="px-6 py-4 border-b">{booking.seats}</td>
      <td className="px-6 py-4 border-b">{booking.totalAmount}</td>
      <td className="px-6 py-4 border-b">{booking.paymentStatus}</td>
      <td className="px-6 py-4 border-b">{booking.paymentType}</td>
      <td className="px-6 py-4 border-b">{booking.txnId || "N/A"}</td>
    </>
  );

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Booking List</h1>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <Table<Booking>
            headers={headers}
            data={bookings}
            renderRow={renderBookingRow}
          />
        )}
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

export default BookingListPage;
