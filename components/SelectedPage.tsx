
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const projects = [
  {
    number: "01",
    title: "HabitPulse Analytics",
    description:
      "Habit Tracker that helps users create, manage, and track their daily habits to build consistency and improve productivity.",
    technologies: ["Next.js", "TypeScript", "Express" ,"Node","MongoDB"],
    image: "/projects/HABIT analyzer.png",
  },
  {
    number: "02",
    title: "Lazy Desk ",
    description:
      " Lazy Desk that help organize messy files, turn notes into summaries, and extract actionable tasks",
    technologies: ["React", "Tailwind CSS", "Ollama" ,"Gemma4","Github"],
    image: "/projects/lazy-desj.png",
  },
  {
    number: "03",
    title: "Clothing Store E-commerce",
    description:
      "A modern, responsive business website built with Tailwind CSS Javascript Typescript and Next.js.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS ,Express,Node.js,MongoDB"],
    image: "/projects/Clothix Heritage Craft Display.png",
  },
    {
    number: "04",
    title: "Clothing Store E-commerce",
    description:
      "A modern, responsive business website built with Tailwind CSS Javascript Typescript and Next.js.",
    technologies: ["Next.js", "TypeScript","Express","Node.js", "Tailwind CSS"],
    image: "/projects/Screenshot 2026-11-11 142756.png",
  }
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const cards = gsap.utils.toArray<HTMLElement>(".project-card", section);

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${cards.length * section.offsetHeight}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, index) => {
        if (index > 0) {
          timeline.to(
            cards.slice(0, index),
            {
              x: -28,
              y: 24,
              scale: 0.94,
              rotation: -2,
              opacity: 0.7,
              duration: 1,
            },
            index
          );
        }

        timeline.fromTo(
          card,
          {
            xPercent: -50,
            yPercent: -50,
            x: () => section.clientWidth * 0.55,
            y: () => -section.offsetHeight * 0.55,
            rotation: 8,
            scale: 0.94,
            opacity: 0,
          },
          {
            xPercent: -50,
            yPercent: -50,
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
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
      id="projects"
      className="relative min-h-[100svh] overflow-hidden bg-[#f8f6f0] text-neutral-900"
    >
      {/* Background details */}
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(#c9c5bb_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="absolute left-6 top-8 z-30 text-xs tracking-[0.3em] text-amber-600 md:left-12 md:top-12">
        05 · SELECTED PROJECTS
      </div>

      <div className="absolute right-6 top-8 z-30 hidden text-xs tracking-[0.3em] text-neutral-500 md:right-12 md:top-12 md:block">
        SCROLL TO EXPLORE
      </div>

      {/* Stacked project cards */}
      <div className="absolute inset-0">
        {projects.map((project, index) => (
          <article
            key={project.number}
            className="project-card absolute left-1/2 top-1/2 w-[88vw] max-w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/80 bg-[#fffdf7] p-6 shadow-[0_30px_70px_rgba(0,0,0,0.12)] lg:w-[390px] lg:h-[370px]"
            style={{ zIndex: index + 1 }}
          >
            <div className="mb-4 mt-4 h-[140px] overflow-hidden  bg-neutral-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image}
                alt={`${project.title} preview`}
                className="h-full w-full object-cover"
              />
            </div>

            <h2 className="font-mono text-2xl leading-tight tracking-tight">
              {project.title}
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-6 text-neutral-600">
              {project.description}
            </p>

            <div className="mx-4  flex flex-wrap gap-1.5">
              {project.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-600"
                >
                  {technology}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
