import { useRouter } from 'next/router';

const buttonStyles =
  'font-light tracking-wide border-gray-600 border rounded px-3 py-1 disabled:border-gray-400 disabled:bg-slate-200 disabled:text-gray-400 hover:border-indigo-500 hover:text-indigo-500';
const activeButtonStyles =
  'font-medium border tracking-wide text-indigo-600 border-indigo-600 rounded px-3 py-1 hover:border-indigo-500 hover:text-indigo-500';

export default function Pagination({ currentPage, totalPages }) {
  const router = useRouter();

  return (
    <div className='flex justify-end gap-2 sm:gap-4 text-sm'>
      <button
        onClick={() => router.push(`?page=${currentPage - 1}`)}
        disabled={currentPage <= 1}
        className={buttonStyles}
      >
        Previous
      </button>
      {Array.from(Array(totalPages))
        .map((el, i) => i + 1)
        .map((pageIdx) => (
          <button
            key={pageIdx}
            onClick={() => router.push(`?page=${pageIdx}`)}
            className={
              pageIdx === currentPage ? activeButtonStyles : buttonStyles
            }
          >
            {pageIdx}
          </button>
        ))}
      <button
        onClick={() => router.push(`?page=${currentPage + 1}`)}
        disabled={currentPage >= totalPages}
        className={buttonStyles}
      >
        Next
      </button>
    </div>
  );
}
