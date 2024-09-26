"use client";

import React, { useEffect, useState } from "react";
import Layout from "../../../components/company/Layout";
import { fetchDashboardData } from "@/app/services/companyAPI";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState({ totalTrips: 0, totalBookings: 0, totalRevenue: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchDashboardData();
        setDashboardData(response);
      } catch (err) {
        setError("Error fetching dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Chart data
  const chartData = {
    labels: ["Total Trips", "Total Bookings", ],
    datasets: [
      {
        label: "Company Stats",
        data: [dashboardData.totalTrips, dashboardData.totalBookings, ],
        backgroundColor: ["#4CAF50", "#2196F3"],
        borderColor: ["#4CAF50", "#2196F3"],
        borderWidth: 1,
      },
    ],
  };

  
  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Company Dashboard Metrics",
      },
    },
  };

  return (
    <Layout>
      <h1 className="text-3xl font-semibold mb-8">Dashboard</h1>
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-semibold">Total Trips</h3>
          <p className="text-2xl font-bold">{dashboardData.totalTrips}</p>
        </div>
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-semibold">Total Bookings</h3>
          <p className="text-2xl font-bold">{dashboardData.totalBookings}</p>
        </div>
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-semibold">Total Revenue</h3>
          <p className="text-2xl font-bold">${dashboardData.totalRevenue}</p>
        </div>
      </div>

      <div className="p-6 bg-white shadow-md rounded-lg">
        <Bar data={chartData} options={options} />
      </div>
    </Layout>
  );
};

export default Dashboard;
