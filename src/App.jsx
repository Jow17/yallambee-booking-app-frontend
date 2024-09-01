import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { UserProvider } from './context/userContext'
import Layout from "./Layouts/Layout"
import HomePage from "./pages/HomePage"
import Register from "./pages/Register"
import SignInForm from "./pages/SignInPage"
import PropertyListing from "./pages/PropertyListingPage"
import BookingPage from "./pages/BookingPage"
import PropertyCard from "./components/PropertyCardAdmin"
import AdminDashboard from "./pages/AdminDashboard"
import ProfilePage from "./pages/ProfilePage"
import NotFound404 from "./pages/404"
import "./styles/index.css"

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/property-listing" element={<Layout><PropertyListing /></Layout>} />
        <Route path="/booking/:id" element={<Layout><BookingPage /></Layout>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />
        <Route path="/SignInPage" element={<Layout><SignInForm /></Layout>} />
        <Route path="/profile/:_id" element={<Layout><ProfilePage /></Layout>} />
        <Route path="/login" element={<SignInForm />} />
        <Route path="/property/:id" element={<Layout><PropertyCard /></Layout>} />
        <Route path="/admin-dashboard" element={<Layout><AdminDashboard /></Layout>} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </UserProvider>
  )
}

export default App;