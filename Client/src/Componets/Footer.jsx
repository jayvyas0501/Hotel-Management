import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer footer-horizontal footer-center bg-gray-900 text-white rounded p-10">
      <nav className="grid grid-flow-col gap-4">
        <Link to="/" className="link link-hover text-white">Home</Link>
        <Link to="/about" className="link link-hover text-white">About Us</Link>
      </nav>
      
   
  
  <nav>
    <div className="grid grid-flow-col gap-4">
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
        <svg xmlns="http://www.w3.org/2000/svg"
          width="24" height="24" viewBox="0 0 24 24"
          className="fill-current text-white">
          <path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 
                   4.932 4.932 0 0 0 2.165-2.724 
                   9.864 9.864 0 0 1-3.127 1.195 
                   4.916 4.916 0 0 0-8.384 4.482 
                   13.944 13.944 0 0 1-10.124-5.138 
                   4.822 4.822 0 0 0 1.523 6.573 
                   4.903 4.903 0 0 1-2.229-.616v.06 
                   a4.922 4.922 0 0 0 3.946 4.827 
                   4.996 4.996 0 0 1-2.224.085 
                   4.936 4.936 0 0 0 4.604 3.417 
                   9.867 9.867 0 0 1-6.102 2.104 
                   c-.395 0-.787-.023-1.175-.069 
                   a13.945 13.945 0 0 0 7.548 2.212 
                   c9.057 0 14.01-7.496 14.01-13.986 
                   0-.21-.005-.423-.014-.634 
                   A10.012 10.012 0 0 0 24 4.557z" />
        </svg>
      </a>

      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
        <svg xmlns="http://www.w3.org/2000/svg"
          width="24" height="24" viewBox="0 0 24 24"
          className="fill-current text-white">
          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0
                   -3.897.266-4.356 2.62-4.385 8.816 
                   .029 6.185.484 8.549 4.385 8.816 
                   3.6.245 11.626.246 15.23 0 
                   3.897-.266 4.356-2.62 4.385-8.816 
                   -.029-6.185-.484-8.549-4.385-8.816zm-10.615 
                   12.816v-8l8 3.993-8 4.007z" />
        </svg>
      </a>

      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <svg xmlns="http://www.w3.org/2000/svg"
          width="24" height="24" viewBox="0 0 24 24"
          className="fill-current text-white">
          <path d="M9 8H6v4h3v12h5V12h3.642l.358-4H14V6.667
                   c0-.955.192-1.333 1.115-1.333H18V0h-3.808 
                   C10.596 0 9 1.583 9 4.615V8z" />
        </svg>
      </a>
    </div>
  </nav>


      <aside>
        <p className="text-white">
          Copyright © {new Date().getFullYear()} - All rights reserved
          by <span className="font-semibold">Dazzling Dice Hotels</span>
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
