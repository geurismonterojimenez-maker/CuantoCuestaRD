import {
  useState } from 'react';
import { 
  PRODUCTS,
  CATEGORIES,
  CITIES,
  getProductPrice,
  LAST_UPDATE_DATE 
} from '../data/mockData';
import SEOHead from '../components/SEOHead';
import PageHero from '../components/PageHero';
import DisclaimerBox from '../components/DisclaimerBox';
import AdSlot from '../components/AdSlot';
import FAQSection,
  { type FAQItem } from '../components/FAQSection';
import { 
  ShoppingCart,
  RotateCcw,
  MapPin,
  TrendingDown,
  ShoppingBag
} from 'lucide-react';

interface Cart {
  [productId: string]: number;
}

export default function MonthlyShopping() {
  const monthlyFAQs: FAQItem[] = [
    {
      question: '¿Qué es la Calculadora de Compra Mensual?',
      answer: 'Es una herramienta que te permite simular y construir tu propia lista de compras de supermercado para estimar tu presupuesto mensual ajustado a los precios referenciales de tu provincia.'
    },
    {
      question: '¿Cómo funcionan los consejos de ahorro?',
      answer: 'La calculadora analiza de forma instantánea tu lista, detecta cuál es la categoría en la que estás destinando más presupuesto y te ofrece un consejo práctico adaptado a la realidad del mercado dominicano.'
    },
    {
      question: '¿Puedo guardar mi lista de compras?',
      answer: 'En esta primera versión, la lista se mantiene activa mientras navegues por la página. Puedes vaciar el carrito o cambiar cantidades en cualquier momento.'
    }
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': monthlyFAQs.map((faq) => ({
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
    'name': 'Calculadora de Compra Mensual RD - CuantoCuestaRD',
    'operatingSystem': 'All',
    'applicationCategory': 'FinanceApplication',
    'description': 'Construye tu lista de compras mensual y calcula un presupuesto estimado en pesos dominicanos según los precios promedio de tu provincia.',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'DOP'
    }
  };

  const [cityId, setCityId] = useState('santo-domingo');
  const [cart, setCart] = useState<Cart>({});

  const handleQtyChange = (productId: string, val: number) => {
    if (val < 0) return;
    setCart({
      ...cart,
      [productId]: val
    });
  };

  const handleReset = () => {
    setCart({});
  };

  // Calculations
  let totalCost = 0;
  const categoryTotals: { [categoryId: string]: number } = {};

  // Initialize category totals
  CATEGORIES.forEach((cat) => {
    categoryTotals[cat.id] = 0;
  });

  // Calculate totals based on cart contents
  Object.entries(cart).forEach(([prodId, qty]) => {
    if (qty > 0) {
      const product = PRODUCTS.find((p) => p.id === prodId);
      if (product) {
        const price = getProductPrice(prodId, 'jumbo', cityId); // use 'jumbo' (average premiumFactor 1.0) as default reference price
        const cost = price * qty;
        totalCost += cost;
        categoryTotals[product.category] = (categoryTotals[product.category] || 0) + cost;
      }
    }
  });

  // Find category with highest spending
  let highestCategory = '';
  let highestAmount = 0;
  Object.entries(categoryTotals).forEach(([catId, amount]) => {
    if (amount > highestAmount) {
      highestAmount = amount;
      highestCategory = catId;
    }
  });

  const highestCategoryName = CATEGORIES.find((c) => c.id === highestCategory)?.name || 'Ninguna';

  // Savings advice according to the highest category
  const getSavingsAdvice = () => {
    if (totalCost === 0) return 'Agrega productos a tu lista para recibir consejos de ahorro.';

    switch (highestCategory) {
      case 'granos-basicos':
        return 'Tu mayor gasto está en Granos y básicos. Intenta comprar arroz en sacos más grandes (de 10 lb o 20 lb) y habichuelas secas en lugar de enlatadas para reducir costos drásticamente.';
      case 'carnes-proteinas':
        return 'Tu mayor gasto está en Carnes y proteínas. Considera combinar tu consumo de carnes con huevos o embutidos nacionales, que rinden más por porción, o realizar compras en mercados locales o mayoristas.';
      case 'lacteos':
        return 'Tu mayor gasto está en Lácteos. Opta por empaques tipo UHT (larga duración) en oferta o marcas locales que suelen tener mejor precio por litro que las importadas.';
      case 'viveres-frescos':
        return 'Tu mayor gasto está en Víveres y verduras. Compra plátanos, yucas y verduras en mercados locales, colmados grandes o en los días de plaza de los supermercados (habitualmente martes y miércoles).';
      case 'limpieza':
        return 'Tu mayor gasto está en Limpieza. Comprar cloro y detergente líquido a granel o marcas blancas de supermercados te ayudará a ahorrar hasta un 30% en esta categoría.';
      case 'higiene':
        return 'Tu mayor gasto está en Higiene. Intenta comprar paquetes familiares de papel higiénico y jabones en empaques múltiples para bajar el precio unitario por rollo/barra.';
      default:
        return 'Planifica tus compras anotando todo y evita ir al supermercado con hambre para no realizar compras por impulso.';
    }
  };

  return (
    <div className="monthly-shopping-page">
      <SEOHead 
        title="Calculadora de Compra Mensual RD | Estima tu supermercado"
        description="Arma tu lista de supermercado y estima cuánto gastarías al mes en comida, limpieza e higiene."
        schema={[faqSchema, appSchema]}
      />

      <PageHero 
        category="supermercados"
        title="Compra Mensual"
        description="Arma tu lista de compra personalizada y proyecta tu gasto total de supermercado al mes."
        icon={ShoppingBag}
        chips={["compra","mensual","supermercado"]}
      />

      {/* Select city for pricing */}
      <div className="card city-selector-card" style={{ marginBottom: '2rem' }}>
        <div className="flex-between flex-wrap" style={{ gap: '1rem' }}>
          <div className="selector-info">
            <h2 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>
              <MapPin size={18} className="inline-icon" /> Selecciona tu ubicación
            </h2>
            <p style={{ margin: 0, fontSize: '0.95rem' }}>Los precios de los productos se ajustarán a tu provincia.</p>
          </div>
          <div style={{ minWidth: '220px' }}>
            <select 
              id="city-select" 
              className="form-control" 
              value={cityId} 
              onChange={(e) => setCityId(e.target.value)}
            >
              {CITIES.map((city) => (
                <option key={city.id} value={city.id}>{city.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid-2">
        {/* Left: Product List builder */}
        <div className="products-selection-section">
          <h2>Agrega productos a tu lista</h2>
          <p>Usa los botones de más y menos para añadir los productos que compras usualmente.</p>

          <div className="categories-accordion">
            {CATEGORIES.map((category) => {
              const categoryProducts = PRODUCTS.filter((p) => p.category === category.id);
              return (
                <div key={category.id} className="category-group card" style={{ marginBottom: '1.5rem', borderLeft: `5px solid ${category.color}` }}>
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: category.color }}>
                    <span className="dot" style={{ backgroundColor: category.color }}></span>
                    {category.name}
                  </h3>
                  
                  <div className="category-products-list">
                    {categoryProducts.map((prod) => {
                      const qty = cart[prod.id] || 0;
                      const estimatedPrice = getProductPrice(prod.id, 'jumbo', cityId); // default reference price
                      return (
                        <div key={prod.id} className={`product-row-item ${qty > 0 ? 'selected' : ''}`}>
                          <div className="product-info-col">
                            <strong>{prod.name}</strong>
                            <span className="product-price-tag">RD$ {estimatedPrice} / {prod.unit}</span>
                          </div>
                          
                          <div className="qty-control-box" style={{ margin: 0 }}>
                            <button 
                              className="qty-btn"
                              onClick={() => handleQtyChange(prod.id, qty - 1)}
                              aria-label={`Quitar un ${prod.name}`}
                            >
                              -
                            </button>
                            <input 
                              type="number" 
                              className="qty-input" 
                              value={qty} 
                              onChange={(e) => handleQtyChange(prod.id, Number(e.target.value))}
                              aria-label={`Cantidad de ${prod.name}`}
                              min="0"
                            />
                            <button 
                              className="qty-btn"
                              onClick={() => handleQtyChange(prod.id, qty + 1)}
                              aria-label={`Agregar un ${prod.name}`}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Dynamic Receipt & Analytics */}
        <div className="receipt-analytics-section">
          <div className="card receipt-card" style={{ position: 'sticky', top: '90px' }}>
            <h2 className="flex-between">
              <span>Mi Carrito</span>
              <ShoppingCart size={24} className="text-primary" />
            </h2>
            <p>Resumen estimado de tu compra mensual en <strong>{CITIES.find(c => c.id === cityId)?.name}</strong>.</p>

            <div className="receipt-total-display">
              <span className="receipt-total-label">Total Estimado Mensual</span>
              <span className="receipt-total-val">RD$ {totalCost.toLocaleString()}</span>
            </div>

            {totalCost > 0 ? (
              <>
                {/* Dominican Summary quote */}
                <div className="dominican-quote" style={{ borderLeftColor: 'var(--primary)' }}>
                  <p>
                    Tu compra mensual estimada es de <strong>RD$ {totalCost.toLocaleString()}</strong>. 
                    La categoría donde más estás gastando es <strong>{highestCategoryName}</strong>.
                  </p>
                </div>

                {/* Breakdown by Category with percentages */}
                <div className="category-spendings">
                  <h3>Gasto por Categorías</h3>
                  <div className="categories-progress-list">
                    {CATEGORIES.map((cat) => {
                      const amount = categoryTotals[cat.id] || 0;
                      const percentage = totalCost > 0 ? Math.round((amount / totalCost) * 100) : 0;
                      if (amount === 0) return null;
                      return (
                        <div key={cat.id} className="category-progress-item">
                          <div className="flex-between progress-labels">
                            <span className="progress-cat-name">{cat.name}</span>
                            <span className="progress-cat-val">
                              RD$ {amount.toLocaleString()} ({percentage}%)
                            </span>
                          </div>
                          <div className="progress-bar-bg">
                            <div 
                              className="progress-bar-fill" 
                              style={{ width: `${percentage}%`, backgroundColor: cat.color }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Savings Advice box */}
                <div className="savings-advice-box">
                  <h3 className="flex-between" style={{ color: '#16a34a', fontSize: '1.05rem' }}>
                    <span>Consejo de Ahorro ({highestCategoryName})</span>
                    <TrendingDown size={18} />
                  </h3>
                  <p>{getSavingsAdvice()}</p>
                </div>
              </>
            ) : (
              <div className="empty-cart-state text-center">
                <p>No tienes productos agregados a tu lista. Empieza a añadir cantidades para ver tu presupuesto detallado.</p>
              </div>
            )}

            <AdSlot id="monthly-after-receipt" placement="Compra Mensual - Resumen" />

            <div className="update-note" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
              <p>Precios estimados actualizados a: <strong>{LAST_UPDATE_DATE}</strong></p>
            </div>

            <div className="receipt-actions flex-between" style={{ marginTop: '1.5rem' }}>
              <button 
                className="btn btn-secondary btn-block" 
                onClick={handleReset}
                disabled={totalCost === 0}
              >
                <RotateCcw size={16} /> Vaciar carrito
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <DisclaimerBox />
      </div>

      <AdSlot id="monthly-before-faq" placement="Compra Mensual - Antes del FAQ" />
      <FAQSection items={monthlyFAQs} />
      <AdSlot id="monthly-before-footer" placement="Compra Mensual - Antes del Footer" />

      <style>{`
        .city-selector-card {
          border-left: 5px solid var(--primary);
        }

        .category-group h3 {
          margin-top: 0;
          margin-bottom: 1rem;
          font-size: 1.15rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
        }

        .category-products-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .product-row-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 0.5rem;
          border-bottom: 1px solid var(--border-color);
          border-radius: 8px;
          transition: background-color var(--transition-fast);
        }

        .product-row-item:last-child {
          border-bottom: none;
        }

        .product-row-item.selected {
          background-color: var(--bg-color);
        }

        .product-info-col {
          display: flex;
          flex-direction: column;
        }

        .product-info-col strong {
          color: var(--text-main);
          font-size: 1.05rem;
        }

        .product-price-tag {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        /* Receipt details */
        .receipt-card {
          border-color: #cbd5e1;
        }

        .receipt-total-display {
          background-color: var(--text-main);
          color: #ffffff;
          border-radius: var(--radius-md);
          padding: 1.25rem;
          text-align: center;
          margin: 1rem 0 1.5rem 0;
        }

        .receipt-total-label {
          display: block;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #94a3b8;
          margin-bottom: 0.15rem;
        }

        .receipt-total-val {
          font-size: 2rem;
          font-weight: 800;
        }

        .empty-cart-state {
          padding: 2rem 1rem;
          border: 2px dashed var(--border-color);
          border-radius: var(--radius-md);
          color: var(--text-muted);
          margin-bottom: 1.5rem;
        }

        /* Progress bars for category spendings */
        .category-spendings h3 {
          font-size: 1.05rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .categories-progress-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .progress-labels {
          font-size: 0.9rem;
          margin-bottom: 0.25rem;
        }

        .progress-cat-name {
          font-weight: 500;
          color: var(--text-main);
        }

        .progress-cat-val {
          color: var(--text-muted);
        }

        .progress-bar-bg {
          background-color: #f1f5f9;
          height: 8px;
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          border-radius: 4px;
          transition: width var(--transition-normal);
        }

        .savings-advice-box {
          background-color: var(--success-light);
          border: 1px solid #bbf7d0;
          border-radius: var(--radius-md);
          padding: 1rem 1.25rem;
          color: #14532d;
          margin-bottom: 1.5rem;
        }

        .savings-advice-box h3 {
          margin-top: 0;
          margin-bottom: 0.5rem;
        }

        .savings-advice-box p {
          margin: 0;
          font-size: 0.95rem;
          color: #15803d;
        }

        @media (max-width: 900px) {
          .grid-2 {
            grid-template-columns: 1fr;
          }
          .receipt-card {
            position: static !important;
          }
        }
      `}</style>
    </div>
  );
}
