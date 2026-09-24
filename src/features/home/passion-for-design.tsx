import Image from "next/image";

import { getPayloadClient } from "@/lib/payload";

export async function PassionForDesign() {
  const payload = await getPayloadClient();
  const section = await payload.findGlobal({ slug: "passion-for-design", depth: 1 });

  const image = typeof section.image === "object" ? section.image : null;
  const paragraphs = section.description.split("\n\n").filter(Boolean);

  return (
    <section
      aria-labelledby="passion-for-design-heading"
      className="relative right-1/2 left-1/2 mx-[-50vw] w-screen bg-[#1C1813]"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2">
        <div className="relative aspect-642/695 w-full md:aspect-auto">
          {image?.url ? (
            <Image
              src={image.url}
              alt={image.alt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <div className="bg-muted h-full w-full" />
          )}
        </div>

        <div className="flex flex-col gap-6 px-6 py-12 sm:px-10 sm:py-16 md:justify-center md:px-12 lg:px-16">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium tracking-wide text-[#c5964b] uppercase">
              {section.eyebrow}
            </p>
            <h2
              id="passion-for-design-heading"
              className="font-heading text-3xl text-balance text-white md:text-4xl"
            >
              {section.heading}
              <br />
              <span className="text-[#E4CDA0] italic">{section.headingAccent}</span>
            </h2>
          </div>

          <div className="flex flex-col gap-4 text-sm text-white/60 sm:text-base">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <hr className="border-white/15" />

          <dl className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {section.values.map((value) => (
              <div key={value.id} className="flex flex-col gap-2">
                <dt className="font-heading text-lg text-white">{value.title}</dt>
                <dd className="text-sm text-white/60">{value.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
