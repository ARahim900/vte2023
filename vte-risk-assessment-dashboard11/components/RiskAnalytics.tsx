import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, ComposedChart } from 'recharts';
import { AnimatedWrapper, AnimatedCard, AnimatedHeader, AnimatedChart, AnimatedList, AnimatedListItem } from './shared/AnimatedWrapper';

// Define interfaces for type safety
interface RiskFactorData {
  factor: string;
  count: number;
  percentage: number;
  rank?: number | null;
}

interface HealthCenterData {
  center: string;
  totalPatients: number;
  vteAssessed: number;
  assessmentRate: number;
}

// Real data from the provided analysis (EXCLUDING SOHAR P.C. as per user request - not found in database)
const healthCenterSummary: HealthCenterData[] = [
  { center: 'AL MULTAQA', totalPatients: 1467, vteAssessed: 1467, assessmentRate: 100.0 },
  { center: 'AL UWAYNAT', totalPatients: 641, vteAssessed: 597, assessmentRate: 93.1 },
  { center: 'TAREEF', totalPatients: 784, vteAssessed: 758, assessmentRate: 96.7 },
  { center: 'FALAJ', totalPatients: 801, vteAssessed: 797, assessmentRate: 99.5 },
  { center: 'WADI HIBI', totalPatients: 177, vteAssessed: 172, assessmentRate: 97.2 },
  { center: 'WADI AHIN', totalPatients: 100, vteAssessed: 94, assessmentRate: 94.0 },
];

// Risk factors by center (EXCLUDING SOHAR P.C. - not found in database)
const riskFactorsByCenter: Record<string, RiskFactorData[]> = {
  'AL MULTAQA': [
    { factor: 'Parity ≥3', count: 473, percentage: 32.2 },
    { factor: 'Age > 35 years', count: 357, percentage: 24.3 },
    { factor: 'Obesity BMI 30-39', count: 19, percentage: 1.3 },
    { factor: 'Obesity BMI ≥40', count: 7, percentage: 0.5 },
    { factor: 'Smoking', count: 23, percentage: 1.6 },
    { factor: 'Total Obesity (BMI ≥30)', count: 26, percentage: 1.8 },
  ],
  'AL UWAYNAT': [
    { factor: 'Parity ≥3', count: 260, percentage: 43.6 },
    { factor: 'Age > 35 years', count: 175, percentage: 29.3 },
    { factor: 'Obesity BMI 30-39', count: 25, percentage: 4.2 },
    { factor: 'Obesity BMI ≥40', count: 22, percentage: 3.7 },
    { factor: 'Smoking', count: 41, percentage: 6.9 },
    { factor: 'Family History of VTE', count: 1, percentage: 0.2 },
    { factor: 'Previous VTE Event', count: 1, percentage: 0.2 },
    { factor: 'Total Obesity (BMI ≥30)', count: 47, percentage: 7.9 },
  ],
  'TAREEF': [
    { factor: 'Parity ≥3', count: 269, percentage: 35.5 },
    { factor: 'Age > 35 years', count: 194, percentage: 25.6 },
    { factor: 'Obesity BMI 30-39', count: 108, percentage: 14.2 },
    { factor: 'Obesity BMI ≥40', count: 97, percentage: 12.8 },
    { factor: 'Smoking', count: 148, percentage: 19.5 },
    { factor: 'Family History of VTE', count: 37, percentage: 4.9 },
    { factor: 'Medical Comorbidities', count: 5, percentage: 0.7 },
    { factor: 'Gross Varicose Veins', count: 3, percentage: 0.4 },
    { factor: 'Previous VTE Event', count: 7, percentage: 0.9 },
    { factor: 'Total Obesity (BMI ≥30)', count: 205, percentage: 27.0 },
  ],
  'FALAJ': [
    { factor: 'Parity ≥3', count: 256, percentage: 32.1 },
    { factor: 'Age > 35 years', count: 212, percentage: 26.6 },
    { factor: 'Obesity BMI 30-39', count: 29, percentage: 3.6 },
    { factor: 'Obesity BMI ≥40', count: 42, percentage: 5.3 },
    { factor: 'Smoking', count: 36, percentage: 4.5 },
    { factor: 'Family History of VTE', count: 2, percentage: 0.3 },
    { factor: 'Previous VTE Event', count: 1, percentage: 0.1 },
    { factor: 'Total Obesity (BMI ≥30)', count: 71, percentage: 8.9 },
  ],
  'WADI HIBI': [
    { factor: 'Parity ≥3', count: 78, percentage: 45.3 },
    { factor: 'Age > 35 years', count: 56, percentage: 32.6 },
    { factor: 'Obesity BMI 30-39', count: 8, percentage: 4.7 },
    { factor: 'Obesity BMI ≥40', count: 7, percentage: 4.1 },
    { factor: 'Smoking', count: 5, percentage: 2.9 },
    { factor: 'Total Obesity (BMI ≥30)', count: 15, percentage: 8.7 },
  ],
  'WADI AHIN': [
    { factor: 'Parity ≥3', count: 50, percentage: 53.2 },
    { factor: 'Age > 35 years', count: 27, percentage: 28.7 },
    { factor: 'Obesity BMI 30-39', count: 26, percentage: 27.7 },
    { factor: 'Obesity BMI ≥40', count: 23, percentage: 24.5 },
    { factor: 'Smoking', count: 21, percentage: 22.3 },
    { factor: 'Family History of VTE', count: 1, percentage: 1.1 },
    { factor: 'Total Obesity (BMI ≥30)', count: 49, percentage: 52.1 },
  ],
};

const grandTotalRiskFactors: RiskFactorData[] = [
  { factor: 'Parity ≥3', count: 1386, percentage: 35.7, rank: 1 },
  { factor: 'Age > 35 years', count: 1021, percentage: 26.3, rank: 2 },
  { factor: 'Smoking', count: 274, percentage: 7.1, rank: 3 },
  { factor: 'Obesity BMI 30-39', count: 215, percentage: 5.5, rank: 4 },
  { factor: 'Obesity BMI ≥40', count: 198, percentage: 5.1, rank: 5 },
  { factor: 'Family History of VTE', count: 41, percentage: 1.1, rank: 6 },
  { factor: 'Previous VTE Single Event', count: 9, percentage: 0.2, rank: 7 },
  { factor: 'Medical Comorbidities', count: 5, percentage: 0.1, rank: 8 },
  { factor: 'Gross Varicose Veins', count: 3, percentage: 0.1, rank: 9 },
  { factor: 'TOTAL OBESITY (BMI ≥30)', count: 413, percentage: 10.6, rank: null },
];

const obesityComparisonData = healthCenterSummary.map(center => {
  const centerData = riskFactorsByCenter[center.center];
  const totalObesity = centerData?.find((f: RiskFactorData) => f.factor === 'Total Obesity (BMI ≥30)');
  return {
    center: center.center.replace('AL ', '').replace('WADI ', ''),
    obesity: totalObesity ? totalObesity.percentage : 0,
    totalPatients: center.totalPatients
  };
});

const smokingComparisonData = healthCenterSummary.map(center => {
  const centerData = riskFactorsByCenter[center.center];
  const smoking = centerData?.find((f: RiskFactorData) => f.factor === 'Smoking');
  return {
    center: center.center.replace('AL ', '').replace('WADI ', ''),
    smoking: smoking ? smoking.percentage : 0,
    totalPatients: center.totalPatients
  };
});

const parityComparisonData = healthCenterSummary.map(center => {
  const centerData = riskFactorsByCenter[center.center];
  const parity = centerData?.find((f: RiskFactorData) => f.factor === 'Parity ≥3');
  return {
    center: center.center.replace('AL ', '').replace('WADI ', ''),
    parity: parity ? parity.percentage : 0,
    totalPatients: center.totalPatients
  };
});

interface FilterCardProps {
  title: string;
  isActive: boolean;
  onClick: () => void;
  count?: number;
}

const FilterCard: React.FC<FilterCardProps> = ({ title, isActive, onClick, count }) => (
  <AnimatedWrapper
    animation={{
      hidden: { opacity: 0, scale: 0.9, y: 20 },
      visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }
    }}
  >
    <button
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-xl p-4 transition-all duration-300 transform hover:scale-105
        ${isActive 
          ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg' 
          : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
        }
      `}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-white' : 'bg-teal-500'}`} />
          <span className="font-medium text-sm">{title}</span>
        </div>
        {count && (
          <span className={`text-xs px-2 py-1 rounded-full ${
            isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
          }`}>
            {count}
          </span>
        )}
      </div>
    </button>
  </AnimatedWrapper>
);

const RiskAnalytics: React.FC = () => {
  const [selectedCenter, setSelectedCenter] = useState<string>('ALL');
  const [selectedView, setSelectedView] = useState<string>('overview');

  // Filter out SOHAR P.C. - explicitly exclude it from filtration options (not found in database)
  const availableCenters = Object.keys(riskFactorsByCenter).filter(center => center !== 'SOHAR P.C.');
  const centers = ['ALL', ...availableCenters];
  const views = ['overview', 'risk-factors', 'comparison', 'insights'];

  const totalPatients = healthCenterSummary.reduce((sum, center) => sum + center.totalPatients, 0);
  const totalAssessed = healthCenterSummary.reduce((sum, center) => sum + center.vteAssessed, 0);
  const overallAssessmentRate = (totalAssessed / totalPatients) * 100;

  const getCurrentData = () => {
    if (selectedCenter === 'ALL') {
      return grandTotalRiskFactors.filter(f => f.rank !== null);
    }
    return riskFactorsByCenter[selectedCenter] || [];
  };

  const getTopRiskFactors = () => {
    return grandTotalRiskFactors.slice(0, 5);
  };

  const COLORS = ['#0891b2', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#84cc16', '#f97316'];

  return (
    <div className="space-y-8 bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <AnimatedHeader>
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Pre-existing Risk Factors Analysis</h2>
          <p className="text-gray-600 text-lg">Comprehensive VTE Risk Factor Analysis by Health Center</p>
          <div className="mt-4 inline-flex items-center justify-center bg-white shadow-sm rounded-full p-3 text-sm text-gray-600">
            <span className="font-semibold mx-2">{totalPatients.toLocaleString()}</span> Total Patients • 
            <span className="font-semibold mx-2">{totalAssessed.toLocaleString()}</span> VTE Assessed • 
            <span className="font-semibold mx-2">{overallAssessmentRate.toFixed(1)}%</span> Overall Assessment Rate
          </div>
          <div className="mt-2 text-xs text-gray-500">
            * SOHAR P.C. excluded - data not found in database
          </div>
        </div>
      </AnimatedHeader>

      {/* View Selection */}
      <AnimatedCard>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Analysis View</h3>
          <AnimatedList>
            <React.Fragment>
              {views.map((view, index) => (
                <AnimatedListItem key={view} delay={index * 0.1}>
                  <FilterCard
                    title={view.charAt(0).toUpperCase() + view.slice(1).replace('-', ' ')}
                    isActive={selectedView === view}
                    onClick={() => setSelectedView(view)}
                  />
                </AnimatedListItem>
              ))}
            </React.Fragment>
          </AnimatedList>
        </div>
      </AnimatedCard>

      {/* Health Center Filter - SOHAR P.C. explicitly excluded */}
      <AnimatedCard>
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter by Health Center</h3>
          <AnimatedList>
            <React.Fragment>
              {centers.map((center, index) => (
                <AnimatedListItem key={center} delay={index * 0.05}>
                  <FilterCard
                    title={center === 'ALL' ? 'All Centers' : center.replace('AL ', '').replace('WADI ', '')}
                    isActive={selectedCenter === center}
                    onClick={() => setSelectedCenter(center)}
                    count={center === 'ALL' ? availableCenters.length : undefined}
                  />
                </AnimatedListItem>
              ))}
            </React.Fragment>
          </AnimatedList>
          <div className="mt-3 text-xs text-gray-500">
            📝 Note: SOHAR P.C. excluded from analysis - data not available in database
          </div>
        </div>
      </AnimatedCard>

      {/* Summary Statistics */}
      <AnimatedList>
        <React.Fragment>
          <AnimatedListItem delay={0.1}>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Patients</p>
                  <p className="text-3xl font-bold">{totalPatients.toLocaleString()}</p>
                  <p className="text-blue-200 text-xs mt-1">Across 6 Centers</p>
                </div>
                <div className="bg-white/20 rounded-lg p-3">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                </div>
              </div>
            </div>
          </AnimatedListItem>

          <AnimatedListItem delay={0.2}>
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">VTE Assessed</p>
                  <p className="text-3xl font-bold">{totalAssessed.toLocaleString()}</p>
                  <p className="text-green-200 text-xs mt-1">{overallAssessmentRate.toFixed(1)}% Coverage</p>
                </div>
                <div className="bg-white/20 rounded-lg p-3">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </AnimatedListItem>

          <AnimatedListItem delay={0.3}>
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100 text-sm">Highest Risk: Parity ≥3</p>
                  <p className="text-3xl font-bold">35.7%</p>
                  <p className="text-amber-200 text-xs mt-1">1,386 cases</p>
                </div>
                <div className="bg-white/20 rounded-lg p-3">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </AnimatedListItem>

          <AnimatedListItem delay={0.4}>
            <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 text-sm">Total Obesity Cases</p>
                  <p className="text-3xl font-bold">413</p>
                  <p className="text-red-200 text-xs mt-1">10.6% prevalence</p>
                </div>
                <div className="bg-white/20 rounded-lg p-3">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                </div>
              </div>
            </div>
          </AnimatedListItem>
        </React.Fragment>
      </AnimatedList>

      {/* Content based on selected view */}
      {selectedView === 'overview' && (
        <AnimatedWrapper
          delay={0.2}
          animation={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, delay: 0.2 }
            }
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Assessment Coverage by Center */}
            <AnimatedChart>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 Assessment Coverage by Center</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={healthCenterSummary}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="center" 
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      fontSize={10}
                    />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="vteAssessed" fill="#0891b2" name="VTE Assessed" />
                    <Bar yAxisId="right" type="monotone" dataKey="assessmentRate" stroke="#ef4444" strokeWidth={3} name="Assessment Rate %" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </AnimatedChart>

            {/* Top Risk Factors Distribution */}
            <AnimatedChart>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">🎯 Top Risk Factors Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={getTopRiskFactors()}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ factor, percentage }) => `${factor.split(' ')[0]} ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="percentage"
                    >
                      {getTopRiskFactors().map((_: RiskFactorData, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </AnimatedChart>
          </div>
        </AnimatedWrapper>
      )}

      {selectedView === 'risk-factors' && (
        <AnimatedWrapper
          delay={0.2}
          animation={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, delay: 0.2 }
            }
          }}
        >
          <div className="space-y-6">
            {/* Current Center Risk Factors */}
            <AnimatedChart>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  📋 Risk Factors - {selectedCenter === 'ALL' ? 'All Centers Combined' : selectedCenter}
                </h3>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={getCurrentData()} margin={{ left: 20, right: 30, top: 20, bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="factor" 
                      angle={-45}
                      textAnchor="end"
                      height={100}
                      fontSize={10}
                    />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                    <Bar dataKey="percentage" fill="#0891b2" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </AnimatedChart>

            {/* Risk Factors Table */}
            <AnimatedCard>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 Detailed Risk Factors Table</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full table-auto">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Factor</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Count</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                        {selectedCenter === 'ALL' && <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {getCurrentData().map((item: RiskFactorData, index: number) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.factor}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{item.count?.toLocaleString()}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                              {item.percentage.toFixed(1)}%
                            </span>
                          </td>
                          {selectedCenter === 'ALL' && (
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                              {item.rank || '-'}
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </AnimatedCard>
          </div>
        </AnimatedWrapper>
      )}

      {selectedView === 'comparison' && (
        <AnimatedWrapper
          delay={0.2}
          animation={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, delay: 0.2 }
            }
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Obesity Comparison */}
            <AnimatedChart>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">🔥 Obesity Rates by Center</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={obesityComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="center" 
                      angle={-45}
                      textAnchor="end"
                      height={60}
                      fontSize={10}
                    />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}%`, 'Obesity Rate']} />
                    <Bar dataKey="obesity" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </AnimatedChart>

            {/* Smoking Comparison */}
            <AnimatedChart>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">🚬 Smoking Rates by Center</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={smokingComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="center" 
                      angle={-45}
                      textAnchor="end"
                      height={60}
                      fontSize={10}
                    />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}%`, 'Smoking Rate']} />
                    <Bar dataKey="smoking" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </AnimatedChart>

            {/* Parity Comparison */}
            <AnimatedChart>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">👥 Parity ≥3 Rates by Center</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={parityComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="center" 
                      angle={-45}
                      textAnchor="end"
                      height={60}
                      fontSize={10}
                    />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}%`, 'Parity ≥3 Rate']} />
                    <Bar dataKey="parity" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </AnimatedChart>
          </div>
        </AnimatedWrapper>
      )}


    </div>
  );
};

export default RiskAnalytics;