import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getToken } from './authUtils';
import { UserContext } from '../context/userContext';
import CheckIn from '../components/CheckIn';
import CheckOut from '../components/CheckOut';
import GuestsDropdown from '../components/GuestsDropdown';
import SelectProperty from '../components/SelectProperty';
import { FaCheck } from 'react-icons/fa';

const BookingPage = () => {
  const { id: propertyId } = useParams(); // Get property ID from the URL
  const [property, setProperty] = useState(null);
  const [bookings, setBookings] = useState([]); // Add bookings state
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [bookingData, setBookingData] = useState({
    property: propertyId,
    startDate: null,
    endDate: null,
    guests: '1 Guest', // Assuming you have a guests state
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
      guests: bookingData.guests,
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
    <section>
      {property ? (
        <>
          {/* Banner */}
          <div className='bg-room bg-cover bg-center h-[560px] relative flex justify-center items-center'>
            <div className='absolute w-full h-full bg-black/70'></div>
            <h1 className='text-6xl text-white z-20 font-primary text-center'>
              {property.name} Details
            </h1>
          </div>

          <div className='container mx-auto'>
            <div className='flex flex-col lg:flex-row h-full py-24'>
              {/* Left Section */}
              <div className='w-full h-full lg:w-[60%] px-6'>
                <h2 className='h2'>{property.name}</h2>
                <p className='mb-8'>{property.description}</p>
                <img className='mb-8' src={property.images && property.images[0]} alt={property.name} />
                <div className='mt-12'>
                  <h3 className='h3 mb-3'>Property Facilities</h3>
                  <p className='mb-12'>
                    {property.amenities && property.amenities.length > 0
                      ? property.amenities.join(', ')
                      : 'No amenities listed'}
                  </p>
                </div>
              </div>

              {/* Right Section */}
              <div className='w-full h-full lg:w-[40%]'>
                {/* Reservation */}
                <div className='py-8 px-6 bg-accent/20 mb-12'>
                  <div className='flex flex-col space-y-4 mb-4'>
                    <h3>Your Reservation</h3>
                    <div className='h-[60px]'>
                      <CheckIn startDate={bookingData.startDate} setStartDate={(date) => setBookingData(prev => ({ ...prev, startDate: date }))} />
                    </div>
                    <div className='h-[60px]'>
                      <CheckOut endDate={bookingData.endDate} setEndDate={(date) => setBookingData(prev => ({ ...prev, endDate: date }))} />
                    </div>
                    <div className='h-[60px]'>
                      <GuestsDropdown selectedGuests={bookingData.guests} setSelectedGuests={(guests) => setBookingData(prev => ({ ...prev, guests }))} />
                    </div>
                    <div className='h-[60px]'>
                      <SelectProperty selectedProperty={property.name} disabled />
                    </div>
                  </div>
                  <button className='btn btn-lg btn-primary w-full' onClick={handleBookingSubmit}>
                    Book now for ${property.price}
                  </button>
                </div>
                {/* Rules */}
                <div>
                  <h3 className='h3'>Property Rules</h3>
                  <ul className='flex flex-col gap-y-4'>
                    <li className='flex items-center gap-x-4'>
                      <FaCheck className='text-accent' />
                      Check-in: 3:00 PM - 9:00 PM
                    </li>
                    <li className='flex items-center gap-x-4'>
                      <FaCheck className='text-accent' />
                      Check-out: 10:30 AM
                    </li>
                    <li className='flex items-center gap-x-4'>
                      <FaCheck className='text-accent' />
                      No Pets
                    </li>
                    <li className='flex items-center gap-x-4'>
                      <FaCheck className='text-accent' />
                      No Smoking
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading property details...</p>
      )}
    </section>
  );
};

export default BookingPage;
