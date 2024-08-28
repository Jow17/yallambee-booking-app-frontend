import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BookingForm from '../components/BookingForm.jsx'

const BookingPage = () => {
  const [bookings, setBookings] = useState([])
  const [properties, setProperties] = useState([])

  useEffect(() => {
    fetchBookings()
    fetchProperties()
  }, [])

  const fetchBookings = async () => {
    try {
      const response = await axios.get('https://yallambee-booking-app-backend.onrender.com/booking')
      setBookings(response.data)
    } catch (error) {
      console.error('Error fetching bookings:', error)
    }
  }

  const fetchProperties = async () => {
    try {
      const response = await axios.get('https://yallambee-booking-app-backend.onrender.com/properties')
      setProperties(response.data)
    } catch (error) {
      console.error('Error fetching properties:', error)
    }
  }

  const handleAddBooking = async (bookingData) => {
    try {
      const response = await axios.post('https://yallambee-booking-app-backend.onrender.com/booking', bookingData)
      setBookings([...bookings, response.data])
      console.log('Booking added successfully!')
      window.alert('Booking added successfully!')
    } catch (error) {
      console.error('Error adding booking:', error)
      window.alert('Error adding booking')
    }
  }

  const handleDeleteBooking = async (id) => {
    try {
      await axios.delete(`https://yallambee-booking-app-backend.onrender.com/booking/${id}`)
      setBookings(bookings.filter(booking => booking._id !== id))
      console.log('Booking deleted successfully!')
      window.alert('Booking deleted successfully!')
    } catch (error) {
      console.error('Error deleting booking:', error)
      window.alert('Error deleting booking')
    }
  }

  return (
    <div className="p-5">
      {/* <h1 className="text-3xl font-bold mb-6">Booking Page</h1> */}
      
      <section>
        <h2 className="text-2xl font-semibold mb-4">Make a Booking</h2>
        <BookingForm onSubmit={handleAddBooking} />
      </section>

      <section className="mt-11">
        {/* <h2 className="text-2xl font-semibold mb-4">Bookings</h2> */}
        <ul className="list-disc pl-5">
          {bookings.map(booking => (
            <div key={booking._id} className="mb-2">
              Booking at {booking.property} from {new Date(booking.startDate).toLocaleDateString()} to {new Date(booking.endDate).toLocaleDateString()}
              <button
                onClick={() => handleDeleteBooking(booking._id)}
                className="text-red-500 ml-4"
              >
                Delete Booking
              </button>
            </div>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default BookingPage;
