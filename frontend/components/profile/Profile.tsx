import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
}

const Profile: React.FC<LayoutProps> = ({ children }) => {
  const [activePath, setActivePath] = useState<string>("profile");
  const [userProfile, setUserProfile] = useState<any>(null); // Initialize userProfile state

  useEffect(() => {
    // Get user profile from local storage on component mount
    const storedUserProfile = localStorage.getItem("user");
    
    if (storedUserProfile) {
      try {
        const user = JSON.parse(storedUserProfile);
        setUserProfile(user);
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
  }, []); // Empty dependency array to run once on mount

  useEffect(() => {
    if (typeof window !== "undefined") {
      setActivePath(window.location.pathname);
    }
  }, []);

  // Function to determine if a link is active
  const isActive = (path: string) => activePath === path;

  return (
    <>
      <div className="min-h-screen bg-gray-50 pt-16">
        {/* Profile Header */}
        <div className="bg-blue-100 py-6 px-4">
          <div className="max-w-4xl mx-auto flex items-center space-x-6">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              {userProfile && (
                <Image
                  src={userProfile.profileImage } // Use a default image if none found
                  alt="Profile"
                  width={64}
                  height={64}
                  className="object-cover"
                />
              )}
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              {userProfile ? userProfile.username : "Loading..."}
            </h2>
          </div>
          <div className="max-w-6xl mx-auto mt-4 border-b border-gray-200 ">
            <nav className="flex justify-center space-x-6">
              <Link
                href="/profile"
                className={`rounded-lg block text-xl p-3 font-semibold ${
                  isActive("/profile")
                    ? "text-blue-700 bg-blue-200"
                    : "hover:bg-gray-200"
                }`}
              >
                Manage account
              </Link>
              <Link
                href="/myTrips"
                className={`rounded-lg block text-xl p-3 font-semibold ${
                  isActive("/company/trips")
                    ? "text-blue-700 bg-blue-200"
                    : "hover:bg-gray-200"
                }`}
              >
                Trips
              </Link>
              <Link
                href="/chat"
                className={`rounded-lg block text-xl p-3 font-semibold ${
                  isActive("/chat")
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

export default Profile;
