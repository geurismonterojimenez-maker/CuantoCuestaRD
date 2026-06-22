import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const Home = lazy(() => import('./pages/Home'));
const SupermarketComparador = lazy(() => import('./pages/SupermarketComparador'));
const CanastaBasica = lazy(() => import('./pages/CanastaBasica'));
const MonthlyShopping = lazy(() => import('./pages/MonthlyShopping'));
const CheapestSupermarket = lazy(() => import('./pages/CheapestSupermarket'));
const CityComparison = lazy(() => import('./pages/CityComparison'));
const SueldoAlcanza = lazy(() => import('./pages/SueldoAlcanza'));
const PresupuestoMensual = lazy(() => import('./pages/PresupuestoMensual'));
const SuperGastoSueldo = lazy(() => import('./pages/SuperGastoSueldo'));
const AhorroMensual = lazy(() => import('./pages/AhorroMensual'));
const DeudasIngresos = lazy(() => import('./pages/DeudasIngresos'));
const CostoVidaRD = lazy(() => import('./pages/CostoVidaRD'));
const VivirSoloRD = lazy(() => import('./pages/VivirSoloRD'));
const VivirParejaRD = lazy(() => import('./pages/VivirParejaRD'));
const MantenerFamiliaRD = lazy(() => import('./pages/MantenerFamiliaRD'));
const CostoVidaPorCiudad = lazy(() => import('./pages/CostoVidaPorCiudad'));
const PrestamoVehiculoRD = lazy(() => import('./pages/PrestamoVehiculoRD'));
const MantenerCarroRD = lazy(() => import('./pages/MantenerCarroRD'));
const CombustibleRD = lazy(() => import('./pages/CombustibleRD'));
const SeguroMantenimientoRD = lazy(() => import('./pages/SeguroMantenimientoRD'));
const DeboGanarVehiculoRD = lazy(() => import('./pages/DeboGanarVehiculoRD'));
const CalculadoraCourierRD = lazy(() => import('./pages/CalculadoraCourierRD'));
const CalculadoraAmazonRD = lazy(() => import('./pages/CalculadoraAmazonRD'));
const CalculadoraSheinRD = lazy(() => import('./pages/CalculadoraSheinRD'));
const ImpuestosSobre200RD = lazy(() => import('./pages/ImpuestosSobre200RD'));
const ComparadorCourierRD = lazy(() => import('./pages/ComparadorCourierRD'));
const CalculadoraTramitesRD = lazy(() => import('./pages/CalculadoraTramitesRD'));
const CalculadoraPasaporteRD = lazy(() => import('./pages/CalculadoraPasaporteRD'));
const CalculadoraLicenciaRD = lazy(() => import('./pages/CalculadoraLicenciaRD'));
const CalculadoraMarbeteRD = lazy(() => import('./pages/CalculadoraMarbeteRD'));
const ChecklistDocumentosRD = lazy(() => import('./pages/ChecklistDocumentosRD'));
const CalculadoraServiciosHogarRD = lazy(() => import('./pages/CalculadoraServiciosHogarRD'));
const CalculadoraLuzRD = lazy(() => import('./pages/CalculadoraLuzRD'));
const CalculadoraInternetTelefonoRD = lazy(() => import('./pages/CalculadoraInternetTelefonoRD'));
const CalculadoraGasAguaRD = lazy(() => import('./pages/CalculadoraGasAguaRD'));
const CuantoCuestaMudarseRD = lazy(() => import('./pages/CuantoCuestaMudarseRD'));
const HerramientasPage = lazy(() => import('./pages/HerramientasPage'));
const SobreNosotros = lazy(() => import('./pages/SobreNosotros'));
const Metodologia = lazy(() => import('./pages/Metodologia'));
const Fuentes = lazy(() => import('./pages/Fuentes'));
const Contacto = lazy(() => import('./pages/Contacto'));
const Privacidad = lazy(() => import('./pages/Privacidad'));
const Terminos = lazy(() => import('./pages/Terminos'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Suspense fallback={<div className="page-loading" role="status">Cargando herramienta...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/comparador-supermercados-rd" element={<SupermarketComparador />} />
              <Route path="/canasta-basica-rd" element={<CanastaBasica />} />
              <Route path="/calculadora-compra-mensual-rd" element={<MonthlyShopping />} />
              <Route path="/cual-es-el-supermercado-mas-barato-de-rd" element={<CheapestSupermarket />} />
              <Route path="/supermercados-por-ciudad-rd" element={<CityComparison />} />
              <Route path="/me-alcanza-el-sueldo" element={<SueldoAlcanza />} />
              <Route path="/calculadora-presupuesto-mensual-rd" element={<PresupuestoMensual />} />
              <Route path="/cuanto-puedo-gastar-en-supermercado" element={<SuperGastoSueldo />} />
              <Route path="/calculadora-ahorro-mensual-rd" element={<AhorroMensual />} />
              <Route path="/deudas-vs-ingresos-rd" element={<DeudasIngresos />} />
              <Route path="/costo-de-vida-rd" element={<CostoVidaRD />} />
              <Route path="/cuanto-cuesta-vivir-solo-en-rd" element={<VivirSoloRD />} />
              <Route path="/cuanto-cuesta-vivir-en-pareja-rd" element={<VivirParejaRD />} />
              <Route path="/cuanto-cuesta-mantener-una-familia-rd" element={<MantenerFamiliaRD />} />
              <Route path="/costo-de-vida-por-ciudad-rd" element={<CostoVidaPorCiudad />} />
              <Route path="/calculadora-prestamo-vehiculo-rd" element={<PrestamoVehiculoRD />} />
              <Route path="/cuanto-cuesta-mantener-un-carro-en-rd" element={<MantenerCarroRD />} />
              <Route path="/calculadora-combustible-rd" element={<CombustibleRD />} />
              <Route path="/seguro-y-mantenimiento-vehiculo-rd" element={<SeguroMantenimientoRD />} />
              <Route path="/cuanto-debo-ganar-para-comprar-un-carro" element={<DeboGanarVehiculoRD />} />
              <Route path="/calculadora-courier-rd" element={<CalculadoraCourierRD />} />
              <Route path="/calculadora-amazon-rd" element={<CalculadoraAmazonRD />} />
              <Route path="/calculadora-shein-rd" element={<CalculadoraSheinRD />} />
              <Route path="/impuestos-paquetes-mas-de-200-dolares-rd" element={<ImpuestosSobre200RD />} />
              <Route path="/comparador-courier-rd" element={<ComparadorCourierRD />} />
              <Route path="/calculadora-tramites-rd" element={<CalculadoraTramitesRD />} />
              <Route path="/cuanto-cuesta-renovar-pasaporte-dominicano" element={<CalculadoraPasaporteRD />} />
              <Route path="/cuanto-cuesta-renovar-licencia-rd" element={<CalculadoraLicenciaRD />} />
              <Route path="/calculadora-marbete-rd" element={<CalculadoraMarbeteRD />} />
              <Route path="/checklist-documentos-rd" element={<ChecklistDocumentosRD />} />
              <Route path="/calculadora-servicios-hogar-rd" element={<CalculadoraServiciosHogarRD />} />
              <Route path="/calculadora-luz-rd" element={<CalculadoraLuzRD />} />
              <Route path="/calculadora-internet-telefono-rd" element={<CalculadoraInternetTelefonoRD />} />
              <Route path="/calculadora-gas-agua-rd" element={<CalculadoraGasAguaRD />} />
              <Route path="/cuanto-cuesta-mudarse-en-rd" element={<CuantoCuestaMudarseRD />} />
              <Route path="/herramientas" element={<HerramientasPage />} />
              <Route path="/sobre-nosotros" element={<SobreNosotros />} />
              <Route path="/metodologia" element={<Metodologia />} />
              <Route path="/fuentes" element={<Fuentes />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/privacidad" element={<Privacidad />} />
              <Route path="/terminos" element={<Terminos />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
