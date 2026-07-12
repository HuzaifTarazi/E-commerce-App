const Message = ({ variant = 'info', children, onClose }) => {
  const styles = {
    info: 'border-blue-200 bg-blue-50 text-blue-700',
    success: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    error: 'border-red-200 bg-red-50 text-red-700',
    warning: 'border-amber-200 bg-amber-50 text-amber-700',
  };

  return (
    <div className={`mb-4 flex items-center justify-between rounded-xl border px-4 py-3 text-sm ${styles[variant] || styles.info}`}>
      <span>{children}</span>
      {onClose && (
        <button onClick={onClose} aria-label="Close" className="ml-3 text-lg leading-none">
          ×
        </button>
      )}
    </div>
  );
};

export default Message;
