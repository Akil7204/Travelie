"use client";

import React, { useEffect, useState } from "react";
import Layout from "../../../components/admin/Layout";
import Topbar from "@/components/page/topBar";
import { fetchingAllData } from "@/app/services/adminAPI";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState({
    totalTrips: 0,
    totalRevenue: 0,
    totalCompanies: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) throw new Error("No token found");
        const response = await fetchingAllData(token);
        // const data = await response.json();
        console.log(response);

        setDashboardData(response);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      }
    };
    fetchData();
  }, []);

  const data = {
    labels: ["Total Trips", "Total Companies", "Total Users"],
    datasets: [
      {
        label: "Metrics",
        data: [
          dashboardData.totalTrips,
          dashboardData.totalCompanies,
          dashboardData.totalUsers,
        ],
        backgroundColor: ["#4CAF50", "#2196F3", "#FFC107", "#F44336"],
        borderColor: ["#388E3C", "#1976D2", "#FFA000", "#D32F2F"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Dashboard Metrics Overview",
      },
    },
  };

  return (
    <Layout>
      <Topbar />
      <h1 className="text-3xl font-semibold mt-5 mb-8">Dashboard</h1>
      {/* Dashboard content */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-semibold">Total Trips</h3>
          <p className="text-2xl font-bold">{dashboardData.totalTrips}</p>
        </div>
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-semibold">Total Revenue</h3>
          <p className="text-2xl font-bold">${dashboardData.totalRevenue}</p>
        </div>
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-semibold">Total Companies</h3>
          <p className="text-2xl font-bold">{dashboardData.totalCompanies}</p>
        </div>
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-2xl font-bold">{dashboardData.totalUsers}</p>
        </div>
      </div>
        <div className="mb-8">
        <Bar data={data} options={options} />
      </div>
    </Layout>
  );
};

export default Dashboard;
