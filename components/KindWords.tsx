"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const testimonials = [
  {
    quote:
      "Hamza took a rough idea and turned it into a polished product that feels effortless to use. The care he puts into every detail really shows.",
    name: "Alex Morgan",
    role: "Product Designer",
    paper: "bg-[#f5b826]",
  },
  {
    quote:
      "A thoughtful developer and a great collaborator. Communication was clear throughout, and the final experience was fast, responsive, and beautifully made.",
    name: "Jordan Lee",
    role: "Startup Founder",
    paper: "bg-[#f7eed2]",
  },
  {
    quote:
      "He brought real creativity to the project without losing sight of what mattered: a reliable experience that works beautifully on every screen.",
    name: "Taylor Reed",
    role: "Creative Director",
    paper: "bg-[#f5b826]",
  },
  {
    quote:
      "From the first conversation to the final details, Hamza made the whole process feel collaborative. I would happily work with him again.",
    name: "Casey Patel",
    role: "Technology Lead",
    paper: "bg-[#f7eed2]",
  },
];

const cardRotations = [-3, 2.5, -1.8, 3.2];

export default function KindWords() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const cards = gsap.utils.toArray<HTMLElement>(
        ".kind-words-card",
        section
      );

      gsap.set(cards, {
        xPercent: -50,
        yPercent: -50,
        x: (index) => (index - 1.5) * 5,
        y: (index) => index * 7,
        rotation: (index) => cardRotations[index],
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${cards.length * window.innerHeight * 0.9}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, index) => {
        timeline.to(
          card,
          {
            y: () => window.innerHeight + card.offsetHeight,
            x: (index - 1.5) * 5 + (index % 2 === 0 ? -30 : 30),
            rotation: cardRotations[index] + (index % 2 === 0 ? -9 : 9),
            opacity: 0,
            duration: 1,
            ease: "power2.in",
          },
          index
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="kind-words"
      aria-label="Kind words from collaborators"
      className="relative flex min-h-screen min-h-[100svh] items-center justify-center overflow-hidden bg-[#faf8f1] text-[#242420]"
    >
      <header className="absolute left-6 top-8 z-20 md:left-12 md:top-12">
        <p className="m-0 font-mono text-[10px] tracking-[0.24em] text-[#a18a52] sm:text-xs">
          07 · KIND WORDS
        </p>
        <h2 className="mt-3 font-mono text-2xl font-medium tracking-tight sm:text-3xl">
          Notes from the people
          <br />
          I&apos;ve worked with.
        </h2>
      </header>

      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <div className="relative h-[min(68svh,440px)] min-h-[340px] w-[min(88vw,620px)]">
          {testimonials.map((testimonial, index) => (
            <article
              aria-label={`Testimonial from ${testimonial.name}`}
              className={`kind-words-card absolute left-1/2 top-1/2 flex h-full w-full flex-col rounded-[18px] border border-black/5 px-7 pb-7 pt-10 shadow-[0_28px_70px_rgba(54,42,12,0.2)] sm:px-11 sm:pb-10 sm:pt-14 ${testimonial.paper}`}
              key={testimonial.name}
              style={{ zIndex: testimonials.length - index }}
            >
              <span
                aria-hidden="true"
                className="absolute left-1/2 top-0 h-7 w-[72px] -translate-x-1/2 -translate-y-1/3 rotate-[-2deg] border border-white/40 bg-white/45 shadow-sm backdrop-blur-[2px]"
              />

              <div
                aria-label="5 out of 5 stars"
                className="font-mono text-xl tracking-[0.18em] text-[#735b07] sm:text-2xl"
              >
                ★★★★★
              </div>

              <p className="my-auto py-5 font-mono text-[clamp(17px,3.8vw,25px)] leading-[1.65] tracking-[-0.04em] text-[#29271f] sm:text-[clamp(20px,2.4vw,27px)]">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <footer className="border-t border-black/15 pt-4 font-mono">
                <p className="m-0 text-sm font-semibold tracking-wide sm:text-base">
                  {testimonial.name}
                </p>
                <p className="mb-0 mt-1 text-[10px] tracking-[0.16em] text-black/60 sm:text-xs">
                  {testimonial.role}
                </p>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
