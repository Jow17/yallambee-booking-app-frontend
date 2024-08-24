import React from "react"
import BookingPage from "./pages/BookingPage"
import PropertyListing from "./pages/PropertyListingPage"
import ProfilePage from "./pages/ProfilePage"
import {Routes, Route } from "react-router-dom"
import Layout from "./Layouts/Layout"
import HomePage from "./pages/HomePage"
import Register from "./pages/Register"
import SignInPage from "./pages/SignInPage"
import PropertyCard from "./components/PropertyCard"
import AdminDashboard from "./pages/AdminDashboard"
import "./styles/index.css"

function App() {

  return (
    <> 
      <Routes>

        <Route path="/" element={
          <Layout><HomePage/></Layout>} />
        <Route path="/property-listing" element={
          <Layout><PropertyListing /></Layout>} />
        <Route path="/booking" element={
          <Layout><BookingPage/></Layout>} />
        <Route path="/profile" element={
          <Layout><ProfilePage/></Layout>} />
        <Route path="/register" element={
          <Layout><Register/></Layout>} />
        <Route path="/SignInPage" element={
          <Layout><SignInPage/></Layout>} />
        <Route path="/property/:id" element={
          <Layout><PropertyCard /></Layout>} />
        <Route path="/admin-dashboard" element={
          <Layout><AdminDashboard/></Layout>} />
        <Route path="*" element={<h3>Page not found!</h3>} />
      
      </Routes>
    </>
  )
}

export default App