import React from 'react';
import { useLoaderData } from 'react-router-dom';
import ReviewSection from '../components/ReviewSection';

const PropertyDetails = () => {
    const property = useLoaderData();

    if (!property) {
        return <div className="text-center text-red-500 py-20">Failed to load property details.</div>;
    }

    const { 
        _id, 
        propertyName, 
        imageLink, 
        location, 
        price, 
        category, 
        description, 
        userName, 
        userEmail, 
        userPhoto 
    } = property;

    return (
        <div className="container mx-auto px-4 py-10">
            <div className="max-w-4xl mx-auto bg-base-100 shadow-xl rounded-lg overflow-hidden">

                {/* Property Image */}
                <img src={imageLink} alt={propertyName} className="w-full h-64 md:h-96 object-cover" />

                <div className="p-6 md:p-10">

                    {/* Title, Category, Price */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                        <h1 className="text-3xl font-bold text-primary mb-2 md:mb-0">{propertyName}</h1>
                        <span className="badge badge-lg badge-accent font-semibold">{category}</span>
                    </div>

                    <p className="text-2xl font-bold  mb-2">${price.toLocaleString()}</p>
                    <p className="text-lg  mb-6">{location}</p>

                    {/* Description */}
                    <h3 className="text-xl font-semibold mb-2">Description</h3>
                    <p className=" whitespace-pre-wrap">{description}</p>

                    {/* Posted By */}
                    <div className="divider">Posted By</div>
                    <div className="flex items-center space-x-4 p-4 bg-base-200 rounded-lg">
                        <div className="avatar">
                            <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img 
                                    src={userPhoto || 'https://i.ibb.co/T41PS9v/avatar-default.png'} 
                                    alt={userName} 
                                />
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg">{userName}</h4>
                            <p className="">{userEmail}</p>
                        </div>
                    </div>

                    {/* Reviews Section */}
                    <div className="divider mt-10">Ratings & Reviews</div>
                    <ReviewSection propertyId={_id} propertyName={propertyName} />
                </div>
            </div>
        </div>
    );
};

export default PropertyDetails;

