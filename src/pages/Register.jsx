import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthProvider.jsx';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { User, Mail, Lock, Image as ImageIcon, Eye, EyeOff } from 'lucide-react';

// Animation Variants (Login পেজের সাথে মিল রেখে)
const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, duration: 0.5 },
  },
};

const textVariant = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 },
  },
};

const formVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 100 },
  },
};

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createUser, updateUserProfile, googleSignIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (data) => {
    setLoading(true);
    
    createUser(data.email, data.password)
      .then(() => {
        updateUserProfile(data.name, data.photoURL)
          .then(() => {
            toast.success("Account Created Successfully!");
            navigate('/');
          })
          .catch(err => {
            toast.error(err.message);
            setLoading(false);
          });
      })
      .catch(err => {
        if (err.code === 'auth/email-already-in-use') {
          toast.error("This email is already registered. Please login.");
        } else {
          toast.error(err.message);
        }
        setLoading(false);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {
        toast.success("Login Successful!");
        navigate('/');
      })
      .catch(err => toast.error(err.message));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-12 overflow-hidden">
      <motion.div
        className="flex flex-col lg:flex-row-reverse items-center justify-center gap-12 max-w-6xl w-full"
        variants={containerVariant}
        initial="hidden"
        animate="visible"
      >
        {/* Text Section */}
        <motion.div className="text-center lg:text-left lg:w-1/2" variants={textVariant}>
          <h1 className="text-5xl font-extrabold text-primary mb-6">Create Account!</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-md">
            Join HomeNest today to explore premium properties, save your favorites, and manage your real estate journey.
          </p>
          <ul className="hidden lg:block space-y-3">
             <li className="flex items-center gap-2 text-secondary font-medium"><ImageIcon size={18}/> Custom Profile Setup</li>
             <li className="flex items-center gap-2 text-secondary font-medium"><Lock size={18}/> Secure Data Encryption</li>
             <li className="flex items-center gap-2 text-secondary font-medium"><User size={18}/> Personalized Dashboard</li>
          </ul>
        </motion.div>

        {/* Form Section */}
        <motion.div
          className="card w-full max-w-md shadow-2xl bg-base-100 border border-base-300"
          variants={formVariant}
        >
          <form onSubmit={handleSubmit(handleRegister)} className="card-body">
            <h2 className="text-2xl font-bold text-center mb-4">Registration</h2>
            
            {/* Name Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2"><User size={16}/> Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className={`input input-bordered ${errors.name ? 'input-error' : ''}`}
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <span className="text-error text-xs mt-1">{errors.name.message}</span>}
            </div>

            {/* Photo URL Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2"><ImageIcon size={16}/> Photo URL</span>
              </label>
              <input
                type="text"
                placeholder="https://example.com/photo.jpg"
                className={`input input-bordered ${errors.photoURL ? 'input-error' : ''}`}
                {...register("photoURL", { required: "Photo URL is required" })}
              />
              {errors.photoURL && <span className="text-error text-xs mt-1">{errors.photoURL.message}</span>}
            </div>

            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2"><Mail size={16}/> Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className={`input input-bordered ${errors.email ? 'input-error' : ''}`}
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <span className="text-error text-xs mt-1">{errors.email.message}</span>}
            </div>

            {/* Password Field with Validation Logic */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold flex items-center gap-2"><Lock size={16}/> Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  className={`input input-bordered w-full ${errors.password ? 'input-error' : ''}`}
                  {...register("password", { 
                    required: "Password is required",
                    minLength: { value: 6, message: "At least 6 characters" },
                    pattern: {
                      value: /(?=.*[A-Z])(?=.*[a-z])/,
                      message: "Must have 1 uppercase & 1 lowercase letter"
                    }
                  })}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400"
                >
                  {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                </button>
              </div>
              {errors.password && <span className="text-error text-xs mt-1">{errors.password.message}</span>}
            </div>

            {/* Register Button with Loading State */}
            <div className="form-control mt-6">
              <button 
                type="submit" 
                disabled={loading}
                className="btn btn-primary text-white w-full"
              >
                {loading ? <span className="loading loading-spinner"></span> : "Create Account"}
              </button>
            </div>

            <p className="text-center text-sm mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-bold link link-hover">
                Login here
              </Link>
            </p>

            <div className="divider text-xs text-gray-400">OR</div>

            {/* Google Social Register */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="btn btn-outline w-full flex items-center justify-center gap-2 hover:bg-base-200"
            >
              <FcGoogle className="text-2xl" /> 
              Register with Google
            </button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;