import { FileText } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import PageHero from '../components/PageHero';

export default function Terminos() {
  return (
    <div className="content-page">
      <SEOHead
        title="Términos de uso | CuantoCuestaRD"
        description="Consulta los términos de uso de CuantoCuestaRD, el carácter informativo de las calculadoras y los límites de responsabilidad."
        schema={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Términos de uso',
          url: 'https://cuantocuestard.com/terminos'
        }}
      />

      <PageHero
        category="finanzas"
        title="Términos de uso"
        description="Las herramientas de CuantoCuestaRD son informativas y deben usarse como apoyo para planificar, no como confirmación final de precios o trámites."
        icon={FileText}
        chips={['Uso informativo', 'Sin garantía de precio', 'Validación recomendada']}
      />

      <section className="card content-section">
        <h2>Uso informativo</h2>
        <p>
          CuantoCuestaRD ofrece calculadoras, comparadores y guías de referencia. Los resultados son aproximados y pueden
          variar por ciudad, fecha, proveedor, entidad financiera, institución pública, impuestos, promociones o cambios
          regulatorios.
        </p>
        <h2>Sin asesoría profesional</h2>
        <p>
          El contenido no constituye asesoría financiera, legal, fiscal, contable ni gubernamental. Antes de tomar decisiones
          importantes, consulta con la entidad o profesional correspondiente.
        </p>
        <h2>Actualizaciones</h2>
        <p>
          Podemos actualizar herramientas, fórmulas, páginas y referencias para mejorar la utilidad del sitio.
        </p>
      </section>
    </div>
  );
}
