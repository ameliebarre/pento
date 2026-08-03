import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroBanner() {
  return (
    <section className="relative right-1/2 left-1/2 mx-[-50vw] w-screen">
      <div className="relative min-h-140 w-full">
        <Image
          src="/images/hero-banner.png"
          alt="Intérieur design mettant en scène du mobilier haut de gamme"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#2E2E2E]/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5.5 px-4 text-center text-white">
          <h1 className="font-heading max-w-3xl text-4xl italic md:text-[60px]">
            Find the most icon design furniture in one place
          </h1>
          <p className="max-w-md text-lg">
            Transform your space into a masterpiece with our exquisite designer home furnishings.
          </p>
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 rounded-[6px] bg-white px-6 py-3 text-sm font-medium text-black"
          >
            Shop now
            <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
