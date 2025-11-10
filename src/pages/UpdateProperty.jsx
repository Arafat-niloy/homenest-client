import React from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthProvider';

const UpdateProperty = () => {
    const property = useLoaderData();
    const { user } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            propertyName: property.propertyName,
            description: property.description,
            category: property.category,
            price: property.price,
            location: property.location,
            imageLink: property.imageLink,
        }
    });

    const onSubmit = async (data) => {
        const updatedPropertyData = {
            propertyName: data.propertyName,
            description: data.description,
            category: data.category,
            price: parseFloat(data.price),
            location: data.location,
            imageLink: data.imageLink,
        };

        try {
            const response = await axios.put(`http://localhost:5000/properties/${id}`, updatedPropertyData);
            
            if (response.data.modifiedCount > 0) {
                toast.success("Property updated successfully!");
                navigate(`/property-details/${id}`);
            } else {
                toast.info("No changes were made to the property.");
            }
        } catch (error) {
            console.error("Failed to update property:", error);
            toast.error("Failed to update property. Please try again.");
        }
    };

    return (
        <div className="container mx-auto p-4 md:p-10 bg-base-200">
            <div className="max-w-4xl mx-auto bg-base-100 shadow-xl rounded-lg p-6 md:p-10">
                <h2 className="text-3xl font-bold text-center mb-8 text-primary">Update Property Information</h2>
                <h3 className="text-xl text-center mb-8">{property.propertyName}</h3>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    {/* Property Name */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Property Name</span>
                        </label>
                        <input 
                            type="text" 
                            className="input input-bordered w-full" 
                            {...register("propertyName", { required: "Property Name is required" })}
                        />
                        {errors.propertyName && <span className="text-red-500 text-xs mt-1">{errors.propertyName.message}</span>}
                    </div>

                    {/* Description */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Description</span>
                        </label>
                        <textarea 
                            className="textarea textarea-bordered h-24" 
                            {...register("description", { required: "Description is required" })}
                        ></textarea>
                        {errors.description && <span className="text-red-500 text-xs mt-1">{errors.description.message}</span>}
                    </div>

                    {/* Category & Price */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Category</span>
                            </label>
                            <select 
                                className="select select-bordered w-full"
                                {...register("category", { required: "Category is required" })}
                            >
                                <option value="Rent">Rent</option>
                                <option value="Sale">Sale</option>
                                <option value="Commercial">Commercial</option>
                                <option value="Land">Land</option>
                            </select>
                            {errors.category && <span className="text-red-500 text-xs mt-1">{errors.category.message}</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Price ($)</span>
                            </label>
                            <input 
                                type="number" 
                                className="input input-bordered w-full" 
                                {...register("price", { required: "Price is required", valueAsNumber: true, min: { value: 1, message: "Price must be positive" } })}
                            />
                            {errors.price && <span className="text-red-500 text-xs mt-1">{errors.price.message}</span>}
                        </div>
                    </div>

                    {/* Location & Image Link */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Location</span>
                            </label>
                            <input 
                                type="text" 
                                className="input input-bordered w-full" 
                                {...register("location", { required: "Location is required" })}
                            />
                            {errors.location && <span className="text-red-500 text-xs mt-1">{errors.location.message}</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Image Link</span>
                            </label>
                            <input 
                                type="url" 
                                className="input input-bordered w-full" 
                                {...register("imageLink", { required: "Image Link is required" })}
                            />
                            {errors.imageLink && <span className="text-red-500 text-xs mt-1">{errors.imageLink.message}</span>}
                        </div>
                    </div>

                    {/* Read-only User Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">User Name (Posted by)</span>
                            </label>
                            <input 
                                type="text" 
                                value={user?.displayName || ''} 
                                readOnly 
                                className="input input-bordered input-disabled w-full bg-base-200"
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">User Email</span>
                            </label>
                            <input 
                                type="email" 
                                value={user?.email || ''} 
                                readOnly 
                                className="input input-bordered input-disabled w-full bg-base-200"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="form-control mt-10">
                        <button type="submit" className="btn btn-primary btn-lg w-full text-white">
                            Update Property
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default UpdateProperty;
