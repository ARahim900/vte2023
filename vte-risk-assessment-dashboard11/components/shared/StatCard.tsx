
import React from 'react';

interface StatCardProps {
    value: string;
    label: string;
    description: string;
    icon: React.ReactNode;
    color: string;
}

const StatCard: React.FC<StatCardProps> = ({ value, label, description, icon, color }) => {
    const borderColors: { [key: string]: string } = {
        blue: 'border-blue-500',
        green: 'border-green-500',
        yellow: 'border-yellow-500',
        red: 'border-red-500',
    };

    const iconBgColors: { [key: string]: string } = {
        blue: 'bg-blue-100',
        green: 'bg-green-100',
        yellow: 'bg-yellow-100',
        red: 'bg-red-100',
    };

    return (
        <div className={`bg-white p-5 rounded-xl shadow-md border-t-4 ${borderColors[color]}`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-xs text-slate-500 font-bold tracking-wider">{label}</p>
                    <p className="text-3xl font-bold text-slate-800 mt-1">{value}</p>
                    <p className="text-sm text-slate-500 mt-1">{description}</p>
                </div>
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${iconBgColors[color]}`}>
                    {icon}
                </div>
            </div>
        </div>
    );
};

export default StatCard;
