"use client";

import { useProgress } from "@react-three/drei";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

export default function Preloader() {
  const { active, errors, loaded, progress, total } = useProgress();
  const [documentReady, setDocumentReady] = useState(false);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const [displayProgress, setDisplayProgress] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number | null>(null);
  const progressValueRef = useRef(0);

  useEffect(() => {
    startTimeRef.current = Date.now();

    let pageLoaded = document.readyState === "complete";
    let fontsLoaded = !document.fonts;

    const updateDocumentReady = () => {
      if (pageLoaded && fontsLoaded) setDocumentReady(true);
    };

    const handleLoad = () => {
      pageLoaded = true;
      updateDocumentReady();
    };

    if (pageLoaded) updateDocumentReady();
    else window.addEventListener("load", handleLoad);

    if (document.fonts) {
      document.fonts.ready.then(() => {
        fontsLoaded = true;
        updateDocumentReady();
      });
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  useEffect(() => {
    if (!visible) return;

    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [visible]);

  useEffect(() => {
    if (
      !visible ||
      !documentReady ||
      (!errors.length && (active || (total > 0 && loaded < total)))
    ) {
      return;
    }

    const elapsed = Date.now() - (startTimeRef.current ?? Date.now());
    const delay = Math.max(350, 1100 - elapsed);
    const timer = window.setTimeout(() => setReady(true), delay);

    return () => window.clearTimeout(timer);
  }, [active, documentReady, errors.length, loaded, total, visible]);

  const targetProgress = ready || errors.length
    ? 100
    : active
      ? Math.min(progress, 94)
      : documentReady
        ? 94
        : Math.min(progress, 94);

  useEffect(() => {
    const value = { value: progressValueRef.current };
    const tween = gsap.to(value, {
      value: targetProgress,
      duration: 0.45,
      ease: "power2.out",
      onUpdate: () => {
        progressValueRef.current = value.value;
        setDisplayProgress(Math.round(value.value));
      },
    });

    return () => {
      tween.kill();
    };
  }, [targetProgress]);

  useEffect(() => {
    if (!ready) return;

    const complete = () => {
      setVisible(false);
      window.dispatchEvent(new Event("portfolio:preloader-complete"));
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      complete();
      return;
    }

    const overlay = overlayRef.current;
    if (!overlay) return;

    const timeline = gsap.timeline({ delay: 0.45, onComplete: complete });
    timeline.to(overlay, {
      yPercent: -100,
      duration: 0.85,
      ease: "power4.inOut",
    });

    return () => {
      timeline.kill();
    };
  }, [ready]);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      data-site-preloader
      role="status"
      aria-label={
        errors.length
          ? "Some portfolio assets could not be loaded"
          : `Loading portfolio, ${displayProgress}%`
      }
      className="fixed inset-0 z-[100] flex min-h-[100svh] items-center
      justify-center overflow-hidden bg-[linear-gradient(105deg,#fbf2d5_0%,#fbf8eb_35%,#faf9f5_65%,#f8f7f4_100%)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(30,30,30,0.07)_1px,_transparent_1.5px)]
        bg-[size:38px_38px] opacity-70"
      />

      <div className="relative z-10 w-full max-w-[480px] px-6 text-center">
        <p className="mb-5 font-sans text-[11px] font-medium tracking-[0.32em] text-[#85837e] sm:text-sm">
          BY Hamza
        </p>

        <p
          aria-hidden="true"
          className="m-0 flex items-center justify-center font-sans
         text-[clamp(4rem,10vw,8rem)] font-small leading-[0.78]
          tracking-[-0.09em]"
        >
          <span className="bg-gradient-to-br from-[#ffc839] to-[#f39b00] bg-clip-text text-transparent">
            {displayProgress}
          </span>
          <span className="ml-2 text-[#171719]">%</span>
        </p>

        <div
          role="progressbar"
          aria-label="Portfolio loading progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={displayProgress}
          className="mt-16 h-[5px] w-full bg-[#deddd9]"
        >
          <div
            aria-hidden="true"
            className="h-full bg-gradient-to-r from-[#f7c74b] to-[#f39b00]"
            style={{ width: `${displayProgress}%` }}
          />
        </div>

        <p className="mt-9 flex items-center justify-center gap-3 font-sans text-[10px] font-medium tracking-[0.34em] text-[#777570] sm:text-xs">
          <span
            aria-hidden="true"
            className="size-[9px] rounded-full bg-[#f7c74b]"
          />
          {errors.length ? "SOME ASSETS FAILED TO LOAD" : "LOADING EXPERIENCE"}
        </p>
      </div>
    </div>
  );
}