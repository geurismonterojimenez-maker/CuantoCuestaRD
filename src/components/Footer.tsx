import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>CuantoCuestaRD</h3>
            <p className="footer-desc">
              Calcula y compara los costos reales de vivir y comprar en República Dominicana.
              Herramientas simples para saber cuánto cuesta el supermercado, la canasta básica y tus gastos.
            </p>
          </div>

          <div className="footer-nav">
            <h4>Herramientas</h4>
            <ul>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/herramientas">Todas las herramientas</Link></li>
              <li><Link to="/comparador-supermercados-rd">Comparador de Supermercados</Link></li>
              <li><Link to="/canasta-basica-rd">Canasta Básica RD</Link></li>
              <li><Link to="/calculadora-compra-mensual-rd">Compra Mensual</Link></li>
            </ul>
          </div>

          <div className="footer-nav">
            <h4>Transparencia</h4>
            <ul>
              <li><Link to="/sobre-nosotros">Sobre nosotros</Link></li>
              <li><Link to="/metodologia">Metodología</Link></li>
              <li><Link to="/fuentes">Fuentes y referencias</Link></li>
              <li><a href="/sitemap.xml" target="_blank" rel="noopener noreferrer">Mapa del sitio</a></li>
            </ul>
          </div>

          <div className="footer-nav">
            <h4>Legal y contacto</h4>
            <ul>
              <li><Link to="/contacto">Contacto</Link></li>
              <li><Link to="/privacidad">Política de privacidad</Link></li>
              <li><Link to="/terminos">Términos de uso</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} CuantoCuestaRD. Hecho para República Dominicana. Todos los derechos reservados.</p>
        </div>
      </div>

      <style>{`
        .site-footer {
          background-color: #ffffff;
          border-top: 1px solid var(--border-color);
          padding: 3rem 1rem 1.5rem 1rem;
          margin-top: auto;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 2.5rem;
          margin-bottom: 2.5rem;
        }

        .footer-brand h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 0.75rem;
        }

        .footer-desc {
          font-size: 0.95rem;
          color: var(--text-muted);
          max-width: 340px;
        }

        .footer-nav h4 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-main);
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .footer-nav ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .footer-nav a {
          color: var(--text-muted);
          font-size: 0.95rem;
          transition: color var(--transition-fast);
        }

        .footer-nav a:hover {
          color: var(--primary);
        }

        .footer-bottom {
          border-top: 1px solid var(--border-color);
          padding-top: 1.5rem;
          text-align: center;
        }

        .footer-bottom p {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin: 0;
        }

        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }
        }

        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .site-footer {
            padding: 2rem 1rem 1rem 1rem;
          }
        }
      `}</style>
    </footer>
  );
}
