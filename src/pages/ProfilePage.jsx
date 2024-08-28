import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getToken } from './authUtils';
import { UserContext } from '../context/userContext';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  // const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const { _id } = useParams(); // Ensure this matches the route param
  const { setUser: setGlobalUser } = useContext(UserContext); // Get setUser from UserContext

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = getToken(); // Fetch token from storage or cookies
        if (!token) {
          throw new Error('No token found. Please login.');
        }

        // Fetch user data with Authorization header
        const userResponse = await axios.get(`https://yallambee-booking-app-backend.onrender.com/users/${_id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(userResponse.data);

        // Fetch bookings data with Authorization header
        const bookingsResponse = await axios.get(`https://yallambee-booking-app-backend.onrender.com/users/${_id}/bookings`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBookings(bookingsResponse.data);

        // Update the global user context with the fetched data
        setGlobalUser(userResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [_id, setGlobalUser]);

  // const handleImageChange = (e) => {
  //   setSelectedImage(e.target.files[0]);
  // };

  // const handleImageUpload = async () => {
  //   const formData = new FormData();
  //   formData.append('profileImage', selectedImage);

  //   try {
  //     const token = getToken(); // Fetch the token from local storage or cookies
  //     await axios.post(`https://yallambee-booking-app-backend.onrender.com/users/${_id}/uploadProfileImage`, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //         Authorization: `Bearer ${token}`
  //       },
  //     });
  //     alert('Profile picture updated successfully!');
  //     const userResponse = await axios.get(`https://yallambee-booking-app-backend.onrender.com/users/${_id}`, {
  //       headers: { Authorization: `Bearer ${token}` }
  //     });
  //     setUser(userResponse.data);
  //     setGlobalUser(userResponse.data); // Update the global user context with the new data
  //   } catch (error) {
  //     console.error('Error uploading image:', error);
  //     alert('Failed to update profile picture.');
  //   }
  // };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-6">Manage Your Account</h1>

      <div className="profile-info mb-6">
        <h2 className="text-2xl font-semibold mb-4">{user?.firstName || 'No Name Available'}</h2>
        <h2 className="text-2xl font-semibold mb-4">{user?.lastName || 'No Name Available'}</h2>
        {/* <img src={user?.profileImage || '/default-avatar.png'} alt="Profile" width="150" height="150" className="mb-4" />
        <div className="flex items-center mb-4">
          <input type="file" onChange={handleImageChange} className="border rounded p-2" />
          <button
            onClick={handleImageUpload}
            className="bg-blue-500 text-white p-2 rounded ml-4"
          >
            Upload New Profile Picture
          </button>
        </div> */}
        <p className="mb-2">Email: {user?.email || 'No Email Available'}</p>
        <p className="mb-2">Phone: {user?.phone || 'No Phone Available'}</p>
      </div>

      <div className="booking-list">
        <h2 className="text-2xl font-semibold mb-4">Your Bookings</h2>
        <ul className="list-disc pl-5">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <li key={booking._id} className="mb-2">
                <p className="mb-1"><strong>Booking ID:</strong> {booking._id}</p>
                <p className="mb-1"><strong>Date:</strong> {booking.date}</p>
                <p className="mb-1"><strong>Status:</strong> {booking.status}</p>
              </li>
            ))
          ) : (
            <p>No bookings available.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;