import{t as e}from"./chevron-right-pPBPDek6.js";import{i as t,n,r,t as i}from"./FAQSection-6LkvNqUE.js";import{A as a,C as o,D as s,E as c,M as l,O as u,S as d,T as f,_ as p,a as m,b as h,c as g,d as _,f as v,g as y,h as b,i as x,j as S,k as C,l as w,m as T,n as E,o as D,p as O,r as k,s as A,t as j,u as M,v as N,x as P,y as F}from"./index-CcRPQjzS.js";import{t as I}from"./SEOHead-B_urCUzb.js";import{n as L,t as R}from"./toolsDirectory-WhzvzS7l.js";var z=C(`search`,[[`path`,{d:`m21 21-4.34-4.34`,key:`14j7rj`}],[`circle`,{cx:`11`,cy:`11`,r:`8`,key:`4ej97u`}]]),B=l(S(),1),V=j(),H={Scale:T,Calculator:s,ShoppingBag:M,TrendingDown:w,MapPin:p,Wallet:x,DollarSign:o,Percent:b,TrendingUp:g,ShieldAlert:O,User:D,Users:m,Car:f,Fuel:h,Shield:_,Package:y,BookOpen:u,FileText:P,ShieldCheck:v,Calendar:c,ListTodo:N,HomeIcon:F,Zap:E,Wifi:k,Droplet:d,Truck:A};function U(){let[o,s]=(0,B.useState)(``),[c,l]=(0,B.useState)(`todos`),u=[{question:`¿Qué puedo calcular en CuantoCuestaRD?`,answer:`Puedes calcular y comparar el costo de tu compra de supermercado, canasta básica, presupuestos personales según tu sueldo, costo de vida por ciudad, préstamos y mantenimiento de vehículos, fletes de courier e importaciones, trámites oficiales (como pasaporte y licencia) y servicios del hogar (luz, agua, gas e internet).`},{question:`¿Las herramientas son gratis?`,answer:`Sí, todas nuestras herramientas y calculadoras son 100% gratuitas y de libre acceso para todos los dominicanos.`},{question:`¿Los resultados son aproximados?`,answer:`No. Todas las herramientas arrojan presupuestos aproximados y de referencia para planificar. Los costos reales varían según marcas, ofertas, tasas oficiales del momento y decisiones de los proveedores.`},{question:`¿Puedo usar la web desde el celular?`,answer:`Sí, toda la plataforma está diseñada con enfoque móvil-primero (mobile-first) para funcionar cómodamente desde celulares de todas las marcas y tamaños de pantalla.`},{question:`¿Las calculadoras aplican para República Dominicana?`,answer:`Sí, están adaptadas especialmente para República Dominicana, usando tarifas reguladas de luz (EDE), CAASD, tasas oficiales de la DGII, INTRANT y cotizaciones en pesos (RD$) y dólares (US$).`}],d={"@context":`https://schema.org`,"@type":`FAQPage`,mainEntity:u.map(e=>({"@type":`Question`,name:e.question,acceptedAnswer:{"@type":`Answer`,text:e.answer}}))},f={"@context":`https://schema.org`,"@type":`SoftwareApplication`,name:`CuantoCuestaRD Calculadoras de Gastos`,operatingSystem:`Any`,applicationCategory:`FinanceApplication`,offers:{"@type":`Offer`,price:`0`,priceCurrency:`DOP`}},p=L.filter(e=>{let t=c===`todos`||e.category===c,n=o.toLowerCase().trim();return n?t&&(e.title.toLowerCase().includes(n)||e.description.toLowerCase().includes(n)||R[e.category].toLowerCase().includes(n)||e.keywords.some(e=>e.toLowerCase().includes(n))):t}),m=t=>{let n=H[t.iconName]||T;return(0,V.jsxs)(`div`,{className:`card card-hover tool-card theme-${t.category}`,children:[(0,V.jsx)(`div`,{className:`tool-icon`,style:{backgroundColor:`var(--theme-light, var(--primary-light))`,color:`var(--theme-primary, var(--primary))`},children:(0,V.jsx)(n,{size:24})}),(0,V.jsx)(`h3`,{children:t.title}),(0,V.jsx)(`p`,{children:t.description}),(0,V.jsx)(`span`,{className:`badge`,style:{backgroundColor:`var(--theme-light, var(--primary-light))`,color:`var(--theme-primary, var(--primary))`},children:R[t.category]}),(0,V.jsxs)(a,{to:t.route,className:`btn btn-primary btn-block`,style:{marginTop:`auto`},children:[`Usar herramienta `,(0,V.jsx)(e,{size:16})]})]},t.route)};return(0,V.jsxs)(`div`,{className:`herramientas-page`,children:[(0,V.jsx)(I,{title:`Todas las herramientas de CuantoCuestaRD`,description:`Encuentra calculadoras y comparadores para supermercado, sueldo, costo de vida, vehículos, courier, trámites y servicios del hogar en República Dominicana.`,schema:[d,f]}),(0,V.jsxs)(`section`,{className:`hero-section text-center`,children:[(0,V.jsx)(`h1`,{children:`Todas las herramientas de CuantoCuestaRD`}),(0,V.jsx)(`p`,{className:`hero-subtitle`,children:`Encuentra rápido la calculadora que necesitas para organizar tus gastos en República Dominicana.`})]}),(0,V.jsx)(n,{id:`herramientas-after-hero`,placement:`Todas las Herramientas - Después del Hero`}),(0,V.jsx)(`div`,{className:`intro-text-section text-center`,children:(0,V.jsx)(`p`,{children:`Explora nuestro directorio completo de 35 herramientas interactivas diseñadas específicamente para el mercado dominicano. Filtra al instante o desplázate por las diferentes categorías para planificar tus finanzas personales y familiares.`})}),(0,V.jsx)(`div`,{className:`search-container`,children:(0,V.jsxs)(`div`,{className:`search-box`,children:[(0,V.jsx)(z,{className:`search-icon`,size:20}),(0,V.jsx)(`input`,{type:`text`,value:o,onChange:e=>s(e.target.value),placeholder:`Busca: sueldo, carro, pasaporte, luz, courier...`,className:`search-input`,"aria-label":`Buscar herramientas`})]})}),(0,V.jsx)(`div`,{className:`category-chips-container`,children:(0,V.jsxs)(`div`,{className:`category-chips`,children:[(0,V.jsx)(`button`,{type:`button`,className:`chip-btn ${c===`todos`?`active`:``}`,onClick:()=>l(`todos`),children:`Todos`}),Object.entries(R).map(([e,t])=>{let n=t;return e===`supermercados`?n=`🛒 Supermercados`:e===`finanzas`?n=`💰 Finanzas`:e===`costodevida`?n=`💜 Costo de Vida`:e===`vehiculos`?n=`🚗 Vehículos`:e===`courier`?n=`🩵 Courier`:e===`tramites`?n=`📋 Trámites`:e===`hogar`&&(n=`💛 Hogar`),(0,V.jsx)(`button`,{type:`button`,className:`chip-btn chip-${e} ${c===e?`active`:``}`,onClick:()=>l(e),children:n},e)})]})}),o.trim()!==``||c!==`todos`?(0,V.jsxs)(`div`,{className:`search-results-section`,style:{minHeight:`300px`},children:[(0,V.jsxs)(`h2`,{className:`category-heading`,style:{marginTop:`1rem`},children:[c===`todos`?`Resultados de búsqueda`:R[c],` (`,p.length,`)`]}),p.length>0?(0,V.jsx)(`div`,{className:`grid-3`,children:p.map(e=>m(e))}):(0,V.jsxs)(`div`,{className:`card no-results text-center`,children:[(0,V.jsx)(t,{size:48,className:`text-muted`,style:{margin:`0 auto 1rem auto`}}),(0,V.jsx)(`p`,{children:`No encontramos una herramienta con ese nombre en esta categoría. Prueba buscando en "Todos" o ingresando otra palabra.`})]})]}):(0,V.jsx)(`div`,{className:`categories-sections`,children:Object.entries(R).map(([e,t])=>{let n=L.filter(t=>t.category===e);return(0,V.jsxs)(`div`,{className:`category-section`,children:[(0,V.jsx)(`h2`,{className:`category-heading`,children:t}),(0,V.jsx)(`div`,{className:`grid-3`,children:n.map(e=>m(e))})]},e)})}),(0,V.jsx)(n,{id:`herramientas-before-footer`,placement:`Todas las Herramientas - Antes del Footer`}),(0,V.jsx)(`div`,{style:{marginTop:`2.5rem`},children:(0,V.jsx)(r,{type:`finanzas`})}),(0,V.jsx)(i,{items:u}),(0,V.jsx)(`style`,{children:`
        .category-chips-container {
          display: flex;
          justify-content: center;
          margin-bottom: 2rem;
          overflow-x: auto;
          scrollbar-width: none; /* Firefox */
          padding: 0.25rem 0.5rem;
          -webkit-overflow-scrolling: touch;
        }

        .category-chips-container::-webkit-scrollbar {
          display: none; /* Safari/Chrome */
        }

        .category-chips {
          display: flex;
          gap: 0.5rem;
          white-space: nowrap;
        }

        .chip-btn {
          background-color: #ffffff;
          border: 1px solid var(--border-color);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-family: inherit;
          font-weight: 500;
          font-size: 0.9rem;
          color: var(--text-muted);
          cursor: pointer;
          transition: all var(--transition-fast);
          min-height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .chip-btn:hover {
          background-color: var(--bg-color);
          border-color: #cbd5e1;
        }

        .chip-btn.active {
          background-color: var(--primary);
          color: #ffffff;
          border-color: var(--primary);
          box-shadow: var(--shadow-sm);
        }

        /* Category specific active colors */
        .chip-supermercados.active { background-color: var(--supermercados-color) !important; border-color: var(--supermercados-color) !important; }
        .chip-finanzas.active { background-color: var(--finanzas-color) !important; border-color: var(--finanzas-color) !important; }
        .chip-costodevida.active { background-color: var(--costodevida-color) !important; border-color: var(--costodevida-color) !important; }
        .chip-vehiculos.active { background-color: var(--vehiculos-color) !important; border-color: var(--vehiculos-color) !important; }
        .chip-courier.active { background-color: var(--courier-color) !important; border-color: var(--courier-color) !important; }
        .chip-tramites.active { background-color: var(--tramites-color) !important; border-color: var(--tramites-color) !important; }
        .chip-hogar.active { background-color: var(--hogar-color) !important; border-color: var(--hogar-color) !important; }

        @media (max-width: 768px) {
          .category-chips-container {
            justify-content: flex-start;
          }
          .chip-btn {
            font-size: 0.85rem;
            padding: 0.4rem 0.85rem;
            min-height: 44px; /* Touch target minimum height */
          }
        }

        .search-container {
          max-width: 600px;
          margin: 0 auto 2.5rem auto;
        }

        .search-box {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          color: var(--text-muted);
          pointer-events: none;
        }

        .search-input {
          width: 100%;
          padding: 0.9rem 1rem 0.9rem 2.75rem;
          border-radius: 12px;
          border: 2px solid var(--border-color);
          font-size: 1rem;
          font-family: inherit;
          background-color: #ffffff;
          transition: all var(--transition-fast);
          color: var(--text-main);
        }

        .search-input:focus {
          border-color: var(--primary);
          outline: none;
          box-shadow: 0 0 0 3px var(--primary-light);
        }

        .category-heading {
          font-size: 1.4rem;
          color: var(--text-main);
          margin-bottom: 1.25rem;
          border-bottom: 2px solid var(--border-color);
          padding-bottom: 0.5rem;
          margin-top: 2.5rem;
        }

        .badge {
          display: inline-block;
          background-color: var(--primary-light);
          color: var(--primary);
          font-size: 0.8rem;
          font-weight: 600;
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
          margin-bottom: 1rem;
          align-self: flex-start;
        }

        .tool-card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          height: 100%;
        }

        .tool-card h3 {
          margin: 1rem 0 0.5rem 0;
          font-size: 1.2rem;
          color: var(--text-main);
        }

        .tool-card p {
          flex-grow: 1;
          margin-bottom: 1rem;
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        .tool-icon {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .no-results {
          padding: 3rem 1.5rem;
          max-width: 500px;
          margin: 2rem auto;
        }

        .no-results p {
          color: var(--text-muted);
          font-size: 1rem;
          line-height: 1.6;
        }
        
        .intro-text-section {
          max-width: 800px;
          margin: 0 auto 2rem auto;
          line-height: 1.6;
          font-size: 1.02rem;
          color: var(--text-muted);
        }

        @media (max-width: 768px) {
          .search-container {
            padding: 0 0.5rem;
          }
          .category-heading {
            font-size: 1.25rem;
            margin-top: 2rem;
          }
        }
      `})]})}export{U as default};