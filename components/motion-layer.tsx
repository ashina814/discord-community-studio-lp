"use client";

import { useEffect } from "react";

export function MotionLayer() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (reduceMotion) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    targets.forEach((target, index) => {
      target.style.setProperty("--reveal-delay", `${Math.min(index % 8, 6) * 70}ms`);
      observer.observe(target);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
