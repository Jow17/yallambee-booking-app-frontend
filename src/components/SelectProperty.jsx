import React, { useState, useEffect } from 'react';
import { Menu } from '@headlessui/react';
import { BsChevronDown } from 'react-icons/bs';
import axios from 'axios';

const SelectProperty = ({ selectedProperty, setSelectedProperty }) => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('https://yallambee-booking-app-backend.onrender.com/properties');
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <Menu as='div' className='w-full h-full bg-white relative'>
      <Menu.Button className='w-full h-full flex items-center justify-between px-8'>
        {selectedProperty ? selectedProperty.name : 'Property'}
        <BsChevronDown className='text-base text-accent-hover' />
      </Menu.Button>
      <Menu.Items as='ul' className='bg-white absolute w-full flex flex-col z-40'>
        {properties.map((property) => (
          <Menu.Item
            onClick={() => setSelectedProperty(property)}
            as='li'
            className='border-b last-of-type:border-b-0 h-12 hover:bg-accent hover:text-white w-full flex justify-center items-center cursor-pointer'
            key={property._id}
          >
            {property.name}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
};

export default SelectProperty;
