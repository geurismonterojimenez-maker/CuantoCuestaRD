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
  Percent,
  Car
} from 'lucide-react';

export default function PrestamoVehiculoRD() {
  const [precio, setPrecio] = useState<string>('');
  const [inicial, setInicial] = useState<string>('');
  const [tasaAnual, setTasaAnual] = useState<string>('12'); // default common rate
  const [plazo, setPlazo] = useState<string>('60'); // default 5 years
  const [seguro, setSeguro] = useState<string>('');
  const [otrosCargos, setOtrosCargos] = useState<string>('');
  const [sueldo, setSueldo] = useState<string>('');

  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const faqItems: FAQItem[] = [
    {
      question: '¿Cuánto se debe dar de inicial para un carro en RD?',
      answer: 'Se recomienda dar al menos el 20% al 30% del valor del vehículo como inicial. Esto reduce el monto financiado, baja la cuota mensual y te ahorra miles de pesos en intereses a lo largo de la vida del préstamo.'
    },
    {
      question: '¿Qué tasa de interés es común para préstamos de vehículos en República Dominicana?',
      answer: 'Las tasas de interés varían según el año del vehículo y el tipo de financiamiento. Para vehículos nuevos, las tasas suelen oscilar entre 9.5% y 13.5% anual. En vehículos usados (de 5 años o más), las tasas de interés pueden ser más elevadas, rondando entre el 14% y el 22% anual.'
    },
    {
      question: '¿Cuánto es lo máximo de mi sueldo que debo destinar a la cuota del carro?',
      answer: 'Los asesores financieros recomiendan que la cuota del préstamo de vehículo no supere el 20% al 30% de tus ingresos netos mensuales. Si excedes este límite, pondrás en riesgo tu presupuesto para alimentación, vivienda y ahorros.'
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
    'name': 'Calculadora de Préstamo de Vehículo RD - CuantoCuestaRD',
    'operatingSystem': 'All',
    'applicationCategory': 'FinanceApplication',
    'description': 'Estima la cuota mensual de tu préstamo de vehículo en República Dominicana y analiza si se ajusta a tu sueldo.',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'DOP'
    }
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const valPrecio = Number(precio) || 0;
    const valInicial = Number(inicial) || 0;
    const valTasa = Number(tasaAnual) || 0;
    const valPlazo = Number(plazo) || 0;
    const valSeguro = Number(seguro) || 0;
    const valOtros = Number(otrosCargos) || 0;
    const valSueldo = Number(sueldo) || 0;

    if (valPrecio <= 0) {
      setError('Por favor, ingresa el precio del vehículo.');
      return;
    }
    if (valInicial < 0 || valTasa < 0 || valPlazo < 0 || valSeguro < 0 || valOtros < 0 || valSueldo < 0) {
      setError('Los montos ingresados no pueden ser negativos.');
      return;
    }
    if (valInicial >= valPrecio) {
      setError('El inicial no puede ser mayor o igual al precio total del vehículo.');
      return;
    }
    if (valPlazo <= 0) {
      setError('El plazo en meses debe ser mayor a 0.');
      return;
    }

    setShowResults(true);
  };

  const handleReset = () => {
    setPrecio('');
    setInicial('');
    setTasaAnual('12');
    setPlazo('60');
    setSeguro('');
    setOtrosCargos('');
    setSueldo('');
    setError(null);
    setShowResults(false);
  };

  // Calculations
  const valPrecio = Number(precio) || 0;
  const valInicial = Number(inicial) || 0;
  const valTasa = Number(tasaAnual) || 0;
  const valPlazo = Number(plazo) || 0;
  const valSeguro = Number(seguro) || 0;
  const valOtros = Number(otrosCargos) || 0;
  const valSueldo = Number(sueldo) || 0;

  const montoFinanciar = valPrecio - valInicial;
  
  // Amortization formula (PMT)
  let cuotaMensual = 0;
  if (montoFinanciar > 0 && valPlazo > 0) {
    if (valTasa === 0) {
      cuotaMensual = montoFinanciar / valPlazo;
    } else {
      const r = (valTasa / 100) / 12; // monthly rate
      cuotaMensual = montoFinanciar * (r * Math.pow(1 + r, valPlazo)) / (Math.pow(1 + r, valPlazo) - 1);
    }
  }

  const cuotaRedondeada = Math.round(cuotaMensual);
  const cuotaConCargos = cuotaRedondeada + valSeguro + valOtros;
  const totalIntereses = Math.max(0, Math.round((cuotaMensual * valPlazo) - montoFinanciar));
  const totalPagadoFinal = Math.round(valInicial + (cuotaMensual * valPlazo) + ((valSeguro + valOtros) * valPlazo));

  // Income analysis
  const ratioSueldo = valSueldo > 0 ? Math.round((cuotaConCargos / valSueldo) * 100) : 0;
  let diagnosticClass = 'diag-green';
  let diagnosticText = 'Manejable';
  let diagnosticAdvice = 'Esta cuota estimada se encuentra dentro del rango recomendado (< 30% de tu sueldo). Es un gasto mensual que deberías poder cubrir con relativa comodidad.';

  if (ratioSueldo > 45) {
    diagnosticClass = 'diag-red';
    diagnosticText = 'Riesgoso';
    diagnosticAdvice = '¡Atención! La cuota del préstamo más los seguros consumen más del 45% de tus ingresos netos. Comprometer tanto sueldo solo en el carro es riesgoso y afectará tu capacidad de cubrir comida, alquiler u otros compromisos.';
  } else if (ratioSueldo >= 30) {
    diagnosticClass = 'diag-orange';
    diagnosticText = 'Ajustado';
    diagnosticAdvice = 'La cuota y los gastos mensuales del préstamo consumen entre el 30% y el 45% de tu sueldo neto. Sentirás presión en tu presupuesto mensual; se recomienda dar un mayor inicial o buscar un carro más económico.';
  }

  return (
    <div className="prestamo-vehiculo-page">
      <SEOHead 
        title="Calculadora de Préstamo de Vehículo RD"
        description="Calcula la cuota mensual estimada de un préstamo de vehículo en República Dominicana según precio, inicial, tasa y plazo."
        schema={[faqSchema, appSchema]}
      />

      <PageHero 
        category="vehiculos"
        title="Préstamo de Vehículo"
        description="Calcula las cuotas aproximadas de financiamiento vehicular a tasa fija o variable."
        icon={Car}
        chips={["prestamo","carro","vehiculo"]}
      />

      <AdSlot id="vehiculo-under-hero" placement="Préstamo Vehículo - Debajo del Hero" />

      <div className="grid-2">
        {/* Form Column */}
        <div className="card">
          <h2>Datos del Préstamo</h2>
          <p>Escribe los montos del vehículo y las condiciones del financiamiento.</p>

          {error && (
            <div className="error-alert" role="alert">
              <AlertTriangle size={20} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleCalculate}>
            <div className="form-section-title">1. Costo del Vehículo</div>

            <div className="grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-precio" className="form-label">Precio del vehículo (RD$): *</label>
                <input 
                  id="input-precio"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 850000"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-inicial" className="form-label">Inicial disponible (RD$):</label>
                <input 
                  id="input-inicial"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 250000"
                  value={inicial}
                  onChange={(e) => setInicial(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div className="form-section-title">2. Condiciones del Financiamiento</div>

            <div className="grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-tasa" className="form-label">Tasa de interés anual (%):</label>
                <input 
                  id="input-tasa"
                  type="number"
                  step="0.01"
                  className="form-control"
                  placeholder="Ej. 12"
                  value={tasaAnual}
                  onChange={(e) => setTasaAnual(e.target.value)}
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-plazo" className="form-label">Plazo (Meses):</label>
                <input 
                  id="input-plazo"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 60"
                  value={plazo}
                  onChange={(e) => setPlazo(e.target.value)}
                  min="1"
                  required
                />
              </div>
            </div>

            <div className="form-section-title">3. Cargos Opcionales y Sueldo (Recomendado)</div>

            <div className="grid-3" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
              <div className="form-group">
                <label htmlFor="input-seguro" className="form-label">Seguro mensual (RD$):</label>
                <input 
                  id="input-seguro"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 3000"
                  value={seguro}
                  onChange={(e) => setSeguro(e.target.value)}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-otros-cargos" className="form-label">Otros mensual (RD$):</label>
                <input 
                  id="input-otros-cargos"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 500"
                  value={otrosCargos}
                  onChange={(e) => setOtrosCargos(e.target.value)}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-sueldo" className="form-label">Tu sueldo neto (RD$):</label>
                <input 
                  id="input-sueldo"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 75000"
                  value={sueldo}
                  onChange={(e) => setSueldo(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button type="button" className="btn btn-secondary" onClick={handleReset} style={{ flex: 1 }}>
                <RotateCcw size={18} /> Limpiar
              </button>
              <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
                Calcular cuota
              </button>
            </div>
          </form>
        </div>

        {/* Results Column */}
        <div className="results-column">
          {showResults ? (
            <div className="card result-card" style={{ height: '100%' }}>
              <h2>Cuota de Préstamo Estimada</h2>

              <div className="main-cost-display" style={{ padding: '1.25rem 1rem' }}>
                <span className="main-cost-title">Monto Neto a Financiar</span>
                <span className="main-cost-value" style={{ fontSize: '1.6rem', color: 'var(--text-muted)' }}>
                  RD$ {montoFinanciar.toLocaleString()}
                </span>
                
                <span className="main-cost-title" style={{ marginTop: '1rem' }}>Cuota Mensual del Préstamo (Solo cuota)</span>
                <span className="main-cost-value">
                  RD$ {cuotaRedondeada.toLocaleString()}
                </span>

                {(valSeguro > 0 || valOtros > 0) && (
                  <>
                    <span className="main-cost-title" style={{ marginTop: '0.75rem' }}>Cuota Mensual con Cargos (Seguro + Otros)</span>
                    <span className="main-cost-value" style={{ color: 'var(--primary)' }}>
                      RD$ {cuotaConCargos.toLocaleString()}
                    </span>
                  </>
                )}
              </div>

              {/* Dominican Quote Phrase */}
              {valSueldo > 0 ? (
                <div className="diagnostic-badge-wrapper text-center" style={{ margin: '1rem 0' }}>
                  <span className={`diagnostic-badge ${diagnosticClass}`} style={{ fontSize: '1rem', padding: '0.5rem 1.25rem' }}>
                    <Percent size={16} style={{ marginRight: '0.5rem', display: 'inline', verticalAlign: 'middle' }} />
                    Cuota representa: <strong>{ratioSueldo}% de tu sueldo</strong>
                  </span>
                </div>
              ) : null}

              <div className="dominican-quote" style={{ borderLeftColor: 'var(--primary)' }}>
                <p>
                  "Tu cuota mensual estimada sería de <strong>RD$ {cuotaRedondeada.toLocaleString()} al mes</strong> por un monto financiado de <strong>RD$ {montoFinanciar.toLocaleString()}</strong>. 
                  {valSueldo > 0 && ` Si ganas RD$ ${valSueldo.toLocaleString()}, esta cuota (con seguros y cargos incluidos) representa aproximadamente el ${ratioSueldo}% de tu sueldo, por lo que el gasto se considera ${diagnosticText.toLowerCase()}.`}"
                </p>
              </div>

              {/* Financial Breakdown */}
              <div className="budget-rules-breakdown" style={{ margin: '1.5rem 0' }}>
                <h3>Desglose del Financiamiento</h3>
                <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Intereses aproximados del préstamo:</span>
                  <span style={{ fontWeight: 600 }}>RD$ {totalIntereses.toLocaleString()}</span>
                </div>
                <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Monto pagado al final (Vehículo + Financiamiento + Cargos):</span>
                  <span style={{ fontWeight: 600 }}>RD$ {totalPagadoFinal.toLocaleString()}</span>
                </div>
                <div className="flex-between">
                  <span style={{ color: 'var(--text-muted)' }}>Plazo de pago:</span>
                  <span style={{ fontWeight: 600 }}>{valPlazo} meses ({Math.round((valPlazo / 12) * 10) / 10} años)</span>
                </div>
              </div>

              {/* Diagnostic Box */}
              {valSueldo > 0 && (
                <div className="recommendation-box" style={{ margin: '1.5rem 0' }}>
                  <h3 className="flex-between">
                    <span>Diagnóstico de Presupuesto:</span>
                    <Info size={18} />
                  </h3>
                  <p>{diagnosticAdvice}</p>
                </div>
              )}

              {/* Cross Connections */}
              <div className="connections-actions" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '1.5rem 0' }}>
                <Link to="/me-alcanza-el-sueldo" className="btn btn-secondary btn-block">
                  Ver si mi sueldo me alcanza <ArrowRight size={16} />
                </Link>
                <Link to="/deudas-vs-ingresos-rd" className="btn btn-success btn-block">
                  Calcular deudas vs ingresos <ArrowRight size={16} />
                </Link>
              </div>

              <AdSlot id="vehiculo-after-results" placement="Préstamo Vehículo - Después de Resultados" />

              <div className="financial-disclaimer" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '1rem' }}>
                <p><strong>Nota aclaratoria:</strong> Estos cálculos son estimados y tienen fines informativos. Las cuotas, tasas, seguros, combustibles, mantenimientos y costos reales pueden variar según banco, dealer, aseguradora, tipo de vehículo, uso y condiciones del mercado.</p>
              </div>
            </div>
          ) : (
            <EmptyStateCard
              title="Préstamo de Vehículo"
              description="Completa el precio del vehículo, tu inicial y las condiciones de la tasa para estimar las cuotas mensuales y evaluar su impacto financiero en tu sueldo."
              icon={TrendingUp}
            />
          )}
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <DisclaimerBox type="vehiculos" />
      </div>

      <AdSlot id="vehiculo-before-faq" placement="Préstamo Vehículo - Antes del FAQ" />

      <div className="card" style={{ marginTop: '2rem' }}>
        <FAQSection items={faqItems} />
      </div>

      <AdSlot id="vehiculo-before-footer" placement="Préstamo Vehículo - Antes del Footer" />

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
