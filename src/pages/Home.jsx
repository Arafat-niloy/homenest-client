import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { 
  Home as HomeIcon, Users, CheckCircle, MapPin, 
  ArrowRight, Mail, ChevronDown, Building, Landmark, TreePine 
} from "lucide-react";

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
        const response = await axios.get("https://homenest-server-one.vercel.app/properties/featured");
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
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const cardHoverEffect = {
    y: -10,
    transition: { type: "spring", stiffness: 300 }
  };

  return (
    <div className="bg-base-100 text-base-content overflow-x-hidden">
      
      {/* 1. Hero Carousel (Visual Hint সহ) */}
      <section className="relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          loop
          autoplay={{ delay: 4000 }}
          className="h-[70vh] md:h-[85vh]"
        >
          <SwiperSlide>
            <div className="relative h-full w-full">
              <img src="/images/slider1.jpg" alt="Home" className="object-cover h-full w-full brightness-50" />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6 text-center">
                <motion.h1 initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} className="text-4xl md:text-6xl font-bold">Find Your Dream Home</motion.h1>
                <p className="mt-4 text-lg max-w-xl">Discover the best properties for sale and rent in your preferred area.</p>
                <Link to="/all-properties" className="btn btn-primary mt-6 px-8">Explore Listings</Link>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative h-full w-full">
              <img src="/images/slider2.jpg" alt="Villa" className="object-cover h-full w-full brightness-50" />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6 text-center">
                <h1 className="text-4xl md:text-6xl font-bold">Invest in Luxury</h1>
                <p className="mt-4 text-lg max-w-xl">Premium villas and apartments designed for modern living.</p>
                <Link to="/all-properties" className="btn btn-secondary mt-6 px-8">View Premium</Link>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
        {/* Visual Hint to next section */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce text-white hidden md:block">
           <ChevronDown size={32} />
        </div>
      </section>

      {/* 2. Stats Section (অ্যাসাইনমেন্টের রিকয়ারমেন্ট অনুযায়ী) */}
      <section className="py-12 bg-primary text-primary-content">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div><h2 className="text-4xl font-bold">1500+</h2><p className="opacity-80">Total Listings</p></div>
          <div><h2 className="text-4xl font-bold">900+</h2><p className="opacity-80">Happy Families</p></div>
          <div><h2 className="text-4xl font-bold">45+</h2><p className="opacity-80">Awards Won</p></div>
          <div><h2 className="text-4xl font-bold">120+</h2><p className="opacity-80">Expert Agents</p></div>
        </div>
      </section>

      <div className="container mx-auto px-4 space-y-24 py-20">
        
        {/* 3. Featured Properties */}
        <motion.section variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Featured Real Estate</h2>
            <p className="max-w-2xl mx-auto text-gray-500">Handpicked properties that offer the best value and comfort.</p>
          </div>
          {loading ? <LoadingSpinner /> : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.slice(0, 6).map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </motion.section>

        {/* 4. Why Choose Us (Icons সহ) */}
        <motion.section variants={sectionVariant} initial="hidden" whileInView="visible" className="bg-base-200 p-12 rounded-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">Why HomeNest?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
               <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary"><HomeIcon size={30}/></div>
               <h3 className="font-bold text-xl mb-2">Verified Listings</h3>
               <p className="text-sm opacity-70">Every property on our platform is manually verified for security.</p>
            </div>
            <div className="text-center">
               <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-secondary"><CheckCircle size={30}/></div>
               <h3 className="font-bold text-xl mb-2">Fast Approval</h3>
               <p className="text-sm opacity-70">List your property and get it live within 24 hours.</p>
            </div>
            <div className="text-center">
               <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-accent"><Users size={30}/></div>
               <h3 className="font-bold text-xl mb-2">Expert Guidance</h3>
               <p className="text-sm opacity-70">Our agents guide you through legal and financial steps.</p>
            </div>
          </div>
        </motion.section>

        {/* 5. Top Categories */}
        <motion.section variants={sectionVariant} initial="hidden" whileInView="visible">
          <h2 className="text-3xl font-bold text-center mb-10">Explore by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Apartments", icon: <Building />, count: "450 Listings" },
              { name: "Villas", icon: <HomeIcon />, count: "210 Listings" },
              { name: "Commercial", icon: <Landmark />, count: "130 Listings" },
              { name: "Land/Plots", icon: <TreePine />, count: "95 Listings" },
            ].map((cat, i) => (
              <div key={i} className="p-6 border border-base-300 rounded-2xl hover:bg-base-200 transition-all cursor-pointer group">
                <div className="text-primary mb-3 group-hover:scale-110 transition-transform">{cat.icon}</div>
                <h4 className="font-bold">{cat.name}</h4>
                <p className="text-xs opacity-60">{cat.count}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 6. Top Agents */}
        <motion.section variants={sectionVariant} initial="hidden" whileInView="visible">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Specialized Agents</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Emily White", role: "Luxury Expert", img: "/images/agent1.jpg" },
              { name: "David Lee", role: "Commercial Specialist", img: "/images/agent2.jpg" },
              { name: "Chloe Brown", role: "Residential Expert", img: "/images/agent3.jpg" },
            ].map((agent, index) => (
              <motion.div key={index} whileHover={cardHoverEffect} className="card bg-base-100 shadow-xl overflow-hidden border border-base-200">
                <img src={agent.img} alt={agent.name} className="h-64 w-full object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-lg">{agent.name}</h3>
                  <p className="text-sm opacity-70">{agent.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 7. Sell Banner (CTA) */}
        <motion.section variants={sectionVariant} initial="hidden" whileInView="visible" className="relative h-64 rounded-3xl overflow-hidden shadow-2xl">
          <img src="/images/cta-bg.jpg" className="absolute inset-0 w-full h-full object-cover" alt="CTA" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex items-center px-10">
            <div className="text-white">
              <h2 className="text-3xl font-bold mb-2">Want to sell your property?</h2>
              <p className="mb-6 opacity-90">Join 5000+ owners who sold their homes through HomeNest.</p>
              <Link to="/add-properties" className="btn btn-primary gap-2">List Property <ArrowRight size={18}/></Link>
            </div>
          </div>
        </motion.section>

        {/* 8. Testimonials */}
        <motion.section variants={sectionVariant} initial="hidden" whileInView="visible">
          <h2 className="text-3xl font-bold mb-12 text-center">Client Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-base-200 rounded-2xl relative">
              <span className="text-6xl absolute top-4 right-6 opacity-10 font-serif">"</span>
              <p className="italic text-lg">"HomeNest made finding my new apartment incredibly easy. The search filters are truly next level."</p>
              <div className="mt-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                <div><h4 className="font-bold">Sarah Jenkins</h4><p className="text-xs">Home Buyer</p></div>
              </div>
            </div>
            <div className="p-8 bg-base-200 rounded-2xl relative">
               <span className="text-6xl absolute top-4 right-6 opacity-10 font-serif">"</span>
              <p className="italic text-lg">"The dashboard is so easy to use. I listed my house and got a buyer within just two weeks!"</p>
              <div className="mt-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                <div><h4 className="font-bold">Michael Ross</h4><p className="text-xs">Property Seller</p></div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 9. FAQ Section (Accordion) */}
        <motion.section variants={sectionVariant} initial="hidden" whileInView="visible" className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Common Questions</h2>
          <div className="join join-vertical w-full bg-base-200">
            <div className="collapse collapse-arrow join-item border border-base-300">
              <input type="radio" name="faq-accordion" defaultChecked /> 
              <div className="collapse-title text-xl font-medium">Is HomeNest free to use?</div>
              <div className="collapse-content"><p>Browsing and searching for properties is completely free. We only charge a small fee for premium listings.</p></div>
            </div>
            <div className="collapse collapse-arrow join-item border border-base-300">
              <input type="radio" name="faq-accordion" /> 
              <div className="collapse-title text-xl font-medium">How do I contact an agent?</div>
              <div className="collapse-content"><p>Click on any property detail page, and you will find a "Contact Agent" button to send an inquiry.</p></div>
            </div>
            <div className="collapse collapse-arrow join-item border border-base-300">
              <input type="radio" name="faq-accordion" /> 
              <div className="collapse-title text-xl font-medium">Can I list rental properties?</div>
              <div className="collapse-content"><p>Yes, HomeNest supports both Sale and Rental categories for all types of real estate.</p></div>
            </div>
          </div>
        </motion.section>

        {/* 10. Newsletter Section */}
        <motion.section variants={sectionVariant} initial="hidden" whileInView="visible" className="bg-primary rounded-3xl p-10 text-primary-content text-center">
          <Mail size={48} className="mx-auto mb-4 opacity-80" />
          <h2 className="text-3xl font-bold mb-2">Subscribe to our Newsletter</h2>
          <p className="mb-8 opacity-80">Get the latest property deals and market trends right in your inbox.</p>
          <div className="flex flex-col md:flex-row max-w-lg mx-auto gap-3">
            <input type="email" placeholder="Enter your email" className="input input-bordered w-full text-base-content" />
            <button className="btn btn-neutral px-8">Subscribe</button>
          </div>
        </motion.section>

      </div>
    </div>
  );
};

export default Home;