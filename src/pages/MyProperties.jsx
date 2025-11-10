import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthProvider';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyProperties = () => {
    const { user } = useAuth();
    const [myProperties, setMyProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMyProperties = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/properties/my?email=${user.email}`);
            setMyProperties(response.data);
        } catch (error) {
            console.error("Failed to fetch my properties:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchMyProperties();
    }, [user]);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/properties/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your property has been deleted.',
                                'success'
                            );
                            const remaining = myProperties.filter(prop => prop._id !== id);
                            setMyProperties(remaining);
                        }
                    })
                    .catch(err => {
                        console.error("Delete failed:", err);
                        Swal.fire('Error!', 'Could not delete property.', 'error');
                    });
            }
        });
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="container mx-auto px-4 py-16 min-h-screen">
            <section className="text-center mb-12">
                <h2 className="text-4xl font-bold">My Properties</h2>
                <p className="text-gray-600 mt-2">
                    Here are all the properties you have listed on HomeNest.
                </p>
            </section>

            {myProperties.length === 0 ? (
                <p className="text-center text-xl text-gray-500">
                    You have not added any properties yet.
                    <Link to="/add-properties" className="text-primary link ml-2">Add one now!</Link>
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {myProperties.map(property => (
                        <div key={property._id} className="card w-full bg-base-100 shadow-xl border">
                            <figure>
                                <img 
                                    src={property.imageLink} 
                                    alt={property.propertyName} 
                                    className="h-56 w-full object-cover" 
                                />
                            </figure>

                            <div className="card-body p-6">
                                <h2 className="card-title font-bold text-lg">{property.propertyName}</h2>
                                <p className="text-gray-600">{property.location}</p>
                                <span className="text-xl font-bold text-primary">${property.price.toLocaleString()}</span>

                                <p className="text-xs text-gray-500 mt-2">
                                    Posted: {new Date(property.createdAt).toLocaleDateString()}
                                </p>

                                <div className="card-actions justify-end mt-4 border-t pt-4">
                                    <Link to={`/property-details/${property._id}`}>
                                        <button className="btn btn-outline btn-primary btn-sm">Details</button>
                                    </Link>

                                    <Link to={`/update-property/${property._id}`}>
                                        <button className="btn btn-info btn-sm text-white">Update</button>
                                    </Link>

                                    <button 
                                        onClick={() => handleDelete(property._id)}
                                        className="btn btn-error btn-sm text-white"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyProperties;
