import{n as e,r as t,t as n}from"./FAQSection-6LkvNqUE.js";import{t as r}from"./circle-alert-CpBVeHgU.js";import{t as i}from"./circle-check-big-Cg5lWw3f.js";import{t as a}from"./funnel-D3gnRM1W.js";import{t as o}from"./refresh-cw-DvX5CuUR.js";import{D as s,E as c,M as l,_ as u,a as d,j as f,k as p,t as m}from"./index-CcRPQjzS.js";import{t as h}from"./SEOHead-B_urCUzb.js";import{t as g}from"./PageHero-BBYkHNaQ.js";import{n as _,o as v,s as y}from"./mockData-ftnZiiN_.js";var b=p(`list`,[[`path`,{d:`M3 5h.01`,key:`18ugdj`}],[`path`,{d:`M3 12h.01`,key:`nlz23k`}],[`path`,{d:`M3 19h.01`,key:`noohij`}],[`path`,{d:`M8 5h13`,key:`1pao27`}],[`path`,{d:`M8 12h13`,key:`1za7za`}],[`path`,{d:`M8 19h13`,key:`m83p4d`}]]),x=l(f(),1),S=m();function C(){let l=[{question:`¿Qué es la Canasta Básica Familiar en RD?`,answer:`Es un conjunto representativo de alimentos y artículos de primera necesidad que consume un hogar dominicano promedio para cubrir sus necesidades de subsistencia mensuales.`},{question:`¿Cómo calcula la web el costo de la canasta básica?`,answer:`El costo se calcula estimando un presupuesto referencial basado en el número de personas en el hogar, la provincia y el tipo de compra (económica, normal, completa), aplicando factores de escala y variabilidad de precios.`},{question:`¿Con qué frecuencia se actualizan estos presupuestos?`,answer:`Las estimaciones se actualizan de manera periódica basándose en relevamientos y promedios del mercado dominicano de referencia, no representando facturas exactas de compras.`}],f={"@context":`https://schema.org`,"@type":`FAQPage`,mainEntity:l.map(e=>({"@type":`Question`,name:e.question,acceptedAnswer:{"@type":`Answer`,text:e.answer}}))},p={"@context":`https://schema.org`,"@type":`SoftwareApplication`,name:`Calculadora de Canasta Básica RD - CuantoCuestaRD`,operatingSystem:`All`,applicationCategory:`FinanceApplication`,description:`Calcula el costo estimado de la canasta básica en República Dominicana según la cantidad de personas en el hogar, provincia y frecuencia de compra.`,offers:{"@type":`Offer`,price:`0`,priceCurrency:`DOP`}},[m,C]=(0,x.useState)(`santo-domingo`),[w,T]=(0,x.useState)(4),[E,D]=(0,x.useState)(`normal`),[O,k]=(0,x.useState)(`mensual`),[A,j]=(0,x.useState)(null),[M,N]=(0,x.useState)(!0),P=e=>{if(e.preventDefault(),j(null),!m){j(`Completa este campo para poder calcular: selecciona tu ciudad.`);return}if(!w||w<=0){j(`El número de personas debe ser mayor que cero.`);return}N(!0)},F=()=>{C(`santo-domingo`),T(4),D(`normal`),k(`mensual`),j(null),N(!0)},I=v(w,E,O,m),L=v(w,E,`semanal`,m),R=v(w,E,`quincenal`,m),z=v(w,E,`mensual`,m),B=y(E);return(0,S.jsxs)(`div`,{className:`canasta-page`,children:[(0,S.jsx)(h,{title:`Canasta Básica RD | Calcula cuánto cuesta tu compra`,description:`Calcula el costo estimado de una canasta básica en República Dominicana según ciudad, cantidad de personas y tipo de compra.`,schema:[f,p]}),(0,S.jsx)(g,{category:`supermercados`,title:`Canasta Básica RD`,description:`Calcula el costo aproximado de la canasta familiar básica según los integrantes de tu hogar.`,icon:s,chips:[`canasta`,`basica`,`alimentos`]}),(0,S.jsxs)(`div`,{className:`grid-2`,children:[(0,S.jsxs)(`div`,{className:`card`,children:[(0,S.jsx)(`h2`,{children:`Datos para el cálculo`}),(0,S.jsx)(`p`,{children:`Ingresa los detalles para ajustar la estimación a tu realidad familiar.`}),A&&(0,S.jsxs)(`div`,{className:`error-alert`,role:`alert`,children:[(0,S.jsx)(r,{size:20}),(0,S.jsx)(`span`,{children:A})]}),(0,S.jsxs)(`form`,{onSubmit:P,children:[(0,S.jsxs)(`div`,{className:`form-group`,children:[(0,S.jsxs)(`label`,{htmlFor:`city-select`,className:`form-label`,children:[(0,S.jsx)(u,{size:18,className:`inline-icon`}),` Ciudad / Provincia:`]}),(0,S.jsx)(`select`,{id:`city-select`,className:`form-control`,value:m,onChange:e=>{C(e.target.value)},children:_.map(e=>(0,S.jsx)(`option`,{value:e.id,children:e.name},e.id))})]}),(0,S.jsxs)(`div`,{className:`form-group`,children:[(0,S.jsxs)(`label`,{htmlFor:`people-select`,className:`form-label`,children:[(0,S.jsx)(d,{size:18,className:`inline-icon`}),` Cantidad de personas en casa:`]}),(0,S.jsxs)(`select`,{id:`people-select`,className:`form-control`,value:w,onChange:e=>T(Number(e.target.value)),children:[(0,S.jsx)(`option`,{value:1,children:`1 persona (Individual)`}),(0,S.jsx)(`option`,{value:2,children:`2 personas (Pareja)`}),(0,S.jsx)(`option`,{value:3,children:`3 personas`}),(0,S.jsx)(`option`,{value:4,children:`4 personas (Familia estándar)`}),(0,S.jsx)(`option`,{value:5,children:`5 personas`}),(0,S.jsx)(`option`,{value:6,children:`6 o más personas`})]})]}),(0,S.jsxs)(`div`,{className:`form-group`,children:[(0,S.jsxs)(`label`,{htmlFor:`basket-select`,className:`form-label`,children:[(0,S.jsx)(a,{size:18,className:`inline-icon`}),` Calidad o Tipo de Compra:`]}),(0,S.jsxs)(`select`,{id:`basket-select`,className:`form-control`,value:E,onChange:e=>D(e.target.value),children:[(0,S.jsx)(`option`,{value:`economica`,children:`Económica (Solo lo indispensable, marcas económicas)`}),(0,S.jsx)(`option`,{value:`normal`,children:`Normal (Alimentación variada y balanceada, marcas promedio)`}),(0,S.jsx)(`option`,{value:`completa`,children:`Completa (Variedad total, marcas premium e importados)`})]})]}),(0,S.jsxs)(`div`,{className:`form-group`,children:[(0,S.jsxs)(`label`,{htmlFor:`frequency-select`,className:`form-label`,children:[(0,S.jsx)(c,{size:18,className:`inline-icon`}),` Frecuencia de los resultados:`]}),(0,S.jsxs)(`select`,{id:`frequency-select`,className:`form-control`,value:O,onChange:e=>k(e.target.value),children:[(0,S.jsx)(`option`,{value:`semanal`,children:`Semanal`}),(0,S.jsx)(`option`,{value:`quincenal`,children:`Quincenal`}),(0,S.jsx)(`option`,{value:`mensual`,children:`Mensual`})]})]}),(0,S.jsxs)(`div`,{className:`step-actions flex-between`,style:{gap:`1rem`},children:[(0,S.jsxs)(`button`,{type:`button`,className:`btn btn-secondary`,onClick:F,style:{flex:1},children:[(0,S.jsx)(o,{size:18}),` Limpiar`]}),(0,S.jsx)(`button`,{type:`submit`,className:`btn btn-primary`,style:{flex:2},children:`Calcular costo`})]})]})]}),(0,S.jsx)(`div`,{className:`results-container`,children:M&&(0,S.jsxs)(`div`,{className:`card results-card`,style:{height:`100%`},children:[(0,S.jsx)(`h2`,{children:`Costo Estimado`}),(0,S.jsxs)(`div`,{className:`main-cost-display`,children:[(0,S.jsxs)(`span`,{className:`main-cost-title`,children:[`Presupuesto Estimado (`,O,`)`]}),(0,S.jsxs)(`span`,{className:`main-cost-value`,children:[`RD$ `,I.toLocaleString()]})]}),(0,S.jsx)(`div`,{className:`dominican-quote`,children:(0,S.jsxs)(`p`,{children:[`"Una familia de `,(0,S.jsxs)(`strong`,{children:[w,` personas`]}),` podría necesitar aproximadamente `,(0,S.jsxs)(`strong`,{children:[`RD$ `,z.toLocaleString(),` al mes`]}),` para una compra `,E===`economica`?`económica`:E===`normal`?`normal`:`completa`,` de supermercado en `,_.find(e=>e.id===m)?.name,`."`]})}),(0,S.jsxs)(`div`,{className:`frequency-breakdown`,children:[(0,S.jsxs)(`div`,{className:`freq-box ${O===`semanal`?`active`:``}`,children:[(0,S.jsx)(`span`,{className:`freq-label`,children:`Semanal`}),(0,S.jsxs)(`span`,{className:`freq-val`,children:[`RD$ `,L.toLocaleString()]})]}),(0,S.jsxs)(`div`,{className:`freq-box ${O===`quincenal`?`active`:``}`,children:[(0,S.jsx)(`span`,{className:`freq-label`,children:`Quincenal`}),(0,S.jsxs)(`span`,{className:`freq-val`,children:[`RD$ `,R.toLocaleString()]})]}),(0,S.jsxs)(`div`,{className:`freq-box ${O===`mensual`?`active`:``}`,children:[(0,S.jsx)(`span`,{className:`freq-label`,children:`Mensual`}),(0,S.jsxs)(`span`,{className:`freq-val`,children:[`RD$ `,z.toLocaleString()]})]})]}),(0,S.jsxs)(`div`,{className:`recommendation-box`,children:[(0,S.jsx)(`h3`,{children:`Sugerencia de compra:`}),(0,S.jsx)(`p`,{children:(()=>{let e=_.find(e=>e.id===m)?.name||``,t=w===1?`una persona sola`:w===2?`una pareja`:`una familia de ${w} personas`;return E===`economica`?`Para ${t} en ${e}, se estima un presupuesto sumamente ajustado y enfocado estrictamente en granos, proteínas esenciales y víveres básicos nacionales. Recomendamos planificar las comidas por semana para evitar el desperdicio y buscar ofertas específicas de los días populares de supermercado (como los miércoles de vegetales).`:E===`normal`?`Este es el costo promedio para cubrir una alimentación balanceada y artículos de higiene del hogar e higiene personal indispensables para ${t} en la ciudad de ${e}. Permite marcas de consumo masivo promedio en supermercados locales.`:`Para ${t} que prefieran una variedad completa de marcas importadas, lácteos avanzados, carnes magras especiales y productos de limpieza especializados en ${e}. Este presupuesto ofrece un margen de holgura cómodo y variado.`})()})]}),(0,S.jsxs)(`div`,{className:`included-list-section`,children:[(0,S.jsxs)(`h3`,{children:[(0,S.jsx)(b,{size:18,className:`inline-icon`}),` Productos simulados en esta canasta (`,B.length,`):`]}),(0,S.jsx)(`div`,{className:`included-pills`,children:B.map(e=>(0,S.jsxs)(`span`,{className:`product-pill`,children:[(0,S.jsx)(i,{size:12,className:`text-success inline-icon`}),e.name]},e.id))})]}),(0,S.jsx)(e,{id:`canasta-after-results`,placement:`Canasta - Después de Resultados`}),(0,S.jsx)(`div`,{className:`update-note`,style:{marginTop:`1.5rem`,borderTop:`1px solid var(--border-color)`,paddingTop:`1rem`},children:(0,S.jsxs)(`p`,{children:[`Fecha de actualización de precios: `,(0,S.jsx)(`strong`,{children:`Junio 2026`})]})})]})})]}),(0,S.jsx)(`div`,{style:{marginTop:`2rem`},children:(0,S.jsx)(t,{})}),(0,S.jsx)(e,{id:`canasta-before-faq`,placement:`Canasta Básica - Antes del FAQ`}),(0,S.jsx)(n,{items:l}),(0,S.jsx)(e,{id:`canasta-before-footer`,placement:`Canasta Básica - Antes del Footer`}),(0,S.jsx)(`style`,{children:`
        .results-card {
          border-color: var(--primary);
          position: relative;
        }

        .main-cost-display {
          background-color: var(--primary-light);
          border: 2px solid rgba(37, 99, 235, 0.1);
          border-radius: var(--radius-md);
          padding: 1.5rem;
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .main-cost-title {
          display: block;
          font-size: 0.95rem;
          color: var(--primary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .main-cost-value {
          font-size: 2.25rem;
          font-weight: 800;
          color: var(--primary);
        }

        .dominican-quote {
          background-color: var(--bg-color);
          border-left: 4px solid var(--primary);
          border-radius: 4px;
          padding: 0.85rem 1rem;
          margin-bottom: 1.5rem;
          font-style: italic;
        }

        .dominican-quote p {
          margin: 0;
          font-size: 1.05rem;
          color: var(--text-main);
        }

        .frequency-breakdown {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .freq-box {
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 0.75rem;
          text-align: center;
          background-color: #ffffff;
        }

        .freq-box.active {
          border-color: var(--primary);
          background-color: var(--primary-light);
          font-weight: 600;
        }

        .freq-label {
          display: block;
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 0.15rem;
        }

        .freq-val {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .freq-box.active .freq-val {
          color: var(--primary);
        }

        .recommendation-box {
          background-color: #f8fafc;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 1rem 1.25rem;
          margin-bottom: 1.5rem;
        }

        .recommendation-box h3 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .recommendation-box p {
          font-size: 0.95rem;
          margin: 0;
          color: var(--text-muted);
        }

        .included-list-section h3 {
          font-size: 1.05rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
        }

        .included-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          max-height: 180px;
          overflow-y: auto;
          padding: 0.25rem;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
        }

        .product-pill {
          background-color: #ffffff;
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 0.25rem 0.75rem;
          font-size: 0.85rem;
          color: var(--text-muted);
          display: inline-flex;
          align-items: center;
        }

        @media (max-width: 768px) {
          .grid-2 {
            grid-template-columns: 1fr;
          }
        }
      `})]})}export{C as default};