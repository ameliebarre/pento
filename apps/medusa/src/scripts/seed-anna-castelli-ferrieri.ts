/**
 * Seeds Anna Castelli Ferrieri: core designer fields and a medium-length
 * biography. Needed before Componibili can be linked to its designer.
 *
 *   npx medusa exec ./src/scripts/seed-anna-castelli-ferrieri.ts
 */
import type { ExecArgs } from "@medusajs/framework/types"
import { DESIGNER_MODULE } from "../modules/designer"
import type DesignerModuleService from "../modules/designer/service"

export default async function seedAnnaCastelliFerrieri({ container }: ExecArgs) {
  const designerModuleService: DesignerModuleService = container.resolve(DESIGNER_MODULE)

  const [existing] = await designerModuleService.listDesigners({ slug: "anna-castelli-ferrieri" })
  if (existing) {
    console.log("anna-castelli-ferrieri already exists. Nothing to do.")
    return
  }

  await designerModuleService.createDesigners({
    slug: "anna-castelli-ferrieri",
    first_name: "Anna",
    last_name: "Castelli Ferrieri",
    nationality: "Italy",
    birth_date: new Date("1918-08-06"),
    death_date: new Date("2006-06-22"),
    quote: null,
    biography:
      "Anna Castelli Ferrieri was born in Milan in 1918 and studied at the Milan Polytechnic from 1938 to 1943, graduating as one of the first women in Italy to hold a degree in architecture. After an early stint at the office of Franco Albini, she opened her own architecture studio in 1946 and became editor-in-chief of the magazine Casabella, later serving as its Italian correspondent for the British journal Architectural Design.\n\nHer path into furniture design ran through her marriage to Giulio Castelli, the engineer who founded the plastics manufacturer Kartell in 1949. After designing the company's new headquarters, Castelli Ferrieri began working with Kartell directly in 1966, and went on to serve as its art director from 1976 to 1987. In that role she gave the young, still largely industrial brand a coherent design language built on clean geometric volumes, bold colour and the high-gloss finishes that plastic made possible.\n\nHer best-known design, Componibili, debuted at the 1967 Salone del Mobile as one of the first fully modular, all-plastic storage systems: stackable cylindrical modules in ABS, each fitted with a swivelling door, that could be freely combined and rearranged. It became an enduring commercial and critical success, entering the permanent collections of MoMA in New York and the Centre Pompidou in Paris. Castelli Ferrieri won the Compasso d'Oro three times over her career and remained active as a designer and writer on industrial design until her death in Milan in 2006.",
    image_url: null,
    featured: false,
  })

  console.log("Created designer anna-castelli-ferrieri")
}
