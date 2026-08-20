import{n as e,r as t,t as n}from"./FAQSection-6LkvNqUE.js";import{C as r,_ as i,c as a,l as o,t as s}from"./index-CcRPQjzS.js";import{t as c}from"./SEOHead-B_urCUzb.js";import{t as l}from"./PageHero-BBYkHNaQ.js";import{n as u,o as d,r as f}from"./mockData-ftnZiiN_.js";var p=s();function m(){let s=[{question:`¿Por qué Punta Cana tiene los precios estimados más altos?`,answer:`El costo en la zona de Punta Cana y Bávaro es superior debido a la lejanía de los principales centros de distribución agrícola y el factor de desarrollo comercial turístico de la zona, lo cual encarece la logística y los márgenes de venta.`},{question:`¿Cuáles son las ciudades más económicas para comprar en RD?`,answer:`Ciudades del Cibao como La Vega, San Francisco de Macorís y Santiago muestran precios promedio menores en víveres y alimentos frescos gracias a su proximidad directa a las zonas de producción agropecuaria nacional.`},{question:`¿Son iguales los precios en todas las sucursales de la misma cadena?`,answer:`No, muchas cadenas nacionales de supermercados ajustan sus ofertas y precios según la zona geográfica, los costos operativos locales de la sucursal y la competencia directa en esa provincia.`}],m={"@context":`https://schema.org`,"@type":`FAQPage`,mainEntity:s.map(e=>({"@type":`Question`,name:e.question,acceptedAnswer:{"@type":`Answer`,text:e.answer}}))},h=u.filter(e=>e.id!==`otra`).map(e=>{let t=d(4,`normal`,`mensual`,e.id),n=`medio`;return e.costFactor<.96?n=`economico`:e.costFactor>1.05&&(n=`alto`),{id:e.id,name:e.name,monthlyCost:t,level:n,factor:e.costFactor}}).sort((e,t)=>e.monthlyCost-t.monthlyCost),g=h[0],_=h[h.length-1],v=Math.round(h.reduce((e,t)=>e+t.monthlyCost,0)/h.length),y=_.monthlyCost-g.monthlyCost;return(0,p.jsxs)(`div`,{className:`city-comparison-page`,children:[(0,p.jsx)(c,{title:`Comparador de Supermercados por Ciudad en RD`,description:`Compara el costo estimado de supermercado entre Santo Domingo, Santiago, La Vega, San Francisco y Punta Cana.`,schema:m}),(0,p.jsx)(l,{category:`supermercados`,title:`Supermercados por Ciudad`,description:`Compara costos de alimentos y canasta familiar básica entre distintas provincias de RD.`,icon:i,chips:[`ciudad`,`provincias`,`santiago`]}),(0,p.jsxs)(`div`,{className:`grid-3`,style:{marginBottom:`2rem`},children:[(0,p.jsxs)(`div`,{className:`card metric-card text-center highlight-green`,children:[(0,p.jsx)(`div`,{className:`metric-icon`,style:{backgroundColor:`var(--success-light)`,color:`var(--success)`},children:(0,p.jsx)(o,{size:24})}),(0,p.jsx)(`span`,{className:`metric-label`,children:`Ciudad Más Económica`}),(0,p.jsx)(`h3`,{className:`metric-value`,children:g.name}),(0,p.jsxs)(`span`,{className:`metric-subtext`,children:[`RD$ `,g.monthlyCost.toLocaleString(),` / mes`]})]}),(0,p.jsxs)(`div`,{className:`card metric-card text-center highlight-red`,children:[(0,p.jsx)(`div`,{className:`metric-icon`,style:{backgroundColor:`var(--danger-light)`,color:`var(--danger)`},children:(0,p.jsx)(a,{size:24})}),(0,p.jsx)(`span`,{className:`metric-label`,children:`Ciudad De Mayor Costo`}),(0,p.jsx)(`h3`,{className:`metric-value`,children:_.name}),(0,p.jsxs)(`span`,{className:`metric-subtext`,children:[`RD$ `,_.monthlyCost.toLocaleString(),` / mes`]})]}),(0,p.jsxs)(`div`,{className:`card metric-card text-center highlight-blue`,children:[(0,p.jsx)(`div`,{className:`metric-icon`,style:{backgroundColor:`var(--primary-light)`,color:`var(--primary)`},children:(0,p.jsx)(r,{size:24})}),(0,p.jsx)(`span`,{className:`metric-label`,children:`Brecha Máxima de Precios`}),(0,p.jsxs)(`h3`,{className:`metric-value`,children:[`RD$ `,y.toLocaleString()]}),(0,p.jsx)(`span`,{className:`metric-subtext`,children:`Diferencia mensual promedio`})]})]}),(0,p.jsxs)(`div`,{className:`card`,style:{marginBottom:`2rem`,borderLeft:`5px solid var(--primary)`},children:[(0,p.jsx)(`h2`,{children:`Resumen del Análisis por Ciudad`}),(0,p.jsxs)(`p`,{style:{fontSize:`1.05rem`,margin:0},children:[`El promedio nacional estimado para la compra de supermercado de una familia de 4 personas es de `,(0,p.jsxs)(`strong`,{children:[`RD$ `,v.toLocaleString(),` al mes`]}),`. Vivir en zonas turísticas o de alta demanda comercial como `,(0,p.jsx)(`strong`,{children:_.name}),` incrementa el costo hasta un 12% por encima del promedio, mientras que provincias de alta producción agrícola como `,(0,p.jsx)(`strong`,{children:g.name}),` y `,(0,p.jsx)(`strong`,{children:`La Vega`}),` muestran un costo de vida hasta un 7% más económico.`]})]}),(0,p.jsx)(e,{id:`city-before-grid`,placement:`Por Ciudad - Antes de Tarjetas`}),(0,p.jsx)(`h2`,{style:{marginBottom:`1rem`},children:`Detalle de Costos Estimados por Ciudad`}),(0,p.jsx)(`div`,{className:`grid-2`,style:{marginBottom:`2.5rem`},children:h.map(e=>(0,p.jsxs)(`div`,{className:`card city-detail-card`,children:[(0,p.jsxs)(`div`,{className:`flex-between`,children:[(0,p.jsxs)(`h3`,{className:`city-card-title`,children:[(0,p.jsx)(i,{size:18,className:`text-primary inline-icon`}),` `,e.name]}),e.level===`economico`&&(0,p.jsx)(`span`,{className:`level-badge badge-green`,children:`Costo Económico`}),e.level===`medio`&&(0,p.jsx)(`span`,{className:`level-badge badge-blue`,children:`Costo Medio`}),e.level===`alto`&&(0,p.jsx)(`span`,{className:`level-badge badge-red`,children:`Costo Alto`})]}),(0,p.jsxs)(`div`,{className:`city-card-cost-box`,children:[(0,p.jsx)(`span`,{className:`city-cost-label`,children:`Gasto Familiar Mensual Estimado:`}),(0,p.jsxs)(`span`,{className:`city-cost-value`,children:[`RD$ `,e.monthlyCost.toLocaleString()]})]}),(0,p.jsxs)(`p`,{className:`city-card-note`,children:[e.id===`punta-cana`&&`Nota: Los altos costos de distribución logística y la orientación turística de la zona elevan los precios de la canasta básica.`,e.id===`santo-domingo`&&`Nota: Al ser el centro urbano principal, posee la mayor competencia de supermercados, pero con costos operativos generales medios-altos.`,(e.id===`santiago`||e.id===`la-vega`||e.id===`san-francisco`)&&`Nota: Se beneficia de la cercanía con centros de producción agrícola y ganadera del Cibao, reduciendo costos de transporte de víveres frescos.`]})]},e.id))}),(0,p.jsx)(`div`,{className:`update-note text-center`,style:{marginBottom:`1.5rem`},children:(0,p.jsxs)(`p`,{children:[`Fecha de actualización de datos por ciudad: `,(0,p.jsx)(`strong`,{children:f})]})}),(0,p.jsx)(t,{}),(0,p.jsx)(e,{id:`city-before-faq`,placement:`Por Ciudad - Antes del FAQ`}),(0,p.jsx)(n,{items:s}),(0,p.jsx)(e,{id:`city-before-footer`,placement:`Por Ciudad - Antes del Footer`}),(0,p.jsx)(`style`,{children:`
        .metric-card {
          padding: 1.5rem 1rem;
        }

        .metric-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 0.75rem auto;
        }

        .metric-label {
          display: block;
          font-size: 0.85rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .metric-value {
          font-size: 1.25rem;
          margin: 0.25rem 0;
          color: var(--text-main);
        }

        .metric-subtext {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-muted);
        }

        .highlight-green {
          border-top: 4px solid var(--success);
        }

        .highlight-red {
          border-top: 4px solid var(--danger);
        }

        .highlight-blue {
          border-top: 4px solid var(--primary);
        }

        /* City details card */
        .city-detail-card {
          border-radius: var(--radius-md);
        }

        .city-card-title {
          font-size: 1.25rem;
          margin: 0;
        }

        .level-badge {
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.2rem 0.6rem;
          border-radius: 20px;
          text-transform: uppercase;
        }

        .badge-blue {
          background-color: var(--primary-light);
          color: var(--primary);
          border: 1px solid #bfdbfe;
        }

        .badge-red {
          background-color: var(--danger-light);
          color: var(--danger);
          border: 1px solid #fecaca;
        }

        .city-card-cost-box {
          background-color: var(--bg-color);
          border-radius: 8px;
          padding: 1rem;
          margin: 1rem 0;
        }

        .city-cost-label {
          display: block;
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 0.15rem;
        }

        .city-cost-value {
          font-size: 1.45rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .city-card-note {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin: 0;
          font-style: italic;
        }
      `})]})}export{m as default};