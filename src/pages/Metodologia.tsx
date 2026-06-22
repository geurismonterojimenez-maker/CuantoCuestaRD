import { Link } from 'react-router-dom';
import { Calculator, ClipboardCheck, RefreshCw } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import PageHero from '../components/PageHero';

export default function Metodologia() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Metodología de CuantoCuestaRD',
    url: 'https://cuantocuestard.com/metodologia',
    inLanguage: 'es-DO'
  };

  return (
    <div className="content-page">
      <SEOHead
        title="Metodología | Cómo calcula CuantoCuestaRD"
        description="Consulta cómo CuantoCuestaRD organiza fuentes, supuestos, fórmulas y fechas de actualización para estimar costos en República Dominicana."
        schema={schema}
      />

      <PageHero
        category="finanzas"
        title="Metodología editorial y de cálculo"
        description="Así convertimos tarifas, precios de referencia y supuestos cotidianos en estimaciones útiles para planificar."
        icon={Calculator}
        chips={['Fórmulas revisables', 'Supuestos visibles', 'Actualización periódica']}
      />

      <section className="card content-section">
        <h2>Principios de cálculo</h2>
        <p>
          Cada calculadora combina datos ingresados por el usuario con valores de referencia. Cuando se usan costos sugeridos,
          estos representan rangos aproximados del mercado dominicano y no una cotización final.
        </p>
        <ul className="content-list">
          <li>Separamos gastos fijos, variables, impuestos, cargos de servicio y costos extraordinarios cuando aplica.</li>
          <li>Mostramos resultados en RD$ o US$ según el contexto de la herramienta.</li>
          <li>Incluimos notas para explicar qué puede cambiar el resultado real.</li>
          <li>Evitamos presentar estimaciones como asesoría financiera, legal, tributaria o gubernamental.</li>
        </ul>
      </section>

      <section className="grid-3">
        <article className="card">
          <ClipboardCheck size={28} />
          <h3>Fuentes oficiales</h3>
          <p>Para trámites, impuestos y tarifas reguladas se priorizan instituciones públicas y documentos oficiales.</p>
        </article>
        <article className="card">
          <RefreshCw size={28} />
          <h3>Revisión periódica</h3>
          <p>Los contenidos deben revisarse cuando cambien tasas, tarifas, requisitos, temporadas o precios de referencia.</p>
        </article>
        <article className="card">
          <Calculator size={28} />
          <h3>Escenarios</h3>
          <p>Las calculadoras trabajan con escenarios simples para que el usuario pueda adaptar el resultado a su realidad.</p>
        </article>
      </section>

      <section className="card content-section">
        <h2>Transparencia y límites</h2>
        <p>
          Los resultados no garantizan precios, aprobaciones, tasas bancarias ni disponibilidad de servicios. Antes de pagar o
          iniciar un trámite, confirma directamente con la entidad correspondiente.
        </p>
        <Link className="btn btn-secondary" to="/fuentes">Ver fuentes y referencias</Link>
      </section>
    </div>
  );
}
