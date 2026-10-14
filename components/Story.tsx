
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const story =
  "I'm Hamza — a full-stack developer. For over three years I've built web and mobile apps with React, Angular, Next.js and Laravel. Lately I've been obsessed with motion — GSAP, Lenis and Three.js — and I vibe-code Flutter apps with AI. I don't just build software. I craft experiences that feel alive.";

export default function StorySection() {
  const container = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const text = textRef.current;
      const cursor = cursorRef.current;

      if (!text || !cursor) return;

      // Prepare individual character spans.
      text.innerHTML = story
        .split("")
        .map(
          (char) =>
            `<span style="opacity:0">${
              char === " " ? "&nbsp;" : char
            }</span>`
        )
        .join("");

      const characters = text.querySelectorAll("span");

      gsap.to(characters, {
        opacity: 1,
        stagger: 0.035,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top 65%",
          end: "+=1800",
          scrub: 1,
          pin: true,
        },
      });

      gsap.fromTo(
        cursor,
        { opacity: 0.2 },
        {
          opacity: 1,
          repeat: -1,
          yoyo: true,
          duration: 0.5,
          ease: "power1.inOut",
        }
      );
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="story"
      className="story-section"
    >
      <p className="story-label">04 · STORY</p>

      <h2 className="story-heading">
        <p ref={textRef} className="story-text" />
        <span
          ref={cursorRef}
          className="story-cursor"
          aria-hidden="true"
        />
      </h2>
    </section>
  );
}
