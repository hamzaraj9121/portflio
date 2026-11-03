"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const story =
  "I'm Hamza — a full-stack developer. I specialize in building modern, responsive web applications using React, Next.js, and TypeScript. My passion is turning creative ideas into meaningful digital experiences. I'm constantly exploring artificial intelligence, AI agents, and interactive 3D web experiences to push the boundaries of what I can build.";

export default function Story() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const introCursorRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const paragraph = textRef.current;
      const introCursor = introCursorRef.current;

      if (!section || !paragraph || !introCursor) return;

      const characters =
        paragraph.querySelectorAll<HTMLSpanElement>(".story-character");
      const animation = { progress: 0 };
      const cursorOnlyProgress = 0.12;
      let revealedCount = 0;
      let caretIndex = -1;

      characters.forEach((character) => {
        character.classList.remove("is-revealed", "is-caret");
      });
      introCursor.classList.remove("is-hidden");

      const updateReveal = () => {
        const isCursorOnly = animation.progress < cursorOnlyProgress;
        const revealProgress =
          (animation.progress - cursorOnlyProgress) /
          (1 - cursorOnlyProgress);
        const nextCount = isCursorOnly
          ? 0
          : Math.min(
              characters.length,
              1 + Math.floor(revealProgress * (characters.length - 1))
            );

        introCursor.classList.toggle("is-hidden", !isCursorOnly);

        if (nextCount > revealedCount) {
          for (let index = revealedCount; index < nextCount; index += 1) {
            characters[index]?.classList.add("is-revealed");
          }
        } else if (nextCount < revealedCount) {
          for (let index = nextCount; index < revealedCount; index += 1) {
            characters[index]?.classList.remove("is-revealed");
          }
        }

        revealedCount = nextCount;
        const nextCaretIndex = nextCount - 1;

        if (nextCaretIndex !== caretIndex) {
          if (caretIndex >= 0) {
            characters[caretIndex]?.classList.remove("is-caret");
          }
          if (nextCaretIndex >= 0) {
            characters[nextCaretIndex]?.classList.add("is-caret");
          }
          caretIndex = nextCaretIndex;
        }
      };

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${Math.max(window.innerHeight * 3, 2400)}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline.to(animation, {
        progress: 1,
        duration: 1,
        ease: "none",
        onUpdate: updateReveal,
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="story"
      aria-label="My story"
      className="relative flex min-h-screen min-h-[100svh] items-center justify-center overflow-clip bg-[#f6f5f0] text-[#242420]"
    >
      <p className="absolute left-1/2 top-[22%] m-0 -translate-x-1/2 text-center text-[12px] font-semibold uppercase tracking-[0.2em] text-[#a18a52]">
        MY STORY
      </p>

      <span
        ref={introCursorRef}
        aria-hidden="true"
        className="story-intro-cursor pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      />

      <div className="absolute inset-0 flex items-center justify-center px-5 sm:px-8">
        <p
          ref={textRef}
          aria-label={story}
          className="m-0 w-full max-w-[880px] text-center font-mono text-[28px] font-medium leading-[1.35] md:text-[36px] lg:text-[44px]"
        >
          <span aria-hidden="true">
            {Array.from(story, (character, index) => (
              <span className="story-character" key={index}>
                {character}
              </span>
            ))}
          </span>
        </p>
      </div>
    </section>
  );
}
