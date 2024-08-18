"use client"

// components/CompanyApproval.tsx

import Layout from "@/components/admin/Layout";
import Topbar from "@/components/page/topBar";
import React, { useState } from "react";

interface Company {
  id: string;
  name: string;
  address: string;
  date: string;
  status: "Pending" | "Approved" | "Rejected";
  email: string;
}

const initialCompanies: Company[] = [
  {
    id: "00001",
    name: "Christine Brooks",
    address: "089 Kutch Green Apt. 448",
    date: "14 Feb 2019",
    status: "Pending",
    email: "christine.brooks@example.com",
  },
  {
    id: "00002",
    name: "Rosie Pearson",
    address: "979 Immanuel Ferry Suite 526",
    date: "14 Feb 2019",
    status: "Pending",
    email: "rosie.pearson@example.com",
  },
  {
    id: "00003",
    name: "Darrell Caldwell",
    address: "8587 Frida Ports",
    date: "14 Feb 2019",
    status: "Pending",
    email: "darrell.caldwell@example.com",
  },
  {
    id: "00004",
    name: "Gilbert Johnston",
    address: "768 Destiny Lake Suite 600",
    date: "14 Feb 2019",
    status: "Pending",
    email: "gilbert.johnston@example.com",
  },
  {
    id: "00005",
    name: "Alan Cain",
    address: "042 Mylene Throughway",
    date: "14 Feb 2019",
    status: "Pending",
    email: "alan.cain@example.com",
  },
];

const CompanyApproval: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>(initialCompanies);

  const handleApprove = (id: string) => {
    setCompanies(companies.filter((company) => company.id !== id));
    sendEmail(id, "Approved");
  };

  const handleReject = (id: string) => {
    setCompanies(
      companies.map((company) =>
        company.id === id ? { ...company, status: "Rejected" } : company
      )
    );
    sendEmail(id, "Rejected");
  };

  const sendEmail = (id: string, status: string) => {
    const company = companies.find((company) => company.id === id);
    if (company) {
      // Replace with actual email sending logic
      console.log(`Sending ${status} email to ${company.email}`);
    }
  };

  return (
    <Layout>
      <Topbar />
      <div className="mt-9 p-6 bg-white shadow rounded-lg">
        <h2 className="text-2xl font-semibold mb-6">Company Approval</h2>
        <table className="w-full bg-gray-100 rounded-lg">
          <thead>
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Address</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company.id}>
                <td className="py-3 px-4">{company.id}</td>
                <td className="py-3 px-4">{company.name}</td>
                <td className="py-3 px-4">{company.address}</td>
                <td className="py-3 px-4">{company.date}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded ${
                      company.status === "Pending"
                        ? "bg-gray-300"
                        : company.status === "Approved"
                        ? "bg-green-300"
                        : "bg-red-300"
                    }`}
                  >
                    {company.status}
                  </span>
                </td>
                <td className="py-3 px-4 flex space-x-2">
                  {company.status === "Pending" && (
                    <>
                      <button
                        onClick={() => handleReject(company.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleApprove(company.id)}
                        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                      >
                        Approval
                      </button>
                    </>
                  )}
                  {company.status === "Rejected" && (
                    <span className="text-red-500">Canceled</span>
                  )}
                  {company.status === "Approved" && (
                    <span className="text-green-500">Approved</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default CompanyApproval;
