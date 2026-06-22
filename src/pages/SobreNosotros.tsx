import { Link } from 'react-router-dom';
import { CheckCircle, FileText, ShieldCheck } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import PageHero from '../components/PageHero';

export default function SobreNosotros() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Sobre CuantoCuestaRD',
    url: 'https://cuantocuestard.com/sobre-nosotros',
    inLanguage: 'es-DO',
    about: {
      '@type': 'WebSite',
      name: 'CuantoCuestaRD',
      url: 'https://cuantocuestard.com'
    }
  };

  return (
    <div className="content-page">
      <SEOHead
        title="Sobre CuantoCuestaRD | Herramientas de costos para RD"
        description="Conoce el propósito editorial de CuantoCuestaRD, cómo ayudamos a planificar gastos en República Dominicana y qué límites tienen nuestras estimaciones."
        schema={schema}
      />

      <PageHero
        category="finanzas"
        title="Sobre CuantoCuestaRD"
        description="Una plataforma independiente de calculadoras y guías prácticas para estimar costos cotidianos en República Dominicana."
        icon={ShieldCheck}
        chips={['Proyecto independiente', 'Enfoque educativo', 'Datos de referencia']}
      />

      <section className="card content-section">
        <h2>Nuestro propósito</h2>
        <p>
          CuantoCuestaRD ayuda a personas y familias dominicanas a responder preguntas simples pero importantes:
          cuánto cuesta vivir solo, mantener un carro, hacer una compra mensual, renovar documentos o traer un paquete
          por courier. La meta es convertir costos dispersos en estimaciones fáciles de entender.
        </p>
        <p>
          El sitio no reemplaza la confirmación directa con bancos, supermercados, couriers, EDE, DGII, INTRANT,
          Dirección General de Pasaportes u otras instituciones. Su función es orientar decisiones y mejorar la
          planificación antes de gastar.
        </p>
      </section>

      <section className="grid-3">
        <article className="card">
          <CheckCircle size={28} />
          <h3>Claridad</h3>
          <p>Mostramos fórmulas, supuestos y advertencias para que el usuario entienda de dónde sale cada estimado.</p>
        </article>
        <article className="card">
          <FileText size={28} />
          <h3>Contexto dominicano</h3>
          <p>Las herramientas usan lenguaje, monedas, categorías y escenarios frecuentes en República Dominicana.</p>
        </article>
        <article className="card">
          <ShieldCheck size={28} />
          <h3>Uso responsable</h3>
          <p>Las calculadoras son informativas. Para pagos, tasas o trámites oficiales, recomendamos validar en la fuente correspondiente.</p>
        </article>
      </section>

      <section className="card content-section">
        <h2>Cómo mejorar la precisión</h2>
        <p>
          Para obtener mejores resultados, usa montos recientes de tus facturas, recibos o cotizaciones. Cuando una herramienta
          incluya valores sugeridos, trátalos como punto de partida y ajústalos a tu ciudad, hábitos y proveedor.
        </p>
        <Link className="btn btn-primary" to="/metodologia">Ver metodología editorial</Link>
      </section>
    </div>
  );
}
