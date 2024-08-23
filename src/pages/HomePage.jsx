import React from "react"
import { Link } from "react-router-dom"
import SearchBar from "../components/SearchBar"

const HomePage = () => {
    return (
      <>  
        <SearchBar />
        <br />
        <img 
          className="object-fill" 
          src="/tiny_home_pics/Yallambee-Hero-Image.jpg" 
          alt="Yallambee hero image"
        />
      </>
    );
  }
  

export default HomePage