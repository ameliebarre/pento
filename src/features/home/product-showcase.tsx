"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";

const SHOWCASE_ITEMS = [
  {
    name: "Egg Chair",
    image: "/images/egg-chair.jpg",
    alt: "Gros plan sur le fauteuil Egg Chair",
    href: "/product/egg-chair",
  },
  {
    name: "Tulip Chair",
    image: "/images/tulip-chair.jpg",
    alt: "Gros plan sur la chaise Tulip Chair",
    href: "/product/tulip-chair",
  },
  {
    name: "Vertigo Lamp",
    image: "/images/vertigo-lamp.jpg",
    alt: "Gros plan sur la suspension Vertigo Lamp",
    href: "/product/vertigo-lamp",
  },
] as const;

function ShowcaseSlide({ name, image, alt, href }: (typeof SHOWCASE_ITEMS)[number]) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const shouldReduceMotion = useReducedMotion();
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["0%", "0%"] : ["-8%", "8%"],
  );

  return (
    <div ref={ref} className="relative h-screen w-full overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <Image src={image} alt={alt} fill sizes="100vw" className="scale-[1.15] object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/5 to-transparent" />
      <Link
        href={href}
        className="group absolute bottom-6 left-6 inline-flex items-center gap-2 text-sm font-medium text-white uppercase sm:right-10 sm:bottom-10"
      >
        {name}
        <ArrowRight
          aria-hidden="true"
          className="size-5 transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>
    </div>
  );
}

export function ProductShowcase() {
  return (
    <section
      aria-label="Produits en gros plan"
      className="relative right-1/2 left-1/2 mx-[-50vw] w-screen"
    >
      {SHOWCASE_ITEMS.map((item) => (
        <ShowcaseSlide key={item.name} {...item} />
      ))}
    </section>
  );
}
