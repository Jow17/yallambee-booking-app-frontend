import React, { useState, useEffect } from 'react';



// PropertyCard Component
const PropertyCard = () => {

  const [property, setProperty] = useState([])

  useEffect(() => {
  // Fetch properties from API or local storage
    fetch('http://localhost:4001/properties/66c98a7b8ea9b17cf0c60120')
      .then(response => response.json())
      .then(data => setProperty(data))
      .catch(error => console.error('Error fetching properties:', error));
  }, []);

  return (
    <>
      <div className="bg-sage-green min-h-screen p-2">
        <div className="mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-black">Property Details</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {property ? (
              <div className="bg-white shadow-lg rounded-lg overflow-hidden" key={property.id}>
                <img 
                  src={`/tiny_home_pics/${property.image}`} 
                  alt={property.name} 
                  className="w-full h-48 object-cover" 
                />
                <img 
                  src={`/tiny_home_pics/${property.image}`} 
                  alt={property.name} 
                  className="w-full h-48 object-cover" 
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{property.name}</h2>
                  <p className="mt-2 text-gray-800">{property.description}</p>
                  <p className="mt-2 text-gray-800">Cost: ${property.price}</p>
                  <p className="mt-2 text-gray-800">
                    Availability: {property.availability ? 'Available' : 'Not Available'}
                  </p>
                </div>
              </div>
            ) : (
              <p>Loading property...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default PropertyCard;