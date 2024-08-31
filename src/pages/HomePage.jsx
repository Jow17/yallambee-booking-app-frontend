import React from 'react'
// import { Link } from 'react-router-dom'
// import SearchBar from '../components/SearchBar'
import Hero from '../components/Hero'
// import BookingPage from './BookingPage';
import PropertyListing from './PropertyListingPage';
import CheckAvailability from '../components/CheckAvailability'

const HomePage = () => {
  return (
    <>  
      <Hero />
      <div className='container mx-auto relative'>
      <div className='bg-accent/20 mt-4 p-4 lg:shadow-xl lg:absolute lg:left-0 lg:right-0 lg:p-0 lg:z-30 lg:-top-12'>
          <CheckAvailability />
        </div>
      </div>
      <PropertyListing />
    </>
  );
};

export default HomePage;