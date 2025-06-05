import React from "react";
import { Link } from "react-router-dom";
import { roomsData } from "../../Constant";
import {
  Wifi,
  Tv,
  Utensils,
  Snowflake,
  ShowerHead,
  Bell,
} from "lucide-react";

const SingleRoom = () => {
  return (
    <div className="p-6 flex gap-6 max-w-7xl mx-auto min-h-[90vh] h-[90vh]">
      {/* Left: Scrollable Room List */}
      <div className="w-1/2 h-full overflow-y-auto bg-white rounded-2xl shadow-md p-4 space-y-6">
        {roomsData.map((room) => (
          <div
            key={room.id}
            className="flex items-start gap-6 p-6 bg-gray-100 rounded-2xl shadow hover:shadow-lg transition min-h-[200px]"
          >
            <img
              src={room.image}
              alt={room.title}
              className="w-40 h-40 object-cover rounded-xl shadow"
            />
            <div className="flex-1">
              <h3 className="font-bold text-2xl text-gray-800"></h3>
              <p className="text-xl text-gray-950 font-bold mb-1">{room.type}</p>
              <p className="text-2xl text-green-600 font-bold my-2">₹{room.price}</p>
              <p className="text-md text-gray-500 mb-3 line-clamp-3">{room.description}</p>
              <Link
                to={`/singleroom`}>
               <button className="inline-block bg-blue-500 text-white px-6 py-2 rounded-xl text-sm hover:bg-gray-800 transition">
                Book Now</button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Right: Hotel Info */}
      <div className="w-1/2 h-full bg-gray-100 rounded-2xl shadow-md p-10 flex flex-col justify-between overflow-y-auto">
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Dazzling Dice Hotel
          </h2>
          <p className="text-gray-700 text-lg mb-6 leading-relaxed">
            Nestled in the heart of the city, Dazzling Dice offers a luxurious and peaceful experience
            for all our guests. Whether you're here for business, relaxation, or a family vacation,
            we ensure your stay is unforgettable with top-notch services and elegant rooms.
          </p>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-gray-700 mb-3">
              Our Facilities Include:
            </h3>
            <ul className="grid grid-cols-2 gap-4 text-gray-700 text-base">
              <li className="flex items-center gap-2">
                <Wifi className="text-green-600 w-5 h-5" />
                Free High-Speed Wi-Fi
              </li>
              <li className="flex items-center gap-2">
                <Tv className="text-blue-500 w-5 h-5" />
                Smart LED TV
              </li>
              <li className="flex items-center gap-2">
                <Utensils className="text-orange-500 w-5 h-5" />
                Complimentary Breakfast
              </li>
              <li className="flex items-center gap-2">
                <Snowflake className="text-cyan-500 w-5 h-5" />
                Air Conditioning
              </li>
              <li className="flex items-center gap-2">
                <ShowerHead className="text-purple-500 w-5 h-5" />
                24/7 Hot Water
              </li>
              <li className="flex items-center gap-2">
                <Bell className="text-pink-500 w-5 h-5" />
                Room Service
              </li>
            </ul>
          </div>
        </div>

        <p className="text-gray-600 text-base mt-4">
          Book your room today and enjoy the luxury experience at Dazzling Dice. Your comfort is our priority.
        </p>
      </div>
    </div>
  );
};

export default SingleRoom;
