import React from 'react';
import Card from './shared/Card';
import { AnimatedWrapper, AnimatedCard, AnimatedHeader, AnimatedList, AnimatedListItem } from './shared/AnimatedWrapper';
import { assessmentCoverageInsights, highRiskManagementInsights } from '../constants/data';
import type { Insight } from '../types';

const InsightCard: React.FC<{ insight: Insight; index: number }> = ({ insight, index }) => {
    const colorClasses: { [key: string]: { bg: string, text: string } } = {
        green: { bg: 'bg-green-100', text: 'text-green-800' },
        blue: { bg: 'bg-blue-100', text: 'text-blue-800' },
        orange: { bg: 'bg-orange-100', text: 'text-orange-800' },
        red: { bg: 'bg-red-100', text: 'text-red-800' },
        purple: { bg: 'bg-purple-100', text: 'text-purple-800' },
        yellow: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    };
    const { bg, text } = colorClasses[insight.color] || { bg: 'bg-slate-100', text: 'text-slate-800' };

    return (
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
            <div className={`p-5 rounded-xl flex items-start space-x-4 ${bg} ${text}`}>
                <div className="flex-shrink-0">{insight.icon}</div>
                <div>
                    <h4 className="font-bold">{insight.title}</h4>
                    <p className="text-sm mt-1">{insight.description}</p>
                </div>
            </div>
        </AnimatedWrapper>
    );
};

const RecommendationItem: React.FC<{ children: React.ReactNode, color: string; index: number }> = ({ children, color, index }) => {
    const borderColors: {[key: string]: string} = {
        red: 'border-red-200 bg-red-50',
        orange: 'border-orange-200 bg-orange-50',
        blue: 'border-blue-200 bg-blue-50',
        green: 'border-green-200 bg-green-50',
        purple: 'border-purple-200 bg-purple-50',
    }
    return (
        <AnimatedWrapper
            delay={index * 0.15}
            animation={{
                hidden: { opacity: 0, x: -30 },
                visible: {
                    opacity: 1,
                    x: 0,
                    transition: {
                        duration: 0.6,
                        delay: index * 0.15,
                        ease: [0.25, 0.46, 0.45, 0.94]
                    }
                }
            }}
        >
            <div className={`p-4 rounded-lg border-l-4 ${borderColors[color]}`}>
                <p className="text-slate-700">{children}</p>
            </div>
        </AnimatedWrapper>
    );
};

const InsightsAnalysis: React.FC = () => {
    return (
        <div className="space-y-8">
            <AnimatedCard>
                <AnimatedHeader>
                    <h3 className="text-2xl font-bold text-slate-800 mb-6">Comprehensive Performance Analysis</h3>
                </AnimatedHeader>
                <div className="space-y-6">
                    <AnimatedWrapper
                        delay={0.2}
                        animation={{
                            hidden: { opacity: 0, y: 20 },
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: { duration: 0.6, delay: 0.2 }
                            }
                        }}
                    >
                        <div>
                            <h4 className="font-semibold text-slate-700 mb-3">Assessment Coverage Insights</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {assessmentCoverageInsights.map((insight, i) => <InsightCard key={i} insight={insight} index={i} />)}
                            </div>
                        </div>
                    </AnimatedWrapper>
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
                        <div>
                            <h4 className="font-semibold text-slate-700 mb-3">High-Risk Management</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {highRiskManagementInsights.map((insight, i) => <InsightCard key={i} insight={insight} index={i} />)}
                            </div>
                        </div>
                    </AnimatedWrapper>
                </div>
            </AnimatedCard>

            <AnimatedCard>
                <AnimatedHeader>
                    <h3 className="text-2xl font-bold text-slate-800 mb-6">Sohar P.C. - Detailed Analysis & Recommendations</h3>
                </AnimatedHeader>
                <AnimatedList>
                    <React.Fragment>
                        <AnimatedListItem delay={0.1}>
                            <div className="p-6 bg-blue-50 rounded-lg">
                                <h4 className="font-bold text-blue-800 mb-3">Service Scale</h4>
                                <ul className="space-y-2 text-sm text-blue-700">
                                    <li className="flex items-start"><span className="mr-2">&gt;</span> 35% of all Suhar Wilayat pregnancies</li>
                                    <li className="flex items-start"><span className="mr-2">&gt;</span> Largest single health facility</li>
                                    <li className="flex items-start"><span className="mr-2">&gt;</span> 1,142 total ANC registrations</li>
                                    <li className="flex items-start"><span className="mr-2">&gt;</span> Critical regional healthcare hub</li>
                                </ul>
                            </div>
                        </AnimatedListItem>
                        <AnimatedListItem delay={0.2}>
                            <div className="p-6 bg-orange-50 rounded-lg">
                                <h4 className="font-bold text-orange-800 mb-3">Performance Gaps</h4>
                                <ul className="space-y-2 text-sm text-orange-700">
                                    <li className="flex items-start"><span className="mr-2">&gt;</span> Assessment rate: 87.2% (vs 94.1% average)</li>
                                    <li className="flex items-start"><span className="mr-2">&gt;</span> 146 unassessed pregnancies</li>
                                    <li className="flex items-start"><span className="mr-2">&gt;</span> 16 high-risk patients untreated</li>
                                    <li className="flex items-start"><span className="mr-2">&gt;</span> Requires targeted intervention</li>
                                </ul>
                            </div>
                        </AnimatedListItem>
                        <AnimatedListItem delay={0.3}>
                            <div className="p-6 bg-green-50 rounded-lg">
                                <h4 className="font-bold text-green-800 mb-3">Quality Indicators</h4>
                                <ul className="space-y-2 text-sm text-green-700">
                                    <li className="flex items-start"><span className="mr-2">&gt;</span> High-risk identification: 124 cases</li>
                                    <li className="flex items-start"><span className="mr-2">&gt;</span> Treatment initiation: 108 patients</li>
                                    <li className="flex items-start"><span className="mr-2">&gt;</span> 87% treatment rate for high-risk</li>
                                    <li className="flex items-start"><span className="mr-2">&gt;</span> Good clinical decision-making</li>
                                </ul>
                            </div>
                        </AnimatedListItem>
                    </React.Fragment>
                </AnimatedList>
            </AnimatedCard>

            <AnimatedCard>
                <AnimatedHeader>
                    <h3 className="text-2xl font-bold text-slate-800 mb-6">Strategic Recommendations for 2024</h3>
                </AnimatedHeader>
                <AnimatedWrapper
                    delay={0.2}
                    animation={{
                        hidden: { opacity: 0, y: 20 },
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.6, delay: 0.2 }
                        }
                    }}
                >
                    <div>
                        <h4 className="font-semibold text-slate-700 mb-3">Priority Actions</h4>
                        <div className="space-y-4">
                            <RecommendationItem color="red" index={0}><strong>Close Treatment Gaps:</strong> Implement systematic follow-up for 79 high-risk patients without thromboprophylaxis</RecommendationItem>
                            <RecommendationItem color="orange" index={1}><strong>Support Sohar P.C.:</strong> Provide training and resources to improve 87.2% assessment rate</RecommendationItem>
                            <RecommendationItem color="blue" index={2}><strong>Standardize Protocols:</strong> Share best practices from 100% performing centers</RecommendationItem>
                        </div>
                    </div>
                </AnimatedWrapper>
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
                    <div className="mt-6">
                        <h4 className="font-semibold text-slate-700 mb-3">Long-term Strategies</h4>
                        <div className="space-y-4">
                            <RecommendationItem color="green" index={0}><strong>Prevention Programs:</strong> Address obesity (10.8% prevalence) and advanced maternal age (20.8%)</RecommendationItem>
                            <RecommendationItem color="purple" index={1}><strong>Quality Monitoring:</strong> Establish regular audits of VTE assessment completion and treatment outcomes</RecommendationItem>
                            <RecommendationItem color="green" index={2}><strong>Data Integration:</strong> Develop unified tracking system across all 7 health centers</RecommendationItem>
                        </div>
                    </div>
                </AnimatedWrapper>
            </AnimatedCard>

            <AnimatedWrapper
                animation={{
                    hidden: { opacity: 0, scale: 0.95, y: 30 },
                    visible: {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        transition: {
                            duration: 0.8,
                            ease: [0.25, 0.46, 0.45, 0.94]
                        }
                    }
                }}
            >
                <div className="p-8 bg-gradient-to-br from-brand-blue to-brand-purple rounded-xl shadow-lg text-white">
                    <AnimatedHeader>
                        <h3 className="text-2xl font-bold text-center mb-6">2023 Program Achievements</h3>
                    </AnimatedHeader>
                    <AnimatedList>
                        <React.Fragment>
                            <AnimatedListItem delay={0.1}>
                                <div className="bg-white/20 p-4 rounded-lg">
                                    <p className="text-4xl font-bold">3,281</p>
                                    <p className="mt-1 text-sm opacity-90">Total Pregnancies Registered</p>
                                </div>
                            </AnimatedListItem>
                            <AnimatedListItem delay={0.2}>
                                <div className="bg-white/20 p-4 rounded-lg">
                                    <p className="text-4xl font-bold">94.1%</p>
                                    <p className="mt-1 text-sm opacity-90">VTE Assessment Coverage</p>
                                </div>
                            </AnimatedListItem>
                            <AnimatedListItem delay={0.3}>
                                <div className="bg-white/20 p-4 rounded-lg">
                                    <p className="text-4xl font-bold">373</p>
                                    <p className="mt-1 text-sm opacity-90">High-Risk Cases Identified</p>
                                </div>
                            </AnimatedListItem>
                            <AnimatedListItem delay={0.4}>
                                <div className="bg-white/20 p-4 rounded-lg">
                                    <p className="text-4xl font-bold">78.8%</p>
                                    <p className="mt-1 text-sm opacity-90">Treatment Initiation Rate</p>
                                </div>
                            </AnimatedListItem>
                        </React.Fragment>
                    </AnimatedList>
                </div>
            </AnimatedWrapper>
        </div>
    );
};

export default InsightsAnalysis;
