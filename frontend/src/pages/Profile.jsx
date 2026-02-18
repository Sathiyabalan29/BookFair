import React, { useEffect, useState } from 'react';
import authService from '../services/authService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faBuilding, faIdCard, faMapMarkerAlt, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const currentUser = authService.getCurrentUser();
        setUser(currentUser);
    }, []);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-xl text-gray-600">Loading profile...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white shadow-xl rounded-2xl overflow-hidden"
                >
                    <div className="bg-[#1e3a5f] h-32 sm:h-48 relative">
                        <div className="absolute -bottom-16 left-8">
                            <div className="h-32 w-32 rounded-full border-4 border-white bg-white flex items-center justify-center text-[#1e3a5f] text-5xl shadow-lg">
                                <FontAwesomeIcon icon={faUser} />
                                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                            </div>
                        </div>
                    </div>

                    <div className="pt-20 pb-8 px-8">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                                <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                                    <FontAwesomeIcon icon={faUserShield} className="text-[#c9a227]" />
                                    {user.role || 'User'}
                                </p>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 pt-8">
                            <h2 className="text-xl font-semibold text-[#1e3a5f] mb-6">Personal Information</h2>
                            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">

                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500">Email Address</dt>
                                    <dd className="mt-1 text-sm text-gray-900 flex items-center gap-2">
                                        <FontAwesomeIcon icon={faEnvelope} className="text-gray-400 w-4" />
                                        {user.email}
                                    </dd>
                                </div>

                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
                                    <dd className="mt-1 text-sm text-gray-900 flex items-center gap-2">
                                        <FontAwesomeIcon icon={faPhone} className="text-gray-400 w-4" />
                                        {user.phoneNumber || 'N/A'}
                                    </dd>
                                </div>

                            </dl>
                        </div>

                        {(user.businessName || user.businessRegisterNumber) && (
                            <div className="border-t border-gray-100 pt-8 mt-8">
                                <h2 className="text-xl font-semibold text-[#1e3a5f] mb-6">Business Details</h2>
                                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">

                                    <div className="sm:col-span-1">
                                        <dt className="text-sm font-medium text-gray-500">Business Name</dt>
                                        <dd className="mt-1 text-sm text-gray-900 flex items-center gap-2">
                                            <FontAwesomeIcon icon={faBuilding} className="text-gray-400 w-4" />
                                            {user.businessName || 'N/A'}
                                        </dd>
                                    </div>

                                    <div className="sm:col-span-1">
                                        <dt className="text-sm font-medium text-gray-500">Vendor Type</dt>
                                        <dd className="mt-1 text-sm text-gray-900">
                                            {user.vendorType || 'N/A'}
                                        </dd>
                                    </div>

                                    <div className="sm:col-span-1">
                                        <dt className="text-sm font-medium text-gray-500">Registration Number</dt>
                                        <dd className="mt-1 text-sm text-gray-900 flex items-center gap-2">
                                            <FontAwesomeIcon icon={faIdCard} className="text-gray-400 w-4" />
                                            {user.businessRegisterNumber || 'N/A'}
                                        </dd>
                                    </div>

                                    <div className="sm:col-span-2">
                                        <dt className="text-sm font-medium text-gray-500">Business Address</dt>
                                        <dd className="mt-1 text-sm text-gray-900 flex items-center gap-2">
                                            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-400 w-4" />
                                            {user.businessAddress || 'N/A'}
                                        </dd>
                                    </div>

                                </dl>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Profile;
