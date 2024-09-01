import React, { useEffect, useState } from "react"
import axios from "axios"
import UserCard from "../components/UserCard"
import BookingCard from "../components/BookingCard"
import PropertyCardAdmin from "../components/PropertyCardAdmin"
import Modal from "../components/Modal"
import UpdateUserDetailsForm from "../components/UpdateUserDetailsForm"
import UpdateBookingForm from "../components/UpdateBookingForm"
import UpdatePropertyForm from "../components/UpdatePropertyForm"

const AdminDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [newProperty, setNewProperty] = useState({
    name: '',
    description: '',
    price: 0,
    size: 0,
    maxPerson: 1,
    availability: [],
    images: [],
    location: { city: '', state: '' },
    ageRestriction: 18,
  });
  const [newUser, setNewUser] = useState({ username: '', password: '', firstName: '', lastName: '', email: '', phone: '', dob: '', isAdmin: false })
  const [newBooking, setNewBooking] = useState({ user: '', property: '', startDate: '', endDate: '', status: 'Pending' })
  const [error, setError] = useState(null)
  const [editUser, setEditUser] = useState(null)
  const [editBooking, setEditBooking] = useState(null)
  const [editProperty, setEditProperty] = useState(null)
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false)
  const [isEditBookingModalOpen, setIsEditBookingModalOpen] = useState(false)
  const [isEditPropertyModalOpen, setIsEditPropertyModalOpen] = useState(false)
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchProperties()
    fetchBookings()
    fetchUsers()
  }, [])

  const fetchProperties = async () => {
    try {
      const response = await axios.get('https://yallambee-booking-app-backend.onrender.com/properties', {
        headers: { Authorization: `Bearer ${token}` },
      })
      setProperties(response.data)
    } catch (error) {
      console.error('Error fetching properties:', error)
      setError('Failed to fetch properties. Please try again.')
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://yallambee-booking-app-backend.onrender.com/users', {
        headers: { Authorization: `Bearer ${token}` },
      })
      setUsers(response.data)
    } catch (error) {
      console.error('Error fetching users:', error.response ? error.response.data : error.message)
      setError('Failed to fetch users. Please try again.')
    }
  }

  const fetchBookings = async () => {
    try {
      const response = await axios.get('https://yallambee-booking-app-backend.onrender.com/booking', {
        headers: { Authorization: `Bearer ${token}` },
      })
      setBookings(response.data)
    } catch (error) {
      console.error('Error fetching bookings:', error.response ? error.response.data : error.message)
      setError('Failed to fetch bookings. Please try again.')
    }
  };

  const handleDeleteProperty = async (id) => {
    try {
      await axios.delete(`https://yallambee-booking-app-backend.onrender.com/properties/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setProperties(properties.filter((property) => property._id !== id))
      console.log('Property deleted successfully!')
      window.alert('Property deleted successfully!')
    } catch (error) {
      console.error('Error deleting property:', error.response?.data || error.message)
      window.alert('Error deleting property. Please try again.')
    }
  }

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`https://yallambee-booking-app-backend.onrender.com/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setUsers(users.filter((user) => user._id !== id))
      console.log('User deleted successfully!')
      window.alert('User deleted successfully!')
    } catch (error) {
      console.error('Error deleting user:', error.response?.data || error.message)
      window.alert('Error deleting user. Please try again.')
    }
  };

  const handleDeleteBooking = async (id) => {
    try {
      await axios.delete(`https://yallambee-booking-app-backend.onrender.com/booking/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setBookings(bookings.filter((booking) => booking._id !== id));
      console.log('Booking deleted successfully!')
      window.alert('Booking deleted successfully!')
    } catch (error) {
      console.error('Error deleting booking:', error.response?.data || error.message)
      window.alert('Error deleting booking. Please try again.')
    }
  }

  const handleAddProperty = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('https://yallambee-booking-app-backend.onrender.com/properties', newProperty, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setProperties([...properties, response.data])
      setNewProperty({
        name: '',
        description: '',
        price: 0,
        size: 0,
        maxPerson: 1,
        availability: [],
        images: [],
        location: { city: '', state: '' },
        ageRestriction: 18,
      })
      console.log('Successfully added property!')
      window.alert('Successfully added property!')
    } catch (error) {
      console.error('Error adding property', error)
      window.alert('Error adding property')
    }
  };

  const handleAddUser = async () => {
    try {
      // Log the new user data to see if everything looks correct
      console.log("User data being sent:", newUser)
  
      const response = await axios.post('https://yallambee-booking-app-backend.onrender.com/users', newUser, {
        headers: { Authorization: `Bearer ${token}` },
      })
  
      // Log the server's response
      console.log('Successfully added user:', response.data)
  
      setUsers([...users, response.data])
      setNewUser({ username: '', password: '', firstName: '', lastName: '', email: '', phone: '', dob: '', isAdmin: false })
      window.alert('Successfully added user!')
    } catch (error) {
      console.error('Error adding user:', error)
      window.alert('Error adding user')
    }
  };

  const handleAddBooking = async () => {
    try {
      const response = await axios.post('https://yallambee-booking-app-backend.onrender.com/booking', newBooking, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setBookings([...bookings, response.data])
      setNewBooking({ user: '', property: '', startDate: '', endDate: '', status: 'Pending' })
      console.log('Successfully added booking!')
      window.alert('Successfully added booking!')
    } catch (error) {
      console.error('Error adding booking', error)
      window.alert('Error adding booking')
    }
  }

  const handleEditUser = (user) => {
    setEditUser(user)
    setIsEditUserModalOpen(true)
  }

  const handleEditBooking = (booking) => {
    setEditBooking(booking)
    setIsEditBookingModalOpen(true)
  }

  const handleEditProperty = (property) => {
    setEditProperty(property)
    setIsEditPropertyModalOpen(true)
  }

  const handleUpdateUser = async (updatedUser) => {
    try {
      const response = await axios.put(`https://yallambee-booking-app-backend.onrender.com/users/${updatedUser._id}`, updatedUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.map((user) => (user._id === updatedUser._id ? response.data : user)))
      setIsEditUserModalOpen(false)
      window.alert('User updated successfully!')
    } catch (error) {
      console.error('Error updating user:', error)
      window.alert('Failed to update user. Please try again.')
    }
  };

  const handleUpdateBooking = async (updatedBooking) => {
    try {
      const response = await axios.put(
        `https://yallambee-booking-app-backend.onrender.com/booking/${updatedBooking._id}`,
        updatedBooking,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
  
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === updatedBooking._id ? response.data : booking
        )
      )
  
      // Close the modal after successful update
      setIsEditBookingModalOpen(false)
  
      // Optionally, show a success message
      window.alert('Booking updated successfully!')
    } catch (error) {
      console.error('Error updating booking:', error);
      window.alert('Failed to update booking. Please try again.')
    }
  }

  const handleUpdateProperty = async (updatedProperty) => {
    try {
      const response = await axios.put(`https://yallambee-booking-app-backend.onrender.com/properties/${updatedProperty._id}`, updatedProperty, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setProperties(properties.map((property) => (property._id === updatedProperty._id ? response.data : property)))
      setIsEditPropertyModalOpen(false)
      window.alert('Property updated successfully!')
    } catch (error) {
      console.error('Error updating property:', error)
      window.alert('Failed to update property. Please try again.');
    }
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center">Admin Dashboard</h1>

      {/* Error Message */}
      {error && <div className="bg-red-600 text-white p-2 rounded mb-4">{error}</div>}

      {/* Properties Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Manage Properties</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCardAdmin
              key={property._id}
              property={property}
              onDelete={() => handleDeleteProperty(property._id)}
              onEdit={() => handleEditProperty(property)} // Pass property to edit
            />
          ))}
        </div>

        {/* Add Property Form */}
        <form onSubmit={handleAddProperty} className="bg-white p-6 mt-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Add New Property</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col">
              <label className="font-semibold mb-2" htmlFor="propertyName">Property Name</label>
              <input
                id="propertyName"
                type="text"
                placeholder="Property Name"
                value={newProperty.name}
                onChange={(e) => setNewProperty({ ...newProperty, name: e.target.value })}
                className="p-2 border rounded-lg"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-2" htmlFor="locationCity">City</label>
              <input
                id="locationCity"
                type="text"
                placeholder="City"
                value={newProperty.location.city}
                onChange={(e) => setNewProperty({ ...newProperty, location: { ...newProperty.location, city: e.target.value } })}
                className="p-2 border rounded-lg"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-2" htmlFor="locationState">State</label>
              <input
                id="locationState"
                type="text"
                placeholder="State"
                value={newProperty.location.state}
                onChange={(e) => setNewProperty({ ...newProperty, location: { ...newProperty.location, state: e.target.value } })}
                className="p-2 border rounded-lg"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-2" htmlFor="price">Price</label>
              <input
                id="price"
                type="number"
                placeholder="Price"
                value={newProperty.price}
                onChange={(e) => setNewProperty({ ...newProperty, price: parseFloat(e.target.value) })}
                className="p-2 border rounded-lg"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-2" htmlFor="size">Size</label>
              <input
                id="size"
                type="number"
                placeholder="Size"
                value={newProperty.size}
                onChange={(e) => setNewProperty({ ...newProperty, size: parseFloat(e.target.value) })}
                className="p-2 border rounded-lg"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-2" htmlFor="maxGuests">Max Guests</label>
              <input
                id="maxGuests"
                type="number"
                placeholder="Max Guests"
                value={newProperty.maxPerson}
                onChange={(e) => setNewProperty({ ...newProperty, maxPerson: parseInt(e.target.value) })}
                className="p-2 border rounded-lg"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-2" htmlFor="ageRestriction">Age Restriction</label>
              <input
                id="ageRestriction"
                type="number"
                placeholder="Age Restriction"
                value={newProperty.ageRestriction}
                onChange={(e) => setNewProperty({ ...newProperty, ageRestriction: parseInt(e.target.value) })}
                className="p-2 border rounded-lg"
              />
            </div>
            <div className="flex flex-col col-span-2">
              <label className="font-semibold mb-2" htmlFor="description">Description</label>
              <textarea
                id="description"
                placeholder="Description"
                value={newProperty.description}
                onChange={(e) => setNewProperty({ ...newProperty, description: e.target.value })}
                className="p-2 border rounded-lg"
                required
              />
            </div>
            <div className="flex flex-col col-span-2">
              <label className="font-semibold mb-2" htmlFor="images">Images (comma-separated URLs)</label>
              <input
                id="images"
                type="text"
                placeholder="Images (comma-separated URLs)"
                value={newProperty.images.join(', ')}
                onChange={(e) => setNewProperty({ ...newProperty, images: e.target.value.split(',').map(img => img.trim()) })}
                className="p-2 border rounded-lg"
              />
            </div>
            <button type="submit" className="btn btn-primary mt-4 md:mt-0 col-span-1">
              Add Property
            </button>
          </div>
        </form>
      </section>

      {/* Users Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {users.map((user) => (
            <UserCard
              key={user._id} // Ensure each UserCard has a unique key
              user={user}
              onDelete={() => handleDeleteUser(user._id)}
              onEdit={() => handleEditUser(user)} // Pass user to edit
            />
          ))}
        </div>

        {/* Add User Form */}
        <div className="bg-white p-6 mt-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Add New User</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Username"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              className="p-2 border rounded-lg"
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="First Name"
              value={newUser.firstName}
              onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={newUser.lastName}
              onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
              className="p-2 border rounded-lg"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Phone"
              value={newUser.phone}
              onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
              className="p-2 border rounded-lg"
            />
            <input
              type="date"
              placeholder="Date of Birth"
              value={newUser.dob}
              onChange={(e) => setNewUser({ ...newUser, dob: e.target.value })}
              className="p-2 border rounded-lg"
            />
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                checked={newUser.isAdmin}
                onChange={() => setNewUser({ ...newUser, isAdmin: !newUser.isAdmin })}
                className="mr-2"
              />
              <span>Admin</span>
            </div>
            <button onClick={handleAddUser} className="btn btn-primary mt-4 md:mt-0">Add User</button>
          </div>
        </div>
      </section>

      {/* Bookings Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Manage Bookings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <BookingCard
              key={booking._id} // Ensure each BookingCard has a unique key
              booking={booking}
              type="admin"
              onDelete={() => handleDeleteBooking(booking._id)}
              onEdit={() => handleEditBooking(booking)} // Pass booking to edit
            />
          ))}
        </div>

        {/* Add Booking Form
        <form onSubmit={handleAddBooking} className="bg-white p-6 mt-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Add New Booking</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            User Dropdown
            <div className="col-span-2">
              <label className="font-semibold mb-2 block" htmlFor="user">User</label>
              <select
                id="user"
                value={newBooking.user}
                onChange={(e) => setNewBooking({ ...newBooking, user: e.target.value })}
                className="p-2 border rounded-lg w-full"
                required
              >
                <option value="" disabled>Select User</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.firstName} {user.lastName} ({user.email})
                  </option>
                ))}
              </select>
            </div>

             Property Dropdown
             <div className="col-span-2">
              <label className="font-semibold mb-2 block" htmlFor="property">Property</label>
              <select
                id="property"
                value={newBooking.property}
                onChange={(e) => setNewBooking({ ...newBooking, property: e.target.value })}
                className="p-2 border rounded-lg w-full"
                required
              >
                <option value="" disabled>Select Property</option>
                {properties.map((property) => (
                  <option key={property._id} value={property._id}>
                    {property.name} - {property.location.city}, {property.location.state}
                  </option>
                ))}
              </select>
            </div>

            Date Inputs
            <div className="flex flex-col col-span-2">
              <label className="font-semibold mb-2" htmlFor="startDate">Start Date</label>
              <input
                id="startDate"
                type="date"
                value={newBooking.startDate}
                onChange={(e) => setNewBooking({ ...newBooking, startDate: e.target.value })}
                className="p-2 border rounded-lg"
                required
              />
            </div>
            <div className="flex flex-col col-span-2">
              <label className="font-semibold mb-2" htmlFor="endDate">End Date</label>
              <input
                id="endDate"
                type="date"
                value={newBooking.endDate}
                onChange={(e) => setNewBooking({ ...newBooking, endDate: e.target.value })}
                className="p-2 border rounded-lg"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary mt-4 md:mt-0 col-span-2">
              Add Booking
            </button>
          </div>
        </form> */}
      </section>

      {/* Modals for editing users, bookings, and properties */}
      {isEditUserModalOpen && (
        <Modal onClose={() => setIsEditUserModalOpen(false)}>
          <UpdateUserDetailsForm 
            user={editUser} 
            onUpdate={handleUpdateUser} 
            onClose={() => setIsEditUserModalOpen(false)} 
          />
        </Modal>
      )}
      {isEditBookingModalOpen && (
        <Modal onClose={() => setIsEditBookingModalOpen(false)}>
          <UpdateBookingForm 
            booking={editBooking} 
            onUpdate={handleUpdateBooking} 
            onClose={() => setIsEditBookingModalOpen(false)} 
          />
        </Modal>
      )}
      {isEditPropertyModalOpen && (
        <Modal onClose={() => setIsEditPropertyModalOpen(false)}>
          <UpdatePropertyForm 
            property={editProperty} 
            onUpdate={handleUpdateProperty} 
            onClose={() => setIsEditPropertyModalOpen(false)} 
          />
        </Modal>
      )}
    </div>
  )
}

export default AdminDashboard