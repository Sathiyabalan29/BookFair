import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StatCard = ({ title, value, icon, color = 'bg-white', textColor = 'text-[#1e3a5f]' }) => {
    return (
        <div className={`p-6 rounded-lg shadow-md ${color} flex items-center justify-between transition-transform hover:scale-105 duration-200 border-l-4 border-[${textColor}]`}>
            <div>
                <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">{title}</h3>
                <p className={`text-3xl font-bold mt-2 ${textColor}`}>{value}</p>
            </div>
            {icon && (
                <div className={`p-4 rounded-full bg-gray-100 ${textColor}`}>
                    <FontAwesomeIcon icon={icon} className="text-xl" />
                </div>
            )}
        </div>
    );
};

export default StatCard;
