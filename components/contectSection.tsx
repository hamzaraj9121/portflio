
"use client";

import { useState, type FormEvent } from "react";

const socialLinks = [
  { number: "01", label: "LinkedIn", href: "https://linkedin.com/" },
  { number: "02", label: "Instagram", href: "https://instagram.com/" },
  { number: "03", label: "WhatsApp", href: "https://wa.me/" },
  { number: "04", label: "Email", href: "mailto:CEO@byhamza.com" },
];

export default function ContactSection() {
  const [status, setStatus] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const message = String(form.get("message") ?? "");

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );

    window.location.href =
      `mailto:CEO@byhamza.com?subject=${subject}&body=${body}`;

    setStatus("Opening your email application...");
  }

  return (
    <section
      id="contact"
      className="relative min-h-screen overflow-hidden bg-[#ffbd24] px-6 py-13 text-[#171717] sm:px-10 lg:px-[6%] lg:py-28"
    >
      {/* Subtle dotted texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "radial-gradient(#76520c 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-[1600px] grid-cols-1 gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
        {/* Left content */}
        <div className="flex flex-col items-start">
          <span className="text-sm font-semibold tracking-[0.3em]">
            06 · CONTACT
          </span>

          <div className="relative mt-3">
            <span
              aria-hidden="true"
              className="absolute -right-5 -top-8 flex h-12 w-12 items-center justify-center rounded-full border border-blue-700"
            >
              <span className="h-3.5 w-3.5 rounded-full bg-blue-700" />
            </span>

            <h3 className="font-mono text-[clamp(2.8rem,6.2vw,6rem)] font-sm leading-[0.99] tracking-[-0.075em]">
              Have an idea?
              <br />
              Let’s build
              <br />
              it together.
            </h3>
          </div>

          <p className="mt-5 max-w-xl text-base leading-8 text-black/70 sm:text-lg">
            Let’s discuss your next project — I’m always open to new
            opportunities and collaborations.
          </p>

          <a
            href="mailto:CEO@byhamza.com"
            className="mt-10 inline-flex min-h-15 items-center gap-5 rounded-full bg-[#171719] px-6 font-mono text-base text-[#ffbd24] transition-transform duration-300 hover:-translate-y-1 sm:px-10"
          >
            CEO@byhamza.com
            <span aria-hidden="true" className="text-xl">→</span>
          </a>

          <nav
            aria-label="Social links"
            className="mt-14 flex flex-wrap gap-x-8 gap-y-4"
          >
            {socialLinks.map((link) => (
              <a
                key={link.number}
                href={link.href}
                target={
                  link.label === "Email" ? undefined : "_blank"
                }
                rel={
                  link.label === "Email"
                    ? undefined
                    : "noopener noreferrer"
                }
                className="group flex items-center gap-2 font-mono text-sm transition-opacity hover:opacity-60"
              >
                <span className="text-xs tracking-widest text-black/40">
                  {link.number}
                </span>
                {link.label}
                <span aria-hidden="true" className="text-xs">↗</span>
              </a>
            ))}
          </nav>
        </div>

        {/* Right contact form */}
        <div className="relative">
          <div className="mb-10 flex items-center justify-between gap-4">
            <h3 className="font-mono text-sm font-semibold tracking-[0.25em] text-black/65 sm:text-md">
              SEND A MESSAGE
            </h3>

            <div
              aria-hidden="true"
              className="hidden h-20 w-20 shrink-0 items-center justify-center rounded-full border border-black/15 font-mono text-[9px] tracking-[0.2em] sm:flex"
            >
              <span className="text-center">
                SAY HELLO
                <br />
                <span className="text-xl">✦</span>
                <br />
                ANYTIME
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
              <label className="block">
                <span className="mb-4 block text-xs tracking-[0.2em] text-black/55">
                  NAME
                </span>
                <input
                  required
                  name="name"
                  type="text"
                  placeholder="Your name"
                  className="w-full border-0 border-b border-black/25  pb-4 text-lg outline-none transition-colors placeholder:text-black/40 focus:border-black"
                />
              </label>

              <label className="block">
                <span className="mb-4 block text-xs tracking-[0.2em] text-black/55">
                  EMAIL
                </span>
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="you@email.com"
                  className="w-full border-0 border-b border-black/25  pb-4 text-lg outline-none transition-colors placeholder:text-black/40 focus:border-black"
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-4 block text-xs tracking-[0.2em] text-black/55">
                MESSAGE
              </span>
              <textarea
                required
                name="message"
                rows={4}
                placeholder="Tell me about your project..."
                className="w-full resize-y border-0 border-b border-black/25 bg-transparent pb-4 text-lg leading-8 outline-none transition-colors placeholder:text-black/40 focus:border-black"
              />
            </label>

            <button
              type="submit"
              className="inline-flex min-h-15 items-center gap-5 rounded-full bg-[#171719] px-10 font-mono text-base text-[#ffbd24] transition-transform duration-300 hover:-translate-y-1"
            >
              Send message
              <span aria-hidden="true" className="text-xl">→</span>
            </button>

            {status && (
              <p role="status" className="text-sm text-black/70">
                {status}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
