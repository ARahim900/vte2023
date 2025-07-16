// CSV Data Processor for VTE Risk Assessment Dashboard
// This utility processes the CSV data and converts it to a format suitable for analysis

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

// Risk factor mapping for VTE columns (based on your CSV structure)
export const RISK_FACTOR_MAPPING: { [key: string]: string } = {
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

// Parse CSV data from the provided format
export const parseCSVData = (csvText: string): PatientRecord[] => {
  const lines = csvText.split('\n').filter(line => line.trim());
  if (lines.length === 0) return [];
  
  const headers = lines[0].split(',');
  const records: PatientRecord[] = [];

  // Find column indices
  const healthCenterIndex = headers.findIndex(h => h.toLowerCase().includes('health institution name'));
  const ageIndex = headers.findIndex(h => h.toLowerCase().includes('age'));
  const gravidaIndex = headers.findIndex(h => h.toLowerCase().includes('gravida'));
  const parityIndex = headers.findIndex(h => h.toLowerCase().includes('parity'));
  const trimesterIndex = headers.findIndex(h => h.toLowerCase().includes('booking done'));
  const vteScoreIndex = headers.findIndex(h => h.toLowerCase().includes('vte score at booking'));
  
  // Find all risk factor column indices
  const riskFactorIndices: { [key: string]: number } = {};
  for (let i = 1; i <= 29; i++) {
    const index = headers.findIndex(h => h.toLowerCase().includes(`risk factors for vte ${i}`));
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
export const processHealthCenterData = (records: PatientRecord[]): { [key: string]: HealthCenterData } => {
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

// Generate summary statistics
export const generateSummaryStats = (data: { [key: string]: HealthCenterData }) => {
  const totalPatients = Object.values(data).reduce((sum, center) => sum + center.total, 0);
  const totalBelow18 = Object.values(data).reduce((sum, center) => sum + center.ageDistribution['Below 18'], 0);
  const total18to34 = Object.values(data).reduce((sum, center) => sum + center.ageDistribution['18-34'], 0);
  const total35plus = Object.values(data).reduce((sum, center) => sum + center.ageDistribution['35 and above'], 0);

  return {
    totalPatients,
    ageDistribution: {
      'Below 18': totalBelow18,
      '18-34': total18to34,
      '35 and above': total35plus
    },
    percentages: {
      'Below 18': totalPatients > 0 ? ((totalBelow18 / totalPatients) * 100).toFixed(1) : '0',
      '18-34': totalPatients > 0 ? ((total18to34 / totalPatients) * 100).toFixed(1) : '0',
      '35 and above': totalPatients > 0 ? ((total35plus / totalPatients) * 100).toFixed(1) : '0'
    }
  };
};

// Export the CSV data as a string for easy import
export const CSV_DATA = `Health institution Name,ANC number,Name of Pregnant women,Civil ID Number,Age,Gravida,Parity," Booking done at (first, second, third trimester)  ",Risk factors for VTE 1,Risk factors for VTE 2,Risk factors for VTE 3,Risk factors for VTE 4,Risk factors for VTE 5,Risk factors for VTE 6,Risk factors for VTE 7,Risk factors for VTE 8,Risk factors for VTE 9,Risk factors for VTE 10,Risk factors for VTE 11,Risk factors for VTE 12,Risk factors for VTE 13,Risk factors for VTE 14,Risk factors for VTE 15,Risk factors for VTE 16,Risk factors for VTE 17,Risk factors for VTE 18,Risk factors for VTE 19,Risk factors for VTE 20,Risk factors for VTE 21,Risk factors for VTE 22,Risk factors for VTE 23,Risk factors for VTE 24,Risk factors for VTE 25,Risk factors for VTE 26,Risk factors for VTE 27,Risk factors for VTE 28,Risk factors for VTE 29,VTE score at booking,VTE score at 28 weeks of gestation,Action Taken    Referral to obstetrician Yes / No,Date starting LMWH,Dose of Prescribed LMWH/day,Duration of LMWH use,"are any other anticoagulants or antiplatelets taken beside heparin (yes, no)","If yes to AV, specify anticoagulants or antiplatelets other than LMWH","counselling given by: (Doctor, nurse, Pharmacy)","LMWH Injection given by (Pregnant woman herself, Nurse, other)","Side effect of LMWH (List): Uncontrolled bleeding, injection site reaction such as redness,irritation or brusing, elevated liver enzymes, Heparin induced thrombocytopenia, â€¦..",Number of LMWH Injections consumed by the pregnant woman (check the attached form in the green card),Number of Retained LMWH,"Reasons of retain of  LMWH injections (side effects, not know how to give self injection, no couselling, others)"
Al Falaj,5/11/2023,RAJA ABDULLAH SULIMAN,6792089,39,10,6,FIRST,,,,,,,YES,YES,,YES,,,,,,,,,,,,,,,,,,,,3,,NO,,,,,,,,,,,
Al Falaj,6/11/2023,AMNA  ABDULLAH,12481644,36,11,4,FIRST,,,,,,,YES,,YES,YES,,,,,,,,,,,,,,,,,,,,4,,YES,,6000,,YES,ASPIRIN,,,,,,
Al Falaj,7/11/2023,LAILA HAMDAN OBAID,13861209,34,3,1,FIRST,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,0,,NO,,,,,,,,,,,
Al Falaj,8/11/2023,SAFA YOUSIF MURAD,7142231,32,3,2,FIRST,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,0,,NO,,,,,,,,,,,
Al Falaj,10/11/2023,KHALITHAM SALIM SAID,8642103,28,2,1,FIRST,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,0,,NO,,,,,,,,,,,`;

export default {
  parseCSVData,
  processHealthCenterData,
  generateSummaryStats,
  RISK_FACTOR_MAPPING,
  CSV_DATA
}; 