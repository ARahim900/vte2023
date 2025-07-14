
import React, { useState } from 'react';
import OverviewMetrics from './components/OverviewMetrics';
import RiskFactors from './components/RiskFactors';
import InsightsAnalysis from './components/InsightsAnalysis';
import RiskAnalytics from './components/RiskAnalytics';

type Tab = 'overview' | 'risk' | 'insights' | 'analytics';

const Header: React.FC = () => (
  <header className="text-center py-4 md:py-8 lg:py-12 px-4">
    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800">VTE Risk Assessment Dashboard</h1>
    <p className="mt-2 text-sm sm:text-base lg:text-lg text-slate-600">Suhar Wilayat Comprehensive Analysis - 2023</p>
    <div className="mt-4 inline-flex items-center justify-center bg-white shadow-sm rounded-full p-2 text-xs sm:text-sm text-slate-600 max-w-full flex-wrap">
      <span className="font-semibold mx-1 sm:mx-2">3,281</span> Total Pregnancies • 
      <span className="font-semibold mx-1 sm:mx-2">3,086</span> VTE Assessments • 
      <span className="font-semibold mx-1 sm:mx-2">7</span> Health Centers
    </div>
  </header>
);

const TabNavigation: React.FC<{ activeTab: Tab; setActiveTab: (tab: Tab) => void }> = ({ activeTab, setActiveTab }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'overview', label: 'Overview & Metrics', icon: '📊' },
    { id: 'risk', label: 'Risk Factors', icon: '⚠️' },
    { id: 'insights', label: 'Insights & Analysis', icon: '💡' },
    { id: 'analytics', label: 'Risk Analytics', icon: '📈' },
  ];

  const handleTabClick = (tabId: Tab) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  // Mobile dropdown navigation
  const mobileNav = (
    <div className="md:hidden mb-6">
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="w-full bg-white p-4 rounded-lg shadow-md flex items-center justify-between text-left"
      >
        <div className="flex items-center space-x-2">
          <span className="text-lg">{tabs.find(t => t.id === activeTab)?.icon}</span>
          <span className="font-semibold text-slate-800">
            {tabs.find(t => t.id === activeTab)?.label}
          </span>
        </div>
        <svg
          className={`w-5 h-5 text-slate-600 transform transition-transform ${isMobileMenuOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isMobileMenuOpen && (
        <div className="mt-2 bg-white rounded-lg shadow-lg overflow-hidden">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`w-full px-4 py-3 text-left flex items-center space-x-2 transition-colors ${
                activeTab === tab.id
                  ? 'bg-brand-blue text-white'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );

  // Desktop pill navigation
  const desktopNav = (
    <nav className="hidden md:flex justify-center mb-8">
      <div className="bg-white p-1.5 rounded-full shadow-md inline-flex">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 lg:px-6 py-2.5 rounded-full text-sm lg:text-base font-semibold transition-all duration-300 focus:outline-none flex items-center space-x-2 ${
              activeTab === tab.id
                ? 'bg-brand-blue text-white shadow'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span className="hidden lg:inline">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );

  return (
    <>
      {mobileNav}
      {desktopNav}
    </>
  );
};

const Footer: React.FC = () => (
    <footer className="mt-8 md:mt-12 mb-4 md:mb-8 px-4">
        <div className="max-w-4xl mx-auto bg-white p-4 md:p-6 rounded-xl shadow-md">
            <div className="text-center text-slate-600">
                <p className="font-bold text-slate-700 text-sm md:text-base">Comprehensive VTE Risk Assessment Analysis for Suhar Wilayat Health Network</p>
                <p className="text-xs md:text-sm mt-1">Data Period: January - December 2023 • All 7 Health Centers Included</p>
                <div className="flex justify-center items-center flex-wrap text-xs md:text-sm text-slate-500 mt-3 gap-x-2 gap-y-1">
                    <span>AL MULTAQA</span>
                    <span className="hidden sm:inline">•</span>
                    <span>AL UWAYNAT</span>
                    <span className="hidden sm:inline">•</span>
                    <span>TAREEF</span>
                    <span className="hidden sm:inline">•</span>
                    <span>FALAJ</span>
                    <span className="hidden sm:inline">•</span>
                    <span>WADI HIBI</span>
                    <span className="hidden sm:inline">•</span>
                    <span>SOHAR P.C.</span>
                    <span className="hidden sm:inline">•</span>
                    <span>WADI AHIN</span>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200">
                    <p className="text-xs md:text-sm font-semibold text-slate-700">Analysis By: Dr. Wajud Al Shibli</p>
                </div>
            </div>
        </div>
    </footer>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <main className="container mx-auto px-4 py-4 md:py-6 max-w-7xl">
        <Header />
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="space-y-6 md:space-y-8">
          {activeTab === 'overview' && <OverviewMetrics />}
          {activeTab === 'risk' && <RiskFactors />}
          {activeTab === 'insights' && <InsightsAnalysis />}
          {activeTab === 'analytics' && <RiskAnalytics />}
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default App;
