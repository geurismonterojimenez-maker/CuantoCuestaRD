import { useState } from 'react';
import SEOHead from '../components/SEOHead';
import PageHero from '../components/PageHero';
import EmptyStateCard from '../components/EmptyStateCard';
import DisclaimerBox from '../components/DisclaimerBox';
import AdSlot from '../components/AdSlot';
import FAQSection, { type FAQItem } from '../components/FAQSection';
import { 
  RotateCcw, 
  AlertTriangle, 
  ShieldAlert, 
  ShieldCheck,
  Shield
} from 'lucide-react';

export default function DeudasIngresos() {
  const [sueldo, setSueldo] = useState<string>('');
  const [prestamos, setPrestamos] = useState<string>('');
  const [tarjetas, setTarjetas] = useState<string>('');
  const [financiamientos, setFinanciamientos] = useState<string>('');
  const [apartados, setApartados] = useState<string>('');
  const [otrasDeudas, setOtrasDeudas] = useState<string>('');

  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const deudasFAQs: FAQItem[] = [
    {
      question: '¿Cuál es el límite saludable de deudas mensuales?',
      answer: 'Los asesores financieros y entidades bancarias recomiendan que tus compromisos de deuda mensuales no superen el 30% o 35% de tus ingresos netos. Esto te asegura tener suficiente capital para cubrir vivienda, alimentación y transporte.'
    },
    {
      question: '¿Por qué las tarjetas de crédito son deudas de alto riesgo?',
      answer: 'En República Dominicana, las tarjetas de crédito tienen tasas de interés que rondan el 60% anual. Si solo realizas el "pago mínimo", la mayor parte de tu abono se va en pagar intereses y la deuda principal apenas disminuye.'
    },
    {
      question: '¿Qué estrategias existen para reducir las deudas rápido?',
      answer: 'Puedes usar el Método Bola de Nieve (pagar primero las deudas de menor saldo para ganar motivación) o el Método Avalancha (pagar primero la deuda con la tasa de interés más alta). Otra opción viable es solicitar un préstamo de consolidación de deudas en una cooperativa o banco local a menor tasa.'
    }
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': deudasFAQs.map((faq) => ({
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
    'name': 'Calculadora de Deudas vs Ingresos RD - CuantoCuestaRD',
    'operatingSystem': 'All',
    'applicationCategory': 'FinanceApplication',
    'description': 'Calcula tu porcentaje de endeudamiento mensual en República Dominicana y evalúa tu nivel de riesgo financiero.',
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

    const inputs = [prestamos, tarjetas, financiamientos, apartados, otrasDeudas];
    if (inputs.some(val => Number(val) < 0)) {
      setError('Los montos ingresados no pueden ser negativos.');
      return;
    }

    setShowResults(true);
  };

  const handleReset = () => {
    setSueldo('');
    setPrestamos('');
    setTarjetas('');
    setFinanciamientos('');
    setApartados('');
    setOtrasDeudas('');
    setError(null);
    setShowResults(false);
  };

  // Calculations
  const valSueldo = Number(sueldo) || 0;
  const valPrest = Number(prestamos) || 0;
  const valTarj = Number(tarjetas) || 0;
  const valFinan = Number(financiamientos) || 0;
  const valApart = Number(apartados) || 0;
  const valOtros = Number(otrasDeudas) || 0;

  const totalDeudas = valPrest + valTarj + valFinan + valApart + valOtros;
  const dineroLibre = valSueldo - totalDeudas;
  const porcentajeEndeudamiento = valSueldo > 0 ? Math.round((totalDeudas / valSueldo) * 100) : 0;

  // Risk Classification
  let riskLevel: 'bajo' | 'medio' | 'alto' = 'bajo';
  let riskLabel = '';
  let riskClass = '';
  let advice = '';

  if (porcentajeEndeudamiento <= 30) {
    riskLevel = 'bajo';
    riskClass = 'risk-low';
    riskLabel = 'Bajo';
    advice = 'Tu nivel de endeudamiento es saludable. Tus compromisos mensuales representan menos del 30% de tus ingresos, lo cual es ideal y te permite manejar imprevistos con solvencia. Evita adquirir préstamos innecesarios o fiar compras de consumo rápido.';
  } else if (porcentajeEndeudamiento <= 40) {
    riskLevel = 'medio';
    riskClass = 'risk-medium';
    riskLabel = 'Medio';
    advice = 'Estás en la zona de advertencia. Tus deudas consumen una porción notable de tus ingresos. Es momento de frenar cualquier nuevo endeudamiento, cancelar tarjetas de crédito secundarias y destinar excedentes al pago del capital para regresar a un nivel de riesgo bajo.';
  } else {
    riskLevel = 'alto';
    riskClass = 'risk-high';
    riskLabel = 'Alto / Crítico';
    advice = '¡Riesgo Financiero Alto! Más del 40% de tu sueldo se va solo en pagar deudas. Si a esto le sumas alquiler, alimentación y transporte, es probable que no te alcance el dinero o estés recurriendo a nuevas deudas para pagar las anteriores. Te urge buscar una consolidación de deudas en una institución cooperativa formal a menor tasa de interés o renegociar plazos con tus acreedores.';
  }

  return (
    <div className="deudas-page">
      <SEOHead 
        title="Calculadora de Deudas vs Ingresos RD"
        description="Calcula qué porcentaje de tu sueldo se va en deudas, préstamos, tarjetas y financiamientos en República Dominicana."
        schema={[faqSchema, appSchema]}
      />

      <PageHero 
        category="finanzas"
        title="Deudas vs Ingresos"
        description="Calcula tu ratio de endeudamiento mensual y evalúa tu nivel de riesgo financiero actual."
        icon={ShieldAlert}
        chips={["deudas","ingresos","endeudamiento"]}
      />

      <AdSlot id="deudas-under-hero" placement="Deudas - Debajo del Hero" />

      <div className="grid-2">
        {/* Form Column */}
        <div className="card">
          <h2>Tus Ingresos y Cuotas de Deuda</h2>
          <p>Ingresa el monto neto que recibes al mes y el valor de las cuotas de tus compromisos vigentes.</p>

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

            <div className="form-section-title">Desglose de Cuotas de Deuda</div>

            <div className="grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-prestamos" className="form-label">Préstamos bancarios / personales:</label>
                <input 
                  id="input-prestamos"
                  type="number"
                  className="form-control"
                  placeholder="0"
                  value={prestamos}
                  onChange={(e) => setPrestamos(e.target.value)}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-tarjetas" className="form-label">Tarjetas de Crédito (Pagos promedio):</label>
                <input 
                  id="input-tarjetas"
                  type="number"
                  className="form-control"
                  placeholder="0"
                  value={tarjetas}
                  onChange={(e) => setTarjetas(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div className="grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-finan" className="form-label">Financiamientos (Carro, Electrodomésticos):</label>
                <input 
                  id="input-financiamiento"
                  type="number"
                  className="form-control"
                  placeholder="0"
                  value={financiamientos}
                  onChange={(e) => setFinanciamientos(e.target.value)}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-apartados" className="form-label">Apartados / Cuotas informales:</label>
                <input 
                  id="input-apartados"
                  type="number"
                  className="form-control"
                  placeholder="0"
                  value={apartados}
                  onChange={(e) => setApartados(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="input-otras" className="form-label">Otras deudas mensuales (Fiados, etc.):</label>
              <input 
                id="input-otras"
                type="number"
                className="form-control"
                placeholder="0"
                value={otrasDeudas}
                onChange={(e) => setOtrasDeudas(e.target.value)}
                min="0"
              />
            </div>

            <div className="step-actions flex-between" style={{ gap: '1rem' }}>
              <button type="button" className="btn btn-secondary" onClick={handleReset} style={{ flex: 1 }}>
                <RotateCcw size={18} /> Limpiar
              </button>
              <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
                Calcular Riesgo
              </button>
            </div>
          </form>
        </div>

        {/* Results Column */}
        <div className="results-column">
          {showResults ? (
            <div className="card result-card" style={{ height: '100%' }}>
              <h2>Tu Nivel de Endeudamiento</h2>

              <div className="main-cost-display" style={{ padding: '1.25rem 1rem' }}>
                <span className="main-cost-title">Total de Deudas al Mes</span>
                <span className="main-cost-value" style={{ color: riskLevel === 'alto' ? 'var(--danger)' : 'var(--text-main)' }}>
                  RD$ {totalDeudas.toLocaleString()}
                </span>
              </div>

              <div className="diagnostic-badge-wrapper text-center">
                <span className={`diagnostic-badge ${riskClass}`}>
                  Riesgo {riskLabel}
                </span>
              </div>

              {/* Phrasing required by user */}
              <div className="dominican-quote" style={{ borderLeftColor: riskLevel === 'bajo' ? 'var(--success)' : riskLevel === 'medio' ? 'var(--warning)' : 'var(--danger)' }}>
                <p>
                  "Tus deudas representan el <strong>{porcentajeEndeudamiento}% de tu sueldo</strong>. Eso puede ser <strong>{riskLevel === 'bajo' ? 'saludable y cómodo' : riskLevel === 'medio' ? 'un poco ajustado' : 'muy alto'}</strong> si también tienes alquiler, supermercado y transporte."
                </p>
              </div>

              {/* Financial Metrics Cards */}
              <div className="grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                <div className="freq-box">
                  <span className="freq-label">Ingresos Libres Restantes</span>
                  <span className="freq-val" style={{ fontSize: '1.15rem', color: dineroLibre < 0 ? 'var(--danger)' : 'var(--success)' }}>
                    RD$ {dineroLibre.toLocaleString()}
                  </span>
                </div>
                <div className="freq-box">
                  <span className="freq-label">Porcentaje de Endeudamiento</span>
                  <span className="freq-val" style={{ fontSize: '1.15rem' }}>{porcentajeEndeudamiento}%</span>
                </div>
              </div>

              <div className="recommendation-box">
                <h3 className="flex-between">
                  {riskLevel === 'bajo' && <ShieldCheck size={20} className="text-success" />}
                  {riskLevel === 'medio' && <Shield size={20} className="text-warning" />}
                  {riskLevel === 'alto' && <ShieldAlert size={20} className="text-danger" />}
                  <span>Consejo Práctico:</span>
                </h3>
                <p>{advice}</p>
              </div>

              <AdSlot id="deudas-after-results" placement="Deudas - Después de Resultados" />

              <div className="financial-disclaimer" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '1rem' }}>
                <p><strong>Nota aclaratoria:</strong> Estos cálculos son estimados y tienen fines educativos e ilustrativos. No sustituyen asesoría financiera profesional.</p>
              </div>
            </div>
          ) : (
            <EmptyStateCard
              title="Evalúa tu Nivel de Riesgo"
              description="Coloca tu salario y las cuotas de tus compromisos de préstamos y tarjetas a la izquierda para evaluar tu porcentaje de endeudamiento y recibir estrategias recomendadas."
              icon={ShieldAlert}
            />
          )}
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <DisclaimerBox type="finanzas" />
      </div>

      <AdSlot id="deudas-before-faq" placement="Deudas - Antes del FAQ" />

      <div className="card" style={{ marginTop: '2rem' }}>
        <FAQSection items={deudasFAQs} />
      </div>

      <AdSlot id="deudas-before-footer" placement="Deudas - Antes del Footer" />

      <style>{`
        .form-section-title {
          font-weight: 600;
          font-size: 1.1rem;
          color: var(--primary);
          border-bottom: 2px solid var(--primary-light);
          padding-bottom: 0.25rem;
          margin: 1.5rem 0 1rem 0;
        }

        .risk-low {
          background-color: var(--success-light);
          color: var(--success);
          border: 1px solid #bbf7d0;
        }

        .risk-medium {
          background-color: var(--warning-light);
          color: var(--warning);
          border: 1px solid #fef3c7;
        }

        .risk-high {
          background-color: var(--danger-light);
          color: var(--danger);
          border: 1px solid #fecaca;
        }

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
