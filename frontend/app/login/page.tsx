import Login from "@/components/login/login";
import Navbar from "@/components/NavBar";
import React from "react";

function login() {
  return (
    <div className="flex flex-col overflow-x-hidden">
        <Navbar />
        <Login />
    </div>
  );
}

export default login;
