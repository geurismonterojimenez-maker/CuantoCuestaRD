import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatRD, parseInputNumber } from '../utils/helpers';
import SEOHead from '../components/SEOHead';
import PageHero from '../components/PageHero';
import EmptyStateCard from '../components/EmptyStateCard';
import DisclaimerBox from '../components/DisclaimerBox';
import AdSlot from '../components/AdSlot';
import FAQSection, { type FAQItem } from '../components/FAQSection';
import { 
  RotateCcw, 
  AlertTriangle, 
  ArrowRight, 
  Home
} from 'lucide-react';

export default function CalculadoraServiciosHogarRD() {
  const [luz, setLuz] = useState<string>('');
  const [agua, setAgua] = useState<string>('');
  const [gas, setGas] = useState<string>('');
  const [internet, setInternet] = useState<string>('');
  const [cable, setCable] = useState<string>('');
  const [telefono, setTelefono] = useState<string>('');
  const [mantenimiento, setMantenimiento] = useState<string>('');
  const [otros, setOtros] = useState<string>('');

  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: '¿Cuánto se gasta en servicios del hogar en RD?',
      answer: 'El gasto promedio de servicios del hogar varía según el tamaño de la vivienda y el consumo de energía. Para una persona sola en un apartaestudio suele rondar los RD$ 3,000 - RD$ 5,000 mensuales, mientras que para una familia en un apartamento de tres habitaciones el gasto puede oscilar entre RD$ 8,000 y RD$ 15,000 o más, principalmente impulsado por la luz.'
    },
    {
      question: '¿Cómo reducir los gastos de luz, internet y gas?',
      answer: 'Para reducir los gastos, puedes optar por cambiar a bombillas LED, apagar los aires acondicionados al salir de la habitación, auditar tus suscripciones de streaming para cancelar las que no uses, y cocinar con ollas tapadas para ahorrar gas GLP.'
    },
    {
      question: '¿Qué es el costo de mantenimiento residencial en RD?',
      answer: 'Es una cuota mensual que cobran los residenciales y condominios para cubrir gastos comunes como la recogida de basura, limpieza de áreas comunes, agua común, seguridad y mantenimiento de bombas de agua o portones eléctricos.'
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
    'name': 'Calculadora de Servicios del Hogar RD - CuantoCuestaRD',
    'operatingSystem': 'All',
    'applicationCategory': 'FinanceApplication',
    'description': 'Calcula cuánto gastas al mes en servicios básicos en RD como luz, agua, gas, internet y teléfono, y descubre consejos de ahorro.',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'DOP'
    }
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const valLuz = parseInputNumber(luz);
    const valAgua = parseInputNumber(agua);
    const valGas = parseInputNumber(gas);
    const valInternet = parseInputNumber(internet);
    const valCable = parseInputNumber(cable);
    const valTelefono = parseInputNumber(telefono);
    const valMantenimiento = parseInputNumber(mantenimiento);
    const valOtros = parseInputNumber(otros);

    if (
      Number(luz) < 0 ||
      Number(agua) < 0 ||
      Number(gas) < 0 ||
      Number(internet) < 0 ||
      Number(cable) < 0 ||
      Number(telefono) < 0 ||
      Number(mantenimiento) < 0 ||
      Number(otros) < 0
    ) {
      setError('Los montos ingresados no pueden ser negativos.');
      return;
    }

    if (
      valLuz === 0 && valAgua === 0 && valGas === 0 && valInternet === 0 &&
      valCable === 0 && valTelefono === 0 && valMantenimiento === 0 && valOtros === 0
    ) {
      setError('Por favor, ingresa el monto de al menos un servicio del hogar para calcular.');
      return;
    }

    setShowResults(true);
  };

  const handleReset = () => {
    setLuz('');
    setAgua('');
    setGas('');
    setInternet('');
    setCable('');
    setTelefono('');
    setMantenimiento('');
    setOtros('');
    setError(null);
    setShowResults(false);
  };

  // Calculations
  const valLuz = parseInputNumber(luz);
  const valAgua = parseInputNumber(agua);
  const valGas = parseInputNumber(gas);
  const valInternet = parseInputNumber(internet);
  const valCable = parseInputNumber(cable);
  const valTelefono = parseInputNumber(telefono);
  const valMantenimiento = parseInputNumber(mantenimiento);
  const valOtros = parseInputNumber(otros);

  const totalMensual = valLuz + valAgua + valGas + valInternet + valCable + valTelefono + valMantenimiento + valOtros;
  const totalAnual = totalMensual * 12;

  // Find highest expense
  const expensesList = [
    { name: 'Energía Eléctrica (Luz)', value: valLuz, key: 'luz' },
    { name: 'Agua Potable / Botellones', value: valAgua, key: 'agua' },
    { name: 'Combustible / Gas GLP', value: valGas, key: 'gas' },
    { name: 'Internet Residencial', value: valInternet, key: 'internet' },
    { name: 'Cable o Streaming', value: valCable, key: 'cable' },
    { name: 'Teléfono Móvil', value: valTelefono, key: 'telefono' },
    { name: 'Mantenimiento de Condominio', value: valMantenimiento, key: 'mantenimiento' },
    { name: 'Otros Servicios', value: valOtros, key: 'otros' }
  ];

  // Filter out zero expenses to find the real maximum
  const activeExpenses = expensesList.filter(exp => exp.value > 0);
  let highestExpense = { name: 'Ninguno', value: 0, key: '' };
  
  if (activeExpenses.length > 0) {
    highestExpense = activeExpenses.reduce((prev, current) => (prev.value > current.value) ? prev : current);
  }

  // Get dynamic saving advice based on highest expense
  let savingAdvice = 'Llevar un control mensual de tus facturas es el primer paso para evitar consumos hormiga en el hogar.';
  if (highestExpense.key === 'luz') {
    savingAdvice = 'Tu mayor gasto es la luz. Apaga los aires acondicionados durante el día, cambia tus bombillas a LED de bajo consumo y desenchufa los electrodomésticos en modo stand-by.';
  } else if (highestExpense.key === 'internet' || highestExpense.key === 'cable' || highestExpense.key === 'telefono') {
    savingAdvice = 'Tu mayor gasto es conectividad. Te recomendamos auditar tus suscripciones de streaming activas y revisar con tu proveedor si puedes unificar planes (duo o triple play) para obtener descuentos.';
  } else if (highestExpense.key === 'gas') {
    savingAdvice = 'Tu mayor gasto es el gas. Procura tapar las ollas al cocinar para acelerar el punto de ebullición y revisa si tu estufa tiene fugas de calor o quemadores con llama amarilla (que consumen más combustible).';
  } else if (highestExpense.key === 'mantenimiento') {
    savingAdvice = 'El costo de condominio es tu mayor egreso. Revisa con la administración que los mantenimientos preventivos (bombas, portones, limpieza) se hagan a tiempo para evitar derramas extraordinarias caras.';
  }

  return (
    <div className="servicios-hogar-page">
      <SEOHead 
        title="Calculadora de Servicios del Hogar RD"
        description="Calcula cuánto podrías gastar al mes en luz, agua, gas, internet, teléfono y otros servicios del hogar en República Dominicana."
        schema={[faqSchema, appSchema]}
      />

      <PageHero 
        category="hogar"
        title="Servicios del Hogar"
        description="Suma tus facturas de electricidad, internet, gas y agua para planificar tu costo fijo mensual."
        icon={Home}
        chips={["servicios","hogar","casa"]}
      />

      <AdSlot id="hogar-under-hero" placement="Hogar - Debajo del Hero" />

      <div className="grid-2">
        {/* Form Column */}
        <div className="card">
          <h2>Tus Gastos de Servicios</h2>
          <p>Coloca el monto mensual estimado en pesos (RD$) de cada servicio.</p>

          {error && (
            <div className="error-alert" role="alert">
              <AlertTriangle size={20} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleCalculate}>
            <div className="form-section-title">1. Servicios Básicos de Consumo</div>
            <div className="grid-2" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-luz" className="form-label">Luz / Electricidad (RD$):</label>
                <input 
                  id="input-luz"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 2500"
                  value={luz}
                  onChange={(e) => setLuz(e.target.value)}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-gas" className="form-label">Gas GLP (RD$ mensual):</label>
                <input 
                  id="input-gas"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 600"
                  value={gas}
                  onChange={(e) => setGas(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div className="grid-2" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-agua" className="form-label">Agua y Botellones (RD$):</label>
                <input 
                  id="input-agua"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 500"
                  value={agua}
                  onChange={(e) => setAgua(e.target.value)}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-mantenimiento" className="form-label">Mantenimiento Condominio:</label>
                <input 
                  id="input-mantenimiento"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 1500"
                  value={mantenimiento}
                  onChange={(e) => setMantenimiento(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div className="form-section-title">2. Telecomunicaciones y Conectividad</div>
            <div className="grid-2" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-internet" className="form-label">Internet Residencial (RD$):</label>
                <input 
                  id="input-internet"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 1800"
                  value={internet}
                  onChange={(e) => setInternet(e.target.value)}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-cable" className="form-label">Cable / Streaming (RD$):</label>
                <input 
                  id="input-cable"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 800"
                  value={cable}
                  onChange={(e) => setCable(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div className="grid-2" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-telefono" className="form-label">Plan Móvil / Celular (RD$):</label>
                <input 
                  id="input-telefono"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 900"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-otros" className="form-label">Otros Servicios (RD$):</label>
                <input 
                  id="input-otros"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 300"
                  value={otros}
                  onChange={(e) => setOtros(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button type="button" className="btn btn-secondary" onClick={handleReset} style={{ flex: 1 }}>
                <RotateCcw size={18} /> Limpiar
              </button>
              <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
                Calcular presupuesto
              </button>
            </div>
          </form>
        </div>

        {/* Results Column */}
        <div className="results-column">
          {showResults ? (
            <div className="card result-card" style={{ height: '100%' }}>
              <h2>Resumen de Gastos en Servicios</h2>

              <div className="main-cost-display" style={{ padding: '1.25rem 1rem' }}>
                <span className="main-cost-title">Total Mensual Estimado</span>
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
                  "Tus servicios del hogar podrían costar aproximadamente <strong>{formatRD(totalMensual)} al mes</strong> de referencia para planificar. El gasto que más pesa es <strong>{highestExpense.name}</strong>."
                </p>
              </div>

              {/* Savings Advice */}
              <div className="dominican-quote" style={{ backgroundColor: 'var(--primary-light)', borderLeftColor: 'var(--primary)', padding: '1rem', borderRadius: '8px', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                <strong>Consejo de ahorro doméstico:</strong> {savingAdvice}
              </div>

              {/* Breakdown by Service */}
              <div className="budget-rules-breakdown" style={{ margin: '1.5rem 0' }}>
                <h3>Peso de cada Servicio en tu Factura</h3>
                {activeExpenses.map((exp, idx) => {
                  const percent = Math.round((exp.value / totalMensual) * 100) || 0;
                  return (
                    <div key={idx} style={{ marginBottom: '0.75rem' }}>
                      <div className="flex-between" style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                        <span>{exp.name}</span>
                        <span style={{ fontWeight: 600 }}>{formatRD(exp.value)} ({percent}%)</span>
                      </div>
                      <div className="progress-bar-bg" style={{ width: '100%', height: '8px', backgroundColor: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div 
                          className="progress-bar-fill" 
                          style={{ 
                            width: `${percent}%`, 
                            height: '100%', 
                            backgroundColor: 'var(--primary)', 
                          }} 
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Cross Connections */}
              <div className="connections-actions" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '1.5rem 0' }}>
                <Link to="/me-alcanza-el-sueldo" className="btn btn-secondary btn-block">
                  ¿Me alcanza el sueldo para estos gastos? <ArrowRight size={16} />
                </Link>
                <Link to="/calculadora-presupuesto-mensual-rd" className="btn btn-secondary btn-block">
                  Organizar mi presupuesto mensual <ArrowRight size={16} />
                </Link>
                <Link to="/calculadora-ahorro-mensual-rd" className="btn btn-secondary btn-block">
                  Crear una meta de ahorro familiar
                </Link>
              </div>

              <AdSlot id="hogar-after-results" placement="Hogar - Después de Resultados" />

              <div className="financial-disclaimer" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '1rem' }}>
                <p><strong>Nota aclaratoria:</strong> Estos cálculos son estimados y tienen fines informativos. Los costos pueden variar según la provincia, el sector de vivienda, nivel de consumo real, el proveedor contratado, hábitos de uso e incrementos tarifarios de las entidades.</p>
              </div>
            </div>
          ) : (
            <EmptyStateCard
              title="Presupuesto de Servicios"
              description="Coloca tus gastos estimados de electricidad, gas, agua potable y conectividad para conocer el costo de mantenimiento consolidado mensual de tu vivienda."
              icon={Home}
            />
          )}
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <DisclaimerBox type="hogar" />
      </div>

      <AdSlot id="hogar-before-faq" placement="Hogar - Antes del FAQ" />

      <div className="card" style={{ marginTop: '2rem' }}>
        <FAQSection items={faqItems} />
      </div>

      <AdSlot id="hogar-before-footer" placement="Hogar - Antes del Footer" />

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
