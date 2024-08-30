import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { getToken } from './authUtils';
import { UserContext } from '../context/userContext';
import Button from "../components/Button";
import Select from "../components/Select";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const BookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [properties, setProperties] = useState([]);
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [bookingData, setBookingData] = useState({
    property: null,
    startDate: null,
    endDate: null,
    status: 'Pending'
  });

  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    console.log('Booking Data Updated:', bookingData); // Log booking data when it updates
  }, [bookingData]);

  useEffect(() => {
    if (bookingData.property) {
      console.log('Fetching unavailable dates for property:', bookingData.property); // Log the property ID for which unavailable dates are fetched
      fetchUnavailableDates(bookingData.property);
    }
  }, [bookingData.property]);

  const fetchProperties = async () => {
    try {
      const response = await axios.get('https://yallambee-booking-app-backend.onrender.com/properties');
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
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

    if (!bookingData.property) {
        alert('Please select a property.');
        return;
    }

    if (!bookingData.startDate || !bookingData.endDate) {
        alert('Please select both check-in and check-out dates.');
        return;
    }

    // Ensure dates are in the correct format
    const bookingDataToSend = {
        property: bookingData.property,
        startDate: new Date(bookingData.startDate).toISOString().split('T')[0], // Strip time if necessary
        endDate: new Date(bookingData.endDate).toISOString().split('T')[0], // Strip time if necessary
        status: bookingData.status,
    };

    console.log('Booking Data to Send:', bookingDataToSend);

    try {
        const token = getToken();
        const response = await axios.post('https://yallambee-booking-app-backend.onrender.com/booking', bookingDataToSend, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setBookings([...bookings, response.data]);
        alert('Booking added successfully!');
    } catch (error) {
        console.error('Error adding booking:', error.response?.data || error.message);
        alert('Error adding booking');
    }
};

  return (
    <div className="p-5">
      <div className="flex gap-2 overflow-x-scroll">
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
          <div>
          Yallambee Tiny Home is a peaceful off-grid accommodation for two people set alongside the Bolong River amongst the rolling hills of Golspie - 20 minutes from Crookwell & Taralga and 10 minutes from Laggan on 15 acres of sheep grazing country in the Southern Tablelands. It is the perfect place to stay put and switch off from the hustle of everyday life or your base to explore the Upper Lachlans Shire of historic villages.
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
            <div className="text-xl font-bold mb-4">Book your stay</div>

            <Select
              label="Select property and check available dates"
              id="property-select"  // Ensure id is set
              value={bookingData.property || ""}  // Control the component
              options={properties.map(property => ({
                label: property.name,
                value: property._id
              }))}
              onChange={(e) => {
                const selectedPropertyId = e.target.value;
                console.log('Selected Property ID:', selectedPropertyId); // Log the selected property ID
                setBookingData(prevData => ({
                  ...prevData,
                  property: selectedPropertyId,
                  startDate: null,
                  endDate: null
                }));
                setUnavailableDates([]); // Clear unavailable dates when a new property is selected
              }}
            />

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
                disabled={!bookingData.property}
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
                disabled={!bookingData.property}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={!bookingData.property}>Book</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
