"use client";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { blockUserAPI, getAllUsersAPI, unblockUserAPI } from "@/app/services/adminAPI";
import Layout from "@/components/admin/Layout";
import Table from "@/components/page/Table";
import React, { useEffect, useState } from "react";

interface User {
  _id: string;
  username: string;
  email: string;
  isBlocked: boolean;
}

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mr-3", 
    cancelButton: "bg-red-500 text-white  px-4 py-2 rounded-md hover:bg-red-600",
  },
  buttonsStyling: true, 
});

const AdminUserPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User>();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) throw new Error("No token found");

        const response = await getAllUsersAPI(token);
        setUsers(response);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  const handleConfirmAction = async (user: User) => {
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: `You are about to ${user.isBlocked ? "unblock" : "block"} this user!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: `Yes, ${user.isBlocked ? "unblock" : "block"} it!`,
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const token = localStorage.getItem("adminToken");
            if (!token) throw new Error("No token found");

            setUsers((prevUsers) =>
              prevUsers.map((u) =>
                u._id === user._id ? { ...u, isBlocked: !u.isBlocked } : u
              )
            );

            setCurrentUser(user);

            if (user.isBlocked) {
              await unblockUserAPI(user._id, token);
              swalWithBootstrapButtons.fire(
                "Unblocked!",
                "The user has been unblocked.",
                "success"
              );
            } else {
              await blockUserAPI(user._id, token);
              swalWithBootstrapButtons.fire(
                "Blocked!",
                "The user has been blocked.",
                "success"
              );
            }
          } catch (err) {
            console.error("Failed to update user status", err);
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "No changes were made to the user status.",
            "error"
          );
        }
      });
  };

  const headers = ["ID", "Name", "Email", "Status", "Action"];

  const renderUserRow = (user: User) => (
    <>
      <td className="px-6 py-4 border-b">{user._id}</td>
      <td className="px-6 py-4 border-b">{user.username}</td>
      <td className="px-6 py-4 border-b">{user.email}</td>
      <td className="px-6 py-4 border-b">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            user.isBlocked
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {user.isBlocked ? "Blocked" : "Active"}
        </span>
      </td>
      <td className="px-6 py-4 border-b text-center">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            user.isBlocked ? "bg-green-500 text-white" : "bg-red-500 text-white"
          } rounded-lg focus:outline-none hover:opacity-90 transition`}
          onClick={() => handleConfirmAction(user)}
        >
          {user.isBlocked ? "Unblock" : "Block"}
        </button>
      </td>
    </>
  );

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">User Management</h1>
        <Table<User> headers={headers} data={users} renderRow={renderUserRow} />
      </div>
    </Layout>
  );
};

export default AdminUserPage;
