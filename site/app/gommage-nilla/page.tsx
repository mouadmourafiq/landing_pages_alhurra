'use client';

import { ProductLanding } from '@/components/landing/ProductLanding';
import { gommageNillaProduct } from '@/data/products/gommage-nilla';

export default function GommageNillaPage() {
  return <ProductLanding product={gommageNillaProduct} />;
}
