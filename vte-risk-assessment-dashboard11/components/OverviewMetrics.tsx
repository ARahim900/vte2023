
import React from 'react';
import Card from './shared/Card';
import StatCard from './shared/StatCard';
import { overviewStats, vteContributionData, assessmentCoverageData, pregnancyTrimesterData, riskScoreDistributionData } from '../constants/data';
import { MapPinIcon, ShieldCheckIcon, AlertTriangleIcon, TrendingUpIcon, TargetIcon, CheckCircleIcon } from '../constants/icons';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell, PieChart, Pie, CartesianGrid } from 'recharts';


const ProgressBarCard: React.FC<{ title: string; value: string; description: string; progress: number; color: string; icon: React.ReactNode }> = ({ title, value, description, progress, color, icon }) => (
    <Card>
        <div className="flex justify-between items-start">
            <div>
                <p className="text-sm font-semibold text-slate-600">{title}</p>
                <p className="text-4xl font-bold text-slate-800 mt-1">{value}</p>
                <p className="text-sm text-slate-500">{description}</p>
            </div>
            <div className={`p-2 rounded-full bg-${color}-100 text-${color}-600`}>
                {icon}
            </div>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2.5 mt-4">
            <div className={`bg-${color}-500 h-2.5 rounded-full`} style={{ width: `${progress}%` }}></div>
        </div>
    </Card>
);

const VteContributionChart: React.FC = () => (
    <Card>
        <h3 className="text-lg font-bold text-slate-800">VTE Assessment Contribution by Health Center</h3>
        <p className="text-sm text-slate-500 mb-6">Percentage of total 3,086 VTE assessments performed by each center</p>
        <div className="space-y-4">
            {vteContributionData.map(item => (
                <div key={item.name}>
                    <div className="flex justify-between items-center mb-1 text-sm">
                        <span className="font-semibold text-slate-700">{item.name}</span>
                        <span className="text-slate-500">{item.assessments.toLocaleString()} assessments ({item.percentage}%)</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                        <div className="bg-brand-blue h-3 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                    </div>
                </div>
            ))}
        </div>
        <div className="mt-6 p-4 bg-blue-50 rounded-lg text-center text-blue-800">
            <p>Total VTE Assessments: <strong>3,086 (100%)</strong> • Largest Contributor: <strong>Sohar P.C.</strong> with 996 assessments (32.3%)</p>
        </div>
    </Card>
);

const AssessmentCoverageChart: React.FC = () => (
    <Card>
        <h3 className="text-lg font-bold text-slate-800">Assessment Coverage by Center</h3>
        <p className="text-sm text-slate-500 mb-6">Percentage of pregnant women assessed at each center</p>
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <BarChart data={assessmentCoverageData} margin={{ top: 5, right: 20, left: 0, bottom: 50 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} interval={0} tick={{ fontSize: 12, fill: '#475569' }}/>
                    <YAxis domain={[0, 110]} unit="%" tick={{ fontSize: 12, fill: '#475569' }} />
                    <Tooltip formatter={(value: number) => `${value}%`} />
                    <Bar dataKey="coverage" fill="#10B981" barSize={30} radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    </Card>
);


const PregnancyRegistrationChart: React.FC = () => (
    <Card>
        <h3 className="text-lg font-bold text-slate-800">Pregnancy Registration by Trimester</h3>
        <p className="text-sm text-slate-500 mb-6">Distribution of 2,139 total registrations</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div style={{ width: '100%', height: 250 }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie data={pregnancyTrimesterData} dataKey="women" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5}>
                            {pregnancyTrimesterData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value: number, name: string, props) => `${value} women (${props.payload.percentage}%)`} />
                        <text x="50%" y="45%" textAnchor="middle" dominantBaseline="central" className="text-3xl font-bold fill-slate-800">
                            2,139
                        </text>
                        <text x="50%" y="58%" textAnchor="middle" dominantBaseline="central" className="text-sm fill-slate-500">
                            Total Registrations
                        </text>
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pregnancyTrimesterData.map(item => (
                    <div key={item.name} className="p-4 rounded-lg" style={{backgroundColor: `${item.color}20`}}>
                        <div className="flex items-center mb-1">
                            <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></span>
                            <p className="text-sm font-semibold text-slate-700">{item.name}</p>
                        </div>
                        <p className="text-xl font-bold text-slate-800">{item.percentage}%</p>
                        <p className="text-xs text-slate-500">{item.women.toLocaleString()} women</p>
                    </div>
                ))}
            </div>
        </div>
        <div className="mt-6 p-4 bg-pink-50 rounded-lg">
            <h4 className="font-bold text-pink-800">Key Clinical Insights</h4>
            <ul className="list-disc list-inside text-sm text-pink-700 mt-2">
                <li><strong>Excellent Early Booking:</strong> 92.4% of women register in their first trimester</li>
                <li><strong>Minimal Late Registrations:</strong> Only 1.1% register in third trimester</li>
            </ul>
        </div>
    </Card>
);

const RiskDistributionChart: React.FC = () => (
    <Card>
        <h3 className="text-lg font-bold text-slate-800">VTE Risk Score Distribution by Health Center</h3>
        <p className="text-sm text-slate-500 mb-6">Comparison of risk scores across centers</p>
        <div style={{ width: '100%', height: 350 }}>
            <ResponsiveContainer>
                <BarChart data={riskScoreDistributionData} margin={{ top: 5, right: 20, left: 0, bottom: 50 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} interval={0} tick={{ fontSize: 12, fill: '#475569' }} />
                    <YAxis tick={{ fontSize: 12, fill: '#475569' }} />
                    <Tooltip />
                    <Legend wrapperStyle={{fontSize: "14px", paddingTop: "40px"}}/>
                    <Bar dataKey="score2" stackId="a" fill="#FBBF24" name="Score ≥2" />
                    <Bar dataKey="score3" stackId="a" fill="#EF4444" name="Score ≥3" />
                    <Bar dataKey="score4" radius={[4, 4, 0, 0]} stackId="a" fill="#7C3AED" name="Score ≥4" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    </Card>
);

const SoharPCSpotlight: React.FC = () => (
    <Card>
        <div className="flex items-center mb-4">
            <TargetIcon className="w-8 h-8 text-brand-orange mr-3"/>
            <h3 className="text-2xl font-bold text-slate-800">Sohar P.C. Performance Spotlight</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 p-4 rounded-lg">
                <h4 className="font-bold text-slate-700 mb-2">Coverage & Scale</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
                    <li><strong>1,142</strong> total registrations (35% of all)</li>
                    <li><strong>996</strong> VTE assessments (87.2% rate)</li>
                    <li>Largest health center in analysis</li>
                </ul>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-bold text-red-700 mb-2">Risk Profile</h4>
                 <ul className="list-disc list-inside space-y-1 text-sm text-red-600">
                    <li><strong>124</strong> high-risk patients (Score ≥3)</li>
                    <li><strong>28%</strong> have parity ≥3</li>
                    <li><strong>26%</strong> are age {'>'} 35 years</li>
                </ul>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-bold text-yellow-700 mb-2">Treatment Gap</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-yellow-600">
                    <li><strong>108</strong> prescribed thromboprophylaxis</li>
                    <li><strong>16</strong> high-risk not treated (13%)</li>
                    <li>Room for improvement in follow-up</li>
                </ul>
            </div>
        </div>
    </Card>
);


const OverviewMetrics: React.FC = () => (
    <div className="space-y-8">
        <div className="p-6 bg-brand-blue-light rounded-xl flex items-start space-x-4">
            <MapPinIcon className="w-10 h-10 text-brand-blue flex-shrink-0 mt-1"/>
            <div>
                <h2 className="text-xl font-bold text-slate-800">Comprehensive Analysis: All 7 Health Centers</h2>
                <p className="text-slate-600 mt-1">Complete VTE risk assessment data from Sohar P.C. and all regional health centers for 2023, covering 3,281 pregnancy registrations.</p>
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {overviewStats.map(stat => <StatCard key={stat.label} {...stat} />)}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ProgressBarCard title="Assessment Coverage" value="94.1%" description="Excellent coverage across all registered pregnancies" progress={94.1} color="green" icon={<CheckCircleIcon className="w-6 h-6"/>} />
            <ProgressBarCard title="Treatment Rate" value="78.8%" description="High-risk patients receiving appropriate care" progress={78.8} color="blue" icon={<ShieldCheckIcon className="w-6 h-6"/>} />
            <ProgressBarCard title="Care Gap" value="79" description="High-risk patients requiring immediate follow-up" progress={21.2} color="orange" icon={<AlertTriangleIcon className="w-6 h-6"/>} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <VteContributionChart />
            <AssessmentCoverageChart />
            <PregnancyRegistrationChart />
            <RiskDistributionChart />
        </div>

        <SoharPCSpotlight/>

    </div>
);

export default OverviewMetrics;
