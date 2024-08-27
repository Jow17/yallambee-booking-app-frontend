import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { removeToken } from '../pages/authUtils';

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken(); // Clear the token from local storage or cookies
    setUser(null); // Reset the user state in context
    navigate('/'); // Redirect to the homepage or login page
  };

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
          <Link to="/property-listing" className="px-3">Tiny Homes</Link>
          {/* <Link to="/booking" className="px-3">Booking</Link> */}
          {/* {user && (
            <Link to={`/profile/${user.id}`} className="px-3">Profile</Link>
          )} */}
        </nav>
        {user ? (
          <div className="flex items-center space-x-4">
            <button className="bg-white text-black px-3 py-2 font-bold hover:bg-gray-100 rounded">
              <Link to={`/profile/${user.id}`}>Account</Link>
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-3 py-2 font-bold hover:bg-red-500 rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <button className="bg-white text-black px-3 py-2 font-bold hover:bg-gray-100 rounded">
            <Link to="/SignInPage">Sign In</Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;

