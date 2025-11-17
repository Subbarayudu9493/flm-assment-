import PropTypes from 'prop-types';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

function ErrorState({ message, onRetry }) {
  return (
    <div className="mt-12 rounded-3xl border border-rose-200/60 bg-gradient-to-br from-rose-50 to-white p-10 text-center shadow-inner">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-600 shadow">
        <ExclamationTriangleIcon className="h-8 w-8" />
      </div>
      <p className="mt-4 text-xl font-semibold text-rose-900">
        Something went wrong
      </p>
      <p className="mt-2 text-sm text-rose-600">{message}</p>
      <button
        type="button"
        className="mt-6 inline-flex items-center rounded-full bg-rose-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-rose-500"
        onClick={onRetry}
      >
        Try again
      </button>
    </div>
  );
}

ErrorState.propTypes = {
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func.isRequired,
};

export default ErrorState;

