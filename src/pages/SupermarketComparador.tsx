import {
  useState,
  useEffect } from 'react';
import { 
  CITIES,
  SUPERMARKETS,
  PRODUCTS,
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
  MapPin,
  Users,
  ShoppingBag,
  CheckSquare,
  Square,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  TrendingDown,
  AlertCircle,
  DollarSign,
  Scale
} from 'lucide-react';

interface SelectedQuantities {
  [productId: string]: number;
}

export default function SupermarketComparador() {
  const comparadorFAQs: FAQItem[] = [
    {
      question: '¿Cómo funciona el comparador de supermercados?',
      answer: 'El comparador te permite simular una lista de compras y calcula el total estimado de referencia para cada supermercado en tu provincia, ayudándote a identificar el comercio más económico para tu compra.'
    },
    {
      question: '¿Con qué frecuencia se actualizan los precios?',
      answer: 'Los precios son estimaciones y referencias actualizables de manera periódica. Reflejan fluctuaciones promedio del mercado dominicano y pueden variar según sucursal, fecha, marca y ofertas disponibles.'
    },
    {
      question: '¿Qué supermercados puedo comparar?',
      answer: 'Puedes comparar los precios estimados en Bravo, La Sirena, Jumbo, Supermercados Nacional, Olé y Plaza Lama de forma simultánea.'
    }
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': comparadorFAQs.map((faq) => ({
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
    'name': 'Comparador de Supermercados RD - CuantoCuestaRD',
    'operatingSystem': 'All',
    'applicationCategory': 'FinanceApplication',
    'description': 'Herramienta para comparar el costo estimado de una canasta de productos básicos entre los principales supermercados de la República Dominicana.',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'DOP'
    }
  };

  // Step State: 1 = Basic Info, 2 = Supermarkets, 3 = Products & Review, 4 = Results
  const [step, setStep] = useState(1);

  // Form State
  const [cityId, setCityId] = useState('santo-domingo');
  const [basketType, setBasketType] = useState('basica'); // basica, familiar, limpieza, completa
  const [peopleCount, setPeopleCount] = useState<number>(1);
  const [selectedSupermarkets, setSelectedSupermarkets] = useState<string[]>([]);
  const [quantities, setQuantities] = useState<SelectedQuantities>({});

  // Human validation errors
  const [error, setError] = useState<string | null>(null);

  // Results State
  const [results, setResults] = useState<{
    supermarketId: string;
    name: string;
    total: number;
    logoColor: string;
  }[]>([]);

  // Automatically pre-load quantities when peopleCount or basketType changes
  useEffect(() => {
    const newQuantities: SelectedQuantities = {};
    PRODUCTS.forEach((product) => {
      let isIncluded = false;
      let defaultQty = 0;

      // Logic to decide which products are included by default in the chosen basket type
      if (basketType === 'basica') {
        // Essential food items
        isIncluded = [
          'arroz-10', 'aceite-64', 'habichuelas-1', 'pastas-400', 
          'azucar-2', 'pollo-lb', 'huevos-30', 'salami-1', 
          'platano-unidad', 'yuca-lb', 'jabon-cuaba-unidad'
        ].includes(product.id);
      } else if (basketType === 'limpieza') {
        // Only hygiene and cleaning
        isIncluded = ['detergente-1kg', 'cloro-galon', 'papel-higienico-4', 'jabon-cuaba-unidad', 'jabon-tocador'].includes(product.id);
      } else if (basketType === 'familiar') {
        // Food items + basic hygiene
        isIncluded = ![ 'jabon-tocador' ].includes(product.id);
      } else {
        // Completa
        isIncluded = true;
      }

      if (isIncluded) {
        // Scale default quantities based on family size
        if (product.id === 'platano-unidad') {
          defaultQty = peopleCount * 5; // 5 units per person
        } else if (product.id === 'leche-1l') {
          defaultQty = peopleCount * 3; // 3 Liters per person
        } else if (product.id === 'arroz-10') {
          defaultQty = Math.max(1, Math.round(peopleCount * 0.5)); // 1 bag of 10 lb per 2 people
        } else if (product.id === 'pollo-lb') {
          defaultQty = peopleCount * 4; // 4 lb per person
        } else if (product.id === 'huevos-30') {
          defaultQty = Math.max(1, Math.round(peopleCount * 0.7)); // cartón de 30
        } else {
          defaultQty = peopleCount; // default multiplier
        }
      }

      newQuantities[product.id] = defaultQty;
    });

    setQuantities(newQuantities);
  }, [basketType, peopleCount]);

  // Validation & Navigation
  const handleNextStep = () => {
    setError(null);
    if (step === 1) {
      if (!cityId) {
        setError('Completa este campo para poder calcular: selecciona tu ciudad.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (selectedSupermarkets.length === 0) {
        setError('Selecciona al menos un supermercado para comparar.');
        return;
      }
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    setError(null);
    setStep((prev) => prev - 1);
  };

  const handleToggleSupermarket = (id: string) => {
    setError(null);
    if (selectedSupermarkets.includes(id)) {
      setSelectedSupermarkets(selectedSupermarkets.filter((sId) => sId !== id));
    } else {
      setSelectedSupermarkets([...selectedSupermarkets, id]);
    }
  };

  const handleQtyChange = (productId: string, val: number) => {
    if (val < 0) return;
    setQuantities({
      ...quantities,
      [productId]: val
    });
  };

  // Perform comparison calculations
  const handleCompare = () => {
    setError(null);

    // Verify quantities are valid (at least one product should have a quantity > 0)
    const totalItems = Object.values(quantities).reduce((a, b) => a + b, 0);
    if (totalItems === 0) {
      setError('Debes tener al menos 1 producto con cantidad mayor que cero para comparar.');
      return;
    }

    const calculatedResults = selectedSupermarkets.map((superId) => {
      const superObj = SUPERMARKETS.find((s) => s.id === superId)!;
      let total = 0;

      Object.entries(quantities).forEach(([prodId, qty]) => {
        if (qty > 0) {
          const itemPrice = getProductPrice(prodId, superId, cityId);
          total += itemPrice * qty;
        }
      });

      return {
        supermarketId: superId,
        name: superObj.name,
        total: Math.round(total),
        logoColor: superObj.logoColor
      };
    });

    // Sort from cheapest to most expensive
    calculatedResults.sort((a, b) => a.total - b.total);

    setResults(calculatedResults);
    setStep(4);
  };

  // Reset form
  const handleReset = () => {
    setCityId('santo-domingo');
    setBasketType('basica');
    setPeopleCount(1);
    setSelectedSupermarkets([]);
    setQuantities({});
    setError(null);
    setResults([]);
    setStep(1);
  };

  // Analysis variables
  const cheapest = results[0];
  const mostExpensive = results[results.length - 1];
  const savings = cheapest && mostExpensive ? mostExpensive.total - cheapest.total : 0;

  return (
    <div className="comparador-page">
      <SEOHead 
        title="Comparador de Supermercados RD | ¿Dónde sale más barato comprar?"
        description="Compara supermercados en RD y descubre dónde puede salir más barata tu canasta de productos básicos."
        schema={[faqSchema, appSchema]}
      />

      <PageHero 
        category="supermercados"
        title="Comparador de Supermercados"
        description="Compara el costo estimado de tu compra entre los principales supermercados de RD."
        icon={Scale}
        chips={["supermercado","precios","canasta"]}
      />

      {/* Step Progress Bar */}
      <div className="steps-container" aria-label="Progreso de pasos">
        <div className={`step-node ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>1</div>
        <div className={`step-node ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>2</div>
        <div className={`step-node ${step >= 3 ? 'active' : ''} ${step > 3 ? 'completed' : ''}`}>3</div>
        <div className={`step-node ${step >= 4 ? 'active' : ''} ${step > 4 ? 'completed' : ''}`}>4</div>
      </div>

      <div className="card form-card">
        {error && (
          <div className="error-alert" role="alert">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {/* STEP 1: Basic Settings */}
        {step === 1 && (
          <div className="step-content">
            <h2>Paso 1: ¿Dónde y para quién es la compra?</h2>
            <p>Define la provincia y el tipo de canasta que deseas comparar. Te sugeriremos cantidades estimadas de inmediato.</p>

            <div className="form-group">
              <label htmlFor="city-select" className="form-label">
                <MapPin size={18} className="inline-icon" /> Ciudad / Provincia:
              </label>
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

            <div className="form-group">
              <label htmlFor="people-select" className="form-label">
                <Users size={18} className="inline-icon" /> Cantidad de personas en el hogar:
              </label>
              <select 
                id="people-select" 
                className="form-control" 
                value={peopleCount} 
                onChange={(e) => setPeopleCount(Number(e.target.value))}
              >
                <option value={1}>1 persona (Individual)</option>
                <option value={2}>2 personas (Pareja)</option>
                <option value={3}>Familia de 3 personas</option>
                <option value={4}>Familia de 4 personas</option>
                <option value={5}>Familia de 5 o más personas</option>
              </select>
            </div>

            <div className="form-group">
              <span className="form-label">
                <ShoppingBag size={18} className="inline-icon" /> Tipo de canasta que necesitas comparar:
              </span>
              <div className="options-grid">
                <div 
                  className={`option-card ${basketType === 'basica' ? 'selected' : ''}`}
                  onClick={() => setBasketType('basica')}
                >
                  <input 
                    type="radio" 
                    id="basket-basica" 
                    name="basketType" 
                    checked={basketType === 'basica'} 
                    readOnly
                  />
                  <div className="option-text">
                    <div className="option-card-label">Canasta Básica</div>
                    <span className="option-desc">Solo artículos esenciales</span>
                  </div>
                </div>

                <div 
                  className={`option-card ${basketType === 'familiar' ? 'selected' : ''}`}
                  onClick={() => setBasketType('familiar')}
                >
                  <input 
                    type="radio" 
                    id="basket-familiar" 
                    name="basketType" 
                    checked={basketType === 'familiar'} 
                    readOnly
                  />
                  <div className="option-text">
                    <div className="option-card-label">Canasta Familiar</div>
                    <span className="option-desc">Básicos y más variedad</span>
                  </div>
                </div>

                <div 
                  className={`option-card ${basketType === 'limpieza' ? 'selected' : ''}`}
                  onClick={() => setBasketType('limpieza')}
                >
                  <input 
                    type="radio" 
                    id="basket-limpieza" 
                    name="basketType" 
                    checked={basketType === 'limpieza'} 
                    readOnly
                  />
                  <div className="option-text">
                    <div className="option-card-label">Limpieza e Higiene</div>
                    <span className="option-desc">Hogar y aseo personal</span>
                  </div>
                </div>

                <div 
                  className={`option-card ${basketType === 'completa' ? 'selected' : ''}`}
                  onClick={() => setBasketType('completa')}
                >
                  <input 
                    type="radio" 
                    id="basket-completa" 
                    name="basketType" 
                    checked={basketType === 'completa'} 
                    readOnly
                  />
                  <div className="option-text">
                    <div className="option-card-label">Compra Completa</div>
                    <span className="option-desc">Todos los productos listados</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="step-actions">
              <button className="btn btn-primary btn-block" onClick={handleNextStep}>
                Continuar a Supermercados <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Supermarkets Checkboxes */}
        {step === 2 && (
          <div className="step-content">
            <h2>Paso 2: ¿Cuáles supermercados quieres comparar?</h2>
            <p>Selecciona dos o más supermercados para encontrar el mejor precio estimado.</p>

            <div className="options-grid" style={{ margin: '2rem 0' }}>
              {SUPERMARKETS.map((sup) => {
                const isSelected = selectedSupermarkets.includes(sup.id);
                return (
                  <div 
                    key={sup.id}
                    className={`option-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleToggleSupermarket(sup.id)}
                    style={{ borderLeft: `6px solid ${sup.logoColor}` }}
                  >
                    {isSelected ? <CheckSquare size={22} className="text-success" /> : <Square size={22} />}
                    <span className="option-card-label">{sup.name}</span>
                  </div>
                );
              })}
            </div>

            <div className="step-actions flex-between">
              <button className="btn btn-secondary" onClick={handlePrevStep}>
                <ChevronLeft size={20} /> Atrás
              </button>
              <button className="btn btn-primary" onClick={handleNextStep}>
                Revisar Productos <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Quantities Adjustment */}
        {step === 3 && (
          <div className="step-content">
            <h2>Paso 3: Ajusta las cantidades de tu compra</h2>
            <p>Hemos sugerido una cantidad inicial para una persona. Cambia las cantidades a tu gusto usando los botones grandes.</p>

            <div className="product-table-wrapper scroll-table">
              <table className="product-qty-table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Unidad</th>
                    <th style={{ textAlign: 'center' }}>Cantidad</th>
                  </tr>
                </thead>
                <tbody>
                  {PRODUCTS.map((prod) => {
                    const qty = quantities[prod.id] || 0;
                    return (
                      <tr key={prod.id} className={qty > 0 ? 'active-row' : 'inactive-row'}>
                        <td>
                          <div className="product-name-cell">
                            <strong>{prod.name}</strong>
                          </div>
                        </td>
                        <td><span className="product-unit-tag">{prod.unit}</span></td>
                        <td>
                          <div className="qty-control-box">
                            <button 
                              className="qty-btn"
                              onClick={() => handleQtyChange(prod.id, qty - 1)}
                              aria-label={`Reducir 1 ${prod.name}`}
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
                              aria-label={`Aumentar 1 ${prod.name}`}
                            >
                              +
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="step-actions flex-between" style={{ marginTop: '2rem' }}>
              <button className="btn btn-secondary" onClick={handlePrevStep}>
                <ChevronLeft size={20} /> Atrás
              </button>
              <button className="btn btn-success" onClick={handleCompare}>
                <DollarSign size={20} /> Comparar precios
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Results Display */}
        {step === 4 && (
          <div className="step-content">
            <h2>Resultados de la Comparación</h2>
            <p>Cálculo estimado basado en {Object.values(quantities).reduce((a, b) => a + b, 0)} productos en la provincia <strong>{CITIES.find(c => c.id === cityId)?.name}</strong>.</p>

            {/* Ahorro e Resumen general */}
            {results.length > 1 && (
              <div className="result-highlight-card">
                <div className="savings-badge">
                  <TrendingDown size={32} />
                  <div>
                    <span className="badge-title">Ahorro Máximo Estimado</span>
                    <span className="badge-value">RD$ {savings.toLocaleString()}</span>
                  </div>
                </div>
                <p className="summary-sentence">
                  Para esta canasta, el supermercado más económico para esta canasta estimada es <strong>{cheapest.name}</strong>. 
                  La diferencia frente al supermercado más caro ({mostExpensive.name}) es de <strong>RD$ {savings.toLocaleString()}</strong>.
                </p>
              </div>
            )}

            {/* Lista de Supermercados y sus Totales */}
            <div className="results-list">
              {results.map((res, index) => {
                const isCheapest = index === 0;
                const isMostExpensive = index === results.length - 1;
                return (
                  <div 
                    key={res.supermarketId} 
                    className={`result-item-card ${isCheapest ? 'cheapest-border' : ''}`}
                    style={{ borderLeftColor: res.logoColor }}
                  >
                    <div className="result-item-info">
                      <span className="result-position-badge">#{index + 1}</span>
                      <div>
                        <h3>{res.name}</h3>
                        {isCheapest && <span className="tag tag-success">Más Económico</span>}
                        {isMostExpensive && results.length > 1 && <span className="tag tag-danger">El Más Caro</span>}
                      </div>
                    </div>
                    <div className="result-item-price">
                      <span className="price-label">Total estimado:</span>
                      <span className="price-value">RD$ {res.total.toLocaleString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <AdSlot id="comparador-after-results" placement="Comparador - Después de Resultados" />

            <div className="update-note">
              <p>Fecha de actualización de la base de precios: <strong>{LAST_UPDATE_DATE}</strong></p>
            </div>

            <DisclaimerBox />

            <div className="step-actions text-center" style={{ marginTop: '2rem' }}>
              <button className="btn btn-secondary btn-block" onClick={handleReset}>
                <RotateCcw size={18} /> Limpiar datos y comparar de nuevo
              </button>
            </div>
          </div>
        )}
      </div>

      <AdSlot id="comparador-before-faq" placement="Comparador - Antes del FAQ" />
      <FAQSection items={comparadorFAQs} />
      <AdSlot id="comparador-before-footer" placement="Comparador - Antes del Footer" />

      <style>{`
        .error-alert {
          background-color: var(--danger-light);
          border: 1px solid var(--danger);
          border-left: 5px solid var(--danger);
          border-radius: var(--radius-sm);
          padding: 1rem;
          color: #7f1d1d;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          font-weight: 500;
        }

        .inline-icon {
          vertical-align: middle;
          margin-right: 4px;
        }

        .form-card {
          margin-bottom: 3rem;
        }

        .option-desc {
          font-size: 0.85rem;
          color: var(--text-muted);
          display: block;
        }

        .step-actions {
          border-top: 1px solid var(--border-color);
          padding-top: 1.5rem;
          margin-top: 1.5rem;
        }

        /* Table styles */
        .product-table-wrapper {
          overflow-x: auto;
          margin: 1.5rem 0;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
        }

        .product-qty-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .product-qty-table th,
        .product-qty-table td {
          padding: 1rem;
          border-bottom: 1px solid var(--border-color);
        }

        .product-qty-table th {
          background-color: var(--bg-color);
          font-weight: 600;
          color: var(--text-main);
        }

        .product-qty-table tr.active-row td {
          background-color: var(--primary-light);
        }

        .product-unit-tag {
          font-size: 0.9rem;
          background-color: #f1f5f9;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          color: var(--text-muted);
        }

        /* Quantity controls */
        .qty-control-box {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.25rem;
          max-width: 140px;
          margin: 0 auto;
        }

        .qty-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid var(--border-color);
          background-color: #ffffff;
          font-size: 1.25rem;
          font-weight: bold;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-main);
          transition: all var(--transition-fast);
        }

        .qty-btn:hover {
          background-color: var(--primary-light);
          border-color: var(--primary);
          color: var(--primary);
        }

        .qty-input {
          width: 48px;
          height: 36px;
          text-align: center;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          font-size: 1.05rem;
          font-weight: 500;
          font-family: var(--font-sans);
          -moz-appearance: textfield;
        }

        .qty-input::-webkit-outer-spin-button,
        .qty-input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Results styling */
        .result-highlight-card {
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
          border: 1px solid #bbf7d0;
          border-left: 6px solid var(--success);
          border-radius: var(--radius-md);
          padding: 1.5rem;
          margin-bottom: 2rem;
        }

        .savings-badge {
          display: flex;
          align-items: center;
          gap: 1rem;
          color: #14532d;
          margin-bottom: 0.75rem;
        }

        .badge-title {
          display: block;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
        }

        .badge-value {
          font-size: 1.75rem;
          font-weight: 700;
        }

        .summary-sentence {
          font-size: 1.1rem;
          color: #14532d;
          margin: 0;
        }

        .results-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .result-item-card {
          background-color: #ffffff;
          border: 1px solid var(--border-color);
          border-left: 8px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 1.25rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: var(--shadow-sm);
        }

        .result-item-card.cheapest-border {
          box-shadow: var(--shadow-md);
          border-color: #bbf7d0;
        }

        .result-item-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .result-position-badge {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: #f1f5f9;
          color: var(--text-muted);
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .result-item-card.cheapest-border .result-position-badge {
          background-color: var(--success);
          color: white;
        }

        .result-item-info h3 {
          margin: 0 0 0.25rem 0;
          font-size: 1.2rem;
        }

        .tag {
          font-size: 0.8rem;
          font-weight: 600;
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
          text-transform: uppercase;
        }

        .tag-success {
          background-color: var(--success-light);
          color: var(--success);
          border: 1px solid #bbf7d0;
        }

        .tag-danger {
          background-color: var(--danger-light);
          color: var(--danger);
          border: 1px solid #fecaca;
        }

        .result-item-price {
          text-align: right;
          display: flex;
          flex-direction: column;
        }

        .price-label {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .price-value {
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .update-note {
          text-align: center;
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
          color: var(--text-muted);
        }

        @media (max-width: 600px) {
          .result-item-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          .result-item-price {
            text-align: left;
            width: 100%;
            border-top: 1px solid var(--border-color);
            padding-top: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}
