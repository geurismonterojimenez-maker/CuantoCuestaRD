export interface ToolItem {
  title: string;
  description: string;
  route: string;
  category: 'supermercados' | 'finanzas' | 'costodevida' | 'vehiculos' | 'courier' | 'tramites' | 'hogar';
  keywords: string[];
  iconName: string;
}

export const CATEGORIES_LABELS: Record<string, string> = {
  supermercados: 'Supermercados y Canasta Básica',
  finanzas: 'Sueldo y Presupuesto',
  costodevida: 'Costo de Vida',
  vehiculos: 'Vehículos',
  courier: 'Courier y Compras',
  tramites: 'Trámites',
  hogar: 'Servicios del Hogar'
};

export const TOOLS_DIRECTORY: ToolItem[] = [
  // Módulo 1: Supermercados
  {
    title: 'Comparador de Supermercados',
    description: 'Compara el costo estimado de tu compra entre los principales supermercados de RD.',
    route: '/comparador-supermercados-rd',
    category: 'supermercados',
    iconName: 'Scale',
    keywords: ['supermercado', 'precios', 'canasta', 'comida', 'compras', 'colmado', 'bravo', 'nacional', 'sirena', 'jumbo', 'ole', 'ahorro']
  },
  {
    title: 'Canasta Básica RD',
    description: 'Calcula el costo aproximado de la canasta familiar básica según los integrantes de tu hogar.',
    route: '/canasta-basica-rd',
    category: 'supermercados',
    iconName: 'Calculator',
    keywords: ['canasta', 'basica', 'alimentos', 'comida', 'familia', 'hijos', 'presupuesto', 'one', 'ministerio']
  },
  {
    title: 'Compra Mensual',
    description: 'Arma tu lista de compra personalizada y proyecta tu gasto total de supermercado al mes.',
    route: '/calculadora-compra-mensual-rd',
    category: 'supermercados',
    iconName: 'ShoppingBag',
    keywords: ['compra', 'mensual', 'supermercado', 'lista', 'despensa', 'provisiones', 'comida', 'quincena', 'super']
  },
  {
    title: 'Supermercado más barato',
    description: 'Análisis comparativo de precios de referencia para saber dónde rinde más tu dinero.',
    route: '/cual-es-el-supermercado-mas-barato-de-rd',
    category: 'supermercados',
    iconName: 'TrendingDown',
    keywords: ['barato', 'economico', 'supermercado', 'precios', 'comparar', 'ahorrar']
  },
  {
    title: 'Supermercados por Ciudad',
    description: 'Compara costos de alimentos y canasta familiar básica entre distintas provincias de RD.',
    route: '/supermercados-por-ciudad-rd',
    category: 'supermercados',
    iconName: 'MapPin',
    keywords: ['ciudad', 'provincias', 'santiago', 'santo domingo', 'la vega', 'sfm', 'punta cana', 'precios']
  },

  // Módulo 2: Sueldo y Presupuesto
  {
    title: '¿Me alcanza el sueldo?',
    description: 'Analiza tus ingresos frente a tus gastos fijos y deudas para ver tu capacidad financiera.',
    route: '/me-alcanza-el-sueldo',
    category: 'finanzas',
    iconName: 'Wallet',
    keywords: ['sueldo', 'salario', 'ingresos', 'gastos', 'alquiler', 'dinero', 'finanzas', 'alcanzar']
  },
  {
    title: 'Presupuesto Mensual',
    description: 'Organiza tus ingresos e identifica tu capacidad de ahorro usando la regla 50/30/20.',
    route: '/calculadora-presupuesto-mensual-rd',
    category: 'finanzas',
    iconName: 'DollarSign',
    keywords: ['presupuesto', 'mensual', 'finanzas', 'regla 50/30/20', 'gastos', 'ahorro', 'planificar']
  },
  {
    title: 'Cuánto gastar en supermercado según mi sueldo',
    description: 'Determina cuánto deberías destinar a alimentación según tus ingresos y cantidad de personas.',
    route: '/cuanto-puedo-gastar-en-supermercado',
    category: 'finanzas',
    iconName: 'Percent',
    keywords: ['gasto', 'supermercado', 'comida', 'presupuesto', 'salario', 'porcentaje', 'sueldo']
  },
  {
    title: 'Ahorro Mensual',
    description: 'Calcula en cuántos meses lograrás tu meta de ahorro acumulando un monto mensual fijo.',
    route: '/calculadora-ahorro-mensual-rd',
    category: 'finanzas',
    iconName: 'TrendingUp',
    keywords: ['ahorro', 'meta', 'dinero', 'banco', 'guardar', 'planificar', 'proyecto']
  },
  {
    title: 'Deudas vs Ingresos',
    description: 'Calcula tu ratio de endeudamiento mensual y evalúa tu nivel de riesgo financiero actual.',
    route: '/deudas-vs-ingresos-rd',
    category: 'finanzas',
    iconName: 'ShieldAlert',
    keywords: ['deudas', 'ingresos', 'endeudamiento', 'riesgo', 'banco', 'prestamo', 'tarjeta', 'financiar']
  },

  // Módulo 3: Costo de Vida
  {
    title: 'Costo de Vida RD',
    description: 'Estima el dinero mensual promedio necesario para vivir en el país de acuerdo a tu estilo de vida.',
    route: '/costo-de-vida-rd',
    category: 'costodevida',
    iconName: 'TrendingUp',
    keywords: ['costo', 'vida', 'vivir', 'gasto', 'mensual', 'servicios', 'alquiler', 'republica dominicana', 'precio']
  },
  {
    title: 'Vivir Solo',
    description: 'Calcula el presupuesto inicial y recurrente estimado para independizarte en RD.',
    route: '/cuanto-cuesta-vivir-solo-en-rd',
    category: 'costodevida',
    iconName: 'User',
    keywords: ['vivir solo', 'independizarse', 'alquiler', 'mudanza', 'apartamento', 'estudiante', 'soltero']
  },
  {
    title: 'Vivir en Pareja',
    description: 'Calcula y divide equitativamente o de forma proporcional a los ingresos los gastos compartidos.',
    route: '/cuanto-cuesta-vivir-en-pareja-rd',
    category: 'costodevida',
    iconName: 'Users',
    keywords: ['pareja', 'boda', 'vivir juntos', 'gastos', 'dividir', 'compartir', 'alquiler', 'hogar']
  },
  {
    title: 'Mantener una Familia',
    description: 'Estima el costo de crianza, alimentación, educación y salud familiar en RD.',
    route: '/cuanto-cuesta-mantener-una-familia-rd',
    category: 'costodevida',
    iconName: 'Users',
    keywords: ['familia', 'hijos', 'crianza', 'colegio', 'salud', 'vivienda', 'presupuesto', 'padres', 'hijo']
  },
  {
    title: 'Costo de Vida por Ciudad',
    description: 'Compara el costo de tu estilo de vida residencial entre las principales provincias de RD.',
    route: '/costo-de-vida-por-ciudad-rd',
    category: 'costodevida',
    iconName: 'MapPin',
    keywords: ['ciudad', 'provincias', 'santiago', 'santo domingo', 'la vega', 'sfm', 'punta cana', 'costo']
  },

  // Módulo 4: Vehículos
  {
    title: 'Préstamo de Vehículo',
    description: 'Calcula las cuotas aproximadas de financiamiento vehicular a tasa fija o variable.',
    route: '/calculadora-prestamo-vehiculo-rd',
    category: 'vehiculos',
    iconName: 'Car',
    keywords: ['prestamo', 'carro', 'vehiculo', 'cuota', 'banco', 'tasa', 'financiar', 'autodeferia']
  },
  {
    title: 'Mantener un Carro',
    description: 'Proyecta los costos de combustible, seguros, mantenimiento y depreciación de tu auto.',
    route: '/cuanto-cuesta-mantener-un-carro-en-rd',
    category: 'vehiculos',
    iconName: 'TrendingDown',
    keywords: ['mantener', 'carro', 'vehiculo', 'costos', 'mantenimiento', 'seguro', 'depreciacion', 'gasto']
  },
  {
    title: 'Combustible',
    description: 'Calcula tu gasto quincenal y mensual en gasolina o gas licuado según tu recorrido habitual.',
    route: '/calculadora-combustible-rd',
    category: 'vehiculos',
    iconName: 'Fuel',
    keywords: ['combustible', 'gasolina', 'gas', 'glp', 'gasoil', 'diesel', 'tanque', 'viaje', 'ruta']
  },
  {
    title: 'Seguro y Mantenimiento',
    description: 'Estima los gastos preventivos de tu carro (seguro de ley, gomas, aceite, revisiones).',
    route: '/seguro-y-mantenimiento-vehiculo-rd',
    category: 'vehiculos',
    iconName: 'Shield',
    keywords: ['seguro', 'mantenimiento', 'ley', 'full', 'aceite', 'gomas', 'reparacion', 'carro']
  },
  {
    title: 'Cuánto debo ganar para comprar un carro',
    description: 'Calcula los ingresos mensuales recomendados antes de embarcarte en la compra de un auto.',
    route: '/cuanto-debo-ganar-para-comprar-un-carro',
    category: 'vehiculos',
    iconName: 'Wallet',
    keywords: ['ganar', 'carro', 'financiar', 'ingreso', 'sueldo', 'comprar', 'vehiculo']
  },

  // Módulo 5: Courier y Compras
  {
    title: 'Calculadora Courier',
    description: 'Calcula el costo del flete por libra y aplica aranceles aduanales si corresponden.',
    route: '/calculadora-courier-rd',
    category: 'courier',
    iconName: 'Package',
    keywords: ['courier', 'libra', 'flete', 'paquete', 'importar', 'aduana', 'compras', 'envio']
  },
  {
    title: 'Calculadora Amazon',
    description: 'Estima el costo real de comprar en Amazon sumando flete a RD e impuestos correspondientes.',
    route: '/calculadora-amazon-rd',
    category: 'courier',
    iconName: 'ShoppingBag',
    keywords: ['amazon', 'compras', 'internet', 'calculadora', 'flete', 'online', 'paquete']
  },
  {
    title: 'Calculadora Shein',
    description: 'Estima el costo final de tu carrito de Shein incluyendo flete estimado por peso en libras.',
    route: '/calculadora-shein-rd',
    category: 'courier',
    iconName: 'ShoppingBag',
    keywords: ['shein', 'ropa', 'compras', 'internet', 'flete', 'courier', 'pedido']
  },
  {
    title: 'Paquetes sobre US$200',
    description: 'Calcula el arancel, selectivo al consumo e ITBIS aplicados a compras de más de US$ 200.',
    route: '/impuestos-paquetes-mas-de-200-dolares-rd',
    category: 'courier',
    iconName: 'DollarSign',
    keywords: ['200', 'dolares', 'impuestos', 'aduana', 'arancel', 'itbis', 'exento', 'dga', 'mases']
  },
  {
    title: 'Comparador Courier',
    description: 'Compara las tarifas de flete y entrega a domicilio de los principales couriers de RD.',
    route: '/comparador-courier-rd',
    category: 'courier',
    iconName: 'Scale',
    keywords: ['comparar', 'courier', 'tarifas', 'precios', 'libra', 'domicilio', 'eps', 'vimenpaq', 'aeropaq']
  },

  // Módulo 6: Trámites
  {
    title: 'Calculadora de Trámites',
    description: 'Calcula el presupuesto consolidado que necesitas para realizar varios trámites gubernamentales.',
    route: '/calculadora-tramites-rd',
    category: 'tramites',
    iconName: 'BookOpen',
    keywords: ['tramites', 'papeles', 'gobierno', 'presupuesto', 'costo', 'dgii', 'intrant', 'pasaporte']
  },
  {
    title: 'Pasaporte Dominicano',
    description: 'Estima las tasas oficiales y requisitos para la emisión o renovación de pasaporte VIP o normal.',
    route: '/cuanto-cuesta-renovar-pasaporte-dominicano',
    category: 'tramites',
    iconName: 'FileText',
    keywords: ['pasaporte', 'renovacion', 'emision', 'vip', 'consulado', 'viaje', 'libreta', 'pasaporte dominicano']
  },
  {
    title: 'Licencia de Conducir',
    description: 'Estima el costo de renovación o duplicado de tu licencia del INTRANT e incluye multas.',
    route: '/cuanto-cuesta-renovar-licencia-rd',
    category: 'tramites',
    iconName: 'ShieldCheck',
    keywords: ['licencia', 'conducir', 'intrant', 'renovar', 'examen', 'multas', 'carnet', 'aprendizaje']
  },
  {
    title: 'Marbete',
    description: 'Calcula el costo del impuesto de circulación vehicular anual, incluyendo recargos por retraso.',
    route: '/calculadora-marbete-rd',
    category: 'tramites',
    iconName: 'Calendar',
    keywords: ['marbete', 'circulacion', 'dgii', 'impuesto', 'recargo', 'placa', 'carro', 'vehiculo']
  },
  {
    title: 'Checklist de Documentos',
    description: 'Valida los documentos obligatorios requeridos para realizar tus gestiones y trámites en RD.',
    route: '/checklist-documentos-rd',
    category: 'tramites',
    iconName: 'ListTodo',
    keywords: ['checklist', 'documentos', 'requisitos', 'papeles', 'lista', 'acta de nacimiento', 'cedula']
  },

  // Módulo 7: Servicios del Hogar
  {
    title: 'Servicios del Hogar',
    description: 'Suma tus facturas de electricidad, internet, gas y agua para planificar tu costo fijo mensual.',
    route: '/calculadora-servicios-hogar-rd',
    category: 'hogar',
    iconName: 'HomeIcon',
    keywords: ['servicios', 'hogar', 'casa', 'luz', 'agua', 'gas', 'internet', 'mantenimiento', 'presupuesto']
  },
  {
    title: 'Luz',
    description: 'Estima tu factura eléctrica mensual en base a tus electrodomésticos y horas de uso diario.',
    route: '/calculadora-luz-rd',
    category: 'hogar',
    iconName: 'Zap',
    keywords: ['luz', 'electricidad', 'edesur', 'edeeste', 'edenorte', 'factura', 'kwh', 'contador', 'consumo']
  },
  {
    title: 'Internet y Teléfono',
    description: 'Organiza tus planes de conectividad residencial, servicios de streaming y líneas móviles.',
    route: '/calculadora-internet-telefono-rd',
    category: 'hogar',
    iconName: 'Wifi',
    keywords: ['internet', 'telefono', 'cable', 'streaming', 'netflix', 'claro', 'altice', 'conectividad']
  },
  {
    title: 'Gas y Agua',
    description: 'Estima tu consumo en botellones de agua purificada, factura de la CAASD y cilindros de gas GLP.',
    route: '/calculadora-gas-agua-rd',
    category: 'hogar',
    iconName: 'Droplet',
    keywords: ['gas', 'agua', 'glp', 'botellon', 'caasd', 'cilindro', 'tanque']
  },
  {
    title: 'Mudarse y Equipar una Casa',
    description: 'Calcula el dinero inicial necesario para flete, depósitos de alquiler y electrodomésticos básicos.',
    route: '/cuanto-cuesta-mudarse-en-rd',
    category: 'hogar',
    iconName: 'Truck',
    keywords: ['mudarse', 'mudanza', 'equipar', 'alquiler', 'deposito', 'flete', 'casa', 'nevera', 'estufa', 'cama']
  }
];
