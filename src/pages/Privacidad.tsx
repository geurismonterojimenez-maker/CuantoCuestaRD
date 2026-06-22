import { Shield } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import PageHero from '../components/PageHero';

export default function Privacidad() {
  return (
    <div className="content-page">
      <SEOHead
        title="Política de privacidad | CuantoCuestaRD"
        description="Lee cómo CuantoCuestaRD trata la información usada en calculadoras, cookies, analítica y publicidad."
        schema={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Política de privacidad',
          url: 'https://cuantocuestard.com/privacidad'
        }}
      />

      <PageHero
        category="finanzas"
        title="Política de privacidad"
        description="Información clara sobre uso de datos, cookies, analítica y publicidad en CuantoCuestaRD."
        icon={Shield}
        chips={['Privacidad', 'Cookies', 'Publicidad']}
      />

      <section className="card content-section">
        <h2>Datos de las calculadoras</h2>
        <p>
          Las calculadoras están diseñadas para funcionar en el navegador. Los valores que escribes se usan para mostrar
          estimaciones en pantalla y no deben considerarse almacenamiento permanente de información personal.
        </p>
        <h2>Cookies, analítica y publicidad</h2>
        <p>
          El sitio puede usar herramientas de medición y publicidad para entender uso general, mejorar contenido y financiar
          el proyecto. Estas herramientas pueden usar cookies u otros identificadores según sus propias políticas.
        </p>
        <h2>Recomendación</h2>
        <p>
          No ingreses datos sensibles, números de cuenta, documentos de identidad completos ni información confidencial en
          campos libres o calculadoras informativas.
        </p>
      </section>
    </div>
  );
}
