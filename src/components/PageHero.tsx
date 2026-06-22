import { type LucideIcon } from 'lucide-react';
import ModuleBadge from './ModuleBadge';

interface PageHeroProps {
  category: 'supermercados' | 'finanzas' | 'costodevida' | 'vehiculos' | 'courier' | 'tramites' | 'hogar';
  title: string;
  description: string;
  chips?: string[];
  icon?: LucideIcon;
}

export default function PageHero({ 
  category, 
  title, 
  description, 
  chips = [], 
  icon: IconComponent 
}: PageHeroProps) {
  return (
    <section 
      className="page-hero card" 
      style={{ 
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '2rem 1.75rem',
        marginBottom: '2rem',
        borderLeft: '8px solid var(--theme-primary, var(--primary))',
        borderTop: 'none', // override global .card border top
        gap: '2rem',
        flexWrap: 'wrap',
        boxShadow: 'var(--shadow-md)'
      }}
    >
      <div style={{ flex: '2 1 500px', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        <ModuleBadge category={category} />
        <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, color: 'var(--text-main)', lineHeight: 1.25 }}>
          {title}
        </h1>
        <p style={{ fontSize: '1rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5, maxWidth: '680px' }}>
          {description}
        </p>
        
        {chips && chips.length > 0 && (
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.4rem' }}>
            {chips.map((chip, idx) => (
              <span 
                key={idx}
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  backgroundColor: '#f1f5f9',
                  color: 'var(--text-muted)',
                  padding: '0.25rem 0.6rem',
                  borderRadius: '6px',
                  border: '1px solid var(--border-color)'
                }}
              >
                {chip}
              </span>
            ))}
          </div>
        )}
      </div>
      
      {IconComponent && (
        <div 
          style={{
            flex: '0 0 84px',
            width: '84px',
            height: '84px',
            borderRadius: '20px',
            backgroundColor: 'var(--theme-light, var(--primary-light))',
            color: 'var(--theme-primary, var(--primary))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-sm)',
            alignSelf: 'center'
          }}
          className="page-hero-icon-container"
        >
          <IconComponent size={40} />
        </div>
      )}
    </section>
  );
}
