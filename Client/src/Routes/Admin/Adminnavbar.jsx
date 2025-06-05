import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Adminnavbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="navbar bg-gray-100 fixed top-0 shadow-sm px-4">
      {/* Left - Logo and Mobile Dropdown */}
      <div className="navbar-start">
        <div className="dropdown">
          <button tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52">
          
            {!user ? (
              <li><Link to="/login">Login</Link></li>
            ) : (
              <li><button onClick={logout}>Logout</button></li>
            )}
          </ul>
        </div>

        <Link to="/adminpanel" className="flex gap-2 items-center">
          <img
            className="w-10 h-10"
            src="https://static.vecteezy.com/system/resources/previews/045/954/869/non_2x/hotel-icon-3d-design-png.png"
            alt="logo"
          />
          <p className="text-black font-bold font-serif text-xl">Dazzling Dice</p>
        </Link>
      </div>


      {/* Right - Login/Logout */}
      <div className="navbar-end">
        {!user ? (
          <Link to="/login" className="btn btn-primary">Login</Link>
        ) : (
          <button onClick={logout} className="btn btn-secondary">Logout</button>
        )}
      </div>
    </div>
  );
};

export default Adminnavbar;
