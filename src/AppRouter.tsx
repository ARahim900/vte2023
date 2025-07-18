import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { RFAgePage } from './pages';

// Import other pages here
// import { OverviewPage } from './pages/OverviewPage';
// import { RiskFactorsPage } from './pages/RiskFactorsPage';
// import { RiskAnalyticsPage } from './pages/RiskAnalyticsPage';
// import { InsightsPage } from './pages/InsightsPage';
// import { DatabasePage } from './pages/DatabasePage';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <nav className="navigation">
          <h2 className="nav-title">VTE 2023 KONE</h2>
          <ul className="nav-links">
            <li><Link to="/">📊 Overview & Metrics</Link></li>
            <li><Link to="/risk-factors">⚠️ Risk Factors</Link></li>
            <li><Link to="/risk-analytics">📈 Risk Analytics</Link></li>
            <li><Link to="/rf-age">👶 R.F. Age</Link></li>
            <li><Link to="/insights">💡 Insights & Analysis</Link></li>
            <li><Link to="/database">🗃️ Database</Link></li>
          </ul>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<div className="placeholder-page"><h1>📊 Overview & Metrics</h1><p>Overview page coming soon...</p></div>} />
            <Route path="/risk-factors" element={<div className="placeholder-page"><h1>⚠️ Risk Factors</h1><p>Risk Factors page coming soon...</p></div>} />
            <Route path="/risk-analytics" element={<div className="placeholder-page"><h1>📈 Risk Analytics</h1><p>Risk Analytics page coming soon...</p></div>} />
            <Route path="/rf-age" element={<RFAgePage />} />
            <Route path="/insights" element={<div className="placeholder-page"><h1>💡 Insights & Analysis</h1><p>Insights page coming soon...</p></div>} />
            <Route path="/database" element={<div className="placeholder-page"><h1>🗃️ Database</h1><p>Database page coming soon...</p></div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default AppRouter;

// CSS for the router (add to your global styles or create AppRouter.css)
const routerStyles = `
.app-container {
  display: flex;
  min-height: 100vh;
}

.navigation {
  width: 250px;
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
}

.nav-title {
  font-size: 1.4rem;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #34495e;
}

.nav-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-links li {
  margin-bottom: 10px;
}

.nav-links a {
  color: white;
  text-decoration: none;
  display: block;
  padding: 12px 15px;
  border-radius: 6px;
  transition: background-color 0.3s;
}

.nav-links a:hover {
  background-color: #34495e;
}

.nav-links a.active {
  background-color: #3498db;
}

.main-content {
  flex: 1;
  margin-left: 250px;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.placeholder-page {
  padding: 40px;
  text-align: center;
}

.placeholder-page h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
}

.placeholder-page p {
  font-size: 1.2rem;
  color: #666;
}

@media (max-width: 768px) {
  .app-container {
    flex-direction: column;
  }
  
  .navigation {
    width: 100%;
    height: auto;
    position: relative;
  }
  
  .main-content {
    margin-left: 0;
  }
}
`;
