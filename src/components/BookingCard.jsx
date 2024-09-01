import React, { useState, useEffect } from "react"
import Modal from "./Modal"
import UpdateBookingForm from "./UpdateBookingForm"
import { BsArrowsFullscreen, BsPeople } from 'react-icons/bs'
import axios from "axios"

const BookingCard = ({ booking, type = "admin", onDelete, onEdit }) => {
  const [isEditBookingModalOpen, setIsEditBookingModalOpen] = useState(false)
  const [property, setProperty] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const [startDate, setStartDate] = useState(booking.startDate)
  const [endDate, setEndDate] = useState(booking.endDate)

  useEffect(() => {
    if (booking.property && booking.property._id) {
      fetchPropertyDetails(booking.property._id)
    }
  }, [booking.property])

  const fetchPropertyDetails = async (propertyId) => {
    try {
      const response = await axios.get(`https://yallambee-booking-app-backend.onrender.com/properties/${propertyId}`)
      setProperty(response.data)
    } catch (error) {
      console.error('Error fetching property:', error)
      setError('Error fetching property details. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const onEditBooking = () => {
    setIsEditBookingModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsEditBookingModalOpen(false)
  }

  return (
    <div className='bg-white shadow-2xl min-h-[500px] group'>
      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p>Loading booking details...</p>
      ) : property ? (
        <>
          {/* Image Section */}
          <div className='overflow-hidden'>
            {property.images && property.images.length > 0 ? (
              <img
                className='group-hover:scale-110 transition-all duration-300 w-full'
                src={property.images[0]}
                alt={property.name || "Property Image"}
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex justify-center items-center">
                <span>No Image Available</span>
              </div>
            )}
          </div>

          {/* Property Details */}
          <div className='bg-white shadow-lg max-w-[300px] mx-auto h-[60px] -translate-y-1/2 flex justify-center items-center uppercase font-tertiary tracking-[1px] font-semibold text-base'>
            <div className='flex justify-between w-[80%]'>
              <div className='flex items-center gap-x-2'>
                <div className='text-accent'>
                  <BsArrowsFullscreen className='text-[15px]' />
                </div>
                <div className='flex gap-x-1'>
                  <div>Size</div>
                  <div>{property.size ? `${property.size}m²` : "N/A"}</div>
                </div>
              </div>
              <div className='flex items-center gap-x-2'>
                <div className='text-accent'>
                  <BsPeople className='text-[18px]' />
                </div>
                <div className='flex gap-x-1'>
                  <div>Max People</div>
                  <div>{property.maxPerson || "N/A"}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking & Property Details */}
          <div className='text-center'>
            <h3 className='h3'>{property.name || "Property Name"}</h3>
            <p className='max-w-[300px] mx-auto mb-3 lg:mb-6'>
              {property.description ? property.description.slice(0, 56) : "No description available"}...
            </p>
            <p className="text-gray-600">
              Dates: {startDate ? new Date(startDate).toLocaleDateString() : "N/A"} - {endDate ? new Date(endDate).toLocaleDateString() : "N/A"}
            </p>
            <p className="text-gray-600">Price: ${booking.totalPrice || "N/A"}</p>
            {type === "admin" && ( // Only show email for admins
            <p className="text-gray-600">Booked by: {booking.user?.email || "N/A"}</p>
           )}
          </div>

          {/* Update Button for Users and Admins, Delete Button for Admins Only */}
          <div className="flex gap-2 justify-between items-center p-4 bg-gray-100">
            <button
              onClick={onEditBooking}
              className="btn btn-secondary btn-sm max-w-[240px] mx-auto"
            >
              Update
            </button>
            {type === "admin" && (
              <button
                onClick={() => onDelete(booking._id)}
                className="btn btn-secondary btn-sm max-w-[240px] mx-auto bg-red-500 hover:bg-red-600"
              >
                Cancel
              </button>
            )}
          </div>

          {/* Edit Booking Modal */}
          {isEditBookingModalOpen && (
            <Modal onClose={handleCloseModal}>
              <UpdateBookingForm
                booking={booking}
                onEdit={(updatedBooking) => {
                  setStartDate(updatedBooking.startDate) // Update startDate state
                  setEndDate(updatedBooking.endDate)     // Update endDate state
                  onEdit(updatedBooking)
                  handleCloseModal() // Close modal after edit
                }}
                onClose={handleCloseModal} // Allow closing modal without updating
              />
            </Modal>
          )}
        </>
      ) : (
        <p>No property details available.</p>
      )}
    </div>
  )
}

export default BookingCard