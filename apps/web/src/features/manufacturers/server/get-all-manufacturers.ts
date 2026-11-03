import { medusa } from "@/lib/medusa";

import type { MedusaManufacturer } from "@/features/products/medusa-types";

export async function getAllManufacturers(): Promise<MedusaManufacturer[]> {
  const { manufacturers } = await medusa.client.fetch<{ manufacturers: MedusaManufacturer[] }>(
    "/store/manufacturers",
  );

  return manufacturers;
}
