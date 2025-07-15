import React, { useState } from 'react';
import RiskAnalytics from './components/RiskAnalytics';

// --- Navigation Bar Component ---
const NavigationBar = ({ activeSection, setActiveSection }) => {
    const sections = [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'risk-analytics', label: 'Risk Analytics' },
        { id: 'reports', label: 'Reports' },
        { id: 'settings', label: 'Settings' },
    ];

    return (
        <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <h1 className="text-white text-xl font-bold mr-8">VTE 2023 Dashboard</h1>
                        <div className="flex space-x-1">
                            {sections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id)}
                                    className={`px-6 py-2 text-sm font-medium rounded-t-lg transition-all duration-200 ${
                                        activeSection === section.id
                                            ? 'bg-white text-indigo-600 shadow-lg transform -translate-y-1'
                                            : 'text-white hover:bg-white/20'
                                    }`}
                                >
                                    {section.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

// --- Dashboard Section Component ---
const DashboardSection = () => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Dashboard Overview</h2>
            <p className="text-gray-500">
                Welcome to the VTE 2023 Dashboard. This section provides an overview of key metrics and statistics.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-indigo-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-indigo-700">Total Patients</h3>
                    <p className="text-3xl font-bold text-indigo-900 mt-2">3,970</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-700">Assessed</h3>
                    <p className="text-3xl font-bold text-green-900 mt-2">3,885</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-purple-700">Assessment Rate</h3>
                    <p className="text-3xl font-bold text-purple-900 mt-2">97.9%</p>
                </div>
            </div>
        </div>
    );
};

// --- Reports Section Component ---
const ReportsSection = () => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Reports</h2>
            <p className="text-gray-500">
                Generate and view various reports for VTE assessment data.
            </p>
            <div className="mt-8 space-y-4">
                <button className="w-full md:w-auto px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    Generate Monthly Report
                </button>
                <button className="w-full md:w-auto px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors ml-0 md:ml-4">
                    Export Data
                </button>
            </div>
        </div>
    );
};

// --- Settings Section Component ---
const SettingsSection = () => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Settings</h2>
            <p className="text-gray-500">
                Configure system settings and preferences.
            </p>
            <div className="mt-8 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Notification Preferences
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded-lg">
                        <option>Email Notifications</option>
                        <option>SMS Notifications</option>
                        <option>Both</option>
                        <option>None</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Data Refresh Interval
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded-lg">
                        <option>Real-time</option>
                        <option>Every 5 minutes</option>
                        <option>Every 15 minutes</option>
                        <option>Every hour</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

// --- Main App Component ---
export default function App() {
    const [activeSection, setActiveSection] = useState('dashboard');

    return (
        <div className="min-h-screen bg-gray-100 font-sans text-gray-700">
            <NavigationBar activeSection={activeSection} setActiveSection={setActiveSection} />
            
            <main className="container mx-auto p-4 md:p-8">
                {activeSection === 'dashboard' && <DashboardSection />}
                {activeSection === 'risk-analytics' && <RiskAnalytics />}
                {activeSection === 'reports' && <ReportsSection />}
                {activeSection === 'settings' && <SettingsSection />}
            </main>
        </div>
    );
}
