"use client";

// pages/manage-account.tsx
import React from "react";
import Image from "next/image";
import Layout from "@/components/profile/layout";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";

const ManageAccount: React.FC = () => {
  return (
    <>
      <Navbar />
      <Layout>
        <div className="md:flex md:space-x-6">
          {/* Profile Image Upload */}
          <div className="md:w-1/3">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                <Image
                  src="/img/DefaultPhoto.jpg" // Replace with your image path
                  alt="Profile"
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
              <label className="cursor-pointer bg-gray-200 text-gray-700 py-2 px-4 rounded-md shadow-md hover:bg-gray-300">
                Upload Photo
                <input type="file" className="hidden" />
              </label>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Image size should be under 1MB and image ratio needs to be 1:1
              </p>
            </div>
          </div>

          {/* Account Details Form */}
          <div className="mt-6 md:mt-0 md:w-2/3">
            <h3 className="text-xl font-semibold mb-4">Manage Account</h3>
            <form>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700">Username</label>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg py-3 px-4"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    placeholder="Email address"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg py-3 px-4"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="Your phone number"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg py-3 px-4"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Address</label>
                  <input
                    type="text"
                    placeholder="Your current address"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg py-3 px-4"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-6 bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition-colors sm:text-lg"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>

        {/* Change Password Section */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Change Password</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700">Current Password</label>
              <input
                type="password"
                placeholder="Current password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg py-3 px-4"
              />
            </div>
            <div>
              <label className="block text-gray-700">New Password</label>
              <input
                type="password"
                placeholder="New password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg py-3 px-4"
              />
            </div>
            <div>
              <label className="block text-gray-700">
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="Confirm new password"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg py-3 px-4"
              />
            </div>
            <button
              type="submit"
              className="mt-6 bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition-colors sm:text-lg"
            >
              Change Password
            </button>
          </form>
        </div>
      </Layout>
      <Footer />
    </>
  );
};

export default ManageAccount;
