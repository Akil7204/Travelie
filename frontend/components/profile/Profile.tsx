import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getUnreadMessagesCountAPI } from "@/app/services/allAPI";
import { Badge } from "@mui/material";
import { io } from "socket.io-client";

interface LayoutProps {
  children: React.ReactNode;
}

const socket = io("http://localhost:4000");

const Profile: React.FC<LayoutProps> = ({ children }) => {
  const [activePath, setActivePath] = useState<string>("profile");
  const [userProfile, setUserProfile] = useState<any>(null);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState<number>(0);

  useEffect(() => {
    const storedUserProfile = localStorage.getItem("user");

    if (storedUserProfile) {
      try {
        const user = JSON.parse(storedUserProfile);
        setUserProfile(user);
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchUnreadMessages = async () => {
      const response = await getUnreadMessagesCountAPI();
      socket.on("unreadCount", (response: any) => {
        console.log("Unread count received:", response);
        setUnreadMessagesCount(response.unreadCount);
      });  
    };

    fetchUnreadMessages();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setActivePath(window.location.pathname);
    }
  }, []);

  const isActive = (path: string) => activePath === path;

  return (
    <>
      <div className="min-h-screen bg-gray-50 pt-16">
        {/* Profile Header */}
        <div className="bg-gray-200 py-6 px-4">
          <div className="max-w-4xl mx-auto flex items-center space-x-6">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              {userProfile && (
                <Image
                  src={userProfile.profileImage} // Use a default image if none found
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
                    ? "text-white bg-blue-700"
                    : "hover:bg-gray-200"
                }`}
              >
                Manage account
              </Link>
              <Link
                href="/myTrips"
                className={`rounded-lg block text-xl p-3 font-semibold ${
                  isActive("/myTrips")
                    ? "text-white bg-blue-700"
                    : "hover:bg-gray-200"
                }`}
              >
                Trips
              </Link>
              <Link
                href="/chat"
                className={`rounded-lg block text-xl p-3 font-semibold ${
                  isActive("/chat")
                    ? "text-white bg-blue-700"
                    : "hover:bg-gray-200"
                }`}
              >
                <Badge
                  badgeContent={unreadMessagesCount}
                  color="secondary"
                  overlap="circular"
                >
                  Message
                </Badge>
              </Link>
              <Link
                href="/wallet"
                className={`rounded-lg block text-xl p-3 font-semibold ${
                  isActive("/wallet")
                    ? "text-white bg-blue-700"
                    : "hover:bg-gray-200"
                }`}
              >
                wallet
              </Link>
              <Link
                href="#"
                className={`rounded-lg block text-xl p-3 font-semibold ${
                  isActive("#") ? "text-white bg-blue-700" : "hover:bg-gray-200"
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
