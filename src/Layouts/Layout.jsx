import Header from "../components/Header"
import Footer from "../components/Footer"
import React from "react"

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col bg-custom-lime min-h-screen ">
      <Header />
      <div className="container mx-auto py-2 flex-1">{children}</div>
      <Footer />
    </div>
  )
}

export default Layout