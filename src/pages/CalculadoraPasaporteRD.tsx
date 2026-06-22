import {
  useState,
  useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PASAPORTE_PRICES } from '../data/tramitesData';
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
  UserCheck,
  FileText
} from 'lucide-react';

export default function CalculadoraPasaporteRD() {
  const [solicitudType, setSolicitudType] = useState<string>('renovacion'); // primera, renovacion, perdida, menor
  const [modalidad, setModalidad] = useState<string>('normal'); // normal, vip
  const [vigencia, setVigencia] = useState<string>('6'); // 6, 10
  const [peopleCount, setPeopleCount] = useState<string>('1');
  const [extraCost, setExtraCost] = useState<string>('');

  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  // Automatically restrict 10 years option for minors
  useEffect(() => {
    if (solicitudType === 'menor') {
      setVigencia('6');
    }
  }, [solicitudType]);

  const faqItems: FAQItem[] = [
    {
      question: '¿Cuánto cuesta renovar el pasaporte dominicano?',
      answer: 'La renovación del pasaporte dominicano por 6 años cuesta RD$ 1,650 en modalidad Normal y RD$ 2,650 en modalidad VIP. Si deseas obtenerlo por 10 años, el costo es de RD$ 5,650 (Normal) o RD$ 6,650 (VIP).'
    },
    {
      question: '¿Cuánto cuesta sacar el pasaporte por primera vez?',
      answer: 'Tiene el mismo costo que la renovación: RD$ 1,650 para la modalidad Normal (entrega en unos 6 a 10 días laborables) y RD$ 2,650 para la modalidad VIP (entrega rápida). Se debe presentar un acta de nacimiento inextensa homologada.'
    },
    {
      question: '¿Qué documentos se necesitan para renovar el pasaporte de un menor?',
      answer: 'Se requiere el pasaporte anterior del menor (si es renovación), acta de nacimiento inextensa del menor del mismo año, cédula original de uno de los padres (quien asista a la cita) y el recibo del pago de impuestos. Los menores no pueden optar por la vigencia de 10 años.'
    },
    {
      question: '¿Qué pasa si he perdido mi pasaporte anterior?',
      answer: 'Debes pagar una penalidad por pérdida. El costo estimado del trámite es de RD$ 3,150 en modalidad Normal o RD$ 4,150 en VIP. Además, se requiere la denuncia por pérdida emitida por la Policía Nacional.'
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
    'name': 'Calculadora de Pasaporte Dominicano - CuantoCuestaRD',
    'operatingSystem': 'All',
    'applicationCategory': 'FinanceApplication',
    'description': 'Calcula cuánto cuesta renovar o sacar el pasaporte dominicano de 6 o 10 años, normal o VIP, incluyendo desglose por personas y requisitos.',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'DOP'
    }
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const valPeople = Number(peopleCount) || 1;
    const valExtra = Number(extraCost) || 0;

    if (valPeople <= 0) {
      setError('La cantidad de personas debe ser mayor que cero.');
      return;
    }

    if (valExtra < 0) {
      setError('Los gastos adicionales no pueden ser negativos.');
      return;
    }

    setShowResults(true);
  };

  const handleReset = () => {
    setSolicitudType('renovacion');
    setModalidad('normal');
    setVigencia('6');
    setPeopleCount('1');
    setExtraCost('');
    setError(null);
    setShowResults(false);
  };

  // Calculations
  const valPeople = Number(peopleCount) || 1;
  const valExtra = Number(extraCost) || 0;
  const isVIP = modalidad === 'vip';

  let unitCost = PASAPORTE_PRICES.normal6Anos;
  
  if (solicitudType === 'perdida') {
    unitCost = isVIP ? PASAPORTE_PRICES.duplicadoPerdidaVIP : PASAPORTE_PRICES.duplicadoPerdidaNormal;
  } else {
    if (vigencia === '10') {
      unitCost = isVIP ? PASAPORTE_PRICES.vip10Anos : PASAPORTE_PRICES.normal10Anos;
    } else {
      unitCost = isVIP ? PASAPORTE_PRICES.vip6Anos : PASAPORTE_PRICES.normal6Anos;
    }
  }

  const taxesTotal = unitCost * valPeople;
  const totalEstimado = taxesTotal + valExtra;

  // Documents checklist based on selection
  let reqs: string[] = [];
  if (solicitudType === 'primera') {
    reqs = [
      'Acta de Nacimiento Inextensa timbrada (emitida por la JCE)',
      'Cédula de Identidad y Electoral original (vigente) y una copia legible',
      'Recibo de pago de tasa del Banco de Reservas a nombre del solicitante',
      'Cita previa confirmada e impresa del portal oficial'
    ];
  } else if (solicitudType === 'menor') {
    reqs = [
      'Acta de Nacimiento Inextensa del menor de edad timbrada',
      'Cédula de Identidad del padre o tutor legal que asiste con el menor',
      'Pasaporte anterior del menor (si es renovación)',
      'Recibo de pago de tasa de impuestos del Banco de Reservas',
      'Autorización consular (si aplica, en caso de ausencia de uno de los padres)'
    ];
  } else if (solicitudType === 'perdida') {
    reqs = [
      'Cédula de Identidad y Electoral original (vigente) y una copia legible',
      'Certificación de pérdida emitida por la Policía Nacional (original)',
      'Recibo de pago de tasa de pérdida + tasa de emisión de pasaporte del Banco de Reservas',
      'Copia del pasaporte extraviado (si dispone de ella)'
    ];
  } else {
    // Ordinary Renewal
    reqs = [
      'Pasaporte dominicano vencido o próximo a vencer',
      'Cédula de Identidad y Electoral original del solicitante y una copia legible',
      'Recibo de pago del impuesto de pasaporte del Banco de Reservas',
      'Cita previa confirmada del portal de la Dirección General de Pasaportes'
    ];
  }

  return (
    <div className="pasaporte-page">
      <SEOHead 
        title="Cuánto cuesta renovar el pasaporte dominicano"
        description="Estima cuánto podrías necesitar para renovar o sacar el pasaporte dominicano según modalidad, cantidad de personas y gastos adicionales."
        schema={[faqSchema, appSchema]}
      />

      <PageHero 
        category="tramites"
        title="Pasaporte Dominicano"
        description="Estima las tasas de la institución y requisitos para la emisión o renovación de pasaporte VIP o normal."
        icon={FileText}
        chips={["pasaporte","renovacion","emision"]}
      />

      <AdSlot id="pasaporte-under-hero" placement="Pasaporte - Debajo del Hero" />

      <div className="grid-2">
        {/* Form Column */}
        <div className="card">
          <h2>Detalles de la Solicitud</h2>
          <p>Indica el tipo de pasaporte y la cantidad de personas para calcular el presupuesto.</p>

          {error && (
            <div className="error-alert" role="alert">
              <AlertTriangle size={20} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleCalculate}>
            <div className="form-group">
              <label htmlFor="select-solicitud" className="form-label">Tipo de trámite: *</label>
              <select 
                id="select-solicitud"
                className="form-control"
                value={solicitudType}
                onChange={(e) => setSolicitudType(e.target.value)}
              >
                <option value="renovacion">Renovación de Pasaporte Adulto</option>
                <option value="primera">Pasaporte por primera vez</option>
                <option value="perdida">Duplicado por pérdida o robo</option>
                <option value="menor">Pasaporte para Menor de Edad</option>
              </select>
            </div>

            <div className="grid-2" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="select-modalidad" className="form-label">Modalidad de entrega: *</label>
                <select 
                  id="select-modalidad"
                  className="form-control"
                  value={modalidad}
                  onChange={(e) => setModalidad(e.target.value)}
                >
                  <option value="normal">Normal (6-10 días hábiles)</option>
                  <option value="vip">VIP (Mismo día / Rápido)</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="select-vigencia" className="form-label">Vigencia del pasaporte: *</label>
                <select 
                  id="select-vigencia"
                  className="form-control"
                  value={vigencia}
                  onChange={(e) => setVigencia(e.target.value)}
                  disabled={solicitudType === 'menor' || solicitudType === 'perdida'}
                >
                  <option value="6">6 Años</option>
                  <option value="10">10 Años</option>
                </select>
              </div>
            </div>

            {solicitudType === 'menor' && (
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', fontStyle: 'italic' }}>
                * Por disposición oficial, los pasaportes de menores de edad solo se emiten con vigencia de 6 años.
              </div>
            )}

            {solicitudType === 'perdida' && (
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', fontStyle: 'italic' }}>
                * Los duplicados por pérdida aplican cargos adicionales de penalidad oficial e incluyen vigencia estándar.
              </div>
            )}

            <div className="grid-2" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-people" className="form-label">Cantidad de personas: *</label>
                <input 
                  id="input-people"
                  type="number"
                  className="form-control"
                  value={peopleCount}
                  onChange={(e) => setPeopleCount(e.target.value)}
                  min="1"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-extra" className="form-label">Gasto adicional (RD$):</label>
                <input 
                  id="input-extra"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 250 (fotos, copias)"
                  value={extraCost}
                  onChange={(e) => setExtraCost(e.target.value)}
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
              <h2>Costo de Pasaporte Estimado</h2>

              <div className="main-cost-display" style={{ padding: '1.25rem 1rem' }}>
                <span className="main-cost-title">Presupuesto aproximado total</span>
                <span className="main-cost-value">
                  RD$ {totalEstimado.toLocaleString()}
                </span>
                <span className="main-cost-title" style={{ marginTop: '0.5rem', fontSize: '0.85rem', textTransform: 'none' }}>
                  (Costo unitario del trámite: RD$ {unitCost.toLocaleString()})
                </span>
              </div>

              {/* Dominican Quote Phrase */}
              <div className="dominican-quote" style={{ borderLeftColor: 'var(--primary)', margin: '1.5rem 0' }}>
                <p>
                  "Si vas a {solicitudType === 'primera' ? 'sacar por primera vez' : solicitudType === 'perdida' ? 'declarar pérdida de' : 'renovar'} el pasaporte para <strong>{valPeople} {valPeople === 1 ? 'persona' : 'personas'}</strong>, podrías necesitar aproximadamente <strong>RD$ {totalEstimado.toLocaleString()}</strong>, dependiendo de la modalidad seleccionada y otros gastos adicionales."
                </p>
              </div>

              {/* Requirements list */}
              <div className="budget-rules-breakdown" style={{ margin: '1.5rem 0' }}>
                <h3>Documentos comunes requeridos</h3>
                <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.9rem' }}>
                  {reqs.map((req, idx) => (
                    <li key={idx} style={{ color: 'var(--text-main)' }}>
                      <CheckCircle size={14} className="text-success" style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="dominican-quote" style={{ backgroundColor: '#fffbeb', borderLeftColor: '#f59e0b', padding: '1rem', borderRadius: '8px', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                <strong>Cita previa obligatoria:</strong> Recuerda que debes agendar tu cita a través del portal oficial de la Dirección General de Pasaportes. El pago de impuestos no asegura un turno inmediato, planifica con tiempo.
              </div>

              {/* Cross Connections */}
              <div className="connections-actions" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '1.5rem 0' }}>
                <Link to="/checklist-documentos-rd" className="btn btn-secondary btn-block">
                  <CheckCircle size={16} /> Ver checklist de documentos
                </Link>
                <Link to="/calculadora-ahorro-mensual-rd" className="btn btn-success btn-block">
                  Calcular cuánto debo ahorrar para el viaje <ArrowRight size={16} />
                </Link>
                <Link to="/calculadora-presupuesto-mensual-rd" className="btn btn-secondary btn-block">
                  Organizar mi presupuesto mensual
                </Link>
              </div>

              <AdSlot id="pasaporte-after-results" placement="Pasaporte - Después de Resultados" />

              <div className="financial-disclaimer" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '1rem' }}>
                <p><strong>Nota aclaratoria:</strong> Estos cálculos son estimados y tienen fines informativos. Los montos, requisitos, modalidades y disponibilidad pueden variar según la institución, fecha, tipo de trámite y cambios oficiales. Verifica siempre en la institución correspondiente antes de pagar o asistir.</p>
              </div>
            </div>
          ) : (
            <EmptyStateCard
              title="Costo Estimado de Pasaporte"
              description="Elige el tipo de solicitud (primera vez, renovación, menor de edad) y la cantidad de personas para conocer el valor estimado de las tasas e impuestos gubernamentales en RD."
              icon={UserCheck}
            />
          )}
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <DisclaimerBox type="tramites" />
      </div>

      <AdSlot id="pasaporte-before-faq" placement="Pasaporte - Antes del FAQ" />

      <div className="card" style={{ marginTop: '2rem' }}>
        <FAQSection items={faqItems} />
      </div>

      <AdSlot id="pasaporte-before-footer" placement="Pasaporte - Antes del Footer" />

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
