
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
      const section = container.current;
      const text = textRef.current;
      const cursor = cursorRef.current;

      if (!section || !text || !cursor) return;

      // Create character spans safely.
      const characters = Array.from(story).map((char) => {
        const span = document.createElement("span");

        span.textContent = char === " " ? "\u00A0" : char;
        span.className = "story-character";

        text.appendChild(span);

        return span;
      });

      gsap.set(characters, { opacity: 0.15 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=1800",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline.to(characters, {
        opacity: 1,
        stagger: 0.035,
        ease: "none",
      });

      gsap.to(cursor, {
        opacity: 0.15,
        repeat: -1,
        yoyo: true,
        duration: 0.5,
        ease: "power1.inOut",
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      id="story"
      className="story-section"
    >
      <div className="story-inner">
        <p className="story-label">04 · STORY</p>

        <h2 className="story-heading">
          <span className="story-intro">
            A LITTLE ABOUT ME
          </span>

          <span className="story-accessible">
            {story}
          </span>

          <span
            ref={textRef}
            className="story-text"
            aria-hidden="true"
          />

          <span
            ref={cursorRef}
            className="story-cursor"
            aria-hidden="true"
          />
        </h2>

        <p className="story-footer">
          Always curious. Always building.
        </p>
      </div>
    </section>
  );
}
