import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, ComposedChart } from 'recharts';

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

      {/* View Selection */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Analysis View</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {views.map((view) => (
            <FilterCard
              key={view}
              title={view.charAt(0).toUpperCase() + view.slice(1).replace('-', ' ')}
              isActive={selectedView === view}
              onClick={() => setSelectedView(view)}
            />
          ))}
        </div>
      </div>

      {/* Health Center Filter - SOHAR P.C. explicitly excluded */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter by Health Center</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {centers.map((center) => (
            <FilterCard
              key={center}
              title={center === 'ALL' ? 'All Centers' : center.replace('AL ', '').replace('WADI ', '')}
              isActive={selectedCenter === center}
              onClick={() => setSelectedCenter(center)}
              count={center === 'ALL' ? availableCenters.length : undefined}
            />
          ))}
        </div>
        <div className="mt-3 text-xs text-gray-500">
          📝 Note: SOHAR P.C. excluded from analysis - data not available in database
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
      </div>

      {/* Content based on selected view */}
      {selectedView === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Assessment Coverage by Center */}
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

          {/* Top Risk Factors Distribution */}
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
        </div>
      )}

      {selectedView === 'risk-factors' && (
        <div className="space-y-6">
          {/* Current Center Risk Factors */}
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

          {/* Risk Factors Table */}
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
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.percentage > 20 ? 'bg-red-100 text-red-800' :
                          item.percentage > 10 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {item.percentage.toFixed(1)}%
                        </span>
                      </td>
                      {selectedCenter === 'ALL' && (
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                          {item.rank && <span className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">
                            {item.rank}
                          </span>}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {selectedView === 'comparison' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Obesity Comparison */}
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

          {/* Smoking Comparison */}
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

          {/* Parity Comparison */}
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
        </div>
      )}

      {selectedView === 'insights' && (
        <div className="space-y-6">
          {/* Key Findings */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">⚠️ Key Findings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                <h4 className="font-semibold text-red-800">🔴 Highest Risk Center</h4>
                <p className="text-red-700 text-sm mt-2">
                  <strong>WADI AHIN</strong><br />
                  • Extremely high obesity: 52.1%<br />
                  • High smoking rate: 22.3%<br />
                  • Highest parity ≥3: 53.2%
                </p>
              </div>
              
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
                <h4 className="font-semibold text-amber-800">🟡 Moderate Risk Centers</h4>
                <p className="text-amber-700 text-sm mt-2">
                  <strong>TAREEF</strong><br />
                  • High smoking: 19.5%<br />
                  • Significant obesity: 27.0%<br />
                  • Multiple risk factors present
                </p>
              </div>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                <h4 className="font-semibold text-blue-800">📊 Best Performance</h4>
                <p className="text-blue-700 text-sm mt-2">
                  <strong>AL MULTAQA</strong><br />
                  • 100% Assessment Coverage<br />
                  • Lowest obesity rate: 1.8%<br />
                  • Lowest smoking rate: 1.6%
                </p>
              </div>
              
              <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
                <h4 className="font-semibold text-green-800">✅ Overall Statistics</h4>
                <p className="text-green-700 text-sm mt-2">
                  • 97.9% overall assessment rate<br />
                  • 35.7% patients with parity ≥3<br />
                  • 10.6% total obesity prevalence<br />
                  • 7.1% smoking prevalence
                </p>
              </div>
            </div>
          </div>

          {/* Major Variations */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">📈 Major Variations by Center</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Obesity Range</h4>
                <div className="text-2xl font-bold text-red-600">1.8% - 52.1%</div>
                <p className="text-sm text-gray-600 mt-1">
                  29x variation between<br />
                  Al Multaqa and Wadi Ahin
                </p>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Smoking Range</h4>
                <div className="text-2xl font-bold text-amber-600">1.6% - 22.3%</div>
                <p className="text-sm text-gray-600 mt-1">
                  14x variation between<br />
                  Al Multaqa and Wadi Ahin
                </p>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Parity ≥3 Range</h4>
                <div className="text-2xl font-bold text-green-600">32.1% - 53.2%</div>
                <p className="text-sm text-gray-600 mt-1">
                  1.7x variation between<br />
                  Falaj and Wadi Ahin
                </p>
              </div>
            </div>
          </div>

          {/* Action Items */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">🎯 Recommended Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-blue-800 mb-2">Immediate Priority</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Targeted obesity intervention at WADI AHIN</li>
                  <li>• Smoking cessation programs at TAREEF & WADI AHIN</li>
                  <li>• Enhanced monitoring for high-parity patients</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-800 mb-2">Long-term Strategy</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Standardize risk assessment protocols</li>
                  <li>• Share best practices from AL MULTAQA</li>
                  <li>• Implement center-specific intervention programs</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Database Note */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-yellow-400 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <h4 className="text-sm font-semibold text-yellow-800">Database vs Dashboard Note</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  SOHAR P.C. data was not found in the database file, explaining discrepancies with the main dashboard. 
                  This analysis focuses on the 6 centers with complete data availability.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskAnalytics;