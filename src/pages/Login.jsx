import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthProvider.jsx';
import { motion } from 'framer-motion';
import { FcGoogle } from 'react-icons/fc'; 

// Animation Variants
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

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signIn, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleLogin = (data) => {
    signIn(data.email, data.password)
      .then(() => {
        toast.success("Login Successful!");
        navigate(from, { replace: true });
      })
      .catch(err => {
        if (err.code === 'auth/invalid-credential') {
          toast.error("Invalid email or password. Please try again.");
        } else {
          toast.error(err.message);
        }
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {
        toast.success("Login Successful!");
        navigate(from, { replace: true });
      })
      .catch(err => toast.error(err.message));
  };

  return (
    <div className="flex items-center justify-center min-h-screen  py-10 overflow-hidden">
      <motion.div
        className="flex items-center flex-col lg:flex-row-reverse lg:justify-between lg:gap-36"
        variants={containerVariant}
        initial="hidden"
        animate="visible"
      >
        {/* Text Section */}
        <motion.div className="text-center lg:text-left" variants={textVariant}>
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Welcome back to HomeNest. Access your account to manage your properties and ratings.
          </p>
        </motion.div>

        {/* Form Section */}
        <motion.div
          className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 lg:ml-32"
          variants={formVariant}
        >
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
              New to HomeNest?{" "}
              <Link to="/register" className="text-primary link link-hover">
                Register here
              </Link>
            </p>

            <div className="divider">OR</div>

            {/* Google Sign-In Button */}
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
    </div>
  );
};

export default Login;
