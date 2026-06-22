import {
  useState } from 'react';
import SEOHead from '../components/SEOHead';
import PageHero from '../components/PageHero';
import EmptyStateCard from '../components/EmptyStateCard';
import DisclaimerBox from '../components/DisclaimerBox';
import AdSlot from '../components/AdSlot';
import FAQSection,
  { type FAQItem } from '../components/FAQSection';
import { 
  RotateCcw,
  PieChart,
  AlertTriangle,
  Lightbulb,
  DollarSign
} from 'lucide-react';

export default function PresupuestoMensual() {
  const [sueldo, setSueldo] = useState<string>('');
  const [alquiler, setAlquiler] = useState<string>('');
  const [supermercado, setSupermercado] = useState<string>('');
  const [transporte, setTransporte] = useState<string>('');
  const [servicios, setServicios] = useState<string>('');
  const [deudas, setDeudas] = useState<string>('');
  const [ahorro, setAhorro] = useState<string>('');
  const [entretenimiento, setEntretenimiento] = useState<string>('');
  const [salud, setSalud] = useState<string>('');
  const [educacion, setEducacion] = useState<string>('');
  const [otros, setOtros] = useState<string>('');

  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const presupuestoFAQs: FAQItem[] = [
    {
      question: '¿Qué es la regla presupuestaria 50/30/20?',
      answer: 'Es una recomendación financiera común: el 50% de tus ingresos se destina a necesidades básicas (vivienda, súper, servicios), el 30% a deseos o gastos personales (ocio, salidas) y el 20% se destina al ahorro y pago de deudas.'
    },
    {
      question: '¿Qué pasa si mi gasto en necesidades supera el 50%?',
      answer: 'En la República Dominicana es muy común debido a la inflación de servicios y alimentos. Si tus necesidades son del 60% o 70%, debes intentar compensar reduciendo fuertemente los gastos en entretenimiento y deseos para no descuidar el ahorro.'
    },
    {
      question: '¿Cómo recortar gastos en entretenimiento?',
      answer: 'Revisa las salidas del fin de semana, limita el consumo de restaurantes/entregas a domicilio y busca alternativas culturales gratuitas. Planificar tu presupuesto mensual en esta web es el primer paso.'
    }
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': presupuestoFAQs.map((faq) => ({
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
    'name': 'Calculadora de Presupuesto Mensual RD - CuantoCuestaRD',
    'operatingSystem': 'All',
    'applicationCategory': 'FinanceApplication',
    'description': 'Calculadora financiera para organizar tu presupuesto mensual en República Dominicana y distribuir tu sueldo en categorías.',
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

    const inputs = [alquiler, supermercado, transporte, servicios, deudas, ahorro, entretenimiento, salud, educacion, otros];
    if (inputs.some(val => Number(val) < 0)) {
      setError('Los montos ingresados no pueden ser negativos.');
      return;
    }

    setShowResults(true);
  };

  const handleReset = () => {
    setSueldo('');
    setAlquiler('');
    setSupermercado('');
    setTransporte('');
    setServicios('');
    setDeudas('');
    setAhorro('');
    setEntretenimiento('');
    setSalud('');
    setEducacion('');
    setOtros('');
    setError(null);
    setShowResults(false);
  };

  // Calculations
  const valSueldo = Number(sueldo) || 0;
  const valAlquiler = Number(alquiler) || 0;
  const valSuper = Number(supermercado) || 0;
  const valTrans = Number(transporte) || 0;
  const valServ = Number(servicios) || 0;
  const valDeudas = Number(deudas) || 0;
  const valAhorro = Number(ahorro) || 0;
  const valEnt = Number(entretenimiento) || 0;
  const valSalud = Number(salud) || 0;
  const valEduc = Number(educacion) || 0;
  const valOtros = Number(otros) || 0;

  const totalGastos = valAlquiler + valSuper + valTrans + valServ + valDeudas + valAhorro + valEnt + valSalud + valEduc + valOtros;
  const balance = valSueldo - totalGastos;

  // Category grouping
  // 1. Necesidades (Alquiler, Supermercado, Transporte, Servicios, Salud)
  const necesidades = valAlquiler + valSuper + valTrans + valServ + valSalud;
  const necesidadesPct = valSueldo > 0 ? Math.round((necesidades / valSueldo) * 100) : 0;

  // 2. Deseos / Estilo de vida (Entretenimiento, Otros)
  const deseos = valEnt + valOtros;
  const deseosPct = valSueldo > 0 ? Math.round((deseos / valSueldo) * 100) : 0;

  // 3. Ahorro y Deudas (Ahorro, Deudas, Educacion)
  const ahorroDeudas = valAhorro + valDeudas + valEduc;
  const ahorroDeudasPct = valSueldo > 0 ? Math.round((ahorroDeudas / valSueldo) * 100) : 0;

  // Find the single highest spending field
  const fields = [
    { name: 'Alquiler/Vivienda', value: valAlquiler, color: '#2563EB' },
    { name: 'Supermercado', value: valSuper, color: '#16A34A' },
    { name: 'Transporte', value: valTrans, color: '#EA580C' },
    { name: 'Servicios', value: valServ, color: '#06B6D4' },
    { name: 'Deudas', value: valDeudas, color: '#DC2626' },
    { name: 'Ahorro', value: valAhorro, color: '#8B5CF6' },
    { name: 'Entretenimiento', value: valEnt, color: '#EC4899' },
    { name: 'Salud', value: valSalud, color: '#F59E0B' },
    { name: 'Educación', value: valEduc, color: '#10B981' },
    { name: 'Otros Gastos', value: valOtros, color: '#64748B' }
  ];

  const activeFields = fields.filter(f => f.value > 0).sort((a, b) => b.value - a.value);
  const highestField = activeFields[0];

  // Specific advice based on rules
  const getBudgetAdvice = () => {
    if (totalGastos === 0) return '';
    
    let adviceText = '';
    
    // Check 50/30/20 compliance
    if (necesidadesPct > 50) {
      adviceText += 'Tu gasto en necesidades básicas supera el 50% recomendado. En el contexto dominicano esto es muy común, pero te sugerimos revisar si puedes optimizar el gasto de supermercado (comprando marcas blancas) o reducir planes de internet/servicios redundantes. ';
    }
    
    if (deseosPct > 30) {
      adviceText += 'Estás dedicando más del 30% a entretenimiento u otros gastos variables. Aquí se encuentra tu mayor oportunidad de ahorro: recortar un 5% en salidas o compras impulsivas te dará aire financiero. ';
    }

    if (ahorroDeudasPct < 20) {
      adviceText += 'Tu porcentaje destinado a ahorro, educación y deudas es menor al 20%. Si tienes deudas altas, prioriza amortizarlas. Si no las tienes, intenta configurar un ahorro automático de al menos el 5% o 10% de tu sueldo al cobrar.';
    }

    if (adviceText === '') {
      adviceText = '¡Tu presupuesto está muy bien equilibrado! Estás cumpliendo perfectamente las pautas recomendadas para proteger tu salud financiera. Sigue así.';
    }

    return adviceText;
  };

  return (
    <div className="presupuesto-page">
      <SEOHead 
        title="Calculadora de Presupuesto Mensual RD"
        description="Organiza tu sueldo por categorías y descubre en qué se va tu dinero cada mes en la República Dominicana."
        schema={[faqSchema, appSchema]}
      />

      <PageHero 
        category="finanzas"
        title="Presupuesto Mensual"
        description="Organiza tus ingresos e identifica tu capacidad de ahorro usando la regla 50/30/20."
        icon={DollarSign}
        chips={["presupuesto","mensual","finanzas"]}
      />

      <AdSlot id="presupuesto-under-hero" placement="Presupuesto Mensual - Debajo del Hero" />

      <div className="grid-2">
        {/* Form Column */}
        <div className="card">
          <h2>Tus Gastos Detallados</h2>
          <p>Introduce tu sueldo y los gastos estimados por categoría.</p>

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

            <div className="form-section-title">Necesidades Básicas</div>
            
            <div className="grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-alquiler" className="form-label">Alquiler / Hipoteca:</label>
                <input 
                  id="input-alquiler"
                  type="number"
                  className="form-control"
                  placeholder="0"
                  value={alquiler}
                  onChange={(e) => setAlquiler(e.target.value)}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-super" className="form-label">Supermercado:</label>
                <input 
                  id="input-super"
                  type="number"
                  className="form-control"
                  placeholder="0"
                  value={supermercado}
                  onChange={(e) => setSupermercado(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div className="grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-transporte" className="form-label">Transporte / Combustible:</label>
                <input 
                  id="input-transporte"
                  type="number"
                  className="form-control"
                  placeholder="0"
                  value={transporte}
                  onChange={(e) => setTransporte(e.target.value)}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-servicios" className="form-label">Servicios básicos:</label>
                <input 
                  id="input-servicios"
                  type="number"
                  className="form-control"
                  placeholder="0"
                  value={servicios}
                  onChange={(e) => setServicios(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="input-salud" className="form-label">Salud (Seguro, Farmacia):</label>
              <input 
                id="input-salud"
                type="number"
                className="form-control"
                placeholder="0"
                value={salud}
                onChange={(e) => setSalud(e.target.value)}
                min="0"
              />
            </div>

            <div className="form-section-title">Otras Categorías</div>

            <div className="grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-deudas" className="form-label">Pago de deudas:</label>
                <input 
                  id="input-deudas"
                  type="number"
                  className="form-control"
                  placeholder="0"
                  value={deudas}
                  onChange={(e) => setDeudas(e.target.value)}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-ahorro" className="form-label">Ahorro mensual:</label>
                <input 
                  id="input-ahorro"
                  type="number"
                  className="form-control"
                  placeholder="0"
                  value={ahorro}
                  onChange={(e) => setAhorro(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div className="grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-entre" className="form-label">Entretenimiento / Ocio:</label>
                <input 
                  id="input-entre"
                  type="number"
                  className="form-control"
                  placeholder="0"
                  value={entretenimiento}
                  onChange={(e) => setEntretenimiento(e.target.value)}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-educ" className="form-label">Educación:</label>
                <input 
                  id="input-educ"
                  type="number"
                  className="form-control"
                  placeholder="0"
                  value={educacion}
                  onChange={(e) => setEducacion(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="input-otros" className="form-label">Otros gastos / Imprevistos:</label>
              <input 
                id="input-otros"
                type="number"
                className="form-control"
                placeholder="0"
                value={otros}
                onChange={(e) => setOtros(e.target.value)}
                min="0"
              />
            </div>

            <div className="step-actions flex-between" style={{ gap: '1rem' }}>
              <button type="button" className="btn btn-secondary" onClick={handleReset} style={{ flex: 1 }}>
                <RotateCcw size={18} /> Limpiar
              </button>
              <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
                Analizar Presupuesto
              </button>
            </div>
          </form>
        </div>

        {/* Results Column */}
        <div className="results-column">
          {showResults ? (
            <div className="card result-card" style={{ height: '100%' }}>
              <h2>Tu Desglose de Gastos</h2>

              <div className="main-cost-display" style={{ padding: '1.25rem 1rem' }}>
                <span className="main-cost-title">Balance de Dinero Restante</span>
                <span className={`main-cost-value ${balance < 0 ? 'text-danger' : 'text-success'}`}>
                  RD$ {balance.toLocaleString()}
                </span>
              </div>

              <div className="dominican-quote" style={{ borderLeftColor: balance < 0 ? 'var(--danger)' : 'var(--success)' }}>
                <p>
                  Has planificado un gasto total de <strong>RD$ {totalGastos.toLocaleString()}</strong> de un sueldo de <strong>RD$ {valSueldo.toLocaleString()}</strong>.
                  {balance >= 0 ? (
                    <span> Te quedan <strong>RD$ {balance.toLocaleString()} libres</strong> al mes para destinar a otros proyectos.</span>
                  ) : (
                    <span className="text-danger"> Estás gastando <strong>RD$ {Math.abs(balance).toLocaleString()} más</strong> de lo que ganas. ¡Revisa y recorta gastos!</span>
                  )}
                  {highestField && (
                    <span> La categoría en la que más gastas es <strong>{highestField.name}</strong> con <strong>RD$ {highestField.value.toLocaleString()}</strong>.</span>
                  )}
                </p>
              </div>

              {/* 50/30/20 Distribution visualization */}
              <div className="budget-rules-breakdown" style={{ marginBottom: '1.5rem' }}>
                <h3>Distribución del Sueldo (Regla 50 / 30 / 20)</h3>
                
                {/* Necesidades Progress */}
                <div className="category-progress-item">
                  <div className="flex-between progress-labels">
                    <span className="progress-cat-name">Necesidades Básicas (Límite 50%)</span>
                    <span className="progress-cat-val" style={{ color: necesidadesPct > 50 ? 'var(--danger)' : 'inherit' }}>
                      RD$ {necesidades.toLocaleString()} ({necesidadesPct}%)
                    </span>
                  </div>
                  <div className="progress-bar-bg">
                    <div 
                      className="progress-bar-fill" 
                      style={{ width: `${Math.min(100, necesidadesPct)}%`, backgroundColor: necesidadesPct > 50 ? 'var(--danger)' : 'var(--primary)' }}
                    ></div>
                  </div>
                </div>

                {/* Deseos Progress */}
                <div className="category-progress-item" style={{ marginTop: '0.75rem' }}>
                  <div className="flex-between progress-labels">
                    <span className="progress-cat-name">Deseos y Ocio (Límite 30%)</span>
                    <span className="progress-cat-val" style={{ color: deseosPct > 30 ? 'var(--danger)' : 'inherit' }}>
                      RD$ {deseos.toLocaleString()} ({deseosPct}%)
                    </span>
                  </div>
                  <div className="progress-bar-bg">
                    <div 
                      className="progress-bar-fill" 
                      style={{ width: `${Math.min(100, deseosPct)}%`, backgroundColor: deseosPct > 30 ? 'var(--danger)' : 'var(--warning)' }}
                    ></div>
                  </div>
                </div>

                {/* Ahorro/Deudas Progress */}
                <div className="category-progress-item" style={{ marginTop: '0.75rem' }}>
                  <div className="flex-between progress-labels">
                    <span className="progress-cat-name">Ahorro y Compromisos (Meta 20%)</span>
                    <span className="progress-cat-val" style={{ color: ahorroDeudasPct < 20 ? 'var(--warning)' : 'var(--success)' }}>
                      RD$ {ahorroDeudas.toLocaleString()} ({ahorroDeudasPct}%)
                    </span>
                  </div>
                  <div className="progress-bar-bg">
                    <div 
                      className="progress-bar-fill" 
                      style={{ width: `${Math.min(100, ahorroDeudasPct)}%`, backgroundColor: 'var(--success)' }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Top Detailed Items List */}
              <div className="top-spendings-list" style={{ marginBottom: '1.5rem' }}>
                <h3>Desglose por Conceptos</h3>
                <div className="category-products-list" style={{ maxHeight: '180px', overflowY: 'auto', paddingRight: '4px', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.5rem' }}>
                  {activeFields.map((f) => {
                    const pct = valSueldo > 0 ? Math.round((f.value / valSueldo) * 100) : 0;
                    return (
                      <div key={f.name} className="product-row-item" style={{ padding: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
                        <div className="product-info-col" style={{ flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
                          <span className="dot" style={{ backgroundColor: f.color, width: '10px', height: '10px' }}></span>
                          <strong>{f.name}</strong>
                        </div>
                        <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>
                          RD$ {f.value.toLocaleString()} ({pct}%)
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Advice Box */}
              <div className="savings-advice-box">
                <h3 className="flex-between" style={{ color: '#16A34A', fontSize: '1.05rem' }}>
                  <span>Sugerencias de Planificación:</span>
                  <Lightbulb size={18} />
                </h3>
                <p>{getBudgetAdvice()}</p>
              </div>

              <AdSlot id="presupuesto-after-results" placement="Presupuesto - Después de Resultados" />

              <div className="financial-disclaimer" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '1rem' }}>
                <p><strong>Nota aclaratoria:</strong> Estos cálculos son estimados y tienen fines educativos e ilustrativos. No sustituyen asesoría financiera profesional.</p>
              </div>
            </div>
          ) : (
            <EmptyStateCard
              title="Planifica tu Dinero"
              description="Llena la columna de ingresos y gastos detallados de la izquierda para ver un análisis completo basado en la regla 50/30/20 y obtener sugerencias personalizadas."
              icon={PieChart}
            />
          )}
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <DisclaimerBox type="finanzas" />
      </div>

      <AdSlot id="presupuesto-before-faq" placement="Presupuesto Mensual - Antes del FAQ" />

      <div className="card" style={{ marginTop: '2rem' }}>
        <FAQSection items={presupuestoFAQs} />
      </div>

      <AdSlot id="presupuesto-before-footer" placement="Presupuesto Mensual - Antes del Footer" />

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
