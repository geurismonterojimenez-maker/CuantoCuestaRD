import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatRD, parseInputNumber } from '../utils/helpers';
import { calculateElectricBill } from '../data/hogarData';
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
  Zap, 
  Lightbulb
} from 'lucide-react';

export default function CalculadoraLuzRD() {
  const [viviendaType, setViviendaType] = useState<string>('apartamento');
  const [abanicos, setAbanicos] = useState<string>('2');
  const [aires, setAires] = useState<string>('1');
  const [hasNevera, setHasNevera] = useState<boolean>(true);
  const [hasLavadora, setHasLavadora] = useState<boolean>(true);
  const [televisores, setTelevisores] = useState<string>('2');
  const [computadoras, setComputadoras] = useState<string>('1');
  const [horasUso, setHorasUso] = useState<string>('6'); // average hours per day
  const [montoReferencia, setMontoReferencia] = useState<string>('');

  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: '¿Cuánto se paga de luz al mes en República Dominicana?',
      answer: 'El monto mensual varía según el consumo medido en kilovatios-hora (kWh). Hogares de bajo consumo pagan entre RD$ 500 y RD$ 1,500. Sin embargo, hogares de clase media con aires acondicionados o electrodomésticos de alto consumo suelen pagar entre RD$ 3,000 y RD$ 8,000, pudiendo superar los RD$ 15,000 en viviendas grandes con varios aires.'
    },
    {
      question: '¿Cómo funciona la escala de cobro de luz en RD?',
      answer: 'Las distribuidoras eléctricas (Edesur, Edenorte, Edeeste) aplican una tarifa escalonada por bloques de consumo mensual. Los primeros 200 kWh se cobran a un precio bajo (~RD$ 5.80/kWh), pero a partir de ahí la tarifa se incrementa. Si pasas de 700 kWh al mes, todo tu consumo se factura a la tarifa más cara (~RD$ 13.60/kWh).'
    },
    {
      question: '¿Cuál es el equipo eléctrico que más consume en el hogar?',
      answer: 'El aire acondicionado es, por mucho, el equipo que más eleva la factura de luz en República Dominicana, representando comúnmente más del 60% del consumo de la vivienda. La nevera (por estar conectada las 24 horas) y la plancha o secadoras también influyen notablemente.'
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
    'name': 'Calculadora de Luz RD - CuantoCuestaRD',
    'operatingSystem': 'All',
    'applicationCategory': 'FinanceApplication',
    'description': 'Estima tu gasto mensual de energía eléctrica en pesos en base a tus electrodomésticos y horas de uso en República Dominicana.',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'DOP'
    }
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const valAbanicos = parseInputNumber(abanicos);
    const valAires = parseInputNumber(aires);
    const valTelevisores = parseInputNumber(televisores);
    const valComputadoras = parseInputNumber(computadoras);
    const valHoras = parseInputNumber(horasUso);
    const valRef = montoReferencia ? parseInputNumber(montoReferencia) : 0;

    if (valHoras <= 0 || valHoras > 24) {
      setError('Las horas de uso diario deben ser entre 1 y 24.');
      return;
    }

    if (valAbanicos < 0 || valAires < 0 || valTelevisores < 0 || valComputadoras < 0 || valRef < 0) {
      setError('Los valores ingresados no pueden ser negativos.');
      return;
    }

    setShowResults(true);
  };

  const handleReset = () => {
    setViviendaType('apartamento');
    setAbanicos('2');
    setAires('1');
    setHasNevera(true);
    setHasLavadora(true);
    setTelevisores('2');
    setComputadoras('1');
    setHorasUso('6');
    setMontoReferencia('');
    setError(null);
    setShowResults(false);
  };

  // Calculations
  const valAbanicos = parseInputNumber(abanicos);
  const valAires = parseInputNumber(aires);
  const valTelevisores = parseInputNumber(televisores);
  const valComputadoras = parseInputNumber(computadoras);
  const valHoras = parseInputNumber(horasUso);
  const valRef = Number(montoReferencia) || 0;

  // Estimate monthly kWh consumption
  const kwhAbanicos = 0.08 * valAbanicos * valHoras * 30; // 80W per fan
  const kwhAires = 1.2 * valAires * valHoras * 30; // 1200W per AC
  const kwhNevera = hasNevera ? 90 : 0; // standard constant fridge kwh
  const kwhLavadora = hasLavadora ? 15 : 0; // average 15 kwh
  const kwhTV = 0.1 * valTelevisores * valHoras * 30; // 100W per TV
  const kwhComp = 0.15 * valComputadoras * valHoras * 30; // 150W per PC

  const totalKWh = kwhAbanicos + kwhAires + kwhNevera + kwhLavadora + kwhTV + kwhComp;
  const estimatedBill = calculateElectricBill(totalKWh);

  // Consumption level classification
  let level = 'Bajo';
  let levelClass = 'tag-success';
  let levelDesc = 'Tu consumo se encuentra en la escala básica. Gozas de una tarifa subsidiada por el Estado.';

  if (totalKWh > 200 && totalKWh <= 500) {
    level = 'Medio';
    levelClass = 'tag-warning';
    levelDesc = 'Consumo moderado. Intenta mantener los aires apagados cuando no los uses para no saltar al siguiente bloque de tarifas.';
  } else if (totalKWh > 500) {
    level = 'Alto';
    levelClass = 'tag-danger';
    levelDesc = '¡Cuidado! Estás consumiendo mucha energía. A este nivel, el precio de cada kilovatio-hora se duplica y tu factura se disparará.';
  }

  // Equipment that influences the most
  let keyInfluencer = 'Uso general de electrodomésticos';
  if (valAires > 0) {
    keyInfluencer = 'Aire Acondicionado';
  } else if (hasNevera) {
    keyInfluencer = 'Nevera';
  } else if (valAbanicos > 2) {
    keyInfluencer = 'Abanicos / Ventiladores';
  }

  return (
    <div className="luz-page">
      <SEOHead 
        title="Calculadora de Luz RD | Estima tu factura mensual"
        description="Estima tu gasto mensual de luz en RD según tipo de vivienda, equipos eléctricos y hábitos de uso."
        schema={[faqSchema, appSchema]}
      />

      <PageHero 
        category="hogar"
        title="Luz"
        description="Estima tu factura eléctrica mensual en base a tus electrodomésticos y horas de uso diario."
        icon={Zap}
        chips={["luz","electricidad","edesur"]}
      />

      <AdSlot id="luz-under-hero" placement="Luz - Debajo del Hero" />

      <div className="grid-2">
        {/* Form Column */}
        <div className="card">
          <h2>Equipos Eléctricos y Uso</h2>
          <p>Indica la cantidad de equipos en tu hogar y las horas de uso diario promedio.</p>

          {error && (
            <div className="error-alert" role="alert">
              <AlertTriangle size={20} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleCalculate}>
            <div className="grid-2" style={{ gridTemplateColumns: '1.2fr 0.8fr', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="select-vivienda" className="form-label">Tipo de vivienda: *</label>
                <select 
                  id="select-vivienda"
                  className="form-control"
                  value={viviendaType}
                  onChange={(e) => setViviendaType(e.target.value)}
                >
                  <option value="habitacion">Habitación sola</option>
                  <option value="apartaestudio">Apartaestudio</option>
                  <option value="apartamento">Apartamento</option>
                  <option value="casa">Casa</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="input-horas" className="form-label">Uso diario (Horas): *</label>
                <input 
                  id="input-horas"
                  type="number"
                  className="form-control"
                  value={horasUso}
                  onChange={(e) => setHorasUso(e.target.value)}
                  min="1"
                  max="24"
                  required
                />
              </div>
            </div>

            <div className="form-section-title">1. Climatización y Ventilación</div>
            <div className="grid-2" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-abanicos" className="form-label">Cantidad de abanicos:</label>
                <input 
                  id="input-abanicos"
                  type="number"
                  className="form-control"
                  value={abanicos}
                  onChange={(e) => setAbanicos(e.target.value)}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-aires" className="form-label">Aires acondicionados:</label>
                <input 
                  id="input-aires"
                  type="number"
                  className="form-control"
                  value={aires}
                  onChange={(e) => setAires(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div className="form-section-title">2. Cocina y Lavado</div>
            <div className="flex-between" style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)' }}>
              <label htmlFor="checkbox-nevera" className="form-label" style={{ marginBottom: 0, cursor: 'pointer' }}>¿Tienes Nevera / Refrigerador?</label>
              <input 
                id="checkbox-nevera"
                type="checkbox"
                checked={hasNevera}
                onChange={(e) => setHasNevera(e.target.checked)}
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />
            </div>
            
            <div className="flex-between" style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)', marginTop: '0.5rem' }}>
              <label htmlFor="checkbox-lavadora" className="form-label" style={{ marginBottom: 0, cursor: 'pointer' }}>¿Tienes Lavadora de ropa?</label>
              <input 
                id="checkbox-lavadora"
                type="checkbox"
                checked={hasLavadora}
                onChange={(e) => setHasLavadora(e.target.checked)}
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />
            </div>

            <div className="form-section-title">3. Entretenimiento y Oficina</div>
            <div className="grid-2" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-tvs" className="form-label">Televisores:</label>
                <input 
                  id="input-tvs"
                  type="number"
                  className="form-control"
                  value={televisores}
                  onChange={(e) => setTelevisores(e.target.value)}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-pcs" className="form-label">Computadoras / Laptops:</label>
                <input 
                  id="input-pcs"
                  type="number"
                  className="form-control"
                  value={computadoras}
                  onChange={(e) => setComputadoras(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div className="form-section-title">4. Referencia de Control (Opcional)</div>
            <div className="form-group">
              <label htmlFor="input-ref" className="form-label">Último monto de factura de luz (RD$):</label>
              <input 
                id="input-ref"
                type="number"
                className="form-control"
                placeholder="Ej. 1800"
                value={montoReferencia}
                onChange={(e) => setMontoReferencia(e.target.value)}
                min="0"
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button type="button" className="btn btn-secondary" onClick={handleReset} style={{ flex: 1 }}>
                <RotateCcw size={18} /> Limpiar
              </button>
              <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
                Calcular luz
              </button>
            </div>
          </form>
        </div>

        {/* Results Column */}
        <div className="results-column">
          {showResults ? (
            <div className="card result-card" style={{ height: '100%' }}>
              <h2>Estimación de Factura de Luz</h2>

              <div className="main-cost-display" style={{ padding: '1.25rem 1rem' }}>
                <span className="main-cost-title">Monto mensual estimado</span>
                <span className="main-cost-value">
                  {formatRD(estimatedBill)}
                </span>
                <span className="main-cost-title" style={{ marginTop: '0.5rem', fontSize: '0.85rem', textTransform: 'none' }}>
                  (Consumo estimado: {Math.round(totalKWh)} kWh al mes)
                </span>
              </div>

              {/* Dominican Quote Phrase */}
              <div className="dominican-quote" style={{ borderLeftColor: 'var(--primary)', margin: '1.5rem 0' }}>
                <p>
                  "Tu gasto mensual estimado de luz rondaría los <strong>{formatRD(estimatedBill)}</strong>. El equipo que más influye en el cálculo es <strong>{keyInfluencer}</strong>. Recuerda que esto es una estimación de referencia para planificar."
                </p>
              </div>

              {/* Consumption Level alert */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '1rem 0', padding: '0.75rem', borderRadius: '8px', backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Nivel de consumo:</span>
                <span className={`tag ${levelClass}`} style={{ fontSize: '0.85rem', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>{level}</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>{levelDesc}</p>

              {/* Savings Tips Box */}
              <div className="budget-rules-breakdown" style={{ margin: '1.5rem 0' }}>
                <h3>Consejos para bajar tu factura eléctrica</h3>
                <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.9rem' }}>
                  <li style={{ color: 'var(--text-main)' }}>
                    <Lightbulb size={14} className="text-success" style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                    Usa el aire acondicionado en 24°C y activa el temporizador de apagado automático de noche.
                  </li>
                  <li style={{ color: 'var(--text-main)' }}>
                    <Lightbulb size={14} className="text-success" style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                    Revisa las gomas de la nevera para asegurarte de que cierre herméticamente.
                  </li>
                  <li style={{ color: 'var(--text-main)' }}>
                    <Lightbulb size={14} className="text-success" style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                    Aprovecha la luz del día y sustituye bombillas convencionales por luces LED.
                  </li>
                </ul>
              </div>

              {/* Comparison with reference if provided */}
              {valRef > 0 && (
                <div className="dominican-quote" style={{ borderLeftColor: estimatedBill > valRef ? 'var(--danger)' : 'var(--success)', backgroundColor: 'var(--bg-color)', padding: '1rem', borderRadius: '8px', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  <strong>Comparación con tu factura real:</strong> 
                  {estimatedBill > valRef 
                    ? ` El estimado calculado (${formatRD(estimatedBill)}) es superior a tu última factura real (${formatRD(valRef)}). Es un buen momento para auditar fugas eléctricas.`
                    : ` ¡Buen trabajo! Tu factura real (${formatRD(valRef)}) está en línea o es superior al estimado teórico calculado (${formatRD(estimatedBill)}).`
                  }
                </div>
              )}

              {/* Cross Connections */}
              <div className="connections-actions" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '1.5rem 0' }}>
                <Link to="/calculadora-servicios-hogar-rd" className="btn btn-secondary btn-block">
                  Calcular todos mis servicios juntos <ArrowRight size={16} />
                </Link>
                <Link to="/me-alcanza-el-sueldo" className="btn btn-secondary btn-block">
                  ¿Me alcanza el sueldo para pagar la luz?
                </Link>
              </div>

              <AdSlot id="luz-after-results" placement="Luz - Después de Resultados" />

              <div className="financial-disclaimer" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '1rem' }}>
                <p><strong>Nota aclaratoria:</strong> Estos cálculos son estimaciones teóricas de consumo y tienen fines informativos. El monto real de tu factura eléctrica depende de cargos por kilovatio de tu distribuidora (Edeeste, Edesur, Edenorte), variaciones estacionales de temperatura y fluctuaciones en el voltaje.</p>
              </div>
            </div>
          ) : (
            <EmptyStateCard
              title="Consumo de Luz Estimado"
              description="Completa la cantidad de aires acondicionados, abanicos y horas de uso diario para calcular los kilovatios-hora promedio mensuales y estimar el costo de la factura en RD."
              icon={Zap}
            />
          )}
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <DisclaimerBox type="hogar" />
      </div>

      <AdSlot id="luz-before-faq" placement="Luz - Antes del FAQ" />

      <div className="card" style={{ marginTop: '2rem' }}>
        <FAQSection items={faqItems} />
      </div>

      <AdSlot id="luz-before-footer" placement="Luz - Antes del Footer" />

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
