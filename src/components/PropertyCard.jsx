import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const cardHoverEffect = {
  y: -10,
  scale: 1.03,
  transition: { type: "spring", stiffness: 300, damping: 15 },
};

const PropertyCard = ({ property }) => {
  const { _id, propertyName, category, price, location, imageLink, description, userName } = property;

  return (
    <motion.div 
      className="card border-none w-full bg-base-100 shadow-xl border flex flex-col"
      whileHover={cardHoverEffect}
    >
      <figure>
        <img 
          src={imageLink || '/images/slider1.jpg'} 
          alt={propertyName} 
          className="h-56 w-full object-cover" 
        />
      </figure>

      <div className="card-body p-6 flex-grow">
        {userName && (
          <div className="text-xs text-gray-500 mb-2">
            Posted by: <span className="font-semibold">{userName}</span>
          </div>
        )}
        
        <h2 className="card-title font-bold text-lg">{propertyName}</h2>
        <p className="text-gray-600">{location}</p>
        
        <p className="text-sm mt-2 flex-grow">
          {description.length > 100 ? `${description.substring(0, 100)}...` : description}
        </p>
        
        <div className="flex justify-between items-center mt-4">
          <span className="badge badge-primary badge-outline font-semibold">{category}</span>
          <span className="text-xl font-bold text-primary">${price.toLocaleString()}</span>
        </div>

        <div className="card-actions justify-end mt-4">
          <Link to={`/property-details/${_id}`}>
            <button className="btn btn-primary btn-sm text-white">View Details</button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
