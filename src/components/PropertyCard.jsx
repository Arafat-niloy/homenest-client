import React from 'react';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
    const { _id, propertyName, category, price, location, imageLink, description, userName } = property;

    return (
        <div className="card w-full bg-base-100 shadow-xl border flex flex-col">
            <figure>
                <img src={imageLink} alt={propertyName} className="h-56 w-full object-cover" />
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
        </div>
    );
};

export default PropertyCard;
