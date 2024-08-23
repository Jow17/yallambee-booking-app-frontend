import Header from "../components/Header"
import Hero from "../components/Hero"
import Footer from "../components/Footer"
import React from "react"

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col">
      <Header />
      <Hero />
      <div className="container mx-auto py-10 flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;