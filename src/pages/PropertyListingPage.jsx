import React, { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import { Link } from 'react-router-dom'
import axios from 'axios'

const PropertyListing = () => {
  const [properties, setProperties] = useState([])

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('https://yallambee-booking-app-backend.onrender.com/properties')
        setProperties(response.data)
      } catch (error) {
        console.error('Error fetching properties:', error)
      }
    }

    fetchProperties()
  }, [])

  return (
    <>
      <SearchBar />
      <div className="bg-sage-green min-h-screen p-4">
        <div className="mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-black text-center">Property Listings</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.length > 0 ? (
              properties.map(property => (
                <Link
                  to= "/booking" // Ensure this path includes the property ID
                  key={property._id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden"
                >
                  <img
                    src='/tiny_home_pics/5d5e5a09-04e7-4e8d-9d0a-9a44940fe4c4.webp' // Make sure image path is correct
                    alt={property.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold">{property.name}</h2>
                    <p className="text-gray-600">{property.location.city}</p>
                    <p className="mt-2 text-gray-800">{property.description}</p>
                  </div>
                </Link>
              ))
            ) : (
              <p>Loading properties...</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default PropertyListing