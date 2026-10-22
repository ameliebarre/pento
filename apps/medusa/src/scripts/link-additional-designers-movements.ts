/**
 * Links each of the 30 additional designers (seed-additional-designers-
 * batch1/2/3.ts) to the aesthetic movements they genuinely belong to, using
 * both the pre-existing movement set and the new movements created by
 * seed-additional-movements.ts.
 *
 *   npx medusa exec ./src/scripts/link-additional-designers-movements.ts
 */
import { ContainerRegistrationKeys, MedusaError } from "@medusajs/framework/utils"
import type { ExecArgs } from "@medusajs/framework/types"
import { MOVEMENT_MODULE } from "../modules/movement"
import { DESIGNER_MODULE } from "../modules/designer"
import type MovementModuleService from "../modules/movement/service"
import type DesignerModuleService from "../modules/designer/service"

const DESIGNER_MOVEMENTS: Record<string, string[]> = {
  "charles-rennie-mackintosh": ["art-nouveau"],
  "hector-guimard": ["art-nouveau"],
  "antoni-gaudi": ["art-nouveau"],
  "josef-hoffmann": ["vienna-secession"],
  "koloman-moser": ["vienna-secession"],
  "gerrit-rietveld": ["de-stijl", "modernism"],
  "emile-jacques-ruhlmann": ["art-deco"],
  "walter-gropius": ["bauhaus", "modernism", "functionalism"],
  "wilhelm-wagenfeld": ["bauhaus", "functionalism"],
  "kaare-klint": ["danish-modern", "functionalism"],
  "borge-mogensen": ["danish-modern", "functionalism"],
  "nanna-ditzel": ["danish-modern", "organic-design"],
  "bruno-mathsson": ["scandinavian-design", "functionalism"],
  "josef-frank": ["scandinavian-design"],
  "tapio-wirkkala": ["scandinavian-design", "organic-design"],
  "sori-yanagi": ["japanese-design", "mid-century"],
  "shiro-kuramata": ["japanese-design", "memphis-milano", "postmodernism"],
  "michael-graves": ["postmodernism"],
  "robert-venturi": ["postmodernism"],
  "michele-de-lucchi": ["memphis-milano", "italian-design", "postmodernism"],
  "franco-albini": ["italian-design", "modernism"],
  "carlo-scarpa": ["italian-design"],
  "enzo-mari": ["italian-design"],
  "mario-bellini": ["italian-design"],
  "richard-sapper": ["italian-design"],
  "robin-day": ["mid-century"],
  "terence-conran": ["mid-century", "contemporary-design"],
  "jasper-morrison": ["contemporary-design"],
  "ron-arad": ["contemporary-design"],
  "marc-newson": ["contemporary-design"],
}

export default async function linkAdditionalDesignersMovements({ container }: ExecArgs) {
  const movementModuleService: MovementModuleService = container.resolve(MOVEMENT_MODULE)
  const designerModuleService: DesignerModuleService = container.resolve(DESIGNER_MODULE)
  const link = container.resolve(ContainerRegistrationKeys.LINK)

  const allMovements = await movementModuleService.listMovements({})
  const movementIdBySlug = new Map(allMovements.map((m) => [m.slug, m.id]))

  let linked = 0
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

    linked += 1
    console.log(`Linked ${designerSlug} to: ${movementSlugs.join(", ")}`)
  }

  console.log(`Done. Linked ${linked}/${Object.keys(DESIGNER_MOVEMENTS).length} designer(s).`)
}
