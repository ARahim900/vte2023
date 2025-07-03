
import React from 'react';
import { StatCardData, HealthCenterContribution, AssessmentCoverageData, TrimesterData, RiskScoreData, RiskFactorData, SimpleBarChartData, Insight } from '../types';
import { UsersIcon, ChartBarIcon, AlertTriangleIcon, TargetIcon, MapPinIcon, DocumentReportIcon, CalendarIcon, CheckCircleIcon, ShieldCheckIcon, ExclamationCircleIcon, TrendingUpIcon, ArrowTrendingUpIcon, HeartIcon } from './icons';

export const overviewStats: StatCardData[] = [
    {
        value: "3,281",
        label: "TOTAL REGISTRATIONS",
        description: "Across 7 health centers",
        icon: React.createElement(UsersIcon, { className: "w-8 h-8 text-blue-500" }),
        color: "blue"
    },
    {
        value: "3,086",
        label: "VTE ASSESSMENTS",
        description: "94.1% coverage of all pregnancies",
        icon: React.createElement(ChartBarIcon, { className: "w-8 h-8 text-green-500" }),
        color: "green"
    },
    {
        value: "373",
        label: "HIGH RISK (SCORE ≥3)",
        description: "Requiring specialist care",
        icon: React.createElement(AlertTriangleIcon, { className: "w-8 h-8 text-yellow-500" }),
        color: "yellow"
    },
    {
        value: "294",
        label: "REFERRALS/PRESCRIPTIONS",
        description: "78.8% of high-risk patients",
        icon: React.createElement(TargetIcon, { className: "w-8 h-8 text-red-500" }),
        color: "red"
    }
];

export const vteContributionData: HealthCenterContribution[] = [
    { name: 'SOHAR P.C.', assessments: 996, percentage: 32.3 },
    { name: 'AL UWAYNAT', assessments: 508, percentage: 16.5 },
    { name: 'TAREEF', assessments: 414, percentage: 13.4 },
    { name: 'AL MULTAQA', assessments: 435, percentage: 14.1 },
    { name: 'FALAJ', assessments: 362, percentage: 11.7 },
    { name: 'WADI HIBI', assessments: 242, percentage: 7.8 },
    { name: 'WADI AHIN', assessments: 129, percentage: 4.2 },
].sort((a, b) => b.assessments - a.assessments);

export const assessmentCoverageData: AssessmentCoverageData[] = [
    { name: 'AL MULTAQA', coverage: 100 },
    { name: 'AL UWAYNAT', coverage: 100 },
    { name: 'TAREEF', coverage: 99.3 },
    { name: 'FALAJ', coverage: 98.6 },
    { name: 'WADI HIBI', coverage: 94.5 },
    { name: 'SOHAR P.C.', coverage: 87.2 },
    { name: 'WADI AHIN', coverage: 82.7 },
];

export const pregnancyTrimesterData: TrimesterData[] = [
    { name: 'First Trimester', women: 1977, percentage: 92.4, color: '#3B82F6' },
    { name: 'Second Trimester', women: 126, percentage: 5.9, color: '#10B981' },
    { name: 'Third Trimester', women: 24, percentage: 1.1, color: '#F97316' },
    { name: 'Unknown', women: 12, percentage: 0.6, color: '#6B7280' },
];

export const riskScoreDistributionData: RiskScoreData[] = [
    { name: 'AL MULTAQA', score2: 150, score3: 40, score4: 10 },
    { name: 'AL UWAYNAT', score2: 130, score3: 35, score4: 8 },
    { name: 'TAREEF', score2: 110, score3: 30, score4: 5 },
    { name: 'FALAJ', score2: 140, score3: 38, score4: 12 },
    { name: 'WADI HIBI', score2: 80, score3: 20, score4: 4 },
    { name: 'SOHAR P.C.', score2: 350, score3: 124, score4: 25 },
    { name: 'WADI AHIN', score2: 40, score3: 15, score4: 2 },
];

export const riskFactorsByType = [
    { type: 'PRE-EXISTING FACTORS', count: 9, description: 'Most common: Parity ≥3', icon: React.createElement(ShieldCheckIcon, {className: "w-8 h-8 text-blue-500"}), color: 'blue'},
    { type: 'OBSTETRIC FACTORS', count: 3, description: 'Current pregnancy related', icon: React.createElement(DocumentReportIcon, {className: "w-8 h-8 text-green-500"}), color: 'green'},
    { type: 'TRANSIENT FACTORS', count: 1, description: 'Temporary conditions', icon: React.createElement(CalendarIcon, {className: "w-8 h-8 text-yellow-500"}), color: 'yellow'},
];

export const preExistingRiskFactors: RiskFactorData[] = [
    { name: 'Parity ≥3', count: 824, percentage: 26.7 },
    { name: 'Age > 35 years', count: 642, percentage: 20.8 },
    { name: 'Obesity BMI 30-39', count: 249, percentage: 8.1 },
    { name: 'Medical Comorbidities', count: 122, percentage: 4.0 },
    { name: 'Obesity BMI ≥40', count: 84, percentage: 2.7 },
    { name: 'Family History of VTE', count: 18, percentage: 0.6 },
    { name: 'Gross Varicose Veins', count: 14, percentage: 0.5 },
    { name: 'Smoking', count: 6, percentage: 0.2 },
    { name: 'Previous VTE Single Event', count: 4, percentage: 0.1 },
].sort((a,b) => b.count - a.count);

export const obstetricRiskFactors: RiskFactorData[] = [
    { name: 'Multiple Pregnancy', count: 33, percentage: 1.1 },
    { name: 'Assisted Reproductive Technology', count: 12, percentage: 0.4 },
    { name: 'Pre-eclampsia', count: 8, percentage: 0.3 },
].sort((a,b) => b.count - a.count);

export const transientRiskFactors: RiskFactorData[] = [
    { name: 'Hyperemesis Gravidarum', count: 15, percentage: 0.5 },
];

export const top5RiskFactors: SimpleBarChartData[] = [
    { name: 'Parity ≥3', count: 824 },
    { name: 'Age > 35 years', count: 642 },
    { name: 'Obesity BMI 30-39', count: 249 },
    { name: 'Medical Comorbidities', count: 122 },
    { name: 'Obesity BMI ≥40', count: 84 },
];

export const assessmentCoverageInsights: Insight[] = [
    {
        icon: React.createElement(CheckCircleIcon, { className: "w-7 h-7" }),
        title: 'Strong Overall Performance',
        description: '94.1% VTE assessment coverage across 3,281 pregnancies',
        color: 'green'
    },
    {
        icon: React.createElement(UsersIcon, { className: "w-7 h-7" }),
        title: 'Top Performers',
        description: 'AL MULTAQA and AL UWAYNAT maintain 100% assessment rates',
        color: 'blue'
    },
    {
        icon: React.createElement(ExclamationCircleIcon, { className: "w-7 h-7" }),
        title: 'Improvement Opportunities',
        description: 'Sohar P.C. (87.2%) and Wadi Ahin (82.7%) need support',
        color: 'orange'
    },
];

export const highRiskManagementInsights: Insight[] = [
    {
        icon: React.createElement(AlertTriangleIcon, { className: "w-7 h-7" }),
        title: 'Scale of High-Risk Cases',
        description: '373 women with VTE score ≥3 requiring specialist intervention',
        color: 'red'
    },
    {
        icon: React.createElement(TrendingUpIcon, { className: "w-7 h-7" }),
        title: 'Treatment Progress',
        description: '78.8% referral/prescription rate (improved from previous analysis)',
        color: 'purple'
    },
    {
        icon: React.createElement(ArrowTrendingUpIcon, { className: "w-7 h-7" }),
        title: 'Remaining Gap',
        description: '79 high-risk patients still need follow-up care',
        color: 'yellow'
    },
];
