import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // To get the property ID from the URL
import { getToken } from './authUtils';
import { UserContext } from '../context/userContext';
import Button from "../components/Button";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const BookingPage = () => {
  const { id: propertyId } = useParams(); // Get property ID from the URL
  const [property, setProperty] = useState(null);
  const [bookings, setBookings] = useState([]); // Add bookings state
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [bookingData, setBookingData] = useState({
    property: propertyId,
    startDate: null,
    endDate: null,
    status: 'Pending'
  });

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (propertyId) {
      fetchProperty(propertyId);
      fetchUnavailableDates(propertyId);
    }
  }, [propertyId]);

  useEffect(() => {
    console.log('Booking Data Updated:', bookingData); // Log booking data when it updates
  }, [bookingData]);

  const fetchProperty = async (_id) => {
    try {
      const response = await axios.get(`https://yallambee-booking-app-backend.onrender.com/properties/${_id}`);
      setProperty(response.data);
    } catch (error) {
      console.error('Error fetching property:', error);
    }
  };

  const fetchUnavailableDates = async (_id) => {
    try {
      const response = await axios.get(`https://yallambee-booking-app-backend.onrender.com/booking/${_id}/unavailable-dates`);
      setUnavailableDates(response.data);
    } catch (error) {
      console.error('Error fetching unavailable dates:', error);
    }
  };

  const isDateUnavailable = (date) => {
    return unavailableDates.some(unavailableDate => 
      new Date(unavailableDate).toDateString() === date.toDateString()
    );
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('You must be logged in to make a booking.');
      return;
    }

    if (!bookingData.startDate || !bookingData.endDate) {
      alert('Please select both check-in and check-out dates.');
      return;
    }

    // Ensure dates are in the correct format
    const bookingDataToSend = {
      property: propertyId,
      startDate: new Date(bookingData.startDate).toISOString().split('T')[0], // Strip time if necessary
      endDate: new Date(bookingData.endDate).toISOString().split('T')[0], // Strip time if necessary
      status: bookingData.status,
    };

    console.log('Booking Data to Send:', bookingDataToSend);

    try {
      const token = getToken();
      // Post the booking to the backend using the property ID in the URL
      const response = await axios.post(`https://yallambee-booking-app-backend.onrender.com/booking/${propertyId}`, bookingDataToSend, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings([...bookings, response.data]); // Update the bookings state with the new booking
      alert('Booking added successfully!');
    } catch (error) {
      console.error('Error adding booking:', error.response?.data || error.message);
      alert('Error adding booking');
    }
  };

  return (
    <div className="p-5">
      {property ? (
        <>
          <div className="flex gap-2 overflow-x-scroll">
            {property.images && property.images.length > 0 ? (
              property.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Property Image ${index + 1}`}
                  className="w-1/3 h-48 object-cover mr-2"
                />
              ))
            ) : (
              <div>No images available</div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <div className="text-xl font-bold">{property.name}</div>
              <div>{property.description}</div>

              <div className="mt-4">
                <span className="font-bold">Price:</span> ${property.price} AUD/Night
              </div>
              <div>
                <span className="font-bold">Location:</span> {property.location.city}, {property.location.state}
              </div>

              <div className="font-bold">Amenities:</div>
              <ul className="list-disc list-inside">
                {property.amenities && property.amenities.length > 0 ? (
                  property.amenities.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))
                ) : (
                  <li>No amenities listed</li>
                )}
              </ul>
            </div>
            <div>
              <form className="space-y-4 bg-gray-100 rounded-lg p-8" onSubmit={handleBookingSubmit}>
                <div className="text-xl font-bold mb-4">Book your stay</div>

                <div className="flex flex-col">
                  <label className="text-gray-700 text-sm font-bold mb-2">
                    Check-in
                  </label>
                  <DatePicker
                    selected={bookingData.startDate}
                    onChange={(date) => setBookingData(prevData => ({
                      ...prevData,
                      startDate: date
                    }))}
                    minDate={new Date()}
                    filterDate={(date) => !isDateUnavailable(date)}
                    className="border rounded w-full py-1 px-2 font-normal"
                    placeholderText="Select a check-in date"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-gray-700 text-sm font-bold mb-2">
                    Check-out
                  </label>
                  <DatePicker
                    selected={bookingData.endDate}
                    onChange={(date) => setBookingData(prevData => ({
                      ...prevData,
                      endDate: date
                    }))}
                    minDate={bookingData.startDate || new Date()}
                    filterDate={(date) => !isDateUnavailable(date)}
                    className="border rounded w-full py-1 px-2 font-normal"
                    placeholderText="Select a check-out date"
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={!bookingData.startDate || !bookingData.endDate}>
                    Book
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <p>Loading property details...</p>
      )}
    </div>
  );
};

export default BookingPage;
