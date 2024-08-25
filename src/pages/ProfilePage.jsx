import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProfilePage() {
  const [user, setUser] = useState(null);
  // const [bookings, setBookings] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // Fetch user details and bookings from API
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get('https://yallambee-booking-app-backend.onrender.com/users/id');
        setUser(userResponse.data);

      //   const bookingsResponse = await axios.get('http://localhost:4001/users/booking/id');
      //   setBookings(bookingsResponse.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchUserData();
  }, []);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append('profileImage', selectedImage);

    try {
      await axios.post('/api/user/uploadProfileImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Profile picture updated successfully!');
      // Re-fetch user data to update the profile picture
      const userResponse = await axios.get('/api/user/details');
      setUser(userResponse.data);
    } catch (error) {
      console.error('Error uploading image', error);
      alert('Failed to update profile picture.');
    }
  };

  if (!user) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-info">
        <h1>{user.name}</h1>
        <img src={user.profileImage} alt="Profile" width="150" height="150" />
        <input type="file" onChange={handleImageChange} />
        <button onClick={handleImageUpload}>Upload New Profile Picture</button>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Address: {user.address}</p>
      </div>

      <div className="booking-list">
        <h2>Your Bookings</h2>
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id}>
              <p>Booking ID: {booking._id}</p>
              <p>Date: {booking.date}</p>
              <p>Status: {booking.status}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProfilePage;