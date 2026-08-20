import{t as e}from"./chevron-right-pPBPDek6.js";import{n as t,r as n,t as r}from"./FAQSection-6LkvNqUE.js";import{t as i}from"./circle-alert-CpBVeHgU.js";import{t as a}from"./rotate-ccw-CQqGgjHB.js";import{n as o,t as s}from"./square-CPNLEyLX.js";import{C as c,M as l,_ as u,a as d,j as f,k as p,l as m,m as h,t as g,u as _}from"./index-CcRPQjzS.js";import{t as v}from"./SEOHead-B_urCUzb.js";import{t as y}from"./PageHero-BBYkHNaQ.js";import{a as b,c as x,i as S,n as C}from"./mockData-ftnZiiN_.js";var w=p(`chevron-left`,[[`path`,{d:`m15 18-6-6 6-6`,key:`1wnfg3`}]]),T=l(f(),1),E=g();function D(){let l=[{question:`¿Cómo funciona el comparador de supermercados?`,answer:`El comparador te permite simular una lista de compras y calcula el total estimado de referencia para cada supermercado en tu provincia, ayudándote a identificar el comercio más económico para tu compra.`},{question:`¿Con qué frecuencia se actualizan los precios?`,answer:`Los precios son estimaciones y referencias actualizables de manera periódica. Reflejan fluctuaciones promedio del mercado dominicano y pueden variar según sucursal, fecha, marca y ofertas disponibles.`},{question:`¿Qué supermercados puedo comparar?`,answer:`Puedes comparar los precios estimados en Bravo, La Sirena, Jumbo, Supermercados Nacional, Olé y Plaza Lama de forma simultánea.`}],f={"@context":`https://schema.org`,"@type":`FAQPage`,mainEntity:l.map(e=>({"@type":`Question`,name:e.question,acceptedAnswer:{"@type":`Answer`,text:e.answer}}))},p={"@context":`https://schema.org`,"@type":`SoftwareApplication`,name:`Comparador de Supermercados RD - CuantoCuestaRD`,operatingSystem:`All`,applicationCategory:`FinanceApplication`,description:`Herramienta para comparar el costo estimado de una canasta de productos básicos entre los principales supermercados de la República Dominicana.`,offers:{"@type":`Offer`,price:`0`,priceCurrency:`DOP`}},[g,D]=(0,T.useState)(1),[O,k]=(0,T.useState)(`santo-domingo`),[A,j]=(0,T.useState)(`basica`),[M,N]=(0,T.useState)(1),[P,F]=(0,T.useState)([]),[I,L]=(0,T.useState)({}),[R,z]=(0,T.useState)(null),[B,V]=(0,T.useState)([]);(0,T.useEffect)(()=>{let e={};S.forEach(t=>{let n=!1,r=0;n=A===`basica`?[`arroz-10`,`aceite-64`,`habichuelas-1`,`pastas-400`,`azucar-2`,`pollo-lb`,`huevos-30`,`salami-1`,`platano-unidad`,`yuca-lb`,`jabon-cuaba-unidad`].includes(t.id):A===`limpieza`?[`detergente-1kg`,`cloro-galon`,`papel-higienico-4`,`jabon-cuaba-unidad`,`jabon-tocador`].includes(t.id):A===`familiar`?![`jabon-tocador`].includes(t.id):!0,n&&(r=t.id===`platano-unidad`?M*5:t.id===`leche-1l`?M*3:t.id===`arroz-10`?Math.max(1,Math.round(M*.5)):t.id===`pollo-lb`?M*4:t.id===`huevos-30`?Math.max(1,Math.round(M*.7)):M),e[t.id]=r}),L(e)},[A,M]);let H=()=>{if(z(null),g===1){if(!O){z(`Completa este campo para poder calcular: selecciona tu ciudad.`);return}D(2)}else if(g===2){if(P.length===0){z(`Selecciona al menos un supermercado para comparar.`);return}D(3)}},U=()=>{z(null),D(e=>e-1)},W=e=>{z(null),P.includes(e)?F(P.filter(t=>t!==e)):F([...P,e])},G=(e,t)=>{t<0||L({...I,[e]:t})},K=()=>{if(z(null),Object.values(I).reduce((e,t)=>e+t,0)===0){z(`Debes tener al menos 1 producto con cantidad mayor que cero para comparar.`);return}let e=P.map(e=>{let t=b.find(t=>t.id===e),n=0;return Object.entries(I).forEach(([t,r])=>{if(r>0){let i=x(t,e,O);n+=i*r}}),{supermarketId:e,name:t.name,total:Math.round(n),logoColor:t.logoColor}});e.sort((e,t)=>e.total-t.total),V(e),D(4)},q=()=>{k(`santo-domingo`),j(`basica`),N(1),F([]),L({}),z(null),V([]),D(1)},J=B[0],Y=B[B.length-1],X=J&&Y?Y.total-J.total:0;return(0,E.jsxs)(`div`,{className:`comparador-page`,children:[(0,E.jsx)(v,{title:`Comparador de Supermercados RD | ¿Dónde sale más barato comprar?`,description:`Compara supermercados en RD y descubre dónde puede salir más barata tu canasta de productos básicos.`,schema:[f,p]}),(0,E.jsx)(y,{category:`supermercados`,title:`Comparador de Supermercados`,description:`Compara el costo estimado de tu compra entre los principales supermercados de RD.`,icon:h,chips:[`supermercado`,`precios`,`canasta`]}),(0,E.jsxs)(`div`,{className:`steps-container`,"aria-label":`Progreso de pasos`,children:[(0,E.jsx)(`div`,{className:`step-node ${g>=1?`active`:``} ${g>1?`completed`:``}`,children:`1`}),(0,E.jsx)(`div`,{className:`step-node ${g>=2?`active`:``} ${g>2?`completed`:``}`,children:`2`}),(0,E.jsx)(`div`,{className:`step-node ${g>=3?`active`:``} ${g>3?`completed`:``}`,children:`3`}),(0,E.jsx)(`div`,{className:`step-node ${g>=4?`active`:``} ${g>4?`completed`:``}`,children:`4`})]}),(0,E.jsxs)(`div`,{className:`card form-card`,children:[R&&(0,E.jsxs)(`div`,{className:`error-alert`,role:`alert`,children:[(0,E.jsx)(i,{size:20}),(0,E.jsx)(`span`,{children:R})]}),g===1&&(0,E.jsxs)(`div`,{className:`step-content`,children:[(0,E.jsx)(`h2`,{children:`Paso 1: ¿Dónde y para quién es la compra?`}),(0,E.jsx)(`p`,{children:`Define la provincia y el tipo de canasta que deseas comparar. Te sugeriremos cantidades estimadas de inmediato.`}),(0,E.jsxs)(`div`,{className:`form-group`,children:[(0,E.jsxs)(`label`,{htmlFor:`city-select`,className:`form-label`,children:[(0,E.jsx)(u,{size:18,className:`inline-icon`}),` Ciudad / Provincia:`]}),(0,E.jsx)(`select`,{id:`city-select`,className:`form-control`,value:O,onChange:e=>k(e.target.value),children:C.map(e=>(0,E.jsx)(`option`,{value:e.id,children:e.name},e.id))})]}),(0,E.jsxs)(`div`,{className:`form-group`,children:[(0,E.jsxs)(`label`,{htmlFor:`people-select`,className:`form-label`,children:[(0,E.jsx)(d,{size:18,className:`inline-icon`}),` Cantidad de personas en el hogar:`]}),(0,E.jsxs)(`select`,{id:`people-select`,className:`form-control`,value:M,onChange:e=>N(Number(e.target.value)),children:[(0,E.jsx)(`option`,{value:1,children:`1 persona (Individual)`}),(0,E.jsx)(`option`,{value:2,children:`2 personas (Pareja)`}),(0,E.jsx)(`option`,{value:3,children:`Familia de 3 personas`}),(0,E.jsx)(`option`,{value:4,children:`Familia de 4 personas`}),(0,E.jsx)(`option`,{value:5,children:`Familia de 5 o más personas`})]})]}),(0,E.jsxs)(`div`,{className:`form-group`,children:[(0,E.jsxs)(`span`,{className:`form-label`,children:[(0,E.jsx)(_,{size:18,className:`inline-icon`}),` Tipo de canasta que necesitas comparar:`]}),(0,E.jsxs)(`div`,{className:`options-grid`,children:[(0,E.jsxs)(`div`,{className:`option-card ${A===`basica`?`selected`:``}`,onClick:()=>j(`basica`),children:[(0,E.jsx)(`input`,{type:`radio`,id:`basket-basica`,name:`basketType`,checked:A===`basica`,readOnly:!0}),(0,E.jsxs)(`div`,{className:`option-text`,children:[(0,E.jsx)(`div`,{className:`option-card-label`,children:`Canasta Básica`}),(0,E.jsx)(`span`,{className:`option-desc`,children:`Solo artículos esenciales`})]})]}),(0,E.jsxs)(`div`,{className:`option-card ${A===`familiar`?`selected`:``}`,onClick:()=>j(`familiar`),children:[(0,E.jsx)(`input`,{type:`radio`,id:`basket-familiar`,name:`basketType`,checked:A===`familiar`,readOnly:!0}),(0,E.jsxs)(`div`,{className:`option-text`,children:[(0,E.jsx)(`div`,{className:`option-card-label`,children:`Canasta Familiar`}),(0,E.jsx)(`span`,{className:`option-desc`,children:`Básicos y más variedad`})]})]}),(0,E.jsxs)(`div`,{className:`option-card ${A===`limpieza`?`selected`:``}`,onClick:()=>j(`limpieza`),children:[(0,E.jsx)(`input`,{type:`radio`,id:`basket-limpieza`,name:`basketType`,checked:A===`limpieza`,readOnly:!0}),(0,E.jsxs)(`div`,{className:`option-text`,children:[(0,E.jsx)(`div`,{className:`option-card-label`,children:`Limpieza e Higiene`}),(0,E.jsx)(`span`,{className:`option-desc`,children:`Hogar y aseo personal`})]})]}),(0,E.jsxs)(`div`,{className:`option-card ${A===`completa`?`selected`:``}`,onClick:()=>j(`completa`),children:[(0,E.jsx)(`input`,{type:`radio`,id:`basket-completa`,name:`basketType`,checked:A===`completa`,readOnly:!0}),(0,E.jsxs)(`div`,{className:`option-text`,children:[(0,E.jsx)(`div`,{className:`option-card-label`,children:`Compra Completa`}),(0,E.jsx)(`span`,{className:`option-desc`,children:`Todos los productos listados`})]})]})]})]}),(0,E.jsx)(`div`,{className:`step-actions`,children:(0,E.jsxs)(`button`,{className:`btn btn-primary btn-block`,onClick:H,children:[`Continuar a Supermercados `,(0,E.jsx)(e,{size:20})]})})]}),g===2&&(0,E.jsxs)(`div`,{className:`step-content`,children:[(0,E.jsx)(`h2`,{children:`Paso 2: ¿Cuáles supermercados quieres comparar?`}),(0,E.jsx)(`p`,{children:`Selecciona dos o más supermercados para encontrar el mejor precio estimado.`}),(0,E.jsx)(`div`,{className:`options-grid`,style:{margin:`2rem 0`},children:b.map(e=>{let t=P.includes(e.id);return(0,E.jsxs)(`div`,{className:`option-card ${t?`selected`:``}`,onClick:()=>W(e.id),style:{borderLeft:`6px solid ${e.logoColor}`},children:[t?(0,E.jsx)(o,{size:22,className:`text-success`}):(0,E.jsx)(s,{size:22}),(0,E.jsx)(`span`,{className:`option-card-label`,children:e.name})]},e.id)})}),(0,E.jsxs)(`div`,{className:`step-actions flex-between`,children:[(0,E.jsxs)(`button`,{className:`btn btn-secondary`,onClick:U,children:[(0,E.jsx)(w,{size:20}),` Atrás`]}),(0,E.jsxs)(`button`,{className:`btn btn-primary`,onClick:H,children:[`Revisar Productos `,(0,E.jsx)(e,{size:20})]})]})]}),g===3&&(0,E.jsxs)(`div`,{className:`step-content`,children:[(0,E.jsx)(`h2`,{children:`Paso 3: Ajusta las cantidades de tu compra`}),(0,E.jsx)(`p`,{children:`Hemos sugerido una cantidad inicial para una persona. Cambia las cantidades a tu gusto usando los botones grandes.`}),(0,E.jsx)(`div`,{className:`product-table-wrapper scroll-table`,children:(0,E.jsxs)(`table`,{className:`product-qty-table`,children:[(0,E.jsx)(`thead`,{children:(0,E.jsxs)(`tr`,{children:[(0,E.jsx)(`th`,{children:`Producto`}),(0,E.jsx)(`th`,{children:`Unidad`}),(0,E.jsx)(`th`,{style:{textAlign:`center`},children:`Cantidad`})]})}),(0,E.jsx)(`tbody`,{children:S.map(e=>{let t=I[e.id]||0;return(0,E.jsxs)(`tr`,{className:t>0?`active-row`:`inactive-row`,children:[(0,E.jsx)(`td`,{children:(0,E.jsx)(`div`,{className:`product-name-cell`,children:(0,E.jsx)(`strong`,{children:e.name})})}),(0,E.jsx)(`td`,{children:(0,E.jsx)(`span`,{className:`product-unit-tag`,children:e.unit})}),(0,E.jsx)(`td`,{children:(0,E.jsxs)(`div`,{className:`qty-control-box`,children:[(0,E.jsx)(`button`,{className:`qty-btn`,onClick:()=>G(e.id,t-1),"aria-label":`Reducir 1 ${e.name}`,children:`-`}),(0,E.jsx)(`input`,{type:`number`,className:`qty-input`,value:t,onChange:t=>G(e.id,Number(t.target.value)),"aria-label":`Cantidad de ${e.name}`,min:`0`}),(0,E.jsx)(`button`,{className:`qty-btn`,onClick:()=>G(e.id,t+1),"aria-label":`Aumentar 1 ${e.name}`,children:`+`})]})})]},e.id)})})]})}),(0,E.jsxs)(`div`,{className:`step-actions flex-between`,style:{marginTop:`2rem`},children:[(0,E.jsxs)(`button`,{className:`btn btn-secondary`,onClick:U,children:[(0,E.jsx)(w,{size:20}),` Atrás`]}),(0,E.jsxs)(`button`,{className:`btn btn-success`,onClick:K,children:[(0,E.jsx)(c,{size:20}),` Comparar precios`]})]})]}),g===4&&(0,E.jsxs)(`div`,{className:`step-content`,children:[(0,E.jsx)(`h2`,{children:`Resultados de la Comparación`}),(0,E.jsxs)(`p`,{children:[`Cálculo estimado basado en `,Object.values(I).reduce((e,t)=>e+t,0),` productos en la provincia `,(0,E.jsx)(`strong`,{children:C.find(e=>e.id===O)?.name}),`.`]}),B.length>1&&(0,E.jsxs)(`div`,{className:`result-highlight-card`,children:[(0,E.jsxs)(`div`,{className:`savings-badge`,children:[(0,E.jsx)(m,{size:32}),(0,E.jsxs)(`div`,{children:[(0,E.jsx)(`span`,{className:`badge-title`,children:`Ahorro Máximo Estimado`}),(0,E.jsxs)(`span`,{className:`badge-value`,children:[`RD$ `,X.toLocaleString()]})]})]}),(0,E.jsxs)(`p`,{className:`summary-sentence`,children:[`Para esta canasta, el supermercado más económico para esta canasta estimada es `,(0,E.jsx)(`strong`,{children:J.name}),`. La diferencia frente al supermercado más caro (`,Y.name,`) es de `,(0,E.jsxs)(`strong`,{children:[`RD$ `,X.toLocaleString()]}),`.`]})]}),(0,E.jsx)(`div`,{className:`results-list`,children:B.map((e,t)=>{let n=t===0,r=t===B.length-1;return(0,E.jsxs)(`div`,{className:`result-item-card ${n?`cheapest-border`:``}`,style:{borderLeftColor:e.logoColor},children:[(0,E.jsxs)(`div`,{className:`result-item-info`,children:[(0,E.jsxs)(`span`,{className:`result-position-badge`,children:[`#`,t+1]}),(0,E.jsxs)(`div`,{children:[(0,E.jsx)(`h3`,{children:e.name}),n&&(0,E.jsx)(`span`,{className:`tag tag-success`,children:`Más Económico`}),r&&B.length>1&&(0,E.jsx)(`span`,{className:`tag tag-danger`,children:`El Más Caro`})]})]}),(0,E.jsxs)(`div`,{className:`result-item-price`,children:[(0,E.jsx)(`span`,{className:`price-label`,children:`Total estimado:`}),(0,E.jsxs)(`span`,{className:`price-value`,children:[`RD$ `,e.total.toLocaleString()]})]})]},e.supermarketId)})}),(0,E.jsx)(t,{id:`comparador-after-results`,placement:`Comparador - Después de Resultados`}),(0,E.jsx)(`div`,{className:`update-note`,children:(0,E.jsxs)(`p`,{children:[`Fecha de actualización de la base de precios: `,(0,E.jsx)(`strong`,{children:`Junio 2026`})]})}),(0,E.jsx)(n,{}),(0,E.jsx)(`div`,{className:`step-actions text-center`,style:{marginTop:`2rem`},children:(0,E.jsxs)(`button`,{className:`btn btn-secondary btn-block`,onClick:q,children:[(0,E.jsx)(a,{size:18}),` Limpiar datos y comparar de nuevo`]})})]})]}),(0,E.jsx)(t,{id:`comparador-before-faq`,placement:`Comparador - Antes del FAQ`}),(0,E.jsx)(r,{items:l}),(0,E.jsx)(t,{id:`comparador-before-footer`,placement:`Comparador - Antes del Footer`}),(0,E.jsx)(`style`,{children:`
        .error-alert {
          background-color: var(--danger-light);
          border: 1px solid var(--danger);
          border-left: 5px solid var(--danger);
          border-radius: var(--radius-sm);
          padding: 1rem;
          color: #7f1d1d;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          font-weight: 500;
        }

        .inline-icon {
          vertical-align: middle;
          margin-right: 4px;
        }

        .form-card {
          margin-bottom: 3rem;
        }

        .option-desc {
          font-size: 0.85rem;
          color: var(--text-muted);
          display: block;
        }

        .step-actions {
          border-top: 1px solid var(--border-color);
          padding-top: 1.5rem;
          margin-top: 1.5rem;
        }

        /* Table styles */
        .product-table-wrapper {
          overflow-x: auto;
          margin: 1.5rem 0;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
        }

        .product-qty-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .product-qty-table th,
        .product-qty-table td {
          padding: 1rem;
          border-bottom: 1px solid var(--border-color);
        }

        .product-qty-table th {
          background-color: var(--bg-color);
          font-weight: 600;
          color: var(--text-main);
        }

        .product-qty-table tr.active-row td {
          background-color: var(--primary-light);
        }

        .product-unit-tag {
          font-size: 0.9rem;
          background-color: #f1f5f9;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          color: var(--text-muted);
        }

        /* Quantity controls */
        .qty-control-box {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.25rem;
          max-width: 140px;
          margin: 0 auto;
        }

        .qty-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid var(--border-color);
          background-color: #ffffff;
          font-size: 1.25rem;
          font-weight: bold;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-main);
          transition: all var(--transition-fast);
        }

        .qty-btn:hover {
          background-color: var(--primary-light);
          border-color: var(--primary);
          color: var(--primary);
        }

        .qty-input {
          width: 48px;
          height: 36px;
          text-align: center;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          font-size: 1.05rem;
          font-weight: 500;
          font-family: var(--font-sans);
          -moz-appearance: textfield;
        }

        .qty-input::-webkit-outer-spin-button,
        .qty-input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Results styling */
        .result-highlight-card {
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
          border: 1px solid #bbf7d0;
          border-left: 6px solid var(--success);
          border-radius: var(--radius-md);
          padding: 1.5rem;
          margin-bottom: 2rem;
        }

        .savings-badge {
          display: flex;
          align-items: center;
          gap: 1rem;
          color: #14532d;
          margin-bottom: 0.75rem;
        }

        .badge-title {
          display: block;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
        }

        .badge-value {
          font-size: 1.75rem;
          font-weight: 700;
        }

        .summary-sentence {
          font-size: 1.1rem;
          color: #14532d;
          margin: 0;
        }

        .results-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .result-item-card {
          background-color: #ffffff;
          border: 1px solid var(--border-color);
          border-left: 8px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 1.25rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: var(--shadow-sm);
        }

        .result-item-card.cheapest-border {
          box-shadow: var(--shadow-md);
          border-color: #bbf7d0;
        }

        .result-item-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .result-position-badge {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: #f1f5f9;
          color: var(--text-muted);
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .result-item-card.cheapest-border .result-position-badge {
          background-color: var(--success);
          color: white;
        }

        .result-item-info h3 {
          margin: 0 0 0.25rem 0;
          font-size: 1.2rem;
        }

        .tag {
          font-size: 0.8rem;
          font-weight: 600;
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
          text-transform: uppercase;
        }

        .tag-success {
          background-color: var(--success-light);
          color: var(--success);
          border: 1px solid #bbf7d0;
        }

        .tag-danger {
          background-color: var(--danger-light);
          color: var(--danger);
          border: 1px solid #fecaca;
        }

        .result-item-price {
          text-align: right;
          display: flex;
          flex-direction: column;
        }

        .price-label {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .price-value {
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .update-note {
          text-align: center;
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
          color: var(--text-muted);
        }

        @media (max-width: 600px) {
          .result-item-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          .result-item-price {
            text-align: left;
            width: 100%;
            border-top: 1px solid var(--border-color);
            padding-top: 0.5rem;
          }
        }
      `})]})}export{D as default};