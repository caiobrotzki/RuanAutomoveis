import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import showcaseImage from "../../assets/images/showroom/scroll-volkswagen-hatch.jpg";
import { shouldReduceMotion } from "../../utils/motion";

gsap.registerPlugin(ScrollTrigger);

export function CinematicShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const firstTextRef = useRef<HTMLDivElement>(null);
  const secondTextRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    const image = imageRef.current;
    const firstText = firstTextRef.current;
    const secondText = secondTextRef.current;

    if (!section || !frame || !image || !firstText || !secondText) return;

    const reduceMotion = shouldReduceMotion();
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add(
        {
          desktop: "(min-width: 1024px)",
          mobile: "(max-width: 767px)",
          tablet: "(min-width: 768px) and (max-width: 1023px)",
        },
        ({ conditions }) => {
          const { desktop, mobile, tablet } = conditions as {
            desktop: boolean;
            mobile: boolean;
            tablet: boolean;
          };

          if (reduceMotion) {
            gsap.set(frame, { clearProps: "transform,borderRadius" });
            gsap.set(image, { clearProps: "transform" });
            gsap.set(firstText, { autoAlpha: 1, y: 0 });
            gsap.set(secondText, { autoAlpha: 0, y: 0 });
            return;
          }

          if (mobile) {
            gsap.set(secondText, { autoAlpha: 0 });
            gsap.fromTo(
              firstText,
              { autoAlpha: 0, y: 28 },
              {
                autoAlpha: 1,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                  once: true,
                  start: "top 82%",
                  trigger: section,
                },
                y: 0,
              },
            );
            return;
          }

          if (!desktop && !tablet) return;

          const getViewportCoverScale = () => {
            const horizontalScale = window.innerWidth / frame.offsetWidth;
            const verticalScale = window.innerHeight / frame.offsetHeight;

            return Math.max(horizontalScale, verticalScale);
          };

          const timeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              anticipatePin: 1,
              end: tablet ? "+=145%" : "+=180%",
              invalidateOnRefresh: true,
              pin: section,
              pinSpacing: true,
              scrub: 1,
              start: "center center",
              trigger: section,
            },
          });

          timeline
            .fromTo(
              frame,
              { borderRadius: 10, scale: 1 },
              { borderRadius: 0, duration: 1, scale: getViewportCoverScale },
              0,
            )
            .fromTo(image, { scale: 1.04 }, { duration: 1, scale: 1 }, 0)
            .fromTo(
              firstText,
              { autoAlpha: 0, y: 50 },
              { autoAlpha: 1, duration: 0.2, ease: "power2.out", y: 0 },
              0.1,
            )
            .to(
              firstText,
              { autoAlpha: 0, duration: 0.18, ease: "power2.in", y: -35 },
              0.54,
            )
            .fromTo(
              secondText,
              { autoAlpha: 0, y: 35 },
              { autoAlpha: 1, duration: 0.2, ease: "power2.out", y: 0 },
              0.66,
            )
            .to(
              secondText,
              { autoAlpha: 0, duration: 0.12, ease: "power2.in", y: -20 },
              0.9,
            );
        },
      );
    }, section);

    let refreshFrame = 0;
    const refreshScrollTrigger = () => {
      cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    if (image.complete) refreshScrollTrigger();
    else image.addEventListener("load", refreshScrollTrigger, { once: true });

    return () => {
      cancelAnimationFrame(refreshFrame);
      image.removeEventListener("load", refreshScrollTrigger);
      media.revert();
      context.revert();
    };
  }, []);

  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-950 py-16 text-white md:h-screen md:py-0"
      ref={sectionRef}
    >
      <div
        className="cinematic-frame relative overflow-hidden rounded-sm"
        ref={frameRef}
      >
        <img
          alt="Volkswagen branco em frente à Ruan Automóveis"
          className="size-full object-cover object-center"
          height={887}
          loading="lazy"
          ref={imageRef}
          src={showcaseImage}
          width={1774}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/75 via-brand-950/5 to-transparent" />

        <div
          className="absolute inset-x-0 bottom-0 px-6 pb-8 sm:px-10 sm:pb-10 md:px-[8vw] md:pb-[9vh]"
          ref={firstTextRef}
        >
          <h2 className="mt-3 max-w-4xl text-3xl font-black leading-[1.02] tracking-[-0.035em] sm:text-5xl md:text-7xl">
            Seu próximo capítulo começa aqui.
          </h2>
        </div>

        <p
          className="absolute bottom-8 left-6 max-w-xl text-xl font-bold leading-tight opacity-0 sm:bottom-10 sm:left-10 sm:text-3xl md:bottom-[9vh] md:left-[8vw] md:text-5xl"
          ref={secondTextRef}
        >
          As melhores condições para você sair de carro novo.
        </p>
      </div>
    </section>
  );
}
