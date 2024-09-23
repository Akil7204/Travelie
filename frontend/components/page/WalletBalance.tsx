// components/WalletBalance.tsx
import React from 'react';

const WalletBalance = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex justify-between items-center">
      <div>
        <h2 className="text-lg font-semibold text-gray-700">Wallet Balance</h2>
        <p className="text-2xl font-bold text-gray-800 mt-2">₹23000</p>
      </div>
      <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring">
        + Add Money
      </button>
    </div>
  );
};

export default WalletBalance;
