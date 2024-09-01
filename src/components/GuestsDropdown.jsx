import React from 'react';
import { Menu } from '@headlessui/react';
import { BsChevronDown } from 'react-icons/bs';

const guestOptions = [
  { name: '1 Guest' },
  { name: '2 Guests' }
];

const GuestsDropdown = ({ selectedGuests, setSelectedGuests }) => {
  return (
    <Menu as='div' className='w-full h-full bg-white relative'>
      <Menu.Button className='w-full h-full flex items-center justify-between px-8'>
        {selectedGuests}
        <BsChevronDown className='text-base text-accent-hover' />
      </Menu.Button>
      <Menu.Items as='ul' className='bg-white absolute w-full flex flex-col z-40'>
        {guestOptions.map((option, index) => (
          <Menu.Item
            onClick={() => setSelectedGuests(option.name)}
            as='li'
            className='border-b last-of-type:border-b-0 h-12 hover:bg-accent hover:text-white w-full flex justify-center items-center cursor-pointer'
            key={index}
          >
            {option.name}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
};

export default GuestsDropdown;
