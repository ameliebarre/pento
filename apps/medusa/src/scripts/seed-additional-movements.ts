/**
 * Creates the aesthetic movements needed for the 30 additional designers
 * being added to the catalogue (Art Nouveau, Vienna Secession, De Stijl,
 * Art Deco, Scandinavian Design, Japanese Design, Contemporary Design).
 *
 * Also translates four pre-existing movements whose name/description were
 * still in French (Bauhaus, Postmodernisme, Organic Design, Mid-century
 * Modern) so every movement record is consistently in English.
 *
 *   npx medusa exec ./src/scripts/seed-additional-movements.ts
 */
import type { ExecArgs } from "@medusajs/framework/types"
import { MOVEMENT_MODULE } from "../modules/movement"
import type MovementModuleService from "../modules/movement/service"

const NEW_MOVEMENTS = [
  {
    slug: "art-nouveau",
    name: "Art Nouveau",
    description:
      "Flourishing across Europe at the turn of the twentieth century, Art Nouveau rejected historical revivalism in favour of sinuous, plant-inspired lines drawn from nature — whiplash curves, stylised flowers and insects — applied with equal ambition to architecture, furniture, jewellery and graphic design, treating the whole built environment as a single decorative artwork.",
    start_date: new Date("1890-01-01"),
    end_date: new Date("1910-01-01"),
  },
  {
    slug: "vienna-secession",
    name: "Vienna Secession",
    description:
      "Founded in 1897 by artists and architects who broke away from Vienna's conservative academy, the Secession pursued a more geometric, restrained counterpart to Art Nouveau's organic curves. Its associated workshop, the Wiener Werkstätte, extended this rigour into furniture, textiles and everyday objects, aiming to unite every applied art under a single rational aesthetic.",
    start_date: new Date("1897-01-01"),
    end_date: new Date("1932-01-01"),
  },
  {
    slug: "de-stijl",
    name: "De Stijl",
    description:
      "Founded in the Netherlands in 1917, De Stijl reduced design to its essential elements: straight lines, right angles, and a palette limited to primary colours plus black, white and grey. Applied to furniture and architecture alike, it pursued a universal visual language intended to strip away ornament entirely in favour of pure, abstract structure.",
    start_date: new Date("1917-01-01"),
    end_date: new Date("1931-01-01"),
  },
  {
    slug: "art-deco",
    name: "Art Deco",
    description:
      "Emerging in 1920s France and popularised internationally by the 1925 Paris Exposition des Arts Décoratifs, Art Deco paired geometric, streamlined forms with luxurious materials — exotic woods, lacquer, ivory and chrome — favouring glamour and craftsmanship over the austerity of the modernist movements developing alongside it.",
    start_date: new Date("1910-01-01"),
    end_date: new Date("1940-01-01"),
  },
  {
    slug: "scandinavian-design",
    name: "Scandinavian Design",
    description:
      "Spanning Sweden, Finland and beyond, Scandinavian Design paired functionalist principles with warmth and accessibility: natural materials, gentle forms and an insistence that good design should be affordable and available to ordinary households, not reserved for an elite clientele.",
    start_date: new Date("1930-01-01"),
    end_date: new Date("1970-01-01"),
  },
  {
    slug: "japanese-design",
    name: "Japanese Design",
    description:
      "Twentieth-century Japanese design fused the restraint and material sensitivity of traditional craft — joinery, lacquer, folk pottery — with modern industrial production, producing objects that favoured quiet refinement and functional clarity over ornament, later also providing a radical visual counterpoint within international postmodern design.",
    start_date: new Date("1950-01-01"),
    end_date: null,
  },
  {
    slug: "contemporary-design",
    name: "Contemporary Design",
    description:
      "From the 1980s onward, a new generation of designers moved fluidly between industrial production and limited-edition sculpture, working across materials and technologies — injection-moulded plastics, folded sheet metal, digital fabrication — unified less by a single visual style than by a shared willingness to question what a chair, lamp or table still needed to look like.",
    start_date: new Date("1980-01-01"),
    end_date: null,
  },
]

const TRANSLATED_MOVEMENTS: Record<string, { name: string; description: string }> = {
  bauhaus: {
    name: "Bauhaus",
    description:
      "The Bauhaus was founded by Walter Gropius in 1919 in Weimar, Germany, with the revolutionary idea of uniting craft, art and technology under one roof. Gropius sought to erase the distinction between fine art and applied art, and this approach turned the Bauhaus into a crucible for new ideas and avant-garde practice that reshaped twentieth-century design.",
  },
  postmodernism: {
    name: "Postmodernism",
    description:
      "Furniture designed by the postmodernists is defined by warm, strongly patterned surfaces, usually in plastic laminate; deliberately odd proportions and unconventional angles; and a loose, often playful relationship between an object's form and its function. Critics dismissed postmodern design as decorative provocation with little lasting value. Decades later, the style still has the power to surprise — proof that the critics were not entirely right.",
  },
  "organic-design": {
    name: "Organic Design",
    description:
      "With their asymmetric curves, organic pieces move almost like living things, breaking from traditional straight lines and right angles. Within an interior, they call for a more harmonious aesthetic, somewhere between minimalism and character. The organic asserts itself subtly in a room: rippled mirrors bring visual softness, rounded sofas invite conviviality, and wood-grained furniture makes a space feel warmer, almost imposing.",
  },
  "mid-century": {
    name: "Mid-century Modern",
    description:
      "Emerging in the 1940s in the United States, Mid-century Modern first took shape in architecture through major figures such as Frank Lloyd Wright and Richard Neutra before influencing the wider world of design. This pared-back style reacted against the opulent, heavily decorated interiors of the preceding decades, drawing its inspiration in particular from the Bauhaus movement and European modernism.",
  },
}

export default async function seedAdditionalMovements({ container }: ExecArgs) {
  const movementModuleService: MovementModuleService = container.resolve(MOVEMENT_MODULE)

  for (const input of NEW_MOVEMENTS) {
    const [existing] = await movementModuleService.listMovements({ slug: input.slug })
    if (existing) {
      console.log(`Skipping ${input.slug}: already exists`)
      continue
    }
    await movementModuleService.createMovements(input)
    console.log(`Created movement ${input.slug}`)
  }

  for (const [slug, update] of Object.entries(TRANSLATED_MOVEMENTS)) {
    const [existing] = await movementModuleService.listMovements({ slug })
    if (!existing) {
      console.warn(`Skipping translation for ${slug}: movement not found`)
      continue
    }
    await movementModuleService.updateMovements({ id: existing.id, ...update })
    console.log(`Translated movement ${slug}`)
  }

  console.log("Done.")
}
