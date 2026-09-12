interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div
      className="rounded-3xl border border-red-200 bg-red-50 px-6 py-12 text-center"
      role="alert"
    >
      <h2 className="text-xl font-bold text-red-950">Não foi possível carregar o estoque</h2>
      <p className="mt-2 text-red-800">{message}</p>
      <button
        className="mt-6 rounded-full bg-red-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-950"
        onClick={onRetry}
        type="button"
      >
        Tentar novamente
      </button>
    </div>
  );
}
