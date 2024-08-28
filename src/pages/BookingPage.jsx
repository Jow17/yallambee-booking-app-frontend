import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { getToken } from './authUtils';
import { UserContext } from '../context/userContext';
import Button from "../components/Button";
import Select from "../components/Select";
import Input from "../components/Input";

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [bookingData, setBookingData] = useState({
    startDate: '',
    endDate: '',
    status: 'Pending'
  });

  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    if (selectedProperty) {
      fetchUnavailableDates(selectedProperty._id);
    }
  }, [selectedProperty]);

  const fetchProperties = async () => {
    try {
      const response = await axios.get('https://yallambee-booking-app-backend.onrender.com/properties');
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const fetchUnavailableDates = async (propertyId) => {
    try {
      const response = await axios.get(`https://yallambee-booking-app-backend.onrender.com/properties/${propertyId}/unavailable-dates`);
      setUnavailableDates(response.data);
    } catch (error) {
      console.error('Error fetching unavailable dates:', error);
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('You must be logged in to make a booking.');
      return;
    }

    try {
      const token = getToken();
      const response = await axios.post('https://yallambee-booking-app-backend.onrender.com/booking', {
        ...bookingData,
        property: selectedProperty._id,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings([...bookings, response.data]);
      alert('Booking added successfully!');
    } catch (error) {
      console.error('Error adding booking:', error);
      alert('Error adding booking');
    }
  };

  const isDateUnavailable = (date) => {
    return unavailableDates.some(unavailableDate => 
      new Date(unavailableDate).toDateString() === new Date(date).toDateString()
    );
  };

  return (
    <div className="p-5">
      <div className="flex gap-2 overflow-x-scroll">
        {/* You can dynamically load property images here based on the selected property */}
        {/* Example static images below */}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 ">
        <div>
          <div className="text-xl font-bold">Yallambee on Bolong</div>
          {/* Add logic to display selected property details */}
          <div>
          Yallambee Tiny Home is a peaceful off grid accommodation for two people set alongside the Bolong River amongst the rolling hills of Golspie - 20 minutes from Crookwell & Taralga and 10 minutes from Laggan on 15 acres of sheep grazing country in the Southern Tablelands. It is the perfect place to stay put and switch off from the hustle of everyday life or your base to explore the Upper Lachlans Shire of historic villages.
          </div>

          <div className="mt-4">
            <span className="font-bold">Price:</span> $250 AUD/Night
          </div>
          <div>
            <span className="font-bold">Location:</span> Golspie
          </div>

          <div className="font-bold">Amenities:</div>
          <ul className="list-disc list-inside">
            {["River view", "Fire pit", "Solar powered heating and cooling", "Board games and books", "BBQ", "180 degree views", "Stargazing"].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <form className="space-y-4 bg-gray-100 rounded-lg p-8" onSubmit={handleBookingSubmit}>
            <div className="text-xl font-bold mb-4">Book property</div>

            <Select
              label="Select Property"
              options={properties.map(property => ({
                label: property.name,
                value: property._id
              }))}
              onChange={(e) => {
                const property = properties.find(p => p._id === e.target.value);
                setSelectedProperty(property);
              }}
            />

            <Input
              label="Check-in"
              type="date"
              value={bookingData.startDate}
              onChange={(e) => setBookingData({ ...bookingData, startDate: e.target.value })}
              disabled={!selectedProperty}
              min={new Date().toISOString().split('T')[0]}
            />

            <Input
              label="Check-out"
              type="date"
              value={bookingData.endDate}
              onChange={(e) => setBookingData({ ...bookingData, endDate: e.target.value })}
              disabled={!selectedProperty}
              min={bookingData.startDate}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={!selectedProperty}>Book</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
