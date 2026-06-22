import { ExternalLink } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import PageHero from '../components/PageHero';

const sourceGroups = [
  {
    title: 'Instituciones y trámites',
    items: ['DGII', 'INTRANT', 'Dirección General de Pasaportes', 'ProConsumidor', 'DGA']
  },
  {
    title: 'Servicios y consumo',
    items: ['Edesur', 'Edenorte', 'Edeeste', 'CAASD', 'proveedores de telecomunicaciones y servicios del hogar']
  },
  {
    title: 'Mercado y vida diaria',
    items: ['precios de referencia de supermercados', 'tarifas de courier', 'rangos de alquiler y transporte por ciudad']
  }
];

export default function Fuentes() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Fuentes y referencias de CuantoCuestaRD',
    url: 'https://cuantocuestard.com/fuentes',
    inLanguage: 'es-DO'
  };

  return (
    <div className="content-page">
      <SEOHead
        title="Fuentes y referencias | CuantoCuestaRD"
        description="Consulta los tipos de fuentes que se priorizan para construir estimaciones de costos, trámites, servicios y vida diaria en República Dominicana."
        schema={schema}
      />

      <PageHero
        category="tramites"
        title="Fuentes y referencias"
        description="Priorizamos fuentes oficiales para tasas y requisitos, y referencias de mercado para precios que cambian por ciudad, proveedor o temporada."
        icon={ExternalLink}
        chips={['Fuentes oficiales', 'Referencias de mercado', 'Validación manual recomendada']}
      />

      <section className="grid-3">
        {sourceGroups.map((group) => (
          <article className="card" key={group.title}>
            <h2>{group.title}</h2>
            <ul className="content-list">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="card content-section">
        <h2>Importante</h2>
        <p>
          Algunas tarifas oficiales y precios comerciales pueden cambiar sin aviso. Cuando una decisión implique pago,
          préstamo, impuesto, trámite o contrato, usa CuantoCuestaRD como referencia inicial y confirma el dato final
          en la institución o proveedor correspondiente.
        </p>
      </section>
    </div>
  );
}
