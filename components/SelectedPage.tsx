
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
      "A habit tracking and analytics application built with Next.js and MongoDB.",
    technologies: ["Next.js", "TypeScript", "MongoDB"],
    image: "/projects/habitpulse.png",
  },
  {
    number: "02",
    title: "Food Landing Page",
    description:
      "An elegant restaurant landing page featuring beautiful visuals and smooth interactions.",
    technologies: ["React", "Tailwind CSS", "GSAP"],
    image: "/projects/food.png",
  },
  {
    number: "03",
    title: "Tax-Solution Website",
    description:
      "A modern, responsive business website built with Angular.",
    technologies: ["Angular", "HTML", "CSS"],
    image: "/projects/tax.png",
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const cards = gsap.utils.toArray<HTMLElement>(".project-card", section);

      gsap.set(cards, {
        xPercent: -50,
        yPercent: -50,
        x: () => window.innerWidth * 0.55,
        y: () => -window.innerHeight * 0.55,
        rotation: 8,
        scale: 0.94,
        opacity: 0,
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${cards.length * window.innerHeight}`,
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

        timeline.to(
          card,
          {
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
      className="relative min-h-screen min-h-[100svh] overflow-hidden bg-[#f8f6f0] text-neutral-900"
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
            className="project-card absolute left-1/2 top-1/2 w-[88vw] max-w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/80 bg-[#fffdf7] p-6 shadow-[0_30px_70px_rgba(0,0,0,0.12)] lg:w-[390px] lg:h-[470px]"
            style={{ zIndex: index + 1 }}
          >
            <span className="mb-3 block font-mono text-sm tracking-[0.3em] text-amber-600">
              {project.number}
            </span>

            <div className="mb-4 h-[140px] overflow-hidden rounded-2xl bg-neutral-200">
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

            <div className="mt-4 flex flex-wrap gap-1.5">
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
