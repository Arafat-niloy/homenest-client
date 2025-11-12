import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthProvider.jsx';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc'; 


const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, duration: 0.5 },
  },
};

const textVariant = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 100 },
  },
};

const formVariant = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 100 },
  },
};

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createUser, updateUserProfile, googleSignIn } = useAuth();
  const navigate = useNavigate();

  const handleRegister = (data) => {
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
      .then(() => {
        updateUserProfile(data.name, data.photoURL)
          .then(() => {
            toast.success("Registration Successful!");
            navigate('/');
          })
          .catch(err => toast.error(err.message));
      })
      .catch(err => {
        if (err.code === 'auth/email-already-in-use') {
          toast.error("This email is already registered. Please login.");
        } else {
          toast.error(err.message);
        }
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
    <motion.div
      className="flex items-center justify-center py-10 flex-col lg:flex-row-reverse lg:gap-32"
      variants={containerVariant}
      initial="hidden"
      animate="visible"
    >
      {/* Text Section */}
      <motion.div className="text-center lg:text-left" variants={textVariant}>
        <h1 className="text-5xl font-bold">Register now!</h1>
        <p className="py-6 max-w-md">
          Join HomeNest today. Find your dream property or list your own with ease.
        </p>
      </motion.div>

      {/* Form Card */}
      <motion.div
        className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
        variants={formVariant}
      >
        <form onSubmit={handleSubmit(handleRegister)} className="card-body">
          {/* Name */}
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

          {/* Photo URL */}
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

          {/* Email */}
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

          {/* Password */}
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

          {/* Submit */}
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary text-white">Register</button>
          </div>
        </form>

        {/* Bottom Links */}
        <div className="card-body pt-0">
          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-primary link link-hover">
              Login here
            </Link>
          </p>
          <div className="divider">OR</div>

          {/* Google Button */}
          <button
            onClick={handleGoogleSignIn}
            className="btn btn-outline btn-primary flex items-center justify-center gap-2"
          >
              <FcGoogle className="text-2xl" /> 
            Login with Google
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Register;
