import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getToken } from './authUtils';
import { UserContext } from '../context/userContext';
import CheckIn from '../components/CheckIn';
import CheckOut from '../components/CheckOut';
import GuestsDropdown from '../components/GuestsDropdown';
import { FaCheck } from 'react-icons/fa';
// Import Swiper components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import { EffectFade, Autoplay } from 'swiper/modules';

const BookingPage = () => {
  const { id: propertyId } = useParams();
  const [property, setProperty] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [bookingData, setBookingData] = useState({
    property: propertyId,
    startDate: null,
    endDate: null,
    guests: '1 Guest',
    status: 'Pending',
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

    if (isDateUnavailable(bookingData.startDate) || isDateUnavailable(bookingData.endDate)) {
      alert('The selected dates are not available. Please choose another date.');
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
          <Swiper
            modules={[EffectFade, Autoplay]}
            effect={'fade'}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            className='heroSlider h-[600px] lg:h-[560px]'
          >
            {property.images.slice(1).map((image, index) => (
              <SwiperSlide
                className='h-full relative flex justify-center items-center'
                key={index}
              >
                <div className='z-20 text-white text-center'>
                  {/* <h1 className='text-6xl text-white z-20 font-primary text-center'>
                    {property.name}
                  </h1> */}
                </div>
                <div className='absolute top-0 w-full h-full'>
                  <img className='object-cover h-full w-full' src={image} alt={`Property ${index}`} />
                </div>
                <div className='absolute w-full h-full bg-black/70'></div>
              </SwiperSlide>
            ))}
          </Swiper>

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
                      <CheckIn startDate={bookingData.startDate} setStartDate={(date) => setBookingData(prev => ({ ...prev, startDate: date }))} isDateUnavailable={isDateUnavailable} />
                    </div>
                    <div className='h-[60px]'>
                      <CheckOut endDate={bookingData.endDate} setEndDate={(date) => setBookingData(prev => ({ ...prev, endDate: date }))} isDateUnavailable={isDateUnavailable} />
                    </div>
                    <div className='h-[60px]'>
                      <GuestsDropdown selectedGuests={bookingData.guests} setSelectedGuests={(guests) => setBookingData(prev => ({ ...prev, guests }))} />
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
                      Check-in: from 3:00pm
                    </li>
                    <li className='flex items-center gap-x-4'>
                      <FaCheck className='text-accent' />
                      Check-out: 11:00 AM
                    </li>
                    <li className='flex items-center gap-x-4'>
                      <FaCheck className='text-accent' />
                      Not suitable for pets
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
