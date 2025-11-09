import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar'; // আমরা 'components' ফোল্ডারে Navbar বানাবো
import Footer from '../components/Footer'; // আমরা 'components' ফোল্ডারে Footer বানাবো

const MainLayout = () => {
    return (
        <div>
            <Navbar />
            
            {/* পেজগুলো এখানে লোড হবে */}
            <main className="min-h-[calc(100vh-300px)]"> 
                <Outlet />
            </main>
            
            <Footer />
        </div>
    );
};

export default MainLayout;