import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  PieChart, Pie, Cell, LineChart, Line, Area, AreaChart, ComposedChart
} from 'recharts';
import { 
  Activity, Users, TrendingUp, AlertCircle, Heart, Shield, 
  Flame, Baby, Calendar, Droplet, AlertTriangle, ChevronRight,
  MapPin, BarChart3, Info, ArrowUp, ArrowDown, Check, X
} from 'lucide-react';

interface RiskFactor {
  count: number;
  percentage: number;
}

interface CenterData {
  id: string;
  name: string;
  shortName: string;
  total: number;
  assessed: number;
  rate: number;
  color: string;
  riskFactors: {
    parity3Plus: RiskFactor;
    age35Plus: RiskFactor;
    obesityBMI30_39: RiskFactor;
    obesityBMI40Plus: RiskFactor;
    smoking: RiskFactor;
    familyHistory: RiskFactor;
    previousVTE: RiskFactor;
    varicoseVeins: RiskFactor;
    medicalComorbidities: RiskFactor;
    totalObesity: RiskFactor;
  };
}

const RiskAnalytics: React.FC = () => {
  const [selectedCenters, setSelectedCenters] = useState<string[]>(['all']);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // Data - following VTE healthcare standards
  const centerData: CenterData[] = [
    { 
      id: 'multaqa',
      name: 'AL MULTAQA', 
      shortName: 'MULTAQA',
      total: 1467, 
      assessed: 1467, 
      rate: 100.0,
      color: '#059669', // Emerald-600 - medical green
      riskFactors: {
        parity3Plus: { count: 473, percentage: 32.2 },
        age35Plus: { count: 357, percentage: 24.3 },
        obesityBMI30_39: { count: 19, percentage: 1.3 },
        obesityBMI40Plus: { count: 7, percentage: 0.5 },
        smoking: { count: 23, percentage: 1.6 },
        familyHistory: { count: 0, percentage: 0 },
        previousVTE: { count: 0, percentage: 0 },
        varicoseVeins: { count: 0, percentage: 0 },
        medicalComorbidities: { count: 0, percentage: 0 },
        totalObesity: { count: 26, percentage: 1.8 }
      }
    },
    { 
      id: 'uwaynat',
      name: 'AL UWAYNAT', 
      shortName: 'UWAYNAT',
      total: 641, 
      assessed: 597, 
      rate: 93.1,
      color: '#7C3AED', // Violet-600
      riskFactors: {
        parity3Plus: { count: 260, percentage: 43.6 },
        age35Plus: { count: 175, percentage: 29.3 },
        obesityBMI30_39: { count: 25, percentage: 4.2 },
        obesityBMI40Plus: { count: 22, percentage: 3.7 },
        smoking: { count: 41, percentage: 6.9 },
        familyHistory: { count: 1, percentage: 0.2 },
        previousVTE: { count: 1, percentage: 0.2 },
        varicoseVeins: { count: 0, percentage: 0 },
        medicalComorbidities: { count: 0, percentage: 0 },
        totalObesity: { count: 47, percentage: 7.9 }
      }
    },
    { 
      id: 'tareef',
      name: 'TAREEF', 
      shortName: 'TAREEF',
      total: 784, 
      assessed: 758, 
      rate: 96.7,
      color: '#0891B2', // Cyan-600
      riskFactors: {
        parity3Plus: { count: 269, percentage: 35.5 },
        age35Plus: { count: 194, percentage: 25.6 },
        obesityBMI30_39: { count: 108, percentage: 14.2 },
        obesityBMI40Plus: { count: 97, percentage: 12.8 },
        smoking: { count: 148, percentage: 19.5 },
        familyHistory: { count: 37, percentage: 4.9 },
        previousVTE: { count: 7, percentage: 0.9 },
        varicoseVeins: { count: 3, percentage: 0.4 },
        medicalComorbidities: { count: 5, percentage: 0.7 },
        totalObesity: { count: 205, percentage: 27.0 }
      }
    },
    { 
      id: 'falaj',
      name: 'FALAJ', 
      shortName: 'FALAJ',
      total: 801, 
      assessed: 797, 
      rate: 99.5,
      color: '#D97706', // Amber-600
      riskFactors: {
        parity3Plus: { count: 256, percentage: 32.1 },
        age35Plus: { count: 212, percentage: 26.6 },
        obesityBMI30_39: { count: 29, percentage: 3.6 },
        obesityBMI40Plus: { count: 42, percentage: 5.3 },
        smoking: { count: 36, percentage: 4.5 },
        familyHistory: { count: 2, percentage: 0.3 },
        previousVTE: { count: 1, percentage: 0.1 },
        varicoseVeins: { count: 0, percentage: 0 },
        medicalComorbidities: { count: 0, percentage: 0 },
        totalObesity: { count: 71, percentage: 8.9 }
      }
    },
    { 
      id: 'wadihibi',
      name: 'WADI HIBI', 
      shortName: 'W.HIBI',
      total: 177, 
      assessed: 172, 
      rate: 97.2,
      color: '#DC2626', // Red-600
      riskFactors: {
        parity3Plus: { count: 78, percentage: 45.3 },
        age35Plus: { count: 56, percentage: 32.6 },
        obesityBMI30_39: { count: 8, percentage: 4.7 },
        obesityBMI40Plus: { count: 7, percentage: 4.1 },
        smoking: { count: 5, percentage: 2.9 },
        familyHistory: { count: 0, percentage: 0 },
        previousVTE: { count: 0, percentage: 0 },
        varicoseVeins: { count: 0, percentage: 0 },
        medicalComorbidities: { count: 0, percentage: 0 },
        totalObesity: { count: 15, percentage: 8.7 }
      }
    },
    { 
      id: 'wadiahin',
      name: 'WADI AHIN', 
      shortName: 'W.AHIN',
      total: 100, 
      assessed: 94, 
      rate: 94.0,
      color: '#BE185D', // Pink-700
      riskFactors: {
        parity3Plus: { count: 50, percentage: 53.2 },
        age35Plus: { count: 27, percentage: 28.7 },
        obesityBMI30_39: { count: 26, percentage: 27.7 },
        obesityBMI40Plus: { count: 23, percentage: 24.5 },
        smoking: { count: 21, percentage: 22.3 },
        familyHistory: { count: 1, percentage: 1.1 },
        previousVTE: { count: 0, percentage: 0 },
        varicoseVeins: { count: 0, percentage: 0 },
        medicalComorbidities: { count: 0, percentage: 0 },
        totalObesity: { count: 49, percentage: 52.1 }
      }
    }
  ];

  // Handle toggle
  const handleToggle = (centerId: string): void => {
    setIsAnimating(true);
    if (centerId === 'all') {
      setSelectedCenters(['all']);
    } else {
      setSelectedCenters(prev => {
        let newSelection: string[];
        if (prev.includes('all')) {
          newSelection = [centerId];
        } else if (prev.includes(centerId)) {
          newSelection = prev.filter(id => id !== centerId);
          if (newSelection.length === 0) {
            newSelection = ['all'];
          }
        } else {
          newSelection = [...prev, centerId];
        }
        return newSelection;
      });
    }
    setTimeout(() => setIsAnimating(false), 300);
  };

  // Get filtered data
  const getFilteredData = (): CenterData[] => {
    if (selectedCenters.includes('all')) {
      return centerData;
    }
    return centerData.filter(center => selectedCenters.includes(center.id));
  };

  // Calculate aggregated stats
  const getAggregatedStats = () => {
    const filtered = getFilteredData();
    const total = filtered.reduce((sum, center) => sum + center.total, 0);
    const assessed = filtered.reduce((sum, center) => sum + center.assessed, 0);
    const rate = total > 0 ? (assessed / total * 100).toFixed(1) : '0';
    
    return { total, assessed, rate };
  };

  // Prepare pie chart data for risk factor distribution
  const preparePieData = () => {
    const filtered = getFilteredData();
    if (filtered.length === 0) return [];
    
    const aggregated = {
      parity3Plus: 0,
      age35Plus: 0,
      smoking: 0,
      totalObesity: 0,
      familyHistory: 0,
      other: 0
    };
    
    let totalAssessed = 0;
    filtered.forEach(center => {
      totalAssessed += center.assessed;
      aggregated.parity3Plus += center.riskFactors.parity3Plus.count;
      aggregated.age35Plus += center.riskFactors.age35Plus.count;
      aggregated.smoking += center.riskFactors.smoking.count;
      aggregated.totalObesity += center.riskFactors.totalObesity.count;
      aggregated.familyHistory += center.riskFactors.familyHistory.count;
      aggregated.other += center.riskFactors.previousVTE.count + center.riskFactors.medicalComorbidities.count + center.riskFactors.varicoseVeins.count;
    });
    
    const colors = ['#059669', '#7C3AED', '#DC2626', '#D97706', '#0891B2', '#6B7280'];
    
    return [
      { name: 'Parity ≥3', value: aggregated.parity3Plus, percentage: ((aggregated.parity3Plus / totalAssessed) * 100).toFixed(1), color: colors[0] },
      { name: 'Age > 35', value: aggregated.age35Plus, percentage: ((aggregated.age35Plus / totalAssessed) * 100).toFixed(1), color: colors[1] },
      { name: 'Smoking', value: aggregated.smoking, percentage: ((aggregated.smoking / totalAssessed) * 100).toFixed(1), color: colors[2] },
      { name: 'Obesity', value: aggregated.totalObesity, percentage: ((aggregated.totalObesity / totalAssessed) * 100).toFixed(1), color: colors[3] },
      { name: 'Family History', value: aggregated.familyHistory, percentage: ((aggregated.familyHistory / totalAssessed) * 100).toFixed(1), color: colors[4] },
      { name: 'Other', value: aggregated.other, percentage: ((aggregated.other / totalAssessed) * 100).toFixed(1), color: colors[5] }
    ].filter(item => item.value > 0);
  };

  // Prepare trend data for centers comparison
  const prepareTrendData = () => {
    return getFilteredData().map(center => ({
      name: center.shortName,
      parity: center.riskFactors.parity3Plus.percentage,
      age: center.riskFactors.age35Plus.percentage,
      obesity: center.riskFactors.totalObesity.percentage,
      smoking: center.riskFactors.smoking.percentage,
      total: center.total,
      assessed: center.assessed,
      rate: center.rate
    }));
  };

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800 mb-2 pb-2 border-b border-gray-200">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between mb-1 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></div>
                <span className="font-medium">{entry.name}:</span>
              </div>
              <span className="font-semibold ml-2" style={{ color: entry.color }}>
                {typeof entry.value === 'number' ? entry.value.toFixed(1) : entry.value}%
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const stats = getAggregatedStats();
  const pieData = preparePieData();
  const trendData = prepareTrendData();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-2xl font-bold text-gray-900">
                Risk Analytics
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                VTE risk factor analysis across health centers
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Active Centers</p>
                <p className="text-lg font-semibold text-gray-900">
                  {selectedCenters.includes('all') ? 'All (6)' : selectedCenters.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Clean Filter Section */}
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Filter by Health Center</h3>
            
            <div className="flex flex-wrap gap-3">
              {/* All Centers Filter */}
              <button
                onClick={() => handleToggle('all')}
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCenters.includes('all')
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <MapPin className="w-4 h-4 mr-2" />
                All Centers
              </button>

              {/* Individual Center Filters */}
              {centerData.map((center) => (
                <button
                  key={center.id}
                  onClick={() => handleToggle(center.id)}
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCenters.includes(center.id) && !selectedCenters.includes('all')
                      ? 'text-white shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  style={{ 
                    backgroundColor: selectedCenters.includes(center.id) && !selectedCenters.includes('all') 
                      ? center.color 
                      : undefined 
                  }}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  {center.shortName}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 transition-all duration-500 ${
          isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
        }`}>
          {[
            { label: 'Health Centers', value: selectedCenters.includes('all') ? 6 : selectedCenters.length, icon: MapPin, color: 'emerald' },
            { label: 'Total Patients', value: stats.total, icon: Users, color: 'blue' },
            { label: 'VTE Assessments', value: stats.assessed, icon: Activity, color: 'cyan' },
            { label: 'Coverage Rate', value: `${stats.rate}%`, icon: TrendingUp, color: 'amber' }
          ].map((stat, index) => {
            const Icon = stat.icon;
            const colorClasses = {
              emerald: 'bg-emerald-600',
              blue: 'bg-blue-600',
              cyan: 'bg-cyan-600',
              amber: 'bg-amber-600'
            };
            
            return (
              <div key={stat.label} className={`${colorClasses[stat.color as keyof typeof colorClasses]} rounded-lg p-6 text-white shadow-sm`}>
                <div className="flex items-center justify-between mb-4">
                  <Icon className="w-8 h-8 opacity-90" />
                  <div className="text-2xl font-bold">
                    {typeof stat.value === 'number' && stat.value > 999 ? stat.value.toLocaleString() : stat.value}
                  </div>
                </div>
                <p className="text-white/90 font-medium">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Visualizations Grid */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 transition-all duration-500 ${
          isAnimating ? 'opacity-50 translate-y-2' : 'opacity-100 translate-y-0'
        }`}>
          {/* Risk Factor Distribution Pie Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-emerald-600" />
              Risk Factor Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={50}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {pieData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-600">{item.name}: {item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Center Comparison Trends */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
              Center Performance Overview
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar yAxisId="left" dataKey="rate" fill="#059669" name="Assessment Rate %" radius={[3, 3, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="parity" stroke="#7C3AED" strokeWidth={2} name="Parity ≥3 %" />
                <Line yAxisId="right" type="monotone" dataKey="obesity" stroke="#D97706" strokeWidth={2} name="Obesity %" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Comprehensive Risk Factor Analysis */}
        <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8 transition-all duration-500 ${
          isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
        }`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-cyan-600" />
            Risk Factor Comparison by Center
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Bar dataKey="parity" fill="#059669" name="Parity ≥3 %" radius={[4, 4, 0, 0]} />
              <Bar dataKey="age" fill="#7C3AED" name="Age >35 %" radius={[4, 4, 0, 0]} />
              <Bar dataKey="obesity" fill="#D97706" name="Obesity %" radius={[4, 4, 0, 0]} />
              <Bar dataKey="smoking" fill="#DC2626" name="Smoking %" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Key Insights Panel */}
        <div className="bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-lg shadow-lg p-6 text-white">
          <h3 className="text-xl font-bold mb-6 flex items-center">
            <AlertCircle className="mr-3" size={24} />
            Clinical Insights & Analytics
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h4 className="font-semibold text-base mb-3 flex items-center">
                <TrendingUp className="mr-2" size={18} />
                Highest Risk Centers
              </h4>
              <div className="space-y-2 text-sm">
                {getFilteredData()
                  .sort((a, b) => b.riskFactors.totalObesity.percentage - a.riskFactors.totalObesity.percentage)
                  .slice(0, 3)
                  .map((center, index) => (
                    <div key={center.id} className="flex items-center justify-between p-2 bg-white/10 rounded">
                      <span className="font-medium">{center.shortName}</span>
                      <span className="font-semibold">{center.riskFactors.totalObesity.percentage}%</span>
                    </div>
                  ))}
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h4 className="font-semibold text-base mb-3 flex items-center">
                <BarChart3 className="mr-2" size={18} />
                Statistical Range
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Obesity:</span>
                  <span className="font-semibold">1.8% - 52.1%</span>
                </div>
                <div className="flex justify-between">
                  <span>Smoking:</span>
                  <span className="font-semibold">1.6% - 22.3%</span>
                </div>
                <div className="flex justify-between">
                  <span>Parity ≥3:</span>
                  <span className="font-semibold">32.1% - 53.2%</span>
                </div>
                <div className="flex justify-between">
                  <span>Coverage:</span>
                  <span className="font-semibold">93.1% - 100%</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h4 className="font-semibold text-base mb-3 flex items-center">
                <Info className="mr-2" size={18} />
                Current Selection
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Centers:</span>
                  <span className="font-semibold">
                    {selectedCenters.includes('all') ? 'All (6)' : selectedCenters.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Patients:</span>
                  <span className="font-semibold">{stats.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Assessed:</span>
                  <span className="font-semibold">{stats.assessed.toLocaleString()}</span>
                </div>
                <div className="p-2 bg-white/10 rounded text-center">
                  <span className="font-bold text-base">{stats.rate}%</span>
                  <br />
                  <span className="text-xs opacity-90">Coverage Rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAnalytics;