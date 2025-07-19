import React, { useState, useEffect } from 'react';
import { BarChart, Bar, PieChart as ReChartsPieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, AreaChart } from 'recharts';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from './shared/Card';
import { AnimatedWrapper, AnimatedCard, AnimatedHeader, AnimatedChart, AnimatedList, AnimatedListItem } from './shared/AnimatedWrapper';
import { 
  Users,
  Calendar,
  Shield,
  Building2,
  BarChart2,
  PieChart,
  Activity,
  Baby,
  UserCheck,
  UserPlus,
  FileText
} from '../constants/icons';

// Type definitions
interface AgeDistribution {
  "Below 18": number;
  "18-34": number;
  "35 and above": number;
}

interface RiskFactorData {
  "Below 18": number;
  "18-34": number;
  "35 and above": number;
}

interface HealthCenterData {
  total: number;
  ageDistribution: AgeDistribution;
  riskFactors: Record<string, RiskFactorData>;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  label?: string;
}

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  className?: string;
}

interface InteractiveCardProps {
  children: React.ReactNode;
  onClick?: () => void;
  isSelected?: boolean;
  delay?: number;
}

const VTEDashboard = () => {
  const [selectedHealthCenter, setSelectedHealthCenter] = useState('MULTAQA');
  const [currentRiskFactorIndex, setCurrentRiskFactorIndex] = useState(0);
  const [viewMode, setViewMode] = useState('by-center');
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [animatedValues, setAnimatedValues] = useState({});
  const [chartView, setChartView] = useState('bar');
  const [showRiskFactorDetails, setShowRiskFactorDetails] = useState(false);

  // Professional Healthcare Color Palette
  const colors = {
    // Primary colors - professional blues and teals
    primary: '#005EB8', // NHS Blue
    secondary: '#0072CE', // Medical Blue
    tertiary: '#00629B', // Deep Medical Blue
    
    // Status colors
    success: '#009639', // Medical Green
    warning: '#ED8B00', // Medical Amber
    danger: '#DA291C', // Medical Red
    info: '#41B6E6', // Light Medical Blue
    
    // Age group colors - professional medical scheme
    ageGroup1: '#00A9CE', // Pediatric Teal
    ageGroup2: '#0072CE', // Adult Blue  
    ageGroup3: '#ED8B00', // Senior Amber
    
    // Background gradients
    lightBg: '#F0F4F7',
    mediumBg: '#E1E8ED',
    darkBg: '#768692',
    
    // Text colors
    darkText: '#231F20',
    mediumText: '#425563',
    lightText: '#768692'
  };

  // Health Centers list from actual data
  const healthCenters = [
    'MULTAQA', 'TAREEF', 'FALAJ', 'UWAYNAT', 'WADI AHIN', 'WADI HIBI'
  ];

  // Risk factors list (all 27 factors)
  const riskFactorsList = [
    "Previous VTE Single Event",
    "Previous VTE by Major Surgery",
    "Thrombophilia",
    "Medical Comorbidities",
    "Family History of VTE",
    "Age > 35",
    "Obesity BMI 30-39",
    "Obesity BMI ≥40",
    "Parity ≥3",
    "Smoking",
    "Paraplegia",
    "Gross Varicose veins",
    "Multiple Pregnancy",
    "Pre-eclampsia",
    "IVF",
    "Emergency CS",
    "Elective LSCS",
    "Prolonged labour >24h",
    "PPH >1L",
    "Preterm <37weeks",
    "Still Birth",
    "Surgical procedure",
    "Hyperemesis/dehydration",
    "Ovarian hyperstimulation",
    "Immobility",
    "Current infection",
    "Long travel >8 hours"
  ];

  // ACTUAL health center data from CSV file - 2023 YEAR ONLY
  const healthCenterData: Record<string, HealthCenterData> = {
    "MULTAQA": {
      total: 631,
      ageDistribution: {
        "Below 18": 1,
        "18-34": 434,
        "35 and above": 196
      },
      riskFactors: {
        "Previous VTE Single Event": { "Below 18": 0, "18-34": 6, "35 and above": 0 },
        "Previous VTE by Major Surgery": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Thrombophilia": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Medical Comorbidities": { "Below 18": 0, "18-34": 44, "35 and above": 48 },
        "Family History of VTE": { "Below 18": 0, "18-34": 21, "35 and above": 1 },
        "Age > 35": { "Below 18": 0, "18-34": 0, "35 and above": 166 },
        "Obesity BMI 30-39": { "Below 18": 0, "18-34": 108, "35 and above": 54 },
        "Obesity BMI ≥40": { "Below 18": 0, "18-34": 88, "35 and above": 43 },
        "Parity ≥3": { "Below 18": 0, "18-34": 154, "35 and above": 88 },
        "Smoking": { "Below 18": 0, "18-34": 140, "35 and above": 65 },
        "Paraplegia": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Gross Varicose veins": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Multiple Pregnancy": { "Below 18": 0, "18-34": 4, "35 and above": 0 },
        "Pre-eclampsia": { "Below 18": 0, "18-34": 15, "35 and above": 2 },
        "IVF": { "Below 18": 0, "18-34": 8, "35 and above": 1 },
        "Emergency CS": { "Below 18": 0, "18-34": 51, "35 and above": 22 },
        "Elective LSCS": { "Below 18": 0, "18-34": 48, "35 and above": 42 },
        "Prolonged labour >24h": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "PPH >1L": { "Below 18": 0, "18-34": 5, "35 and above": 3 },
        "Preterm <37weeks": { "Below 18": 0, "18-34": 0, "35 and above": 1 },
        "Still Birth": { "Below 18": 0, "18-34": 10, "35 and above": 13 },
        "Surgical procedure": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Hyperemesis/dehydration": { "Below 18": 0, "18-34": 5, "35 and above": 2 },
        "Ovarian hyperstimulation": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Immobility": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Current infection": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Long travel >8 hours": { "Below 18": 0, "18-34": 0, "35 and above": 0 }
      }
    },
    "TAREEF": {
      total: 449,
      ageDistribution: {
        "Below 18": 3,
        "18-34": 306,
        "35 and above": 139
      },
      riskFactors: {
        "Previous VTE Single Event": { "Below 18": 0, "18-34": 12, "35 and above": 5 },
        "Previous VTE by Major Surgery": { "Below 18": 0, "18-34": 1, "35 and above": 0 },
        "Thrombophilia": { "Below 18": 0, "18-34": 0, "35 and above": 1 },
        "Medical Comorbidities": { "Below 18": 0, "18-34": 33, "35 and above": 21 },
        "Family History of VTE": { "Below 18": 0, "18-34": 5, "35 and above": 7 },
        "Age > 35": { "Below 18": 0, "18-34": 0, "35 and above": 114 },
        "Obesity BMI 30-39": { "Below 18": 0, "18-34": 82, "35 and above": 28 },
        "Obesity BMI ≥40": { "Below 18": 0, "18-34": 76, "35 and above": 35 },
        "Parity ≥3": { "Below 18": 0, "18-34": 101, "35 and above": 69 },
        "Smoking": { "Below 18": 0, "18-34": 117, "35 and above": 38 },
        "Paraplegia": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Gross Varicose veins": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Multiple Pregnancy": { "Below 18": 0, "18-34": 7, "35 and above": 5 },
        "Pre-eclampsia": { "Below 18": 0, "18-34": 23, "35 and above": 12 },
        "IVF": { "Below 18": 0, "18-34": 5, "35 and above": 2 },
        "Emergency CS": { "Below 18": 0, "18-34": 21, "35 and above": 11 },
        "Elective LSCS": { "Below 18": 0, "18-34": 37, "35 and above": 31 },
        "Prolonged labour >24h": { "Below 18": 0, "18-34": 1, "35 and above": 1 },
        "PPH >1L": { "Below 18": 0, "18-34": 8, "35 and above": 12 },
        "Preterm <37weeks": { "Below 18": 0, "18-34": 1, "35 and above": 5 },
        "Still Birth": { "Below 18": 0, "18-34": 6, "35 and above": 1 },
        "Surgical procedure": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Hyperemesis/dehydration": { "Below 18": 0, "18-34": 4, "35 and above": 0 },
        "Ovarian hyperstimulation": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Immobility": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Current infection": { "Below 18": 0, "18-34": 0, "35 and above": 1 },
        "Long travel >8 hours": { "Below 18": 0, "18-34": 0, "35 and above": 0 }
      }
    },
    "FALAJ": {
      total: 329,
      ageDistribution: {
        "Below 18": 2,
        "18-34": 219,
        "35 and above": 107
      },
      riskFactors: {
        "Previous VTE Single Event": { "Below 18": 0, "18-34": 5, "35 and above": 0 },
        "Previous VTE by Major Surgery": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Thrombophilia": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Medical Comorbidities": { "Below 18": 0, "18-34": 1, "35 and above": 13 },
        "Family History of VTE": { "Below 18": 0, "18-34": 14, "35 and above": 0 },
        "Age > 35": { "Below 18": 0, "18-34": 0, "35 and above": 94 },
        "Obesity BMI 30-39": { "Below 18": 0, "18-34": 57, "35 and above": 27 },
        "Obesity BMI ≥40": { "Below 18": 0, "18-34": 14, "35 and above": 15 },
        "Parity ≥3": { "Below 18": 0, "18-34": 72, "35 and above": 49 },
        "Smoking": { "Below 18": 0, "18-34": 66, "35 and above": 31 },
        "Paraplegia": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Gross Varicose veins": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Multiple Pregnancy": { "Below 18": 0, "18-34": 5, "35 and above": 1 },
        "Pre-eclampsia": { "Below 18": 0, "18-34": 5, "35 and above": 0 },
        "IVF": { "Below 18": 0, "18-34": 7, "35 and above": 0 },
        "Emergency CS": { "Below 18": 0, "18-34": 5, "35 and above": 1 },
        "Elective LSCS": { "Below 18": 0, "18-34": 16, "35 and above": 6 },
        "Prolonged labour >24h": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "PPH >1L": { "Below 18": 0, "18-34": 4, "35 and above": 2 },
        "Preterm <37weeks": { "Below 18": 0, "18-34": 0, "35 and above": 1 },
        "Still Birth": { "Below 18": 0, "18-34": 0, "35 and above": 5 },
        "Surgical procedure": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Hyperemesis/dehydration": { "Below 18": 0, "18-34": 2, "35 and above": 0 },
        "Ovarian hyperstimulation": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Immobility": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Current infection": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Long travel >8 hours": { "Below 18": 0, "18-34": 0, "35 and above": 0 }
      }
    },
    "UWAYNAT": {
      total: 573,
      ageDistribution: {
        "Below 18": 4,
        "18-34": 388,
        "35 and above": 180
      },
      riskFactors: {
        "Previous VTE Single Event": { "Below 18": 0, "18-34": 12, "35 and above": 5 },
        "Previous VTE by Major Surgery": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Thrombophilia": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Medical Comorbidities": { "Below 18": 0, "18-34": 16, "35 and above": 35 },
        "Family History of VTE": { "Below 18": 0, "18-34": 8, "35 and above": 9 },
        "Age > 35": { "Below 18": 0, "18-34": 0, "35 and above": 161 },
        "Obesity BMI 30-39": { "Below 18": 2, "18-34": 103, "35 and above": 56 },
        "Obesity BMI ≥40": { "Below 18": 2, "18-34": 99, "35 and above": 34 },
        "Parity ≥3": { "Below 18": 0, "18-34": 182, "35 and above": 88 },
        "Smoking": { "Below 18": 1, "18-34": 142, "35 and above": 76 },
        "Paraplegia": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Gross Varicose veins": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Multiple Pregnancy": { "Below 18": 0, "18-34": 8, "35 and above": 4 },
        "Pre-eclampsia": { "Below 18": 0, "18-34": 7, "35 and above": 7 },
        "IVF": { "Below 18": 0, "18-34": 2, "35 and above": 1 },
        "Emergency CS": { "Below 18": 0, "18-34": 21, "35 and above": 17 },
        "Elective LSCS": { "Below 18": 0, "18-34": 31, "35 and above": 31 },
        "Prolonged labour >24h": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "PPH >1L": { "Below 18": 0, "18-34": 2, "35 and above": 3 },
        "Preterm <37weeks": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Still Birth": { "Below 18": 0, "18-34": 9, "35 and above": 4 },
        "Surgical procedure": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Hyperemesis/dehydration": { "Below 18": 0, "18-34": 2, "35 and above": 5 },
        "Ovarian hyperstimulation": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Immobility": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Current infection": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Long travel >8 hours": { "Below 18": 0, "18-34": 0, "35 and above": 0 }
      }
    },
    "WADI AHIN": {
      total: 55,
      ageDistribution: {
        "Below 18": 0,
        "18-34": 42,
        "35 and above": 13
      },
      riskFactors: {
        "Previous VTE Single Event": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Previous VTE by Major Surgery": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Thrombophilia": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Medical Comorbidities": { "Below 18": 0, "18-34": 0, "35 and above": 2 },
        "Family History of VTE": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Age > 35": { "Below 18": 0, "18-34": 0, "35 and above": 11 },
        "Obesity BMI 30-39": { "Below 18": 0, "18-34": 11, "35 and above": 3 },
        "Obesity BMI ≥40": { "Below 18": 0, "18-34": 9, "35 and above": 3 },
        "Parity ≥3": { "Below 18": 0, "18-34": 20, "35 and above": 8 },
        "Smoking": { "Below 18": 0, "18-34": 11, "35 and above": 2 },
        "Paraplegia": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Gross Varicose veins": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Multiple Pregnancy": { "Below 18": 0, "18-34": 1, "35 and above": 1 },
        "Pre-eclampsia": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "IVF": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Emergency CS": { "Below 18": 0, "18-34": 1, "35 and above": 1 },
        "Elective LSCS": { "Below 18": 0, "18-34": 5, "35 and above": 1 },
        "Prolonged labour >24h": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "PPH >1L": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Preterm <37weeks": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Still Birth": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Surgical procedure": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Hyperemesis/dehydration": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Ovarian hyperstimulation": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Immobility": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Current infection": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Long travel >8 hours": { "Below 18": 0, "18-34": 0, "35 and above": 0 }
      }
    },
    "WADI HIBI": {
      total: 108,
      ageDistribution: {
        "Below 18": 0,
        "18-34": 76,
        "35 and above": 32
      },
      riskFactors: {
        "Previous VTE Single Event": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Previous VTE by Major Surgery": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Thrombophilia": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Medical Comorbidities": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Family History of VTE": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Age > 35": { "Below 18": 0, "18-34": 0, "35 and above": 27 },
        "Obesity BMI 30-39": { "Below 18": 0, "18-34": 6, "35 and above": 2 },
        "Obesity BMI ≥40": { "Below 18": 0, "18-34": 9, "35 and above": 0 },
        "Parity ≥3": { "Below 18": 0, "18-34": 26, "35 and above": 13 },
        "Smoking": { "Below 18": 0, "18-34": 3, "35 and above": 2 },
        "Paraplegia": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Gross Varicose veins": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Multiple Pregnancy": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Pre-eclampsia": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "IVF": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Emergency CS": { "Below 18": 0, "18-34": 3, "35 and above": 0 },
        "Elective LSCS": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Prolonged labour >24h": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "PPH >1L": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Preterm <37weeks": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Still Birth": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Surgical procedure": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Hyperemesis/dehydration": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Ovarian hyperstimulation": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Immobility": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Current infection": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Long travel >8 hours": { "Below 18": 0, "18-34": 0, "35 and above": 0 }
      }
    }
  };

  const currentHealthCenterData = healthCenterData[selectedHealthCenter];
  const currentRiskFactor = riskFactorsList[currentRiskFactorIndex];
  const currentRiskFactorData = currentHealthCenterData?.riskFactors[currentRiskFactor];

  // Animated counter hook
  const useAnimatedCounter = (endValue: number, duration: number = 1000) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      let startTime: number;
      let animationFrame: number;
      
      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        setCount(Math.floor(progress * endValue));
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };
      
      animationFrame = requestAnimationFrame(animate);
      
      return () => cancelAnimationFrame(animationFrame);
    }, [endValue, duration]);
    
    return count;
  };

  // Professional Custom Tooltip
  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-xl border border-gray-200 animate-fadeIn">
          <p className="font-bold text-gray-800 text-base mb-2 border-b pb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm flex items-center gap-2 py-1" style={{ color: entry.color }}>
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></span>
              {entry.name}: <span className="font-bold ml-auto">{entry.value}</span> patients
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const handlePreviousRiskFactor = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentRiskFactorIndex((prev) => 
        prev === 0 ? riskFactorsList.length - 1 : prev - 1
      );
      setIsAnimating(false);
    }, 300);
  };

  const handleNextRiskFactor = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentRiskFactorIndex((prev) => 
        prev === riskFactorsList.length - 1 ? 0 : prev + 1
      );
      setIsAnimating(false);
    }, 300);
  };

  // Animated Number Component
  const AnimatedNumber = ({ value, duration = 1000, className = "" }: AnimatedNumberProps) => {
    const animatedValue = useAnimatedCounter(value, duration);
    return <span className={className}>{animatedValue}</span>;
  };

  // Professional Interactive Card Component
  const InteractiveCard = ({ children, onClick, isSelected, delay = 0 }: InteractiveCardProps) => {
    return (
      <div
        onClick={onClick}
        className={`
          transform transition-all duration-300 cursor-pointer
          ${isSelected ? 'scale-105 shadow-2xl ring-4 ring-opacity-50' : 'hover:scale-102 hover:shadow-xl'}
          animate-slideIn
        `}
        style={{ 
          animationDelay: `${delay}ms`,
          transform: hoveredCard === (children as any)?.key ? 'translateY(-5px)' : 'translateY(0)'
        }}
        onMouseEnter={() => setHoveredCard((children as any)?.key)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        {children}
      </div>
    );
  };

  // Calculate grand totals for verification
  const calculateGrandTotals = () => {
    let totalPatients = 0;
    let totalByAge = { "Below 18": 0, "18-34": 0, "35 and above": 0 };
    
    Object.values(healthCenterData).forEach(center => {
      totalPatients += center.total;
      totalByAge["Below 18"] += center.ageDistribution["Below 18"];
      totalByAge["18-34"] += center.ageDistribution["18-34"];
      totalByAge["35 and above"] += center.ageDistribution["35 and above"];
    });
    
    return { totalPatients, totalByAge };
  };

  const grandTotals = calculateGrandTotals();

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.lightBg }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        
        .animate-slideIn {
          animation: slideIn 0.5s ease-out;
        }
        
        .animate-pulse {
          animation: pulse 2s infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        {/* Data Year Notice */}
        <AnimatedWrapper
          animation={{
            hidden: { opacity: 0, y: -20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
            }
          }}
        >
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3 mb-4 animate-fadeIn">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" style={{ color: colors.primary }} />
              <p className="text-sm font-semibold" style={{ color: colors.primary }}>
                Important: This dashboard displays data exclusively from the year 2023. 
                No data from 2024 or any other year is included in this analysis.
              </p>
            </div>
          </div>
        </AnimatedWrapper>
        
        <AnimatedCard>
          <div className="bg-white rounded-xl shadow-lg p-8 mb-6 animate-fadeIn relative overflow-hidden border-t-4" style={{ borderTopColor: colors.primary }}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br opacity-10 rounded-full blur-3xl animate-float" style={{ background: `linear-gradient(to bottom right, ${colors.primary}, ${colors.secondary})` }}></div>
            
            {/* Ministry Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Shield className="w-12 h-12" style={{ color: colors.primary }} />
                <div>
                  <h2 className="text-lg font-semibold" style={{ color: colors.darkText }}>Ministry of Health</h2>
                  <p className="text-sm" style={{ color: colors.mediumText }}>Sultanate of Oman</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold" style={{ color: colors.primary }}>2023 DATA ONLY</p>
                <p className="text-sm" style={{ color: colors.mediumText }}>Annual Report - Year 2023</p>
                <p className="text-xs" style={{ color: colors.lightText }}>Suhar Wilayat</p>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold mb-2" style={{ color: colors.primary }}>
              VTE Risk Assessment Analysis - Year 2023
            </h1>
            <p className="text-lg" style={{ color: colors.mediumText }}>
              Comprehensive Age Distribution and Risk Factor Analysis by Health Center
            </p>
            <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full" style={{ backgroundColor: colors.primary + '20' }}>
              <Calendar className="w-4 h-4" style={{ color: colors.primary }} />
              <span className="text-sm font-semibold" style={{ color: colors.primary }}>
                Data Period: January 1, 2023 - December 31, 2023
              </span>
            </div>
            
            {/* Summary Stats */}
            <AnimatedList>
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
                <AnimatedListItem delay={0.1}>
                  <div>
                    <p className="text-sm" style={{ color: colors.mediumText }}>Total Patients (2023)</p>
                    <p className="text-2xl font-bold" style={{ color: colors.primary }}>
                      <AnimatedNumber value={grandTotals.totalPatients} />
                    </p>
                  </div>
                </AnimatedListItem>
                <AnimatedListItem delay={0.2}>
                  <div>
                    <p className="text-sm" style={{ color: colors.mediumText }}>Health Centers</p>
                    <p className="text-2xl font-bold" style={{ color: colors.primary }}>6</p>
                  </div>
                </AnimatedListItem>
                <AnimatedListItem delay={0.3}>
                  <div>
                    <p className="text-sm" style={{ color: colors.mediumText }}>Risk Factors Assessed</p>
                    <p className="text-2xl font-bold" style={{ color: colors.primary }}>27</p>
                  </div>
                </AnimatedListItem>
              </div>
            </AnimatedList>
          </div>
        </AnimatedCard>

        {/* Professional View Mode Toggle */}
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
          <div className="flex gap-4 mb-6">
            {[
              { mode: 'by-center', label: 'Analysis by Health Center (2023)', icon: <Building2 className="w-5 h-5" /> },
              { mode: 'overview', label: 'Overall Summary (2023)', icon: <BarChart2 className="w-5 h-5" /> }
            ].map((item, index) => (
              <button
                key={item.mode}
                onClick={() => setViewMode(item.mode)}
                className={`
                  px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2
                  ${viewMode === item.mode
                    ? 'text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow hover:shadow-lg hover:scale-102'
                  }
                  animate-slideIn
                `}
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  backgroundColor: viewMode === item.mode ? colors.primary : undefined,
                  color: viewMode === item.mode ? 'white' : colors.darkText
                }}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </AnimatedWrapper>

        {/* Health Center Analysis View */}
        {viewMode === 'by-center' && (
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
            <div className="space-y-6">
              {/* Health Center Selector */}
              <Card className="border-0 shadow-lg animate-fadeIn">
                <CardHeader style={{ backgroundColor: colors.lightBg }}>
                  <CardTitle className="text-xl flex items-center gap-2" style={{ color: colors.darkText }}>
                    <Building2 className="w-6 h-6" style={{ color: colors.primary }} />
                    Select Health Center - 2023 Data Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <AnimatedList>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {healthCenters.map((center, index) => (
                        <AnimatedListItem key={center} delay={index * 0.05}>
                          <InteractiveCard
                            onClick={() => {
                              setSelectedHealthCenter(center);
                              setCurrentRiskFactorIndex(0);
                            }}
                            isSelected={selectedHealthCenter === center}
                            delay={index * 50}
                          >
                            <div className={`
                              p-4 rounded-xl transition-all duration-300 border-2
                              ${selectedHealthCenter === center
                                ? 'text-white'
                                : 'bg-white hover:shadow-lg'
                              }
                            `}
                            style={{
                              backgroundColor: selectedHealthCenter === center ? colors.primary : 'white',
                              borderColor: selectedHealthCenter === center ? colors.primary : colors.mediumBg,
                              color: selectedHealthCenter === center ? 'white' : colors.darkText
                            }}>
                              <Building2 className={`w-6 h-6 mb-2 ${selectedHealthCenter === center ? 'animate-pulse' : ''}`} 
                                style={{ color: selectedHealthCenter === center ? 'white' : colors.primary }} />
                              <div className="font-bold text-lg">{center}</div>
                              <div className="text-sm mt-1 flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                <AnimatedNumber 
                                  value={healthCenterData[center]?.total || 0} 
                                  className="font-semibold"
                                />
                                <span className="whitespace-nowrap"> patients (2023)</span>
                              </div>
                            </div>
                          </InteractiveCard>
                        </AnimatedListItem>
                      ))}
                    </div>
                  </AnimatedList>
                </CardContent>
              </Card>

              {/* Selected Health Center Analysis */}
              {currentHealthCenterData && (
                <div className="space-y-6">
                  {/* Age Distribution */}
                  <Card className="border-0 shadow-lg animate-fadeIn">
                    <CardHeader style={{ backgroundColor: colors.primary }} className="text-white">
                      <CardTitle className="text-xl flex items-center gap-2">
                        {selectedHealthCenter} - Age Distribution Analysis (2023 Data)
                        <div className="ml-auto flex gap-2">
                          {['bar', 'pie', 'area'].map((type) => (
                            <button
                              key={type}
                              onClick={() => setChartView(type)}
                              className={`
                                p-2 rounded-lg transition-all duration-300
                                ${chartView === type 
                                  ? 'bg-white/20 text-white' 
                                  : 'bg-transparent text-white/70 hover:bg-white/10'
                                }
                              `}
                            >
                              {type === 'bar' && <BarChart2 className="w-4 h-4" />}
                              {type === 'pie' && <PieChart className="w-4 h-4" />}
                              {type === 'area' && <Activity className="w-4 h-4" />}
                            </button>
                          ))}
                        </div>
                      </CardTitle>
                      <CardDescription className="text-white/90">
                        Total patients registered in 2023: <AnimatedNumber value={currentHealthCenterData.total} className="font-bold text-xl" />
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Age Distribution Cards */}
                        <AnimatedList>
                          <div className="space-y-4">
                            {Object.entries(currentHealthCenterData.ageDistribution).map(([age, count], index) => {
                              const percentage = ((Number(count) / currentHealthCenterData.total) * 100).toFixed(1);
                              const color = age === 'Below 18' ? colors.ageGroup1 : 
                                           age === '18-34' ? colors.ageGroup2 : colors.ageGroup3;
                              
                              return (
                                <AnimatedListItem key={age} delay={index * 0.1}>
                                  <div className="p-4 rounded-lg border-2 transition-all duration-300 hover:shadow-lg" 
                                       style={{ borderColor: color, backgroundColor: color + '10' }}>
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <h3 className="font-semibold text-lg" style={{ color: colors.darkText }}>{age}</h3>
                                        <p className="text-sm" style={{ color: colors.mediumText }}>
                                          <AnimatedNumber value={Number(count)} className="font-bold" /> patients
                                        </p>
                                      </div>
                                      <div className="text-right">
                                        <p className="text-2xl font-bold" style={{ color: color }}>{percentage}%</p>
                                        <div className="w-16 h-2 rounded-full bg-gray-200 mt-1">
                                          <div className="h-2 rounded-full transition-all duration-1000" 
                                               style={{ width: `${percentage}%`, backgroundColor: color }}></div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </AnimatedListItem>
                              );
                            })}
                          </div>
                        </AnimatedList>

                        {/* Chart */}
                        <AnimatedChart>
                          <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                              {chartView === 'bar' && (
                                <BarChart data={Object.entries(currentHealthCenterData.ageDistribution).map(([age, value]) => ({
                                  age: age.replace(' and above', '+'),
                                  count: value,
                                  color: age === 'Below 18' ? colors.ageGroup1 : 
                                         age === '18-34' ? colors.ageGroup2 : colors.ageGroup3
                                }))}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="age" />
                                  <YAxis />
                                  <Tooltip content={<CustomTooltip />} />
                                  <Bar dataKey="count" fill={colors.primary} />
                                </BarChart>
                              )}
                              {chartView === 'pie' && (
                                <ReChartsPieChart>
                                  <Pie
                                    data={Object.entries(currentHealthCenterData.ageDistribution).map(([age, value]) => ({
                                      name: age,
                                      value,
                                      color: age === 'Below 18' ? colors.ageGroup1 : 
                                             age === '18-34' ? colors.ageGroup2 : colors.ageGroup3
                                    }))}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, value, color }) => `${name}: ${value}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                  >
                                    {Object.entries(currentHealthCenterData.ageDistribution).map(([age, value], index) => (
                                      <Cell key={`cell-${index}`} fill={
                                        age === 'Below 18' ? colors.ageGroup1 : 
                                        age === '18-34' ? colors.ageGroup2 : colors.ageGroup3
                                      } />
                                    ))}
                                  </Pie>
                                  <Tooltip content={<CustomTooltip />} />
                                </ReChartsPieChart>
                              )}
                              {chartView === 'area' && (
                                <AreaChart data={Object.entries(currentHealthCenterData.ageDistribution).map(([age, value]) => ({
                                  age: age.replace(' and above', '+'),
                                  value
                                }))}>
                                  <defs>
                                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="5%" stopColor={colors.primary} stopOpacity={0.8}/>
                                      <stop offset="95%" stopColor={colors.primary} stopOpacity={0.1}/>
                                    </linearGradient>
                                  </defs>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="age" />
                                  <YAxis />
                                  <Tooltip content={<CustomTooltip />} />
                                  <Area 
                                    type="monotone" 
                                    dataKey="value" 
                                    stroke={colors.primary} 
                                    fillOpacity={1} 
                                    fill="url(#colorGradient)"
                                  />
                                </AreaChart>
                              )}
                            </ResponsiveContainer>
                          </div>
                        </AnimatedChart>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Footer with Official Stamp */}
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5" style={{ color: colors.primary }} />
                          <div>
                            <p className="text-sm font-semibold" style={{ color: colors.darkText }}>
                              VTE Risk Assessment Report - Year 2023 Data
                            </p>
                            <p className="text-xs" style={{ color: colors.mediumText }}>
                              Report Generated: {new Date().toLocaleDateString()} | Data Year: 2023 Only
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs" style={{ color: colors.primary }}>Document ID: VTE-2023-SUHAR</p>
                          <p className="text-xs" style={{ color: colors.mediumText }}>Data Collection Period: Jan-Dec 2023</p>
                          <p className="text-xs" style={{ color: colors.lightText }}>Ministry of Health - Sultanate of Oman</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </AnimatedWrapper>
        )}
      </div>
    </div>
  );
};

export default VTEDashboard; 