import React from 'react';
import { cardcomponets } from '../../Constant';
import { Link } from 'react-router-dom';

const Roombooking = () => {
  return (
    <div className="p-10">
      <h1 className="text-5xl text-center font-extrabold font-serif text-blue-600 mb-10">
        Room Booking
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {cardcomponets.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transform transition duration-300 ease-in-out hover:scale-105 overflow-hidden"
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-60 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold font-serif text-gray-800 mb-2 text-center">
                {item.title}
              </h2>
              <p className="text-gray-600 text-center">
                Book your stay in our luxurious {item.title.toLowerCase()} room and enjoy top-notch comfort and service.
              </p>
              <div className="mt-4 flex justify-center">
               <Link to={item.link}><button className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out">
                  Book Now
                </button></Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roombooking;
