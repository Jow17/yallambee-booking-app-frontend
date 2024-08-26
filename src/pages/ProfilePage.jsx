import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`https://yallambee-booking-app-backend.onrender.com/users/${id}`);
        setUser(userResponse.data);

        const bookingsResponse = await axios.get(`https://yallambee-booking-app-backend.onrender.com/users/${id}/bookings`);
        setBookings(bookingsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append('profileImage', selectedImage);

    try {
      await axios.post(`https://yallambee-booking-app-backend.onrender.com/users/${id}/uploadProfileImage`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Profile picture updated successfully!');
      const userResponse = await axios.get(`https://yallambee-booking-app-backend.onrender.com/users/${id}`);
      setUser(userResponse.data);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to update profile picture.');
    }
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-6">Profile Page</h1>

      <div className="profile-info mb-6">
        <h2 className="text-2xl font-semibold mb-4">{user?.name || 'No Name Available'}</h2>
        <img src={user?.profileImage || '/default-avatar.png'} alt="Profile" width="150" height="150" className="mb-4" />
        <div className="flex items-center mb-4">
          <input type="file" onChange={handleImageChange} className="border rounded p-2" />
          <button
            onClick={handleImageUpload}
            className="bg-blue-500 text-white p-2 rounded ml-4"
          >
            Upload New Profile Picture
          </button>
        </div>
        <p className="mb-2">Email: {user?.email || 'No Email Available'}</p>
        <p className="mb-2">Phone: {user?.phone || 'No Phone Available'}</p>
        <p className="mb-2">Address: {user?.address || 'No Address Available'}</p>
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
