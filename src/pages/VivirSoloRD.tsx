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
  Home,
  RotateCcw,
  AlertTriangle,
  Info,
  ArrowRight,
  User
} from 'lucide-react';

export default function VivirSoloRD() {
  const [sueldo, setSueldo] = useState<string>('');
  const [cityId, setCityId] = useState('santo-domingo');
  const [viviendaType, setViviendaType] = useState('apartaestudio'); // habitacion, apartaestudio, apartamento
  const [alquiler, setAlquiler] = useState<string>('');
  const [supermercado, setSupermercado] = useState<string>('');
  const [transporte, setTransporte] = useState<string>('');
  const [servicios, setServicios] = useState<string>('');
  const [internet, setInternet] = useState<string>('');
  const [deudas, setDeudas] = useState<string>('');
  const [ahorro, setAhorro] = useState<string>('');
  const [otrosGastos, setOtrosGastos] = useState<string>('');

  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const vivirSoloFAQs: FAQItem[] = [
    {
      question: '¿Cuánto dinero necesito ahorrar para mudarme solo en RD?',
      answer: 'Se recomienda ahorrar al menos el equivalente a 3 meses de alquiler para cubrir el depósito (2 depósitos de garantía + 1 mes por adelantado) más un presupuesto adicional de RD$ 40,000 a RD$ 70,000 para comprar electrodomésticos básicos (nevera, estufa, cama) y pagar el transporte de mudanza.'
    },
    {
      question: '¿Cuál es el porcentaje máximo de mi sueldo que debo gastar en alquiler?',
      answer: 'El gasto en vivienda no debería superar el 30% o 35% de tus ingresos netos. Si sobrepasas este límite, estarás comprometiendo tu capacidad para pagar alimentos, transporte y servicios básicos, y no te quedará margen de ahorro.'
    },
    {
      question: '¿Qué gastos iniciales de servicios debo contemplar?',
      answer: 'Al mudarte solo, debes pagar tarifas de instalación y contratos de energía eléctrica (EDES), servicio de agua, e instalación del servicio de telecomunicaciones (internet/cable), que habitualmente suman de RD$ 3,000 a RD$ 5,000 iniciales.'
    }
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': vivirSoloFAQs.map((faq) => ({
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
    'name': 'Calculadora de Costo para Vivir Solo en RD - CuantoCuestaRD',
    'operatingSystem': 'All',
    'applicationCategory': 'FinanceApplication',
    'description': 'Estima cuánto necesitas al mes para vivir solo en República Dominicana y el capital inicial recomendado para la mudanza.',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'DOP'
    }
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const inputs = [alquiler, supermercado, transporte, servicios, internet, deudas, ahorro, otrosGastos];
    if (inputs.some(val => Number(val) < 0)) {
      setError('Los montos ingresados no pueden ser negativos.');
      return;
    }

    const total = inputs.reduce((acc, curr) => acc + (Number(curr) || 0), 0);
    if (total === 0) {
      setError('Completa este campo para calcular: ingresa al menos algunos gastos.');
      return;
    }

    setShowResults(true);
  };

  const handleReset = () => {
    setSueldo('');
    setCityId('santo-domingo');
    setViviendaType('apartaestudio');
    setAlquiler('');
    setSupermercado('');
    setTransporte('');
    setServicios('');
    setInternet('');
    setDeudas('');
    setAhorro('');
    setOtrosGastos('');
    setError(null);
    setShowResults(false);
  };

  // Calculations
  const valSueldo = Number(sueldo) || 0;
  const valAlq = Number(alquiler) || 0;
  const valSuper = Number(supermercado) || 0;
  const valTrans = Number(transporte) || 0;
  const valServ = Number(servicios) || 0;
  const valInt = Number(internet) || 0;
  const valDeudas = Number(deudas) || 0;
  const valAhorro = Number(ahorro) || 0;
  const valOtros = Number(otrosGastos) || 0;

  const costoMensual = valAlq + valSuper + valTrans + valServ + valInt + valDeudas + valAhorro + valOtros;

  // Mudanza Inicial
  // 2 depositos + 1 mes de adelanto
  const depositoContrato = valAlq * 3;
  // Electrodomesticos estimacion
  let electrodomesticosEstimado = 35000; // Habitación
  if (viviendaType === 'apartaestudio') electrodomesticosEstimado = 55000;
  else if (viviendaType === 'apartamento') electrodomesticosEstimado = 85000;
  // Mudanza + instalación contrato
  const instalacionYMudanza = 8000;
  const capitalInicialRecomendado = depositoContrato + electrodomesticosEstimado + instalacionYMudanza;

  // Alerts
  const rentRatio = valSueldo > 0 ? Math.round((valAlq / valSueldo) * 100) : 0;
  const rentTooHigh = rentRatio > 35;

  return (
    <div className="vivir-solo-page">
      <SEOHead 
        title="Cuánto cuesta vivir solo en RD | Calculadora"
        description="Calcula cuánto necesitas para vivir solo en República Dominicana, incluyendo alquiler, comida, transporte, servicios y ahorro."
        schema={[faqSchema, appSchema]}
      />

      <PageHero 
        category="costodevida"
        title="Vivir Solo"
        description="Calcula el presupuesto inicial y recurrente estimado para independizarte en RD."
        icon={User}
        chips={["vivir solo","independizarse","alquiler"]}
      />

      <AdSlot id="vivirsolo-under-hero" placement="Vivir Solo - Debajo del Hero" />

      <div className="grid-2">
        {/* Form Column */}
        <div className="card">
          <h2>Tus Gastos Planificados</h2>
          <p>Llena tu sueldo e ingresa los costos estimados de tu plan de independencia.</p>

          {error && (
            <div className="error-alert" role="alert">
              <AlertTriangle size={20} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleCalculate}>
            <div className="form-group">
              <label htmlFor="input-sueldo" className="form-label">Sueldo mensual neto (RD$):</label>
              <input 
                id="input-sueldo"
                type="number"
                className="form-control"
                placeholder="Ej. 45000 (Opcional, para alertas de alquiler)"
                value={sueldo}
                onChange={(e) => setSueldo(e.target.value)}
                min="0"
              />
            </div>

            <div className="grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="city-select" className="form-label">Ciudad / Provincia:</label>
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
                <label htmlFor="vivienda-select" className="form-label">Tipo de Vivienda:</label>
                <select 
                  id="vivienda-select" 
                  className="form-control" 
                  value={viviendaType} 
                  onChange={(e) => setViviendaType(e.target.value)}
                >
                  <option value="habitacion">Habitación alquilada</option>
                  <option value="apartaestudio">Apartaestudio</option>
                  <option value="apartamento">Apartamento pequeño (1-2 hab)</option>
                </select>
              </div>
            </div>

            <div className="form-section-title">Necesidades Básicas</div>

            <div className="grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-alquiler" className="form-label">Alquiler mensual (RD$): *</label>
                <input 
                  id="input-alquiler"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 10000"
                  value={alquiler}
                  onChange={(e) => setAlquiler(e.target.value)}
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-super" className="form-label">Supermercado (Comida/Higiene):</label>
                <input 
                  id="input-super"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 7000"
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
                  placeholder="Ej. 3000"
                  value={transporte}
                  onChange={(e) => setTransporte(e.target.value)}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-servicios" className="form-label">Servicios (Luz, Luz prepago, Agua):</label>
                <input 
                  id="input-servicios"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 2000"
                  value={servicios}
                  onChange={(e) => setServicios(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div className="form-section-title">Otros Gastos y Compromisos</div>

            <div className="grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-internet" className="form-label">Internet y celular (Plan):</label>
                <input 
                  id="input-internet"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 1500"
                  value={internet}
                  onChange={(e) => setInternet(e.target.value)}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-deudas" className="form-label">Cuota de deudas:</label>
                <input 
                  id="input-deudas"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 2000"
                  value={deudas}
                  onChange={(e) => setDeudas(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div className="grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-ahorro" className="form-label">Ahorro deseado:</label>
                <input 
                  id="input-ahorro"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 3000"
                  value={ahorro}
                  onChange={(e) => setAhorro(e.target.value)}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-otros" className="form-label">Otros (Salidas, Ocio, Varios):</label>
                <input 
                  id="input-otros"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 3000"
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
                Calcular costo solo
              </button>
            </div>
          </form>
        </div>

        {/* Results Column */}
        <div className="results-column">
          {showResults ? (
            <div className="card result-card" style={{ height: '100%' }}>
              <h2>Tu Presupuesto para Independizarte</h2>

              <div className="main-cost-display" style={{ padding: '1.25rem 1rem' }}>
                <span className="main-cost-title">Costo Mensual Estimado</span>
                <span className="main-cost-value">
                  RD$ {costoMensual.toLocaleString()}
                </span>
              </div>

              {/* Capital mudanza sugerido */}
              <div className="mudanza-box" style={{ backgroundColor: 'var(--primary-light)', border: '1px solid rgba(37,99,235,0.1)', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>Capital Inicial de Mudanza Recomendado</h3>
                <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.75rem' }}>
                  RD$ {capitalInicialRecomendado.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  <p style={{ margin: '0 0 0.5rem 0' }}>Desglose de inversión inicial mínima:</p>
                  <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <li>Depósito de Contrato (2 garantías + 1 adelanto): <strong>RD$ {(valAlq * 3).toLocaleString()}</strong></li>
                    <li>Electrodomésticos e Inmuebles básicos: <strong>RD$ {electrodomesticosEstimado.toLocaleString()}</strong></li>
                    <li>Mudanza física y contratos iniciales de luz/agua: <strong>RD$ {instalacionYMudanza.toLocaleString()}</strong></li>
                  </ul>
                </div>
              </div>

              {/* Rent warning check */}
              {rentTooHigh && (
                <div className="error-alert" style={{ borderLeftWidth: '5px', marginBottom: '1.5rem' }} role="alert">
                  <AlertTriangle size={24} style={{ flexShrink: 0 }} />
                  <div>
                    <strong>Alerta de Vivienda:</strong> Tu alquiler representa el {rentRatio}% de tu sueldo. Esto supera el 35% saludable aconsejado, comprometiendo tu capacidad para pagar alimentación y servicios básicos. Te sugerimos buscar una habitación alquilada o un lugar de menor precio.
                  </div>
                </div>
              )}

              {/* Educational info box */}
              <div className="recommendation-box" style={{ borderLeft: '4px solid var(--warning)' }}>
                <h3 className="flex-between" style={{ fontSize: '1.05rem', color: '#b45309' }}>
                  <span>Gastos que muchas personas olvidan:</span>
                  <Info size={18} />
                </h3>
                <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                  <li><strong>Depósitos de Alquiler:</strong> Los propietarios dominicanos exigen por ley 2 depósitos de garantía y 1 mes por adelantado.</li>
                  <li><strong>Llenar la cocina:</strong> El primer supermercado de despensa básica (aceite, sal, arroz, productos de limpieza iniciales) es más costoso.</li>
                  <li><strong>Electrodomésticos:</strong> Compra de nevera, estufa y cama. No olvides el tanque de gas y el regulador.</li>
                  <li><strong>Instalación de servicios:</strong> EDES (energía) y compañías telefónicas requieren pagos de fianzas y activación del contrato.</li>
                </ul>
              </div>

              {/* Connections Action Buttons */}
              <div className="connections-actions" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.5rem' }}>
                <Link to="/comparador-supermercados-rd" className="btn btn-secondary btn-block">
                  Comparar supermercados en mi ciudad <ArrowRight size={16} />
                </Link>
                <Link to="/me-alcanza-el-sueldo" className="btn btn-success btn-block">
                  Evaluar salud financiera en "¿Me alcanza el sueldo?" <ArrowRight size={16} />
                </Link>
              </div>

              <AdSlot id="vivirsolo-after-results" placement="Vivir Solo - Después de Resultados" />

              <div className="financial-disclaimer" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '1rem' }}>
                <p><strong>Nota aclaratoria:</strong> Estos cálculos son estimados y tienen fines informativos. Los costos pueden variar según la ciudad, zona, estilo de vida, familia, deudas y precios actuales.</p>
              </div>
            </div>
          ) : (
            <EmptyStateCard
              title="¿Listo para tu espacio propio?"
              description="Completa la información de la izquierda para calcular tu presupuesto mensual para vivir solo, así como el capital inicial total que necesitas para la mudanza."
              icon={Home}
            />
          )}
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <DisclaimerBox type="finanzas" />
      </div>

      <AdSlot id="vivirsolo-before-faq" placement="Vivir Solo - Antes del FAQ" />

      <div className="card" style={{ marginTop: '2rem' }}>
        <FAQSection items={vivirSoloFAQs} />
      </div>

      <AdSlot id="vivirsolo-before-footer" placement="Vivir Solo - Antes del Footer" />

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
