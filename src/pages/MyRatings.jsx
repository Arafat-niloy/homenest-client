import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthProvider';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link } from 'react-router-dom';

const MyRatings = () => {
    const { user } = useAuth();
    const [myRatings, setMyRatings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyRatings = async () => {
            if (!user) return;
            setLoading(true);
            try {
                const response = await axios.get(`https://homenest-server-one.vercel.app/reviews/my/${user.email}`);
                setMyRatings(response.data);
            } catch (error) {
                console.error("Failed to fetch my ratings:", error);
            }
            setLoading(false);
        };

        fetchMyRatings();
    }, [user]);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="container mx-auto px-4 py-16 min-h-screen">
            <section className="text-center mb-12">
                <h2 className="text-4xl font-bold">My Ratings & Reviews</h2>
                <p className=" mt-2">
                    Here are all the reviews you have submitted for various properties.
                </p>
            </section>

            {myRatings.length === 0 ? (
                <p className="text-center text-xl">
                    You have not submitted any reviews yet.
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myRatings.map(review => (
                        <div key={review._id} className="card w-full bg-base-100 shadow-xl hover:shadow-2xl ">
                            <div className="card-body">
                                
                                <h3 className="card-title text-lg">
                                    <span className=" font-normal">Review for:</span> {review.propertyName}
                                </h3>

                                <p className="text-xs mb-2">
                                    Reviewed on: {new Date(review.createdAt).toLocaleDateString()}
                                </p>

                                <div className="rating rating-md">
                                    {[...Array(5)].map((_, i) => (
                                        <input
                                            key={i}
                                            type="radio"
                                            className="mask mask-star-2 bg-orange-400"
                                            disabled
                                            checked={i + 1 === review.rating}
                                        />
                                    ))}
                                </div>

                                <p className=" mt-4 italic">"{review.reviewText}"</p>

                                <div className="card-actions justify-end mt-4 border-t pt-4">
                                    <Link to={`/property-details/${review.propertyId}`}>
                                        <button className="btn btn-outline btn-primary btn-sm">
                                            View Property
                                        </button>
                                    </Link>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyRatings;
