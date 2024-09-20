"use client";
import { blockCompanyAPI, getAllCompanyAPI, unblockCompanyAPI } from "@/app/services/adminAPI";
import Layout from "@/components/admin/Layout";
import Table from "@/components/page/Table";
import { useEffect, useState } from "react";

interface Company {
  _id: string;
  companyname: string;
  email: string;
  isBlocked: boolean;
}

const AdminCompanyPage: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) throw new Error("No token found");

        const response = await getAllCompanyAPI(token);
        console.log(response);
        
        setCompanies(response);
      } catch (err) {
        console.error("Error fetching users:", err);
        // setError("Failed to fetch users");
      } finally {
        // setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleToggleBlock = (id: string) => {
    setCompanies((prevCompanies) =>
      prevCompanies.map((company) =>
        company._id === id
          ? { ...company, isBlocked: !company.isBlocked }
          : company
      )
    );
  };

  const handleConfirmAction = async (user: any) => {
    if (user) {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) throw new Error("No token found");

        // Update the UI optimistically
        setCompanies((prevUsers) =>
          prevUsers.map((company) =>
            company._id === user._id
              ? { ...company, isBlocked: !company.isBlocked }
              : company
          )
        );

        // Call the appropriate API based on the current status
        if (user.isBlocked) {
          await unblockCompanyAPI(user._id, token);
          console.log("unblock success");
          
        //   toast.success("User unblocked successfully");
        } else {
          await blockCompanyAPI(user?._id, token);
          console.log("block success");

        //   toast.success("User blocked successfully");
        }
      } catch (err) {
        console.error("Failed to update user status", err);
        // setError("Failed to update user status");
      }
    }
  };

  const headers = ["ID", "Name", "Industry", "Status", "Action"];

  const renderCompanyRow = (company: Company) => (
    <>
      <td className="px-6 py-4 border-b">{company._id}</td>
      <td className="px-6 py-4 border-b">{company.companyname}</td>
      <td className="px-6 py-4 border-b">{company.email}</td>
      <td className="px-6 py-4 border-b">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            company.isBlocked
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {company.isBlocked ? "Blocked" : "Active"}
        </span>
      </td>
      <td className="px-6 py-4 border-b text-center">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            company.isBlocked
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          } rounded-lg focus:outline-none hover:opacity-90 transition`}
          onClick={() => handleConfirmAction(company)}
        >
          {company.isBlocked ? "Unblock" : "Block"}
        </button>
      </td>
    </>
  );

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Company Management</h1>
        <Table<Company>
          headers={headers}
          data={companies}
          renderRow={renderCompanyRow}
        />
      </div>
    </Layout>
  );
};

export default AdminCompanyPage;
