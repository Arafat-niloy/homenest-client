import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthProvider';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddProperties = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { user } = useAuth();

  const onSubmit = async (data) => {
    const propertyData = {
      propertyName: data.propertyName,
      description: data.description,
      category: data.category,
      price: parseFloat(data.price),
      location: data.location,
      imageLink: data.imageLink,
      userEmail: user.email,
      userName: user.displayName,
      userPhoto: user.photoURL,
    };

    try {
      const response = await axios.post('https://homenest-server-one.vercel.app/properties', propertyData);
      if (response.data.insertedId) {
        toast.success("Property added successfully!");
        reset();
      }
    } catch (error) {
      console.error("Failed to add property:", error);
      toast.error("Failed to add property. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-10">
      <div className="max-w-4xl mx-auto bg-base-100 shadow-xl rounded-lg p-6 md:p-10">
        <h2 className="text-3xl font-bold text-center mb-8 text-primary">Add a New Property Listing</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Property Name</span>
            </label>
            <input 
              type="text" 
              placeholder="e.g., Cozy Downtown Apartment" 
              className="input input-bordered w-full" 
              {...register("propertyName", { required: "Property Name is required" })}
            />
            {errors.propertyName && <span className="text-red-500 text-xs mt-1">{errors.propertyName.message}</span>}
          </div>

          <div className="form-control space-x-4">
            <label className="label">
              <span className="label-text font-semibold">Description</span>
            </label>
            <textarea 
              className="textarea textarea-bordered h-24" 
              placeholder="Write a short description about the property..."
              {...register("description", { required: "Description is required" })}
            ></textarea>
            {errors.description && <span className="text-red-500 text-xs mt-1">{errors.description.message}</span>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Category</span>
              </label>
              <select 
                className="select select-bordered w-full"
                defaultValue=""
                {...register("category", { required: "Category is required" })}
              >
                <option value="" disabled>Select category</option>
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
                placeholder="e.g., 50000" 
                className="input input-bordered w-full" 
                {...register("price", { required: "Price is required", valueAsNumber: true, min: { value: 1, message: "Price must be positive" } })}
              />
              {errors.price && <span className="text-red-500 text-xs mt-1">{errors.price.message}</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Location</span>
              </label>
              <input 
                type="text" 
                placeholder="e.g., Dhaka, Gulshan" 
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
                placeholder="https://..." 
                className="input input-bordered w-full" 
                {...register("imageLink", { required: "Image Link is required" })}
              />
              {errors.imageLink && <span className="text-red-500 text-xs mt-1">{errors.imageLink.message}</span>}
            </div>
          </div>

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

          <div className="form-control mt-10">
            <button type="submit" className="btn btn-primary btn-lg w-full text-white">
              Add Property
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProperties;
