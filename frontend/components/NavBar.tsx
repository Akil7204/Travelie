"use client";

// components/Navbar.tsx
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar: React.FC = () => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    
    if (token && userData) {
      const user = JSON.parse(userData)
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  }, []);

  const handleLogoutClick = () => {
    toast.success("Logout Successfully");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsAuthorized(false);
    router.push('/'); // Redirect to the home page or login page
  };

  return (
    <nav className="fixed w-screen z-50 flex justify-between items-center py-4 px-6  bg-white border-b border-gray-200 ">
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
      <div className="text-2xl font-bold font-serif"><Link href="/">TRAVELIE</Link></div>
      <ul className="flex space-x-10 text-lg">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/discover">Discover</Link>
        </li>
        <li>
          <Link href="/activities">Activities</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>

      {isAuthorized ? (
        <div className="flex space-x-4">
          <Link href="#">
            <span
              onClick={handleLogoutClick}
              className="px-4 py-2 border border-blue-500 text-blue-500 rounded"
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
