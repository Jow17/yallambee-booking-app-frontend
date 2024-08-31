import React, { useState, useEffect } from 'react';
import CheckIn from './CheckIn';
import CheckOut from './CheckOut';
import GuestsDropdown from './GuestsDropdown';
import SelectProperty from './SelectProperty';
import Button from '../components/Button';
import axios from 'axios';

const CheckAvailability = () => {
  const [selectedGuests, setSelectedGuests] = useState('1 Guest');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [unavailableDates, setUnavailableDates] = useState([]);

  useEffect(() => {
    if (selectedProperty) {
      fetchUnavailableDates(selectedProperty._id);
    }
  }, [selectedProperty]);

  const fetchUnavailableDates = async (propertyId) => {
    try {
      const response = await axios.get(`https://yallambee-booking-app-backend.onrender.com/booking/${propertyId}/unavailable-dates`);
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

  const handleCheckAvailability = (e) => {
    e.preventDefault();

    if (!selectedProperty) {
      alert('Please select a property.');
      return;
    }

    if (!startDate || !endDate) {
      alert('Please select both check-in and check-out dates.');
      return;
    }

    if (isDateUnavailable(startDate) || isDateUnavailable(endDate)) {
      alert('These dates are not available, please choose another date.');
    } else {
      alert(`The selected dates are available for ${selectedProperty.name}.`);
    }
  };

  return (
    <form className='h-[300px] w-full lg:h-[70px]' onSubmit={handleCheckAvailability}>
      <div className='flex flex-col w-full h-full lg:flex-row'>
        <div className='flex-1 border-r'>
          <CheckIn startDate={startDate} setStartDate={setStartDate} />
        </div>
        <div className='flex-1 border-r'>
          <CheckOut endDate={endDate} setEndDate={setEndDate} startDate={startDate} />
        </div>
        <div className='flex-1 border-r'>
          <GuestsDropdown selectedGuests={selectedGuests} setSelectedGuests={setSelectedGuests} />
        </div>
        <div className='flex-1 border-r'>
          <SelectProperty selectedProperty={selectedProperty} setSelectedProperty={setSelectedProperty} />
        </div>
        {/* btn */}
        <button
          onClick={(e) => handleCheckAvailability(e)}
          type='submit'
          className='btn btn-primary'
        >
          Check availability
        </button>
      </div>
    </form>
  );
};

export default CheckAvailability;
