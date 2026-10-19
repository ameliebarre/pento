/**
 * Seeds Arne Jacobsen's "Similar Designers" section: a curated, editor-picked
 * list of slugs (not a computed relation — see the designer-designer
 * self-link attempt that preceded this, abandoned because Medusa's module
 * link system can't store two distinct foreign keys to the same entity
 * without deep undocumented customization).
 *
 *   npx medusa exec ./src/scripts/seed-arne-jacobsen-similar-designers.ts
 */
import { MedusaError } from "@medusajs/framework/utils"
import type { ExecArgs } from "@medusajs/framework/types"
import { DESIGNER_MODULE } from "../modules/designer"
import type DesignerModuleService from "../modules/designer/service"

const SIMILAR_DESIGNER_SLUGS = ["verner-panton", "finn-juhl", "hans-j-wegner", "poul-kjaerholm"]

export default async function seedArneJacobsenSimilarDesigners({ container }: ExecArgs) {
  const designerModuleService: DesignerModuleService = container.resolve(DESIGNER_MODULE)

  const [designer] = await designerModuleService.listDesigners({ slug: "arne-jacobsen" })
  if (!designer) {
    throw new MedusaError(MedusaError.Types.NOT_FOUND, "Expected the arne-jacobsen designer to exist")
  }

  const existingSlugs = await designerModuleService.listDesigners({ slug: SIMILAR_DESIGNER_SLUGS })
  const missing = SIMILAR_DESIGNER_SLUGS.filter(
    (slug) => !existingSlugs.some((d) => d.slug === slug),
  )
  if (missing.length > 0) {
    throw new MedusaError(
      MedusaError.Types.NOT_FOUND,
      `Expected these designers to exist: ${missing.join(", ")}`,
    )
  }

  await designerModuleService.updateDesigners({
    id: designer.id,
    similar_designers: { slugs: SIMILAR_DESIGNER_SLUGS },
  })

  console.log(`Seeded similar_designers for ${designer.slug}: ${SIMILAR_DESIGNER_SLUGS.join(", ")}`)
}
