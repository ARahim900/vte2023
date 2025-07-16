
import React, { useState } from 'react';
import OverviewMetrics from './components/OverviewMetrics';
import RiskFactors from './components/RiskFactors';
import RiskAnalytics from './components/RiskAnalytics';
import InsightsAnalysis from './components/InsightsAnalysis';
import Database from './components/Database';
import RiskFactorAge from './components/RiskFactorAge';

// Type definitions
interface NavigationItem {
  id: string;
  name: string;
  emoji: string;
  component: React.ComponentType;
}

interface MobileNavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

interface DesktopNavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

// Navigation items configuration
const navigationItems: NavigationItem[] = [
  { id: 'overview', name: 'Overview & Metrics', emoji: '📊', component: OverviewMetrics },
  { id: 'risk-factors', name: 'Risk Factors', emoji: '⚠️', component: RiskFactors },
  { id: 'risk-analytics', name: 'Risk Analytics', emoji: '📈', component: RiskAnalytics },
  { id: 'rf-age', name: 'R.F. Age', emoji: '👶', component: RiskFactorAge },
  { id: 'insights', name: 'Insights & Analysis', emoji: '💡', component: InsightsAnalysis },
  { id: 'database', name: 'Database', emoji: '🗃️', component: Database },
];

// Mobile Navigation Component
const MobileNavigation: React.FC<MobileNavigationProps> = ({ activeSection, setActiveSection, isOpen, setIsOpen }) => {
  const activeItem = navigationItems.find(item => item.id === activeSection);

  // Handle case where activeItem might be undefined
  if (!activeItem) {
    return null;
  }

  return (
    <div className="sm:hidden">
      {/* Mobile Menu Button */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-lg shadow-md border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
        >
          <div className="flex items-center space-x-3">
            <span className="text-lg">{activeItem.emoji}</span>
            <span className="font-medium text-gray-800">{activeItem.name}</span>
          </div>
          <svg 
            className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 ${
                  activeSection === item.id ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                } ${item.id === navigationItems[0].id ? 'rounded-t-lg' : ''} ${item.id === navigationItems[navigationItems.length - 1].id ? 'rounded-b-lg' : ''}`}
              >
                <span className="text-lg">{item.emoji}</span>
                <span className="font-medium">{item.name}</span>
                {activeSection === item.id && (
                  <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Desktop Navigation Component
const DesktopNavigation: React.FC<DesktopNavigationProps> = ({ activeSection, setActiveSection }) => (
  <div className="hidden sm:flex flex-wrap justify-center gap-2 lg:gap-4">
    {navigationItems.map((item) => (
      <button
        key={item.id}
        onClick={() => setActiveSection(item.id)}
        className={`group relative px-4 lg:px-6 py-3 rounded-full font-medium text-sm lg:text-base transition-all duration-300 transform hover:scale-105 ${
          activeSection === item.id
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
        }`}
      >
        <div className="flex items-center space-x-2">
          <span className="text-base lg:text-lg">{item.emoji}</span>
          <span>{item.name}</span>
        </div>
        
        {/* Active indicator */}
        {activeSection === item.id && (
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
        )}
      </button>
    ))}
  </div>
);

// Main App Component
const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const ActiveComponent = navigationItems.find(item => item.id === activeSection)?.component || OverviewMetrics;

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-700">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col space-y-4 py-4 sm:py-6">
            {/* Logo and Title */}
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                VTE Risk Assessment Dashboard 2023
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                Comprehensive Analysis • Suhar Wilayat Health Centers
              </p>
            </div>

            {/* Navigation */}
            <nav className="w-full">
              <DesktopNavigation activeSection={activeSection} setActiveSection={setActiveSection} />
              <MobileNavigation 
                activeSection={activeSection} 
                setActiveSection={setActiveSection}
                isOpen={mobileMenuOpen}
                setIsOpen={setMobileMenuOpen}
              />
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="animate-fade-in">
          <ActiveComponent />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>© 2023 VTE Risk Assessment Dashboard - Suhar Wilayat Health Centers</p>
            <p className="mt-1">Data Analysis & Visualization for Improved Maternal Healthcare</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
