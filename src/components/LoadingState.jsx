function LoadingState() {
  return (
    <div className="mt-12 flex flex-col items-center justify-center gap-4 rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-12 text-center shadow-inner">
      <span className="inline-flex h-14 w-14 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600" />
      <div>
        <p className="text-lg font-semibold text-slate-900">Synchronizing directory</p>
        <p className="text-sm text-slate-500">
          Gathering the freshest insights from the mock API. Sit tight.
        </p>
      </div>
    </div>
  );
}

export default LoadingState;

