import {
  useState,
  useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CITIES } from '../data/mockData';
import SEOHead from '../components/SEOHead';
import PageHero from '../components/PageHero';
import EmptyStateCard from '../components/EmptyStateCard';
import DisclaimerBox from '../components/DisclaimerBox';
import AdSlot from '../components/AdSlot';
import FAQSection,
  { type FAQItem } from '../components/FAQSection';
import { 
  Scale,
  RotateCcw,
  AlertTriangle,
  ArrowRight,
  Info,
  MapPin
} from 'lucide-react';

interface ProfilePreset {
  supermercado: string;
  alquiler: string;
  transporte: string;
  servicios: string;
  salud: string;
  educacion: string;
  otros: string;
}

const PRESETS: Record<string, ProfilePreset> = {
  solo: {
    supermercado: '10000',
    alquiler: '12000',
    transporte: '4000',
    servicios: '3500',
    salud: '2000',
    educacion: '0',
    otros: '3000'
  },
  pareja: {
    supermercado: '17000',
    alquiler: '18000',
    transporte: '7000',
    servicios: '5500',
    salud: '3500',
    educacion: '0',
    otros: '5000'
  },
  familia: {
    supermercado: '25000',
    alquiler: '22000',
    transporte: '10000',
    servicios: '8000',
    salud: '6000',
    educacion: '10000',
    otros: '6000'
  }
};

export default function CostoVidaPorCiudad() {
  const [profile, setProfile] = useState<string>('solo');
  
  // Custom expense inputs
  const [supermercado, setSupermercado] = useState<string>(PRESETS.solo.supermercado);
  const [alquiler, setAlquiler] = useState<string>(PRESETS.solo.alquiler);
  const [transporte, setTransporte] = useState<string>(PRESETS.solo.transporte);
  const [servicios, setServicios] = useState<string>(PRESETS.solo.servicios);
  const [salud, setSalud] = useState<string>(PRESETS.solo.salud);
  const [educacion, setEducacion] = useState<string>(PRESETS.solo.educacion);
  const [otros, setOtros] = useState<string>(PRESETS.solo.otros);

  // Enabled categories checkboxes
  const [includeSuper, setIncludeSuper] = useState(true);
  const [includeRent, setIncludeRent] = useState(true);
  const [includeTrans, setIncludeTrans] = useState(true);
  const [includeServ, setIncludeServ] = useState(true);
  const [includeSalud, setIncludeSalud] = useState(true);
  const [includeEduc, setIncludeEduc] = useState(true);
  const [includeOtros, setIncludeOtros] = useState(true);

  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(true);

  // Update presets when profile changes
  useEffect(() => {
    const preset = PRESETS[profile];
    if (preset) {
      setSupermercado(preset.supermercado);
      setAlquiler(preset.alquiler);
      setTransporte(preset.transporte);
      setServicios(preset.servicios);
      setSalud(preset.salud);
      setEducacion(preset.educacion);
      setOtros(preset.otros);
    }
  }, [profile]);

  const handlePresetSelect = (selectedProfile: string) => {
    setProfile(selectedProfile);
  };

  const checkNegatives = () => {
    const vals = [
      includeSuper ? Number(supermercado) : 0,
      includeRent ? Number(alquiler) : 0,
      includeTrans ? Number(transporte) : 0,
      includeServ ? Number(servicios) : 0,
      includeSalud ? Number(salud) : 0,
      includeEduc ? Number(educacion) : 0,
      includeOtros ? Number(otros) : 0
    ];
    return vals.some(val => val < 0);
  };

  const handleReset = () => {
    setProfile('solo');
    setSupermercado(PRESETS.solo.supermercado);
    setAlquiler(PRESETS.solo.alquiler);
    setTransporte(PRESETS.solo.transporte);
    setServicios(PRESETS.solo.servicios);
    setSalud(PRESETS.solo.salud);
    setEducacion(PRESETS.solo.educacion);
    setOtros(PRESETS.solo.otros);
    setIncludeSuper(true);
    setIncludeRent(true);
    setIncludeTrans(true);
    setIncludeServ(true);
    setIncludeSalud(true);
    setIncludeEduc(true);
    setIncludeOtros(true);
    setError(null);
  };

  const totalBase = 
    (includeSuper ? (Number(supermercado) || 0) : 0) +
    (includeRent ? (Number(alquiler) || 0) : 0) +
    (includeTrans ? (Number(transporte) || 0) : 0) +
    (includeServ ? (Number(servicios) || 0) : 0) +
    (includeSalud ? (Number(salud) || 0) : 0) +
    (includeEduc ? (Number(educacion) || 0) : 0) +
    (includeOtros ? (Number(otros) || 0) : 0);

  // Apply city cost factors to calculate estimated costs
  const resultsByCity = CITIES.map((city) => {
    // Santo Domingo is the base (factor 1.00)
    // We adjust the total based on the cost factor
    const adjustedCost = Math.round(totalBase * city.costFactor);
    return {
      ...city,
      totalCost: adjustedCost
    };
  }).sort((a, b) => a.totalCost - b.totalCost);

  const cheapestCity = resultsByCity[0];
  const mostExpensiveCity = resultsByCity[resultsByCity.length - 1];
  const costGap = mostExpensiveCity.totalCost - cheapestCity.totalCost;
  const gapPercentage = cheapestCity.totalCost > 0 
    ? Math.round((costGap / cheapestCity.totalCost) * 100) 
    : 0;

  const cityFAQs: FAQItem[] = [
    {
      question: '¿Cuál es la ciudad más cara para vivir en República Dominicana?',
      answer: 'Generalmente, Punta Cana y la zona turística de Bávaro tienen el costo de vida más elevado del país, debido al precio dolarizado de los alquileres, transporte e insumos básicos. Santo Domingo se ubica en segundo lugar como la metrópolis con mayores costos de alquiler y servicios.'
    },
    {
      question: '¿Cuál es la ciudad más barata para vivir en RD?',
      answer: 'Ciudades del interior como San Francisco de Macorís, La Vega y otras provincias agrícolas ofrecen el costo de vida más asequible, especialmente en el precio de los alquileres de viviendas y la adquisición de alimentos frescos producidos localmente.'
    },
    {
      question: '¿Cómo influye la mudanza del interior a la capital?',
      answer: 'Mudarse del interior a Santo Domingo puede aumentar tus gastos generales entre un 10% y un 25%, impactando principalmente en el costo de alquiler (que suele duplicarse por zonas similares) y en los servicios eléctricos y transporte diario.'
    }
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': cityFAQs.map((faq) => ({
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
    'name': 'Comparador de Costo de Vida por Ciudad en RD - CuantoCuestaRD',
    'operatingSystem': 'All',
    'applicationCategory': 'FinanceApplication',
    'description': 'Compara los costos estimados de vivienda, alimentos, educación, transporte y servicios en las principales ciudades de la República Dominicana.',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'DOP'
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (checkNegatives()) {
      setError('Los montos ingresados no pueden ser negativos.');
      return;
    }
    if (totalBase === 0) {
      setError('Por favor, introduce al menos un gasto para realizar la comparación.');
      return;
    }
    setShowResults(true);
  };

  return (
    <div className="costo-ciudad-page">
      <SEOHead 
        title="Comparador de Costo de Vida por Ciudad RD | Precios en Provincias"
        description="Compara el costo de vida entre Santo Domingo, Santiago, La Vega, Punta Cana y San Francisco de Macorís. Personaliza tus gastos y mira el ranking."
        schema={[faqSchema, appSchema]}
      />

      <PageHero 
        category="costodevida"
        title="Costo de Vida por Ciudad"
        description="Compara el costo de tu estilo de vida residencial entre las principales provincias de RD."
        icon={MapPin}
        chips={["ciudad","provincias","santiago"]}
      />

      <AdSlot id="ciudad-under-hero" placement="Costo por Ciudad - Debajo del Hero" />

      <div className="grid-2">
        {/* Form Column */}
        <div className="card">
          <h2>Tus Gastos de Referencia</h2>
          <p>Selecciona tu perfil de hogar para cargar estimaciones automáticas, o escribe tus propios números.</p>

          {error && (
            <div className="error-alert" role="alert">
              <AlertTriangle size={20} />
              <span>{error}</span>
            </div>
          )}

          <div className="profile-selector" style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <button 
              type="button" 
              className={`btn btn-secondary ${profile === 'solo' ? 'btn-active' : ''}`}
              onClick={() => handlePresetSelect('solo')}
              style={{ flex: 1, padding: '0.5rem 1rem', fontSize: '0.95rem' }}
            >
              Persona Sola
            </button>
            <button 
              type="button" 
              className={`btn btn-secondary ${profile === 'pareja' ? 'btn-active' : ''}`}
              onClick={() => handlePresetSelect('pareja')}
              style={{ flex: 1, padding: '0.5rem 1rem', fontSize: '0.95rem' }}
            >
              Pareja
            </button>
            <button 
              type="button" 
              className={`btn btn-secondary ${profile === 'familia' ? 'btn-active' : ''}`}
              onClick={() => handlePresetSelect('familia')}
              style={{ flex: 1, padding: '0.5rem 1rem', fontSize: '0.95rem' }}
            >
              Familia (4 pers.)
            </button>
          </div>

          <form onSubmit={handleFormSubmit}>
            <div className="form-section-title">Categorías a Comparar</div>

            <div className="category-input-row">
              <div className="checkbox-wrapper">
                <input 
                  type="checkbox" 
                  id="chk-super" 
                  checked={includeSuper} 
                  onChange={(e) => setIncludeSuper(e.target.checked)} 
                />
                <label htmlFor="chk-super">Supermercado (RD$):</label>
              </div>
              <input 
                type="number" 
                className="form-control mini-input" 
                disabled={!includeSuper}
                value={supermercado}
                onChange={(e) => setSupermercado(e.target.value)}
                min="0"
              />
            </div>

            <div className="category-input-row">
              <div className="checkbox-wrapper">
                <input 
                  type="checkbox" 
                  id="chk-rent" 
                  checked={includeRent} 
                  onChange={(e) => setIncludeRent(e.target.checked)} 
                />
                <label htmlFor="chk-rent">Alquiler / Vivienda (RD$):</label>
              </div>
              <input 
                type="number" 
                className="form-control mini-input" 
                disabled={!includeRent}
                value={alquiler}
                onChange={(e) => setAlquiler(e.target.value)}
                min="0"
              />
            </div>

            <div className="category-input-row">
              <div className="checkbox-wrapper">
                <input 
                  type="checkbox" 
                  id="chk-trans" 
                  checked={includeTrans} 
                  onChange={(e) => setIncludeTrans(e.target.checked)} 
                />
                <label htmlFor="chk-trans">Transporte (Combustible/Pasajes) (RD$):</label>
              </div>
              <input 
                type="number" 
                className="form-control mini-input" 
                disabled={!includeTrans}
                value={transporte}
                onChange={(e) => setTransporte(e.target.value)}
                min="0"
              />
            </div>

            <div className="category-input-row">
              <div className="checkbox-wrapper">
                <input 
                  type="checkbox" 
                  id="chk-serv" 
                  checked={includeServ} 
                  onChange={(e) => setIncludeServ(e.target.checked)} 
                />
                <label htmlFor="chk-serv">Servicios Básicos (Luz/Internet) (RD$):</label>
              </div>
              <input 
                type="number" 
                className="form-control mini-input" 
                disabled={!includeServ}
                value={servicios}
                onChange={(e) => setServicios(e.target.value)}
                min="0"
              />
            </div>

            <div className="category-input-row">
              <div className="checkbox-wrapper">
                <input 
                  type="checkbox" 
                  id="chk-salud" 
                  checked={includeSalud} 
                  onChange={(e) => setIncludeSalud(e.target.checked)} 
                />
                <label htmlFor="chk-salud">Salud y Medicamentos (RD$):</label>
              </div>
              <input 
                type="number" 
                className="form-control mini-input" 
                disabled={!includeSalud}
                value={salud}
                onChange={(e) => setSalud(e.target.value)}
                min="0"
              />
            </div>

            <div className="category-input-row">
              <div className="checkbox-wrapper">
                <input 
                  type="checkbox" 
                  id="chk-educ" 
                  checked={includeEduc} 
                  onChange={(e) => setIncludeEduc(e.target.checked)} 
                />
                <label htmlFor="chk-educ">Educación / Colegio (RD$):</label>
              </div>
              <input 
                type="number" 
                className="form-control mini-input" 
                disabled={!includeEduc}
                value={educacion}
                onChange={(e) => setEducacion(e.target.value)}
                min="0"
              />
            </div>

            <div className="category-input-row">
              <div className="checkbox-wrapper">
                <input 
                  type="checkbox" 
                  id="chk-otros" 
                  checked={includeOtros} 
                  onChange={(e) => setIncludeOtros(e.target.checked)} 
                />
                <label htmlFor="chk-otros">Otros Gastos (Ocio/Diversión) (RD$):</label>
              </div>
              <input 
                type="number" 
                className="form-control mini-input" 
                disabled={!includeOtros}
                value={otros}
                onChange={(e) => setOtros(e.target.value)}
                min="0"
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button type="button" className="btn btn-secondary" onClick={handleReset} style={{ flex: 1 }}>
                <RotateCcw size={18} /> Limpiar
              </button>
              <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
                Comparar ciudades
              </button>
            </div>
          </form>
        </div>

        {/* Results Column */}
        <div className="results-column">
          {showResults && totalBase > 0 ? (
            <div className="card result-card" style={{ height: '100%' }}>
              <h2>Comparación General de Costos</h2>

              {/* Highlight Gap Card */}
              <div className="warning-alert" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', backgroundColor: 'var(--primary-light)', borderColor: 'var(--primary)', color: 'var(--text-main)', borderRadius: 'var(--radius-md)', padding: '1.25rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--primary)' }}>
                  <Scale size={20} />
                  <span>Diferencia Máxima Detectada</span>
                </div>
                <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                  La ciudad más barata es <strong>{cheapestCity.name}</strong> y la más cara es <strong>{mostExpensiveCity.name}</strong>.
                  Hay una brecha de <strong>RD$ {costGap.toLocaleString()} ({gapPercentage}%)</strong> entre vivir en una y otra con este mismo estilo de vida.
                </p>
              </div>

              {/* Dominican Quote Phrase */}
              <div className="dominican-quote" style={{ borderLeftColor: 'var(--primary)', margin: '1.5rem 0' }}>
                <p>
                  "Si tus gastos básicos mensuales suman <strong>RD$ {cheapestCity.totalCost.toLocaleString()}</strong> en <strong>{cheapestCity.name}</strong>, para sostener un nivel similar de vida en <strong>{mostExpensiveCity.name}</strong> tendrías que gastar aproximadamente <strong>RD$ {mostExpensiveCity.totalCost.toLocaleString()} al mes</strong>."
                </p>
              </div>

              {/* Ranking Chart list */}
              <div className="city-ranking-list" style={{ marginBottom: '1.5rem' }}>
                <h3>Ranking de Ciudades (De menor a mayor costo)</h3>
                
                {resultsByCity.map((item, index) => {
                  const isCheapest = item.id === cheapestCity.id;
                  const isExpensive = item.id === mostExpensiveCity.id;
                  
                  // Calculate percentage relative to most expensive city for bar width representation
                  const maxCost = mostExpensiveCity.totalCost || 1;
                  const barWidth = Math.round((item.totalCost / maxCost) * 100);

                  return (
                    <div key={item.id} className="city-rank-row" style={{ marginTop: '1.25rem' }}>
                      <div className="flex-between" style={{ marginBottom: '0.25rem' }}>
                        <span style={{ fontWeight: 500, fontSize: '0.95rem' }}>
                          {index + 1}. {item.name} 
                          {isCheapest && <span className="badge-cheapest" style={{ marginLeft: '0.5rem', fontSize: '0.75rem', backgroundColor: 'var(--success-light)', color: 'var(--success)', padding: '0.15rem 0.4rem', borderRadius: '4px', fontWeight: 600 }}>La más barata</span>}
                          {isExpensive && <span className="badge-expensive" style={{ marginLeft: '0.5rem', fontSize: '0.75rem', backgroundColor: 'var(--danger-light)', color: 'var(--danger)', padding: '0.15rem 0.4rem', borderRadius: '4px', fontWeight: 600 }}>La más cara</span>}
                        </span>
                        <span style={{ fontWeight: 600 }}>RD$ {item.totalCost.toLocaleString()}</span>
                      </div>
                      <div className="progress-bar-bg" style={{ height: '12px' }}>
                        <div 
                          className="progress-bar-fill" 
                          style={{ 
                            width: `${barWidth}%`, 
                            backgroundColor: isCheapest ? 'var(--success)' : isExpensive ? 'var(--danger)' : 'var(--primary)',
                            height: '100%'
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* General Insights */}
              <div className="recommendation-box" style={{ margin: '1.5rem 0' }}>
                <h3 className="flex-between">
                  <span>Diagnóstico del Comparador:</span>
                  <Info size={18} />
                </h3>
                <p>
                  El interior del país ({cheapestCity.name}, La Vega) es notablemente más económico debido a alquileres más razonables y cercanía a zonas de producción de comida. En zonas como Punta Cana, el transporte y la renta empujan los precios hacia arriba, por lo que requieres mayor preparación de ingresos si planeas mudarte para allá.
                </p>
              </div>

              {/* Cross Connections */}
              <div className="connections-actions" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '1.5rem 0' }}>
                <Link to="/cuanto-cuesta-vivir-solo-en-rd" className="btn btn-secondary btn-block">
                  ¿Mudándote solo? Mira la calculadora de mudanza <ArrowRight size={16} />
                </Link>
                <Link to="/calculadora-presupuesto-mensual-rd" className="btn btn-success btn-block">
                  Organizar mi Presupuesto Mensual <ArrowRight size={16} />
                </Link>
              </div>

              <AdSlot id="ciudad-after-results" placement="Costo por Ciudad - Después de Resultados" />

              <div className="financial-disclaimer" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '1rem' }}>
                <p><strong>Nota aclaratoria:</strong> Estos cálculos son estimados y tienen fines informativos. Los costos pueden variar según la ciudad, zona, estilo de vida, familia, deudas y precios actuales.</p>
              </div>
            </div>
          ) : (
            <EmptyStateCard
              title="Comparador de Ciudades"
              description="Completa tus gastos mensuales a la izquierda para ver cuánto te costaría vivir en las diferentes provincias y ciudades de República Dominicana."
              icon={Scale}
            />
          )}
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <DisclaimerBox type="finanzas" />
      </div>

      <AdSlot id="ciudad-before-faq" placement="Costo por Ciudad - Antes del FAQ" />

      <div className="card" style={{ marginTop: '2rem' }}>
        <FAQSection items={cityFAQs} />
      </div>

      <AdSlot id="ciudad-before-footer" placement="Costo por Ciudad - Antes del Footer" />

      <style>{`
        .btn-active {
          background-color: var(--primary) !important;
          color: #ffffff !important;
          border-color: var(--primary) !important;
        }

        .category-input-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 0;
          border-bottom: 1px dashed var(--border-color);
        }

        .checkbox-wrapper {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          user-select: none;
        }

        .checkbox-wrapper input[type="checkbox"] {
          width: 18px;
          height: 18px;
          cursor: pointer;
        }

        .checkbox-wrapper label {
          font-weight: 500;
          cursor: pointer;
          font-size: 0.95rem;
          color: var(--text-main);
        }

        .mini-input {
          width: 140px;
          text-align: right;
          padding: 0.35rem 0.5rem;
          height: auto;
          min-height: 38px;
        }

        .mini-input:disabled {
          background-color: #f1f5f9;
          color: #94a3b8;
          border-color: #cbd5e1;
          cursor: not-allowed;
        }

        .financial-disclaimer {
          font-style: italic;
        }

        @media (max-width: 768px) {
          .grid-2 {
            grid-template-columns: 1fr !important;
          }
          .mini-input {
            width: 100px;
          }
        }
      `}</style>
    </div>
  );
}
