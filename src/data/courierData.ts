export interface Courier {
  id: string;
  name: string;
  defaultRatePerLb: number; // in USD
}

export const DEFAULT_DOLAR_RATE = 59.50; // RD$ per US$
export const DEFAULT_ADMIN_FEE_OVER_200 = 1500; // RD$ customs administrative fee

export const COURIERS: Courier[] = [
  { id: 'domex', name: 'Domex', defaultRatePerLb: 3.85 },
  { id: 'eps', name: 'EPS', defaultRatePerLb: 4.20 },
  { id: 'bm-cargo', name: 'BM Cargo', defaultRatePerLb: 4.10 },
  { id: 'cps', name: 'CPS', defaultRatePerLb: 3.90 },
  { id: 'vimenpaq', name: 'Vimenpaq', defaultRatePerLb: 3.75 },
  { id: 'aeropaq', name: 'Aeropaq', defaultRatePerLb: 4.30 }
];

export const LAST_UPDATE_COURIER = 'Junio 2026';
