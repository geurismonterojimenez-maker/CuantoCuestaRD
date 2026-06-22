import { CATEGORIES_LABELS } from '../data/toolsDirectory';

interface ModuleBadgeProps {
  category: 'supermercados' | 'finanzas' | 'costodevida' | 'vehiculos' | 'courier' | 'tramites' | 'hogar';
}

const colorMap: Record<string, string> = {
  supermercados: 'var(--supermercados-color)',
  finanzas: 'var(--finanzas-color)',
  costodevida: 'var(--costodevida-color)',
  vehiculos: 'var(--vehiculos-color)',
  courier: 'var(--courier-color)',
  tramites: 'var(--tramites-color)',
  hogar: 'var(--hogar-color)'
};

const bgMap: Record<string, string> = {
  supermercados: 'var(--supermercados-light)',
  finanzas: 'var(--finanzas-light)',
  costodevida: 'var(--costodevida-light)',
  vehiculos: 'var(--vehiculos-light)',
  courier: 'var(--courier-light)',
  tramites: 'var(--tramites-light)',
  hogar: 'var(--hogar-light)'
};

export default function ModuleBadge({ category }: ModuleBadgeProps) {
  const label = CATEGORIES_LABELS[category] || category;
  const color = colorMap[category] || 'var(--primary)';
  const bg = bgMap[category] || 'var(--primary-light)';

  return (
    <span 
      className="module-badge" 
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.3rem 0.75rem',
        borderRadius: '20px',
        fontSize: '0.8rem',
        fontWeight: 600,
        backgroundColor: bg,
        color: color,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        border: `1px solid ${color}20`,
        width: 'fit-content'
      }}
    >
      {label}
    </span>
  );
}
