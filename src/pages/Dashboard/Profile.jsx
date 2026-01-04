import React from 'react';
import { useAuth } from '../../contexts/AuthProvider';
import { Mail, UserCircle, ShieldCheck, Calendar } from 'lucide-react';

const Profile = () => {
    const { user } = useAuth();

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">My Profile</h2>
            
            <div className="bg-base-100 rounded-3xl shadow-xl overflow-hidden border border-base-200">
                {/* Profile Header Background */}
                <div className="h-32 bg-gradient-to-r from-primary to-secondary"></div>
                
                <div className="px-8 pb-8">
                    <div className="relative -mt-16 mb-6">
                        <img 
                            src={user?.photoURL || "https://via.placeholder.com/150"} 
                            alt="Profile" 
                            className="w-32 h-32 rounded-full border-4 border-base-100 object-cover shadow-lg"
                        />
                        <span className="absolute bottom-2 left-24 bg-green-500 border-2 border-base-100 w-5 h-5 rounded-full"></span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm text-gray-400 flex items-center gap-1"><UserCircle size={14}/> Full Name</label>
                                <p className="text-xl font-semibold">{user?.displayName || "N/A"}</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-400 flex items-center gap-1"><Mail size={14}/> Email Address</label>
                                <p className="text-lg">{user?.email}</p>
                            </div>
                        </div>

                        <div className="space-y-4 border-l pl-0 md:pl-8 border-base-200">
                            <div>
                                <label className="text-sm text-gray-400 flex items-center gap-1"><ShieldCheck size={14}/> Account Status</label>
                                <p className="badge badge-success text-white">Verified User</p>
                            </div>
                            <div>
                                <label className="text-sm text-gray-400 flex items-center gap-1"><Calendar size={14}/> Last Login</label>
                                <p className="text-gray-500">{user?.metadata?.lastSignInTime?.slice(0, 16) || "Today"}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 pt-6 border-t border-base-200">
                        <button className="btn btn-primary px-8">Edit Profile</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;