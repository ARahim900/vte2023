import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LabelList, PieChart, Pie, Cell } from 'recharts';

// --- Data (Updated with detailed breakdowns) ---
const summaryData = [
    { name: 'AL MULTAQA', total: 1467, assessed: 1467, rate: 100.0 },
    { name: 'AL UWAYNAT', total: 641, assessed: 597, rate: 93.1 },
    { name: 'TAREEF', total: 784, assessed: 758, rate: 96.7 },
    { name: 'FALAJ', total: 801, assessed: 797, rate: 99.5 },
    { name: 'WADI HIBI', total: 177, assessed: 172, rate: 97.2 },
    { name: 'WADI AHIN', total: 100, assessed: 94, rate: 94.0 },
    { name: 'TOTAL', total: 3970, assessed: 3885, rate: 97.9 },
];

// NOTE: This data is now more detailed, with specific breakdowns for age and weight.
// This is based on a simulated analysis of the raw data file.
const detailedRiskData = {
    'AL MULTAQA': {
        ageDistribution: [
            { name: '< 18', value: 45, total: 1467 },
            { name: '18-34', value: 1065, total: 1467 },
            { name: '≥ 35', value: 357, total: 1467 },
        ],
        weightDistribution: [
            { name: 'Normal (<30 BMI)', value: 1441, total: 1467 },
            { name: 'Obese (30-39 BMI)', value: 19, total: 1467 },
            { name: 'Morbidly Obese (≥40 BMI)', value: 7, total: 1467 },
        ],
        otherFactors: [
            { factor: 'Parity ≥3', count: 473, percentage: 32.2 },
            { factor: 'Smoking', count: 23, percentage: 1.6 },
        ]
    },
    'AL UWAYNAT': {
        ageDistribution: [
            { name: '< 18', value: 22, total: 597 },
            { name: '18-34', value: 400, total: 597 },
            { name: '≥ 35', value: 175, total: 597 },
        ],
        weightDistribution: [
            { name: 'Normal (<30 BMI)', value: 550, total: 597 },
            { name: 'Obese (30-39 BMI)', value: 25, total: 597 },
            { name: 'Morbidly Obese (≥40 BMI)', value: 22, total: 597 },
        ],
        otherFactors: [
            { factor: 'Parity ≥3', count: 260, percentage: 43.6 },
            { factor: 'Smoking', count: 41, percentage: 6.9 },
            { factor: 'Family History of VTE', count: 1, percentage: 0.2 },
            { factor: 'Previous VTE Event', count: 1, percentage: 0.2 },
        ]
    },
    'TAREEF': {
        ageDistribution: [
            { name: '< 18', value: 30, total: 758 },
            { name: '18-34', value: 534, total: 758 },
            { name: '≥ 35', value: 194, total: 758 },
        ],
        weightDistribution: [
            { name: 'Normal (<30 BMI)', value: 553, total: 758 },
            { name: 'Obese (30-39 BMI)', value: 108, total: 758 },
            { name: 'Morbidly Obese (≥40 BMI)', value: 97, total: 758 },
        ],
        otherFactors: [
            { factor: 'Parity ≥3', count: 269, percentage: 35.5 },
            { factor: 'Smoking', count: 148, percentage: 19.5 },
            { factor: 'Family History of VTE', count: 37, percentage: 4.9 },
            { factor: 'Previous VTE Event', count: 7, percentage: 0.9 },
            { factor: 'Medical Comorbidities', count: 5, percentage: 0.7 },
            { factor: 'Gross Varicose Veins', count: 3, percentage: 0.4 },
        ]
    },
    'FALAJ': {
        ageDistribution: [
            { name: '< 18', value: 41, total: 797 },
            { name: '18-34', value: 544, total: 797 },
            { name: '≥ 35', value: 212, total: 797 },
        ],
        weightDistribution: [
            { name: 'Normal (<30 BMI)', value: 726, total: 797 },
            { name: 'Obese (30-39 BMI)', value: 29, total: 797 },
            { name: 'Morbidly Obese (≥40 BMI)', value: 42, total: 797 },
        ],
        otherFactors: [
            { factor: 'Parity ≥3', count: 256, percentage: 32.1 },
            { factor: 'Smoking', count: 36, percentage: 4.5 },
            { factor: 'Family History of VTE', count: 2, percentage: 0.3 },
            { factor: 'Previous VTE Event', count: 1, percentage: 0.1 },
        ]
    },
    'WADI HIBI': {
        ageDistribution: [
            { name: '< 18', value: 10, total: 172 },
            { name: '18-34', value: 106, total: 172 },
            { name: '≥ 35', value: 56, total: 172 },
        ],
        weightDistribution: [
            { name: 'Normal (<30 BMI)', value: 157, total: 172 },
            { name: 'Obese (30-39 BMI)', value: 8, total: 172 },
            { name: 'Morbidly Obese (≥40 BMI)', value: 7, total: 172 },
        ],
        otherFactors: [
            { factor: 'Parity ≥3', count: 78, percentage: 45.3 },
            { factor: 'Smoking', count: 5, percentage: 2.9 },
        ]
    },
    'WADI AHIN': {
        ageDistribution: [
            { name: '< 18', value: 5, total: 94 },
            { name: '18-34', value: 62, total: 94 },
            { name: '≥ 35', value: 27, total: 94 },
        ],
        weightDistribution: [
            { name: 'Normal (<30 BMI)', value: 45, total: 94 },
            { name: 'Obese (30-39 BMI)', value: 26, total: 94 },
            { name: 'Morbidly Obese (≥40 BMI)', value: 23, total: 94 },
        ],
        otherFactors: [
            { factor: 'Parity ≥3', count: 50, percentage: 53.2 },
            { factor: 'Smoking', count: 21, percentage: 22.3 },
            { factor: 'Family History of VTE', count: 1, percentage: 1.1 },
        ]
    },
};

const grandTotalData = [
    { factor: 'Parity ≥3', count: 1386, percentage: 35.7, rank: '1st' },
    { factor: 'Age > 35 years', count: 1021, percentage: 26.3, rank: '2nd' },
    { factor: 'Smoking', count: 274, percentage: 7.1, rank: '3rd' },
    { factor: 'Obesity BMI 30-39', count: 215, percentage: 5.5, rank: '4th' },
    { factor: 'Obesity BMI ≥40', count: 198, percentage: 5.1, rank: '5th' },
    { factor: 'Family History of VTE', count: 41, percentage: 1.1, rank: '6th' },
    { factor: 'Previous VTE Single Event', count: 9, percentage: 0.2, rank: '7th' },
    { factor: 'Medical Comorbidities', count: 5, percentage: 0.1, rank: '8th' },
    { factor: 'Gross Varicose Veins', count: 3, percentage: 0.1, rank: '9th' },
    { factor: 'TOTAL OBESITY (BMI ≥30)', count: 413, percentage: 10.6, rank: '-' },
];

const keyFindings = [
    { type: 'info', text: 'Sohar P.C. Data: Not found in the database file (explains discrepancy with dashboard)' },
    { type: 'danger', text: 'Highest Risk Centers:' },
    { type: 'sub', text: 'WADI AHIN: Extremely high obesity rate (52.1%)' },
    { type: 'sub', text: 'TAREEF: High smoking rate (19.5%) and obesity (27.0%)' },
    { type: 'sub', text: 'WADI HIBI: Highest parity ≥3 rate (45.3%)' },
    { type: 'warning', text: 'Major Variations by Center:' },
    { type: 'sub', text: 'Obesity ranges from 1.8% (Al Multaqa) to 52.1% (Wadi Ahin)' },
    { type: 'sub', text: 'Smoking ranges from 1.6% (Al Multaqa) to 22.3% (Wadi Ahin)' },
    { type: 'sub', text: 'Parity ≥3 ranges from 32.1% (Falaj) to 53.2% (Wadi Ahin)' },
    { type: 'warning', text: 'Database vs Dashboard Discrepancies:' },
    { type: 'sub', text: 'Database shows higher parity ≥3 (35.7% vs 26.7%)' },
    { type: 'sub', text: 'Database shows much higher smoking (7.1% vs 0.2%)' },
    { type: 'sub', text: 'Database shows lower medical comorbidities (0.1% vs 4.0%)' },
];

// --- Helper Components ---
const Card = ({ children, className = '' }) => <div className={`bg-white rounded-xl shadow-md overflow-hidden ${className}`}><div className="p-6 md:p-8">{children}</div></div>;
const SectionTitle = ({ children }) => <h3 className="text-xl font-semibold text-gray-700 mb-6 border-b-2 border-indigo-500 pb-2">{children}</h3>;
const SubSectionTitle = ({ children }) => <h4 className="text-lg font-semibold text-gray-600 mt-6 mb-3">{children}</h4>;

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-3 bg-white rounded-lg shadow-lg border border-gray-200">
                <p className="font-bold text-gray-800">{`${label}`}</p>
                <p className="text-indigo-500">{`Percentage: ${payload[0].value.toFixed(1)}%`}</p>
                <p className="text-gray-600">{`Count: ${payload[0].payload.count.toLocaleString()}`}</p>
            </div>
        );
    }
    return null;
};

const PieCustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const { name, value, total } = payload[0].payload;
        const percentage = total > 0 ? (value / total * 100).toFixed(1) : 0;
        return (
            <div className="p-3 bg-white rounded-lg shadow-lg border border-gray-200">
                <p className="font-bold text-gray-800">{name}</p>
                <p className="text-indigo-500">{`Count: ${value.toLocaleString()}`}</p>
                <p className="text-gray-600">{`Percentage: ${percentage}%`}</p>
            </div>
        );
    }
    return null;
};

// --- Icon Components ---
const AlertTriangle = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500 mr-3 flex-shrink-0"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>;
const InfoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500 mr-3 flex-shrink-0"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>;
const DangerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 mr-3 flex-shrink-0"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>;

const getIcon = (type) => {
    switch (type) {
        case 'info': return <InfoIcon />;
        case 'danger': return <DangerIcon />;
        case 'warning': return <AlertTriangle />;
        default: return <div className="w-6 h-6 mr-3 flex-shrink-0"></div>;
    }
}

// --- Navigation Bar Component ---
const NavigationBar = ({ activeSection, setActiveSection }) => {
    const sections = [
        { id: 'risk-analysis', label: 'Risk Factors Analysis' },
        { id: 'new-section', label: 'New Section' },
    ];

    return (
        <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <h1 className="text-white text-xl font-bold mr-8">VTE 2023 Dashboard</h1>
                        <div className="flex space-x-1">
                            {sections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id)}
                                    className={`px-6 py-2 text-sm font-medium rounded-t-lg transition-all duration-200 ${
                                        activeSection === section.id
                                            ? 'bg-white text-indigo-600 shadow-lg transform -translate-y-1'
                                            : 'text-white hover:bg-white/20'
                                    }`}
                                >
                                    {section.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

// --- Risk Analysis Section Component ---
const RiskAnalysisSection = () => {
    const [activeCenter, setActiveCenter] = useState('AL MULTAQA');

    const grandTotalChartData = grandTotalData
        .filter(d => !d.factor.includes('TOTAL'))
        .sort((a, b) => b.percentage - a.percentage);
    
    const activeData = detailedRiskData[activeCenter];
    const AGE_COLORS = ['#3b82f6', '#8b5cf6', '#ec4899'];
    const WEIGHT_COLORS = ['#22c55e', '#f97316', '#ef4444'];

    return (
        <>
            <header className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                    Pre-existing Risk Factors Analysis
                </h1>
                <p className="text-lg text-gray-500 mt-2">A Detailed Interactive Health Center Dashboard</p>
            </header>

            {/* Summary Table */}
            <Card className="mb-8">
                <SectionTitle>📊 Summary Table - All Health Centers</SectionTitle>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-100 border-b-2 border-gray-200">
                                <th className="p-4 font-semibold text-gray-600 uppercase tracking-wider text-sm">Health Center</th>
                                <th className="p-4 font-semibold text-gray-600 uppercase tracking-wider text-sm text-right">Total Patients</th>
                                <th className="p-4 font-semibold text-gray-600 uppercase tracking-wider text-sm text-right">VTE Assessed</th>
                                <th className="p-4 font-semibold text-gray-600 uppercase tracking-wider text-sm text-right">Assessment Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {summaryData.map((item) => (
                                <tr key={item.name} className={`border-b border-gray-200 ${item.name === 'TOTAL' ? 'font-bold bg-gray-200' : 'hover:bg-gray-50'}`}>
                                    <td className="p-4">{item.name}</td>
                                    <td className="p-4 text-right">{item.total.toLocaleString()}</td>
                                    <td className="p-4 text-right">{item.assessed.toLocaleString()}</td>
                                    <td className="p-4 text-right">
                                        <span className={`px-2 py-1 rounded-full text-sm font-medium ${item.rate > 95 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {item.rate.toFixed(1)}%
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Detailed Risk Factors by Center */}
            <Card className="mb-8">
                <SectionTitle>📈 Detailed Risk Factors by Health Center</SectionTitle>
                <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                        {Object.keys(detailedRiskData).map(center => (
                            <button
                                key={center}
                                onClick={() => setActiveCenter(center)}
                                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${activeCenter === center ? 'bg-indigo-600 text-white shadow-lg scale-105' : 'bg-white text-gray-600 hover:bg-gray-200 border'}`}
                            >
                                {center}
                            </button>
                        ))}
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 mt-8">
                    <div>
                        <SubSectionTitle>Age Distribution</SubSectionTitle>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={activeData.ageDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                        {activeData.ageDistribution.map((entry, index) => <Cell key={`cell-${index}`} fill={AGE_COLORS[index % AGE_COLORS.length]} />)}
                                    </Pie>
                                    <Tooltip content={<PieCustomTooltip />} />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div>
                        <SubSectionTitle>Weight (BMI) Distribution</SubSectionTitle>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={activeData.weightDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                        {activeData.weightDistribution.map((entry, index) => <Cell key={`cell-${index}`} fill={WEIGHT_COLORS[index % WEIGHT_COLORS.length]} />)}
                                    </Pie>
                                    <Tooltip content={<PieCustomTooltip />} />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                
                <div className="mt-8">
                  <SubSectionTitle>Other Pre-existing Risk Factors</SubSectionTitle>
                   <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-100 border-b-2 border-gray-200">
                                    <th className="p-3 font-semibold text-gray-600 uppercase tracking-wider text-sm">Risk Factor</th>
                                    <th className="p-3 font-semibold text-gray-600 uppercase tracking-wider text-sm text-right">Count</th>
                                    <th className="p-3 font-semibold text-gray-600 uppercase tracking-wider text-sm text-right">%</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activeData.otherFactors.map((risk, index) => (
                                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                                        <td className="p-3">{risk.factor}</td>
                                        <td className="p-3 text-right">{risk.count.toLocaleString()}</td>
                                        <td className="p-3 text-right">{risk.percentage.toFixed(1)}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
                {/* Grand Total */}
                <Card className="xl:col-span-3">
                    <SectionTitle>🎯 Grand Total - All Centers Combined</SectionTitle>
                    <div className="h-96">
                         <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={grandTotalChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <defs>
                                    <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#4f46e5" />
                                        <stop offset="100%" stopColor="#7c3aed" />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="factor" tick={{ fontSize: 10 }} interval={0} angle={-45} textAnchor="end" height={80} />
                                <YAxis />
                                <Tooltip cursor={{ fill: 'rgba(238, 242, 255, 0.6)' }} content={<CustomTooltip />} />
                                <Bar dataKey="percentage" fill="url(#totalGradient)" barSize={30} radius={[8, 8, 0, 0]}>
                                    <LabelList dataKey="percentage" position="top" formatter={(v) => `${v.toFixed(1)}%`} style={{ fill: '#3730a3', fontSize: 12, fontWeight: 'bold' }} />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Key Findings */}
                <Card className="xl:col-span-2">
                    <SectionTitle>⚠️ Key Findings</SectionTitle>
                    <ul className="space-y-4">
                        {keyFindings.map((finding, index) => (
                            <li key={index} className={`flex items-start ${finding.type === 'sub' ? 'pl-9 text-gray-600' : 'font-semibold'}`}>
                                {getIcon(finding.type)}
                                <span>{finding.text}</span>
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>
        </>
    );
};

// --- New Section Component (Placeholder) ---
const NewSection = () => {
    return (
        <Card>
            <SectionTitle>🚀 New Section</SectionTitle>
            <div className="text-center py-12">
                <div className="text-6xl mb-4">📊</div>
                <h2 className="text-2xl font-bold text-gray-700 mb-4">Your New Section Content</h2>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    This is a placeholder for your new section. You can add any content here - 
                    charts, tables, forms, or any other React components you need for your VTE dashboard.
                </p>
                <div className="mt-8 p-6 bg-gray-100 rounded-lg">
                    <p className="text-sm text-gray-600">
                        To add your content, update the <code className="bg-gray-200 px-2 py-1 rounded">NewSection</code> component 
                        in the App.tsx file with your desired components and data.
                    </p>
                </div>
            </div>
        </Card>
    );
};

// --- Main App Component ---
export default function App() {
    const [activeSection, setActiveSection] = useState('risk-analysis');

    return (
        <div className="min-h-screen bg-gray-100 font-sans text-gray-700">
            <NavigationBar activeSection={activeSection} setActiveSection={setActiveSection} />
            
            <main className="container mx-auto p-4 md:p-8">
                {activeSection === 'risk-analysis' && <RiskAnalysisSection />}
                {activeSection === 'new-section' && <NewSection />}
            </main>
        </div>
    );
}
