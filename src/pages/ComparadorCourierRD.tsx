import { useState } from 'react';
import { Link } from 'react-router-dom';
import { COURIERS, DEFAULT_DOLAR_RATE, DEFAULT_ADMIN_FEE_OVER_200 } from '../data/courierData';
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
  Scale
} from 'lucide-react';
import { CurrencyToggle, ResultCurrencyToggle } from '../components/CurrencyToggle';
import { 
  convertUsdToRd, 
  convertRdToUsd, 
  normalizeAmountToUSD, 
  formatRD, 
  formatUSD 
} from '../utils/helpers';

export default function ComparadorCourierRD() {
  const [inputCurrency, setInputCurrency] = useState<'USD' | 'RD'>('USD');
  const [resultCurrency, setResultCurrency] = useState<'RD' | 'USD' | 'Ambos'>('Ambos');

  const [precio, setPrecio] = useState<string>('');
  const [pesoLb, setPesoLb] = useState<string>('2');
  const [tasaDolar, setTasaDolar] = useState<string>(DEFAULT_DOLAR_RATE.toString());
  const [cargosAdicionales, setCargosAdicionales] = useState<string>('');

  // Custom rates for each courier
  const [courierRates, setCourierRates] = useState<Record<string, string>>({
    domex: '3.85',
    eps: '4.20',
    'bm-cargo': '4.10',
    cps: '3.90',
    vimenpaq: '3.75',
    aeropaq: '4.30',
    custom: '4.00'
  });

  // Selected couriers to compare
  const [selectedCouriers, setSelectedCouriers] = useState<Record<string, boolean>>({
    domex: true,
    eps: true,
    'bm-cargo': true,
    cps: true,
    vimenpaq: true,
    aeropaq: true,
    custom: false
  });

  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const faqItems: FAQItem[] = [
    {
      question: '¿Cuál es el courier más barato en República Dominicana?',
      answer: 'No hay un único courier que sea el más económico en todos los escenarios. Algunos couriers tienen tarifas bajas por libra (de US$ 3.50 a US$ 3.85) pero aplican cargos adicionales de seguro o manejo. Otros cobran una tarifa fija plana sin extras. Se recomienda comparar según el peso de tus paquetes.'
    },
    {
      question: '¿Por qué las tarifas de los couriers varían por libra?',
      answer: 'Las tarifas por libra varían según el tipo de cliente (personal o corporativo), promociones, convenios con bancos y la sucursal de retiro. Muchos couriers ofrecen descuentos de hasta 15% o tarifas de US$ 2.99/lb si utilizas ciertas tarjetas de crédito dominicanas.'
    },
    {
      question: '¿Qué es el cobro por peso volumétrico?',
      answer: 'Es una tarifa que aplican las aerolíneas a paquetes grandes pero ligeros (como cajas enormes de juguetes o almohadas). Si el volumen de la caja supera al peso físico, el flete se calculará usando el tamaño del paquete. Esta herramienta calcula por peso real en libras; si traes algo grande, consulta con tu courier primero.'
    },
    {
      question: '¿Puedo calcular mi envío en pesos o dólares?',
      answer: 'Sí. Puedes escribir el precio en US$ o RD$ y la herramienta convierte el monto usando la tasa del dólar que indiques. El resultado es aproximado y puede variar según courier y tasa aplicada.'
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
    'name': 'Comparador de Courier RD - CuantoCuestaRD',
    'operatingSystem': 'All',
    'applicationCategory': 'FinanceApplication',
    'description': 'Compara el costo final estimado de flete e importación entre diferentes couriers en la República Dominicana según el peso de tus paquetes.',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'DOP'
    }
  };

  const handleInputCurrencyChange = (newMode: 'USD' | 'RD') => {
    if (newMode === inputCurrency) return;
    const rate = Number(tasaDolar) || 0;
    if (rate <= 0) {
      setInputCurrency(newMode);
      return;
    }
    if (newMode === 'RD') {
      if (precio) setPrecio(Math.round(Number(precio) * rate).toString());
      if (cargosAdicionales) setCargosAdicionales(Math.round(Number(cargosAdicionales) * rate).toString());
    } else {
      if (precio) setPrecio((Number(precio) / rate).toFixed(2).replace(/\.00$/, ''));
      if (cargosAdicionales) setCargosAdicionales((Number(cargosAdicionales) / rate).toFixed(2).replace(/\.00$/, ''));
    }
    setInputCurrency(newMode);
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const valPrecio = Number(precio) || 0;
    const valPeso = Number(pesoLb) || 0;
    const valTasa = Number(tasaDolar) || 0;
    const valCargos = Number(cargosAdicionales) || 0;

    if (valTasa <= 0) {
      setError('Agrega una tasa del dólar válida para convertir entre US$ y RD$.');
      return;
    }
    if (valPrecio <= 0) {
      setError('Por favor, ingresa el precio del producto.');
      return;
    }
    if (valPeso <= 0) {
      setError('El peso en libras debe ser mayor a 0.');
      return;
    }
    if (valCargos < 0) {
      setError('Los montos ingresados no pueden ser negativos.');
      return;
    }

    // Check if at least one courier is selected
    const anySelected = Object.keys(selectedCouriers).some(key => selectedCouriers[key]);
    if (!anySelected) {
      setError('Debes seleccionar al menos un courier para realizar la comparación.');
      return;
    }

    setShowResults(true);
  };

  const handleReset = () => {
    setPrecio('');
    setPesoLb('2');
    setTasaDolar(DEFAULT_DOLAR_RATE.toString());
    setCargosAdicionales('');
    setCourierRates({
      domex: '3.85',
      eps: '4.20',
      'bm-cargo': '4.10',
      cps: '3.90',
      vimenpaq: '3.75',
      aeropaq: '4.30',
      custom: '4.00'
    });
    setSelectedCouriers({
      domex: true,
      eps: true,
      'bm-cargo': true,
      cps: true,
      vimenpaq: true,
      aeropaq: true,
      custom: false
    });
    setInputCurrency('USD');
    setResultCurrency('Ambos');
    setError(null);
    setShowResults(false);
  };

  const handleToggleCourier = (id: string) => {
    setSelectedCouriers(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleRateChange = (id: string, value: string) => {
    setCourierRates(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Calculations
  const valPrecioInput = Number(precio) || 0;
  const valPeso = Number(pesoLb) || 0;
  const valTasa = Number(tasaDolar) || 0;
  const valCargosInput = Number(cargosAdicionales) || 0;

  // Normalized to USD
  const valPrecioUSD = normalizeAmountToUSD(valPrecioInput, inputCurrency, valTasa);
  const valCargosUSD = normalizeAmountToUSD(valCargosInput, inputCurrency, valTasa);

  // CIF Value
  const cifUSD = valPrecioUSD + valCargosUSD;
  const evaluatesSupera = cifUSD > 200;

  let totalImpuestosUSD = 0;
  if (evaluatesSupera) {
    const arancelUSD = cifUSD * 0.20;
    const itbisUSD = (cifUSD + arancelUSD) * 0.18;
    totalImpuestosUSD = arancelUSD + itbisUSD + convertRdToUsd(DEFAULT_ADMIN_FEE_OVER_200, valTasa);
  }

  const baseProductCostUSD = cifUSD + totalImpuestosUSD;

  // Build list of couriers to evaluate
  const couriersListToEvaluate = [
    ...COURIERS,
    { id: 'custom', name: 'Courier Personalizado' }
  ];

  const comparedResults = couriersListToEvaluate
    .filter(c => selectedCouriers[c.id])
    .map(c => {
      const rate = Number(courierRates[c.id]) || 0;
      const fleteUSD = valPeso * rate;
      const totalUSD = baseProductCostUSD + fleteUSD;
      const totalRD = convertUsdToRd(totalUSD, valTasa);
      return {
        ...c,
        rate,
        fleteUSD,
        totalUSD,
        totalRD
      };
    })
    .sort((a, b) => a.totalRD - b.totalRD);

  const cheapestCourier = comparedResults[0];
  const mostExpensiveCourier = comparedResults[comparedResults.length - 1];
  const savingsGapUSD = mostExpensiveCourier && cheapestCourier ? (mostExpensiveCourier.totalUSD - cheapestCourier.totalUSD) : 0;
  const savingsGapRD = convertUsdToRd(savingsGapUSD, valTasa);

  const formatValue = (amountUSD: number) => {
    const amountRD = convertUsdToRd(amountUSD, valTasa);
    if (resultCurrency === 'Ambos') {
      return `${formatUSD(amountUSD)} / ${formatRD(amountRD)}`;
    } else if (resultCurrency === 'RD') {
      return formatRD(amountRD);
    } else {
      return formatUSD(amountUSD);
    }
  };

  return (
    <div className="comparador-courier-page">
      <SEOHead 
        title="Comparador de Courier RD | Calcula y compara tarifas"
        description="Compara couriers en RD según peso, tarifa por libra, tasa del dólar y cargos adicionales para saber cuál es el más económico."
        schema={[faqSchema, appSchema]}
      />

      <PageHero 
        category="courier"
        title="Comparador Courier"
        description="Compara las tarifas de flete y entrega a domicilio de los principales couriers de RD."
        icon={Scale}
        chips={["comparar","courier","tarifas"]}
      />

      <AdSlot id="comparador-under-hero" placement="Comparador Courier - Debajo del Hero" />

      <div className="grid-2">
        {/* Form Column */}
        <div className="card">
          <h2>Datos y Tarifas de Agencias</h2>
          <p>Indica los datos de tu compra y activa o edita las tarifas por libra de cada courier en US$.</p>

          {error && (
            <div className="error-alert" role="alert">
              <AlertTriangle size={20} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleCalculate}>
            <div className="form-section-title">1. Preferencias de Moneda</div>
            
            <CurrencyToggle 
              value={inputCurrency}
              onChange={handleInputCurrencyChange}
              label="Moneda de entrada"
              helpText="Elige si el precio del producto lo vas a escribir en dólares o en pesos dominicanos."
            />

            <ResultCurrencyToggle 
              value={resultCurrency}
              onChange={setResultCurrency}
              label="Mostrar resultado en"
            />

            <div className="form-section-title">2. Información del Paquete</div>

            <div className="grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-precio" className="form-label">
                  Precio del producto ({inputCurrency === 'USD' ? 'US$' : 'RD$'}): *
                </label>
                <input 
                  id="input-precio"
                  type="number"
                  step="0.01"
                  className="form-control"
                  placeholder={inputCurrency === 'USD' ? 'Ej. 120.00' : 'Ej. 7200'}
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-peso" className="form-label">Peso (Libras): *</label>
                <input 
                  id="input-peso"
                  type="number"
                  step="0.1"
                  className="form-control"
                  value={pesoLb}
                  onChange={(e) => setPesoLb(e.target.value)}
                  min="0.1"
                  required
                />
              </div>
            </div>

            <div className="grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-tasa" className="form-label">Tasa del Dólar (RD$): *</label>
                <input 
                  id="input-tasa"
                  type="number"
                  step="0.05"
                  className="form-control"
                  value={tasaDolar}
                  onChange={(e) => setTasaDolar(e.target.value)}
                  min="1"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-cargos" className="form-label">
                  Cargos EE.UU. ({inputCurrency === 'USD' ? 'US$' : 'RD$'}):
                </label>
                <input 
                  id="input-cargos"
                  type="number"
                  step="0.01"
                  className="form-control"
                  placeholder="Ej. 0.00"
                  value={cargosAdicionales}
                  onChange={(e) => setCargosAdicionales(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div className="form-section-title">3. Editar Tarifas de Couriers (US$/libra)</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {couriersListToEvaluate.map(courier => (
                <div key={courier.id} className="grid-3" style={{ gridTemplateColumns: '80px 1fr 100px', alignItems: 'center', gap: '0.5rem', borderBottom: '1px dashed var(--border-color)', paddingBottom: '0.5rem' }}>
                  <div className="checkbox-wrapper">
                    <input 
                      type="checkbox" 
                      id={`chk-${courier.id}`} 
                      checked={selectedCouriers[courier.id]} 
                      onChange={() => handleToggleCourier(courier.id)} 
                    />
                    <label htmlFor={`chk-${courier.id}`} style={{ display: 'none' }}>Comparar {courier.name}</label>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: 500, fontSize: '0.95rem' }}>{courier.name}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      ≈ {formatRD(convertUsdToRd(Number(courierRates[courier.id]) || 0, valTasa))} / lb
                    </span>
                  </div>
                  <input 
                    type="number" 
                    step="0.01" 
                    className="form-control" 
                    style={{ padding: '0.25rem 0.5rem', height: 'auto', minHeight: '34px', textAlign: 'right' }}
                    value={courierRates[courier.id]} 
                    onChange={(e) => handleRateChange(courier.id, e.target.value)} 
                    disabled={!selectedCouriers[courier.id]}
                    min="0"
                  />
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button type="button" className="btn btn-secondary" onClick={handleReset} style={{ flex: 1 }}>
                <RotateCcw size={18} /> Limpiar
              </button>
              <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
                Comparar tarifas
              </button>
            </div>
          </form>
        </div>

        {/* Results Column */}
        <div className="results-column">
          {showResults && comparedResults.length > 0 ? (
            <div className="card result-card" style={{ height: '100%' }}>
              <h2>Comparación de Tarifas</h2>

              {/* Savings Highlight */}
              {savingsGapRD > 0 && (
                <div className="warning-alert" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', backgroundColor: 'var(--success-light)', borderColor: 'var(--success)', color: 'var(--text-main)', borderRadius: 'var(--radius-md)', padding: '1.25rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--success)' }}>
                    <Scale size={20} />
                    <span>Courier más económico: {cheapestCourier.name}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                    El total estimado con él es de <strong>{formatValue(cheapestCourier.totalUSD)}</strong>.
                    ¡Te puedes ahorrar hasta <strong>{formatValue(savingsGapUSD)}</strong> frente al más costoso ({mostExpensiveCourier.name})!
                  </p>
                </div>
              )}

              {/* Dominican Quote Phrase */}
              <div className="dominican-quote" style={{ borderLeftColor: 'var(--primary)', margin: '1.5rem 0' }}>
                <p>
                  "Para este paquete, el courier más económico estimado sería <strong>{cheapestCourier.name}</strong>. La diferencia estimada de flete frente al más caro sería de <strong>{formatValue(savingsGapUSD)}</strong> de ahorro para tu bolsillo."
                </p>
              </div>

              {/* Ranking List */}
              <div className="city-ranking-list" style={{ marginBottom: '1.5rem' }}>
                <h3>Ranking de Couriers (Total con producto y flete)</h3>
                
                {comparedResults.map((item, index) => {
                  const isCheapest = index === 0;
                  const maxCost = comparedResults[comparedResults.length - 1].totalUSD || 1;
                  const barWidth = Math.round((item.totalUSD / maxCost) * 100);

                  return (
                    <div key={item.id} className="city-rank-row" style={{ marginTop: '1.25rem' }}>
                      <div className="flex-between" style={{ marginBottom: '0.25rem' }}>
                        <span style={{ fontWeight: 500, fontSize: '0.95rem' }}>
                          {index + 1}. {item.name} 
                          {isCheapest && <span className="badge-cheapest" style={{ marginLeft: '0.5rem', fontSize: '0.75rem', backgroundColor: 'var(--success-light)', color: 'var(--success)', padding: '0.15rem 0.4rem', borderRadius: '4px', fontWeight: 600 }}>Más Económico</span>}
                        </span>
                        <span style={{ fontWeight: 600 }}>{formatValue(item.totalUSD)}</span>
                      </div>
                      <div className="progress-bar-bg" style={{ height: '12px' }}>
                        <div 
                          className="progress-bar-fill" 
                          style={{ 
                            width: `${barWidth}%`, 
                            backgroundColor: isCheapest ? 'var(--success)' : 'var(--primary)',
                            height: '100%'
                          }}
                        ></div>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem', textAlign: 'right' }}>
                        Flete: {formatValue(item.fleteUSD)} (US$ {item.rate.toFixed(2)} / lb ≈ {formatRD(convertUsdToRd(item.rate, valTasa))} / lb)
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Note on Customs */}
              {evaluatesSupera && (
                <div style={{ fontSize: '0.85rem', color: 'var(--danger)', marginBottom: '1.5rem', padding: '0.5rem', border: '1px solid var(--danger)', borderRadius: '8px', backgroundColor: 'var(--danger-light)' }}>
                  <strong>Nota aduanal:</strong> El valor del paquete supera los US$ 200 FOB, por lo que se sumaron <strong>{formatValue(convertRdToUsd(DEFAULT_ADMIN_FEE_OVER_200, valTasa) + convertRdToUsd(totalImpuestosUSD * valTasa, valTasa))}</strong> de aranceles, ITBIS y cargo de gestión aduanal estimados en todos los totales.
                </div>
              )}

              {/* Cross Connections */}
              <div className="connections-actions" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '1.5rem 0' }}>
                <Link to="/calculadora-presupuesto-mensual-rd" className="btn btn-secondary btn-block">
                  Organizar mi presupuesto mensual <ArrowRight size={16} />
                </Link>
                <Link to="/calculadora-ahorro-mensual-rd" className="btn btn-success btn-block">
                  Calcular cuánto debo ahorrar <ArrowRight size={16} />
                </Link>
              </div>

              <AdSlot id="comparador-after-results" placement="Comparador Courier - Después de Resultados" />

              <div className="financial-disclaimer" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '1rem' }}>
                <p><strong>Nota de variación:</strong> Los resultados dependen de la tasa del dólar que ingreses. El monto final es una referencia para planificar y puede variar según courier, tasa aplicada, peso real, peso volumétrico, impuestos y cargos adicionales.</p>
              </div>
            </div>
          ) : (
            <EmptyStateCard
              title="Comparador de Couriers"
              description="Completa la información del paquete a la izquierda y edita las tarifas de flete para ver un ranking del costo final estimado por courier en pesos dominicanos o dólares."
              icon={Scale}
            />
          )}
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <DisclaimerBox type="courier" />
      </div>

      <AdSlot id="comparador-before-faq" placement="Comparador Courier - Antes del FAQ" />

      <div className="card" style={{ marginTop: '2rem' }}>
        <FAQSection items={faqItems} />
      </div>

      <AdSlot id="comparador-before-footer" placement="Comparador Courier - Antes del Footer" />

      <style>{`
        .checkbox-wrapper input[type="checkbox"] {
          width: 18px;
          height: 18px;
          cursor: pointer;
        }

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
