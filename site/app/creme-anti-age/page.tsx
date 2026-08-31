'use client';

import { ProductLanding } from '@/components/landing/ProductLanding';
import { antiAgeProduct } from '@/data/products/anti-age';

export default function AntiAgePage() {
  return <ProductLanding product={antiAgeProduct} />;
}
