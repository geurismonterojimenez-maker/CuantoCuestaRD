export interface TramiteInfo {
  id: string;
  name: string;
  institution: string;
  basePriceNormal: number; // in RD$
  basePriceVIP?: number; // in RD$ (optional)
  description: string;
  commonDocuments: string[];
}

export const TRAMITES_LIST: TramiteInfo[] = [
  {
    id: 'pasaporte-primera',
    name: 'Pasaporte por primera vez',
    institution: 'Dirección General de Pasaportes (DGP)',
    basePriceNormal: 1650,
    basePriceVIP: 2650,
    description: 'Emisión del pasaporte dominicano por primera vez con vigencia de 6 años.',
    commonDocuments: [
      'Acta de Nacimiento Inextensa y timbrada (JCE)',
      'Cédula de Identidad y Electoral original y copia (JCE)',
      'Recibo de pago del impuesto del Banco de Reservas',
      'Fotos tipo pasaporte tomadas en la oficina (incluidas en el costo)',
      'Cédula del padre o madre si es menor de edad'
    ]
  },
  {
    id: 'pasaporte-renovacion',
    name: 'Renovación de pasaporte',
    institution: 'Dirección General de Pasaportes (DGP)',
    basePriceNormal: 1650,
    basePriceVIP: 2650,
    description: 'Renovación de pasaporte dominicano vencido, próximo a vencer o deteriorado.',
    commonDocuments: [
      'Pasaporte físico anterior (vencido o próximo a vencer)',
      'Cédula de Identidad y Electoral original y copia (JCE)',
      'Recibo de pago del impuesto del Banco de Reservas',
      'Fotos tipo pasaporte tomadas en la oficina'
    ]
  },
  {
    id: 'licencia-aprendizaje',
    name: 'Licencia de aprendizaje',
    institution: 'Instituto Nacional de Tránsito y Transporte Terrestre (INTRANT)',
    basePriceNormal: 2900,
    description: 'Primer paso obligatorio para obtener la licencia de conducir en RD.',
    commonDocuments: [
      'Cédula de Identidad y Electoral vigente',
      'Certificado de no antecedentes penales (PGR) - Papel de buena conducta',
      'Recibo de pago de impuesto en el Banco de Reservas',
      'Examen de la vista (realizado en el centro de servicios)',
      'Tomar charla de educación vial'
    ]
  },
  {
    id: 'licencia-primera',
    name: 'Primera licencia de conducir (Práctica)',
    institution: 'Instituto Nacional de Tránsito y Transporte Terrestre (INTRANT)',
    basePriceNormal: 1900,
    description: 'Examen práctico requerido tras cumplir el plazo del carné de aprendizaje.',
    commonDocuments: [
      'Carné de aprendizaje vigente (con más de 15 días de emitido y menos de 1 año)',
      'Cédula de Identidad y Electoral vigente',
      'Recibo de pago de impuesto práctico en el Banco de Reservas',
      'Aprobar el examen práctico de conducción'
    ]
  },
  {
    id: 'licencia-renovacion',
    name: 'Renovación de licencia',
    institution: 'Instituto Nacional de Tránsito y Transporte Terrestre (INTRANT)',
    basePriceNormal: 1900,
    description: 'Renovación ordinaria de la licencia de conducir vencida (vigencia de 4 años).',
    commonDocuments: [
      'Licencia de conducir vencida o próxima a vencer',
      'Cédula de Identidad y Electoral vigente',
      'Recibo de pago de impuesto en el Banco de Reservas',
      'No tener multas de tránsito pendientes de pago en DIGESETT',
      'Examen de la vista (realizado en el centro de servicios)'
    ]
  },
  {
    id: 'licencia-duplicado',
    name: 'Duplicado de licencia (Pérdida/Deterioro)',
    institution: 'Instituto Nacional de Tránsito y Transporte Terrestre (INTRANT)',
    basePriceNormal: 1900,
    description: 'Solicitud de duplicado de licencia por extravío o deterioro físico.',
    commonDocuments: [
      'Cédula de Identidad y Electoral vigente',
      'Denuncia policial de pérdida de la licencia (Policía Nacional)',
      'Recibo de pago de impuesto de duplicado en el Banco de Reservas',
      'No tener multas pendientes de pago en DIGESETT'
    ]
  },
  {
    id: 'licencia-cambio',
    name: 'Cambio de categoría de licencia',
    institution: 'Instituto Nacional de Tránsito y Transporte Terrestre (INTRANT)',
    basePriceNormal: 1900,
    description: 'Ascenso de categoría de conducción (ej. de categoría 2 a 3 o 4 para vehículos pesados).',
    commonDocuments: [
      'Licencia de conducir original de categoría anterior',
      'Cédula de Identidad y Electoral vigente',
      'Recibo de pago de impuesto en el Banco de Reservas',
      'Certificado de no antecedentes penales (PGR)',
      'Aprobar el examen práctico correspondiente'
    ]
  },
  {
    id: 'marbete',
    name: 'Renovación de marbete',
    institution: 'Dirección General de Impuestos Internos (DGII)',
    basePriceNormal: 1500, // For <= 2020. 3000 for >= 2021
    description: 'Impuesto de circulación anual para vehículos en la República Dominicana.',
    commonDocuments: [
      'Copia legible de la matrícula del vehículo',
      'Copia de la Cédula del propietario del vehículo',
      'Seguro de ley vigente',
      'No tener multas pendientes en la base de datos de DIGESETT'
    ]
  },
  {
    id: 'acta-nacimiento',
    name: 'Acta de nacimiento (Inextensa / Legalizada)',
    institution: 'Junta Central Electoral (JCE)',
    basePriceNormal: 600,
    description: 'Copia oficial inextensa y certificada del acta de nacimiento.',
    commonDocuments: [
      'Cédula de Identidad de los padres o del interesado',
      'Número de libro, folio y acta (si se dispone de ellos)',
      'Copia legible del acta anterior o cédula física'
    ]
  },
  {
    id: 'certificacion',
    name: 'Certificación oficial',
    institution: 'Diversas instituciones (JCE, DGII, etc.)',
    basePriceNormal: 500,
    description: 'Certificaciones gubernamentales generales sobre estatus tributarios, académicos o civiles.',
    commonDocuments: [
      'Cédula de Identidad y Electoral del solicitante',
      'Formulario de solicitud completo',
      'Pago de tasas administrativas de la institución correspondiente'
    ]
  },
  {
    id: 'legalizacion',
    name: 'Legalización de firmas o documentos',
    institution: 'Ministerio de Relaciones Exteriores (MIREX) / JCE',
    basePriceNormal: 600,
    description: 'Legalización o apostilla de documentos oficiales dominicanos para uso nacional o extranjero.',
    commonDocuments: [
      'Documento original previamente firmado y sellado por la entidad emisora',
      'Cédula de Identidad y Electoral de quien solicita',
      'Comprobante de pago del PIN de legalización'
    ]
  },
  {
    id: 'buena-conducta',
    name: 'Papel de buena conducta (Antecedentes Penales)',
    institution: 'Procuraduría General de la República (PGR)',
    basePriceNormal: 600,
    description: 'Certificación oficial de no antecedentes judiciales y penales vigente por 30 días.',
    commonDocuments: [
      'Cédula de Identidad y Electoral (vigente)',
      'Recibo de pago de la Procuraduría General de la República',
      'Correo electrónico activo para recibir el documento en PDF'
    ]
  }
];

export const PASAPORTE_PRICES = {
  normal6Anos: 1650,
  vip6Anos: 2650,
  normal10Anos: 5650, // 1650 + 4000
  vip10Anos: 6650, // 2650 + 4000
  duplicadoPerdidaNormal: 3150, // 1500 pérdida + 1650 normal
  duplicadoPerdidaVIP: 4150 // 1500 pérdida + 2650 VIP
};

export const LICENCIA_PRICES = {
  aprendizaje: 2900,
  primeraLicencia: 1900,
  renovacion: 1900,
  duplicado: 1900,
  cambioCategoria: 1900
};

export const MARBETE_PRICES = {
  hasta2020: 1500,
  desde2021: 3000,
  recargoTardio: 2000
};

export const ULTIMA_ACTUALIZACION_TRAMITES = 'Junio 2026';
