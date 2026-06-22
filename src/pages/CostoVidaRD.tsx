import {
  useState } from 'react';
import { Link } from 'react-router-dom';
import { CITIES } from '../data/mockData';
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
  Activity,
  DollarSign,
  TrendingUp
} from 'lucide-react';

export default function CostoVidaRD() {
  const [cityId, setCityId] = useState('santo-domingo');
  const [householdType, setHouseholdType] = useState('solo'); // solo, pareja, familia-3, familia-4, familia-5
  const [alquiler, setAlquiler] = useState<string>('');
  const [supermercado, setSupermercado] = useState<string>('');
  const [transporte, setTransporte] = useState<string>('');
  const [servicios, setServicios] = useState<string>('');
  const [salud, setSalud] = useState<string>('');
  const [educacion, setEducacion] = useState<string>('');
  const [deudas, setDeudas] = useState<string>('');
  const [entretenimiento, setEntretenimiento] = useState<string>('');
  const [ahorro, setAhorro] = useState<string>('');
  const [otrosGastos, setOtrosGastos] = useState<string>('');

  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const costovidaFAQs: FAQItem[] = [
    {
      question: '¿Cuánto cuesta vivir en República Dominicana en promedio?',
      answer: 'El costo de vida estimado varía ampliamente según la ciudad y la zona. En Santo Domingo y Punta Cana, un costo básico individual puede rondar los RD$ 30,000 a RD$ 40,000 al mes. En ciudades del interior como La Vega o San Francisco, este costo promedio baja entre un 10% y un 20%.'
    },
    {
      question: '¿Qué diferencia hay entre el dinero para vivir ajustado y vivir tranquilo?',
      answer: 'Vivir ajustado significa cubrir estrictamente los gastos esenciales (alquiler, supermercado, transporte y deudas) sin margen de ahorro ni ocio. Vivir tranquilo implica tener un sueldo recomendado que sea al menos un 25% superior a tus gastos para contar con un colchón de imprevistos.'
    },
    {
      question: '¿Cómo influye el tamaño de la familia en el costo de vida?',
      answer: 'A medida que se agregan miembros al hogar, categorías como supermercado, salud y educación incrementan sustancialmente el gasto. Sin embargo, existen economías de escala donde gastos como alquiler, internet y servicios básicos no aumentan de forma proporcional.'
    }
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': costovidaFAQs.map((faq) => ({
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
    'name': 'Calculadora de Costo de Vida RD - CuantoCuestaRD',
    'operatingSystem': 'All',
    'applicationCategory': 'FinanceApplication',
    'description': 'Estima el costo mensual de vivir en República Dominicana según ciudad, tamaño de hogar y estilo de vida.',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'DOP'
    }
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const inputs = [alquiler, supermercado, transporte, servicios, salud, educacion, deudas, entretenimiento, ahorro, otrosGastos];
    if (inputs.some(val => Number(val) < 0)) {
      setError('Los montos ingresados no pueden ser negativos.');
      return;
    }

    // Must have at least some basic cost
    const total = inputs.reduce((acc, curr) => acc + (Number(curr) || 0), 0);
    if (total === 0) {
      setError('Completa este campo para calcular: ingresa al menos algunos gastos.');
      return;
    }

    setShowResults(true);
  };

  const handleReset = () => {
    setCityId('santo-domingo');
    setHouseholdType('solo');
    setAlquiler('');
    setSupermercado('');
    setTransporte('');
    setServicios('');
    setSalud('');
    setEducacion('');
    setDeudas('');
    setEntretenimiento('');
    setAhorro('');
    setOtrosGastos('');
    setError(null);
    setShowResults(false);
  };

  // Calculations
  const valAlq = Number(alquiler) || 0;
  const valSuper = Number(supermercado) || 0;
  const valTrans = Number(transporte) || 0;
  const valServ = Number(servicios) || 0;
  const valSalud = Number(salud) || 0;
  const valEduc = Number(educacion) || 0;
  const valDeudas = Number(deudas) || 0;
  const valEnt = Number(entretenimiento) || 0;
  const valAhorro = Number(ahorro) || 0;
  const valOtros = Number(otrosGastos) || 0;

  const totalCosto = valAlq + valSuper + valTrans + valServ + valSalud + valEduc + valDeudas + valEnt + valAhorro + valOtros;
  const sueldoRecomendado = Math.round(totalCosto * 1.25);
  const sueldoAjustado = totalCosto;

  // Grouping categories
  const vivNecesidad = valAlq + valSuper + valTrans + valServ + valSalud;
  const vivNecesidadPct = totalCosto > 0 ? Math.round((vivNecesidad / totalCosto) * 100) : 0;

  const vivDeseos = valEnt + valOtros;
  const vivDeseosPct = totalCosto > 0 ? Math.round((vivDeseos / totalCosto) * 100) : 0;

  const vivCompromiso = valDeudas + valAhorro + valEduc;
  const vivCompromisoPct = totalCosto > 0 ? Math.round((vivCompromiso / totalCosto) * 100) : 0;

  // Pressure financial rating based on average sueldos
  let pressureClass = 'diag-green';
  let pressureText = 'Bajo';
  let pressureAdvice = 'Tu costo de vida es sumamente manejable para tu estilo de vida. Tienes amplio espacio para ahorro u ocio.';

  // Supposing average salary benchmark of RD$ 50,000 for this analysis
  const pressureRatio = totalCosto / 50000;
  if (pressureRatio > 0.9) {
    pressureClass = 'diag-red';
    pressureText = 'Alto';
    pressureAdvice = 'Tu costo de vida mensual ejerce una presión financiera alta. Te queda muy poco margen para el ahorro o imprevistos. Considera consolidar deudas o cambiar a un supermercado más económico.';
  } else if (pressureRatio > 0.7) {
    pressureClass = 'diag-orange';
    pressureText = 'Medio';
    pressureAdvice = 'Tu presión financiera es moderada. Es manejable, pero te sugerimos no incrementar tus gastos fijos y vigilar tus consumos variables de ocio.';
  }

  const getHouseholdLabel = () => {
    if (householdType === 'solo') return 'una persona sola';
    if (householdType === 'pareja') return 'una pareja';
    if (householdType === 'familia-3') return 'una familia de 3 personas';
    if (householdType === 'familia-4') return 'una familia de 4 personas';
    return 'una familia de 5 o más personas';
  };

  const getCityLabel = () => {
    return CITIES.find(c => c.id === cityId)?.name || 'República Dominicana';
  };

  return (
    <div className="costo-vida-page">
      <SEOHead 
        title="Calculadora de Costo de Vida RD | Cuánto necesitas al mes"
        description="Calcula cuánto dinero necesitas al mes para vivir en República Dominicana según ciudad, alquiler, supermercado, transporte, servicios y estilo de vida."
        schema={[faqSchema, appSchema]}
      />

      <PageHero 
        category="costodevida"
        title="Costo de Vida RD"
        description="Estima el dinero mensual promedio necesario para vivir en el país de acuerdo a tu estilo de vida."
        icon={TrendingUp}
        chips={["costo","vida","vivir"]}
      />

      <AdSlot id="costovida-under-hero" placement="Costo Vida - Debajo del Hero" />

      <div className="grid-2">
        {/* Form Column */}
        <div className="card">
          <h2>Tus Gastos Mensuales Estimados</h2>
          <p>Divide tu presupuesto en las secciones correspondientes en RD$.</p>

          {error && (
            <div className="error-alert" role="alert">
              <AlertTriangle size={20} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleCalculate}>
            <div className="grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="city-select" className="form-label">Ubicación / Ciudad:</label>
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
                <label htmlFor="household-select" className="form-label">Tipo de Hogar:</label>
                <select 
                  id="household-select" 
                  className="form-control" 
                  value={householdType} 
                  onChange={(e) => setHouseholdType(e.target.value)}
                >
                  <option value="solo">Vivo solo</option>
                  <option value="pareja">En pareja</option>
                  <option value="familia-3">Familia de 3 personas</option>
                  <option value="familia-4">Familia de 4 personas</option>
                  <option value="familia-5">Familia de 5 o más</option>
                </select>
              </div>
            </div>

            <div className="form-section-title">Vivienda, Alimentación y Servicios</div>

            <div className="grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-alquiler" className="form-label">Alquiler mensual (RD$):</label>
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
                <label htmlFor="input-super" className="form-label">Supermercado al mes (RD$):</label>
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
                <label htmlFor="input-transporte" className="form-label">Transporte / Gasolina:</label>
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
                <label htmlFor="input-servicios" className="form-label">Servicios (Luz, Internet, Agua):</label>
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

            <div className="form-section-title">Salud, Bienestar y Otros</div>

            <div className="grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
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

              <div className="form-group">
                <label htmlFor="input-educacion" className="form-label">Colegios / Educación:</label>
                <input 
                  id="input-educacion"
                  type="number"
                  className="form-control"
                  placeholder="0"
                  value={educacion}
                  onChange={(e) => setEducacion(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div className="grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-deudas" className="form-label">Pago de Deudas:</label>
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
                <label htmlFor="input-ahorro" className="form-label">Ahorro deseado:</label>
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
                <label htmlFor="input-entre" className="form-label">Entretenimiento / Salidas:</label>
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
                <label htmlFor="input-otros" className="form-label">Otros Gastos:</label>
                <input 
                  id="input-otros"
                  type="number"
                  className="form-control"
                  placeholder="0"
                  value={otrosGastos}
                  onChange={(e) => setOtrosGastos(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div className="step-actions flex-between" style={{ gap: '1rem' }}>
              <button type="button" className="btn btn-secondary" onClick={handleReset} style={{ flex: 1 }}>
                <RotateCcw size={18} /> Limpiar
              </button>
              <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
                Calcular costo
              </button>
            </div>
          </form>
        </div>

        {/* Results Column */}
        <div className="results-column">
          {showResults ? (
            <div className="card result-card" style={{ height: '100%' }}>
              <h2>Presupuesto de Vida Estimado</h2>

              <div className="main-cost-display" style={{ padding: '1.25rem 1rem' }}>
                <span className="main-cost-title">Presupuesto Mensual Necesario</span>
                <span className="main-cost-value">
                  RD$ {totalCosto.toLocaleString()}
                </span>
              </div>

              <div className="diagnostic-badge-wrapper text-center">
                <span className={`diagnostic-badge ${pressureClass}`}>
                  Presión Financiera: {pressureText}
                </span>
              </div>

              {/* Phrasing required by user */}
              <div className="dominican-quote" style={{ borderLeftColor: 'var(--primary)' }}>
                <p>
                  "Para vivir en <strong>{getCityLabel()}</strong> con este estilo de vida, <strong>{getHouseholdLabel()}</strong> podría necesitar aproximadamente <strong>RD$ {sueldoAjustado.toLocaleString()} al mes</strong>. 
                  Para vivir más tranquilo y tener margen de ahorro, sería recomendable acercarte a <strong>RD$ {sueldoRecomendado.toLocaleString()} mensuales</strong>."
                </p>
              </div>

              {/* Financial Benchmarks */}
              <div className="grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                <div className="freq-box">
                  <span className="freq-label">Vivir Ajustado (Mínimo)</span>
                  <span className="freq-val" style={{ fontSize: '1.15rem' }}>RD$ {sueldoAjustado.toLocaleString()}</span>
                </div>
                <div className="freq-box">
                  <span className="freq-label">Vivir Tranquilo (Sugerido)</span>
                  <span className="freq-val" style={{ fontSize: '1.15rem', color: 'var(--success)' }}>RD$ {sueldoRecomendado.toLocaleString()}</span>
                </div>
              </div>

              {/* Category Breakdown Progress Bars */}
              <div className="budget-rules-breakdown" style={{ marginBottom: '1.5rem' }}>
                <h3>Estructura del Gasto</h3>
                
                <div className="category-progress-item">
                  <div className="flex-between progress-labels">
                    <span className="progress-cat-name">Necesidades Básicas</span>
                    <span className="progress-cat-val">RD$ {vivNecesidad.toLocaleString()} ({vivNecesidadPct}%)</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: `${vivNecesidadPct}%`, backgroundColor: 'var(--primary)' }}></div>
                  </div>
                </div>

                <div className="category-progress-item" style={{ marginTop: '0.75rem' }}>
                  <div className="flex-between progress-labels">
                    <span className="progress-cat-name">Estilo de Vida y Deseos</span>
                    <span className="progress-cat-val">RD$ {vivDeseos.toLocaleString()} ({vivDeseosPct}%)</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: `${vivDeseosPct}%`, backgroundColor: 'var(--warning)' }}></div>
                  </div>
                </div>

                <div className="category-progress-item" style={{ marginTop: '0.75rem' }}>
                  <div className="flex-between progress-labels">
                    <span className="progress-cat-name">Ahorros y Compromisos</span>
                    <span className="progress-cat-val">RD$ {vivCompromiso.toLocaleString()} ({vivCompromisoPct}%)</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: `${vivCompromisoPct}%`, backgroundColor: 'var(--success)' }}></div>
                  </div>
                </div>
              </div>

              <div className="recommendation-box">
                <h3 className="flex-between">
                  <span>Diagnóstico General:</span>
                  <Activity size={18} />
                </h3>
                <p>{pressureAdvice}</p>
              </div>

              <div className="connections-actions" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '1.5rem 0' }}>
                {valSuper > 0 && (
                  <Link to="/comparador-supermercados-rd" className="btn btn-secondary btn-block">
                    Cotizar alimentos en Comparador de Supermercados <ArrowRight size={16} />
                  </Link>
                )}
                <Link to="/me-alcanza-el-sueldo" className="btn btn-success btn-block">
                  Comprobar: ¿Me alcanza mi sueldo real para esto? <ArrowRight size={16} />
                </Link>
              </div>

              <AdSlot id="costovida-after-results" placement="Costo Vida - Después de Resultados" />

              <div className="financial-disclaimer" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '1rem' }}>
                <p><strong>Nota aclaratoria:</strong> Estos cálculos son estimados y tienen fines informativos. Los costos pueden variar según la ciudad, zona, estilo de vida, familia, deudas y precios actuales.</p>
              </div>
            </div>
          ) : (
            <EmptyStateCard
              title="Calcula tu Costo de Vida"
              description="Llena los gastos del formulario de la izquierda según tu situación para conocer el presupuesto sugerido y los ingresos recomendados para vivir tranquilo en RD."
              icon={DollarSign}
            />
          )}
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <DisclaimerBox type="finanzas" />
      </div>

      <AdSlot id="costovida-before-faq" placement="Costo Vida - Antes del FAQ" />

      <div className="card" style={{ marginTop: '2rem' }}>
        <FAQSection items={costovidaFAQs} />
      </div>

      <AdSlot id="costovida-before-footer" placement="Costo Vida - Antes del Footer" />

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
