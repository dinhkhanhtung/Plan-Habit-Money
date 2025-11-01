interface ErrorMessageProps {
  message: string;
  type?: 'error' | 'warning' | 'info';
  onClose?: () => void;
}

export default function ErrorMessage({ message, type = 'error', onClose }: ErrorMessageProps) {
  const styles = {
    error: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800',
      text: 'text-red-800 dark:text-red-200',
      icon: 'error',
    },
    warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-200 dark:border-yellow-800',
      text: 'text-yellow-800 dark:text-yellow-200',
      icon: 'warning',
    },
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      text: 'text-blue-800 dark:text-blue-200',
      icon: 'info',
    },
  };

  const style = styles[type];

  return (
    <div className={`${style.bg} border ${style.border} ${style.text} px-4 py-3 rounded-lg flex items-start gap-3`}>
      <span className="material-symbols-outlined text-xl flex-shrink-0">
        {style.icon}
      </span>
      <p className="flex-1">{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 hover:opacity-70 transition-opacity"
          aria-label="Close"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>
      )}
    </div>
  );
}

