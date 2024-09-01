import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero'
import PropertyListing from './PropertyListingPage';
import CheckAvailability from '../components/CheckAvailability'

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <>  
      <Hero />
      <div className='container mx-auto relative'>
      <div className='bg-accent/20 mt-4 p-4 lg:shadow-xl lg:absolute lg:left-0 lg:right-0 lg:p-0 lg:z-30 lg:-top-12'>
          <CheckAvailability />
        </div>
      </div>
      <div id="property-listing">
        <PropertyListing />
      </div>
    </>
  );
};

export default HomePage;