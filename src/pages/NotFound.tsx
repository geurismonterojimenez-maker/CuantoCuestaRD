import { Link } from 'react-router-dom';
import { FileQuestion, Home, ArrowRight } from 'lucide-react';
import SEOHead from '../components/SEOHead';

export default function NotFound() {
  return (
    <div className="content-page flex flex-col items-center justify-center min-h-[70vh] text-center px-4 py-12">
      <SEOHead
        title="Página no encontrada | CuantoCuestaRD"
        description="La página que buscas no existe o ha sido movida. Explora nuestras herramientas de finanzas, courier y servicios en República Dominicana."
        noindex={true}
      />

      <div className="card max-w-md mx-auto flex flex-col items-center justify-center p-8 md:p-10 shadow-xl border border-slate-100 rounded-2xl bg-white/80 backdrop-blur-md">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-6 text-red-500">
          <FileQuestion size={36} />
        </div>

        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-3">
          404 - Página no encontrada
        </h1>

        <p className="text-slate-600 mb-8 leading-relaxed">
          Lo sentimos, la calculadora o página que estás buscando no existe, ha cambiado de nombre o fue movida temporalmente.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all shadow-md hover:shadow-lg active:scale-95"
            style={{ minHeight: '44px' }}
          >
            <Home size={18} />
            <span>Ir al Inicio</span>
          </Link>

          <Link
            to="/herramientas"
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50 hover:bg-slate-100 font-medium transition-all active:scale-95"
            style={{ minHeight: '44px' }}
          >
            <span>Ver Herramientas</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
