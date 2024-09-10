"use client"

import React from 'react';

interface ModalProps {
  seatCount: number; // Type for seatCount state
  setSeatCount: React.Dispatch<React.SetStateAction<number>>; 
  isOpen: boolean;
  onClose: () => void;
  availableSeats: number;
  onProceed: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, availableSeats, onProceed, seatCount, setSeatCount }) => {
  
  const handleIncrement = () => {
    if (seatCount < availableSeats) {
      setSeatCount(seatCount + 1);
    }
  };

  const handleDecrement = () => {
    if (seatCount > 1) {
      setSeatCount(seatCount - 1);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-4">Select Seats</h2>
        <div className="flex justify-between items-center mb-4">
          <button className="bg-gray-200 p-2 rounded" onClick={handleDecrement}>-</button>
          <span className="text-lg">{seatCount}</span>
          <button className="bg-gray-200 p-2 rounded" onClick={handleIncrement}>+</button>
        </div>
        <p className="mb-4">Available Seats: {availableSeats}</p>
        <div className="flex justify-between">
          <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600" onClick={onClose}>Cancel</button>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600" onClick={onProceed}>Proceed to Payment</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
