const Pagination = ({ page, pages, onPageChange }) => {
  if (pages <= 1) return null;

  const pageNumbers = [];
  const maxVisible = 5;
  let start = Math.max(1, page - Math.floor(maxVisible / 2));
  let end = Math.min(pages, start + maxVisible - 1);
  if (end - start + 1 < maxVisible) start = Math.max(1, end - maxVisible + 1);

  for (let i = start; i <= end; i++) pageNumbers.push(i);

  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
      <button
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="rounded-full border border-stone-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 disabled:opacity-50"
      >
        ← Prev
      </button>
      {start > 1 && (
        <>
          <button onClick={() => onPageChange(1)} className="rounded-full border border-stone-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700">1</button>
          {start > 2 && <span className="px-1 text-slate-500">…</span>}
        </>
      )}
      {pageNumbers.map((num) => (
        <button
          key={num}
          className={`rounded-full px-3 py-2 text-sm font-semibold ${num === page ? 'bg-indigo-600 text-white' : 'border border-stone-300 bg-white text-slate-700'}`}
          onClick={() => onPageChange(num)}
        >
          {num}
        </button>
      ))}
      {end < pages && (
        <>
          {end < pages - 1 && <span className="px-1 text-slate-500">…</span>}
          <button onClick={() => onPageChange(pages)} className="rounded-full border border-stone-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700">{pages}</button>
        </>
      )}
      <button
        disabled={page >= pages}
        onClick={() => onPageChange(page + 1)}
        className="rounded-full border border-stone-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 disabled:opacity-50"
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
