import React, { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../pages/authUtils";

const UpdateBookingForm = ({ booking, onEdit, onClose }) => {
  const [startDate, setStartDate] = useState(booking.startDate);
  const [endDate, setEndDate] = useState(booking.endDate);
  const [guests, setGuests] = useState(booking.guests);

  useEffect(() => {
    // Initialize the form with booking data
    setStartDate(booking.startDate);
    setEndDate(booking.endDate);
    setGuests(booking.guests);
  }, [booking]);

  const handleUpdateBooking = async (e) => {
    e.preventDefault();
  
    const updatedBookingData = {
      startDate: new Date(startDate).toISOString().split('T')[0], // "YYYY-MM-DD"
      endDate: new Date(endDate).toISOString().split('T')[0],     // "YYYY-MM-DD"
      guests,
    };
  
    console.log("Updated booking data being sent to server:", JSON.stringify(updatedBookingData, null, 2));
  
    try {
      const token = getToken();
      const response = await axios.patch(
        `https://yallambee-booking-app-backend.onrender.com/booking/${booking._id}`,
        updatedBookingData,
        {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        }
      );
  
      console.log('Booking updated successfully:', response.data);
  
      onEdit(response.data); // Update the booking in the parent component
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error updating booking:", error.response?.data || error.message);
    }
  };  

  return (
    <form className="space-y-4 bg-white shadow-2xl rounded-lg p-8 max-w-[400px] mx-auto" onSubmit={handleUpdateBooking}>
      <div className="text-xl font-bold mb-4 text-center">Change your booking</div>
      <div className="space-y-4">
        <div className="flex flex-col">
          <label className="font-semibold mb-2" htmlFor="startDate">Check-in</label>
          <input
            id="startDate"
            type="date"
            value={startDate.slice(0, 10)}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 border rounded-lg"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold mb-2" htmlFor="endDate">Check-out</label>
          <input
            id="endDate"
            type="date"
            value={endDate.slice(0, 10)}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-2 border rounded-lg"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold mb-2" htmlFor="guests">Guests</label>
          <input
            id="guests"
            type="number"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            min="1"
            className="p-2 border rounded-lg"
            required
          />
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <button
          type="submit"
          className="btn btn-secondary btn-sm max-w-[240px] mx-auto"
        >
          Update
        </button>
        <button
          type="button"
          className="btn btn-secondary btn-sm max-w-[240px] mx-auto"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UpdateBookingForm;
