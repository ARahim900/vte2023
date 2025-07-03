
import React, { useState } from 'react';
import OverviewMetrics from './components/OverviewMetrics';
import RiskFactors from './components/RiskFactors';
import InsightsAnalysis from './components/InsightsAnalysis';

type Tab = 'overview' | 'risk' | 'insights';

const Header: React.FC = () => (
  <header className="text-center py-8 md:py-12">
    <h1 className="text-4xl md:text-5xl font-bold text-slate-800">VTE Risk Assessment Dashboard</h1>
    <p className="mt-2 text-lg text-slate-600">Suhar Wilayat Comprehensive Analysis - 2023</p>
    <div className="mt-4 inline-flex items-center justify-center bg-white shadow-sm rounded-full p-2 text-sm text-slate-600">
      <span className="font-semibold mx-2">3,281</span> Total Pregnancies • 
      <span className="font-semibold mx-2">3,086</span> VTE Assessments • 
      <span className="font-semibold mx-2">7</span> Health Centers
    </div>
  </header>
);

const TabNavigation: React.FC<{ activeTab: Tab; setActiveTab: (tab: Tab) => void }> = ({ activeTab, setActiveTab }) => {
  const tabs: { id: Tab; label: string }[] = [
    { id: 'overview', label: 'Overview & Metrics' },
    { id: 'risk', label: 'Risk Factors' },
    { id: 'insights', label: 'Insights & Analysis' },
  ];

  return (
    <nav className="flex justify-center mb-8">
      <div className="bg-white p-1.5 rounded-full shadow-md">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 sm:px-6 py-2.5 rounded-full text-sm sm:text-base font-semibold transition-colors duration-300 focus:outline-none ${
              activeTab === tab.id
                ? 'bg-brand-blue text-white shadow'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

const Footer: React.FC = () => (
    <footer className="mt-12 mb-8">
        <div className="max-w-4xl mx-auto bg-white p-4 rounded-xl shadow-md">
            <div className="text-center text-slate-600">
                <p className="font-bold text-slate-700">Comprehensive VTE Risk Assessment Analysis for Suhar Wilayat Health Network</p>
                <p className="text-sm mt-1">Data Period: January - December 2023 • All 7 Health Centers Included</p>
                <div className="flex justify-center items-center space-x-2 sm:space-x-4 text-xs sm:text-sm text-slate-500 mt-3 flex-wrap">
                    <span>AL MULTAQA</span>
                    <span>•</span>
                    <span>AL UWAYNAT</span>
                    <span>•</span>
                    <span>TAREEF</span>
                    <span>•</span>
                    <span>FALAJ</span>
                    <span>•</span>
                    <span>WADI HIBI</span>
                    <span>•</span>
                    <span>SOHAR P.C.</span>
                    <span>•</span>
                    <span>WADI AHIN</span>
                </div>
            </div>
        </div>
    </footer>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <main className="container mx-auto px-4 py-6">
        <Header />
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="space-y-8">
          {activeTab === 'overview' && <OverviewMetrics />}
          {activeTab === 'risk' && <RiskFactors />}
          {activeTab === 'insights' && <InsightsAnalysis />}
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default App;
