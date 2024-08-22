import { Link } from "react-router-dom"


const Header = () => {
  return (
    <div className="bg-green-900 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/"> 
          Yallambee Tiny Homes
          </Link>
        </span>
        <span className="flex items-center text-white px-3">
          <Link to="/"> 
          Home
          </Link>
        </span>
        <span className="flex items-center text-white px-3">
          <Link to="/property-listing"> 
          Properties
          </Link>
        </span>
        <span className="flex items-center text-white px-3">
          <Link to="/booking"> 
          Booking
          </Link>
        </span>
        <span className="flex items-center text-white px-3">
          <Link to="/profile"> 
          Profile
          </Link>
        </span>
    <span className="flex space-x-2">
      <Link to="/SignInPage" className="flex bg-white items-center text-black-600 px-3 font-bold hover:bg-gray-100">
       Sign In 
      </Link>
    </span>
    </div>
  </div>
  )
}

export default Header