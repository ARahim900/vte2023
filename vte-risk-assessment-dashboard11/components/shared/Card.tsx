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

interface CardHeaderProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '', style }) => {
    return (
        <div className={`mb-4 ${className}`} style={style}>
            {children}
        </div>
    );
};

interface CardTitleProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export const CardTitle: React.FC<CardTitleProps> = ({ children, className = '', style }) => {
    return (
        <h3 className={`text-lg font-semibold ${className}`} style={style}>
            {children}
        </h3>
    );
};

interface CardDescriptionProps {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export const CardDescription: React.FC<CardDescriptionProps> = ({ children, className = '', style }) => {
    return (
        <p className={`text-sm text-gray-600 ${className}`} style={style}>
            {children}
        </p>
    );
};

interface CardContentProps {
    children: React.ReactNode;
    className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => {
    return (
        <div className={className}>
            {children}
        </div>
    );
};

export default Card;
