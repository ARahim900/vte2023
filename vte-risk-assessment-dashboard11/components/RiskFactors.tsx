import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { motion } from 'framer-motion';
import { AnimatedWrapper, AnimatedCard, AnimatedHeader, AnimatedTable, AnimatedChart, AnimatedList, AnimatedListItem } from './shared/AnimatedWrapper';

// --- Type Definitions ---
interface RiskFactor {
    factor: string;
    count: number;
    percentage: number;
}

interface SummaryItem {
    name: string;
    total: number;
    assessed: number;
    rate: number;
}

interface GrandTotalItem extends RiskFactor {
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

interface CustomTooltipProps {
    active?: boolean;
    payload?: Array<{
        value: number;
        payload: RiskFactor;
    }>;
    label?: string;
}

// --- Data (Reordered as per user request) ---
const summaryData: SummaryItem[] = [
    { name: 'AL MULTAQA', total: 1467, assessed: 1467, rate: 100.0 },
    { name: 'AL UWAYNAT', total: 641, assessed: 597, rate: 93.1 },
    { name: 'TAREEF', total: 784, assessed: 758, rate: 96.7 },
    { name: 'FALAJ', total: 801, assessed: 797, rate: 99.5 },
    { name: 'WADI HIBI', total: 177, assessed: 172, rate: 97.2 },
    { name: 'WADI AHIN', total: 100, assessed: 94, rate: 94.0 },
    { name: 'TOTAL', total: 3970, assessed: 3885, rate: 97.9 },
];

const riskFactorsData: Record<string, RiskFactor[]> = {
    'AL MULTAQA': [
        { factor: 'Parity ≥3', count: 473, percentage: 32.2 },
        { factor: 'Age > 35 years', count: 357, percentage: 24.3 },
        { factor: 'Obesity BMI 30-39', count: 19, percentage: 1.3 },
        { factor: 'Obesity BMI ≥40', count: 7, percentage: 0.5 },
        { factor: 'Total Obesity (BMI ≥30)', count: 26, percentage: 1.8 },
        { factor: 'Smoking', count: 23, percentage: 1.6 },
    ],
    'AL UWAYNAT': [
        { factor: 'Parity ≥3', count: 260, percentage: 43.6 },
        { factor: 'Age > 35 years', count: 175, percentage: 29.3 },
        { factor: 'Obesity BMI 30-39', count: 25, percentage: 4.2 },
        { factor: 'Obesity BMI ≥40', count: 22, percentage: 3.7 },
        { factor: 'Total Obesity (BMI ≥30)', count: 47, percentage: 7.9 },
        { factor: 'Smoking', count: 41, percentage: 6.9 },
        { factor: 'Family History of VTE', count: 1, percentage: 0.2 },
        { factor: 'Previous VTE Event', count: 1, percentage: 0.2 },
    ],
    'TAREEF': [
        { factor: 'Parity ≥3', count: 269, percentage: 35.5 },
        { factor: 'Age > 35 years', count: 194, percentage: 25.6 },
        { factor: 'Obesity BMI 30-39', count: 108, percentage: 14.2 },
        { factor: 'Obesity BMI ≥40', count: 97, percentage: 12.8 },
        { factor: 'Total Obesity (BMI ≥30)', count: 205, percentage: 27.0 },
        { factor: 'Smoking', count: 148, percentage: 19.5 },
        { factor: 'Family History of VTE', count: 37, percentage: 4.9 },
        { factor: 'Previous VTE Event', count: 7, percentage: 0.9 },
        { factor: 'Medical Comorbidities', count: 5, percentage: 0.7 },
        { factor: 'Gross Varicose Veins', count: 3, percentage: 0.4 },
    ],
    'FALAJ': [
        { factor: 'Parity ≥3', count: 256, percentage: 32.1 },
        { factor: 'Age > 35 years', count: 212, percentage: 26.6 },
        { factor: 'Obesity BMI 30-39', count: 29, percentage: 3.6 },
        { factor: 'Obesity BMI ≥40', count: 42, percentage: 5.3 },
        { factor: 'Total Obesity (BMI ≥30)', count: 71, percentage: 8.9 },
        { factor: 'Smoking', count: 36, percentage: 4.5 },
        { factor: 'Family History of VTE', count: 2, percentage: 0.3 },
        { factor: 'Previous VTE Event', count: 1, percentage: 0.1 },
    ],
    'WADI HIBI': [
        { factor: 'Parity ≥3', count: 78, percentage: 45.3 },
        { factor: 'Age > 35 years', count: 56, percentage: 32.6 },
        { factor: 'Obesity BMI 30-39', count: 8, percentage: 4.7 },
        { factor: 'Obesity BMI ≥40', count: 7, percentage: 4.1 },
        { factor: 'Total Obesity (BMI ≥30)', count: 15, percentage: 8.7 },
        { factor: 'Smoking', count: 5, percentage: 2.9 },
    ],
    'WADI AHIN': [
        { factor: 'Parity ≥3', count: 50, percentage: 53.2 },
        { factor: 'Age > 35 years', count: 27, percentage: 28.7 },
        { factor: 'Obesity BMI 30-39', count: 26, percentage: 27.7 },
        { factor: 'Obesity BMI ≥40', count: 23, percentage: 24.5 },
        { factor: 'Total Obesity (BMI ≥30)', count: 49, percentage: 52.1 },
        { factor: 'Smoking', count: 21, percentage: 22.3 },
        { factor: 'Family History of VTE', count: 1, percentage: 1.1 },
    ],
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
    <AnimatedCard className={`bg-white rounded-xl shadow-md overflow-hidden card-hover ${className}`}>
        <div className="p-6 md:p-8">{children}</div>
    </AnimatedCard>
);

const SectionTitle: React.FC<SectionTitleProps> = ({ children }) => (
    <AnimatedWrapper
        animation={{
            hidden: { opacity: 0, x: -20 },
            visible: { 
                opacity: 1, 
                x: 0,
                transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
            }
        }}
    >
        <h3 className="text-xl font-semibold text-gray-700 mb-6 border-b-2 border-indigo-500 pb-2">{children}</h3>
    </AnimatedWrapper>
);

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
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


// --- Icon Components ---
const AlertTriangle = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500 mr-3 flex-shrink-0"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>;
const InfoIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500 mr-3 flex-shrink-0"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>;
const DangerIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 mr-3 flex-shrink-0"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>;

const getIcon = (type: KeyFinding['type']) => {
    switch (type) {
        case 'info': return <InfoIcon />;
        case 'danger': return <DangerIcon />;
        case 'warning': return <AlertTriangle />;
        default: return <div className="w-6 h-6 mr-3 flex-shrink-0"></div>;
    }
}

// --- Main App Component ---
export default function App() {
    const [activeCenter, setActiveCenter] = useState<string>('AL MULTAQA');

    const centerChartData = riskFactorsData[activeCenter]
        .filter((d: RiskFactor) => d.factor !== 'Total Obesity (BMI ≥30)' && !d.factor.includes('Total'))
        .sort((a: RiskFactor, b: RiskFactor) => b.percentage - a.percentage);

    const grandTotalChartData = grandTotalData
        .filter((d: GrandTotalItem) => !d.factor.includes('TOTAL'))
        .sort((a: GrandTotalItem, b: GrandTotalItem) => b.percentage - a.percentage);


    return (
        <div className="min-h-screen bg-gray-100 font-sans text-gray-700">
            <main className="container mx-auto p-4 md:p-8">
                <AnimatedHeader className="text-center mb-12">
                    <motion.h1 
                        className="text-4xl md:text-5xl font-extrabold text-gray-800 gradient-text"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        Pre-existing Risk Factors Analysis
                    </motion.h1>
                    <motion.p 
                        className="text-lg text-gray-500 mt-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                        An Interactive Health Center Dashboard
                    </motion.p>
                </AnimatedHeader>

                {/* Summary Table */}
                <Card className="mb-8">
                    <SectionTitle>📊 Summary Table - All Health Centers</SectionTitle>
                    <AnimatedTable className="overflow-x-auto">
                        <motion.table 
                            className="w-full text-left"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.1,
                                        delayChildren: 0.2
                                    }
                                }
                            }}
                        >
                            <thead>
                                <motion.tr 
                                    className="bg-gray-100 border-b-2 border-gray-200"
                                    variants={{
                                        hidden: { opacity: 0, y: -20 },
                                        visible: { opacity: 1, y: 0 }
                                    }}
                                >
                                    <th className="p-4 font-semibold text-gray-600 uppercase tracking-wider text-sm">Health Center</th>
                                    <th className="p-4 font-semibold text-gray-600 uppercase tracking-wider text-sm text-right">Total Patients</th>
                                    <th className="p-4 font-semibold text-gray-600 uppercase tracking-wider text-sm text-right">VTE Assessed</th>
                                    <th className="p-4 font-semibold text-gray-600 uppercase tracking-wider text-sm text-right">Assessment Rate</th>
                                </motion.tr>
                            </thead>
                            <tbody>
                                {summaryData.map((item, index) => (
                                    <motion.tr 
                                        key={item.name} 
                                        className={`border-b border-gray-200 ${item.name === 'TOTAL' ? 'font-bold bg-gray-200' : 'hover:bg-gray-50'}`}
                                        variants={{
                                            hidden: { opacity: 0, x: -20 },
                                            visible: { 
                                                opacity: 1, 
                                                x: 0,
                                                transition: { 
                                                    duration: 0.5, 
                                                    delay: index * 0.05,
                                                    ease: [0.25, 0.46, 0.45, 0.94]
                                                }
                                            }
                                        }}
                                    >
                                        <td className="p-4">{item.name}</td>
                                        <td className="p-4 text-right">{item.total.toLocaleString()}</td>
                                        <td className="p-4 text-right">{item.assessed.toLocaleString()}</td>
                                        <td className="p-4 text-right">
                                            <span className={`px-2 py-1 rounded-full text-sm font-medium ${item.rate > 95 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {item.rate.toFixed(1)}%
                                            </span>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </motion.table>
                    </AnimatedTable>
                </Card>

                {/* Risk Factors by Center */}
                <Card className="mb-8">
                    <SectionTitle>📈 Pre-existing Risk Factors by Health Center</SectionTitle>
                    <AnimatedWrapper className="mb-6">
                        <motion.div 
                            className="flex flex-wrap gap-2"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.1,
                                        delayChildren: 0.2
                                    }
                                }
                            }}
                        >
                            {Object.keys(riskFactorsData).map((center, index) => (
                                <motion.button
                                    key={center}
                                    onClick={() => setActiveCenter(center)}
                                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${activeCenter === center ? 'bg-indigo-600 text-white shadow-lg scale-105' : 'bg-white text-gray-600 hover:bg-gray-200 border'}`}
                                    variants={{
                                        hidden: { opacity: 0, scale: 0.8, y: 20 },
                                        visible: { 
                                            opacity: 1, 
                                            scale: 1, 
                                            y: 0,
                                            transition: { 
                                                duration: 0.5, 
                                                delay: index * 0.1,
                                                ease: [0.25, 0.46, 0.45, 0.94]
                                            }
                                        }
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {center}
                                </motion.button>
                            ))}
                        </motion.div>
                    </AnimatedWrapper>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                        <AnimatedWrapper className="overflow-x-auto">
                            <motion.table 
                                className="w-full text-left"
                                variants={{
                                    hidden: { opacity: 0, x: -30 },
                                    visible: { 
                                        opacity: 1, 
                                        x: 0,
                                        transition: {
                                            duration: 0.8,
                                            ease: [0.25, 0.46, 0.45, 0.94],
                                            staggerChildren: 0.05
                                        }
                                    }
                                }}
                            >
                                <thead>
                                    <motion.tr 
                                        className="bg-gray-100 border-b-2 border-gray-200"
                                        variants={{
                                            hidden: { opacity: 0, y: -20 },
                                            visible: { opacity: 1, y: 0 }
                                        }}
                                    >
                                        <th className="p-3 font-semibold text-gray-600 uppercase tracking-wider text-sm">Risk Factor</th>
                                        <th className="p-3 font-semibold text-gray-600 uppercase tracking-wider text-sm text-right">Count</th>
                                        <th className="p-3 font-semibold text-gray-600 uppercase tracking-wider text-sm text-right">%</th>
                                    </motion.tr>
                                </thead>
                                <tbody>
                                    {riskFactorsData[activeCenter].map((risk: RiskFactor, index: number) => (
                                        <motion.tr 
                                            key={index} 
                                            className={`border-b border-gray-200 ${risk.factor.includes('Total') ? 'font-bold bg-gray-100' : 'hover:bg-gray-50'}`}
                                            variants={{
                                                hidden: { opacity: 0, x: -20 },
                                                visible: { 
                                                    opacity: 1, 
                                                    x: 0,
                                                    transition: { 
                                                        duration: 0.5, 
                                                        delay: index * 0.05,
                                                        ease: [0.25, 0.46, 0.45, 0.94]
                                                    }
                                                }
                                            }}
                                        >
                                            <td className="p-3">{risk.factor}</td>
                                            <td className="p-3 text-right">{risk.count.toLocaleString()}</td>
                                            <td className="p-3 text-right">{risk.percentage.toFixed(1)}%</td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </motion.table>
                        </AnimatedWrapper>
                        <AnimatedChart style={{height: `${Math.max(300, centerChartData.length * 40)}px`}}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart layout="vertical" data={centerChartData} margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
                                    <defs>
                                        <linearGradient id="centerGradient" x1="0" y1="0" x2="1" y2="0">
                                            <stop offset="0%" stopColor="#818cf8" />
                                            <stop offset="100%" stopColor="#a78bfa" />
                                        </linearGradient>
                                    </defs>
                                    <XAxis type="number" hide domain={[0, 'dataMax + 10']}/>
                                    <YAxis type="category" dataKey="factor" width={100} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                                    <Tooltip cursor={{ fill: 'rgba(238, 242, 255, 0.6)' }} content={<CustomTooltip />} />
                                    <Bar dataKey="percentage" barSize={20} fill="url(#centerGradient)" radius={[0, 8, 8, 0]}>
                                       <LabelList dataKey="percentage" position="right" formatter={(v: number) => `${v.toFixed(1)}%`} style={{ fill: '#4c51bf', fontSize: 12, fontWeight: 'bold' }} />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </AnimatedChart>
                    </div>
                </Card>

                <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
                    {/* Grand Total */}
                    <Card className="xl:col-span-3">
                        <SectionTitle>🎯 Grand Total - All Centers Combined</SectionTitle>
                        <AnimatedChart className="h-96">
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
                                        <LabelList dataKey="percentage" position="top" formatter={(v: number) => `${v.toFixed(1)}%`} style={{ fill: '#3730a3', fontSize: 12, fontWeight: 'bold' }} />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </AnimatedChart>
                    </Card>

                    {/* Key Findings */}
                    <Card className="xl:col-span-2">
                        <SectionTitle>⚠️ Key Findings</SectionTitle>
                        <AnimatedList className="space-y-4">
                            {keyFindings.map((finding: KeyFinding, index: number) => (
                                <AnimatedListItem 
                                    key={index} 
                                    className={`flex items-start ${finding.type === 'sub' ? 'pl-9 text-gray-600' : 'font-semibold'}`}
                                    delay={index * 0.1}
                                >
                                    {getIcon(finding.type)}
                                    <span>{finding.text}</span>
                                </AnimatedListItem>
                            ))}
                        </AnimatedList>
                    </Card>
                </div>
            </main>
        </div>
    );
}
