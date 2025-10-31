import { Suspense } from 'react';
import PricingPage from '@/components/pricing/PricingPage';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PricingPage />
    </Suspense>
  );
}