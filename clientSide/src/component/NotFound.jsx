import React from 'react';
import { Link } from 'react-router-dom';
import { useTextLang } from '../libs/utils';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
            <h1 className="text-6xl font-bold text-green-600 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{useTextLang("Page Not Found", "पृष्ठ फेला परेन")}</h2>
            <p className="text-gray-600 mb-8 max-w-md">
                {useTextLang(
                    "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.",
                    "तपाईंले खोज्नुभएको पृष्ठ हटाइएको, नाम परिवर्तन गरिएको वा अस्थायी रूपमा अनुपलब्ध हुन सक्छ।"
                )}
            </p>
            <Link
                to="/"
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors duration-300 shadow-md hover:shadow-lg"
            >
                {useTextLang("Back to Home", "गृहपृष्ठमा फर्कनुहोस्")}
            </Link>
        </div>
    );
};

export default NotFound;
