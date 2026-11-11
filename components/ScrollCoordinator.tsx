"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export default function ScrollCoordinator() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    // Let the debounced resize handler refresh pins after Lenis and breakpoints settle.
    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
    });

    const lenis = new Lenis({
      autoRaf: false,
      anchors: true,
    });
    const unsubscribeScroll = lenis.on("scroll", () =>
      ScrollTrigger.update()
    );
    const updateLenis = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.lagSmoothing(0);
    gsap.ticker.add(updateLenis);

    let refreshFrame = 0;
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    let resizeScrollY: number | undefined;
    let isActive = true;
    const refreshAll = () => {
      if (refreshFrame) cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(() => {
        refreshFrame = 0;
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      });
    };

    const handleResize = () => {
      if (!resizeTimer) resizeScrollY = window.scrollY;
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resizeTimer = undefined;
        const scrollY = resizeScrollY;
        resizeScrollY = undefined;
        refreshAll();
        if (scrollY !== undefined) {
          requestAnimationFrame(() => {
            lenis.resize();
            lenis.scrollTo(Math.min(scrollY, lenis.limit), {
              immediate: true,
              force: true,
            });
          });
        }
      }, 250);
    };

    const timer = setTimeout(refreshAll, 120);

    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(() => {
        if (isActive) refreshAll();
      });
    }

    window.addEventListener("load", refreshAll);
    window.addEventListener("resize", handleResize);

    return () => {
      isActive = false;
      clearTimeout(timer);
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeScrollY = undefined;
      if (refreshFrame) cancelAnimationFrame(refreshFrame);
      window.removeEventListener("load", refreshAll);
      window.removeEventListener("resize", handleResize);
      gsap.ticker.remove(updateLenis);
      unsubscribeScroll();
      lenis.destroy();
    };
  }, []);

  return null;
}
