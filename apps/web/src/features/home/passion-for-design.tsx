import Image from "next/image";

import { PASSION_FOR_DESIGN_DATA } from "@/features/home/passion-for-design-data";
import { ScrollReveal } from "@/components/scroll-reveal";

export function PassionForDesign() {
  const section = PASSION_FOR_DESIGN_DATA;

  return (
    <section
      aria-labelledby="passion-for-design-heading"
      className="bg-ink relative right-1/2 left-1/2 mx-[-50vw] w-screen"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2">
        <ScrollReveal fromX={-60} className="w-full py-[68px] md:h-full">
          <div className="relative aspect-642/695 h-full w-full md:aspect-auto">
            <Image
              src={section.imageUrl}
              alt={section.imageAlt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal
          delay={0.15}
          className="flex flex-col gap-6 px-6 py-12 sm:px-10 sm:py-16 md:justify-center md:px-12 lg:px-16"
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium tracking-wide text-[#E4CDA0] uppercase">
              {section.eyebrow}
            </p>
            <h2
              id="passion-for-design-heading"
              className="font-heading text-3xl text-balance text-white md:text-4xl"
            >
              {section.heading}
              <br />
              <span className="italic">{section.headingAccent}</span>
            </h2>
          </div>

          <div className="flex flex-col gap-4 text-sm text-white/60 sm:text-base">
            {section.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <hr className="border-white/15" />

          <dl className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {section.values.map((value) => (
              <div key={value.title} className="flex flex-col gap-2">
                <dt className="font-heading text-lg text-white">{value.title}</dt>
                <dd className="text-sm text-white/60">{value.description}</dd>
              </div>
            ))}
          </dl>
        </ScrollReveal>
      </div>
    </section>
  );
}
