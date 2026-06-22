interface StatusBadgeProps {
  status: 'healthy' | 'warning' | 'danger' | 'info';
  label: string;
}

const colorMap: Record<string, string> = {
  healthy: 'var(--success)',
  warning: 'var(--warning)',
  danger: 'var(--danger)',
  info: 'var(--primary)'
};

const bgMap: Record<string, string> = {
  healthy: 'var(--success-light)',
  warning: 'var(--warning-light)',
  danger: 'var(--danger-light)',
  info: 'var(--primary-light)'
};

export default function StatusBadge({ status, label }: StatusBadgeProps) {
  const color = colorMap[status] || 'var(--text-muted)';
  const bg = bgMap[status] || '#f1f5f9';

  return (
    <span 
      className={`status-badge status-${status}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.35rem',
        padding: '0.25rem 0.6rem',
        borderRadius: '6px',
        fontSize: '0.8rem',
        fontWeight: 600,
        backgroundColor: bg,
        color: color,
        border: `1px solid ${color}30`,
        width: 'fit-content'
      }}
    >
      <span 
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: color,
          display: 'inline-block'
        }}
      />
      {label}
    </span>
  );
}
