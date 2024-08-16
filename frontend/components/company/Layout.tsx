import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [activePath, setActivePath] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setActivePath(window.location.pathname);
    }
  }, []);

  const isActive = (path: string) => activePath === path;

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg fixed h-full">
        <div className="p-6">
          <h2 className="text-2xl font-semibold">Travelie</h2>
        </div>
        <nav className="mt-10">
          <ul>
            <li className="px-6 py-3">
              <Link href="/company/dashboard" className={`rounded-lg block text-xl p-3 font-semibold ${isActive('/company/dashboard') ? 'text-blue-700 bg-blue-200' : 'hover:bg-gray-200'}`}>
                Dashboard
              </Link>
            </li>
            <li className="px-6 py-3">
              <Link href="/company/trips" className={`rounded-lg block text-xl p-3 font-semibold ${isActive('/company/trips') ? 'text-blue-700 bg-blue-200' : 'hover:bg-gray-200'}`}>
                Trips
              </Link>
            </li>
            <li className="px-6 py-3">
              <Link href="/company/category" className={`rounded-lg block text-xl p-3 font-semibold  ${isActive('/company/category') ? 'text-blue-700 bg-blue-200' : 'hover:bg-gray-200'}`}>
                Category
              </Link>
            </li>
            <li className="px-6 py-3">
              <Link href="/company/booking-list" className={`rounded-lg block text-xl p-3 font-semibold ${isActive('/company/booking-list') ? 'text-blue-700 bg-blue-200' : 'hover:bg-gray-200'}`}>
                Booking List
              </Link>
            </li>
            <li className="px-6 py-3">
              <Link href="/company/chat" className={`rounded-lg block text-xl p-3 font-semibold ${isActive('/company/chat') ? 'text-blue-700 bg-blue-200' : 'hover:bg-gray-200'}`}>
                Chat
              </Link>
            </li>
            <li className="px-6 py-3 mt-12">
              <Link href="/company/settings" className={`rounded-lg block text-xl p-3 font-semibold ${isActive('/company/settings') ? 'text-blue-700 bg-blue-200' : 'hover:bg-gray-200'}`}>
                Settings
              </Link>
            </li>
            <li className="px-6 py-3">
              <Link href="/company/logout" className={`rounded-lg block text-xl p-3 font-semibold ${isActive('/company/logout') ? 'text-blue-700 bg-blue-200' : 'hover:bg-gray-200'}`}>
                Logout
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
