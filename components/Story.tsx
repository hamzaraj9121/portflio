
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const story =
  "I'm Hamza — a full-stack developer. For over three years I've built web and mobile apps with React, Angular, Next.js and Laravel. Lately I've been obsessed with motion — GSAP, Lenis and Three.js — and I vibe-code Flutter apps with AI. I don't just build software. I craft experiences that feel alive.I have hands-on experience with MongoDB, Express.js, React.js, and Node.js, along with Next.js, TypeScript, JavaScript, Tailwind CSS, REST APIs, Git, and GitHub. I have worked on full-stack projects involving frontend development, backend APIs, database integration, authentication, and responsive user interfaces.";

export default function Story() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const paragraph = textRef.current;

      if (!section || !paragraph) return;

      const characters =
        paragraph.querySelectorAll<HTMLElement>(".story-char");

      gsap.set(characters, { opacity: 0.14 });

      gsap.to(characters, {
        opacity: 1,
        ease: "none",
        stagger: {
          amount: 1.5,
        },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=2200",
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      aria-label="My story"
      className="relative flex min-h-screen min-h-[100svh] items-center justify-center overflow-clip bg-[#f6f5f0] text-[#242420]"
    >
      <div className="mx-auto w-[calc(100%-40px)] max-w-[1100px] sm:w-[calc(100%-64px)]">
        <p className="mb-6 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#a18a52] sm:mb-9">
          MY STORY
        </p>

        <p
          ref={textRef}
          className="m-0 text-[clamp(29px,7.2vw,42px)] font-medium leading-[1.4] tracking-[-0.045em] sm:text-[clamp(36px,4.4vw,62px)] sm:leading-[1.3]"
        >
          {story.split("").map((character, index) => (
            <span
              key={index}
              className="story-char inline opacity-[0.14] [will-change:opacity]"
              aria-hidden="true"
            >
              {character === " " ? "\u00A0" : character}
            </span>
          ))}
        </p>

        <span className="mt-8 block text-[10px] tracking-[0.16em] text-[#88877f] sm:mt-[42px]">
          FULL-STACK DEVELOPER · CREATIVE TECHNOLOGIST
        </span>
      </div>
    </section>
  );
}
