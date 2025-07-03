
import React from 'react';
import Card from './shared/Card';
import StatCard from './shared/StatCard';
import { riskFactorsByType, preExistingRiskFactors, obstetricRiskFactors, transientRiskFactors, top5RiskFactors } from '../constants/data';
import type { RiskFactorData } from '../types';
import SimpleBarChart from './charts/SimpleBarChart';
import { ChartBarIcon } from '../constants/icons';


const RiskFactorStatCard: React.FC<{ type: string; count: number; description: string; icon: React.ReactNode; color: string; }> = ({ type, count, description, icon, color }) => (
    <div className={`bg-white p-5 rounded-xl shadow-md border-t-4 border-${color}-500`}>
        <div className="flex items-center justify-between">
            <div>
                <p className="text-xs text-slate-500 font-bold tracking-wider">{type}</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{count}</p>
                <p className="text-sm text-slate-500 mt-1">{description}</p>
            </div>
            <div className={`w-14 h-14 rounded-full flex items-center justify-center bg-${color}-100`}>
                {icon}
            </div>
        </div>
    </div>
);

const RiskFactorTable: React.FC<{data: RiskFactorData[]}> = ({ data }) => (
    <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-500">
            <thead className="text-xs text-slate-700 uppercase bg-slate-100">
                <tr>
                    <th scope="col" className="px-6 py-3">Risk Factor</th>
                    <th scope="col" className="px-6 py-3 text-right">Count</th>
                    <th scope="col" className="px-6 py-3 text-right">Percentage</th>
                </tr>
            </thead>
            <tbody>
                {data.map(item => (
                    <tr key={item.name} className="bg-white border-b">
                        <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">
                            {item.name}
                        </th>
                        <td className="px-6 py-4 text-right">{item.count.toLocaleString()}</td>
                        <td className="px-6 py-4 text-right">{item.percentage.toFixed(1)}%</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const ObesityImpactAnalysis: React.FC = () => (
    <Card>
        <h3 className="text-lg font-bold text-slate-800 mb-4">Obesity Impact Analysis</h3>
        <div className="space-y-3">
            <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
                <span className="font-semibold text-yellow-800">BMI 30-39 kg/m²</span>
                <span className="font-bold text-yellow-900">249 patients (8.1%)</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                <span className="font-semibold text-red-800">BMI ≥40 kg/m²</span>
                <span className="font-bold text-red-900">84 patients (2.7%)</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-slate-800 text-white rounded-lg">
                <span className="font-semibold">Total Obesity Impact</span>
                <span className="font-bold">333 patients (10.8%)</span>
            </div>
        </div>
        <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
            <h4 className="font-bold text-indigo-800 mb-2">Center-Specific Insights</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-indigo-700">
                <li><strong>Sohar P.C.:</strong> 132 obese patients (13.3% of their screened population)</li>
                <li><strong>Regional Average:</strong> 10.8% across all centers</li>
                <li><strong>Clinical Impact:</strong> Obesity is the 3rd most common VTE risk factor</li>
                <li><strong>Prevention Focus:</strong> Weight management programs may reduce future VTE risk</li>
            </ul>
        </div>
    </Card>
);

const RiskFactors: React.FC = () => (
    <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {riskFactorsByType.map(factor => (
                <RiskFactorStatCard key={factor.type} {...factor} />
            ))}
        </div>
        
        <ObesityImpactAnalysis />

        <Card>
            <h3 className="text-lg font-bold text-slate-800 mb-4">Pre-existing Risk Factors</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <RiskFactorTable data={preExistingRiskFactors} />
                <SimpleBarChart data={preExistingRiskFactors.map(d => ({name: d.name, count: d.count}))} barColor="#3B82F6" />
            </div>
        </Card>

        <Card>
            <h3 className="text-lg font-bold text-slate-800 mb-4">Obstetric Risk Factors</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <RiskFactorTable data={obstetricRiskFactors} />
                <SimpleBarChart data={obstetricRiskFactors.map(d => ({name: d.name, count: d.count}))} barColor="#10B981" />
            </div>
        </Card>

        <Card>
            <h3 className="text-lg font-bold text-slate-800 mb-4">New Onset/Transient Risk Factors</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <RiskFactorTable data={transientRiskFactors} />
                <SimpleBarChart data={transientRiskFactors.map(d => ({name: d.name, count: d.count}))} barColor="#F97316" />
            </div>
        </Card>
        
        <Card>
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center">
                <ChartBarIcon className="w-6 h-6 mr-2 text-brand-purple" />
                Top 5 Risk Factors Impact Summary
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {top5RiskFactors.map(factor => (
                    <div key={factor.name} className="bg-slate-100 p-4 rounded-lg text-center">
                        <p className="text-2xl font-bold text-slate-800">{factor.count.toLocaleString()}</p>
                        <p className="text-sm text-slate-600 mt-1">{factor.name}</p>
                    </div>
                ))}
            </div>
        </Card>
    </div>
);

export default RiskFactors;
