"use client";

import Image from "next/image";
import { CldImage } from "next-cloudinary";

type ProductImageProps = {
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  className?: string;
};

function isCloudinarySource(src: string) {
  if (src.startsWith("https://res.cloudinary.com/")) return true;
  return !src.startsWith("/") && !src.startsWith("http");
}

export function ProductImage({ src, alt, fill, sizes, className }: ProductImageProps) {
  if (isCloudinarySource(src)) {
    return (
      <CldImage
        src={src}
        alt={alt}
        fill={fill}
        sizes={sizes}
        className={className}
        crop="fill"
        gravity="auto"
      />
    );
  }

  return <Image src={src} alt={alt} fill={fill} sizes={sizes} className={className} />;
}
