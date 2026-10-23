/**
 * Seeds Arne Jacobsen's "In Focus" section (SAS Royal Hotel). No image URL
 * yet — Cloudinary link comes later, same workflow as the other sections.
 *
 *   npx medusa exec ./src/scripts/seed-arne-jacobsen-in-focus.ts
 */
import { MedusaError } from "@medusajs/framework/utils"
import type { ExecArgs } from "@medusajs/framework/types"
import { DESIGNER_MODULE } from "../modules/designer"
import type DesignerModuleService from "../modules/designer/service"

const IN_FOCUS = {
  title: "SAS Royal Hotel – 1960",
  image_url: "https://res.cloudinary.com/dasujyncc/image/upload/v1792420530/pento/focus/sas-royal-hotel.png",
  paragraphs: [
    "The light, minimalist architecture and the carefully planned interior design have made the SAS Royal Hotel from 1960 a key reference in the history of architecture and design.",
    "Today, the SAS Royal Hotel (now Radisson Collection Royal Hotel) is recognized as one of Arne Jacobsen's principal works of architecture. The hotel's precise, minimalist architecture and the carefully planned total design inside the building are now regarded as the quintessential expression of Arne Jacobsen's modern aesthetic.",
    "The building, which was Copenhagen's first skyscraper, was designed as a hotel and airport terminal for the airline SAS. When it opened in 1960, it was seen as the symbol of a new era of prosperity, travel and international outlook. The towering structure was designed as a sleek rectangular volume, whose only ornamentation is the grid structure of the light curtain-wall exteriors and the large glazed sections that mirror the movements of the clouds in the sky. The hotel interior was meticulously designed by Arne Jacobsen, and to this day, the furnishings he created for the hotel are key references in furniture design.",
  ],
}

export default async function seedArneJacobsenInFocus({ container }: ExecArgs) {
  const designerModuleService: DesignerModuleService = container.resolve(DESIGNER_MODULE)

  const [designer] = await designerModuleService.listDesigners({ slug: "arne-jacobsen" })
  if (!designer) {
    throw new MedusaError(MedusaError.Types.NOT_FOUND, "Expected the arne-jacobsen designer to exist")
  }

  await designerModuleService.updateDesigners({ id: designer.id, in_focus: IN_FOCUS })

  console.log(`Seeded the In Focus section for ${designer.slug}`)
}
