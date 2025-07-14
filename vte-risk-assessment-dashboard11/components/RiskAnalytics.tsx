import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';

// Mock data for the Risk Analytics Dashboard
const healthCenterData = [
  { center: 'SOHAR P.C.', assessments: 996, riskScore: 2.3, coverage: 98.2, highRisk: 45, mediumRisk: 89, lowRisk: 862 },
  { center: 'AL UWAYNAT', assessments: 508, riskScore: 2.1, coverage: 96.5, highRisk: 23, mediumRisk: 56, lowRisk: 429 },
  { center: 'AL MULTAQA', assessments: 435, riskScore: 1.9, coverage: 94.8, highRisk: 18, mediumRisk: 47, lowRisk: 370 },
  { center: 'TAREEF', assessments: 414, riskScore: 2.4, coverage: 95.2, highRisk: 21, mediumRisk: 52, lowRisk: 341 },
  { center: 'FALAJ', assessments: 362, riskScore: 2.2, coverage: 93.7, highRisk: 19, mediumRisk: 41, lowRisk: 302 },
  { center: 'WADI HIBI', assessments: 242, riskScore: 2.0, coverage: 91.8, highRisk: 12, mediumRisk: 28, lowRisk: 202 },
  { center: 'WADI AHIN', assessments: 129, riskScore: 1.8, coverage: 89.5, highRisk: 6, mediumRisk: 15, lowRisk: 108 }
];

const riskFactorTrends = [
  { month: 'Jan', high: 15, medium: 42, low: 158 },
  { month: 'Feb', high: 18, medium: 38, low: 162 },
  { month: 'Mar', high: 22, medium: 45, low: 168 },
  { month: 'Apr', high: 19, medium: 52, low: 174 },
  { month: 'May', high: 25, medium: 48, low: 180 },
  { month: 'Jun', high: 21, medium: 44, low: 186 },
  { month: 'Jul', high: 28, medium: 51, low: 192 },
  { month: 'Aug', high: 24, medium: 47, low: 198 },
  { month: 'Sep', high: 26, medium: 49, low: 204 },
  { month: 'Oct', high: 23, medium: 46, low: 210 },
  { month: 'Nov', high: 20, medium: 43, low: 216 },
  { month: 'Dec', high: 17, medium: 41, low: 222 }
];

const pieData = [
  { name: 'Low Risk', value: 2614, color: '#10B981' },
  { name: 'Medium Risk', value: 328, color: '#F59E0B' },
  { name: 'High Risk', value: 144, color: '#EF4444' }
];

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
  const [selectedCenters, setSelectedCenters] = useState<string[]>(['All Centers']);
  const [filteredData, setFilteredData] = useState(healthCenterData);

  const centers = ['All Centers', ...healthCenterData.map(center => center.center)];

  useEffect(() => {
    if (selectedCenters.includes('All Centers')) {
      setFilteredData(healthCenterData);
    } else {
      setFilteredData(healthCenterData.filter(center => selectedCenters.includes(center.center)));
    }
  }, [selectedCenters]);

  const handleCenterToggle = (center: string) => {
    if (center === 'All Centers') {
      setSelectedCenters(['All Centers']);
    } else {
      setSelectedCenters(prev => {
        const filtered = prev.filter(c => c !== 'All Centers');
        if (filtered.includes(center)) {
          const newSelection = filtered.filter(c => c !== center);
          return newSelection.length === 0 ? ['All Centers'] : newSelection;
        } else {
          return [...filtered, center];
        }
      });
    }
  };

  const totalAssessments = filteredData.reduce((sum, center) => sum + center.assessments, 0);
  const averageRiskScore = filteredData.reduce((sum, center) => sum + center.riskScore, 0) / filteredData.length;
  const averageCoverage = filteredData.reduce((sum, center) => sum + center.coverage, 0) / filteredData.length;
  const totalHighRisk = filteredData.reduce((sum, center) => sum + center.highRisk, 0);

  return (
    <div className="space-y-8 bg-gray-50 min-h-screen p-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Risk Analytics Dashboard</h2>
        <p className="text-gray-600">Advanced VTE Risk Factor Analysis & Health Center Performance Metrics</p>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter by Health Center</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {centers.map((center) => (
            <FilterCard
              key={center}
              title={center === 'All Centers' ? 'All' : center.replace('WADI ', '').replace('AL ', '')}
              isActive={selectedCenters.includes(center)}
              onClick={() => handleCenterToggle(center)}
              count={center === 'All Centers' ? healthCenterData.length : undefined}
            />
          ))}
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Assessments</p>
              <p className="text-3xl font-bold">{totalAssessments.toLocaleString()}</p>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Average Risk Score</p>
              <p className="text-3xl font-bold">{averageRiskScore.toFixed(1)}</p>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Coverage Rate</p>
              <p className="text-3xl font-bold">{averageCoverage.toFixed(1)}%</p>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm">High Risk Cases</p>
              <p className="text-3xl font-bold">{totalHighRisk}</p>
            </div>
            <div className="bg-white/20 rounded-lg p-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Risk Distribution Pie Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Risk Level Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Center Performance Bar Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Assessment Volume by Center</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="center" 
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={10}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="assessments" fill="#0891b2" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Trends Line Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Risk Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={riskFactorTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="high" stroke="#EF4444" strokeWidth={2} name="High Risk" />
              <Line type="monotone" dataKey="medium" stroke="#F59E0B" strokeWidth={2} name="Medium Risk" />
              <Line type="monotone" dataKey="low" stroke="#10B981" strokeWidth={2} name="Low Risk" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Coverage vs Risk Score */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Coverage vs Risk Score</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="center" 
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={10}
              />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="coverage" stackId="1" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Insights Panel */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">📊 Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
            <h4 className="font-semibold text-blue-800">Highest Performance</h4>
            <p className="text-blue-700 text-sm">
              {filteredData.sort((a, b) => b.assessments - a.assessments)[0]?.center} leads with {filteredData.sort((a, b) => b.assessments - a.assessments)[0]?.assessments} assessments
            </p>
          </div>
          <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
            <h4 className="font-semibold text-green-800">Best Coverage</h4>
            <p className="text-green-700 text-sm">
              {filteredData.sort((a, b) => b.coverage - a.coverage)[0]?.center} achieves {filteredData.sort((a, b) => b.coverage - a.coverage)[0]?.coverage.toFixed(1)}% coverage
            </p>
          </div>
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
            <h4 className="font-semibold text-amber-800">Risk Focus</h4>
            <p className="text-amber-700 text-sm">
              {totalHighRisk} high-risk cases identified across selected centers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAnalytics;