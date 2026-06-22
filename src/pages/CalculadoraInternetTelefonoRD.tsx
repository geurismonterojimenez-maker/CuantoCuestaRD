import {
  useState } from 'react';
import { Link } from 'react-router-dom';
import { formatRD,
  parseInputNumber } from '../utils/helpers';
import SEOHead from '../components/SEOHead';
import PageHero from '../components/PageHero';
import EmptyStateCard from '../components/EmptyStateCard';
import DisclaimerBox from '../components/DisclaimerBox';
import AdSlot from '../components/AdSlot';
import FAQSection,
  { type FAQItem } from '../components/FAQSection';
import { 
  RotateCcw,
  AlertTriangle,
  ArrowRight,
  Smartphone,
  Wifi
} from 'lucide-react';

export default function CalculadoraInternetTelefonoRD() {
  const [internetResidencial, setInternetResidencial] = useState<string>('');
  const [cableTV, setCableTV] = useState<string>('');
  const [streaming, setStreaming] = useState<string>('');
  const [planMovilPersonal, setPlanMovilPersonal] = useState<string>('');
  const [planMovilFamiliar, setPlanMovilFamiliar] = useState<string>('');
  const [lineasCount, setLineasCount] = useState<string>('1');
  const [otrosDigitales, setOtrosDigitales] = useState<string>('');

  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: '¿Cuánto cuesta un plan de internet en República Dominicana?',
      answer: 'Los planes de internet de banda ancha residencial fibra óptica oscilan entre RD$ 1,500 y RD$ 3,000 mensuales, dependiendo de la velocidad contratada (comúnmente de 50 Mbps a 200 Mbps).'
    },
    {
      question: '¿Cómo puedo ahorrar en planes de teléfono móvil y residencial?',
      answer: 'Muchas compañías de telecomunicaciones en RD (como Claro y Altice) ofrecen planes combinados (Multiplay o Triple Play) que integran internet, cable y teléfono fijo con un descuento del 10% al 20% frente a la contratación por separado.'
    },
    {
      question: '¿Qué se considera un gasto alto en conectividad?',
      answer: 'Se recomienda que el gasto total de internet y telecomunicaciones no supere el 5% al 7% del presupuesto mensual neto personal o familiar. Si pagas más, podrías estar sobrepagando por megas o canales de TV que no utilizas.'
    }
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqItems.map((faq) => ({
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
    'name': 'Calculadora de Internet y Teléfono RD - CuantoCuestaRD',
    'operatingSystem': 'All',
    'applicationCategory': 'FinanceApplication',
    'description': 'Calcula cuánto gastas al mes en internet residencial, cable, planes móviles y servicios de streaming en RD.',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'DOP'
    }
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const valInternet = parseInputNumber(internetResidencial);
    const valCable = parseInputNumber(cableTV);
    const valStreaming = parseInputNumber(streaming);
    const valMovilPersonal = parseInputNumber(planMovilPersonal);
    const valMovilFamiliar = parseInputNumber(planMovilFamiliar);
    const valLineas = parseInputNumber(lineasCount) || 1;
    const valOtros = parseInputNumber(otrosDigitales);

    if (
      Number(internetResidencial) < 0 ||
      Number(cableTV) < 0 ||
      Number(streaming) < 0 ||
      Number(planMovilPersonal) < 0 ||
      Number(planMovilFamiliar) < 0 ||
      Number(lineasCount) < 0 ||
      Number(otrosDigitales) < 0
    ) {
      setError('Los montos ingresados no pueden ser negativos.');
      return;
    }

    if (
      valInternet === 0 && valCable === 0 && valStreaming === 0 &&
      valMovilPersonal === 0 && valMovilFamiliar === 0 && valOtros === 0
    ) {
      setError('Por favor, ingresa al menos un concepto de conectividad.');
      return;
    }

    if (valLineas <= 0) {
      setError('La cantidad de líneas debe ser al menos 1.');
      return;
    }

    setShowResults(true);
  };

  const handleReset = () => {
    setInternetResidencial('');
    setCableTV('');
    setStreaming('');
    setPlanMovilPersonal('');
    setPlanMovilFamiliar('');
    setLineasCount('1');
    setOtrosDigitales('');
    setError(null);
    setShowResults(false);
  };

  // Calculations
  const valInternet = parseInputNumber(internetResidencial);
  const valCable = parseInputNumber(cableTV);
  const valStreaming = parseInputNumber(streaming);
  const valMovilPersonal = parseInputNumber(planMovilPersonal);
  const valMovilFamiliar = parseInputNumber(planMovilFamiliar);
  const valLineas = parseInputNumber(lineasCount) || 1;
  const valOtros = parseInputNumber(otrosDigitales);

  const totalMensual = valInternet + valCable + valStreaming + valMovilPersonal + valMovilFamiliar + valOtros;
  const totalAnual = totalMensual * 12;
  const costoPorPersona = Math.round(totalMensual / valLineas);

  return (
    <div className="telecoms-page">
      <SEOHead 
        title="Calculadora de Internet y Teléfono RD"
        description="Calcula cuánto gastas al mes en internet, cable, streaming y teléfono móvil."
        schema={[faqSchema, appSchema]}
      />

      <PageHero 
        category="hogar"
        title="Internet y Teléfono"
        description="Organiza tus planes de conectividad residencial, servicios de streaming y líneas móviles."
        icon={Wifi}
        chips={["internet","telefono","cable"]}
      />

      <AdSlot id="telecoms-under-hero" placement="Conectividad - Debajo del Hero" />

      <div className="grid-2">
        {/* Form Column */}
        <div className="card">
          <h2>Tus Planes de Comunicación</h2>
          <p>Indica el costo de tus contratos de telecomunicaciones en pesos (RD$).</p>

          {error && (
            <div className="error-alert" role="alert">
              <AlertTriangle size={20} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleCalculate}>
            <div className="form-section-title">1. Conexión del Hogar</div>
            <div className="grid-2" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-internet" className="form-label">Internet Residencial (RD$):</label>
                <input 
                  id="input-internet"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 1800"
                  value={internetResidencial}
                  onChange={(e) => setInternetResidencial(e.target.value)}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-cable" className="form-label">Cable / TV de pago (RD$):</label>
                <input 
                  id="input-cable"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 1200"
                  value={cableTV}
                  onChange={(e) => setCableTV(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div className="form-section-title">2. Dispositivos Móviles</div>
            <div className="grid-2" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-plan-personal" className="form-label">Plan Móvil Personal (RD$):</label>
                <input 
                  id="input-plan-personal"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 700"
                  value={planMovilPersonal}
                  onChange={(e) => setPlanMovilPersonal(e.target.value)}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-plan-familiar" className="form-label">Plan Móvil Familiar (Multi):</label>
                <input 
                  id="input-plan-familiar"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 2500"
                  value={planMovilFamiliar}
                  onChange={(e) => setPlanMovilFamiliar(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div className="grid-2" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-lineas" className="form-label">Cantidad de líneas a dividir:</label>
                <input 
                  id="input-lineas"
                  type="number"
                  className="form-control"
                  value={lineasCount}
                  onChange={(e) => setLineasCount(e.target.value)}
                  min="1"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-streaming" className="form-label">Streaming (Netflix, Spotify):</label>
                <input 
                  id="input-streaming"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 600"
                  value={streaming}
                  onChange={(e) => setStreaming(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div className="form-section-title">3. Otros Servicios Digitales</div>
            <div className="form-group">
              <label htmlFor="input-otros" className="form-label">Otros gastos digitales (almacenamiento Cloud, etc.):</label>
              <input 
                id="input-otros"
                type="number"
                className="form-control"
                placeholder="Ej. 150 (iCloud, Google One)"
                value={otrosDigitales}
                onChange={(e) => setOtrosDigitales(e.target.value)}
                min="0"
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button type="button" className="btn btn-secondary" onClick={handleReset} style={{ flex: 1 }}>
                <RotateCcw size={18} /> Limpiar
              </button>
              <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
                Calcular conectividad
              </button>
            </div>
          </form>
        </div>

        {/* Results Column */}
        <div className="results-column">
          {showResults ? (
            <div className="card result-card" style={{ height: '100%' }}>
              <h2>Costo Total en Conectividad</h2>

              <div className="main-cost-display" style={{ padding: '1.25rem 1rem' }}>
                <span className="main-cost-title">Gasto mensual consolidado</span>
                <span className="main-cost-value">
                  {formatRD(totalMensual)}
                </span>
                <span className="main-cost-title" style={{ marginTop: '0.5rem', fontSize: '0.85rem', textTransform: 'none' }}>
                  (Equivalente a {formatRD(totalAnual)} al año)
                </span>
              </div>

              {/* Dominican Quote Phrase */}
              <div className="dominican-quote" style={{ borderLeftColor: 'var(--primary)', margin: '1.5rem 0' }}>
                <p>
                  "Tus servicios digitales de conectividad representan un gasto mensual estimado de <strong>{formatRD(totalMensual)}</strong>. {valLineas > 1 && `Dado que divides entre ${valLineas} personas, el costo aproximado por persona es de ${formatRD(costoPorPersona)}.`}"
                </p>
              </div>

              {/* Recommendation message */}
              {totalMensual > 4000 && (
                <div className="dominican-quote" style={{ backgroundColor: '#fffbeb', borderLeftColor: '#f59e0b', padding: '1rem', borderRadius: '8px', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  <strong>Alerta de presupuesto:</strong> Estás gastando más de RD$ 4,000 en conectividad. Revisa si tienes suscripciones duplicadas de streaming o si puedes bajar la velocidad contratada del internet residencial.
                </div>
              )}

              {/* Breakdown */}
              <div className="budget-rules-breakdown" style={{ margin: '1.5rem 0' }}>
                <h3>Desglose de Conectividad</h3>
                {valInternet > 0 && (
                  <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.4rem', marginBottom: '0.4rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Internet Residencial:</span>
                    <span>{formatRD(valInternet)}</span>
                  </div>
                )}
                {valCable > 0 && (
                  <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.4rem', marginBottom: '0.4rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Cable / TV:</span>
                    <span>{formatRD(valCable)}</span>
                  </div>
                )}
                {valStreaming > 0 && (
                  <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.4rem', marginBottom: '0.4rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Streaming:</span>
                    <span>{formatRD(valStreaming)}</span>
                  </div>
                )}
                {(valMovilPersonal > 0 || valMovilFamiliar > 0) && (
                  <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.4rem', marginBottom: '0.4rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Planes móviles (Celular):</span>
                    <span>{formatRD(valMovilPersonal + valMovilFamiliar)}</span>
                  </div>
                )}
                {valOtros > 0 && (
                  <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.4rem', marginBottom: '0.4rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Otros servicios digitales:</span>
                    <span>{formatRD(valOtros)}</span>
                  </div>
                )}
              </div>

              {/* Cross Connections */}
              <div className="connections-actions" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '1.5rem 0' }}>
                <Link to="/me-alcanza-el-sueldo" className="btn btn-secondary btn-block">
                  ¿Me alcanza el sueldo para mis planes? <ArrowRight size={16} />
                </Link>
                <Link to="/calculadora-presupuesto-mensual-rd" className="btn btn-secondary btn-block">
                  Organizar mi presupuesto mensual
                </Link>
              </div>

              <AdSlot id="telecoms-after-results" placement="Conectividad - Después de Resultados" />

              <div className="financial-disclaimer" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '1rem' }}>
                <p><strong>Nota aclaratoria:</strong> Estos montos son estimados de referencia y tienen fines informativos. Las tarifas de internet y telefonía pueden sufrir variaciones imprevistas por el aumento de impuestos de telecomunicaciones (como el CDT de INDOTEL) o políticas comerciales de las prestadoras en RD.</p>
              </div>
            </div>
          ) : (
            <EmptyStateCard
              title="Presupuesto de Conectividad"
              description="Coloca el precio estimado de tu internet residencial, plan móvil y plataformas de entretenimiento para ver el gasto total consolidado mensual."
              icon={Smartphone}
            />
          )}
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <DisclaimerBox type="hogar" />
      </div>

      <AdSlot id="telecoms-before-faq" placement="Conectividad - Antes del FAQ" />

      <div className="card" style={{ marginTop: '2rem' }}>
        <FAQSection items={faqItems} />
      </div>

      <AdSlot id="telecoms-before-footer" placement="Conectividad - Antes del Footer" />

      <style>{`
        .form-section-title {
          font-weight: 600;
          font-size: 1.1rem;
          color: var(--primary);
          border-bottom: 2px solid var(--primary-light);
          padding-bottom: 0.25rem;
          margin: 1.5rem 0 1rem 0;
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
