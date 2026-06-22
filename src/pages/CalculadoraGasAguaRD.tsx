import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GAS_PRICES, WATER_PRICES } from '../data/hogarData';
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
  Droplet,
  Info
} from 'lucide-react';

export default function CalculadoraGasAguaRD() {
  const [gasType, setGasType] = useState<string>('mediano50'); // pequeno25, mediano50, grande100, comun
  const [gasFrecuencia, setGasFrecuencia] = useState<string>('8'); // weeks duration
  const [aguaFija, setAguaFija] = useState<string>(WATER_PRICES.tarifaFijaMensual.toString());
  const [botellonesCount, setBotellonesCount] = useState<string>('2'); // per week
  const [botellonPrice, setBotellonPrice] = useState<string>(WATER_PRICES.botellonIndividual.toString());
  const [otrosGastos, setOtrosGastos] = useState<string>('');

  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: '¿Cuánto dura un tanque de gas de 50 libras en RD?',
      answer: 'Para una familia promedio de 3 a 4 personas que cocina diariamente, un tanque de gas GLP de 50 libras suele durar entre 7 y 9 semanas (unos 2 meses). Si se hornea o cocina frecuentemente, la duración disminuye a 4 o 5 semanas.'
    },
    {
      question: '¿Cuánto cuesta un botellón de agua en Santo Domingo?',
      answer: 'El precio del botellón de agua purificada de 5 galones en colmados o camiones distribuidores oscila entre RD$ 80 y RD$ 110, dependiendo de la marca y la zona de entrega.'
    },
    {
      question: '¿Cómo funciona la tarifa fija de agua de la CAASD?',
      answer: 'La Corporación del Acueducto y Alcantarillado de Santo Domingo (CAASD) cobra una tarifa residencial fija estimada de unos RD$ 300 a RD$ 500 mensuales para viviendas que no poseen medidor instalado. El cobro varía según la clasificación del sector.'
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
    'name': 'Calculadora de Gas y Agua RD - CuantoCuestaRD',
    'operatingSystem': 'All',
    'applicationCategory': 'FinanceApplication',
    'description': 'Calcula cuánto gastas al mes en gas de cocina, botellones de agua y tarifa de agua en República Dominicana.',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'DOP'
    }
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const valFrecuencia = parseInputNumber(gasFrecuencia) || 1;
    const valAguaFija = parseInputNumber(aguaFija);
    const valBotellones = parseInputNumber(botellonesCount);
    const valBotellonPrice = parseInputNumber(botellonPrice);
    const valOtros = parseInputNumber(otrosGastos);

    if (valFrecuencia <= 0) {
      setError('La duración del tanque de gas en semanas debe ser mayor que cero.');
      return;
    }

    if (valAguaFija < 0 || valBotellones < 0 || valBotellonPrice < 0 || valOtros < 0) {
      setError('Los valores ingresados no pueden ser negativos.');
      return;
    }

    setShowResults(true);
  };

  const handleReset = () => {
    setGasType('mediano50');
    setGasFrecuencia('8');
    setAguaFija(WATER_PRICES.tarifaFijaMensual.toString());
    setBotellonesCount('2');
    setBotellonPrice(WATER_PRICES.botellonIndividual.toString());
    setOtrosGastos('');
    setError(null);
    setShowResults(false);
  };

  // Calculations
  const valFrecuencia = parseInputNumber(gasFrecuencia) || 8;
  const valAguaFija = parseInputNumber(aguaFija);
  const valBotellones = parseInputNumber(botellonesCount);
  const valBotellonPrice = parseInputNumber(botellonPrice);
  const valOtros = parseInputNumber(otrosGastos);

  // Gas cost monthly
  let gasCylinderCost = 0;
  let gasCostMonthly = 0;

  if (gasType === 'comun') {
    gasCostMonthly = GAS_PRICES.comunResidencial;
  } else {
    if (gasType === 'pequeno25') gasCylinderCost = GAS_PRICES.pequeno25;
    else if (gasType === 'mediano50') gasCylinderCost = GAS_PRICES.mediano50;
    else if (gasType === 'grande100') gasCylinderCost = GAS_PRICES.grande100;

    // cost per week = cost / frequency
    // cost per month = cost per week * 4.33
    gasCostMonthly = Math.round((gasCylinderCost / valFrecuencia) * 4.33);
  }

  // Water cost monthly
  const botellonesCostMonthly = Math.round(valBotellones * 4.33 * valBotellonPrice);
  const waterCostMonthly = valAguaFija + botellonesCostMonthly;

  const totalMensual = gasCostMonthly + waterCostMonthly + valOtros;
  const totalAnual = totalMensual * 12;

  return (
    <div className="gas-agua-page">
      <SEOHead 
        title="Calculadora de Gas y Agua RD"
        description="Estima tus gastos mensuales en gas, agua y botellones para organizar mejor tu presupuesto del hogar."
        schema={[faqSchema, appSchema]}
      />

      <PageHero 
        category="hogar"
        title="Gas y Agua"
        description="Estima tu consumo en botellones de agua purificada, factura de la CAASD y cilindros de gas GLP."
        icon={Droplet}
        chips={["gas","agua","glp"]}
      />

      <AdSlot id="gas-agua-under-hero" placement="Gas y Agua - Debajo del Hero" />

      <div className="grid-2">
        {/* Form Column */}
        <div className="card">
          <h2>Consumo de Gas y Agua</h2>
          <p>Indica cómo compras y consumes estos recursos vitales en tu hogar.</p>

          {error && (
            <div className="error-alert" role="alert">
              <AlertTriangle size={20} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleCalculate}>
            <div className="form-section-title">1. Consumo de Gas GLP (Cocina)</div>
            
            <div className="form-group">
              <label htmlFor="select-gas-type" className="form-label">Tipo de suministro de gas: *</label>
              <select 
                id="select-gas-type"
                className="form-control"
                value={gasType}
                onChange={(e) => setGasType(e.target.value)}
              >
                <option value="mediano50">Cilindro Mediano (50 lbs - Más común) - {formatRD(GAS_PRICES.mediano50)}</option>
                <option value="pequeno25">Cilindro Pequeño (25 lbs) - {formatRD(GAS_PRICES.pequeno25)}</option>
                <option value="grande100">Cilindro Grande (100 lbs) - {formatRD(GAS_PRICES.grande100)}</option>
                <option value="comun">Gas Común por tubería (Cuota fija mensual) - {formatRD(GAS_PRICES.comunResidencial)}</option>
              </select>
            </div>

            {gasType !== 'comun' && (
              <div className="form-group animate-fade-in">
                <label htmlFor="input-gas-frecuencia" className="form-label">¿Cuántas semanas dura el cilindro de gas? *</label>
                <input 
                  id="input-gas-frecuencia"
                  type="number"
                  className="form-control"
                  value={gasFrecuencia}
                  onChange={(e) => setGasFrecuencia(e.target.value)}
                  min="1"
                  required={gasType !== 'comun'}
                />
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>* Ej. Coloca 8 si te dura 2 meses (8 semanas).</span>
              </div>
            )}

            <div className="form-section-title">2. Consumo de Agua (Factura y Bebida)</div>
            
            <div className="grid-2" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-agua-fija" className="form-label">Tasa fija de agua (CAASD/INAPA):</label>
                <input 
                  id="input-agua-fija"
                  type="number"
                  className="form-control"
                  value={aguaFija}
                  onChange={(e) => setAguaFija(e.target.value)}
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-botellones-count" className="form-label">Botellones por semana:</label>
                <input 
                  id="input-botellones-count"
                  type="number"
                  className="form-control"
                  value={botellonesCount}
                  onChange={(e) => setBotellonesCount(e.target.value)}
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="grid-2" style={{ gridTemplateColumns: '1.2fr 0.8fr', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-botellon-price" className="form-label">Precio por botellón (RD$):</label>
                <input 
                  id="input-botellon-price"
                  type="number"
                  className="form-control"
                  value={botellonPrice}
                  onChange={(e) => setBotellonPrice(e.target.value)}
                  min="1"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-otros" className="form-label">Otros (filtros, hielo):</label>
                <input 
                  id="input-otros"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 100"
                  value={otrosGastos}
                  onChange={(e) => setOtrosGastos(e.target.value)}
                  min="0"
                />
              </div>
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
              <h2>Presupuesto de Gas y Agua</h2>

              <div className="main-cost-display" style={{ padding: '1.25rem 1rem' }}>
                <span className="main-cost-title">Total mensual estimado</span>
                <span className="main-cost-value">
                  {formatRD(totalMensual)}
                </span>
                <span className="main-cost-title" style={{ marginTop: '0.5rem', fontSize: '0.85rem', textTransform: 'none' }}>
                  (Equivalente a {formatRD(totalAnual)} al año)
                </span>
              </div>

              {/* Dominican Quote Phrase */}
              <div className="dominican-quote" style={{ borderLeftColor: 'var(--primary)', margin: '1.5rem 0' }}>
                <p>
                  "Tus gastos de gas de cocina y agua potable representarían un aproximado de <strong>{formatRD(totalMensual)} al mes</strong> de referencia para planificar, considerando tus hábitos de consumo."
                </p>
              </div>

              {/* Desglose */}
              <div className="budget-rules-breakdown" style={{ margin: '1.5rem 0' }}>
                <h3>Desglose de Consumo Diario</h3>
                <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.4rem', marginBottom: '0.4rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Costo estimado de Gas GLP al mes:</span>
                  <span style={{ fontWeight: 600 }}>{formatRD(gasCostMonthly)}</span>
                </div>
                <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.4rem', marginBottom: '0.4rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Tasa fija de agua potable (CAASD/INAPA):</span>
                  <span>{formatRD(valAguaFija)}</span>
                </div>
                <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.4rem', marginBottom: '0.4rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Gasto en botellones ({Math.round(valBotellones * 4.33)} al mes):</span>
                  <span>{formatRD(botellonesCostMonthly)}</span>
                </div>
                {valOtros > 0 && (
                  <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.4rem', marginBottom: '0.4rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Otros gastos asociados:</span>
                    <span>{formatRD(valOtros)}</span>
                  </div>
                )}
              </div>

              {/* Savings Advice */}
              <div style={{ display: 'flex', gap: '0.5rem', margin: '1rem 0', padding: '1rem', backgroundColor: 'var(--primary-light)', borderLeft: '4px solid var(--primary)', borderRadius: '8px', fontSize: '0.9rem' }}>
                <Info size={20} className="text-primary" style={{ flexShrink: 0 }} />
                <div>
                  <strong>Consejo de planificación:</strong> Intenta comprar los botellones de agua directamente en el camión distribuidor local en vez de pedir a domicilio de colmados, esto puede significar un ahorro de hasta un 30% en el precio por botellón en RD.
                </div>
              </div>

              {/* Connections */}
              <div className="connections-actions" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '1.5rem 0' }}>
                <Link to="/calculadora-servicios-hogar-rd" className="btn btn-secondary btn-block">
                  Calcular todos mis servicios juntos <Droplet size={16} />
                </Link>
                <Link to="/calculadora-presupuesto-mensual-rd" className="btn btn-secondary btn-block">
                  Organizar mi presupuesto mensual
                </Link>
              </div>

              <AdSlot id="gas-agua-after-results" placement="Gas y Agua - Después de Resultados" />

              <div className="financial-disclaimer" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '1rem' }}>
                <p><strong>Nota aclaratoria:</strong> Estos montos son aproximaciones informativas y no representan facturas exactas. Los precios de los cilindros de gas GLP regulados están sujetos a modificaciones semanales dispuestas por el Ministerio de Industria, Comercio y Mipymes (MICM).</p>
              </div>
            </div>
          ) : (
            <EmptyStateCard
              title="Presupuesto de Gas y Agua"
              description="Elige tu tipo de cilindro de gas habitual, duración en semanas y cantidad de botellones de agua consumidos para estimar tu presupuesto mensual aproximado."
              icon={Droplet}
            />
          )}
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <DisclaimerBox type="hogar" />
      </div>

      <AdSlot id="gas-agua-before-faq" placement="Gas y Agua - Antes del FAQ" />

      <div className="card" style={{ marginTop: '2rem' }}>
        <FAQSection items={faqItems} />
      </div>

      <AdSlot id="gas-agua-before-footer" placement="Gas y Agua - Antes del Footer" />

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
