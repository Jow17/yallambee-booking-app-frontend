import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { removeToken } from '../pages/authUtils';
import { jwtDecode } from 'jwt-decode';
import Logo from "/Logo.png"

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Retrieve the token from local storage

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setIsAdmin(decodedToken.isAdmin); // Set the admin status
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, [token]);

  const handleLogout = () => {
    removeToken(); // Clear the token from local storage or cookies
    setUser(null); // Reset the user state in context
    setIsAdmin(false); // Reset the admin status
    window.alert('Successfully logged out!')
    navigate('/'); // Redirect to the homepage or login page
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onMenuButtonClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav className="border-green-200 dark:bg-green-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 ">
          <img src={Logo} className="h-16" alt="Logo" />
        </Link>
        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-green-500 rounded-lg md:hidden hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-200 dark:text-green-400 dark:hover:bg-green-700 dark:focus:ring-green-600"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen}
          onClick={onMenuButtonClick}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`w-full md:block md:w-auto ${isMenuOpen ? "" : "hidden"}`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-green-800 md:bg-green-900 border-green-700">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-green-900 rounded hover:bg-green-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-green-700 dark:hover:text-white md:dark:hover:bg-transparent"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/property-listing"
                className="block py-2 px-3 text-green-900 rounded hover:bg-green-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-green-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Tiny Homes
              </Link>
            </li>
            <li>
              <Link
                to="/booking"
                className="block py-2 px-3 text-green-900 rounded hover:bg-green-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-green-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Book Your Stay
              </Link>
            </li>
            {isAdmin && (
              <li>
                <Link
                  to="/admin-dashboard"
                  className="block py-2 px-3 text-green-900 rounded hover:bg-green-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-green-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Admin Dashboard
                </Link>
              </li>
            )}
            <li>
              <Link
                to="/contact"
                className="block py-2 px-3 text-green-900 rounded hover:bg-green-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-green-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Contact
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link
                    to={`/profile/${user.id}`}
                    className="block py-2 px-3 text-green-900 rounded hover:bg-green-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-green-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Account
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={handleLogout}
                    className="block py-2 px-3 text-green-900 rounded hover:bg-green-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-green-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to="/SignInPage"
                  className="block py-2 px-3 text-green-900 rounded hover:bg-green-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-green-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Sign In
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
