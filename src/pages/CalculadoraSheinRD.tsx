import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DEFAULT_DOLAR_RATE } from '../data/courierData';
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
  normalizeAmountToUSD, 
  formatRD, 
  formatUSD 
} from '../utils/helpers';

export default function CalculadoraSheinRD() {
  const [inputCurrency, setInputCurrency] = useState<'USD' | 'RD'>('USD');
  const [resultCurrency, setResultCurrency] = useState<'RD' | 'USD' | 'Ambos'>('Ambos');

  const [totalShein, setTotalShein] = useState<string>('');
  const [cantidadArticulos, setCantidadArticulos] = useState<string>('5');
  const [pesoLb, setPesoLb] = useState<string>('2');
  const [tarifaLb, setTarifaLb] = useState<string>('3.90');
  const [tasaDolar, setTasaDolar] = useState<string>(DEFAULT_DOLAR_RATE.toString());
  const [cargosAdicionales, setCargosAdicionales] = useState<string>('');

  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const faqItems: FAQItem[] = [
    {
      question: '¿Cómo comprar en Shein desde República Dominicana?',
      answer: 'Shein no envía directamente de forma barata a RD. Debes registrarte en un courier local que te dé un casillero (dirección física) en Miami, EE.UU. Al comprar en Shein, pones esa dirección de Miami y, una vez llegue allí, tu courier la traerá al país y te cobrará el envío por libras.'
    },
    {
      question: '¿Cuántas libras suele pesar un pedido típico de ropa de Shein?',
      answer: 'La ropa es ligera. Una camiseta o blusa pesa en promedio de 0.2 a 0.4 libras, y un pantalón de 0.6 a 1.0 libra. Un pedido estándar de 6 o 7 prendas suele pesar entre 2 y 3.5 libras.'
    },
    {
      question: '¿Qué pasa si mi pedido de Shein pasa de US$ 200?',
      answer: 'Al igual que cualquier compra por internet, si la factura de Shein supera los US$ 200, aduanas te retendrá el paquete y te obligará a pagar impuestos de importación (aproximadamente un 38% del valor CIF total). Se aconseja dividir las compras en varios pedidos pequeños de menos de US$ 200.'
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
    'name': 'Calculadora Shein RD - CuantoCuestaRD',
    'operatingSystem': 'All',
    'applicationCategory': 'FinanceApplication',
    'description': 'Estima el costo final de tu pedido de Shein en pesos dominicanos, incluyendo el flete por libra y calculando el costo por prenda.',
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
      if (totalShein) setTotalShein(Math.round(Number(totalShein) * rate).toString());
      if (cargosAdicionales) setCargosAdicionales(Math.round(Number(cargosAdicionales) * rate).toString());
    } else {
      if (totalShein) setTotalShein((Number(totalShein) / rate).toFixed(2).replace(/\.00$/, ''));
      if (cargosAdicionales) setCargosAdicionales((Number(cargosAdicionales) / rate).toFixed(2).replace(/\.00$/, ''));
    }
    setInputCurrency(newMode);
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const valTotal = Number(totalShein) || 0;
    const valCant = Number(cantidadArticulos) || 0;
    const valPeso = Number(pesoLb) || 0;
    const valTarifa = Number(tarifaLb) || 0;
    const valTasa = Number(tasaDolar) || 0;
    const valCargos = Number(cargosAdicionales) || 0;

    if (valTasa <= 0) {
      setError('Agrega una tasa del dólar válida para convertir entre US$ y RD$.');
      return;
    }
    if (valTotal <= 0) {
      setError('Por favor, ingresa el total de la compra en Shein.');
      return;
    }
    if (valCant <= 0) {
      setError('La cantidad de artículos debe ser mayor a 0.');
      return;
    }
    if (valPeso <= 0) {
      setError('Por favor, ingresa el peso estimado en libras.');
      return;
    }
    if (valTarifa < 0 || valCargos < 0) {
      setError('Los montos ingresados no pueden ser negativos.');
      return;
    }

    setShowResults(true);
  };

  const handleReset = () => {
    setTotalShein('');
    setCantidadArticulos('5');
    setPesoLb('2');
    setTarifaLb('3.90');
    setTasaDolar(DEFAULT_DOLAR_RATE.toString());
    setCargosAdicionales('');
    setInputCurrency('USD');
    setResultCurrency('Ambos');
    setError(null);
    setShowResults(false);
  };

  // Calculations
  const valTotalInput = Number(totalShein) || 0;
  const valCant = Number(cantidadArticulos) || 1;
  const valPeso = Number(pesoLb) || 0;
  const valTarifa = Number(tarifaLb) || 0;
  const valTasa = Number(tasaDolar) || 0;
  const valCargosInput = Number(cargosAdicionales) || 0;

  // Normalized to USD
  const valTotalUSD = normalizeAmountToUSD(valTotalInput, inputCurrency, valTasa);
  const valCargosUSD = normalizeAmountToUSD(valCargosInput, inputCurrency, valTasa);
  const costCourierUSD = valPeso * valTarifa;

  const totalUSD = valTotalUSD + costCourierUSD + valCargosUSD;
  const totalRD = convertUsdToRd(totalUSD, valTasa);

  const promedioUSD = totalUSD / valCant;
  const promedioRD = totalRD / valCant;

  const evaluatesSupera = valTotalUSD > 200;

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
    <div className="shein-page">
      <SEOHead 
        title="Calculadora Shein RD | Estima tu compra en pesos"
        description="Calcula cuánto puede costar una compra de Shein puesta en República Dominicana y estima el costo promedio por artículo."
        schema={[faqSchema, appSchema]}
      />

      <PageHero 
        category="courier"
        title="Calculadora Shein"
        description="Estima el costo final de tu carrito de Shein incluyendo flete estimado por peso en libras."
        icon={ShoppingBag}
        chips={["shein","ropa","compras"]}
      />

      <AdSlot id="shein-under-hero" placement="Shein - Debajo del Hero" />

      <div className="grid-2">
        {/* Form Column */}
        <div className="card">
          <h2>Datos del Pedido Shein</h2>
          <p>Ingresa el total de tu carrito en dólares o pesos y la información del peso.</p>

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

            <div className="form-section-title">2. Total y Cantidad del Carrito</div>

            <div className="grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-total" className="form-label">
                  Total de la compra ({inputCurrency === 'USD' ? 'US$' : 'RD$'}): *
                </label>
                <input 
                  id="input-total"
                  type="number"
                  step="0.01"
                  className="form-control"
                  placeholder={inputCurrency === 'USD' ? 'Ej. 75.50' : 'Ej. 4500'}
                  value={totalShein}
                  onChange={(e) => setTotalShein(e.target.value)}
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-cantidad" className="form-label">Cantidad de artículos: *</label>
                <input 
                  id="input-cantidad"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 6"
                  value={cantidadArticulos}
                  onChange={(e) => setCantidadArticulos(e.target.value)}
                  min="1"
                  required
                />
              </div>
            </div>

            <div className="form-section-title">3. Datos de Envío y Courier</div>

            <div className="grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-peso" className="form-label">Peso estimado (Lbs): *</label>
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
                  US$ {Number(tarifaLb) || 0} ≈ {formatRD(convertUsdToRd(Number(tarifaLb) || 0, valTasa))}
                </span>
              </div>
            </div>

            <div className="grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
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

              <div className="form-group">
                <label htmlFor="input-cargos" className="form-label">
                  Cargos extras ({inputCurrency === 'USD' ? 'US$' : 'RD$'}):
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

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button type="button" className="btn btn-secondary" onClick={handleReset} style={{ flex: 1 }}>
                <RotateCcw size={18} /> Limpiar
              </button>
              <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
                Calcular costo Shein
              </button>
            </div>
          </form>
        </div>

        {/* Results Column */}
        <div className="results-column">
          {showResults ? (
            <div className="card result-card" style={{ height: '100%' }}>
              <h2>Resumen de Pedido Shein</h2>

              <div className="main-cost-display" style={{ padding: '1.25rem 1rem' }}>
                <span className="main-cost-title">Total Final Estimado (Flete Incluido)</span>
                <span className="main-cost-value" style={{ fontSize: resultCurrency === 'Ambos' ? '1.45rem' : '1.8rem' }}>
                  {resultCurrency === 'Ambos' 
                    ? `${formatUSD(totalUSD)} / ${formatRD(totalRD)}` 
                    : resultCurrency === 'RD' ? formatRD(totalRD) : formatUSD(totalUSD)}
                </span>
                
                <span className="main-cost-title" style={{ marginTop: '0.75rem' }}>Costo Promedio estimado por Artículo</span>
                <span className="main-cost-value" style={{ fontSize: resultCurrency === 'Ambos' ? '1.2rem' : '1.4rem', color: 'var(--success)' }}>
                  {resultCurrency === 'Ambos' 
                    ? `${formatUSD(promedioUSD)} / ${formatRD(promedioRD)}` 
                    : resultCurrency === 'RD' ? formatRD(promedioRD) : formatUSD(promedioUSD)}
                </span>
              </div>

              {evaluatesSupera && (
                <div className="error-alert" role="alert" style={{ backgroundColor: 'var(--danger-light)', borderColor: 'var(--danger)', color: 'var(--text-main)', margin: '1rem 0' }}>
                  <AlertTriangle size={20} style={{ color: 'var(--danger)' }} />
                  <div>
                    <strong>Pasa el límite de US$ 200:</strong> Al comprar más de US$ 200 en Shein en una sola orden, aduanas podría cobrar aranceles del 20% y 18% de ITBIS, elevando el costo. Te aconsejamos dividir tu orden.
                  </div>
                </div>
              )}

              {/* Dominican Quote Phrase */}
              <div className="dominican-quote" style={{ borderLeftColor: 'var(--primary)', margin: '1.5rem 0' }}>
                <p>
                  "Tu compra de Shein podría salir en un equivalente aproximado de <strong>{resultCurrency === 'Ambos' ? `${formatUSD(totalUSD)} / ${formatRD(totalRD)}` : resultCurrency === 'RD' ? formatRD(totalRD) : formatUSD(totalUSD)} puesta en RD</strong>. El costo promedio por artículo sería de aproximadamente <strong>{resultCurrency === 'Ambos' ? `${formatUSD(promedioUSD)} / ${formatRD(promedioRD)}` : resultCurrency === 'RD' ? formatRD(promedioRD) : formatUSD(promedioUSD)}</strong>."
                </p>
              </div>

              {/* Cost Breakdown */}
              <div className="budget-rules-breakdown" style={{ margin: '1.5rem 0' }}>
                <h3>Desglose Financiero Shein</h3>
                <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Costo de los artículos Shein:</span>
                  <span style={{ fontWeight: 600 }}>{formatValue(valTotalUSD)}</span>
                </div>
                <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Flete del courier ({valPeso} lb):</span>
                  <span style={{ fontWeight: 600 }}>{formatValue(costCourierUSD)}</span>
                </div>
                {valCargosUSD > 0 && (
                  <div className="flex-between">
                    <span style={{ color: 'var(--text-muted)' }}>Cargos adicionales courier/seguro:</span>
                    <span style={{ fontWeight: 600 }}>{formatValue(valCargosUSD)}</span>
                  </div>
                )}
              </div>

              <div className="recommendation-box" style={{ margin: '1.5rem 0' }}>
                <h3 className="flex-between">
                  <span>Recomendación de Compra:</span>
                  <Info size={18} />
                </h3>
                <p>
                  Shein suele enviar en bolsas flexibles de plástico. Esto beneficia al comprador dominicano porque las bolsas son muy livianas y rara vez cobran por volumen. Sin embargo, no metas zapatos con cajas pesadas en el mismo pedido, ya que las cajas de cartón le suman peso innecesario.
                </p>
              </div>

              {/* Cross Connections */}
              <div className="connections-actions" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '1.5rem 0' }}>
                <Link to="/calculadora-ahorro-mensual-rd" className="btn btn-secondary btn-block">
                  Calcular cuánto debo ahorrar <ArrowRight size={16} />
                </Link>
                <Link to="/calculadora-presupuesto-mensual-rd" className="btn btn-success btn-block">
                  Organizar mi presupuesto mensual <ArrowRight size={16} />
                </Link>
              </div>

              <AdSlot id="shein-after-results" placement="Shein - Después de Resultados" />

              <div className="financial-disclaimer" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '1rem' }}>
                <p><strong>Nota de variación:</strong> Los resultados dependen de la tasa del dólar que ingreses. El monto final es una referencia para planificar y puede variar según courier, tasa aplicada, peso real, peso volumétrico, impuestos y cargos adicionales.</p>
              </div>
            </div>
          ) : (
            <EmptyStateCard
              title="Calculadora Shein RD"
              description="Escribe el total de tu carrito de Shein en dólares o pesos y el número de artículos de ropa que vas a traer para conocer el precio promedio y el costo flete total estimado."
              icon={DollarSign}
            />
          )}
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <DisclaimerBox type="courier" />
      </div>

      <AdSlot id="shein-before-faq" placement="Shein - Antes del FAQ" />

      <div className="card" style={{ marginTop: '2rem' }}>
        <FAQSection items={faqItems} />
      </div>

      <AdSlot id="shein-before-footer" placement="Shein - Antes del Footer" />

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
