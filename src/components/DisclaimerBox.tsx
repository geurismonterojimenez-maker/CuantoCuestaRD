import { AlertTriangle } from 'lucide-react';

interface DisclaimerBoxProps {
  type?: 'supermercado' | 'finanzas' | 'vehiculos' | 'courier' | 'tramites' | 'hogar';
}

export default function DisclaimerBox({ type = 'supermercado' }: DisclaimerBoxProps) {
  let text = 'Los precios mostrados son estimados y pueden variar según la sucursal, ciudad, fecha, marca, ofertas vigentes y disponibilidad de cada establecimiento.';

  if (type === 'finanzas') {
    text = 'Los cálculos y presupuestos mostrados son estimaciones de referencia para planificar y tienen fines meramente informativos. No representan ni constituyen una asesoría financiera o contable profesional.';
  } else if (type === 'vehiculos') {
    text = 'Los costos, cuotas y estimaciones de seguro o mantenimiento mostrados son referencias aproximadas. Las tasas de interés de préstamos y primas de seguros reales varían según la entidad financiera y el perfil del cliente.';
  } else if (type === 'courier') {
    text = 'Las tarifas, cargos e impuestos aduanales calculados son estimaciones informativas. El costo final real de importación puede variar según la valoración de aduanas, peso real o volumétrico del paquete, cargos de combustible y tasas del courier.';
  } else if (type === 'tramites') {
    text = 'Los costos de tasas gubernamentales, requisitos de documentación y plazos son estimaciones de referencia para planificar. Pueden variar según las disposiciones oficiales de cada organismo. Confirma siempre en la institución correspondiente antes de asistir o realizar pagos.';
  } else if (type === 'hogar') {
    text = 'Los costos de servicios, consumos y mudanza mostrados son estimados de referencia y pueden variar según el sector, proveedor, nivel de consumo, temporada y hábitos de uso de cada hogar.';
  }

  return (
    <div className="disclaimer-box" role="alert">
      <AlertTriangle size={20} aria-hidden="true" />
      <div>
        <strong>Nota importante:</strong> {text}
      </div>
    </div>
  );
}
