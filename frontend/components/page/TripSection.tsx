// components/PackagesSection.tsx
import React from 'react';

const packages = [
  {
    name: 'Varkala',
    rating: 4.5,
    reviews: 1200,
    description: 'Varkala is a town in the south Indian state of Kerala. It’s on the Arabian Sea and known for Varkala Beach, backed by palm-covered red cliffs.',
    originalPrice: 25000,
    discountPrice: 20000,
    duration: '3 days per head',
    discount: '5% off',
    buttonText: 'See availability',
    image: '/img/GettyImages-483645840-5a06b125da27150037f954d1.jpg',
    specialOffer: 'Book now and receive 15% off',
  },
  {
    name: 'Kodaikanal',
    rating: 4.5,
    reviews: 1200,
    description: 'Kodaikanal is a hill town in the southern Indian state of Tamil Nadu. It’s set in an area of granite cliffs, forested valleys, lakes, waterfalls, and grassy hills, at 2,000 meters above sea level.',
    originalPrice: null,
    discountPrice: 10000,
    duration: '2 days per head',
    buttonText: 'See availability',
    image: '/img/satya-n-k-4U4FpfAI3Hw-unsplash.jpg',
  },
  {
    name: 'Ooty',
    rating: 4.5,
    reviews: 1200,
    description: 'Ooty (short for Udagamandalam) is a resort town in the Western Ghats mountains, in southern India’s Tamil Nadu state.',
    originalPrice: null,
    discountPrice: 3000,
    duration: '1 day per head',
    buttonText: 'See availability',
    image: '/img/GettyImages-483645840-5a06b125da27150037f954d1.jpg',
  },
  {
    name: 'SnehaTheeram Beach',
    rating: 4.5,
    reviews: 1200,
    description: 'Snehatheeram Beach or Love Shore is a beach in Thrissur District in Kerala State of India. It lies on the coast of Arabian Sea and attracts domestic tourists in every season.',
    originalPrice: null,
    discountPrice: 5000,
    duration: '2 days per head',
    buttonText: 'See availability',
    image: '/img/GettyImages-483645840-5a06b125da27150037f954d1.jpg',
  },
];

const TripSection: React.FC = () => {
  return (
    <section className="w-full md:w-3/4 p-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Best Packages For You</h2>
      <div className="space-y-6">
        {packages.map((pkg, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row">
            <img className="w-full  md:w-60 h-auto object-cover" src={pkg.image} alt={pkg.name} />
            <div className="p-4 flex-grow">
              <h3 className="text-lg font-semibold text-gray-800">{pkg.name}</h3>
              <p className="text-gray-600 mt-2">{pkg.description}</p>
              <div className="flex items-center mt-4">
                <span className="text-yellow-500 mr-2">⭐ {pkg.rating}</span>
                <span className="text-gray-600">({pkg.reviews} Reviews)</span>
              </div>
              <div className="flex items-center mt-4 space-x-4">
                {pkg.originalPrice && (
                  <span className="text-red-500 line-through">₹{pkg.originalPrice}</span>
                )}
                <span className="text-green-500 font-bold">₹{pkg.discountPrice}</span>
                <span className="text-gray-600">{pkg.duration}</span>
              </div>
              {pkg.discount && (
                <span className="text-green-500 mt-2">{pkg.discount}</span>
              )}
              {pkg.specialOffer && (
                <span className="text-red-500 mt-2 block">{pkg.specialOffer}</span>
              )}
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
                {pkg.buttonText}
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
