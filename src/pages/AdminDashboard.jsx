import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [newProperty, setNewProperty] = useState({ name: '', location: '', description: '', ageRestriction: '' });
  const [newUser, setNewUser] = useState({ username: '', password: '', firstName: '', lastName: '', email: '', phone: '', dob: '', isAdmin: '' });
  const [newBooking, setNewBooking] = useState({ user: '', property: '', startDate: '', endDate: '', status: 'Pending' });
  const [error, setError] = useState(null); // To handle general errors
  const [selectedUserId, setSelectedUserId] = useState('');
  const [userToUpdate, setUserToUpdate] = useState(null);
  const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

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
      const token = localStorage.getItem('token');
      console.log('Stored Token:', token);

      const response = await axios.get('https://yallambee-booking-app-backend.onrender.com/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('API Response:', response.data);

      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else {
        setUsers([response.data]);
      }
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
      console.log('API Response:', response.data);

      if (Array.isArray(response.data)) {
        setBookings(response.data);
      } else {
        setBookings([response.data]);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error.response ? error.response.data : error.message);
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

  const handleDeleteProperty = async (id) => {
    try {
      await axios.delete(`https://yallambee-booking-app-backend.onrender.com/properties/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProperties(properties.filter((property) => property._id !== id));
      console.log('Property deleted successfully!');
      window.alert('Property deleted successfully!');
    } catch (error) {
      console.log('Error deleting property. Please try again.', error);
      window.alert('Error deleting property. Please try again.');
    }
  };

  const handleAddUser = async () => {
    try {
      const response = await axios.post('https://yallambee-booking-app-backend.onrender.com/users', newUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers([...users, response.data]);
      setNewUser({ username: '', password: '', firstName: '', lastName: '', email: '', phone: '', dob: '', isAdmin: '' });
      console.log('Successfully added user!');
      window.alert('Successfully added user!');
    } catch (error) {
      console.error('Error adding user:', error);
      window.alert('Error adding user');
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`https://yallambee-booking-app-backend.onrender.com/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(users.filter((user) => user._id !== id));
      console.log('Successfully deleted user!');
      window.alert('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error.response?.data || error.message);
      window.alert('Error deleting user. Please try again.');
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

  const handleDeleteBooking = async (id) => {
    try {
      await axios.delete(`https://yallambee-booking-app-backend.onrender.com/booking/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(bookings.filter((booking) => booking._id !== id));
      console.log('Successfully deleted booking!');
      window.alert('Booking deleted successfully!');
    } catch (error) {
      console.log('Error deleting booking. Please try again.', error);
      window.alert('Error deleting booking. Please try again.');
    }
  };

  const handleFetchUserById = async () => {
    try {
      const response = await axios.get(`https://yallambee-booking-app-backend.onrender.com/users/${selectedUserId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserToUpdate(response.data);
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      window.alert('Failed to fetch user. Please check the ID and try again.');
    }
  };

  const handleUpdateUser = async () => {
    try {
      const response = await axios.put(`https://yallambee-booking-app-backend.onrender.com/users/${selectedUserId}`, userToUpdate, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Update the users list with the updated user
      setUsers(users.map((user) => (user._id === selectedUserId ? response.data : user)));
      console.log('Successfully updated user!');
      window.alert('User updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
      window.alert('Failed to update user. Please try again.');
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Error Message */}
      {error && <div className="bg-red-600 text-white p-2 rounded mb-4">{error}</div>}

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
          <button onClick={handleAddProperty} className="bg-lime-600 text-white px-4 py-2 rounded">Add Property</button>
        </div>

        <ul>
  {properties.map((property) => (
    <li key={property._id} className="mb-2 flex items-center">
      <strong>{property.name}</strong>
      <span className="mx-2">-</span>
      <button
        onClick={() => handleDeleteProperty(property._id)}
        className="text-red-600 ml-4">
        Delete Property
      </button>
    </li>
  ))}
</ul>
      </section>

      {/* Users Section */}
      <section className="mt-11">
  <h2 className="text-2xl font-semibold mb-4">Users</h2>
  <div className="flex flex-wrap items-center mb-4 space-y-2 md:space-y-0 md:space-x-2 w-full">
    <input 
      type="text" 
      placeholder="Username" 
      value={newUser.username} 
      onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} 
      className="border rounded p-2 flex-grow w-full md:w-auto"
    />
    <input 
      type="password" 
      placeholder="Password" 
      value={newUser.password} 
      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} 
      className="border rounded p-2 flex-grow w-full md:w-auto"
    />
    <input 
      type="text" 
      placeholder="First Name" 
      value={newUser.firstName} 
      onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })} 
      className="border rounded p-2 flex-grow w-full md:w-auto"
    />
    <input 
      type="text" 
      placeholder="Last Name" 
      value={newUser.lastName} 
      onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })} 
      className="border rounded p-2 flex-grow w-full md:w-auto"
    />
    <input 
      type="email" 
      placeholder="Email" 
      value={newUser.email} 
      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} 
      className="border rounded p-2 flex-grow w-full md:w-auto"
    />
    <input 
      type="text" 
      placeholder="Phone" 
      value={newUser.phone} 
      onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })} 
      className="border rounded p-2 flex-grow w-full md:w-auto"
    />
    <input 
      type="date" 
      placeholder="Date of Birth" 
      value={newUser.dob} 
      onChange={(e) => setNewUser({ ...newUser, dob: e.target.value })} 
      className="border rounded p-2 flex-grow w-full md:w-auto"
    />
    <div className="flex items-center space-x-2 w-full md:w-auto">
      <input 
        type="checkbox" 
        checked={newUser.isAdmin} 
        onChange={() => setNewUser({ ...newUser, isAdmin: !newUser.isAdmin })} 
        className="mr-2"
      />
      <span>Admin</span>
    </div>
    <button 
      onClick={handleAddUser} 
      className="bg-lime-600 text-white p-2 rounded w-full md:w-auto"
    >
      Add User
    </button>
  </div>
  <ul className="list-disc pl-5">
  {users && users.length > 0 ? (
    users.map((user) => (
      <div key={user._id} className="mb-2">
        <strong>{user.username}</strong> - {user.email}
        <button
          onClick={() => handleDeleteUser(user._id)}
          className="text-red-600 ml-4"
        >
          Delete User
        </button>
      </div>
    ))
  ) : (
    <p>No users available</p>
  )}
</ul>

        {/* Update User Section */}
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Update User Details</h3>
          <input
            type="text"
            placeholder="Enter User ID"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className="border rounded p-2 mb-2"
          />
          <button onClick={handleFetchUserById} className="bg-lime-600 text-white px-4 py-2 rounded mb-4">Fetch User Details</button>

          {userToUpdate && (
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                placeholder="Username"
                value={userToUpdate.username}
                onChange={(e) => setUserToUpdate({ ...userToUpdate, username: e.target.value })}
                className="border rounded p-2"
              />
              <input
                type="text"
                placeholder="First Name"
                value={userToUpdate.firstName}
                onChange={(e) => setUserToUpdate({ ...userToUpdate, firstName: e.target.value })}
                className="border rounded p-2"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={userToUpdate.lastName}
                onChange={(e) => setUserToUpdate({ ...userToUpdate, lastName: e.target.value })}
                className="border rounded p-2"
              />
              <input
                type="text"
                placeholder="Email"
                value={userToUpdate.email}
                onChange={(e) => setUserToUpdate({ ...userToUpdate, email: e.target.value })}
                className="border rounded p-2"
              />
              <input
                type="text"
                placeholder="Phone"
                value={userToUpdate.phone}
                onChange={(e) => setUserToUpdate({ ...userToUpdate, phone: e.target.value })}
                className="border rounded p-2"
              />
              <input
                type="date"
                placeholder="Date of Birth"
                value={userToUpdate.dob}
                onChange={(e) => setUserToUpdate({ ...userToUpdate, dob: e.target.value })}
                className="border rounded p-2"
              />
              <input
                type="text"
                placeholder="Is Admin"
                value={userToUpdate.isAdmin}
                onChange={(e) => setUserToUpdate({ ...userToUpdate, isAdmin: e.target.value })}
                className="border rounded p-2"
              />
              <button onClick={handleUpdateUser} className="bg-green-600 text-white px-4 py-2 rounded">Update User</button>
            </div>
          )}
        </div>
      </section>

      {/* Bookings Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Bookings</h2>
        <div className="flex flex-col md:flex-row items-center mb-4 space-y-2 md:space-y-0 md:space-x-2">
          <input
            type="text"
            placeholder="User"
            value={newBooking.user}
            onChange={(e) => setNewBooking({ ...newBooking, user: e.target.value })}
            className="border rounded p-2 flex-grow"
          />
          <input
            type="text"
            placeholder="Property"
            value={newBooking.property}
            onChange={(e) => setNewBooking({ ...newBooking, property: e.target.value })}
            className="border rounded p-2 flex-grow"
          />
          <input
            type="date"
            placeholder="Start Date"
            value={newBooking.startDate}
            onChange={(e) => setNewBooking({ ...newBooking, startDate: e.target.value })}
            className="border rounded p-2 flex-grow"
          />
          <input
            type="date"
            placeholder="End Date"
            value={newBooking.endDate}
            onChange={(e) => setNewBooking({ ...newBooking, endDate: e.target.value })}
            className="border rounded p-2 flex-grow"
          />
          <button onClick={handleAddBooking} className="bg-lime-600 text-white px-4 py-2 rounded">Add Booking</button>
        </div>
    
        <ul className="list-disc pl-5">
  {bookings && bookings.length > 0 ? (
    bookings.map((booking) => (
      <div key={booking._id} className="mb-2 flex">
        <div>
          <strong>{booking.property.name}</strong> -{" "}
          {booking.user ? booking.user.username : "Unknown User"} - {booking.email}
        </div>
        <button
          onClick={() => handleDeleteUser(booking._id)}
          className="text-red-600 ml-4"
        >
          Delete Booking
        </button>
      </div>
    ))
  ) : (
    <p>No booking available</p>
  )}
</ul>
      </section>
    </div>
  );
};

export default AdminDashboard;