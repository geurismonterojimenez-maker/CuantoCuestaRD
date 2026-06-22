import { type LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  themeColor?: string; // e.g. var(--theme-primary)
}

export default function SectionHeader({ 
  title, 
  description, 
  icon: IconComponent,
  themeColor = 'var(--primary)'
}: SectionHeaderProps) {
  return (
    <div 
      className="section-header" 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        textAlign: 'center', 
        marginBottom: '2rem',
        marginTop: '1.5rem'
      }}
    >
      {IconComponent && (
        <div 
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '14px',
            backgroundColor: 'var(--theme-light, var(--primary-light))',
            color: themeColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '0.75rem',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <IconComponent size={26} />
        </div>
      )}
      <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
        {title}
      </h2>
      {description && (
        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', margin: '0.4rem 0 0 0', maxWidth: '600px', lineHeight: 1.5 }}>
          {description}
        </p>
      )}
      <div 
        style={{ 
          width: '50px', 
          height: '4px', 
          backgroundColor: themeColor, 
          borderRadius: '2px', 
          marginTop: '0.85rem' 
        }} 
      />
    </div>
  );
}
