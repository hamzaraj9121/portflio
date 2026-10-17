
"use client";

const sitemap = [
  { label: "Home", href: "#home" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { number: "01", label: "LinkedIn", href: "https://linkedin.com/" },
  { number: "02", label: "Instagram", href: "https://instagram.com/" },
  { number: "03", label: "WhatsApp", href: "https://wa.me/" },
  { number: "04", label: "Email", href: "mailto:CEO@byhamza.com" },
];

const marqueeItems = [
  "DEVELOPER",
  "VIBE CODING WITH AI",
  "AVAILABLE FOR WORK",
  "LET'S BUILD",
  "FULL-STACK DEVELOPER",
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#ffbd24] text-[#171717]">
      {/* Main footer */}
      <div className="relative z-10 mx-auto grid max-w-[1600px] grid-cols-1 gap-14 px-6 pb-24 pt-20 sm:px-10 lg:grid-cols-[1.25fr_0.7fr_0.8fr] lg:gap-12 lg:px-[6%] lg:pb-32 lg:pt-24">

        {/* Branding */}
        <div>
          <p className="mb-3 text-sm font-semibold tracking-[0.3em]">
            08 · FOOTER
          </p>

          <h2 className="max-w-[680px] font-mono text-[clamp(2.8rem,5vw,5rem)] font-medium leading-[0.98] tracking-[-0.065em]">
            Let’s make
            <br />
            something that
            <br />
            feels alive.
          </h2>

         

          <a
            href="mailto:CEO@byhamza.com"
            className="mt-10 inline-flex min-h-15 items-center gap-5 rounded-full bg-[#171719] px-10 font-mono text-base text-[#ffbd24] transition-transform hover:-translate-y-1"
          >
            CEO@byhamza.com
            <span aria-hidden="true" className="text-xl">→</span>
          </a>
        </div>

        {/* Sitemap */}
        <nav aria-label="Footer sitemap">
          <p className="mb-5 text-xs tracking-[0.3em] text-black/60">
            SITEMAP
          </p>

          <ul className="space-y-7">
            {sitemap.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="group flex w-fit items-center gap-3 font-mono text-lg transition-transform hover:translate-x-1"
                >
                  <span className="text-xs text-black/50">→</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social links */}
        <nav aria-label="Social media links">
          <p className="mb-5 text-xs tracking-[0.3em] text-black/60">
            ELSEWHERE
          </p>

          <ul className="space-y-7">
            {socials.map((social) => (
              <li key={social.number}>
                <a
                  href={social.href}
                  target={
                    social.label === "Email" ? undefined : "_blank"
                  }
                  rel={
                    social.label === "Email"
                      ? undefined
                      : "noopener noreferrer"
                  }
                  className="group flex w-fit items-center gap-3 font-mono text-lg transition-opacity hover:opacity-60"
                >
                  <span className="text-xs tracking-widest text-black/40">
                    {social.number}
                  </span>
                  {social.label}
                  <span aria-hidden="true" className="text-xs">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Oversized name */}
      <div
        aria-label="H Hamza Developer"
        className="relative select-none overflow-hidden px-4 pb-10 sm:px-8 lg:px-[6%]"
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-center gap-[clamp(1rem,7vw,8rem)]">
          <span className="font-sans text-[clamp(12rem,30vw,27rem)] font-black leading-[0.78] tracking-[-0.09em] text-[#fff0ce]">
            H
          </span>

          <div className="min-w-0 flex-1">
            <p className="break-words text-[clamp(2.5rem,10vw,9rem)] font-black leading-none tracking-[0.12em] text-[#fff0ce]">
              HAMZA
            </p>

            <p className="mt-5 break-words text-[clamp(1.5rem,5.2vw,4.5rem)] font-light leading-tight tracking-[0.16em]">
              DEVELOPER
            </p>
          </div>
        </div>
      </div>

      {/* Copyright strip */}
      <div className="flex flex-col justify-between gap-4 border-y border-black/10 px-6 py-7 text-[10px] tracking-[0.2em] text-black/60 sm:flex-row sm:px-10 lg:px-[6%]">
        <p>© {new Date().getFullYear()} HAMZA — ALL RIGHTS RESERVED</p>
        <p>MADE WITH ✦ IN PAKISTAN ↑</p>
      </div>

      {/* Infinite marquee */}
      <div className="overflow-hidden py-6" aria-label="Developer highlights">
        <div className="footer-marquee flex w-max">
          {[0, 1, 2, 3].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy !== 0}
              className="flex shrink-0 items-center gap-12 pr-12"
            >
              {marqueeItems.map((item) => (
                <span
                  key={`${copy}-${item}`}
                  className="flex shrink-0 items-center gap-5 whitespace-nowrap font-mono text-sm font-semibold tracking-[0.22em] sm:text-base"
                >
                  {item}
                  <span className="text-[#9d7415]">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .footer-marquee {
          animation: footer-scroll 32s linear infinite;
        }

        @keyframes footer-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .footer-marquee {
            animation: none;
          }
        }
      `}</style>
    </footer>
  );
}
