import {
  useState } from 'react';
import SEOHead from '../components/SEOHead';
import PageHero from '../components/PageHero';
import EmptyStateCard from '../components/EmptyStateCard';
import DisclaimerBox from '../components/DisclaimerBox';
import AdSlot from '../components/AdSlot';
import FAQSection,
  { type FAQItem } from '../components/FAQSection';
import { 
  Target,
  RotateCcw,
  AlertTriangle,
  Calendar,
  TrendingUp
} from 'lucide-react';

export default function AhorroMensual() {
  const [sueldo, setSueldo] = useState<string>('');
  const [gastosFijos, setGastosFijos] = useState<string>('');
  const [gastosVariables, setGastosVariables] = useState<string>('');
  const [deudas, setDeudas] = useState<string>('');
  const [meta, setMeta] = useState<string>('');

  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const ahorroFAQs: FAQItem[] = [
    {
      question: '¿Cuánto debería ahorrar al mes de mi sueldo?',
      answer: 'La recomendación financiera estándar es ahorrar al menos el 10% de tus ingresos netos. Si puedes destinar el 20%, tu salud financiera será excelente. Lo importante en República Dominicana es crear la constancia, comenzando incluso con montos pequeños.'
    },
    {
      question: '¿Qué es un Fondo de Emergencia y de cuánto debe ser?',
      answer: 'Es un colchón de dinero guardado únicamente para imprevistos (emergencias médicas, daños del vehículo o desempleo). Lo aconsejable es acumular el equivalente a entre 3 y 6 meses de tus gastos mensuales fijos.'
    },
    {
      question: '¿Cómo puedo acelerar el cumplimiento de mi meta?',
      answer: 'Para llegar más rápido, puedes recortar gastos variables (ocio, comidas fuera), programar transferencias automáticas a tu cuenta de ahorros el mismo día que cobras el sueldo, y destinar ingresos extraordinarios (como el doble sueldo o bonificaciones) directamente a la meta.'
    }
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': ahorroFAQs.map((faq) => ({
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
    'name': 'Calculadora de Ahorro Mensual - CuantoCuestaRD',
    'operatingSystem': 'All',
    'applicationCategory': 'FinanceApplication',
    'description': 'Calcula cuánto dinero puedes ahorrar al mes en República Dominicana y el tiempo estimado para alcanzar tus metas financieras.',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'DOP'
    }
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const valSueldo = Number(sueldo);
    if (!sueldo || valSueldo <= 0) {
      setError('Completa este campo para calcular: el sueldo mensual debe ser mayor que cero.');
      return;
    }
    const valMeta = Number(meta);
    if (!meta || valMeta <= 0) {
      setError('Completa este campo para calcular: la meta de ahorro debe ser mayor que cero.');
      return;
    }

    const valFijos = Number(gastosFijos);
    const valVar = Number(gastosVariables);
    const valDeudas = Number(deudas);

    if (valFijos < 0 || valVar < 0 || valDeudas < 0) {
      setError('Los montos ingresados no pueden ser negativos.');
      return;
    }

    setShowResults(true);
  };

  const handleReset = () => {
    setSueldo('');
    setGastosFijos('');
    setGastosVariables('');
    setDeudas('');
    setMeta('');
    setError(null);
    setShowResults(false);
  };

  // Calculations
  const valSueldo = Number(sueldo) || 0;
  const valFijos = Number(gastosFijos) || 0;
  const valVar = Number(gastosVariables) || 0;
  const valDeudas = Number(deudas) || 0;
  const valMeta = Number(meta) || 0;

  const totalGastos = valFijos + valVar + valDeudas;
  const ahorroPosible = valSueldo - totalGastos;
  const ahorroPct = valSueldo > 0 ? Math.round((ahorroPosible / valSueldo) * 100) : 0;

  // Months required to reach the meta
  const mesesRequeridos = ahorroPosible > 0 ? Math.ceil(valMeta / ahorroPosible) : 0;

  // Analysis / Advice
  let recommendation = '';

  if (ahorroPosible <= 0) {
    recommendation = 'Tu balance mensual está en cero o negativo. Actualmente no tienes capacidad de ahorro porque tus gastos y deudas superan o igualan tus ingresos. Es urgente recortar gastos variables o consolidar deudas para liberar espacio antes de fijar metas.';
  } else {
    if (ahorroPct < 5) {
      recommendation = `Estás ahorrando el ${ahorroPct}% de tu sueldo, lo cual es muy bajo. A este ritmo te tomará mucho tiempo llegar a tu meta. Te aconsejamos ajustar tus gastos variables para intentar ahorrar al menos el 10% (RD$ ${(valSueldo * 0.1).toLocaleString()} al mes).`;
    } else if (mesesRequeridos > 24) {
      recommendation = `Tu meta de ahorro de RD$ ${valMeta.toLocaleString()} es muy alta para tu capacidad actual. Ahorrando RD$ ${ahorroPosible.toLocaleString()} al mes tardarías ${mesesRequeridos} meses (más de 2 años) en lograrla. Te sugerimos reajustar tus gastos fijos/variables para aumentar el ahorro o dividir tu meta en hitos más pequeños a corto plazo.`;
    } else {
      recommendation = `¡Meta muy realista y alcanzable! Estás ahorrando el ${ahorroPct}% de tu sueldo neto mensual, lo cual supera el estándar saludable del 10%. Manteniendo este plan sistemático lograrás tu objetivo en el tiempo estimado.`;
    }
  }

  return (
    <div className="ahorro-page">
      <SEOHead 
        title="Calculadora de Ahorro Mensual RD"
        description="Calcula cuánto puedes ahorrar al mes en República Dominicana y cuánto tiempo tardarías en alcanzar tu meta."
        schema={[faqSchema, appSchema]}
      />

      <PageHero 
        category="finanzas"
        title="Ahorro Mensual"
        description="Calcula en cuántos meses lograrás tu meta de ahorro acumulando un monto mensual fijo."
        icon={TrendingUp}
        chips={["ahorro","meta","dinero"]}
      />

      <AdSlot id="ahorro-under-hero" placement="Ahorro Mensual - Debajo del Hero" />

      <div className="grid-2">
        {/* Form Column */}
        <div className="card">
          <h2>Ingresa tus Finanzas y Meta</h2>
          <p>Coloca tus ingresos, deudas y gastos del mes junto al monto total que deseas acumular.</p>

          {error && (
            <div className="error-alert" role="alert">
              <AlertTriangle size={20} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleCalculate}>
            <div className="form-group">
              <label htmlFor="input-sueldo" className="form-label">
                Ingresos netos del mes (Sueldo RD$): *
              </label>
              <input 
                id="input-sueldo"
                type="number"
                className="form-control"
                placeholder="Ej. 50000"
                value={sueldo}
                onChange={(e) => setSueldo(e.target.value)}
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="input-meta" className="form-label">
                ¿Cuál es tu meta de ahorro total (RD$)? *
              </label>
              <input 
                id="input-meta"
                type="number"
                className="form-control"
                placeholder="Ej. 60000"
                value={meta}
                onChange={(e) => setMeta(e.target.value)}
                min="0"
                required
              />
            </div>

            <div className="form-section-title">Estructura de Gastos</div>

            <div className="grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-fijos" className="form-label">Gastos Fijos (Alquiler, Súper):</label>
                <input 
                  id="input-fijos"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 25000"
                  value={gastosFijos}
                  onChange={(e) => setGastosFijos(e.target.value)}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-variables" className="form-label">Gastos Variables (Salidas, Ocio):</label>
                <input 
                  id="input-variables"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 8000"
                  value={gastosVariables}
                  onChange={(e) => setGastosVariables(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="input-deudas" className="form-label">Compromisos de deudas al mes:</label>
              <input 
                id="input-deudas"
                type="number"
                className="form-control"
                placeholder="Ej. 5000"
                value={deudas}
                onChange={(e) => setDeudas(e.target.value)}
                min="0"
              />
            </div>

            <div className="step-actions flex-between" style={{ gap: '1rem' }}>
              <button type="button" className="btn btn-secondary" onClick={handleReset} style={{ flex: 1 }}>
                <RotateCcw size={18} /> Limpiar
              </button>
              <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
                Calcular Ahorro
              </button>
            </div>
          </form>
        </div>

        {/* Results Column */}
        <div className="results-column">
          {showResults ? (
            <div className="card result-card" style={{ height: '100%' }}>
              <h2>Tu Capacidad de Ahorro</h2>

              <div className="main-cost-display" style={{ padding: '1.25rem 1rem' }}>
                <span className="main-cost-title">Ahorro Mensual Posible</span>
                <span className={`main-cost-value ${ahorroPosible <= 0 ? 'text-danger' : 'text-success'}`}>
                  RD$ {ahorroPosible.toLocaleString()}
                </span>
              </div>

              {ahorroPosible > 0 ? (
                <>
                  {/* Phrasing required by user */}
                  <div className="dominican-quote" style={{ borderLeftColor: 'var(--success)' }}>
                    <p>
                      "Si puedes ahorrar <strong>RD$ {ahorroPosible.toLocaleString()} al mes</strong>, alcanzarías tu meta de <strong>RD$ {valMeta.toLocaleString()}</strong> en aproximadamente <strong>{mesesRequeridos} meses</strong>."
                    </p>
                  </div>

                  <div className="grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div className="freq-box">
                      <span className="freq-label">Meta de Ahorro</span>
                      <span className="freq-val" style={{ fontSize: '1.15rem' }}>RD$ {valMeta.toLocaleString()}</span>
                    </div>
                    <div className="freq-box">
                      <span className="freq-label">Plazo Estimado</span>
                      <span className="freq-val" style={{ fontSize: '1.15rem', color: 'var(--primary)' }}>
                        {mesesRequeridos} meses
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="error-alert" style={{ borderLeftWidth: '5px', marginBottom: '1.5rem' }} role="alert">
                  <AlertTriangle size={24} style={{ flexShrink: 0 }} />
                  <div>
                    <strong>Balance negativo:</strong> No tienes excedente libre para ahorrar. Tus gastos y deudas mensuales de RD$ {totalGastos.toLocaleString()} consumen tus ingresos.
                  </div>
                </div>
              )}

              <div className="recommendation-box">
                <h3 className="flex-between">
                  <span>Recomendación de Ajuste:</span>
                  <Target size={18} />
                </h3>
                <p>{recommendation}</p>
              </div>

              <AdSlot id="ahorro-after-results" placement="Ahorro - Después de Resultados" />

              <div className="financial-disclaimer" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '1rem' }}>
                <p><strong>Nota aclaratoria:</strong> Estos cálculos son estimados y tienen fines educativos e ilustrativos. No sustituyen asesoría financiera profesional.</p>
              </div>
            </div>
          ) : (
            <EmptyStateCard
              title="Planifica tus Metas"
              description="Llena tu presupuesto y tu meta de ahorro a la izquierda para estimar en cuántos meses lograrás tu meta financiera."
              icon={Calendar}
            />
          )}
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <DisclaimerBox type="finanzas" />
      </div>

      <AdSlot id="ahorro-before-faq" placement="Ahorro Mensual - Antes del FAQ" />

      <div className="card" style={{ marginTop: '2rem' }}>
        <FAQSection items={ahorroFAQs} />
      </div>

      <AdSlot id="ahorro-before-footer" placement="Ahorro Mensual - Antes del Footer" />

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
