import { medusa } from "@/lib/medusa";

import type { MedusaDesigner } from "@/features/products/medusa-types";

export async function getAllDesigners(): Promise<MedusaDesigner[]> {
  const { designers } = await medusa.client.fetch<{ designers: MedusaDesigner[] }>(
    "/store/designers",
  );

  return designers;
}
