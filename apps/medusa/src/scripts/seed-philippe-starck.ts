/**
 * Seeds Philippe Starck: core designer fields, a medium-length biography and
 * a career timeline of key life moments.
 *
 *   npx medusa exec ./src/scripts/seed-philippe-starck.ts
 */
import type { ExecArgs } from "@medusajs/framework/types"
import { DESIGNER_MODULE } from "../modules/designer"
import type DesignerModuleService from "../modules/designer/service"

const TIMELINE = [
  {
    date: "1949",
    title: "A Parisian Beginning",
    subtitle: "Paris, France",
    description:
      "Philippe Starck is born in Paris, the son of an aeronautical engineer. Watching his father design and build aircraft in the family workshop instills an early, hands-on fascination with how things are made.",
  },
  {
    date: "1968",
    title: "A Company at Nineteen",
    subtitle: "An early start",
    description:
      "At just nineteen, Starck founds his first company, producing inflatable objects — an unconventional debut that reveals his instinct for playful, industrial design well before formal training would have allowed it.",
  },
  {
    date: "1969 – 1970s",
    title: "Artistic Director for Pierre Cardin",
    subtitle: "A formative apprenticeship",
    description:
      "Starck becomes artistic director for the house of Pierre Cardin, overseeing furniture production and gaining early exposure to the fashion world's sense of spectacle and reinvention.",
  },
  {
    date: "1982",
    title: "Designing for the Élysée Palace",
    subtitle: "A presidential commission",
    description:
      "President François Mitterrand commissions Starck to design the private apartments of the Élysée Palace. The project brings him national visibility and marks the true launch of his independent career.",
  },
  {
    date: "1984",
    title: "Café Costes",
    subtitle: "A Parisian icon",
    description:
      "Starck designs the interior of Café Costes in Paris, complete with his three-legged chair built for a triangular room. The café becomes a cultural landmark and establishes his reputation as a designer of total environments.",
  },
  {
    date: "1988",
    title: "The Royalton Hotel",
    subtitle: "Hospitality design, reinvented",
    description:
      "Working with hotelier Ian Schrager, Starck designs the Royalton Hotel in New York. The project pioneers the concept of the hotel lobby as social theatre and launches a long, influential partnership in hospitality design.",
  },
  {
    date: "1990",
    title: "The Juicy Salif",
    subtitle: "A sculptural icon",
    description:
      "Designed for Alessi, the spindly, spider-like Juicy Salif lemon squeezer becomes one of the most recognisable objects in design history — as much a sculpture for the counter as a tool for the kitchen.",
  },
  {
    date: "2002",
    title: "The Louis Ghost Chair",
    subtitle: "Reinventing a classic",
    description:
      "Created for Kartell, the Louis Ghost Chair reinterprets a Louis XVI armchair in a single piece of transparent polycarbonate. It becomes one of the best-selling chairs of the century, found everywhere from homes to restaurants.",
  },
  {
    date: "2000s – Today",
    title: "Designing for the Everyday — and the Planet",
    subtitle: "A widening practice",
    description:
      "Starck's practice expands into architecture, yacht interiors, electric vehicles and domestic wind turbines, increasingly framed around his belief that design must justify its environmental cost. He continues to work prolifically across every discipline he can reach.",
  },
]

export default async function seedPhilippeStarck({ container }: ExecArgs) {
  const designerModuleService: DesignerModuleService = container.resolve(DESIGNER_MODULE)

  const [existing] = await designerModuleService.listDesigners({ slug: "philippe-starck" })
  if (existing) {
    console.log("philippe-starck already exists. Nothing to do.")
    return
  }

  await designerModuleService.createDesigners({
    slug: "philippe-starck",
    first_name: "Philippe",
    last_name: "Starck",
    nationality: "France",
    birth_date: new Date("1949-01-18"),
    death_date: null,
    quote: "My only ambition is for my work to be useful and to bring a little poetry into everyday life.",
    biography:
      "Philippe Starck was born in Paris in 1949, the son of an aeronautical engineer whose workshop gave him an early, hands-on fascination with how things are built. Largely self-taught as a designer, he founded his first company at nineteen, producing inflatable furniture, before becoming artistic director for the house of Pierre Cardin in the early 1970s.\n\nHis career changed course in 1982, when President François Mitterrand commissioned him to design the private apartments of the Élysée Palace — a project that brought him national attention. Two years later, his interior for Café Costes in Paris, built around a three-legged chair designed for the room's triangular corners, turned him into a star of French design. Partnerships with hotelier Ian Schrager on projects such as New York's Royalton Hotel extended his reputation internationally, reframing hotel interiors as immersive, theatrical spaces.\n\nStarck's product design has produced some of the most recognisable objects of the late twentieth century, from the spider-like Juicy Salif lemon squeezer for Alessi in 1990 to the transparent, single-mould Louis Ghost Chair for Kartell in 2002 — among the best-selling chairs ever made. Prolific across furniture, architecture, hospitality, yacht design and consumer electronics, he has increasingly framed his later work around sustainability, insisting that design must earn the environmental cost of its own existence.",
    image_url: "https://res.cloudinary.com/dasujyncc/image/upload/v1792530773/pento/designers/philippe_starck.jpg",
    featured: false,
    timeline: { entries: TIMELINE },
  })

  console.log("Created designer philippe-starck with timeline")
}
