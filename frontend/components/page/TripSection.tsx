import React from "react";
import Link from "next/link";

const packages = [
  {
    name: "Varkala",
    rating: 4.5,
    reviews: 1200,
    description:
      "Varkala is a town in the south Indian state of Kerala. It’s on the Arabian Sea and known for Varkala Beach, backed by palm-covered red cliffs.",
    originalPrice: 25000,
    discountPrice: 20000,
    duration: "3 days per head",
    discount: "5% off",
    buttonText: "See availability",
    image: "/img/satya-n-k-4U4FpfAI3Hw-unsplash.jpg",
    // image: "/img/GettyImages-483645840-5a06b125da27150037f954d1.jpg",
    specialOffer: "Book now and receive 15% off",
  },
  // ... other packages
];

const TripSection: React.FC = () => {
  return (
    <section className="w-full md:w-3/4 p-4">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Best Packages For You</h2>
    <div className="space-y-6">
      {packages.map((pkg, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row h-64"
        >
          <div className="h-full w-60 md:w-1/5 flex-shrink-0">
            <img
              className="h-full w-full object-cover"
              src={pkg.image}
              alt={pkg.name}
            />
          </div>
          <div className="p-4 flex-grow flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{pkg.name}</h3>
              <p className="text-gray-600 mt-2">{pkg.description}</p>
              <div className="flex items-center mt-4 space-x-4">
                <span className="text-green-500 mt-2">Rs. {pkg.originalPrice}</span>
              </div>
            </div>
            <button className="mt-4 px-4 py-2 w-40 bg-blue-500 text-white rounded-lg">
              <a href="/discover/id">See availability</a>
            </button>
          </div>
        </div>
      ))}
    </div>
    <button className="mt-8 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg">Load more results</button>
  </section>
  
  );
};

export default TripSection;
