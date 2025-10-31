'use client';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageName: string;
  days: number;
}

export default function SuccessModal({ isOpen, onClose, packageName, days }: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white dark:bg-background-dark p-6 shadow-xl">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
            <span className="material-symbols-outlined text-2xl text-green-600 dark:text-green-400">
              check_circle
            </span>
          </div>
          <h3 className="mb-2 text-lg font-bold text-green-800 dark:text-green-200">
            Thanh toán thành công!
          </h3>
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            Bạn đã mua thành công gói {packageName}.
          </p>
          <div className="mb-6 rounded-lg bg-green-50 dark:bg-gray-800 p-4">
            <p className="text-sm">
              <span className="font-semibold">{days} ngày</span> đã được thêm vào tài khoản của bạn.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-full rounded-lg bg-primary py-2 px-4 text-sm font-medium text-white hover:bg-primary/90"
          >
            Tiếp tục
          </button>
        </div>
      </div>
    </div>
  );
}