import React from 'react';
import { Booking } from '../../Constant';
import { Link } from 'react-router-dom';

const Book = () => {
  return (
    <div className='grid grid-cols-2 grid-rows-1 gap-10 justify-self-center p-10'>
      {Booking.map((Serves) => (
        <Link to={Serves.link} key={Serves.Title}> {/* ✅ key moved to outermost element */}
          <div className='justify-self-center bg-blue-500 p-40 rounded-4xl transform transition-transform duration-300 hover:scale-105 shadow-lg hover:shadow-2xl cursor-pointer'>
            <h2 className='text-gray-100 text-5xl font-extrabold font-serif text-center'>
              {Serves.Title}
            </h2>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Book;
