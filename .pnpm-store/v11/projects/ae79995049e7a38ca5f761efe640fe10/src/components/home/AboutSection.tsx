import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import aboutImage from "../../assets/images/showroom/about-volkswagen-sedan.jpg";
import { shouldReduceMotion } from "../../utils/motion";
import { ScrollReveal } from "../ui/ScrollReveal";

gsap.registerPlugin(ScrollTrigger);

interface AboutSectionProps {
  showLink?: boolean;
}

export function AboutSection({ showLink = true }: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    if (!section || !image || shouldReduceMotion()) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        image,
        { yPercent: -3 },
        {
          ease: "none",
          scrollTrigger: {
            end: "bottom top",
            scrub: 1,
            start: "top bottom",
            trigger: section,
          },
          yPercent: 3,
        },
      );
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      className="overflow-hidden bg-ivory-100"
      id="sobre"
      ref={sectionRef}
    >
      <div className="mx-auto grid max-w-[100rem] lg:grid-cols-[minmax(0,3fr)_minmax(22rem,2fr)] lg:items-stretch">
        <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[44rem]">
          <img
            alt="Volkswagen prata em frente à Ruan Automóveis"
            className="about-editorial-image absolute left-0 w-full object-cover object-center"
            height={941}
            loading="lazy"
            ref={imageRef}
            src={aboutImage}
            width={1672}
          />
        </div>

        <div className="flex items-center px-5 py-14 sm:px-10 sm:py-20 lg:px-[clamp(3rem,6vw,7rem)]">
          <ScrollReveal>
            <h2 className="mt-4 max-w-xl text-4xl font-black leading-[1.02] tracking-[-0.04em] text-brand-950 sm:text-5xl lg:text-6xl">
              O seu próximo carro está aqui.
            </h2>
            <p className="mt-7 max-w-lg text-base leading-8 text-slate-600 sm:text-lg">
              Na Ruan Automóveis, nosso compromisso é oferecer um atendimento de
              qualidade, com transparência e atenção às suas necessidades.
            </p>
            <p className="mt-5 max-w-lg text-sm leading-7 text-brand-700">
              Rua Rinaldo Bogo, 1572 — Ilha da Figueira, Jaraguá do Sul.
            </p>
            {showLink && (
              <Link
                className="mt-9 inline-flex min-h-12 items-center gap-3 border-b border-brand-800 text-sm font-bold text-brand-950 transition hover:gap-5"
                to="/sobre"
              >
                Conheça a Ruan Automóveis <span aria-hidden="true">→</span>
              </Link>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
