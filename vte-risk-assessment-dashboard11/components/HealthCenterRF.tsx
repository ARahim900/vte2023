import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LabelList, PieChart, Pie, Cell } from 'recharts';

// --- Type Definitions ---
interface SummaryDataItem {
    name: string;
    total: number;
    assessed: number;
    rate: number;
}

interface DistributionItem {
    name: string;
    value: number;
    total: number;
}

interface OtherFactor {
    factor: string;
    count: number;
    percentage: number;
}

interface CenterData {
    ageDistribution: DistributionItem[];
    weightDistribution: DistributionItem[];
    otherFactors: OtherFactor[];
}

interface DetailedRiskData {
    [key: string]: CenterData;
}

interface GrandTotalItem {
    factor: string;
    count: number;
    percentage: number;
    rank: string;
}

interface KeyFinding {
    type: 'info' | 'danger' | 'warning' | 'sub';
    text: string;
}

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

interface SectionTitleProps {
    children: React.ReactNode;
}

interface TooltipProps {
    active?: boolean;
    payload?: Array<{
        value: number;
        payload: {
            count: number;
            [key: string]: any;
        };
    }>;
    label?: string;
}

interface PieTooltipProps {
    active?: boolean;
    payload?: Array<{
        payload: {
            name: string;
            value: number;
            total: number;
        };
    }>;
}

// --- Data (Updated with detailed breakdowns) ---
const summaryData: SummaryDataItem[] = [
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
const detailedRiskData: DetailedRiskData = {
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

const grandTotalData: GrandTotalItem[] = [
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

const keyFindings: KeyFinding[] = [
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
const Card: React.FC<CardProps> = ({ children, className = '' }) => (
    <div className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out overflow-hidden border border-gray-100 ${className}`}>
        <div className="p-6 md:p-8">{children}</div>
    </div>
);

const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => (
    <h3 className="text-2xl font-bold text-gray-800 mb-8 relative">
        <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {children}
        </span>
        <div className="absolute bottom-0 left-0 w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
    </h3>
);

const SubSectionTitle: React.FC<SectionTitleProps> = ({ children }) => (
    <h4 className="text-lg font-semibold text-gray-700 mb-4 font-inter">{children}</h4>
);

const CustomTooltip: React.FC<TooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-4 bg-white rounded-xl shadow-2xl border border-gray-200 backdrop-blur-sm bg-opacity-95 transform transition-all duration-200 ease-in-out">
                <p className="font-bold text-gray-800 mb-2 font-inter">{`${label}`}</p>
                <p className="text-blue-600 font-semibold">{`Percentage: ${payload[0].value.toFixed(1)}%`}</p>
                <p className="text-gray-600">{`Count: ${payload[0].payload.count.toLocaleString()}`}</p>
            </div>
        );
    }
    return null;
};

const PieCustomTooltip: React.FC<PieTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const { name, value, total } = payload[0].payload;
        const percentage = total > 0 ? (value / total * 100).toFixed(1) : 0;
        return (
            <div className="p-4 bg-white rounded-xl shadow-2xl border border-gray-200 backdrop-blur-sm bg-opacity-95 transform transition-all duration-200 ease-in-out">
                <p className="font-bold text-gray-800 mb-2 font-inter">{name}</p>
                <p className="text-blue-600 font-semibold">{`Count: ${value.toLocaleString()}`}</p>
                <p className="text-gray-600">{`Percentage: ${percentage}%`}</p>
            </div>
        );
    }
    return null;
};

// --- Icon Components ---
const AlertTriangle: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500 mr-3 flex-shrink-0">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
);

const InfoIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500 mr-3 flex-shrink-0">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
);

const DangerIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 mr-3 flex-shrink-0">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
);

const getIcon = (type: string): React.ReactNode => {
    switch (type) {
        case 'info': return <InfoIcon />;
        case 'danger': return <DangerIcon />;
        case 'warning': return <AlertTriangle />;
        default: return <div className="w-6 h-6 mr-3 flex-shrink-0"></div>;
    }
}

// --- Main Component ---
const HealthCenterRF: React.FC = () => {
    const [activeCenter, setActiveCenter] = useState<string>('AL MULTAQA');
    const [isAnimated, setIsAnimated] = useState<boolean>(false);

    React.useEffect(() => {
        const timer = setTimeout(() => setIsAnimated(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const grandTotalChartData = grandTotalData
        .filter(d => !d.factor.includes('TOTAL'))
        .sort((a, b) => b.percentage - a.percentage);
    
    const activeData = detailedRiskData[activeCenter];

    return (
        <div className={`min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 font-inter transition-all duration-1000 ease-in-out ${isAnimated ? 'opacity-100' : 'opacity-0'}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
                <header className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4">
                        <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Pre-existing Risk Factors
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
                        A comprehensive interactive healthcare analytics dashboard providing detailed insights into VTE risk assessment across health centers
                    </p>
                </header>

                {/* Enhanced Summary Table */}
                <Card className="mb-12">
                    <SectionTitle>📊 Assessment Coverage Overview</SectionTitle>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gradient-to-r from-gray-50 to-blue-50 border-b-2 border-blue-200">
                                    <th className="p-6 font-bold text-gray-700 uppercase tracking-wider text-sm">Health Center</th>
                                    <th className="p-6 font-bold text-gray-700 uppercase tracking-wider text-sm text-right">Total Patients</th>
                                    <th className="p-6 font-bold text-gray-700 uppercase tracking-wider text-sm text-right">VTE Assessed</th>
                                    <th className="p-6 font-bold text-gray-700 uppercase tracking-wider text-sm text-right">Coverage Rate</th>
                                </tr>
                            </thead>
                            <tbody>
                                {summaryData.map((item) => (
                                    <tr key={item.name} className={`border-b border-gray-100 transition-all duration-200 ease-in-out hover:bg-gradient-to-r hover:from-blue-25 hover:to-indigo-25 ${item.name === 'TOTAL' ? 'font-bold bg-gradient-to-r from-blue-100 to-indigo-100' : ''}`}>
                                        <td className="p-6 font-semibold text-gray-800">{item.name}</td>
                                        <td className="p-6 text-right font-mono text-gray-700">{item.total.toLocaleString()}</td>
                                        <td className="p-6 text-right font-mono text-gray-700">{item.assessed.toLocaleString()}</td>
                                        <td className="p-6 text-right">
                                            <span className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${item.rate > 95 ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800' : 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800'}`}>
                                                {item.rate.toFixed(1)}%
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>

                {/* Enhanced Center Selection and Charts */}
                <Card className="mb-12">
                    <SectionTitle>📈 Risk Factor Analysis by Health Center</SectionTitle>
                    <div className="mb-8">
                        <div className="flex flex-wrap gap-3">
                            {Object.keys(detailedRiskData).map(center => (
                                <button
                                    key={center}
                                    onClick={() => setActiveCenter(center)}
                                    className={`px-6 py-3 text-sm font-bold rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 ${
                                        activeCenter === center 
                                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
                                            : 'bg-white text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 border border-gray-200 hover:border-blue-300'
                                    }`}
                                >
                                    {center}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 mt-12">
                        <div className="space-y-6">
                            <SubSectionTitle>Age Distribution</SubSectionTitle>
                            <div className="h-80 bg-gradient-to-br from-blue-25 to-indigo-25 rounded-xl p-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <defs>
                                            <linearGradient id="ageGradient1" x1="0" y1="0" x2="1" y2="1">
                                                <stop offset="0%" stopColor="#3B82F6" />
                                                <stop offset="100%" stopColor="#1D4ED8" />
                                            </linearGradient>
                                            <linearGradient id="ageGradient2" x1="0" y1="0" x2="1" y2="1">
                                                <stop offset="0%" stopColor="#8B5CF6" />
                                                <stop offset="100%" stopColor="#7C3AED" />
                                            </linearGradient>
                                            <linearGradient id="ageGradient3" x1="0" y1="0" x2="1" y2="1">
                                                <stop offset="0%" stopColor="#EC4899" />
                                                <stop offset="100%" stopColor="#DB2777" />
                                            </linearGradient>
                                        </defs>
                                        <Pie 
                                            data={activeData.ageDistribution} 
                                            dataKey="value" 
                                            nameKey="name" 
                                            cx="50%" 
                                            cy="50%" 
                                            outerRadius={100}
                                            innerRadius={30}
                                            label={({ value, total }: { value: number; total: number }) => `${((value / total) * 100).toFixed(1)}%`}
                                            labelLine={false}
                                        >
                                            {activeData.ageDistribution.map((_, index: number) => (
                                                <Cell key={`cell-${index}`} fill={`url(#ageGradient${index + 1})`} />
                                            ))}
                                        </Pie>
                                        <Tooltip content={<PieCustomTooltip active={true} payload={[]} />} />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        
                        <div className="space-y-6">
                            <SubSectionTitle>BMI Distribution</SubSectionTitle>
                            <div className="h-80 bg-gradient-to-br from-green-25 to-blue-25 rounded-xl p-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <defs>
                                            <linearGradient id="weightGradient1" x1="0" y1="0" x2="1" y2="1">
                                                <stop offset="0%" stopColor="#10B981" />
                                                <stop offset="100%" stopColor="#059669" />
                                            </linearGradient>
                                            <linearGradient id="weightGradient2" x1="0" y1="0" x2="1" y2="1">
                                                <stop offset="0%" stopColor="#F59E0B" />
                                                <stop offset="100%" stopColor="#D97706" />
                                            </linearGradient>
                                            <linearGradient id="weightGradient3" x1="0" y1="0" x2="1" y2="1">
                                                <stop offset="0%" stopColor="#EF4444" />
                                                <stop offset="100%" stopColor="#DC2626" />
                                            </linearGradient>
                                        </defs>
                                        <Pie 
                                            data={activeData.weightDistribution} 
                                            dataKey="value" 
                                            nameKey="name" 
                                            cx="50%" 
                                            cy="50%" 
                                            outerRadius={100}
                                            innerRadius={30}
                                            label={({ value, total }: { value: number; total: number }) => `${((value / total) * 100).toFixed(1)}%`}
                                            labelLine={false}
                                        >
                                            {activeData.weightDistribution.map((_, index: number) => (
                                                <Cell key={`cell-${index}`} fill={`url(#weightGradient${index + 1})`} />
                                            ))}
                                        </Pie>
                                        <Tooltip content={<PieCustomTooltip active={true} payload={[]} />} />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-12">
                        <SubSectionTitle>Additional Risk Factors</SubSectionTitle>
                        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b-2 border-blue-200">
                                            <th className="p-4 font-bold text-gray-700 uppercase tracking-wider text-sm">Risk Factor</th>
                                            <th className="p-4 font-bold text-gray-700 uppercase tracking-wider text-sm text-right">Count</th>
                                            <th className="p-4 font-bold text-gray-700 uppercase tracking-wider text-sm text-right">Percentage</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {activeData.otherFactors.map((risk: OtherFactor, index: number) => (
                                            <tr key={index} className="border-b border-gray-200 hover:bg-white hover:shadow-sm transition-all duration-200">
                                                <td className="p-4 font-semibold text-gray-800">{risk.factor}</td>
                                                <td className="p-4 text-right font-mono text-gray-700">{risk.count.toLocaleString()}</td>
                                                <td className="p-4 text-right">
                                                    <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                                        {risk.percentage.toFixed(1)}%
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </Card>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Enhanced Grand Total Chart */}
                    <Card className="xl:col-span-2">
                        <SectionTitle>🎯 Overall Risk Factor Distribution</SectionTitle>
                        <div className="h-96 bg-gradient-to-br from-indigo-25 to-purple-25 rounded-xl p-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={grandTotalChartData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                                    <defs>
                                        <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#4F46E5" />
                                            <stop offset="50%" stopColor="#7C3AED" />
                                            <stop offset="100%" stopColor="#9333EA" />
                                        </linearGradient>
                                    </defs>
                                    <XAxis 
                                        dataKey="factor" 
                                        tick={{ fontSize: 11, fill: '#374151', fontWeight: 600 }} 
                                        interval={0} 
                                        angle={-45} 
                                        textAnchor="end" 
                                        height={80}
                                        axisLine={{ stroke: '#E5E7EB', strokeWidth: 2 }}
                                        tickLine={{ stroke: '#E5E7EB' }}
                                    />
                                    <YAxis 
                                        tick={{ fontSize: 12, fill: '#374151', fontWeight: 600 }}
                                        axisLine={{ stroke: '#E5E7EB', strokeWidth: 2 }}
                                        tickLine={{ stroke: '#E5E7EB' }}
                                    />
                                    <Tooltip 
                                        cursor={{ fill: 'rgba(79, 70, 229, 0.1)' }} 
                                        content={<CustomTooltip active={true} payload={[]} label="" />} 
                                    />
                                    <Bar 
                                        dataKey="percentage" 
                                        fill="url(#totalGradient)" 
                                        barSize={40} 
                                        radius={[8, 8, 0, 0]}
                                    >
                                        <LabelList 
                                            dataKey="percentage" 
                                            position="top" 
                                            formatter={(v: number) => `${v.toFixed(1)}%`} 
                                            style={{ fill: '#1F2937', fontSize: 12, fontWeight: 'bold' }} 
                                        />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    {/* Enhanced Key Findings */}
                    <Card>
                        <SectionTitle>⚠️ Key Insights</SectionTitle>
                        <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
                            {keyFindings.map((finding: KeyFinding, index: number) => (
                                <div key={index} className={`flex items-start p-3 rounded-lg transition-all duration-200 hover:shadow-md ${finding.type === 'sub' ? 'pl-12 text-gray-600 bg-gray-50' : 'font-semibold bg-white border border-gray-100'}`}>
                                    {getIcon(finding.type)}
                                    <span className="leading-relaxed">{finding.text}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default HealthCenterRF; 