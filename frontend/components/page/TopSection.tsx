// components/TopSection.tsx
import React from 'react';

const TopSection: React.FC = () => {
  const properties = [
    { city: 'Chennai', properties: '2246 properties', image: '/img/GettyImages-483645840-5a06b125da27150037f954d1.jpg' },
    { city: 'Thanjavur', properties: '1276 properties', image: '/img/DefaultPhoto.jpg' },
    { city: 'Varkala', properties: '418 properties', image: '/img/DefaultPhoto.jpg' },
    { city: 'Kochi', properties: '320 properties', image: '/img/DefaultPhoto.jpg' },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900">Enjoy your dream vacation</h2>
        <p className="text-gray-600 mt-2">Plan and book our perfect trip with expert advice, travel tips, destination information, and inspiration from us.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          {properties.map((property) => (
            <div key={property.city} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img className="w-full h-48 object-cover" src={property.image} alt={property.city} />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{property.city}</h3>
                <p className="text-gray-600">{property.properties}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopSection;
