import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar'; // আমরা 'components' ফোল্ডারে Navbar বানাবো
import Footer from '../components/Footer'; // আমরা 'components' ফোল্ডারে Footer বানাবো

const MainLayout = () => {
    return (
        <div>
            <div className='bg-gradient-to-b from-[#c9d6ff80] to-[#e2e2e260]'>
                
                <Navbar />
            
            {/* পেজগুলো এখানে লোড হবে */}
            <main className="min-h-[calc(100vh-300px)]  "> 
                <Outlet />
            </main>
                </div>
                
            
            <Footer />
        </div>
    );
};

export default MainLayout;