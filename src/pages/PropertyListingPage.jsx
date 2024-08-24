import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import { Link } from "react-router-dom"

const PropertyDetails = () => {
  const [property, setProperties] = useState(null);

  useEffect(() => {
    // Fetch a single property from the API
    fetch('http://localhost:4001/properties/66c98a7b8ea9b17cf0c60120')
      .then(response => response.json())
      .then(data => setProperties(data))
      .catch(error => console.error('Error fetching property:', error));
  }, []);

  return (
    <>
      <SearchBar />
      <div className="bg-sage-green min-h-screen p-2">
        <div className="mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-black">Property Details</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {property ? (
            <Link to="/PropertyCard" key={property.id}>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src="/public/tiny_home_pics/yallamby110a7347.JPEG" alt={property.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{property.name}</h2>
                <p className="text-gray-600">{property.location.city}</p>
                <p className="mt-2 text-gray-800">{property.description}</p>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src="public/tiny_home_pics/4c36d0b0-94ac-438f-9e6d-4a0a4a5dda68.webp" alt={property.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{property.name}</h2>
                <p className="text-gray-600">{property.location.city}</p>
                <p className="mt-2 text-gray-800">{property.description}</p>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src="public/tiny_home_pics/bd07c6ba-2527-4e3f-b1cb-0c8a6e8261f4.webp" alt={property.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{property.name}</h2>
                <p className="text-gray-600">{property.location.city}</p>
                <p className="mt-2 text-gray-800">{property.description}</p>
              </div>
            </div>
          </Link>
          
          ) : (
            <p>Loading properties</p>
          )}
        </div>
      </div>
      </div>
    </>
  );
};

export default PropertyDetails;