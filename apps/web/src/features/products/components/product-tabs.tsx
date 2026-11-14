import { forwardRef } from "react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import type { MedusaProduct } from "../medusa-types";

type ProductTabsProps = {
  product: MedusaProduct;
  value: string[];
  onValueChange: (value: string[]) => void;
};

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").trim();
}

function formatDimensions(product: MedusaProduct) {
  const parts: number[] = [];
  if (product.width) parts.push(product.width);
  if (product.height) parts.push(product.height);
  const depth = product.metadata?.depth;
  if (typeof depth === "number" && depth) parts.push(depth);
  return parts.length > 0 ? `${parts.join(" × ")} cm` : null;
}

function formatWeight(product: MedusaProduct) {
  return product.weight ? `${product.weight} kg` : null;
}

export const ProductTabs = forwardRef<HTMLDivElement, ProductTabsProps>(function ProductTabs(
  { product, value, onValueChange },
  ref,
) {
  const year = typeof product.metadata?.year === "number" ? String(product.metadata.year) : null;
  const dimensions = formatDimensions(product);
  const weight = formatWeight(product);
  const designerNames =
    product.designers.map((designer) => `${designer.first_name} ${designer.last_name}`).join(", ") || null;
  const countryOfOrigin = product.manufacturer?.country_name ?? null;
  const brand = product.manufacturer?.name ?? null;

  const materialTags = product.materials.map((material) => material.name).join(", ");
  const isMaterialHtml = Boolean(product.material && stripHtml(product.material) !== "");
  const materials = isMaterialHtml ? product.material : materialTags || null;

  const functionProperties =
    typeof product.metadata?.function_properties === "string" &&
    stripHtml(product.metadata.function_properties) !== ""
      ? product.metadata.function_properties
      : null;

  const characteristicsRows = [
    { label: "Year", value: year },
    { label: "Dimensions", value: dimensions },
    { label: "Weight", value: weight },
    { label: "Materials", value: materials, html: isMaterialHtml },
    { label: "Country of origin", value: countryOfOrigin },
    { label: "Designer", value: designerNames },
    { label: "Brand", value: brand },
    { label: "Movement", value: product.movement?.name ?? null },
  ].filter((row) => row.value);

  const hasCharacteristics = characteristicsRows.length > 0;

  return (
    <div ref={ref}>
      <Accordion value={value} onValueChange={onValueChange}>
        {product.description && (
          <AccordionItem value="description">
            <AccordionTrigger>Description</AccordionTrigger>
            <AccordionContent>
              <p className="text-muted-foreground text-sm whitespace-pre-line">{product.description}</p>
            </AccordionContent>
          </AccordionItem>
        )}

        {hasCharacteristics && (
          <AccordionItem value="characteristics">
            <AccordionTrigger>Characteristics</AccordionTrigger>
            <AccordionContent>
              <dl className="flex flex-col gap-2 text-sm">
                {characteristicsRows.map(({ label, value, html }) => (
                  <div key={label} className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">{label}</dt>
                    {html ? (
                      <dd
                        className="text-right [&_p]:inline"
                        dangerouslySetInnerHTML={{ __html: value as string }}
                      />
                    ) : (
                      <dd className="text-right">{value}</dd>
                    )}
                  </div>
                ))}
              </dl>
            </AccordionContent>
          </AccordionItem>
        )}

        {functionProperties && (
          <AccordionItem value="function-properties">
            <AccordionTrigger>Function & Properties</AccordionTrigger>
            <AccordionContent>
              <div
                className="text-sm [&_li]:mb-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-3 [&_p:last-child]:mb-0 [&_strong]:text-muted-foreground [&_strong]:font-normal [&_ul]:list-disc [&_ul]:pl-5"
                dangerouslySetInnerHTML={{ __html: functionProperties }}
              />
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </div>
  );
});
