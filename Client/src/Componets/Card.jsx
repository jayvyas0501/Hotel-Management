import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Card = ({ image, title, btn }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (user) {
      navigate('/roombooking');
    } else {
      // 👇 Redirect to login and save desired path in location state
      navigate('/login', { state: { from: '/roombooking' } });
    }
  };

  return (
    <div className="card bg-base-100 w-96 shadow-lg hover:shadow-xl transition duration-300">
      <figure>
        <img src={image} alt={title} className="w-full h-60 object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={handleClick}>
            {btn}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
