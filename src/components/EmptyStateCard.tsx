import { type LucideIcon, Sparkles } from 'lucide-react';

interface EmptyStateCardProps {
  title: string;
  description: string;
  checklistTitle?: string;
  checklist?: string[];
  icon?: LucideIcon;
}

export default function EmptyStateCard({ 
  title, 
  description, 
  checklistTitle = '¿Qué obtendrás al calcular?', 
  checklist = [
    'Presupuesto mensual aproximado de referencia.',
    'Análisis de la distribución del dinero.',
    'Consejos prácticos de ahorro y optimización.'
  ],
  icon: IconComponent = Sparkles
}: EmptyStateCardProps) {
  return (
    <div 
      className="card empty-state-card text-center" 
      style={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        padding: '3rem 2rem',
        alignItems: 'center'
      }}
    >
      <div 
        className="empty-state-icon-wrapper"
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: 'var(--theme-light, var(--primary-light))',
          color: 'var(--theme-primary, var(--primary))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem'
        }}
      >
        <IconComponent size={32} className="empty-state-icon" />
      </div>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
        {title}
      </h3>
      <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '1.75rem', maxWidth: '360px', lineHeight: 1.5 }}>
        {description}
      </p>
      
      {checklist && checklist.length > 0 && (
        <div className="empty-state-checklist" style={{ textAlign: 'left', width: '100%', maxWidth: '360px', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '0.5rem' }}>
            {checklistTitle}
          </span>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {checklist.map((item, idx) => (
              <li key={idx} style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', gap: '0.4rem', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--theme-primary, var(--primary))', fontWeight: 800 }}>✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
