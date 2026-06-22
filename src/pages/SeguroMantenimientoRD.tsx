import {
  useState,
  useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import PageHero from '../components/PageHero';
import EmptyStateCard from '../components/EmptyStateCard';
import DisclaimerBox from '../components/DisclaimerBox';
import AdSlot from '../components/AdSlot';
import FAQSection,
  { type FAQItem } from '../components/FAQSection';
import { 
  RotateCcw,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Info,
  Shield
} from 'lucide-react';

const DEFAULT_MAINTENANCE: Record<string, { mant: string; gomas: string; rep: string }> = {
  compacto: { mant: '1200', gomas: '10000', rep: '8000' },
  jeepeta: { mant: '2000', gomas: '18000', rep: '12000' },
  camioneta: { mant: '2500', gomas: '22000', rep: '15000' },
  minivan: { mant: '2200', gomas: '16000', rep: '14000' },
  motor: { mant: '500', gomas: '4000', rep: '3000' }
};

export default function SeguroMantenimientoRD() {
  const [vehiculoType, setVehiculoType] = useState<string>('compacto');
  const [anio, setAnio] = useState<string>('2018');
  const [valorVehiculo, setValorVehiculo] = useState<string>('600000');
  const [seguroType, setSeguroType] = useState<'ley' | 'basico' | 'full'>('full');
  
  // Expenses
  const [mantenimiento, setMantenimiento] = useState<string>(DEFAULT_MAINTENANCE.compacto.mant);
  const [reparacionesAnual, setReparacionesAnual] = useState<string>(DEFAULT_MAINTENANCE.compacto.rep);
  const [gomasAnual, setGomasAnual] = useState<string>(DEFAULT_MAINTENANCE.compacto.gomas);

  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);

  // Update presets when vehicle type changes
  useEffect(() => {
    const preset = DEFAULT_MAINTENANCE[vehiculoType];
    if (preset) {
      setMantenimiento(preset.mant);
      setReparacionesAnual(preset.rep);
      setGomasAnual(preset.gomas);
    }
  }, [vehiculoType]);

  const faqItems: FAQItem[] = [
    {
      question: '¿Cuánto cuesta un seguro Full en la República Dominicana?',
      answer: 'Un seguro Full para vehículo suele costar entre el 3% y el 4.5% del valor comercial del vehículo al año. Por ejemplo, para un carro de RD$ 600,000, el seguro Full podría rondar entre RD$ 18,000 y RD$ 27,000 anuales (unos RD$ 1,500 a RD$ 2,250 mensuales).'
    },
    {
      question: '¿Qué cubre el Seguro de Ley en RD?',
      answer: 'El seguro de Ley es el mínimo obligatorio por las leyes dominicanas. Cubre únicamente los daños físicos o materiales que ocasiones a terceros en un accidente de tránsito. No cubre los daños de tu propio vehículo, grúa ni asistencia vial.'
    },
    {
      question: '¿Con qué frecuencia se debe hacer mantenimiento al vehículo?',
      answer: 'Se recomienda realizar un mantenimiento preventivo (cambio de aceite, filtro de motor, inspección de frenos y fluidos) cada 5,000 kilómetros o cada 3 meses, lo que ocurra primero, para evitar averías mayores.'
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
    'name': 'Calculadora de Seguro y Mantenimiento de Vehículo RD - CuantoCuestaRD',
    'operatingSystem': 'All',
    'applicationCategory': 'FinanceApplication',
    'description': 'Estima cuánto apartar mensualmente para el seguro, mantenimiento, reparaciones y gomas de tu carro en RD.',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'DOP'
    }
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const valValor = Number(valorVehiculo) || 0;
    const valAnio = Number(anio) || 0;
    const valMant = Number(mantenimiento) || 0;
    const valRep = Number(reparacionesAnual) || 0;
    const valGomas = Number(gomasAnual) || 0;

    if (valValor <= 0) {
      setError('Por favor, ingresa el valor comercial del vehículo.');
      return;
    }
    if (valAnio <= 1900 || valAnio > new Date().getFullYear() + 1) {
      setError('Por favor, ingresa un año de fabricación válido.');
      return;
    }
    if (valMant < 0 || valRep < 0 || valGomas < 0) {
      setError('Los montos ingresados no pueden ser negativos.');
      return;
    }

    setShowResults(true);
  };

  const handleReset = () => {
    setVehiculoType('compacto');
    setAnio('2018');
    setValorVehiculo('600000');
    setSeguroType('full');
    setMantenimiento(DEFAULT_MAINTENANCE.compacto.mant);
    setReparacionesAnual(DEFAULT_MAINTENANCE.compacto.rep);
    setGomasAnual(DEFAULT_MAINTENANCE.compacto.gomas);
    setError(null);
    setShowResults(false);
  };

  // Calculations
  const valValor = Number(valorVehiculo) || 0;
  const valAnio = Number(anio) || 0;
  const valMant = Number(mantenimiento) || 0;
  const valRep = Number(reparacionesAnual) || 0;
  const valGomas = Number(gomasAnual) || 0;

  // Seguro mensual estimate
  let seguroMensual = 500; // default Ley
  if (seguroType === 'basico') {
    seguroMensual = Math.max(1000, Math.round((valValor * 0.015) / 12));
  } else if (seguroType === 'full') {
    seguroMensual = Math.max(1500, Math.round((valValor * 0.035) / 12));
  }

  const fondoReparacionesMensual = Math.round((valRep + valGomas) / 12);
  const totalCostoMensual = seguroMensual + valMant + fondoReparacionesMensual;
  const totalCostoAnual = totalCostoMensual * 12;

  // Custom advice
  const isOldCar = valAnio < 2018;
  const adviceText = isOldCar
    ? `Al tratarse de un vehículo del año ${valAnio} (con más de 8 años de antigüedad), las posibilidades de fallos mecánicos imprevistos aumentan. Te sugerimos incrementar el fondo recomendado para reparaciones a por lo menos RD$ 1,500 o RD$ 2,000 mensuales adicionales para evitar sorpresas en el taller.`
    : `Para un vehículo relativamente moderno (año ${valAnio}), el costo de mantenimiento preventivo a tiempo es la mejor forma de asegurar su valor. Mantener el fondo sugerido de reparaciones te permitirá cambiar piezas de desgaste (pastillas de freno, bujías) sin desequilibrar tus gastos del mes.`;

  return (
    <div className="seguro-mantenimiento-page">
      <SEOHead 
        title="Seguro y Mantenimiento de Vehículo RD"
        description="Estima cuánto apartar para seguro, mantenimiento, reparaciones y gomas de tu vehículo en República Dominicana."
        schema={[faqSchema, appSchema]}
      />

      <PageHero 
        category="vehiculos"
        title="Seguro y Mantenimiento"
        description="Estima los gastos preventivos de tu carro (seguro de ley, gomas, aceite, revisiones)."
        icon={Shield}
        chips={["seguro","mantenimiento","ley"]}
      />

      <AdSlot id="seguro-under-hero" placement="Seguro/Mantenimiento - Debajo del Hero" />

      <div className="grid-2">
        {/* Form Column */}
        <div className="card">
          <h2>Ficha del Vehículo y Gastos</h2>
          <p>Llena la información de tu carro para obtener estimaciones sugeridas.</p>

          {error && (
            <div className="error-alert" role="alert">
              <AlertTriangle size={20} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleCalculate}>
            <div className="form-section-title">1. Datos del Vehículo</div>

            <div className="grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="select-vehiculo-type" className="form-label">Tipo de Vehículo:</label>
                <select 
                  id="select-vehiculo-type" 
                  className="form-control" 
                  value={vehiculoType} 
                  onChange={(e) => setVehiculoType(e.target.value)}
                >
                  <option value="compacto">Carro compacto</option>
                  <option value="jeepeta">Jeepeta / SUV</option>
                  <option value="camioneta">Camioneta</option>
                  <option value="minivan">Minivan / Familiar</option>
                  <option value="motor">Motocicleta / Motor</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="input-anio" className="form-label">Año de fabricación: *</label>
                <input 
                  id="input-anio"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 2018"
                  value={anio}
                  onChange={(e) => setAnio(e.target.value)}
                  min="1950"
                  required
                />
              </div>
            </div>

            <div className="grid-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div className="form-group">
                <label htmlFor="input-valor" className="form-label">Valor comercial aprox. (RD$): *</label>
                <input 
                  id="input-valor"
                  type="number"
                  className="form-control"
                  placeholder="Ej. 600000"
                  value={valorVehiculo}
                  onChange={(e) => setValorVehiculo(e.target.value)}
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="select-seguro-type" className="form-label">Tipo de Seguro:</label>
                <select 
                  id="select-seguro-type" 
                  className="form-control" 
                  value={seguroType} 
                  onChange={(e) => setSeguroType(e.target.value as 'ley' | 'basico' | 'full')}
                >
                  <option value="ley">Seguro de Ley (Mínimo obligatorio)</option>
                  <option value="basico">Seguro Básico / Semi-Full</option>
                  <option value="full">Seguro Full (Recomendado)</option>
                </select>
              </div>
            </div>

            <div className="form-section-title">2. Gastos de Mantenimiento Estimados</div>

            <div className="grid-3" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
              <div className="form-group">
                <label htmlFor="input-mantenimiento" className="form-label">Mantenimiento mensual:</label>
                <input 
                  id="input-mantenimiento"
                  type="number"
                  className="form-control"
                  value={mantenimiento}
                  onChange={(e) => setMantenimiento(e.target.value)}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-rep" className="form-label">Averías/Reparación anual:</label>
                <input 
                  id="input-rep"
                  type="number"
                  className="form-control"
                  value={reparacionesAnual}
                  onChange={(e) => setReparacionesAnual(e.target.value)}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-gomas" className="form-label">Gomas anual estimado:</label>
                <input 
                  id="input-gomas"
                  type="number"
                  className="form-control"
                  value={gomasAnual}
                  onChange={(e) => setGomasAnual(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button type="button" className="btn btn-secondary" onClick={handleReset} style={{ flex: 1 }}>
                <RotateCcw size={18} /> Limpiar
              </button>
              <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
                Calcular seguro y taller
              </button>
            </div>
          </form>
        </div>

        {/* Results Column */}
        <div className="results-column">
          {showResults ? (
            <div className="card result-card" style={{ height: '100%' }}>
              <h2>Reserva Mensual Sugerida</h2>

              <div className="main-cost-display" style={{ padding: '1.25rem 1rem' }}>
                <span className="main-cost-title">Total Mensual Recomendado a Apartar</span>
                <span className="main-cost-value">
                  RD$ {totalCostoMensual.toLocaleString()}
                </span>
                
                <span className="main-cost-title" style={{ marginTop: '0.75rem' }}>Costo Total de Conservación Anual</span>
                <span className="main-cost-value" style={{ fontSize: '1.4rem', color: 'var(--text-muted)' }}>
                  RD$ {totalCostoAnual.toLocaleString()}
                </span>
              </div>

              {/* Dominican Quote Phrase */}
              <div className="dominican-quote" style={{ borderLeftColor: 'var(--primary)', margin: '1.5rem 0' }}>
                <p>
                  "Para una {vehiculoType === 'motor' ? 'motocicleta' : 'jeepeta/carro'} del año <strong>{anio}</strong> con un valor de <strong>RD$ {valValor.toLocaleString()}</strong>, es recomendable apartar un monto mensual de aproximadamente <strong>RD$ {totalCostoMensual.toLocaleString()}</strong> para seguro y mantenimientos, aunque el vehículo esté en perfectas condiciones actuales."
                </p>
              </div>

              {/* Breakdown */}
              <div className="budget-rules-breakdown" style={{ margin: '1.5rem 0' }}>
                <h3>Desglose del Costo Mensual</h3>
                <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Seguro del carro estimado:</span>
                  <span style={{ fontWeight: 600 }}>RD$ {seguroMensual.toLocaleString()} / mes</span>
                </div>
                <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Mantenimiento preventivo mensual:</span>
                  <span style={{ fontWeight: 600 }}>RD$ {valMant.toLocaleString()} / mes</span>
                </div>
                <div className="flex-between">
                  <span style={{ color: 'var(--text-muted)' }}>Fondo amortizado para gomas/talleres:</span>
                  <span style={{ fontWeight: 600 }}>RD$ {fondoReparacionesMensual.toLocaleString()} / mes</span>
                </div>
              </div>

              {/* Advice Box */}
              <div className="recommendation-box" style={{ margin: '1.5rem 0' }}>
                <h3 className="flex-between">
                  <span>Recomendación de Conservación:</span>
                  <Info size={18} />
                </h3>
                <p>{adviceText}</p>
              </div>

              {/* Cross Connections */}
              <div className="connections-actions" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '1.5rem 0' }}>
                <Link to="/me-alcanza-el-sueldo" className="btn btn-secondary btn-block">
                  ¿Me alcanza el sueldo para esto? <ArrowRight size={16} />
                </Link>
                <Link to="/deudas-vs-ingresos-rd" className="btn btn-success btn-block">
                  Calcular deudas vs ingresos <ArrowRight size={16} />
                </Link>
              </div>

              <AdSlot id="seguro-after-results" placement="Seguro/Mantenimiento - Después de Resultados" />

              <div className="financial-disclaimer" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '1rem' }}>
                <p><strong>Nota aclaratoria:</strong> Estos cálculos son estimados y tienen fines informativos. Las cuotas, tasas, seguros, combustibles, mantenimientos y costos reales pueden variar según banco, dealer, aseguradora, tipo de vehículo, uso y condiciones del mercado.</p>
              </div>
            </div>
          ) : (
            <EmptyStateCard
              title="Seguro y Mantenimiento"
              description="Completa la información del año, tipo de seguro y valor estimado del auto para calcular la reserva mensual sugerida para el seguro, afinamientos básicos y el fondo anual para gomas o reparaciones."
              icon={TrendingUp}
            />
          )}
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <DisclaimerBox type="vehiculos" />
      </div>

      <AdSlot id="seguro-before-faq" placement="Seguro/Mantenimiento - Antes del FAQ" />

      <div className="card" style={{ marginTop: '2rem' }}>
        <FAQSection items={faqItems} />
      </div>

      <AdSlot id="seguro-before-footer" placement="Seguro/Mantenimiento - Antes del Footer" />

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
