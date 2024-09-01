import React, { useState, useEffect } from "react"
import axios from "axios"
import PropertyCard from "../components/PropertyCard"
import { SpinnerDotted } from "spinners-react"

const PropertyListing = () => {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("https://yallambee-booking-app-backend.onrender.com/properties")
        console.log("Fetched Properties:", response.data)
        setProperties(response.data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching properties:", error)
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  return (
    <section className='py-24'>
      {/* Overlay & Spinner */}
      {loading && (
        <div className='h-screen fixed bottom-0 top-0 bg-black/90 w-full z-50 flex justify-center items-center'>
          <SpinnerDotted color='white' />
        </div>
      )}

      <div className='container mx-auto lg:px-0'>
        <div className='text-center'>
          <div className='font-tertiary uppercase text-[15px] tracking-[6px]'>
            Yallambee
          </div>
          <h2 className='font-primary text-[45px] mb-4'>Tiny Homes</h2>
        </div>

        {/* Grid */}
        <div className='grid grid-cols-1 max-w-sm mx-auto gap-[30px] lg:grid-cols-3 lg:max-w-none lg:mx-0'>
          {properties.length > 0 ? (
            properties.map((property) => (
              <PropertyCard property={property} key={property._id} />
            ))
          ) : (
            <p>Loading properties...</p>
          )}
        </div>
      </div>
    </section>
  )
}

export default PropertyListing