// src/components/Footer.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    FaFacebookF, 
    FaInstagram, 
    FaPaperPlane, 
    FaArrowUp,
    
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { TbBuildingFortress } from "react-icons/tb";


// === Scroll-to-Top Button ===
const ScrollToTopButton = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => setVisible(window.scrollY > 300);
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        visible && (
            <button
                onClick={scrollToTop}
                className="fixed bottom-5 right-5 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
                aria-label="Scroll to top"
            >
                <FaArrowUp size={20} />
            </button>
        )
    );
};

// === Logo & Description Section ===
const LogoSection = () => (
    <div className="flex flex-col gap-4">
        <Link to="/" className="flex items-center gap-2 mb-2">
            <TbBuildingFortress className="text-4xl text-purple-400" />
            <span className="text-3xl font-bold text-white">HomeNest</span>
        </Link>
        <p className="text-gray-300">
            Your ideal partner in finding the perfect home. Reliable real estate services since 2024.
        </p>
        <p className="text-gray-400">
            25/2, New Market, Dhaka, 1205<br />Bangladesh
        </p>
        <div className="flex gap-3 mt-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white hover:bg-purple-600 transition-colors">
                <FaFacebookF />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white hover:bg-purple-600 transition-colors">
                <FaXTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white hover:bg-purple-600 transition-colors">
                <FaInstagram />
            </a>
        </div>
    </div>
);

// === Links Section ===
const LinksSection = ({ title, links }) => (
    <div>
        <h3 className="text-white font-semibold mb-2 uppercase">{title}</h3>
        <div className="w-12 h-0.5 bg-purple-600 mb-3"></div>
        <ul className="flex flex-col gap-2">
            {links.map((link, idx) => (
                link.to ? (
                    <li key={idx}>
                        <Link to={link.to} className="text-gray-300 hover:text-white">{link.label}</Link>
                    </li>
                ) : (
                    <li key={idx}>
                        <a href={link.href || "#"} className="text-gray-300 hover:text-white">{link.label}</a>
                    </li>
                )
            ))}
        </ul>
    </div>
);

// === Newsletter Section ===
const NewsletterSection = () => (
    <div>
        <h3 className="text-white font-semibold mb-2 uppercase">Newsletter</h3>
        <div className="w-12 h-0.5 bg-purple-600 mb-3"></div>
        <p className="text-gray-300 mb-3">Subscribe to our weekly Newsletter and receive updates via email.</p>
        <form onSubmit={(e) => e.preventDefault()} className="flex">
            <input
                type="email"
                placeholder="Your email"
                className="input w-full rounded-l-md bg-gray-800 text-white placeholder-gray-400 px-3 py-2"
            />
            <button type="submit" className="bg-purple-600 px-4 rounded-r-md text-white hover:bg-purple-700">
                <FaPaperPlane />
            </button>
        </form>
    </div>
);

// === Footer Component ===
const Footer = () => (
    <>
        <footer className="bg-[#1e2733] text-gray-400 p-10 grid grid-cols-1 md:grid-cols-4 gap-8">
            <LogoSection />
            <LinksSection 
                title="Customer Care"
                links={[
                    { label: 'Browse Properties', to: '/all-properties' },
                    { label: 'Ratings', to: '/my-ratings' },
                    { label: 'Build Wardrobes' },
    { label: 'Contact Us', to: '#' },
                ]}
            />
            <LinksSection 
                title="Category"
                links={[
                    { label: 'Add Property', to: '/add-properties' },
                    { label: 'Home Selling' },
                    { label: 'Interior Design', to: '/my-properties'  },
    { label: 'Terms & Conditions', to: '#' },
    { label: 'Privacy Policy', to: '#' }
                ]}
            />
            <NewsletterSection />
        </footer>

        <footer className="bg-[#1a222c] text-gray-500 text-center py-4">
            © {new Date().getFullYear()} HomeNest.
        </footer>

        <ScrollToTopButton />
    </>
);

export default Footer;
