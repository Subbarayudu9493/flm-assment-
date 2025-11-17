import PropTypes from 'prop-types';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) {
    return null;
  }

  const canGoBack = currentPage > 1;
  const canGoForward = currentPage < totalPages;

  const goToPage = (page) => {
    onPageChange(Math.min(Math.max(page, 1), totalPages));
  };

  return (
    <nav
      className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-600"
      aria-label="Pagination"
    >
      <button
        type="button"
        className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-4 py-2 font-semibold transition hover:border-brand-200 hover:text-brand-600 disabled:cursor-not-allowed disabled:opacity-40"
        onClick={() => goToPage(currentPage - 1)}
        disabled={!canGoBack}
      >
        <ChevronLeftIcon className="h-4 w-4" />
        Prev
      </button>

      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              className={`h-10 w-10 rounded-full border text-sm font-semibold transition ${
                pageNumber === currentPage
                  ? 'border-brand-200 bg-brand-50 text-brand-700'
                  : 'border-transparent text-slate-600 hover:border-brand-100 hover:bg-slate-100'
              }`}
              onClick={() => goToPage(pageNumber)}
            >
              {pageNumber}
            </button>
          ),
        )}
      </div>

      <button
        type="button"
        className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-4 py-2 font-semibold transition hover:border-brand-200 hover:text-brand-600 disabled:cursor-not-allowed disabled:opacity-40"
        onClick={() => goToPage(currentPage + 1)}
        disabled={!canGoForward}
      >
        Next
        <ChevronRightIcon className="h-4 w-4" />
      </button>
    </nav>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;

