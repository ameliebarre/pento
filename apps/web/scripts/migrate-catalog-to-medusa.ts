import "dotenv/config";

import { prisma } from "../src/lib/prisma";

const BASE_URL = process.env.MEDUSA_BACKEND_URL || "http://localhost:9000";
let authToken = "";

async function medusaFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...init.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`${init.method ?? "GET"} ${path} failed (${response.status}): ${await response.text()}`);
  }

  return response.json() as Promise<T>;
}

async function login() {
  const email = process.env.MEDUSA_ADMIN_EMAIL;
  const password = process.env.MEDUSA_ADMIN_PASSWORD;
  if (!email || !password) {
    throw new Error("Set MEDUSA_ADMIN_EMAIL and MEDUSA_ADMIN_PASSWORD before running this migration.");
  }

  const { token } = await medusaFetch<{ token: string }>("/auth/user/emailpass", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  authToken = token;
}

async function getDefaultIds() {
  const [{ sales_channels }, { stock_locations }, { shipping_profiles }] = await Promise.all([
    medusaFetch<{ sales_channels: { id: string }[] }>("/admin/sales-channels?limit=1"),
    medusaFetch<{ stock_locations: { id: string }[] }>("/admin/stock-locations?limit=1"),
    medusaFetch<{ shipping_profiles: { id: string }[] }>("/admin/shipping-profiles?limit=1"),
  ]);

  if (!sales_channels[0]) throw new Error("No sales channel found in Medusa.");
  if (!stock_locations[0]) throw new Error("No stock location found in Medusa.");
  if (!shipping_profiles[0]) throw new Error("No shipping profile found in Medusa.");

  return {
    salesChannelId: sales_channels[0].id,
    stockLocationId: stock_locations[0].id,
    shippingProfileId: shipping_profiles[0].id,
  };
}

async function migrateCategories() {
  const categories = await prisma.category.findMany();
  const idMap = new Map<string, string>();

  for (const category of categories) {
    const { product_category } = await medusaFetch<{ product_category: { id: string } }>(
      "/admin/product-categories",
      { method: "POST", body: JSON.stringify({ name: category.name, handle: category.slug, is_active: true }) },
    );
    idMap.set(category.id, product_category.id);
    console.log(`  Category: ${category.name} -> ${product_category.id}`);
  }

  return idMap;
}

async function migrateTags() {
  const tags = await prisma.tag.findMany();
  const idMap = new Map<string, string>();

  for (const tag of tags) {
    const { product_tag } = await medusaFetch<{ product_tag: { id: string } }>("/admin/product-tags", {
      method: "POST",
      body: JSON.stringify({ value: tag.name }),
    });
    idMap.set(tag.id, product_tag.id);
    console.log(`  Tag: ${tag.name} -> ${product_tag.id}`);
  }

  return idMap;
}

async function migrateDesigners() {
  const designers = await prisma.designer.findMany({ include: { image: true } });
  const idMap = new Map<string, string>();

  for (const designer of designers) {
    const { designer: created } = await medusaFetch<{ designer: { id: string } }>("/admin/designers", {
      method: "POST",
      body: JSON.stringify({
        slug: designer.slug,
        first_name: designer.firstName,
        last_name: designer.lastName,
        birth_date: designer.birthDate,
        death_date: designer.deathDate,
        nationality: designer.nationality,
        biography: designer.biography,
        quote: designer.quote,
        image_url: designer.image?.url ?? null,
      }),
    });
    idMap.set(designer.id, created.id);
    console.log(`  Designer: ${designer.firstName} ${designer.lastName} -> ${created.id}`);
  }

  return idMap;
}

async function migrateMovements() {
  const movements = await prisma.movement.findMany({ include: { coverImage: true } });
  const idMap = new Map<string, string>();

  for (const movement of movements) {
    const { movement: created } = await medusaFetch<{ movement: { id: string } }>("/admin/movements", {
      method: "POST",
      body: JSON.stringify({
        slug: movement.slug,
        name: movement.name,
        description: movement.description,
        start_date: movement.startDate,
        end_date: movement.endDate,
        cover_image_url: movement.coverImage?.url ?? null,
      }),
    });
    idMap.set(movement.id, created.id);
    console.log(`  Movement: ${movement.name} -> ${created.id}`);
  }

  return idMap;
}

async function migrateMaterials() {
  const materials = await prisma.material.findMany({ include: { image: true } });
  const idMap = new Map<string, string>();

  for (const material of materials) {
    const { material: created } = await medusaFetch<{ material: { id: string } }>("/admin/materials", {
      method: "POST",
      body: JSON.stringify({
        slug: material.slug,
        name: material.name,
        description: material.description,
        image_url: material.image?.url ?? null,
      }),
    });
    idMap.set(material.id, created.id);
    console.log(`  Material: ${material.name} -> ${created.id}`);
  }

  return idMap;
}

async function migrateManufacturers() {
  const manufacturers = await prisma.manufacturer.findMany({ include: { logo: true, country: true } });
  const idMap = new Map<string, string>();

  for (const manufacturer of manufacturers) {
    const { manufacturer: created } = await medusaFetch<{ manufacturer: { id: string } }>("/admin/manufacturers", {
      method: "POST",
      body: JSON.stringify({
        slug: manufacturer.slug,
        name: manufacturer.name,
        history: manufacturer.history,
        website: manufacturer.website,
        logo_url: manufacturer.logo?.url ?? null,
        country_name: manufacturer.country?.name ?? null,
      }),
    });
    idMap.set(manufacturer.id, created.id);
    console.log(`  Manufacturer: ${manufacturer.name} -> ${created.id}`);
  }

  return idMap;
}

async function migrateProducts(
  categoryIds: Map<string, string>,
  tagIds: Map<string, string>,
  designerIds: Map<string, string>,
  movementIds: Map<string, string>,
  materialIds: Map<string, string>,
  manufacturerIds: Map<string, string>,
  defaults: { salesChannelId: string; stockLocationId: string; shippingProfileId: string },
) {
  const products = await prisma.product.findMany({
    include: {
      images: true,
      designers: { include: { designer: true } },
      materials: { include: { material: true } },
      tags: { include: { tag: true } },
    },
  });

  for (const product of products) {
    const { product: created } = await medusaFetch<{ product: { id: string } }>("/admin/products", {
      method: "POST",
      body: JSON.stringify({
        title: product.name,
        handle: product.slug,
        description: product.description,
        status: "published",
        categories: product.categoryId ? [{ id: categoryIds.get(product.categoryId) }] : undefined,
        tags: product.tags.map((t) => ({ id: tagIds.get(t.tag.id) })),
        images: product.images.map((image) => ({ url: image.url })),
        sales_channels: [{ id: defaults.salesChannelId }],
        shipping_profile_id: defaults.shippingProfileId,
        options: [{ title: "Default", values: ["Default"] }],
        variants: [
          {
            title: "Default",
            sku: product.sku ?? undefined,
            options: { Default: "Default" },
            prices: [{ currency_code: product.currency.toLowerCase(), amount: Number(product.price) }],
            weight: product.weight ?? undefined,
            length: product.depth ?? undefined,
            height: product.height ?? undefined,
            width: product.width ?? undefined,
          },
        ],
      }),
    });

    console.log(`  Product: ${product.name} -> ${created.id}`);

    if (product.stock > 0 && product.sku) {
      const { inventory_items } = await medusaFetch<{ inventory_items: { id: string }[] }>(
        `/admin/inventory-items?sku=${encodeURIComponent(product.sku)}`,
      );
      const inventoryItem = inventory_items[0];
      if (inventoryItem) {
        await medusaFetch(`/admin/inventory-items/${inventoryItem.id}/location-levels`, {
          method: "POST",
          body: JSON.stringify({ location_id: defaults.stockLocationId, stocked_quantity: product.stock }),
        });
      }
    }

    const designer_ids = product.designers.map((d) => designerIds.get(d.designer.id)).filter((id): id is string => !!id);
    const material_ids = product.materials.map((m) => materialIds.get(m.material.id)).filter((id): id is string => !!id);
    const movement_id = product.movementId ? movementIds.get(product.movementId) : undefined;
    const manufacturer_id = product.manufacturerId ? manufacturerIds.get(product.manufacturerId) : undefined;

    if (designer_ids.length || material_ids.length || movement_id || manufacturer_id) {
      await medusaFetch(`/admin/products/${created.id}/catalog-links`, {
        method: "POST",
        body: JSON.stringify({ designer_ids, movement_id, material_ids, manufacturer_id }),
      });
    }
  }
}

async function main() {
  console.log("Logging in to Medusa...");
  await login();

  console.log("Fetching defaults (sales channel, stock location, shipping profile)...");
  const defaults = await getDefaultIds();

  console.log("Migrating categories...");
  const categoryIds = await migrateCategories();

  console.log("Migrating tags...");
  const tagIds = await migrateTags();

  console.log("Migrating designers...");
  const designerIds = await migrateDesigners();

  console.log("Migrating movements...");
  const movementIds = await migrateMovements();

  console.log("Migrating materials...");
  const materialIds = await migrateMaterials();

  console.log("Migrating manufacturers...");
  const manufacturerIds = await migrateManufacturers();

  console.log("Migrating products...");
  await migrateProducts(categoryIds, tagIds, designerIds, movementIds, materialIds, manufacturerIds, defaults);

  console.log("Done.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
