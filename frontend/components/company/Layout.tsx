import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  
  const isActive = (path: string) => router.pathname === path;

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md fixed h-full">
        <div className="p-4">
          <h2 className="text-2xl font-semibold">Travelie</h2>
        </div>
        <nav className="mt-8">
          <ul>
            <li className="px-4 py-2">
              <Link href="/dashboard">
                <a className={`rounded-md block ${isActive('/dashboard') ? 'text-blue-600 bg-blue-100' : 'hover:bg-gray-200'}`}>
                  Dashboard
                </a>
              </Link>
            </li>
            <li className="px-4 py-2">
              <Link href="/trips">
                <a className={`rounded-md block ${isActive('/trips') ? 'text-blue-600 bg-blue-100' : 'hover:bg-gray-200'}`}>
                  Trips
                </a>
              </Link>
            </li>
            <li className="px-4 py-2">
              <Link href="/category">
                <a className={`rounded-md block ${isActive('/category') ? 'text-blue-600 bg-blue-100' : 'hover:bg-gray-200'}`}>
                  Category
                </a>
              </Link>
            </li>
            <li className="px-4 py-2">
              <Link href="/booking-list">
                <a className={`rounded-md block ${isActive('/booking-list') ? 'text-blue-600 bg-blue-100' : 'hover:bg-gray-200'}`}>
                  Booking List
                </a>
              </Link>
            </li>
            <li className="px-4 py-2">
              <Link href="/chat">
                <a className={`rounded-md block ${isActive('/chat') ? 'text-blue-600 bg-blue-100' : 'hover:bg-gray-200'}`}>
                  Chat
                </a>
              </Link>
            </li>
            <li className="px-4 py-2 mt-8">
              <Link href="/settings">
                <a className={`rounded-md block ${isActive('/settings') ? 'text-blue-600 bg-blue-100' : 'hover:bg-gray-200'}`}>
                  Settings
                </a>
              </Link>
            </li>
            <li className="px-4 py-2">
              <Link href="/logout">
                <a className={`rounded-md block ${isActive('/logout') ? 'text-blue-600 bg-blue-100' : 'hover:bg-gray-200'}`}>
                  Logout
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8">
        {children}
      </div>
    </div>
  );
};

export default Layout;
