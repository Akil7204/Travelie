
import React from 'react';

const transactions = [
  { amount: '500 Rs', direction: 'Credited', date: '03/04/2024', type: 'Add by bank account', balance: '₹23000', status: 'credited' },
  { amount: '400 Rs', direction: 'Debited', date: '03/04/2024', type: 'Trip booking', balance: '₹22000', status: 'debited' },
  { amount: '500 Rs', direction: 'Credited', date: '03/04/2024', type: 'by cancellation of trip', balance: '₹23000', status: 'credited' },
];

const TransactionHistory = () => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
      <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
        <thead>
          <tr className="text-left border-b">
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Direction</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Balance</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-3">{transaction.amount}</td>
              <td className="px-4 py-3">
                <span
                  className={`inline-block px-2 py-1 text-sm font-medium rounded-lg ${
                    transaction.status === 'credited'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-red-100 text-red-600'
                  }`}
                >
                  {transaction.direction}
                </span>
              </td>
              <td className="px-4 py-3">{transaction.date}</td>
              <td className="px-4 py-3">{transaction.type}</td>
              <td className="px-4 py-3">{transaction.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
