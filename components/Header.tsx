"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const navItems = [
  { label: "Home", href: "#home", sectionId: "home" },
  { label: "Skills", href: "#skills", sectionId: "skills" },
  { label: "About", href: "#about", sectionId: "about" },
  { label: "Projects", href: "#projects", sectionId: "projects" },
  { label: "Story", href: "#story", sectionId: "story" },
  { label: "Reviews", href: "#kind-words", sectionId: "kind-words" },
  { label: "Contact", href: "#contact", sectionId: "contact" },
];

type ActiveIndicator = {
  left: number;
  top: number;
  width: number;
  height: number;
};

function PortfolioLogo({ markOnly = false }: { markOnly?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className="grid size-[30px] shrink-0 place-items-center rounded-full
        bg-[#f5b826] font-mono text-lg font-bold leading-none text-white"
      >
        H
      </span>
      {!markOnly && (
        <span className="font-mono text-[10px] font-semibold tracking-[0.16em] text-[#171719]">
          HAMZA
        </span>
      )}
    </span>
  );
}

export default function Header() {
  const [active, setActive] = useState("Home");
  const [activeIndicator, setActiveIndicator] =
    useState<ActiveIndicator | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const desktopNavRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const hasScrolledRef = useRef(false);
  const [headerVisible, setHeaderVisible] = useState(true);

  useEffect(() => {
    let updateFrame = 0;

    const updateActiveSection = () => {
      updateFrame = 0;
      const activationLine = window.innerHeight * 0.3;
      let currentSection = navItems[0];

      for (const item of navItems) {
        const section = document.getElementById(item.sectionId);
        if (section && section.getBoundingClientRect().top <= activationLine) {
          currentSection = item;
        }
      }

      setActive((current) =>
        current === currentSection.label ? current : currentSection.label
      );
    };

    const scheduleActiveSectionUpdate = () => {
      if (!updateFrame) {
        updateFrame = requestAnimationFrame(updateActiveSection);
      }
    };

    window.addEventListener("scroll", scheduleActiveSectionUpdate, {
      passive: true,
    });
    window.addEventListener("resize", scheduleActiveSectionUpdate);
    updateActiveSection();

    return () => {
      window.removeEventListener("scroll", scheduleActiveSectionUpdate);
      window.removeEventListener("resize", scheduleActiveSectionUpdate);
      if (updateFrame) cancelAnimationFrame(updateFrame);
    };
  }, []);

  useEffect(() => {
    const desktopNav = desktopNavRef.current;
    if (!desktopNav) return;

    const updateIndicator = () => {
      const activeLink = Array.from(
        desktopNav.querySelectorAll<HTMLAnchorElement>("[data-nav-label]")
      ).find((link) => link.dataset.navLabel === active);

      if (!activeLink) return;

      setActiveIndicator({
        left: activeLink.offsetLeft,
        top: activeLink.offsetTop,
        width: activeLink.offsetWidth,
        height: activeLink.offsetHeight,
      });
    };

    updateIndicator();
    const resizeObserver = new ResizeObserver(updateIndicator);
    resizeObserver.observe(desktopNav);
    window.addEventListener("resize", updateIndicator);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateIndicator);
    };
  }, [active]);

  useGSAP(
    () => {
      const overlay = menuRef.current;
      if (!menuOpen || !overlay) return;

      const links = overlay.querySelectorAll<HTMLElement>(".mobile-menu-link");
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set([overlay, ...links], { clearProps: "all" });
        return;
      }

      const timeline = gsap.timeline();
      timeline
        .fromTo(
          overlay,
          { autoAlpha: 0, yPercent: 4 },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.55,
            ease: "power3.out",
          }
        )
        .fromTo(
          links,
          { autoAlpha: 0, y: 18 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.42,
            stagger: 0.065,
            ease: "power2.out",
          },
          "-=0.2"
        );

      return () => timeline.kill();
    },
    { dependencies: [menuOpen], revertOnUpdate: true }
  );

  useEffect(() => {
    if (!menuOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousDocumentOverflow =
      document.documentElement.style.overflow;
    const toggleButton = toggleButtonRef.current;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    closeButtonRef.current?.focus({ preventScroll: true });

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        return;
      }

      if (event.key !== "Tab" || !menuRef.current) return;

      const focusableElements =
        menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === lastElement
      ) {
        event.preventDefault();
        firstElement?.focus();
      }
    }

    function handleResize() {
      if (window.matchMedia("(min-width: 768px)").matches) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow =
        previousDocumentOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
      toggleButton?.focus({ preventScroll: true });
    };
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) return;

    let hideTimer: ReturnType<typeof setTimeout> | undefined;

    const handleScroll = () => {
      hasScrolledRef.current = true;
      setHeaderVisible(true);
      if (hideTimer) clearTimeout(hideTimer);
      hideTimer = setTimeout(() => setHeaderVisible(false), 2500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    if (hasScrolledRef.current || window.scrollY > 0) handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, [menuOpen]);

  return (
    <header
      aria-hidden={!headerVisible && !menuOpen}
      inert={!headerVisible && !menuOpen}
      className={`fixed inset-x-0 top-4 z-50 px-4 transition-[transform,opacity,visibility]
      duration-500 ease-out md:top-6 ${
        headerVisible || menuOpen
          ? "visible translate-y-0 opacity-100"
          : "invisible -translate-y-[calc(100%+16px)] opacity-0"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="relative mx-auto flex h-16 w-[122px] items-center justify-between
        rounded-full border border-black/[0.08] bg-[#faf8f3]/95 px-3
        shadow-[0_12px_34px_rgba(40,35,20,0.13)] backdrop-blur-xl
        md:h-[54px] md:w-fit md:max-w-[calc(100vw-48px)] md:gap-4
        md:bg-[#faf8f3]/85 md:px-2 md:shadow-[0_10px_32px_rgba(40,35,20,0.08)]"
      >
        <a
          href="#home"
          aria-label="Hamza portfolio home"
          className="hidden shrink-0 rounded-full p-1 md:block"
        >
          <PortfolioLogo />
        </a>

        <div
          ref={desktopNavRef}
          className="relative hidden flex-1 items-center justify-center gap-0.5 md:flex"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-0 rounded-full
            bg-[#f5b826] transition-[transform,width,height] duration-500 ease-out
            motion-reduce:transition-none"
            style={
              activeIndicator
                ? {
                    width: activeIndicator.width,
                    height: activeIndicator.height,
                    transform: `translate(${activeIndicator.left}px, ${activeIndicator.top}px)`,
                  }
                : { opacity: 0 }
            }
          />
          {navItems.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              data-nav-label={label}
              aria-current={active === label ? "page" : undefined}
              onClick={() => setActive(label)}
              className={`relative z-10 rounded-full px-3 py-2.5 font-mono text-[11px]
                tracking-[0.04em] transition-colors duration-300
                ${
                  active === label
                    ? "text-[#171717]"
                    : "text-[#353535] hover:bg-black/[0.04] hover:text-black"
                }`}
            >
              {label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden shrink-0 items-center gap-2 rounded-full
          bg-[#171719] px-4 py-2.5 font-mono text-[11px] font-medium
          tracking-wide text-[#f5b826] transition-all duration-300
          hover:bg-[#29292c] hover:shadow-lg md:flex"
        >
          Let’s talk <span aria-hidden="true">→</span>
        </a>

        <a href="#home" aria-label="Hamza portfolio home" className="md:hidden">
          <PortfolioLogo markOnly />
        </a>

        <button
          ref={toggleButtonRef}
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => {
            setHeaderVisible(true);
            setMenuOpen((isOpen) => !isOpen);
          }}
          className="grid size-9 place-items-center rounded-full text-[#171719]
          transition-transform duration-200 hover:scale-105 focus-visible:outline-2
          focus-visible:outline-offset-2 focus-visible:outline-[#171719] active:scale-95 md:hidden"
        >
          <span className="sr-only">
            {menuOpen ? "Close menu" : "Open menu"}
          </span>
          <span aria-hidden="true" className="flex w-[18px] flex-col gap-[5px]">
            <span
              className={`h-[2px] w-full rounded-full bg-current transition-transform duration-200 ${
                menuOpen ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[2px] w-full rounded-full bg-current transition-transform duration-200 ${
                menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      {menuOpen && (
        <div
          ref={menuRef}
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          data-lenis-prevent
          className="fixed inset-0 z-[60] flex min-h-[100svh]
          flex-col overflow-y-auto bg-[#f5b826] px-6 pb-6 pt-5 text-[#171717]
          sm:px-10 sm:pb-8 sm:pt-7 md:hidden"
        >
          <div className="flex items-center justify-between">
            <a
              href="#home"
              aria-label="Hamza portfolio home"
              onClick={() => setMenuOpen(false)}
              className="rounded-full focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              <PortfolioLogo />
            </a>
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Close navigation menu"
              onClick={() => setMenuOpen(false)}
              className="grid size-11 place-items-center rounded-full border border-black/20
              font-mono text-2xl transition-transform duration-200 hover:rotate-90
              focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-95"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <nav
            aria-label="Mobile navigation links"
            className="my-auto flex w-full flex-col py-8"
          >
            {navItems.map(({ label, href }, index) => (
              <a
                key={label}
                href={href}
                aria-current={active === label ? "page" : undefined}
                onClick={() => {
                  setActive(label);
                  setMenuOpen(false);
                }}
                style={{ animationDelay: `${140 + index * 55}ms` }}
                className="mobile-menu-link group flex min-h-11 items-center gap-4
                border-b border-black/15 py-1 font-mono text-[clamp(1.65rem,7vh,3rem)]
                font-medium leading-none tracking-[-0.06em] transition-colors
                duration-200 first:border-t hover:pl-2 hover:text-[#fff9e8]
                focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                <span
                  aria-hidden="true"
                  className="w-7 shrink-0 text-[11px] font-semibold tracking-normal text-black/55"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{label}</span>
                <span
                  aria-hidden="true"
                  className="ml-auto translate-x-2 text-xl opacity-0 transition-all
                  duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                >
                  ↗
                </span>
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-5">
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="flex min-h-14 items-center justify-between rounded-full bg-[#171719]
              px-6 font-mono text-sm font-semibold tracking-wide text-[#f5b826]
              transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Let’s Talk <span aria-hidden="true" className="text-xl">↗</span>
            </a>
            <p className="m-0 flex items-center gap-3 font-mono text-[10px] font-semibold tracking-[0.18em] uppercase">
              <span
                aria-hidden="true"
                className="size-2 rounded-full bg-[#087b51] shadow-[0_0_0_5px_rgba(8,123,81,0.14)]"
              />
              Available for Work
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
