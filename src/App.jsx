import React from "react"
import BookingPage from "./pages/BookingPage"
import PropertyListingPage from "./pages/PropertyListingPage"
import ProfilePage from "./pages/ProfilePage"
import {Routes, Route } from "react-router-dom"
import Layout from "./Layouts/Layout"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import "./styles/index.css"

function App() {

  return (
    <> 
      <Routes>
        <Route exact path="/" element={<Layout><HomePage/></Layout>} />

        <Route exact path="/property-listing" element={
          <Layout><PropertyListingPage /></Layout>} />
        <Route exact path="/booking" element={
          <Layout><BookingPage/></Layout>} />
        <Route exact path="/profile" element={
          <Layout><ProfilePage/></Layout>} />
        <Route exact path="/SignInPage" element={
          <Layout><SignInPage/></Layout>} />
      </Routes>
    </>
     
  )
}

export default App