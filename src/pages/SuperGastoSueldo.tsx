import {
  useState } from 'react';
import { Link } from 'react-router-dom';
import { CITIES,
  estimateCanastaCost } from '../data/mockData';
import SEOHead from '../components/SEOHead';
import PageHero from '../components/PageHero';
import EmptyStateCard from '../components/EmptyStateCard';
import DisclaimerBox from '../components/DisclaimerBox';
import AdSlot from '../components/AdSlot';
import FAQSection,
  { type FAQItem } from '../components/FAQSection';
import { 
  MapPin,
  Users,
  Filter,
  AlertTriangle,
  CheckCircle,
  RotateCcw,
  ArrowRight,
  DollarSign,
  Percent
} from 'lucide-react';

type BasketType = 'economica' | 'normal' | 'completa';

export default function SuperGastoSueldo() {
  const [sueldo, setSueldo] = useState<string>('');
  const [peopleCount, setPeopleCount] = useState<number>(4);
  const [cityId, setCityId] = useState('santo-domingo');
  const [basketType, setBasketType] = useState<'economica' | 'normal' | 'completa'>('normal');

  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const superGastoFAQs: FAQItem[] = [
    {
      question: '¿Qué porcentaje de mi sueldo debo gastar en supermercado?',
      answer: 'Los asesores financieros recomiendan que el gasto mensual en supermercado (comida, limpieza, higiene) represente idealmente entre el 15% y el 25% de tus ingresos netos para mantener un presupuesto sano.'
    },
    {
      question: '¿Qué pasa si la canasta de mi familia supera el 30% de mi sueldo?',
      answer: 'Significa que el costo de alimentación ejerce una presión alta sobre tus ingresos. En este caso, se recomienda buscar el ahorro eligiendo marcas blancas genéricas, limitando productos importados y comprando vegetales en mercados locales.'
    },
    {
      question: '¿Cómo me ayuda el comparador de supermercados?',
      answer: 'Una vez conozcas el presupuesto estimado recomendado con esta herramienta, puedes ir al Comparador de Supermercados en nuestra web, armar tu lista y ver en qué supermercado de tu ciudad te saldrá más económica esa canasta.'
    }
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': superGastoFAQs.map((faq) => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };

  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': 'Calculadora de Gasto de Supermercado según Sueldo - CuantoCuestaRD',
    'operatingSystem': 'All',
    'applicationCategory': 'FinanceApplication',
    'description': 'Calcula cuánto de tu sueldo deberías destinar al supermercado en la República Dominicana según los miembros de tu familia y tu provincia.',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'DOP'
    }
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const valSueldo = Number(sueldo);
    if (!sueldo || valSueldo <= 0) {
      setError('Completa este campo para calcular: el sueldo mensual debe ser mayor que cero.');
      return;
    }
    if (peopleCount <= 0) {
      setError('El número de personas en el hogar debe ser mayor que cero.');
      return;
    }

    setShowResults(true);
  };

  const handleReset = () => {
    setSueldo('');
    setPeopleCount(4);
    setCityId('santo-domingo');
    setBasketType('normal');
    setError(null);
    setShowResults(false);
  };

  // Calculations
  const valSueldo = Number(sueldo) || 0;
  
  // Recommended ranges (15% to 25% of salary)
  const minRecommended = Math.round(valSueldo * 0.15);
  const maxRecommended = Math.round(valSueldo * 0.25);

  // Connection with Module 1: Estimate real basket cost
  const estimatedBasketCost = estimateCanastaCost(peopleCount, basketType, 'mensual', cityId);
  const basketPercentageOfSalary = valSueldo > 0 ? Math.round((estimatedBasketCost / valSueldo) * 100) : 0;

  // Decision Logic for Warnings
  const isTooExpensive = basketPercentageOfSalary > 30;

  return (
    <div className="super-gasto-page">
      <SEOHead 
        title="Cuánto puedo gastar en supermercado según mi sueldo"
        description="Calcula cuánto podrías gastar en supermercado según tu sueldo, ciudad y cantidad de personas en tu hogar."
        schema={[faqSchema, appSchema]}
      />

      <PageHero 
        category="finanzas"
        title="Cuánto gastar en supermercado según mi sueldo"
        description="Determina cuánto deberías destinar a alimentación según tus ingresos y cantidad de personas."
        icon={Percent}
        chips={["gasto","supermercado","comida"]}
      />

      <AdSlot id="supergasto-under-hero" placement="Gasto Supermercado - Debajo del Hero" />

      <div className="grid-2">
        {/* Form Column */}
        <div className="card">
          <h2>Tus Ingresos y Perfil de Hogar</h2>
          <p>Llena estos datos básicos para calibrar la recomendación y conectarla con los precios estimados de referencia.</p>

          {error && (
            <div className="error-alert" role="alert">
              <AlertTriangle size={20} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleCalculate}>
            <div className="form-group">
              <label htmlFor="input-sueldo" className="form-label">
                Ingresos netos del mes (Sueldo RD$): *
              </label>
              <input 
                id="input-sueldo"
                type="number"
                className="form-control"
                placeholder="Ej. 50000"
                value={sueldo}
                onChange={(e) => setSueldo(e.target.value)}
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="people-select" className="form-label">
                <Users size={18} className="inline-icon" /> Cantidad de personas en el hogar:
              </label>
              <select 
                id="people-select" 
                className="form-control" 
                value={peopleCount} 
                onChange={(e) => setPeopleCount(Number(e.target.value))}
              >
                <option value={1}>1 persona (Individual)</option>
                <option value={2}>2 personas (Pareja)</option>
                <option value={3}>3 personas</option>
                <option value={4}>4 personas (Familia estándar)</option>
                <option value={5}>5 personas</option>
                <option value={6}>6 o más personas</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="city-select" className="form-label">
                <MapPin size={18} className="inline-icon" /> Ciudad / Provincia de residencia:
              </label>
              <select 
                id="city-select" 
                className="form-control" 
                value={cityId} 
                onChange={(e) => setCityId(e.target.value)}
              >
                {CITIES.map((city) => (
                  <option key={city.id} value={city.id}>{city.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="basket-select" className="form-label">
                <Filter size={18} className="inline-icon" /> Tipo o calidad de compra deseada:
              </label>
              <select 
                id="basket-select" 
                className="form-control" 
                value={basketType} 
                onChange={(e) => setBasketType(e.target.value as BasketType)}
              >
                <option value="economica">Económica (Marcas económicas, solo lo esencial)</option>
                <option value="normal">Normal (Marcas promedio, alimentación balanceada)</option>
                <option value="completa">Completa (Gran variedad, productos premium e importados)</option>
              </select>
            </div>

            <div className="step-actions flex-between" style={{ gap: '1rem' }}>
              <button type="button" className="btn btn-secondary" onClick={handleReset} style={{ flex: 1 }}>
                <RotateCcw size={18} /> Limpiar
              </button>
              <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
                Calcular recomendación
              </button>
            </div>
          </form>
        </div>

        {/* Results Column */}
        <div className="results-column">
          {showResults ? (
            <div className="card result-card" style={{ height: '100%' }}>
              <h2>Recomendación Presupuestaria</h2>

              <div className="main-cost-display" style={{ padding: '1.25rem 1rem' }}>
                <span className="main-cost-title">Rango de Gasto Saludable Súper (15% - 25%)</span>
                <span className="main-cost-value" style={{ fontSize: '1.8rem' }}>
                  RD$ {minRecommended.toLocaleString()} - RD$ {maxRecommended.toLocaleString()}
                </span>
              </div>

              {/* Phrasing required by user */}
              <div className="dominican-quote" style={{ borderLeftColor: isTooExpensive ? 'var(--warning)' : 'var(--success)' }}>
                <p>
                  "Con un sueldo de <strong>RD$ {valSueldo.toLocaleString()}</strong>, un gasto saludable en supermercado podría estar entre <strong>RD$ {minRecommended.toLocaleString()} y RD$ {maxRecommended.toLocaleString()} al mes</strong>, dependiendo de tu hogar y ciudad."
                </p>
              </div>

              {/* Comparison with Module 1 Real Estimate */}
              <div className="basket-comparison-box" style={{ margin: '1.5rem 0', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '12px', backgroundColor: '#f8fafc' }}>
                <h3 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>Conexión con tu Canasta Estimada (Módulo 1)</h3>
                <p style={{ fontSize: '0.95rem', marginBottom: '0.75rem' }}>
                  El costo estimado para una canasta de tipo <strong>{basketType === 'economica' ? 'Económica' : basketType === 'normal' ? 'Normal' : 'Completa'}</strong> para <strong>{peopleCount} personas</strong> en <strong>{CITIES.find(c => c.id === cityId)?.name}</strong> es de:
                </p>
                <div className="flex-between flex-wrap" style={{ gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    RD$ {estimatedBasketCost.toLocaleString()} / mes
                  </span>
                  <span className={`tag ${isTooExpensive ? 'tag-danger' : 'tag-success'}`} style={{ fontSize: '0.85rem' }}>
                    Toma el {basketPercentageOfSalary}% de tu sueldo
                  </span>
                </div>
              </div>

              {/* Warning Alert if > 30% */}
              {isTooExpensive ? (
                <div className="error-alert" style={{ backgroundColor: 'var(--warning-light)', borderColor: 'var(--warning)', color: '#78350f', borderLeftWidth: '5px', display: 'flex', gap: '0.75rem', alignItems: 'flex-start', marginBottom: '1.5rem' }} role="alert">
                  <AlertTriangle size={24} style={{ color: 'var(--warning)', flexShrink: 0, marginTop: '0.1rem' }} />
                  <div>
                    <strong>Alerta de Presupuesto Ajustado:</strong> El costo de esta canasta básica representa una porción muy alta de tus ingresos ({basketPercentageOfSalary}%). Te sugerimos optar por una compra económica, reducir la cantidad de productos, o comparar precios para recortar el gasto.
                  </div>
                </div>
              ) : (
                <div className="success-box" style={{ backgroundColor: 'var(--success-light)', border: '1px solid #bbf7d0', color: '#14532d', borderRadius: '8px', padding: '1rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  <CheckCircle size={20} style={{ color: 'var(--success)', flexShrink: 0, marginTop: '0.15rem' }} />
                  <div>
                    <strong>Presupuesto Viable:</strong> El costo estimado de la canasta representa el {basketPercentageOfSalary}% de tu sueldo, manteniéndose dentro o muy cerca de los límites sugeridos para el bienestar financiero del hogar.
                  </div>
                </div>
              )}

              {/* CTA Button to Module 1 Comparador */}
              <div className="text-center" style={{ margin: '1.5rem 0' }}>
                <p style={{ fontSize: '0.9rem', marginBottom: '0.75rem' }}>¿Quieres ver en cuál supermercado dominicano te sale más económica esta canasta?</p>
                <Link to="/comparador-supermercados-rd" className="btn btn-success btn-block" style={{ gap: '0.5rem' }}>
                  Cotizar en Comparador de Supermercados <ArrowRight size={18} />
                </Link>
              </div>

              <AdSlot id="supergasto-after-results" placement="Gasto Supermercado - Después de Resultados" />

              <div className="financial-disclaimer" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '1rem' }}>
                <p><strong>Nota aclaratoria:</strong> Estos cálculos son estimados y tienen fines educativos e ilustrativos. No sustituyen asesoría financiera profesional.</p>
              </div>
            </div>
          ) : (
            <EmptyStateCard
              title="Calcula tu Límite en el Súper"
              description="Introduce tu sueldo mensual y los detalles de tu hogar a la izquierda para ver tu presupuesto saludable recomendado y compararlo con el costo real estimado de la canasta básica."
              icon={DollarSign}
            />
          )}
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <DisclaimerBox type="finanzas" />
      </div>

      <AdSlot id="supergasto-before-faq" placement="Gasto Supermercado - Antes del FAQ" />

      <div className="card" style={{ marginTop: '2rem' }}>
        <FAQSection items={superGastoFAQs} />
      </div>

      <AdSlot id="supergasto-before-footer" placement="Gasto Supermercado - Antes del Footer" />

      <style>{`
        .financial-disclaimer {
          font-style: italic;
        }

        @media (max-width: 768px) {
          .grid-2 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
