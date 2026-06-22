export interface ElectrodomesticoConsumo {
  name: string;
  watts: number;
  averageKWhPerMonth: number; // typical consumption for standard usage
  estimatedCostRD: number; // pre-calculated rough estimate for standard use
}

export const ELECTROS_DATA: Record<string, ElectrodomesticoConsumo> = {
  abanico: {
    name: 'Abanico / Ventilador',
    watts: 80,
    averageKWhPerMonth: 24, // 80W * 10 hrs * 30 days
    estimatedCostRD: 200 // RD$
  },
  aire: {
    name: 'Aire Acondicionado (12,000 BTU)',
    watts: 1200,
    averageKWhPerMonth: 216, // 1200W * 6 hrs * 30 days
    estimatedCostRD: 2200
  },
  nevera: {
    name: 'Nevera / Refrigerador',
    watts: 300,
    averageKWhPerMonth: 90, // continuous but cycles
    estimatedCostRD: 900
  },
  lavadora: {
    name: 'Lavadora',
    watts: 500,
    averageKWhPerMonth: 15, // 500W * 2 hrs * 15 days
    estimatedCostRD: 150
  },
  televisor: {
    name: 'Televisor LED',
    watts: 100,
    averageKWhPerMonth: 18, // 100W * 6 hrs * 30 days
    estimatedCostRD: 180
  },
  computadora: {
    name: 'Computadora / Laptop',
    watts: 150,
    averageKWhPerMonth: 36, // 150W * 8 hrs * 30 days
    estimatedCostRD: 360
  }
};

// Gas prices in Dominican Republic (stabilized fuel prices in RD)
export const GAS_PRICES = {
  pequeno25: 610, // RD$ for 25 lbs cylinder
  mediano50: 1220, // RD$ for 50 lbs cylinder
  grande100: 2440, // RD$ for 100 lbs cylinder
  comunResidencial: 450 // RD$ average fixed fee per apartment
};

// Water CAASD and botellones
export const WATER_PRICES = {
  tarifaFijaMensual: 400, // standard residential fixed water bill
  botellonIndividual: 90 // RD$ per 5-gallon water bottle
};

// Telecoms plans (Claro, Altice, Wind)
export const TELECOMS_PRICES = {
  internetResidencial: 1800,
  cableTV: 1000,
  planMovilIndividual: 700
};

// Equipment / furniture defaults for moving
export const EQUIPAMIENTO_PRICES = {
  cama: 15000,
  nevera: 25000,
  estufa: 18000,
  lavadora: 14000,
  muebles: 20000,
  mudanzaFlete: 4500,
  internetInstalacion: 1000,
  productosLimpieza: 1200,
  gasInicial: 3500
};

// Default monthly services averages for a household by type
export const DEFAULT_SERVICES_BY_VIVIENDA: Record<string, { alquiler: number; luz: number; agua: number; gas: number; internet: number }> = {
  habitacion: {
    alquiler: 8000,
    luz: 600,
    agua: 200,
    gas: 150,
    internet: 600
  },
  apartaestudio: {
    alquiler: 15000,
    luz: 1500,
    agua: 300,
    gas: 300,
    internet: 1500
  },
  apartamento: {
    alquiler: 28000,
    luz: 4000,
    agua: 400,
    gas: 600,
    internet: 2500
  },
  casa: {
    alquiler: 35000,
    luz: 6000,
    agua: 500,
    gas: 800,
    internet: 2800
  }
};

/**
 * Calculates estimated electricity bill in RD$ based on consumed kWh
 * using the Dominican Republic escalonated block tariff system.
 */
export function calculateElectricBill(kwh: number): number {
  let remaining = Math.max(0, kwh || 0);
  let totalCost = 0;

  // Block 1: 0 to 200 kWh (Tarifa social/basic: ~RD$ 5.80 / kWh)
  const block1 = Math.min(200, remaining);
  totalCost += block1 * 5.80;
  remaining -= block1;

  if (remaining <= 0) return Math.round(totalCost);

  // Block 2: 201 to 300 kWh (~RD$ 8.90 / kWh)
  const block2 = Math.min(100, remaining);
  totalCost += block2 * 8.90;
  remaining -= block2;

  if (remaining <= 0) return Math.round(totalCost);

  // Block 3: 301 to 700 kWh (~RD$ 12.30 / kWh)
  const block3 = Math.min(400, remaining);
  totalCost += block3 * 12.30;
  remaining -= block3;

  if (remaining <= 0) return Math.round(totalCost);

  // Block 4: Above 700 kWh (~RD$ 13.60 / kWh)
  totalCost += remaining * 13.60;

  return Math.round(totalCost);
}

export const ULTIMA_ACTUALIZACION_HOGAR = 'Junio 2026';
