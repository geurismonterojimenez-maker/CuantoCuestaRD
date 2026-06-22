interface CurrencyToggleProps {
  value: 'USD' | 'RD';
  onChange: (value: 'USD' | 'RD') => void;
  label?: string;
  helpText?: string;
}

export function CurrencyToggle({ value, onChange, label, helpText }: CurrencyToggleProps) {
  return (
    <div className="currency-toggle-container" style={{ marginBottom: '1.25rem' }}>
      {label && (
        <label className="form-label" style={{ fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>
          {label}
        </label>
      )}
      {helpText && (
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0 0 0.5rem 0' }}>
          {helpText}
        </p>
      )}
      <div 
        style={{ 
          display: 'flex', 
          backgroundColor: '#f1f5f9', 
          padding: '4px', 
          borderRadius: '8px', 
          width: 'fit-content', 
          border: '1px solid var(--border-color)',
          minWidth: '240px'
        }}
      >
        <button
          type="button"
          onClick={() => onChange('USD')}
          style={{
            flex: 1,
            padding: '8px 16px',
            borderRadius: '6px',
            border: 'none',
            fontSize: '0.9rem',
            fontWeight: 600,
            cursor: 'pointer',
            backgroundColor: value === 'USD' ? 'var(--theme-primary, var(--primary))' : 'transparent',
            color: value === 'USD' ? '#ffffff' : 'var(--text-muted)',
            transition: 'all 0.2s ease',
            minHeight: '44px'
          }}
        >
          US$ Dólares
        </button>
        <button
          type="button"
          onClick={() => onChange('RD')}
          style={{
            flex: 1,
            padding: '8px 16px',
            borderRadius: '6px',
            border: 'none',
            fontSize: '0.9rem',
            fontWeight: 600,
            cursor: 'pointer',
            backgroundColor: value === 'RD' ? 'var(--theme-primary, var(--primary))' : 'transparent',
            color: value === 'RD' ? '#ffffff' : 'var(--text-muted)',
            transition: 'all 0.2s ease',
            minHeight: '44px'
          }}
        >
          RD$ Pesos
        </button>
      </div>
    </div>
  );
}

interface ResultCurrencyToggleProps {
  value: 'RD' | 'USD' | 'Ambos';
  onChange: (value: 'RD' | 'USD' | 'Ambos') => void;
  label?: string;
  helpText?: string;
}

export function ResultCurrencyToggle({ value, onChange, label, helpText }: ResultCurrencyToggleProps) {
  return (
    <div className="result-toggle-container" style={{ marginBottom: '1.25rem' }}>
      {label && (
        <label className="form-label" style={{ fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>
          {label}
        </label>
      )}
      {helpText && (
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0 0 0.5rem 0' }}>
          {helpText}
        </p>
      )}
      <div 
        style={{ 
          display: 'flex', 
          backgroundColor: '#f1f5f9', 
          padding: '4px', 
          borderRadius: '8px', 
          width: '100%', 
          border: '1px solid var(--border-color)',
          maxWidth: '360px'
        }}
      >
        {(['RD', 'USD', 'Ambos'] as const).map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
              backgroundColor: value === opt ? 'var(--theme-primary, var(--primary))' : 'transparent',
              color: value === opt ? '#ffffff' : 'var(--text-muted)',
              transition: 'all 0.2s ease',
              minHeight: '44px'
            }}
          >
            {opt === 'RD' ? 'RD$ Pesos' : opt === 'USD' ? 'US$ Dólares' : 'Ambos'}
          </button>
        ))}
      </div>
    </div>
  );
}
