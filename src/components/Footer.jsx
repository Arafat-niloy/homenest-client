// src/components/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer p-10 bg-neutral text-neutral-content mt-10">
            <aside>
                <h2 className="text-3xl font-bold">HomeNest</h2>
                <p>Your ideal partner in finding the perfect home.<br />Providing reliable real estate services since 2024</p>
                <p>Contact: support@homenest.com</p>
            </aside>
            <nav>
                <header className="footer-title">Services</header>
                <Link to="/all-properties" className="link link-hover">Browse Properties</Link>
                <Link to="/add-properties" className="link link-hover">Add Property</Link>
                <Link to="/" className="link link-hover">Home</Link>
            </nav>
            <nav>
                <header className="footer-title">Company</header>
                <a className="link link-hover">About us</a>
                <a className="link link-hover">Terms & Conditions</a>
                <a className="link link-hover">Privacy policy</a>
            </nav>
            <nav>
                <header className="footer-title">Social</header>
                <div className="grid grid-flow-col gap-4">
                    {/* X Logo */}
                    <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="link link-hover">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                        </svg>
                    </a>
                    {/* Facebook Logo */}
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="link link-hover">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z"></path>
                        </svg>
                    </a>
                </div>
            </nav>
        </footer>
    );
};

export default Footer;