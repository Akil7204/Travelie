import React, { useState } from "react";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyName: string;
  onSubmitReport: (message: string) => void;
}

const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  companyName,
  onSubmitReport,
}) => {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (message.trim()) {
      onSubmitReport(message);
      setMessage(""); 
      onClose(); 
    } else {
      alert("Please enter a message before submitting.");
    }
  };

  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Report Company</h2>

        {/* Company Name */}
        <div className="mb-4">
          <label className="block font-semibold">Company Name:</label>
          <p>{companyName}</p> 
        </div>

        {/* Message Input */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full border-gray-300 rounded-md p-2"
            placeholder="Type your message here..."
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Submit Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
