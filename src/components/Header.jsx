import React from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Use jwt-decode without destructuring

const Header = () => {
  const token = localStorage.getItem("token");
  let userId;
  let isAdmin = false; // Default value for isAdmin

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userId = decodedToken.id; // Extract the user ID from the token
      isAdmin = decodedToken.isAdmin; // Extract the admin status from the token
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  return (
    <div className="bg-lime-800 py-6">
      <div className="container mx-auto flex justify-between items-center">
        <span className="flex items-center h-12">
          <Link to="/">
            <img 
              src="/Logo.png" 
              alt="Yallambee logo" 
              className="h-full max-h-20 w-auto" 
            />
          </Link>
        </span>
        <nav className="flex items-center space-x-6 text-white">
          <Link to="/" className="px-3">Home</Link>
          <Link to="/property-listing" className="px-3">Properties</Link>
          <Link to="/booking" className="px-3">Booking</Link>
          {/* Conditionally render the Profile link if userId is available */}
          {userId && (
            <Link to={`/profile/${userId}`} className="px-3">Profile</Link>
          )}
          {/* Conditionally render the Admin Dashboard link if the user is an admin */}
          {isAdmin && (
            <Link to="/admin-dashboard" className="px-3">Admin Dashboard</Link>
          )}
        </nav>
        <button className="bg-white text-black px-3 py-2 font-bold hover:bg-gray-100 rounded">
          <Link to="/SignInPage">Sign In</Link>
        </button>
      </div>
    </div>
  );
};

export default Header;