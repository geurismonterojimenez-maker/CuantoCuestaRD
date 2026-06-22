import SEOHead from '../components/SEOHead';
import PageHero from '../components/PageHero';
import DisclaimerBox from '../components/DisclaimerBox';
import AdSlot from '../components/AdSlot';
import {
  CITIES,
  estimateCanastaCost,
  LAST_UPDATE_DATE } from '../data/mockData';
import { MapPin,
  TrendingUp,
  TrendingDown,
  DollarSign
} from 'lucide-react';
import FAQSection, { type FAQItem } from '../components/FAQSection';

export default function CityComparison() {
  const cityFAQs: FAQItem[] = [
    {
      question: '¿Por qué Punta Cana tiene los precios estimados más altos?',
      answer: 'El costo en la zona de Punta Cana y Bávaro es superior debido a la lejanía de los principales centros de distribución agrícola y el factor de desarrollo comercial turístico de la zona, lo cual encarece la logística y los márgenes de venta.'
    },
    {
      question: '¿Cuáles son las ciudades más económicas para comprar en RD?',
      answer: 'Ciudades del Cibao como La Vega, San Francisco de Macorís y Santiago muestran precios promedio menores en víveres y alimentos frescos gracias a su proximidad directa a las zonas de producción agropecuaria nacional.'
    },
    {
      question: '¿Son iguales los precios en todas las sucursales de la misma cadena?',
      answer: 'No, muchas cadenas nacionales de supermercados ajustan sus ofertas y precios según la zona geográfica, los costos operativos locales de la sucursal y la competencia directa en esa provincia.'
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

  const familySize = 4; // Standard family of 4 reference
  const basketType = 'normal'; // Standard reference basket

  // Calculate costs per city
  const cityData = CITIES.filter(c => c.id !== 'otra').map((city) => {
    // Calculate monthly cost
    const monthlyCost = estimateCanastaCost(familySize, basketType, 'mensual', city.id);
    
    // Determine level: economical, medium, high
    let level: 'economico' | 'medio' | 'alto' = 'medio';
    if (city.costFactor < 0.96) {
      level = 'economico';
    } else if (city.costFactor > 1.05) {
      level = 'alto';
    }

    return {
      id: city.id,
      name: city.name,
      monthlyCost,
      level,
      factor: city.costFactor
    };
  }).sort((a, b) => a.monthlyCost - b.monthlyCost); // sort cheapest to most expensive

  const cheapestCity = cityData[0];
  const mostExpensiveCity = cityData[cityData.length - 1];
  const averageCost = Math.round(cityData.reduce((acc, curr) => acc + curr.monthlyCost, 0) / cityData.length);
  const difference = mostExpensiveCity.monthlyCost - cheapestCity.monthlyCost;

  return (
    <div className="city-comparison-page">
      <SEOHead 
        title="Comparador de Supermercados por Ciudad en RD"
        description="Compara el costo estimado de supermercado entre Santo Domingo, Santiago, La Vega, San Francisco y Punta Cana."
        schema={faqSchema}
      />

      <PageHero 
        category="supermercados"
        title="Supermercados por Ciudad"
        description="Compara costos de alimentos y canasta familiar básica entre distintas provincias de RD."
        icon={MapPin}
        chips={["ciudad","provincias","santiago"]}
      />

      {/* Top Metric Cards */}
      <div className="grid-3" style={{ marginBottom: '2rem' }}>
        <div className="card metric-card text-center highlight-green">
          <div className="metric-icon" style={{ backgroundColor: 'var(--success-light)', color: 'var(--success)' }}>
            <TrendingDown size={24} />
          </div>
          <span className="metric-label">Ciudad Más Económica</span>
          <h3 className="metric-value">{cheapestCity.name}</h3>
          <span className="metric-subtext">RD$ {cheapestCity.monthlyCost.toLocaleString()} / mes</span>
        </div>

        <div className="card metric-card text-center highlight-red">
          <div className="metric-icon" style={{ backgroundColor: 'var(--danger-light)', color: 'var(--danger)' }}>
            <TrendingUp size={24} />
          </div>
          <span className="metric-label">Ciudad De Mayor Costo</span>
          <h3 className="metric-value">{mostExpensiveCity.name}</h3>
          <span className="metric-subtext">RD$ {mostExpensiveCity.monthlyCost.toLocaleString()} / mes</span>
        </div>

        <div className="card metric-card text-center highlight-blue">
          <div className="metric-icon" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}>
            <DollarSign size={24} />
          </div>
          <span className="metric-label">Brecha Máxima de Precios</span>
          <h3 className="metric-value">RD$ {difference.toLocaleString()}</h3>
          <span className="metric-subtext">Diferencia mensual promedio</span>
        </div>
      </div>

      {/* Summary Box */}
      <div className="card" style={{ marginBottom: '2rem', borderLeft: '5px solid var(--primary)' }}>
        <h2>Resumen del Análisis por Ciudad</h2>
        <p style={{ fontSize: '1.05rem', margin: 0 }}>
          El promedio nacional estimado para la compra de supermercado de una familia de 4 personas es de <strong>RD$ {averageCost.toLocaleString()} al mes</strong>. 
          Vivir en zonas turísticas o de alta demanda comercial como <strong>{mostExpensiveCity.name}</strong> incrementa el costo hasta un 12% por encima del promedio, 
          mientras que provincias de alta producción agrícola como <strong>{cheapestCity.name}</strong> y <strong>La Vega</strong> muestran un costo de vida hasta un 7% más económico.
        </p>
      </div>

      <AdSlot id="city-before-grid" placement="Por Ciudad - Antes de Tarjetas" />

      {/* Cities Grid Cards */}
      <h2 style={{ marginBottom: '1rem' }}>Detalle de Costos Estimados por Ciudad</h2>
      <div className="grid-2" style={{ marginBottom: '2.5rem' }}>
        {cityData.map((city) => {
          return (
            <div key={city.id} className="card city-detail-card">
              <div className="flex-between">
                <h3 className="city-card-title">
                  <MapPin size={18} className="text-primary inline-icon" /> {city.name}
                </h3>
                
                {city.level === 'economico' && (
                  <span className="level-badge badge-green">Costo Económico</span>
                )}
                {city.level === 'medio' && (
                  <span className="level-badge badge-blue">Costo Medio</span>
                )}
                {city.level === 'alto' && (
                  <span className="level-badge badge-red">Costo Alto</span>
                )}
              </div>

              <div className="city-card-cost-box">
                <span className="city-cost-label">Gasto Familiar Mensual Estimado:</span>
                <span className="city-cost-value">RD$ {city.monthlyCost.toLocaleString()}</span>
              </div>

              <p className="city-card-note">
                {city.id === 'punta-cana' && 'Nota: Los altos costos de distribución logística y la orientación turística de la zona elevan los precios de la canasta básica.'}
                {city.id === 'santo-domingo' && 'Nota: Al ser el centro urbano principal, posee la mayor competencia de supermercados, pero con costos operativos generales medios-altos.'}
                {(city.id === 'santiago' || city.id === 'la-vega' || city.id === 'san-francisco') && 'Nota: Se beneficia de la cercanía con centros de producción agrícola y ganadera del Cibao, reduciendo costos de transporte de víveres frescos.'}
              </p>
            </div>
          );
        })}
      </div>

      <div className="update-note text-center" style={{ marginBottom: '1.5rem' }}>
        <p>Fecha de actualización de datos por ciudad: <strong>{LAST_UPDATE_DATE}</strong></p>
      </div>

      <DisclaimerBox />

      <AdSlot id="city-before-faq" placement="Por Ciudad - Antes del FAQ" />
      <FAQSection items={cityFAQs} />
      <AdSlot id="city-before-footer" placement="Por Ciudad - Antes del Footer" />

      <style>{`
        .metric-card {
          padding: 1.5rem 1rem;
        }

        .metric-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 0.75rem auto;
        }

        .metric-label {
          display: block;
          font-size: 0.85rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .metric-value {
          font-size: 1.25rem;
          margin: 0.25rem 0;
          color: var(--text-main);
        }

        .metric-subtext {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-muted);
        }

        .highlight-green {
          border-top: 4px solid var(--success);
        }

        .highlight-red {
          border-top: 4px solid var(--danger);
        }

        .highlight-blue {
          border-top: 4px solid var(--primary);
        }

        /* City details card */
        .city-detail-card {
          border-radius: var(--radius-md);
        }

        .city-card-title {
          font-size: 1.25rem;
          margin: 0;
        }

        .level-badge {
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.2rem 0.6rem;
          border-radius: 20px;
          text-transform: uppercase;
        }

        .badge-blue {
          background-color: var(--primary-light);
          color: var(--primary);
          border: 1px solid #bfdbfe;
        }

        .badge-red {
          background-color: var(--danger-light);
          color: var(--danger);
          border: 1px solid #fecaca;
        }

        .city-card-cost-box {
          background-color: var(--bg-color);
          border-radius: 8px;
          padding: 1rem;
          margin: 1rem 0;
        }

        .city-cost-label {
          display: block;
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 0.15rem;
        }

        .city-cost-value {
          font-size: 1.45rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .city-card-note {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin: 0;
          font-style: italic;
        }
      `}</style>
    </div>
  );
}
