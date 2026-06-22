import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Scale, 
  Calculator, 
  ShoppingBag, 
  TrendingDown, 
  MapPin, 
  Wallet, 
  DollarSign, 
  Percent, 
  TrendingUp, 
  ShieldAlert, 
  User, 
  Users, 
  Car, 
  Fuel, 
  Shield, 
  Package, 
  BookOpen, 
  FileText, 
  ShieldCheck, 
  Calendar, 
  ListTodo, 
  Home as HomeIcon, 
  Zap, 
  Wifi, 
  Droplet, 
  Truck,
  Search,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';
import { TOOLS_DIRECTORY, CATEGORIES_LABELS, type ToolItem } from '../data/toolsDirectory';
import SEOHead from '../components/SEOHead';
import DisclaimerBox from '../components/DisclaimerBox';
import AdSlot from '../components/AdSlot';
import FAQSection, { type FAQItem } from '../components/FAQSection';

const IconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Scale,
  Calculator,
  ShoppingBag,
  TrendingDown,
  MapPin,
  Wallet,
  DollarSign,
  Percent,
  TrendingUp,
  ShieldAlert,
  User,
  Users,
  Car,
  Fuel,
  Shield,
  Package,
  BookOpen,
  FileText,
  ShieldCheck,
  Calendar,
  ListTodo,
  HomeIcon,
  Zap,
  Wifi,
  Droplet,
  Truck
};

export default function HerramientasPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');

  const faqItems: FAQItem[] = [
    {
      question: '¿Qué puedo calcular en CuantoCuestaRD?',
      answer: 'Puedes calcular y comparar el costo de tu compra de supermercado, canasta básica, presupuestos personales según tu sueldo, costo de vida por ciudad, préstamos y mantenimiento de vehículos, fletes de courier e importaciones, trámites oficiales (como pasaporte y licencia) y servicios del hogar (luz, agua, gas e internet).'
    },
    {
      question: '¿Las herramientas son gratis?',
      answer: 'Sí, todas nuestras herramientas y calculadoras son 100% gratuitas y de libre acceso para todos los dominicanos.'
    },
    {
      question: '¿Los resultados son aproximados?',
      answer: 'No. Todas las herramientas arrojan presupuestos aproximados y de referencia para planificar. Los costos reales varían según marcas, ofertas, tasas oficiales del momento y decisiones de los proveedores.'
    },
    {
      question: '¿Puedo usar la web desde el celular?',
      answer: 'Sí, toda la plataforma está diseñada con enfoque móvil-primero (mobile-first) para funcionar cómodamente desde celulares de todas las marcas y tamaños de pantalla.'
    },
    {
      question: '¿Las calculadoras aplican para República Dominicana?',
      answer: 'Sí, están adaptadas especialmente para República Dominicana, usando tarifas reguladas de luz (EDE), CAASD, tasas oficiales de la DGII, INTRANT y cotizaciones en pesos (RD$) y dólares (US$).'
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
    'name': 'CuantoCuestaRD Calculadoras de Gastos',
    'operatingSystem': 'Any',
    'applicationCategory': 'FinanceApplication',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'DOP'
    }
  };

  // Live search and category filtering
  const filteredTools = TOOLS_DIRECTORY.filter((tool) => {
    const matchesCategory = selectedCategory === 'todos' || tool.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;
    return matchesCategory && (
      tool.title.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query) ||
      CATEGORIES_LABELS[tool.category].toLowerCase().includes(query) ||
      tool.keywords.some((kw) => kw.toLowerCase().includes(query))
    );
  });

  const renderToolCard = (tool: ToolItem) => {
    const IconComponent = IconMap[tool.iconName] || Scale;
    return (
      <div key={tool.route} className={`card card-hover tool-card theme-${tool.category}`}>
        <div className="tool-icon" style={{ backgroundColor: 'var(--theme-light, var(--primary-light))', color: 'var(--theme-primary, var(--primary))' }}>
          <IconComponent size={24} />
        </div>
        <h3>{tool.title}</h3>
        <p>{tool.description}</p>
        <span className="badge" style={{ backgroundColor: 'var(--theme-light, var(--primary-light))', color: 'var(--theme-primary, var(--primary))' }}>
          {CATEGORIES_LABELS[tool.category]}
        </span>
        <Link to={tool.route} className="btn btn-primary btn-block" style={{ marginTop: 'auto' }}>
          Usar herramienta <ChevronRight size={16} />
        </Link>
      </div>
    );
  };

  return (
    <div className="herramientas-page">
      <SEOHead 
        title="Todas las herramientas de CuantoCuestaRD"
        description="Encuentra calculadoras y comparadores para supermercado, sueldo, costo de vida, vehículos, courier, trámites y servicios del hogar en República Dominicana."
        schema={[faqSchema, appSchema]}
      />

      {/* Hero Section */}
      <section className="hero-section text-center">
        <h1>Todas las herramientas de CuantoCuestaRD</h1>
        <p className="hero-subtitle">
          Encuentra rápido la calculadora que necesitas para organizar tus gastos en República Dominicana.
        </p>
      </section>

      {/* Ad slot after hero */}
      <AdSlot id="herramientas-after-hero" placement="Todas las Herramientas - Después del Hero" />

      {/* Intro Text */}
      <div className="intro-text-section text-center">
        <p>
          Explora nuestro directorio completo de 35 herramientas interactivas diseñadas específicamente para el mercado dominicano. Filtra al instante o desplázate por las diferentes categorías para planificar tus finanzas personales y familiares.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="search-container">
        <div className="search-box">
          <Search className="search-icon" size={20} />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Busca: sueldo, carro, pasaporte, luz, courier..."
            className="search-input"
            aria-label="Buscar herramientas"
          />
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="category-chips-container">
        <div className="category-chips">
          <button 
            type="button"
            className={`chip-btn ${selectedCategory === 'todos' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('todos')}
          >
            Todos
          </button>
          {Object.entries(CATEGORIES_LABELS).map(([key, label]) => {
            let shortLabel = label;
            if (key === 'supermercados') shortLabel = '🛒 Supermercados';
            else if (key === 'finanzas') shortLabel = '💰 Finanzas';
            else if (key === 'costodevida') shortLabel = '💜 Costo de Vida';
            else if (key === 'vehiculos') shortLabel = '🚗 Vehículos';
            else if (key === 'courier') shortLabel = '🩵 Courier';
            else if (key === 'tramites') shortLabel = '📋 Trámites';
            else if (key === 'hogar') shortLabel = '💛 Hogar';

            return (
              <button 
                key={key}
                type="button"
                className={`chip-btn chip-${key} ${selectedCategory === key ? 'active' : ''}`}
                onClick={() => setSelectedCategory(key)}
              >
                {shortLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results or Categories */}
      {(searchQuery.trim() !== '' || selectedCategory !== 'todos') ? (
        <div className="search-results-section" style={{ minHeight: '300px' }}>
          <h2 className="category-heading" style={{ marginTop: '1rem' }}>
            {selectedCategory !== 'todos' ? CATEGORIES_LABELS[selectedCategory] : 'Resultados de búsqueda'} ({filteredTools.length})
          </h2>
          {filteredTools.length > 0 ? (
            <div className="grid-3">
              {filteredTools.map((tool) => renderToolCard(tool))}
            </div>
          ) : (
            <div className="card no-results text-center">
              <AlertTriangle size={48} className="text-muted" style={{ margin: '0 auto 1rem auto' }} />
              <p>
                No encontramos una herramienta con ese nombre en esta categoría. Prueba buscando en "Todos" o ingresando otra palabra.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="categories-sections">
          {Object.entries(CATEGORIES_LABELS).map(([catKey, catLabel]) => {
            const catTools = TOOLS_DIRECTORY.filter((tool) => tool.category === catKey);
            return (
              <div key={catKey} className="category-section">
                <h2 className="category-heading">{catLabel}</h2>
                <div className="grid-3">
                  {catTools.map((tool) => renderToolCard(tool))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom AdSlot and Disclaimer */}
      <AdSlot id="herramientas-before-footer" placement="Todas las Herramientas - Antes del Footer" />

      <div style={{ marginTop: '2.5rem' }}>
        <DisclaimerBox type="finanzas" />
      </div>

      {/* FAQ Section */}
      <FAQSection items={faqItems} />

      <style>{`
        .category-chips-container {
          display: flex;
          justify-content: center;
          margin-bottom: 2rem;
          overflow-x: auto;
          scrollbar-width: none; /* Firefox */
          padding: 0.25rem 0.5rem;
          -webkit-overflow-scrolling: touch;
        }

        .category-chips-container::-webkit-scrollbar {
          display: none; /* Safari/Chrome */
        }

        .category-chips {
          display: flex;
          gap: 0.5rem;
          white-space: nowrap;
        }

        .chip-btn {
          background-color: #ffffff;
          border: 1px solid var(--border-color);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-family: inherit;
          font-weight: 500;
          font-size: 0.9rem;
          color: var(--text-muted);
          cursor: pointer;
          transition: all var(--transition-fast);
          min-height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .chip-btn:hover {
          background-color: var(--bg-color);
          border-color: #cbd5e1;
        }

        .chip-btn.active {
          background-color: var(--primary);
          color: #ffffff;
          border-color: var(--primary);
          box-shadow: var(--shadow-sm);
        }

        /* Category specific active colors */
        .chip-supermercados.active { background-color: var(--supermercados-color) !important; border-color: var(--supermercados-color) !important; }
        .chip-finanzas.active { background-color: var(--finanzas-color) !important; border-color: var(--finanzas-color) !important; }
        .chip-costodevida.active { background-color: var(--costodevida-color) !important; border-color: var(--costodevida-color) !important; }
        .chip-vehiculos.active { background-color: var(--vehiculos-color) !important; border-color: var(--vehiculos-color) !important; }
        .chip-courier.active { background-color: var(--courier-color) !important; border-color: var(--courier-color) !important; }
        .chip-tramites.active { background-color: var(--tramites-color) !important; border-color: var(--tramites-color) !important; }
        .chip-hogar.active { background-color: var(--hogar-color) !important; border-color: var(--hogar-color) !important; }

        @media (max-width: 768px) {
          .category-chips-container {
            justify-content: flex-start;
          }
          .chip-btn {
            font-size: 0.85rem;
            padding: 0.4rem 0.85rem;
            min-height: 44px; /* Touch target minimum height */
          }
        }

        .search-container {
          max-width: 600px;
          margin: 0 auto 2.5rem auto;
        }

        .search-box {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          color: var(--text-muted);
          pointer-events: none;
        }

        .search-input {
          width: 100%;
          padding: 0.9rem 1rem 0.9rem 2.75rem;
          border-radius: 12px;
          border: 2px solid var(--border-color);
          font-size: 1rem;
          font-family: inherit;
          background-color: #ffffff;
          transition: all var(--transition-fast);
          color: var(--text-main);
        }

        .search-input:focus {
          border-color: var(--primary);
          outline: none;
          box-shadow: 0 0 0 3px var(--primary-light);
        }

        .category-heading {
          font-size: 1.4rem;
          color: var(--text-main);
          margin-bottom: 1.25rem;
          border-bottom: 2px solid var(--border-color);
          padding-bottom: 0.5rem;
          margin-top: 2.5rem;
        }

        .badge {
          display: inline-block;
          background-color: var(--primary-light);
          color: var(--primary);
          font-size: 0.8rem;
          font-weight: 600;
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
          margin-bottom: 1rem;
          align-self: flex-start;
        }

        .tool-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          height: 100%;
        }

        .tool-card h3 {
          margin: 1rem 0 0.5rem 0;
          font-size: 1.2rem;
          color: var(--text-main);
        }

        .tool-card p {
          flex-grow: 1;
          margin-bottom: 1rem;
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        .tool-icon {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .no-results {
          padding: 3rem 1.5rem;
          max-width: 500px;
          margin: 2rem auto;
        }

        .no-results p {
          color: var(--text-muted);
          font-size: 1rem;
          line-height: 1.6;
        }
        
        .intro-text-section {
          max-width: 800px;
          margin: 0 auto 2rem auto;
          line-height: 1.6;
          font-size: 1.02rem;
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .search-container {
            padding: 0 0.5rem;
          }
          .category-heading {
            font-size: 1.25rem;
            margin-top: 2rem;
          }
        }
      `}</style>
    </div>
  );
}
