"use client";
import React, { useEffect, useState } from "react";
import WalletBalance from "@/components/page/WalletBalance";
import Profile from "@/components/profile/Profile";
import TransactionHistory from "@/components/page/TransactionHistory";
import Navbar from "@/components/NavBar";
import { fetchingWallet } from "../services/userAPI";
import Pagination from "@/components/page/Pagination";

const WalletPage = () => {
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); 
  const tranctionPerPage = 5;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchWalletData = async (page: number) => {
      try {
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        
        const userId = userData._id;
        const response = await fetchingWallet(userId, page, tranctionPerPage);
        console.log(response);
        
        const { balance, transactions, totalCount } = response.data;

        setWalletBalance(balance);
        setTransactions(transactions);
        setTotalPages(Math.ceil(totalCount / tranctionPerPage)); 
      } catch (error) {
        console.error("Error fetching wallet data:", error);
      }
    };

    fetchWalletData(currentPage);
  }, [currentPage]);


  return (
    <>
      <Navbar />
      <Profile>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Wallet</h1>
          <WalletBalance balance={walletBalance} />
          <TransactionHistory transactions={transactions} />
          <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
        </div>
      </Profile>
    </>
  );
};

export default WalletPage;
