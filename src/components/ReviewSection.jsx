import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthProvider';
import axios from 'axios';
import { toast } from 'react-toastify';
import LoadingSpinner from './LoadingSpinner';
import { Link } from 'react-router-dom';

const ReviewSection = ({ propertyId, propertyName }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { user, loading: authLoading } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [loadingReviews, setLoadingReviews] = useState(true);

    const fetchReviews = async () => {
        setLoadingReviews(true);
        try {
            const response = await axios.get(`https://homenest-server-one.vercel.app/reviews/${propertyId}`);
            setReviews(response.data);
        } catch (error) {
            console.error("Failed to fetch reviews:", error);
        }
        setLoadingReviews(false);
    };

    useEffect(() => {
        fetchReviews();
    }, [propertyId]);

    const onSubmitReview = async (data) => {
        if (!user) {
            return toast.error("You must be logged in to leave a review.");
        }

        const reviewData = {
            propertyId: propertyId,
            propertyName: propertyName,
            reviewerName: user.displayName,
            reviewerEmail: user.email,
            reviewerPhoto: user.photoURL,
            rating: parseInt(data.rating),
            reviewText: data.reviewText,
        };

        try {
            const response = await axios.post('https://homenest-server-one.vercel.app/reviews', reviewData);
            if (response.data.insertedId) {
                toast.success("Review submitted successfully!");
                reset();
                fetchReviews();
            }
        } catch (error) {
            console.error("Failed to submit review:", error);
            toast.error("Failed to submit review.");
        }
    };

    if (authLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="mt-6">
            {/* Review Form */}
            {user ? (
                <form onSubmit={handleSubmit(onSubmitReview)} className="p-4 bg-base-200 rounded-lg shadow">
                    <h4 className="font-semibold text-lg mb-4">Leave Your Review</h4>

                    <div className="form-control mb-4 space-x-3">
                        <label className="label">
                            <span className="label-text">Rating (1 to 5)</span>
                        </label>

                        <div className="rating rating-lg">
                            <input type="radio" value="1" className="mask mask-star-2 bg-orange-400" {...register("rating", { required: "Rating is required" })} />
                            <input type="radio" value="2" className="mask mask-star-2 bg-orange-400" {...register("rating", { required: "Rating is required" })} />
                            <input type="radio" value="3" className="mask mask-star-2 bg-orange-400" {...register("rating", { required: "Rating is required" })} />
                            <input type="radio" value="4" className="mask mask-star-2 bg-orange-400" {...register("rating", { required: "Rating is required" })} />
                            <input type="radio" value="5" className="mask mask-star-2 bg-orange-400" {...register("rating", { required: "Rating is required" })} defaultChecked />
                        </div>
                        {errors.rating && <span className="text-red-500 text-xs mt-1">{errors.rating.message}</span>}
                    </div>

                    <div className="form-control mb-4 space-x-4">
                        <label className="label">
                            <span className="label-text">Review Text</span>
                        </label>
                        <textarea
                            className="textarea textarea-bordered h-24"
                            placeholder="Write your review..."
                            {...register("reviewText", { required: "Review text is required" })}
                        ></textarea>
                        {errors.reviewText && <span className="text-red-500 text-xs mt-1">{errors.reviewText.message}</span>}
                    </div>

                    <button type="submit" className="btn btn-primary text-white">Submit Review</button>
                </form>
            ) : (
                <p className="text-center p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
                    You must be <Link to="/login" className="font-bold text-primary link">logged in</Link> to leave a review.
                </p>
            )}

            {/* Reviews List */}
            <div className="mt-10">
                <h4 className="font-semibold text-lg mb-4">All Reviews ({reviews.length})</h4>

                {loadingReviews ? (
                    <LoadingSpinner />
                ) : (
                    <div className="space-y-6">
                        {reviews.length === 0 ? (
                            <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                        ) : (
                            reviews.map(review => (
                                <div key={review._id} className="p-4 border rounded-lg shadow-sm">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <div className="avatar">
                                            <div className="w-10 rounded-full">
                                                <img src={review.reviewerPhoto || 'https://i.ibb.co/T41PS9v/avatar-default.png'} alt={review.reviewerName} />
                                            </div>
                                        </div>
                                        <div>
                                            <span className="font-semibold">{review.reviewerName}</span>
                                            <span className="text-xs text-gray-500 ml-2">
                                                {new Date(review.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Rating Stars */}
                                    <div className="rating rating-sm mb-2">
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

                                    <p className="text-gray-700">{review.reviewText}</p>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewSection;
