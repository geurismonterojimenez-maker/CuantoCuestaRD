import {
  useState } from 'react';
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
  Users,
  RotateCcw,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Info
} from 'lucide-react';

export default function MantenerFamiliaRD() {
  const [cityId, setCityId] = useState('santo-domingo');
  const [adults, setAdults] = useState<string>('2');
  const [children, setChildren] = useState<string>('2');
  
  // Expenses
  const [vivienda, setVivienda] = useState<string>('');
  const [supermercado, setSupermercado] = useState<string>('');
  const [colegio, setColegio] = useState<string>('');
  const [transporte, setTransporte] = useState<string>('');
  const [salud, setSalud] = useState<string>('');
  const [servicios, setServicios] = useState<string>('');
  const [deudas, setDeudas] = useState<string>('');
  const [ahorro, setAhorro] = useState<string>('');
  const [otrosGastos, setOtrosGastos] = useState<string>('');

  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const familiaFAQs: FAQItem[] = [
    {
      question: '¿Cuánto cuesta mantener una familia de 4 personas en República Dominicana?',
      answer: 'Para una familia típica dominicana de dos adultos y dos niños, el costo promedio mensual oscila entre RD$ 55,000 y RD$ 95,000, dependiendo del tipo de vivienda, la elección entre colegio público o privado, el sector de residencia y el gasto en alimentación.'
    },
    {
      question: '¿Qué porcentaje del presupuesto familiar debe destinarse a la educación?',
      answer: 'Idealmente, la educación (colegio, útiles, uniformes y actividades) no debería superar el 15% al 20% del presupuesto familiar. Si es superior, se recomienda buscar opciones de colegios que se ajusten mejor a los ingresos familiares o evaluar opciones de becas.'
    },
    {
      question: '¿Cómo se pueden reducir los gastos del supermercado familiar en RD?',
      answer: 'Se recomienda realizar compras al por mayor de granos y productos de limpieza, comprar frutas y vegetales en mercados locales o ferias de productores, planificar el menú de la semana para evitar el desperdicio, y preferir marcas locales o de supermercados que suelen ser entre un 15% y 25% más económicas.'
    }
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': familiaFAQs.map((faq) => ({
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
    'name': 'Calculadora "¿Cuánto cuesta mantener una familia en RD?" - CuantoCuestaRD',
    'operatingSystem': 'All',
    'applicationCategory': 'FinanceApplication',
    'description': 'Estima el presupuesto mensual requerido para sostener una familia en República Dominicana según el número de miembros, gastos y ciudad.',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'DOP'
    }
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const valAdults = Number(adults);
    const valChildren = Number(children);

    if (isNaN(valAdults) || valAdults < 1) {
      setError('Debe haber al menos 1 adulto en el hogar.');
      return;
    }
    if (isNaN(valChildren) || valChildren < 0) {
      setError('La cantidad de niños no puede ser negativa.');
      return;
    }

    const inputs = [vivienda, supermercado, colegio, transporte, salud, servicios, deudas, ahorro, otrosGastos];
    if (inputs.some(val => Number(val) < 0)) {
      setError('Los montos ingresados no pueden ser negativos.');
      return;
    }

    const total = inputs.reduce((acc, curr) => acc + (Number(curr) || 0), 0);
    if (total === 0) {
      setError('Completa este campo para calcular: ingresa al menos algunos gastos.');
      return;
    }

    setShowResults(true);
  };

  const handleReset = () => {
    setCityId('santo-domingo');
    setAdults('2');
    setChildren('2');
    setVivienda('');
    setSupermercado('');
    setColegio('');
    setTransporte('');
    setSalud('');
    setServicios('');
    setDeudas('');
    setAhorro('');
    setOtrosGastos('');
    setError(null);
    setShowResults(false);
  };

  // Calculations
  const numAdults = Number(adults) || 1;
  const numChildren = Number(children) || 0;
  const totalMembers = numAdults + numChildren;

  const valViv = Number(vivienda) || 0;
  const valSuper = Number(supermercado) || 0;
  const valCol = Number(colegio) || 0;
  const valTrans = Number(transporte) || 0;
  const valSal = Number(salud) || 0;
  const valServ = Number(servicios) || 0;
  const valDeu = Number(deudas) || 0;
  const valAho = Number(ahorro) || 0;
  const valOtr = Number(otrosGastos) || 0;

  const totalCosto = valViv + valSuper + valCol + valTrans + valSal + valServ + valDeu + valAho + valOtr;
  const promedioPorMiembro = Math.round(totalCosto / totalMembers);

  // Suggested incomes
  const sueldoAjustado = totalCosto;
  const sueldoRecomendado = Math.round(totalCosto * 1.25);

  // Highest spending category
  const categoriesList = [
    { name: 'Vivienda (Alquiler/Hipoteca)', value: valViv, key: 'vivienda' },
    { name: 'Supermercado (Alimentos)', value: valSuper, key: 'supermercado' },
    { name: 'Colegio y Educación', value: valCol, key: 'colegio' },
    { name: 'Transporte', value: valTrans, key: 'transporte' },
    { name: 'Salud y Seguro', value: valSal, key: 'salud' },
    { name: 'Servicios Básicos', value: valServ, key: 'servicios' },
    { name: 'Préstamos y Deudas', value: valDeu, key: 'deudas' },
    { name: 'Ahorro Familiar', value: valAho, key: 'ahorro' },
    { name: 'Otros Gastos', value: valOtr, key: 'otros' }
  ];

  const highestCat = categoriesList.reduce((max, current) => {
    return current.value > max.value ? current : max;
  }, { name: 'Ninguno', value: 0, key: '' });

  // Custom advice depending on the highest category
  let adviceText = 'Tu presupuesto está equilibrado. Sigue organizando tus gastos mes a mes para mantener la estabilidad del hogar.';
  if (highestCat.key === 'vivienda') {
    adviceText = '¡El techo es lo primero! La vivienda es tu mayor gasto. Trata de que no supere el 35% de los ingresos totales de la casa. Si se te hace muy pesado, a largo plazo considera una zona con alquileres más asequibles o busca renegociar las condiciones si es posible.';
  } else if (highestCat.key === 'supermercado') {
    adviceText = '¡La comida se está llevando la tajada más grande! Para reducir el súper familiar en RD, planifica los menús semanales, prefiere marcas locales en vez de importadas y haz una lista antes de salir. Comprar la carne y los víveres en mercados locales te dará un gran respiro.';
  } else if (highestCat.key === 'colegio') {
    adviceText = 'La educación de los muchachos es una gran inversión, pero si pesa demasiado en tu bolsillo, planifica con anticipación las compras de útiles y uniformes. Compara opciones de transporte escolar compartido o busca alternativas educativas de calidad y menor costo en tu zona.';
  } else if (highestCat.key === 'transporte') {
    adviceText = 'El transporte está costando bastante. Si usas vehículo propio, planifica mejor las salidas del día para gastar menos combustible y haz mantenimientos preventivos a tiempo. Si usas transporte público, evalúa si te convienen bonos de transporte o rutas de concho fijas.';
  } else if (highestCat.key === 'salud') {
    adviceText = 'La salud es primordial. Asegúrate de que todos en casa estén de alta en un plan de seguro de salud (ARS) adecuado para amortiguar consultas y medicamentos. Pregunta siempre por medicamentos genéricos en las farmacias dominicanas, ya que hacen el mismo efecto y son mucho más económicos.';
  } else if (highestCat.key === 'servicios') {
    adviceText = 'Los servicios básicos están altos. Ponle ojo al consumo de energía eléctrica apagando los aires acondicionados y bombillos que no uses. Regula el uso del agua y revisa si tienes planes de internet/teléfono con servicios de más que puedas recortar.';
  } else if (highestCat.key === 'deudas') {
    adviceText = '¡Cuidado con las deudas! Pagar préstamos y tarjetas es tu mayor salida de dinero. Intenta consolidar deudas con una tasa de interés más baja, frena el uso de las tarjetas de crédito y no tomes nuevos préstamos hasta salir de los actuales.';
  } else if (highestCat.key === 'ahorro') {
    adviceText = '¡Excelente! Estás destinando una buena parte al ahorro familiar. Este fondo les servirá para emergencias, vacaciones o proyectos futuros. Sigan así para fortalecer la tranquilidad financiera del hogar.';
  } else if (highestCat.key === 'otros') {
    adviceText = 'Los gastos hormiga y misceláneos están sumando bastante. Registra con lupa en qué se va ese dinero "extra" (salidas, antojitos) y recorta un poco para destinarlo a ahorros o pagar deudas del hogar.';
  }

  const getCityLabel = () => {
    const city = CITIES.find(c => c.id === cityId);
    return city ? city.name : 'República Dominicana';
  };

  return (
    <div className="mantener-familia-page">
      <SEOHead 
        title="¿Cuánto cuesta mantener una familia en RD? | Calculadora Familiar"
        description="Calcula el costo mensual real para mantener a tu familia en la República Dominicana. Estima alquiler, súper, colegios, transporte y más."
        schema={[faqSchema, appSchema]}
      />

      <PageHero 
        category="costodevida"
        title="Mantener una Familia"
        description="Estima el costo de crianza, alimentación, educación y salud familiar en RD."
        icon={Users}
        chips={["familia","hijos","crianza"]}
      />

      <AdSlot id="familia-under-hero" placement="Mantener Familia - Debajo del Hero" />

      <div className="grid-2">
        {/* Form Column */}
        <div className="card">
          <h2>Información y Gastos del Hogar</h2>
          <p>Completa los campos con estimaciones de los costos de tu familia.</p>

          {error && (
            <div className="error-alert" role="alert">
              <AlertTriangle size={20} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleCalculate}>
            <div className="form-section-title">1. Composición del Hogar</div>
            
            <div className="form-group">
              <label htmlFor="city-select" className="form-label">Ciudad / Provincia de residencia:</label>
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

            <div className="grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-adults" className="form-label">Adultos en casa:</label>
                <input 
                  id="input-adults"
                  type="number"
                  className="form-control"
                  value={adults}
                  onChange={(e) => setAdults(e.target.value)}
                  min="1"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-children" className="form-label">Niños en casa:</label>
                <input 
                  id="input-children"
                  type="number"
                  className="form-control"
                  value={children}
                  onChange={(e) => setChildren(e.target.value)}
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="form-section-title">2. Vivienda y Servicios Fijos</div>

            <div className="grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-vivienda" className="form-label">Vivienda (Alquiler o Hipoteca) (RD$):</label>
                <input 
                  id="input-vivienda"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 18000"
                  value={vivienda}
                  onChange={(e) => setVivienda(e.target.value)}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-servicios" className="form-label">Servicios (Luz, agua, internet, cable) (RD$):</label>
                <input 
                  id="input-servicios"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 6000"
                  value={servicios}
                  onChange={(e) => setServicios(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div className="form-section-title">3. Alimentación y Día a Día</div>

            <div className="grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-supermercado" className="form-label">Supermercado (Alimentos/Compra) (RD$):</label>
                <input 
                  id="input-supermercado"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 16000"
                  value={supermercado}
                  onChange={(e) => setSupermercado(e.target.value)}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-transporte" className="form-label">Transporte (Combustible/Conchos) (RD$):</label>
                <input 
                  id="input-transporte"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 5000"
                  value={transporte}
                  onChange={(e) => setTransporte(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div className="form-section-title">4. Educación y Salud Familiar</div>

            <div className="grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-colegio" className="form-label">Colegios / Educación mensual (RD$):</label>
                <input 
                  id="input-colegio"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 7000"
                  value={colegio}
                  onChange={(e) => setColegio(e.target.value)}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-salud" className="form-label">Salud (Seguro médico, farmacia) (RD$):</label>
                <input 
                  id="input-salud"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 3000"
                  value={salud}
                  onChange={(e) => setSalud(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div className="form-section-title">5. Compromisos y Ahorro</div>

            <div className="grid-3" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
              <div className="form-group">
                <label htmlFor="input-deudas" className="form-label">Préstamos/Deudas (RD$):</label>
                <input 
                  id="input-deudas"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 4000"
                  value={deudas}
                  onChange={(e) => setDeudas(e.target.value)}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-ahorro" className="form-label">Ahorro mensual (RD$):</label>
                <input 
                  id="input-ahorro"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 3000"
                  value={ahorro}
                  onChange={(e) => setAhorro(e.target.value)}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-otros" className="form-label">Otros (Diversión) (RD$):</label>
                <input 
                  id="input-otros"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 4000"
                  value={otrosGastos}
                  onChange={(e) => setOtrosGastos(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button type="button" className="btn btn-secondary" onClick={handleReset} style={{ flex: 1 }}>
                <RotateCcw size={18} /> Limpiar
              </button>
              <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
                Calcular presupuesto familiar
              </button>
            </div>
          </form>
        </div>

        {/* Results Column */}
        <div className="results-column">
          {showResults ? (
            <div className="card result-card" style={{ height: '100%' }}>
              <h2>Presupuesto Familiar Estimado</h2>

              <div className="main-cost-display" style={{ padding: '1.25rem 1rem' }}>
                <span className="main-cost-title">Costo Familiar Mensual Total</span>
                <span className="main-cost-value">
                  RD$ {totalCosto.toLocaleString()}
                </span>
              </div>

              <div className="diagnostic-badge-wrapper text-center" style={{ margin: '1rem 0' }}>
                <span className="diagnostic-badge diag-blue" style={{ fontSize: '1rem', padding: '0.5rem 1.25rem' }}>
                  <Users size={16} style={{ marginRight: '0.5rem', display: 'inline', verticalAlign: 'middle' }} />
                  Costo promedio por miembro: <strong>RD$ {promedioPorMiembro.toLocaleString()}</strong>
                </span>
              </div>

              {/* Dominican Quote Phrase */}
              <div className="dominican-quote" style={{ borderLeftColor: 'var(--primary)' }}>
                <p>
                  "Para mantener un hogar con <strong>{numAdults} {numAdults === 1 ? 'adulto' : 'adultos'}</strong> y <strong>{numChildren} {numChildren === 1 ? 'niño' : 'niños'}</strong> en <strong>{getCityLabel()}</strong> cubriendo estos gastos, la familia necesita aproximadamente <strong>RD$ {sueldoAjustado.toLocaleString()} netos mensuales</strong>. 
                  Para tener mayor respiro familiar ante imprevistos, se recomienda un ingreso conjunto de <strong>RD$ {sueldoRecomendado.toLocaleString()} mensuales</strong>."
                </p>
              </div>

              {/* Highlight Major Expenditure Category */}
              {highestCat.value > 0 && (
                <div className="warning-alert" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', backgroundColor: 'var(--primary-light)', borderColor: 'var(--primary)', color: 'var(--text-main)', margin: '1.5rem 0', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--primary)' }}>
                    <TrendingUp size={20} />
                    <span>Mayor Gasto Detectado: {highestCat.name}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                    Representa el <strong>{Math.round((highestCat.value / totalCosto) * 100)}%</strong> del presupuesto total de la casa.
                  </p>
                </div>
              )}

              {/* Personalized Family Advice */}
              <div className="recommendation-box" style={{ margin: '1.5rem 0' }}>
                <h3 className="flex-between">
                  <span>Recomendación Familiar:</span>
                  <Info size={18} />
                </h3>
                <p>{adviceText}</p>
              </div>

              {/* Cross Connections */}
              <div className="connections-actions" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '1.5rem 0' }}>
                {valSuper > 0 && (
                  <Link to="/comparador-supermercados-rd" className="btn btn-secondary btn-block">
                    Cotizar alimentos en Comparador de Supermercados <ArrowRight size={16} />
                  </Link>
                )}
                <Link to="/me-alcanza-el-sueldo" className="btn btn-success btn-block">
                  ¿Nos alcanza el sueldo familiar? Probar aquí <ArrowRight size={16} />
                </Link>
              </div>

              <AdSlot id="familia-after-results" placement="Mantener Familia - Después de Resultados" />

              <div className="financial-disclaimer" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '1rem' }}>
                <p><strong>Nota aclaratoria:</strong> Estos cálculos son estimados y tienen fines informativos. Los costos pueden variar según la ciudad, zona, estilo de vida, familia, deudas y precios actuales.</p>
              </div>
            </div>
          ) : (
            <EmptyStateCard
              title="Presupuesto Familiar"
              description="Completa la composición de tu familia y estima tus gastos mensuales para conocer el total, promedio por miembro y sugerencias financieras personalizadas."
              icon={Users}
            />
          )}
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <DisclaimerBox type="finanzas" />
      </div>

      <AdSlot id="familia-before-faq" placement="Mantener Familia - Antes del FAQ" />

      <div className="card" style={{ marginTop: '2rem' }}>
        <FAQSection items={familiaFAQs} />
      </div>

      <AdSlot id="familia-before-footer" placement="Mantener Familia - Antes del Footer" />

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
