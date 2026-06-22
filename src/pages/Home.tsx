import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Scale, 
  ShoppingBag, 
  Calculator, 
  TrendingDown, 
  MapPin, 
  ChevronRight, 
  DollarSign, 
  Wallet, 
  TrendingUp, 
  Percent, 
  ShieldAlert, 
  User, 
  Users, 
  Car, 
  Fuel, 
  Shield, 
  Package, 
  FileText, 
  BookOpen, 
  ShieldCheck, 
  Calendar, 
  ListTodo, 
  Home as HomeIcon, 
  Zap, 
  Wifi, 
  Droplet, 
  Truck,
  Sparkles
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import DisclaimerBox from '../components/DisclaimerBox';
import AdSlot from '../components/AdSlot';
import FAQSection, { type FAQItem } from '../components/FAQSection';
import SectionHeader from '../components/SectionHeader';

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('supermercados');

  const homeFAQ: FAQItem[] = [
    {
      question: '¿Qué es CuantoCuestaRD?',
      answer: 'Es una plataforma gratuita que ayuda a las familias en la República Dominicana a presupuestar, comparar y calcular costos cotidianos, desde canasta básica y vehículos hasta compras por internet y trámites oficiales.'
    },
    {
      question: '¿De dónde provienen los precios de la página?',
      answer: 'Los precios son estimaciones y referencias basadas en promedios del mercado dominicano, tasas aduanales oficiales e impuestos vigentes en RD. Tienen un fin informativo para planificar.'
    },
    {
      question: '¿Puedo usar la web desde mi celular?',
      answer: 'Sí, la plataforma está diseñada con enfoque móvil-primero (mobile-first). Las calculadoras, listas y dropdowns funcionan de manera óptima en celulares.'
    }
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': homeFAQ.map((faq) => ({
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
    'name': 'CuantoCuestaRD Portal de Calculadoras',
    'operatingSystem': 'Any',
    'applicationCategory': 'FinanceApplication',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'DOP'
    }
  };

  return (
    <div className="home-page">
      <SEOHead 
        title="CuantoCuestaRD | Calculadoras y Presupuestos en República Dominicana"
        description="Calcula y planifica tus costos de canasta básica, préstamos de vehículos, compras por internet, luz, mudanzas y trámites gubernamentales en RD."
        schema={[faqSchema, appSchema]}
      />

      {/* Hero Section */}
      <section className="hero-section text-center">
        {/* Blur decorations */}
        <div className="hero-blur-circle blue" />
        <div className="hero-blur-circle green" />
        <div className="hero-blur-circle purple" />

        <div className="hero-content-wrapper">
          <span className="hero-badge">Plataforma 100% Dominicana</span>
          <h1>Planifica tus gastos en República Dominicana de forma inteligente</h1>
          <p className="hero-subtitle">
            Utiliza nuestras 35 calculadoras gratuitas para estimar tus costos de supermercado, finanzas, vehículos, compras online y del hogar.
          </p>
          <div className="hero-actions">
            <Link to="/calculadora-presupuesto-mensual-rd" className="btn btn-primary">
              <DollarSign size={18} /> Organizar mi presupuesto
            </Link>
            <Link to="/herramientas" className="btn btn-secondary">
              Ver todas las herramientas
            </Link>
          </div>
        </div>
      </section>

      {/* Ad slot under hero */}
      <AdSlot id="home-under-hero" placement="Inicio - Debajo del Hero" />

      {/* Popular Tools Section */}
      <section className="popular-tools-section" style={{ padding: '1rem 0' }}>
        <SectionHeader 
          title="Herramientas Populares" 
          description="Las calculadoras más utilizadas por los dominicanos para planificar y optimizar sus finanzas de inmediato."
          icon={Sparkles}
        />

        <div className="grid-3">
          {/* Card 1: Supermercado */}
          <div className="card card-hover tool-card theme-supermercados">
            <div className="tool-icon" style={{ backgroundColor: 'var(--theme-light)', color: 'var(--theme-primary)' }}>
              <Scale size={24} />
            </div>
            <h3>Comparador de Supermercados</h3>
            <p>Compara el costo de tu canasta entre los principales supermercados del país.</p>
            <Link to="/comparador-supermercados-rd" className="btn btn-primary btn-block">
              Comparar supermercados <ChevronRight size={16} />
            </Link>
          </div>

          {/* Card 2: Sueldo */}
          <div className="card card-hover tool-card theme-finanzas">
            <div className="tool-icon" style={{ backgroundColor: 'var(--theme-light)', color: 'var(--theme-primary)' }}>
              <Wallet size={24} />
            </div>
            <h3>¿Me alcanza el sueldo?</h3>
            <p>Analiza si tus ingresos cubren tus compromisos y descubre tu balance mensual.</p>
            <Link to="/me-alcanza-el-sueldo" className="btn btn-primary btn-block">
              Calcular sueldo <ChevronRight size={16} />
            </Link>
          </div>

          {/* Card 3: Costo de Vida */}
          <div className="card card-hover tool-card theme-costodevida">
            <div className="tool-icon" style={{ backgroundColor: 'var(--theme-light)', color: 'var(--theme-primary)' }}>
              <TrendingUp size={24} />
            </div>
            <h3>Costo de Vida RD</h3>
            <p>Estima el dinero mensual necesario para vivir en el país de acuerdo a tus hábitos.</p>
            <Link to="/costo-de-vida-rd" className="btn btn-primary btn-block">
              Calcular costo vida <ChevronRight size={16} />
            </Link>
          </div>

          {/* Card 4: Mantener Carro */}
          <div className="card card-hover tool-card theme-vehiculos">
            <div className="tool-icon" style={{ backgroundColor: 'var(--theme-light)', color: 'var(--theme-primary)' }}>
              <Car size={24} />
            </div>
            <h3>Mantener un Carro</h3>
            <p>Suma combustible, seguro y mantenimiento para ver el costo mensual real de tu vehículo.</p>
            <Link to="/cuanto-cuesta-mantener-un-carro-en-rd" className="btn btn-primary btn-block">
              Ver costo carro <ChevronRight size={16} />
            </Link>
          </div>

          {/* Card 5: Courier */}
          <div className="card card-hover tool-card theme-courier">
            <div className="tool-icon" style={{ backgroundColor: 'var(--theme-light)', color: 'var(--theme-primary)' }}>
              <Package size={24} />
            </div>
            <h3>Calculadora Courier</h3>
            <p>Calcula el costo del flete por libra y aplica aranceles aduanales de importación.</p>
            <Link to="/calculadora-courier-rd" className="btn btn-primary btn-block">
              Calcular courier <ChevronRight size={16} />
            </Link>
          </div>

          {/* Card 6: Mudarse */}
          <div className="card card-hover tool-card theme-hogar">
            <div className="tool-icon" style={{ backgroundColor: 'var(--theme-light)', color: 'var(--theme-primary)' }}>
              <Truck size={24} />
            </div>
            <h3>Mudarse y Equipar</h3>
            <p>Estima el dinero total inicial (depósitos de alquiler, flete y electrodomésticos) para mudarte.</p>
            <Link to="/cuanto-cuesta-mudarse-en-rd" className="btn btn-primary btn-block">
              Calcular mudanza <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Ad slot middle */}
      <AdSlot id="home-middle" placement="Inicio - Entre Secciones" />

      {/* Category Tabs Switcher */}
      <section className="tabs-section" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        <SectionHeader 
          title="Directorio de Herramientas"
          description="Explora las 35 calculadoras agrupadas por categorías interactivas para encontrar justo lo que necesitas."
          icon={ShoppingBag}
        />

        <div className="category-tabs-container">
          <div className="category-tabs">
            <button 
              className={`category-tab-btn ${activeTab === 'supermercados' ? 'active' : ''}`}
              onClick={() => setActiveTab('supermercados')}
              aria-label="Ver herramientas de Supermercados"
            >
              <ShoppingBag size={18} />
              <span>Supermercados</span>
            </button>
            <button 
              className={`category-tab-btn ${activeTab === 'finanzas' ? 'active' : ''}`}
              onClick={() => setActiveTab('finanzas')}
              aria-label="Ver herramientas de Finanzas y Vida"
            >
              <Wallet size={18} />
              <span>Finanzas y Vida</span>
            </button>
            <button 
              className={`category-tab-btn ${activeTab === 'vehiculos' ? 'active' : ''}`}
              onClick={() => setActiveTab('vehiculos')}
              aria-label="Ver herramientas de Vehículos"
            >
              <Car size={18} />
              <span>Vehículos</span>
            </button>
            <button 
              className={`category-tab-btn ${activeTab === 'courier' ? 'active' : ''}`}
              onClick={() => setActiveTab('courier')}
              aria-label="Ver herramientas de Courier"
            >
              <Package size={18} />
              <span>Courier</span>
            </button>
            <button 
              className={`category-tab-btn ${activeTab === 'hogar' ? 'active' : ''}`}
              onClick={() => setActiveTab('hogar')}
              aria-label="Ver herramientas de Hogar y Trámites"
            >
              <HomeIcon size={18} />
              <span>Hogar y Trámites</span>
            </button>
          </div>
        </div>
      </section>

      {/* Tab Contents */}
      <section className="tab-contents-section">
        {activeTab === 'supermercados' && (
          <div className="tab-pane animate-fade-in theme-supermercados">
            <div className="grid-3">
              {/* Featured Card 1 */}
              <div className="card card-hover tool-card">
                <div className="tool-icon" style={{ backgroundColor: 'var(--theme-light)', color: 'var(--theme-primary)' }}>
                  <Scale size={24} />
                </div>
                <h3>Comparador de Precios</h3>
                <p>Compara el costo de tu canasta entre los principales supermercados del país.</p>
                <Link to="/comparador-supermercados-rd" className="btn btn-primary btn-block">
                  Comparar supermercados <ChevronRight size={16} />
                </Link>
              </div>
              {/* Featured Card 2 */}
              <div className="card card-hover tool-card">
                <div className="tool-icon" style={{ backgroundColor: 'var(--theme-light)', color: 'var(--theme-primary)' }}>
                  <Calculator size={24} />
                </div>
                <h3>Canasta Básica RD</h3>
                <p>Estima el costo mensual de alimentación según los integrantes de tu hogar.</p>
                <Link to="/canasta-basica-rd" className="btn btn-primary btn-block">
                  Calcular canasta <ChevronRight size={16} />
                </Link>
              </div>
              {/* Featured Card 3 */}
              <div className="card card-hover tool-card">
                <div className="tool-icon" style={{ backgroundColor: 'var(--theme-light)', color: 'var(--theme-primary)' }}>
                  <ShoppingBag size={24} />
                </div>
                <h3>Compra Mensual</h3>
                <p>Arma una lista personalizada y proyecta tu gasto total de despensa en RD.</p>
                <Link to="/calculadora-compra-mensual-rd" className="btn btn-primary btn-block">
                  Proyectar compra <ChevronRight size={16} />
                </Link>
              </div>
            </div>

            <div className="other-tools-list">
              <h4>Otras herramientas de supermercado</h4>
              <div className="other-tools-grid">
                <Link to="/cual-es-el-supermercado-mas-barato-de-rd" className="other-tool-item">
                  <div className="other-tool-icon" style={{ backgroundColor: 'var(--theme-light)', color: 'var(--theme-primary)' }}>
                    <TrendingDown size={18} />
                  </div>
                  <div className="other-tool-info">
                    <span className="other-tool-name">¿Cuál es más barato?</span>
                    <span className="other-tool-desc">Comparativa general de referencia</span>
                  </div>
                </Link>
                <Link to="/supermercados-por-ciudad-rd" className="other-tool-item">
                  <div className="other-tool-icon" style={{ backgroundColor: 'var(--theme-light)', color: 'var(--theme-primary)' }}>
                    <MapPin size={18} />
                  </div>
                  <div className="other-tool-info">
                    <span className="other-tool-name">Precios por Ciudad</span>
                    <span className="other-tool-desc">Alimentación en distintas provincias</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'finanzas' && (
          <div className="tab-pane animate-fade-in theme-finanzas">
            <div className="grid-3">
              {/* Featured Card 1 */}
              <div className="card card-hover tool-card">
                <div className="tool-icon" style={{ backgroundColor: 'var(--theme-light)', color: 'var(--theme-primary)' }}>
                  <DollarSign size={24} />
                </div>
                <h3>Presupuesto Mensual</h3>
                <p>Organiza tus ingresos e identifica tu capacidad de ahorro mediante la regla 50/30/20.</p>
                <Link to="/calculadora-presupuesto-mensual-rd" className="btn btn-primary btn-block">
                  Crear presupuesto <ChevronRight size={16} />
                </Link>
              </div>
              {/* Featured Card 2 */}
              <div className="card card-hover tool-card">
                <div className="tool-icon" style={{ backgroundColor: 'var(--theme-light)', color: 'var(--theme-primary)' }}>
                  <Wallet size={24} />
                </div>
                <h3>¿Me alcanza el sueldo?</h3>
                <p>Analiza si tus ingresos cubren tus compromisos y descubre tu balance mensual.</p>
                <Link to="/me-alcanza-el-sueldo" className="btn btn-primary btn-block">
                  Evaluar ingresos <ChevronRight size={16} />
                </Link>
              </div>
              {/* Featured Card 3 */}
              <div className="card card-hover tool-card text-theme">
                <div className="tool-icon" style={{ backgroundColor: 'var(--theme-light)', color: 'var(--theme-primary)' }}>
                  <TrendingUp size={24} />
                </div>
                <h3>Costo de Vida RD</h3>
                <p>Estima el dinero mensual necesario para vivir en el país de acuerdo a tus hábitos.</p>
                <Link to="/costo-de-vida-rd" className="btn btn-primary btn-block">
                  Calcular costo vida <ChevronRight size={16} />
                </Link>
              </div>
            </div>

            <div className="other-tools-list">
              <h4>Otras herramientas de finanzas y costo de vida</h4>
              <div className="other-tools-grid">
                <Link to="/cuanto-cuesta-vivir-solo-en-rd" className="other-tool-item">
                  <div className="other-tool-icon" style={{ backgroundColor: 'var(--theme-light)', color: 'var(--theme-primary)' }}>
                    <User size={18} />
                  </div>
                  <div className="other-tool-info">
                    <span className="other-tool-name">Vivir Solo en RD</span>
                    <span className="other-tool-desc">Gastos e independencia personal</span>
                  </div>
                </Link>
                <Link to="/cuanto-cuesta-vivir-en-pareja-rd" className="other-tool-item">
                  <div className="other-tool-icon" style={{ backgroundColor: 'var(--theme-light)', color: 'var(--theme-primary)' }}>
                    <Users size={18} />
                  </div>
                  <div className="other-tool-info">
                    <span className="other-tool-name">Vivir en Pareja</span>
                    <span className="other-tool-desc">División equitativa de gastos comunes</span>
                  </div>
                </Link>
                <Link to="/cuanto-cuesta-mantener-una-familia-rd" className="other-tool-item">
                  <div className="other-tool-icon" style={{ backgroundColor: 'var(--theme-light)', color: 'var(--theme-primary)' }}>
                    <Users size={18} />
                  </div>
                  <div className="other-tool-info">
                    <span className="other-tool-name">Mantener una Familia</span>
                    <span className="other-tool-desc">Costo aproximado de mantenimiento familiar</span>
                  </div>
                </Link>
                <Link to="/costo-de-vida-por-ciudad-rd" className="other-tool-item">
                  <div className="other-tool-icon" style={{ backgroundColor: 'var(--theme-light)', color: 'var(--theme-primary)' }}>
                    <MapPin size={18} />
                  </div>
                  <div className="other-tool-info">
                    <span className="other-tool-name">Costo por Ciudad</span>
                    <span className="other-tool-desc">Comparativa de provincias en RD</span>
                  </div>
                </Link>
                <Link to="/calculadora-ahorro-mensual-rd" className="other-tool-item">
                  <div className="other-tool-icon" style={{ backgroundColor: 'var(--theme-light)', color: 'var(--theme-primary)' }}>
                    <TrendingUp size={18} />
                  </div>
                  <div className="other-tool-info">
                    <span className="other-tool-name">Meta de Ahorro</span>
                    <span className="other-tool-desc">Planifica objetivos de ahorro mensual</span>
                  </div>
                </Link>
                <Link to="/deudas-vs-ingresos-rd" className="other-tool-item">
                  <div className="other-tool-icon" style={{ backgroundColor: 'var(--theme-light)', color: 'var(--theme-primary)' }}>
                    <ShieldAlert size={18} />
                  </div>
                  <div className="other-tool-info">
                    <span className="other-tool-name">Deudas vs Ingresos</span>
                    <span className="other-tool-desc">Tu ratio de endeudamiento financiero</span>
                  </div>
                </Link>
                <Link to="/cuanto-puedo-gastar-en-supermercado" className="other-tool-item">
                  <div className="other-tool-icon" style={{ backgroundColor: 'var(--theme-light)', color: 'var(--theme-primary)' }}>
                    <Percent size={18} />
                  </div>
                  <div className="other-tool-info">
                    <span className="other-tool-name">Gasto en Supermercado</span>
                    <span className="other-tool-desc">Presupuesto sugerido según tu sueldo</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'vehiculos' && (
          <div className="tab-pane animate-fade-in theme-vehiculos">
            <div className="grid-3">
              {/* Featured Card 1 */}
              <div className="card card-hover tool-card">
                <div className="tool-icon" style={{ backgroundColor: 'var(--theme-light)', color: 'var(--theme-primary)' }}>
                  <Car size={24} />
                </div>
                <h3>Préstamo de Vehículo</h3>
                <p>Calcula la cuota mensual aproximada según la tasa del préstamo y el plazo inicial.</p>
                <Link to="/calculadora-prestamo-vehiculo-rd" className="btn btn-primary btn-block">
                  Calcular préstamo <ChevronRight size={16} />
                </Link>
              </div>
              {/* Featured Card 2 */}
              <div className="card card-hover tool-card">
                <div className="tool-icon" style={{ backgroundColor: 'var(--theme-light)', color: 'var(--theme-primary)' }}>
                  <TrendingDown size={24} />
                </div>
                <h3>Costo de Mantener Carro</h3>
                <p>Suma combustible, seguro y mantenimiento para ver el costo mensual real de tu vehículo.</p>
                <Link to="/cuanto-cuesta-mantener-un-carro-en-rd" className="btn btn-primary btn-block">
                  Calcular costos <ChevronRight size={16} />
                </Link>
              </div>
              {/* Featured Card 3 */}
              <div className="card card-hover tool-card">
                <div className="tool-icon" style={{ backgroundColor: 'var(--theme-light)', color: 'var(--theme-primary)' }}>
                  <Fuel size={24} />
                </div>
                <h3>Consumo de Combustible</h3>
                <p>Estima tu gasto en gasolina o GLP basándote en la distancia recorrida semanalmente en RD.</p>
                <Link to="/calculadora-combustible-rd" className="btn btn-primary btn-block">
                  Calcular combustible <ChevronRight size={16} />
                </Link>
              </div>
            </div>

            <div className="other-tools-list">
              <h4>Otras herramientas para conductores</h4>
              <div className="other-tools-grid">
                <Link to="/seguro-y-mantenimiento-vehiculo-rd" className="other-tool-item">
                  <div className="other-tool-icon" style={{ backgroundColor: 'var(--theme-light)', color: 'var(--theme-primary)' }}>
                    <Shield size={18} />
                  </div>
                  <div className="other-tool-info">
                    <span className="other-tool-name">Seguro y Mantenimiento</span>
                    <span className="other-tool-desc">Gastos anuales preventivos y pólizas de ley</span>
                  </div>
                </Link>
                <Link to="/cuanto-debo-ganar-para-comprar-un-carro" className="other-tool-item">
                  <div className="other-tool-icon" style={{ backgroundColor: 'var(--theme-light)', color: 'var(--theme-primary)' }}>
                    <Wallet size={18} />
                  </div>
                  <div className="other-tool-info">
                    <span className="other-tool-name">¿Cuánto debo ganar?</span>
                    <span className="other-tool-desc">Ingreso recomendado para financiar tu auto</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'courier' && (
          <div className="tab-pane animate-fade-in theme-courier">
            <div className="grid-3">
              {/* Featured Card 1 */}
              <div className="card card-hover tool-card">
                <div className="tool-icon" style={{ backgroundColor: 'var(--theme-light)', color: 'var(--theme-primary)' }}>
                  <Package size={24} />
                </div>
                <h3>Calculadora Courier</h3>
                <p>Calcula el costo del flete por libra y aplica impuestos de aduana de ser necesario.</p>
                <Link to="/calculadora-courier-rd" className="btn btn-primary btn-block">
                  Calcular courier <ChevronRight size={16} />
                </Link>
              </div>
              {/* Featured Card 2 */}
              <div className="card card-hover tool-card">
                <div className="tool-icon" style={{ backgroundColor: 'var(--theme-light)', color: 'var(--theme-primary)' }}>
                  <ShoppingBag size={24} />
                </div>
                <h3>Calculadora Amazon</h3>
                <p>Estima el costo real de comprar en Amazon sumando flete a RD e impuestos correspondientes.</p>
                <Link to="/calculadora-amazon-rd" className="btn btn-primary btn-block">
                  Calcular Amazon <ChevronRight size={16} />
                </Link>
              </div>
              {/* Featured Card 3 */}
              <div className="card card-hover tool-card">
                <div className="tool-icon" style={{ backgroundColor: 'var(--theme-light)', color: 'var(--theme-primary)' }}>
                  <ShoppingBag size={24} />
                </div>
                <h3>Calculadora Shein</h3>
                <p>Proyecta tus pedidos en Shein sumando flete aproximado por libra de tu courier habitual.</p>
                <Link to="/calculadora-shein-rd" className="btn btn-primary btn-block">
                  Calcular Shein <ChevronRight size={16} />
                </Link>
              </div>
            </div>

            <div className="other-tools-list">
              <h4>Otras herramientas para compras en internet</h4>
              <div className="other-tools-grid">
                <Link to="/impuestos-paquetes-mas-de-200-dolares-rd" className="other-tool-item">
                  <div className="other-tool-icon" style={{ backgroundColor: 'var(--theme-light)', color: 'var(--theme-primary)' }}>
                    <DollarSign size={18} />
                  </div>
                  <div className="other-tool-info">
                    <span className="other-tool-name">Paquetes de más de US$200</span>
                    <span className="other-tool-desc">Arancel e ITBIS por exceder exención</span>
                  </div>
                </Link>
                <Link to="/comparador-courier-rd" className="other-tool-item">
                  <div className="other-tool-icon" style={{ backgroundColor: 'var(--theme-light)', color: 'var(--theme-primary)' }}>
                    <Scale size={18} />
                  </div>
                  <div className="other-tool-info">
                    <span className="other-tool-name">Comparador de Couriers</span>
                    <span className="other-tool-desc">Compara tarifas por libra entre proveedores</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'hogar' && (
          <div className="tab-pane animate-fade-in theme-hogar">
            <div className="grid-3">
              {/* Featured Card 1 */}
              <div className="card card-hover tool-card">
                <div className="tool-icon" style={{ backgroundColor: 'var(--theme-light)', color: 'var(--theme-primary)' }}>
                  <HomeIcon size={24} />
                </div>
                <h3>Servicios del Hogar</h3>
                <p>Suma y planifica el presupuesto mensual consolidado de luz, agua, gas y telecomunicaciones.</p>
                <Link to="/calculadora-servicios-hogar-rd" className="btn btn-primary btn-block">
                  Calcular servicios <ChevronRight size={16} />
                </Link>
              </div>
              {/* Featured Card 2 */}
              <div className="card card-hover tool-card">
                <div className="tool-icon" style={{ backgroundColor: 'var(--theme-light)', color: 'var(--theme-primary)' }}>
                  <Truck size={24} />
                </div>
                <h3>Mudarse y Equipar</h3>
                <p>Estima el dinero total inicial (depósitos de alquiler, flete y electrodomésticos) para mudarte.</p>
                <Link to="/cuanto-cuesta-mudarse-en-rd" className="btn btn-primary btn-block">
                  Calcular mudanza <ChevronRight size={16} />
                </Link>
              </div>
              {/* Featured Card 3 */}
              <div className="card card-hover tool-card">
                <div className="tool-icon" style={{ backgroundColor: 'var(--theme-light)', color: 'var(--theme-primary)' }}>
                  <FileText size={24} />
                </div>
                <h3>Pasaporte Dominicano</h3>
                <p>Calcula el presupuesto estimado para emitir o renovar tu pasaporte de 6 o 10 años.</p>
                <Link to="/cuanto-cuesta-renovar-pasaporte-dominicano" className="btn btn-primary btn-block">
                  Presupuesto pasaporte <ChevronRight size={16} />
                </Link>
              </div>
            </div>

            <div className="other-tools-list">
              <h4>Otras herramientas para el hogar y trámites oficiales</h4>
              <div className="other-tools-grid">
                <Link to="/calculadora-luz-rd" className="other-tool-item">
                  <div className="other-tool-icon" style={{ backgroundColor: 'var(--theme-light)', color: 'var(--theme-primary)' }}>
                    <Zap size={18} />
                  </div>
                  <div className="other-tool-info">
                    <span className="other-tool-name">Luz Mensual</span>
                    <span className="other-tool-desc">Estimador de consumo de electrodomésticos</span>
                  </div>
                </Link>
                <Link to="/calculadora-internet-telefono-rd" className="other-tool-item">
                  <div className="other-tool-icon" style={{ backgroundColor: 'var(--theme-light)', color: 'var(--theme-primary)' }}>
                    <Wifi size={18} />
                  </div>
                  <div className="other-tool-info">
                    <span className="other-tool-name">Internet y Conectividad</span>
                    <span className="other-tool-desc">Organizador de planes fijos, móviles y streaming</span>
                  </div>
                </Link>
                <Link to="/calculadora-gas-agua-rd" className="other-tool-item">
                  <div className="other-tool-icon" style={{ backgroundColor: 'var(--theme-light)', color: 'var(--theme-primary)' }}>
                    <Droplet size={18} />
                  </div>
                  <div className="other-tool-info">
                    <span className="other-tool-name">Gas y Agua</span>
                    <span className="other-tool-desc">Costos de cilindros de gas GLP y botellones</span>
                  </div>
                </Link>
                <Link to="/calculadora-tramites-rd" className="other-tool-item">
                  <div className="other-tool-icon" style={{ backgroundColor: 'var(--theme-light)', color: 'var(--theme-primary)' }}>
                    <BookOpen size={18} />
                  </div>
                  <div className="other-tool-info">
                    <span className="other-tool-name">Calculadora de Trámites</span>
                    <span className="other-tool-desc">Presupuesto para realizar múltiples diligencias</span>
                  </div>
                </Link>
                <Link to="/cuanto-cuesta-renovar-licencia-rd" className="other-tool-item">
                  <div className="other-tool-icon" style={{ backgroundColor: 'var(--theme-light)', color: 'var(--theme-primary)' }}>
                    <ShieldCheck size={18} />
                  </div>
                  <div className="other-tool-info">
                    <span className="other-tool-name">Licencia de Conducir</span>
                    <span className="other-tool-desc">Calcula tasa de renovación y multas</span>
                  </div>
                </Link>
                <Link to="/calculadora-marbete-rd" className="other-tool-item">
                  <div className="other-tool-icon" style={{ backgroundColor: 'var(--theme-light)', color: 'var(--theme-primary)' }}>
                    <Calendar size={18} />
                  </div>
                  <div className="other-tool-info">
                    <span className="other-tool-name">Marbete y Vehículo Legal</span>
                    <span className="other-tool-desc">Costo anual del impuesto de circulación</span>
                  </div>
                </Link>
                <Link to="/checklist-documentos-rd" className="other-tool-item">
                  <div className="other-tool-icon" style={{ backgroundColor: 'var(--theme-light)', color: 'var(--theme-primary)' }}>
                    <ListTodo size={18} />
                  </div>
                  <div className="other-tool-info">
                    <span className="other-tool-name">Checklist de Documentos</span>
                    <span className="other-tool-desc">Requisitos interactivos para tus trámites</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* How it works Section */}
      <section className="how-it-works card" style={{ marginTop: '3.5rem' }}>
        <h2 className="text-center" style={{ marginBottom: '2rem' }}>¿Cómo funciona?</h2>
        <div className="steps-row">
          <div className="step-col text-center">
            <div className="step-number">1</div>
            <h4>Elige una herramienta</h4>
            <p>Selecciona la calculadora o comparador adecuado para tus necesidades financieras.</p>
          </div>
          <div className="step-col text-center">
            <div className="step-number">2</div>
            <h4>Completa tus datos</h4>
            <p>Ingresa información aproximada de tu hogar, vehículo o compras sin registros.</p>
          </div>
          <div className="step-col text-center">
            <div className="step-number">3</div>
            <h4>Obtén tu estimado</h4>
            <p>Mira el presupuesto de referencia en RD$, con consejos de optimización de inmediato.</p>
          </div>
        </div>
      </section>

      {/* Disclaimer Box */}
      <DisclaimerBox type="finanzas" />

      {/* FAQ Section */}
      <FAQSection items={homeFAQ} />

      <AdSlot id="home-before-footer" placement="Inicio - Antes del Footer" />

      <style>{`
        .hero-section {
          position: relative;
          padding: 4.5rem 1.5rem;
          background: linear-gradient(135deg, #eff6ff 0%, #ffffff 50%, #f0fdf4 100%);
          border-radius: var(--radius-lg);
          margin-bottom: 2rem;
          border: 1px solid var(--border-color);
          overflow: hidden;
          box-shadow: 0 10px 30px -5px rgba(37, 99, 235, 0.05);
        }

        .hero-content-wrapper {
          position: relative;
          z-index: 5;
        }

        .hero-badge {
          display: inline-block;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--primary);
          background-color: var(--primary-light);
          padding: 0.35rem 0.85rem;
          border-radius: 30px;
          margin-bottom: 1.25rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .hero-blur-circle {
          position: absolute;
          width: 280px;
          height: 280px;
          border-radius: 50%;
          filter: blur(80px);
          z-index: 1;
          opacity: 0.12;
          pointer-events: none;
        }

        .hero-blur-circle.blue {
          top: -60px;
          left: -40px;
          background-color: var(--primary);
        }

        .hero-blur-circle.green {
          bottom: -60px;
          right: -40px;
          background-color: var(--success);
        }

        .hero-blur-circle.purple {
          top: 40%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: var(--costodevida-color);
        }

        .hero-subtitle {
          font-size: 1.15rem;
          color: var(--text-muted);
          max-width: 700px;
          margin: 0 auto 2rem auto;
          line-height: 1.6;
        }

        .hero-actions {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .tools-section {
          margin: 3rem 0;
        }

        .tool-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          height: 100%;
        }

        .tool-card h3 {
          margin: 1rem 0 0.5rem 0;
          font-size: 1.25rem;
        }

        .tool-card p {
          flex-grow: 1;
          margin-bottom: 1.5rem;
          font-size: 0.92rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        .tool-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.5rem;
        }

        .how-it-works {
          margin: 3rem 0;
          background-color: #ffffff;
        }

        .steps-row {
          display: flex;
          justify-content: space-around;
          gap: 2rem;
          position: relative;
        }

        .step-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .step-number {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: var(--primary);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          box-shadow: var(--shadow-md);
        }

        .step-col h4 {
          font-size: 1.15rem;
          margin-bottom: 0.5rem;
          color: var(--text-main);
        }

        .step-col p {
          font-size: 0.9rem;
          color: var(--text-muted);
          max-width: 250px;
          line-height: 1.5;
        }

        /* Tabs styling */
        .category-tabs-container {
          display: flex;
          justify-content: center;
          margin-bottom: 2.5rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
          -webkit-overflow-scrolling: touch;
        }

        .category-tabs {
          display: flex;
          background-color: var(--border-color);
          padding: 0.35rem;
          border-radius: 12px;
          gap: 0.25rem;
          white-space: nowrap;
        }

        .category-tab-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: none;
          padding: 0.6rem 1.2rem;
          border-radius: 8px;
          color: var(--text-muted);
          font-weight: 600;
          font-size: 0.92rem;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .category-tab-btn:hover {
          color: var(--primary);
        }

        .category-tab-btn.active {
          background-color: #ffffff;
          color: var(--primary);
          box-shadow: var(--shadow-sm);
        }
        
        .other-tools-list {
          margin-top: 2rem;
          background-color: #ffffff;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
        }

        .other-tools-list h4 {
          margin-top: 0;
          margin-bottom: 1.2rem;
          font-size: 1.1rem;
          color: var(--text-main);
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 0.5rem;
        }

        .other-tools-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 0.85rem;
        }

        .other-tool-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.65rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          transition: all var(--transition-fast);
          color: var(--text-main);
          text-decoration: none;
        }

        .other-tool-item:hover {
          background-color: var(--primary-light);
          border-color: var(--primary);
          transform: translateY(-1px);
        }

        .other-tool-icon {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .other-tool-info {
          display: flex;
          flex-direction: column;
        }

        .other-tool-name {
          font-weight: 600;
          font-size: 0.9rem;
        }

        .other-tool-desc {
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        .animate-fade-in {
          animation: fadeIn 0.25s ease-out forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 3rem 1rem;
          }
          .hero-subtitle {
            font-size: 1rem;
          }
          .hero-actions {
            flex-direction: column;
            align-items: stretch;
          }
          .hero-actions .btn {
            width: 100%;
          }
          .steps-row {
            flex-direction: column;
            gap: 1.5rem;
          }
          .category-tabs-container {
            justify-content: flex-start;
            padding-left: 0.5rem;
            padding-right: 0.5rem;
            scrollbar-width: none;
          }
          .category-tabs-container::-webkit-scrollbar {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
