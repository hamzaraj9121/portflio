
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const story =
  "I'm Hamza — a full-stack developer. For over three years I've built web and mobile apps with React, Angular, Next.js and Laravel. Lately I've been obsessed with motion — GSAP, Lenis and Three.js — and I vibe-code Flutter apps with AI. I don't just build software. I craft experiences that feel alive.";

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

      // Start with every character dimmed.
      gsap.set(characters, { opacity: 0.14 });

      // Scroll progress controls the entire reveal.
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

      // Recalculate positions after layout and pin setup.
      requestAnimationFrame(() => ScrollTrigger.refresh());
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="story-section"
      aria-label="My story"
    >
      <div className="story-inner">
        <p className="story-eyebrow">MY STORY</p>

        <p ref={textRef} className="story-text">
          {story.split("").map((character, index) => (
            <span
              key={index}
              className="story-char"
              aria-hidden="true"
            >
              {character === " " ? "\u00A0" : character}
            </span>
          ))}
        </p>

        <span className="story-footer">
          FULL-STACK DEVELOPER · CREATIVE TECHNOLOGIST
        </span>
      </div>
    </section>
  );
}
