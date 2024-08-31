import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserCard from '../components/UserCard';
import BookingCard from '../components/BookingCard';
import PropertyCard from '../components/PropertyCard';

const AdminDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [newProperty, setNewProperty] = useState({ name: '', location: '', description: '', ageRestriction: '' });
  const [newUser, setNewUser] = useState({ username: '', password: '', firstName: '', lastName: '', email: '', phone: '', dob: '', isAdmin: false });
  const [newBooking, setNewBooking] = useState({ user: '', property: '', startDate: '', endDate: '', status: 'Pending' });
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchProperties();
    fetchBookings();
    fetchUsers();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get('https://yallambee-booking-app-backend.onrender.com/properties', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
      setError('Failed to fetch properties. Please try again.');
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://yallambee-booking-app-backend.onrender.com/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error.response ? error.response.data : error.message);
      setError('Failed to fetch users. Please try again.');
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await axios.get('https://yallambee-booking-app-backend.onrender.com/booking', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error.response ? error.response.data : error.message);
      setError('Failed to fetch bookings. Please try again.');
    }
  };

  const handleDeleteProperty = async (id) => {
    try {
      await axios.delete(`https://yallambee-booking-app-backend.onrender.com/properties/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProperties(properties.filter((property) => property._id !== id));
      console.log('Property deleted successfully!');
      window.alert('Property deleted successfully!');
    } catch (error) {
      console.error('Error deleting property:', error.response?.data || error.message);
      window.alert('Error deleting property. Please try again.');
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`https://yallambee-booking-app-backend.onrender.com/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((user) => user._id !== id));
      console.log('User deleted successfully!');
      window.alert('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error.response?.data || error.message);
      window.alert('Error deleting user. Please try again.');
    }
  };

  const handleDeleteBooking = async (id) => {
    try {
      await axios.delete(`https://yallambee-booking-app-backend.onrender.com/booking/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(bookings.filter((booking) => booking._id !== id));
      console.log('Booking deleted successfully!');
      window.alert('Booking deleted successfully!');
    } catch (error) {
      console.error('Error deleting booking:', error.response?.data || error.message);
      window.alert('Error deleting booking. Please try again.');
    }
  };

  const handleAddProperty = async () => {
    try {
      const response = await axios.post('https://yallambee-booking-app-backend.onrender.com/properties', newProperty, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProperties([...properties, response.data]);
      setNewProperty({ name: '', location: '', description: '', ageRestriction: '' });
      console.log('Successfully added property!');
      window.alert('Successfully added property!');
    } catch (error) {
      console.error('Error adding property', error);
      window.alert('Error adding property');
    }
  };

  const handleAddUser = async () => {
    try {
      const response = await axios.post('https://yallambee-booking-app-backend.onrender.com/users', newUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers([...users, response.data]);
      setNewUser({ username: '', password: '', firstName: '', lastName: '', email: '', phone: '', dob: '', isAdmin: false });
      console.log('Successfully added user!');
      window.alert('Successfully added user!');
    } catch (error) {
      console.error('Error adding user:', error);
      window.alert('Error adding user');
    }
  };

  const handleAddBooking = async () => {
    try {
      const response = await axios.post('https://yallambee-booking-app-backend.onrender.com/booking', newBooking, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings([...bookings, response.data]);
      setNewBooking({ user: '', property: '', startDate: '', endDate: '', status: 'Pending' });
      console.log('Successfully added booking!');
      window.alert('Successfully added booking!');
    } catch (error) {
      console.error('Error adding booking', error);
      window.alert('Error adding booking');
    }
  };

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
            <PropertyCard
              key={property._id}
              property={property}
              onDelete={() => handleDeleteProperty(property._id)}
            />
          ))}
        </div>

        {/* Add Property Form */}
        <div className="bg-white p-6 mt-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Add New Property</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Property Name"
              value={newProperty.name}
              onChange={(e) => setNewProperty({ ...newProperty, name: e.target.value })}
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Location"
              value={newProperty.location}
              onChange={(e) => setNewProperty({ ...newProperty, location: e.target.value })}
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Description"
              value={newProperty.description}
              onChange={(e) => setNewProperty({ ...newProperty, description: e.target.value })}
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Age Restriction"
              value={newProperty.ageRestriction}
              onChange={(e) => setNewProperty({ ...newProperty, ageRestriction: e.target.value })}
              className="p-2 border rounded-lg"
            />
            <button onClick={handleAddProperty} className="btn btn-primary mt-4 md:mt-0">Add Property</button>
          </div>
        </div>
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
              onDelete={() => handleDeleteBooking(booking._id)}
            />
          ))}
        </div>

        {/* Add Booking Form */}
        <div className="bg-white p-6 mt-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Add New Booking</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="User ID"
              value={newBooking.user}
              onChange={(e) => setNewBooking({ ...newBooking, user: e.target.value })}
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Property ID"
              value={newBooking.property}
              onChange={(e) => setNewBooking({ ...newBooking, property: e.target.value })}
              className="p-2 border rounded-lg"
            />
            <input
              type="date"
              placeholder="Start Date"
              value={newBooking.startDate}
              onChange={(e) => setNewBooking({ ...newBooking, startDate: e.target.value })}
              className="p-2 border rounded-lg"
            />
            <input
              type="date"
              placeholder="End Date"
              value={newBooking.endDate}
              onChange={(e) => setNewBooking({ ...newBooking, endDate: e.target.value })}
              className="p-2 border rounded-lg"
            />
            <button onClick={handleAddBooking} className="btn btn-primary mt-4 md:mt-0">Add Booking</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
