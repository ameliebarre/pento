/**
 * Eileen Gray was missing from the database despite being present in
 * seed-influential-designers.ts (the original batch run silently skipped
 * or failed on her). Creates her directly with the full flagship-page
 * content set (bio, quote, timeline, in_focus, similar_designers).
 *
 *   npx medusa exec ./src/scripts/seed-eileen-gray.ts
 */
import type { ExecArgs } from "@medusajs/framework/types"
import { DESIGNER_MODULE } from "../modules/designer"
import type DesignerModuleService from "../modules/designer/service"

const TIMELINE = [
  { date: "1878", title: "Born in Ireland", subtitle: "Near Enniscorthy, Ireland", description: "Eileen Gray is born and later studies at the Slade School of Art in London before settling in Paris." },
  { date: "1900s", title: "Learning Lacquer", subtitle: "A Japanese technique", description: "She trains in lacquer technique under the Japanese craftsman Seizo Sugawara, shaping her earliest celebrated work." },
  { date: "1913 – 1919", title: "Early Lacquer Exhibitions", subtitle: "Paris, France", description: "Her lacquer screens and furniture are shown at Paris salons, establishing her early critical reputation." },
  { date: "1922", title: "Opening a Paris Gallery", subtitle: "Jean Désert", description: "Gray opens her own gallery in Paris to sell her furniture and interiors directly to clients." },
  { date: "1926", title: "The Bibendum Chair", subtitle: "A sensual modernism", description: "Her rounded, tyre-like Bibendum armchair softens the industrial materials favoured by her modernist contemporaries." },
  { date: "1926 – 1929", title: "Designing E-1027", subtitle: "Her own architecture", description: "Largely self-taught as an architect, she designs and builds the modernist villa E-1027 on the French Riviera." },
  { date: "1927", title: "The E-1027 Table", subtitle: "Furniture for a house", description: "She designs the height-adjustable E-1027 table specifically for the villa, now one of her most reproduced pieces." },
  { date: "1930s", title: "Tempe à Pailla", subtitle: "A second house", description: "She designs and builds a second house, Tempe à Pailla, continuing her independent architectural practice." },
  { date: "1930s – 1950s", title: "Decades of Obscurity", subtitle: "Working, unrecognised", description: "Gray continues designing privately, largely overlooked by a design establishment that credited her male contemporaries instead." },
  { date: "1968", title: "Rediscovery Begins", subtitle: "A magazine feature", description: "A feature in Domus magazine brings renewed critical attention to her work late in her life." },
  { date: "1976", title: "Death at Ninety-Eight", subtitle: "A rediscovery continues", description: "She dies in Paris in 1976, as renewed scholarly interest begins to restore her standing in design history." },
]

const IN_FOCUS = {
  title: "E-1027 – 1929",
  image_url: null,
  paragraphs: [
    "Designed and largely self-taught by Eileen Gray, E-1027 is a modernist villa on the French Riviera built for herself and her partner, the architecture critic Jean Badovici — its name encoding their initials and the alphabet's position of E, 10 (J), 2 (B), 7 (G).",
    "Gray designed furniture specifically for the house as she built it, including the adjustable E-1027 table, conceived so a breakfast tray could pass over a bed, and the Bibendum and Transat chairs, softening the era's industrial materials into something more intimate.",
    "Le Corbusier, a frequent guest, later painted a series of murals directly onto the house's walls without Gray's consent — an act she considered a violation that overshadowed her authorship for decades, until the house's long, contested restoration helped restore her name to it.",
  ],
}

const BIOGRAPHY =
  "Eileen Gray was born in 1878 near Enniscorthy, Ireland, into a family of means that allowed her to study art relatively freely for a woman of her time, first at the Slade School of Art in London and then in Paris, where she settled permanently in her twenties. There she apprenticed under the Japanese craftsman Seizo Sugawara to learn the demanding technique of lacquer work, a material discipline that defined her earliest celebrated pieces and that she practised with a rigour few Western designers of the period attempted.\n\nHer lacquer screens and furniture, shown through the 1910s and 1920s, earned critical attention and allowed her in 1922 to open her own Paris gallery, Jean Désert, to sell her work directly rather than through intermediaries — an unusually independent position for a woman designer in interwar Paris. Her furniture from this period, including the Bibendum armchair and the Transat chair, softened the hard industrial materials favoured by her modernist contemporaries into something more sensual and personal.\n\nFrom 1926 to 1929, largely self-taught as an architect, Gray designed and built E-1027, a modernist villa on the French Riviera for herself and her partner, the architecture critic Jean Badovici, encoding both their initials in its name. She designed furniture specifically for the house as she built it, including the height-adjustable E-1027 table. Le Corbusier, a frequent guest at the house, later painted a series of murals directly onto its walls without her consent, an act Gray considered a violation and one that, combined with the era's broader reluctance to credit women designers, contributed to her being written out of design history for decades.\n\nGray continued working privately and largely unrecognised through the following decades, designing further houses and furniture with little public attention. She died in Paris in 1976 at the age of ninety-eight, just as renewed scholarly interest — and a long, contested restoration of E-1027 itself — began to restore her name to work it had quietly been removed from."

export default async function seedEileenGray({ container }: ExecArgs) {
  const designerModuleService: DesignerModuleService = container.resolve(DESIGNER_MODULE)

  const [existing] = await designerModuleService.listDesigners({ slug: "eileen-gray" })
  if (existing) {
    console.log("eileen-gray already exists. Nothing to do.")
    return
  }

  await designerModuleService.createDesigners({
    slug: "eileen-gray",
    first_name: "Eileen",
    last_name: "Gray",
    nationality: "Ireland",
    birth_date: new Date("1878-08-09"),
    death_date: new Date("1976-10-31"),
    quote: "A house is not a machine to live in. It is the shell of man.",
    biography: BIOGRAPHY,
    image_url: null,
    featured: false,
    timeline: { entries: TIMELINE },
    in_focus: IN_FOCUS,
    similar_designers: { slugs: ["le-corbusier", "charlotte-perriand", "jean-prouve"] },
  })

  console.log("Created designer eileen-gray with full content")
}
