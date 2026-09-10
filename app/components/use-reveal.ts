"use client";

import { useEffect } from "react";

export default function useReveal() {
  useEffect(() => {
    const revealItems = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );

    revealItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const alreadyInView =
        rect.top < window.innerHeight * 0.92 && rect.bottom > 48;

      if (alreadyInView) {
        item.classList.add("is-visible");
      } else {
        observer.observe(item);
      }
    });

    return () => observer.disconnect();
  }, []);
}
