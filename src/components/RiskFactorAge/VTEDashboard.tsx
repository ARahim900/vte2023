import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Area, AreaChart } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, TrendingUp, Users, Activity, Building2, Calendar, Heart, Baby, UserCheck, UserPlus, ChevronLeft, ChevronRight, BarChart2, PieChart as PieChartIcon, Table, Shield, FileText, Award, Download, Filter, Search } from 'lucide-react';

const VTEDashboard = () => {
  const [selectedHealthCenter, setSelectedHealthCenter] = useState('MULTAQA');
  const [currentRiskFactorIndex, setCurrentRiskFactorIndex] = useState(0);
  const [viewMode, setViewMode] = useState('by-center');
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [animatedValues, setAnimatedValues] = useState({});
  const [chartView, setChartView] = useState('bar');
  const [showRiskFactorDetails, setShowRiskFactorDetails] = useState(false);
  const [filterAge, setFilterAge] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

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
  const healthCenterData = {
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
  const useAnimatedCounter = (endValue, duration = 1000) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      let startTime;
      let animationFrame;
      
      const animate = (timestamp) => {
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
  const CustomTooltip = ({ active, payload, label }) => {
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
  const AnimatedNumber = ({ value, duration = 1000, className = "" }) => {
    const animatedValue = useAnimatedCounter(value, duration);
    return <span className={className}>{animatedValue}</span>;
  };

  // Professional Interactive Card Component
  const InteractiveCard = ({ children, onClick, isSelected, delay = 0 }) => {
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
          transform: hoveredCard === children.key ? 'translateY(-5px)' : 'translateY(0)',
          ringColor: isSelected ? colors.primary : 'transparent'
        }}
        onMouseEnter={() => setHoveredCard(children.key)}
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
    let totalByRiskFactor = {};
    
    riskFactorsList.forEach(factor => {
      totalByRiskFactor[factor] = { "Below 18": 0, "18-34": 0, "35 and above": 0, total: 0 };
    });
    
    Object.values(healthCenterData).forEach(center => {
      totalPatients += center.total;
      totalByAge["Below 18"] += center.ageDistribution["Below 18"];
      totalByAge["18-34"] += center.ageDistribution["18-34"];
      totalByAge["35 and above"] += center.ageDistribution["35 and above"];
      
      riskFactorsList.forEach(factor => {
        const rf = center.riskFactors[factor];
        totalByRiskFactor[factor]["Below 18"] += rf["Below 18"];
        totalByRiskFactor[factor]["18-34"] += rf["18-34"];
        totalByRiskFactor[factor]["35 and above"] += rf["35 and above"];
        totalByRiskFactor[factor].total += rf["Below 18"] + rf["18-34"] + rf["35 and above"];
      });
    });
    
    return { totalPatients, totalByAge, totalByRiskFactor };
  };

  const grandTotals = calculateGrandTotals();

  // Filter risk factors based on search term
  const filteredRiskFactors = riskFactorsList.filter(factor =>
    factor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Export data function
  const exportData = () => {
    const data = {
      year: 2023,
      healthCenter: selectedHealthCenter,
      totalPatients: currentHealthCenterData.total,
      ageDistribution: currentHealthCenterData.ageDistribution,
      riskFactors: currentHealthCenterData.riskFactors
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `VTE_Data_${selectedHealthCenter}_2023.json`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
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
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3 mb-4 animate-fadeIn">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" style={{ color: colors.primary }} />
            <p className="text-sm font-semibold" style={{ color: colors.primary }}>
              Important: This dashboard displays data exclusively from the year 2023. 
              No data from 2024 or any other year is included in this analysis.
            </p>
          </div>
        </div>
        
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
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
            <div>
              <p className="text-sm" style={{ color: colors.mediumText }}>Total Patients (2023)</p>
              <p className="text-2xl font-bold" style={{ color: colors.primary }}>
                <AnimatedNumber value={grandTotals.totalPatients} />
              </p>
            </div>
            <div>
              <p className="text-sm" style={{ color: colors.mediumText }}>Health Centers</p>
              <p className="text-2xl font-bold" style={{ color: colors.primary }}>6</p>
            </div>
            <div>
              <p className="text-sm" style={{ color: colors.mediumText }}>Risk Factors Assessed</p>
              <p className="text-2xl font-bold" style={{ color: colors.primary }}>27</p>
            </div>
          </div>
        </div>

        {/* Professional View Mode Toggle */}
        <div className="flex gap-4 mb-6">
          {[
            { mode: 'by-center', label: 'Analysis by Health Center (2023)', icon: <Building2 className="w-5 h-5" /> },
            { mode: 'overview', label: 'Overall Summary (2023)', icon: <BarChart2 className="w-5 h-5" /> },
            { mode: 'risk-comparison', label: 'Risk Factors Comparison', icon: <Activity className="w-5 h-5" /> }
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

        {/* Health Center Analysis View */}
        {viewMode === 'by-center' && (
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
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {healthCenters.map((center, index) => (
                    <InteractiveCard
                      key={center}
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
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Selected Health Center Analysis */}
            {currentHealthCenterData && (
              <>
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
                            {type === 'pie' && <PieChartIcon className="w-4 h-4" />}
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
                      <div className="space-y-4">
                        {Object.entries(currentHealthCenterData.ageDistribution).map(([age, count], index) => {
                          const percentage = ((count / currentHealthCenterData.total) * 100).toFixed(1);
                          const color = age === 'Below 18' ? colors.ageGroup1 : 
                                       age === '18-34' ? colors.ageGroup2 : colors.ageGroup3;
                          return (
                            <div 
                              key={age} 
                              className="bg-white rounded-xl p-4 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-102 animate-slideIn border-2"
                              style={{ 
                                animationDelay: `${index * 100}ms`,
                                borderColor: color + '30'
                              }}
                            >
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold flex items-center gap-2" style={{ color }}>
                                  {age === 'Below 18' && <Baby className="w-5 h-5" />}
                                  {age === '18-34' && <UserCheck className="w-5 h-5" />}
                                  {age === '35 and above' && <UserPlus className="w-5 h-5" />}
                                  {age} years
                                </span>
                                <span className="text-3xl font-bold" style={{ color: colors.darkText }}>
                                  <AnimatedNumber value={count} />
                                </span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                <div 
                                  className="h-3 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                                  style={{ 
                                    width: `${percentage}%`,
                                    backgroundColor: color
                                  }}
                                >
                                  <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                                </div>
                              </div>
                              <div className="flex justify-between items-center mt-2">
                                <span className="text-sm" style={{ color: colors.mediumText }}>Percentage</span>
                                <span className="text-sm font-semibold" style={{ color }}>{percentage}%</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Dynamic Chart View */}
                      <div className="animate-fadeIn bg-white rounded-xl p-4">
                        {chartView === 'pie' && (
                          <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                              <Pie
                                data={Object.entries(currentHealthCenterData.ageDistribution).map(([age, value]) => ({
                                  name: age,
                                  value,
                                  color: age === 'Below 18' ? colors.ageGroup1 : 
                                         age === '18-34' ? colors.ageGroup2 : colors.ageGroup3
                                }))}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={90}
                                fill="#8884d8"
                                dataKey="value"
                                animationBegin={0}
                                animationDuration={1000}
                                label={({ value }) => value}
                              >
                                {Object.entries(currentHealthCenterData.ageDistribution).map(([age, value], index) => (
                                  <Cell key={`cell-${index}`} fill={
                                    age === 'Below 18' ? colors.ageGroup1 : 
                                    age === '18-34' ? colors.ageGroup2 : colors.ageGroup3
                                  } />
                                ))}
                              </Pie>
                              <Tooltip content={<CustomTooltip />} />
                              <Legend />
                            </PieChart>
                          </ResponsiveContainer>
                        )}
                        
                        {chartView === 'bar' && (
                          <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={Object.entries(currentHealthCenterData.ageDistribution).map(([age, value]) => ({
                              age: age.replace(' and above', '+'),
                              value,
                              color: age === 'Below 18' ? colors.ageGroup1 : 
                                     age === '18-34' ? colors.ageGroup2 : colors.ageGroup3
                            }))}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                              <XAxis dataKey="age" />
                              <YAxis />
                              <Tooltip content={<CustomTooltip />} />
                              <Bar dataKey="value" radius={[8, 8, 0, 0]} animationDuration={1000}>
                                <Cell fill={colors.ageGroup1} />
                                <Cell fill={colors.ageGroup2} />
                                <Cell fill={colors.ageGroup3} />
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        )}
                        
                        {chartView === 'area' && (
                          <ResponsiveContainer width="100%" height={250}>
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
                              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                              <XAxis dataKey="age" />
                              <YAxis />
                              <Tooltip content={<CustomTooltip />} />
                              <Area 
                                type="monotone" 
                                dataKey="value" 
                                stroke={colors.primary} 
                                fillOpacity={1} 
                                fill="url(#colorGradient)"
                                animationDuration={1000}
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Risk Factor Navigator */}
                <Card className="border-0 shadow-lg animate-fadeIn relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 animate-float" 
                    style={{ background: `linear-gradient(to bottom right, ${colors.secondary}, ${colors.info})` }}></div>
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2" style={{ color: colors.darkText }}>
                      <Activity className="w-6 h-6" style={{ color: colors.primary }} />
                      Risk Factor Analysis - Interactive Navigator
                    </CardTitle>
                    <CardDescription style={{ color: colors.mediumText }}>
                      Navigate through all 27 risk factors to analyze age distribution (2023 patients)
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 relative">
                    {/* Search and Filter Bar */}
                    <div className="flex gap-4 mb-6">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: colors.mediumText }} />
                        <input
                          type="text"
                          placeholder="Search risk factors..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                          style={{ 
                            borderColor: colors.mediumBg,
                            focusBorderColor: colors.primary,
                            focusRingColor: colors.primary + '30'
                          }}
                        />
                      </div>
                      <button
                        onClick={exportData}
                        className="px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 hover:scale-105"
                        style={{ backgroundColor: colors.success, color: 'white' }}
                      >
                        <Download className="w-5 h-5" />
                        Export
                      </button>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex items-center justify-between mb-6">
                      <button
                        onClick={handlePreviousRiskFactor}
                        className="p-4 rounded-xl transition-all duration-300 transform hover:scale-110 hover:rotate-3 shadow-md hover:shadow-lg"
                        style={{ backgroundColor: colors.lightBg }}
                      >
                        <ChevronLeft className="w-6 h-6" style={{ color: colors.primary }} />
                      </button>
                      
                      <div className={`text-center flex-1 transition-all duration-300 ${isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
                        <h3 className="text-2xl font-bold mb-1" style={{ color: colors.darkText }}>
                          {currentRiskFactor}
                        </h3>
                        <p className="text-sm" style={{ color: colors.mediumText }}>
                          Risk Factor {currentRiskFactorIndex + 1} of {riskFactorsList.length}
                        </p>
                        <div className="flex justify-center mt-2 gap-1">
                          {riskFactorsList.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentRiskFactorIndex(index)}
                              className={`
                                w-2 h-2 rounded-full transition-all duration-300
                                ${index === currentRiskFactorIndex 
                                  ? 'w-8' 
                                  : 'hover:scale-125'
                                }
                              `}
                              style={{
                                backgroundColor: index === currentRiskFactorIndex ? colors.primary : colors.mediumBg
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <button
                        onClick={handleNextRiskFactor}
                        className="p-4 rounded-xl transition-all duration-300 transform hover:scale-110 hover:-rotate-3 shadow-md hover:shadow-lg"
                        style={{ backgroundColor: colors.lightBg }}
                      >
                        <ChevronRight className="w-6 h-6" style={{ color: colors.primary }} />
                      </button>
                    </div>

                    {/* Risk Factor Data */}
                    {currentRiskFactorData && (
                      <div className={`space-y-6 transition-all duration-300 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {[
                            { age: "Below 18", color: colors.ageGroup1, icon: <Baby className="w-6 h-6" /> },
                            { age: "18-34", color: colors.ageGroup2, icon: <UserCheck className="w-6 h-6" /> },
                            { age: "35 and above", color: colors.ageGroup3, icon: <UserPlus className="w-6 h-6" /> }
                          ].map((item, index) => (
                            <div
                              key={item.age}
                              className="rounded-xl p-6 border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer animate-slideIn bg-white"
                              style={{ 
                                borderColor: item.color,
                                animationDelay: `${index * 100}ms`
                              }}
                              onMouseEnter={() => setHoveredCard(item.age)}
                              onMouseLeave={() => setHoveredCard(null)}
                            >
                              <div className="flex items-center justify-between mb-3">
                                <div style={{ color: item.color }}>{item.icon}</div>
                                <span className="text-4xl font-bold" style={{ color: colors.darkText }}>
                                  <AnimatedNumber 
                                    value={currentRiskFactorData[item.age === "35 and above" ? "35 and above" : item.age]} 
                                    duration={800}
                                  />
                                </span>
                              </div>
                              <p className="text-sm font-medium" style={{ color: item.color }}>{item.age} years</p>
                              <p className="text-xs" style={{ color: colors.mediumText }}>patients affected</p>
                              
                              {/* Percentage of age group */}
                              <div className="mt-3">
                                <div className="flex justify-between text-xs mb-1">
                                  <span style={{ color: colors.mediumText }}>Of age group</span>
                                  <span style={{ color: item.color }}>
                                    {((currentRiskFactorData[item.age === "35 and above" ? "35 and above" : item.age] / 
                                       currentHealthCenterData.ageDistribution[item.age === "35 and above" ? "35 and above" : item.age] * 100) || 0).toFixed(1)}%
                                  </span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full rounded-full transition-all duration-1000 relative overflow-hidden"
                                    style={{ 
                                      width: `${(currentRiskFactorData[item.age === "35 and above" ? "35 and above" : item.age] / currentHealthCenterData.ageDistribution[item.age === "35 and above" ? "35 and above" : item.age] * 100) || 0}%`,
                                      backgroundColor: item.color
                                    }}
                                  >
                                    <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Bar Chart */}
                        <div className="bg-white rounded-xl p-4 shadow-md">
                          <ResponsiveContainer width="100%" height={300}>
                            <BarChart 
                              data={[
                                { age: 'Below 18', value: currentRiskFactorData["Below 18"], color: colors.ageGroup1 },
                                { age: '18-34', value: currentRiskFactorData["18-34"], color: colors.ageGroup2 },
                                { age: '35+', value: currentRiskFactorData["35 and above"], color: colors.ageGroup3 }
                              ]}
                            >
                              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                              <XAxis dataKey="age" />
                              <YAxis />
                              <Tooltip content={<CustomTooltip />} />
                              <Bar dataKey="value" radius={[8, 8, 0, 0]} animationDuration={800}>
                                <Cell fill={colors.ageGroup1} />
                                <Cell fill={colors.ageGroup2} />
                                <Cell fill={colors.ageGroup3} />
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>

                        {/* Total Summary */}
                        <div className="rounded-xl p-6 text-center transform hover:scale-102 transition-all duration-300 border-2"
                          style={{ 
                            backgroundColor: colors.lightBg,
                            borderColor: colors.primary + '30'
                          }}>
                          <p className="text-lg font-medium mb-2" style={{ color: colors.mediumText }}>
                            Total patients with {currentRiskFactor} at {selectedHealthCenter} (2023)
                          </p>
                          <p className="text-5xl font-bold" style={{ color: colors.primary }}>
                            <AnimatedNumber 
                              value={currentRiskFactorData["Below 18"] + 
                                     currentRiskFactorData["18-34"] + 
                                     currentRiskFactorData["35 and above"]}
                              duration={1000}
                            />
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Quick Jump Dropdown */}
                    <div className="mt-6">
                      <p className="text-sm mb-2" style={{ color: colors.mediumText }}>Quick jump to risk factor:</p>
                      <select
                        value={currentRiskFactorIndex}
                        onChange={(e) => {
                          setIsAnimating(true);
                          setTimeout(() => {
                            setCurrentRiskFactorIndex(Number(e.target.value));
                            setIsAnimating(false);
                          }, 300);
                        }}
                        className="w-full p-3 border-2 rounded-lg focus:outline-none focus:ring-4 transition-all duration-300"
                        style={{ 
                          borderColor: colors.mediumBg,
                          focusBorderColor: colors.primary,
                          focusRingColor: colors.primary + '30'
                        }}
                      >
                        {riskFactorsList.map((factor, index) => (
                          <option key={index} value={index}>
                            {index + 1}. {factor}
                          </option>
                        ))}
                      </select>
                    </div>
                  </CardContent>
                </Card>

                {/* Comprehensive Table */}
                <Card className="border-0 shadow-lg animate-fadeIn">
                  <CardHeader style={{ backgroundColor: colors.lightBg }}>
                    <CardTitle className="flex items-center gap-2" style={{ color: colors.darkText }}>
                      <Table className="w-5 h-5" style={{ color: colors.primary }} />
                      Comprehensive Risk Factors Summary - {selectedHealthCenter} (2023 Data)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b-2" style={{ borderColor: colors.mediumBg }}>
                            <th className="text-left p-3 font-semibold" style={{ color: colors.darkText }}>Risk Factor</th>
                            <th className="text-center p-3 font-semibold" style={{ color: colors.ageGroup1 }}>
                              <div className="flex items-center justify-center gap-1">
                                <Baby className="w-4 h-4" />
                                Below 18
                              </div>
                            </th>
                            <th className="text-center p-3 font-semibold" style={{ color: colors.ageGroup2 }}>
                              <div className="flex items-center justify-center gap-1">
                                <UserCheck className="w-4 h-4" />
                                18-34
                              </div>
                            </th>
                            <th className="text-center p-3 font-semibold" style={{ color: colors.ageGroup3 }}>
                              <div className="flex items-center justify-center gap-1">
                                <UserPlus className="w-4 h-4" />
                                35+
                              </div>
                            </th>
                            <th className="text-center p-3 font-semibold" style={{ color: colors.darkText }}>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredRiskFactors.map((factor, index) => {
                            const originalIndex = riskFactorsList.indexOf(factor);
                            const data = currentHealthCenterData.riskFactors[factor];
                            const total = data["Below 18"] + data["18-34"] + data["35 and above"];
                            return (
                              <tr 
                                key={index} 
                                className={`
                                  border-b transition-all duration-300 cursor-pointer
                                  hover:shadow-md
                                  ${currentRiskFactorIndex === originalIndex ? 'scale-102' : ''}
                                `}
                                style={{
                                  borderColor: colors.lightBg,
                                  backgroundColor: currentRiskFactorIndex === originalIndex ? colors.lightBg : 'white'
                                }}
                                onClick={() => {
                                  setIsAnimating(true);
                                  setTimeout(() => {
                                    setCurrentRiskFactorIndex(originalIndex);
                                    setIsAnimating(false);
                                  }, 300);
                                }}
                              >
                                <td className="p-3 font-medium" style={{ color: colors.darkText }}>
                                  <div className="flex items-center gap-2">
                                    {currentRiskFactorIndex === originalIndex && (
                                      <div className="w-2 h-2 rounded-full animate-pulse" 
                                        style={{ backgroundColor: colors.primary }}></div>
                                    )}
                                    {factor}
                                  </div>
                                </td>
                                <td className="text-center p-3">
                                  <span className={`
                                    inline-block px-3 py-1 rounded-full text-xs font-semibold
                                    ${data["Below 18"] > 0 ? 'text-white' : ''}
                                  `}
                                  style={{
                                    backgroundColor: data["Below 18"] > 0 ? colors.ageGroup1 : colors.lightBg,
                                    color: data["Below 18"] > 0 ? 'white' : colors.lightText
                                  }}>
                                    {data["Below 18"]}
                                  </span>
                                </td>
                                <td className="text-center p-3">
                                  <span className={`
                                    inline-block px-3 py-1 rounded-full text-xs font-semibold
                                    ${data["18-34"] > 0 ? 'text-white' : ''}
                                  `}
                                  style={{
                                    backgroundColor: data["18-34"] > 0 ? colors.ageGroup2 : colors.lightBg,
                                    color: data["18-34"] > 0 ? 'white' : colors.lightText
                                  }}>
                                    {data["18-34"]}
                                  </span>
                                </td>
                                <td className="text-center p-3">
                                  <span className={`
                                    inline-block px-3 py-1 rounded-full text-xs font-semibold
                                    ${data["35 and above"] > 0 ? 'text-white' : ''}
                                  `}
                                  style={{
                                    backgroundColor: data["35 and above"] > 0 ? colors.ageGroup3 : colors.lightBg,
                                    color: data["35 and above"] > 0 ? 'white' : colors.lightText
                                  }}>
                                    {data["35 and above"]}
                                  </span>
                                </td>
                                <td className="text-center p-3 font-bold">
                                  <span className={`
                                    inline-block px-3 py-1 rounded-full text-sm
                                  `}
                                  style={{
                                    backgroundColor: total > 50 ? colors.danger + '20' : 
                                                   total > 20 ? colors.warning + '20' : 
                                                   total > 0 ? colors.success + '20' : colors.lightBg,
                                    color: total > 50 ? colors.danger : 
                                          total > 20 ? colors.warning : 
                                          total > 0 ? colors.success : colors.lightText
                                  }}>
                                    {total}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        )}

        {/* Overall Summary View */}
        {viewMode === 'overview' && (
          <div className="space-y-6">
            {/* Grand Totals Card */}
            <Card className="border-0 shadow-lg animate-fadeIn">
              <CardHeader style={{ backgroundColor: colors.primary }} className="text-white">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Award className="w-6 h-6" />
                  Overall Statistics - All Health Centers (2023 Data)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 rounded-lg" style={{ backgroundColor: colors.lightBg }}>
                    <p className="text-sm" style={{ color: colors.mediumText }}>Total Patients (2023)</p>
                    <p className="text-3xl font-bold" style={{ color: colors.primary }}>
                      <AnimatedNumber value={grandTotals.totalPatients} />
                    </p>
                  </div>
                  <div className="text-center p-4 rounded-lg" style={{ backgroundColor: colors.ageGroup1 + '20' }}>
                    <p className="text-sm" style={{ color: colors.mediumText }}>Below 18 years (2023)</p>
                    <p className="text-3xl font-bold" style={{ color: colors.ageGroup1 }}>
                      <AnimatedNumber value={grandTotals.totalByAge["Below 18"]} />
                    </p>
                  </div>
                  <div className="text-center p-4 rounded-lg" style={{ backgroundColor: colors.ageGroup2 + '20' }}>
                    <p className="text-sm" style={{ color: colors.mediumText }}>18-34 years (2023)</p>
                    <p className="text-3xl font-bold" style={{ color: colors.ageGroup2 }}>
                      <AnimatedNumber value={grandTotals.totalByAge["18-34"]} />
                    </p>
                  </div>
                  <div className="text-center p-4 rounded-lg" style={{ backgroundColor: colors.ageGroup3 + '20' }}>
                    <p className="text-sm" style={{ color: colors.mediumText }}>35+ years (2023)</p>
                    <p className="text-3xl font-bold" style={{ color: colors.ageGroup3 }}>
                      <AnimatedNumber value={grandTotals.totalByAge["35 and above"]} />
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Health Centers Summary Table */}
            <Card className="border-0 shadow-lg animate-fadeIn">
              <CardHeader style={{ backgroundColor: colors.lightBg }}>
                <CardTitle className="text-xl" style={{ color: colors.darkText }}>
                  Health Centers Summary - 2023 Data
                </CardTitle>
                <CardDescription style={{ color: colors.mediumText }}>
                  Click any center to view detailed 2023 analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2" style={{ borderColor: colors.mediumBg }}>
                        <th className="text-left p-3 font-semibold" style={{ color: colors.darkText }}>Health Center</th>
                        <th className="text-center p-3 font-semibold" style={{ color: colors.darkText }}>Total</th>
                        <th className="text-center p-3 font-semibold" style={{ color: colors.ageGroup1 }}>Below 18</th>
                        <th className="text-center p-3 font-semibold" style={{ color: colors.ageGroup2 }}>18-34</th>
                        <th className="text-center p-3 font-semibold" style={{ color: colors.ageGroup3 }}>35+</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(healthCenterData).map(([center, data], index) => (
                        <tr 
                          key={index} 
                          className="border-b cursor-pointer transition-all duration-300 hover:shadow-md animate-slideIn"
                          style={{ 
                            animationDelay: `${index * 50}ms`,
                            borderColor: colors.lightBg
                          }}
                          onClick={() => {
                            setSelectedHealthCenter(center);
                            setViewMode('by-center');
                          }}
                        >
                          <td className="p-3 font-medium" style={{ color: colors.darkText }}>{center}</td>
                          <td className="text-center p-3 font-bold" style={{ color: colors.primary }}>
                            <AnimatedNumber value={data.total} />
                          </td>
                          <td className="text-center p-3">{data.ageDistribution["Below 18"]}</td>
                          <td className="text-center p-3">{data.ageDistribution["18-34"]}</td>
                          <td className="text-center p-3">{data.ageDistribution["35 and above"]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Top Risk Factors Across All Centers */}
            <Card className="border-0 shadow-lg animate-fadeIn">
              <CardHeader style={{ backgroundColor: colors.lightBg }}>
                <CardTitle style={{ color: colors.darkText }}>
                  Most Common Risk Factors - All Centers Combined (2023)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(() => {
                    const topFactors = Object.entries(grandTotals.totalByRiskFactor)
                      .sort((a, b) => b[1].total - a[1].total)
                      .slice(0, 10);

                    return topFactors.map(([factor, data], index) => (
                      <div 
                        key={index} 
                        className="bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-102 cursor-pointer animate-slideIn border-2"
                        style={{ 
                          animationDelay: `${index * 100}ms`,
                          borderColor: colors.lightBg
                        }}
                      >
                        <h4 className="font-bold mb-4 text-lg" style={{ color: colors.darkText }}>{factor}</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium" style={{ color: colors.ageGroup1 }}>Below 18:</span>
                            <span className="font-bold text-lg">
                              <AnimatedNumber value={data["Below 18"]} />
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium" style={{ color: colors.ageGroup2 }}>18-34:</span>
                            <span className="font-bold text-lg">
                              <AnimatedNumber value={data["18-34"]} />
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium" style={{ color: colors.ageGroup3 }}>35+:</span>
                            <span className="font-bold text-lg">
                              <AnimatedNumber value={data["35 and above"]} />
                            </span>
                          </div>
                          <div className="border-t pt-3 mt-3" style={{ borderColor: colors.lightBg }}>
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-bold" style={{ color: colors.darkText }}>Total:</span>
                              <span className="text-2xl font-bold" style={{ color: colors.primary }}>
                                <AnimatedNumber value={data.total} />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Risk Factors Comparison View */}
        {viewMode === 'risk-comparison' && (
          <div className="space-y-6">
            {/* Risk Factors Comparison Chart */}
            <Card className="border-0 shadow-lg animate-fadeIn">
              <CardHeader style={{ backgroundColor: colors.primary }} className="text-white">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Activity className="w-6 h-6" />
                  Risk Factors Prevalence Comparison - All Centers (2023)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-4">
                  <select
                    value={filterAge}
                    onChange={(e) => setFilterAge(e.target.value)}
                    className="px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all duration-300"
                    style={{ 
                      borderColor: colors.mediumBg,
                      focusBorderColor: colors.primary,
                      focusRingColor: colors.primary + '30'
                    }}
                  >
                    <option value="all">All Age Groups</option>
                    <option value="Below 18">Below 18 years</option>
                    <option value="18-34">18-34 years</option>
                    <option value="35 and above">35+ years</option>
                  </select>
                </div>

                <ResponsiveContainer width="100%" height={600}>
                  <BarChart
                    data={(() => {
                      const data = Object.entries(grandTotals.totalByRiskFactor)
                        .map(([factor, values]) => ({
                          factor: factor.length > 20 ? factor.substring(0, 20) + '...' : factor,
                          fullFactor: factor,
                          value: filterAge === 'all' ? values.total : values[filterAge],
                          "Below 18": values["Below 18"],
                          "18-34": values["18-34"],
                          "35+": values["35 and above"]
                        }))
                        .sort((a, b) => b.value - a.value);
                      return data;
                    })()}
                    layout="horizontal"
                    margin={{ top: 5, right: 30, left: 200, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis type="number" />
                    <YAxis dataKey="factor" type="category" width={180} />
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white p-4 rounded-lg shadow-xl border border-gray-200">
                              <p className="font-bold text-gray-800 text-sm mb-2">{data.fullFactor}</p>
                              {filterAge === 'all' ? (
                                <>
                                  <p className="text-xs" style={{ color: colors.ageGroup1 }}>Below 18: {data["Below 18"]}</p>
                                  <p className="text-xs" style={{ color: colors.ageGroup2 }}>18-34: {data["18-34"]}</p>
                                  <p className="text-xs" style={{ color: colors.ageGroup3 }}>35+: {data["35+"]}</p>
                                  <p className="text-sm font-bold mt-1" style={{ color: colors.primary }}>Total: {data.value}</p>
                                </>
                              ) : (
                                <p className="text-sm font-bold" style={{ color: colors.primary }}>{filterAge}: {data.value}</p>
                              )}
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar 
                      dataKey="value" 
                      fill={filterAge === 'Below 18' ? colors.ageGroup1 : 
                            filterAge === '18-34' ? colors.ageGroup2 : 
                            filterAge === '35 and above' ? colors.ageGroup3 : colors.primary}
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Center-wise Risk Factor Heatmap */}
            <Card className="border-0 shadow-lg animate-fadeIn">
              <CardHeader style={{ backgroundColor: colors.lightBg }}>
                <CardTitle style={{ color: colors.darkText }}>
                  Risk Factor Distribution Heatmap by Center (2023)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b-2" style={{ borderColor: colors.mediumBg }}>
                        <th className="text-left p-2 font-semibold" style={{ color: colors.darkText }}>Risk Factor</th>
                        {healthCenters.map(center => (
                          <th key={center} className="text-center p-2 font-semibold" style={{ color: colors.darkText }}>
                            {center}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {riskFactorsList.slice(0, 15).map((factor, index) => (
                        <tr key={index} className="border-b" style={{ borderColor: colors.lightBg }}>
                          <td className="p-2 font-medium" style={{ color: colors.darkText }}>
                            {factor.length > 25 ? factor.substring(0, 25) + '...' : factor}
                          </td>
                          {healthCenters.map(center => {
                            const data = healthCenterData[center].riskFactors[factor];
                            const total = data["Below 18"] + data["18-34"] + data["35 and above"];
                            const percentage = (total / healthCenterData[center].total * 100).toFixed(1);
                            const intensity = Math.min(percentage / 40, 1);
                            
                            return (
                              <td 
                                key={center} 
                                className="text-center p-2 text-white font-semibold"
                                style={{
                                  backgroundColor: `rgba(${intensity > 0.5 ? '218, 41, 28' : '0, 114, 206'}, ${intensity})`,
                                  color: intensity > 0.3 ? 'white' : colors.darkText
                                }}
                              >
                                {total > 0 ? `${total} (${percentage}%)` : '-'}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Footer with Official Stamp */}
        <Card className="border-0 shadow-lg mt-8 animate-fadeIn">
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
    </div>
  );
};

export default VTEDashboard;