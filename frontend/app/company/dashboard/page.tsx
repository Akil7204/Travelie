"use client"

import React from 'react';
import Layout from '../../../components/company/Layout';

const Dashboard: React.FC = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-semibold mb-8">Dashboard</h1>
      {/* Dashboard content goes here */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-semibold">Total Trip</h3>
          <p className="text-2xl font-bold">40,689</p>
          <p className="text-green-600">📈 8.5% Up from yesterday</p>
        </div>
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-semibold">Total Revenue</h3>
          <p className="text-2xl font-bold">$10293</p>
          <p className="text-green-600">📈 1.3% Up from past week</p>
        </div>
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-semibold">Total Trip Completed</h3>
          <p className="text-2xl font-bold">$89,000</p>
          <p className="text-red-600">📉 4.3% Down from yesterday</p>
        </div>
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h3 className="text-lg font-semibold">Total Trip Pending</h3>
          <p className="text-2xl font-bold">2040</p>
          <p className="text-green-600">📈 1.9% Up from yesterday</p>
        </div>
      </div>
      {/* Add more dashboard content as needed */}
    </Layout>
  );
};

export default Dashboard;
