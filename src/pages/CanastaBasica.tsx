import {
  useState } from 'react';
import { 
  CITIES,
  estimateCanastaCost,
  getCanastaIncludedProducts,
  LAST_UPDATE_DATE
} from '../data/mockData';
import SEOHead from '../components/SEOHead';
import PageHero from '../components/PageHero';
import DisclaimerBox from '../components/DisclaimerBox';
import AdSlot from '../components/AdSlot';
import FAQSection,
  { type FAQItem } from '../components/FAQSection';
import { 
  MapPin,
  Users,
  Filter,
  RefreshCw,
  List,
  CheckCircle,
  Calendar,
  AlertCircle,
  Calculator
} from 'lucide-react';

type BasketType = 'economica' | 'normal' | 'completa';
type Frequency = 'semanal' | 'quincenal' | 'mensual';

export default function CanastaBasica() {
  const canastaFAQs: FAQItem[] = [
    {
      question: '¿Qué es la Canasta Básica Familiar en RD?',
      answer: 'Es un conjunto representativo de alimentos y artículos de primera necesidad que consume un hogar dominicano promedio para cubrir sus necesidades de subsistencia mensuales.'
    },
    {
      question: '¿Cómo calcula la web el costo de la canasta básica?',
      answer: 'El costo se calcula estimando un presupuesto referencial basado en el número de personas en el hogar, la provincia y el tipo de compra (económica, normal, completa), aplicando factores de escala y variabilidad de precios.'
    },
    {
      question: '¿Con qué frecuencia se actualizan estos presupuestos?',
      answer: 'Las estimaciones se actualizan de manera periódica basándose en relevamientos y promedios del mercado dominicano de referencia, no representando facturas exactas de compras.'
    }
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': canastaFAQs.map((faq) => ({
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
    'name': 'Calculadora de Canasta Básica RD - CuantoCuestaRD',
    'operatingSystem': 'All',
    'applicationCategory': 'FinanceApplication',
    'description': 'Calcula el costo estimado de la canasta básica en República Dominicana según la cantidad de personas en el hogar, provincia y frecuencia de compra.',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'DOP'
    }
  };

  // Input states
  const [cityId, setCityId] = useState('santo-domingo');
  const [peopleCount, setPeopleCount] = useState<number>(4);
  const [basketType, setBasketType] = useState<'economica' | 'normal' | 'completa'>('normal');
  const [frequency, setFrequency] = useState<'semanal' | 'quincenal' | 'mensual'>('mensual');

  // Human validation errors
  const [error, setError] = useState<string | null>(null);

  // Form submit state to show results only on trigger
  const [showResults, setShowResults] = useState(true); // show by default but updates on changes

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!cityId) {
      setError('Completa este campo para poder calcular: selecciona tu ciudad.');
      return;
    }
    if (!peopleCount || peopleCount <= 0) {
      setError('El número de personas debe ser mayor que cero.');
      return;
    }

    setShowResults(true);
  };

  const handleReset = () => {
    setCityId('santo-domingo');
    setPeopleCount(4);
    setBasketType('normal');
    setFrequency('mensual');
    setError(null);
    setShowResults(true);
  };

  // Perform Calculations
  const estimatedCost = estimateCanastaCost(peopleCount, basketType, frequency, cityId);
  
  // Weekly, Quincenal, Monthly versions for comparisons
  const costWeekly = estimateCanastaCost(peopleCount, basketType, 'semanal', cityId);
  const costQuincenal = estimateCanastaCost(peopleCount, basketType, 'quincenal', cityId);
  const costMonthly = estimateCanastaCost(peopleCount, basketType, 'mensual', cityId);

  // Get included items
  const includedProducts = getCanastaIncludedProducts(basketType);

  // Human descriptive text for families
  const getRecommendationText = () => {
    const cityName = CITIES.find((c) => c.id === cityId)?.name || '';
    const peopleStr = peopleCount === 1 ? 'una persona sola' : 
                      peopleCount === 2 ? 'una pareja' : `una familia de ${peopleCount} personas`;

    if (basketType === 'economica') {
      return `Para ${peopleStr} en ${cityName}, se estima un presupuesto sumamente ajustado y enfocado estrictamente en granos, proteínas esenciales y víveres básicos nacionales. Recomendamos planificar las comidas por semana para evitar el desperdicio y buscar ofertas específicas de los días populares de supermercado (como los miércoles de vegetales).`;
    }
    if (basketType === 'normal') {
      return `Este es el costo promedio para cubrir una alimentación balanceada y artículos de higiene del hogar e higiene personal indispensables para ${peopleStr} en la ciudad de ${cityName}. Permite marcas de consumo masivo promedio en supermercados locales.`;
    }
    return `Para ${peopleStr} que prefieran una variedad completa de marcas importadas, lácteos avanzados, carnes magras especiales y productos de limpieza especializados en ${cityName}. Este presupuesto ofrece un margen de holgura cómodo y variado.`;
  };

  return (
    <div className="canasta-page">
      <SEOHead 
        title="Canasta Básica RD | Calcula cuánto cuesta tu compra"
        description="Calcula el costo estimado de una canasta básica en República Dominicana según ciudad, cantidad de personas y tipo de compra."
        schema={[faqSchema, appSchema]}
      />

      <PageHero 
        category="supermercados"
        title="Canasta Básica RD"
        description="Calcula el costo aproximado de la canasta familiar básica según los integrantes de tu hogar."
        icon={Calculator}
        chips={["canasta","basica","alimentos"]}
      />

      <div className="grid-2">
        {/* Left: Input Form */}
        <div className="card">
          <h2>Datos para el cálculo</h2>
          <p>Ingresa los detalles para ajustar la estimación a tu realidad familiar.</p>

          {error && (
            <div className="error-alert" role="alert">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleCalculate}>
            <div className="form-group">
              <label htmlFor="city-select" className="form-label">
                <MapPin size={18} className="inline-icon" /> Ciudad / Provincia:
              </label>
              <select 
                id="city-select" 
                className="form-control" 
                value={cityId} 
                onChange={(e) => {
                  setCityId(e.target.value);
                  // Auto recalculate instantly for nice dynamic feel
                }}
              >
                {CITIES.map((city) => (
                  <option key={city.id} value={city.id}>{city.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="people-select" className="form-label">
                <Users size={18} className="inline-icon" /> Cantidad de personas en casa:
              </label>
              <select 
                id="people-select" 
                className="form-control" 
                value={peopleCount} 
                onChange={(e) => setPeopleCount(Number(e.target.value))}
              >
                <option value={1}>1 persona (Individual)</option>
                <option value={2}>2 personas (Pareja)</option>
                <option value={3}>3 personas</option>
                <option value={4}>4 personas (Familia estándar)</option>
                <option value={5}>5 personas</option>
                <option value={6}>6 o más personas</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="basket-select" className="form-label">
                <Filter size={18} className="inline-icon" /> Calidad o Tipo de Compra:
              </label>
              <select 
                id="basket-select" 
                className="form-control" 
                value={basketType} 
                onChange={(e) => setBasketType(e.target.value as BasketType)}
              >
                <option value="economica">Económica (Solo lo indispensable, marcas económicas)</option>
                <option value="normal">Normal (Alimentación variada y balanceada, marcas promedio)</option>
                <option value="completa">Completa (Variedad total, marcas premium e importados)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="frequency-select" className="form-label">
                <Calendar size={18} className="inline-icon" /> Frecuencia de los resultados:
              </label>
              <select 
                id="frequency-select" 
                className="form-control" 
                value={frequency} 
                onChange={(e) => setFrequency(e.target.value as Frequency)}
              >
                <option value="semanal">Semanal</option>
                <option value="quincenal">Quincenal</option>
                <option value="mensual">Mensual</option>
              </select>
            </div>

            <div className="step-actions flex-between" style={{ gap: '1rem' }}>
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={handleReset}
                style={{ flex: 1 }}
              >
                <RefreshCw size={18} /> Limpiar
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
                style={{ flex: 2 }}
              >
                Calcular costo
              </button>
            </div>
          </form>
        </div>

        {/* Right: Results Dashboard */}
        <div className="results-container">
          {showResults && (
            <div className="card results-card" style={{ height: '100%' }}>
              <h2>Costo Estimado</h2>
              
              <div className="main-cost-display">
                <span className="main-cost-title">Presupuesto Estimado ({frequency})</span>
                <span className="main-cost-value">RD$ {estimatedCost.toLocaleString()}</span>
              </div>

              {/* Dominican phrasing example */}
              <div className="dominican-quote">
                <p>
                  "Una familia de <strong>{peopleCount} personas</strong> podría necesitar aproximadamente <strong>RD$ {costMonthly.toLocaleString()} al mes</strong> para una compra {basketType === 'economica' ? 'económica' : basketType === 'normal' ? 'normal' : 'completa'} de supermercado en {CITIES.find(c => c.id === cityId)?.name}."
                </p>
              </div>

              {/* Frequency Breakdown Cards */}
              <div className="frequency-breakdown">
                <div className={`freq-box ${frequency === 'semanal' ? 'active' : ''}`}>
                  <span className="freq-label">Semanal</span>
                  <span className="freq-val">RD$ {costWeekly.toLocaleString()}</span>
                </div>
                <div className={`freq-box ${frequency === 'quincenal' ? 'active' : ''}`}>
                  <span className="freq-label">Quincenal</span>
                  <span className="freq-val">RD$ {costQuincenal.toLocaleString()}</span>
                </div>
                <div className={`freq-box ${frequency === 'mensual' ? 'active' : ''}`}>
                  <span className="freq-label">Mensual</span>
                  <span className="freq-val">RD$ {costMonthly.toLocaleString()}</span>
                </div>
              </div>

              {/* Recommendations Box */}
              <div className="recommendation-box">
                <h3>Sugerencia de compra:</h3>
                <p>{getRecommendationText()}</p>
              </div>

              {/* Included items */}
              <div className="included-list-section">
                <h3>
                  <List size={18} className="inline-icon" /> Productos simulados en esta canasta ({includedProducts.length}):
                </h3>
                <div className="included-pills">
                  {includedProducts.map((p) => (
                    <span key={p.id} className="product-pill">
                      <CheckCircle size={12} className="text-success inline-icon" />
                      {p.name}
                    </span>
                  ))}
                </div>
              </div>

              <AdSlot id="canasta-after-results" placement="Canasta - Después de Resultados" />

              <div className="update-note" style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                <p>Fecha de actualización de precios: <strong>{LAST_UPDATE_DATE}</strong></p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <DisclaimerBox />
      </div>

      <AdSlot id="canasta-before-faq" placement="Canasta Básica - Antes del FAQ" />
      <FAQSection items={canastaFAQs} />
      <AdSlot id="canasta-before-footer" placement="Canasta Básica - Antes del Footer" />

      <style>{`
        .results-card {
          border-color: var(--primary);
          position: relative;
        }

        .main-cost-display {
          background-color: var(--primary-light);
          border: 2px solid rgba(37, 99, 235, 0.1);
          border-radius: var(--radius-md);
          padding: 1.5rem;
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .main-cost-title {
          display: block;
          font-size: 0.95rem;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .main-cost-value {
          font-size: 2.25rem;
          font-weight: 800;
          color: var(--primary);
        }

        .dominican-quote {
          background-color: var(--bg-color);
          border-left: 4px solid var(--primary);
          border-radius: 4px;
          padding: 0.85rem 1rem;
          margin-bottom: 1.5rem;
          font-style: italic;
        }

        .dominican-quote p {
          margin: 0;
          font-size: 1.05rem;
          color: var(--text-main);
        }

        .frequency-breakdown {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .freq-box {
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 0.75rem;
          text-align: center;
          background-color: #ffffff;
        }

        .freq-box.active {
          border-color: var(--primary);
          background-color: var(--primary-light);
          font-weight: 600;
        }

        .freq-label {
          display: block;
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 0.15rem;
        }

        .freq-val {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .freq-box.active .freq-val {
          color: var(--primary);
        }

        .recommendation-box {
          background-color: #f8fafc;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 1rem 1.25rem;
          margin-bottom: 1.5rem;
        }

        .recommendation-box h3 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .recommendation-box p {
          font-size: 0.95rem;
          margin: 0;
          color: var(--text-muted);
        }

        .included-list-section h3 {
          font-size: 1.05rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
        }

        .included-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          max-height: 180px;
          overflow-y: auto;
          padding: 0.25rem;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
        }

        .product-pill {
          background-color: #ffffff;
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 0.25rem 0.75rem;
          font-size: 0.85rem;
          color: var(--text-muted);
          display: inline-flex;
          align-items: center;
        }

        @media (max-width: 768px) {
          .grid-2 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
