// src/pages/Login/Login.jsx

import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthProvider.jsx';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signIn, googleSignIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // ইউজার যে পেজ থেকে লগইন পেজে এসেছে, লগইন শেষে তাকে সেই পেজেই ফেরত পাঠানো
    const from = location.state?.from?.pathname || '/';

    const handleLogin = (data) => {
        signIn(data.email, data.password)
            .then(result => {
                toast.success("Login Successful!");
                navigate(from, { replace: true });
            })
            .catch(err => {
                toast.error(err.message);
            });
    };

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                toast.success("Login Successful!");
                navigate(from, { replace: true });
            })
            .catch(err => toast.error(err.message));
    };

    return (
        <div className="hero min-h-screen bg-base-200 py-10">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left lg:ml-10">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Welcome back to HomeNest. Access your account to manage your properties and ratings.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(handleLogin)} className="card-body">
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
                            <button type="submit" className="btn btn-primary text-white">Login</button>
                        </div>
                    </form>
                    
                    {/* Bottom Links */}
                    <div className="card-body pt-0">
                        <p className="text-center text-sm">
                            New to HomeNest? <Link to="/register" className="text-primary link link-hover">Register here</Link>
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

export default Login;