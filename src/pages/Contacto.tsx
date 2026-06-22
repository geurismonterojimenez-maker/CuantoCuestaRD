import { Mail, MessageSquare } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import PageHero from '../components/PageHero';

export default function Contacto() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contacto de CuantoCuestaRD',
    url: 'https://cuantocuestard.com/contacto',
    inLanguage: 'es-DO'
  };

  return (
    <div className="content-page">
      <SEOHead
        title="Contacto | CuantoCuestaRD"
        description="Contacta a CuantoCuestaRD para sugerir mejoras, reportar datos desactualizados o proponer nuevas calculadoras para República Dominicana."
        schema={schema}
      />

      <PageHero
        category="finanzas"
        title="Contacto"
        description="Usa esta página para reportar errores, sugerir fuentes o pedir nuevas herramientas de costos para República Dominicana."
        icon={MessageSquare}
        chips={['Sugerencias', 'Correcciones', 'Nuevas calculadoras']}
      />

      <section className="card content-section">
        <h2>Canal de contacto</h2>
        <p>
          Si encuentras un dato desactualizado o quieres sugerir una herramienta nueva, escríbenos con el nombre de la página,
          la fuente sugerida y una breve explicación del cambio.
        </p>
        <p className="contact-line">
          <Mail size={18} /> contacto@cuantocuestard.com
        </p>
      </section>
    </div>
  );
}
