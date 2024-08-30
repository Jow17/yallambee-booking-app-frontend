import React from 'react'

const Contact = () => {
  return (
    <>
      <div className="mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-black text-center">Contact Us</h1>
        <form className="space-y-4 p-6 mx-auto ">
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <textarea placeholder="Message" rows="1" />
          <button type="submit" className="w-full px-4 py-2 text-white bg-emerald-600 rounded-md hover:bg-lime-700">
            Send Message
          </button>
        </form>
        <div className="flex justify-center">
          <a href="tel:123-456-7890" className="text-blue-600 hover:text-blue-700">
            Call Us: 123-456-7890
            </a>
        </div>
      </div>
    </>
  )
}

export default Contact