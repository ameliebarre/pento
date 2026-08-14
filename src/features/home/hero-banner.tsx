import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getPayloadClient } from "@/lib/payload";

export async function HeroBanner() {
  const payload = await getPayloadClient();
  const banner = await payload.findGlobal({ slug: "hero-banner", depth: 1 });

  const image = typeof banner.backgroundImage === "object" ? banner.backgroundImage : null;

  return (
    <section className="relative right-1/2 left-1/2 mx-[-50vw] h-screen w-screen">
      <Image
        src={image?.url ?? "/images/banner-image.png"}
        alt={image?.alt ?? "Intérieur design mettant en scène du mobilier haut de gamme"}
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_left,rgba(255,255,255,0)_0%,rgba(54,54,54,0.5)_45%,rgba(0,0,0,1)_100%)]" />
      <div className="text- absolute inset-0 flex flex-col justify-center gap-5.5 px-4 text-left text-white">
        <h1 className="font-heading max-w-xl text-4xl md:text-[70px]">
          {banner.heading} <span className="text-[#E4CDA0] italic">{banner.headingAccent}</span>
        </h1>
        <p className="color-[#E1DED6] max-w-155 text-[18px]">{banner.description}</p>
        <Link
          href={banner.ctaHref}
          className="group inline-flex w-fit items-center gap-2 bg-[#c5964b] px-6 py-3 text-sm font-normal text-black uppercase"
        >
          {banner.ctaLabel}
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </section>
  );
}
