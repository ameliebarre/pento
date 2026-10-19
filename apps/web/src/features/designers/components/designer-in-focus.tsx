import { ProductImage } from "@/components/product-image";
import type { DesignerInFocus as DesignerInFocusType } from "@/features/products/medusa-types";

type DesignerInFocusProps = {
  inFocus: DesignerInFocusType;
};

export function DesignerInFocus({ inFocus }: DesignerInFocusProps) {
  return (
    <div
      id="in-focus"
      className="relative right-1/2 left-1/2 mx-[-50vw] w-screen scroll-mt-32 bg-[#EFE9DF] py-16"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 sm:px-10">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium tracking-wide text-[#c5964b] uppercase">In Focus</p>
          <h2 className="font-heading text-3xl text-[#26221B] sm:text-4xl">{inFocus.title}</h2>
        </div>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
          {inFocus.image_url && (
            <div className="bg-muted relative aspect-4/3 w-full overflow-hidden">
              <ProductImage
                src={inFocus.image_url}
                alt={inFocus.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          )}

          <div className="flex flex-col gap-6">
            {inFocus.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={
                  index === 0 ? "text-sm font-semibold text-[#26221B]" : "text-sm text-[#26221B]"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
