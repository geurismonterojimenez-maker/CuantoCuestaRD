export interface Product {
  id: string;
  name: string;
  category: string;
  unit: string;
  basePrice: number; // Price in Santo Domingo (base)
}

export interface Supermarket {
  id: string;
  name: string;
  logoColor: string; // Tailwind/CSS color representation
  premiumFactor: number; // Multiplier (e.g. 1.05 for premium, 0.95 for discount)
}

export interface City {
  id: string;
  name: string;
  costFactor: number; // Multiplier per city (e.g. 1.10 for tourist/expensive areas, 0.95 for lower cost)
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

export const CATEGORIES: Category[] = [
  { id: 'granos-basicos', name: 'Granos y básicos', color: '#2563EB' },
  { id: 'carnes-proteinas', name: 'Carnes y proteínas', color: '#DC2626' },
  { id: 'lacteos', name: 'Lácteos', color: '#F59E0B' },
  { id: 'viveres-frescos', name: 'Víveres y verduras', color: '#16A34A' },
  { id: 'limpieza', name: 'Limpieza del hogar', color: '#06B6D4' },
  { id: 'higiene', name: 'Higiene personal', color: '#8B5CF6' },
  { id: 'otros', name: 'Otros artículos', color: '#64748B' }
];

export const SUPERMARKETS: Supermarket[] = [
  { id: 'bravo', name: 'Bravo', logoColor: '#F2A900', premiumFactor: 0.96 },
  { id: 'la-sirena', name: 'La Sirena', logoColor: '#E30613', premiumFactor: 0.99 },
  { id: 'jumbo', name: 'Jumbo', logoColor: '#009639', premiumFactor: 1.00 },
  { id: 'nacional', name: 'Supermercados Nacional', logoColor: '#00539B', premiumFactor: 1.05 },
  { id: 'ole', name: 'Olé', logoColor: '#EA580C', premiumFactor: 0.95 },
  { id: 'plaza-lama', name: 'Plaza Lama', logoColor: '#008080', premiumFactor: 0.98 }
];

export const CITIES: City[] = [
  { id: 'santo-domingo', name: 'Santo Domingo', costFactor: 1.00 },
  { id: 'santiago', name: 'Santiago', costFactor: 0.97 },
  { id: 'la-vega', name: 'La Vega', costFactor: 0.94 },
  { id: 'san-francisco', name: 'San Francisco de Macorís', costFactor: 0.93 },
  { id: 'punta-cana', name: 'Punta Cana', costFactor: 1.12 },
  { id: 'otra', name: 'Otra provincia (Promedio)', costFactor: 0.96 }
];

export const PRODUCTS: Product[] = [
  // Granos y básicos
  { id: 'arroz-10', name: 'Arroz Selecto 10 lb', category: 'granos-basicos', unit: 'Funda 10 lb', basePrice: 380 },
  { id: 'aceite-64', name: 'Aceite de Soya 64 oz', category: 'granos-basicos', unit: 'Botella 64 oz', basePrice: 390 },
  { id: 'habichuelas-1', name: 'Habichuelas Rojas 1 lb', category: 'granos-basicos', unit: 'Funda 1 lb', basePrice: 95 },
  { id: 'pastas-400', name: 'Espaguetis 400g', category: 'granos-basicos', unit: 'Paquete 400g', basePrice: 45 },
  { id: 'azucar-2', name: 'Azúcar Crema 2 lb', category: 'granos-basicos', unit: 'Funda 2 lb', basePrice: 75 },
  { id: 'cafe-1', name: 'Café Molido Santo Domingo 1 lb', category: 'granos-basicos', unit: 'Empaque 1 lb', basePrice: 255 },

  // Carnes y proteínas
  { id: 'pollo-lb', name: 'Pollo Fresco (libra)', category: 'carnes-proteinas', unit: 'Libra', basePrice: 85 },
  { id: 'huevos-30', name: 'Huevos Selección cartón de 30', category: 'carnes-proteinas', unit: 'Cartón de 30', basePrice: 240 },
  { id: 'salami-1', name: 'Salami Súper Especial 1.5 lb', category: 'carnes-proteinas', unit: 'Pieza 1.5 lb', basePrice: 210 },

  // Lácteos
  { id: 'leche-1l', name: 'Leche Entera UHT 1 Litro', category: 'lacteos', unit: 'Litro', basePrice: 82 },
  { id: 'queso-cheddar-1', name: 'Queso Cheddar Nacional 1 lb', category: 'lacteos', unit: 'Libra', basePrice: 280 },

  // Víveres y verduras
  { id: 'platano-unidad', name: 'Plátano Verde (unidad)', category: 'viveres-frescos', unit: 'Unidad', basePrice: 18 },
  { id: 'yuca-lb', name: 'Yuca Mocana (libra)', category: 'viveres-frescos', unit: 'Libra', basePrice: 35 },
  { id: 'papa-lb', name: 'Papa Nacional (libra)', category: 'viveres-frescos', unit: 'Libra', basePrice: 50 },
  { id: 'cebolla-lb', name: 'Cebolla Roja (libra)', category: 'viveres-frescos', unit: 'Libra', basePrice: 70 },

  // Limpieza del hogar
  { id: 'detergente-1kg', name: 'Detergente en Polvo 1 kg', category: 'limpieza', unit: 'Funda 1 kg', basePrice: 195 },
  { id: 'cloro-galon', name: 'Cloro Líquido Regular (galón)', category: 'limpieza', unit: 'Galón', basePrice: 140 },

  // Higiene personal
  { id: 'papel-higienico-4', name: 'Papel Higiénico (4 rollos)', category: 'higiene', unit: 'Paquete de 4', basePrice: 120 },
  { id: 'jabon-cuaba-unidad', name: 'Jabón de Cuaba (unidad)', category: 'higiene', unit: 'Unidad', basePrice: 42 },
  { id: 'jabon-tocador', name: 'Jabón de Baño Tocador', category: 'higiene', unit: 'Unidad', basePrice: 65 }
];

export const LAST_UPDATE_DATE = 'Junio 2026';

/**
 * Calculates the estimated price of a product in a specific supermarket and city.
 * Adds a small randomized but deterministic variation based on the product ID.
 */
export function getProductPrice(productId: string, supermarketId: string, cityId: string): number {
  const product = PRODUCTS.find((p) => p.id === productId);
  const supermarket = SUPERMARKETS.find((s) => s.id === supermarketId);
  const city = CITIES.find((c) => c.id === cityId);

  if (!product) return 0;

  const basePrice = product.basePrice;
  const superFactor = supermarket ? supermarket.premiumFactor : 1.0;
  const cityFactor = city ? city.costFactor : 1.0;

  // Generate a deterministic offset based on product + supermarket + city names
  // to avoid plain uniform prices and add realistic micro-variations.
  const str = `${productId}-${supermarketId}-${cityId}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const variancePercent = ((Math.abs(hash) % 7) - 3) / 100; // -3% to +3%

  const rawPrice = basePrice * superFactor * cityFactor * (1 + variancePercent);
  
  // Round to nearest integer for simple visual presentation
  return Math.round(rawPrice);
}

/**
 * Estimate the monthly cost of a Canasta Básica
 * based on the number of people, basket quality/type, and frequency.
 */
export function estimateCanastaCost(
  peopleCount: number,
  basketType: 'economica' | 'normal' | 'completa',
  frequency: 'semanal' | 'quincenal' | 'mensual',
  cityId: string
): number {
  const city = CITIES.find((c) => c.id === cityId);
  const cityFactor = city ? city.costFactor : 1.0;

  // Base monthly cost for 1 person (in Santo Domingo)
  let baseMonthlyPerPerson = 9500; // Economica
  if (basketType === 'normal') {
    baseMonthlyPerPerson = 14500;
  } else if (basketType === 'completa') {
    baseMonthlyPerPerson = 21000;
  }

  // Economies of scale: cost per person decreases slightly as family size grows
  let scaleFactor = 1.0;
  if (peopleCount === 2) scaleFactor = 1.8;
  else if (peopleCount === 3) scaleFactor = 2.5;
  else if (peopleCount === 4) scaleFactor = 3.1;
  else if (peopleCount >= 5) scaleFactor = 3.6 + (peopleCount - 5) * 0.7;

  const monthlyTotal = baseMonthlyPerPerson * scaleFactor * cityFactor;

  if (frequency === 'semanal') {
    return Math.round(monthlyTotal / 4.33);
  } else if (frequency === 'quincenal') {
    return Math.round(monthlyTotal / 2);
  }
  return Math.round(monthlyTotal);
}

/**
 * Returns a list of default products that are included in the Canasta Básica
 */
export function getCanastaIncludedProducts(basketType: 'economica' | 'normal' | 'completa') {
  if (basketType === 'economica') {
    return PRODUCTS.filter(p => 
      ['arroz-10', 'aceite-64', 'habichuelas-1', 'pastas-400', 'azucar-2', 'pollo-lb', 'huevos-30', 'salami-1', 'platano-unidad', 'yuca-lb', 'jabon-cuaba-unidad'].includes(p.id)
    );
  }
  if (basketType === 'normal') {
    return PRODUCTS.filter(p => 
      !['jabon-tocador'].includes(p.id) // exclude some extra premium items
    );
  }
  return PRODUCTS; // all products
}
