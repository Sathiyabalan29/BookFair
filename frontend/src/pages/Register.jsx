import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import authService from '../services/authService';
import FloatingBooks from '../components/FloatingBooks';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        businessName: '',
        category: 'Publisher',
        nic: '',
        businessAddress: ''
    });

    const [agreeTerms, setAgreeTerms] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        setError('');

        // Password match
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return false;
        }

        // Password length
        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters long");
            return false;
        }

        // Email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError("Invalid email format");
            return false;
        }

        // NIC / BR validation (Sri Lankan NIC)
        const trimmedNIC = formData.nic.trim();
        if (!/^(\d{11}[vV]|\d{12})$/.test(trimmedNIC)) {
            setError("Invalid NIC / Business Registration number (Old: 11 digits + V or New: 12 digits)");
            return false;
        }

        // Terms
        if (!agreeTerms) {
            setError("You must agree to the Terms & Conditions");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);

        const userPayload = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            phoneNumber: formData.phone,
            businessName: formData.businessName,
            vendorType: formData.category,
            businessRegisterNumber: formData.nic,
            businessAddress: formData.businessAddress,
            role: 'USER'
        };

        try {
            await authService.register(userPayload);
            navigate('/login', { state: { message: 'Registration successful! Please login.' } });
        } catch (err) {
            setError(err.message || "Registration failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex font-sans bg-gray-50">
            {/* Left Side - Artistic Panel */}
            <div className="hidden lg:flex lg:w-1/2 sticky top-16 h-[calc(100vh-4rem)] bg-deep-blue overflow-hidden items-center justify-center">
                <FloatingBooks />
                <div className="relative z-10 text-center px-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
                        <h1 className="text-4xl font-bold text-white mb-6 tracking-wide">
                            Join the Community
                        </h1>
                        <p className="text-xl text-gray-300 max-w-md mx-auto leading-relaxed">
                            Register now to showcase your collection at the Colombo Book Fair 2026.
                        </p>
                    </motion.div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-deep-blue/40 to-deep-blue/80 pointer-events-none" />
            </div>

            {/* Right Side - Scrollable Form */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 lg:p-12">
                <motion.div
                    className="max-w-2xl w-full bg-white p-8 sm:p-10 rounded-2xl shadow-xl my-8"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-extrabold text-deep-blue">Create your account</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="font-medium text-soft-gold hover:text-deep-blue transition-colors">
                                Login here
                            </Link>
                        </p>
                    </div>

                    {error && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="rounded-md bg-red-50 p-4 mb-6">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-red-800">{error}</p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    <form className="space-y-8" onSubmit={handleSubmit} autoComplete="off">
                        {/* Account Details */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Account Details</h3>
                            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                                    <input name="name" type="text" required className="appearance-none block w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-transparent focus:bg-white sm:text-sm transition-all duration-200" value={formData.name} onChange={handleChange} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address <span className="text-red-500">*</span></label>
                                    <input name="email" type="email" required className="appearance-none block w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-transparent focus:bg-white sm:text-sm transition-all duration-200" value={formData.email} onChange={handleChange} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
                                    <input name="phone" type="tel" required className="appearance-none block w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-transparent focus:bg-white sm:text-sm transition-all duration-200" value={formData.phone} onChange={handleChange} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Password <span className="text-red-500">*</span></label>
                                    <input name="password" type="password" required className="appearance-none block w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-transparent focus:bg-white sm:text-sm transition-all duration-200" value={formData.password} onChange={handleChange} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password <span className="text-red-500">*</span></label>
                                    <input name="confirmPassword" type="password" required className="appearance-none block w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-transparent focus:bg-white sm:text-sm transition-all duration-200" value={formData.confirmPassword} onChange={handleChange} />
                                </div>
                            </div>
                        </div>

                        {/* Business Details */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Business Details</h3>
                            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Name <span className="text-red-500">*</span></label>
                                    <input name="businessName" type="text" required className="appearance-none block w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-transparent focus:bg-white sm:text-sm transition-all duration-200" value={formData.businessName} onChange={handleChange} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category <span className="text-red-500">*</span></label>
                                    <select name="category" required className="block w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-transparent focus:bg-white sm:text-sm transition-all duration-200" value={formData.category} onChange={handleChange}>
                                        <option value="Publisher">Publisher</option>
                                        <option value="Vendor">Vendor</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">NIC / BR Number <span className="text-red-500">*</span></label>
                                    <input name="nic" type="text" required className="appearance-none block w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-transparent focus:bg-white sm:text-sm transition-all duration-200" value={formData.nic} onChange={handleChange} />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Address <span className="text-red-500">*</span></label>
                                    <textarea name="businessAddress" rows="3" required className="appearance-none block w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-soft-gold focus:border-transparent focus:bg-white sm:text-sm transition-all duration-200" value={formData.businessAddress} onChange={handleChange} />
                                </div>
                            </div>
                        </div>

                        {/* Terms */}
                        <div className="flex items-start bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center h-5">
                                <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} className="h-5 w-5 text-deep-blue border-gray-300 rounded focus:ring-soft-gold transition duration-150 ease-in-out" />
                            </div>
                            <div className="ml-3 text-sm">
                                <label className="font-medium text-gray-700">
                                    I agree to the{' '}
                                    <Link to="/terms" className="text-deep-blue hover:text-soft-gold underline transition-colors">
                                        Terms & Conditions
                                    </Link>
                                    <span className="text-red-500"> *</span>
                                </label>
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="pt-2">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={loading}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-deep-blue hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-deep-blue shadow-lg transition-all duration-200"
                            >
                                {loading && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>}
                                {loading ? 'Creating Account...' : 'Create Account'}
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Register;