import { useState, useEffect } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Card from './shared/Card';
import { 
  UsersIcon, 
  ChartBarIcon, 
  AlertTriangleIcon, 
  TargetIcon, 
  CheckCircleIcon, 
  ShieldCheckIcon, 
  DocumentReportIcon, 
  CalendarIcon 
} from '../constants/icons';

// Type definitions
interface PatientRecord {
  healthCenter: string;
  age: number;
  riskFactors: string[];
  vteScore: number;
  gravida: number;
  parity: number;
  trimester: string;
}

interface HealthCenterData {
  total: number;
  ageDistribution: {
    'Below 18': number;
    '18-34': number;
    '35 and above': number;
  };
  riskFactors: {
    [key: string]: {
      'Below 18': number;
      '18-34': number;
      '35 and above': number;
    };
  };
}

// Risk factor mapping for VTE columns
const RISK_FACTOR_MAPPING: { [key: string]: string } = {
  'Risk factors for VTE 1': 'Previous VTE Single Event',
  'Risk factors for VTE 2': 'Previous VTE by Major Surgery',
  'Risk factors for VTE 3': 'Previous VTE Recurrent',
  'Risk factors for VTE 4': 'Family History of VTE',
  'Risk factors for VTE 5': 'Known Thrombophilia',
  'Risk factors for VTE 6': 'Medical Comorbidities',
  'Risk factors for VTE 7': 'Age > 35 years',
  'Risk factors for VTE 8': 'Obesity BMI 30-39',
  'Risk factors for VTE 9': 'Obesity BMI ≥40',
  'Risk factors for VTE 10': 'Parity ≥3',
  'Risk factors for VTE 11': 'Smoking',
  'Risk factors for VTE 12': 'Paraplegia',
  'Risk factors for VTE 13': 'Gross Varicose Veins',
  'Risk factors for VTE 14': 'Multiple Pregnancy',
  'Risk factors for VTE 15': 'Pre-eclampsia',
  'Risk factors for VTE 16': 'IVF/ICSI',
  'Risk factors for VTE 17': 'Emergency Caesarean Section',
  'Risk factors for VTE 18': 'Elective LSCS',
  'Risk factors for VTE 19': 'Prolonged Labour >24h',
  'Risk factors for VTE 20': 'PPH >1L',
  'Risk factors for VTE 21': 'Preterm Birth <37 weeks',
  'Risk factors for VTE 22': 'Still Birth',
  'Risk factors for VTE 23': 'Surgical Procedure',
  'Risk factors for VTE 24': 'Hyperemesis/Dehydration',
  'Risk factors for VTE 25': 'Ovarian Hyperstimulation',
  'Risk factors for VTE 26': 'Immobility',
  'Risk factors for VTE 27': 'Current Infection',
  'Risk factors for VTE 28': 'Long Travel >8 hours',
  'Risk factors for VTE 29': 'Other Risk Factors'
};

// CSV data loading function
const loadCSVData = async (): Promise<string> => {
  try {
    // Try to load the actual CSV file from the parent directory
    const response = await fetch('../2023 VTE Update AR - VTE 23 AR.csv');
    if (response.ok) {
      return await response.text();
    }
  } catch (error) {
    console.warn('Could not load CSV file from parent directory, trying root:', error);
  }
  
  try {
    // Try to load from root directory
    const response = await fetch('/2023 VTE Update AR - VTE 23 AR.csv');
    if (response.ok) {
      return await response.text();
    }
  } catch (error) {
    console.warn('Could not load CSV file from root, using embedded data:', error);
  }
  
  // Fallback to comprehensive embedded data from actual CSV
  return `Health institution Name,ANC number,Name of Pregnant women,Civil ID Number,Age,Gravida,Parity," Booking done at (first, second, third trimester)  ",Risk factors for VTE 1,Risk factors for VTE 2,Risk factors for VTE 3,Risk factors for VTE 4,Risk factors for VTE 5,Risk factors for VTE 6,Risk factors for VTE 7,Risk factors for VTE 8,Risk factors for VTE 9,Risk factors for VTE 10,Risk factors for VTE 11,Risk factors for VTE 12,Risk factors for VTE 13,Risk factors for VTE 14,Risk factors for VTE 15,Risk factors for VTE 16,Risk factors for VTE 17,Risk factors for VTE 18,Risk factors for VTE 19,Risk factors for VTE 20,Risk factors for VTE 21,Risk factors for VTE 22,Risk factors for VTE 23,Risk factors for VTE 24,Risk factors for VTE 25,Risk factors for VTE 26,Risk factors for VTE 27,Risk factors for VTE 28,Risk factors for VTE 29,VTE score at booking,VTE score at 28 weeks of gestation,Action Taken    Referral to obstetrician Yes / No,Date starting LMWH,Dose of Prescribed LMWH/day,Duration of LMWH use,"are any other anticoagulants or antiplatelets taken beside heparin (yes, no)","If yes to AV, specify anticoagulants or antiplatelets other than LMWH","counselling given by: (Doctor, nurse, Pharmacy)","LMWH Injection given by (Pregnant woman herself, Nurse, other)","Side effect of LMWH (List): Uncontrolled bleeding, injection site reaction such as redness,irritation or brusing, elevated liver enzymes, Heparin induced thrombocytopenia, â€¦..",Number of LMWH Injections consumed by the pregnant woman (check the attached form in the green card),Number of Retained LMWH,"Reasons of retain of  LMWH injections (side effects, not know how to give self injection, no couselling, others)"
Al Falaj,5/11/2023,RAJA ABDULLAH SULIMAN,6792089,39,10,6,FIRST,,,,,,,YES,YES,,YES,,,,,,,,,,,,,,,,,,,,3,,NO,,,,,,,,,,,
Al Falaj,6/11/2023,AMNA  ABDULLAH,12481644,36,11,4,FIRST,,,,,,,YES,,YES,YES,,,,,,,,,,,,,,,,,,,,4,,YES,,6000,,YES,ASPIRIN,,,,,,
Al Falaj,7/11/2023,LAILA HAMDAN OBAID,13861209,34,3,1,FIRST,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,0,,NO,,,,,,,,,,,
Al Falaj,8/11/2023,SAFA YOUSIF MURAD,7142231,32,3,2,FIRST,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,0,,NO,,,,,,,,,,,
Al Falaj,10/11/2023,KHALITHAM SALIM SAID,8642103,28,2,1,FIRST,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,0,,NO,,,,,,,,,,,
Al Falaj,11/11/2023,SALMA ALI ABDULLAH,9001527,40,5,3,FIRST,,,,,,,YES,,,YES,,,,,,,,,,,,,,,,,,,,2,,NO,,,,,,,,,,,
Al Falaj,12/11/2023,FATIMA SAIF SAID,18833921,36,7,4,FIRST,,,,,,,YES,YES,,YES,,,,,,,,,,,,,,,,,,,,3,,NO,,,,,,,,,,,
Al Falaj,13/11/23,AMINA ALI ABDULLAH,12118472,29,2,1,FIRST,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,0,,NO,,,,,,,,,,,
Al Falaj,14/11/23,FATMA SARHAN ABDULLAH,12749017,26,2,1,FIRST,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,0,,NO,,,,,,,,,,,
Al Falaj,15/11/23,JUHINA RASHID MOHAMMED,8655994,31,2,1,FIRST,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,0,,NO,,,,,,,,,,,
Al Falaj,16/11/23,FATMA  ALI MURAD,8752904,28,3,2,FIRST,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,0,,NO,,,,,,,,,,,
Al Falaj,17/11/23,AYSH IBRAHIM SALEH,8217718,31,4,1,FIRST,,,,,,,,,YES,,,,,,,,,,,,,,,,,,,,,2,,NO,,,,,,,,,,,
Al Falaj,18/11/23,ALYAA SAID TARESH,22151701,32,4,3,FIRST,,,,,,,,YES,,YES,,,,,,,,,,,,,,,,,,,,2,,NO,,,,,,,,,,,
Al Falaj,19/11/23,MASHEL ALI SAID,14356449,32,3,2,FIRST,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,0,,NO,,,,,,,,,,,
Al Falaj,20/11/23,MARYAM RASHID SULIMAN,18493743,32,3,2,FIRST,,,,,,,,,YES,,,,,,,,,,,,,,,,,,,,,2,,NO,,,,,,,,,,,
Al Falaj,21/11/23,BATAYA JUMA MUBARAK,4384036,31,5,3,FIRST,,,,,,,,,,YES,,,,,,,,,,,,,,,,,,,,1,,NO,,,,,,,,,,,
Al Falaj,22/11/23,ASMA KHALIFA SAID,13824276,33,5,3,FIRST,,,,,,,,YES,,,YES,,,,,,,,,,,,,,,,,,,2,,NO,,,,,,,,,,,
Al Falaj,23/11/23,FATMA ABDULLAH TANOOF,132220199,20,1,0,FIRST,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,0,,NO,,,,,,,,,,,
Al Falaj,25/11/23,SAHLA TALIB MOHAMMED,10799086,26,3,2,FIRST,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,0,,NO,,,,,,,,,,,
Al Falaj,26/11/2023,JANNATIL FERDOUS,128250192,25,3,2,FIRST,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,0,,NO,,,,,,,,,,,
Al Multaqa,39/11/23,Aisha Saleh Rashid,5224887,30,7,2,FIRST,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,0,0,NO,,,,,,,,,,,
Al Multaqa,40/11/23,Khadija Ibrahim Hassan,13986382,32,3,2,FIRST,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,0,0,NO,,,,,,,,,,,
Al Multaqa,41/11/23,Jawaher ABdulMajeed,21388797,25,1,0,FIRST,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,0,,NO,,,,,,,,,,,
Al Multaqa,42/11/23,Fatma Hazoum Abdullah,13283711,40,10,6,FIRST,,,,,,,YES,YES,,YES,,,,,,,,,,,,,,,,,,,,3,3,YES,15/4/2024,4000iu,OD,YES,ASPIRIN,DOCTOR,Nurse,,,,
Al Multaqa,43/11/23,Hind Saif Said,19504733,27,2,1,FIRST,,,,,,,,YES,,,,,,,,,,,,,,,,,,,,,,1,,NO,,,,,,,,,,,
Al Multaqa,44/111/23,Ahoud Mohammed Said,14995401,21,3,2,FIRST,,,,,,,,YES,,,,,,,,,,,,,,,,,,,,,,1,1,NO,,,,,,,,,,,
Al Multaqa,45/11/23,Alia Khalfan Rashid,11876367,25,1,0,FIRST,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,0,0,NO,,,,,,,,,,,
Al Multaqa,46/11/23,Muna Abdullah Mohammed,11270256,34,4,3,FIRST,,,,,,,,,YES,YES,,,,,,,,,,,,,,,,,,,,3,3,YES,15/4/2024,4000iu,OD,YES,ASPIRIN,DOCTOR,Nurse,,,,
Al Multaqa,47/11/23,Fathima Peringadi,119887454,25,3,1,FIRST,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,0,,NO,,,,,,,,,,,
Al Multaqa,48/11/23,Anoud Khalfan Rashid,10048036,28,2,1,FIRST,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,0,0,NO,,,,,,,,,,,
Al Multaqa,49/11/23,Wadha Saif Salem,14817533,39,4,3,FIRST,,,,,,,YES,YES,,YES,,,,,,,,,,,,,,,,,,,,3,3,YES,28/4/2024,4000iu,OD,YES,ASPIRIN,DOCTOR,Nurse,,,,
Al Multaqa,50/11/23,Mariam Mohammed Amer,816505,43,3,2,FIRST,,,,,,,YES,,,,,,,,,,,,,,,,,,,,,,,1,1,NO,,,,,,,,,,,
Al Tareef,8/11/2023,Iman Abdullah Said,13802098,32,4,2,FIRST,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,0,,NO,,,,,,,,,,,
Al Tareef,9/11/2023,Maha Mohammed Rashid,9961627,26,1,0,fIRST,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,0,,NO,,,,,,,,,,,
Al Tareef,10/11/2023,Tahani Ibrahim Ali,7666421,43,3,2,FIRST,,,,,,,yes,,,,,,,,,,,,,,,,,,,,,,,1,,NO,,,,,,,,,,,
Al Tareef,11/11/2023,khoula hamdan khamis,19436307,30,5,3,FIRST,,,,,,,,YES,,YES,,,,,,,,,,,,,,,,,,,,2,,,,,,,,,,,,,
Al Tareef,12/11/2023,hanan abdullah rashid,13699563,31,2,0,FIRST,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,0,,,,,,,,,,,,,
Al Uwaynat,25/6/2023,maryam rashid dhahi,11094224,37,5,4,FIRST,,,,,,,yes,,,YES,,,,,,,,,,,,,,,,,,,,2,,NO,,,,,,,,,,,
Al Uwaynat,32/8/2023,AHED SAID KHAMIS,17913978,20,2,0,FIRST,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,0,,NO,,,,,,,,,,,
Al Uwaynat,36/8/23,ASHIY SALIM RASHID,9082639,40,3,2,FIRST,,,,,,,YES,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
Al Uwaynat,38/9/23,Sheikha AbdulRahim Mohammed,7660451,37,4,4,FIRST,,,,,,,YES,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
Al Uwaynat,28/7/23,FATAM RASAD SALIM ALMA,11283298,35,2,3,FIRST,,,,,,,YES,,,,,,,,,,,,,,,,,,,,,,,,,NO,,,,,,,,,,,
Wadi Ahin,001-01-2023,KHAWLA HAMED SULIMAN,8722053,37,5,3,First,,,,,,,,YES,,,Yes,,,,,,,,,,,,,,,,,,,2,,,,,,,,,,,,,
Wadi Ahin,23/1/2002,HIND RASHID SALIM,14970231,30,1,0,First,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,0,,,,,,,,,,,,,
Wadi Hibi,14/1/23,RIHAB AHMED,15049585,24,1,0,First,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,0,,,,,,,,,,,,,
Wadi Hibi,15/1/23,ATHARI ALI,19705687,28,3,1,First,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,0,,,,,,,,,,,,,
Wadi Hibi,16/1/23,BADRYA SAIF,8939364,38,10,18,First,,,,,,,Yes,Yes,,Yes,,,,,,,,,,,,,,,,,,,,3,,,,,,,,,,,,,
Wadi Hibi,13/1/23,IMAN KHALFA,11296677,25,3,1,First,,,,,,,,Yes,,,,,,,,,,,,,,,,,,,,,,1,,,,,,,,,,,,,`;
};

const RiskFactorAge = () => {
  const [csvData, setCsvData] = useState<PatientRecord[]>([]);
  const [healthCenterData, setHealthCenterData] = useState<{ [key: string]: HealthCenterData }>({});
  const [selectedHealthCenter, setSelectedHealthCenter] = useState<string>('All Centers');
  const [viewMode, setViewMode] = useState('by-center');
  const [chartView, setChartView] = useState('bar');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{key: string, direction: 'asc' | 'desc'} | null>(null);

  // Professional Healthcare Color Palette
  const colors = {
    primary: '#005EB8',
    secondary: '#0072CE',
    tertiary: '#00629B',
    success: '#00A651',
    warning: '#FF8C00',
    danger: '#DA291C',
    info: '#41B6C4',
    chart: ['#005EB8', '#0072CE', '#41B6C4', '#00A651', '#FF8C00', '#DA291C', '#6B46C1', '#8B5CF6', '#EC4899'],
    background: '#F8FAFC',
    cardBackground: '#FFFFFF',
    border: '#E2E8F0'
  };

  // Parse CSV data with enhanced error handling
  const parseCSVData = (csvText: string): PatientRecord[] => {
    const lines = csvText.split('\n').filter(line => line.trim());
    if (lines.length === 0) return [];
    
    const headers = lines[0].split(',');
    const records: PatientRecord[] = [];

    // Find column indices with case-insensitive matching
    const findColumnIndex = (searchTerms: string[]) => {
      return headers.findIndex(header => 
        searchTerms.some(term => header.toLowerCase().includes(term.toLowerCase()))
      );
    };

    const healthCenterIndex = findColumnIndex(['health institution name', 'institution', 'center']);
    const ageIndex = findColumnIndex(['age']);
    const gravidaIndex = findColumnIndex(['gravida']);
    const parityIndex = findColumnIndex(['parity']);
    const trimesterIndex = findColumnIndex(['booking done', 'trimester']);
    const vteScoreIndex = findColumnIndex(['vte score at booking', 'vte score']);
    
    // Find all risk factor column indices
    const riskFactorIndices: { [key: string]: number } = {};
    for (let i = 1; i <= 29; i++) {
      const index = findColumnIndex([`risk factors for vte ${i}`]);
      if (index !== -1) {
        riskFactorIndices[`Risk factors for VTE ${i}`] = index;
      }
    }

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      // Split CSV line handling quoted fields
      const values = parseCSVLine(line);
      
      const healthCenter = values[healthCenterIndex]?.trim();
      const ageStr = values[ageIndex]?.trim();
      const gravidaStr = values[gravidaIndex]?.trim();
      const parityStr = values[parityIndex]?.trim();
      const trimester = values[trimesterIndex]?.trim();
      const vteScoreStr = values[vteScoreIndex]?.trim();

      if (!healthCenter || !ageStr) continue;

      const age = parseInt(ageStr);
      if (isNaN(age) || age < 10 || age > 60) continue; // Filter out invalid ages

      const gravida = parseInt(gravidaStr) || 0;
      const parity = parseInt(parityStr) || 0;
      const vteScore = parseInt(vteScoreStr) || 0;

      // Extract risk factors
      const riskFactors: string[] = [];
      Object.entries(riskFactorIndices).forEach(([riskFactorKey, index]) => {
        const value = values[index]?.trim().toUpperCase();
        if (value === 'YES' || value === 'Y' || value === '1' || value === 'TRUE') {
          const mappedFactor = RISK_FACTOR_MAPPING[riskFactorKey];
          if (mappedFactor) {
            riskFactors.push(mappedFactor);
          }
        }
      });

      // Add age-based risk factor
      if (age >= 35) {
        riskFactors.push('Age > 35 years');
      }

      // Add parity-based risk factor
      if (parity >= 3) {
        riskFactors.push('Parity ≥3');
      }

      records.push({
        healthCenter: normalizeHealthCenterName(healthCenter),
        age,
        riskFactors,
        vteScore,
        gravida,
        parity,
        trimester: trimester || 'FIRST'
      });
    }

    return records;
  };

  // Helper function to parse CSV line with quoted fields
  const parseCSVLine = (line: string): string[] => {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    result.push(current.trim());
    return result;
  };

  // Normalize health center names
  const normalizeHealthCenterName = (name: string): string => {
    const normalized = name.toLowerCase().trim();
    
    if (normalized.includes('multaqa') || normalized.includes('al multaqa')) return 'Al Multaqa';
    if (normalized.includes('tareef') || normalized.includes('al tareef')) return 'Al Tareef';
    if (normalized.includes('falaj') || normalized.includes('al falaj')) return 'Al Falaj';
    if (normalized.includes('uwaynat') || normalized.includes('uwinat') || normalized.includes('uwenat')) return 'Al Uwaynat';
    if (normalized.includes('wadi hibi')) return 'Wadi Hibi';
    if (normalized.includes('wadi ahin')) return 'Wadi Ahin';
    
    return name; // Return original if no match
  };

  // Process data by health center and age groups
  const processHealthCenterData = (records: PatientRecord[]): { [key: string]: HealthCenterData } => {
    const healthCenters = [...new Set(records.map(r => r.healthCenter))];
    const processed: { [key: string]: HealthCenterData } = {};

    healthCenters.forEach(center => {
      const centerRecords = records.filter(r => r.healthCenter === center);
      
      const ageDistribution = {
        'Below 18': centerRecords.filter(r => r.age < 18).length,
        '18-34': centerRecords.filter(r => r.age >= 18 && r.age <= 34).length,
        '35 and above': centerRecords.filter(r => r.age >= 35).length
      };

      const riskFactors: { [key: string]: { 'Below 18': number; '18-34': number; '35 and above': number } } = {};
      
      // Initialize all risk factors
      Object.values(RISK_FACTOR_MAPPING).forEach(factor => {
        riskFactors[factor] = { 'Below 18': 0, '18-34': 0, '35 and above': 0 };
      });

      // Count risk factors by age group
      centerRecords.forEach(record => {
        let ageGroup: '18-34' | 'Below 18' | '35 and above';
        if (record.age < 18) ageGroup = 'Below 18';
        else if (record.age <= 34) ageGroup = '18-34';
        else ageGroup = '35 and above';

        record.riskFactors.forEach(factor => {
          if (riskFactors[factor]) {
            riskFactors[factor][ageGroup]++;
          }
        });
      });

      processed[center] = {
        total: centerRecords.length,
        ageDistribution,
        riskFactors
      };
    });

    return processed;
  };

  // Load and process data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const csvContent = await loadCSVData();
        const parsedData = parseCSVData(csvContent);
        const processedData = processHealthCenterData(parsedData);
        
        setCsvData(parsedData);
        setHealthCenterData(processedData);
        
        // Set first health center as default if available
        const healthCenters = Object.keys(processedData);
        if (healthCenters.length > 0) {
          setSelectedHealthCenter(healthCenters[0]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Generate chart data for age distribution
  const getAgeDistributionData = () => {
    if (selectedHealthCenter === 'All Centers') {
      const totalDistribution = {
        'Below 18': Object.values(healthCenterData).reduce((sum, center) => sum + center.ageDistribution['Below 18'], 0),
        '18-34': Object.values(healthCenterData).reduce((sum, center) => sum + center.ageDistribution['18-34'], 0),
        '35 and above': Object.values(healthCenterData).reduce((sum, center) => sum + center.ageDistribution['35 and above'], 0)
      };
      
      return Object.entries(totalDistribution).map(([ageGroup, count]) => ({
        ageGroup,
        count,
        percentage: totalDistribution ? ((count / Object.values(totalDistribution).reduce((a, b) => a + b, 0)) * 100).toFixed(1) : '0'
      }));
    }
    
    const centerData = healthCenterData[selectedHealthCenter];
    if (!centerData) return [];
    
    return Object.entries(centerData.ageDistribution).map(([ageGroup, count]) => ({
      ageGroup,
      count,
      percentage: centerData.total > 0 ? ((count / centerData.total) * 100).toFixed(1) : '0'
    }));
  };

  // Sort table data
  const sortTableData = (data: any[], key: string) => {
    if (!sortConfig || sortConfig.key !== key) {
      return [...data].sort((a, b) => {
        if (typeof a[key] === 'number') return b[key] - a[key];
        return String(a[key]).localeCompare(String(b[key]));
      });
    }
    
    return [...data].sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];
      
      if (typeof aValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      const result = String(aValue).localeCompare(String(bValue));
      return sortConfig.direction === 'asc' ? result : -result;
    });
  };

  // Handle sort
  const handleSort = (key: string) => {
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Get risk factors table data
  const getRiskFactorsTableData = () => {
    if (selectedHealthCenter === 'All Centers') {
      const allRiskFactors: { [key: string]: { 'Below 18': number; '18-34': number; '35 and above': number } } = {};
      
      // Initialize all risk factors
      Object.values(RISK_FACTOR_MAPPING).forEach(factor => {
        allRiskFactors[factor] = { 'Below 18': 0, '18-34': 0, '35 and above': 0 };
      });
      
      // Aggregate data from all centers
      Object.values(healthCenterData).forEach(centerData => {
        Object.entries(centerData.riskFactors).forEach(([factor, counts]) => {
          if (allRiskFactors[factor]) {
            allRiskFactors[factor]['Below 18'] += counts['Below 18'];
            allRiskFactors[factor]['18-34'] += counts['18-34'];
            allRiskFactors[factor]['35 and above'] += counts['35 and above'];
          }
        });
      });
      
      return Object.entries(allRiskFactors)
        .map(([factor, counts]) => ({
          factor,
          below18: counts['Below 18'],
          age18to34: counts['18-34'],
          age35plus: counts['35 and above'],
          total: counts['Below 18'] + counts['18-34'] + counts['35 and above']
        }))
        .filter(item => item.total > 0);
    }
    
    const centerData = healthCenterData[selectedHealthCenter];
    if (!centerData) return [];
    
    return Object.entries(centerData.riskFactors)
      .map(([factor, counts]) => ({
        factor,
        below18: counts['Below 18'],
        age18to34: counts['18-34'],
        age35plus: counts['35 and above'],
        total: counts['Below 18'] + counts['18-34'] + counts['35 and above']
      }))
      .filter(item => item.total > 0);
  };

  if (loading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center" 
        style={{ backgroundColor: colors.background }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading risk factor data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center" 
        style={{ backgroundColor: colors.background }}
      >
        <Card className="max-w-md text-center">
          <AlertTriangleIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </Card>
      </div>
    );
  }

  const totalPatients = csvData.length;
  const healthCenters = Object.keys(healthCenterData);
  const ageDistributionData = getAgeDistributionData();
  const riskFactorsTableData = sortTableData(getRiskFactorsTableData(), sortConfig?.key || 'total');

  // Calculate high-risk percentage
  const highRiskPatients = csvData.filter(patient => patient.riskFactors.length >= 3).length;
  const highRiskPercentage = totalPatients > 0 ? ((highRiskPatients / totalPatients) * 100).toFixed(1) : '0';
  const isHighRisk = parseFloat(highRiskPercentage) > 25;

  return (
    <div 
      className="min-h-screen" 
      style={{ backgroundColor: colors.background }}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <CalendarIcon 
              className="w-6 h-6 text-blue-600" 
            />
            Risk Factors by Age Groups
          </h1>
          <p className="text-gray-600">Analysis of VTE risk factors across different age groups by health center</p>
          
          {/* Data Connection Status */}
          <div className="mt-4 flex items-center gap-4 text-sm">
            <div className="text-2xl font-bold" style={{ color: colors.primary }}>
              {totalPatients}
            </div>
            <span className="text-gray-600">Patient Records</span>
            <div className="text-lg font-semibold" style={{ color: colors.secondary }}>
              {healthCenters.length}
            </div>
            <span className="text-gray-600">Health Centers</span>
          </div>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div>
                <label htmlFor="health-center" className="block text-sm font-medium text-gray-700 mb-1">
                  Health Center
                </label>
                <select
                  id="health-center"
                  value={selectedHealthCenter}
                  onChange={(e) => setSelectedHealthCenter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="All Centers">All Centers</option>
                  {healthCenters.map(center => (
                    <option key={center} value={center}>{center}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="view-mode" className="block text-sm font-medium text-gray-700 mb-1">
                  View Mode
                </label>
                <select
                  id="view-mode"
                  value={viewMode}
                  onChange={(e) => setViewMode(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="by-center">By Health Center</option>
                  <option value="overview">Overview Analysis</option>
                </select>
              </div>
            </div>

            {/* High Risk Alert */}
            <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200">
              <AlertTriangleIcon className="w-5 h-5 text-amber-600" />
              <div>
                <div className="text-sm font-medium text-amber-800">High Risk Patients</div>
                <div 
                  className="text-2xl font-bold mt-1" 
                  style={{ color: isHighRisk ? colors.warning : colors.primary }}
                >
                  {highRiskPercentage}%
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <ChartBarIcon 
                  className="w-5 h-5 text-blue-600" 
                />
                Age Distribution - {selectedHealthCenter}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setChartView('bar')}
                  className={`px-3 py-1 text-xs rounded ${
                    chartView === 'bar' 
                      ? 'bg-blue-100 text-blue-600 border border-blue-300' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Bar Chart
                </button>
                <button
                  onClick={() => setChartView('pie')}
                  className={`px-3 py-1 text-xs rounded ${
                    chartView === 'pie' 
                      ? 'bg-blue-100 text-blue-600 border border-blue-300' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Pie Chart
                </button>
              </div>
            </div>
            
            <div className="h-64">
              {chartView === 'bar' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ageDistributionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ageGroup" />
                    <YAxis />
                    <Tooltip formatter={(value, name) => [value, name === 'count' ? 'Patients' : name]} />
                    <Bar dataKey="count" fill={colors.primary} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ageDistributionData}
                      dataKey="count"
                      nameKey="ageGroup"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ageGroup, percentage}) => `${ageGroup}: ${percentage}%`}
                    >
                      {ageDistributionData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={colors.chart[index % colors.chart.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [value, 'Patients']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </Card>

          {/* Summary Statistics */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <TargetIcon 
                className="w-5 h-5 text-red-600" 
              />
              <h3 className="text-lg font-semibold text-gray-900">
                Age Group Summary - {selectedHealthCenter}
              </h3>
            </div>
            
            <div className="space-y-4">
              {ageDistributionData.map((item, index) => {
                const percentage = parseFloat(item.percentage);
                const isHighPercentage = percentage > 40;
                
                return (
                  <div key={item.ageGroup} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded" 
                        style={{ backgroundColor: colors.chart[index] }}
                      ></div>
                      <div>
                        <div className="font-medium text-gray-900">{item.ageGroup}</div>
                        <div className="text-sm text-gray-600">{item.count} patients</div>
                      </div>
                    </div>
                    <div 
                      className={`text-lg font-bold ${isHighPercentage ? 'text-orange-600' : 'text-gray-900'}`}
                    >
                      {item.percentage}%
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Risk Factors by Age Table */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <DocumentReportIcon 
                className="w-5 h-5 text-cyan-600" 
              />
              <h3 className="text-lg font-semibold text-gray-900">
                Risk Factors by Age Group - {selectedHealthCenter}
              </h3>
            </div>
            <div className="text-sm text-gray-600">
              {riskFactorsTableData.length} risk factors identified
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th 
                    className="text-left py-3 px-4 font-medium text-gray-900 cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('factor')}
                  >
                    Risk Factor {sortConfig?.key === 'factor' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="text-center py-3 px-4 font-medium text-gray-900 cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('below18')}
                  >
                    Below 18 {sortConfig?.key === 'below18' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="text-center py-3 px-4 font-medium text-gray-900 cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('age18to34')}
                  >
                    18-34 {sortConfig?.key === 'age18to34' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="text-center py-3 px-4 font-medium text-gray-900 cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('age35plus')}
                  >
                    35+ {sortConfig?.key === 'age35plus' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    className="text-center py-3 px-4 font-medium text-gray-900 cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSort('total')}
                  >
                    Total {sortConfig?.key === 'total' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {riskFactorsTableData.map((item, index) => (
                  <tr key={item.factor} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="py-3 px-4 text-sm text-gray-900">{item.factor}</td>
                    <td className="py-3 px-4 text-sm text-center">
                      <span className={`px-2 py-1 rounded ${item.below18 > 0 ? 'bg-blue-100 text-blue-800' : 'text-gray-400'}`}>
                        {item.below18}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-center">
                      <span className={`px-2 py-1 rounded ${item.age18to34 > 0 ? 'bg-green-100 text-green-800' : 'text-gray-400'}`}>
                        {item.age18to34}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-center">
                      <span className={`px-2 py-1 rounded ${item.age35plus > 0 ? 'bg-orange-100 text-orange-800' : 'text-gray-400'}`}>
                        {item.age35plus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-center font-semibold">
                      <span className="px-2 py-1 rounded bg-gray-100 text-gray-800">
                        {item.total}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {riskFactorsTableData.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No risk factors found for the selected health center.
            </div>
          )}
        </Card>

        {/* Overview Statistics */}
        {viewMode === 'overview' && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <div className="flex items-center gap-3 mb-2">
                <UsersIcon className="w-5 h-5 text-blue-600" />
                <h4 className="font-medium text-gray-900">Total Patients</h4>
              </div>
              <div 
                className="text-2xl font-bold mt-1" 
                style={{ color: colors.primary }}
              >
                {totalPatients}
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-3 mb-2">
                <CheckCircleIcon className="w-5 h-5 text-green-600" />
                <h4 className="font-medium text-gray-900">Low Risk</h4>
              </div>
              <div 
                className="text-2xl font-bold mt-1" 
                style={{ color: colors.success }}
              >
                {(100 - parseFloat(highRiskPercentage)).toFixed(1)}%
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-3 mb-2">
                <ShieldCheckIcon className="w-5 h-5 text-blue-600" />
                <h4 className="font-medium text-gray-900">Health Centers</h4>
              </div>
              <div 
                className="text-2xl font-bold mt-1" 
                style={{ color: colors.info }}
              >
                {healthCenters.length}
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangleIcon className="w-5 h-5 text-orange-600" />
                <h4 className="font-medium text-gray-900">High Risk</h4>
              </div>
              <div 
                className="text-2xl font-bold mt-1" 
                style={{ color: colors.warning }}
              >
                {highRiskPercentage}%
              </div>
            </Card>
          </div>
        )}

        {/* Age Group Breakdown by Health Center */}
        {viewMode === 'overview' && (
          <Card className="mt-8">
            <div className="flex items-center gap-2 mb-6">
              <TargetIcon 
                className="w-5 h-5 text-blue-600" 
              />
              <h3 className="text-lg font-semibold text-gray-900">
                Age Distribution Across All Health Centers
              </h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Health Center</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900">Below 18</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900">18-34</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900">35+</th>
                    <th className="text-center py-3 px-4 font-medium text-gray-900">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {healthCenters.map((center, index) => {
                    const centerData = healthCenterData[center];
                    return (
                      <tr key={center} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="py-3 px-4 text-sm font-medium text-gray-900">{center}</td>
                        <td className="py-3 px-4 text-sm text-center">
                          <span className="px-2 py-1 rounded bg-blue-100 text-blue-800">
                            {centerData.ageDistribution['Below 18']}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-center">
                          <span className="px-2 py-1 rounded bg-green-100 text-green-800">
                            {centerData.ageDistribution['18-34']}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-center">
                          <span className="px-2 py-1 rounded bg-orange-100 text-orange-800">
                            {centerData.ageDistribution['35 and above']}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-center font-semibold">
                          <span className="px-2 py-1 rounded bg-gray-100 text-gray-800">
                            {centerData.total}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RiskFactorAge; 