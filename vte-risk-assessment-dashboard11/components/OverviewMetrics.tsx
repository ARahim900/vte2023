
import React from 'react';
import Card from './shared/Card';
import StatCard from './shared/StatCard';
import { AnimatedWrapper, AnimatedCard, AnimatedHeader, AnimatedChart, AnimatedList, AnimatedListItem } from './shared/AnimatedWrapper';
import { overviewStats, vteContributionData, assessmentCoverageData, pregnancyTrimesterData, riskScoreDistributionData } from '../constants/data';
import { MapPinIcon, ShieldCheckIcon, AlertTriangleIcon, TargetIcon, CheckCircleIcon } from '../constants/icons';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell, PieChart, Pie, CartesianGrid } from 'recharts';

const ProgressBarCard: React.FC<{ title: string; value: string; description: string; progress: number; color: string; icon: React.ReactNode; index: number }> = ({ title, value, description, progress, color, icon, index }) => (
    <AnimatedWrapper
        delay={index * 0.1}
        animation={{
            hidden: { opacity: 0, y: 30, scale: 0.95 },
            visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94]
                }
            }
        }}
    >
        <Card className="p-4 sm:p-6">
            <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0 mr-3">
                    <p className="text-xs sm:text-sm font-semibold text-slate-600">{title}</p>
                    <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mt-1">{value}</p>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">{description}</p>
                </div>
                <div className={`p-2 rounded-full bg-${color}-100 text-${color}-600 flex-shrink-0`}>
                    {icon}
                </div>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5 mt-4">
                <div className={`bg-${color}-500 h-2.5 rounded-full`} style={{ width: `${progress}%` }}></div>
            </div>
        </Card>
    </AnimatedWrapper>
);

const VteContributionChart: React.FC = () => (
    <AnimatedCard>
        <AnimatedHeader>
            <h3 className="text-base sm:text-lg font-bold text-slate-800">VTE Assessment Contribution by Health Center</h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-4 sm:mb-6">Percentage of total 3,086 VTE assessments performed by each center</p>
        </AnimatedHeader>
        <AnimatedList>
            <div className="space-y-3 sm:space-y-4">
                {vteContributionData.map((item, index) => (
                    <AnimatedListItem key={item.name} delay={index * 0.05}>
                        <div>
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1 text-xs sm:text-sm">
                                <span className="font-semibold text-slate-700">{item.name}</span>
                                <span className="text-slate-500">{item.assessments.toLocaleString()} assessments ({item.percentage}%)</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-3">
                                <div className="bg-brand-blue h-3 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                            </div>
                        </div>
                    </AnimatedListItem>
                ))}
            </div>
        </AnimatedList>
        <AnimatedWrapper
            delay={0.5}
            animation={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, delay: 0.5 }
                }
            }}
        >
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 rounded-lg text-center text-blue-800 text-xs sm:text-sm">
                <p>Total VTE Assessments: <strong>3,086 (100%)</strong> • Largest Contributor: <strong>Sohar P.C.</strong> with 996 assessments (32.3%)</p>
            </div>
        </AnimatedWrapper>
    </AnimatedCard>
);

const AssessmentCoverageChart: React.FC = () => (
    <AnimatedChart>
        <Card>
            <AnimatedHeader>
                <h3 className="text-base sm:text-lg font-bold text-slate-800">Assessment Coverage by Center</h3>
                <p className="text-xs sm:text-sm text-slate-500 mb-4 sm:mb-6">Percentage of pregnant women assessed at each center</p>
            </AnimatedHeader>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <BarChart data={assessmentCoverageData} margin={{ top: 5, right: 10, left: -10, bottom: 60 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis 
                            dataKey="name" 
                            angle={-45} 
                            textAnchor="end" 
                            height={60} 
                            interval={0} 
                            tick={{ fontSize: 10, fill: '#475569' }}
                        />
                        <YAxis domain={[0, 110]} unit="%" tick={{ fontSize: 10, fill: '#475569' }} />
                        <Tooltip formatter={(value: number) => `${value}%`} />
                        <Bar dataKey="coverage" fill="#10B981" barSize={20} radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    </AnimatedChart>
);

const PregnancyRegistrationChart: React.FC = () => (
    <AnimatedChart>
        <Card>
            <AnimatedHeader>
                <h3 className="text-base sm:text-lg font-bold text-slate-800">Pregnancy Registration by Trimester</h3>
                <p className="text-xs sm:text-sm text-slate-500 mb-4 sm:mb-6">Distribution of 2,139 total registrations</p>
            </AnimatedHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-center">
                <div style={{ width: '100%', height: 250 }}>
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie 
                                data={pregnancyTrimesterData} 
                                dataKey="women" 
                                nameKey="name" 
                                cx="50%" 
                                cy="50%" 
                                innerRadius={50} 
                                outerRadius={70} 
                                fill="#8884d8" 
                                paddingAngle={5}
                            >
                                {pregnancyTrimesterData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value: number, _name: string, props) => `${value} women (${props.payload.percentage}%)`} />
                            <text x="50%" y="45%" textAnchor="middle" dominantBaseline="central" className="text-2xl sm:text-3xl font-bold fill-slate-800">
                                2,139
                            </text>
                            <text x="50%" y="58%" textAnchor="middle" dominantBaseline="central" className="text-xs sm:text-sm fill-slate-500">
                                Total Registrations
                            </text>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <AnimatedList>
                    <div className="grid grid-cols-2 gap-2 sm:gap-4">
                        {pregnancyTrimesterData.map((item, index) => (
                            <AnimatedListItem key={item.name} delay={index * 0.1}>
                                <div className="p-3 sm:p-4 rounded-lg" style={{backgroundColor: `${item.color}20`}}>
                                    <div className="flex items-center mb-1">
                                        <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></span>
                                        <p className="text-xs sm:text-sm font-semibold text-slate-700">{item.name}</p>
                                    </div>
                                    <p className="text-lg sm:text-xl font-bold text-slate-800">{item.percentage}%</p>
                                    <p className="text-xs text-slate-500">{item.women.toLocaleString()} women</p>
                                </div>
                            </AnimatedListItem>
                        ))}
                    </div>
                </AnimatedList>
            </div>
            <AnimatedWrapper
                delay={0.4}
                animation={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.6, delay: 0.4 }
                    }
                }}
            >
                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-pink-50 rounded-lg">
                    <h4 className="font-bold text-pink-800 text-sm sm:text-base">Key Clinical Insights</h4>
                    <ul className="list-disc list-inside text-xs sm:text-sm text-pink-700 mt-2">
                        <li><strong>Excellent Early Booking:</strong> 92.4% of women register in their first trimester</li>
                        <li><strong>Minimal Late Registrations:</strong> Only 1.1% register in third trimester</li>
                    </ul>
                </div>
            </AnimatedWrapper>
        </Card>
    </AnimatedChart>
);

const RiskDistributionChart: React.FC = () => (
    <AnimatedChart>
        <Card>
            <AnimatedHeader>
                <h3 className="text-base sm:text-lg font-bold text-slate-800">VTE Risk Score Distribution by Health Center</h3>
                <p className="text-xs sm:text-sm text-slate-500 mb-4 sm:mb-6">Comparison of risk scores across centers</p>
            </AnimatedHeader>
            <div style={{ width: '100%', height: 350 }}>
                <ResponsiveContainer>
                    <BarChart data={riskScoreDistributionData} margin={{ top: 5, right: 10, left: -10, bottom: 60 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis 
                            dataKey="name" 
                            angle={-45} 
                            textAnchor="end" 
                            height={60} 
                            interval={0} 
                            tick={{ fontSize: 10, fill: '#475569' }} 
                        />
                        <YAxis tick={{ fontSize: 10, fill: '#475569' }} />
                        <Tooltip />
                        <Legend wrapperStyle={{fontSize: "12px", paddingTop: "20px"}}/>
                        <Bar dataKey="score2" stackId="a" fill="#FBBF24" name="Score ≥2" />
                        <Bar dataKey="score3" stackId="a" fill="#EF4444" name="Score ≥3" />
                        <Bar dataKey="score4" radius={[4, 4, 0, 0]} stackId="a" fill="#7C3AED" name="Score ≥4" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    </AnimatedChart>
);

const SoharPCSpotlight: React.FC = () => (
    <AnimatedCard>
        <AnimatedHeader>
            <div className="flex items-center mb-4">
                <TargetIcon className="w-6 h-6 sm:w-8 sm:h-8 text-brand-orange mr-2 sm:mr-3"/>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800">Sohar P.C. Performance Spotlight</h3>
            </div>
        </AnimatedHeader>
        <AnimatedList>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                <AnimatedListItem delay={0.1}>
                    <div className="bg-slate-50 p-3 sm:p-4 rounded-lg">
                        <h4 className="font-bold text-slate-700 mb-2 text-sm sm:text-base">Coverage & Scale</h4>
                        <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-slate-600">
                            <li><strong>1,142</strong> total registrations (35% of all)</li>
                            <li><strong>996</strong> VTE assessments (87.2% rate)</li>
                            <li>Largest health center in analysis</li>
                        </ul>
                    </div>
                </AnimatedListItem>
                <AnimatedListItem delay={0.2}>
                    <div className="bg-red-50 p-3 sm:p-4 rounded-lg">
                        <h4 className="font-bold text-red-700 mb-2 text-sm sm:text-base">Risk Profile</h4>
                        <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-red-600">
                            <li><strong>124</strong> high-risk patients (Score ≥3)</li>
                            <li><strong>28%</strong> have parity ≥3</li>
                            <li><strong>26%</strong> are age {'>'} 35 years</li>
                        </ul>
                    </div>
                </AnimatedListItem>
                <AnimatedListItem delay={0.3}>
                    <div className="bg-yellow-50 p-3 sm:p-4 rounded-lg">
                        <h4 className="font-bold text-yellow-700 mb-2 text-sm sm:text-base">Treatment Gap</h4>
                        <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-yellow-600">
                            <li><strong>108</strong> prescribed thromboprophylaxis</li>
                            <li><strong>16</strong> high-risk not treated (13%)</li>
                            <li>Room for improvement in follow-up</li>
                        </ul>
                    </div>
                </AnimatedListItem>
            </div>
        </AnimatedList>
    </AnimatedCard>
);

const OverviewMetrics: React.FC = () => (
    <div className="space-y-6 sm:space-y-8">
        <AnimatedWrapper
            animation={{
                hidden: { opacity: 0, y: -30 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.8,
                        ease: [0.25, 0.46, 0.45, 0.94]
                    }
                }
            }}
        >
            <div className="p-4 sm:p-6 bg-brand-blue-light rounded-xl flex items-start space-x-3 sm:space-x-4">
                <MapPinIcon className="w-8 h-8 sm:w-10 sm:h-10 text-brand-blue flex-shrink-0 mt-1"/>
                <div>
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-800 mb-2">Suhar Wilayat Health Centers Overview</h2>
                    <p className="text-sm sm:text-base text-slate-600">Comprehensive analysis of VTE risk assessment performance across 7 health centers in 2023</p>
                </div>
            </div>
        </AnimatedWrapper>

        <AnimatedList>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {overviewStats.map((stat, index) => (
                    <AnimatedListItem key={stat.label} delay={index * 0.1}>
                        <StatCard {...stat} />
                    </AnimatedListItem>
                ))}
            </div>
        </AnimatedList>

        <AnimatedWrapper
            delay={0.3}
            animation={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, delay: 0.3 }
                }
            }}
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                <ProgressBarCard 
                    title="VTE Assessment Coverage" 
                    value="94.1%" 
                    description="of pregnant women assessed" 
                    progress={94.1} 
                    color="green" 
                    icon={<ShieldCheckIcon className="w-5 h-5" />}
                    index={0}
                />
                <ProgressBarCard 
                    title="High-Risk Identification" 
                    value="373" 
                    description="patients with score ≥3" 
                    progress={11.4} 
                    color="red" 
                    icon={<AlertTriangleIcon className="w-5 h-5" />}
                    index={1}
                />
            </div>
        </AnimatedWrapper>

        <AnimatedWrapper
            delay={0.4}
            animation={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, delay: 0.4 }
                }
            }}
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                <VteContributionChart />
                <AssessmentCoverageChart />
            </div>
        </AnimatedWrapper>

        <AnimatedWrapper
            delay={0.5}
            animation={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, delay: 0.5 }
                }
            }}
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                <PregnancyRegistrationChart />
                <RiskDistributionChart />
            </div>
        </AnimatedWrapper>

        <SoharPCSpotlight />
    </div>
);

export default OverviewMetrics;
