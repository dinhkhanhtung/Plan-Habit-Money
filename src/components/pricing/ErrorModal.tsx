'use client';

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  errorMessage: string;
}

export default function ErrorModal({ isOpen, onClose, errorMessage }: ErrorModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white dark:bg-background-dark p-6 shadow-xl">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
            <span className="material-symbols-outlined text-2xl text-red-600 dark:text-red-400">
              error
            </span>
          </div>
          <h3 className="mb-2 text-lg font-bold text-red-800 dark:text-red-200">
            Thanh toán thất bại
          </h3>
          <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
            {errorMessage}
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-300 py-2 px-4 text-sm font-medium hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
            >
              Đóng
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex-1 rounded-lg bg-primary py-2 px-4 text-sm font-medium text-white hover:bg-primary/90"
            >
              Thử lại
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}