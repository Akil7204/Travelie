"use client";

import React from 'react';

interface ModalProps {
  seatCount: number;
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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm z-50 transition-opacity duration-300 ease-in-out">
      <div className="relative bg-gradient-to-r from-white/20 to-white/30 backdrop-blur-xl border border-white/40 p-10 rounded-3xl shadow-2xl shadow-black/50 w-full max-w-lg transition-transform duration-300 ease-in-out transform scale-100 hover:scale-105">
        
        {/* Modal Close Icon */}
        <button 
          className="absolute top-4 right-4 bg-white/40 hover:bg-white/60 rounded-full w-8 h-8 flex items-center justify-center shadow-lg"
          onClick={onClose}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Header */}
        <h2 className="text-3xl font-extrabold text-white text-center mb-6 drop-shadow-lg">
          Select Your Seats
        </h2>

        {/* Seat Counter */}
        <div className="flex justify-center items-center mb-8">
          <button 
            className="w-16 h-16 text-3xl font-bold text-white bg-gradient-to-r from-pink-500 to-red-600 rounded-full shadow-3xl hover:scale-110 transition-transform duration-200 hover:shadow-4xl"
            onClick={handleDecrement}
          >
            -
          </button>
          <span className="mx-8 text-5xl text-white font-extrabold drop-shadow-lg">{seatCount}</span>
          <button 
            className="w-16 h-16 text-3xl font-bold text-white bg-gradient-to-r from-green-500 to-teal-500 rounded-full shadow-3xl hover:scale-110 transition-transform duration-200 hover:shadow-4xl"
            onClick={handleIncrement}
          >
            +
          </button>
        </div>

        {/* Available Seats */}
        <p className="text-center text-xl text-white mb-6 drop-shadow-lg">
          Available Seats: <span className="font-bold">{availableSeats}</span>
        </p>

        {/* Buttons */}
        <div className="flex justify-between space-x-6">
          <button 
            className="flex-1 py-3 px-6 text-white bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg shadow-xl hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-800 transition-all duration-200 transform hover:scale-105"
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="flex-1 py-3 px-6 text-white bg-gradient-to-r from-cyan-500 to-blue-700 rounded-lg shadow-xl hover:scale-105 transition-transform duration-200"
            onClick={onProceed}
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
