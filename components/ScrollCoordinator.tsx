"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

export default function ScrollCoordinator() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

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
    let isActive = true;
    const refreshAll = () => {
      if (refreshFrame) cancelAnimationFrame(refreshFrame);
      refreshFrame = requestAnimationFrame(() => {
        refreshFrame = 0;
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      });
    };

    const timer = setTimeout(refreshAll, 120);

    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(() => {
        if (isActive) refreshAll();
      });
    }

    window.addEventListener("load", refreshAll);

    return () => {
      isActive = false;
      clearTimeout(timer);
      if (refreshFrame) cancelAnimationFrame(refreshFrame);
      window.removeEventListener("load", refreshAll);
      gsap.ticker.remove(updateLenis);
      unsubscribeScroll();
      lenis.destroy();
    };
  }, []);

  return null;
}
