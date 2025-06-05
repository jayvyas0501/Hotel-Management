import React from 'react'
import Button from './Button';

const services = [
  { id: 1, title: "Room Service", description: "Enjoy 24/7 room service with delicious meals.", image: "./Ourservices/photo-1641924676093-42e61835bbe2.avif" },
  { id: 2, title: "Metting Hall", description: "Stay connected with high-speed internet access.", image: "./Ourservices/meeting.avif" },
  { id: 3, title: "Swimming Pool", description: "Relax in our luxurious swimming pool.", image: "./Ourservices/swimingpool.png" },
  { id: 4, title: "Gym", description: "Stay fit at our gym.", image: "./Ourservices/gym.png" },
  { id: 5, title: "Spa", description: "Stay rejuvenate at our spa.", image: "./Ourservices/spa.png" },
  { id: 6, title: "Restaurant & Bar", description: "Experience exquisite dining and a wide selection of drinks at our restaurant and bar.", image: "./Ourservices/bar.png" }
];

const Divesion = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 gap-y-5 p-4 justify-items-center rounded-3xl">
      {services.map(service => (
        <div key={service.id} className="card w-96 bg-gray-600 p-2 shadow-xl">
          <h2 className="card-title p-5 text-center justify-center">{service.title}</h2>
          <figure>
            <img src={service.image} alt={service.title} className="w-full h-48 object-cover rounded-xl" />
          </figure>
          <div className="card-body">
            <p>{service.description}</p>
            <div className="card-actions justify-end">
              {/* Optional button or action here */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Divesion;
