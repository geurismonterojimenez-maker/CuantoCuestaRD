import { ArrowUpRight, ArrowDownRight, Info } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendLabel?: string;
  themeColor?: string; // e.g. var(--theme-primary)
}

export default function MetricCard({ 
  title, 
  value, 
  subtitle, 
  trend, 
  trendLabel,
  themeColor = 'var(--primary)'
}: MetricCardProps) {
  return (
    <div 
      className="metric-card" 
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.35rem',
        boxShadow: 'var(--shadow-sm)',
        borderLeft: `4px solid ${themeColor}`
      }}
    >
      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>
        {title}
      </span>
      <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)', wordBreak: 'break-word' }}>
        {value}
      </span>
      {subtitle && (
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {subtitle}
        </span>
      )}
      {trend && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
          {trend === 'up' && <ArrowUpRight size={14} className="text-danger" style={{ color: 'var(--danger)' }} />}
          {trend === 'down' && <ArrowDownRight size={14} className="text-success" style={{ color: 'var(--success)' }} />}
          {trend === 'neutral' && <Info size={14} style={{ color: 'var(--primary)' }} />}
          {trendLabel && (
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: trend === 'down' ? 'var(--success)' : trend === 'up' ? 'var(--danger)' : 'var(--text-muted)' }}>
              {trendLabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
