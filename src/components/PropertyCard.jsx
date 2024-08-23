import React from 'react';

// PropertyCard Component
const PropertyCard = ({ name, location, image, description }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-gray-600">{location}</p>
        <p className="mt-2 text-gray-800">{description}</p>
      </div>
    </div>
  );
};

export default PropertyCard;