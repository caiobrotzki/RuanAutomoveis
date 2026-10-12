import { createGeneralWhatsAppUrl } from "../utils/whatsapp";

const instagramUrl =
  "https://www.instagram.com/ruan_automoveisjgs?stkn=MXhsMHQyN2R1anc5cQ==";
const addressUrl =
  "https://www.google.com/maps/search/?api=1&query=Rua%20Rinaldo%20Bogo%2C%201572%2C%20Jaragu%C3%A1%20do%20Sul%20SC%2C%2089258-071";

export function ContactPage() {
  return (
    <main className="bg-ivory-50">
      <section className="px-5 py-16 sm:px-8 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">
            Contato
          </p>
          <h1 className="mt-4 max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.045em] text-brand-950 sm:text-7xl lg:text-8xl">
            Entre em contato com nosso equipe.
          </h1>

          <div className="mt-16 grid border-y border-brand-200 md:grid-cols-3 md:divide-x md:divide-brand-200">
            <section className="py-8 md:pr-10">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-500">
                Visite-nos
              </p>
              <address className="mt-5 not-italic leading-7 text-brand-950">
                Rua Rinaldo Bogo, 1572
                <br />
                Ilha da Figueira, Jaraguá do Sul – SC
                <br />
                89258-071, Brasil
              </address>
              <a
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-700 hover:text-brand-950"
                href={addressUrl}
                rel="noreferrer"
                target="_blank"
              >
                Abrir no mapa <span aria-hidden="true">↗</span>
              </a>
            </section>

            <section className="border-t border-brand-200 py-8 md:border-0 md:px-10">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-500">
                Atendimento
              </p>
              <a
                className="mt-5 block text-xl font-black text-brand-950 hover:text-brand-600"
                href="tel:+554796583403"
              >
                (47) 9658-3403
              </a>
              <a
                className="mt-6 inline-flex min-h-12 items-center bg-[#25D366] px-5 text-sm font-bold text-white transition hover:bg-[#20bd5a]"
                href={createGeneralWhatsAppUrl()}
                rel="noreferrer"
                target="_blank"
              >
                Falar pelo WhatsApp
              </a>
            </section>

            <section className="border-t border-brand-200 py-8 md:border-0 md:pl-10">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-500">
                Redes sociais
              </p>
              <a
                className="mt-5 inline-flex items-center gap-2 text-xl font-black text-brand-950 hover:text-brand-600"
                href={instagramUrl}
                rel="noreferrer"
                target="_blank"
              >
                @ruan_automoveisjgs <span aria-hidden="true">↗</span>
              </a>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
