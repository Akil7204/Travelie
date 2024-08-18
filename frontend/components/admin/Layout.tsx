import React, { useEffect, useState } from "react";
import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [activePath, setActivePath] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
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
              <Link
                href="/admin/dashboard"
                className={`rounded-lg block text-xl p-3 font-semibold ${
                  isActive("/admin/dashboard")
                    ? "bg-blue-700 text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                Dashboard
              </Link>
            </li>
            <li className="px-5 py-3">
              <Link
                href="/admin/approval"
                className={`rounded-lg block text-xl p-3 font-semibold ${
                  isActive("/admin/approval")
                    ? "bg-blue-700 text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                Company Approval
              </Link>
            </li>
            <li className="px-6 py-3">
              <Link
                href="/admin/transaction"
                className={`rounded-lg block text-xl p-3 font-semibold  ${
                  isActive("/admin/transaction")
                    ? "bg-blue-700 text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                Transactions
              </Link>
            </li>
            <li className="px-6 py-3">
              <Link
                href="/admin/users"
                className={`rounded-lg block text-xl p-3 font-semibold ${
                  isActive("/admin/users")
                    ? "bg-blue-700 text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                Users
              </Link>
            </li>
            <li className="px-6 py-3">
              <Link
                href="/admin/company"
                className={`rounded-lg block text-xl p-3 font-semibold ${
                  isActive("/admin/company")
                    ? "bg-blue-700 text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                Company
              </Link>
            </li>
            <li className="px-6 py-3">
              <Link
                href="/admin/reports"
                className={`rounded-lg block text-xl p-3 font-semibold ${
                  isActive("/admin/reports")
                    ? "bg-blue-700 text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                Reports
              </Link>
            </li>
            <li className="px-6 py-3 mt-12">
              <Link
                href="/admin/logout"
                className={`rounded-lg block text-xl p-3 font-semibold ${
                  isActive("/admin/logout")
                    ? "bg-blue-700 text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8">{children}</div>
    </div>
  );
};

export default Layout;
