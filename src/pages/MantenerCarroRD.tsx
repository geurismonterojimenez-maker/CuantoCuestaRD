import {
  useState } from 'react';
import { Link } from 'react-router-dom';
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
  TrendingUp,
  Info,
  DollarSign,
  TrendingDown
} from 'lucide-react';

export default function MantenerCarroRD() {
  const [cuota, setCuota] = useState<string>('');
  const [seguro, setSeguro] = useState<string>('');
  const [combustibleSemanal, setCombustibleSemanal] = useState<string>('');
  const [mantenimiento, setMantenimiento] = useState<string>('');
  const [lavado, setLavado] = useState<string>('');
  const [parqueo, setParqueo] = useState<string>('');
  const [marbeteAnual, setMarbeteAnual] = useState<string>('1500'); // default cheapest marbete
  const [gomasAnual, setGomasAnual] = useState<string>('');
  const [imprevistos, setImprevistos] = useState<string>('');
  const [sueldo, setSueldo] = useState<string>('');

  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const faqItems: FAQItem[] = [
    {
      question: '¿Cuánto cuesta mantener un carro en RD en promedio?',
      answer: 'Para un vehículo compacto o de gama media, el costo promedio de mantenimiento mensual (sin contar la cuota de préstamo) oscila entre RD$ 10,000 y RD$ 18,000. Si le sumamos una cuota de préstamo bancario, este costo mensual real se eleva fácilmente a entre RD$ 25,000 y RD$ 45,000.'
    },
    {
      question: '¿Qué gastos ocultos se suelen olvidar al comprar un carro?',
      answer: 'Muchas personas solo piensan en la cuota mensual del banco. Sin embargo, suelen olvidar los costos del seguro full (que puede representar miles de pesos al mes), el marbete anual, la renovación de gomas (cada 2 o 3 años), los peajes, parqueos vigilados y el fondo de imprevistos mecánicos.'
    },
    {
      question: '¿Cuánto cuesta el marbete en la República Dominicana?',
      answer: 'La tarifa del marbete (impuesto de circulación de vehículos) se establece por el año de fabricación del vehículo. Para vehículos fabricados hasta el año 2020 inclusive, el costo es de RD$ 1,500. Para vehículos fabricados del año 2021 en adelante, el costo de renovación anual es de RD$ 3,000.'
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
    'name': 'Calculadora de Costo Real de Mantener un Carro en RD - CuantoCuestaRD',
    'operatingSystem': 'All',
    'applicationCategory': 'FinanceApplication',
    'description': 'Estima el costo mensual y anual real de mantener un vehículo en RD, incluyendo seguros, combustible, parqueo, marbete, gomas e imprevistos.',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'DOP'
    }
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const inputs = [
      cuota, seguro, combustibleSemanal, mantenimiento, lavado, 
      parqueo, marbeteAnual, gomasAnual, imprevistos, sueldo
    ];

    if (inputs.some(val => Number(val) < 0)) {
      setError('Los montos ingresados no pueden ser negativos.');
      return;
    }

    const totalCheck = inputs.slice(0, 9).reduce((acc, curr) => acc + (Number(curr) || 0), 0);
    if (totalCheck === 0) {
      setError('Por favor, ingresa al menos algunos gastos para realizar el cálculo.');
      return;
    }

    setShowResults(true);
  };

  const handleReset = () => {
    setCuota('');
    setSeguro('');
    setCombustibleSemanal('');
    setMantenimiento('');
    setLavado('');
    setParqueo('');
    setMarbeteAnual('1500');
    setGomasAnual('');
    setImprevistos('');
    setSueldo('');
    setError(null);
    setShowResults(false);
  };

  // Calculations
  const valCuota = Number(cuota) || 0;
  const valSeguro = Number(seguro) || 0;
  const valCombSem = Number(combustibleSemanal) || 0;
  const valMant = Number(mantenimiento) || 0;
  const valLav = Number(lavado) || 0;
  const valParq = Number(parqueo) || 0;
  const valMarbete = Number(marbeteAnual) || 0;
  const valGomas = Number(gomasAnual) || 0;
  const valImprev = Number(imprevistos) || 0;
  const valSueldo = Number(sueldo) || 0;

  // Monthly equivalents
  const combMensual = Math.round(valCombSem * 4.33);
  const marbeteMensual = Math.round(valMarbete / 12);
  const gomasMensual = Math.round(valGomas / 12);

  const costoMensualReal = valCuota + valSeguro + combMensual + valMant + valLav + valParq + marbeteMensual + gomasMensual + valImprev;
  const costoAnualReal = costoMensualReal * 12;

  // Find highest spending category
  const categories = [
    { name: 'Cuota de préstamo', value: valCuota, key: 'cuota' },
    { name: 'Seguro del vehículo', value: valSeguro, key: 'seguro' },
    { name: 'Combustible', value: combMensual, key: 'combustible' },
    { name: 'Mantenimiento de taller', value: valMant, key: 'mantenimiento' },
    { name: 'Lavado / Estética', value: valLav, key: 'lavado' },
    { name: 'Parqueo y Peajes', value: valParq, key: 'parqueo' },
    { name: 'Marbete anual prorrateado', value: marbeteMensual, key: 'marbete' },
    { name: 'Gomas y Reparaciones anuales', value: gomasMensual, key: 'gomas' },
    { name: 'Fondo de imprevistos', value: valImprev, key: 'imprevistos' }
  ];

  const highestCat = categories.reduce((max, curr) => curr.value > max.value ? curr : max, { name: 'Ninguno', value: 0, key: '' });

  // Diagnosis
  let diagnosticClass = 'diag-green';
  let diagnosticText = 'Económico';
  let diagnosticAdvice = '¡Excelente! Los costos de tu vehículo representan un impacto muy bajo en tus finanzas o en el presupuesto nacional de tenencia de carros.';

  if (valSueldo > 0) {
    const ratio = (costoMensualReal / valSueldo) * 100;
    if (ratio > 50) {
      diagnosticClass = 'diag-red';
      diagnosticText = 'Riesgoso';
      diagnosticAdvice = `¡Cuidado! El costo de mantener este carro consume el ${Math.round(ratio)}% de tu sueldo neto. Es financieramente peligroso comprometer más de la mitad de tus ingresos en transporte. Considera buscar un auto con menor consumo o cuota de préstamo.`;
    } else if (ratio >= 35) {
      diagnosticClass = 'diag-orange';
      diagnosticText = 'Caro';
      diagnosticAdvice = `El vehículo consume el ${Math.round(ratio)}% de tus ingresos netos. Se clasifica como un costo alto para tu nivel salarial. Revisa si puedes recortar en combustible compartiendo rutas o ahorrando en lavados.`;
    } else if (ratio >= 15) {
      diagnosticClass = 'diag-blue';
      diagnosticText = 'Moderado';
      diagnosticAdvice = `El vehículo consume el ${Math.round(ratio)}% de tus ingresos netos. Es un rango aceptable y manejable para la mayoría de profesionales dominicanos. Sigue controlando tus mantenimientos preventivos.`;
    }
  } else {
    // Benchmark diagnosis without salary
    if (costoMensualReal > 50000) {
      diagnosticClass = 'diag-red';
      diagnosticText = 'Riesgoso / Muy Alto';
      diagnosticAdvice = 'Un presupuesto vehicular que supera los RD$ 50,000 mensuales es sumamente elevado para el mercado dominicano general. Requiere un sueldo neto familiar superior a los RD$ 150,000 para sostenerse con salud financiera.';
    } else if (costoMensualReal > 30000) {
      diagnosticClass = 'diag-orange';
      diagnosticText = 'Caro';
      diagnosticAdvice = 'Mantener este carro te cuesta más de RD$ 30,000 al mes. Se recomienda revisar los consumos de combustible y los intereses del financiamiento para optimizar costos.';
    } else if (costoMensualReal > 15000) {
      diagnosticClass = 'diag-blue';
      diagnosticText = 'Moderado';
      diagnosticAdvice = 'Costo de tenencia regular en RD. Para un carro compacto o jeepeta de uso promedio diario, este presupuesto está dentro de los rangos estándares del país.';
    }
  }

  return (
    <div className="mantener-carro-page">
      <SEOHead 
        title="Cuánto cuesta mantener un carro en RD | Costo Mensual"
        description="Calcula el costo real mensual de mantener un carro en RD, incluyendo cuota, seguro, combustible, mantenimiento, marbete e imprevistos."
        schema={[faqSchema, appSchema]}
      />

      <PageHero 
        category="vehiculos"
        title="Mantener un Carro"
        description="Proyecta los costos de combustible, seguros, mantenimiento y depreciación de tu auto."
        icon={TrendingDown}
        chips={["mantener","carro","vehiculo"]}
      />

      <AdSlot id="carro-under-hero" placement="Mantener Carro - Debajo del Hero" />

      <div className="grid-2">
        {/* Form Column */}
        <div className="card">
          <h2>Todos tus Gastos del Vehículo</h2>
          <p>Escribe los montos aproximados en RD$ de las categorías que apliquen a tu caso.</p>

          {error && (
            <div className="error-alert" role="alert">
              <AlertTriangle size={20} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleCalculate}>
            <div className="form-section-title">1. Financiamiento y Seguros</div>

            <div className="grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-cuota" className="form-label">Cuota mensual del préstamo (RD$):</label>
                <input 
                  id="input-cuota"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 18000"
                  value={cuota}
                  onChange={(e) => setCuota(e.target.value)}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-seguro" className="form-label">Seguro mensual (RD$):</label>
                <input 
                  id="input-seguro"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 3500"
                  value={seguro}
                  onChange={(e) => setSeguro(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div className="form-section-title">2. Uso y Mantenimiento Diario</div>

            <div className="grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-combustible" className="form-label">Combustible semanal (RD$):</label>
                <input 
                  id="input-combustible"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 2500"
                  value={combustibleSemanal}
                  onChange={(e) => setCombustibleSemanal(e.target.value)}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-mantenimiento" className="form-label">Mantenimiento mensual (RD$):</label>
                <input 
                  id="input-mantenimiento"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 1500 (Aceite, etc.)"
                  value={mantenimiento}
                  onChange={(e) => setMantenimiento(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div className="grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-lavado" className="form-label">Lavado mensual (RD$):</label>
                <input 
                  id="input-lavado"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 800"
                  value={lavado}
                  onChange={(e) => setLavado(e.target.value)}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-parqueo" className="form-label">Parqueos y peajes mensual (RD$):</label>
                <input 
                  id="input-parqueo"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 500"
                  value={parqueo}
                  onChange={(e) => setParqueo(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div className="form-section-title">3. Gastos Anuales y de Emergencia</div>

            <div className="grid-3" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
              <div className="form-group">
                <label htmlFor="input-marbete" className="form-label">Marbete anual (RD$):</label>
                <select 
                  id="input-marbete" 
                  className="form-control" 
                  value={marbeteAnual} 
                  onChange={(e) => setMarbeteAnual(e.target.value)}
                >
                  <option value="1500">RD$ 1,500 (Hasta 2020)</option>
                  <option value="3000">RD$ 3,000 (2021 adelante)</option>
                  <option value="0">Exento o RD$ 0</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="input-gomas" className="form-label">Gomas/Reparación anual:</label>
                <input 
                  id="input-gomas"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 18000"
                  value={gomasAnual}
                  onChange={(e) => setGomasAnual(e.target.value)}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-imprevistos" className="form-label">Fondo imprevisto mensual:</label>
                <input 
                  id="input-imprevistos"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 1500"
                  value={imprevistos}
                  onChange={(e) => setImprevistos(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div className="form-section-title">4. Ingresos (Opcional)</div>
            <div className="form-group">
              <label htmlFor="input-sueldo" className="form-label">Sueldo mensual neto (RD$):</label>
              <input 
                id="input-sueldo"
                type="number"
                className="form-control"
                placeholder="Ej. 70000"
                value={sueldo}
                onChange={(e) => setSueldo(e.target.value)}
                min="0"
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button type="button" className="btn btn-secondary" onClick={handleReset} style={{ flex: 1 }}>
                <RotateCcw size={18} /> Limpiar
              </button>
              <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
                Calcular costo real
              </button>
            </div>
          </form>
        </div>

        {/* Results Column */}
        <div className="results-column">
          {showResults ? (
            <div className="card result-card" style={{ height: '100%' }}>
              <h2>Costo de Mantener el Vehículo</h2>

              <div className="main-cost-display" style={{ padding: '1.25rem 1rem' }}>
                <span className="main-cost-title">Gasto Real Mensual Total</span>
                <span className="main-cost-value">
                  RD$ {costoMensualReal.toLocaleString()}
                </span>
                
                <span className="main-cost-title" style={{ marginTop: '0.75rem' }}>Gasto Anual Estimado</span>
                <span className="main-cost-value" style={{ fontSize: '1.4rem', color: 'var(--text-muted)' }}>
                  RD$ {costoAnualReal.toLocaleString()}
                </span>
              </div>

              <div className="diagnostic-badge-wrapper text-center" style={{ margin: '1rem 0' }}>
                <span className={`diagnostic-badge ${diagnosticClass}`} style={{ fontSize: '1rem', padding: '0.5rem 1.25rem' }}>
                  Impacto: <strong>{diagnosticText}</strong>
                </span>
              </div>

              {/* Dominican Quote Phrase */}
              <div className="dominican-quote" style={{ borderLeftColor: 'var(--primary)' }}>
                <p>
                  "Este vehículo no solo te cuesta la cuota mensual. Sumando seguro, combustible, mantenimiento, marbete e imprevistos mecánicos, tener este carro podría costarte aproximadamente <strong>RD$ {costoMensualReal.toLocaleString()} al mes</strong>."
                </p>
              </div>

              {/* Highest Expenditure Category */}
              {highestCat.value > 0 && (
                <div className="warning-alert" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', backgroundColor: 'var(--primary-light)', borderColor: 'var(--primary)', color: 'var(--text-main)', margin: '1.5rem 0', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--primary)' }}>
                    <TrendingUp size={20} />
                    <span>Mayor Salida de Dinero: {highestCat.name}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                    Representa el <strong>{Math.round((highestCat.value / costoMensualReal) * 100)}%</strong> de lo que te cuesta el vehículo mensualmente.
                  </p>
                </div>
              )}

              {/* Advisory Box */}
              <div className="recommendation-box" style={{ margin: '1.5rem 0' }}>
                <h3 className="flex-between">
                  <span>Diagnóstico Financiero:</span>
                  <Info size={18} />
                </h3>
                <p>{diagnosticAdvice}</p>
              </div>

              {/* Cross Connections */}
              <div className="connections-actions" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '1.5rem 0' }}>
                <Link to="/calculadora-presupuesto-mensual-rd" className="btn btn-secondary btn-block">
                  Organizar mi presupuesto <ArrowRight size={16} />
                </Link>
                <Link to="/costo-de-vida-rd" className="btn btn-success btn-block">
                  Calcular costo de vida general <ArrowRight size={16} />
                </Link>
              </div>

              <AdSlot id="carro-after-results" placement="Mantener Carro - Después de Resultados" />

              <div className="financial-disclaimer" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '1rem' }}>
                <p><strong>Nota aclaratoria:</strong> Estos cálculos son estimados y tienen fines informativos. Las cuotas, tasas, seguros, combustibles, mantenimientos y costos reales pueden variar según banco, dealer, aseguradora, tipo de vehículo, uso y condiciones del mercado.</p>
              </div>
            </div>
          ) : (
            <EmptyStateCard
              title="Costo Real de Mantener un Carro"
              description="Completa el formulario ingresando tus egresos por combustible, cuota, mantenimiento y marbete para estimar cuánto dinero anual y mensual real gasta tu carro en RD."
              icon={DollarSign}
            />
          )}
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <DisclaimerBox type="vehiculos" />
      </div>

      <AdSlot id="carro-before-faq" placement="Mantener Carro - Antes del FAQ" />

      <div className="card" style={{ marginTop: '2rem' }}>
        <FAQSection items={faqItems} />
      </div>

      <AdSlot id="carro-before-footer" placement="Mantener Carro - Antes del Footer" />

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
