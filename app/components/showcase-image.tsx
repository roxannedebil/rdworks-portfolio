"use client";

import Image from "next/image";

type ShowcaseImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  unoptimized?: boolean;
  frameClassName?: string;
  imageClassName?: string;
};

export default function ShowcaseImage({
  src,
  alt,
  width,
  height,
  priority = false,
  unoptimized = false,
  frameClassName = "",
  imageClassName = "h-auto",
}: ShowcaseImageProps) {
  return (
    <div className={`overflow-hidden rounded-lg ${frameClassName}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        unoptimized={unoptimized}
        sizes="100vw"
        className={`h-auto w-full rounded-lg ${imageClassName}`}
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
}
