"use client";
import Swal from "sweetalert2";
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
    const fetchCompanies = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) throw new Error("No token found");

        const response = await getAllCompanyAPI(token);
        console.log(response);
        setCompanies(response);
      } catch (err) {
        console.error("Error fetching companies:", err);
      }
    };

    fetchCompanies();
  }, []);

  const handleConfirmAction = async (company: Company) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mr-3",
        cancelButton: "bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600",
      },
      buttonsStyling: true,
    });

    swalWithBootstrapButtons
      .fire({
        title: `Are you sure you want to ${company.isBlocked ? "unblock" : "block"} this company?`,
        text: `You are about to ${company.isBlocked ? "unblock" : "block"} ${company.companyname}.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: `Yes, ${company.isBlocked ? "unblock" : "block"} it!`,
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const token = localStorage.getItem("adminToken");
            if (!token) throw new Error("No token found");

            // Toggle company block/unblock
            setCompanies((prevCompanies) =>
              prevCompanies.map((c) =>
                c._id === company._id
                  ? { ...c, isBlocked: !c.isBlocked }
                  : c
              )
            );

            if (company.isBlocked) {
              await unblockCompanyAPI(company._id, token);
              swalWithBootstrapButtons.fire(
                "Unblocked!",
                `${company.companyname} has been unblocked.`,
                "success"
              );
            } else {
              await blockCompanyAPI(company._id, token);
              swalWithBootstrapButtons.fire(
                "Blocked!",
                `${company.companyname} has been blocked.`,
                "success"
              );
            }
          } catch (err) {
            console.error("Failed to update company status", err);
            Swal.fire("Error", "Failed to update company status", "error");
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            `${company.companyname} is safe.`,
            "error"
          );
        }
      });
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
            company.isBlocked ? "bg-green-500 text-white" : "bg-red-500 text-white"
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
