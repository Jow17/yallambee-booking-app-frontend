import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getToken } from './authUtils';
import { UserContext } from '../context/userContext';
import Button from "../components/Button";
import Modal from "../components/Modal";
import UpdateUserDetailsForm from "../components/UpdateUserDetailsForm";
import BookingCard from "../components/BookingCard";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false); // State for modal

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

  if (loading) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="p-5">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-6">User Profile</h1>
        <Button
          onClick={() => {
            setIsEditUserModalOpen(true);
          }}
        >
          Edit user details
        </Button>
      </div>

      <div className="profile-info mb-6">
        <div className="mb-2">
          <span className="font-bold">First Name:</span> {user?.firstName || 'No Name Available'}
        </div>
        <div className="mb-2">
          <span className="font-bold">Last Name:</span> {user?.lastName || 'No Name Available'}
        </div>
        <div className="mb-2">
          <span className="font-bold">Email:</span> {user?.email || 'No Email Available'}
        </div>
        <div className="mb-2">
          <span className="font-bold">Phone Number:</span> {user?.phone || 'No Phone Available'}
        </div>
        <div className="mb-2">
          <span className="font-bold">Address:</span> {user?.address || 'No Address Available'}
        </div>
      </div>

      {isEditUserModalOpen && (
        <Modal
          title={"Edit User"}
          onClose={() => setIsEditUserModalOpen(false)}
        >
          <UpdateUserDetailsForm user={user} onClose={() => setIsEditUserModalOpen(false)} />
        </Modal>
      )}

      <div className="font-bold text-lg mt-8">Your bookings</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {bookings.length > 0 ? (
          bookings.map((booking, index) => (
            <BookingCard type="user" key={index} booking={booking} />
          ))
        ) : (
          <p>No bookings available.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
