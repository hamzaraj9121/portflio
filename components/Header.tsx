
"use client";

import { useState } from "react";

const navItems = [
  "Home",
  "Skills",
  "About",
  "Story",
  "Projects",
  "Contact",
  "Reviews",
];

export default function Header() {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-5 z-50 px-4 sm:top-7">
      <nav
        className="relative mx-auto flex max-w-[1045px] items-center justify-between
        rounded-full border border-black/[0.09] bg-[#faf9f5]/90
        p-2 shadow-[0_12px_40px_rgba(40,35,20,0.08)]
        backdrop-blur-xl"
      >
        {/* Small decorative indicator */}
        <div className="ml-1 hidden items-center px-4 md:flex">
          <span className="h-1 w-1 rounded-full bg-[#e6a400]" />
        </div>

        {/* Desktop navigation */}
        <div className="hidden flex-1 items-center justify-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={
                item === "Home"
                  ? "#home"
                  : `#${item.toLowerCase()}`
              }
              onClick={() => setActive(item)}
              className={`rounded-full px-5 py-[15px] text-[14px]
                tracking-[0.06em] transition-all duration-300
                ${
                  active === item
                    ? "bg-[#ffbd22] text-[#171717]"
                    : "text-[#696969] hover:bg-black/[0.04] hover:text-black"
                }`}
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden shrink-0 items-center gap-3 rounded-full
          bg-[#171719] px-6 py-[15px] text-sm font-medium
          tracking-wide text-[#ffbd22] transition-all duration-300
          hover:bg-[#29292c] hover:shadow-lg md:flex"
        >
          Let’s talk <span aria-hidden="true">→</span>
        </a>

        {/* Mobile navigation toggle */}
        <a
          href="#home"
          className="ml-2 rounded-full bg-[#ffbd22] px-5 py-3
          text-sm text-[#171717] md:hidden"
        >
          Home
        </a>

        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-full bg-[#171719] px-5 py-3
          text-sm text-white transition hover:bg-zinc-700 md:hidden"
        >
          {menuOpen ? "Close ×" : "Menu ☰"}
        </button>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div
            className="absolute left-0 right-0 top-[calc(100%+10px)]
            rounded-3xl border border-black/10 bg-[#faf9f5]
            p-3 shadow-xl md:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item}
                href={
                  item === "Home"
                    ? "#home"
                    : `#${item.toLowerCase()}`
                }
                onClick={() => {
                  setActive(item);
                  setMenuOpen(false);
                }}
                className={`mb-1 block rounded-2xl px-5 py-3
                  text-sm transition-colors last:mb-0
                  ${
                    active === item
                      ? "bg-[#ffbd22] text-black"
                      : "text-zinc-600 hover:bg-black/5"
                  }`}
              >
                {item}
              </a>
            ))}

            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-2 flex items-center justify-between
              rounded-2xl bg-[#171719] px-5 py-3
              text-sm text-[#ffbd22]"
            >
              Let’s talk <span>→</span>
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
