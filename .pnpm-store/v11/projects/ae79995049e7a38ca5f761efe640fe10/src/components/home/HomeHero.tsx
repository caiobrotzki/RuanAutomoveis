import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImage from "../../assets/images/showroom/hero-honda-civic.jpg";
import { shouldReduceMotion } from "../../utils/motion";

gsap.registerPlugin(ScrollTrigger);

const titleLines = ["Seu", "próximo", "carro", "está aqui."];

export function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const media = mediaRef.current;
    const image = imageRef.current;
    const overlay = overlayRef.current;
    const light = lightRef.current;
    const content = contentRef.current;
    const title = titleRef.current;
    const description = descriptionRef.current;
    const actions = actionsRef.current;
    const scrollIndicator = scrollIndicatorRef.current;

    if (
      !section ||
      !media ||
      !image ||
      !overlay ||
      !light ||
      !content ||
      !title ||
      !description ||
      !actions ||
      !scrollIndicator
    ) {
      return;
    }

    const reducedMotion = shouldReduceMotion();
    const lines = gsap.utils.toArray<HTMLElement>(
      "[data-hero-title-line]",
      title,
    );
    const buttons = gsap.utils.toArray<HTMLElement>("a", actions);
    const mediaQueries = gsap.matchMedia();
    let refreshFrame = 0;
    let lightFrame = 0;
    let currentX = 0.5;
    let currentY = 0.5;
    let targetX = 0.5;
    let targetY = 0.5;

    const context = gsap.context(() => {
      if (reducedMotion) {
        gsap.set(
          [media, image, overlay, content, ...lines, description, ...buttons],
          { clearProps: "all" },
        );
        return;
      }

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          image,
          { autoAlpha: 0, scale: 1.08 },
          {
            autoAlpha: 1,
            duration: 1.8,
            ease: "power2.out",
            scale: 1,
          },
        )
        .fromTo(
          overlay,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 1.25, ease: "power2.out" },
          0,
        )
        .fromTo(
          lines,
          { autoAlpha: 0, yPercent: 112 },
          {
            autoAlpha: 1,
            duration: 0.72,
            stagger: 0.12,
            yPercent: 0,
          },
          0.36,
        )
        .fromTo(
          description,
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, duration: 0.62, y: 0 },
          0.92,
        )
        .fromTo(
          buttons,
          { autoAlpha: 0, y: 18 },
          {
            autoAlpha: 1,
            duration: 0.52,
            stagger: 0.1,
            y: 0,
          },
          1.12,
        )
        .fromTo(
          scrollIndicator,
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, duration: 0.5, y: 0 },
          1.32,
        );

      mediaQueries.add(
        {
          desktop: "(min-width: 1024px)",
          tablet: "(min-width: 768px) and (max-width: 1023px)",
          mobile: "(max-width: 767px)",
        },
        (matchContext) => {
          const { desktop, tablet } = matchContext.conditions as {
            desktop: boolean;
            tablet: boolean;
            mobile: boolean;
          };
          const imageShift = desktop ? 4 : tablet ? 2.5 : 1.25;
          const imageScale = desktop ? 1.035 : tablet ? 1.02 : 1.01;
          const contentShift = desktop ? -12 : tablet ? -7 : -3;
          const contentOpacity = desktop ? 0.05 : tablet ? 0.16 : 0.35;

          gsap
            .timeline({
              scrollTrigger: {
                trigger: section,
                start: "top 80px",
                end: "bottom top",
                scrub: desktop ? 0.8 : 0.55,
                invalidateOnRefresh: true,
              },
            })
            .to(
              media,
              {
                ease: "none",
                scale: imageScale,
                yPercent: imageShift,
              },
              0,
            )
            .to(
              content,
              {
                autoAlpha: contentOpacity,
                ease: "none",
                yPercent: contentShift,
              },
              0,
            )
            .to(
              scrollIndicator,
              { autoAlpha: 0, duration: 0.1, ease: "none" },
              0,
            );
        },
      );
    }, section);

    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (min-width: 1024px)",
    ).matches;

    const renderLight = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      light.style.setProperty("--hero-light-x", `${currentX * 100}%`);
      light.style.setProperty("--hero-light-y", `${currentY * 100}%`);

      if (
        Math.abs(targetX - currentX) > 0.001 ||
        Math.abs(targetY - currentY) > 0.001
      ) {
        lightFrame = window.requestAnimationFrame(renderLight);
      } else {
        lightFrame = 0;
      }
    };

    const queueLightRender = () => {
      if (!lightFrame) {
        lightFrame = window.requestAnimationFrame(renderLight);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = section.getBoundingClientRect();
      targetX = Math.min(
        1,
        Math.max(0, (event.clientX - bounds.left) / bounds.width),
      );
      targetY = Math.min(
        1,
        Math.max(0, (event.clientY - bounds.top) / bounds.height),
      );
      light.dataset.visible = "true";
      queueLightRender();
    };

    const handlePointerLeave = () => {
      light.dataset.visible = "false";
    };

    if (!reducedMotion && finePointer) {
      section.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });
      section.addEventListener("pointerleave", handlePointerLeave);
    }

    const refreshScrollTrigger = () => ScrollTrigger.refresh();

    if (image.complete) {
      refreshFrame = window.requestAnimationFrame(refreshScrollTrigger);
    } else {
      image.addEventListener("load", refreshScrollTrigger, { once: true });
    }

    return () => {
      section.removeEventListener("pointermove", handlePointerMove);
      section.removeEventListener("pointerleave", handlePointerLeave);
      image.removeEventListener("load", refreshScrollTrigger);
      window.cancelAnimationFrame(lightFrame);
      window.cancelAnimationFrame(refreshFrame);
      mediaQueries.revert();
      context.revert();
    };
  }, []);

  return (
    <section
      aria-labelledby="home-hero-title"
      className="home-hero-section relative isolate flex w-full overflow-hidden bg-brand-950 text-white"
      ref={sectionRef}
    >
      <div
        aria-hidden="true"
        className="home-hero-media absolute inset-x-0"
        ref={mediaRef}
      >
        <img
          alt=""
          className="home-hero-image size-full object-cover"
          fetchPriority="high"
          height={941}
          ref={imageRef}
          src={heroImage}
          width={1672}
        />
      </div>
      <div
        aria-hidden="true"
        className="home-hero-overlay absolute inset-0"
        ref={overlayRef}
      />
      <div
        aria-hidden="true"
        className="home-hero-light pointer-events-none absolute inset-0 z-[1]"
        data-visible="false"
        ref={lightRef}
      />

      <div
        className="home-hero-content relative z-10 mx-auto flex w-full max-w-[100rem] px-5 pb-12 pt-8 sm:px-8 sm:pb-16 sm:pt-20 lg:px-8 lg:pt-[clamp(2.5rem,7vh,4.5rem)] xl:px-12"
        ref={contentRef}
      >
        <div className="max-w-[14.5rem] self-start sm:max-w-[25rem] lg:max-w-[23rem]">
          <h1
            aria-label="Seu próximo carro está aqui."
            className="mt-3 text-[clamp(2.4rem,10vw,3rem)] font-black leading-[0.92] tracking-[-0.045em] text-white [text-shadow:0_3px_24px_rgba(12,34,51,0.45)] sm:text-6xl lg:text-[clamp(3.25rem,4.5vw,4rem)]"
            id="home-hero-title"
            ref={titleRef}
          >
            {titleLines.map((line) => (
              <span
                aria-hidden="true"
                className="block overflow-hidden pb-[0.07em] last:pb-0"
                key={line}
              >
                <span className="home-hero-title-line block" data-hero-title-line>
                  {line}
                </span>
              </span>
            ))}
          </h1>
          <p
            className="mt-4 max-w-sm text-sm leading-6 text-white/90 [text-shadow:0_2px_16px_rgba(12,34,51,0.5)] sm:mt-5 sm:text-lg sm:leading-7"
            ref={descriptionRef}
          >
            Explore nossos veículos e encontre veiculos de acordo com as suas
            nescessidades.
          </p>
          <div
            className="mt-5 flex w-[calc(100vw-2.5rem)] flex-row gap-3 sm:mt-6 sm:w-auto"
            ref={actionsRef}
          >
            <Link
              className="home-hero-action home-hero-action-primary inline-flex min-h-12 flex-1 items-center justify-center overflow-hidden bg-ivory-50 px-4 text-sm font-bold text-brand-950 transition-[transform,background-color,color,border-color] duration-300 ease-out active:scale-[0.98] sm:flex-none sm:px-6"
              to="/estoque"
            >
              <span className="relative z-10">Ver estoque</span>
            </Link>
            <Link
              className="home-hero-action home-hero-action-secondary inline-flex min-h-12 flex-1 items-center justify-center overflow-hidden border border-white/70 px-4 text-sm font-bold text-white transition-[transform,background-color,color,border-color] duration-300 ease-out active:scale-[0.98] sm:flex-none sm:px-6"
              to="/contato"
            >
              <span className="relative z-10">Fale conosco</span>
            </Link>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="home-hero-scroll-indicator pointer-events-none absolute bottom-5 left-1/2 z-10 flex flex-col items-center gap-2 text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-white/80 sm:bottom-7"
        ref={scrollIndicatorRef}
      >
        <span>Role para explorar</span>
        <span className="home-hero-scroll-line" />
      </div>
    </section>
  );
}
