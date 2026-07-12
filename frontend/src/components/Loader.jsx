const Loader = ({ size = 'md' }) => {
  const sizeClass = {
    sm: 'h-5 w-5 border-2',
    md: 'h-8 w-8 border-4',
    lg: 'h-12 w-12 border-4',
  };

  return (
    <div className="flex items-center justify-center py-6">
      <div className={`animate-spin rounded-full border-stone-200 border-t-indigo-600 ${sizeClass[size] || sizeClass.md}`} />
    </div>
  );
};

export default Loader;
