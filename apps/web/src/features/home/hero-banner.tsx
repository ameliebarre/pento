import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { HERO_DATA } from "./hero-data";

export function HeroBanner() {
  const data = HERO_DATA;

  return (
    <section className="relative right-1/2 left-1/2 mx-[-50vw] min-h-svh w-screen overflow-hidden">
      <Image
        src={data.backgroundImageUrl}
        alt={data.backgroundImageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.3)_40%,rgba(0,0,0,0.05)_65%,rgba(0,0,0,0)_80%)]" />

      <div className="relative flex min-h-svh w-full items-center justify-center px-4 pt-28 pb-16 sm:px-8 md:justify-start md:px-12 lg:px-16">
        <div className="flex w-full max-w-md flex-col items-center gap-6 text-center md:items-start md:text-left">
          <p className="text-xs font-medium tracking-[0.2em] text-[#E4CDA0] uppercase">
            {data.eyebrow}
          </p>
          <h1 className="font-heading text-[40px] leading-[1.1] text-white sm:text-[52px] lg:text-[64px]">
            {data.title}
          </h1>
          <p className="max-w-sm text-base text-[#E1DED6]">{data.description}</p>
          <Link
            href={data.ctaHref}
            className="group bg-ink mt-2 inline-flex w-fit items-center gap-2 px-6 py-3 text-sm whitespace-nowrap text-white uppercase transition-opacity hover:opacity-90"
          >
            {data.ctaLabel}
            <ArrowRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>

      <div className="group absolute right-4 bottom-6 flex cursor-pointer items-center gap-2 rounded-full bg-white/40 py-3 pr-5 pl-6 backdrop-blur-sm sm:right-8 sm:gap-4 sm:py-4 sm:pr-6 sm:pl-8 md:border md:border-white/40 md:bg-white/90 md:shadow-lg lg:right-24 lg:bottom-16">
        <div className="flex flex-col md:gap-1">
          <p className="font-heading text-ink text-sm sm:text-base">{data.product.name}</p>
          <p className="text-ink text-xs md:text-[#8a8275]">
            {data.product.designer} · {data.product.year}
          </p>
        </div>
        <ArrowUpRight
          aria-hidden="true"
          className="text-ink size-4 shrink-0 transition-transform duration-300 ease-out group-hover:rotate-45"
        />
      </div>
    </section>
  );
}
