import type { ReactNode } from 'react';
import { BrandLogo } from './BrandLogo';

const instagramUrl = 'https://www.instagram.com/ruan_automoveisjgs?stkn=MXhsMHQyN2R1anc5cQ==';
const whatsappUrl = 'https://wa.me/554796583403';
const addressUrl = 'https://www.google.com/maps/search/?api=1&query=Rua%20Rinaldo%20Bogo%2C%201572%2C%20Jaragu%C3%A1%20do%20Sul%20SC%2C%2089258-071';

interface FooterSectionProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}

function FooterSection({ icon, title, children }: FooterSectionProps) {
  return (
    <section className="flex items-start gap-4">
      <span className="mt-0.5 grid size-6 shrink-0 place-items-center text-brand-700" aria-hidden="true">{icon}</span>
      <div>
        <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-brand-950">{title}</h2>
        <div className="mt-4 space-y-1.5 text-sm leading-6 text-brand-700">{children}</div>
      </div>
    </section>
  );
}

function LocationIcon() {
  return <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12Z" /><circle cx="12" cy="9" r="2.5" /></svg>;
}

function PhoneIcon() {
  return <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3h-3A1.5 1.5 0 0 0 3 4.5C3 13.6 10.4 21 19.5 21a1.5 1.5 0 0 0 1.5-1.5v-3l-4-1-1.2 2.1a14 14 0 0 1-9.4-9.4L8.5 7l-1-4Z" /></svg>;
}

function InstagramIcon() {
  return <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".75" fill="currentColor" stroke="none" /></svg>;
}

export function Footer() {
  return (
    <footer className="border-t border-brand-200 bg-ivory-50 text-brand-700">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 sm:px-8 sm:py-16 lg:grid-cols-[1.1fr_1.6fr_1fr_1fr] lg:gap-12 lg:py-20">
        <div>
          <BrandLogo />
        </div>

        <FooterSection icon={<LocationIcon />} title="Endereço">
          <a className="block transition hover:text-brand-950 hover:underline" href={addressUrl} rel="noreferrer" target="_blank">
            Rua Rinaldo Bogo, 1572<br />
            Ilha da Figueira, Jaraguá do Sul – SC<br />
            89258-071, Brasil
          </a>
        </FooterSection>

        <FooterSection icon={<PhoneIcon />} title="Atendimento">
          <a className="block transition hover:text-brand-950 hover:underline" href="tel:+554796583403">Telefone: (47) 9658-3403</a>
          <a className="block transition hover:text-brand-950 hover:underline" href={whatsappUrl} rel="noreferrer" target="_blank">WhatsApp: (47) 9658-3403</a>
        </FooterSection>

        <FooterSection icon={<InstagramIcon />} title="Siga-nos">
          <a className="block break-words font-bold transition hover:text-brand-950 hover:underline" href={instagramUrl} rel="noreferrer" target="_blank">@ruan_automoveisjgs</a>
        </FooterSection>
      </div>

      <div className="border-t border-brand-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-brand-600 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} Ruan Automóveis. Todos os direitos reservados.</p>
          <p>Jaraguá do Sul – SC</p>
        </div>
      </div>
    </footer>
  );
}
