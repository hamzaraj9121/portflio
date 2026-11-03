"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollCoordinator() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const refreshAll = () => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    };

    const timer = setTimeout(refreshAll, 120);

    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(refreshAll);
    }

    window.addEventListener("load", refreshAll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", refreshAll);
    };
  }, []);

  return null;
}
