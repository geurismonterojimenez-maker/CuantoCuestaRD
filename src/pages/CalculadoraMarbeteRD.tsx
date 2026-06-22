import {
  useState } from 'react';
import { Link } from 'react-router-dom';
import { MARBETE_PRICES } from '../data/tramitesData';
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
  AlertCircle,
  Calendar
} from 'lucide-react';

export default function CalculadoraMarbeteRD() {
  const [vehiculoType, setVehiculoType] = useState<string>('carro'); // carro, jeepeta, camioneta, motor, pesado
  const [vehiculoAno, setVehiculoAno] = useState<string>('2018');
  const [hasRecargo, setHasRecargo] = useState<boolean>(false);
  const [hasMultas, setHasMultas] = useState<boolean>(false);
  const [multasAmount, setMultasAmount] = useState<string>('');
  const [hasSeguro, setHasSeguro] = useState<boolean>(false);
  const [gastoExtra, setGastoExtra] = useState<string>('');

  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const faqItems: FAQItem[] = [
    {
      question: '¿Cuánto cuesta renovar el marbete en RD?',
      answer: 'El costo del marbete depende del año de fabricación del vehículo: 1) Vehículos con año de fabricación hasta el 2020 pagan RD$ 1,500. 2) Vehículos con año de fabricación del 2021 en adelante pagan RD$ 3,000.'
    },
    {
      question: '¿De cuánto es el recargo si no pago el marbete a tiempo?',
      answer: 'El recargo por renovación tardía (fuera del plazo oficial) es de RD$ 2,000 pesos adicionales que se deben sumar al costo base del marbete.'
    },
    {
      question: '¿Qué pasa si tengo multas de tránsito registradas?',
      answer: 'Para renovar el marbete, la ley dominicana exige que el vehículo y su propietario estén libres de multas de tránsito activas en la base de datos de la DIGESETT y la DGII. Debes saldar todas las infracciones antes de poder comprar el marbete.'
    },
    {
      question: '¿Qué es el Seguro de Ley en República Dominicana?',
      answer: 'Es el seguro obligatorio mínimo de responsabilidad civil para cubrir daños a terceros en accidentes de tránsito. Su costo anual ronda entre RD$ 1,800 para motores y de RD$ 3,500 a RD$ 5,000 para automóviles.'
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
    'name': 'Calculadora de Marbete RD - CuantoCuestaRD',
    'operatingSystem': 'All',
    'applicationCategory': 'FinanceApplication',
    'description': 'Calcula el costo del marbete de tu vehículo en República Dominicana basándose en su año, recargos y multas pendientes.',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'DOP'
    }
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const ano = Number(vehiculoAno) || 2020;
    const valMultas = hasMultas ? (Number(multasAmount) || 0) : 0;
    const valExtra = Number(gastoExtra) || 0;

    if (ano < 1900 || ano > 2027) {
      setError('Por favor, ingresa un año de vehículo válido.');
      return;
    }

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
    setVehiculoType('carro');
    setVehiculoAno('2018');
    setHasRecargo(false);
    setHasMultas(false);
    setMultasAmount('');
    setHasSeguro(false);
    setGastoExtra('');
    setError(null);
    setShowResults(false);
  };

  // Calculations
  const ano = Number(vehiculoAno) || 2020;
  const isOld = ano <= 2020;
  const marbeteBase = isOld ? MARBETE_PRICES.hasta2020 : MARBETE_PRICES.desde2021;
  const recargo = hasRecargo ? MARBETE_PRICES.recargoTardio : 0;
  
  // Calculate default annual insurance based on vehicle type
  let seguroAnual = 0;
  if (hasSeguro) {
    if (vehiculoType === 'motor') {
      seguroAnual = 1800;
    } else if (vehiculoType === 'pesado') {
      seguroAnual = 6000;
    } else {
      // carro, jeepeta, camioneta
      seguroAnual = 3800;
    }
  }

  const valMultas = hasMultas ? (Number(multasAmount) || 0) : 0;
  const valExtra = Number(gastoExtra) || 0;

  const totalMarbete = marbeteBase + recargo;
  const totalEstimado = totalMarbete + valMultas + seguroAnual + valExtra;

  return (
    <div className="marbete-page">
      <SEOHead 
        title="Calculadora de Marbete RD | Costos de vehículo"
        description="Estima gastos relacionados con marbete, multas y costos legales básicos de mantener un vehículo al día."
        schema={[faqSchema, appSchema]}
      />

      <PageHero 
        category="tramites"
        title="Marbete"
        description="Calcula el costo del impuesto de circulación vehicular anual, incluyendo recargos por retraso."
        icon={Calendar}
        chips={["marbete","circulacion","dgii"]}
      />

      <AdSlot id="marbete-under-hero" placement="Marbete - Debajo del Hero" />

      <div className="grid-2">
        {/* Form Column */}
        <div className="card">
          <h2>Detalles del Vehículo</h2>
          <p>Indica los datos del vehículo para estimar su costo de circulación anual.</p>

          {error && (
            <div className="error-alert" role="alert">
              <AlertTriangle size={20} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleCalculate}>
            <div className="grid-2" style={{ gridTemplateColumns: '1.2fr 0.8fr', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="select-tipo" className="form-label">Tipo de vehículo: *</label>
                <select 
                  id="select-tipo"
                  className="form-control"
                  value={vehiculoType}
                  onChange={(e) => setVehiculoType(e.target.value)}
                >
                  <option value="carro">Carro / Sedán</option>
                  <option value="jeepeta">Jeepeta / SUV</option>
                  <option value="camioneta">Camioneta / Pick-up</option>
                  <option value="motor">Motocicleta</option>
                  <option value="pesado">Vehículo Pesado / Camión</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="input-ano" className="form-label">Año del vehículo: *</label>
                <input 
                  id="input-ano"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 2018"
                  value={vehiculoAno}
                  onChange={(e) => setVehiculoAno(e.target.value)}
                  min="1900"
                  max="2027"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="select-recargo" className="form-label">¿Renovación tardía? (Fuera de plazo):</label>
              <select 
                id="select-recargo"
                className="form-control"
                value={hasRecargo ? 'si' : 'no'}
                onChange={(e) => setHasRecargo(e.target.value === 'si')}
              >
                <option value="no">No, pago dentro de la fecha regular</option>
                <option value="si">Sí, pago tardío (Aplicar recargo de RD$ 2,000)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="select-multas" className="form-label">¿Posees multas registradas en DIGESETT?</label>
              <select 
                id="select-multas"
                className="form-control"
                value={hasMultas ? 'si' : 'no'}
                onChange={(e) => {
                  setHasMultas(e.target.value === 'si');
                  if (e.target.value === 'no') setMultasAmount('');
                }}
              >
                <option value="no">No, libre de multas</option>
                <option value="si">Sí, tengo multas de tránsito pendientes</option>
              </select>
            </div>

            {hasMultas && (
              <div className="form-group animate-fade-in" style={{ backgroundColor: 'var(--primary-light)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                <label htmlFor="input-multas-amount" className="form-label">Monto total estimado de multas (RD$): *</label>
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
              </div>
            )}

            <div className="form-group">
              <label htmlFor="select-seguro" className="form-label">¿Agregar estimación de Seguro de Ley Obligatorio?</label>
              <select 
                id="select-seguro"
                className="form-control"
                value={hasSeguro ? 'si' : 'no'}
                onChange={(e) => setHasSeguro(e.target.value === 'si')}
              >
                <option value="no">No agregar seguro</option>
                <option value="si">Sí, agregar Seguro de Ley anual</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="input-extra" className="form-label">Otros gastos legales u operacionales (RD$):</label>
              <input 
                id="input-extra"
                type="number"
                className="form-control"
                placeholder="Ej. 500 (revisión, copias)"
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
              <h2>Costo del Vehículo al Día</h2>

              <div className="main-cost-display" style={{ padding: '1.25rem 1rem' }}>
                <span className="main-cost-title">Presupuesto aproximado total</span>
                <span className="main-cost-value">
                  RD$ {totalEstimado.toLocaleString()}
                </span>
                <span className="main-cost-title" style={{ marginTop: '0.5rem', fontSize: '0.85rem', textTransform: 'none' }}>
                  (Costo marbete: RD$ {totalMarbete.toLocaleString()} {hasSeguro && `| Seguro Ley: RD$ ${seguroAnual.toLocaleString()}`})
                </span>
              </div>

              {/* Dominican Quote Phrase */}
              <div className="dominican-quote" style={{ borderLeftColor: 'var(--primary)', margin: '1.5rem 0' }}>
                <p>
                  "Para mantener este vehículo al día, podrías necesitar aproximadamente <strong>RD$ {totalEstimado.toLocaleString()}</strong> considerando marbete, multas y otros gastos seleccionados."
                </p>
              </div>

              {/* Year explanation alert */}
              <div className="budget-rules-breakdown" style={{ margin: '1.5rem 0' }}>
                <h3>Desglose Legal del Vehículo</h3>
                <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Impuesto Marbete (Año {ano}):</span>
                  <span style={{ fontWeight: 600 }}>RD$ {marbeteBase.toLocaleString()}</span>
                </div>
                {hasRecargo && (
                  <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--danger)' }}>Recargo por retraso tardío:</span>
                    <span style={{ fontWeight: 600, color: 'var(--danger)' }}>RD$ {recargo.toLocaleString()}</span>
                  </div>
                )}
                {hasMultas && (
                  <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Multas registradas:</span>
                    <span style={{ fontWeight: 600 }}>RD$ {Number(multasAmount).toLocaleString()}</span>
                  </div>
                )}
                {hasSeguro && (
                  <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Seguro de Ley Anual estimado ({vehiculoType}):</span>
                    <span style={{ fontWeight: 600 }}>RD$ {seguroAnual.toLocaleString()}</span>
                  </div>
                )}
                {valExtra > 0 && (
                  <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Otros gastos:</span>
                    <span style={{ fontWeight: 600 }}>RD$ {valExtra.toLocaleString()}</span>
                  </div>
                )}
              </div>

              {/* DGII Warning dates */}
              <div className="error-alert" role="alert" style={{ backgroundColor: 'var(--primary-light)', borderColor: 'var(--primary)', color: 'var(--text-main)', margin: '1rem 0' }}>
                <AlertCircle size={20} style={{ color: 'var(--primary)' }} />
                <div>
                  <strong>Recordatorio de fechas:</strong> La renovación ordinaria del marbete en República Dominicana la convoca la DGII anualmente, usualmente entre los meses de <strong>octubre y enero</strong>.
                </div>
              </div>

              {/* Cross Connections */}
              <div className="connections-actions" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '1.5rem 0' }}>
                <Link to="/cuanto-cuesta-mantener-un-carro-en-rd" className="btn btn-secondary btn-block">
                  <ArrowRight size={16} /> Calcular gastos mensuales de mi carro
                </Link>
                <Link to="/checklist-documentos-rd" className="btn btn-secondary btn-block">
                  <CheckCircle size={16} /> Ver checklist de documentos
                </Link>
                <Link to="/calculadora-presupuesto-mensual-rd" className="btn btn-secondary btn-block">
                  Organizar mi presupuesto mensual
                </Link>
              </div>

              <AdSlot id="marbete-after-results" placement="Marbete - Después de Resultados" />

              <div className="financial-disclaimer" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '1rem' }}>
                <p><strong>Nota aclaratoria:</strong> Estos cálculos son estimados y tienen fines informativos. Los montos, requisitos, fechas y disponibilidad pueden variar según las disposiciones de la DGII, DIGESETT u otras regulaciones. Verifica siempre en la institución correspondiente antes de pagar o renovar.</p>
              </div>
            </div>
          ) : (
            <EmptyStateCard
              title="Presupuesto de Marbete"
              description="Coloca el año y el tipo de tu vehículo para conocer el costo base estimado del marbete anual de circulación, y suma multas o seguro obligatorio si lo deseas."
              icon={AlertCircle}
            />
          )}
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <DisclaimerBox type="tramites" />
      </div>

      <AdSlot id="marbete-before-faq" placement="Marbete - Antes del FAQ" />

      <div className="card" style={{ marginTop: '2rem' }}>
        <FAQSection items={faqItems} />
      </div>

      <AdSlot id="marbete-before-footer" placement="Marbete - Antes del Footer" />

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
