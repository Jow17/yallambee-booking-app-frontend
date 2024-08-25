import React, { useState } from 'react';

const BookingForm = ({ onSubmit }) => {
  const [bookingData, setBookingData] = useState({
    property: '',
    startDate: '',
    endDate: '',
    status: 'Pending',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData({ ...bookingData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(bookingData);
    setBookingData({ property: '', startDate: '', endDate: '', status: 'Pending' }); // Reset form
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <select
        name="property"
        value={bookingData.property}
        onChange={handleChange}
        className="border rounded p-2"
        required
      >
        <option value="" disabled>Select Property</option>
        {/* Populate this with real property data */}
        <option value="property1">Yallambee on Bolong</option>
        {/* <option value="property2">Property 2</option> */}
      </select>
      <input
        type="date"
        name="startDate"
        value={bookingData.startDate}
        onChange={handleChange}
        className="border rounded p-2"
        required
      />
      <input
        type="date"
        name="endDate"
        value={bookingData.endDate}
        onChange={handleChange}
        className="border rounded p-2"
        required
      />
      <button
        type="submit"
        className="bg-lime-500 text-white p-2 rounded"
      >
        Submit Booking
      </button>
    </form>
  );
};

export default BookingForm;
