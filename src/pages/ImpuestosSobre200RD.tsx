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
  DollarSign
} from 'lucide-react';
import { CurrencyToggle, ResultCurrencyToggle } from '../components/CurrencyToggle';
import { 
  convertUsdToRd, 
  convertRdToUsd, 
  normalizeAmountToUSD, 
  formatRD, 
  formatUSD 
} from '../utils/helpers';

export default function ImpuestosSobre200RD() {
  const [inputCurrency, setInputCurrency] = useState<'USD' | 'RD'>('USD');
  const [resultCurrency, setResultCurrency] = useState<'RD' | 'USD' | 'Ambos'>('Ambos');

  const [precio, setPrecio] = useState<string>('');
  const [envioUSD, setEnvioUSD] = useState<string>('');
  const [seguroUSD, setSeguroUSD] = useState<string>('');
  const [pesoLb, setPesoLb] = useState<string>('2');
  const [tarifaLb, setTarifaLb] = useState<string>('3.90');
  const [tasaDolar, setTasaDolar] = useState<string>(DEFAULT_DOLAR_RATE.toString());
  
  const [arancelPct, setArancelPct] = useState<string>('20'); // default general rate
  const [cargoAdminRD, setCargoAdminRD] = useState<string>(DEFAULT_ADMIN_FEE_OVER_200.toString());

  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const faqItems: FAQItem[] = [
    {
      question: '¿Qué impuestos pagan los paquetes que superan los US$ 200 en RD?',
      answer: 'Los paquetes que superan el límite de US$ 200 FOB pagan impuestos de aduana compuestos por: Arancel (0%, 10% o 20% según el tipo de artículo) más un 18% de ITBIS (IVA) que se aplica sobre la suma del valor CIF y el arancel.'
    },
    {
      question: '¿Qué artículos pagan 0% de arancel en la aduana dominicana?',
      answer: 'Los equipos de computación (laptops, tabletas, CPUs y componentes), libros educativos, y ciertos dispositivos médicos pagan 0% de arancel aduanal, aunque sí están sujetos al pago del 18% de ITBIS.'
    },
    {
      question: '¿Por qué los couriers cobran un cargo extra por paquetes de más de US$ 200?',
      answer: 'Los couriers deben retirar físicamente la mercancía y presentar expedientes de liquidación ante la DGA de forma individual para paquetes con valor superior a US$ 200. Cobran un cargo de gestión aduanal (normalmente entre RD$ 1,000 y RD$ 2,500) por este trámite de desaduanado.'
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
    'name': 'Calculadora de Impuestos Paquetes sobre US$ 200 RD - CuantoCuestaRD',
    'operatingSystem': 'All',
    'applicationCategory': 'FinanceApplication',
    'description': 'Calcula aranceles, ITBIS y costos administrativos para paquetes que exceden los US$ 200 importados a República Dominicana.',
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
      if (envioUSD) setEnvioUSD(Math.round(Number(envioUSD) * rate).toString());
      if (seguroUSD) setSeguroUSD(Math.round(Number(seguroUSD) * rate).toString());
    } else {
      if (precio) setPrecio((Number(precio) / rate).toFixed(2).replace(/\.00$/, ''));
      if (envioUSD) setEnvioUSD((Number(envioUSD) / rate).toFixed(2).replace(/\.00$/, ''));
      if (seguroUSD) setSeguroUSD((Number(seguroUSD) / rate).toFixed(2).replace(/\.00$/, ''));
    }
    setInputCurrency(newMode);
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const valPrecio = Number(precio) || 0;
    const valEnvio = Number(envioUSD) || 0;
    const valSeguro = Number(seguroUSD) || 0;
    const valPeso = Number(pesoLb) || 0;
    const valTarifa = Number(tarifaLb) || 0;
    const valTasa = Number(tasaDolar) || 0;
    const valArancel = Number(arancelPct) || 0;
    const valAdmin = Number(cargoAdminRD) || 0;

    if (valTasa <= 0) {
      setError('Agrega una tasa del dólar válida para convertir entre US$ y RD$.');
      return;
    }
    if (valPrecio <= 0) {
      setError('Por favor, ingresa el precio del producto.');
      return;
    }
    if (valPeso <= 0) {
      setError('Por favor, ingresa el peso del paquete.');
      return;
    }
    if (valTarifa < 0 || valEnvio < 0 || valSeguro < 0 || valArancel < 0 || valAdmin < 0) {
      setError('Los montos ingresados no pueden ser negativos.');
      return;
    }

    setShowResults(true);
  };

  const handleReset = () => {
    setPrecio('');
    setEnvioUSD('');
    setSeguroUSD('');
    setPesoLb('2');
    setTarifaLb('3.90');
    setTasaDolar(DEFAULT_DOLAR_RATE.toString());
    setArancelPct('20');
    setCargoAdminRD(DEFAULT_ADMIN_FEE_OVER_200.toString());
    setInputCurrency('USD');
    setResultCurrency('Ambos');
    setError(null);
    setShowResults(false);
  };

  // Calculations
  const valPrecioInput = Number(precio) || 0;
  const valEnvioInput = Number(envioUSD) || 0;
  const valSeguroInput = Number(seguroUSD) || 0;
  const valPeso = Number(pesoLb) || 0;
  const valTarifa = Number(tarifaLb) || 0;
  const valTasa = Number(tasaDolar) || 0;
  const valArancelPct = Number(arancelPct) || 0;
  const valAdminRD = Number(cargoAdminRD) || 0;

  // Normalized to USD
  const valPrecioUSD = normalizeAmountToUSD(valPrecioInput, inputCurrency, valTasa);
  const valEnvioUSD = normalizeAmountToUSD(valEnvioInput, inputCurrency, valTasa);
  const valSeguroUSD = normalizeAmountToUSD(valSeguroInput, inputCurrency, valTasa);
  const costCourierUSD = valPeso * valTarifa;

  const isExento = valPrecioUSD <= 200;

  // CIF Value in USD
  const cifUSD = valPrecioUSD + valEnvioUSD + valSeguroUSD;

  // Customs calculations (done in USD)
  const arancelUSD = isExento ? 0 : cifUSD * (valArancelPct / 100);
  const itbisUSD = isExento ? 0 : (cifUSD + arancelUSD) * 0.18;
  const totalImpuestosUSD = arancelUSD + itbisUSD;

  const arancelRD = Math.round(arancelUSD * valTasa);
  const itbisRD = Math.round(itbisUSD * valTasa);
  const totalImpuestosAduanaRD = arancelRD + itbisRD;

  // Courier flete
  const actualAdminRD = isExento ? 0 : valAdminRD;
  const actualAdminUSD = convertRdToUsd(actualAdminRD, valTasa);

  // Grand Total
  const totalUSD = cifUSD + totalImpuestosUSD + costCourierUSD + actualAdminUSD;
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
    <div className="impuestos-page">
      <SEOHead 
        title="Paquetes de más de US$200 RD | Calculadora de Impuestos"
        description="Estima posibles impuestos (arancel e ITBIS) y cargos administrativos para paquetes que superan los US$200 en República Dominicana."
        schema={[faqSchema, appSchema]}
      />

      <PageHero 
        category="courier"
        title="Paquetes sobre US$200"
        description="Calcula el arancel, selectivo al consumo e ITBIS aplicados a compras de más de US$ 200."
        icon={DollarSign}
        chips={["200","dolares","impuestos"]}
      />

      <AdSlot id="impuestos-under-hero" placement="Impuestos Sobre 200 - Debajo del Hero" />

      <div className="grid-2">
        {/* Form Column */}
        <div className="card">
          <h2>Datos de Importación</h2>
          <p>Completa la información CIF de la factura comercial y la tasa de impuestos de la categoría.</p>

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

            <div className="form-section-title">2. Factura Comercial ({inputCurrency === 'USD' ? 'US$ CIF' : 'RD$ CIF'})</div>

            <div className="grid-3" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
              <div className="form-group">
                <label htmlFor="input-precio" className="form-label">
                  Precio producto: *
                </label>
                <input 
                  id="input-precio"
                  type="number"
                  step="0.01"
                  className="form-control"
                  placeholder={inputCurrency === 'USD' ? 'Ej. 250.00' : 'Ej. 15000'}
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-envio" className="form-label">Envío a Miami:</label>
                <input 
                  id="input-envio"
                  type="number"
                  step="0.01"
                  className="form-control"
                  placeholder="0.00"
                  value={envioUSD}
                  onChange={(e) => setEnvioUSD(e.target.value)}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-seguro" className="form-label">Seguro:</label>
                <input 
                  id="input-seguro"
                  type="number"
                  step="0.01"
                  className="form-control"
                  placeholder="0.00"
                  value={seguroUSD}
                  onChange={(e) => setSeguroUSD(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div className="form-section-title">3. Tasas y Cargos Aduanales</div>

            <div className="grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-arancel-pct" className="form-label">Tasa Arancel (%):</label>
                <select 
                  id="input-arancel-pct" 
                  className="form-control" 
                  value={arancelPct} 
                  onChange={(e) => setArancelPct(e.target.value)}
                >
                  <option value="20">20% (Ropa, Zapatos, General)</option>
                  <option value="10">10% (Celulares, Repuestos)</option>
                  <option value="0">0% (Laptops, Lectoras, Libros)</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="input-cargo-admin" className="form-label">Trámite Courier (RD$): *</label>
                <input 
                  id="input-cargo-admin"
                  type="number"
                  className="form-control"
                  value={cargoAdminRD}
                  onChange={(e) => setCargoAdminRD(e.target.value)}
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="form-section-title">4. Courier y Tasa del Dólar</div>

            <div className="grid-3" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
              <div className="form-group">
                <label htmlFor="input-peso" className="form-label">Peso (Lbs): *</label>
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
                  ≈ {formatRD(convertUsdToRd(Number(tarifaLb) || 0, valTasa))}
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
                Calcular impuestos
              </button>
            </div>
          </form>
        </div>

        {/* Results Column */}
        <div className="results-column">
          {showResults ? (
            <div className="card result-card" style={{ height: '100%' }}>
              <h2>Impuestos Aduanales Sugeridos</h2>

              <div className="main-cost-display" style={{ padding: '1.25rem 1rem' }}>
                <span className="main-cost-title">Costo Final Puesto en RD (Estimado)</span>
                <span className="main-cost-value" style={{ fontSize: resultCurrency === 'Ambos' ? '1.45rem' : '1.8rem' }}>
                  {resultCurrency === 'Ambos' 
                    ? `${formatUSD(totalUSD)} / ${formatRD(totalRD)}` 
                    : resultCurrency === 'RD' ? formatRD(totalRD) : formatUSD(totalUSD)}
                </span>
                
                <span className="main-cost-title" style={{ marginTop: '0.75rem' }}>Total Impuestos Aduana (Arancel + ITBIS)</span>
                <span className="main-cost-value" style={{ fontSize: resultCurrency === 'Ambos' ? '1.2rem' : '1.4rem', color: isExento ? 'var(--success)' : 'var(--danger)' }}>
                  {resultCurrency === 'Ambos' 
                    ? `${formatUSD(totalImpuestosUSD)} / ${formatRD(totalImpuestosAduanaRD)}` 
                    : resultCurrency === 'RD' ? formatRD(totalImpuestosAduanaRD) : formatUSD(totalImpuestosUSD)}
                </span>
              </div>

              {inputCurrency === 'RD' && (
                <div className="dominican-quote" style={{ borderLeftColor: 'var(--primary)', margin: '1rem 0', padding: '0.75rem', fontSize: '0.9rem' }}>
                  <strong>Valor equivalente para evaluación:</strong> {formatUSD(valPrecioUSD)} FOB
                </div>
              )}

              {isExento ? (
                <div className="error-alert" role="alert" style={{ backgroundColor: 'var(--success-light)', borderColor: 'var(--success)', color: 'var(--text-main)', margin: '1rem 0' }}>
                  <Info size={20} style={{ color: 'var(--success)' }} />
                  <div>
                    <strong>¡Paquete Exento de Impuestos!</strong> El precio del artículo equivalente a <strong>{formatUSD(valPrecioUSD)}</strong> es menor o igual al límite de US$ 200 FOB. No aplica arancel ni ITBIS de importación.
                  </div>
                </div>
              ) : (
                <div className="error-alert" role="alert" style={{ backgroundColor: 'var(--danger-light)', borderColor: 'var(--danger)', color: 'var(--text-main)', margin: '1rem 0' }}>
                  <AlertTriangle size={20} style={{ color: 'var(--danger)' }} />
                  <div>
                    <strong>Supera el límite de aduana:</strong> Tu orden de Amazon sobrepasa los US$ 200 FOB (equivale a <strong>{formatUSD(valPrecioUSD)}</strong>). Aplican aranceles e ITBIS aduanales.
                  </div>
                </div>
              )}

              {/* Dominican Quote Phrase */}
              <div className="dominican-quote" style={{ borderLeftColor: isExento ? 'var(--success)' : 'var(--danger)', margin: '1.5rem 0' }}>
                <p>
                  {isExento 
                    ? `"Tu paquete se encuentra exento de impuestos aduanales puesto que su valor es de ${formatUSD(valPrecioUSD)} FOB. Solo pagarás el envío del courier de aproximadamente ${formatValue(costCourierUSD)}."`
                    : `"Si tu paquete supera los US$ 200 FOB, podría tener cargos de impuestos adicionales. Esta herramienta te da una referencia aproximada de ${formatValue(totalImpuestosUSD)} de impuestos más ${formatValue(actualAdminUSD)} de gestión courier, pero el monto final puede variar."`}
                </p>
              </div>

              {/* Cost Breakdown */}
              <div className="budget-rules-breakdown" style={{ margin: '1.5rem 0' }}>
                <h3>Desglose de la Liquidación Aduanal</h3>
                <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Valor de Factura CIF:</span>
                  <span style={{ fontWeight: 600 }}>{formatValue(cifUSD)}</span>
                </div>
                {!isExento && (
                  <>
                    <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Arancel aduanal ({valArancelPct}%):</span>
                      <span style={{ fontWeight: 600 }}>{formatValue(arancelUSD)}</span>
                    </div>
                    <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>ITBIS de importación (18%):</span>
                      <span style={{ fontWeight: 600 }}>{formatValue(itbisUSD)}</span>
                    </div>
                  </>
                )}
                <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Flete del courier ({valPeso} lb):</span>
                  <span style={{ fontWeight: 600 }}>{formatValue(costCourierUSD)}</span>
                </div>
                {!isExento && (
                  <div className="flex-between">
                    <span style={{ color: 'var(--text-muted)' }}>Cargo de trámite courier:</span>
                    <span style={{ fontWeight: 600 }}>{formatValue(actualAdminUSD)}</span>
                  </div>
                )}
              </div>

              <div className="recommendation-box" style={{ margin: '1.5rem 0' }}>
                <h3 className="flex-between">
                  <span>Nota de Variación Aduanal:</span>
                  <Info size={18} />
                </h3>
                <p>
                  Aduanas clasifica las mercancías según su partida arancelaria. Un inspector en el puerto o aeropuerto evalúa físicamente el paquete y puede revalorar el costo si considera que la factura declarada es inferior al valor real del mercado. Guarda siempre los comprobantes de pago de tu banco para justificar el costo.
                </p>
              </div>

              {/* Cross Connections */}
              <div className="connections-actions" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '1.5rem 0' }}>
                <Link to="/me-alcanza-el-sueldo" className="btn btn-secondary btn-block">
                  ¿Me alcanza el sueldo para esta compra? <ArrowRight size={16} />
                </Link>
                <Link to="/calculadora-ahorro-mensual-rd" className="btn btn-success btn-block">
                  Calcular cuánto debo ahorrar <ArrowRight size={16} />
                </Link>
              </div>

              <div className="financial-disclaimer" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '1rem' }}>
                <p><strong>Nota de variación:</strong> Los resultados dependen de la tasa del dólar que ingreses. El monto final es una referencia para planificar y puede variar según courier, tasa aplicada, peso real, peso volumétrico, impuestos y cargos adicionales.</p>
              </div>
            </div>
          ) : (
            <EmptyStateCard
              title="Liquidación Aduanal"
              description="Escribe el valor de tu paquete en dólares o pesos (si supera los US$ 200 se aplicarán impuestos), los costos de flete e impuestos del tipo de producto para calcular la liquidación aproximada en RD$."
              icon={DollarSign}
            />
          )}
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <DisclaimerBox type="courier" />
      </div>

      <AdSlot id="impuestos-before-faq" placement="Impuestos Sobre 200 - Antes del FAQ" />

      <div className="card" style={{ marginTop: '2rem' }}>
        <FAQSection items={faqItems} />
      </div>

      <AdSlot id="impuestos-before-footer" placement="Impuestos Sobre 200 - Antes del Footer" />

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
