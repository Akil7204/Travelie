"use client";
import React from "react";
import WalletBalance from "@/components/page/WalletBalance";
import Profile from "@/components/profile/Profile";
import TransactionHistory from "@/components/page/TransactionHistory";
import Navbar from "@/components/NavBar";

const WalletPage = () => {
  return (
    <>
      <Navbar />
      <Profile>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Wallet</h1>
          <WalletBalance />
          <TransactionHistory />
        </div>
      </Profile>
    </>
  );
};

export default WalletPage;
