/**
 * Seeds the designers shown in Arne Jacobsen's "Similar Designers" section:
 * Verner Panton, Finn Juhl and Poul Kjærholm are created; Hans J. Wegner
 * already existed and only gets its image_url refreshed to match the new
 * Cloudinary batch.
 *
 *   npx medusa exec ./src/scripts/seed-similar-designers.ts
 */
import { MedusaError } from "@medusajs/framework/utils"
import type { ExecArgs } from "@medusajs/framework/types"
import { DESIGNER_MODULE } from "../modules/designer"
import type DesignerModuleService from "../modules/designer/service"

const NEW_DESIGNERS = [
  {
    slug: "verner-panton",
    first_name: "Verner",
    last_name: "Panton",
    nationality: "Denmark",
    birth_date: new Date("1926-02-13"),
    death_date: new Date("1998-09-05"),
    quote: "Tomorrow's people cannot live in yesterday's rooms.",
    biography:
      "Verner Panton was born in Gamtofte, Denmark, in 1926. He studied architecture at the Royal Danish Academy of Fine Arts, graduating in 1951, and worked briefly in Arne Jacobsen's office — where he contributed to the Ant chair — before opening his own design studio in 1955, determined to break from the restraint of Danish Modern.\n\nWhere his contemporaries worked in wood, Panton embraced the new industrial plastics of the 1960s, sculpting furniture into continuous, flowing forms. His Panton Chair, developed with Vitra and finally produced in 1967, was the first chair ever injection-moulded from a single piece of plastic, its cantilevered S-curve becoming an icon of Pop-era design. He pursued the same experimental spirit in total environments such as the Visiona 2 installation for Bayer in 1970, where furniture, lighting and textiles dissolved into immersive, intensely coloured landscapes.\n\nPanton died in Copenhagen in 1998. Long overlooked by a Danish design establishment suspicious of his embrace of colour and synthetic material, he is now recognised as one of the most radical and forward-looking designers of the twentieth century.",
    image_url: "https://res.cloudinary.com/dasujyncc/image/upload/v1792439514/pento/designers/verner-panton.png",
    featured: false,
  },
  {
    slug: "finn-juhl",
    first_name: "Finn",
    last_name: "Juhl",
    nationality: "Denmark",
    birth_date: new Date("1912-01-30"),
    death_date: new Date("1989-05-17"),
    quote: "A chair is not just a product for sitting on — it is a piece of sculpture.",
    biography:
      "Finn Juhl was born in Frederiksberg, Denmark, in 1912. He studied architecture at the Royal Danish Academy of Fine Arts under Kay Fisker, graduating in 1934, and spent over a decade working for the architect Vilhelm Lauritzen while designing furniture on the side — entirely self-taught, with no training in cabinetmaking.\n\nThat outsider's eye let him break decisively from the joinery-led tradition of Kaare Klint. His chairs, including the Pelican Chair of 1940 and the Chieftain Chair of 1949, treated seat and frame as independent sculptural elements, the upholstered shell appearing almost to float free of its wooden structure. In the 1950s, Juhl became the most visible ambassador of Danish design in the United States, exhibiting at Georg Jensen's New York store and designing the interiors of the UN Trusteeship Council Chamber in 1952.\n\nJuhl died in Copenhagen in 1989. His own house in Ordrup, which he designed and filled with his furniture, is preserved as a museum and remains one of the clearest statements of his belief that furniture should be judged as sculpture first.",
    image_url: "https://res.cloudinary.com/dasujyncc/image/upload/v1792439504/pento/designers/finn-juhl.png",
    featured: false,
  },
  {
    slug: "poul-kjaerholm",
    first_name: "Poul",
    last_name: "Kjærholm",
    nationality: "Denmark",
    birth_date: new Date("1929-01-09"),
    death_date: new Date("1980-04-18"),
    quote: "I would rather design a piece of furniture that is right than one that is merely beautiful.",
    biography:
      "Poul Kjærholm was born in Østervrå, Denmark, in 1929. Trained first as a cabinetmaker, he went on to study furniture design at the School of Arts and Crafts in Copenhagen under Hans J. Wegner, graduating in 1952 — but where Wegner worked almost exclusively in wood, Kjærholm turned to steel, leather, wicker and marble.\n\nHis furniture applied an architect's structural logic to industrial materials, each piece reduced to its essential lines. The PK22 lounge chair of 1956 and the PK24 chaise longue of 1965 — its cane seat suspended from a single curved steel frame — remain the clearest expressions of this approach. Kjærholm represented Denmark at the 1957 Milan Triennale, winning a Grand Prix, and later taught furniture design at the Royal Danish Academy of Fine Arts, shaping a generation of designers in his exacting, materials-first method.\n\nHe died in Copenhagen in 1980, at only fifty-one. His PK series remains in production today, as precise and modern as when it was first designed.",
    image_url: "https://res.cloudinary.com/dasujyncc/image/upload/v1792439511/pento/designers/poul-kjaerholm.png",
    featured: false,
  },
]

const WEGNER_IMAGE_URL =
  "https://res.cloudinary.com/dasujyncc/image/upload/v1792439507/pento/designers/hans-j-wegner.png"

export default async function seedSimilarDesigners({ container }: ExecArgs) {
  const designerModuleService: DesignerModuleService = container.resolve(DESIGNER_MODULE)

  for (const designer of NEW_DESIGNERS) {
    const [existing] = await designerModuleService.listDesigners({ slug: designer.slug })
    if (existing) {
      console.log(`Skipping ${designer.slug}: already exists`)
      continue
    }
    await designerModuleService.createDesigners(designer)
    console.log(`Created designer ${designer.slug}`)
  }

  const [wegner] = await designerModuleService.listDesigners({ slug: "hans-j-wegner" })
  if (!wegner) {
    throw new MedusaError(MedusaError.Types.NOT_FOUND, "Expected the hans-j-wegner designer to exist")
  }
  await designerModuleService.updateDesigners({ id: wegner.id, image_url: WEGNER_IMAGE_URL })
  console.log("Updated hans-j-wegner's image_url")
}
