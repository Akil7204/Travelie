// components/ServiceSection.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAsia } from '@fortawesome/free-solid-svg-icons'; // Import the specific icon

const ServiceSection: React.FC = () => {
  return (
    <section className="w-full py-16 text-center ">
      <h2 className="text-3xl font-bold mb-8">Our Service</h2>
      <div className="bg-gray-100 p-8 h-[300px] rounded-lg mx-4 flex flex-col items-center justify-center">
        <FontAwesomeIcon icon={faEarthAsia} size="3x" className="text-blue-500 mb-4" />
        <div className="text-2xl font-bold">Ticket Booking</div>
        <p className="mt-2">
          We book all kinds of national tickets for your destination.
        </p>
      </div>
    </section>
  );
};

export default ServiceSection;
