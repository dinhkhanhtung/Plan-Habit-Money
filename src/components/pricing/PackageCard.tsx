'use client';

interface Package {
  id: string;
  name: string;
  price: number;
  days: number;
  features: string[];
  popular: boolean;
}

interface PackageCardProps {
  package: Package;
  onSelect: (pkg: Package) => void;
}

export default function PackageCard({ package: pkg, onSelect }: PackageCardProps) {
  return (
    <div
      className={`flex flex-1 flex-col gap-6 rounded-xl border p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl ${
        pkg.popular
          ? 'border-2 border-primary bg-white dark:bg-background-dark shadow-2xl shadow-primary/20'
          : 'border-border-light dark:border-border-dark bg-white dark:bg-background-dark'
      }`}
    >
      {pkg.popular && (
        <div className="absolute -top-4 right-6 rounded-full bg-accent-yellow px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
          Phổ biến nhất
        </div>
      )}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold leading-tight">{pkg.name}</h2>
        <p className="flex items-baseline gap-1">
          <span className="text-4xl font-black leading-tight tracking-[-0.033em]">
            {pkg.price.toLocaleString('vi-VN')}đ
          </span>
          <span className="font-bold leading-tight text-text-secondary-light dark:text-text-secondary-dark">
            / {pkg.days} ngày
          </span>
        </p>
      </div>
      <div className="flex flex-col gap-3 text-sm">
        {pkg.features.map((feature, index) => (
          <div key={index} className="flex items-center gap-3">
            <span className="material-symbols-outlined text-accent-green">check_circle</span>
            <p>{feature}</p>
          </div>
        ))}
      </div>
      <button
        onClick={() => onSelect(pkg)}
        className={`mt-auto flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 px-4 text-base font-bold leading-normal tracking-[0.015em] ${
          pkg.popular
            ? 'bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary/90'
            : 'bg-primary/10 text-primary hover:bg-primary/20'
        }`}
      >
        <span className="truncate">Chọn gói</span>
      </button>
    </div>
  );
}