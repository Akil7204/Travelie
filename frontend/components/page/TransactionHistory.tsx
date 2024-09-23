
import React from 'react';

interface Transaction {
  amount: number;
  description: string;
  date: string;
  type: string;
  balance: number;
  status: string;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
      <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
        <thead>
          <tr className="text-left border-b">
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Direction</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Description</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index} className="border-b">
              <td className="px-4 py-3">{transaction.amount}</td>
              <td className="px-4 py-3">
                <span
                  className={`inline-block px-2 py-1 text-sm font-medium rounded-lg ${
                    transaction.type === 'credit'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-red-100 text-red-600'
                  }`}
                >
                  {transaction.type}
                </span>
              </td>
              <td className="px-4 py-3">{new Date(transaction.date).toLocaleDateString()}</td>
              <td className="px-4 py-3">{transaction.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
