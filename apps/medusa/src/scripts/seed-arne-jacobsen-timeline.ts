/**
 * One-off data fix: seeds Arne Jacobsen's career timeline, now that the
 * "timeline" JSON field only stores { date, title, subtitle, description }
 * entries (no more images).
 *
 *   npx medusa exec ./src/scripts/seed-arne-jacobsen-timeline.ts
 */
import { MedusaError } from "@medusajs/framework/utils"
import type { ExecArgs } from "@medusajs/framework/types"
import { DESIGNER_MODULE } from "../modules/designer"
import type DesignerModuleService from "../modules/designer/service"

const TIMELINE = [
  {
    date: "1902",
    title: "A Danish Beginning",
    subtitle: "Copenhagen, Denmark",
    description:
      "Arne Emil Jacobsen is born in Copenhagen. The Danish capital becomes the setting for his education, his early career and many of the buildings that would define his legacy.",
  },
  {
    date: "1924 – 1927",
    title: "Education & Influence",
    subtitle: "From painting to architecture",
    description:
      "Initially drawn to painting, Jacobsen studies architecture at the Royal Danish Academy of Fine Arts. His teachers include Kay Fisker and Kaare Klint, a major figure in Danish furniture design. Drawing and watercolour painting remain lifelong creative tools.",
  },
  {
    date: "1925",
    title: "Learning Alongside Kay Fisker",
    subtitle: "An early collaboration",
    description:
      "While still a student, Jacobsen works with his teacher Kay Fisker on the Paris pavilion for a chair design. He receives a silver medal for a chair design, gaining recognition before graduating.",
  },
  {
    date: "1927",
    title: "A Shared Life, a Wider World",
    subtitle: "Family & Friendships",
    description:
      "Jacobsen marries Marie Jelstrup Holm, with whom he has two sons. Through her circle, he develops connections with cultural figures including designer Poul Henningsen. Their European travels feed his interests in architecture, photography and design.",
  },
  {
    date: "1929",
    title: "A House Ahead of Its Time",
    subtitle: "Architectural Breakthrough",
    description:
      "Together with architect Flemming Lassen, Jacobsen creates the House of the Future. Their experimental exhibition house brings a radical modernist vision to Denmark and marks a decisive breakthrough in his career.",
  },
  {
    date: "1930",
    title: "A Studio of His Own",
    subtitle: "An Independent Practice",
    description:
      "Jacobsen establishes his own architectural practice. This new independence gives him the freedom to develop an approach that would increasingly unite buildings, interiors and everyday objects.",
  },
  {
    date: "1932 – 1936",
    title: "Modernism by the Sea",
    subtitle: "Coastal Modernism",
    description:
      "With Bellevue's beachfront facilities, Jacobsen develops a coastal modernist ensemble. White façades and functional spaces express his growing commitment to modernism.",
  },
  {
    date: "1942 – 1943",
    title: "Arne and Jonna",
    subtitle: "A Creative Partnership",
    description:
      "Jacobsen meets Jonna Møller, a trained textile printer who becomes his second wife and creative collaborator. In 1943, they exhibit textiles combining his pattern designs with her printing expertise.",
  },
  {
    date: "Autumn 1943 – 1945",
    title: "A Life Interrupted",
    subtitle: "Exile in Sweden",
    description:
      "Facing Nazi persecution because of his Jewish background, Jacobsen flees occupied Denmark for Sweden with Jonna, Poul Henningsen and Henningsen's wife. During exile, he develops botanical textile and wallpaper patterns for Nordiska Kompaniet.",
  },
  {
    date: "1945",
    title: "Coming Home",
    subtitle: "Return to Denmark",
    description:
      "Following Denmark's liberation, Jacobsen returns home and resumes his architectural career. He also continues creating textiles, carrying his exploration of colour and natural forms into the post-war years.",
  },
  {
    date: "1952",
    title: "A New Language in Furniture",
    subtitle: "Furniture Breakthrough",
    description:
      "Developed with Fritz Hansen, the Ant chair combines moulded plywood with slender steel legs. Its lightweight construction and distinctive silhouette mark Jacobsen's breakthrough as a furniture designer.",
  },
  {
    date: "1955",
    title: "An Everyday Icon",
    subtitle: "An Enduring Classic",
    description:
      "With the Series 7, Jacobsen expands his exploration of moulded plywood. Its flowing shell and versatile construction establish a lasting relationship between industrial production and everyday comfort.",
  },
  {
    date: "1956 – 1965",
    title: "Returning as a Professor",
    subtitle: "Teaching & Transmission",
    description:
      "Jacobsen returns to the Royal Academy of Fine Arts as a professor of architecture. Alongside his practice, he helps educate a new generation at the institution where his own career began.",
  },
  {
    date: "1958",
    title: "The Birth of Two Icons",
    subtitle: "Sculptural Forms",
    description:
      "Created for the forthcoming SAS Royal Hotel, the Egg and Swan chairs explore enveloping organic forms. Their sculptural silhouette offers a striking contrast to the building's geometric architecture.",
  },
  {
    date: "1960",
    title: "A Complete Design Vision",
    subtitle: "Total Design",
    description:
      "Copenhagen's SAS Royal Hotel opens, revealing Jacobsen's integrated approach to design. Architecture, furniture, lighting and interior details form a carefully orchestrated environment.",
  },
  {
    date: "1964",
    title: "A Vision Beyond Denmark",
    subtitle: "International Recognition",
    description:
      "At St Catherine's College, Oxford, Jacobsen brings his comprehensive design approach to an international setting. Modern buildings, furniture and interiors respond to the traditions of university life.",
  },
  {
    date: "1967",
    title: "Precision in Every Detail",
    subtitle: "Designing the Everyday",
    description:
      "Jacobsen creates the Cylinda Line for Stelton. Its stainless-steel vessels translate his architectural thinking into tableware, using cylindrical forms and restrained detailing.",
  },
  {
    date: "1971",
    title: "A Lasting Influence",
    subtitle: "Life's Legacy",
    description:
      "Arne Jacobsen dies in Copenhagen at the age of 69. His work established a lasting connection between architecture and everyday life, interiors and objects that continue to define his legacy.",
  },
]

export default async function seedArneJacobsenTimeline({ container }: ExecArgs) {
  const designerModuleService: DesignerModuleService = container.resolve(DESIGNER_MODULE)

  const [designer] = await designerModuleService.listDesigners({ slug: "arne-jacobsen" })
  if (!designer) {
    throw new MedusaError(MedusaError.Types.NOT_FOUND, "Expected the arne-jacobsen designer to exist")
  }

  await designerModuleService.updateDesigners({ id: designer.id, timeline: { entries: TIMELINE } })

  console.log(`Seeded ${TIMELINE.length} timeline entries for ${designer.slug}`)
}
