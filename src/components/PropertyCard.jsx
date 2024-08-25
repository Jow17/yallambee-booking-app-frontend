// PropertyCard.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PropertyCard = () => {
  const [property, setProperty] = useState(null);
  const { id } = useParams(); // Retrieve ID from URL

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        if (id) { // Ensure ID is available before making the request
          const response = await axios.get(`https://yallambee-booking-app-backend.onrender.com/${id}`);
          setProperty(response.data);
        }
      } catch (error) {
        console.error('Error fetching property:', error);
      }
    };

    fetchProperty();
  }, [id]); // Fetch property whenever the ID changes

  return (
    <>
      <div className="bg-sage-green min-h-screen p-4">
        <div className="mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-black text-center">Property Details</h1>
          {property ? (
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              {/* Image Row */}
              <div className="flex">
                {property.images && property.images.map((image, index) => (
                  <img
                    key={index}
                    src={`/public/tiny_home_pics/${image}`}
                    alt={`${property.name} ${index + 1}`}
                    className="w-1/3 h-48 object-cover"
                  />
                ))}
              </div>
              {/* Property Details */}
              <div className="p-6">
                <h2 className="text-2xl font-semibold">{property.name}</h2>
                <p className="mt-2 text-gray-800">{property.description}</p>
                <p className="mt-2 text-gray-800">Cost: ${property.price}</p>
                <p className="mt-2 text-gray-800">
                  Availability: {property.availability ? 'Available' : 'Not Available'}
                </p>
              </div>
            </div>
          ) : (
            <p>Loading property details...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default PropertyCard;