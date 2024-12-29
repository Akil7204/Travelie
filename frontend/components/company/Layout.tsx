"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteCookie } from "@/utils/deleteCookie";
import { useRouter } from "next/navigation";
import { companyUnreadMessagesCountAPI } from "@/app/services/companyAPI";
import { Badge } from "@mui/material";
import { io } from "socket.io-client";

interface LayoutProps {
  children: React.ReactNode;
}

const socket = io("https://travelie.life");

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [activePath, setActivePath] = useState<string | null>(null);
  const [unreadMessages, setUnreadMessages] = useState<number>(0);
  const [company, setCompany] = useState<any>(null);
  const router = useRouter();


  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      const users = JSON.parse(userData);
      setCompany(users);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setActivePath(window.location.pathname);
    }
  }, []);

  const fetchUnreadMessages = async () => {
    try {
      const response = await companyUnreadMessagesCountAPI();
      console.log(response);
      
      socket.on("unread", (response: any) => {
        console.log("Unread count:", response);
        setUnreadMessages(response?.unreadCount);
      });
      
      // setUnreadMessages(response.unreadCount);
    } catch (error) {
      console.error("Failed to fetch unread messages", error);
    }
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    fetchUnreadMessages();

    return () => {
      socket.off("unread");
    };
  }, [company]);

  const isActive = (path: string) => activePath === path;

  const handleLogoutClick = () => {
    toast.success("Logout Successfully");
    localStorage.removeItem("company");
    localStorage.removeItem("companyToken");
    deleteCookie("companyToken");
    deleteCookie("TokenCompany");
    router.push("/company/signin"); 
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="min-h-screen flex bg-gray-100">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg fixed h-full">
          {/* <div className="p-6">
            <h2 className="text-2xl font-semibold">Travelie</h2>
          </div> */}
          <div className=" p-6 text-2xl font-bold font-serif">
            <Link href="/company/dashboard">TRAVELIE</Link>
          </div>
          <nav className="mt-10">
            <ul>
              <li className="px-6 py-3">
                <Link
                  href="/company/dashboard"
                  className={`rounded-lg block text-xl p-3 font-semibold ${
                    isActive("/company/dashboard")
                      ? "text-blue-700 bg-blue-200"
                      : "hover:bg-gray-200"
                  }`}
                >
                  Dashboard
                </Link>
              </li>
              <li className="px-6 py-3">
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
              </li>
              <li className="px-6 py-3">
                <Link
                  href="/company/categorys"
                  className={`rounded-lg block text-xl p-3 font-semibold  ${
                    isActive("/company/categorys")
                      ? "text-blue-700 bg-blue-200"
                      : "hover:bg-gray-200"
                  }`}
                >
                  Category
                </Link>
              </li>
              <li className="px-6 py-3">
                <Link
                  href="/company/bookingList"
                  className={`rounded-lg block text-xl p-3 font-semibold ${
                    isActive("/company/bookingList")
                      ? "text-blue-700 bg-blue-200"
                      : "hover:bg-gray-200"
                  }`}
                >
                  Booking List
                </Link>
              </li>
              <li className="px-6 py-3">
                <Link
                  href="/company/chat"
                  className={`rounded-lg block text-xl p-3 font-semibold ${
                    isActive("/company/chat")
                      ? "text-blue-700 bg-blue-200"
                      : "hover:bg-gray-200"
                  }`}
                >
                  <Badge badgeContent={unreadMessages} color="secondary">
                  Chat
                  </Badge>
                </Link>
              </li>
              <li className="px-6 py-3 mt-12">
                <Link
                  href="/company/settings"
                  className={`rounded-lg block text-xl p-3 font-semibold ${
                    isActive("/company/settings")
                      ? "text-blue-700 bg-blue-200"
                      : "hover:bg-gray-200"
                  }`}
                >
                  Settings
                </Link>
              </li>
              <li className="px-6 py-3">
                <button
                  type="button"
                  onClick={handleLogoutClick}
                  className={`rounded-lg block text-xl p-3 font-semibold ${
                    isActive("/company/logout")
                      ? "text-blue-700 bg-blue-200"
                      : "hover:bg-gray-200"
                  }`}
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 ml-64 p-8">{children}</div>
      </div>
    </>
  );
};

export default Layout;
