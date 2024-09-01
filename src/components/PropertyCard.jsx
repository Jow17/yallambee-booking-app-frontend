import React from "react"
import { Link } from "react-router-dom"
import { BsArrowsFullscreen, BsPeople } from "react-icons/bs"

const PropertyCard = ({ property }) => {
  return (
    <div className="bg-white shadow-2xl min-h-[500px] group">
      {property ? (
        <>
          {/* Image Section */}
          <div className="overflow-hidden">
            {property.images && property.images.length > 0 ? (
              <img
                className="group-hover:scale-110 transition-all duration-300 w-full"
                src={property.images[0]} // Display the first image
                alt={property.name}
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex justify-center items-center">
                <span>No Image Available</span>
              </div>
            )}
          </div>

          {/* Property Details */}
          <div className="bg-white shadow-lg max-w-[300px] mx-auto h-[60px] -translate-y-1/2 flex justify-center items-center uppercase font-tertiary tracking-[1px] font-semibold text-base">
            <div className="flex justify-between w-[80%]">
              {/* Property Size */}
              <div className="flex items-center gap-x-2">
                <div className="text-accent">
                  <BsArrowsFullscreen className="text-[15px]" />
                </div>
                <div className="flex gap-x-1">
                  <div>Size</div>
                  <div>{property.size}m²</div>
                </div>
              </div>
              {/* Max Guests */}
              <div className="flex items-center gap-x-2">
                <div className="text-accent">
                  <BsPeople className="text-[18px]" />
                </div>
                <div className="flex gap-x-1">
                  <div>Max People</div>
                  <div>{property.maxPerson}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Property Name & Description */}
          <div className="text-center">
            <h3 className="h3">{property.name}</h3>
            <p className="max-w-[300px] mx-auto mb-3 lg:mb-6">
              {property.description.slice(0, 56)}...
            </p>
          </div>
          
          {/* Booking Link for all users */}
          <Link
            to={`/booking/${property._id}`}
            className="btn btn-secondary btn-sm max-w-[240px] mx-auto"
          >
            Book now from ${property.price}
          </Link>
        </>
      ) : (
        <p>Loading property details...</p>
      )}
    </div>
  )
}

export default PropertyCard