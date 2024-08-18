"use client";

import { approvalAPI, getAllUnapprovalAPI } from "@/app/services/adminAPI";
import "react-toastify/dist/ReactToastify.css";
import Layout from "@/components/admin/Layout";
import Topbar from "@/components/page/topBar";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
// import { getAllUnapprovalAPI } from "../../services/allAPI"; // Adjust the import path based on your project structure

interface Company {
  _id: string;
  companyname: string;
  phone: string;
  date: string;
  adminVerified: boolean;
  email: string;
}

const CompanyApproval: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) throw new Error("No token found");
        const response = await getAllUnapprovalAPI(token);

        console.log({ response });
        setCompanies(response); // Assuming the API response is in the correct format
      } catch (error) {
        console.error("Failed to fetch unapproved companies:", error);
      }
    };

    fetchCompanies();
  }, []);

  const handleApprove = async (companyId: string) => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) throw new Error("No token found");

      if (companyId) {
        await approvalAPI(companyId, token);
        handleCompanyApprove(companyId);
        toast.success("Company approved successfully");
      }
    } catch (err) {
      console.error("Failed to update company status: ", err);
      // setError("Failed to update user status");
    }
  };

  const handleCompanyApprove = (id: string) => {
    setCompanies(companies.filter((company) => company._id !== id));
  };

  const handleReject = (id: string) => {
    // setCompanies(
    //   // companies.map((company) =>
    //   //   company._id === id ? { ...company, status: "Rejected" } : company
    //   // )
    // );
    sendEmail(id, "Rejected");
  };

  const sendEmail = (id: string, status: string) => {
    const company = companies.find((company) => company._id === id);
    if (company) {
      // Replace with actual email sending logic
      console.log(`Sending ${status} email to ${company.email}`);
    }
  };

  return (
    <Layout>
      <Topbar />
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
      <div className="mt-9 p-6 bg-white shadow rounded-lg">
        <h2 className="text-2xl font-semibold mb-6">Company Approval</h2>
        <table className="w-full bg-gray-100 rounded-lg">
          <thead>
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Company Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">phone</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {companies &&
              companies.map((company) => (
                <tr key={company._id}>
                  <td className="py-3 px-4">{company._id}</td>
                  <td className="py-3 px-4">{company.companyname}</td>
                  <td className="py-3 px-4">{company.email}</td>
                  <td className="py-3 px-4">{company.phone}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded ${
                        company.adminVerified === false
                          ? "bg-gray-300"
                          : company.adminVerified === true
                          ? "bg-green-300"
                          : "bg-red-300"
                      }`}
                    >
                      {company.adminVerified === false ? "Pending" : "approved"}
                    </span>
                  </td>
                  <td className="py-3 px-4 flex space-x-2">
                    {company.adminVerified === false && (
                      <>
                        <button
                          onClick={() => handleReject(company._id)}
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleApprove(company._id)}
                          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                        >
                          Approval
                        </button>
                      </>
                    )}
                    {/* {company.status === "Rejected" && (
                    <span className="text-red-500">Canceled</span>
                  )}
                  {company.status === "Approved" && (
                    <span className="text-green-500">Approved</span>
                  )} */}
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
