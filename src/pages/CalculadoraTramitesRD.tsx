import {
  useState } from 'react';
import { Link } from 'react-router-dom';
import { TRAMITES_LIST } from '../data/tramitesData';
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
  Plus,
  Trash2,
  CheckCircle,
  FileText,
  BookOpen
} from 'lucide-react';

interface SelectedTramite {
  tramiteId: string;
  quantity: number;
  isVIP: boolean;
  extraCharges: number;
  transportCharges: number;
}

export default function CalculadoraTramitesRD() {
  const [selectedList, setSelectedList] = useState<SelectedTramite[]>([]);
  const [currentTramiteId, setCurrentTramiteId] = useState<string>(TRAMITES_LIST[0]?.id || '');
  const [currentQty, setCurrentQty] = useState<number>(1);
  const [currentIsVIP, setCurrentIsVIP] = useState<boolean>(false);
  const [currentExtra, setCurrentExtra] = useState<string>('');
  const [currentTransport, setCurrentTransport] = useState<string>('');
  
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: '¿Qué documentos necesito para hacer un trámite?',
      answer: 'Los documentos varían según el trámite. Para pasaporte se requiere acta de nacimiento y cédula física; para licencia se requiere cédula vigente y no tener multas. Puedes usar nuestra herramienta de Checklist de Documentos para organizar tus requisitos.'
    },
    {
      question: '¿Qué diferencia hay entre la modalidad Normal y VIP?',
      answer: 'La modalidad VIP o rápida permite obtener el pasaporte el mismo día (si asistes temprano) pagando una tasa de impuesto mayor (RD$ 2,650 en vez de RD$ 1,650). En otros trámites gubernamentales, la modalidad VIP agiliza los tiempos de entrega oficial.'
    },
    {
      question: '¿Cómo puedo pagar los impuestos de mis trámites?',
      answer: 'En la República Dominicana, la mayoría de los impuestos para pasaporte y licencia de conducir se pagan a través de las sucursales del Banco de Reservas (Banreservas) o mediante sus portales digitales oficiales. Guarda siempre el recibo físico de pago.'
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
    'name': 'Calculadora de Trámites RD - CuantoCuestaRD',
    'operatingSystem': 'All',
    'applicationCategory': 'FinanceApplication',
    'description': 'Calculadora para estimar costos totales y organizar documentos de trámites en República Dominicana como pasaporte, licencia y marbete.',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'DOP'
    }
  };

  const handleAddTramite = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const qty = Number(currentQty) || 1;
    const extra = Number(currentExtra) || 0;
    const transport = Number(currentTransport) || 0;

    if (qty <= 0) {
      setError('La cantidad debe ser mayor que cero.');
      return;
    }

    if (extra < 0 || transport < 0) {
      setError('Los cargos adicionales y gastos de transporte no pueden ser negativos.');
      return;
    }

    const exists = selectedList.some(item => item.tramiteId === currentTramiteId && item.isVIP === currentIsVIP);
    if (exists) {
      setSelectedList(selectedList.map(item => {
        if (item.tramiteId === currentTramiteId && item.isVIP === currentIsVIP) {
          return {
            ...item,
            quantity: item.quantity + qty,
            extraCharges: item.extraCharges + extra,
            transportCharges: item.transportCharges + transport
          };
        }
        return item;
      }));
    } else {
      setSelectedList([...selectedList, {
        tramiteId: currentTramiteId,
        quantity: qty,
        isVIP: currentIsVIP,
        extraCharges: extra,
        transportCharges: transport
      }]);
    }

    // Reset current form items (except selected type)
    setCurrentQty(1);
    setCurrentIsVIP(false);
    setCurrentExtra('');
    setCurrentTransport('');
    setShowResults(false);
  };

  const handleRemoveItem = (index: number) => {
    const newList = [...selectedList];
    newList.splice(index, 1);
    setSelectedList(newList);
    setShowResults(false);
  };

  const handleCalculate = () => {
    if (selectedList.length === 0) {
      setError('Debes agregar al menos un trámite a la lista para calcular.');
      return;
    }
    setError(null);
    setShowResults(true);
  };

  const handleResetAll = () => {
    setSelectedList([]);
    setCurrentTramiteId(TRAMITES_LIST[0]?.id || '');
    setCurrentQty(1);
    setCurrentIsVIP(false);
    setCurrentExtra('');
    setCurrentTransport('');
    setError(null);
    setShowResults(false);
  };

  // Calculations
  let subtotalTramites = 0;
  let totalAdicionales = 0;
  let totalTransporte = 0;
  const documentosUnicos = new Set<string>();

  selectedList.forEach(item => {
    const baseInfo = TRAMITES_LIST.find(t => t.id === item.tramiteId);
    if (baseInfo) {
      const price = (item.isVIP && baseInfo.basePriceVIP) ? baseInfo.basePriceVIP : baseInfo.basePriceNormal;
      subtotalTramites += price * item.quantity;
      totalAdicionales += item.extraCharges;
      totalTransporte += item.transportCharges;
      
      baseInfo.commonDocuments.forEach(doc => documentosUnicos.add(doc));
    }
  });

  const totalEstimado = subtotalTramites + totalAdicionales + totalTransporte;

  return (
    <div className="tramites-page">
      <SEOHead 
        title="Calculadora de Trámites RD | Costos estimados"
        description="Calcula costos estimados de trámites comunes en República Dominicana como pasaporte, licencia, marbete, actas y certificaciones."
        schema={[faqSchema, appSchema]}
      />

      <PageHero 
        category="tramites"
        title="Calculadora de Trámites"
        description="Calcula el presupuesto consolidado que necesitas para realizar varios trámites gubernamentales."
        icon={BookOpen}
        chips={["tramites","papeles","gobierno"]}
      />

      <AdSlot id="tramites-under-hero" placement="Trámites - Debajo del Hero" />

      <div className="grid-2">
        {/* Form Column */}
        <div className="card">
          <h2>Agregar Trámites a la Lista</h2>
          <p>Selecciona un trámite, define su modalidad y agrégalo para calcular el total.</p>

          {error && (
            <div className="error-alert" role="alert">
              <AlertTriangle size={20} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleAddTramite}>
            <div className="form-group">
              <label htmlFor="select-tramite" className="form-label">Tipo de trámite: *</label>
              <select 
                id="select-tramite"
                className="form-control"
                value={currentTramiteId}
                onChange={(e) => {
                  setCurrentTramiteId(e.target.value);
                  const selectedInfo = TRAMITES_LIST.find(t => t.id === e.target.value);
                  if (selectedInfo && !selectedInfo.basePriceVIP) {
                    setCurrentIsVIP(false);
                  }
                }}
              >
                {TRAMITES_LIST.map(t => (
                  <option key={t.id} value={t.id}>{t.name} ({t.institution})</option>
                ))}
              </select>
            </div>

            <div className="grid-2" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-qty" className="form-label">Cantidad: *</label>
                <input 
                  id="input-qty"
                  type="number"
                  className="form-control"
                  value={currentQty}
                  onChange={(e) => setCurrentQty(Math.max(1, Number(e.target.value) || 1))}
                  min="1"
                  required
                />
              </div>

              {TRAMITES_LIST.find(t => t.id === currentTramiteId)?.basePriceVIP && (
                <div className="form-group">
                  <label htmlFor="select-vip" className="form-label">Modalidad: *</label>
                  <select 
                    id="select-vip"
                    className="form-control"
                    value={currentIsVIP ? 'vip' : 'normal'}
                    onChange={(e) => setCurrentIsVIP(e.target.value === 'vip')}
                  >
                    <option value="normal">Normal</option>
                    <option value="vip">VIP / Rápido</option>
                  </select>
                </div>
              )}
            </div>

            <div className="form-section-title" style={{ borderBottomColor: 'var(--primary-light)' }}>Gastos Extras Opcionales</div>
            
            <div className="grid-2" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-extra" className="form-label">Cargos adicionales (RD$):</label>
                <input 
                  id="input-extra"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 300 (fotos, etc.)"
                  value={currentExtra}
                  onChange={(e) => setCurrentExtra(e.target.value)}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-transport" className="form-label">Gasto de transporte/pasaje:</label>
                <input 
                  id="input-transport"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 150"
                  value={currentTransport}
                  onChange={(e) => setCurrentTransport(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-secondary btn-block" style={{ marginTop: '1rem' }}>
              <Plus size={18} /> Agregar Trámite
            </button>
          </form>

          {/* List of Added Procedures */}
          <div style={{ marginTop: '2rem' }}>
            <h3>Trámites agregados ({selectedList.length})</h3>
            {selectedList.length === 0 ? (
              <p className="text-muted" style={{ fontStyle: 'italic' }}>No has agregado trámites a tu lista de presupuesto.</p>
            ) : (
              <div className="selected-items-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.75rem' }}>
                {selectedList.map((item, idx) => {
                  const baseInfo = TRAMITES_LIST.find(t => t.id === item.tramiteId);
                  const basePrice = baseInfo ? ((item.isVIP && baseInfo.basePriceVIP) ? baseInfo.basePriceVIP : baseInfo.basePriceNormal) : 0;
                  const itemSubtotal = basePrice * item.quantity + item.extraCharges + item.transportCharges;
                  return (
                    <div key={idx} className="flex-between" style={{ padding: '0.75rem', backgroundColor: 'var(--bg-color)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                      <div>
                        <strong>{baseInfo?.name}</strong> {item.isVIP ? <span className="tag tag-vip" style={{ backgroundColor: '#fee2e2', color: '#ef4444', fontSize: '0.75rem', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>VIP</span> : null}
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                          Cant: {item.quantity} × RD$ {basePrice.toLocaleString()} 
                          {item.extraCharges > 0 && ` + Extras: RD$ ${item.extraCharges}`}
                          {item.transportCharges > 0 && ` + Pasaje: RD$ ${item.transportCharges}`}
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontWeight: 600 }}>RD$ {itemSubtotal.toLocaleString()}</span>
                        <button 
                          type="button" 
                          className="btn-text" 
                          onClick={() => handleRemoveItem(idx)}
                          aria-label={`Eliminar ${baseInfo?.name} de la lista`}
                          style={{ color: 'var(--danger)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <button type="button" className="btn btn-secondary" onClick={handleResetAll} style={{ flex: 1 }}>
                    <RotateCcw size={18} /> Limpiar Todo
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleCalculate} style={{ flex: 2 }}>
                    Calcular total
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Column */}
        <div className="results-column">
          {showResults && selectedList.length > 0 ? (
            <div className="card result-card" style={{ height: '100%' }}>
              <h2>Presupuesto General Estimado</h2>

              <div className="main-cost-display" style={{ padding: '1.25rem 1rem' }}>
                <span className="main-cost-title">Total aproximado a llevar</span>
                <span className="main-cost-value">
                  RD$ {totalEstimado.toLocaleString()}
                </span>
                <span className="main-cost-title" style={{ marginTop: '0.5rem', fontSize: '0.85rem', textTransform: 'none' }}>
                  (Tasas: RD$ {subtotalTramites.toLocaleString()} | Adicionales: RD$ {(totalAdicionales + totalTransporte).toLocaleString()})
                </span>
              </div>

              {/* Dominican Quote Phrase */}
              <div className="dominican-quote" style={{ borderLeftColor: 'var(--primary)', margin: '1.5rem 0' }}>
                <p>
                  "Para los trámites seleccionados, podrías necesitar aproximadamente <strong>RD$ {totalEstimado.toLocaleString()}</strong>. Este monto es una referencia para planificar y puede variar según la institución, modalidad y fecha."
                </p>
              </div>

              {/* Summary of Documents */}
              <div className="budget-rules-breakdown" style={{ margin: '1.5rem 0' }}>
                <h3>Documentos comunes recomendados ({documentosUnicos.size})</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>Consolida los requisitos de todos tus trámites agregados:</p>
                <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.9rem' }}>
                  {Array.from(documentosUnicos).map((doc, i) => (
                    <li key={i} style={{ color: 'var(--text-main)' }}>
                      <CheckCircle size={14} className="text-success" style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended warning */}
              <div className="dominican-quote" style={{ backgroundColor: 'var(--primary-light)', borderLeftColor: 'var(--primary)', padding: '1rem', borderRadius: '8px', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                <strong>Recomendación importante:</strong> Antes de acudir a la cita, confirma si debes agendar un turno online en el portal del organismo emisor y asegúrate de llevar copias legibles de toda tu documentación física para evitar retrasos.
              </div>

              {/* Cross Connections */}
              <div className="connections-actions" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '1.5rem 0' }}>
                <Link to="/checklist-documentos-rd" className="btn btn-secondary btn-block">
                  <CheckCircle size={16} /> Ir al Checklist de Documentos
                </Link>
                <Link to="/calculadora-presupuesto-mensual-rd" className="btn btn-secondary btn-block">
                  <FileText size={16} /> Organizar mi presupuesto mensual
                </Link>
                <Link to="/me-alcanza-el-sueldo" className="btn btn-secondary btn-block">
                  ¿Me alcanza el sueldo para mis trámites? <ArrowRight size={16} />
                </Link>
              </div>

              <AdSlot id="tramites-after-results" placement="Trámites - Después de Resultados" />

              <div className="financial-disclaimer" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '1rem' }}>
                <p><strong>Nota aclaratoria:</strong> Estos cálculos son estimados y tienen fines informativos. Los montos, requisitos, modalidades y disponibilidad pueden variar según la institución, fecha, tipo de trámite y cambios oficiales. Verifica siempre en la institución correspondiente antes de pagar o asistir.</p>
              </div>
            </div>
          ) : (
            <EmptyStateCard
              title="Presupuesto de Trámites"
              description="Agrega los trámites que planeas hacer (como pasaporte, renovación de licencia de conducir, copias de actas) para calcular un presupuesto global aproximado."
              icon={FileText}
            />
          )}
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <DisclaimerBox type="tramites" />
      </div>

      <AdSlot id="tramites-before-faq" placement="Trámites - Antes del FAQ" />

      <div className="card" style={{ marginTop: '2rem' }}>
        <FAQSection items={faqItems} />
      </div>

      <AdSlot id="tramites-before-footer" placement="Trámites - Antes del Footer" />

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

        .tag-vip {
          display: inline-block;
          font-weight: 700;
          margin-left: 0.5rem;
          vertical-align: middle;
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
