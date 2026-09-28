import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "Every piece feels like it has a soul. Our living room finally tells the story we always wanted it to.",
    name: "Camille R.",
    location: "Paris",
  },
  {
    quote:
      "Every piece feels like it has a soul. Our living room finally tells the story we always wanted it to.",
    name: "Julian M.",
    location: "Berlin",
  },
  {
    quote:
      "Every piece feels like it has a soul. Our living room finally tells the story we always wanted it to.",
    name: "Sofia L.",
    location: "Milan",
  },
];

export function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="relative right-1/2 left-1/2 mx-[-50vw] w-screen bg-[#EFE9DF] py-16 sm:py-20"
    >
      <div className="mx-auto flex max-w-xl flex-col items-center gap-3 px-6 text-center">
        <p className="text-sm font-medium tracking-wide text-[#c5964b] uppercase">Kind words</p>
        <h2 id="testimonials-heading" className="font-heading text-3xl md:text-4xl">
          Loved by collectors worldwide
        </h2>
      </div>

      <ul className="mx-auto mt-10 grid max-w-7xl grid-cols-1 gap-4 px-6 sm:mt-12 sm:grid-cols-3">
        {TESTIMONIALS.map((testimonial, index) => (
          <li key={index} className="flex flex-col gap-6 bg-[#F7F4EE] p-6 sm:p-8">
            <Quote aria-hidden="true" className="size-6 fill-[#c5964b] text-[#c5964b]" />
            <p className="font-heading flex-1 text-base italic sm:text-lg">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <div className="border-t border-black/10 pt-4">
              <p className="text-sm font-semibold">{testimonial.name}</p>
              <p className="text-muted-foreground text-sm">{testimonial.location}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
