import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [newProperty, setNewProperty] = useState({ name: '', location: '', description: '', ageRestriction: '' });
  const [newUser, setNewUser] = useState({ username:'', password: '', firstName: '', lastName: '', email: '', phone: '', dob: '', isAdmin: '' });
  const [newBooking, setNewBooking] = useState({ user: '', property: '', startDate: '', endDate: '', status: 'Pending' });

  // Fetch properties, users, and bookings from API on component mount
  useEffect(() => {
    fetchProperties();
    fetchUsers();
    fetchBookings();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get('http://localhost:4001/properties');
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:4001/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:4001/bookings');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleAddProperty = async () => {
    try {
      const response = await axios.post('http://localhost:4001/properties', newProperty);
      setProperties([...properties, response.data]);
      setNewProperty({ name: '', location: '', description: '', ageRestriction: '' }); // Reset form
      console.log('Successfully added property!');
      window.alert('Successfully added property!');
    } catch (error) {
      console.error('Error adding property', error);
      window.alert('Error adding property');
    }
  };

  const handleDeleteProperty = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/properties/${id}`);
      setProperties(properties.filter(property => property._id !== id));
      console.log('Property deleted successfully!');
      window.alert('Property deleted successfully!');
    } catch (error) {
      console.log('Error deleting property. Please try again.', error);
      window.alert('Error deleting property. Please try again.');
    }
  };

  const handleAddUser = async () => {
    try {
      const response = await axios.post('http://localhost:4001/users', newUser);
      setUsers([...users, response.data]);
      setNewUser({ username:'', password: '', firstName: '', lastName: '', email: '', phone: '', dob: '', isAdmin: '' }); // Reset form
      console.log('Successfully added user!');
      window.alert('Successfully added user!');
    } catch (error) {
      console.error('Error adding user:', error);
      window.alert('Error adding user');
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:4001/users/${id}`);
      setUsers(users.filter(user => user._id !== id));
      console.log('Successfully deleted user!');
      window.alert('User deleted successfully!');
    } catch (error) {
      console.log('Error deleting user. Please try again.', error);
      window.alert('Error deleting user. Please try again.');
    }
  };

  const handleAddBooking = async () => {
    try {
      const response = await axios.post('https://yallambee-booking-app-backend.onrender.com/booking', newBooking);
      setBookings([...bookings, response.data]);
      setNewBooking({ user: '', property: '', startDate: '', endDate: '', status: 'Pending' }); // Reset form
      console.log('Successfully added booking!');
      window.alert('Successfully added booking!');
    } catch (error) {
      console.error('Error adding booking', error);
      window.alert('Error adding booking');
    }
  };

  const handleDeleteBooking = async (id) => {
    try {
      await axios.delete(`https://yallambee-booking-app-backend.onrender.com/booking/${id}`);
      setBookings(bookings.filter(booking => booking._id !== id));
      console.log('Successfully deleted booking!');
      window.alert('Booking deleted successfully!');
    } catch (error) {
      console.log('Error deleting booking. Please try again.', error);
      window.alert('Error deleting booking. Please try again.');
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Properties Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Properties</h2>
        <div className="flex flex-col md:flex-row items-center mb-4 space-y-2 md:space-y-0 md:space-x-2">
          <input 
            type="text" 
            placeholder="Property Name" 
            value={newProperty.name} 
            onChange={(e) => setNewProperty({ ...newProperty, name: e.target.value })} 
            className="border rounded p-2 flex-grow"
          />
          <input 
            type="text" 
            placeholder="Location" 
            value={newProperty.location} 
            onChange={(e) => setNewProperty({ ...newProperty, location: e.target.value })} 
            className="border rounded p-2 flex-grow"
          />
          <input 
            type="text" 
            placeholder="Description" 
            value={newProperty.description} 
            onChange={(e) => setNewProperty({ ...newProperty, description: e.target.value })} 
            className="border rounded p-2 flex-grow"
          />
          <input 
            type="text" 
            placeholder="Age Restriction" 
            value={newProperty.ageRestriction} 
            onChange={(e) => setNewProperty({ ...newProperty, ageRestriction: e.target.value })} 
            className="border rounded p-2 flex-grow"
          />
          <button 
            onClick={handleAddProperty} 
            className="bg-lime-500 text-white p-2 rounded"
          >
            Add Property
          </button>
        </div>
        <ul className="list-disc pl-5">
          {properties.map(property => (
            <div key={property._id} className="mb-2">
              {property.name} - {property.location.city}
              <button 
                onClick={() => handleDeleteProperty(property._id)} 
                className="text-red-500 ml-4"
              >
                Delete Property
              </button>
            </div>
          ))}
        </ul>
      </section>
      
      {/* Users Section */}
      <section className="mt-11">
        <h2 className="text-2xl font-semibold mb-4">Users</h2>
        <div className="max-w-full overflow-x-auto">
          <div className="flex flex-col md:flex-row items-center mb-4 space-y-2 md:space-y-0 md:space-x-2">
            <input 
              type="text" 
              placeholder="Username" 
              value={newUser.username} 
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} 
              className="border rounded p-2 flex-grow min-w-[150px]"
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={newUser.password} 
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} 
              className="border rounded p-2 flex-grow min-w-[150px]"
            />
            <input 
              type="text" 
              placeholder="First Name" 
              value={newUser.firstName} 
              onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })} 
              className="border rounded p-2 flex-grow min-w-[150px]"
            />
            <input 
              type="text" 
              placeholder="Last Name" 
              value={newUser.lastName} 
              onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })} 
              className="border rounded p-2 flex-grow min-w-[150px]"
            />
            <input 
              type="email" 
              placeholder="Email" 
              value={newUser.email} 
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} 
              className="border rounded p-2 flex-grow min-w-[150px]"
            />
            <input 
              type="text" 
              placeholder="Phone Number" 
              value={newUser.phone} 
              onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })} 
              className="border rounded p-2 flex-grow min-w-[150px]"
            />
            <input 
              type="date" 
              placeholder="Date of Birth" 
              value={newUser.dob} 
              onChange={(e) => setNewUser({ ...newUser, dob: e.target.value })} 
              className="border rounded p-2 flex-grow min-w-[150px]"      
            />
            <input 
              type="text" 
              placeholder="Is Admin" 
              value={newUser.isAdmin} 
              onChange={(e) => setNewUser({ ...newUser, isAdmin: e.target.value })} 
              className="border rounded p-2 flex-grow min-w-[150px]"      
            />
            <button 
              onClick={handleAddUser} 
              className="bg-lime-500 text-white p-2 rounded md:ml-4"
            >
              Add User
            </button>
          </div>
        </div>
        <ul className="list-disc pl-5">
          {users.map(user => (
            <div key={user._id} className="mb-2">
              {user.firstName} {user.lastName} - {user.email} 
              <button 
                onClick={() => handleDeleteUser(user._id)} 
                className="text-red-500 ml-4"
              >
                Delete User
              </button>
            </div>
          ))}
        </ul>
      </section>

      {/* Bookings Section */}
      <section className="mt-11">
        <h2 className="text-2xl font-semibold mb-4">Bookings</h2>
        <div className="flex flex-col md:flex-row items-center mb-4 space-y-2 md:space-y-0 md:space-x-2">
          <select 
            value={newBooking.user} 
            onChange={(e) => setNewBooking({ ...newBooking, user: e.target.value })} 
            className="border rounded p-2 flex-grow min-w-[150px]"
          >
            <option value="">Select User</option>
            {users.map(user => (
              <option key={user._id} value={user._id}>
                {user.firstName} {user.lastName}
              </option>
            ))}
          </select>
          <select 
            value={newBooking.property} 
            onChange={(e) => setNewBooking({ ...newBooking, property: e.target.value })} 
            className="border rounded p-2 flex-grow min-w-[150px]"
          >
            <option value="">Select Property</option>
            {properties.map(property => (
              <option key={property._id} value={property._id}>
                {property.name}
              </option>
            ))}
          </select>
          <input 
            type="date" 
            value={newBooking.startDate} 
            onChange={(e) => setNewBooking({ ...newBooking, startDate: e.target.value })} 
            className="border rounded p-2 flex-grow min-w-[150px]"
          />
          <input 
            type="date" 
            value={newBooking.endDate} 
            onChange={(e) => setNewBooking({ ...newBooking, endDate: e.target.value })} 
            className="border rounded p-2 flex-grow min-w-[150px]"
          />
          <select 
            value={newBooking.status} 
            onChange={(e) => setNewBooking({ ...newBooking, status: e.target.value })} 
            className="border rounded p-2 flex-grow min-w-[150px]"
          >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <button 
            onClick={handleAddBooking} 
            className="bg-lime-500 text-white p-2 rounded"
          >
            Add Booking
          </button>
        </div>
        <ul className="list-disc pl-5">
          {bookings.map(booking => (
            <div key={booking._id} className="mb-2">
              {booking.startDate} to {booking.endDate} - {booking.status}
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
  );
};

export default AdminDashboard;
