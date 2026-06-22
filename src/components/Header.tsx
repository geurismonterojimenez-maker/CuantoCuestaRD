import { useState, type ComponentType } from 'react';
import { NavLink } from 'react-router-dom';
import logoCuantoCuestaRD from '../assets/brand/logo-cuantocuestard.svg';
import iconCuantocuestard from '../assets/brand/icon-cuantocuestard.svg';
import {
  BookOpen,
  Calculator,
  Calendar,
  Car,
  ChevronDown,
  DollarSign,
  Droplet,
  FileText,
  Fuel,
  Home as HomeIcon,
  ListTodo,
  MapPin,
  Menu,
  Package,
  Percent,
  Scale,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShoppingBag,
  TrendingDown,
  TrendingUp,
  Truck,
  User,
  Users,
  Wallet,
  Wifi,
  X,
  Zap
} from 'lucide-react';

type NavItem = {
  to: string;
  label: string;
  icon: ComponentType<{ size?: number }>;
};

type NavGroup = {
  key: string;
  label: string;
  theme: string;
  items: NavItem[];
};

const navGroups: NavGroup[] = [
  {
    key: 'supermercados',
    label: 'Supermercados',
    theme: 'theme-supermercados',
    items: [
      { to: '/comparador-supermercados-rd', label: 'Comparador de Precios', icon: Scale },
      { to: '/canasta-basica-rd', label: 'Canasta Básica', icon: Calculator },
      { to: '/calculadora-compra-mensual-rd', label: 'Compra Mensual', icon: ShoppingBag },
      { to: '/cual-es-el-supermercado-mas-barato-de-rd', label: '¿Cuál es más barato?', icon: TrendingDown },
      { to: '/supermercados-por-ciudad-rd', label: 'Precios por Ciudad', icon: MapPin }
    ]
  },
  {
    key: 'finanzas',
    label: 'Finanzas',
    theme: 'theme-finanzas',
    items: [
      { to: '/calculadora-presupuesto-mensual-rd', label: 'Presupuesto Mensual', icon: DollarSign },
      { to: '/me-alcanza-el-sueldo', label: '¿Me alcanza el sueldo?', icon: Wallet },
      { to: '/calculadora-ahorro-mensual-rd', label: 'Meta de Ahorro', icon: TrendingUp },
      { to: '/deudas-vs-ingresos-rd', label: 'Deudas vs Ingresos', icon: ShieldAlert },
      { to: '/cuanto-puedo-gastar-en-supermercado', label: 'Gasto en Supermercado', icon: Percent }
    ]
  },
  {
    key: 'costodevida',
    label: 'Costo de Vida',
    theme: 'theme-costodevida',
    items: [
      { to: '/costo-de-vida-rd', label: 'Costo de Vida RD', icon: TrendingUp },
      { to: '/cuanto-cuesta-vivir-solo-en-rd', label: '¿Cuánto cuesta vivir solo?', icon: User },
      { to: '/cuanto-cuesta-vivir-en-pareja-rd', label: '¿Cuánto cuesta vivir en pareja?', icon: Users },
      { to: '/cuanto-cuesta-mantener-una-familia-rd', label: 'Mantener una Familia', icon: Users },
      { to: '/costo-de-vida-por-ciudad-rd', label: 'Costo por Ciudad', icon: MapPin }
    ]
  },
  {
    key: 'vehiculos',
    label: 'Vehículos',
    theme: 'theme-vehiculos',
    items: [
      { to: '/calculadora-prestamo-vehiculo-rd', label: 'Préstamo de Vehículo', icon: Car },
      { to: '/cuanto-cuesta-mantener-un-carro-en-rd', label: '¿Cuánto cuesta mantenerlo?', icon: TrendingDown },
      { to: '/calculadora-combustible-rd', label: 'Combustible Mensual', icon: Fuel },
      { to: '/seguro-y-mantenimiento-vehiculo-rd', label: 'Seguro y Mantenimiento', icon: Shield },
      { to: '/cuanto-debo-ganar-para-comprar-un-carro', label: '¿Cuánto debo ganar?', icon: Wallet }
    ]
  },
  {
    key: 'courier',
    label: 'Courier',
    theme: 'theme-courier',
    items: [
      { to: '/calculadora-courier-rd', label: 'Calculadora Courier', icon: Package },
      { to: '/calculadora-amazon-rd', label: 'Calculadora Amazon', icon: ShoppingBag },
      { to: '/calculadora-shein-rd', label: 'Calculadora Shein', icon: ShoppingBag },
      { to: '/impuestos-paquetes-mas-de-200-dolares-rd', label: 'Paquetes más de US$200', icon: DollarSign },
      { to: '/comparador-courier-rd', label: 'Comparador de Couriers', icon: Scale }
    ]
  },
  {
    key: 'hogar',
    label: 'Hogar y Trámites',
    theme: 'theme-hogar',
    items: [
      { to: '/calculadora-servicios-hogar-rd', label: 'Servicios del Hogar', icon: HomeIcon },
      { to: '/calculadora-luz-rd', label: 'Luz Mensual', icon: Zap },
      { to: '/calculadora-internet-telefono-rd', label: 'Internet y Teléfono', icon: Wifi },
      { to: '/calculadora-gas-agua-rd', label: 'Gas y Agua', icon: Droplet },
      { to: '/cuanto-cuesta-mudarse-en-rd', label: 'Mudarse y Equipar', icon: Truck },
      { to: '/calculadora-tramites-rd', label: 'Calculadora de Trámites', icon: BookOpen },
      { to: '/cuanto-cuesta-renovar-pasaporte-dominicano', label: 'Pasaporte Dominicano', icon: FileText },
      { to: '/cuanto-cuesta-renovar-licencia-rd', label: 'Licencia de Conducir', icon: ShieldCheck },
      { to: '/calculadora-marbete-rd', label: 'Marbete y Vehículo Legal', icon: Calendar },
      { to: '/checklist-documentos-rd', label: 'Checklist de Documentos', icon: ListTodo }
    ]
  }
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMobileAccordion, setActiveMobileAccordion] = useState<string | null>(null);

  const closeMenu = () => {
    setMenuOpen(false);
    setActiveMobileAccordion(null);
  };

  const getLinkClass = ({ isActive }: { isActive: boolean }) => `nav-link ${isActive ? 'active' : ''}`;

  return (
    <header className="site-header">
      <div className="header-container">
        <NavLink to="/" className="site-logo-link" onClick={closeMenu} aria-label="Ir al inicio de CuantoCuestaRD">
          <picture>
            <source media="(max-width: 768px)" srcSet={iconCuantocuestard} />
            <img
              src={logoCuantoCuestaRD}
              alt="CuantoCuestaRD - Calculadoras de costos en República Dominicana"
              className="site-logo"
            />
          </picture>
        </NavLink>

        <button
          className="menu-toggle-btn"
          onClick={() => {
            setMenuOpen((open) => !open);
            setActiveMobileAccordion(null);
          }}
          aria-expanded={menuOpen}
          aria-label="Abrir menú de navegación"
          type="button"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        <nav className={`site-nav ${menuOpen ? 'open' : ''}`} aria-label="Navegación principal">
          <div className="desktop-nav-links">
            <NavLink to="/" className={getLinkClass} onClick={closeMenu} end>
              Inicio
            </NavLink>
            <NavLink to="/herramientas" className={getLinkClass} onClick={closeMenu}>
              Herramientas
            </NavLink>
            {navGroups.map((group) => (
              <div className={`nav-dropdown ${group.theme}`} key={group.key}>
                <button className="dropdown-trigger nav-link" type="button">
                  {group.label} <ChevronDown size={14} />
                </button>
                <div className="dropdown-menu">
                  {group.items.map(({ to, label, icon: Icon }) => (
                    <NavLink to={to} className={getLinkClass} onClick={closeMenu} key={to}>
                      <Icon size={16} /> {label}
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mobile-nav-links">
            <NavLink to="/" className={getLinkClass} onClick={closeMenu} end>
              Inicio
            </NavLink>
            <NavLink to="/herramientas" className={getLinkClass} onClick={closeMenu}>
              Todas las herramientas
            </NavLink>
            {navGroups.map((group) => {
              const isOpen = activeMobileAccordion === group.key;
              return (
                <div className={`mobile-accordion ${group.theme} ${isOpen ? 'open' : ''}`} key={group.key}>
                  <button
                    type="button"
                    className="accordion-header"
                    onClick={() => setActiveMobileAccordion(isOpen ? null : group.key)}
                    aria-expanded={isOpen}
                  >
                    <span>{group.label}</span>
                    <ChevronDown size={18} className="chevron-icon" />
                  </button>
                  <div className="accordion-content">
                    {group.items.map(({ to, label, icon: Icon }) => (
                      <NavLink to={to} className={getLinkClass} onClick={closeMenu} key={to}>
                        <Icon size={18} /> {label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </nav>
      </div>

      <style>{`
        .site-header {
          background-color: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(226, 232, 240, 0.8);
          position: sticky;
          top: 0;
          z-index: 1000;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.01), 0 2px 4px -1px rgba(0,0,0,0.01);
        }

        .header-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0.85rem 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .site-logo-link {
          display: block;
          text-decoration: none;
          flex-shrink: 0;
        }

        .site-logo {
          height: 42px;
          width: auto;
          display: block;
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .site-logo {
            height: 36px;
          }
        }

        .menu-toggle-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-main);
          padding: 0.35rem;
          border-radius: 6px;
        }

        .site-nav,
        .desktop-nav-links {
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }

        .mobile-nav-links {
          display: none;
        }

        .nav-link {
          color: var(--text-muted);
          font-weight: 600;
          font-size: 0.95rem;
          padding: 0.5rem 0.75rem;
          border-radius: 8px;
          transition: all var(--transition-fast);
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          text-decoration: none;
        }

        .dropdown-trigger,
        .accordion-header {
          font-family: inherit;
        }

        .dropdown-trigger {
          background: none;
          border: none;
          cursor: pointer;
        }

        .nav-link:hover,
        .dropdown-trigger:hover {
          color: var(--primary);
          background-color: var(--primary-light);
        }

        .nav-link.active {
          color: var(--primary);
          background-color: var(--primary-light);
          font-weight: 700;
        }

        .nav-dropdown {
          position: relative;
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          background-color: #ffffff;
          border: 1px solid rgba(226, 232, 240, 0.8);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-lg);
          padding: 0.6rem;
          display: none;
          flex-direction: column;
          gap: 0.2rem;
          min-width: 250px;
          z-index: 100;
        }

        .dropdown-menu .nav-link {
          width: 100%;
          text-align: left;
          padding: 0.5rem 0.75rem;
          font-size: 0.9rem;
          color: var(--text-muted);
          border-radius: 6px;
        }

        .nav-dropdown:hover .dropdown-menu,
        .nav-dropdown:focus-within .dropdown-menu {
          display: flex;
        }

        @media (max-width: 900px) {
          .menu-toggle-btn {
            display: block;
          }

          .site-nav {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background-color: #ffffff;
            border-bottom: 1px solid var(--border-color);
            flex-direction: column;
            padding: 1.25rem 1rem;
            align-items: stretch;
            box-shadow: var(--shadow-md);
            max-height: calc(100vh - 70px);
            overflow-y: auto;
          }

          .site-nav.open {
            display: flex;
          }

          .desktop-nav-links {
            display: none;
          }

          .mobile-nav-links {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            width: 100%;
          }

          .nav-link {
            width: 100%;
            min-height: 44px;
            padding: 0.75rem 1rem;
            font-size: 1rem;
          }

          .mobile-accordion {
            width: 100%;
            border-bottom: 1px solid rgba(226, 232, 240, 0.6);
            padding-bottom: 0.25rem;
          }

          .accordion-header {
            width: 100%;
            background: none;
            border: none;
            padding: 0.75rem 1rem;
            font-size: 1rem;
            font-weight: 700;
            color: var(--text-muted);
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            text-align: left;
            min-height: 44px;
            border-radius: 8px;
            transition: all var(--transition-fast);
          }

          .accordion-header:hover,
          .accordion-header:focus-visible {
            background-color: #f1f5f9;
            color: var(--text-main);
            outline: none;
          }

          .accordion-content {
            display: none;
            flex-direction: column;
            gap: 0.25rem;
            padding: 0.25rem 0 0.5rem 1rem;
            background-color: #f8fafc;
            border-radius: 8px;
            margin-top: 0.25rem;
            border-left: 3px solid var(--theme-primary, var(--primary));
          }

          .mobile-accordion.open .accordion-content {
            display: flex;
          }

          .mobile-accordion.open .chevron-icon {
            transform: rotate(180deg);
          }

          .chevron-icon {
            transition: transform 0.2s ease;
            color: var(--text-muted);
          }

          .mobile-accordion.theme-supermercados { --theme-primary: var(--supermercados-color); }
          .mobile-accordion.theme-finanzas { --theme-primary: var(--finanzas-color); }
          .mobile-accordion.theme-costodevida { --theme-primary: var(--costodevida-color); }
          .mobile-accordion.theme-vehiculos { --theme-primary: var(--vehiculos-color); }
          .mobile-accordion.theme-courier { --theme-primary: var(--courier-color); }
          .mobile-accordion.theme-hogar { --theme-primary: var(--tramites-color); }

          .mobile-accordion.open .accordion-header {
            color: var(--theme-primary, var(--primary));
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .nav-link,
          .accordion-header,
          .chevron-icon {
            transition: none;
          }
        }
      `}</style>
    </header>
  );
}
