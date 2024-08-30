import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css' // Import CSS for DatePicker

const PropertyCard = () => {
  const [property, setProperty] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const { id } = useParams() // Retrieve ID from URL

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        if (id) { // Ensure ID is available before making the request
          const response = await axios.get(`https://yallambee-booking-app-backend.onrender.com/properties/${id}`)
          setProperty(response.data)
        }
      } catch (error) {
        console.error('Error fetching property:', error)
      }
    }

    fetchProperty()
  }, [id]) // Fetch property whenever the ID changes

  const handleBooking = async () => {
    // Retrieve the user ID from local storage
    const userId = localStorage.getItem('userId')

    // Prepare booking data
    const bookingData = {
      propertyId: id,
      userId,
      startDate,
      endDate
    }

    try {
      // Send booking data to the server
      await axios.post('https://yallambee-booking-app-backend.onrender.com/bookings', bookingData)

      // Redirect the user to their profile page
      navigate(`/profile/${userId}`)
    } catch (error) {
      console.error('Error booking property:', error)
    }
  }

  return (
    <>
      <div className="bg-sage-green min-h-screen p-4 ">
        <div className="mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-black text-center ">Property Details</h1>
          {property ? (
            <div className="bg-white shadow-lg rounded-lg overflow-hidden ">
              {/* Hard-coded Image Row */}
              <div className="flex overflow-x-auto pb-4">
                <img
                  src="/tiny_home_pics/5d5e5a09-04e7-4e8d-9d0a-9a44940fe4c4.webp"
                  alt="Property Image 1"
                  className="w-1/3 h-48 object-cover mr-2"
                />
                <img
                  src="/tiny_home_pics/090d437b-fc02-4c47-8d0f-27a57186c00a.webp"
                  alt="Property Image 2"
                  className="w-1/3 h-48 object-cover mr-2"
                />
                <img
                  src="/tiny_home_pics/86b12c08-40b3-439b-bba0-cabb453fc1bd.webp"
                  alt="Property Image 3"
                  className="w-1/3 h-48 object-cover mr-2"
                />
                <img
                  src="/tiny_home_pics/0701fa15-cf25-41fc-8dc4-1bb642e9cc20.webp"
                  alt="Property Image 3"
                  className="w-1/3 h-48 object-cover mr-2"
                />
              </div>

              {/* Property Details */}
              <div className="p-6 align-text: center">
                <h2 className="text-2xl font-semibold">{property.name}</h2>
                <p className="mt-2 text-gray-800">{property.description}</p>
                <p className="mt-2 text-gray-800">Cost: ${property.price}</p>
                <p className="mt-2 text-gray-800">
                  Availability: {property.availability ? 'Available' : 'Not Available'}
                </p>

                {/* Booking Section */}
                <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/3  ">
                  <h3 className="text-xl font-semibold mb-4 ">Select Booking Dates</h3>
                  <div className="flex flex-col gap-4 ">
                    <label className="text-gray-700 block mb-2">Check-in Date</label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      className="border p-2 rounded"
                      placeholderText="Select check-in date"
                      dateFormat="MM/dd/yyyy"
                    />
                    <label className="text-gray-700 block mb-2">Check-out Date</label>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      className="border p-2 rounded"
                      placeholderText="Select check-out date"
                      dateFormat="MM/dd/yyyy"
                    />
                  </div>
                  <button
                    onClick={handleBooking}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p>Loading property details...</p>
          )}
        </div>
      </div>
    </>
  )
}

export default PropertyCard