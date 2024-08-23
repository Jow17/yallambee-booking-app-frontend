import React from 'react';
import SearchBar from '../components/SearchBar';


// Placeholder Properties
const properties = [
  {
    id: 1,
    name: 'Tiny Home',
    location: 'Yallambee',
    image: 'public/tiny_home_pics/yallamby110a7347.JPEG',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
  },
  {
    id: 2,
    name: 'Tiny Home',
    location: 'Yallambee',
    image: 'public/tiny_home_pics/4c36d0b0-94ac-438f-9e6d-4a0a4a5dda68.webp',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
  },
  {
    id: 3,
    name: 'Tiny Home',
    location: 'Yallambee',
    image: 'public/tiny_home_pics/5d5e5a09-04e7-4e8d-9d0a-9a44940fe4c4.webp',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
  },
  {
    id: 4,
    name: 'Tiny Home',
    location: 'Yallambee',
    image: 'public/tiny_home_pics/yallamby110a9500.JPEG',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
  },
  {
    id: 5,
    name: 'Tiny Home',
    location: 'Yallambee',
    image: 'public/tiny_home_pics/bd07c6ba-2527-4e3f-b1cb-0c8a6e8261f4.webp',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
  },
  {
    id: 6,
    name: 'Tiny Home',
    location: 'Yallambee',
    image: 'public/tiny_home_pics/yallamby110a9268.JPEG',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
  },
];

const propertyList = () => {
  return (
    <>
    <SearchBar/>
    <div className="bg-sage-green min-h-screen p-2">
      <div className=" mx-auto ">
        <h1 className="text-3xl font-bold mb-6 text-black">Properties</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map(property => (
            <div key={property.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={property.image} alt={property.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{property.name}</h2>
                <p className="text-gray-600">{property.location}</p>
                <p className="mt-2 text-gray-800">{property.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default propertyList;
