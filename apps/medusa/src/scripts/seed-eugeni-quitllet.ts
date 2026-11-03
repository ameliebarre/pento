/**
 * Seeds Eugeni Quitllet: core designer fields and a short biography. This
 * designer did not exist in the catalogue yet; it is needed before Masters
 * can be linked to its two co-designers.
 *
 *   npx medusa exec ./src/scripts/seed-eugeni-quitllet.ts
 */
import type { ExecArgs } from "@medusajs/framework/types"
import { DESIGNER_MODULE } from "../modules/designer"
import type DesignerModuleService from "../modules/designer/service"

export default async function seedEugeniQuitllet({ container }: ExecArgs) {
  const designerModuleService: DesignerModuleService = container.resolve(DESIGNER_MODULE)

  const [existing] = await designerModuleService.listDesigners({ slug: "eugeni-quitllet" })
  if (existing) {
    console.log("eugeni-quitllet already exists. Nothing to do.")
    return
  }

  await designerModuleService.createDesigners({
    slug: "eugeni-quitllet",
    first_name: "Eugeni",
    last_name: "Quitllet",
    nationality: "Spain",
    birth_date: null,
    death_date: null,
    quote: "I like to call myself a 'disoñador' — a fusion of designer and dreamer.",
    biography:
      "Eugeni Quitllet was born in 1972 in Ibiza and graduated in design and interior architecture from the La Llotja school in Barcelona in 1996. He began his career curating installations for cultural institutions such as the Joan Miró Foundation, before a chance meeting with Philippe Starck in Formentera in 2001 launched a long and prolific collaboration between the two designers.\n\nTogether with Starck, Quitllet has co-signed numerous projects, among them the Masters chair for Kartell in 2010 — a single seat shell that layers the silhouettes of three icons of twentieth-century furniture — as well as the HGO collection for Alias in 2009 and the To'taime coat stand in 2011. Alongside this partnership, he has built an independent practice designing for brands including Kartell, Vondom, Lexon and Aëdle, known for airy, sculptural forms that favour lightness over mass.\n\nQuitllet describes himself as a 'disoñador', an invented word fusing the Spanish for designer and dreamer. His work has received the Good Design Award, the Red Dot Design Award, the German Design Award and a special mention at the Compasso d'Oro, and he was named Designer of the Year at Maison & Objet in 2016.",
    image_url: null,
    featured: false,
  })

  console.log("Created designer eugeni-quitllet")
}
