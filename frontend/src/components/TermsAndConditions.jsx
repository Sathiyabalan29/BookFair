import React from 'react';
import { Link } from 'react-router-dom';

const TermsAndConditions = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 py-16 px-6 flex justify-center">
            
            <div className="max-w-4xl w-full">

                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-deep-blue mb-4 tracking-wide">
                        Terms & Conditions
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Please read these terms carefully before registering for the Colombo Book Fair 2026.
                    </p>
                </div>

                <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-10 border border-gray-100">

                    <div className="space-y-8">

                        <div className="flex items-start gap-5">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-deep-blue text-white font-bold shadow-md">
                                1
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg text-gray-900 mb-1">
                                    Stall Allocation
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Allocation is strictly first-come, first-served. 
                                    Organizers reserve the right to adjust stall positions if required.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-5">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-deep-blue text-white font-bold shadow-md">
                                2
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg text-gray-900 mb-1">
                                    Payment Policy
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Full payment must be completed on time to confirm your reservation.
                                    Failure to pay may result in automatic cancellation.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-5">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-deep-blue text-white font-bold shadow-md">
                                3
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg text-gray-900 mb-1">
                                    Cancellation Policy
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Cancellations made 30 days before the event are eligible for a 50% refund.
                                    After that period, refunds are not available.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-5">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-deep-blue text-white font-bold shadow-md">
                                4
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg text-gray-900 mb-1">
                                    Professional Conduct
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Vendors must behave professionally throughout the event.
                                    Misconduct may result in removal without refund.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-5">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-deep-blue text-white font-bold shadow-md">
                                5
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg text-gray-900 mb-1">
                                    Permitted Items
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Only books and educational materials are permitted for sale.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-5">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-deep-blue text-white font-bold shadow-md">
                                6
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg text-gray-900 mb-1">
                                    Liability Disclaimer
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Organizers are not responsible for any loss or damage to personal property.
                                    Vendors are advised to take necessary precautions.
                                </p>
                            </div>
                        </div>

                    </div>

                    <div className="my-10 border-t border-gray-200"></div>

                    <div className="text-center">
                        <Link
                            to="/register"
                            className="inline-block px-8 py-3 bg-deep-blue text-white rounded-xl shadow-lg hover:bg-opacity-90 transition-all duration-300 font-medium"
                        >
                            Back to Registration
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
