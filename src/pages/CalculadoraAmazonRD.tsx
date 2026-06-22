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
  Info,
  DollarSign,
  ShoppingBag
} from 'lucide-react';
import { CurrencyToggle, ResultCurrencyToggle } from '../components/CurrencyToggle';
import { 
  convertUsdToRd, 
  convertRdToUsd, 
  normalizeAmountToUSD, 
  formatRD, 
  formatUSD 
} from '../utils/helpers';

export default function CalculadoraAmazonRD() {
  const [inputCurrency, setInputCurrency] = useState<'USD' | 'RD'>('USD');
  const [resultCurrency, setResultCurrency] = useState<'RD' | 'USD' | 'Ambos'>('Ambos');

  const [precio, setPrecio] = useState<string>('');
  const [envioEEUU, setEnvioEEUU] = useState<string>('');
  const [pesoLb, setPesoLb] = useState<string>('');
  const [tarifaLb, setTarifaLb] = useState<string>('3.90');
  const [tasaDolar, setTasaDolar] = useState<string>(DEFAULT_DOLAR_RATE.toString());
  const [salesTax, setSalesTax] = useState<string>('');
  const [cargosAdicionales, setCargosAdicionales] = useState<string>('');

  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const faqItems: FAQItem[] = [
    {
      question: '¿Cómo funciona el envío de Amazon a la República Dominicana?',
      answer: 'Amazon no tiene envíos directos baratos a RD para la mayoría de los artículos. La práctica común y económica es crear una cuenta en un courier dominicano, el cual te asignará una dirección física gratuita en Miami (casillero). Envías tu compra de Amazon a esa dirección y el courier la transporta a RD cobrándote por libra.'
    },
    {
      question: '¿Qué es el impuesto de Florida (Sales Tax) y cómo lo evito?',
      answer: 'El estado de Florida cobra un impuesto de venta de aproximadamente 7% sobre las compras enviadas allí. Muchos couriers dominicanos ofrecen casilleros con códigos postales exentos de impuestos (tax-free) en Florida, lo que te permite ahorrar ese 7% en Amazon.'
    },
    {
      question: '¿Qué pasa si mi orden de Amazon pasa de US$ 200?',
      answer: 'Si el total de tu orden de Amazon (o de los paquetes que lleguen en el mismo vuelo y se consoliden a tu nombre) pasa los US$ 200, aduanas cobrará impuestos de importación (normalmente 20% arancel y 18% ITBIS). Mantén tus órdenes individuales por debajo de US$ 200 FOB para evitarlo.'
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
    'name': 'Calculadora Amazon RD - CuantoCuestaRD',
    'operatingSystem': 'All',
    'applicationCategory': 'FinanceApplication',
    'description': 'Calcula el costo final de tus compras de Amazon puestas en República Dominicana incluyendo flete e impuestos.',
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
      if (envioEEUU) setEnvioEEUU(Math.round(Number(envioEEUU) * rate).toString());
      if (salesTax) setSalesTax(Math.round(Number(salesTax) * rate).toString());
      if (cargosAdicionales) setCargosAdicionales(Math.round(Number(cargosAdicionales) * rate).toString());
    } else {
      if (precio) setPrecio((Number(precio) / rate).toFixed(2).replace(/\.00$/, ''));
      if (envioEEUU) setEnvioEEUU((Number(envioEEUU) / rate).toFixed(2).replace(/\.00$/, ''));
      if (salesTax) setSalesTax((Number(salesTax) / rate).toFixed(2).replace(/\.00$/, ''));
      if (cargosAdicionales) setCargosAdicionales((Number(cargosAdicionales) / rate).toFixed(2).replace(/\.00$/, ''));
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
    const valEnvio = Number(envioEEUU) || 0;
    const valTax = Number(salesTax) || 0;
    const valCargos = Number(cargosAdicionales) || 0;

    if (valTasa <= 0) {
      setError('Agrega una tasa del dólar válida para convertir entre US$ y RD$.');
      return;
    }
    if (valPrecio <= 0) {
      setError('Por favor, ingresa el precio del producto en Amazon.');
      return;
    }
    if (valPeso <= 0) {
      setError('Por favor, ingresa el peso estimado del paquete en libras.');
      return;
    }
    if (valTarifa < 0 || valEnvio < 0 || valTax < 0 || valCargos < 0) {
      setError('Los montos ingresados no pueden ser negativos.');
      return;
    }

    setShowResults(true);
  };

  const handleReset = () => {
    setPrecio('');
    setEnvioEEUU('');
    setPesoLb('');
    setTarifaLb('3.90');
    setTasaDolar(DEFAULT_DOLAR_RATE.toString());
    setSalesTax('');
    setCargosAdicionales('');
    setInputCurrency('USD');
    setResultCurrency('Ambos');
    setError(null);
    setShowResults(false);
  };

  // Calculations
  const valPrecioInput = Number(precio) || 0;
  const valEnvioInput = Number(envioEEUU) || 0;
  const valTaxInput = Number(salesTax) || 0;
  const valCargosInput = Number(cargosAdicionales) || 0;
  const valTasa = Number(tasaDolar) || 0;
  const valPeso = Number(pesoLb) || 0;
  const valTarifa = Number(tarifaLb) || 0;

  // Normalized to USD
  const valPrecioUSD = normalizeAmountToUSD(valPrecioInput, inputCurrency, valTasa);
  const valEnvioUSD = normalizeAmountToUSD(valEnvioInput, inputCurrency, valTasa);
  const valTaxUSD = normalizeAmountToUSD(valTaxInput, inputCurrency, valTasa);
  const valCargosUSD = normalizeAmountToUSD(valCargosInput, inputCurrency, valTasa);
  const costCourierUSD = valPeso * valTarifa;

  const totalAmazonUSD = valPrecioUSD + valEnvioUSD + valTaxUSD + valCargosUSD;

  // Customs calculations (done in USD)
  const evaluatesSupera = totalAmazonUSD > 200;
  let arancelUSD = 0;
  let itbisUSD = 0;
  let adminCourierUSD = 0;
  let totalImpuestosUSD = 0;

  if (evaluatesSupera) {
    const cifUSD = totalAmazonUSD;
    arancelUSD = cifUSD * 0.20;
    itbisUSD = (cifUSD + arancelUSD) * 0.18;
    adminCourierUSD = convertRdToUsd(DEFAULT_ADMIN_FEE_OVER_200, valTasa);
    totalImpuestosUSD = arancelUSD + itbisUSD + adminCourierUSD;
  }

  const totalUSD = totalAmazonUSD + costCourierUSD + totalImpuestosUSD;
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
    <div className="amazon-page">
      <SEOHead 
        title="Calculadora Amazon RD | Cuánto cuesta traer un producto"
        description="Estima el costo final de traer un producto de Amazon a RD con courier, tasa del dólar, peso y posibles cargos aduanales."
        schema={[faqSchema, appSchema]}
      />

      <PageHero 
        category="courier"
        title="Calculadora Amazon"
        description="Estima el costo real de comprar en Amazon sumando flete a RD e impuestos correspondientes."
        icon={ShoppingBag}
        chips={["amazon","compras","internet"]}
      />

      <AdSlot id="amazon-under-hero" placement="Amazon - Debajo del Hero" />

      <div className="grid-2">
        {/* Form Column */}
        <div className="card">
          <h2>Detalles de Compra en Amazon</h2>
          <p>Llena la información del carrito y los datos de tu tarifa de courier.</p>

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

            <div className="form-section-title">2. Producto y Envíos en EE.UU.</div>

            <div className="grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-precio" className="form-label">
                  Precio del artículo ({inputCurrency === 'USD' ? 'US$' : 'RD$'}): *
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
                <label htmlFor="input-envio" className="form-label">
                  Envío dentro de EE.UU. ({inputCurrency === 'USD' ? 'US$' : 'RD$'}):
                </label>
                <input 
                  id="input-envio"
                  type="number"
                  step="0.01"
                  className="form-control"
                  placeholder={inputCurrency === 'USD' ? 'Ej. 0.00 (Free Shipping)' : 'Ej. 0'}
                  value={envioEEUU}
                  onChange={(e) => setEnvioEEUU(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div className="grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-tax" className="form-label">
                  Impuesto EE.UU. (Sales Tax {inputCurrency === 'USD' ? 'US$' : 'RD$'}):
                </label>
                <input 
                  id="input-tax"
                  type="number"
                  step="0.01"
                  className="form-control"
                  placeholder={inputCurrency === 'USD' ? 'Ej. 5.95 (Aprox 7%)' : 'Ej. 350'}
                  value={salesTax}
                  onChange={(e) => setSalesTax(e.target.value)}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-cargos" className="form-label">
                  Otros cargos en Amazon ({inputCurrency === 'USD' ? 'US$' : 'RD$'}):
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

            <div className="form-section-title">3. Datos de tu Courier</div>

            <div className="grid-3" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
              <div className="form-group">
                <label htmlFor="input-peso" className="form-label">Peso (Lbs): *</label>
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

              <div className="form-group">
                <label htmlFor="input-tarifa" className="form-label">Tarifa / lb (US$): *</label>
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
                  US$ {Number(tarifaLb) || 0} ≈ {formatRD(convertUsdToRd(Number(tarifaLb) || 0, valTasa))}
                </span>
              </div>

              <div className="form-group">
                <label htmlFor="input-tasa" className="form-label">Tasa Dólar (RD$): *</label>
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
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem', display: 'block' }}>
                  Tasa editable.
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button type="button" className="btn btn-secondary" onClick={handleReset} style={{ flex: 1 }}>
                <RotateCcw size={18} /> Limpiar
              </button>
              <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
                Calcular costo Amazon
              </button>
            </div>
          </form>
        </div>

        {/* Results Column */}
        <div className="results-column">
          {showResults ? (
            <div className="card result-card" style={{ height: '100%' }}>
              <h2>Costo Total Amazon en RD</h2>

              <div className="main-cost-display" style={{ padding: '1.25rem 1rem' }}>
                <span className="main-cost-title">Total Final Estimado</span>
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
                    <strong>Supera el límite de aduana:</strong> Tu orden de Amazon sobrepasa los US$ 200, por lo que se estiman aranceles dominicanos de <strong>{formatValue(totalImpuestosUSD)}</strong> incluidos en el cálculo.
                  </div>
                </div>
              )}

              {/* Dominican Quote Phrase */}
              <div className="dominican-quote" style={{ borderLeftColor: 'var(--primary)', margin: '1.5rem 0' }}>
                <p>
                  "Un producto con valor equivalente aproximado de <strong>{formatValue(valPrecioUSD)}</strong> con un peso de <strong>{valPeso} {valPeso === 1 ? 'libra' : 'libras'}</strong> podría salir aproximadamente en <strong>{resultCurrency === 'Ambos' ? `${formatUSD(totalUSD)} / ${formatRD(totalRD)}` : resultCurrency === 'RD' ? formatRD(totalRD) : formatUSD(totalUSD)} puesto en RD</strong>, tomando en cuenta la tasa de cambio y el servicio del courier."
                </p>
              </div>

              {/* Cost Breakdown */}
              <div className="budget-rules-breakdown" style={{ margin: '1.5rem 0' }}>
                <h3>Desglose de la Compra</h3>
                <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Costo de Amazon (Con taxas y envío US):</span>
                  <span style={{ fontWeight: 600 }}>{formatValue(totalAmazonUSD)}</span>
                </div>
                <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Flete del courier ({valPeso} lb):</span>
                  <span style={{ fontWeight: 600 }}>{formatValue(costCourierUSD)}</span>
                </div>
                {evaluatesSupera && (
                  <>
                    <div className="flex-between" style={{ borderBottom: '1px dotted var(--border-color)', paddingBottom: '0.4rem', marginBottom: '0.4rem', paddingLeft: '0.75rem', fontSize: '0.9rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Arancel e ITBIS en aduana:</span>
                      <span>{formatValue(arancelUSD + itbisUSD)}</span>
                    </div>
                    <div className="flex-between" style={{ borderBottom: '1px dotted var(--border-color)', paddingBottom: '0.4rem', marginBottom: '0.4rem', paddingLeft: '0.75rem', fontSize: '0.9rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Gestión administrativa courier:</span>
                      <span>{formatValue(adminCourierUSD)}</span>
                    </div>
                  </>
                )}
              </div>

              <div className="recommendation-box" style={{ margin: '1.5rem 0' }}>
                <h3 className="flex-between">
                  <span>Consejo para Compras en Amazon:</span>
                  <Info size={18} />
                </h3>
                <p>
                  Recuerda verificar si el artículo que compras en Amazon es muy voluminoso. Aunque pese poco, los couriers podrían cobrarte basándose en el <strong>peso volumétrico</strong> (largo x ancho x alto / 166). Compara siempre el peso real con las dimensiones de la caja.
                </p>
              </div>

              {/* Cross Connections */}
              <div className="connections-actions" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '1.5rem 0' }}>
                <Link to="/me-alcanza-el-sueldo" className="btn btn-secondary btn-block">
                  ¿Me alcanza el sueldo para esta compra? <ArrowRight size={16} />
                </Link>
                <Link to="/calculadora-presupuesto-mensual-rd" className="btn btn-success btn-block">
                  Organizar mi presupuesto mensual <ArrowRight size={16} />
                </Link>
              </div>

              <AdSlot id="amazon-after-results" placement="Amazon - Después de Resultados" />

              <div className="financial-disclaimer" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '1rem' }}>
                <p><strong>Nota de variación:</strong> Los resultados dependen de la tasa del dólar que ingreses. El monto final es una referencia para planificar y puede variar según courier, tasa aplicada, peso real, peso volumétrico, impuestos y cargos adicionales.</p>
              </div>
            </div>
          ) : (
            <EmptyStateCard
              title="Cálculo de Compras en Amazon"
              description="Introduce los datos de tu artículo de Amazon (precio, envíos en EE.UU., impuestos locales y peso) para estimar de inmediato el precio final en pesos dominicanos puesto en tu courier."
              icon={DollarSign}
            />
          )}
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <DisclaimerBox type="courier" />
      </div>

      <AdSlot id="amazon-before-faq" placement="Amazon - Antes del FAQ" />

      <div className="card" style={{ marginTop: '2rem' }}>
        <FAQSection items={faqItems} />
      </div>

      <AdSlot id="amazon-before-footer" placement="Amazon - Antes del Footer" />

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
