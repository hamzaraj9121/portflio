
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const story =
  "I'm Hamza — a full-stack developer. For over three years I've built web and mobile apps with React, Angular, Next.js and Laravel. Lately I've been obsessed with motion — GSAP, Lenis and Three.js — and I vibe-code Flutter apps with AI. I don't just build software. I craft experiences that feel alive.";

export default function Story() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const paragraph = textRef.current;

    if (!section || !paragraph) return;

    const words = paragraph.querySelectorAll<HTMLElement>(
      ".story-word"
    );

    const media = gsap.matchMedia();

    media.add(
      {
        desktop: "(min-width: 761px)",
        mobile: "(max-width: 760px)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const conditions = context.conditions as {
          desktop: boolean;
          mobile: boolean;
          reduceMotion: boolean;
        };

        if (conditions.reduceMotion) {
          gsap.set(words, { opacity: 1 });
          return;
        }

        gsap.set(words, {
          opacity: 0.15,
        });

        const animation = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () =>
              `+=${conditions.mobile ? 1400 : 1800}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        animation.to(words, {
          opacity: 1,
          stagger: {
            each: 0.12,
          },
          ease: "none",
        });

        return () => {
          animation.scrollTrigger?.kill();
          animation.kill();
        };
      }
    );

    return () => {
      media.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="story-section"
    >
      <div className="story-container">
        <div className="story-top">
          <span className="story-label">
            <span className="story-label-dot" />
            THE STORY SO FAR
          </span>

          <span className="story-index">01 / MY JOURNEY</span>
        </div>

        <div className="story-content">
          <p className="story-intro">
            A LITTLE ABOUT ME
          </p>

          <p
            ref={textRef}
            className="story-text"
            aria-label={story}
          >
            {story.split(" ").map((word, index) => (
              <span
                key={`${index}-${word}`}
                className="story-word"
                aria-hidden="true"
              >
                {word}{" "}
              </span>
            ))}
          </p>

          <div className="story-bottom">
            <span className="story-signature">
              Always curious. Always building.
            </span>

            <span className="story-scroll">
              KEEP SCROLLING
              <span aria-hidden="true"> ↓</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
