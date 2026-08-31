'use client';

import { ProductLanding } from '@/components/landing/ProductLanding';
import { cremeHydratanteProduct } from '@/data/products/creme-hydratante';

export default function HydratingCreamPage() {
  return <ProductLanding product={cremeHydratanteProduct} />;
}
