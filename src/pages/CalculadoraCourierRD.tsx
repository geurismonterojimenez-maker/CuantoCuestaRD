import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DEFAULT_DOLAR_RATE, DEFAULT_ADMIN_FEE_OVER_200 } from '../data/courierData';
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
  DollarSign,
  Package
} from 'lucide-react';
import { CurrencyToggle, ResultCurrencyToggle } from '../components/CurrencyToggle';
import { 
  convertUsdToRd, 
  convertRdToUsd, 
  normalizeAmountToUSD, 
  formatRD, 
  formatUSD 
} from '../utils/helpers';

export default function CalculadoraCourierRD() {
  const [inputCurrency, setInputCurrency] = useState<'USD' | 'RD'>('USD');
  const [resultCurrency, setResultCurrency] = useState<'RD' | 'USD' | 'Ambos'>('Ambos');
  
  const [precio, setPrecio] = useState<string>('');
  const [pesoLb, setPesoLb] = useState<string>('');
  const [tarifaLb, setTarifaLb] = useState<string>('3.90'); // default average rate
  const [tasaDolar, setTasaDolar] = useState<string>(DEFAULT_DOLAR_RATE.toString());
  const [envioUS, setEnvioUS] = useState<string>('');
  const [seguro, setSeguro] = useState<string>('');
  const [supera200Option, setSupera200Option] = useState<string>('auto'); // auto, si, no

  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const faqItems: FAQItem[] = [
    {
      question: '¿Cuánto cuesta traer un paquete a RD por courier?',
      answer: 'Traer un paquete cuesta la tarifa por libra de tu courier (habitualmente de US$ 3.50 a US$ 4.50) multiplicada por el peso en libras, convertido a pesos con la tasa del dólar actual. A esto se le suman cargos extras como seguro y el precio del producto en sí.'
    },
    {
      question: '¿Qué pasa si mi paquete pasa de US$ 200?',
      answer: 'Si el valor de los artículos del paquete supera los US$ 200 FOB, pierde la exención de impuestos (de minimis) en aduanas dominicanas. Deberás pagar aranceles (normalmente 20% sobre el valor CIF) e ITBIS (18% sobre CIF + aranceles), además de un recargo administrativo del courier por el trámite de desaduanado.'
    },
    {
      question: '¿Qué es el valor CIF y cómo afecta mis impuestos?',
      answer: 'El valor CIF es la sigla en inglés de Cost, Insurance and Freight (Costo del producto + Seguro + Envío/Flete a EE.UU.). Los impuestos aduanales en la República Dominicana se calculan sobre la suma de estos tres conceptos, no solo sobre el precio de factura del artículo.'
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
    'name': 'Calculadora Courier RD - CuantoCuestaRD',
    'operatingSystem': 'All',
    'applicationCategory': 'FinanceApplication',
    'description': 'Calcula cuánto cuesta traer un paquete por courier a República Dominicana, estimando aranceles, ITBIS e impacto si supera los US$ 200.',
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
      if (envioUS) setEnvioUS(Math.round(Number(envioUS) * rate).toString());
      if (seguro) setSeguro(Math.round(Number(seguro) * rate).toString());
    } else {
      if (precio) setPrecio((Number(precio) / rate).toFixed(2).replace(/\.00$/, ''));
      if (envioUS) setEnvioUS((Number(envioUS) / rate).toFixed(2).replace(/\.00$/, ''));
      if (seguro) setSeguro((Number(seguro) / rate).toFixed(2).replace(/\.00$/, ''));
    }
    setInputCurrency(newMode);
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const valPrecio = Number(precio) || 0;
    const valPeso = Number(pesoLb) || 0;
    const valTarifa = Number(tarifaLb) || 0;
    const valTasa = Number(tasaDolar) || 0;
    const valEnvio = Number(envioUS) || 0;
    const valSeg = Number(seguro) || 0;

    if (valTasa <= 0) {
      setError('Agrega una tasa del dólar válida para convertir entre US$ y RD$.');
      return;
    }
    if (valPrecio <= 0) {
      setError('Por favor, ingresa el precio del producto.');
      return;
    }
    if (valPeso <= 0) {
      setError('Por favor, ingresa el peso del paquete en libras.');
      return;
    }
    if (valTarifa < 0 || valEnvio < 0 || valSeg < 0) {
      setError('Los montos ingresados no pueden ser negativos.');
      return;
    }

    setShowResults(true);
  };

  const handleReset = () => {
    setPrecio('');
    setPesoLb('');
    setTarifaLb('3.90');
    setTasaDolar(DEFAULT_DOLAR_RATE.toString());
    setEnvioUS('');
    setSeguro('');
    setSupera200Option('auto');
    setInputCurrency('USD');
    setResultCurrency('Ambos');
    setError(null);
    setShowResults(false);
  };

  // Calculations
  const valPrecioInput = Number(precio) || 0;
  const valEnvioInput = Number(envioUS) || 0;
  const valSeguroInput = Number(seguro) || 0;
  const valTasa = Number(tasaDolar) || 0;
  const valPeso = Number(pesoLb) || 0;
  const valTarifa = Number(tarifaLb) || 0;

  // Normalized to USD
  const valPrecioUSD = normalizeAmountToUSD(valPrecioInput, inputCurrency, valTasa);
  const valEnvioUSD = normalizeAmountToUSD(valEnvioInput, inputCurrency, valTasa);
  const valSeguroUSD = normalizeAmountToUSD(valSeguroInput, inputCurrency, valTasa);
  const costCourierUSD = valPeso * valTarifa;
  const extrasUSD = valSeguroUSD + valEnvioUSD;

  // Customs calculations (done in USD)
  const evaluatesSupera = supera200Option === 'si' || (supera200Option === 'auto' && valPrecioUSD > 200);

  let arancelUSD = 0;
  let itbisUSD = 0;
  let adminCourierUSD = 0;
  let totalImpuestosUSD = 0;

  if (evaluatesSupera) {
    const cifUSD = valPrecioUSD + valEnvioUSD + valSeguroUSD;
    arancelUSD = cifUSD * 0.20;
    itbisUSD = (cifUSD + arancelUSD) * 0.18;
    adminCourierUSD = convertRdToUsd(DEFAULT_ADMIN_FEE_OVER_200, valTasa);
    totalImpuestosUSD = arancelUSD + itbisUSD + adminCourierUSD;
  }

  const totalUSD = valPrecioUSD + costCourierUSD + extrasUSD + totalImpuestosUSD;
  const totalRD = convertUsdToRd(totalUSD, valTasa);



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
    <div className="courier-page">
      <SEOHead 
        title="Calculadora Courier RD | Estima cuánto cuesta traer un paquete"
        description="Calcula cuánto puede costar traer un paquete a República Dominicana usando courier, incluyendo producto, peso, tarifa por libra, dólar e impuestos."
        schema={[faqSchema, appSchema]}
      />

      <PageHero 
        category="courier"
        title="Calculadora Courier"
        description="Calcula el costo del flete por libra y aplica aranceles aduanales si corresponden."
        icon={Package}
        chips={["courier","libra","flete"]}
      />

      <AdSlot id="courier-under-hero" placement="Courier - Debajo del Hero" />

      <div className="grid-2">
        {/* Form Column */}
        <div className="card">
          <h2>Detalles del Paquete</h2>
          <p>Llena la información de compra y los datos del flete del courier.</p>

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

            <div className="form-section-title">2. Datos de la Compra</div>

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
                  placeholder={inputCurrency === 'USD' ? 'Ej. 85.00' : 'Ej. 5100'}
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-peso" className="form-label">Peso total (Libras): *</label>
                <input 
                  id="input-peso"
                  type="number"
                  step="0.1"
                  className="form-control"
                  placeholder="Ej. 3"
                  value={pesoLb}
                  onChange={(e) => setPesoLb(e.target.value)}
                  min="0.1"
                  required
                />
              </div>
            </div>

            <div className="grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-tarifa" className="form-label">Tarifa courier por libra (US$): *</label>
                <input 
                  id="input-tarifa"
                  type="number"
                  step="0.01"
                  className="form-control"
                  value={tarifaLb}
                  onChange={(e) => setTarifaLb(e.target.value)}
                  min="0"
                  required
                />
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem', display: 'block' }}>
                  US$ {Number(tarifaLb) || 0} por libra ≈ {formatRD(convertUsdToRd(Number(tarifaLb) || 0, valTasa))} por libra
                </span>
              </div>

              <div className="form-group">
                <label htmlFor="input-tasa" className="form-label">Tasa de cambio del dólar (RD$): *</label>
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
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.25rem', display: 'block' }}>
                  Puedes ajustar la tasa según el valor que estés usando (tasa editable).
                </span>
              </div>
            </div>

            <div className="form-section-title">3. Gastos en EE.UU. (Opcional)</div>

            <div className="grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-envio-us" className="form-label">
                  Envío interno EE.UU. ({inputCurrency === 'USD' ? 'US$' : 'RD$'}):
                </label>
                <input 
                  id="input-envio-us"
                  type="number"
                  step="0.01"
                  className="form-control"
                  placeholder={inputCurrency === 'USD' ? 'Ej. 5.99' : 'Ej. 360'}
                  value={envioUS}
                  onChange={(e) => setEnvioUS(e.target.value)}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-seguro" className="form-label">
                  Seguro / Cargos extras ({inputCurrency === 'USD' ? 'US$' : 'RD$'}):
                </label>
                <input 
                  id="input-seguro"
                  type="number"
                  step="0.01"
                  className="form-control"
                  placeholder={inputCurrency === 'USD' ? 'Ej. 1.50' : 'Ej. 90'}
                  value={seguro}
                  onChange={(e) => setSeguro(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div className="form-section-title">4. Control de Aduana</div>
            <div className="form-group">
              <label htmlFor="select-supera" className="form-label">¿El paquete supera los US$ 200 FOB en aduana?</label>
              <select 
                id="select-supera" 
                className="form-control" 
                value={supera200Option} 
                onChange={(e) => setSupera200Option(e.target.value)}
              >
                <option value="auto">Detectar automáticamente (Precio {valPrecioUSD > 200 ? '> US$200' : '<= US$200'})</option>
                <option value="si">Sí (Aplicar arancel e ITBIS en el cálculo)</option>
                <option value="no">No (Exento de impuestos aduanales)</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
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
              <h2>Costo Total Estimado</h2>

              <div className="main-cost-display" style={{ padding: '1.25rem 1rem' }}>
                <span className="main-cost-title">Costo Final Puesto en RD</span>
                <span className="main-cost-value" style={{ fontSize: resultCurrency === 'Ambos' ? '1.45rem' : '1.8rem' }}>
                  {resultCurrency === 'Ambos' 
                    ? `${formatUSD(totalUSD)} / ${formatRD(totalRD)}` 
                    : resultCurrency === 'RD' ? formatRD(totalRD) : formatUSD(totalUSD)}
                </span>
                {resultCurrency === 'RD' && (
                  <span className="main-cost-title" style={{ marginTop: '0.5rem', fontSize: '0.85rem', textTransform: 'none' }}>
                    (Equivalente aproximado: {formatUSD(totalUSD)})
                  </span>
                )}
                {resultCurrency === 'USD' && (
                  <span className="main-cost-title" style={{ marginTop: '0.5rem', fontSize: '0.85rem', textTransform: 'none' }}>
                    (Equivalente aproximado: {formatRD(totalRD)})
                  </span>
                )}
              </div>

              {evaluatesSupera && (
                <div className="error-alert" role="alert" style={{ backgroundColor: 'var(--danger-light)', borderColor: 'var(--danger)', color: 'var(--text-main)', margin: '1rem 0' }}>
                  <AlertTriangle size={20} style={{ color: 'var(--danger)' }} />
                  <div>
                    <strong>Paquete sobre US$ 200:</strong> Al pasar el límite aduanal dominicano, se estiman impuestos de <strong>{formatValue(totalImpuestosUSD)}</strong> incluidos en el total.
                  </div>
                </div>
              )}

              {/* Dominican Quote Phrase */}
              <div className="dominican-quote" style={{ borderLeftColor: 'var(--primary)', margin: '1.5rem 0' }}>
                <p>
                  "Tu paquete tendría un costo equivalente aproximado de <strong>{resultCurrency === 'Ambos' ? `${formatUSD(totalUSD)} / ${formatRD(totalRD)}` : resultCurrency === 'RD' ? formatRD(totalRD) : formatUSD(totalUSD)} puesto en RD</strong> incluyendo el producto, envío y el servicio de courier. Recuerda que este cálculo es una referencia para planificar y el costo real puede variar."
                </p>
              </div>

              {/* Cost Breakdown */}
              <div className="budget-rules-breakdown" style={{ margin: '1.5rem 0' }}>
                <h3>Desglose de Costos de Importación</h3>
                <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Costo del producto:</span>
                  <span style={{ fontWeight: 600 }}>{formatValue(valPrecioUSD)}</span>
                </div>
                <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Flete del courier ({valPeso} lb):</span>
                  <span style={{ fontWeight: 600 }}>{formatValue(costCourierUSD)}</span>
                </div>
                {extrasUSD > 0 && (
                  <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Cargos locales en EE.UU. (Seguro/Flete):</span>
                    <span style={{ fontWeight: 600 }}>{formatValue(extrasUSD)}</span>
                  </div>
                )}
                {evaluatesSupera && (
                  <>
                    <div className="flex-between" style={{ borderBottom: '1px dotted var(--border-color)', paddingBottom: '0.4rem', marginBottom: '0.4rem', paddingLeft: '0.75rem', fontSize: '0.9rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Arancel aproximado (20%):</span>
                      <span>{formatValue(arancelUSD)}</span>
                    </div>
                    <div className="flex-between" style={{ borderBottom: '1px dotted var(--border-color)', paddingBottom: '0.4rem', marginBottom: '0.4rem', paddingLeft: '0.75rem', fontSize: '0.9rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>ITBIS estimado (18%):</span>
                      <span>{formatValue(itbisUSD)}</span>
                    </div>
                    <div className="flex-between" style={{ borderBottom: '1px dotted var(--border-color)', paddingBottom: '0.4rem', marginBottom: '0.4rem', paddingLeft: '0.75rem', fontSize: '0.9rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Cargo trámite aduana courier:</span>
                      <span>{formatValue(adminCourierUSD)}</span>
                    </div>
                  </>
                )}
              </div>

              {/* Cross Connections */}
              <div className="connections-actions" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '1.5rem 0' }}>
                <Link to="/me-alcanza-el-sueldo" className="btn btn-secondary btn-block">
                  ¿Me alcanza el sueldo para mis compras? <ArrowRight size={16} />
                </Link>
                <Link to="/calculadora-ahorro-mensual-rd" className="btn btn-success btn-block">
                  Ahorrar para comprarlo <ArrowRight size={16} />
                </Link>
              </div>

              <AdSlot id="courier-after-results" placement="Courier - Después de Resultados" />

              <div className="financial-disclaimer" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '1rem' }}>
                <p><strong>Nota de variación:</strong> Los resultados dependen de la tasa del dólar que ingreses. El monto final es una referencia para planificar y puede variar según courier, tasa aplicada, peso real, peso volumétrico, impuestos y cargos adicionales.</p>
              </div>
            </div>
          ) : (
            <EmptyStateCard
              title="Costo Estimado de Courier"
              description="Completa el precio del producto en dólares o pesos y el peso en libras para calcular el costo de envío, y estimar si requiere el pago de impuestos aduanales en RD."
              icon={DollarSign}
            />
          )}
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <DisclaimerBox type="courier" />
      </div>

      <AdSlot id="courier-before-faq" placement="Courier - Antes del FAQ" />

      <div className="card" style={{ marginTop: '2rem' }}>
        <FAQSection items={faqItems} />
      </div>

      <AdSlot id="courier-before-footer" placement="Courier - Antes del Footer" />

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
