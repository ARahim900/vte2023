import React, { useState } from 'react';
import Head from 'next/head';
import { Clock, Filter, TrendingUp, AlertTriangle, Calendar, BarChart } from 'lucide-react';

const RFAgePage = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('age');

  // Mock data for risk factors with age
  const riskFactors = [
    { id: 1, name: 'Prolonged Immobility', severity: 'High', status: 'Active', createdDate: '2024-11-20', ageInDays: 241, department: 'ICU' },
    { id: 2, name: 'Post-Surgical State', severity: 'Critical', status: 'Active', createdDate: '2024-12-15', ageInDays: 216, department: 'Surgery' },
    { id: 3, name: 'Obesity (BMI > 30)', severity: 'Medium', status: 'Resolved', createdDate: '2024-10-10', ageInDays: 281, department: 'General' },
    { id: 4, name: 'Previous DVT History', severity: 'Critical', status: 'Active', createdDate: '2025-01-05', ageInDays: 195, department: 'Cardiology' },
    { id: 5, name: 'Advanced Age (>65)', severity: 'Medium', status: 'Active', createdDate: '2024-09-15', ageInDays: 306, department: 'Geriatrics' },
    { id: 6, name: 'Cancer Treatment', severity: 'High', status: 'Mitigated', createdDate: '2024-11-01', ageInDays: 260, department: 'Oncology' },
  ];

  const filteredFactors = riskFactors.filter(factor => {
    if (filterStatus === 'all') return true;
    return factor.status.toLowerCase() === filterStatus.toLowerCase();
  });

  const sortedFactors = [...filteredFactors].sort((a, b) => {
    if (sortBy === 'age') return b.ageInDays - a.ageInDays;
    if (sortBy === 'severity') {
      const severityOrder = { 'Critical': 3, 'High': 2, 'Medium': 1, 'Low': 0 };
      return severityOrder[b.severity] - severityOrder[a.severity];
    }
    return 0;
  });

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Active': return <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />;
      case 'Mitigated': return <div className="w-3 h-3 bg-yellow-500 rounded-full" />;
      case 'Resolved': return <div className="w-3 h-3 bg-green-500 rounded-full" />;
      default: return <div className="w-3 h-3 bg-gray-500 rounded-full" />;
    }
  };

  const getAgeColor = (days) => {
    if (days > 180) return 'bg-red-500';
    if (days > 90) return 'bg-orange-500';
    if (days > 30) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  // Summary statistics
  const stats = {
    total: riskFactors.length,
    active: riskFactors.filter(f => f.status === 'Active').length,
    avgAge: Math.round(riskFactors.reduce((acc, f) => acc + f.ageInDays, 0) / riskFactors.length),
    critical: riskFactors.filter(f => f.severity === 'Critical').length,
  };

  return (
    <>
      <Head>
        <title>R.F. Age - Risk Factor Aging Analysis | VTE 2023</title>
      </Head>
      
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header with Analytics Button */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                  <BarChart className="h-8 w-8 mr-3 text-emerald-600" />
                  Risk Factor Age Analysis
                </h1>
                <p className="mt-2 text-gray-600">Track how long risk factors have been identified and active</p>
              </div>
              <a
                href="https://vte2023.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
              >
                <span className="mr-2">💡</span>
                Explore Full Analytics Suite
              </a>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Risk Factors</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-500" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Factors</p>
                  <p className="text-2xl font-bold text-red-600">{stats.active}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Age</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.avgAge} days</p>
                </div>
                <Clock className="h-8 w-8 text-orange-500" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Critical Factors</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.critical}</p>
                </div>
                <Calendar className="h-8 w-8 text-purple-500" />
              </div>
            </div>
          </div>

          {/* Filters and Sort */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center space-x-4">
                <Filter className="h-5 w-5 text-gray-500" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="mitigated">Mitigated</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="age">Age (Oldest First)</option>
                  <option value="severity">Severity</option>
                </select>
              </div>
            </div>
          </div>

          {/* Risk Factors List */}
          <div className="space-y-4">
            {sortedFactors.map((factor) => (
              <div key={factor.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {getStatusIcon(factor.status)}
                      <h3 className="text-lg font-semibold text-gray-900">{factor.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getSeverityColor(factor.severity)}`}>
                        {factor.severity}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                      <div className="text-sm">
                        <span className="text-gray-500">Department:</span>
                        <span className="ml-2 font-medium text-gray-900">{factor.department}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500">Created:</span>
                        <span className="ml-2 font-medium text-gray-900">{new Date(factor.createdDate).toLocaleDateString()}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500">Status:</span>
                        <span className="ml-2 font-medium text-gray-900">{factor.status}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-6 text-center">
                    <div className="text-2xl font-bold text-gray-900">{factor.ageInDays}</div>
                    <div className="text-sm text-gray-500">days old</div>
                    <div className="mt-2 w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getAgeColor(factor.ageInDays)}`}
                        style={{ width: `${Math.min((factor.ageInDays / 365) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RFAgePage;