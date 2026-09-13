import logoImage from '../../assets/images/ruan-automoveis-logo.jpeg';

interface BrandLogoProps {
  className?: string;
}

export function BrandLogo({ className = '' }: BrandLogoProps) {
  return (
    <span
      aria-label="Ruan Automóveis — Qualidade e confiança sobre rodas"
      className={`relative block h-[72px] w-24 shrink-0 overflow-hidden bg-ivory-100 sm:h-[88px] sm:w-32 ${className}`}
      role="img"
    >
      <img
        alt=""
        className="absolute left-0 top-0 w-24 max-w-none -translate-y-[54px] sm:w-32 sm:-translate-y-[72px]"
        src={logoImage}
      />
    </span>
  );
}
