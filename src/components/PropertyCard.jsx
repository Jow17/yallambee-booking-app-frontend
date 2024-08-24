import React, { useState, useEffect } from 'react';



// PropertyCard Component
const PropertyCard = () => {

  const [properties, setProperties] = useState([])

  useEffect(() => {
  // Fetch properties from API or local storage
    fetch('/properties/:66c964dfb57858349f7882a7')
      .then(response => response.json())
      .then(data => setProperties(data))
      .catch(error => console.error('Error fetching properties:', error));
  }, []);
  
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img src={property.image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-gray-600">{location}</p>
        <p className="mt-2 text-gray-800">{description}</p>
      </div>
    </div>
  );
};

export default PropertyCard;