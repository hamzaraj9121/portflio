const stats = [
  { value: "3+", label: "YEARS OF EXPERIENCE" },
  { value: "Full-Stack", label: "WEB DEVELOPMENT" },
  { value: "AI + 3D", label: "CURRENT EXPLORATION" },
];

const interests = [
  { label: "LEARNING", value: "Three.js, shaders & WebGL" },
  { label: "BUILDING", value: "Scalable full-stack apps" },
  { label: "EXPLORING", value: "AI & creative coding" },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-[#faf8f1] px-5 py-12 sm:px-7 md:py-14 lg:px-10 lg:py-16"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 md:grid-cols-[1.05fr_0.95fr] md:gap-6 lg:gap-10">
        <div className="min-w-0">
          <p className="mb-3 font-mono text-[10px] tracking-[0.3em] text-amber-600 sm:text-xs">
            03 · ABOUT
          </p>

          <h2 className="mb-4 font-mono text-3xl font-medium leading-[1.08] tracking-tight text-[#191919] sm:text-4xl lg:text-[46px]">
            Nice to <span className="text-amber-500">meet you,</span>
            <br />
            I&apos;m Hamza.
          </h2>

          <div className="max-w-3xl space-y-5 text-base leading-8 text-slate-600 sm:text-lg sm:leading-9">
            <p>
              I&apos;m a full-stack developer from Pakistan with 3+ years of
              experience creating useful, engaging digital experiences.
            </p>
            <p>
              I build with{" "}
              <strong className="font-medium text-[#191919]">
                React, Angular, Next.js, Node.js, Express, Laravel, MongoDB,
                and MySQL.
              </strong>{" "}
              Lately, I&apos;m exploring{" "}
              <strong className="font-medium text-[#191919]">
                Three.js, GSAP, WebGL, and AI-powered creative tools.
              </strong>
            </p>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
            {stats.map((stat) => (
              <div
                key={stat.value}
                className="min-w-0 rounded-xl border border-stone-200 bg-white/80 px-2.5 py-3 transition-colors duration-300 hover:border-amber-400 sm:px-3.5"
              >
                <h3 className="truncate font-mono text-xs font-medium tracking-[-0.06em] text-[#191919] sm:text-lg sm:tracking-normal">
                  {stat.value}
                </h3>
                <p className="mt-1 font-mono text-[8px] leading-4 tracking-[0.12em] text-slate-500 sm:text-[9px]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <aside className="relative overflow-hidden rounded-[22px] bg-gradient-to-br from-[#ffd15c] to-[#f5b826] px-6 py-6 sm:px-8 sm:py-7">
          <span
            aria-hidden="true"
            className="absolute -top-5 right-5 font-mono text-[100px] font-bold leading-none text-black/[0.08]"
          >
            &ldquo;
          </span>

          <div className="relative z-10 px-5 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <blockquote className="max-w-md font-mono text-2xl font-medium leading-[1.25] tracking-tight text-[#171717] sm:text-3xl">
              I believe in building things that make people say,
              <span className="mt-1 block">
                &ldquo;That&apos;s different.&rdquo;
              </span>
            </blockquote>

            <p className="mt-4 font-mono text-[9px] tracking-[0.24em] text-black/60">
              — MY APPROACH TO DEVELOPMENT
            </p>

            <div className="my-5 h-px bg-black/15" />

            <p className="mb-3 font-mono text-[9px] tracking-[0.28em] text-black/60">
              CURRENTLY
            </p>

            <div className="space-y-2.5">
              {interests.map((item) => (
                <div
                  key={item.label}
                  className="grid grid-cols-[8px_76px_minmax(0,1fr)] items-center gap-2"
                >
                  <span className="size-2 rounded-full bg-black/25" />
                  <span className="font-mono text-[10px] text-black/65">
                    {item.label}
                  </span>
                  <span className="text-xs font-medium leading-5 text-[#171717] sm:text-sm">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
