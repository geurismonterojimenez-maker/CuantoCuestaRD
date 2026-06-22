import { useState } from 'react';
import { Link } from 'react-router-dom';
import { EQUIPAMIENTO_PRICES, DEFAULT_SERVICES_BY_VIVIENDA } from '../data/hogarData';
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
  Truck, 
  CheckCircle2
} from 'lucide-react';

export default function CuantoCuestaMudarseRD() {
  const [city, setCity] = useState<string>('santo-domingo');
  const [viviendaType, setViviendaType] = useState<string>('apartaestudio');
  const [alquiler, setAlquiler] = useState<string>('12000');
  const [depositosCount, setDepositosCount] = useState<string>('2'); // default 2 depósitos
  const [adelantosCount, setAdelantosCount] = useState<string>('1'); // default 1 mes adelante
  const [mudanzaCost, setMudanzaCost] = useState<string>(EQUIPAMIENTO_PRICES.mudanzaFlete.toString());

  // Equipamiento checkboxes
  const [needCama, setNeedCama] = useState<boolean>(true);
  const [needNevera, setNeedNevera] = useState<boolean>(true);
  const [needEstufa, setNeedEstufa] = useState<boolean>(true);
  const [needLavadora, setNeedLavadora] = useState<boolean>(false);
  const [needMuebles, setNeedMuebles] = useState<boolean>(false);

  // Gastos iniciales
  const [needInternetInstalacion, setNeedInternetInstalacion] = useState<boolean>(true);
  const [needGasInicial, setNeedGasInicial] = useState<boolean>(true);
  const [needLimpiezaInicial, setNeedLimpiezaInicial] = useState<boolean>(true);
  const [otrosGastosUnicos, setOtrosGastosUnicos] = useState<string>('');

  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: '¿Cuánto cuesta mudarse solo por primera vez en RD?',
      answer: 'Dependerá del alquiler. El costo inicial de entrada suele ser de 3 meses (2 depósitos de garantía y 1 mes por adelantado). A esto debes sumarle el camión de mudanza (RD$ 3,000 - RD$ 6,000) y el equipamiento básico. Para un apartaestudio modesto de RD$ 12,000 de alquiler, podrías necesitar entre RD$ 50,000 y RD$ 90,000 iniciales para mudarte con lo básico (cama, nevera, estufa).'
    },
    {
      question: '¿Qué es la ley de inquilinato y los depósitos en RD?',
      answer: 'En República Dominicana, es una práctica comercial casi obligatoria pedir dos meses de alquiler en calidad de depósito (garantía que se devuelve al entregar el inmueble en buen estado) y un mes por adelantado. En ocasiones también se suma la redacción del contrato por un abogado (RD$ 1,500 - RD$ 3,000).'
    },
    {
      question: '¿Cuánto se debe ahorrar antes de mudarse?',
      answer: 'Se recomienda encarecidamente tener ahorrado el costo total inicial estimado de la mudanza y el equipamiento, más un fondo de emergencia equivalente a 3 meses de gastos fijos (alquiler + comida + servicios) para evitar deudas en caso de imprevistos.'
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
    'name': 'Calculadora de Mudanza RD - CuantoCuestaRD',
    'operatingSystem': 'All',
    'applicationCategory': 'FinanceApplication',
    'description': 'Calcula cuánto dinero inicial necesitas para mudarte y equipar tu hogar en República Dominicana, estimando depósitos, fletes y electrodomésticos.',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'DOP'
    }
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const valAlquiler = parseInputNumber(alquiler);
    const valDepositos = parseInputNumber(depositosCount);
    const valAdelantos = parseInputNumber(adelantosCount);
    const valMudanza = parseInputNumber(mudanzaCost);
    const valOtros = parseInputNumber(otrosGastosUnicos);

    if (valAlquiler <= 0) {
      setError('Por favor, ingresa el precio del alquiler mensual.');
      return;
    }

    if (valDepositos < 0 || valAdelantos < 0 || valMudanza < 0 || valOtros < 0) {
      setError('Los valores ingresados no pueden ser negativos.');
      return;
    }

    setShowResults(true);
  };

  const handleReset = () => {
    setCity('santo-domingo');
    setViviendaType('apartaestudio');
    setAlquiler('12000');
    setDepositosCount('2');
    setAdelantosCount('1');
    setMudanzaCost(EQUIPAMIENTO_PRICES.mudanzaFlete.toString());
    setNeedCama(true);
    setNeedNevera(true);
    setNeedEstufa(true);
    setNeedLavadora(false);
    setNeedMuebles(false);
    setNeedInternetInstalacion(true);
    setNeedGasInicial(true);
    setNeedLimpiezaInicial(true);
    setOtrosGastosUnicos('');
    setError(null);
    setShowResults(false);
  };

  // Calculations
  const valAlquiler = parseInputNumber(alquiler);
  const valDepositos = parseInputNumber(depositosCount);
  const valAdelantos = parseInputNumber(adelantosCount);
  const valMudanza = parseInputNumber(mudanzaCost);
  const valOtrosUnicos = parseInputNumber(otrosGastosUnicos);

  // Alquiler initial cost
  const totalContratoAlquiler = valAlquiler * (valDepositos + valAdelantos);

  // Equipment sum
  let totalEquipamiento = 0;
  if (needCama) totalEquipamiento += EQUIPAMIENTO_PRICES.cama;
  if (needNevera) totalEquipamiento += EQUIPAMIENTO_PRICES.nevera;
  if (needEstufa) totalEquipamiento += EQUIPAMIENTO_PRICES.estufa;
  if (needLavadora) totalEquipamiento += EQUIPAMIENTO_PRICES.lavadora;
  if (needMuebles) totalEquipamiento += EQUIPAMIENTO_PRICES.muebles;

  // Other unique expenses
  let totalOtrosUnicos = 0;
  if (needInternetInstalacion) totalOtrosUnicos += EQUIPAMIENTO_PRICES.internetInstalacion;
  if (needGasInicial) totalOtrosUnicos += EQUIPAMIENTO_PRICES.gasInicial;
  if (needLimpiezaInicial) totalOtrosUnicos += EQUIPAMIENTO_PRICES.productosLimpieza;

  // Total Initial Needed
  const totalDineroInicial = totalContratoAlquiler + valMudanza + totalEquipamiento + totalOtrosUnicos + valOtrosUnicos;

  // Recurring monthly estimates
  const defaultServices = DEFAULT_SERVICES_BY_VIVIENDA[viviendaType] || { luz: 1500, agua: 300, gas: 300, internet: 1500 };
  const estimacionServiciosMensuales = defaultServices.luz + defaultServices.agua + defaultServices.gas + defaultServices.internet;
  const gastoMensualDespuesMudanza = valAlquiler + estimacionServiciosMensuales;

  return (
    <div className="mudarse-page">
      <SEOHead 
        title="Cuánto cuesta mudarse en RD | Calculadora"
        description="Calcula cuánto dinero podría necesitar para mudarte en República Dominicana, incluyendo depósito, adelanto, mudanza y artículos básicos."
        schema={[faqSchema, appSchema]}
      />

      <PageHero 
        category="hogar"
        title="Mudarse y Equipar una Casa"
        description="Calcula el dinero inicial necesario para flete, depósitos de alquiler y electrodomésticos básicos."
        icon={Truck}
        chips={["mudarse","mudanza","equipar"]}
      />

      <AdSlot id="mudarse-under-hero" placement="Mudanza - Debajo del Hero" />

      <div className="grid-2">
        {/* Form Column */}
        <div className="card">
          <h2>Detalles de la Mudanza</h2>
          <p>Llena la información de alquiler y selecciona los electrodomésticos indispensables que necesitas comprar.</p>

          {error && (
            <div className="error-alert" role="alert">
              <AlertTriangle size={20} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleCalculate}>
            <div className="form-section-title">1. Vivienda y Alquiler</div>
            
            <div className="grid-2" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="select-city" className="form-label">Ciudad / Provincia:</label>
                <select 
                  id="select-city"
                  className="form-control"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option value="santo-domingo">Santo Domingo</option>
                  <option value="santiago">Santiago</option>
                  <option value="punta-cana">Punta Cana</option>
                  <option value="otra">Otra Provincia</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="select-vivienda" className="form-label">Tipo de vivienda: *</label>
                <select 
                  id="select-vivienda"
                  className="form-control"
                  value={viviendaType}
                  onChange={(e) => {
                    setViviendaType(e.target.value);
                    const defs = DEFAULT_SERVICES_BY_VIVIENDA[e.target.value];
                    if (defs) {
                      setAlquiler(defs.alquiler.toString());
                    }
                  }}
                >
                  <option value="apartaestudio">Apartaestudio</option>
                  <option value="habitacion">Habitación en casa/pensión</option>
                  <option value="apartamento">Apartamento completo</option>
                  <option value="casa">Casa completa</option>
                </select>
              </div>
            </div>

            <div className="grid-2" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-alquiler" className="form-label">Alquiler mensual (RD$): *</label>
                <input 
                  id="input-alquiler"
                  type="number"
                  className="form-control"
                  value={alquiler}
                  onChange={(e) => setAlquiler(e.target.value)}
                  min="1"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-mudanza" className="form-label">Flete / Camión de mudanza:</label>
                <input 
                  id="input-mudanza"
                  type="number"
                  className="form-control"
                  value={mudanzaCost}
                  onChange={(e) => setMudanzaCost(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div className="grid-2" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-depositos" className="form-label">Cant. de Depósitos (Garantía):</label>
                <input 
                  id="input-depositos"
                  type="number"
                  className="form-control"
                  value={depositosCount}
                  onChange={(e) => setDepositosCount(e.target.value)}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-adelantos" className="form-label">Meses por Adelantado:</label>
                <input 
                  id="input-adelantos"
                  type="number"
                  className="form-control"
                  value={adelantosCount}
                  onChange={(e) => setAdelantosCount(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div className="form-section-title">2. Electrodomésticos y Muebles Nuevos</div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>Selecciona lo que debes comprar para amueblar (costos estimados):</p>
            
            <div className="flex-between" style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)' }}>
              <label htmlFor="checkbox-cama" className="form-label" style={{ marginBottom: 0, cursor: 'pointer' }}>Cama (RD$ 15,000)</label>
              <input 
                id="checkbox-cama"
                type="checkbox"
                checked={needCama}
                onChange={(e) => setNeedCama(e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
            </div>

            <div className="flex-between" style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)', marginTop: '0.25rem' }}>
              <label htmlFor="checkbox-nevera" className="form-label" style={{ marginBottom: 0, cursor: 'pointer' }}>Nevera (RD$ 25,000)</label>
              <input 
                id="checkbox-nevera"
                type="checkbox"
                checked={needNevera}
                onChange={(e) => setNeedNevera(e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
            </div>

            <div className="flex-between" style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)', marginTop: '0.25rem' }}>
              <label htmlFor="checkbox-estufa" className="form-label" style={{ marginBottom: 0, cursor: 'pointer' }}>Estufa de gas (RD$ 18,000)</label>
              <input 
                id="checkbox-estufa"
                type="checkbox"
                checked={needEstufa}
                onChange={(e) => setNeedEstufa(e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
            </div>

            <div className="flex-between" style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)', marginTop: '0.25rem' }}>
              <label htmlFor="checkbox-lavadora" className="form-label" style={{ marginBottom: 0, cursor: 'pointer' }}>Lavadora (RD$ 14,000)</label>
              <input 
                id="checkbox-lavadora"
                type="checkbox"
                checked={needLavadora}
                onChange={(e) => setNeedLavadora(e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
            </div>

            <div className="flex-between" style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)', marginTop: '0.25rem' }}>
              <label htmlFor="checkbox-muebles" className="form-label" style={{ marginBottom: 0, cursor: 'pointer' }}>Juego de Muebles / Sala (RD$ 20,000)</label>
              <input 
                id="checkbox-muebles"
                type="checkbox"
                checked={needMuebles}
                onChange={(e) => setNeedMuebles(e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
            </div>

            <div className="form-section-title">3. Gastos Básicos de Instalación</div>
            <div className="grid-3" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', fontSize: '0.85rem' }}>
              <div style={{ textAlign: 'center', backgroundColor: 'var(--bg-color)', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                <input 
                  id="checkbox-int"
                  type="checkbox"
                  checked={needInternetInstalacion}
                  onChange={(e) => setNeedInternetInstalacion(e.target.checked)}
                  style={{ cursor: 'pointer' }}
                />
                <label htmlFor="checkbox-int" style={{ display: 'block', cursor: 'pointer', marginTop: '0.25rem' }}>Internet (RD$ 1000)</label>
              </div>

              <div style={{ textAlign: 'center', backgroundColor: 'var(--bg-color)', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                <input 
                  id="checkbox-gas"
                  type="checkbox"
                  checked={needGasInicial}
                  onChange={(e) => setNeedGasInicial(e.target.checked)}
                  style={{ cursor: 'pointer' }}
                />
                <label htmlFor="checkbox-gas" style={{ display: 'block', cursor: 'pointer', marginTop: '0.25rem' }}>Gas cilindro (RD$ 1220)</label>
              </div>

              <div style={{ textAlign: 'center', backgroundColor: 'var(--bg-color)', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                <input 
                  id="checkbox-limpieza"
                  type="checkbox"
                  checked={needLimpiezaInicial}
                  onChange={(e) => setNeedLimpiezaInicial(e.target.checked)}
                  style={{ cursor: 'pointer' }}
                />
                <label htmlFor="checkbox-limpieza" style={{ display: 'block', cursor: 'pointer', marginTop: '0.25rem' }}>Limpieza (RD$ 1200)</label>
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '1.25rem' }}>
              <label htmlFor="input-otros-unicos" className="form-label">Otros gastos únicos iniciales (RD$):</label>
              <input 
                id="input-otros-unicos"
                type="number"
                className="form-control"
                placeholder="Ej. 3000 (redacción contrato, pintura)"
                value={otrosGastosUnicos}
                onChange={(e) => setOtrosGastosUnicos(e.target.value)}
                min="0"
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button type="button" className="btn btn-secondary" onClick={handleReset} style={{ flex: 1 }}>
                <RotateCcw size={18} /> Limpiar
              </button>
              <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
                Calcular mudanza
              </button>
            </div>
          </form>
        </div>

        {/* Results Column */}
        <div className="results-column">
          {showResults ? (
            <div className="card result-card" style={{ height: '100%' }}>
              <h2>Presupuesto de Mudanza</h2>

              <div className="main-cost-display" style={{ padding: '1.25rem 1rem' }}>
                <span className="main-cost-title">Dinero Inicial Necesario</span>
                <span className="main-cost-value">
                  {formatRD(totalDineroInicial)}
                </span>
                <span className="main-cost-title" style={{ marginTop: '0.5rem', fontSize: '0.85rem', textTransform: 'none' }}>
                  (Gasto mensual recurrente posterior: {formatRD(gastoMensualDespuesMudanza)})
                </span>
              </div>

              {/* Dominican Quote Phrase */}
              <div className="dominican-quote" style={{ borderLeftColor: 'var(--primary)', margin: '1.5rem 0' }}>
                <p>
                  "Para mudarte a tu nuevo {viviendaType}, podrías necesitar aproximadamente <strong>{formatRD(totalDineroInicial)} al inicio</strong> como referencia para planificar, considerando depósitos, mudanza y electrodomésticos básicos."
                </p>
              </div>

              {/* Breakdown lists */}
              <div className="budget-rules-breakdown" style={{ margin: '1.5rem 0' }}>
                <h3>Desglose de Gastos Únicos Iniciales</h3>
                <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.4rem', marginBottom: '0.4rem', fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Depósitos y Adelanto ({valDepositos + valAdelantos} meses):</span>
                  <span>{formatRD(totalContratoAlquiler)}</span>
                </div>
                <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.4rem', marginBottom: '0.4rem', fontSize: '0.9rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Servicio de Flete / Camión:</span>
                  <span>{formatRD(valMudanza)}</span>
                </div>
                {totalEquipamiento > 0 && (
                  <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.4rem', marginBottom: '0.4rem', fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Compra de Electrodomésticos / Muebles:</span>
                    <span>{formatRD(totalEquipamiento)}</span>
                  </div>
                )}
                {totalOtrosUnicos > 0 && (
                  <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.4rem', marginBottom: '0.4rem', fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Instalaciones iniciales:</span>
                    <span>{formatRD(totalOtrosUnicos)}</span>
                  </div>
                )}
                {valOtrosUnicos > 0 && (
                  <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.4rem', marginBottom: '0.4rem', fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Otros gastos únicos:</span>
                    <span>{formatRD(valOtrosUnicos)}</span>
                  </div>
                )}
              </div>

              {/* Recurring expenses projection */}
              <div className="budget-rules-breakdown" style={{ margin: '1.5rem 0', backgroundColor: 'var(--bg-color)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <h3>Proyección de Gasto Mensual Fijo</h3>
                <div className="flex-between" style={{ paddingBottom: '0.3rem', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Alquiler de vivienda:</span>
                  <span>{formatRD(valAlquiler)}</span>
                </div>
                <div className="flex-between" style={{ paddingBottom: '0.3rem', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Servicios básicos estimados ({viviendaType}):</span>
                  <span>{formatRD(estimacionServiciosMensuales)}</span>
                </div>
                <div className="flex-between" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.4rem', marginTop: '0.4rem', fontWeight: 600, fontSize: '0.9rem' }}>
                  <span>Estimación Fijo Mensual:</span>
                  <span className="text-primary">{formatRD(gastoMensualDespuesMudanza)}</span>
                </div>
              </div>

              {/* Cushion saving advice */}
              <div style={{ display: 'flex', gap: '0.5rem', margin: '1rem 0', padding: '1rem', backgroundColor: '#ecfdf5', borderLeft: '4px solid var(--success)', borderRadius: '8px', fontSize: '0.9rem' }}>
                <CheckCircle2 size={20} className="text-success" style={{ flexShrink: 0 }} />
                <div>
                  <strong>Colchón de seguridad recomendado:</strong> Se aconseja ahorrar el presupuesto inicial de <strong>{formatRD(totalDineroInicial)}</strong> más un fondo de reserva mensual de <strong>{formatRD(gastoMensualDespuesMudanza)}</strong> para afrontar el primer mes con tranquilidad financiera.
                </div>
              </div>

              {/* Cross Connections */}
              <div className="connections-actions" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '1.5rem 0' }}>
                <Link to="/me-alcanza-el-sueldo" className="btn btn-secondary btn-block">
                  ¿Mi sueldo me alcanza para vivir solo? <ArrowRight size={16} />
                </Link>
                <Link to="/cuanto-cuesta-vivir-solo-en-rd" className="btn btn-secondary btn-block">
                  Ver costo de vida para personas solas
                </Link>
                <Link to="/calculadora-ahorro-mensual-rd" className="btn btn-success btn-block">
                  Crear una meta de ahorro para mi mudanza
                </Link>
              </div>

              <AdSlot id="mudarse-after-results" placement="Mudanza - Después de Resultados" />

              <div className="financial-disclaimer" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '1rem' }}>
                <p><strong>Nota aclaratoria:</strong> Estos costos son aproximaciones de referencia para planificar y tienen fines informativos. El valor real varía según los términos contractuales de la inmobiliaria, precios de tiendas de electrodomésticos en RD, costo real de mudanza y consumos domésticos particulares.</p>
              </div>
            </div>
          ) : (
            <EmptyStateCard
              title="Presupuesto para Mudarse"
              description="Coloca el valor del alquiler y selecciona los electrodomésticos indispensables que necesitas adquirir para calcular el presupuesto inicial a ahorrar antes de mudarte."
              icon={Truck}
            />
          )}
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <DisclaimerBox type="hogar" />
      </div>

      <AdSlot id="mudarse-before-faq" placement="Mudanza - Antes del FAQ" />

      <div className="card" style={{ marginTop: '2rem' }}>
        <FAQSection items={faqItems} />
      </div>

      <AdSlot id="mudarse-before-footer" placement="Mudanza - Antes del Footer" />

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
