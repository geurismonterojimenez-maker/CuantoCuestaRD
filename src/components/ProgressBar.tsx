interface ProgressBarProps {
  value: number; // 0 to 100
  color?: string; // custom color
  status?: 'healthy' | 'warning' | 'danger' | 'info';
  height?: string;
  showLabel?: boolean;
}

const colorMap: Record<string, string> = {
  healthy: 'var(--success)',
  warning: 'var(--warning)',
  danger: 'var(--danger)',
  info: 'var(--primary)'
};

export default function ProgressBar({ 
  value, 
  color, 
  status = 'info', 
  height = '10px', 
  showLabel = false 
}: ProgressBarProps) {
  const roundedValue = Math.min(100, Math.max(0, value));
  const activeColor = color || colorMap[status] || 'var(--primary)';

  return (
    <div className="progress-bar-container" style={{ width: '100%', margin: '0.5rem 0' }}>
      {showLabel && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', fontSize: '0.85rem', fontWeight: 600 }}>
          <span style={{ color: 'var(--text-muted)' }}>Porcentaje</span>
          <span style={{ color: activeColor }}>{roundedValue}%</span>
        </div>
      )}
      <div 
        className="progress-bar-track" 
        style={{
          width: '100%',
          height,
          backgroundColor: '#e2e8f0',
          borderRadius: '10px',
          overflow: 'hidden'
        }}
      >
        <div 
          className="progress-bar-fill" 
          style={{
            width: `${roundedValue}%`,
            height: '100%',
            backgroundColor: activeColor,
            borderRadius: '10px',
            transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />
      </div>
    </div>
  );
}
