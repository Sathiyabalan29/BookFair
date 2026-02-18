import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import authService from '../services/authService';


const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    useEffect(() => {
        const user = authService.getCurrentUser();
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || '',
                email: user.email || ''
            }));
        }
    }, []);
    

    const [status, setStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission
        setStatus('sending');
        setTimeout(() => {
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl font-extrabold text-[#1e3a5f] sm:text-5xl sm:tracking-tight lg:text-6xl">
                        Get in Touch
                    </h1>
                    <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
                        Have questions about the Colombo International Book Fair 2026? We're here to help.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-white rounded-2xl shadow-xl overflow-hidden"
                    >
                        <div className="p-8 sm:p-10">
                            <h2 className="text-2xl font-bold text-[#1e3a5f] mb-8">Contact Information</h2>

                            <div className="space-y-8">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#1e3a5f] text-[#c9a227]">
                                            <FontAwesomeIcon icon={faMapMarkerAlt} size="lg" />
                                        </div>
                                    </div>
                                    <div className="ml-5">
                                        <h3 className="text-lg font-medium text-gray-900">Venue</h3>
                                        <p className="mt-2 text-base text-gray-500">
                                            BMICH (Bandaranaike Memorial International Conference Hall)<br />
                                            Bauddhaloka Mawatha,<br />
                                            Colombo 07, Sri Lanka
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#1e3a5f] text-[#c9a227]">
                                            <FontAwesomeIcon icon={faPhone} size="lg" />
                                        </div>
                                    </div>
                                    <div className="ml-5">
                                        <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                                        <p className="mt-2 text-base text-gray-500">
                                            <a href="tel:+94112345678" className="hover:text-[#c9a227] transition-colors">
                                                +94 11 234 5678
                                            </a>
                                        </p>
                                        <p className="mt-1 text-sm text-gray-400">
                                            Mon-Fri 9am to 6pm
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#1e3a5f] text-[#c9a227]">
                                            <FontAwesomeIcon icon={faEnvelope} size="lg" />
                                        </div>
                                    </div>
                                    <div className="ml-5">
                                        <h3 className="text-lg font-medium text-gray-900">Email</h3>
                                        <p className="mt-2 text-base text-gray-500">
                                            <a href="mailto:info@colombobookfair.lk" className="hover:text-[#c9a227] transition-colors">
                                                info@colombobookfair.lk
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Map Placeholder - using an image or iframe would go here */}
                        <div className="h-64 bg-gray-200 w-full relative">
                            <iframe
                                title="BMICH Location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.9029324083396!2d79.87088927448332!3d6.902205493097103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2597b87834571%3A0xc07469a7c36d0043!2sBandaranaike%20Memorial%20International%20Conference%20Hall!5e0!3m2!1sen!2slk!4v1716383626783!5m2!1sen!2slk"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </motion.div>

                    {/* Contact Form Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="bg-white rounded-2xl shadow-xl p-8 sm:p-10"
                    >
                        <h2 className="text-2xl font-bold text-[#1e3a5f] mb-6">Send us a Message</h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    required
                                    className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-[#c9a227] focus:border-[#c9a227] transition-colors"
                                    placeholder="Your name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-[#c9a227] focus:border-[#c9a227] transition-colors"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    id="subject"
                                    required
                                    className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-[#c9a227] focus:border-[#c9a227] transition-colors"
                                    placeholder="How can we help?"
                                    value={formData.subject}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    id="message"
                                    rows="4"
                                    required
                                    className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-[#c9a227] focus:border-[#c9a227] transition-colors"
                                    placeholder="Write your message here..."
                                    value={formData.message}
                                    onChange={handleChange}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'sending' || status === 'success'}
                                className={`w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-lg text-base font-medium text-white shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c9a227] ${status === 'success' ? 'bg-green-600 hover:bg-green-700' : 'bg-[#c9a227] hover:bg-[#d4af37] text-[#1e3a5f]'
                                    }`}
                            >
                                {status === 'sending' ? (
                                    'Sending...'
                                ) : status === 'success' ? (
                                    'Message Sent!'
                                ) : (
                                    <>
                                        Send Message <FontAwesomeIcon icon={faPaperPlane} className="ml-2" />
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
