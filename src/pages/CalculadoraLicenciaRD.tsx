import {
  useState } from 'react';
import { Link } from 'react-router-dom';
import { LICENCIA_PRICES } from '../data/tramitesData';
import SEOHead from '../components/SEOHead';
import PageHero from '../components/PageHero';
import EmptyStateCard from '../components/EmptyStateCard';
import DisclaimerBox from '../components/DisclaimerBox';
import AdSlot from '../components/AdSlot';
import FAQSection,
  { type FAQItem } from '../components/FAQSection';
import { 
  RotateCcw,
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  CreditCard,
  ShieldCheck
} from 'lucide-react';

export default function CalculadoraLicenciaRD() {
  const [tramiteType, setTramiteType] = useState<string>('renovacion'); // aprendizaje, primera, renovacion, duplicado, cambio
  const [categoria, setCategoria] = useState<string>('liviano'); // motor, liviano, pesado
  const [hasMultas, setHasMultas] = useState<boolean>(false);
  const [multasAmount, setMultasAmount] = useState<string>('');
  const [gastoExtra, setGastoExtra] = useState<string>('');

  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const faqItems: FAQItem[] = [
    {
      question: '¿Cuánto cuesta renovar la licencia en RD?',
      answer: 'La tasa del INTRANT para renovar la licencia de conducir vencida es de RD$ 1,900. Este monto tiene una validez de 4 años. Debes sumarle el examen de la vista que se realiza en el centro de servicios.'
    },
    {
      question: '¿Qué pasa si tengo multas pendientes al renovar mi licencia?',
      answer: 'No podrás realizar la renovación ni duplicado de tu licencia si tienes multas registradas en la base de datos de la DIGESETT/INTRANT. Debes pagar el valor de la infracción en el Banco de Reservas o en línea antes de acudir a tu cita.'
    },
    {
      question: '¿Cuánto cuesta obtener la licencia de conducir por primera vez?',
      answer: 'Para obtener la licencia por primera vez se requieren dos pagos: 1) Impuesto de aprendizaje (RD$ 2,900) que incluye examen teórico y carné. 2) Impuesto práctico (RD$ 1,900) que se paga tras transcurrir un plazo mínimo de 15 días.'
    },
    {
      question: '¿Cuáles son los requisitos de examen médico?',
      answer: 'Para renovación y primera obtención se requiere un examen físico y de la vista que se gestiona directamente en las oficinas o unidades del INTRANT. Este servicio está comúnmente incluido en el costo total de la tasa del trámite.'
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
    'name': 'Calculadora de Licencia de Conducir RD - CuantoCuestaRD',
    'operatingSystem': 'All',
    'applicationCategory': 'FinanceApplication',
    'description': 'Calcula el costo total estimado de renovar, duplicar o sacar la licencia de conducir en República Dominicana, agregando multas si corresponde.',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'DOP'
    }
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const valMultas = hasMultas ? (Number(multasAmount) || 0) : 0;
    const valExtra = Number(gastoExtra) || 0;

    if (hasMultas && valMultas < 0) {
      setError('El monto de las multas no puede ser negativo.');
      return;
    }

    if (valExtra < 0) {
      setError('Los gastos adicionales no pueden ser negativos.');
      return;
    }

    setShowResults(true);
  };

  const handleReset = () => {
    setTramiteType('renovacion');
    setCategoria('liviano');
    setHasMultas(false);
    setMultasAmount('');
    setGastoExtra('');
    setError(null);
    setShowResults(false);
  };

  // Calculations
  let baseCost = LICENCIA_PRICES.renovacion;
  if (tramiteType === 'aprendizaje') {
    baseCost = LICENCIA_PRICES.aprendizaje;
  } else if (tramiteType === 'primera') {
    baseCost = LICENCIA_PRICES.primeraLicencia;
  } else if (tramiteType === 'duplicado') {
    baseCost = LICENCIA_PRICES.duplicado;
  } else if (tramiteType === 'cambio') {
    baseCost = LICENCIA_PRICES.cambioCategoria;
  }

  const valMultas = hasMultas ? (Number(multasAmount) || 0) : 0;
  const valExtra = Number(gastoExtra) || 0;
  const totalEstimado = baseCost + valMultas + valExtra;

  // Documents list
  let reqs: string[] = [];
  if (tramiteType === 'aprendizaje') {
    reqs = [
      'Cédula de Identidad y Electoral vigente en original y copia',
      'Certificado de No Antecedentes Penales (Papel de Buena Conducta de la PGR)',
      'Recibo de pago de tasa de aprendizaje del Banco de Reservas',
      'Examen médico de la vista realizado en el centro del INTRANT',
      'Tomar la charla teórica de educación vial presencial o virtual'
    ];
  } else if (tramiteType === 'primera') {
    reqs = [
      'Carné de aprendizaje vigente (mínimo 15 días de emitido, máximo 1 año)',
      'Cédula de Identidad y Electoral original',
      'Recibo de pago de impuesto práctico en el Banco de Reservas',
      'Aprobar el examen práctico de manejo en los circuitos autorizados'
    ];
  } else if (tramiteType === 'duplicado') {
    reqs = [
      'Cédula de Identidad y Electoral vigente original',
      'Denuncia original por pérdida o robo emitida por la Policía Nacional',
      'Recibo de pago de duplicado del Banco de Reservas',
      'Tener el perfil limpio (cero multas) en DIGESETT'
    ];
  } else if (tramiteType === 'cambio') {
    reqs = [
      'Licencia de conducir original de categoría anterior',
      'Cédula de Identidad y Electoral vigente original',
      'Certificado de No Antecedentes Penales de la PGR',
      'Recibo de pago de tasa correspondiente en el Banco de Reservas',
      'Examen práctico aprobado para la nueva categoría de conducción'
    ];
  } else {
    // Renovacion
    reqs = [
      'Licencia de conducir vencida o próxima a vencer (original)',
      'Cédula de Identidad y Electoral vigente original',
      'Recibo de pago de impuesto de renovación del Banco de Reservas',
      'Estar solvente de multas en la base de datos de DIGESETT/INTRANT',
      'Examen psicofísico y de la vista completado en el centro'
    ];
  }

  return (
    <div className="licencia-page">
      <SEOHead 
        title="Cuánto cuesta renovar la licencia en RD"
        description="Calcula el costo estimado de renovar, duplicar o sacar licencia de conducir en República Dominicana, incluyendo multas si aplica."
        schema={[faqSchema, appSchema]}
      />

      <PageHero 
        category="tramites"
        title="Licencia de Conducir"
        description="Estima el costo de renovación o duplicado de tu licencia del INTRANT e incluye multas."
        icon={ShieldCheck}
        chips={["licencia","conducir","intrant"]}
      />

      <AdSlot id="licencia-under-hero" placement="Licencia - Debajo del Hero" />

      <div className="grid-2">
        {/* Form Column */}
        <div className="card">
          <h2>Detalles de la Licencia</h2>
          <p>Rellena la información del trámite de tránsito que vas a realizar.</p>

          {error && (
            <div className="error-alert" role="alert">
              <AlertTriangle size={20} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleCalculate}>
            <div className="form-group">
              <label htmlFor="select-tramite" className="form-label">Tipo de trámite: *</label>
              <select 
                id="select-tramite"
                className="form-control"
                value={tramiteType}
                onChange={(e) => setTramiteType(e.target.value)}
              >
                <option value="renovacion">Renovación de Licencia Ordinaria</option>
                <option value="aprendizaje">Obtención de Aprendizaje (Primera vez)</option>
                <option value="primera">Examen Práctico (Primera Licencia)</option>
                <option value="duplicado">Duplicado (Pérdida o Robo)</option>
                <option value="cambio">Cambio de Categoría</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="select-categoria" className="form-label">Categoría del vehículo: *</label>
              <select 
                id="select-categoria"
                className="form-control"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="liviano">Vehículo Liviano (Categoría 2 - Carros, Jeepetas)</option>
                <option value="motor">Motocicleta (Categoría 1)</option>
                <option value="pesado">Vehículo Pesado (Categoría 3 y 4 - Camiones, Autobuses)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="select-multas" className="form-label">¿Tienes multas pendientes en DIGESETT/INTRANT?</label>
              <select 
                id="select-multas"
                className="form-control"
                value={hasMultas ? 'si' : 'no'}
                onChange={(e) => {
                  setHasMultas(e.target.value === 'si');
                  if (e.target.value === 'no') setMultasAmount('');
                }}
              >
                <option value="no">No tengo multas (Perfil solvente)</option>
                <option value="si">Sí, tengo multas registradas</option>
              </select>
            </div>

            {hasMultas && (
              <div className="form-group animate-fade-in" style={{ backgroundColor: 'var(--primary-light)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                <label htmlFor="input-multas-amount" className="form-label">Monto total de multas acumulado (RD$): *</label>
                <input 
                  id="input-multas-amount"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 1000"
                  value={multasAmount}
                  onChange={(e) => setMultasAmount(e.target.value)}
                  min="1"
                  required={hasMultas}
                />
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>* Debe ingresar el monto acumulado que arroja la consulta de infracciones.</span>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="input-extra" className="form-label">Gastos adicionales o transporte (RD$):</label>
              <input 
                id="input-extra"
                type="number"
                className="form-control"
                placeholder="Ej. 200 (pasajes, copia de documentos)"
                value={gastoExtra}
                onChange={(e) => setGastoExtra(e.target.value)}
                min="0"
              />
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
              <h2>Presupuesto de Licencia</h2>

              <div className="main-cost-display" style={{ padding: '1.25rem 1rem' }}>
                <span className="main-cost-title">Total estimado a pagar</span>
                <span className="main-cost-value">
                  RD$ {totalEstimado.toLocaleString()}
                </span>
                <span className="main-cost-title" style={{ marginTop: '0.5rem', fontSize: '0.85rem', textTransform: 'none' }}>
                  (Tasa INTRANT: RD$ {baseCost.toLocaleString()} {hasMultas && `| Multas: RD$ ${Number(multasAmount).toLocaleString()}`})
                </span>
              </div>

              {/* Dominican Quote Phrase */}
              <div className="dominican-quote" style={{ borderLeftColor: 'var(--primary)', margin: '1.5rem 0' }}>
                <p>
                  "Tu trámite de {tramiteType === 'aprendizaje' ? 'licencia de aprendizaje' : tramiteType === 'primera' ? 'examen práctico' : tramiteType === 'duplicado' ? 'duplicado' : tramiteType === 'cambio' ? 'cambio de categoría' : 'renovación'} podría costar aproximadamente <strong>RD$ {totalEstimado.toLocaleString()}</strong>. Si tienes multas pendientes, debes sumarlas al total antes de hacer el trámite."
                </p>
              </div>

              {/* Requirements list */}
              <div className="budget-rules-breakdown" style={{ margin: '1.5rem 0' }}>
                <h3>Documentos y requisitos comunes</h3>
                <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.9rem' }}>
                  {reqs.map((req, idx) => (
                    <li key={idx} style={{ color: 'var(--text-main)' }}>
                      <CheckCircle size={14} className="text-success" style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              {hasMultas && (
                <div className="error-alert" role="alert" style={{ backgroundColor: 'var(--danger-light)', borderColor: 'var(--danger)', color: 'var(--text-main)', margin: '1rem 0' }}>
                  <AlertTriangle size={20} style={{ color: 'var(--danger)' }} />
                  <div>
                    <strong>Pagar multas primero:</strong> Debes saldar los <strong>RD$ {Number(multasAmount).toLocaleString()}</strong> de multas pendientes de forma presencial u online antes del día de tu cita de renovación.
                  </div>
                </div>
              )}

              {/* Cross Connections */}
              <div className="connections-actions" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '1.5rem 0' }}>
                <Link to="/checklist-documentos-rd" className="btn btn-secondary btn-block">
                  <CheckCircle size={16} /> Ver checklist de documentos
                </Link>
                <Link to="/cuanto-cuesta-mantener-un-carro-en-rd" className="btn btn-success btn-block">
                  <ArrowRight size={16} /> Ver gastos de mi vehículo
                </Link>
                <Link to="/calculadora-presupuesto-mensual-rd" className="btn btn-secondary btn-block">
                  Organizar mi presupuesto mensual
                </Link>
              </div>

              <AdSlot id="licencia-after-results" placement="Licencia - Después de Resultados" />

              <div className="financial-disclaimer" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '1rem' }}>
                <p><strong>Nota aclaratoria:</strong> Estos cálculos son estimados y tienen fines informativos. Los montos, requisitos, modalidades y disponibilidad pueden variar según la institución, fecha, tipo de trámite y cambios oficiales. Verifica siempre en la institución correspondiente antes de pagar o asistir.</p>
              </div>
            </div>
          ) : (
            <EmptyStateCard
              title="Costo Estimado de Licencia"
              description="Completa el tipo de trámite e indica si posees multas de tránsito pendientes de pago para obtener un estimado detallado de tus costos de licencia."
              icon={CreditCard}
            />
          )}
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <DisclaimerBox type="tramites" />
      </div>

      <AdSlot id="licencia-before-faq" placement="Licencia - Antes del FAQ" />

      <div className="card" style={{ marginTop: '2rem' }}>
        <FAQSection items={faqItems} />
      </div>

      <AdSlot id="licencia-before-footer" placement="Licencia - Antes del Footer" />

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
