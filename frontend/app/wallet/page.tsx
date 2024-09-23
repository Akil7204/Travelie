"use client";
import React, { useEffect, useState } from "react";
import WalletBalance from "@/components/page/WalletBalance";
import Profile from "@/components/profile/Profile";
import TransactionHistory from "@/components/page/TransactionHistory";
import Navbar from "@/components/NavBar";
import { fetchingWallet } from "../services/allAPI";

const WalletPage = () => {
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    // Fetch wallet balance and transaction history
    const fetchWalletData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        
        const userId = userData._id;
        const response = await fetchingWallet(userId);
        console.log(response);
        
        const { balance, transactions } = response.data;

        setWalletBalance(balance);
        setTransactions(transactions);
      } catch (error) {
        console.error("Error fetching wallet data:", error);
      }
    };

    fetchWalletData();
  }, []);


  return (
    <>
      <Navbar />
      <Profile>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Wallet</h1>
          <WalletBalance balance={walletBalance} />
          <TransactionHistory transactions={transactions} />
        </div>
      </Profile>
    </>
  );
};

export default WalletPage;
