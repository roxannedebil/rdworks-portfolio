"use client";

import Image from "next/image";
import { useEffect, useState, type MouseEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type PreviewSlide = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

type ProjectPreviewCarouselProps = {
  slides: PreviewSlide[];
  href: string;
  intervalMs?: number;
};

export default function ProjectPreviewCarousel({
  slides,
  href,
  intervalMs = 3200,
}: ProjectPreviewCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;
  const firstSlide = slides[0];

  useEffect(() => {
    if (count <= 1 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [count, intervalMs, paused]);

  function goNext(event?: MouseEvent) {
    event?.preventDefault();
    event?.stopPropagation();
    setIndex((current) => (current + 1) % count);
  }

  function goPrev(event?: MouseEvent) {
    event?.preventDefault();
    event?.stopPropagation();
    setIndex((current) => (current - 1 + count) % count);
  }

  if (count === 0 || !firstSlide) return null;

  return (
    <div
      className="project-preview-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="project-preview-carousel-viewport">
        {/* First image sets the frame size for every slide */}
        <Image
          src={firstSlide.src}
          alt=""
          width={firstSlide.width ?? 1920}
          height={firstSlide.height ?? 1080}
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          aria-hidden="true"
          className="project-preview-carousel-sizer"
        />

        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className={`project-preview-carousel-slide ${
              i === index ? "is-active" : ""
            }`}
            aria-hidden={i !== index}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={i === 0}
              className="project-preview-carousel-image"
            />
          </div>
        ))}
      </div>

      <a
        href={href}
        className="project-preview-carousel-link"
        aria-label="View case study"
      >
        <div className="project-overlay">
          <span>View case study</span>
        </div>
      </a>

      {count > 1 && (
        <>
          <button
            type="button"
            className="project-preview-carousel-arrow is-prev"
            aria-label="Previous image"
            onClick={goPrev}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            className="project-preview-carousel-arrow is-next"
            aria-label="Next image"
            onClick={goNext}
          >
            <ChevronRight size={18} />
          </button>

          <div className="project-preview-carousel-dots" aria-hidden="true">
            {slides.map((slide, i) => (
              <span
                key={slide.src}
                className={`project-preview-carousel-dot ${
                  i === index ? "is-active" : ""
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
