import React from 'react';
import Image from 'next/image';

const TripPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="col-span-1">
          <Image
            src="/img/GettyImages-483645840-5a06b125da27150037f954d1.jpg" // Replace with your main image path
            alt="Varkala"
            width={600}
            height={400}
            className="rounded-md"
          />
        </div>
        <div className="col-span-1 grid grid-cols-2 gap-4">
          <Image
            src="/img/GettyImages-483645840-5a06b125da27150037f954d1.jpg" // Replace with your image path
            alt="Varkala Beach"
            width={300}
            height={200}
            className="rounded-md"
          />
          <Image
            src="/img/GettyImages-483645840-5a06b125da27150037f954d1.jpg" // Replace with your image path
            alt="Varkala Cliff"
            width={300}
            height={200}
            className="rounded-md"
          />
          <Image
            src="/img/GettyImages-483645840-5a06b125da27150037f954d1.jpg" // Replace with your image path
            alt="Varkala Market"
            width={300}
            height={200}
            className="rounded-md"
          />
        </div>
      </div>

      <div className="mt-8">
        <h1 className="text-4xl font-bold">Varkala</h1>
        <p className="text-gray-600">
          <span className="text-yellow-500">★ 4.5</span> (1200 Reviews)
        </p>
        <p className="text-gray-600 mt-2">
          <i className="fas fa-map-marker-alt"></i> Lorem ipsum road, Tantri nagar, 2322, Varkala, Kerala
        </p>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Overview</h2>
          <p className="text-gray-700 mt-2">
            Varkala Beach, also known as Papanasam Beach, is situated in the town of Varkala. It’s part of the Indian Ocean and known for its cliffs and serene beauty.
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold">Trip Details</h3>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            <li><strong>From:</strong> Palakkad Fort</li>
            <li><strong>To:</strong> Varkala</li>
            <li><strong>Duration:</strong> 3 Days</li>
            <li><strong>Vehicle:</strong> Bus</li>
            <li><strong>Start Date:</strong> 04-Aug-2024</li>
            <li><strong>Return Date:</strong> 06-Aug-2024</li>
            <li><strong>Time:</strong> 3:00 PM</li>
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold">Things to See & Do</h3>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            <li>Varkala Beach</li>
            <li>Kappil Lake</li>
            <li>Anjengo Fort</li>
            <li>Varkala Fort</li>
            <li>Ponnumthuruthu Island</li>
            <li>Thiruvambadi Beach</li>
          </ul>
        </div>

        <div className="mt-8">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripPage;
