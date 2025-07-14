import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// --- Data ---
const summaryData = [
    { name: 'AL MULTAQA', total: 1467, assessed: 1467, rate: 100.0 },
    { name: 'AL UWAYNAT', total: 641, assessed: 597, rate: 93.1 },
    { name: 'TAREEF', total: 784, assessed: 758, rate: 96.7 },
    { name: 'FALAJ', total: 801, assessed: 797, rate: 99.5 },
    { name: 'WADI HIBI', total: 177, assessed: 172, rate: 97.2 },
    { name: 'WADI AHIN', total: 100, assessed: 94, rate: 94.0 },
    { name: 'TOTAL', total: 3970, assessed: 3885, rate: 97.9 },
];

const riskFactorsData = {
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
const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden ${className}`}>
        <div className="p-6 md:p-8">{children}</div>
    </div>
);

const Title = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-2xl font-bold text-gray-800 mb-4 tracking-tight">{children}</h2>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b-2 border-blue-500 pb-2">{children}</h3>
);

// --- Icon Components ---
const AlertTriangle = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500 mr-3"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
);
const InfoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500 mr-3"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
);
const DangerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 mr-3"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
);

const getIcon = (type: string) => {
    switch (type) {
        case 'info': return <InfoIcon />;
        case 'danger': return <DangerIcon />;
        case 'warning': return <AlertTriangle />;
        default: return <div className="w-6 h-6 mr-3"></div>;
    }
}

// --- Main Component ---
export default function PreExistingRiskFactors() {
    const [activeCenter, setActiveCenter] = useState('AL MULTAQA');

    const chartData = riskFactorsData[activeCenter].filter(d => d.factor !== 'Total Obesity (BMI ≥30)');
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1943', '#19D4FF'];

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-700">
            <main className="container mx-auto p-4 md:p-8">
                <header className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">Pre-existing Risk Factors</h1>
                    <p className="text-lg text-gray-500 mt-2">Detailed Analysis by Health Center</p>
                </header>

                {/* Summary Table */}
                <Card className="mb-8">
                    <SectionTitle>📊 Summary Table - All Health Centers</SectionTitle>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-100 border-b-2 border-gray-200">
                                    <th className="p-4 font-semibold text-gray-600">Health Center</th>
                                    <th className="p-4 font-semibold text-gray-600 text-right">Total Patients</th>
                                    <th className="p-4 font-semibold text-gray-600 text-right">VTE Assessed</th>
                                    <th className="p-4 font-semibold text-gray-600 text-right">Assessment Rate</th>
                                </tr>
                            </thead>
                            <tbody>
                                {summaryData.map((item, index) => (
                                    <tr key={item.name} className={`border-b border-gray-200 ${item.name === 'TOTAL' ? 'font-bold bg-gray-100' : 'hover:bg-gray-50'}`}>
                                        <td className="p-4">{item.name}</td>
                                        <td className="p-4 text-right">{item.total.toLocaleString()}</td>
                                        <td className="p-4 text-right">{item.assessed.toLocaleString()}</td>
                                        <td className="p-4 text-right">
                                            <span className={`px-2 py-1 rounded-full text-sm ${item.rate > 95 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {item.rate.toFixed(1)}%
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>

                {/* Risk Factors by Center */}
                <Card className="mb-8">
                    <SectionTitle>📈 Pre-existing Risk Factors by Health Center</SectionTitle>
                    <div className="mb-6">
                        <div className="flex flex-wrap gap-2">
                            {Object.keys(riskFactorsData).map(center => (
                                <button
                                    key={center}
                                    onClick={() => setActiveCenter(center)}
                                    className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${activeCenter === center ? 'bg-blue-500 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-200 border'}`}
                                >
                                    {center}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-gray-100 border-b-2 border-gray-200">
                                        <th className="p-3 font-semibold text-gray-600">Risk Factor</th>
                                        <th className="p-3 font-semibold text-gray-600 text-right">Count</th>
                                        <th className="p-3 font-semibold text-gray-600 text-right">%</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {riskFactorsData[activeCenter].map((risk, index) => (
                                        <tr key={index} className={`border-b border-gray-200 ${risk.factor.includes('Total') ? 'font-bold bg-gray-100' : 'hover:bg-gray-50'}`}>
                                            <td className="p-3">{risk.factor}</td>
                                            <td className="p-3 text-right">{risk.count.toLocaleString()}</td>
                                            <td className="p-3 text-right">{risk.percentage.toFixed(1)}%</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={110}
                                        fill="#8884d8"
                                        dataKey="percentage"
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value: any) => `${value.toFixed(1)}%`} />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </Card>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {/* Grand Total */}
                    <Card>
                        <SectionTitle>🎯 Grand Total - All Centers Combined</SectionTitle>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-gray-100 border-b-2 border-gray-200">
                                        <th className="p-3 font-semibold text-gray-600">Risk Factor</th>
                                        <th className="p-3 font-semibold text-gray-600 text-right">Count</th>
                                        <th className="p-3 font-semibold text-gray-600 text-right">%</th>
                                        <th className="p-3 font-semibold text-gray-600 text-right">Rank</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {grandTotalData.map((item, index) => (
                                        <tr key={index} className={`border-b border-gray-200 ${item.factor.includes('TOTAL') ? 'font-bold bg-gray-100' : 'hover:bg-gray-50'}`}>
                                            <td className="p-3">{item.factor}</td>
                                            <td className="p-3 text-right">{item.count.toLocaleString()}</td>
                                            <td className="p-3 text-right">{item.percentage.toFixed(1)}%</td>
                                            <td className="p-3 text-right font-mono">{item.rank}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>

                    {/* Key Findings */}
                    <Card>
                        <SectionTitle>⚠️ Key Findings</SectionTitle>
                        <ul className="space-y-3">
                            {keyFindings.map((finding, index) => (
                                <li key={index} className={`flex items-start ${finding.type === 'sub' ? 'pl-9 text-gray-600' : 'font-semibold'}`}>
                                    {getIcon(finding.type)}
                                    <span>{finding.text}</span>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>
            </main>
        </div>
    );
}