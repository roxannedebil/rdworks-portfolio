"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type CollageSlide = {
  src: string;
  alt: string;
  label?: string;
  width?: number;
  height?: number;
};

type CollageCarouselProps = {
  slides: CollageSlide[];
  priority?: boolean;
};

export default function CollageCarousel({
  slides,
  priority = false,
}: CollageCarouselProps) {
  const [index, setIndex] = useState(0);
  const total = slides.length;

  function goTo(nextIndex: number) {
    if (total === 0) return;
    setIndex((nextIndex + total) % total);
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowRight") {
        setIndex((current) => (current + 1) % total);
      }
      if (event.key === "ArrowLeft") {
        setIndex((current) => (current - 1 + total) % total);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [total]);

  if (total === 0) return null;

  const current = slides[index];

  return (
    <div className="collage">
      <div className="collage-stage">
        {slides.map((slide, slideIndex) => {
          const offset = (slideIndex - index + total) % total;
          let position = "is-back";
          if (offset === 0) position = "is-front";
          else if (offset === 1) position = "is-right";
          else if (offset === total - 1) position = "is-left";

          return (
            <button
              key={slide.src}
              type="button"
              className={`collage-card ${position}`}
              aria-label={
                offset === 0
                  ? `${slide.alt}. Show next screen`
                  : `Show ${slide.label ?? slide.alt}`
              }
              onClick={() => (offset === 0 ? goTo(index + 1) : goTo(slideIndex))}
            >
              <span className="collage-card-inner">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  width={slide.width ?? 1600}
                  height={slide.height ?? 1000}
                  priority={priority && offset === 0}
                  className="h-full w-full object-cover object-top"
                />
              </span>
            </button>
          );
        })}
      </div>

      <div className="collage-controls">
        <button
          type="button"
          className="collage-nav-btn"
          aria-label="Previous screen"
          onClick={() => goTo(index - 1)}
        >
          <ChevronLeft size={18} />
        </button>

        <div className="min-w-0 text-center">
          <p className="truncate text-sm font-medium text-zinc-900">
            {current.label ?? current.alt}
          </p>
          <p className="mt-1 font-mono text-xs text-zinc-600">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
        </div>

        <button
          type="button"
          className="collage-nav-btn"
          aria-label="Next screen"
          onClick={() => goTo(index + 1)}
        >
          <ChevronRight size={18} />
          <span className="hidden sm:inline">Next</span>
        </button>
      </div>
    </div>
  );
}
