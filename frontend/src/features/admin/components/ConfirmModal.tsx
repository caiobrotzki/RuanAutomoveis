import { useEffect } from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  isConfirming?: boolean;
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ConfirmModal({ isOpen, isConfirming = false, title, message, onCancel, onConfirm }: ConfirmModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key === 'Escape' && !isConfirming) onCancel();
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isConfirming, isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div aria-labelledby="confirm-title" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center bg-brand-950/65 p-4" role="dialog" onMouseDown={(event) => {
      if (event.target === event.currentTarget && !isConfirming) onCancel();
    }}>
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <h2 className="text-xl font-black text-brand-950" id="confirm-title">{title}</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">{message}</p>
        <div className="mt-7 flex justify-end gap-3">
          <button className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50" disabled={isConfirming} onClick={onCancel} type="button">Cancelar</button>
          <button className="rounded-xl bg-red-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-red-800 disabled:opacity-50" disabled={isConfirming} onClick={onConfirm} type="button">{isConfirming ? 'Excluindo...' : 'Excluir veículo'}</button>
        </div>
      </div>
    </div>
  );
}
