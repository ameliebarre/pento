import { medusa } from "@/lib/medusa";

import type { MedusaDesigner } from "@/features/products/medusa-types";

export async function getDesignerBySlug(slug: string): Promise<MedusaDesigner | null> {
  const { designers } = await medusa.client.fetch<{ designers: MedusaDesigner[] }>(
    "/store/designers",
  );

  return designers.find((designer) => designer.slug === slug) ?? null;
}
