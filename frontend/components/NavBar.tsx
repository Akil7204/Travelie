"use client";

import { getUnreadMessagesCountAPI } from "@/app/services/allAPI";
import { deleteCookie } from "@/utils/deleteCookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Badge, Avatar } from "@mui/material";
import { io } from "socket.io-client";

// const socket = io("https://travelie.life"); // Your server URL
const socket = io("https://travelie.onrender.com");
// const socket = io("http://localhost:3000");

const Navbar: React.FC = () => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);
  const [unreadMessages, setUnreadMessages] = useState<number>(0);
  const [currentPath, setCurrentPath] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      const users = JSON.parse(userData);
      setUser(users);

      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }

    setCurrentPath(window.location.pathname);
  }, []);

  const fetchUnreadMessages = async () => {
    try {
      const response = await getUnreadMessagesCountAPI();
      socket.on("unreadCount", (response: any) => {
        console.log("Unread count received:", response);
        setUnreadMessages(response.unreadCount);
      });
    } catch (error: any) {
      console.log(error);
      console.error("Failed to fetch unread messages", error);
    }
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    fetchUnreadMessages();

    return () => {
      socket.off("unreadCount");
    };
  }, [user]);

  const handleLogoutClick = () => {
    toast.success("Logout Successfully");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    deleteCookie("token");
    document.cookie = `userToken=;`
    setIsAuthorized(false);
    router.push("/");
  };

  const isActive = (path: string) => currentPath === path;

  return (
    <nav className="fixed w-screen z-50 flex justify-between items-center py-4 px-6 bg-white border-b border-gray-200">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="text-2xl font-bold font-serif ">
        <Link href="/">TRAVELIE</Link>
      </div>
      <div className="flex-grow flex justify-center items-center space-x-16">
        <ul className="flex space-x-10 text-lg">
          <li>
            <Link href="/">
              <span
                className={`pb-2 ${
                  isActive("/") ? "border-b-2 border-blue-700" : ""
                }`}
              >
                Home
              </span>
            </Link>
          </li>
          <li>
            <Link href="/discover">
              <span
                className={`pb-2 ${
                  isActive("/discover") ? "border-b-2 border-blue-700" : ""
                }`}
              >
                Discover
              </span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Right Side with Profile/Logout Buttons */}
      {isAuthorized ? (
        <div className="flex space-x-8">
          <Link href="/profile">
            <Badge badgeContent={unreadMessages} color="secondary">
              <Avatar alt="Profile" src={user.profileImage} />
            </Badge>
          </Link>
          <Link href="#">
            <span
              onClick={handleLogoutClick}
              className="px-5 py-2 border border-blue-500 text-blue-500 rounded align-middle"
            >
              Logout
            </span>
          </Link>
        </div>
      ) : (
        <div className="flex space-x-4">
          <Link href="/signup">
            <span className="px-4 py-2 border border-blue-500 text-blue-500 rounded">
              Register
            </span>
          </Link>
          <Link href="/login">
            <span className="px-4 py-2 bg-blue-500 text-white rounded">
              Sign In
            </span>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
