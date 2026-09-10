"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "./theme-toggle";

type ProjectNavLink = {
  href: string;
  label: string;
  active?: boolean;
};

type ProjectNavProps = {
  indexLabel: string;
  links?: ProjectNavLink[];
};

export default function ProjectNav({
  indexLabel,
  links = [],
}: ProjectNavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-zinc-200/70 bg-white/80 backdrop-blur-xl"
          : "nav-clear bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <a
          href="/"
          className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-zinc-900 transition-colors hover:text-zinc-500"
        >
          <span className="transition-transform duration-200 group-hover:-translate-x-1">
            ←
          </span>
          <span>Back to Work</span>
        </a>

        {links.length > 0 && (
          <div className="hidden items-center gap-6 text-sm md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`transition-colors ${
                  link.active
                    ? "text-zinc-900"
                    : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        <div className="flex shrink-0 items-center gap-4">
          <span className="font-mono text-xs tracking-wider text-zinc-500">
            {indexLabel}
          </span>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
