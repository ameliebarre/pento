/**
 * Links every designer (except Arne Jacobsen, already linked) to the
 * aesthetic movements they genuinely belong to. Creates three missing
 * movements first: Italian Design, Pop & Space Age, and Industrial Design
 * Pioneers (for Michael Thonet, who predates every other movement in the
 * database by decades).
 *
 *   npx medusa exec ./src/scripts/link-all-designers-movements.ts
 */
import { ContainerRegistrationKeys, MedusaError } from "@medusajs/framework/utils"
import type { ExecArgs } from "@medusajs/framework/types"
import { MOVEMENT_MODULE } from "../modules/movement"
import { DESIGNER_MODULE } from "../modules/designer"
import type MovementModuleService from "../modules/movement/service"
import type DesignerModuleService from "../modules/designer/service"

const NEW_MOVEMENTS = [
  {
    slug: "italian-design",
    name: "Italian Design",
    description:
      "Postwar Italy became one of design's most prolific laboratories, as architects turned to furniture and product design to help rebuild a national industry. Rooted in close collaboration between designers and manufacturers, Italian design paired rigorous engineering with an expressive, often witty sense of form.",
    start_date: new Date("1945-01-01"),
    end_date: new Date("1980-01-01"),
  },
  {
    slug: "pop-design",
    name: "Pop & Space Age",
    description:
      "Emerging alongside 1960s youth culture and the optimism of the space race, Pop and Space Age design embraced new industrial plastics to sculpt furniture into bold, continuous and often brightly coloured forms, breaking decisively from the materials and restraint of the previous design generation.",
    start_date: new Date("1960-01-01"),
    end_date: new Date("1975-01-01"),
  },
  {
    slug: "industrial-pioneers",
    name: "Industrial Design Pioneers",
    description:
      "Decades before modernism gave industrial manufacturing a design philosophy of its own, a handful of nineteenth-century furniture makers were already proving that mechanised production could be combined with genuine elegance, establishing techniques and factory systems that twentieth-century modernists would later build directly upon.",
    start_date: new Date("1830-01-01"),
    end_date: new Date("1900-01-01"),
  },
]

const DESIGNER_MOVEMENTS: Record<string, string[]> = {
  "achille-castiglioni": ["italian-design", "functionalism", "modernism"],
  "pier-giacomo-castiglioni": ["italian-design", "functionalism", "modernism"],
  "vico-magistretti": ["italian-design", "functionalism", "modernism"],
  "marco-zanuso": ["italian-design", "functionalism", "modernism"],
  "joe-colombo": ["italian-design", "pop-design", "modernism"],
  "ettore-sottsass": ["italian-design", "memphis-milano", "postmodernism"],
  "gaetano-pesce": ["italian-design", "postmodernism", "pop-design"],
  "gio-ponti": ["italian-design", "modernism"],
  "le-corbusier": ["modernism", "functionalism"],
  "charlotte-perriand": ["modernism", "functionalism"],
  "jean-prouve": ["modernism", "functionalism"],
  "eileen-gray": ["modernism"],
  "marcel-breuer": ["bauhaus", "modernism", "functionalism"],
  "ludwig-mies-van-der-rohe": ["bauhaus", "modernism", "functionalism"],
  "michael-thonet": ["industrial-pioneers"],
  "dieter-rams": ["functionalism", "modernism"],
  "alvar-aalto": ["functionalism", "organic-design", "modernism"],
  "eero-saarinen": ["mid-century", "organic-design", "modernism"],
  "charles-eames": ["mid-century", "organic-design", "modernism"],
  "ray-eames": ["mid-century", "organic-design", "modernism"],
  "harry-bertoia": ["mid-century", "organic-design", "modernism"],
  "isamu-noguchi": ["mid-century", "organic-design", "modernism"],
  "george-nelson": ["mid-century", "modernism", "functionalism"],
  "florence-knoll": ["mid-century", "modernism", "functionalism"],
  "hans-j-wegner": ["danish-modern", "organic-design", "functionalism"],
  "finn-juhl": ["danish-modern", "organic-design"],
  "poul-kjaerholm": ["danish-modern", "functionalism", "modernism"],
  "verner-panton": ["pop-design", "organic-design"],
  "pierre-paulin": ["pop-design", "organic-design", "modernism"],
  "philippe-starck": ["postmodernism", "pop-design"],
}

export default async function linkAllDesignersMovements({ container }: ExecArgs) {
  const movementModuleService: MovementModuleService = container.resolve(MOVEMENT_MODULE)
  const designerModuleService: DesignerModuleService = container.resolve(DESIGNER_MODULE)
  const link = container.resolve(ContainerRegistrationKeys.LINK)

  for (const input of NEW_MOVEMENTS) {
    const [existing] = await movementModuleService.listMovements({ slug: input.slug })
    if (existing) continue
    await movementModuleService.createMovements(input)
    console.log(`Created movement ${input.slug}`)
  }

  const allMovements = await movementModuleService.listMovements({})
  const movementIdBySlug = new Map(allMovements.map((m) => [m.slug, m.id]))

  for (const [designerSlug, movementSlugs] of Object.entries(DESIGNER_MOVEMENTS)) {
    const [designer] = await designerModuleService.listDesigners({ slug: designerSlug })
    if (!designer) {
      console.warn(`Skipping ${designerSlug}: designer not found`)
      continue
    }

    const movementIds = movementSlugs.map((slug) => {
      const id = movementIdBySlug.get(slug)
      if (!id) {
        throw new MedusaError(MedusaError.Types.NOT_FOUND, `Expected movement ${slug} to exist`)
      }
      return id
    })

    await link.create(
      movementIds.map((movement_id) => ({
        [MOVEMENT_MODULE]: { movement_id },
        [DESIGNER_MODULE]: { designer_id: designer.id },
      })),
    )

    console.log(`Linked ${designerSlug} to: ${movementSlugs.join(", ")}`)
  }

  console.log(`Done. Linked ${Object.keys(DESIGNER_MOVEMENTS).length} designer(s).`)
}
