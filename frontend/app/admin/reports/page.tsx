"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/components/admin/Layout";
import Table from "@/components/page/Table";
import {
  getAllReportsAPI,
  updateReportStatusAPI,
} from "@/app/services/adminAPI";

interface Report {
  _id: string;
  companyId: {
    companyname: string;
  };
  message: string;
  createdAt: Date;
  status: "Pending" | "Resolved" | "Dismissed";
}

const AdminReportPage: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) throw new Error("No token found");

        const response = await getAllReportsAPI(token);
        setReports(response.data);
        console.log(response);
      } catch (err) {
        console.error("Error fetching reports:", err);
      }
    };

    fetchReports();
  }, []);

  const handleUpdateStatus = async (reportId: string, newStatus: "Resolved" | "Dismissed") => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) throw new Error("No token found");

     
      setReports((prevReports) =>
        prevReports.map((report) =>
          report._id === reportId ? { ...report, status: newStatus } : report
        )
      );

      const response = await updateReportStatusAPI(reportId, newStatus, token);
      console.log(response);
      
    } catch (error) {
      console.error(error);
      setError("Failed to update report status");
    }
  };

  const headers = ["ID", "Company Name", "Message", "Status", "Action"];

  const renderReportRow = (report: Report) => (
    <>
      <td className="px-6 py-4 border-b">{report._id}</td>
      <td className="px-6 py-4 border-b">{report.companyId.companyname}</td>
      <td className="px-6 py-4 border-b">{report.message}</td>
      <td className="px-6 py-4 border-b">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            report.status === "Pending"
              ? "bg-yellow-100 text-yellow-800"
              : report.status === "Resolved"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {report.status}
        </span>
      </td>
      <td className="px-6 py-4 border-b text-center">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2 hover:opacity-90"
          onClick={() => handleUpdateStatus(report._id, "Resolved")}
          disabled={report.status !== "Pending"}
        >
          Resolve
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:opacity-90"
          onClick={() => handleUpdateStatus(report._id, "Dismissed")}
          disabled={report.status !== "Pending"}
        >
          Dismiss
        </button>
      </td>
    </>
  );

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Report Management</h1>
        <Table<Report>
          headers={headers}
          data={reports}
          renderRow={renderReportRow}
        />
      </div>
    </Layout>
  );
};

export default AdminReportPage;
