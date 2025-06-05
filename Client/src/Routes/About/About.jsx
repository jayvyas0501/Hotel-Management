import React from "react";

const About = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 py-16 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl lg:text-6xl font-extrabold text-blue-700 font-serif mb-6">
          About Dazzling Dice
        </h1>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-10 leading-relaxed">
          Welcome to <span className="font-bold text-blue-600">Dazzling Dice</span> – a symbol of elegance, luxury, and unforgettable hospitality. Nestled in the heart of the city, our hotel offers an immersive experience combining comfort, style, and warmth. Whether you're a traveler seeking relaxation or a business guest in need of convenience, Dazzling Dice is your perfect destination.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
          <div className="bg-white rounded-3xl shadow-xl p-6 hover:scale-105 transform transition duration-300 ease-in-out">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Our Vision</h2>
            <p className="text-gray-600">
              To be the most preferred hotel in the region, recognized for exceptional service, innovation, and unmatched guest experiences.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6 hover:scale-105 transform transition duration-300 ease-in-out">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Our Mission</h2>
            <p className="text-gray-600">
              At Dazzling Dice, we strive to provide a welcoming environment, luxurious accommodations, and personalized service to ensure every guest feels at home.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6 hover:scale-105 transform transition duration-300 ease-in-out">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Why Choose Us?</h2>
            <ul className="text-gray-600 list-disc list-inside space-y-2">
              <li>Luxurious and modern rooms</li>
              <li>24/7 professional service</li>
              <li>Fine dining and café experiences</li>
              <li>Elegant event and banquet halls</li>
              <li>Affordable packages and seasonal deals</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-blue-600 mb-4">Experience the Dazzle</h3>
          <p className="text-gray-700 text-lg leading-relaxed">
            Every corner of Dazzling Dice is designed with attention to detail and a touch of grandeur. From our warm hospitality and aesthetic interiors to our world-class facilities and serene ambiance – every moment here is meant to make your stay magical.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
