import { useState, useEffect, memo, useMemo, useCallback } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, AreaChart } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import DarkModeToggle from './components/DarkModeToggle';
import NotificationToast from './components/NotificationToast';
import { useTheme } from './hooks/useTheme';
import { useResponsive } from './hooks/useResponsive';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';
import { TrendingUp, Users, Activity, Building2, Calendar, Baby, UserCheck, UserPlus, ChevronLeft, ChevronRight, BarChart2, PieChart as PieChartIcon, Shield, FileText, Award, Smartphone, Monitor, Tablet } from 'lucide-react';

// Types
type AgeGroup = 'Below 18' | '18-34' | '35 and above';
type HealthCenterName = 'MULTAQA' | 'TAREEF' | 'FALAJ' | 'UWAYNAT' | 'WADI AHIN' | 'WADI HIBI';

interface RiskFactorData {
  'Below 18': number;
  '18-34': number;
  '35 and above': number;
}

interface HealthCenterData {
  total: number;
  ageDistribution: RiskFactorData;
  riskFactors: Record<string, RiskFactorData>;
}

// AnimatedNumber component
const AnimatedNumber = memo(({ value, duration = 1000, className = "" }: { 
  value: number; 
  duration?: number; 
  className?: string; 
}) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * value));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);
  
  return <span className={className}>{count}</span>;
});

// Custom Tooltip
const CustomTooltip = memo(({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="modern-card p-md animate-fade-in-up shadow-lg"
      >
        <p className="font-bold text-base mb-2 border-b pb-2" style={{ color: 'var(--text-primary)' }}>
          {label}
        </p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm flex items-center gap-2 py-1" style={{ color: entry.color }}>
            <span 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            {entry.name}: <span className="font-bold ml-auto">{entry.value}</span> patients
          </p>
        ))}
      </motion.div>
    );
  }
  return null;
});

const VTEDashboard = () => {
  // Hooks
  const { isDark, toggleTheme } = useTheme();
  const { isMobile, isTablet, breakpoint } = useResponsive();

  // State
  const [selectedHealthCenter, setSelectedHealthCenter] = useState<HealthCenterName>('MULTAQA');
  const [currentRiskFactorIndex, setCurrentRiskFactorIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'by-center' | 'overview'>('by-center');
  const [isAnimating, setIsAnimating] = useState(false);
  const [chartView, setChartView] = useState<'bar' | 'pie' | 'area'>('bar');
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
    isVisible: boolean;
  }>({ type: 'info', message: '', isVisible: false });

  // Intersection Observer
  const { elementRef: headerRef, isVisible: headerVisible } = useIntersectionObserver({ threshold: 0.1 });
  const { elementRef: statsRef, isVisible: statsVisible } = useIntersectionObserver({ threshold: 0.2 });

  // Constants
  const healthCenters = useMemo<HealthCenterName[]>(() => [
    'MULTAQA', 'TAREEF', 'FALAJ', 'UWAYNAT', 'WADI AHIN', 'WADI HIBI'
  ], []);

  const riskFactorsList = useMemo(() => [
    "Previous VTE Single Event", "Previous VTE by Major Surgery", "Thrombophilia",
    "Medical Comorbidities", "Family History of VTE", "Age > 35",
    "Obesity BMI 30-39", "Obesity BMI ≥40", "Parity ≥3", "Smoking",
    "Paraplegia", "Gross Varicose veins", "Multiple Pregnancy", "Pre-eclampsia",
    "IVF", "Emergency CS", "Elective LSCS", "Prolonged labour >24h",
    "PPH >1L", "Preterm <37weeks", "Still Birth", "Surgical procedure",
    "Hyperemesis/dehydration", "Ovarian hyperstimulation", "Immobility",
    "Current infection", "Long travel >8 hours"
  ], []);

  // Health Center Data
  const healthCenterData = useMemo<Record<HealthCenterName, HealthCenterData>>(() => ({
    "MULTAQA": {
      total: 631,
      ageDistribution: { "Below 18": 1, "18-34": 434, "35 and above": 196 },
      riskFactors: {
        "Previous VTE Single Event": { "Below 18": 0, "18-34": 6, "35 and above": 0 },
        "Age > 35": { "Below 18": 0, "18-34": 0, "35 and above": 166 },
        "Obesity BMI 30-39": { "Below 18": 0, "18-34": 108, "35 and above": 54 },
        "Smoking": { "Below 18": 0, "18-34": 140, "35 and above": 65 },
        "Medical Comorbidities": { "Below 18": 0, "18-34": 44, "35 and above": 48 },
        "Family History of VTE": { "Below 18": 0, "18-34": 21, "35 and above": 1 },
        "Obesity BMI ≥40": { "Below 18": 0, "18-34": 88, "35 and above": 43 },
        "Parity ≥3": { "Below 18": 0, "18-34": 154, "35 and above": 88 },
        "Multiple Pregnancy": { "Below 18": 0, "18-34": 4, "35 and above": 0 },
        "Pre-eclampsia": { "Below 18": 0, "18-34": 15, "35 and above": 2 },
        "IVF": { "Below 18": 0, "18-34": 8, "35 and above": 1 },
        "Emergency CS": { "Below 18": 0, "18-34": 51, "35 and above": 22 },
        "Elective LSCS": { "Below 18": 0, "18-34": 48, "35 and above": 42 },
        "PPH >1L": { "Below 18": 0, "18-34": 5, "35 and above": 3 },
        "Still Birth": { "Below 18": 0, "18-34": 10, "35 and above": 13 },
        "Hyperemesis/dehydration": { "Below 18": 0, "18-34": 5, "35 and above": 2 },
        "Preterm <37weeks": { "Below 18": 0, "18-34": 0, "35 and above": 1 },
        "Previous VTE by Major Surgery": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Thrombophilia": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Paraplegia": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Gross Varicose veins": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Prolonged labour >24h": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Surgical procedure": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Ovarian hyperstimulation": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Immobility": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Current infection": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Long travel >8 hours": { "Below 18": 0, "18-34": 0, "35 and above": 0 }
      }
    },
    "TAREEF": {
      total: 449,
      ageDistribution: { "Below 18": 3, "18-34": 306, "35 and above": 139 },
      riskFactors: {
        "Previous VTE Single Event": { "Below 18": 0, "18-34": 12, "35 and above": 5 },
        "Age > 35": { "Below 18": 0, "18-34": 0, "35 and above": 114 },
        "Obesity BMI 30-39": { "Below 18": 0, "18-34": 82, "35 and above": 28 },
        "Smoking": { "Below 18": 0, "18-34": 117, "35 and above": 38 },
        "Medical Comorbidities": { "Below 18": 0, "18-34": 33, "35 and above": 21 },
        "Family History of VTE": { "Below 18": 0, "18-34": 5, "35 and above": 7 },
        "Obesity BMI ≥40": { "Below 18": 0, "18-34": 76, "35 and above": 35 },
        "Parity ≥3": { "Below 18": 0, "18-34": 101, "35 and above": 69 },
        "Multiple Pregnancy": { "Below 18": 0, "18-34": 7, "35 and above": 5 },
        "Pre-eclampsia": { "Below 18": 0, "18-34": 23, "35 and above": 12 },
        "IVF": { "Below 18": 0, "18-34": 5, "35 and above": 2 },
        "Emergency CS": { "Below 18": 0, "18-34": 21, "35 and above": 11 },
        "Elective LSCS": { "Below 18": 0, "18-34": 37, "35 and above": 31 },
        "PPH >1L": { "Below 18": 0, "18-34": 8, "35 and above": 12 },
        "Still Birth": { "Below 18": 0, "18-34": 6, "35 and above": 1 },
        "Hyperemesis/dehydration": { "Below 18": 0, "18-34": 4, "35 and above": 0 },
        "Preterm <37weeks": { "Below 18": 0, "18-34": 1, "35 and above": 5 },
        "Previous VTE by Major Surgery": { "Below 18": 0, "18-34": 1, "35 and above": 0 },
        "Thrombophilia": { "Below 18": 0, "18-34": 0, "35 and above": 1 },
        "Paraplegia": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Gross Varicose veins": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Prolonged labour >24h": { "Below 18": 0, "18-34": 1, "35 and above": 1 },
        "Surgical procedure": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Ovarian hyperstimulation": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Immobility": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Current infection": { "Below 18": 0, "18-34": 0, "35 and above": 1 },
        "Long travel >8 hours": { "Below 18": 0, "18-34": 0, "35 and above": 0 }
      }
    },
    "FALAJ": {
      total: 329,
      ageDistribution: { "Below 18": 2, "18-34": 219, "35 and above": 107 },
      riskFactors: {
        "Previous VTE Single Event": { "Below 18": 0, "18-34": 5, "35 and above": 0 },
        "Age > 35": { "Below 18": 0, "18-34": 0, "35 and above": 94 },
        "Obesity BMI 30-39": { "Below 18": 0, "18-34": 57, "35 and above": 27 },
        "Smoking": { "Below 18": 0, "18-34": 66, "35 and above": 31 },
        "Medical Comorbidities": { "Below 18": 0, "18-34": 1, "35 and above": 13 },
        "Family History of VTE": { "Below 18": 0, "18-34": 14, "35 and above": 0 },
        "Obesity BMI ≥40": { "Below 18": 0, "18-34": 14, "35 and above": 15 },
        "Parity ≥3": { "Below 18": 0, "18-34": 72, "35 and above": 49 },
        "Multiple Pregnancy": { "Below 18": 0, "18-34": 5, "35 and above": 1 },
        "Pre-eclampsia": { "Below 18": 0, "18-34": 5, "35 and above": 0 },
        "IVF": { "Below 18": 0, "18-34": 7, "35 and above": 0 },
        "Emergency CS": { "Below 18": 0, "18-34": 5, "35 and above": 1 },
        "Elective LSCS": { "Below 18": 0, "18-34": 16, "35 and above": 6 },
        "PPH >1L": { "Below 18": 0, "18-34": 4, "35 and above": 2 },
        "Still Birth": { "Below 18": 0, "18-34": 0, "35 and above": 5 },
        "Hyperemesis/dehydration": { "Below 18": 0, "18-34": 2, "35 and above": 0 },
        "Preterm <37weeks": { "Below 18": 0, "18-34": 0, "35 and above": 1 },
        "Previous VTE by Major Surgery": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Thrombophilia": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Paraplegia": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Gross Varicose veins": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Prolonged labour >24h": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Surgical procedure": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Ovarian hyperstimulation": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Immobility": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Current infection": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Long travel >8 hours": { "Below 18": 0, "18-34": 0, "35 and above": 0 }
      }
    },
    "UWAYNAT": {
      total: 573,
      ageDistribution: { "Below 18": 4, "18-34": 388, "35 and above": 180 },
      riskFactors: {
        "Previous VTE Single Event": { "Below 18": 0, "18-34": 12, "35 and above": 5 },
        "Age > 35": { "Below 18": 0, "18-34": 0, "35 and above": 161 },
        "Obesity BMI 30-39": { "Below 18": 2, "18-34": 103, "35 and above": 56 },
        "Smoking": { "Below 18": 1, "18-34": 142, "35 and above": 76 },
        "Medical Comorbidities": { "Below 18": 0, "18-34": 16, "35 and above": 35 },
        "Family History of VTE": { "Below 18": 0, "18-34": 8, "35 and above": 9 },
        "Obesity BMI ≥40": { "Below 18": 2, "18-34": 99, "35 and above": 34 },
        "Parity ≥3": { "Below 18": 0, "18-34": 182, "35 and above": 88 },
        "Multiple Pregnancy": { "Below 18": 0, "18-34": 8, "35 and above": 4 },
        "Pre-eclampsia": { "Below 18": 0, "18-34": 7, "35 and above": 7 },
        "IVF": { "Below 18": 0, "18-34": 2, "35 and above": 1 },
        "Emergency CS": { "Below 18": 0, "18-34": 21, "35 and above": 17 },
        "Elective LSCS": { "Below 18": 0, "18-34": 31, "35 and above": 31 },
        "PPH >1L": { "Below 18": 0, "18-34": 2, "35 and above": 3 },
        "Still Birth": { "Below 18": 0, "18-34": 9, "35 and above": 4 },
        "Hyperemesis/dehydration": { "Below 18": 0, "18-34": 2, "35 and above": 5 },
        "Preterm <37weeks": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Previous VTE by Major Surgery": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Thrombophilia": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Paraplegia": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Gross Varicose veins": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Prolonged labour >24h": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Surgical procedure": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Ovarian hyperstimulation": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Immobility": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Current infection": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Long travel >8 hours": { "Below 18": 0, "18-34": 0, "35 and above": 0 }
      }
    },
    "WADI AHIN": {
      total: 55,
      ageDistribution: { "Below 18": 0, "18-34": 42, "35 and above": 13 },
      riskFactors: {
        "Previous VTE Single Event": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Age > 35": { "Below 18": 0, "18-34": 0, "35 and above": 11 },
        "Obesity BMI 30-39": { "Below 18": 0, "18-34": 11, "35 and above": 3 },
        "Smoking": { "Below 18": 0, "18-34": 11, "35 and above": 2 },
        "Medical Comorbidities": { "Below 18": 0, "18-34": 0, "35 and above": 2 },
        "Family History of VTE": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Obesity BMI ≥40": { "Below 18": 0, "18-34": 9, "35 and above": 3 },
        "Parity ≥3": { "Below 18": 0, "18-34": 20, "35 and above": 8 },
        "Multiple Pregnancy": { "Below 18": 0, "18-34": 1, "35 and above": 1 },
        "Pre-eclampsia": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "IVF": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Emergency CS": { "Below 18": 0, "18-34": 1, "35 and above": 1 },
        "Elective LSCS": { "Below 18": 0, "18-34": 5, "35 and above": 1 },
        "PPH >1L": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Still Birth": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Hyperemesis/dehydration": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Preterm <37weeks": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Previous VTE by Major Surgery": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Thrombophilia": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Paraplegia": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Gross Varicose veins": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Prolonged labour >24h": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Surgical procedure": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Ovarian hyperstimulation": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Immobility": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Current infection": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Long travel >8 hours": { "Below 18": 0, "18-34": 0, "35 and above": 0 }
      }
    },
    "WADI HIBI": {
      total: 108,
      ageDistribution: { "Below 18": 0, "18-34": 76, "35 and above": 32 },
      riskFactors: {
        "Previous VTE Single Event": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Age > 35": { "Below 18": 0, "18-34": 0, "35 and above": 27 },
        "Obesity BMI 30-39": { "Below 18": 0, "18-34": 6, "35 and above": 2 },
        "Smoking": { "Below 18": 0, "18-34": 3, "35 and above": 2 },
        "Medical Comorbidities": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Family History of VTE": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Obesity BMI ≥40": { "Below 18": 0, "18-34": 9, "35 and above": 0 },
        "Parity ≥3": { "Below 18": 0, "18-34": 26, "35 and above": 13 },
        "Multiple Pregnancy": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Pre-eclampsia": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "IVF": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Emergency CS": { "Below 18": 0, "18-34": 3, "35 and above": 0 },
        "Elective LSCS": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "PPH >1L": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Still Birth": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Hyperemesis/dehydration": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Preterm <37weeks": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Previous VTE by Major Surgery": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Thrombophilia": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Paraplegia": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Gross Varicose veins": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Prolonged labour >24h": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Surgical procedure": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Ovarian hyperstimulation": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Immobility": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Current infection": { "Below 18": 0, "18-34": 0, "35 and above": 0 },
        "Long travel >8 hours": { "Below 18": 0, "18-34": 0, "35 and above": 0 }
      }
    }
  }), []);

  // Computed values
  const currentHealthCenterData = useMemo(() => 
    healthCenterData[selectedHealthCenter], 
    [selectedHealthCenter, healthCenterData]
  );
  
  const currentRiskFactor = useMemo(() => 
    riskFactorsList[currentRiskFactorIndex], 
    [currentRiskFactorIndex, riskFactorsList]
  );
  
  const currentRiskFactorData = useMemo(() => 
    currentHealthCenterData?.riskFactors[currentRiskFactor] || { "Below 18": 0, "18-34": 0, "35 and above": 0 }, 
    [currentHealthCenterData, currentRiskFactor]
  );

  // Grand totals
  const grandTotals = useMemo(() => {
    let totalPatients = 0;
    let totalByAge: RiskFactorData = { "Below 18": 0, "18-34": 0, "35 and above": 0 };
    
    Object.values(healthCenterData).forEach(center => {
      totalPatients += center.total;
      totalByAge["Below 18"] += center.ageDistribution["Below 18"];
      totalByAge["18-34"] += center.ageDistribution["18-34"];
      totalByAge["35 and above"] += center.ageDistribution["35 and above"];
    });
    
    return { totalPatients, totalByAge };
  }, [healthCenterData]);

  // Handlers
  const handlePreviousRiskFactor = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentRiskFactorIndex(prev => 
        prev === 0 ? riskFactorsList.length - 1 : prev - 1
      );
      setIsAnimating(false);
    }, 300);
  }, [riskFactorsList.length]);

  const handleNextRiskFactor = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentRiskFactorIndex(prev => 
        prev === riskFactorsList.length - 1 ? 0 : prev + 1
      );
      setIsAnimating(false);
    }, 300);
  }, [riskFactorsList.length]);

  const showNotification = useCallback((type: 'success' | 'error' | 'info' | 'warning', message: string) => {
    setNotification({ type, message, isVisible: true });
  }, []);

  const hideNotification = useCallback(() => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  }, []);

  // Swipe handlers
  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNextRiskFactor,
    onSwipedRight: handlePreviousRiskFactor,
    preventScrollOnSwipe: true,
    trackMouse: true
  });

  // Device icon
  const DeviceIcon = isMobile ? Smartphone : isTablet ? Tablet : Monitor;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Effect for responsive feedback
  useEffect(() => {
    if (isMobile) {
      showNotification('info', `Mobile view optimized for ${breakpoint.toUpperCase()} screens`);
    }
  }, [isMobile, breakpoint, showNotification]);

  return (
    <motion.div 
      className="vte-dashboard min-h-screen p-md md:p-lg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Dark Mode Toggle */}
      <DarkModeToggle isDark={isDark} onToggle={toggleTheme} />

      {/* Notification Toast */}
      <NotificationToast
        type={notification.type}
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />

      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          ref={headerRef}
          variants={itemVariants}
          className={`mb-lg transition-all duration-500 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {/* Data Year Notice */}
          <motion.div 
            className="modern-card bg-info/10 border-info/20 p-md mb-md"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-md">
              <Calendar className="w-5 h-5 text-info" />
              <DeviceIcon className="w-4 h-4 text-info" />
              <p className="text-sm font-semibold text-info">
                Viewing on {isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'} • 
                Data exclusively from 2023 • Optimized for {breakpoint.toUpperCase()} screens
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="modern-card relative overflow-hidden"
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Ministry Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-lg gap-md">
              <div className="flex items-center gap-md">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Shield className="w-12 h-12 text-primary" />
                </motion.div>
                <div>
                  <h2 className="text-lg font-semibold text-primary">Ministry of Health</h2>
                  <p className="text-sm text-secondary">Sultanate of Oman</p>
                </div>
              </div>
              <div className="text-left md:text-right">
                <p className="text-sm font-bold text-primary">2023 DATA ONLY</p>
                <p className="text-sm text-secondary">Annual Report - Year 2023</p>
                <p className="text-xs text-tertiary">Suhar Wilayat</p>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-md text-primary">
              VTE Risk Assessment Analysis - Year 2023
            </h1>
            <p className="text-lg text-secondary mb-md">
              Comprehensive Age Distribution and Risk Factor Analysis by Health Center
            </p>

            {/* Summary Stats */}
            <motion.div 
              ref={statsRef}
              className={`responsive-grid grid-cols-1 md:grid-cols-3 gap-md pt-lg border-t border-tertiary/20 transition-all duration-700 ${
                statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              {[
                { label: 'Total Patients (2023)', value: grandTotals.totalPatients, icon: Users },
                { label: 'Health Centers', value: 6, icon: Building2 },
                { label: 'Risk Factors Assessed', value: 27, icon: Activity }
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  className="metric-card modern-card p-md text-center hover-lift"
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-sm text-primary" />
                  <p className="text-sm text-secondary">{stat.label}</p>
                  <p className="text-2xl font-bold text-primary">
                    <AnimatedNumber value={stat.value} />
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* View Mode Toggle */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-md mb-lg"
          variants={itemVariants}
        >
          {[
            { mode: 'by-center' as const, label: 'Analysis by Health Center (2023)', icon: Building2 },
            { mode: 'overview' as const, label: 'Overall Summary (2023)', icon: BarChart2 }
          ].map((item) => (
            <motion.button
              key={item.mode}
              onClick={() => setViewMode(item.mode)}
              className={`modern-button flex-1 ${
                viewMode === item.mode ? 'button-primary' : 'button-secondary'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              variants={itemVariants}
            >
              <item.icon className="w-5 h-5" />
              {isMobile ? item.label.split(' ')[0] : item.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Content Views */}
        <AnimatePresence mode="wait">
          {viewMode === 'by-center' && (
            <motion.div
              key="by-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="space-y-lg"
            >
              {/* Health Center Selector */}
              <motion.div className="modern-card" variants={itemVariants}>
                <div className="chart-header">
                  <h3 className="flex items-center gap-md text-white">
                    <Building2 className="w-6 h-6" />
                    Select Health Center - 2023 Data Analysis
                  </h3>
                </div>
                <div className="chart-content">
                  <div className={`responsive-grid ${
                    isMobile ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-3'
                  } gap-md`}>
                    {healthCenters.map((center) => (
                      <motion.button
                        key={center}
                        onClick={() => {
                          setSelectedHealthCenter(center);
                          setCurrentRiskFactorIndex(0);
                          showNotification('success', `Switched to ${center} analysis`);
                        }}
                        className={`modern-card p-md transition-all hover-lift ${
                          selectedHealthCenter === center
                            ? 'ring-4 ring-primary/50 bg-primary text-white'
                            : 'hover:shadow-lg'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        variants={itemVariants}
                      >
                        <Building2 className={`w-6 h-6 mb-sm ${
                          selectedHealthCenter === center ? 'text-white' : 'text-primary'
                        }`} />
                        <div className="font-bold text-lg">{center}</div>
                        <div className="text-sm mt-sm flex items-center gap-sm justify-center">
                          <Users className="w-4 h-4" />
                          <AnimatedNumber 
                            value={healthCenterData[center]?.total || 0} 
                            className="font-semibold"
                          />
                          <span> patients</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Age Distribution */}
              <motion.div className="modern-card chart-wrapper" variants={itemVariants}>
                <div className="chart-header">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-md">
                    <h3 className="flex items-center gap-md text-white">
                      {selectedHealthCenter} - Age Distribution Analysis (2023 Data)
                    </h3>
                    <div className="flex gap-sm">
                      {['bar', 'pie', 'area'].map((type) => (
                        <motion.button
                          key={type}
                          onClick={() => setChartView(type as 'bar' | 'pie' | 'area')}
                          className={`modern-button px-md py-sm ${
                            chartView === type 
                              ? 'bg-white/20 text-white' 
                              : 'bg-transparent text-white/70 hover:bg-white/10'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {type === 'bar' && <BarChart2 className="w-4 h-4" />}
                          {type === 'pie' && <PieChartIcon className="w-4 h-4" />}
                          {type === 'area' && <Activity className="w-4 h-4" />}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  <p className="text-white/90">
                    Total patients: <AnimatedNumber value={currentHealthCenterData.total} className="font-bold text-xl" />
                  </p>
                </div>

                <div className="chart-content">
                  <div className={`responsive-grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} gap-lg`}>
                    {/* Age Distribution Cards */}
                    <div className="space-y-md">
                      {Object.entries(currentHealthCenterData.ageDistribution).map(([age, count], index) => {
                        const percentage = ((count / currentHealthCenterData.total) * 100).toFixed(1);
                        const ageColors = {
                          'Below 18': 'var(--age-group-1)',
                          '18-34': 'var(--age-group-2)',
                          '35 and above': 'var(--age-group-3)'
                        };
                        const color = ageColors[age as keyof typeof ageColors];
                        
                        return (
                          <motion.div 
                            key={age}
                            className="modern-card p-md hover-lift interactive-element"
                            variants={itemVariants}
                            custom={index}
                            whileHover={{ scale: 1.02 }}
                            style={{ borderLeft: `4px solid ${color}` }}
                          >
                            <div className="flex justify-between items-center mb-sm">
                              <span className="font-semibold flex items-center gap-sm age-badge" style={{ color }}>
                                {age === 'Below 18' && <Baby className="w-5 h-5" />}
                                {age === '18-34' && <UserCheck className="w-5 h-5" />}
                                {age === '35 and above' && <UserPlus className="w-5 h-5" />}
                                {age} years
                              </span>
                              <span className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
                                <AnimatedNumber value={count} />
                              </span>
                            </div>
                            
                            <div className="progress-bar mb-sm">
                              <motion.div 
                                className="progress-fill"
                                style={{ backgroundColor: color }}
                                initial={{ width: 0 }}
                                animate={{ width: `${percentage}%` }}
                                transition={{ duration: 1, delay: index * 0.2 }}
                              />
                            </div>
                            
                            <div className="flex justify-between items-center text-sm">
                              <span style={{ color: 'var(--text-secondary)' }}>Percentage</span>
                              <span className="font-semibold" style={{ color }}>{percentage}%</span>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Chart View */}
                    <motion.div 
                      className="chart-container"
                      key={chartView}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <AnimatePresence mode="wait">
                        {chartView === 'pie' && (
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={Object.entries(currentHealthCenterData.ageDistribution).map(([age, value]) => ({
                                  name: age,
                                  value,
                                  color: age === 'Below 18' ? 'var(--age-group-1)' : 
                                         age === '18-34' ? 'var(--age-group-2)' : 'var(--age-group-3)'
                                }))}
                                cx="50%"
                                cy="50%"
                                innerRadius={isMobile ? 40 : 60}
                                outerRadius={isMobile ? 70 : 90}
                                fill="#8884d8"
                                dataKey="value"
                                animationBegin={0}
                                animationDuration={1000}
                                label={({ value }) => value}
                              >
                                {Object.entries(currentHealthCenterData.ageDistribution).map(([age], index) => (
                                  <Cell key={`cell-${index}`} fill={
                                    age === 'Below 18' ? 'var(--age-group-1)' : 
                                    age === '18-34' ? 'var(--age-group-2)' : 'var(--age-group-3)'
                                  } />
                                ))}
                              </Pie>
                              <Tooltip content={<CustomTooltip />} />
                              <Legend />
                            </PieChart>
                          </ResponsiveContainer>
                        )}
                        
                        {chartView === 'bar' && (
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={Object.entries(currentHealthCenterData.ageDistribution).map(([age, value]) => ({
                              age: age.replace(' and above', '+'),
                              value
                            }))}>
                              <CartesianGrid strokeDasharray="3 3" stroke="var(--bg-tertiary)" />
                              <XAxis dataKey="age" tick={{ fontSize: isMobile ? 10 : 12 }} />
                              <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} />
                              <Tooltip content={<CustomTooltip />} />
                              <Bar dataKey="value" radius={[8, 8, 0, 0]} animationDuration={1000}>
                                <Cell fill="var(--age-group-1)" />
                                <Cell fill="var(--age-group-2)" />
                                <Cell fill="var(--age-group-3)" />
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        )}
                        
                        {chartView === 'area' && (
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={Object.entries(currentHealthCenterData.ageDistribution).map(([age, value]) => ({
                              age: age.replace(' and above', '+'),
                              value
                            }))}>
                              <defs>
                                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="var(--primary-color)" stopOpacity={0.8}/>
                                  <stop offset="95%" stopColor="var(--primary-color)" stopOpacity={0.1}/>
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" stroke="var(--bg-tertiary)" />
                              <XAxis dataKey="age" tick={{ fontSize: isMobile ? 10 : 12 }} />
                              <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} />
                              <Tooltip content={<CustomTooltip />} />
                              <Area 
                                type="monotone" 
                                dataKey="value" 
                                stroke="var(--primary-color)" 
                                fillOpacity={1} 
                                fill="url(#colorGradient)"
                                animationDuration={1000}
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Risk Factor Navigator */}
              <motion.div 
                className="modern-card chart-wrapper relative overflow-hidden"
                variants={itemVariants}
                {...swipeHandlers}
              >
                <div className="chart-header">
                  <h3 className="flex items-center gap-md text-white">
                    <Activity className="w-6 h-6" />
                    Risk Factor Analysis - Interactive Navigator
                    {isMobile && <span className="text-sm opacity-75">(Swipe to navigate)</span>}
                  </h3>
                  <p className="text-white/90">
                    Navigate through all 27 risk factors • {selectedHealthCenter} (2023)
                  </p>
                </div>

                <div className="chart-content">
                  {/* Navigation Controls */}
                  <div className="flex items-center justify-between mb-lg">
                    <motion.button
                      onClick={handlePreviousRiskFactor}
                      className="modern-button button-secondary p-md rounded-xl touch-target"
                      whileHover={{ scale: 1.1, rotate: -3 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </motion.button>
                    
                    <motion.div 
                      className={`text-center flex-1 transition-all duration-300 ${
                        isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
                      }`}
                      key={currentRiskFactorIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl md:text-2xl font-bold mb-sm text-primary">
                        {currentRiskFactor}
                      </h3>
                      <p className="text-sm text-secondary">
                        Risk Factor {currentRiskFactorIndex + 1} of {riskFactorsList.length}
                      </p>
                      
                      {/* Progress Indicators */}
                      <div className="flex justify-center mt-sm gap-1 flex-wrap">
                        {riskFactorsList.map((_, index) => (
                          <motion.button
                            key={index}
                            onClick={() => setCurrentRiskFactorIndex(index)}
                            className={`transition-all duration-300 rounded-full ${
                              index === currentRiskFactorIndex 
                                ? 'w-8 h-2 bg-primary' 
                                : 'w-2 h-2 bg-tertiary hover:bg-secondary'
                            }`}
                            whileHover={{ scale: 1.25 }}
                            whileTap={{ scale: 0.9 }}
                          />
                        ))}
                      </div>
                    </motion.div>
                    
                    <motion.button
                      onClick={handleNextRiskFactor}
                      className="modern-button button-secondary p-md rounded-xl touch-target"
                      whileHover={{ scale: 1.1, rotate: 3 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ChevronRight className="w-6 h-6" />
                    </motion.button>
                  </div>

                  {/* Risk Factor Data */}
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={currentRiskFactorIndex}
                      initial={{ opacity: 0, x: isAnimating ? 50 : 0 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-lg"
                    >
                      {/* Summary Cards */}
                      <div className={`responsive-grid ${
                        isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'
                      } gap-md`}>
                        {[
                          { age: "Below 18" as AgeGroup, color: 'var(--age-group-1)', icon: Baby },
                          { age: "18-34" as AgeGroup, color: 'var(--age-group-2)', icon: UserCheck },
                          { age: "35 and above" as AgeGroup, color: 'var(--age-group-3)', icon: UserPlus }
                        ].map((item, index) => (
                          <motion.div
                            key={item.age}
                            className="modern-card p-lg hover-lift interactive-element"
                            variants={itemVariants}
                            custom={index}
                            whileHover={{ scale: 1.03, rotateY: 5 }}
                            style={{ borderTop: `4px solid ${item.color}` }}
                          >
                            <div className="flex items-center justify-between mb-md">
                              <item.icon className="w-6 h-6" style={{ color: item.color }} />
                              <span className="text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>
                                <AnimatedNumber 
                                  value={currentRiskFactorData[item.age]} 
                                  duration={800}
                                />
                              </span>
                            </div>
                            <p className="text-sm font-medium mb-xs" style={{ color: item.color }}>
                              {item.age} years
                            </p>
                            <p className="text-xs text-secondary mb-md">patients affected</p>
                            
                            {/* Percentage Display */}
                            <div>
                              <div className="flex justify-between text-xs mb-xs">
                                <span className="text-secondary">Of age group</span>
                                <span style={{ color: item.color }} className="font-semibold">
                                  {((currentRiskFactorData[item.age] / 
                                     currentHealthCenterData.ageDistribution[item.age] * 100) || 0).toFixed(1)}%
                                </span>
                              </div>
                              <div className="progress-bar">
                                <motion.div 
                                  className="progress-fill"
                                  style={{ backgroundColor: item.color }}
                                  initial={{ width: 0 }}
                                  animate={{ 
                                    width: `${(currentRiskFactorData[item.age] / currentHealthCenterData.ageDistribution[item.age] * 100) || 0}%`
                                  }}
                                  transition={{ duration: 1, delay: index * 0.2 }}
                                />
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Chart */}
                      <motion.div 
                        className="chart-container"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart 
                            data={[
                              { age: 'Below 18', value: currentRiskFactorData["Below 18"] },
                              { age: '18-34', value: currentRiskFactorData["18-34"] },
                              { age: '35+', value: currentRiskFactorData["35 and above"] }
                            ]}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--bg-tertiary)" />
                            <XAxis dataKey="age" tick={{ fontSize: isMobile ? 10 : 14 }} />
                            <YAxis tick={{ fontSize: isMobile ? 10 : 14 }} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="value" radius={[8, 8, 0, 0]} animationDuration={800}>
                              <Cell fill="var(--age-group-1)" />
                              <Cell fill="var(--age-group-2)" />
                              <Cell fill="var(--age-group-3)" />
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </motion.div>

                      {/* Total Summary */}
                      <motion.div 
                        className="modern-card p-lg text-center hover-lift"
                        style={{ background: `linear-gradient(135deg, var(--primary-color)15, var(--secondary-color)15)` }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <p className="text-lg font-medium mb-md text-secondary">
                          Total patients with {currentRiskFactor} at {selectedHealthCenter} (2023)
                        </p>
                        <p className="text-5xl font-bold" style={{ color: 'var(--primary-color)' }}>
                          <AnimatedNumber 
                            value={currentRiskFactorData["Below 18"] + 
                                   currentRiskFactorData["18-34"] + 
                                   currentRiskFactorData["35 and above"]}
                            duration={1000}
                          />
                        </p>
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Quick Jump Dropdown */}
                  <motion.div className="mt-lg" variants={itemVariants}>
                    <p className="text-sm mb-sm text-secondary">Quick jump to risk factor:</p>
                    <select
                      value={currentRiskFactorIndex}
                      onChange={(e) => {
                        setIsAnimating(true);
                        setTimeout(() => {
                          setCurrentRiskFactorIndex(Number(e.target.value));
                          setIsAnimating(false);
                        }, 300);
                      }}
                      className="w-full p-md border-2 rounded-lg focus:outline-none focus:ring-4 transition-all duration-300 bg-primary text-primary"
                    >
                      {riskFactorsList.map((factor, index) => (
                        <option key={index} value={index}>
                          {index + 1}. {factor}
                        </option>
                      ))}
                    </select>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {viewMode === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-lg"
            >
              {/* Grand Totals Card */}
              <motion.div className="modern-card chart-wrapper" variants={itemVariants}>
                <div className="chart-header">
                  <h3 className="flex items-center gap-md text-white">
                    <Award className="w-6 h-6" />
                    Overall Statistics - All Health Centers (2023 Data)
                  </h3>
                </div>
                <div className="chart-content">
                  <div className={`responsive-grid ${
                    isMobile ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-4'
                  } gap-md`}>
                    {[
                      { label: 'Total Patients (2023)', value: grandTotals.totalPatients, color: 'var(--primary-color)' },
                      { label: 'Below 18 years', value: grandTotals.totalByAge["Below 18"], color: 'var(--age-group-1)' },
                      { label: '18-34 years', value: grandTotals.totalByAge["18-34"], color: 'var(--age-group-2)' },
                      { label: '35+ years', value: grandTotals.totalByAge["35 and above"], color: 'var(--age-group-3)' }
                    ].map((stat) => (
                      <motion.div
                        key={stat.label}
                        className="metric-card modern-card p-lg text-center hover-lift"
                        variants={itemVariants}
                        whileHover={{ scale: 1.05, rotateY: 5 }}
                        style={{ borderTop: `4px solid ${stat.color}` }}
                      >
                        <p className="text-sm text-secondary mb-sm">{stat.label}</p>
                        <p className="text-3xl font-bold" style={{ color: stat.color }}>
                          <AnimatedNumber value={stat.value} />
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Health Centers Summary */}
              <motion.div className="modern-card chart-wrapper" variants={itemVariants}>
                <div className="chart-header">
                  <h3 className="text-white">Health Centers Summary - 2023 Data</h3>
                  <p className="text-white/90">Click any center to view detailed analysis</p>
                </div>
                <div className="chart-content">
                  <div className="table-responsive">
                    <table className="enhanced-table">
                      <thead>
                        <tr>
                          <th>Health Center</th>
                          <th className="text-center">Total</th>
                          <th className="text-center">Below 18</th>
                          <th className="text-center">18-34</th>
                          <th className="text-center">35+</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(healthCenterData).map(([center, data], index) => (
                          <motion.tr 
                            key={center}
                            className="cursor-pointer hover-lift"
                            onClick={() => {
                              setSelectedHealthCenter(center as HealthCenterName);
                              setViewMode('by-center');
                              showNotification('success', `Switched to ${center} detailed analysis`);
                            }}
                            whileHover={{ scale: 1.01, backgroundColor: 'var(--bg-secondary)' }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <td className="font-medium">{center}</td>
                            <td className="text-center font-bold text-primary">
                              <AnimatedNumber value={data.total} />
                            </td>
                            <td className="text-center">{data.ageDistribution["Below 18"]}</td>
                            <td className="text-center">{data.ageDistribution["18-34"]}</td>
                            <td className="text-center">{data.ageDistribution["35 and above"]}</td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.div className="modern-card mt-lg" variants={itemVariants}>
          <div className="p-lg">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-md">
              <div className="flex items-center gap-md">
                <FileText className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-semibold text-primary">
                    VTE Risk Assessment Report - Year 2023 Data
                  </p>
                  <p className="text-xs text-secondary">
                    Report Generated: {new Date().toLocaleDateString()} | Optimized for {breakpoint.toUpperCase()} devices
                  </p>
                </div>
              </div>
              <div className="text-left md:text-right">
                <p className="text-xs text-primary">Document ID: VTE-2023-SUHAR</p>
                <p className="text-xs text-secondary">Data Collection Period: Jan-Dec 2023</p>
                <p className="text-xs text-tertiary">Ministry of Health - Sultanate of Oman</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile Navigation */}
      {isMobile && (
        <motion.div 
          className="mobile-nav no-print"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {[
            { mode: 'by-center' as const, icon: Building2, label: 'Centers' },
            { mode: 'overview' as const, icon: BarChart2, label: 'Overview' }
          ].map(item => (
            <motion.button
              key={item.mode}
              onClick={() => setViewMode(item.mode)}
              className={`mobile-nav-item ${viewMode === item.mode ? 'active' : ''}`}
              whileTap={{ scale: 0.9 }}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Floating Action Button */}
      <motion.button
        className="fab no-print"
        onClick={() => showNotification('info', 'Enhanced responsive design active!')}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 300 }}
      >
        <TrendingUp className="w-6 h-6" />
      </motion.button>
    </motion.div>
  );
};

export default VTEDashboard;
