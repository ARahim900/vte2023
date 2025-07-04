import React from 'react';

interface StatCardProps {
    value: string;
    label: string;
    description: string;
    icon: React.ReactNode;
    color: string;
}

const StatCard: React.FC<StatCardProps> = ({ value, label, description, icon, color }) => {
    return (
        <div className={`bg-white p-4 sm:p-6 rounded-xl shadow-lg border-t-4 border-${color}-500 hover:shadow-xl transition-shadow duration-300`}>
            <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                    <p className={`text-xs sm:text-sm font-bold text-${color}-600 uppercase tracking-wider`}>{label}</p>
                    <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mt-1 mb-2">{value}</p>
                    <p className="text-xs sm:text-sm text-slate-500 line-clamp-2">{description}</p>
                </div>
                <div className={`flex-shrink-0 ml-4 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-${color}-100 flex items-center justify-center`}>
                    {icon}
                </div>
            </div>
        </div>
    );
};

export default StatCard;
