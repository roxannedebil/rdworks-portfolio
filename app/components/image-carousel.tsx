"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type TouchEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type CarouselSlide = {
  src: string;
  alt: string;
  label?: string;
  width?: number;
  height?: number;
};

type ImageCarouselProps = {
  slides: CarouselSlide[];
  className?: string;
  /** landscape = wide UI shots, portrait = tall screenshots */
  variant?: "landscape" | "portrait" | "auto";
};

export default function ImageCarousel({
  slides,
  className = "",
  variant = "auto",
}: ImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const count = slides.length;

  const resolvedVariant =
    variant === "auto"
      ? (slides[0]?.height ?? 1000) > (slides[0]?.width ?? 1600)
        ? "portrait"
        : "landscape"
      : variant;

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "ArrowRight") {
        setIndex((current) => (current + 1) % count);
      }
      if (event.key === "ArrowLeft") {
        setIndex((current) => (current - 1 + count) % count);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count]);

  function goNext() {
    setIndex((current) => (current + 1) % count);
  }

  function goPrev() {
    setIndex((current) => (current - 1 + count) % count);
  }

  function onTouchStart(event: TouchEvent) {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  }

  function onTouchEnd(event: TouchEvent) {
    if (touchStartX.current == null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 40) return;
    if (delta < 0) goNext();
    else goPrev();
  }

  if (count === 0) return null;

  const active = slides[index];

  return (
    <div className={`slide-carousel ${className}`}>
      <div
        className={`slide-carousel-viewport slide-carousel-viewport--${resolvedVariant}`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="slide-carousel-track"
          style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}
        >
          {slides.map((slide, i) => (
            <div key={slide.src} className="slide-carousel-slide" aria-hidden={i !== index}>
              <Image
                src={slide.src}
                alt={slide.alt}
                width={slide.width ?? 1600}
                height={slide.height ?? 1000}
                priority={i === 0}
                className="slide-carousel-image"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="slide-carousel-controls">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous image"
            className="slide-carousel-nav"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next image"
            className="slide-carousel-nav"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        <p className="min-w-0 truncate text-sm text-zinc-500">
          <span className="font-medium text-zinc-900">
            {active.label ?? active.alt}
          </span>
          <span className="mx-2 text-zinc-300">·</span>
          <span className="font-mono text-xs tracking-wider">
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
        </p>

        <div className="slide-carousel-dots" role="tablist" aria-label="Slides">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to ${slide.label ?? slide.alt}`}
              className={`slide-carousel-dot ${i === index ? "is-active" : ""}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
