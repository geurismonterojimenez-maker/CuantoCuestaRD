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
  Scale
} from 'lucide-react';

export default function VivirParejaRD() {
  const [incomeP1, setIncomeP1] = useState<string>('');
  const [incomeP2, setIncomeP2] = useState<string>('');
  const [cityId, setCityId] = useState('santo-domingo');
  const [divisionMethod, setDivisionMethod] = useState<'equitativo' | 'proporcional'>('proporcional'); // equitativo (50/50), proporcional (según ingresos)

  // Gastos
  const [alquiler, setAlquiler] = useState<string>('');
  const [supermercado, setSupermercado] = useState<string>('');
  const [transporte, setTransporte] = useState<string>('');
  const [servicios, setServicios] = useState<string>('');
  const [deudas, setDeudas] = useState<string>('');
  const [ahorro, setAhorro] = useState<string>('');
  const [otrosGastos, setOtrosGastos] = useState<string>('');

  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  const vivirParejaFAQs: FAQItem[] = [
    {
      question: '¿Qué es mejor: dividir los gastos en pareja 50/50 o de forma proporcional?',
      answer: 'Depende de la diferencia de ingresos. Si ambos ganan similar, la división 50/50 es la más simple. Sin embargo, si uno gana significativamente más, la división proporcional a los ingresos evita que el miembro con menor sueldo quede ahogado financieramente.'
    },
    {
      question: '¿Cómo funciona el aporte proporcional?',
      answer: 'Se suma el ingreso combinado y se calcula qué porcentaje representa el salario de cada uno. Luego, ese mismo porcentaje se aplica al pago del gasto total. Por ejemplo, si una persona aporta el 65% de los ingresos, le corresponde pagar el 65% del presupuesto compartido.'
    },
    {
      question: '¿Conviene tener una cuenta bancaria en conjunto?',
      answer: 'Es una excelente práctica en RD. Abrir una cuenta compartida para depositar exclusivamente los aportes mensuales de alquiler, servicios y supermercado evita fricciones, manteniendo cuentas individuales para gastos personales privados.'
    }
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': vivirParejaFAQs.map((faq) => ({
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
    'name': 'Calculadora para Vivir en Pareja en RD - CuantoCuestaRD',
    'operatingSystem': 'All',
    'applicationCategory': 'FinanceApplication',
    'description': 'Calcula los gastos compartidos de vivir en pareja en República Dominicana y divide el presupuesto de forma justa o equitativa.',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'DOP'
    }
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const valP1 = Number(incomeP1);
    const valP2 = Number(incomeP2);

    if (!incomeP1 || !incomeP2 || valP1 <= 0 || valP2 <= 0) {
      setError('Completa este campo para calcular: los ingresos de ambas personas deben ser mayores que cero.');
      return;
    }

    const inputs = [alquiler, supermercado, transporte, servicios, deudas, ahorro, otrosGastos];
    if (inputs.some(val => Number(val) < 0)) {
      setError('Los montos ingresados no pueden ser negativos.');
      return;
    }

    const total = inputs.reduce((acc, curr) => acc + (Number(curr) || 0), 0);
    if (total === 0) {
      setError('Ingresa al menos algunos gastos para realizar el cálculo.');
      return;
    }

    setShowResults(true);
  };

  const handleReset = () => {
    setIncomeP1('');
    setIncomeP2('');
    setCityId('santo-domingo');
    setDivisionMethod('proporcional');
    setAlquiler('');
    setSupermercado('');
    setTransporte('');
    setServicios('');
    setDeudas('');
    setAhorro('');
    setOtrosGastos('');
    setError(null);
    setShowResults(false);
  };

  // Calculations
  const valP1 = Number(incomeP1) || 0;
  const valP2 = Number(incomeP2) || 0;
  const combinedIncome = valP1 + valP2;

  const valAlq = Number(alquiler) || 0;
  const valSuper = Number(supermercado) || 0;
  const valTrans = Number(transporte) || 0;
  const valServ = Number(servicios) || 0;
  const valDeudas = Number(deudas) || 0;
  const valAhorro = Number(ahorro) || 0;
  const valOtros = Number(otrosGastos) || 0;

  const totalGastoPareja = valAlq + valSuper + valTrans + valServ + valDeudas + valAhorro + valOtros;
  const combinedFree = combinedIncome - totalGastoPareja;
  const comprometidoPct = combinedIncome > 0 ? Math.round((totalGastoPareja / combinedIncome) * 100) : 0;

  // Division calculations
  let contributionP1 = 0;
  let contributionP2 = 0;
  let pctP1 = 50;
  let pctP2 = 50;

  if (divisionMethod === 'equitativo') {
    contributionP1 = Math.round(totalGastoPareja / 2);
    contributionP2 = Math.round(totalGastoPareja / 2);
  } else {
    // Proportional
    pctP1 = combinedIncome > 0 ? Math.round((valP1 / combinedIncome) * 100) : 50;
    pctP2 = 100 - pctP1;
    contributionP1 = Math.round(totalGastoPareja * (valP1 / combinedIncome));
    contributionP2 = Math.round(totalGastoPareja * (valP2 / combinedIncome));
  }

  // Diagnostic
  let diagnosticClass = 'diag-green';
  let diagnosticText = 'Cómodo';
  let diagnosticAdvice = '¡Presupuesto saludable! Tienen margen libre combinado para ahorros adicionales o salidas especiales. Se aconseja consolidar un fondo de emergencias común.';

  if (comprometidoPct > 90) {
    diagnosticClass = 'diag-red';
    diagnosticText = 'Crítico / En Riesgo';
    diagnosticAdvice = 'Sus gastos compartidos consumen casi todos sus ingresos conjuntos. Están expuestos a un alto riesgo financiero. Deben recortar ocio, buscar un supermercado más económico o de ser posible cambiar a un alquiler menor.';
  } else if (comprometidoPct > 70) {
    diagnosticClass = 'diag-orange';
    diagnosticText = 'Ajustado';
    diagnosticAdvice = 'Presupuesto ajustado. Les queda poco margen libre mensual. Eviten tomar deudas nuevas y planifiquen sus menús de comida semanales para ahorrar.';
  }

  return (
    <div className="vivir-pareja-page">
      <SEOHead 
        title="Cuánto cuesta vivir en pareja en RD"
        description="Calcula los gastos mensuales de vivir en pareja en RD y divide el presupuesto de forma justa según los ingresos."
        schema={[faqSchema, appSchema]}
      />

      <PageHero 
        category="costodevida"
        title="Vivir en Pareja"
        description="Calcula y divide equitativamente o de forma proporcional a los ingresos los gastos compartidos."
        icon={Users}
        chips={["pareja","boda","vivir juntos"]}
      />

      <AdSlot id="pareja-under-hero" placement="Pareja - Debajo del Hero" />

      <div className="grid-2">
        {/* Form Column */}
        <div className="card">
          <h2>Ingresos y Presupuesto del Hogar</h2>
          <p>Llena los sueldos mensuales netos de cada uno y los gastos comunes proyectados en RD$.</p>

          {error && (
            <div className="error-alert" role="alert">
              <AlertTriangle size={20} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleCalculate}>
            <div className="grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-income-p1" className="form-label">Sueldo Persona 1 (RD$): *</label>
                <input 
                  id="input-income-p1"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 45000"
                  value={incomeP1}
                  onChange={(e) => setIncomeP1(e.target.value)}
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-income-p2" className="form-label">Sueldo Persona 2 (RD$): *</label>
                <input 
                  id="input-income-p2"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 35000"
                  value={incomeP2}
                  onChange={(e) => setIncomeP2(e.target.value)}
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="city-select" className="form-label">Ciudad / Provincia:</label>
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
                <span className="form-label">Método de División:</span>
                <div className="flex-between" style={{ gap: '0.5rem', marginTop: '0.25rem' }}>
                  <button 
                    type="button"
                    className={`btn ${divisionMethod === 'equitativo' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setDivisionMethod('equitativo')}
                    style={{ flex: 1, minHeight: '40px', padding: '0.25rem 0.5rem', fontSize: '0.95rem' }}
                  >
                    Mitad (50/50)
                  </button>
                  <button 
                    type="button"
                    className={`btn ${divisionMethod === 'proporcional' ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setDivisionMethod('proporcional')}
                    style={{ flex: 1, minHeight: '40px', padding: '0.25rem 0.5rem', fontSize: '0.95rem' }}
                  >
                    Proporcional
                  </button>
                </div>
              </div>
            </div>

            <div className="form-section-title">Gastos del Hogar Compartidos</div>

            <div className="grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-alquiler" className="form-label">Alquiler mensual (RD$):</label>
                <input 
                  id="input-alquiler"
                  type="number"
                  className="form-control"
                  placeholder="0"
                  value={alquiler}
                  onChange={(e) => setAlquiler(e.target.value)}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-super" className="form-label">Supermercado común (RD$):</label>
                <input 
                  id="input-super"
                  type="number"
                  className="form-control"
                  placeholder="0"
                  value={supermercado}
                  onChange={(e) => setSupermercado(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div className="grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-transporte" className="form-label">Transporte colectivo / Combustible:</label>
                <input 
                  id="input-transporte"
                  type="number"
                  className="form-control"
                  placeholder="0"
                  value={transporte}
                  onChange={(e) => setTransporte(e.target.value)}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-servicios" className="form-label">Servicios básicos (Luz, Internet):</label>
                <input 
                  id="input-servicios"
                  type="number"
                  className="form-control"
                  placeholder="0"
                  value={servicios}
                  onChange={(e) => setServicios(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div className="grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-deudas" className="form-label">Deudas conjuntas (Préstamos):</label>
                <input 
                  id="input-deudas"
                  type="number"
                  className="form-control"
                  placeholder="0"
                  value={deudas}
                  onChange={(e) => setDeudas(e.target.value)}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-ahorro" className="form-label">Ahorro en conjunto:</label>
                <input 
                  id="input-ahorro"
                  type="number"
                  className="form-control"
                  placeholder="0"
                  value={ahorro}
                  onChange={(e) => setAhorro(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="input-otros" className="form-label">Otros (Salidas, Ocio, Varios):</label>
              <input 
                id="input-otros"
                type="number"
                className="form-control"
                placeholder="0"
                value={otrosGastos}
                onChange={(e) => setOtrosGastos(e.target.value)}
                min="0"
              />
            </div>

            <div className="step-actions flex-between" style={{ gap: '1rem' }}>
              <button type="button" className="btn btn-secondary" onClick={handleReset} style={{ flex: 1 }}>
                <RotateCcw size={18} /> Limpiar
              </button>
              <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
                Calcular aportes
              </button>
            </div>
          </form>
        </div>

        {/* Results Column */}
        <div className="results-column">
          {showResults ? (
            <div className="card result-card" style={{ height: '100%' }}>
              <h2>Aportes de la Pareja</h2>

              <div className="main-cost-display" style={{ padding: '1.25rem 1rem' }}>
                <span className="main-cost-title">Gasto Mensual Compartido</span>
                <span className="main-cost-value">
                  RD$ {totalGastoPareja.toLocaleString()}
                </span>
              </div>

              <div className="diagnostic-badge-wrapper text-center">
                <span className={`diagnostic-badge ${diagnosticClass}`}>
                  Presupuesto {diagnosticText}
                </span>
              </div>

              {/* Dominican phrasing example */}
              <div className="dominican-quote" style={{ borderLeftColor: 'var(--primary)' }}>
                <p>
                  "Si una persona gana <strong>RD$ {valP1.toLocaleString()}</strong> y la otra <strong>RD$ {valP2.toLocaleString()}</strong>, puede ser más justo dividir los gastos proporcionalmente según los ingresos."
                </p>
              </div>

              {/* Aportes Detallados */}
              <div className="contributions-box" style={{ marginBottom: '1.5rem', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '12px', backgroundColor: '#f8fafc' }}>
                <h3 style={{ fontSize: '1.05rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Scale size={18} className="text-primary" />
                  División de Gastos ({divisionMethod === 'equitativo' ? 'Equitativo 50/50' : 'Proporcional'})
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                    <div>
                      <strong>Aporte Persona 1:</strong>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Paga el {pctP1}% del hogar</div>
                    </div>
                    <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      RD$ {contributionP1.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex-between">
                    <div>
                      <strong>Aporte Persona 2:</strong>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Paga el {pctP2}% del hogar</div>
                    </div>
                    <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>
                      RD$ {contributionP2.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Combined Metrics */}
              <div className="grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                <div className="freq-box">
                  <span className="freq-label">Dinero Libre Combinado</span>
                  <span className="freq-val" style={{ fontSize: '1.15rem', color: combinedFree < 0 ? 'var(--danger)' : 'var(--success)' }}>
                    RD$ {combinedFree.toLocaleString()}
                  </span>
                </div>
                <div className="freq-box">
                  <span className="freq-label">Ingresos Totales</span>
                  <span className="freq-val" style={{ fontSize: '1.15rem' }}>RD$ {combinedIncome.toLocaleString()}</span>
                </div>
              </div>

              <div className="recommendation-box">
                <h3 className="flex-between">
                  <span>Diagnóstico del Hogar:</span>
                  <Users size={18} />
                </h3>
                <p>{diagnosticAdvice}</p>
              </div>

              {/* Connections Action Buttons */}
              <div className="connections-actions" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.5rem' }}>
                {valSuper > 0 && (
                  <Link to="/comparador-supermercados-rd" className="btn btn-secondary btn-block">
                    Cotizar súper en Comparador de Supermercados <ArrowRight size={16} />
                  </Link>
                )}
                <Link to="/me-alcanza-el-sueldo" className="btn btn-success btn-block">
                  Evaluar salud individual en "¿Me alcanza el sueldo?" <ArrowRight size={16} />
                </Link>
              </div>

              <AdSlot id="pareja-after-results" placement="Pareja - Después de Resultados" />

              <div className="financial-disclaimer" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '1rem' }}>
                <p><strong>Nota aclaratoria:</strong> Estos cálculos son estimados y tienen fines informativos. Los costos pueden variar según la ciudad, zona, estilo de vida, familia, deudas y precios actuales.</p>
              </div>
            </div>
          ) : (
            <EmptyStateCard
              title="Planifiquen en Pareja"
              description="Completen los sueldos de ambos y el presupuesto del hogar a la izquierda para comparar la división justa proporcional contra el 50/50 y conocer el dinero libre combinado."
              icon={Users}
            />
          )}
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <DisclaimerBox type="finanzas" />
      </div>

      <AdSlot id="pareja-before-faq" placement="Pareja - Antes del FAQ" />

      <div className="card" style={{ marginTop: '2rem' }}>
        <FAQSection items={vivirParejaFAQs} />
      </div>

      <AdSlot id="pareja-before-footer" placement="Pareja - Antes del Footer" />

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
