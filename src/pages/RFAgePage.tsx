import React, { useState, useEffect } from 'react';
import './RFAgePage.css';

interface RiskFactorAge {
  id: string;
  factorName: string;
  category: string;
  dateIdentified: Date;
  ageInDays: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'mitigated' | 'resolved';
  description: string;
}

const RFAgePage: React.FC = () => {
  const [riskFactors, setRiskFactors] = useState<RiskFactorAge[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'age' | 'severity'>('age');

  useEffect(() => {
    // Simulate loading data
    const loadRiskFactors = () => {
      const mockData: RiskFactorAge[] = [
        {
          id: '1',
          factorName: 'Outdated Security Protocols',
          category: 'Security',
          dateIdentified: new Date('2024-01-15'),
          ageInDays: 184,
          severity: 'critical',
          status: 'active',
          description: 'Legacy authentication system needs upgrade'
        },
        {
          id: '2',
          factorName: 'Equipment Maintenance Overdue',
          category: 'Operational',
          dateIdentified: new Date('2024-03-20'),
          ageInDays: 120,
          severity: 'high',
          status: 'active',
          description: 'Elevator maintenance schedule exceeded'
        },
        {
          id: '3',
          factorName: 'Compliance Documentation Gap',
          category: 'Regulatory',
          dateIdentified: new Date('2024-05-10'),
          ageInDays: 69,
          severity: 'medium',
          status: 'mitigated',
          description: 'ISO certification documentation incomplete'
        },
        {
          id: '4',
          factorName: 'Staff Training Deficiency',
          category: 'Human Resources',
          dateIdentified: new Date('2024-06-01'),
          ageInDays: 47,
          severity: 'medium',
          status: 'active',
          description: 'New safety procedures training pending'
        },
        {
          id: '5',
          factorName: 'Budget Allocation Issue',
          category: 'Financial',
          dateIdentified: new Date('2024-06-15'),
          ageInDays: 33,
          severity: 'low',
          status: 'resolved',
          description: 'Q3 budget reallocation completed'
        }
      ];

      // Calculate actual age in days
      const today = new Date();
      mockData.forEach(rf => {
        const timeDiff = today.getTime() - rf.dateIdentified.getTime();
        rf.ageInDays = Math.floor(timeDiff / (1000 * 3600 * 24));
      });

      setRiskFactors(mockData);
      setLoading(false);
    };

    setTimeout(loadRiskFactors, 1000);
  }, []);

  const getFilteredRiskFactors = () => {
    let filtered = [...riskFactors];
    
    if (filterStatus !== 'all') {
      filtered = filtered.filter(rf => rf.status === filterStatus);
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'age') {
        return b.ageInDays - a.ageInDays;
      } else {
        const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
        return severityOrder[b.severity] - severityOrder[a.severity];
      }
    });

    return filtered;
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#ff0000';
      case 'high': return '#ff6600';
      case 'medium': return '#ffcc00';
      case 'low': return '#00cc00';
      default: return '#666666';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return '🔴 Active';
      case 'mitigated': return '🟡 Mitigated';
      case 'resolved': return '🟢 Resolved';
      default: return status;
    }
  };

  const getAgeCategory = (days: number) => {
    if (days > 180) return 'Very Old';
    if (days > 90) return 'Old';
    if (days > 30) return 'Moderate';
    return 'Recent';
  };

  if (loading) {
    return (
      <div className="rf-age-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading Risk Factor Age data...</p>
        </div>
      </div>
    );
  }

  const filteredRiskFactors = getFilteredRiskFactors();

  return (
    <div className="rf-age-page">
      <div className="page-header">
        <div className="header-content">
          <div className="title-section">
            <h1>📊 R.F. Age</h1>
            <p className="page-subtitle">Risk Factor Age Analysis - Track how long risks have been identified</p>
          </div>
          <div className="action-section">
            <a 
              href="https://vte2023.vercel.app" 
              className="analytics-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              💡 Explore Full Analytics Suite
            </a>
          </div>
        </div>
      </div>

      <div className="controls-section">
        <div className="filter-controls">
          <label>Filter by Status:</label>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="mitigated">Mitigated</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
        <div className="sort-controls">
          <label>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as 'age' | 'severity')}>
            <option value="age">Age (Days)</option>
            <option value="severity">Severity</option>
          </select>
        </div>
      </div>

      <div className="summary-cards">
        <div className="summary-card">
          <h3>Total Risk Factors</h3>
          <p className="summary-number">{riskFactors.length}</p>
        </div>
        <div className="summary-card">
          <h3>Active Risks</h3>
          <p className="summary-number active">{riskFactors.filter(rf => rf.status === 'active').length}</p>
        </div>
        <div className="summary-card">
          <h3>Average Age</h3>
          <p className="summary-number">
            {Math.round(riskFactors.reduce((sum, rf) => sum + rf.ageInDays, 0) / riskFactors.length)} days
          </p>
        </div>
        <div className="summary-card">
          <h3>Critical Risks</h3>
          <p className="summary-number critical">
            {riskFactors.filter(rf => rf.severity === 'critical').length}
          </p>
        </div>
      </div>

      <div className="risk-factors-grid">
        {filteredRiskFactors.map((rf) => (
          <div key={rf.id} className={`risk-factor-card ${rf.status}`}>
            <div className="rf-header">
              <h3>{rf.factorName}</h3>
              <span className="age-badge">{rf.ageInDays} days old</span>
            </div>
            
            <div className="rf-details">
              <div className="detail-row">
                <span className="label">Category:</span>
                <span>{rf.category}</span>
              </div>
              <div className="detail-row">
                <span className="label">Identified:</span>
                <span>{rf.dateIdentified.toLocaleDateString()}</span>
              </div>
              <div className="detail-row">
                <span className="label">Age Category:</span>
                <span className={`age-category ${getAgeCategory(rf.ageInDays).toLowerCase().replace(' ', '-')}`}>
                  {getAgeCategory(rf.ageInDays)}
                </span>
              </div>
              <div className="detail-row">
                <span className="label">Severity:</span>
                <span className="severity-badge" style={{ backgroundColor: getSeverityColor(rf.severity) }}>
                  {rf.severity.toUpperCase()}
                </span>
              </div>
              <div className="detail-row">
                <span className="label">Status:</span>
                <span className="status-badge">{getStatusBadge(rf.status)}</span>
              </div>
              <div className="description">
                <p>{rf.description}</p>
              </div>
            </div>

            <div className="rf-footer">
              <div className="age-indicator">
                <div 
                  className="age-bar"
                  style={{ 
                    width: `${Math.min((rf.ageInDays / 200) * 100, 100)}%`,
                    backgroundColor: rf.ageInDays > 100 ? '#ff6600' : '#4CAF50'
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredRiskFactors.length === 0 && (
        <div className="no-data">
          <p>No risk factors found matching the selected criteria.</p>
        </div>
      )}
    </div>
  );
};

export default RFAgePage;
