import React from "react";
import { useNavigate } from "react-router-dom";
import { cardcomponets } from "../../Constant";

const Booking = () => {
  const navigate = useNavigate();

  // Check if user is authenticated
  const isAuthenticated = () => {
    return localStorage.getItem("userToken") !== null;
  };

  // Handle Booking button click
  const handleBookingClick = (link) => {
    if (isAuthenticated()) {
      navigate(link); // Navigate to the room page (e.g., /singleroom)
    } else {
      navigate("/login"); // Redirect to login if not authenticated
    }
  };

  return (
    <div>
      <p className="text-5xl font-serif font-bold text-black text-center uppercase py-10">
        Booking
      </p>
      <div className="bg-blue-200  my-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 py-10 px-6">
          {cardcomponets.map((item, index) => (
            <div
              key={index}
              className="booking-from-container bg-pink-100 rounded-3xl p-4 cursor-pointer 
              transform transition duration-300 ease-in-out hover:scale-105 shadow-md hover:shadow-xl"
            >
              <p className="text-2xl font-bold font-serif text-center text-black py-2">
                {item.title}
              </p>
              <img
                src={item.img}
                alt={item.title}
                className="w-[350px] h-[260px] object-cover rounded-2xl mx-auto"
              />
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Booking;
