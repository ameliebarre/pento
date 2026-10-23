/**
 * Fills similar_designers (4 slugs each) for the 30 additional designers
 * created by seed-additional-designers-batch1/2/3.ts, drawing on both the
 * new batch and the pre-existing 30 designers already in the catalogue.
 *
 *   npx medusa exec ./src/scripts/seed-additional-designers-similar.ts
 */
import type { ExecArgs } from "@medusajs/framework/types"
import { DESIGNER_MODULE } from "../modules/designer"
import type DesignerModuleService from "../modules/designer/service"

const SIMILAR_DESIGNERS: Record<string, string[]> = {
  "charles-rennie-mackintosh": ["hector-guimard", "antoni-gaudi", "josef-hoffmann", "koloman-moser"],
  "hector-guimard": ["charles-rennie-mackintosh", "antoni-gaudi", "josef-hoffmann", "koloman-moser"],
  "antoni-gaudi": ["charles-rennie-mackintosh", "hector-guimard", "josef-hoffmann", "koloman-moser"],
  "josef-hoffmann": ["koloman-moser", "charles-rennie-mackintosh", "walter-gropius", "wilhelm-wagenfeld"],
  "koloman-moser": ["josef-hoffmann", "charles-rennie-mackintosh", "hector-guimard", "antoni-gaudi"],
  "gerrit-rietveld": ["walter-gropius", "ludwig-mies-van-der-rohe", "marcel-breuer", "le-corbusier"],
  "emile-jacques-ruhlmann": ["eileen-gray", "charlotte-perriand", "jean-prouve", "hector-guimard"],
  "walter-gropius": ["marcel-breuer", "ludwig-mies-van-der-rohe", "wilhelm-wagenfeld", "gerrit-rietveld"],
  "wilhelm-wagenfeld": ["walter-gropius", "marcel-breuer", "dieter-rams", "josef-hoffmann"],
  "kaare-klint": ["borge-mogensen", "hans-j-wegner", "poul-kjaerholm", "finn-juhl"],
  "borge-mogensen": ["kaare-klint", "hans-j-wegner", "poul-kjaerholm", "nanna-ditzel"],
  "nanna-ditzel": ["kaare-klint", "borge-mogensen", "hans-j-wegner", "verner-panton"],
  "bruno-mathsson": ["josef-frank", "tapio-wirkkala", "alvar-aalto", "kaare-klint"],
  "josef-frank": ["bruno-mathsson", "alvar-aalto", "kaare-klint", "tapio-wirkkala"],
  "tapio-wirkkala": ["alvar-aalto", "bruno-mathsson", "josef-frank", "isamu-noguchi"],
  "sori-yanagi": ["shiro-kuramata", "charlotte-perriand", "isamu-noguchi", "tapio-wirkkala"],
  "shiro-kuramata": ["sori-yanagi", "ettore-sottsass", "michele-de-lucchi", "gaetano-pesce"],
  "michael-graves": ["robert-venturi", "ettore-sottsass", "michele-de-lucchi", "philippe-starck"],
  "robert-venturi": ["michael-graves", "ettore-sottsass", "michele-de-lucchi", "philippe-starck"],
  "michele-de-lucchi": ["ettore-sottsass", "shiro-kuramata", "michael-graves", "gaetano-pesce"],
  "franco-albini": ["carlo-scarpa", "achille-castiglioni", "gio-ponti", "marco-zanuso"],
  "carlo-scarpa": ["franco-albini", "gio-ponti", "achille-castiglioni", "enzo-mari"],
  "enzo-mari": ["carlo-scarpa", "franco-albini", "ettore-sottsass", "mario-bellini"],
  "mario-bellini": ["richard-sapper", "franco-albini", "achille-castiglioni", "marco-zanuso"],
  "richard-sapper": ["mario-bellini", "marco-zanuso", "achille-castiglioni", "franco-albini"],
  "robin-day": ["terence-conran", "jasper-morrison", "charles-eames", "ray-eames"],
  "terence-conran": ["robin-day", "jasper-morrison", "ron-arad", "marc-newson"],
  "jasper-morrison": ["ron-arad", "marc-newson", "dieter-rams", "terence-conran"],
  "ron-arad": ["jasper-morrison", "marc-newson", "gaetano-pesce", "philippe-starck"],
  "marc-newson": ["ron-arad", "jasper-morrison", "philippe-starck", "gaetano-pesce"],
}

export default async function seedAdditionalDesignersSimilar({ container }: ExecArgs) {
  const designerModuleService: DesignerModuleService = container.resolve(DESIGNER_MODULE)

  let updated = 0
  for (const [slug, similarSlugs] of Object.entries(SIMILAR_DESIGNERS)) {
    const [designer] = await designerModuleService.listDesigners({ slug })
    if (!designer) {
      console.warn(`Skipping ${slug}: designer not found`)
      continue
    }

    await designerModuleService.updateDesigners({
      id: designer.id,
      similar_designers: { slugs: similarSlugs },
    })
    updated += 1
    console.log(`Updated similar_designers for ${slug}`)
  }

  console.log(`Done. Updated ${updated}/${Object.keys(SIMILAR_DESIGNERS).length} designer(s).`)
}
