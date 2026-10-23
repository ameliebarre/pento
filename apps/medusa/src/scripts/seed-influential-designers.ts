/**
 * Seeds a batch of canonical, high-impact furniture/industrial designers —
 * real bio/quote/dates, matching the quality bar of Arne Jacobsen's core
 * fields (not his timeline/in_focus/similar_designers extras, which are
 * flagship-page-specific). No image_url yet (added later) and no products
 * linked yet (a separate, later step).
 *
 *   npx medusa exec ./src/scripts/seed-influential-designers.ts
 */
import type { ExecArgs } from "@medusajs/framework/types"
import { DESIGNER_MODULE } from "../modules/designer"
import type DesignerModuleService from "../modules/designer/service"

const DESIGNERS = [
  {
    slug: "le-corbusier",
    first_name: "Le",
    last_name: "Corbusier",
    nationality: "Switzerland",
    birth_date: new Date("1887-10-06"),
    death_date: new Date("1965-08-27"),
    quote: "A house is a machine for living in.",
    biography:
      "Born Charles-Édouard Jeanneret in La Chaux-de-Fonds, Switzerland, in 1887, Le Corbusier trained as an engraver before turning to architecture, largely self-taught through travel and the study of classical and vernacular building. He settled in Paris in the 1920s, adopted the pseudonym Le Corbusier, and set out his \"Five Points of Architecture\" — pilotis, a free plan, a free façade, ribbon windows and a roof garden — most completely realised in the Villa Savoye of 1931.\n\nWorking alongside his cousin Pierre Jeanneret and Charlotte Perriand, he extended this functionalist logic to furniture, producing the LC2 and LC4 chaise longue in 1928: tubular steel frames conceived as \"machines for sitting\" rather than decorated objects, later produced by Thonet and Cassina.\n\nHis later work, including the Unité d'Habitation in Marseille and the Chapel at Ronchamp, moved toward a heavier, sculptural concrete language that would shape post-war Brutalism. He died in 1965 while swimming near Cap Martin, France, remembered as one of the most influential — and most debated — architects of the twentieth century.",
  },
  {
    slug: "charlotte-perriand",
    first_name: "Charlotte",
    last_name: "Perriand",
    nationality: "France",
    birth_date: new Date("1903-10-24"),
    death_date: new Date("1999-10-27"),
    quote: "The extension of the art of dwelling is the extension of the art of living.",
    biography:
      "Charlotte Perriand was born in Paris in 1903 and studied furniture design at the École de l'Union Centrale des Arts Décoratifs. In 1927 she applied to work in Le Corbusier's studio and was initially turned away with the remark \"we don't embroider cushions here\" — until her Bar sous le toit installation, built from chrome tubing and aluminium, proved otherwise. She joined the practice and, with Le Corbusier and Pierre Jeanneret, co-designed the LC series of tubular steel furniture that remains in production today.\n\nShe left the studio in 1937 to pursue independent work, serving as an industrial design advisor to the Japanese government from 1940 and absorbing an appreciation for natural materials and craft that reshaped her later furniture in wood, rattan and stone.\n\nPerriand continued designing into her nineties, notably the interiors of the Les Arcs ski resort in the French Alps. She died in Paris in 1999, long under-credited for work originally attributed solely to her male collaborators, and is now recognised as one of modernism's defining designers.",
  },
  {
    slug: "eero-saarinen",
    first_name: "Eero",
    last_name: "Saarinen",
    nationality: "Finland",
    birth_date: new Date("1910-08-20"),
    death_date: new Date("1961-09-01"),
    quote: "Always design a thing by considering it in its next larger context.",
    biography:
      "Eero Saarinen was born in Kirkkonummi, Finland, in 1910, the son of architect Eliel Saarinen, and emigrated with his family to the United States as a child. He studied sculpture in Paris and architecture at Yale, and taught alongside his father at Cranbrook Academy of Art, where he met and worked with Charles Eames and Ray Kaiser.\n\nFor Knoll, Saarinen designed the Womb Chair in 1948 at the request of Florence Knoll, who asked for a chair she could \"curl up in,\" followed in 1956 by the Tulip, or Pedestal, collection — a single sculptural stem replacing conventional legs to eliminate what he called \"the slum of legs\" beneath furniture.\n\nAs an architect he worked at a dramatically different scale, designing the swooping TWA Flight Center at New York's Idlewild (now JFK) Airport and the Gateway Arch in St. Louis. Saarinen died suddenly of a brain tumour in 1961, at fifty-one, leaving behind one of modern design's most structurally adventurous bodies of work.",
  },
  {
    slug: "charles-eames",
    first_name: "Charles",
    last_name: "Eames",
    nationality: "USA",
    birth_date: new Date("1907-06-17"),
    death_date: new Date("1978-08-21"),
    quote: "The details are not the details. They make the product.",
    biography:
      "Charles Eames was born in St. Louis, Missouri, in 1907 and studied architecture at Washington University before leaving — by most accounts asked to — for views considered too modern for the curriculum. A fellowship brought him to Cranbrook Academy of Art, where he met Eero Saarinen and the painter Ray Kaiser, whom he married in 1941.\n\nTogether, Charles and Ray founded the Eames Office in Los Angeles, refining techniques for moulding plywood first developed for leg splints during the Second World War into the Eames Lounge Chair and Ottoman of 1956 and a wide family of moulded plastic and plywood chairs for Herman Miller. The couple's own Case Study House in Pacific Palisades became a landmark of postwar residential design.\n\nCharles's practice extended into exhibition design, toy design and film, always guided by his conviction that the smallest details of a design were never incidental. He died in 1978, having helped define the visual language of American mid-century modernism.",
  },
  {
    slug: "ray-eames",
    first_name: "Ray",
    last_name: "Eames",
    nationality: "USA",
    birth_date: new Date("1912-12-15"),
    death_date: new Date("1988-08-21"),
    quote: "Design addresses itself to the entire human experience.",
    biography:
      "Ray Kaiser was born in Sacramento, California, in 1912 and trained as a painter, studying under Hans Hofmann and exhibiting with the American Abstract Artists group in New York before enrolling at Cranbrook Academy of Art, where she met Charles Eames. They married in 1941 and ran the Eames Office in Los Angeles as equal creative partners for nearly four decades.\n\nWhile Charles is often credited as the public face of the studio, Ray shaped its colour, pattern, textiles and exhibition design, and directed many of its award-winning short films, including the widely studied Powers of Ten. Her eye for composition and material contrast is visible throughout the Eames Lounge Chair, the moulded plywood and plastic chair families, and the couple's own Case Study House.\n\nRay continued the Eames Office's work after Charles's death in 1978, overseeing retrospectives of their joint career. She died in 1988 — exactly ten years to the day after her husband — leaving a body of work increasingly recognised as a true creative partnership rather than a single author's achievement.",
  },
  {
    slug: "alvar-aalto",
    first_name: "Alvar",
    last_name: "Aalto",
    nationality: "Finland",
    birth_date: new Date("1898-02-03"),
    death_date: new Date("1976-05-11"),
    quote: "We should work for simple, good, undecorated things.",
    biography:
      "Alvar Aalto was born in Kuortane, Finland, in 1898 and studied architecture at the Helsinki University of Technology. Designing the Paimio Sanatorium in the early 1930s, he developed the Paimio Chair specifically for tuberculosis patients, its bent plywood frame shaped to ease breathing — one of the earliest examples of furniture engineered for a precise human need.\n\nWith his wife and professional partner Aino Aalto, he founded the furniture company Artek in 1935 to manufacture and distribute his bent-wood designs, having pioneered techniques for laminating and curving birch plywood that avoided the cold associations of tubular steel in favour of a warmer, distinctly Nordic material language. The rippled-glass Savoy vase of 1936, designed for the Savoy restaurant in Helsinki, remains in production unchanged.\n\nAalto's architecture — from the Finlandia Hall in Helsinki to Baker House at MIT — pursued a humanist, light-filled modernism attentive to landscape and natural material, distinguishing him from the more austere international style of his contemporaries. He died in Helsinki in 1976.",
  },
  {
    slug: "eileen-gray",
    first_name: "Eileen",
    last_name: "Gray",
    nationality: "Ireland",
    birth_date: new Date("1878-08-09"),
    death_date: new Date("1976-10-31"),
    quote: "A house is not a machine to live in. It is the shell of man.",
    biography:
      "Eileen Gray was born near Enniscorthy, Ireland, in 1878 and studied at the Slade School of Art in London before settling in Paris, where she trained in lacquer technique under the Japanese craftsman Seizo Sugawara — a skill that defined her earliest celebrated furniture and screens.\n\nIn the 1920s, self-taught in architecture, she designed and built E-1027, a villa on the French Riviera, furnishing it with pieces created specifically for the house: the adjustable, circular E-1027 table and the tubular steel Bibendum and Transat chairs, which balanced the era's industrial materials with a softer, more personal sensuality than much contemporary modernism.\n\nLargely overlooked for decades — and overshadowed by Le Corbusier, who painted murals in E-1027 without her permission, an act she considered a violation of the house — Gray continued to design privately into old age. She died in Paris in 1976, at ninety-eight, having lived to see only the beginning of her rediscovery as one of modernism's most original designers.",
  },
  {
    slug: "harry-bertoia",
    first_name: "Harry",
    last_name: "Bertoia",
    nationality: "Italy",
    birth_date: new Date("1915-03-10"),
    death_date: new Date("1978-11-06"),
    quote: "If you look at these chairs, they are mainly made of air, like sculpture. Space passes right through them.",
    biography:
      "Harry Bertoia was born in San Lorenzo, Italy, in 1915 and emigrated to Detroit at fifteen to join his brother. He studied at Cranbrook Academy of Art and later taught metalworking there, developing the jewellery and welding skills that would define his later furniture.\n\nInvited by Hans and Florence Knoll to develop a seating line, Bertoia spent two years experimenting with welded steel wire before unveiling the Diamond Chair in 1952 — a form he described as being made mostly of air, its open lattice shell letting light and space pass through in a way upholstered furniture could not. The chair's commercial success gave Bertoia the financial independence to largely abandon furniture design and devote himself to sculpture.\n\nHis later career centred on large-scale metal sculpture and his \"sonambient\" sound sculptures — clusters of flexible metal rods that produce tonal sound when touched, which he recorded extensively at his Pennsylvania studio. He died there in 1978.",
  },
  {
    slug: "isamu-noguchi",
    first_name: "Isamu",
    last_name: "Noguchi",
    nationality: "USA",
    birth_date: new Date("1904-11-17"),
    death_date: new Date("1988-12-30"),
    quote: "Everything is sculpture. Any material, any idea without hindrance born into space, I consider sculpture.",
    biography:
      "Isamu Noguchi was born in Los Angeles in 1904 to an American writer mother and a Japanese poet father, and spent much of his childhood in Japan before returning to the United States. He trained as a sculptor and briefly apprenticed with Constantin Brâncuși in Paris, an experience that shaped his lifelong preoccupation with pure, essential form.\n\nIn 1944 he designed the Noguchi Table for Herman Miller — a biomorphic glass top resting on two interlocking walnut bases — treating furniture as functional sculpture rather than decorated craft. From 1951 he began the Akari light sculptures, paper and bamboo lanterns made in collaboration with craftsmen in Gifu, Japan, which he described as sculptures that also happened to provide light.\n\nNoguchi worked across an unusually wide range for a single career — stage sets for choreographer Martha Graham, public parks and plazas, playgrounds, and stone sculpture — always moving fluidly between Japanese and American sensibilities. He died in New York in 1988.",
  },
  {
    slug: "jean-prouve",
    first_name: "Jean",
    last_name: "Prouvé",
    nationality: "France",
    birth_date: new Date("1901-04-08"),
    death_date: new Date("1984-03-23"),
    quote: "I have never really distinguished between the vocation of builder and that of designer.",
    biography:
      "Jean Prouvé was born in Nancy, France, in 1901 into a family of artists associated with the École de Nancy, and trained not as an architect or designer but as a metalworker, opening his own workshop in 1923. This background in industrial fabrication set him apart from his design contemporaries and shaped a career built on structural logic rather than decoration.\n\nHis Standard Chair of 1934 placed its reinforced rear legs to bear the greatest load — the sitter's weight when leaning back — a visibly engineered solution rather than a stylistic one. Prouvé extended the same thinking to architecture, pioneering folded and pressed sheet steel construction and prefabricated, demountable buildings, including the Maison Tropicale housing designed for colonial Africa and shipped in component form.\n\nThough never formally trained as an architect, he came to see no real distinction between building and designing furniture, treating both as problems of material and structure. He died in Nancy in 1984, and his furniture — long valued primarily by specialists — has since become some of the most sought-after of the twentieth century.",
  },
  {
    slug: "marcel-breuer",
    first_name: "Marcel",
    last_name: "Breuer",
    nationality: "Hungary",
    birth_date: new Date("1902-05-21"),
    death_date: new Date("1981-07-01"),
    quote: "I wanted a chair that was economic in material, light and durable.",
    biography:
      "Marcel Breuer was born in Pécs, Hungary, in 1902 and enrolled at the Bauhaus in Weimar in 1920, becoming head of its furniture workshop by the age of twenty-four after the school relocated to Dessau. Inspired, by his own account, by the handlebar of his bicycle, he developed the Wassily Chair in 1925 — among the first chairs built from bent tubular steel — followed in 1928 by the cantilevered, cane-seated Cesca Chair.\n\nBreuer emigrated to the United States in 1937 to teach at Harvard's Graduate School of Design, where his students included Philip Johnson, I. M. Pei and Paul Rudolph, extending his influence well beyond his own built work.\n\nHis later architectural career moved toward a heavy, sculptural concrete Brutalism, most visibly in the original Whitney Museum of American Art building in New York. He died in New York in 1981, remembered equally for the lightness of his early furniture and the weight of his later buildings.",
  },
  {
    slug: "michael-thonet",
    first_name: "Michael",
    last_name: "Thonet",
    nationality: "Germany",
    birth_date: new Date("1796-07-02"),
    death_date: new Date("1871-03-03"),
    quote: "Simple, light, strong and affordable — a chair for everyone.",
    biography:
      "Michael Thonet was born in Boppard, Germany, in 1796 and trained as a cabinetmaker, experimenting for years with techniques for steam-bending solid wood into curved furniture forms without carving or joinery. Relocating to Vienna at the invitation of the Austrian state, he founded Gebrüder Thonet with his sons in 1853.\n\nHis Chair No. 14 of 1859, often called the \"consumer chair,\" distilled this bentwood technique into just six standardised parts and ten screws, shipped unassembled and put together on site — a logic of flat-packed, mass-produced furniture that anticipated the twentieth century by decades. Tens of millions were sold, and it became the ubiquitous chair of European cafés.\n\nThonet's combination of industrial efficiency and elegant, minimal form made him arguably the first designer of genuinely mass-market modern furniture, well before the term \"industrial design\" existed. He died in Vienna in 1871, having built the company that would go on to work with Le Corbusier, Breuer and Mies van der Rohe.",
  },
  {
    slug: "dieter-rams",
    first_name: "Dieter",
    last_name: "Rams",
    nationality: "Germany",
    birth_date: new Date("1932-05-20"),
    death_date: null,
    quote: "Good design is as little design as possible.",
    biography:
      "Dieter Rams was born in Wiesbaden, Germany, in 1932 and studied architecture and interior design at the Wiesbaden School of Art. He joined the electronics manufacturer Braun in 1955 and became its chief design officer within a few years, shaping the company's entire product language — from the SK4 record player, nicknamed \"Snow White's Coffin\" for its white case and clear lid, to decades of radios, calculators and shavers defined by restraint and legibility.\n\nFor the furniture company Vitsöe he designed the 606 Universal Shelving System in 1960, a modular, wall-mounted system still manufactured to its original specification today. Frustrated by what he saw as a world \"of unnecessary products,\" he later formulated his \"Ten Principles of Good Design,\" arguing that good design is innovative, useful, honest, long-lasting and — famously — as little design as possible.\n\nRams's influence extends well beyond the objects he personally designed: his Braun work is widely cited as a direct reference point for Apple's industrial design under Jony Ive. He remains active in retirement, based in Kronberg, Germany.",
  },
  {
    slug: "gio-ponti",
    first_name: "Gio",
    last_name: "Ponti",
    nationality: "Italy",
    birth_date: new Date("1891-11-18"),
    death_date: new Date("1979-09-16"),
    quote: "Life is a party. Let's dress for the occasion.",
    biography:
      "Gio Ponti was born in Milan in 1891 and studied architecture at the Politecnico di Milano, graduating after service in the First World War. In 1928 he founded and edited Domus, the architecture and design magazine that remains, nearly a century later, one of the field's most influential publications, giving Ponti an unusually direct platform to shape Italian design taste for five decades.\n\nFor the manufacturer Cassina he designed the Superleggera chair in 1957, an ash-framed, rush-seated chair refined from a traditional Chiavari fishing chair until it weighed barely more than a kilogram — a lightness Ponti famously demonstrated by having a child lift it with one finger, or by dropping it from a window to show it would not break.\n\nAs an architect he designed the Pirelli Tower in Milan, a landmark of postwar Italian modernism, alongside ceramics, glassware and cutlery that reflected his belief that good design should bring elegance to every object of daily life. He died in Milan in 1979.",
  },
  {
    slug: "gaetano-pesce",
    first_name: "Gaetano",
    last_name: "Pesce",
    nationality: "Italy",
    birth_date: new Date("1939-11-08"),
    death_date: new Date("2024-04-03"),
    quote: "I believe very much in diversity, and diversity means identity.",
    biography:
      "Gaetano Pesce was born in La Spezia, Italy, in 1939 and studied architecture in Venice, emerging from the radical design movements of 1960s Italy with little interest in the clean rationalism that preceded him. For B&B Italia in 1969 he designed the Up5 and Up6 chairs — a voluptuous, body-shaped armchair tethered to a spherical ottoman by a cord, vacuum-packed flat and expanding into shape when unwrapped — intended as a pointed statement on the social constraints placed on women.\n\nPesce became one of the most prominent experimenters with resin and polyurethane foam, materials he used precisely because they resisted uniformity: many of his pieces were deliberately produced so that no two were ever quite identical, a direct challenge to the logic of industrial mass production he had trained within.\n\nHe continued working prolifically across furniture, architecture and art into his eighties, based for decades in New York. He died there in 2024, having spent a sixty-year career arguing that imperfection and difference were design virtues, not flaws.",
  },
]

export default async function seedInfluentialDesigners({ container }: ExecArgs) {
  const designerModuleService: DesignerModuleService = container.resolve(DESIGNER_MODULE)

  let created = 0
  for (const designer of DESIGNERS) {
    const [existing] = await designerModuleService.listDesigners({ slug: designer.slug })
    if (existing) {
      console.log(`Skipping ${designer.slug}: already exists`)
      continue
    }
    await designerModuleService.createDesigners({ ...designer, image_url: null, featured: false })
    created += 1
    console.log(`Created designer ${designer.slug}`)
  }

  console.log(`Done. Created ${created}/${DESIGNERS.length} designer(s).`)
}
