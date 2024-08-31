import React, { useState } from "react";
import axios from "axios";
import { getToken } from "../pages/authUtils";

const UpdateUserDetailsForm = ({ user, onEdit, onClose }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [dob, setDob] = useState(user?.dob ? user.dob.slice(0, 10) : ""); // Assuming DOB is in "YYYY-MM-DD" format

  const handleUpdateUserDetails = async (e) => {
    e.preventDefault();

    const updatedUserData = {
      firstName,
      lastName,
      email,
      phone,
      address,
      dob,
    };

    console.log("Updated user data being sent to server:", JSON.stringify(updatedUserData, null, 2));

    try {
      const token = getToken();
      const response = await axios.put(
        `https://yallambee-booking-app-backend.onrender.com/users/${user._id}`,
        updatedUserData,
        {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        }
      );

      console.log('User details updated successfully:', response.data);

      onEdit(response.data); // Call the onEdit function to update the user details in the parent component
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error updating user details:", error.response?.data || error.message);
      console.log("Server error details:", error.response?.data);
    }
  };

  return (
    <form className="space-y-4 bg-white shadow-2xl rounded-lg p-8 max-w-[400px] mx-auto" onSubmit={handleUpdateUserDetails}>
      <div className="text-xl font-bold mb-4 text-center">Update Your Details</div>
      <div className="space-y-4">
        <div className="flex flex-col">
          <label className="font-semibold mb-2" htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="p-2 border rounded-lg"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold mb-2" htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="p-2 border rounded-lg"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold mb-2" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded-lg"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold mb-2" htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="p-2 border rounded-lg"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold mb-2" htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="p-2 border rounded-lg"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold mb-2" htmlFor="dob">Date of Birth</label>
          <input
            id="dob"
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="p-2 border rounded-lg"
            required
          />
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <button
          type="submit"
          className="btn btn-secondary btn-sm max-w-[240px] mx-auto"
        >
          Save
        </button>
        <button
          type="button"
          className="btn btn-secondary btn-sm max-w-[240px] mx-auto"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default UpdateUserDetailsForm;
