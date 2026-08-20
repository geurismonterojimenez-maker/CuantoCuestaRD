import{n as e,r as t,t as n}from"./FAQSection-6LkvNqUE.js";import{t as r}from"./rotate-ccw-CQqGgjHB.js";import{M as i,_ as a,j as o,k as s,l as c,t as l,u}from"./index-CcRPQjzS.js";import{t as d}from"./SEOHead-B_urCUzb.js";import{t as f}from"./PageHero-BBYkHNaQ.js";import{c as p,i as m,n as h,r as g,t as _}from"./mockData-ftnZiiN_.js";var v=s(`shopping-cart`,[[`circle`,{cx:`8`,cy:`21`,r:`1`,key:`jimo8o`}],[`circle`,{cx:`19`,cy:`21`,r:`1`,key:`13723u`}],[`path`,{d:`M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12`,key:`9zh506`}]]),y=i(o(),1),b=l();function x(){let i=[{question:`¿Qué es la Calculadora de Compra Mensual?`,answer:`Es una herramienta que te permite simular y construir tu propia lista de compras de supermercado para estimar tu presupuesto mensual ajustado a los precios referenciales de tu provincia.`},{question:`¿Cómo funcionan los consejos de ahorro?`,answer:`La calculadora analiza de forma instantánea tu lista, detecta cuál es la categoría en la que estás destinando más presupuesto y te ofrece un consejo práctico adaptado a la realidad del mercado dominicano.`},{question:`¿Puedo guardar mi lista de compras?`,answer:`En esta primera versión, la lista se mantiene activa mientras navegues por la página. Puedes vaciar el carrito o cambiar cantidades en cualquier momento.`}],o={"@context":`https://schema.org`,"@type":`FAQPage`,mainEntity:i.map(e=>({"@type":`Question`,name:e.question,acceptedAnswer:{"@type":`Answer`,text:e.answer}}))},s={"@context":`https://schema.org`,"@type":`SoftwareApplication`,name:`Calculadora de Compra Mensual RD - CuantoCuestaRD`,operatingSystem:`All`,applicationCategory:`FinanceApplication`,description:`Construye tu lista de compras mensual y calcula un presupuesto estimado en pesos dominicanos según los precios promedio de tu provincia.`,offers:{"@type":`Offer`,price:`0`,priceCurrency:`DOP`}},[l,x]=(0,y.useState)(`santo-domingo`),[S,C]=(0,y.useState)({}),w=(e,t)=>{t<0||C({...S,[e]:t})},T=()=>{C({})},E=0,D={};_.forEach(e=>{D[e.id]=0}),Object.entries(S).forEach(([e,t])=>{if(t>0){let n=m.find(t=>t.id===e);if(n){let r=p(e,`jumbo`,l)*t;E+=r,D[n.category]=(D[n.category]||0)+r}}});let O=``,k=0;Object.entries(D).forEach(([e,t])=>{t>k&&(k=t,O=e)});let A=_.find(e=>e.id===O)?.name||`Ninguna`;return(0,b.jsxs)(`div`,{className:`monthly-shopping-page`,children:[(0,b.jsx)(d,{title:`Calculadora de Compra Mensual RD | Estima tu supermercado`,description:`Arma tu lista de supermercado y estima cuánto gastarías al mes en comida, limpieza e higiene.`,schema:[o,s]}),(0,b.jsx)(f,{category:`supermercados`,title:`Compra Mensual`,description:`Arma tu lista de compra personalizada y proyecta tu gasto total de supermercado al mes.`,icon:u,chips:[`compra`,`mensual`,`supermercado`]}),(0,b.jsx)(`div`,{className:`card city-selector-card`,style:{marginBottom:`2rem`},children:(0,b.jsxs)(`div`,{className:`flex-between flex-wrap`,style:{gap:`1rem`},children:[(0,b.jsxs)(`div`,{className:`selector-info`,children:[(0,b.jsxs)(`h2`,{style:{fontSize:`1.25rem`,marginBottom:`0.25rem`},children:[(0,b.jsx)(a,{size:18,className:`inline-icon`}),` Selecciona tu ubicación`]}),(0,b.jsx)(`p`,{style:{margin:0,fontSize:`0.95rem`},children:`Los precios de los productos se ajustarán a tu provincia.`})]}),(0,b.jsx)(`div`,{style:{minWidth:`220px`},children:(0,b.jsx)(`select`,{id:`city-select`,className:`form-control`,value:l,onChange:e=>x(e.target.value),children:h.map(e=>(0,b.jsx)(`option`,{value:e.id,children:e.name},e.id))})})]})}),(0,b.jsxs)(`div`,{className:`grid-2`,children:[(0,b.jsxs)(`div`,{className:`products-selection-section`,children:[(0,b.jsx)(`h2`,{children:`Agrega productos a tu lista`}),(0,b.jsx)(`p`,{children:`Usa los botones de más y menos para añadir los productos que compras usualmente.`}),(0,b.jsx)(`div`,{className:`categories-accordion`,children:_.map(e=>{let t=m.filter(t=>t.category===e.id);return(0,b.jsxs)(`div`,{className:`category-group card`,style:{marginBottom:`1.5rem`,borderLeft:`5px solid ${e.color}`},children:[(0,b.jsxs)(`h3`,{style:{display:`flex`,alignItems:`center`,gap:`0.5rem`,color:e.color},children:[(0,b.jsx)(`span`,{className:`dot`,style:{backgroundColor:e.color}}),e.name]}),(0,b.jsx)(`div`,{className:`category-products-list`,children:t.map(e=>{let t=S[e.id]||0,n=p(e.id,`jumbo`,l);return(0,b.jsxs)(`div`,{className:`product-row-item ${t>0?`selected`:``}`,children:[(0,b.jsxs)(`div`,{className:`product-info-col`,children:[(0,b.jsx)(`strong`,{children:e.name}),(0,b.jsxs)(`span`,{className:`product-price-tag`,children:[`RD$ `,n,` / `,e.unit]})]}),(0,b.jsxs)(`div`,{className:`qty-control-box`,style:{margin:0},children:[(0,b.jsx)(`button`,{className:`qty-btn`,onClick:()=>w(e.id,t-1),"aria-label":`Quitar un ${e.name}`,children:`-`}),(0,b.jsx)(`input`,{type:`number`,className:`qty-input`,value:t,onChange:t=>w(e.id,Number(t.target.value)),"aria-label":`Cantidad de ${e.name}`,min:`0`}),(0,b.jsx)(`button`,{className:`qty-btn`,onClick:()=>w(e.id,t+1),"aria-label":`Agregar un ${e.name}`,children:`+`})]})]},e.id)})})]},e.id)})})]}),(0,b.jsx)(`div`,{className:`receipt-analytics-section`,children:(0,b.jsxs)(`div`,{className:`card receipt-card`,style:{position:`sticky`,top:`90px`},children:[(0,b.jsxs)(`h2`,{className:`flex-between`,children:[(0,b.jsx)(`span`,{children:`Mi Carrito`}),(0,b.jsx)(v,{size:24,className:`text-primary`})]}),(0,b.jsxs)(`p`,{children:[`Resumen estimado de tu compra mensual en `,(0,b.jsx)(`strong`,{children:h.find(e=>e.id===l)?.name}),`.`]}),(0,b.jsxs)(`div`,{className:`receipt-total-display`,children:[(0,b.jsx)(`span`,{className:`receipt-total-label`,children:`Total Estimado Mensual`}),(0,b.jsxs)(`span`,{className:`receipt-total-val`,children:[`RD$ `,E.toLocaleString()]})]}),E>0?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(`div`,{className:`dominican-quote`,style:{borderLeftColor:`var(--primary)`},children:(0,b.jsxs)(`p`,{children:[`Tu compra mensual estimada es de `,(0,b.jsxs)(`strong`,{children:[`RD$ `,E.toLocaleString()]}),`. La categoría donde más estás gastando es `,(0,b.jsx)(`strong`,{children:A}),`.`]})}),(0,b.jsxs)(`div`,{className:`category-spendings`,children:[(0,b.jsx)(`h3`,{children:`Gasto por Categorías`}),(0,b.jsx)(`div`,{className:`categories-progress-list`,children:_.map(e=>{let t=D[e.id]||0,n=E>0?Math.round(t/E*100):0;return t===0?null:(0,b.jsxs)(`div`,{className:`category-progress-item`,children:[(0,b.jsxs)(`div`,{className:`flex-between progress-labels`,children:[(0,b.jsx)(`span`,{className:`progress-cat-name`,children:e.name}),(0,b.jsxs)(`span`,{className:`progress-cat-val`,children:[`RD$ `,t.toLocaleString(),` (`,n,`%)`]})]}),(0,b.jsx)(`div`,{className:`progress-bar-bg`,children:(0,b.jsx)(`div`,{className:`progress-bar-fill`,style:{width:`${n}%`,backgroundColor:e.color}})})]},e.id)})})]}),(0,b.jsxs)(`div`,{className:`savings-advice-box`,children:[(0,b.jsxs)(`h3`,{className:`flex-between`,style:{color:`#16a34a`,fontSize:`1.05rem`},children:[(0,b.jsxs)(`span`,{children:[`Consejo de Ahorro (`,A,`)`]}),(0,b.jsx)(c,{size:18})]}),(0,b.jsx)(`p`,{children:(()=>{if(E===0)return`Agrega productos a tu lista para recibir consejos de ahorro.`;switch(O){case`granos-basicos`:return`Tu mayor gasto está en Granos y básicos. Intenta comprar arroz en sacos más grandes (de 10 lb o 20 lb) y habichuelas secas en lugar de enlatadas para reducir costos drásticamente.`;case`carnes-proteinas`:return`Tu mayor gasto está en Carnes y proteínas. Considera combinar tu consumo de carnes con huevos o embutidos nacionales, que rinden más por porción, o realizar compras en mercados locales o mayoristas.`;case`lacteos`:return`Tu mayor gasto está en Lácteos. Opta por empaques tipo UHT (larga duración) en oferta o marcas locales que suelen tener mejor precio por litro que las importadas.`;case`viveres-frescos`:return`Tu mayor gasto está en Víveres y verduras. Compra plátanos, yucas y verduras en mercados locales, colmados grandes o en los días de plaza de los supermercados (habitualmente martes y miércoles).`;case`limpieza`:return`Tu mayor gasto está en Limpieza. Comprar cloro y detergente líquido a granel o marcas blancas de supermercados te ayudará a ahorrar hasta un 30% en esta categoría.`;case`higiene`:return`Tu mayor gasto está en Higiene. Intenta comprar paquetes familiares de papel higiénico y jabones en empaques múltiples para bajar el precio unitario por rollo/barra.`;default:return`Planifica tus compras anotando todo y evita ir al supermercado con hambre para no realizar compras por impulso.`}})()})]})]}):(0,b.jsx)(`div`,{className:`empty-cart-state text-center`,children:(0,b.jsx)(`p`,{children:`No tienes productos agregados a tu lista. Empieza a añadir cantidades para ver tu presupuesto detallado.`})}),(0,b.jsx)(e,{id:`monthly-after-receipt`,placement:`Compra Mensual - Resumen`}),(0,b.jsx)(`div`,{className:`update-note`,style:{fontSize:`0.85rem`,color:`var(--text-muted)`,marginTop:`1rem`,borderTop:`1px solid var(--border-color)`,paddingTop:`0.75rem`},children:(0,b.jsxs)(`p`,{children:[`Precios estimados actualizados a: `,(0,b.jsx)(`strong`,{children:g})]})}),(0,b.jsx)(`div`,{className:`receipt-actions flex-between`,style:{marginTop:`1.5rem`},children:(0,b.jsxs)(`button`,{className:`btn btn-secondary btn-block`,onClick:T,disabled:E===0,children:[(0,b.jsx)(r,{size:16}),` Vaciar carrito`]})})]})})]}),(0,b.jsx)(`div`,{style:{marginTop:`2rem`},children:(0,b.jsx)(t,{})}),(0,b.jsx)(e,{id:`monthly-before-faq`,placement:`Compra Mensual - Antes del FAQ`}),(0,b.jsx)(n,{items:i}),(0,b.jsx)(e,{id:`monthly-before-footer`,placement:`Compra Mensual - Antes del Footer`}),(0,b.jsx)(`style`,{children:`
        .city-selector-card {
          border-left: 5px solid var(--primary);
        }

        .category-group h3 {
          margin-top: 0;
          margin-bottom: 1rem;
          font-size: 1.15rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
        }

        .category-products-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .product-row-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem 0.5rem;
          border-bottom: 1px solid var(--border-color);
          border-radius: 8px;
          transition: background-color var(--transition-fast);
        }

        .product-row-item:last-child {
          border-bottom: none;
        }

        .product-row-item.selected {
          background-color: var(--bg-color);
        }

        .product-info-col {
          display: flex;
          flex-direction: column;
        }

        .product-info-col strong {
          color: var(--text-main);
          font-size: 1.05rem;
        }

        .product-price-tag {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        /* Receipt details */
        .receipt-card {
          border-color: #cbd5e1;
        }

        .receipt-total-display {
          background-color: var(--text-main);
          color: #ffffff;
          border-radius: var(--radius-md);
          padding: 1.25rem;
          text-align: center;
          margin: 1rem 0 1.5rem 0;
        }

        .receipt-total-label {
          display: block;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #94a3b8;
          margin-bottom: 0.15rem;
        }

        .receipt-total-val {
          font-size: 2rem;
          font-weight: 800;
        }

        .empty-cart-state {
          padding: 2rem 1rem;
          border: 2px dashed var(--border-color);
          border-radius: var(--radius-md);
          color: var(--text-muted);
          margin-bottom: 1.5rem;
        }

        /* Progress bars for category spendings */
        .category-spendings h3 {
          font-size: 1.05rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .categories-progress-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .progress-labels {
          font-size: 0.9rem;
          margin-bottom: 0.25rem;
        }

        .progress-cat-name {
          font-weight: 500;
          color: var(--text-main);
        }

        .progress-cat-val {
          color: var(--text-muted);
        }

        .progress-bar-bg {
          background-color: #f1f5f9;
          height: 8px;
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          border-radius: 4px;
          transition: width var(--transition-normal);
        }

        .savings-advice-box {
          background-color: var(--success-light);
          border: 1px solid #bbf7d0;
          border-radius: var(--radius-md);
          padding: 1rem 1.25rem;
          color: #14532d;
          margin-bottom: 1.5rem;
        }

        .savings-advice-box h3 {
          margin-top: 0;
          margin-bottom: 0.5rem;
        }

        .savings-advice-box p {
          margin: 0;
          font-size: 0.95rem;
          color: #15803d;
        }

        @media (max-width: 900px) {
          .grid-2 {
            grid-template-columns: 1fr;
          }
          .receipt-card {
            position: static !important;
          }
        }
      `})]})}export{x as default};