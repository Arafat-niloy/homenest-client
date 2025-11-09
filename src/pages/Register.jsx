// src/pages/Register/Register.jsx

import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthProvider.jsx';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUserProfile, googleSignIn } = useAuth();
    const navigate = useNavigate();

    const handleRegister = (data) => {
        // পাসওয়ার্ড ভ্যালিডেশন
        if (data.password.length < 6) {
            return toast.error("Password must be at least 6 characters");
        }
        if (!/(?=.*[A-Z])/.test(data.password)) {
            return toast.error("Password must have one Uppercase letter");
        }
        if (!/(?=.*[a-z])/.test(data.password)) {
            return toast.error("Password must have one Lowercase letter");
        }

        createUser(data.email, data.password)
            .then(result => {
                // প্রোফাইল আপডেট
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        toast.success("Registration Successful!");
                        navigate('/'); // হোম পেজে রিডাইরেক্ট
                    })
                    .catch(err => toast.error(err.message));
            })
            .catch(err => toast.error(err.message));
    };

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                toast.success("Login Successful!");
                navigate('/');
            })
            .catch(err => toast.error(err.message));
    };

    return (
        <div className="hero min-h-screen bg-base-200 py-10">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left lg:ml-10">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                    <p className="py-6">Join HomeNest today. Find your dream property or list your own with ease.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(handleRegister)} className="card-body">
                        {/* Name Field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input 
                                type="text" 
                                placeholder="Your Name" 
                                className="input input-bordered" 
                                {...register("name", { required: "Name is required" })} 
                            />
                            {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name.message}</span>}
                        </div>
                        
                        {/* Photo URL Field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input 
                                type="text" 
                                placeholder="http://example.com/photo.jpg" 
                                className="input input-bordered" 
                                {...register("photoURL", { required: "Photo URL is required" })} 
                            />
                            {errors.photoURL && <span className="text-red-500 text-xs mt-1">{errors.photoURL.message}</span>}
                        </div>

                        {/* Email Field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input 
                                type="email" 
                                placeholder="email" 
                                className="input input-bordered" 
                                {...register("email", { required: "Email is required" })} 
                            />
                            {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
                        </div>

                        {/* Password Field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input 
                                type="password" 
                                placeholder="password" 
                                className="input input-bordered" 
                                {...register("password", { required: "Password is required" })} 
                            />
                            {errors.password && <span className="text-red-500 text-xs mt-1">{errors.password.message}</span>}
                        </div>

                        {/* Submit Button */}
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary text-white">Register</button>
                        </div>
                    </form>
                    
                    {/* Bottom Links */}
                    <div className="card-body pt-0">
                        <p className="text-center text-sm">
                            Already have an account? <Link to="/login" className="text-primary link link-hover">Login here</Link>
                        </p>
                        <div className="divider">OR</div>
                        <button onClick={handleGoogleSignIn} className="btn btn-outline btn-primary">
                            Login with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;