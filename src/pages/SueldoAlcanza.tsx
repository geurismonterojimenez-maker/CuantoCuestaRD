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
  DollarSign,
  AlertTriangle,
  RefreshCw,
  Info,
  Wallet
} from 'lucide-react';

export default function SueldoAlcanza() {
  const [sueldo, setSueldo] = useState<string>('');
  const [alquiler, setAlquiler] = useState<string>('');
  const [supermercado, setSupermercado] = useState<string>('');
  const [transporte, setTransporte] = useState<string>('');
  const [servicios, setServicios] = useState<string>('');
  const [deudas, setDeudas] = useState<string>('');
  const [ahorroDeseado, setAhorroDeseado] = useState<string>('');
  const [otrosGastos, setOtrosGastos] = useState<string>('');

  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const sueldoAlcanzaFAQs: FAQItem[] = [
    {
      question: '¿Qué significa un presupuesto ajustado o crítico?',
      answer: 'Un presupuesto está ajustado si compromete entre el 70% y el 90% del sueldo en gastos fijos y variables. Es crítico si supera el 90%, lo que te deja expuesto ante emergencias y limita severamente tu capacidad de ahorro.'
    },
    {
      question: '¿Cómo puedo mejorar mi diagnóstico si es crítico?',
      answer: 'Te sugerimos auditar tus gastos hormiga (comidas fuera, suscripciones sin usar) y recortar servicios prescindibles. Si las deudas son altas, considera refinanciar o usar el método bola de nieve para consolidarlas.'
    },
    {
      question: '¿Cuánto debería ser mi dinero libre mensual?',
      answer: 'Lo ideal es que después de tus gastos esenciales y ahorro te quede entre un 10% y un 15% libre para imprevistos u ocio moderado. Si estás en cero o en negativo, estás en una zona de riesgo financiero.'
    }
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': sueldoAlcanzaFAQs.map((faq) => ({
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
    'name': 'Calculadora Me Alcanza el Sueldo - CuantoCuestaRD',
    'operatingSystem': 'All',
    'applicationCategory': 'FinanceApplication',
    'description': 'Calcula si tu sueldo mensual en República Dominicana te alcanza para cubrir tus gastos habituales y deudas.',
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

    const valAlquiler = Number(alquiler);
    const valSuper = Number(supermercado);
    const valTrans = Number(transporte);
    const valServ = Number(servicios);
    const valDeudas = Number(deudas);
    const valAhorro = Number(ahorroDeseado);
    const valOtros = Number(otrosGastos);

    if (valAlquiler < 0 || valSuper < 0 || valTrans < 0 || valServ < 0 || valDeudas < 0 || valAhorro < 0 || valOtros < 0) {
      setError('Los montos ingresados no pueden ser negativos.');
      return;
    }

    setShowResults(true);
  };

  const handleReset = () => {
    setSueldo('');
    setAlquiler('');
    setSupermercado('');
    setTransporte('');
    setServicios('');
    setDeudas('');
    setAhorroDeseado('');
    setOtrosGastos('');
    setError(null);
    setShowResults(false);
  };

  // Compute results
  const valSueldo = Number(sueldo) || 0;
  const valAlquiler = Number(alquiler) || 0;
  const valSuper = Number(supermercado) || 0;
  const valTrans = Number(transporte) || 0;
  const valServ = Number(servicios) || 0;
  const valDeudas = Number(deudas) || 0;
  const valAhorro = Number(ahorroDeseado) || 0;
  const valOtros = Number(otrosGastos) || 0;

  const totalGastos = valAlquiler + valSuper + valTrans + valServ + valDeudas + valAhorro + valOtros;
  const dineroLibre = valSueldo - totalGastos;
  const porcentajeComprometido = valSueldo > 0 ? Math.round((totalGastos / valSueldo) * 100) : 0;

  // Diagnostics and Advice
  let diagnostic: 'tranquilo' | 'ajustado' | 'critico' = 'tranquilo';
  let diagnosticText = '';
  let diagnosticClass = '';
  let advice = '';

  if (porcentajeComprometido <= 70) {
    diagnostic = 'tranquilo';
    diagnosticClass = 'diag-green';
    diagnosticText = 'Tranquilo / Saludable';
    advice = '¡Excelente! Estás comprometiendo un porcentaje saludable de tus ingresos. Esto te da estabilidad y margen para ahorrar más o invertir a largo plazo. Mantén tu plan y evita aumentar tus gastos fijos (inflación de estilo de vida).';
  } else if (porcentajeComprometido <= 90) {
    diagnostic = 'ajustado';
    diagnosticClass = 'diag-orange';
    diagnosticText = 'Ajustado';
    advice = 'Tu presupuesto está en zona de cuidado. Te queda poco margen libre mensual. Si surge alguna emergencia, podrías verte obligado a endeudarte. Te recomendamos revisar tus gastos variables (servicios, otros gastos) y tratar de bajarlos un poco para respirar mejor.';
  } else {
    diagnostic = 'critico';
    diagnosticClass = 'diag-red';
    diagnosticText = 'Crítico / En Riesgo';
    advice = '¡Cuidado! Estás gastando casi todo o más de lo que ganas. Esto no es sostenible en el tiempo y te expone a un sobreendeudamiento severo. Es prioritario reducir deudas, limitar las tarjetas de crédito, recortar los gastos prescindibles y, de ser posible, buscar ingresos extra.';
  }

  return (
    <div className="sueldo-alcanza-page">
      <SEOHead 
        title="¿Me alcanza el sueldo? Calculadora RD"
        description="Calcula si tu sueldo mensual te alcanza para cubrir alquiler, supermercado, transporte, servicios, deudas y ahorro en República Dominicana."
        schema={[faqSchema, appSchema]}
      />

      <PageHero 
        category="finanzas"
        title="¿Me alcanza el sueldo?"
        description="Analiza tus ingresos frente a tus gastos fijos y deudas para ver tu capacidad financiera."
        icon={Wallet}
        chips={["sueldo","salario","ingresos"]}
      />

      <AdSlot id="sueldo-under-hero" placement="Me Alcanza el Sueldo - Debajo del Hero" />

      <div className="grid-2">
        {/* Form Column */}
        <div className="card">
          <h2>Ingresa tus ingresos y gastos</h2>
          <p>Llena los montos estimados que manejas cada mes. Usa valores aproximados en RD$.</p>

          {error && (
            <div className="error-alert" role="alert">
              <AlertTriangle size={20} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleCalculate}>
            <div className="form-group">
              <label htmlFor="input-sueldo" className="form-label">
                Sueldo mensual neto (RD$): *
              </label>
              <input 
                id="input-sueldo"
                type="number"
                className="form-control"
                placeholder="Ej. 45000"
                value={sueldo}
                onChange={(e) => setSueldo(e.target.value)}
                min="0"
                required
              />
            </div>

            <div className="form-section-title">Gastos Fijos y Necesidades</div>
            
            <div className="grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-alquiler" className="form-label">Alquiler / Hipoteca:</label>
                <input 
                  id="input-alquiler"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 12000"
                  value={alquiler}
                  onChange={(e) => setAlquiler(e.target.value)}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-super" className="form-label">Supermercado:</label>
                <input 
                  id="input-super"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 10000"
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
                  placeholder="Ej. 3500"
                  value={transporte}
                  onChange={(e) => setTransporte(e.target.value)}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-servicios" className="form-label">Servicios (Luz, Internet, Agua):</label>
                <input 
                  id="input-servicios"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 4000"
                  value={servicios}
                  onChange={(e) => setServicios(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div className="form-section-title">Otros Compromisos</div>

            <div className="grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-deudas" className="form-label">Deudas / Préstamos / Tarjetas:</label>
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

              <div className="form-group">
                <label htmlFor="input-ahorro" className="form-label">Ahorro deseado:</label>
                <input 
                  id="input-ahorro"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 3000"
                  value={ahorroDeseado}
                  onChange={(e) => setAhorroDeseado(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="input-otros" className="form-label">Otros gastos (Salidas, Ocio, Varios):</label>
              <input 
                id="input-otros"
                type="number"
                className="form-control"
                placeholder="Ej. 4000"
                value={otrosGastos}
                onChange={(e) => setOtrosGastos(e.target.value)}
                min="0"
              />
            </div>

            <div className="step-actions flex-between" style={{ gap: '1rem' }}>
              <button type="button" className="btn btn-secondary" onClick={handleReset} style={{ flex: 1 }}>
                <RefreshCw size={18} /> Limpiar
              </button>
              <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
                Calcular sueldo
              </button>
            </div>
          </form>
        </div>

        {/* Results Column */}
        <div className="results-column">
          {showResults ? (
            <div className="card result-card" style={{ height: '100%' }}>
              <h2>Tu Diagnóstico Financiero</h2>
              
              <div className="main-cost-display" style={{ padding: '1.25rem 1rem' }}>
                <span className="main-cost-title">Dinero Libre al Mes</span>
                <span className={`main-cost-value ${dineroLibre < 0 ? 'text-danger' : 'text-primary'}`}>
                  RD$ {dineroLibre.toLocaleString()}
                </span>
              </div>

              <div className="diagnostic-badge-wrapper text-center">
                <span className={`diagnostic-badge ${diagnosticClass}`}>
                  Presupuesto {diagnosticText}
                </span>
              </div>

              {/* Phrasing required by user */}
              <div className="dominican-quote" style={{ borderLeftColor: diagnostic === 'tranquilo' ? 'var(--success)' : diagnostic === 'ajustado' ? 'var(--warning)' : 'var(--danger)' }}>
                <p>
                  "Tu sueldo es de <strong>RD$ {valSueldo.toLocaleString()}</strong> y tus gastos estimados son <strong>RD$ {totalGastos.toLocaleString()}</strong>. 
                  Te quedarían <strong>RD$ {dineroLibre.toLocaleString()} libres</strong> al mes. 
                  Estás usando aproximadamente el <strong>{porcentajeComprometido}%</strong> de tu sueldo, por lo que tu presupuesto está <strong>{diagnostic === 'tranquilo' ? 'saludable y desahogado' : diagnostic === 'ajustado' ? 'ajustado' : 'crítico'}</strong>."
                </p>
              </div>

              {/* Financial Metrics Cards */}
              <div className="grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                <div className="freq-box">
                  <span className="freq-label">Gastos Totales</span>
                  <span className="freq-val" style={{ fontSize: '1.15rem' }}>RD$ {totalGastos.toLocaleString()}</span>
                </div>
                <div className="freq-box">
                  <span className="freq-label">Comprometido</span>
                  <span className="freq-val" style={{ fontSize: '1.15rem', color: diagnostic === 'critico' ? 'var(--danger)' : 'inherit' }}>
                    {porcentajeComprometido}%
                  </span>
                </div>
              </div>

              <div className="recommendation-box">
                <h3 className="flex-between">
                  <span>Consejo para tu situación:</span>
                  <Info size={18} />
                </h3>
                <p>{advice}</p>
              </div>

              <AdSlot id="sueldo-after-results" placement="Me Alcanza el Sueldo - Después de Resultados" />

              <div className="financial-disclaimer" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '1rem' }}>
                <p><strong>Nota aclaratoria:</strong> Estos cálculos son estimados y tienen fines educativos e ilustrativos. No sustituyen asesoría financiera profesional.</p>
              </div>
            </div>
          ) : (
            <EmptyStateCard
              title="¿Preparado para calcular?"
              description="Completa los campos del formulario con tus ingresos y gastos mensuales, y presiona el botón grande para conocer tu diagnóstico inmediato."
              icon={DollarSign}
            />
          )}
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <DisclaimerBox type="finanzas" />
      </div>

      <AdSlot id="sueldo-before-faq" placement="Me Alcanza el Sueldo - Antes del FAQ" />
      
      <div className="card" style={{ marginTop: '2rem' }}>
        <FAQSection items={sueldoAlcanzaFAQs} />
      </div>

      <AdSlot id="sueldo-before-footer" placement="Me Alcanza el Sueldo - Antes del Footer" />

      <style>{`
        .form-section-title {
          font-weight: 600;
          font-size: 1.1rem;
          color: var(--primary);
          border-bottom: 2px solid var(--primary-light);
          padding-bottom: 0.25rem;
          margin: 1.5rem 0 1rem 0;
        }

        .diagnostic-badge-wrapper {
          margin-bottom: 1.25rem;
        }

        .diagnostic-badge {
          display: inline-block;
          font-size: 1.1rem;
          font-weight: 600;
          padding: 0.35rem 1rem;
          border-radius: 20px;
        }

        .diag-green {
          background-color: var(--success-light);
          color: var(--success);
          border: 1px solid #bbf7d0;
        }

        .diag-orange {
          background-color: var(--warning-light);
          color: var(--warning);
          border: 1px solid #fef3c7;
        }

        .diag-red {
          background-color: var(--danger-light);
          color: var(--danger);
          border: 1px solid #fecaca;
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
