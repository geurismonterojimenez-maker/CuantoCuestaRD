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
  Fuel
} from 'lucide-react';

const FUEL_PRICES: Record<string, number> = {
  regular_gas: 272.50,
  premium_gas: 290.10,
  regular_diesel: 221.60,
  optimum_diesel: 239.10,
  glp: 132.60
};

const FUEL_LABELS: Record<string, string> = {
  regular_gas: 'Gasolina Regular',
  premium_gas: 'Gasolina Premium',
  regular_diesel: 'Gasoil Regular',
  optimum_diesel: 'Gasoil Óptimo',
  glp: 'GLP (Gas Licuado de Petróleo)'
};

export default function CombustibleRD() {
  const [calculationMode, setCalculationMode] = useState<'simple' | 'advanced'>('simple');
  
  // Simple Mode Inputs
  const [gastoSemanal, setGastoSemanal] = useState<string>('');

  // Advanced Mode Inputs
  const [fuelType, setFuelType] = useState<string>('regular_gas');
  const [kmDiarios, setKmDiarios] = useState<string>('');
  const [rendimiento, setRendimiento] = useState<string>('30'); // average KMPG
  const [diasUso, setDiasUso] = useState<string>('5');

  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const faqItems: FAQItem[] = [
    {
      question: '¿Cuánto se gasta en gasolina al mes en República Dominicana?',
      answer: 'El gasto promedio mensual oscila entre RD$ 6,000 y RD$ 12,000 para un conductor regular en Santo Domingo o Santiago que se desplaza al trabajo. Aquellas personas con rutas largas en el interior o en vehículos de alto cilindraje pueden superar los RD$ 18,000 mensuales.'
    },
    {
      question: '¿Cómo influye la presión de las gomas en el consumo de gasolina?',
      answer: 'Conducir con las gomas desinfladas (por debajo de la presión recomendada por el fabricante, usualmente 32-35 PSI) puede incrementar el consumo de combustible hasta en un 3% a 5%, ya que aumenta la resistencia al rodamiento del carro.'
    },
    {
      question: '¿Es realmente más económico el GLP que la gasolina?',
      answer: 'Sí, el GLP es considerablemente más barato por galón (casi la mitad que la gasolina regular). Sin embargo, el GLP tiene menor densidad energética, por lo que el rendimiento en kilómetros de tu vehículo bajará entre un 10% y un 20% en comparación con la gasolina.'
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
    'name': 'Calculadora de Combustible RD - CuantoCuestaRD',
    'operatingSystem': 'All',
    'applicationCategory': 'FinanceApplication',
    'description': 'Calcula cuánto gastarías en combustible semanal, mensual y anual en República Dominicana según tu vehículo y uso diario.',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'DOP'
    }
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (calculationMode === 'simple') {
      const valGasto = Number(gastoSemanal) || 0;
      if (valGasto <= 0) {
        setError('Por favor, ingresa un gasto semanal válido.');
        return;
      }
    } else {
      const valKm = Number(kmDiarios) || 0;
      const valRend = Number(rendimiento) || 0;
      const valDias = Number(diasUso) || 0;

      if (valKm <= 0) {
        setError('Por favor, ingresa los kilómetros recorridos al día.');
        return;
      }
      if (valRend <= 0) {
        setError('El rendimiento aproximado en KM por galón debe ser mayor que 0.');
        return;
      }
      if (valDias <= 0 || valDias > 7) {
        setError('Los días de uso por semana deben ser entre 1 y 7.');
        return;
      }
    }

    setShowResults(true);
  };

  const handleReset = () => {
    setGastoSemanal('');
    setFuelType('regular_gas');
    setKmDiarios('');
    setRendimiento('30');
    setDiasUso('5');
    setError(null);
    setShowResults(false);
  };

  // Calculations
  let weeklyExpense = 0;
  if (calculationMode === 'simple') {
    weeklyExpense = Number(gastoSemanal) || 0;
  } else {
    const valKm = Number(kmDiarios) || 0;
    const valRend = Number(rendimiento) || 1;
    const valDias = Number(diasUso) || 0;
    const fuelPrice = FUEL_PRICES[fuelType] || 0;

    // Daily gallons = Km / Rendimiento
    const dailyGallons = valKm / valRend;
    const weeklyGallons = dailyGallons * valDias;
    weeklyExpense = Math.round(weeklyGallons * fuelPrice);
  }

  const monthlyExpense = Math.round(weeklyExpense * 4.33);
  const annualExpense = Math.round(weeklyExpense * 52);

  // Dominican Advice
  const savingsAdvice = 'Para ahorrar en combustible en RD, evita los acelerones bruscos al arrancar en los tapones de la capital, apaga el aire acondicionado si estás circulando por zonas frescas a baja velocidad, y mantén tus gomas en la presión correcta (32 a 35 PSI). El mantenimiento de bujías y filtros a tiempo reduce el consumo hasta un 10%.';

  return (
    <div className="combustible-page">
      <SEOHead 
        title="Calculadora de Combustible RD"
        description="Calcula cuánto gastarías en combustible semanal, mensual y anual según tu vehículo y uso diario."
        schema={[faqSchema, appSchema]}
      />

      <PageHero 
        category="vehiculos"
        title="Combustible"
        description="Calcula tu gasto quincenal y mensual en gasolina o gas licuado según tu recorrido habitual."
        icon={Fuel}
        chips={["combustible","gasolina","gas"]}
      />

      <AdSlot id="combustible-under-hero" placement="Combustible - Debajo del Hero" />

      <div className="grid-2">
        {/* Form Column */}
        <div className="card">
          <h2>Datos de Consumo</h2>
          <p>Selecciona un método de cálculo y llena los datos para estimar tu presupuesto.</p>

          {error && (
            <div className="error-alert" role="alert">
              <AlertTriangle size={20} />
              <span>{error}</span>
            </div>
          )}

          <div className="mode-selector" style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <button 
              type="button" 
              className={`btn btn-secondary ${calculationMode === 'simple' ? 'btn-active' : ''}`}
              onClick={() => { setCalculationMode('simple'); setShowResults(false); }}
              style={{ flex: 1, padding: '0.5rem 1rem', fontSize: '0.95rem' }}
            >
              Cálculo Simple (Gasto Semanal)
            </button>
            <button 
              type="button" 
              className={`btn btn-secondary ${calculationMode === 'advanced' ? 'btn-active' : ''}`}
              onClick={() => { setCalculationMode('advanced'); setShowResults(false); }}
              style={{ flex: 1, padding: '0.5rem 1rem', fontSize: '0.95rem' }}
            >
              Cálculo Avanzado (Consumo)
            </button>
          </div>

          <form onSubmit={handleCalculate}>
            {calculationMode === 'simple' ? (
              <div className="form-group">
                <label htmlFor="input-gasto-semanal" className="form-label">¿Cuánto gastas semanalmente en combustible (RD$)? *</label>
                <input 
                  id="input-gasto-semanal"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 2500"
                  value={gastoSemanal}
                  onChange={(e) => setGastoSemanal(e.target.value)}
                  min="0"
                  required
                />
              </div>
            ) : (
              <>
                <div className="form-group">
                  <label htmlFor="select-fuel" className="form-label">Tipo de combustible:</label>
                  <select 
                    id="select-fuel" 
                    className="form-control" 
                    value={fuelType} 
                    onChange={(e) => setFuelType(e.target.value)}
                  >
                    {Object.keys(FUEL_PRICES).map((key) => (
                      <option key={key} value={key}>
                        {FUEL_LABELS[key]} (RD$ {FUEL_PRICES[key].toFixed(2)}/gal)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid-3" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                  <div className="form-group">
                    <label htmlFor="input-km" className="form-label">Km diarios recorridos: *</label>
                    <input 
                      id="input-km"
                      type="number"
                      className="form-control"
                      placeholder="Ej. 40"
                      value={kmDiarios}
                      onChange={(e) => setKmDiarios(e.target.value)}
                      min="0"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="input-rendimiento" className="form-label">Rendimiento (KM/galón):</label>
                    <input 
                      id="input-rendimiento"
                      type="number"
                      className="form-control"
                      placeholder="Ej. 35"
                      value={rendimiento}
                      onChange={(e) => setRendimiento(e.target.value)}
                      min="1"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="input-dias" className="form-label">Días uso a la semana:</label>
                    <input 
                      id="input-dias"
                      type="number"
                      className="form-control"
                      placeholder="Ej. 5"
                      value={diasUso}
                      onChange={(e) => setDiasUso(e.target.value)}
                      min="1"
                      max="7"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button type="button" className="btn btn-secondary" onClick={handleReset} style={{ flex: 1 }}>
                <RotateCcw size={18} /> Limpiar
              </button>
              <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
                Calcular combustible
              </button>
            </div>
          </form>
        </div>

        {/* Results Column */}
        <div className="results-column">
          {showResults ? (
            <div className="card result-card" style={{ height: '100%' }}>
              <h2>Presupuesto de Combustible</h2>

              <div className="main-cost-display" style={{ padding: '1.25rem 1rem' }}>
                <span className="main-cost-title">Gasto Mensual Aproximado</span>
                <span className="main-cost-value">
                  RD$ {monthlyExpense.toLocaleString()}
                </span>
                
                <span className="main-cost-title" style={{ marginTop: '0.75rem' }}>Gasto Semanal Estimado</span>
                <span className="main-cost-value" style={{ fontSize: '1.4rem', color: 'var(--text-muted)' }}>
                  RD$ {weeklyExpense.toLocaleString()}
                </span>
              </div>

              {/* Dominican Quote Phrase */}
              <div className="dominican-quote" style={{ borderLeftColor: 'var(--primary)', margin: '1.5rem 0' }}>
                <p>
                  "Si gastas aproximadamente <strong>RD$ {weeklyExpense.toLocaleString()} semanal</strong> en combustible, tu gasto mensual estimado sería de <strong>RD$ {monthlyExpense.toLocaleString()}</strong>. Al año, estarías consumiendo cerca de <strong>RD$ {annualExpense.toLocaleString()}</strong> en tanque."
                </p>
              </div>

              {/* Advisory Box */}
              <div className="recommendation-box" style={{ margin: '1.5rem 0' }}>
                <h3 className="flex-between">
                  <span>Recomendación de Ahorro:</span>
                  <Info size={18} />
                </h3>
                <p>{savingsAdvice}</p>
              </div>

              {/* Cross Connections */}
              <div className="connections-actions" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '1.5rem 0' }}>
                <Link to="/calculadora-presupuesto-mensual-rd" className="btn btn-secondary btn-block">
                  Organizar mi presupuesto <ArrowRight size={16} />
                </Link>
                <Link to="/me-alcanza-el-sueldo" className="btn btn-success btn-block">
                  Ver si mi sueldo me alcanza <ArrowRight size={16} />
                </Link>
              </div>

              <AdSlot id="combustible-after-results" placement="Combustible - Después de Resultados" />

              <div className="financial-disclaimer" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '1rem' }}>
                <p><strong>Nota aclaratoria:</strong> Estos cálculos son estimados y tienen fines informativos. Las cuotas, tasas, seguros, combustibles, mantenimientos y costos reales pueden variar según banco, dealer, aseguradora, tipo de vehículo, uso y condiciones del mercado.</p>
              </div>
            </div>
          ) : (
            <EmptyStateCard
              title="Calculadora de Combustible"
              description="Elige el modo simple para estimar el total en base a tus recargas semanales o el modo avanzado para calcular según el tipo de combustible, kilometraje diario y el rendimiento de tu vehículo."
              icon={TrendingUp}
            />
          )}
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <DisclaimerBox type="vehiculos" />
      </div>

      <AdSlot id="combustible-before-faq" placement="Combustible - Antes del FAQ" />

      <div className="card" style={{ marginTop: '2rem' }}>
        <FAQSection items={faqItems} />
      </div>

      <AdSlot id="combustible-before-footer" placement="Combustible - Antes del Footer" />

      <style>{`
        .btn-active {
          background-color: var(--primary) !important;
          color: #ffffff !important;
          border-color: var(--primary) !important;
        }

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
