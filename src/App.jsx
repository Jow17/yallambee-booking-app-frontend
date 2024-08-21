import React from "react"
import AdminDashboard from "./pages/AdminDashboard"
import BookingPage from "./pages/BookingPage"
import HomePage from "./pages/HomePage"
import PropertyListingPage from "./pages/PropertyListingPage"
import ProfilePage from "./pages/ProfilePage"
import Header from "./components/Header"
import { Link, Routes, Route, Router } from "react-router-dom"

function App() {

  return (
    <> 
      <Header/>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/property-listing" element={<PropertyListingPage />} />
        <Route exact path="/booking" element={<BookingPage />} />
        <Route exact path="/profile" element={<ProfilePage />} />
        <Route exact path="/admin" element={<AdminDashboard />} />
      </Routes>
    </>
     
  )
}

export default App