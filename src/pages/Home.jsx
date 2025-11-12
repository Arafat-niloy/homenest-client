import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import PropertyCard from "../components/PropertyCard";
import LoadingSpinner from "../components/LoadingSpinner";

const Home = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await axios.get("http://localhost:5000/properties/featured");
        setFeaturedProperties(response.data);
      } catch (error) {
        console.error("Failed to fetch featured properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const sectionVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div>
      {/* Hero Carousel */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="h-[60vh] md:h-[80vh] text-center"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative h-full w-full">
            <img
              src="/images/slider1.jpg"
              alt="Modern House"
              className="object-cover h-full w-full brightness-75"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
              <h1 className="text-3xl md:text-5xl font-bold">Find Your Dream Home</h1>
              <p className="mt-4 text-lg md:text-xl">
                Discover the best properties for sale and rent in your area.
              </p>
              <Link to="/all-properties">
                <button className="btn btn-primary mt-6 text-white">Explore Now</button>
              </Link>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative h-full w-full">
            <img
              src="/images/slider2.jpg"
              alt="Luxury Villa"
              className="object-cover h-full w-full brightness-75"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
              <h1 className="text-3xl md:text-5xl font-bold">List Your Property With Us</h1>
              <p className="mt-4 text-lg md:text-xl">
                Reach thousands of potential buyers and tenants easily.
              </p>
              <Link to="/add-properties">
                <button className="btn btn-primary mt-6 text-white">Add Listing</button>
              </Link>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="relative h-full w-full">
            <img
              src="/images/slider3.jpg"
              alt="Apartment Interior"
              className="object-cover h-full w-full brightness-75"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
              <h1 className="text-3xl md:text-5xl font-bold">Expert Agents Available</h1>
              <p className="mt-4 text-lg md:text-xl">
                Our trusted agents are here to guide you every step.
              </p>
              <a href="mailto:support@homenest.com">
                <button className="btn btn-primary mt-6 text-white">Contact Us</button>
              </a>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Main Sections */}
      <div className="container mx-auto px-4 py-16">
        {/* Featured Properties */}
        <motion.section
          className="text-center"
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl font-bold mb-4">Featured Real Estate</h2>
          <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
            Check out our latest and most popular properties that have just been listed.
          </p>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </motion.section>

        {/* Why Choose Us */}
        <motion.section
          className="mt-20 py-16 bg-base-200 rounded-lg"
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="text-center mb-12 px-4">
            <h2 className="text-3xl font-bold">Why Choose HomeNest?</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              We provide a seamless and trustworthy experience for all your real estate needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
            <div className="card bg-base-100 shadow-md p-6 text-center">
              <h3 className="font-bold text-xl text-primary mb-3">Wide Range of Properties</h3>
              <p>
                From luxury villas to cozy apartments, we have listings to match every budget and
                lifestyle.
              </p>
            </div>
            <div className="card bg-base-100 shadow-md p-6 text-center">
              <h3 className="font-bold text-xl text-primary mb-3">Trusted by Thousands</h3>
              <p>
                Our platform is the top choice for buyers, sellers, and renters looking for
                reliability.
              </p>
            </div>
            <div className="card bg-base-100 shadow-md p-6 text-center">
              <h3 className="font-bold text-xl text-primary mb-3">Easy & Secure</h3>
              <p>
                A user-friendly interface combined with top-tier security for your peace of mind.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Testimonials */}
        <motion.section
          className="mt-20 text-center"
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl font-bold mb-10">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 border rounded-lg shadow-sm bg-base-100">
              <p className="italic">
                "HomeNest made finding my new apartment incredibly easy! The search filters are
                amazing and I found exactly what I was looking for."
              </p>
              <h4 className="font-bold mt-4">- Sarah J. (Tenant)</h4>
            </div>
            <div className="p-6 border rounded-lg shadow-sm bg-base-100">
              <p className="italic">
                "Selling my property was a breeze. I listed it on HomeNest and received multiple
                offers within the first week."
              </p>
              <h4 className="font-bold mt-4">- Michael B. (Seller)</h4>
            </div>
          </div>
        </motion.section>

        {/* Agents Section */}
        <motion.section
          className="mt-20 text-center"
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl font-bold mb-10">Meet Our Top Agents</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Emily White", role: "Senior Agent, Luxury Homes", img: "/images/agent1.png" },
              { name: "David Lee", role: "Commercial Properties Expert", img: "/images/agent2.png" },
              { name: "Chloe Brown", role: "Rental Specialist", img: "/images/agent3.png" },
            ].map((agent, index) => (
              <motion.div
                key={index}
                className="card card-compact bg-base-100 shadow-md"
                variants={sectionVariant}
              >
                <figure>
                  <img src={agent.img} alt={agent.name} className="h-64 w-full object-cover" />
                </figure>
                <div className="card-body">
                  <h3 className="font-bold text-lg">{agent.name}</h3>
                  <p>{agent.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Home;
