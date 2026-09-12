import { BrandLogo } from './BrandLogo';

export function Footer() {
  return (
    <footer className="border-t border-brand-800 bg-brand-950 text-silver-200">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <BrandLogo className="rounded-lg" />
        <p>Qualidade e confiança sobre rodas.</p>
      </div>
    </footer>
  );
}
