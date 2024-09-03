import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link"; // Import Link from next/link
import Navbar from "../NavBar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  // State to keep track of the active link
  const [activePath, setActivePath] = useState<string>("profile");

  // Function to determine if a link is active
  const isActive = (path: string) => activePath === path;

  return (
    <>
      <div className="min-h-screen bg-gray-50 pt-16">
        {/* Profile Header */}
        <div className="bg-blue-100 py-6 px-4">
          <div className="max-w-4xl mx-auto flex items-center space-x-6">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <Image
                src="/img/DefaultPhoto.jpg" // Replace with your profile image path
                alt="Profile"
                width={64}
                height={64}
                className="object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Akil</h2>
          </div>
          <div className="max-w-6xl mx-auto mt-4 border-b border-gray-200 ">
            <nav className="flex justify-center space-x-6">
              <Link
                href="/profile"
                className={`rounded-lg block text-xl p-3 font-semibold ${
                  isActive("/profile")
                    ? "text-blue-900 bg-blue-200"
                    : "hover:bg-gray-200"
                }`}
              >
                Manage account
              </Link>
              <Link
                href="/company/trips"
                className={`rounded-lg block text-xl p-3 font-semibold ${
                  isActive("/company/trips")
                    ? "text-blue-700 bg-blue-200"
                    : "hover:bg-gray-200"
                }`}
              >
                Trips
              </Link>
              <Link
                href="/company/message"
                className={`rounded-lg block text-xl p-3 font-semibold ${
                  isActive("/company/message")
                    ? "text-blue-700 bg-blue-200"
                    : "hover:bg-gray-200"
                }`}
              >
                Message
              </Link>
              <Link
                href="/company/reward"
                className={`rounded-lg block text-xl p-3 font-semibold ${
                  isActive("/company/reward")
                    ? "text-blue-700 bg-blue-200"
                    : "hover:bg-gray-200"
                }`}
              >
                Reward and wallet
              </Link>
              <Link
                href="/company/signout"
                className={`rounded-lg block text-xl p-3 font-semibold ${
                  isActive("/company/signout")
                    ? "text-blue-700 bg-blue-200"
                    : "hover:bg-gray-200"
                }`}
              >
                Sign out
              </Link>
            </nav>
          </div>
        </div>

        {/* Page Content */}
        <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
