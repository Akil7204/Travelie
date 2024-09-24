"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/components/admin/Layout";
import Table from "@/components/page/Table";
import { dismissReportAPI, getAllReportsAPI, resolveReportAPI } from "@/app/services/adminAPI";


interface Report {
  _id: string;
  companyName: string;
  userMessage: string;
  createdAt: Date;
  status: "Pending" | "Resolved" | "Dismissed";
}

const AdminReportPage: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) throw new Error("No token found");

        const response = await getAllReportsAPI(token);
        setReports(response);
      } catch (err) {
        console.error("Error fetching reports:", err);
      }
    };

    fetchReports();
  }, []);

  const handleReportAction = async (
    report: Report,
    action: "resolve" | "dismiss"
  ) => {
    try {
      const token = localStorage.getItem("adminToken");
      if (!token) throw new Error("No token found");

      if (action === "resolve") {
        await resolveReportAPI(report._id, token);
      } else if (action === "dismiss") {
        await dismissReportAPI(report._id, token);
      }

      // Optimistically update UI
      setReports((prevReports) =>
        prevReports.map((r) =>
          r._id === report._id
            ? { ...r, status: action === "resolve" ? "Resolved" : "Dismissed" }
            : r
        )
      );
    } catch (err) {
      console.error("Failed to update report status", err);
    }
  };

  const headers = ["ID", "Company Name", "Message", "Status", "Action"];

  const renderReportRow = (report: Report) => (
    <>
      <td className="px-6 py-4 border-b">{report._id}</td>
      <td className="px-6 py-4 border-b">{report.companyName}</td>
      <td className="px-6 py-4 border-b">{report.userMessage}</td>
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
          onClick={() => handleReportAction(report, "resolve")}
          disabled={report.status !== "Pending"}
        >
          Resolve
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:opacity-90"
          onClick={() => handleReportAction(report, "dismiss")}
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
        <Table<Report> headers={headers} data={reports} renderRow={renderReportRow} />
      </div>
    </Layout>
  );
};

export default AdminReportPage;
