"use client";

import { useRef, type MouseEvent, type ReactNode, type RefObject } from "react";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
  target?: string;
  rel?: string;
};

export default function MagneticButton({
  children,
  className = "",
  href,
  onClick,
  ariaLabel,
  target,
  rel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);

  function handleMove(event: MouseEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const bounds = el.getBoundingClientRect();
    const x = event.clientX - bounds.left - bounds.width / 2;
    const y = event.clientY - bounds.top - bounds.height / 2;
    el.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
  }

  function handleLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
  }

  if (href) {
    return (
      <a
        ref={ref as RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        aria-label={ariaLabel}
        className={`magnetic-control ${className}`}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as RefObject<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`magnetic-control ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </button>
  );
}
