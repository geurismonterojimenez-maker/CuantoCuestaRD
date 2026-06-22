import {
  useState,
  useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TRAMITES_LIST } from '../data/tramitesData';
import SEOHead from '../components/SEOHead';
import PageHero from '../components/PageHero';
import DisclaimerBox from '../components/DisclaimerBox';
import AdSlot from '../components/AdSlot';
import FAQSection,
  { type FAQItem } from '../components/FAQSection';
import { 
  RotateCcw,
  CheckSquare,
  Square,
  ArrowRight,
  FileText,
  ListTodo
} from 'lucide-react';

interface CheckedItemsState {
  [key: string]: boolean;
}

export default function ChecklistDocumentosRD() {
  const [selectedGroup, setSelectedGroup] = useState<string>('pasaporte-renovacion'); // matches one of the group options
  const [checkedItems, setCheckedItems] = useState<CheckedItemsState>({});
  const [notes, setNotes] = useState<string>('');

  const currentTramite = TRAMITES_LIST.find(t => t.id === selectedGroup) || TRAMITES_LIST[0];

  // Reset checkboxes when selected group changes
  useEffect(() => {
    const initialState: CheckedItemsState = {};
    if (currentTramite) {
      currentTramite.commonDocuments.forEach((_, idx) => {
        initialState[`${selectedGroup}-${idx}`] = false;
      });
    }
    setCheckedItems(initialState);
    setNotes('');
  }, [currentTramite, selectedGroup]);

  const faqItems: FAQItem[] = [
    {
      question: '¿Qué documentos necesito para hacer un trámite?',
      answer: 'Dependerá de la institución. Por ejemplo, en Pasaportes siempre necesitarás cédula original y el recibo del Banco de Reservas. En INTRANT para licencias necesitarás cédula y el comprobante de no multas. Consulta nuestro checklist detallado seleccionando el trámite correspondiente.'
    },
    {
      question: '¿Las copias de mis documentos deben estar a color?',
      answer: 'Por regla general en República Dominicana, las instituciones aceptan copias en blanco y negro legibles. Sin embargo, siempre debes llevar los documentos originales para su cotejo físico por parte del oficial.'
    },
    {
      question: '¿Es obligatorio llevar la cédula física?',
      answer: 'Sí. En la República Dominicana la Cédula de Identidad y Electoral es el documento de identificación supremo. Ninguna institución aceptará fotos o copias digitales en tu celular como sustituto del plástico original.'
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
    'name': 'Checklist de Documentos RD - CuantoCuestaRD',
    'operatingSystem': 'All',
    'applicationCategory': 'UtilitiesApplication',
    'description': 'Organiza y prepara los requisitos, documentos y tasas oficiales estimadas antes de asistir a cualquier trámite gubernamental en RD.',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'DOP'
    }
  };

  const handleToggle = (idx: number) => {
    const key = `${selectedGroup}-${idx}`;
    setCheckedItems({
      ...checkedItems,
      [key]: !checkedItems[key]
    });
  };

  const handleResetChecklist = () => {
    const resetState: CheckedItemsState = {};
    currentTramite.commonDocuments.forEach((_, idx) => {
      resetState[`${selectedGroup}-${idx}`] = false;
    });
    setCheckedItems(resetState);
    setNotes('');
  };

  const docsCount = currentTramite?.commonDocuments.length || 0;
  const checkedCount = Object.keys(checkedItems).filter(
    key => key.startsWith(selectedGroup) && checkedItems[key]
  ).length;

  const pendingCount = docsCount - checkedCount;
  const progressPercent = docsCount > 0 ? Math.round((checkedCount / docsCount) * 100) : 0;

  // Group of options based on key trámites categories requested
  // "Pasaporte, Licencia, Marbete, Acta de nacimiento, Certificación, Legalización, Buena conducta"
  const selectOptions = [
    { value: 'pasaporte-renovacion', label: 'Pasaporte (Renovación)' },
    { value: 'pasaporte-primera', label: 'Pasaporte (Primera vez)' },
    { value: 'licencia-renovacion', label: 'Licencia (Renovación)' },
    { value: 'licencia-aprendizaje', label: 'Licencia (Aprendizaje)' },
    { value: 'marbete', label: 'Marbete de Vehículo' },
    { value: 'acta-nacimiento', label: 'Acta de nacimiento' },
    { value: 'certificacion', label: 'Certificación oficial' },
    { value: 'legalizacion', label: 'Legalización / Apostilla' },
    { value: 'buena-conducta', label: 'Papel de buena conducta' }
  ];

  return (
    <div className="checklist-page">
      <SEOHead 
        title="Checklist de Documentos RD | Prepara tus trámites"
        description="Organiza los documentos que podrías necesitar para tus trámites en RD y revisa costos estimados antes de salir."
        schema={[faqSchema, appSchema]}
      />

      <PageHero 
        category="tramites"
        title="Checklist de Documentos"
        description="Valida los documentos obligatorios requeridos para realizar tus gestiones y trámites en RD."
        icon={ListTodo}
        chips={["checklist","documentos","requisitos"]}
      />

      <AdSlot id="checklist-under-hero" placement="Checklist - Debajo del Hero" />

      <div className="grid-2">
        {/* Selection Card */}
        <div className="card">
          <h2>Selecciona tu Trámite</h2>
          <p>Elige el trámite que vas a realizar para ver los documentos comunes requeridos y su costo de tasa estimado.</p>

          <div className="form-group">
            <label htmlFor="select-grupo-tramite" className="form-label">Selecciona el trámite a preparar:</label>
            <select 
              id="select-grupo-tramite"
              className="form-control"
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
            >
              {selectOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div className="tramite-summary-info" style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: 'var(--bg-color)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '1.1rem', marginTop: 0 }}>{currentTramite?.name}</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>{currentTramite?.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
              <span>Institución:</span>
              <strong>{currentTramite?.institution}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginTop: '0.4rem' }}>
              <span>Costo estimado de tasa:</span>
              <strong className="text-primary">RD$ {currentTramite?.basePriceNormal.toLocaleString()} {currentTramite?.basePriceVIP && `(Normal) / RD$ ${currentTramite.basePriceVIP.toLocaleString()} (VIP)`}</strong>
            </div>
          </div>

          {/* Personal Notes Box */}
          <div className="form-group animate-fade-in" style={{ marginTop: '1.5rem' }}>
            <label htmlFor="textarea-notes" className="form-label">Notas personales o pendientes:</label>
            <textarea 
              id="textarea-notes"
              className="form-control"
              rows={4}
              placeholder="Ej. Llevar dinero en efectivo para parqueo, sacar copia extra de la cédula del fiador..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{ fontFamily: 'inherit', resize: 'vertical' }}
            />
          </div>

          <button type="button" className="btn btn-secondary btn-block" onClick={handleResetChecklist} style={{ marginTop: '1rem' }}>
            <RotateCcw size={18} /> Limpiar Checklist
          </button>
        </div>

        {/* Checklist Card */}
        <div className="card">
          <h2>Lista de Requisitos</h2>
          <p>Marca cada documento conforme lo tengas listo.</p>

          {/* Progress bar section */}
          <div className="checklist-progress-container" style={{ margin: '1.25rem 0 1.5rem 0' }}>
            <div className="flex-between" style={{ marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>
              <span>Progreso de preparación</span>
              <span>{checkedCount} de {docsCount} listos</span>
            </div>
            <div className="progress-bar-bg" style={{ width: '100%', height: '12px', backgroundColor: 'var(--border-color)', borderRadius: '6px', overflow: 'hidden' }}>
              <div 
                className="progress-bar-fill" 
                style={{ 
                  width: `${progressPercent}%`, 
                  height: '100%', 
                  backgroundColor: progressPercent === 100 ? 'var(--success)' : 'var(--primary)', 
                  transition: 'width var(--transition-fast)' 
                }} 
              />
            </div>
            <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              {pendingCount === 0 
                ? "¡Excelente! Ya tienes todos los documentos sugeridos listos." 
                : `Ya tienes ${checkedCount} de ${docsCount} listos. Te faltan ${pendingCount} documentos.`
              }
            </div>
          </div>

          {/* Interactive Checkbox Items */}
          <div className="checklist-items" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {currentTramite?.commonDocuments.map((doc, idx) => {
              const key = `${selectedGroup}-${idx}`;
              const isChecked = checkedItems[key] || false;
              return (
                <div 
                  key={idx}
                  className={`checklist-item ${isChecked ? 'checked' : ''}`}
                  onClick={() => handleToggle(idx)}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    gap: '0.75rem', 
                    padding: '0.75rem 1rem', 
                    border: '1px solid var(--border-color)', 
                    borderRadius: '8px', 
                    cursor: 'pointer',
                    backgroundColor: isChecked ? 'var(--primary-light)' : '#ffffff',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <div style={{ marginTop: '2px', color: isChecked ? 'var(--primary)' : 'var(--text-muted)' }}>
                    {isChecked ? <CheckSquare size={20} /> : <Square size={20} />}
                  </div>
                  <span style={{ fontSize: '0.95rem', color: 'var(--text-main)', textDecoration: isChecked ? 'line-through' : 'none' }}>
                    {doc}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Notes display inside results */}
          {notes.trim().length > 0 && (
            <div className="dominican-quote" style={{ borderLeftColor: '#f59e0b', marginTop: '1.5rem', backgroundColor: '#fffbeb' }}>
              <strong style={{ fontSize: '0.85rem', display: 'block', marginBottom: '0.25rem', color: '#b45309' }}>Mis anotaciones:</strong>
              <p style={{ whiteSpace: 'pre-wrap', fontSize: '0.9rem', margin: 0 }}>{notes}</p>
            </div>
          )}

          {/* Action buttons */}
          <div className="connections-actions" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '2rem' }}>
            <Link to="/calculadora-tramites-rd" className="btn btn-secondary btn-block">
              <FileText size={16} /> Calcular costo de varios trámites juntos
            </Link>
            <Link to="/me-alcanza-el-sueldo" className="btn btn-secondary btn-block">
              ¿Me alcanza el sueldo para estos documentos? <ArrowRight size={16} />
            </Link>
            <Link to="/calculadora-ahorro-mensual-rd" className="btn btn-secondary btn-block">
              Calcular cuánto debo ahorrar
            </Link>
          </div>

          <AdSlot id="checklist-after-results" placement="Checklist - Después de Resultados" />

          <div className="financial-disclaimer" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '1.5rem' }}>
            <p><strong>Nota aclaratoria:</strong> Estos documentos son los requisitos generales y más comunes solicitados. La institución correspondiente puede requerir documentos adicionales o especiales según el caso específico. Confirma siempre en el portal oficial antes de salir.</p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <DisclaimerBox type="tramites" />
      </div>

      <AdSlot id="checklist-before-faq" placement="Checklist - Antes del FAQ" />

      <div className="card" style={{ marginTop: '2rem' }}>
        <FAQSection items={faqItems} />
      </div>

      <AdSlot id="checklist-before-footer" placement="Checklist - Antes del Footer" />

      <style>{`
        .checklist-item:hover {
          border-color: var(--primary) !important;
          background-color: var(--primary-light) !important;
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
