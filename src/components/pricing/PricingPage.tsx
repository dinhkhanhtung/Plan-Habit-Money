'use client';

import React from 'react';
import PricingCards from './PricingCards';
import ComparisonTable from './ComparisonTable';
import FAQAccordion from './FAQAccordion';
import PromotionalBanner from './PromotionalBanner';

export default function PricingPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark text-[#333333] dark:text-gray-200">
      <main className="flex flex-1 justify-center">
        <div className="flex w-full max-w-5xl flex-col px-6 py-12 md:py-20">
          {/* HeroSection */}
          <section className="mb-12 text-center md:mb-20">
            <h1 className="text-3xl font-black leading-tight tracking-tighter text-[#333333] dark:text-white md:text-5xl">
              Đầu tư chỉ 1k mỗi ngày cho một cuộc sống hiệu quả hơn
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-gray-600 dark:text-gray-400 md:text-lg">
              Truy cập không giới hạn vào công cụ lập kế hoạch, theo dõi thói quen và quản lý tài chính thông minh.
            </p>
          </section>

          {/* Pricing Cards */}
          <PricingCards />

          {/* Comparison Table */}
          <ComparisonTable />

          {/* FAQ Section */}
          <FAQAccordion />

          {/* Promotional Banner - if needed */}
          <PromotionalBanner />
        </div>
      </main>
    </div>
  );
}