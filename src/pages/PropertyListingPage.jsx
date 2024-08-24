import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import { Link } from "react-router-dom"

// Placeholder Properties
// const properties = [
//   {
//     id: 1,
//     name: 'Tiny Home',
//     location: 'Yallambee',
//     image: 'public/tiny_home_pics/yallamby110a7347.JPEG',
//     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
//   },
//   {
//     id: 2,
//     name: 'Tiny Home',
//     location: 'Yallambee',
//     image: 'public/tiny_home_pics/4c36d0b0-94ac-438f-9e6d-4a0a4a5dda68.webp',
//     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
//   },
//   {
//     id: 3,
//     name: 'Tiny Home',
//     location: 'Yallambee',
//     image: 'public/tiny_home_pics/5d5e5a09-04e7-4e8d-9d0a-9a44940fe4c4.webp',
//     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
//   },
//   {
//     id: 4,
//     name: 'Tiny Home',
//     location: 'Yallambee',
//     image: 'public/tiny_home_pics/yallamby110a9500.JPEG',
//     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
//   },
//   {
//     id: 5,
//     name: 'Tiny Home',
//     location: 'Yallambee',
//     image: 'public/tiny_home_pics/bd07c6ba-2527-4e3f-b1cb-0c8a6e8261f4.webp',
//     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
//   },
//   {
//     id: 6,
//     name: 'Tiny Home',
//     location: 'Yallambee',
//     image: 'public/tiny_home_pics/yallamby110a9268.JPEG',
//     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
//   },
// 

const PropertyDetails = () => {
  const [property, setProperty] = useState(null);

  useEffect(() => {
    // Fetch a single property from the API
    fetch('http://localhost:4001/properties/66c964dfb57858349f7882a7')
      .then(response => response.json())
      .then(data => setProperty(data))
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