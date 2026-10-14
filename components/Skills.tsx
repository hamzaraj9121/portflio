
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Skill = {
  number: string;
  category: string;
  title: string;
  description: string;
  technologies: string[];
};

const skills: Skill[] = [
  {
    number: "01",
    category: "FRONTEND DEVELOPMENT",
    title: "Interfaces that feel alive.",
    description:
      "Building responsive, interactive web experiences with reusable components, modern rendering patterns, and smooth user interactions.",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    number: "02",
    category: "UI / UX & DESIGN",
    title: "Design meets precision.",
    description:
      "Turning design ideas into polished interfaces with thoughtful layouts, consistent spacing, accessible components, and elegant visual details.",
    technologies: ["Responsive UI", "CSS", "Design Systems", "Animations"],
  },
  {
    number: "03",
    category: "BACKEND DEVELOPMENT",
    title: "Power behind the product.",
    description:
      "Creating application logic, REST APIs, authentication flows, and reliable server-side features that connect frontend experiences to data.",
    technologies: ["Node.js", "Express.js", "REST APIs", "Python"],
  },
  {
    number: "04",
    category: "DATABASE & ARCHITECTURE",
    title: "Data with a purpose.",
    description:
      "Structuring application data, connecting services, and learning scalable architecture patterns for reliable, maintainable applications.",
    technologies: ["MongoDB", "Database Design", "Caching", "System Design"],
  },
  {
    number: "05",
    category: "3D & CREATIVE DEVELOPMENT",
    title: "Beyond the flat screen.",
    description:
      "Creating immersive web experiences with interactive 3D scenes, cursor-responsive objects, and carefully orchestrated motion.",
    technologies: ["Three.js", "React Three Fiber", "Drei", "GSAP"],
  },
  {
    number: "06",
    category: "AI & INTELLIGENT SYSTEMS",
    title: "Building with intelligence.",
    description:
      "Exploring AI-powered applications, model APIs, tool-using agents, and workflows that connect intelligent systems with real products.",
    technologies: ["Python", "LLM APIs", "AI Agents", "LangGraph"],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!section || !viewport || !track) return;

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

        if (conditions.reduceMotion) return;

        const getDistance = () =>
          Math.max(0, track.scrollWidth - viewport.clientWidth);

        gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getDistance()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      }
    );

    const refresh = () => ScrollTrigger.refresh();

    window.addEventListener("resize", refresh);

    return () => {
      window.removeEventListener("resize", refresh);
      media.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="skills-section"
    >
      <div className="skills-shell">
        <div className="skills-heading">
          <div>
            <p className="skills-eyebrow">
              WHAT I BRING TO THE TABLE
            </p>

            <h2 className="skills-title">
              Skills built to
              <br />
              <span>make an impact.</span>
            </h2>
          </div>

          <div className="skills-instruction">
            <span className="skills-instruction-dot" />
            <span>SCROLL TO EXPLORE</span>
            <span className="skills-instruction-arrow">→</span>
          </div>
        </div>

        <div
          ref={viewportRef}
          className="skills-window"
        >
          <div
            ref={trackRef}
            className="skills-track"
          >
            {skills.map((skill) => (
              <article
                key={skill.number}
                className="skills-card"
              >
                <div className="skills-card-top">
                  <span className="skills-number">
                    / {skill.number}
                  </span>

                  <span
                    className="skills-card-icon"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </div>

                <p className="skills-category">
                  {skill.category}
                </p>

                <h3 className="skills-card-title">
                  {skill.title}
                </h3>

                <p className="skills-description">
                  {skill.description}
                </p>

                <div className="skills-tags">
                  {skill.technologies.map((technology) => (
                    <span
                      className="skills-tag"
                      key={technology}
                    >
                      {technology}
                    </span>
                  ))}
                </div>

                <div className="skills-card-footer">
                  <span>EXPLORE MY EXPERTISE</span>
                  <span aria-hidden="true">↗</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="skills-progress">
          <span>01</span>
          <div className="skills-progress-line">
            <div className="skills-progress-fill" />
          </div>
          <span>06</span>
        </div>
      </div>
    </section>
  );
}
