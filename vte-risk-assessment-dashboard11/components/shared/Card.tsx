import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
    return (
        <div className={`bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 ${className}`}>
            {children}
        </div>
    );
};

export default Card;
