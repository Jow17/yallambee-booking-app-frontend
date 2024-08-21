import React from "react";
import AdminDashboard from "./pages/AdminDashboard";
import BookingPage from "./pages/BookingPage";
import HomePage from "./pages/HomePage";
import PropertyListingPage from "./pages/PropertyListingPage";
import ProfilePage from "./pages/ProfilePage";
import { Link, Routes, Route } from 'react-router-dom';



function App() {

  return (
    <>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/property-listing">Properties</Link></li>
          <li><Link to="/booking">Bookings</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/admin">Admin Dashboard</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/property-listing" element={<PropertyListingPage />} />
        <Route exact path="/booking" element={<BookingPage />} />
        <Route exact path="/profile" element={<ProfilePage />} />
        <Route exact path="/admin" element={<AdminDashboard />} />
      </Routes>
    
    </>
     
  );
}

export default App;