import { Link } from 'react-router-dom';

const Header = () => (
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
        <Link to="/profile" className="px-3">Profile</Link>
      </nav>
      <button className="bg-white text-black px-3 py-2 font-bold hover:bg-gray-100 rounded">
        <Link to="/SignInPage">Sign In</Link>
      </button>
    </div>
  </div>
);

export default Header