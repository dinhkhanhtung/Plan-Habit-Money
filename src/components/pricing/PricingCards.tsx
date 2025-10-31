import React from 'react';

interface Package {
  name: string;
  price: string;
  period: string;
  paymentNote?: string;
  saving?: string;
  popular?: boolean;
  features: string[];
  ctaText: string;
  ctaLink: string;
  ctaPrimary: boolean;
}

const packages: Package[] = [
  {
    name: 'Gói Ngày',
    price: '1.000đ',
    period: '/ ngày',
    paymentNote: 'Thanh toán hàng tháng',
    features: [
      'Lập kế hoạch tuần không giới hạn',
      'Theo dõi mọi thói quen',
      'Phân tích chi tiêu thông minh',
      'Đồng bộ hóa trên các thiết bị',
    ],
    ctaText: 'Bắt đầu ngay',
    ctaLink: '/register',
    ctaPrimary: false,
  },
  {
    name: 'Gói Năm',
    price: '292.000đ',
    period: '/ năm',
    saving: 'Tiết kiệm 20%',
    popular: true,
    features: [
      'Tất cả tính năng của Gói Ngày',
      'Báo cáo và phân tích nâng cao',
      'Ưu tiên hỗ trợ khách hàng',
      'Truy cập sớm các tính năng mới',
    ],
    ctaText: 'Nâng cấp ngay',
    ctaLink: '/register',
    ctaPrimary: true,
  },
];

export default function PricingCards() {
  return (
    <section className="mb-12 md:mb-20">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-10">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className={`flex flex-1 flex-col gap-6 rounded-xl border ${
              pkg.popular
                ? 'border-2 border-primary bg-white dark:bg-background-dark'
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark'
            } p-6 md:p-8`}
          >
            {pkg.popular && (
              <div className="absolute -top-4 right-6">
                <p className="rounded-full bg-[#F5A623] px-3 py-1 text-xs font-bold text-white">
                  Most Popular
                </p>
              </div>
            )}
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-bold text-[#333333] dark:text-white">
                {pkg.name}
              </h3>
              <p className="flex items-baseline gap-1.5 text-[#333333] dark:text-white">
                <span className="text-4xl font-black tracking-tight">{pkg.price}</span>
                <span className="font-semibold text-gray-500 dark:text-gray-400">
                  {pkg.period}
                </span>
              </p>
              {pkg.paymentNote && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {pkg.paymentNote}
                </p>
              )}
              {pkg.saving && (
                <p className="text-xs font-semibold text-[#50E3C2]">{pkg.saving}</p>
              )}
            </div>
            <a
              href={pkg.ctaLink}
              className={`flex h-11 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg text-sm font-bold ${
                pkg.ctaPrimary
                  ? 'bg-primary text-white hover:bg-primary/90'
                  : 'bg-primary/20 text-primary hover:bg-primary/30 dark:bg-primary/30 dark:hover:bg-primary/40'
              }`}
            >
              <span className="truncate">{pkg.ctaText}</span>
            </a>
            <div className="flex flex-col gap-3 border-t border-gray-200 dark:border-gray-700 pt-6">
              {pkg.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-sm text-[#333333] dark:text-gray-300"
                >
                  <span className="material-symbols-outlined text-lg text-green-500">
                    check_circle
                  </span>
                  {feature}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}