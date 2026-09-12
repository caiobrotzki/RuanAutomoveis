import logoImage from '../../assets/images/ruan-automoveis-logo.jpeg';

interface BrandLogoProps {
  className?: string;
}

export function BrandLogo({ className = '' }: BrandLogoProps) {
  return (
    <span
      aria-label="Ruan Automóveis — Qualidade e confiança sobre rodas"
      className={`relative block h-[76px] w-28 shrink-0 overflow-hidden bg-ivory-100 ${className}`}
      role="img"
    >
      <img
        alt=""
        className="absolute left-0 top-0 w-28 max-w-none -translate-y-[70px]"
        src={logoImage}
      />
    </span>
  );
}
