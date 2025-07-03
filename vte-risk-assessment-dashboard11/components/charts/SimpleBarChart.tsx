
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import type { SimpleBarChartData } from '../../types';

interface SimpleBarChartProps {
  data: SimpleBarChartData[];
  barColor: string;
}

const SimpleBarChart: React.FC<SimpleBarChartProps> = ({ data, barColor }) => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 50 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="name" 
            angle={-45}
            textAnchor="end"
            height={70}
            interval={0}
            tick={{ fontSize: 12, fill: '#475569' }}
          />
          <YAxis tick={{ fontSize: 12, fill: '#475569' }} />
          <Tooltip 
            cursor={{ fill: 'rgba(241, 245, 249, 0.5)' }}
            contentStyle={{
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '0.5rem',
                fontSize: '14px'
            }}
          />
          <Bar dataKey="count" fill={barColor} barSize={40} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimpleBarChart;
