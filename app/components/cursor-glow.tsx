"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const mediaQuery = window.matchMedia("(pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mediaQuery.matches || motionQuery.matches) return;

    let frame = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    function onPointerMove(event: PointerEvent) {
      targetX = event.clientX;
      targetY = event.clientY;
    }

    function animate() {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      glow!.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      frame = window.requestAnimationFrame(animate);
    }

    window.addEventListener("pointermove", onPointerMove);
    frame = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-30 hidden h-64 w-64 rounded-full opacity-40 blur-3xl md:block"
      style={{
        background:
          "radial-gradient(circle, rgb(161 161 170 / 0.35) 0%, transparent 70%)",
      }}
    />
  );
}
