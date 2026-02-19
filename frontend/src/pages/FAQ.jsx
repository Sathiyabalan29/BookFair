import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const FAQS = [
    {
        question: "How can I reserve a stall?",
        answer: "You can reserve a stall by visiting the 'Venue Map' or 'Reserve' section, selecting your desired stall, and proceeding with the booking process."
    },
    {
        question: "What payment methods are accepted?",
        answer: "We accept Credit Cards, Debit Cards, and Bank Transfers. You can choose your preferred method during the checkout process."
    },
    {
        question: "Can I cancel my reservation?",
        answer: "Yes, you can cancel your reservation from your profile's 'My Bookings' section, provided it meets our cancellation policy criteria."
    },
    {
        question: "Is there a deadline for booking?",
        answer: "Bookings are open until all stalls are reserved or until the deadline specified on our home page. We recommend booking early!"
    },
    {
        question: "How do I contact support?",
        answer: "You can reach us via the 'Contact' page, email us at info@colombobookfair.lk, or call our support hotline."
    }
];

const FAQ = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <FontAwesomeIcon icon={faQuestionCircle} className="text-[#1e3a5f] text-4xl mb-4" />
                    <h1 className="text-3xl font-extrabold text-[#1e3a5f] sm:text-4xl">
                        Frequently Asked Questions
                    </h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Find answers to common questions about the Colombo International Book Fair.
                    </p>
                </div>

                <dl className="space-y-8">
                    {FAQS.map((faq, index) => (
                        <div key={index} className="bg-white shadow rounded-lg p-6 border border-gray-100 hover:shadow-md transition-shadow">
                            <dt className="text-lg font-semibold text-[#1e3a5f] mb-2">
                                {faq.question}
                            </dt>
                            <dd className="text-gray-600 leading-relaxed">
                                {faq.answer}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    );
};

export default FAQ;
