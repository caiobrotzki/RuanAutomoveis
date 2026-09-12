export function EmptyState() {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
      <div aria-hidden="true" className="mx-auto grid size-14 place-items-center rounded-2xl bg-slate-100 text-2xl">
        🚘
      </div>
      <h2 className="mt-5 text-xl font-bold text-slate-950">Nenhum veículo encontrado.</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
        Nosso estoque está sendo atualizado. Volte em breve para conferir as novidades.
      </p>
    </div>
  );
}
