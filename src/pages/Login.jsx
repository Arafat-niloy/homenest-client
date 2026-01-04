import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthProvider.jsx';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc';
import { ShieldCheck, User, Mail, Lock } from 'lucide-react';

// Animation Variants
const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, duration: 0.5 },
  },
};

const textVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const formVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 100 },
  },
};

const Login = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { signIn, googleSignIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  // লগইন হ্যান্ডলার
  const handleLogin = (data) => {
    setLoading(true);
    signIn(data.email, data.password)
      .then(() => {
        toast.success("Welcome back to HomeNest!");
        navigate(from, { replace: true });
      })
      .catch(err => {
        const errorMessage = err.code === 'auth/invalid-credential' 
          ? "Invalid email or password." 
          : err.message;
        toast.error(errorMessage);
        setLoading(false);
      });
  };

  // গুগল সাইন-ইন
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {
        toast.success("Logged in with Google!");
        navigate(from, { replace: true });
      })
      .catch(err => toast.error(err.message));
  };

  // ডেমো ক্রেডেনশিয়াল অটো-ফিল ফাংশন
  const fillDemoCredentials = (role) => {
    if (role === 'admin') {
      setValue('email', 'admin@homenest.com');
      setValue('password', 'Admin123!');
    } else {
      setValue('email', 'user@demo.com');
      setValue('password', 'User123!');
    }
    toast.info(`${role.charAt(0).toUpperCase() + role.slice(1)} credentials filled!`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 px-4 py-12">
      <motion.div
        className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-6xl w-full"
        variants={containerVariant}
        initial="hidden"
        animate="visible"
      >
        {/* টেক্সট সেকশন */}
        <motion.div className="text-center lg:text-left lg:w-1/2" variants={textVariant}>
          <h1 className="text-5xl font-extrabold text-primary mb-6">Welcome Back!</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
            Log in to access your personalized dashboard, manage your property listings, and view reviews.
          </p>
          <div className="hidden lg:block">
             <div className="flex items-center gap-2 mb-2 text-secondary font-medium">
                <ShieldCheck size={20}/> <span>Secure and Encrypted Login</span>
             </div>
             <div className="flex items-center gap-2 text-secondary font-medium">
                <User size={20}/> <span>Role-based Dashboard Access</span>
             </div>
          </div>
        </motion.div>

        {/* ফর্ম সেকশন */}
        <motion.div
          className="card w-full max-w-md shadow-2xl bg-base-100 border border-base-300"
          variants={formVariant}
        >
          <div className="card-body">
            <h2 className="text-2xl font-bold text-center mb-6">Account Login</h2>
            
            <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
              {/* ইমেইল ফিল্ড */}
              <div className="form-control">
                <label className="label font-semibold">
                  <span className="label-text flex items-center gap-2"><Mail size={16}/> Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`input input-bordered ${errors.email ? 'input-error' : ''}`}
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && <span className="text-error text-xs mt-1">{errors.email.message}</span>}
              </div>

              {/* পাসওয়ার্ড ফিল্ড */}
              <div className="form-control">
                <label className="label font-semibold">
                  <span className="label-text flex items-center gap-2"><Lock size={16}/> Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className={`input input-bordered ${errors.password ? 'input-error' : ''}`}
                  {...register("password", { required: "Password is required" })}
                />
                {errors.password && <span className="text-error text-xs mt-1">{errors.password.message}</span>}
              </div>

              {/* সাবমিট বাটন */}
              <div className="form-control mt-6">
                <button 
                  type="submit" 
                  disabled={loading}
                  className={`btn btn-primary text-white w-full ${loading ? 'loading' : ''}`}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </div>
            </form>

            <div className="divider text-xs text-gray-400 uppercase">Demo Access</div>

            {/* ডেমো বাটন সেকশন (রিকয়ারমেন্ট অনুযায়ী) */}
            <div className="grid grid-cols-2 gap-3 mb-4">
               <button 
                onClick={() => fillDemoCredentials('user')}
                className="btn btn-sm btn-outline btn-accent"
               >User Demo</button>
               <button 
                onClick={() => fillDemoCredentials('admin')}
                className="btn btn-sm btn-outline btn-secondary"
               >Admin Demo</button>
            </div>

            <div className="divider">OR</div>

            {/* সোশ্যাল লগইন */}
            <button
              onClick={handleGoogleSignIn}
              className="btn btn-outline w-full flex items-center justify-center gap-2 hover:bg-base-200 transition-colors"
            >
              <FcGoogle className="text-2xl" /> 
              Continue with Google
            </button>

            <p className="text-center text-sm mt-8">
              New to HomeNest?{" "}
              <Link to="/register" className="text-primary font-bold link link-hover">
                Create an account
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;