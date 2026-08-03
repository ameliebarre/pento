"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export type DesignerSlide = {
  name: string;
  image: string;
  title: string;
  description: string;
};

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 32 : -32, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -32 : 32, opacity: 0 }),
};

const numberVariants = {
  enter: (direction: number) => ({ y: direction >= 0 ? 12 : -12, opacity: 0 }),
  center: { y: 0, opacity: 1 },
  exit: (direction: number) => ({ y: direction >= 0 ? -12 : 12, opacity: 0 }),
};

export function DesignerSpotlightSlider({ slides }: { slides: DesignerSlide[] }) {
  const [[index, direction], setSlide] = useState([0, 0]);

  const slide = slides[index];
  const isFirst = index === 0;
  const isLast = index === slides.length - 1;

  function goTo(newIndex: number) {
    if (newIndex < 0 || newIndex >= slides.length) return;
    setSlide([newIndex, newIndex > index ? 1 : -1]);
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Designers à l'honneur"
      className="grid grid-cols-1 overflow-hidden lg:min-h-90 lg:grid-cols-2"
    >
      <div className="relative aspect-4/3 w-full overflow-hidden sm:aspect-video lg:aspect-auto lg:min-h-full">
        <AnimatePresence custom={direction} initial={false}>
          <motion.div
            key={slide.image}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={slide.image}
              alt={`Portrait de ${slide.name}`}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div
        aria-live="polite"
        aria-atomic="true"
        className="flex flex-col items-start justify-center gap-5.5 overflow-hidden bg-neutral-100 px-6 py-10 sm:px-10 sm:py-12 lg:px-16 lg:py-16"
      >
        <AnimatePresence custom={direction} mode="wait" initial={false}>
          <motion.div
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            role="group"
            aria-roledescription="slide"
            aria-label={`${slide.name} — diapositive ${index + 1} sur ${slides.length}`}
            className="flex w-full flex-col items-start gap-5.5"
          >
            <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
              <h3 className="font-heading min-w-0 text-3xl md:text-4xl">{slide.title}</h3>
              <div
                aria-hidden="true"
                className="flex shrink-0 items-center gap-1.5 text-sm tabular-nums sm:pt-3"
              >
                <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                  <motion.span
                    key={index}
                    custom={direction}
                    variants={numberVariants}
                    className="font-bold"
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </motion.span>
                </AnimatePresence>
                <span>—</span>
                <span>{String(slides.length).padStart(2, "0")}</span>
              </div>
            </div>
            <p className="text-md max-w-md text-[#6a6a6a]">{slide.description}</p>
            <div className="flex w-full flex-wrap items-center justify-between gap-4">
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 text-sm font-medium"
              >
                Découvrir son histoire
                <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <div className="flex shrink-0 items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => goTo(index - 1)}
                  disabled={isFirst}
                  aria-label="Designer précédent"
                >
                  <ArrowLeft aria-hidden="true" className="size-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => goTo(index + 1)}
                  disabled={isLast}
                  aria-label="Designer suivant"
                >
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
