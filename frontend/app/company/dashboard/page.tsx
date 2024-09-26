"use client";

import React, { useEffect, useState } from 'react';
import Layout from '../../../components/company/Layout';
import { fetchDashboardData } from '@/app/services/companyAPI';

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
        setError('Error fetching dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  

  return (
    <Layout>
      <h1 className="text-3xl font-semibold mb-8">Dashboard</h1>
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-semibold">Total Trip</h3>
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
    </Layout>
  );
};

export default Dashboard;
