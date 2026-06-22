import {
  Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import PageHero from '../components/PageHero';
import DisclaimerBox from '../components/DisclaimerBox';
import AdSlot from '../components/AdSlot';
import FAQSection,
  { type FAQItem } from '../components/FAQSection';
import { SUPERMARKETS,
  getProductPrice } from '../data/mockData';
import { ArrowRight,
  Sparkles,
  TrendingDown
} from 'lucide-react';

export default function CheapestSupermarket() {
  // Let's pre-calculate a simulated typical basket cost for the table
  // Canasta: Arroz 10 lb, Aceite, Habichuelas, Pollo, Huevos, Leche, Plátanos, Cloro, Papel Higiénico
  const comparisonProducts = [
    'arroz-10', 'aceite-64', 'habichuelas-1', 'pollo-lb', 
    'huevos-30', 'leche-1l', 'platano-unidad', 'cloro-galon', 'papel-higienico-4'
  ];

  const cityId = 'santo-domingo'; // Reference city

  const tableData = SUPERMARKETS.map((sup) => {
    let total = 0;
    comparisonProducts.forEach((pId) => {
      total += getProductPrice(pId, sup.id, cityId);
    });

    return {
      name: sup.name,
      total,
      logoColor: sup.logoColor
    };
  }).sort((a, b) => a.total - b.total);

  const seoFAQs: FAQItem[] = [
    {
      question: '¿Cuál supermercado es más barato en República Dominicana?',
      answer: 'El supermercado más económico varía según los artículos que compres. En promedio, supermercados orientados al ahorro como Olé y Bravo tienden a ofrecer precios finales más bajos en canastas de alimentos básicos, mientras que Jumbo y La Sirena se destacan por ofertas semanales masivas en departamentos variados.'
    },
    {
      question: '¿Dónde sale más barata la canasta básica?',
      answer: 'La canasta básica dominicana suele ser más económica en comercios de formato de bajo costo y mercados tradicionales. Al elegir marcas propias de supermercados (marcas blancas) en cadenas grandes como Jumbo (marca Líder), Nacional/Jumbo (marca Select) o Bravo (marcas propias), el costo de la canasta disminuye significativamente.'
    },
    {
      question: '¿Conviene comprar todo en un solo supermercado?',
      answer: 'Para comodidad y ahorro de tiempo/combustible, es preferible comprar todo en un solo lugar. No obstante, si buscas el máximo ahorro absoluto, se recomienda comprar carnes y víveres frescos en mercados locales o ferias de productores, y los enlatados e higiene en supermercados mayoristas o de descuento.'
    },
    {
      question: '¿Por qué cambian tanto los precios?',
      answer: 'Los precios en República Dominicana cambian debido a factores estacionales (en el caso de víveres como plátano, papa y cebolla), fluctuaciones de los insumos globales, el costo de distribución logística y transporte, y las estrategias promocionales específicas de cada cadena de tiendas.'
    },
    {
      question: '¿Cómo ahorrar en el supermercado?',
      answer: 'Los mejores consejos para ahorrar son: 1) Llevar siempre una lista de compras cerrada. 2) Comparar previamente el costo de la canasta en CuantoCuestaRD. 3) Comprar frutas y verduras de temporada. 4) Aprovechar los días de descuentos específicos (miércoles de vegetales, etc.). 5) Comprar marcas blancas o genéricas.'
    }
  ];

  // Schema FAQPage definition
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': seoFAQs.map((faq) => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };

  // Schema SoftwareApplication definition for the calculator
  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': 'Comparador de Supermercados CuantoCuestaRD',
    'operatingSystem': 'All',
    'applicationCategory': 'FinanceApplication',
    'description': 'Calcula y compara costos de la canasta de compras de supermercado entre las principales cadenas de República Dominicana.',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'DOP'
    }
  };

  return (
    <div className="seo-cheapest-page">
      <SEOHead 
        title="¿Cuál es el supermercado más barato de RD? Comparador actualizado"
        description="Consulta una comparación estimada para saber cuál supermercado puede salir más barato en República Dominicana."
        schema={[faqSchema, appSchema]}
      />

      <article className="seo-article card">
        <PageHero 
        category="supermercados"
        title="Supermercado más barato"
        description="Análisis comparativo de precios de referencia para saber dónde rinde más tu dinero."
        icon={TrendingDown}
        chips={["barato","economico","supermercado"]}
      />

        <section className="direct-answer-box">
          <Sparkles size={24} className="text-primary" style={{ flexShrink: 0 }} />
          <div>
            <h3>Respuesta rápida:</h3>
            <p>
              El supermercado más económico en República Dominicana <strong>puede variar significativamente</strong> según la ciudad, la sucursal, las ofertas semanales vigentes y los productos específicos que añadas a tu carrito. Por eso, lo ideal es realizar una comparación detallada de tu canasta antes de salir de casa.
            </p>
          </div>
        </section>

        <section className="article-body">
          <h2>Comparación Estimada de Precios</h2>
          <p>
            A continuación, mostramos un índice referencial del costo de una canasta de 9 productos básicos (Arroz selecto, Aceite de soya, Habichuelas rojas, Pollo fresco, Huevos, Leche, Plátanos, Cloro y Papel higiénico) en la ciudad de Santo Domingo.
          </p>

          <div className="table-wrapper scroll-table">
            <table className="seo-comparison-table">
              <thead>
                <tr>
                  <th>Supermercado</th>
                  <th style={{ textAlign: 'right' }}>Total Estimado de la Canasta</th>
                  <th>Posición</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((data, index) => {
                  const isCheapest = index === 0;
                  return (
                    <tr key={data.name} className={isCheapest ? 'cheapest-row' : ''}>
                      <td>
                        <span className="color-strip" style={{ backgroundColor: data.logoColor }}></span>
                        <strong>{data.name}</strong>
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: 'bold' }}>RD$ {data.total.toLocaleString()}</td>
                      <td>
                        {isCheapest ? (
                          <span className="table-badge badge-green">Más Económico</span>
                        ) : (
                          <span className="table-badge badge-gray">#{index + 1} del ranking</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <p className="table-disclaimer">
            * Estos valores son calculados con precios promedio e individuales. El costo total real cambia según el volumen, las marcas locales y promociones de cada supermercado.
          </p>

          <div className="cta-box text-center">
            <h3>¿Quieres comparar con tu propia lista de productos?</h3>
            <p>Usa nuestro comparador interactivo gratuito, selecciona tu provincia y los productos que realmente compras para saber cuál te conviene.</p>
            <Link to="/comparador-supermercados-rd" className="btn btn-primary">
              Ir al Comparador Interactivo <ArrowRight size={18} />
            </Link>
          </div>

          <AdSlot id="seo-between-content" placement="SEO - Entre Contenido" />

          <h2>Explicación Sencilla: ¿Por qué varían los precios?</h2>
          <p>
            Los supermercados dominicanos tienen distintas estrategias comerciales. Ciertas cadenas se enfocan en ofrecer precios bajos todos los días en la canasta básica de alimentos (ej. Bravo o Olé). Otras prefieren destacar mediante días específicos con grandes ofertas temáticas, como los populares "miércoles de vegetales" o "viernes de carnes" en La Sirena y Jumbo.
          </p>
          <p>
            Además, las marcas propias de cada establecimiento (las marcas blancas) representan una de las mayores fuentes de ahorro. Al elegir la marca del supermercado en granos, lácteos y productos de higiene, puedes ahorrar entre un 15% y un 30% en el total de tu recibo de compra.
          </p>
        </section>
      </article>

      <AdSlot id="seo-before-faq" placement="SEO - Antes del FAQ" />

      {/* FAQ Section */}
      <div className="card">
        <FAQSection items={seoFAQs} />
      </div>

      <div style={{ marginTop: '2rem' }}>
        <DisclaimerBox />
      </div>

      <AdSlot id="seo-before-footer" placement="SEO - Antes del Footer" />

      <style>{`
        .seo-article {
          padding: 2.5rem;
          margin-bottom: 2rem;
        }

        .category-badge {
          background-color: var(--primary-light);
          color: var(--primary);
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: inline-block;
          margin-bottom: 1rem;
        }

        .lead-text {
          font-size: 1.2rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin-bottom: 2rem;
        }

        .direct-answer-box {
          background-color: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-left: 6px solid var(--success);
          border-radius: var(--radius-md);
          padding: 1.5rem;
          margin-bottom: 2.5rem;
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .direct-answer-box h3 {
          margin-top: 0;
          margin-bottom: 0.5rem;
          color: #14532d;
          font-size: 1.1rem;
        }

        .direct-answer-box p {
          margin: 0;
          color: #15803d;
          font-size: 1.05rem;
        }

        .article-body h2 {
          margin-top: 2rem;
          margin-bottom: 1rem;
          font-size: 1.5rem;
        }

        /* SEO Table styles */
        .table-wrapper {
          overflow-x: auto;
          margin: 1.5rem 0;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
        }

        .seo-comparison-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .seo-comparison-table th,
        .seo-comparison-table td {
          padding: 1rem;
          border-bottom: 1px solid var(--border-color);
        }

        .seo-comparison-table th {
          background-color: var(--bg-color);
          font-weight: 600;
        }

        .color-strip {
          width: 6px;
          height: 1.5rem;
          display: inline-block;
          vertical-align: middle;
          margin-right: 10px;
          border-radius: 2px;
        }

        .cheapest-row td {
          background-color: var(--success-light);
        }

        .table-badge {
          font-size: 0.8rem;
          font-weight: 600;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          text-transform: uppercase;
        }

        .badge-green {
          background-color: var(--success-light);
          color: var(--success);
          border: 1px solid #bbf7d0;
        }

        .badge-gray {
          background-color: #f1f5f9;
          color: var(--text-muted);
        }

        .table-disclaimer {
          font-size: 0.85rem;
          color: var(--text-muted);
          font-style: italic;
          margin-top: -0.5rem;
          margin-bottom: 2rem;
        }

        .cta-box {
          background-color: var(--bg-color);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 2rem;
          margin: 2.5rem 0;
        }

        .cta-box h3 {
          margin-top: 0;
          font-size: 1.25rem;
        }

        .cta-box p {
          max-width: 600px;
          margin: 0 auto 1.5rem auto;
        }

        @media (max-width: 600px) {
          .seo-article {
            padding: 1.25rem;
          }
          .cta-box {
            padding: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
}
