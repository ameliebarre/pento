import { medusa } from "@/lib/medusa";

import type { MedusaDesigner } from "@/features/products/medusa-types";

export async function getDesignersBySlugs(slugs: string[]): Promise<MedusaDesigner[]> {
  const { designers } = await medusa.client.fetch<{ designers: MedusaDesigner[] }>(
    "/store/designers",
  );

  const bySlug = new Map(designers.map((designer) => [designer.slug, designer]));

  return slugs
    .map((slug) => bySlug.get(slug))
    .filter((designer): designer is MedusaDesigner => Boolean(designer));
}
