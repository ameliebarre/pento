/**
 * Creates the "French Design" movement (missing from the catalogue) and
 * seeds eleven Ligne Roset pieces — Togo, Pumpkin, Plumy, Alster Bridge,
 * CM 145 Bridge, Indiscret, Ruché, Stump, Mobidec, Valmy Armchair and Valmy
 * Bridge — each with their real production variants and prices. Links
 * every product to its designer(s), the ligne-roset manufacturer, the new
 * movement and the catalogue materials that apply. Also links every
 * designer involved (the seven just seeded, plus the existing
 * pierre-paulin) to the French Design movement. Images are intentionally
 * left empty — they are added separately.
 *
 * Indiscret has no fitting product category in this catalogue (there is no
 * desks category yet), so it is left uncategorised rather than mis-filed
 * under tables.
 *
 *   npx medusa exec ./src/scripts/seed-ligne-roset-products.ts
 */
import { createProductsWorkflow, createProductTypesWorkflow, createProductTagsWorkflow } from "@medusajs/medusa/core-flows"
import { ContainerRegistrationKeys, MedusaError, ProductStatus } from "@medusajs/framework/utils"
import type { ExecArgs } from "@medusajs/framework/types"
import { DESIGNER_MODULE } from "../modules/designer"
import { MOVEMENT_MODULE } from "../modules/movement"
import { MANUFACTURER_MODULE } from "../modules/manufacturer"
import { MATERIAL_MODULE } from "../modules/material"
import type DesignerModuleService from "../modules/designer/service"
import type MovementModuleService from "../modules/movement/service"
import type ManufacturerModuleService from "../modules/manufacturer/service"
import type MaterialModuleService from "../modules/material/service"
import { linkProductCatalogWorkflow } from "../workflows/link-product-catalog"

const MOVEMENT_SLUG = "french-design"

const MOVEMENT_INPUT = {
  slug: MOVEMENT_SLUG,
  name: "French Design",
  description:
    "A design identity rooted in postwar France's furniture houses rather than in a single visual style: from Michel Ducaroy's frameless, all-foam seating of the early 1970s to the studio-led, material-driven collections that houses like Ligne Roset continue to commission today. What unites the work is less a fixed aesthetic than a shared culture of comfort, craft and domestic experimentation, carried forward across successive generations of designers.",
  start_date: new Date("1970-01-01"),
  end_date: null,
}

const CATEGORY_SLUGS = { sofas: "sofas", armchairs: "armchairs", chairs: "chairs", tables: "tables", seating: "seating" }

// Catalogue materials this script depends on: created if missing, reused as-is otherwise.
const NEW_MATERIAL_NAMES_BY_SLUG: Record<string, string> = {
  "polyurethane-foam": "Polyurethane Foam",
  "solid-beech": "Solid Beech",
  "walnut-veneer": "Walnut Veneer",
}
// Already exist in French from earlier seeding — reused as-is, not recreated.
const EXISTING_MATERIAL_SLUGS = ["velours", "cuir-pleine-fleur", "verre", "metal-laque", "marbre-de-carrare"]
const MATERIAL_SLUGS_TO_ENSURE = [...Object.keys(NEW_MATERIAL_NAMES_BY_SLUG), ...EXISTING_MATERIAL_SLUGS, "abs-plastic"]

const PRODUCT_TYPE_VALUES = ["Sofa", "Armchair", "Desk", "Table", "Pouf"] // "Chair" already exists
const NEW_PRODUCT_TAG_VALUES = ["French Design", "Marble"] // "iconic" and "Modular" already exist

const TOGO_VARIANTS = [
  { title: "2-Seater", sku: "LGR-TGO-001", finish: "2-Seater", price: 3690, height: 70, width: 131, length: 102 },
  { title: "3-Seater", sku: "LGR-TGO-002", finish: "3-Seater", price: 4890, height: 70, width: 174, length: 102 },
  { title: "Pouf", sku: "LGR-TGO-003", finish: "Pouf", price: 990, height: 38, width: 87, length: 80 },
]

const PUMPKIN_VARIANTS = [
  { title: "Orange Wool", sku: "LGR-PMP-001", finish: "Orange Wool" },
  { title: "Mustard Velvet", sku: "LGR-PMP-002", finish: "Mustard Velvet" },
  { title: "Chalk Cream Wool", sku: "LGR-PMP-003", finish: "Chalk Cream Wool" },
].map((v) => ({ ...v, price: 2190, height: 83, width: 70, length: 105 }))

const PLUMY_VARIANTS = [
  { title: "Natural Linen", sku: "LGR-PLM-001", finish: "Natural Linen", price: 2390 },
  { title: "Smoke Grey", sku: "LGR-PLM-002", finish: "Smoke Grey", price: 2590 },
  { title: "Terracotta", sku: "LGR-PLM-003", finish: "Terracotta", price: 2690 },
].map((v) => ({ ...v, height: 78, width: 102, length: 98 }))

const ALSTER_BRIDGE_VARIANTS = [
  { title: "Chrome Base — Fabric", sku: "LGR-ALS-001", finish: "Chrome Base — Fabric", price: 1750 },
  { title: "Aluminium Base — Velvet", sku: "LGR-ALS-002", finish: "Aluminium Base — Velvet", price: 1950 },
  { title: "Castor Base — Leather", sku: "LGR-ALS-003", finish: "Castor Base — Leather", price: 2290 },
].map((v) => ({ ...v, height: 82, width: 61, length: 59 }))

const CM145_BRIDGE_VARIANTS = [
  { title: "Natural Beech", sku: "LGR-CM1-001", finish: "Natural Beech", price: 1090 },
  { title: "Black-Stained Beech", sku: "LGR-CM1-002", finish: "Black-Stained Beech", price: 1190 },
  { title: "Walnut-Stained Beech", sku: "LGR-CM1-003", finish: "Walnut-Stained Beech", price: 1290 },
].map((v) => ({ ...v, height: 73, width: 64, length: 59, weight: 8 }))

const INDISCRET_VARIANTS = [
  { title: "Dark Bronze / Walnut", sku: "LGR-IND-001", finish: "Dark Bronze / Walnut", price: 3890, height: 74, width: 109, length: 53, weight: 47 },
]

const RUCHE_VARIANTS = [
  { title: "Natural Beech", sku: "LGR-RUC-001", finish: "Natural Beech", price: 2490 },
  { title: "Dark Grey Stain", sku: "LGR-RUC-002", finish: "Dark Grey Stain", price: 2570 },
  { title: "Red Lacquer", sku: "LGR-RUC-003", finish: "Red Lacquer", price: 2690 },
].map((v) => ({ ...v, height: 83, width: 97, length: 92 }))

const STUMP_VARIANTS = [
  { title: "Grey Carrara Marble", sku: "LGR-STP-001", finish: "Grey Carrara Marble", price: 2990 },
  { title: "Black Marble", sku: "LGR-STP-002", finish: "Black Marble", price: 3240 },
  { title: "Travertine", sku: "LGR-STP-003", finish: "Travertine", price: 3650 },
].map((v) => ({ ...v, height: 45, width: 30, length: 36, weight: 68 }))

const MOBIDEC_VARIANTS = [
  { title: "Acate Fabric", sku: "LGR-MOB-001", finish: "Acate Fabric", price: 790 },
  { title: "Chartres Velvet", sku: "LGR-MOB-002", finish: "Chartres Velvet", price: 890 },
  { title: "Lina Leather", sku: "LGR-MOB-003", finish: "Lina Leather", price: 990 },
].map((v) => ({ ...v, height: 45, width: 37, length: 38, weight: 12 }))

const VALMY_ARMCHAIR_VARIANTS = [
  { title: "Black Steel Base — Grey Wool", sku: "LGR-VAL-001", finish: "Black Steel Base — Grey Wool", price: 2190 },
  { title: "Anthracite Beech Base — Blue Wool", sku: "LGR-VAL-002", finish: "Anthracite Beech Base — Blue Wool", price: 2290 },
  { title: "Natural Beech Base — Beige Wool", sku: "LGR-VAL-003", finish: "Natural Beech Base — Beige Wool", price: 2390 },
].map((v) => ({ ...v, height: 81, width: 61, length: 60 }))

const VALMY_BRIDGE_VARIANTS = [
  { title: "Black Steel Base — Grey Wool", sku: "LGR-VLB-001", finish: "Black Steel Base — Grey Wool", price: 1890 },
  { title: "Anthracite Beech Base — Blue Wool", sku: "LGR-VLB-002", finish: "Anthracite Beech Base — Blue Wool", price: 1990 },
  { title: "Natural Beech Base — Beige Wool", sku: "LGR-VLB-003", finish: "Natural Beech Base — Beige Wool", price: 2090 },
].map((v) => ({ ...v, height: 81, width: 61, length: 58 }))

const PRODUCTS = [
  {
    title: "Togo",
    handle: "togo",
    description:
      "Designed by Michel Ducaroy for Ligne Roset and unveiled at the 1973 Salon des Arts Ménagers in Paris, Togo did away with the frame, springs and webbing of conventional upholstery altogether: sofa, armchair and pouf alike are built entirely from stacked, quilted foam of three densities, with no internal structure at all. The low, slouching silhouette this produced — closer to a pile of cushions than a piece of furniture — read as a deliberate rejection of formality when it launched, and has stayed in continuous production ever since.\n\nOffered as individual seats or in modular compositions, and upholstered in a wide range of removable fabric or leather covers, Togo has sold in the millions across dozens of countries, making it one of the best-selling sofa designs of the twentieth century and a defining image of relaxed French interiors.",
    categorySlug: CATEGORY_SLUGS.sofas,
    typeValue: "Sofa",
    tagValues: ["iconic", "French Design"],
    materialSlugs: ["polyurethane-foam", "velours"],
    productMaterial: "Polyurethane Foam & Quilted Fabric",
    originCountry: "FR",
    optionTitle: "Size",
    variants: TOGO_VARIANTS,
    designerSlugs: ["michel-ducaroy"],
  },
  {
    title: "Pumpkin",
    handle: "pumpkin",
    description:
      "Designed by Pierre Paulin in 1971 and first shown in the private apartments of President Georges Pompidou at the Élysée Palace, Pumpkin pairs a thermoformed shell with a deep, rounded bucket seat moulded in high-density polyurethane foam, entirely wrapped in quilted, buttoned upholstery. The result is a chair with almost no visible structure — a soft, continuous volume that reads as sculpture as much as seating.\n\nProduced by Ligne Roset in a range of saturated, era-appropriate colours, Pumpkin distils Paulin's broader project of the late 1960s and early 1970s: using new foam technology to free seating from the rigid frames of traditional upholstery, and to give the body a more informal, enveloping way of sitting.",
    categorySlug: CATEGORY_SLUGS.armchairs,
    typeValue: "Armchair",
    tagValues: ["iconic", "French Design"],
    materialSlugs: ["polyurethane-foam", "abs-plastic"],
    productMaterial: "Moulded Polyurethane Foam & ABS Shell",
    originCountry: "FR",
    optionTitle: "Finish",
    variants: PUMPKIN_VARIANTS,
    designerSlugs: ["pierre-paulin"],
  },
  {
    title: "Plumy",
    handle: "plumy",
    description:
      "Designed by Annie Hiéronimus in 1980 while she was part of Ligne Roset's in-house studio, Plumy is a deep, low lounge chair built around a goose-feather and high-resilience foam cushion that invites sinking in rather than sitting up. Its soft, rounded silhouette and generous proportions made it an immediate counterpoint to the more formal armchairs of its era.\n\nReissued by Ligne Roset in 2016 in a refresh the brand describes as channelling the relaxed spirit of the 1980s, Plumy remains available with a removable fabric cover in a range of colours, keeping the original's emphasis on comfort over formality.",
    categorySlug: CATEGORY_SLUGS.armchairs,
    typeValue: "Armchair",
    tagValues: ["French Design"],
    materialSlugs: ["polyurethane-foam", "velours"],
    productMaterial: "Polyurethane Foam, Feather & Fabric",
    originCountry: "FR",
    optionTitle: "Finish",
    variants: PLUMY_VARIANTS,
    designerSlugs: ["annie-hieronimus"],
  },
  {
    title: "Alster Bridge",
    handle: "alster-bridge",
    description:
      "Designed by Emmanuel Dietrich for Ligne Roset in 2006, Alster is a 360°-swivel 'bridge' chair — the historic term for occasional seating built for card tables, here reinterpreted as a compact dining or desk chair. A Bultex foam seat and back sit over a metal frame, available on a chrome, aluminium or castor base with a return-to-centre swivel action.\n\nUpholstered in fabric, velvet, Alcantara or leather depending on the finish, Alster pairs a technical swivel mechanism with the quilted, twin-needle-stitched upholstery that runs through much of Ligne Roset's dining and occasional seating.",
    categorySlug: CATEGORY_SLUGS.chairs,
    typeValue: "Chair",
    tagValues: ["French Design"],
    materialSlugs: ["metal-laque", "velours", "cuir-pleine-fleur"],
    productMaterial: "Metal Frame, Foam & Upholstery",
    originCountry: "FR",
    optionTitle: "Finish",
    variants: ALSTER_BRIDGE_VARIANTS,
    designerSlugs: ["emmanuel-dietrich"],
  },
  {
    title: "CM 145 Bridge",
    handle: "cm-145-bridge",
    description:
      "Pierre Paulin designed the CM 145 in 1954, early in his career, and Ligne Roset's current edition reissues it as a 'bridge' dining and occasional chair: a moulded multi-ply beech shell, shaped for the back and seat, set on a slender tubular steel base finished in matt black epoxy. Where Paulin's later, more sculptural foam designs would dispense with visible structure altogether, CM 145 shows his early command of bent and moulded wood.\n\nLight enough to move easily around a table and sturdy enough for daily use, it remains one of the simplest, most legible pieces in Ligne Roset's catalogue of Paulin reissues, offered in a small range of wood finishes.",
    categorySlug: CATEGORY_SLUGS.chairs,
    typeValue: "Chair",
    tagValues: ["French Design"],
    materialSlugs: ["solid-beech", "metal-laque"],
    productMaterial: "Moulded Beech & Lacquered Steel",
    originCountry: "FR",
    optionTitle: "Finish",
    variants: CM145_BRIDGE_VARIANTS,
    designerSlugs: ["pierre-paulin"],
  },
  {
    title: "Indiscret",
    handle: "indiscret",
    description:
      "Designed by Constance Frapolli for Ligne Roset in her first collaboration with the brand, Indiscret is a hybrid secretaire and dressing table: a clear, extra-tempered glass top sits over compartmentalised drawers sized for a tablet, notebook and pens on one side, and brushes, combs and hair accessories on the other — visible at a glance rather than hidden away.\n\nThe drawers are finished in American walnut veneer with a natural varnish, set into a dark-bronze lacquered steel base with moulded aluminium handles, pairing Frapolli's narrative approach to storage with a restrained, satin-finished material palette.",
    categorySlug: null,
    typeValue: "Desk",
    tagValues: ["French Design"],
    materialSlugs: ["metal-laque", "verre", "walnut-veneer"],
    productMaterial: "Lacquered Steel, Glass & Walnut Veneer",
    originCountry: "FR",
    optionTitle: "Finish",
    variants: INDISCRET_VARIANTS,
    designerSlugs: ["constance-frapolli"],
  },
  {
    title: "Ruché",
    handle: "ruche",
    description:
      "Designed by Inga Sempé for Ligne Roset, Ruché pairs a solid beech frame with a sprung steel-grille backrest and elastic-belt armrests, over a seat built on traditional Pullmaflex suspension — a construction more often associated with classic French upholstery than with contemporary design. Sempé's contribution is in the restraint: a softly geometric silhouette that lets the frame and the quilted upholstery read as a single, continuous form.\n\nAvailable with left- or right-hand armrests and in a matching sofa and footstool, Ruché is offered with a choice of lacquered or stained beech bases and a wide range of fabric upholstery, extending the same understated language across an entire seating range.",
    categorySlug: CATEGORY_SLUGS.armchairs,
    typeValue: "Armchair",
    tagValues: ["French Design"],
    materialSlugs: ["solid-beech", "velours"],
    productMaterial: "Solid Beech & Upholstered Foam",
    originCountry: "FR",
    optionTitle: "Finish",
    variants: RUCHE_VARIANTS,
    designerSlugs: ["inga-sempe"],
  },
  {
    title: "Stump",
    handle: "stump",
    description:
      "Designed by Pierre Charpin for Ligne Roset, Stump is a small side table hewn from a single block of solid marble, left thick and squat enough to read as a fragment of stone rather than a conventionally proportioned table leg and top. Each piece is cut, polished and given a water-repellent treatment in Italy, with the natural veining of the stone visible across its faces.\n\nOffered in grey Carrara marble, black marble or travertine, Stump sits at the sculptural end of Charpin's practice, treating a side table as an object to be looked at from every angle rather than simply placed beside a sofa.",
    categorySlug: CATEGORY_SLUGS.tables,
    typeValue: "Table",
    tagValues: ["French Design", "Marble"],
    materialSlugs: ["marbre-de-carrare"],
    productMaterial: "Solid Marble",
    originCountry: "IT",
    optionTitle: "Finish",
    variants: STUMP_VARIANTS,
    designerSlugs: ["pierre-charpin"],
  },
  {
    title: "Mobidec",
    handle: "mobidec",
    description:
      "Designed by Pierre Charpin for Ligne Roset and first shown at 'MobiBoom', the Musée des Arts Décoratifs' 2010 exhibition on the explosion of French furniture design between 1945 and 1975, Mobidec is a compact rectangular pouf built on a satin-black lacquered steel-wire base. Its seat is built from criss-crossed polyether foam panels wrapped in a high-resilience Bultex cushion, with a removable cover finished with its own integrated carry strap.\n\nLight enough to move from room to room and offered in a wide range of fabric, velvet and leather covers drawn from Ligne Roset's own textile collections, Mobidec treats an occasional footstool as something genuinely portable rather than a fixed piece of furniture.",
    categorySlug: CATEGORY_SLUGS.seating,
    typeValue: "Pouf",
    tagValues: ["Modular", "French Design"],
    materialSlugs: ["metal-laque", "velours", "cuir-pleine-fleur"],
    productMaterial: "Lacquered Steel & Upholstered Foam",
    originCountry: "FR",
    optionTitle: "Finish",
    variants: MOBIDEC_VARIANTS,
    designerSlugs: ["pierre-charpin"],
  },
  {
    title: "Valmy Armchair",
    handle: "valmy-armchair",
    description:
      "Designed by Ramy Fischler for Ligne Roset, the Valmy armchair wraps a steel-wire structure in injected polyurethane foam, finished with an exterior polyester-quilted cladding that gives the chair its soft, padded profile. It is offered on either a black lacquered steel base or a bent solid-beech base in a natural or anthracite-stained finish, upholstered in Kvadrat's Steelcut Trio wool among other options.\n\nPart of a wider Valmy seating line that includes the more upright Valmy Bridge chair, the armchair is built for lounge use — a generously padded, low-slung companion to the dining-height bridge version.",
    categorySlug: CATEGORY_SLUGS.armchairs,
    typeValue: "Armchair",
    tagValues: ["French Design"],
    materialSlugs: ["metal-laque", "solid-beech"],
    productMaterial: "Steel/Beech, Foam & Wool Upholstery",
    originCountry: "FR",
    optionTitle: "Finish",
    variants: VALMY_ARMCHAIR_VARIANTS,
    designerSlugs: ["ramy-fischler"],
  },
  {
    title: "Valmy Bridge",
    handle: "valmy-bridge",
    description:
      "The dining and occasional counterpart to Ramy Fischler's Valmy armchair, Valmy Bridge was conceived with a hotel bedroom setting in mind — a smaller, more upright chair built on the same steel-wire structure, injected polyurethane foam and polyester-quilted cladding as its lounge sibling. It shares the same base choices, in black lacquered steel or bent solid beech, and the same Kvadrat wool upholstery options.\n\nWhere the Valmy armchair is built for sinking into, Valmy Bridge keeps the line's soft, quilted language at a height suited to a table or a desk.",
    categorySlug: CATEGORY_SLUGS.chairs,
    typeValue: "Chair",
    tagValues: ["French Design"],
    materialSlugs: ["metal-laque", "solid-beech"],
    productMaterial: "Steel/Beech, Foam & Wool Upholstery",
    originCountry: "FR",
    optionTitle: "Finish",
    variants: VALMY_BRIDGE_VARIANTS,
    designerSlugs: ["ramy-fischler"],
  },
]

export default async function seedLigneRosetProducts({ container }: ExecArgs) {
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const link = container.resolve(ContainerRegistrationKeys.LINK)
  const designerModuleService: DesignerModuleService = container.resolve(DESIGNER_MODULE)
  const movementModuleService: MovementModuleService = container.resolve(MOVEMENT_MODULE)
  const manufacturerModuleService: ManufacturerModuleService = container.resolve(MANUFACTURER_MODULE)
  const materialModuleService: MaterialModuleService = container.resolve(MATERIAL_MODULE)

  const designerSlugs = [...new Set(PRODUCTS.flatMap((product) => product.designerSlugs))]
  const designers = await designerModuleService.listDesigners({ slug: designerSlugs })
  const designerBySlug = new Map(designers.map((designer) => [designer.slug, designer]))
  for (const slug of designerSlugs) {
    if (!designerBySlug.has(slug)) {
      throw new MedusaError(MedusaError.Types.NOT_FOUND, `Expected the ${slug} designer to exist`)
    }
  }

  const [ligneRoset] = await manufacturerModuleService.listManufacturers({ slug: "ligne-roset" })
  if (!ligneRoset) {
    throw new MedusaError(MedusaError.Types.NOT_FOUND, "Expected the ligne-roset manufacturer to exist")
  }

  let [movement] = await movementModuleService.listMovements({ slug: MOVEMENT_SLUG })
  if (!movement) {
    movement = await movementModuleService.createMovements(MOVEMENT_INPUT)
    console.log(`Created movement ${MOVEMENT_SLUG}`)
  }

  // Link every designer involved — the seven just seeded, plus the
  // already-existing pierre-paulin — to the French Design movement.
  for (const slug of designerSlugs) {
    const designer = designerBySlug.get(slug)
    if (!designer) continue
    const { data: links } = await query.graph({
      entity: "designer",
      fields: ["id", "movements.id"],
      filters: { id: designer.id },
    })
    const alreadyLinked = links[0]?.movements?.some((m) => m?.id === movement!.id)
    if (alreadyLinked) continue
    await link.create({
      [MOVEMENT_MODULE]: { movement_id: movement.id },
      [DESIGNER_MODULE]: { designer_id: designer.id },
    })
    console.log(`Linked ${slug} to ${MOVEMENT_SLUG}`)
  }

  const materialBySlug = new Map<string, { id: string }>()
  for (const slug of MATERIAL_SLUGS_TO_ENSURE) {
    let [material] = await materialModuleService.listMaterials({ slug })
    if (!material) {
      const name = NEW_MATERIAL_NAMES_BY_SLUG[slug]
      if (!name) {
        throw new MedusaError(MedusaError.Types.NOT_FOUND, `Expected the ${slug} material to already exist`)
      }
      material = await materialModuleService.createMaterials({ slug, name })
      console.log(`Created material ${slug}`)
    }
    materialBySlug.set(slug, material)
  }

  const { data: existingTypes } = await query.graph({ entity: "product_type", fields: ["id", "value"] })
  const existingTypeValues = new Set(existingTypes.map((type) => type.value))
  const typesToCreate = PRODUCT_TYPE_VALUES.filter((value) => !existingTypeValues.has(value))
  if (typesToCreate.length > 0) {
    await createProductTypesWorkflow(container).run({
      input: { product_types: typesToCreate.map((value) => ({ value })) },
    })
    console.log(`Created product type(s): ${typesToCreate.join(", ")}`)
  }
  const { data: allTypes } = await query.graph({ entity: "product_type", fields: ["id", "value"] })
  const typeIdByValue = new Map(allTypes.map((type) => [type.value, type.id]))

  const { data: existingTags } = await query.graph({ entity: "product_tag", fields: ["id", "value"] })
  const existingTagValues = new Set(existingTags.map((tag) => tag.value))
  const tagsToCreate = NEW_PRODUCT_TAG_VALUES.filter((value) => !existingTagValues.has(value))
  if (tagsToCreate.length > 0) {
    await createProductTagsWorkflow(container).run({
      input: { product_tags: tagsToCreate.map((value) => ({ value })) },
    })
    console.log(`Created product tag(s): ${tagsToCreate.join(", ")}`)
  }
  const { data: allTags } = await query.graph({ entity: "product_tag", fields: ["id", "value"] })
  const tagIdByValue = new Map(allTags.map((tag) => [tag.value, tag.id]))

  const { data: shippingProfiles } = await query.graph({ entity: "shipping_profile", fields: ["id"] })
  const { data: salesChannels } = await query.graph({ entity: "sales_channel", fields: ["id"] })
  const shippingProfile = shippingProfiles[0]
  const salesChannel = salesChannels[0]
  if (!shippingProfile || !salesChannel) {
    throw new MedusaError(MedusaError.Types.NOT_FOUND, "No shipping profile or sales channel found")
  }

  const { data: categories } = await query.graph({ entity: "product_category", fields: ["id", "handle"] })
  const categoryIdBySlug = new Map(categories.map((category) => [category.handle, category.id]))

  const { data: existingProducts } = await query.graph({ entity: "product", fields: ["id", "handle"] })
  const existingHandles = new Set(existingProducts.map((product) => product.handle))

  const productsToCreate = PRODUCTS.filter((product) => !existingHandles.has(product.handle))

  if (productsToCreate.length > 0) {
    await createProductsWorkflow(container).run({
      input: {
        products: productsToCreate.map((product) => ({
          title: product.title,
          handle: product.handle,
          description: product.description,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          category_ids: product.categorySlug
            ? [categoryIdBySlug.get(product.categorySlug)].filter((id): id is string => Boolean(id))
            : [],
          type_id: typeIdByValue.get(product.typeValue) ?? null,
          tags: product.tagValues
            .map((value) => tagIdByValue.get(value))
            .filter((id): id is string => Boolean(id))
            .map((id) => ({ id })),
          sales_channels: [{ id: salesChannel.id }],
          material: product.productMaterial,
          origin_country: product.originCountry,
          options: [{ title: product.optionTitle, values: product.variants.map((variant) => variant.finish) }],
          variants: product.variants.map((variant) => ({
            title: variant.title,
            sku: variant.sku,
            options: { [product.optionTitle]: variant.finish },
            prices: [{ amount: variant.price, currency_code: "eur" }],
            height: "height" in variant ? variant.height : null,
            width: "width" in variant ? variant.width : null,
            length: "length" in variant ? variant.length : null,
            weight: "weight" in variant ? variant.weight : null,
          })),
        })) as never,
      },
    })
    console.log(`Created ${productsToCreate.length} product(s): ${productsToCreate.map((p) => p.handle).join(", ")}`)
  }

  const { data: freshProducts } = await query.graph({
    entity: "product",
    fields: ["id", "handle", "designers.id"],
    filters: { handle: PRODUCTS.map((product) => product.handle) },
  })
  const freshProductByHandle = new Map(freshProducts.map((product) => [product.handle, product]))

  for (const target of PRODUCTS) {
    const product = freshProductByHandle.get(target.handle)
    if (!product) {
      console.warn(`Skipping catalog links for ${target.handle}: product not found`)
      continue
    }

    const targetDesignerIds = target.designerSlugs
      .map((slug) => designerBySlug.get(slug)?.id)
      .filter((id): id is string => Boolean(id))

    if (targetDesignerIds.every((id) => product.designers?.some((d) => d?.id === id))) {
      console.log(`Skipping ${target.handle}: already linked to its designer(s)`)
      continue
    }

    const materialIds = target.materialSlugs
      .map((slug) => materialBySlug.get(slug)?.id)
      .filter((id): id is string => Boolean(id))

    await linkProductCatalogWorkflow(container).run({
      input: {
        product_id: product.id,
        designer_ids: targetDesignerIds,
        movement_id: movement.id,
        material_ids: materialIds,
        manufacturer_id: ligneRoset.id,
      },
    })
    console.log(`Linked catalog data for ${target.handle}`)
  }
}
