import React, { useState } from "react";
import axios from "axios";
import { getToken } from "../pages/authUtils";

const UpdatePropertyForm = ({ property, onEdit, onClose }) => {
  const [name, setName] = useState(property?.name || "");
  const [description, setDescription] = useState(property?.description || "");
  const [price, setPrice] = useState(property?.price || 0);
  const [size, setSize] = useState(property?.size || 0);
  const [maxPerson, setMaxPerson] = useState(property?.maxPerson || 1);
  const [availability, setAvailability] = useState(property?.availability || []);
  const [images, setImages] = useState(property?.images || []);
  const [location, setLocation] = useState({
    city: property?.location?.city || "",
    state: property?.location?.state || "",
  });
  const [ageRestriction, setAgeRestriction] = useState(property?.ageRestriction || 18);

  const handleUpdateProperty = async (e) => {
    e.preventDefault();

    const updatedPropertyData = {
      name,
      description,
      price,
      size,
      maxPerson,
      availability,
      images,
      location,
      ageRestriction,
    };

    console.log("Updated property data being sent to server:", JSON.stringify(updatedPropertyData, null, 2));

    try {
      const token = getToken();
      const response = await axios.put(
        `https://yallambee-booking-app-backend.onrender.com/properties/${property._id}`,
        updatedPropertyData,
        {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        }
      );

      console.log('Property details updated successfully:', response.data);

      onEdit(response.data); // Call the onEdit function to update the property details in the parent component
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error updating property details:", error.response?.data || error.message);
      console.log("Server error details:", error.response?.data);
    }
  };

  return (
    <form className="space-y-4 bg-white shadow-2xl rounded-lg p-8 max-w-[400px] mx-auto" onSubmit={handleUpdateProperty}>
      <div className="text-xl font-bold mb-4 text-center">Update Property Details</div>
      <div className="space-y-4">
        <div className="flex flex-col">
          <label className="font-semibold mb-2" htmlFor="name">Property Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border rounded-lg"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold mb-2" htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 border rounded-lg"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold mb-2" htmlFor="price">Price per Night</label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-2 border rounded-lg"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold mb-2" htmlFor="size">Property Size (m²)</label>
          <input
            id="size"
            type="number"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="p-2 border rounded-lg"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold mb-2" htmlFor="maxPerson">Max Guests</label>
          <input
            id="maxPerson"
            type="number"
            value={maxPerson}
            onChange={(e) => setMaxPerson(e.target.value)}
            className="p-2 border rounded-lg"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold mb-2" htmlFor="availability">Availability (comma-separated dates in YYYY-MM-DD format)</label>
          <input
            id="availability"
            type="text"
            value={availability.join(", ")}
            onChange={(e) => setAvailability(e.target.value.split(",").map(date => date.trim()))}
            className="p-2 border rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold mb-2" htmlFor="images">Image URLs (comma-separated)</label>
          <input
            id="images"
            type="text"
            value={images.join(", ")}
            onChange={(e) => setImages(e.target.value.split(",").map(url => url.trim()))}
            className="p-2 border rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold mb-2" htmlFor="location">Location</label>
          <div className="flex gap-2">
            <input
              id="city"
              type="text"
              placeholder="City"
              value={location.city}
              onChange={(e) => setLocation({ ...location, city: e.target.value })}
              className="p-2 border rounded-lg w-1/2"
              required
            />
            <input
              id="state"
              type="text"
              placeholder="State"
              value={location.state}
              onChange={(e) => setLocation({ ...location, state: e.target.value })}
              className="p-2 border rounded-lg w-1/2"
              required
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold mb-2" htmlFor="ageRestriction">Age Restriction</label>
          <input
            id="ageRestriction"
            type="number"
            value={ageRestriction}
            onChange={(e) => setAgeRestriction(e.target.value)}
            className="p-2 border rounded-lg"
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

export default UpdatePropertyForm;
