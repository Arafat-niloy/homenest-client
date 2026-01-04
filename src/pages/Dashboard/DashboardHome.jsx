import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const DashboardHome = () => {
    // Demo data for professional look [cite: 62, 74]
    const data = [
        { name: 'Rent', count: 12 },
        { name: 'Sale', count: 8 },
        { name: 'Commercial', count: 5 },
        { name: 'Land', count: 3 },
    ];

    return (
        <div>
            <h2 className="text-3xl font-bold mb-8">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="stat bg-base-100 rounded-xl shadow-sm border border-base-200">
                    <div className="stat-title">My Listings</div>
                    <div className="stat-value text-primary">14</div>
                </div>
                <div className="stat bg-base-100 rounded-xl shadow-sm border border-base-200">
                    <div className="stat-title">Total Reviews</div>
                    <div className="stat-value text-secondary">28</div>
                </div>
            </div>

            <div className="bg-base-100 p-6 rounded-2xl shadow-sm border border-base-200 h-[400px]">
                <h3 className="text-xl font-bold mb-6 text-primary">Property Distribution</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#1E40AF" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
export default DashboardHome;