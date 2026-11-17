import type { MedusaContainer } from '@medusajs/framework/types';
import { ContainerRegistrationKeys } from '@medusajs/framework/utils';

type ProductImage = { id: string; url: string };
type ProductVariant = { id: string; images?: ProductImage[] };
type ProductWithVariants = {
  images?: ProductImage[];
  variants?: ProductVariant[];
};

export async function attachVariantImages(
  scope: MedusaContainer,
  product: ProductWithVariants,
) {
  const variants = product.variants ?? [];
  if (variants.length === 0) return;

  const pgConnection = scope.resolve(ContainerRegistrationKeys.PG_CONNECTION);
  const variantIds = variants.map((variant) => variant.id);

  const { rows } = await pgConnection.raw(
    `select variant_id, image_id from product_variant_product_image where variant_id = any(?) and deleted_at is null`,
    [variantIds],
  );

  const imageById = new Map(
    (product.images ?? []).map((image) => [image.id, image]),
  );
  const imageIdsByVariantId = new Map<string, string[]>();
  for (const row of rows as { variant_id: string; image_id: string }[]) {
    const list = imageIdsByVariantId.get(row.variant_id) ?? [];
    list.push(row.image_id);
    imageIdsByVariantId.set(row.variant_id, list);
  }

  for (const variant of variants) {
    const imageIds = imageIdsByVariantId.get(variant.id) ?? [];
    variant.images = imageIds
      .map((id) => imageById.get(id))
      .filter((image): image is ProductImage => Boolean(image));
  }
}
