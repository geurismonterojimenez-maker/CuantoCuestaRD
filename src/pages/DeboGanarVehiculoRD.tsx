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
  Info,
  DollarSign,
  Wallet
} from 'lucide-react';

export default function DeboGanarVehiculoRD() {
  const [precio, setPrecio] = useState<string>('');
  const [inicial, setInicial] = useState<string>('');
  const [tasaAnual, setTasaAnual] = useState<string>('12');
  const [plazo, setPlazo] = useState<string>('60');
  const [seguro, setSeguro] = useState<string>('3000');
  const [combustibleSemanal, setCombustibleSemanal] = useState<string>('2000');
  const [otrosGastosVehiculo, setOtrosGastosVehiculo] = useState<string>('1500');
  const [gastosPersonales, setGastosPersonales] = useState<string>('25000');
  const [sueldoActual, setSueldoActual] = useState<string>('');

  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const faqItems: FAQItem[] = [
    {
      question: '¿Cuánto debo ganar para comprar un carro en RD?',
      answer: 'Depende del precio del vehículo. Los expertos recomiendan que todos los gastos fijos del vehículo (cuota del banco, seguro, combustible y mantenimiento) no superen el 30% de tus ingresos netos mensuales. Por ejemplo, para un carro cuyos gastos mensuales sumen RD$ 20,000, deberías ganar al menos RD$ 66,000.'
    },
    {
      question: '¿Qué gastos personales debo incluir al planificar mi presupuesto?',
      answer: 'Debes incluir gastos mensuales como alquiler, alimentación, servicios (luz, agua, internet), colegios, salud, deudas previas y recreación. Sumar estos gastos con el costo de mantenimiento del vehículo te dará una idea real de tus necesidades de ingresos.'
    },
    {
      question: '¿Qué es mejor: comprar un vehículo financiado o ahorrar para pagarlo al contado?',
      answer: 'Comprar al contado te ahorra el pago de intereses y comisiones de cierre, permitiéndote mayor libertad financiera. Financiarlo es una opción si necesitas el vehículo con urgencia y tu sueldo actual te permite cubrir la cuota holgadamente, sin comprometer tu fondo de ahorros.'
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
    'name': 'Calculadora "¿Cuánto debo ganar para comprar un carro?" - CuantoCuestaRD',
    'operatingSystem': 'All',
    'applicationCategory': 'FinanceApplication',
    'description': 'Estima qué ingresos necesitas para comprar y mantener un vehículo en RD según su precio, inicial, seguro y tus gastos personales actuales.',
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
    const valCombSem = Number(combustibleSemanal) || 0;
    const valOtros = Number(otrosGastosVehiculo) || 0;
    const valGastosPers = Number(gastosPersonales) || 0;
    const valSueldo = Number(sueldoActual) || 0;

    if (valPrecio <= 0) {
      setError('Por favor, ingresa el precio del vehículo.');
      return;
    }
    if (valInicial < 0 || valTasa < 0 || valPlazo < 0 || valSeguro < 0 || valCombSem < 0 || valOtros < 0 || valGastosPers < 0 || valSueldo < 0) {
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
    setSeguro('3000');
    setCombustibleSemanal('2000');
    setOtrosGastosVehiculo('1500');
    setGastosPersonales('25000');
    setSueldoActual('');
    setError(null);
    setShowResults(false);
  };

  // Calculations
  const valPrecio = Number(precio) || 0;
  const valInicial = Number(inicial) || 0;
  const valTasa = Number(tasaAnual) || 0;
  const valPlazo = Number(plazo) || 0;
  const valSeguro = Number(seguro) || 0;
  const valCombSem = Number(combustibleSemanal) || 0;
  const valOtros = Number(otrosGastosVehiculo) || 0;
  const valGastosPers = Number(gastosPersonales) || 0;
  const valSueldo = Number(sueldoActual) || 0;

  const montoFinanciar = valPrecio - valInicial;
  
  // Amortization (PMT)
  let cuotaMensual = 0;
  if (montoFinanciar > 0 && valPlazo > 0) {
    if (valTasa === 0) {
      cuotaMensual = montoFinanciar / valPlazo;
    } else {
      const r = (valTasa / 100) / 12;
      cuotaMensual = montoFinanciar * (r * Math.pow(1 + r, valPlazo)) / (Math.pow(1 + r, valPlazo) - 1);
    }
  }

  const combMensual = Math.round(valCombSem * 4.33);
  const costoVehiculoMensual = Math.round(cuotaMensual) + valSeguro + combMensual + valOtros;
  const costoTotalCombinado = costoVehiculoMensual + valGastosPers;

  // Recommended incomes
  const sueldoMinimoRecomendado = costoTotalCombinado;
  const sueldoTranquiloRecomendado = Math.round(costoTotalCombinado * 1.30); // 30% savings margin/buffer

  // Diagnostics
  let diagnosticClass = 'diag-blue';
  let diagnosticText = 'Aconsejado';
  let diagnosticAdvice = `Para comprar este vehículo y no sentirte tan ajustado, sería recomendable tener ingresos mensuales cercanos a RD$ ${sueldoTranquiloRecomendado.toLocaleString()}, tomando en cuenta la cuota, seguro, combustible y mantenimiento.`;

  if (valSueldo > 0) {
    if (valSueldo >= sueldoTranquiloRecomendado) {
      diagnosticClass = 'diag-green';
      diagnosticText = 'Viable';
      diagnosticAdvice = `¡Felicidades! Tu sueldo actual de RD$ ${valSueldo.toLocaleString()} cubre con suficiente margen todos tus gastos personales más el costo mensual real del vehículo, permitiéndote mantener capacidad de ahorro.`;
    } else if (valSueldo >= sueldoMinimoRecomendado) {
      diagnosticClass = 'diag-orange';
      diagnosticText = 'Ajustado';
      diagnosticAdvice = `Tu sueldo cubre los gastos pero de forma ajustada. Te quedará muy poco margen libre al final de mes para emergencias o imprevistos. Te sugerimos buscar una tasa menor, un vehículo más asequible o aumentar tu inicial.`;
    } else {
      diagnosticClass = 'diag-red';
      diagnosticText = 'No Recomendable';
      diagnosticAdvice = `Actualmente, tus ingresos de RD$ ${valSueldo.toLocaleString()} son inferiores a los RD$ ${sueldoMinimoRecomendado.toLocaleString()} que necesitas para cubrir el carro y tus gastos personales. Comprar este carro pondría en riesgo tu estabilidad financiera.`;
    }
  }

  return (
    <div className="debo-ganar-vehiculo-page">
      <SEOHead 
        title="Cuánto debo ganar para comprar un carro | CuantoCuestaRD"
        description="Calcula cuánto deberías ganar para comprar un carro en República Dominicana sin comprometer demasiado tu presupuesto mensual."
        schema={[faqSchema, appSchema]}
      />

      <PageHero 
        category="vehiculos"
        title="Cuánto debo ganar para comprar un carro"
        description="Calcula los ingresos mensuales recomendados antes de embarcarte en la compra de un auto."
        icon={Wallet}
        chips={["ganar","carro","financiar"]}
      />

      <AdSlot id="deboganar-under-hero" placement="Debo Ganar - Debajo del Hero" />

      <div className="grid-2">
        {/* Form Column */}
        <div className="card">
          <h2>Presupuesto Proyectado</h2>
          <p>Llena los datos del auto y tus egresos actuales para estimar los ingresos recomendados.</p>

          {error && (
            <div className="error-alert" role="alert">
              <AlertTriangle size={20} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleCalculate}>
            <div className="form-section-title">1. Datos del Vehículo</div>

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
                <label htmlFor="input-inicial" className="form-label">Inicial (RD$):</label>
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

            <div className="grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-tasa" className="form-label">Tasa anual (%):</label>
                <input 
                  id="input-tasa"
                  type="number"
                  className="form-control"
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
                  value={plazo}
                  onChange={(e) => setPlazo(e.target.value)}
                  min="1"
                  required
                />
              </div>
            </div>

            <div className="form-section-title">2. Gastos Mensuales del Vehículo</div>

            <div className="grid-3" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
              <div className="form-group">
                <label htmlFor="input-seguro" className="form-label">Seguro mensual (RD$):</label>
                <input 
                  id="input-seguro"
                  type="number"
                  className="form-control"
                  value={seguro}
                  onChange={(e) => setSeguro(e.target.value)}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-combustible" className="form-label">Combustible semanal:</label>
                <input 
                  id="input-combustible"
                  type="number"
                  className="form-control"
                  value={combustibleSemanal}
                  onChange={(e) => setCombustibleSemanal(e.target.value)}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-otros" className="form-label">Otros (Taller, lavado):</label>
                <input 
                  id="input-otros"
                  type="number"
                  className="form-control"
                  value={otrosGastosVehiculo}
                  onChange={(e) => setOtrosGastosVehiculo(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div className="form-section-title">3. Tus Finanzas Personales</div>

            <div className="grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-gastos-pers" className="form-label">Gastos personales actuales (RD$):</label>
                <input 
                  id="input-gastos-pers"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 25000 (Alquiler, comida, luz)"
                  value={gastosPersonales}
                  onChange={(e) => setGastosPersonales(e.target.value)}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-sueldo-actual" className="form-label">Tu sueldo actual (RD$, opcional):</label>
                <input 
                  id="input-sueldo-actual"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 65000 (Para diagnóstico)"
                  value={sueldoActual}
                  onChange={(e) => setSueldoActual(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button type="button" className="btn btn-secondary" onClick={handleReset} style={{ flex: 1 }}>
                <RotateCcw size={18} /> Limpiar
              </button>
              <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
                Calcular sueldo sugerido
              </button>
            </div>
          </form>
        </div>

        {/* Results Column */}
        <div className="results-column">
          {showResults ? (
            <div className="card result-card" style={{ height: '100%' }}>
              <h2>Ingresos Sugeridos para la Compra</h2>

              <div className="main-cost-display" style={{ padding: '1.25rem 1rem' }}>
                <span className="main-cost-title">Sueldo Recomendado (Vivir tranquilo)</span>
                <span className="main-cost-value">
                  RD$ {sueldoTranquiloRecomendado.toLocaleString()}
                </span>
                
                <span className="main-cost-title" style={{ marginTop: '0.75rem' }}>Sueldo Mínimo Requerido (Ajustado)</span>
                <span className="main-cost-value" style={{ fontSize: '1.4rem', color: 'var(--text-muted)' }}>
                  RD$ {sueldoMinimoRecomendado.toLocaleString()}
                </span>
              </div>

              {valSueldo > 0 && (
                <div className="diagnostic-badge-wrapper text-center" style={{ margin: '1rem 0' }}>
                  <span className={`diagnostic-badge ${diagnosticClass}`} style={{ fontSize: '1rem', padding: '0.5rem 1.25rem' }}>
                    Resultado: <strong>{diagnosticText}</strong>
                  </span>
                </div>
              )}

              {/* Dominican Quote Phrase */}
              <div className="dominican-quote" style={{ borderLeftColor: 'var(--primary)', margin: '1.5rem 0' }}>
                <p>
                  "Para comprar este vehículo y no sentirte tan ajustado, sería recomendable tener ingresos mensuales cercanos a <strong>RD$ {sueldoTranquiloRecomendado.toLocaleString()}</strong>, tomando en cuenta la cuota estimada de <strong>RD$ {Math.round(cuotaMensual).toLocaleString()}</strong>, el seguro, combustible y el mantenimiento preventivo."
                </p>
              </div>

              {/* Cost Breakdown */}
              <div className="budget-rules-breakdown" style={{ margin: '1.5rem 0' }}>
                <h3>Desglose de Costos Mensuales Proyectados</h3>
                <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Costo mensual total del vehículo:</span>
                  <span style={{ fontWeight: 600 }}>RD$ {costoVehiculoMensual.toLocaleString()} / mes</span>
                </div>
                <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Tus gastos personales mensuales:</span>
                  <span style={{ fontWeight: 600 }}>RD$ {valGastosPers.toLocaleString()} / mes</span>
                </div>
                <div className="flex-between">
                  <span style={{ color: 'var(--text-muted)' }}>Total gastos combinados:</span>
                  <span style={{ fontWeight: 600 }}>RD$ {costoTotalCombinado.toLocaleString()} / mes</span>
                </div>
              </div>

              {/* Advice Box */}
              <div className="recommendation-box" style={{ margin: '1.5rem 0' }}>
                <h3 className="flex-between">
                  <span>Consejo Financiero:</span>
                  <Info size={18} />
                </h3>
                <p>{diagnosticAdvice}</p>
              </div>

              {/* Cross Connections */}
              <div className="connections-actions" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '1.5rem 0' }}>
                <Link to="/me-alcanza-el-sueldo" className="btn btn-secondary btn-block">
                  Comprobar en "¿Me alcanza el sueldo?" <ArrowRight size={16} />
                </Link>
                <Link to="/calculadora-presupuesto-mensual-rd" className="btn btn-success btn-block">
                  Organizar mi presupuesto familiar <ArrowRight size={16} />
                </Link>
              </div>

              <AdSlot id="deboganar-after-results" placement="Debo Ganar - Después de Resultados" />

              <div className="financial-disclaimer" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '1rem' }}>
                <p><strong>Nota aclaratoria:</strong> Estos cálculos son estimados y tienen fines informativos. Las cuotas, tasas, seguros, combustibles, mantenimientos y costos reales pueden variar según banco, dealer, aseguradora, tipo de vehículo, uso y condiciones del mercado.</p>
              </div>
            </div>
          ) : (
            <EmptyStateCard
              title="¿Cuánto Debo Ganar?"
              description="Completa el precio del vehículo, tu inicial disponible y tus gastos fijos personales actuales para calcular el nivel de ingresos mínimos y sugeridos que requieres para comprarlo con tranquilidad financiera."
              icon={DollarSign}
            />
          )}
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <DisclaimerBox type="vehiculos" />
      </div>

      <AdSlot id="deboganar-before-faq" placement="Debo Ganar - Antes del FAQ" />

      <div className="card" style={{ marginTop: '2rem' }}>
        <FAQSection items={faqItems} />
      </div>

      <AdSlot id="deboganar-before-footer" placement="Debo Ganar - Antes del Footer" />

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
