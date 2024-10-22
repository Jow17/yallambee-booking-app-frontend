import React, { useState, useEffect, useContext } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { getToken } from "./authUtils"
import { UserContext } from "../context/userContext"
import Modal from "../components/Modal"
import UpdateUserDetailsForm from "../components/UpdateUserDetailsForm"
import UpdateBookingForm from "../components/UpdateBookingForm"
import BookingCard from "../components/BookingCard"

const ProfilePage = () => {
  const [user, setUser] = useState(null)
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false)
  const [isUpdateBookingModalOpen, setIsUpdateBookingModalOpen] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState(null)

  const { _id } = useParams()
  const { setUser: setGlobalUser } = useContext(UserContext)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = getToken()
        if (!token) {
          throw new Error('No token found. Please login.')
        }

        const userResponse = await axios.get(`https://yallambee-booking-app-backend.onrender.com/users/${_id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setUser(userResponse.data)

        const bookingsResponse = await axios.get(`https://yallambee-booking-app-backend.onrender.com/users/${_id}/bookings`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        setBookings(bookingsResponse.data)

        setGlobalUser(userResponse.data)
      } catch (error) {
        console.error('Error fetching data:', error.response?.data || error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [_id, setGlobalUser])

  const handleDeleteBooking = async (bookingId) => {
    try {
      const token = getToken()
      await axios.delete(`https://yallambee-booking-app-backend.onrender.com/booking/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setBookings(prevBookings => prevBookings.filter(booking => booking._id !== bookingId))
    } catch (error) {
      console.error('Error deleting booking:', error.response?.data || error.message)
    }
  }

  const handleEditBooking = (booking) => {
    setSelectedBooking(booking)
    setIsUpdateBookingModalOpen(true)
  }

  const handleUpdateBooking = (updatedBooking) => {
    // Update bookings here
  
    setIsUpdateBookingModalOpen(false) // Close the modal
    console.log("Modal should be closed now") // Log to confirm closure
    setSelectedBooking(null)
  
  
  
    // Optionally, make the API call in the background
    (async () => {
      try {
        const token = getToken()
        const response = await axios.patch(
          `https://yallambee-booking-app-backend.onrender.com/booking/${updatedBooking._id}`,
          updatedBooking,
          {
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
          }
        )
  
        // If the API call fails, you might want to handle the error and revert the optimistic update
      } catch (error) {
        console.error('Error updating booking in ProfilePage:', error.response?.data || error.message)
        // Optionally, you can revert the optimistic update here if necessary
      }
    })()
  }

  if (loading) {
    return <div>Loading profile...</div>
  }

  return (
    <div className="bg-gray-100 pt-32 pb-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-primary font-semibold">User Profile</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
            <div className="space-y-2">
              <p><span className="font-bold">First Name:</span> {user?.firstName || 'No Name Available'}</p>
              <p><span className="font-bold">Last Name:</span> {user?.lastName || 'No Name Available'}</p>
              <p><span className="font-bold">Email:</span> {user?.email || 'No Email Available'}</p>
              <p><span className="font-bold">Phone Number:</span> {user?.phone || 'No Phone Available'}</p>
              <p><span className="font-bold">Address:</span> {user?.address || 'No Address Available'}</p>
            </div>
            <div className="mt-6">
              <button
                className="btn btn-secondary btn-sm max-w-[240px] mx-auto"
                onClick={() => setIsEditUserModalOpen(true)}
              >
                Edit User Details
              </button>
            </div>
          </div>
          
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Your Bookings</h2>
            <p className="text-gray-600 mb-4">
              If you need any assistance or to cancel a booking, please reach out to the team, we'd love to help! yallambeetinyhomes@gmail.com
            </p>
            <div className="grid grid-cols-1 gap-4">
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <BookingCard
                    type="user"
                    key={booking._id}
                    booking={booking}
                    onDelete={handleDeleteBooking}
                    onEdit={handleEditBooking}
                  />
                ))
              ) : (
                <p>No bookings available.</p>
              )}
            </div>
          </div>
        </div>

        {isEditUserModalOpen && (
          <Modal onClose={() => setIsEditUserModalOpen(false)}>
            <UpdateUserDetailsForm 
              user={user} 
              onEdit={(updatedUser) => {
                setUser(updatedUser)
                setGlobalUser(updatedUser)
                setIsEditUserModalOpen(false)
              }} 
              onClose={() => setIsEditUserModalOpen(false)} 
            />
          </Modal>
        )}

{isUpdateBookingModalOpen && selectedBooking && (
  <Modal onClose={() => setIsUpdateBookingModalOpen(false)}>
    <UpdateBookingForm
      booking={selectedBooking}
      onEdit={handleUpdateBooking}
      onClose={() => setIsUpdateBookingModalOpen(false)}
    />
  </Modal>
)}
      </div>
    </div>
  )
}

export default ProfilePage