'use client';

interface CustomTopUpProps {
  customDays: number;
  setCustomDays: (days: number) => void;
  discountCode: string;
  setDiscountCode: (code: string) => void;
  onTopUp: () => void;
}

export default function CustomTopUp({
  customDays,
  setCustomDays,
  discountCode,
  setDiscountCode,
  onTopUp,
}: CustomTopUpProps) {
  const totalPrice = customDays * 1000; // 1000đ per day

  return (
    <div className="mt-8 rounded-xl border border-border-light dark:border-border-dark bg-white dark:bg-background-dark p-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-end">
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold leading-tight tracking-[-0.015em]">
            Hoặc nạp tuỳ chọn
          </h3>
          <div className="relative">
            <input
              className="w-full rounded-lg border border-border-light bg-background-light py-2 pl-4 pr-24 text-base placeholder:text-text-secondary-light dark:border-border-dark dark:bg-gray-800 dark:placeholder:text-text-secondary-dark focus:border-primary focus:ring-primary"
              placeholder="Nhập số ngày bạn muốn mua"
              type="number"
              min="1"
              value={customDays || ''}
              onChange={(e) => setCustomDays(parseInt(e.target.value) || 0)}
            />
            <span className="absolute inset-y-0 right-4 flex items-center text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">
              ngày
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">
            Mã giảm giá
          </label>
          <div className="flex gap-2">
            <input
              className="w-full rounded-lg border border-border-light bg-background-light px-4 py-2 text-base placeholder:text-text-secondary-light dark:border-border-dark dark:bg-gray-800 dark:placeholder:text-text-secondary-dark focus:border-primary focus:ring-primary"
              placeholder="Nhập mã giảm giá"
              type="text"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
            />
            <button className="flex shrink-0 cursor-pointer items-center justify-center rounded-lg h-11 px-6 bg-gray-200 text-text-light dark:bg-gray-700 dark:text-text-dark text-sm font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
              Áp dụng
            </button>
          </div>
        </div>
      </div>
      {/* Payment Method & Summary */}
      <div className="mt-8 border-t border-border-light dark:border-border-dark pt-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold leading-tight tracking-[-0.015em]">
              Chọn phương thức thanh toán
            </h3>
            <div className="flex flex-wrap gap-4">
              <button className="flex h-12 items-center justify-center rounded-lg border-2 border-primary bg-primary/5 px-4">
                <img
                  className="h-6"
                  alt="Stripe logo"
                  src="https://js.stripe.com/v3/fingerprinted/img/stripe-logo.svg"
                />
              </button>
            </div>
          </div>
          <div className="flex flex-col items-start gap-4 md:items-end">
            <div className="text-right">
              <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                Tổng cộng
              </p>
              <p className="text-4xl font-black leading-tight tracking-[-0.033em] text-primary">
                {totalPrice.toLocaleString('vi-VN')}đ
              </p>
            </div>
            <button
              onClick={onTopUp}
              disabled={customDays <= 0}
              className="flex w-full min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] shadow-lg shadow-primary/30 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed md:w-auto"
            >
              <span className="material-symbols-outlined">lock</span>
              <span className="truncate">Thanh toán</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}