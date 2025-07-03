
export interface StatCardData {
    value: string;
    label: string;
    description: string;
    icon: React.ReactNode;
    color: string;
}

export interface HealthCenterContribution {
    name: string;
    assessments: number;
    percentage: number;
}

export interface AssessmentCoverageData {
    name: string;
    coverage: number;
}

export interface TrimesterData {
    name: string;
    women: number;
    percentage: number;
    color: string;
}

export interface RiskScoreData {
    name: string;
    score2: number;
    score3: number;
    score4: number;
}

export interface RiskFactorData {
    name: string;
    count: number;
    percentage: number;
}

export interface SimpleBarChartData {
    name: string;
    count: number;
}

export interface Insight {
    icon: React.ReactNode;
    title: string;
    description: string;
    color: string;
}
