import React from "react";
import logodark from "../assets/img/logowhite-1.png";

const Footer = () => {
  return (
    <footer className="bg-primary py-4">
      <div className="container mx-auto text-white flex justify-between items-center">
        {/* logo */}
        <a href="/">
          <img
            src={logodark}
            alt="Yallambee Tiny Homes Logo"
            className="w-16 sm:w-20 md:w-24"
          />
        </a>
        <span>Copyright &copy; 2024. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;

