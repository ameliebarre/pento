/**
 * Second batch (10) of 30 additional designers, matching the Arne Jacobsen
 * quality bar: full-length biography, quote, dates, and a granular career
 * timeline. Movement links and similar_designers are filled by separate
 * scripts once every designer in all three batches exists.
 *
 *   npx medusa exec ./src/scripts/seed-additional-designers-batch2.ts
 */
import type { ExecArgs } from "@medusajs/framework/types"
import { DESIGNER_MODULE } from "../modules/designer"
import type DesignerModuleService from "../modules/designer/service"

type TimelineEntry = { date: string; title: string; subtitle: string; description: string }
type DesignerInput = {
  slug: string
  first_name: string
  last_name: string
  nationality: string
  birth_date: Date
  death_date: Date | null
  quote: string
  biography: string
  timeline: TimelineEntry[]
}

const DESIGNERS: DesignerInput[] = [
  {
    slug: "borge-mogensen",
    first_name: "Børge",
    last_name: "Mogensen",
    nationality: "Denmark",
    birth_date: new Date("1914-04-13"),
    death_date: new Date("1972-10-05"),
    quote: "Furniture should be designed for people, not for exhibitions.",
    biography:
      "Børge Mogensen was born in Aalborg, Denmark, in 1914 and trained first as a cabinetmaker before studying furniture design at the Royal Danish Academy of Fine Arts under Kaare Klint, absorbing his teacher's insistence on measured proportion and historical study. Unlike many of his Danish contemporaries who designed primarily for an upper-middle-class clientele and craft-focused cabinetmakers, Mogensen became, from 1942, the chief furniture designer for FDB, the purchasing association of Denmark's consumer cooperative movement, a role that committed him to designing well-made furniture that ordinary working families could actually afford.\n\nThis social mission shaped his entire career: his J39, nicknamed the \"People's Chair,\" used simple, honestly joined beech and a woven paper-cord seat to produce a dining chair inexpensive enough for mass distribution through FDB's cooperative stores while retaining genuine cabinetmaking quality, and it became one of the best-selling chairs in Danish history. Mogensen argued explicitly against furniture designed primarily to win awards or impress critics, insisting that functional honesty and affordability mattered more than formal novelty — a position that occasionally put him at odds with more exhibition-oriented contemporaries.\n\nAfter leaving FDB in 1950 to open his own design studio, Mogensen continued designing for a wide range of manufacturers, including Fredericia Furniture, producing works such as the deep, low-slung Spanish Chair of 1958, inspired by saddle leather and traditional Spanish furniture he encountered on his travels, and the rustic, practical Hunting Chair the same year. Though these later pieces sold to a broader international market than his FDB work, they retained his consistent emphasis on robust joinery, natural materials and long-term durability over fashion.\n\nMogensen died in Copenhagen in 1972, and Fredericia Furniture continues to manufacture many of his designs largely unchanged today. He is remembered as the Danish Modern designer most explicitly committed to furniture as a form of social good rather than luxury craft, a conviction inherited directly from his years designing for a cooperative movement rather than a private gallery clientele.",
    timeline: [
      { date: "1914", title: "Born in Aalborg", subtitle: "Aalborg, Denmark", description: "Børge Mogensen is born and trains first as a cabinetmaker before pursuing formal furniture design education." },
      { date: "1936 – 1938", title: "Studying Under Kaare Klint", subtitle: "Royal Danish Academy of Fine Arts", description: "He studies furniture design under Kaare Klint, absorbing his teacher's method of measured proportion and historical study." },
      { date: "1942", title: "Joining FDB", subtitle: "A cooperative mission", description: "He becomes chief furniture designer for FDB, Denmark's consumer cooperative, committing his career to affordable, well-made furniture." },
      { date: "1947", title: "The J39 \"People's Chair\"", subtitle: "Mass accessibility", description: "His J39 dining chair, in beech with a woven paper-cord seat, becomes one of the best-selling chairs in Danish history." },
      { date: "1950", title: "Opening His Own Studio", subtitle: "Copenhagen, Denmark", description: "He leaves FDB to establish an independent design studio, continuing to design for a range of Danish manufacturers." },
      { date: "1953", title: "The Hunting Chair", subtitle: "Rustic practicality", description: "His Hunting Chair, with its leather seat and simple oak frame, reflects his continued preference for rugged, honest construction." },
      { date: "1958", title: "The Spanish Chair", subtitle: "Inspired by travel", description: "Drawing on saddle leather and traditional Spanish furniture encountered on his travels, he designs the deep, low-slung Spanish Chair for Fredericia." },
      { date: "1960s", title: "Expanding with Fredericia Furniture", subtitle: "A long partnership", description: "His continued collaboration with Fredericia Furniture extends his furniture to an increasingly international market." },
      { date: "1960s", title: "A Voice for Affordability", subtitle: "A consistent philosophy", description: "He continues publicly arguing that furniture should serve ordinary households rather than chase exhibition acclaim." },
      { date: "1972", title: "Death in Copenhagen", subtitle: "A social legacy", description: "Mogensen dies in Copenhagen; Fredericia Furniture continues to produce many of his designs largely unchanged today." },
    ],
  },
  {
    slug: "nanna-ditzel",
    first_name: "Nanna",
    last_name: "Ditzel",
    nationality: "Denmark",
    birth_date: new Date("1923-10-06"),
    death_date: new Date("2005-06-13"),
    quote: "I never design a piece of furniture without first asking how it will be lived with.",
    biography:
      "Nanna Ditzel was born in Copenhagen in 1923 and trained as a cabinetmaker before studying furniture design at the School of Arts and Crafts, where she met her first husband, the designer Jørgen Ditzel, with whom she began a close creative partnership that lasted until his death in 1961. Together the couple designed furniture, jewellery and textiles through the 1950s, entering and winning numerous Copenhagen Cabinetmakers' Guild exhibitions at a time when the Danish furniture establishment remained overwhelmingly male and the Ditzels' joint authorship was sometimes attributed to Jørgen alone.\n\nFollowing Jørgen's death, Nanna continued designing independently, becoming one of the only prominent women working at the centre of Denmark's furniture industry during its mid-century golden age. Her best-known design, the Hanging Egg Chair of 1959, woven in cane and suspended from a chain, combined a sculptural, almost basket-like silhouette with genuine structural ingenuity, and remains one of the most recognisable pieces of Danish furniture from the period, in continuous production decades later.\n\nDitzel relocated to London in the 1960s, where she continued working across furniture, textiles and jewellery while remaining connected to Danish manufacturers, and increasingly experimented with newer industrial materials including moulded plastic and laminated plywood, a departure from the solid-wood cabinetmaking tradition that had defined her earlier career. Her later work for companies including Fredericia Furniture and Bonaveri continued this experimentation well into her seventies, including a cork-and-aluminium furniture series exploring recycled and sustainable materials.\n\nShe died in Copenhagen in 2005, having worked continuously for over fifty years across a strikingly wide range of materials and styles. Long less internationally celebrated than her male contemporaries during her working life, Ditzel has since been the subject of major retrospectives recognising her as one of the defining and most versatile figures of Danish design's twentieth century.",
    timeline: [
      { date: "1923", title: "Born in Copenhagen", subtitle: "Copenhagen, Denmark", description: "Nanna Ditzel is born and trains as a cabinetmaker before studying furniture design at the School of Arts and Crafts." },
      { date: "1946", title: "Marrying Jørgen Ditzel", subtitle: "A creative partnership", description: "She marries fellow designer Jørgen Ditzel, beginning a close professional collaboration in furniture, jewellery and textiles." },
      { date: "1950s", title: "Cabinetmakers' Guild Exhibitions", subtitle: "Copenhagen, Denmark", description: "The Ditzels win numerous prizes at the Copenhagen Cabinetmakers' Guild exhibitions, though joint authorship is sometimes attributed to Jørgen alone." },
      { date: "1957", title: "The Butterfly Chair", subtitle: "A sculptural dining chair", description: "Designed with Jørgen, this moulded chair reflects the couple's growing interest in sculptural, organic forms." },
      { date: "1959", title: "The Hanging Egg Chair", subtitle: "A signature design", description: "Her woven cane chair, suspended from a chain, becomes her most recognisable and enduring design." },
      { date: "1961", title: "Death of Jørgen Ditzel", subtitle: "A personal loss", description: "Following her husband's death, Nanna continues designing independently, becoming one of the few prominent women in Danish furniture." },
      { date: "1960s", title: "Relocating to London", subtitle: "A new base", description: "She moves to London while remaining connected to Danish manufacturers, broadening her international practice." },
      { date: "1970s – 1980s", title: "Experimenting with New Materials", subtitle: "Beyond solid wood", description: "She increasingly works with moulded plastic and laminated plywood, departing from the cabinetmaking tradition of her earlier career." },
      { date: "1990s", title: "A Late Sustainability Focus", subtitle: "Cork and aluminium", description: "Well into her seventies, she develops a furniture series exploring recycled cork and aluminium, continuing to experiment with material." },
      { date: "2005", title: "Death in Copenhagen", subtitle: "A reclaimed legacy", description: "Ditzel dies in Copenhagen; later retrospectives recognise her as one of the defining and most versatile figures of Danish design." },
    ],
  },
  {
    slug: "bruno-mathsson",
    first_name: "Bruno",
    last_name: "Mathsson",
    nationality: "Sweden",
    birth_date: new Date("1907-01-23"),
    death_date: new Date("1988-05-20"),
    quote: "A chair should be built for the body that will sit in it, not for the eye that will look at it.",
    biography:
      "Bruno Mathsson was born in 1907 in Värnamo, a small town in the Swedish furniture-making region of Småland, into a family of cabinetmakers, and trained in his father's workshop rather than through formal design schooling. From the early 1930s he began systematically studying human posture and body pressure using contemporary medical research, experimenting with bent laminated wood and woven webbing to produce seating that supported the body's natural curve rather than forcing it into an upright, decorative posture.\n\nThis research produced the Pernilla lounge chair and the Eva chair in the mid-1930s, both built from a continuous bent-wood frame of laminated birch strips supporting a seat and back of woven hemp or flag webbing, engineered specifically to distribute a sitter's weight evenly rather than concentrate pressure at particular points — an explicitly ergonomic approach to furniture design that was unusually rigorous for its period and anticipated concerns that would not become mainstream in furniture design for decades. Manufactured through his family's firm in Värnamo, these chairs combined Mathsson's structural engineering with the warmth of natural materials, distinguishing his work from the colder tubular steel furniture associated with contemporary Bauhaus design.\n\nMathsson represented Sweden at several international exhibitions during the 1930s and found particular success in the United States, where his furniture was exhibited and sold through outlets including the New York department store associated with Scandinavian design imports, helping introduce American audiences to Swedish furniture years before Danish design achieved similar visibility. Beyond furniture, he also worked as an architect, designing several private houses, including his own glass-walled home in Värnamo, and later experimented with early solar-heating and energy-efficient building techniques in the 1970s, a comparatively unusual preoccupation for a furniture designer of his generation.\n\nHe continued refining and producing his furniture through the family firm for most of his career, maintaining close control over manufacturing quality. Mathsson died in Värnamo in 1988, and his Pernilla and Eva chairs remain in production today by Swedish manufacturer Dux, regarded as some of the clearest early expressions of ergonomic thinking in modern furniture design.",
    timeline: [
      { date: "1907", title: "Born in Värnamo", subtitle: "Värnamo, Sweden", description: "Bruno Mathsson is born into a family of cabinetmakers in the Swedish furniture-making region of Småland." },
      { date: "1920s", title: "Training in the Family Workshop", subtitle: "Värnamo, Sweden", description: "He trains in his father's cabinetmaking workshop rather than through formal design schooling." },
      { date: "Early 1930s", title: "Studying the Body", subtitle: "An ergonomic method", description: "He begins systematically studying posture and body pressure using contemporary medical research to inform his furniture." },
      { date: "1934", title: "The Eva Chair", subtitle: "A bent-wood breakthrough", description: "His laminated bent-birch chair with a woven webbing seat distributes the sitter's weight evenly, an unusually rigorous ergonomic design." },
      { date: "1936", title: "The Pernilla Chair", subtitle: "A reclining refinement", description: "His adjustable reclining lounge chair extends the same ergonomic principles to a more relaxed seating position." },
      { date: "1930s", title: "International Exhibitions", subtitle: "Representing Sweden", description: "He represents Sweden at international exhibitions, gaining early recognition for Swedish furniture design abroad." },
      { date: "1930s – 1940s", title: "Success in the United States", subtitle: "An early American audience", description: "His furniture finds particular success in the American market, introducing US audiences to Swedish design years before Danish design's later prominence." },
      { date: "1940s – 1950s", title: "Working as an Architect", subtitle: "Private houses", description: "He designs several private houses, including his own glass-walled home in Värnamo, extending his practice beyond furniture." },
      { date: "1970s", title: "Early Solar Heating Experiments", subtitle: "Energy-efficient design", description: "He experiments with early solar-heating and energy-efficient building techniques, an unusual focus for a furniture designer of his era." },
      { date: "1988", title: "Death in Värnamo", subtitle: "A design still in production", description: "Mathsson dies in Värnamo; his Pernilla and Eva chairs remain in production by Swedish manufacturer Dux." },
    ],
  },
  {
    slug: "josef-frank",
    first_name: "Josef",
    last_name: "Frank",
    nationality: "Austria",
    birth_date: new Date("1885-07-15"),
    death_date: new Date("1967-01-08"),
    quote: "A home should not be designed. It should grow, just as a person grows.",
    biography:
      "Josef Frank was born in Baden bei Wien, Austria, in 1885 and studied architecture in Vienna, becoming associated early in his career with the city's modernist circles, including contributions to the Vienna Werkbund Estate housing exhibition of 1932, where he served as artistic director. Unlike the more doctrinaire functionalists of his generation, Frank grew increasingly critical of modernism's insistence on severe, undecorated surfaces, arguing instead for what he called \"accidentalism\": the belief that a home should accumulate furniture, pattern and colour gradually and informally over time, much as a person's life itself unfolds, rather than being imposed as a single coordinated design scheme.\n\nAs a Jewish architect, Frank recognised the growing danger of Austria's political climate early, and in 1933 he emigrated to Sweden with his Swedish-born wife, joining the Stockholm furnishing company Svenskt Tenn, where he became chief designer and remained for the rest of his career. At Svenskt Tenn he produced hundreds of furniture designs alongside an enormous body of textile patterns — dense, colourful prints depicting flowers, birds and fantastical botanical scenes — that directly contradicted the restrained, neutral palettes favoured by strict functionalists and instead celebrated pattern, colour and eclectic historical reference.\n\nFrank's furniture itself, including tables, cabinets and seating produced for Svenskt Tenn, drew eclectically on historical furniture forms from different periods and cultures, deliberately avoiding any single consistent stylistic signature in favour of pieces that could be mixed freely within a single interior — a philosophy explicitly opposed to the totalising \"complete design\" approach practised by contemporaries such as Alvar Aalto or Arne Jacobsen. He maintained this position even as Swedish Functionalism became the dominant national design orthodoxy through the 1930s and 1940s, positioning himself as an influential internal critic of the movement he worked within.\n\nFrank continued designing for Svenskt Tenn until his death in Stockholm in 1967, having spent over three decades as one of Sweden's most prolific designers despite never fully identifying with the country's dominant design ideology. His textile patterns, in particular, remain in continuous production today and are widely regarded as some of the most distinctive and commercially enduring fabric designs of the twentieth century.",
    timeline: [
      { date: "1885", title: "Born in Austria", subtitle: "Baden bei Wien, Austria", description: "Josef Frank is born and studies architecture in Vienna, becoming associated with the city's modernist circles." },
      { date: "1910s – 1920s", title: "Early Vienna Practice", subtitle: "Vienna, Austria", description: "He establishes an architectural practice in Vienna, designing housing and private commissions." },
      { date: "1932", title: "Vienna Werkbund Estate", subtitle: "Artistic Director", description: "He serves as artistic director of the Vienna Werkbund housing exhibition, a showcase of modernist residential design." },
      { date: "1933", title: "Emigrating to Sweden", subtitle: "Fleeing Austria", description: "Recognising the danger of Austria's political climate as a Jewish architect, Frank emigrates to Sweden with his Swedish wife." },
      { date: "1934", title: "Joining Svenskt Tenn", subtitle: "Stockholm, Sweden", description: "He becomes chief designer at the Stockholm furnishing company Svenskt Tenn, a role he holds for the rest of his career." },
      { date: "1930s – 1940s", title: "A Rejection of Severity", subtitle: "\"Accidentalism\"", description: "He develops his philosophy of accidentalism, arguing a home should accumulate furniture and pattern gradually rather than as one coordinated scheme." },
      { date: "1930s – 1960s", title: "Textile Patterns", subtitle: "Colour against restraint", description: "He produces hundreds of dense, colourful botanical textile patterns for Svenskt Tenn, directly opposing functionalism's neutral palettes." },
      { date: "1941 – 1946", title: "Wartime Years in New York", subtitle: "A temporary relocation", description: "He spends part of the Second World War in New York, continuing to design for Svenskt Tenn remotely." },
      { date: "1940s – 1950s", title: "An Eclectic Furniture Practice", subtitle: "Stockholm, Sweden", description: "His furniture for Svenskt Tenn draws on historical forms from varied periods and cultures, avoiding a single consistent style." },
      { date: "1967", title: "Death in Stockholm", subtitle: "A pattern that endures", description: "Frank dies in Stockholm; his textile patterns for Svenskt Tenn remain in continuous production today." },
    ],
  },
  {
    slug: "tapio-wirkkala",
    first_name: "Tapio",
    last_name: "Wirkkala",
    nationality: "Finland",
    birth_date: new Date("1915-06-02"),
    death_date: new Date("1985-05-19"),
    quote: "Nature is the best designer, and my task is simply to understand what it has already made.",
    biography:
      "Tapio Wirkkala was born in Hanko, Finland, in 1915 and trained as a sculptor at the Central School of Applied Arts in Helsinki, an education that shaped his lifelong habit of approaching design objects as sculptural forms first and functional products second. His breakthrough came in 1946, when he won the glassware manufacturer Iittala's design competition with the Kantarelli vase, its rippled, organically flared form directly inspired by the shape of a chanterelle mushroom — a piece that established both his signature biomorphic style and Finland's broader postwar reputation for sculptural glass design.\n\nWirkkala worked across an unusually wide range of materials over his career, designing not only for Iittala but also plywood furniture, cutlery for various manufacturers, and ceramics for the Finnish company Rosenthal, consistently returning to forms derived from natural phenomena: ice formations, tree bark, water ripples and mushroom gills recur throughout his work in glass, wood and metal alike. His laminated birch-plywood platters and bowls, hand-carved and finished to follow the grain of the wood itself, demonstrated the same sculptural sensitivity to material that defined his glasswork, treating each object as a unique response to its specific material rather than a fixed design applied uniformly across different substances.\n\nHe represented Finland with extraordinary success at the Milan Triennale exhibitions through the 1950s, winning multiple Grand Prix awards and helping establish the broader international reputation of Finnish design alongside contemporaries including Alvar Aalto, a success that brought Nordic design global visibility during the postwar decades. Wirkkala also designed consumer products with a more commercial reach, including the angular glass bottle for Finlandia vodka, introduced in 1970 and still recognised today as one of the most successful pieces of product design ever created for a spirits brand.\n\nWirkkala continued working prolifically across sculpture, glass, wood and industrial design until his death in Helsinki in 1985. He remains one of the most decorated figures in the history of Finnish design, celebrated for an unusually consistent artistic vision that treated nature's own forms as the primary source of inspiration across every material he touched.",
    timeline: [
      { date: "1915", title: "Born in Hanko", subtitle: "Hanko, Finland", description: "Tapio Wirkkala is born and trains as a sculptor at the Central School of Applied Arts in Helsinki." },
      { date: "1933 – 1936", title: "Studying Sculpture", subtitle: "Helsinki, Finland", description: "He studies sculpture, developing the sensitivity to form that shapes his entire later design career." },
      { date: "1946", title: "The Kantarelli Vase", subtitle: "A breakthrough design", description: "He wins Iittala's design competition with his rippled, mushroom-inspired Kantarelli vase, establishing his signature biomorphic style." },
      { date: "1951", title: "Milan Triennale Grand Prix", subtitle: "International recognition", description: "He wins a Grand Prix at the Milan Triennale, helping establish Finnish design's growing international reputation." },
      { date: "1950s", title: "Laminated Wood Objects", subtitle: "Carving with the grain", description: "He designs hand-carved laminated birch-plywood platters and bowls, following the natural grain of the wood." },
      { date: "1955", title: "Further Triennale Success", subtitle: "Milan, Italy", description: "He continues winning Grand Prix awards at successive Triennale exhibitions throughout the decade." },
      { date: "1956", title: "Designing for Rosenthal", subtitle: "Ceramics and ceramics design", description: "He begins designing ceramics for the German manufacturer Rosenthal, extending his material range beyond glass and wood." },
      { date: "1960s", title: "A Growing International Practice", subtitle: "Helsinki, Finland", description: "He continues working across cutlery, lighting and glassware for Finnish and international manufacturers." },
      { date: "1970", title: "The Finlandia Vodka Bottle", subtitle: "A commercial icon", description: "His angular glass bottle design for Finlandia vodka becomes one of the most recognised spirits packaging designs in the world." },
      { date: "1970s", title: "Continued Sculptural Work", subtitle: "A consistent vision", description: "He continues producing sculptural glass and wood objects, maintaining his lifelong focus on natural form." },
      { date: "1985", title: "Death in Helsinki", subtitle: "A decorated legacy", description: "Wirkkala dies in Helsinki, remembered as one of the most honoured figures in the history of Finnish design." },
    ],
  },
  {
    slug: "sori-yanagi",
    first_name: "Sori",
    last_name: "Yanagi",
    nationality: "Japan",
    birth_date: new Date("1915-06-29"),
    death_date: new Date("2011-12-25"),
    quote: "Beauty is not something to be sought after separately. It is born when an object truly fulfils its function.",
    biography:
      "Sori Yanagi was born in Tokyo in 1915, the son of Sōetsu Yanagi, the philosopher and founder of the Mingei movement, which celebrated the beauty of anonymous, handmade Japanese folk craft objects — pottery, textiles and tools made by ordinary artisans rather than named designers. Sori initially studied painting and architecture before working briefly in the studio of the French architect and furniture designer Charlotte Perriand during her visit to Japan in the early 1940s, an experience that introduced him directly to European industrial design thinking just as Japan was beginning to rebuild its own manufacturing industries after the Second World War.\n\nYanagi spent his career attempting to reconcile his father's Mingei philosophy, rooted in handcraft and anonymous tradition, with the demands of modern industrial mass production, arguing that a well-designed industrial object could carry the same quiet, functional beauty his father had identified in traditional folk crafts. This synthesis found its clearest expression in the Butterfly Stool of 1954, two curved sheets of moulded plywood joined by a brass stretcher to form a symmetrical, wing-like silhouette — a form derived partly from traditional Japanese torii gate proportions, manufactured using industrial moulding techniques, and now held in the permanent collections of major design museums worldwide.\n\nBeyond furniture, Yanagi designed a remarkably wide range of everyday industrial products throughout his career, including kitchen tools, cutlery, public seating and even manhole covers for Japanese municipalities, consistently applying the same principle that ordinary household objects deserved the same careful attention to proportion and material as a signature design piece. He established the Yanagi Design Institute in 1952, which continued producing both industrial products and furniture under his direction for decades, and later became the director of the Japan Folk Crafts Museum founded by his father, maintaining his lifelong connection to the Mingei tradition even as his own career moved toward industrial production.\n\nYanagi continued working into his nineties, and died in Tokyo in 2011. His career is widely regarded as the clearest bridge between traditional Japanese craft philosophy and twentieth-century industrial design, demonstrating that the two traditions his father's generation had treated as opposed could, in fact, be reconciled in a single body of work.",
    timeline: [
      { date: "1915", title: "Born in Tokyo", subtitle: "Tokyo, Japan", description: "Sori Yanagi is born the son of Sōetsu Yanagi, founder of the Mingei folk craft movement." },
      { date: "1936 – 1940", title: "Studying Painting and Architecture", subtitle: "Tokyo, Japan", description: "He studies at the Tokyo School of Fine Arts, initially focusing on painting before turning to design." },
      { date: "Early 1940s", title: "Working with Charlotte Perriand", subtitle: "A European influence", description: "He assists French designer Charlotte Perriand during her visit to Japan, gaining direct exposure to European industrial design thinking." },
      { date: "1950", title: "Entering Design Competitions", subtitle: "Postwar Japan", description: "He begins entering and winning Japanese industrial design competitions as the country rebuilds its manufacturing industries." },
      { date: "1952", title: "Founding the Yanagi Design Institute", subtitle: "Tokyo, Japan", description: "He establishes his own design studio, producing both industrial products and furniture under his direction." },
      { date: "1954", title: "The Butterfly Stool", subtitle: "Craft meets industry", description: "His moulded plywood stool, inspired partly by traditional torii gate proportions, becomes his most celebrated design." },
      { date: "1957", title: "Milan Triennale Gold Medal", subtitle: "International recognition", description: "The Butterfly Stool wins a gold medal at the Milan Triennale, bringing Yanagi international recognition." },
      { date: "1950s – 1970s", title: "Everyday Industrial Design", subtitle: "Beyond furniture", description: "He designs kitchen tools, cutlery, public seating and even manhole covers, applying careful proportion to ordinary objects." },
      { date: "1977", title: "Director, Japan Folk Crafts Museum", subtitle: "A family legacy continued", description: "He becomes director of the museum founded by his father, maintaining his connection to the Mingei tradition." },
      { date: "1980s – 1990s", title: "Continuing Design Practice", subtitle: "Tokyo, Japan", description: "He continues designing and directing his institute well into his seventies and eighties." },
      { date: "2011", title: "Death in Tokyo", subtitle: "A bridge between traditions", description: "Yanagi dies in Tokyo, remembered as the clearest bridge between Japanese craft philosophy and modern industrial design." },
    ],
  },
  {
    slug: "shiro-kuramata",
    first_name: "Shiro",
    last_name: "Kuramata",
    nationality: "Japan",
    birth_date: new Date("1934-11-29"),
    death_date: new Date("1991-02-01"),
    quote: "I want to create furniture that has no weight, that seems to float in space.",
    biography:
      "Shiro Kuramata was born in Tokyo in 1934 and studied woodworking and interior design before working for Japanese department stores and furniture companies in the 1950s, developing a practice that moved fluidly between interior design, furniture and retail spaces rather than committing to any single discipline. He opened his own design office in Tokyo in 1965, developing an increasingly experimental body of furniture that treated conventional materials — acrylic, steel mesh, drawers — in deliberately disorienting, dematerialised ways intended to make solid furniture appear weightless or transparent.\n\nHis furniture consistently pursued this sense of visual lightness: the 1970 Furniture in Irregular Forms series embedded cabinet drawers within a single uneven block, appearing to slide out of a form with no visible internal structure, while his 1986 How High the Moon armchair, constructed entirely from expanded nickel-plated steel mesh, rendered an entire upholstered armchair shape as a transparent, almost ghostly outline. His best-known piece, the 1988 Miss Blanche chair, suspended artificial red roses within a solid block of clear acrylic supported by aluminium legs, treating the chair as a kind of frozen, three-dimensional photograph rather than a conventional seat.\n\nIn 1981, Kuramata was invited by Ettore Sottsass to join the newly founded Memphis Group in Milan, becoming one of its few non-Italian members and bringing a distinctly Japanese sense of material restraint and conceptual minimalism to a movement otherwise associated with loud colour and pattern — his contributions to Memphis, though still experimental, tended toward transparency and monochrome rather than the group's characteristic maximalism. This international recognition extended his reputation well beyond Japan, and he continued to design acclaimed interiors for fashion designers including Issey Miyake, for whom he created a series of boutique interiors across multiple cities.\n\nKuramata died in Tokyo in 1991 at only fifty-six, from heart failure, while still working prolifically across furniture and interior design. His furniture, often produced only in small numbers given its experimental construction, is now held in major museum collections worldwide and is remembered for a singular preoccupation: making solid, functional furniture appear to defy its own physical weight.",
    timeline: [
      { date: "1934", title: "Born in Tokyo", subtitle: "Tokyo, Japan", description: "Shiro Kuramata is born and studies woodworking and interior design." },
      { date: "1950s", title: "Working for Department Stores", subtitle: "Tokyo, Japan", description: "He works for Japanese department stores and furniture companies, developing early interior design experience." },
      { date: "1965", title: "Opening His Own Studio", subtitle: "Tokyo, Japan", description: "He establishes his own design office, beginning an increasingly experimental furniture practice." },
      { date: "1970", title: "Furniture in Irregular Forms", subtitle: "A dematerialised cabinet", description: "His cabinet series embeds drawers within an uneven block, appearing to have no visible internal structure." },
      { date: "1976", title: "Early Acrylic Experiments", subtitle: "A signature material", description: "He begins working extensively with clear acrylic, developing the transparent aesthetic that would define his later furniture." },
      { date: "1981", title: "Joining Memphis", subtitle: "Milan, Italy", description: "Invited by Ettore Sottsass, Kuramata becomes one of the few non-Italian members of the Memphis Group." },
      { date: "1986", title: "How High the Moon", subtitle: "A transparent armchair", description: "His armchair made entirely of steel mesh renders an upholstered form as a weightless, ghostly outline." },
      { date: "1988", title: "Miss Blanche", subtitle: "Roses in acrylic", description: "His best-known chair suspends artificial roses within a block of clear acrylic, treating the chair as a frozen image." },
      { date: "1980s", title: "Designing for Issey Miyake", subtitle: "Fashion interiors", description: "He designs a series of boutique interiors for fashion designer Issey Miyake across multiple cities." },
      { date: "1991", title: "Death in Tokyo", subtitle: "A singular preoccupation", description: "Kuramata dies suddenly in Tokyo at fifty-six, remembered for furniture that seemed to defy its own physical weight." },
    ],
  },
  {
    slug: "michael-graves",
    first_name: "Michael",
    last_name: "Graves",
    nationality: "USA",
    birth_date: new Date("1934-07-09"),
    death_date: new Date("2015-03-12"),
    quote: "Decoration need not be applied ornament; it can be the very essence of a building or an object.",
    biography:
      "Michael Graves was born in Indianapolis, Indiana, in 1934 and studied architecture at the University of Cincinnati and Harvard before spending two years at the American Academy in Rome, an experience that instilled a lifelong attachment to classical proportion and historical reference that would later distinguish his work from the austere modernism dominant in American architecture schools. In the early 1970s he was grouped with four other architects, including Peter Eisenman and Richard Meier, as the \"New York Five,\" known initially for crisp, white, Corbusian-influenced residential architecture — a style Graves soon abandoned for a far more decorative and historically referential language.\n\nGraves became one of Postmodernism's most prominent American architects through buildings such as the Portland Building, completed in 1982, a municipal office tower whose applied keystone motifs, pastel colour bands and oversized classical ornament directly and controversially rejected the glass-and-steel modernist orthodoxy that had dominated American civic architecture for decades. The building proved deeply divisive among critics even as it won Graves major new commissions, including a long relationship designing hotels and buildings for the Walt Disney Company, among them the brightly coloured, swan-and-dolphin-topped Walt Disney World Swan and Dolphin Resort hotels in Florida.\n\nIn 1985, Graves extended his architectural sensibility to product design with the Alessi 9093 kettle, its whistling spout topped with a small red plastic bird — a playful, overtly decorative object that became one of the best-selling kettles ever produced and introduced his work to a mass consumer audience well beyond architecture circles. He went on to design hundreds of household products for Alessi, Target and other retailers, extending Postmodernism's embrace of colour, ornament and wit into everyday domestic objects at accessible price points.\n\nIn 2003, Graves contracted a spinal infection that left him paralysed from the chest down, a life-altering event that redirected much of his later career toward designing accessible furniture, healthcare equipment and universal design products informed by his own experience of disability. He continued working and advocating for design that served people with mobility impairments until his death in Princeton, New Jersey, in 2015, having moved across his career from controversial civic monuments to some of the most widely distributed consumer products of the late twentieth century.",
    timeline: [
      { date: "1934", title: "Born in Indianapolis", subtitle: "Indianapolis, Indiana", description: "Michael Graves is born and studies architecture at the University of Cincinnati and Harvard." },
      { date: "1960", title: "The American Academy in Rome", subtitle: "A classical education", description: "He spends two years in Rome, developing a lasting attachment to classical proportion and historical architectural reference." },
      { date: "1964", title: "Founding His Practice", subtitle: "Princeton, New Jersey", description: "He establishes his own architectural practice while teaching at Princeton University." },
      { date: "1972", title: "The New York Five", subtitle: "An early modernist phase", description: "He is grouped with four other architects as the \"New York Five,\" known for crisp, white Corbusian-influenced residential work." },
      { date: "1970s", title: "A Decorative Turn", subtitle: "Breaking from modernism", description: "Graves abandons his earlier severe style for an increasingly decorative, historically referential architectural language." },
      { date: "1982", title: "The Portland Building", subtitle: "Portland, Oregon", description: "His municipal office tower, with its applied ornament and pastel colour bands, becomes one of Postmodernism's most prominent and divisive buildings." },
      { date: "1980s", title: "Designing for Disney", subtitle: "Florida, United States", description: "He designs the Walt Disney World Swan and Dolphin Resort hotels, extending his playful style into hospitality architecture." },
      { date: "1985", title: "The Alessi 9093 Kettle", subtitle: "A mass consumer icon", description: "His whistling kettle, topped with a small bird-shaped whistle, becomes one of the best-selling kettles ever produced." },
      { date: "1990s", title: "Expanding Product Design", subtitle: "Target and beyond", description: "He designs hundreds of household products for retailers including Target, bringing Postmodern colour and wit to accessible price points." },
      { date: "2003", title: "A Spinal Infection", subtitle: "A life redirected", description: "An illness leaves Graves paralysed from the chest down, redirecting much of his later career toward accessible and healthcare design." },
      { date: "2015", title: "Death in Princeton", subtitle: "A varied legacy", description: "Graves dies in Princeton, New Jersey, remembered for moving from controversial civic monuments to some of the era's most widely owned consumer products." },
    ],
  },
  {
    slug: "robert-venturi",
    first_name: "Robert",
    last_name: "Venturi",
    nationality: "USA",
    birth_date: new Date("1925-06-25"),
    death_date: new Date("2018-09-18"),
    quote: "Less is a bore.",
    biography:
      "Robert Venturi was born in Philadelphia in 1925 and studied architecture at Princeton University before working briefly in the offices of Eero Saarinen and Louis Kahn, two architects whose very different approaches to form and history left a lasting mark on his thinking. In 1966 he published Complexity and Contradiction in Architecture, a landmark book arguing directly against the reductive, \"less is more\" purity of Miesian modernism, instead championing architecture that embraced ambiguity, historical reference, ordinary vernacular building and even outright contradiction — a text now widely regarded as one of the founding theoretical statements of architectural Postmodernism.\n\nHis professional and intellectual partnership with the architect and urban planner Denise Scott Brown, whom he married in 1967, proved foundational to his most significant work: their 1972 book Learning from Las Vegas, co-written with Steven Izenour, treated the city's commercial strip of casino signage and roadside architecture not as an object of elite scorn but as a legitimate, information-rich vernacular worth serious architectural study, a provocative inversion of modernist design orthodoxy that proved deeply influential across architecture schools. Venturi's own built work, including the Vanna Venturi House designed for his mother in Chelsham, Pennsylvania, in 1964, used a deliberately broken, oversized classical pediment and asymmetrical façade to embody his \"complexity and contradiction\" theories in built form years before Postmodernism became a recognised movement.\n\nThrough his firm, eventually renamed Venturi, Scott Brown and Associates, the couple completed major institutional commissions including the Sainsbury Wing extension to the National Gallery in London, its historically referential stone façade designed to defer respectfully to the museum's original neoclassical building rather than compete with it. Beyond architecture, Venturi and Scott Brown also designed furniture, including a 1984 collection for Knoll whose silhouettes directly quoted historical furniture styles — Chippendale, Queen Anne, Art Deco — rendered in brightly coloured laminate, applying their architectural theories of historical quotation directly to furniture design.\n\nIn 1991, Venturi was awarded the Pritzker Prize, architecture's highest honour, a decision later widely criticised, including by Venturi himself, for recognising him alone rather than jointly with Scott Brown, whose contributions to their shared intellectual and built work were by most accounts equally significant. He died in Philadelphia in 2018, having helped establish the theoretical foundations that made Postmodern architecture and design possible.",
    timeline: [
      { date: "1925", title: "Born in Philadelphia", subtitle: "Philadelphia, Pennsylvania", description: "Robert Venturi is born and studies architecture at Princeton University." },
      { date: "1950s", title: "Working for Saarinen and Kahn", subtitle: "Formative influences", description: "He works briefly in the offices of Eero Saarinen and Louis Kahn before establishing his own practice." },
      { date: "1964", title: "Vanna Venturi House", subtitle: "Chelsham, Pennsylvania", description: "His house designed for his mother, with its broken pediment and asymmetrical façade, embodies his emerging theories years ahead of Postmodernism's recognition as a movement." },
      { date: "1966", title: "Complexity and Contradiction in Architecture", subtitle: "A founding text", description: "He publishes his influential book arguing against modernist purity in favour of ambiguity and historical reference." },
      { date: "1967", title: "Marrying Denise Scott Brown", subtitle: "A defining partnership", description: "He marries architect and urban planner Denise Scott Brown, beginning a foundational professional collaboration." },
      { date: "1972", title: "Learning from Las Vegas", subtitle: "With Denise Scott Brown", description: "Co-written with Scott Brown and Steven Izenour, this book treats Las Vegas's commercial strip as a legitimate subject of architectural study." },
      { date: "1980s", title: "Sainsbury Wing Commission", subtitle: "London, England", description: "The firm wins the commission to extend the National Gallery, designing a façade that defers respectfully to the original building." },
      { date: "1984", title: "Furniture for Knoll", subtitle: "Historical quotation", description: "Venturi and Scott Brown design a furniture collection for Knoll that quotes historical styles in brightly coloured laminate." },
      { date: "1991", title: "The Pritzker Prize", subtitle: "A controversial honour", description: "Venturi receives architecture's highest honour alone, a decision later criticised for not jointly recognising Denise Scott Brown." },
      { date: "2018", title: "Death in Philadelphia", subtitle: "A theoretical legacy", description: "Venturi dies in Philadelphia, remembered for establishing the theoretical foundations that made Postmodern design possible." },
    ],
  },
  {
    slug: "michele-de-lucchi",
    first_name: "Michele",
    last_name: "De Lucchi",
    nationality: "Italy",
    birth_date: new Date("1951-12-08"),
    death_date: null,
    quote: "Design is a way to give a soul to machines.",
    biography:
      "Michele De Lucchi was born in Ferrara, Italy, in 1951 and studied architecture at the University of Florence, graduating in 1975 into the politically charged environment of Italian Radical Design, where he became associated with the provocative, anti-consumerist collective Cavart before joining the Milan design group Alchimia in 1978 alongside Ettore Sottsass and Alessandro Mendini, experimenting with deliberately kitsch materials and forms intended to question the design industry's assumptions about taste and good form.\n\nIn 1981, De Lucchi became one of the founding members of Memphis, the Milan collective Sottsass assembled to pursue a more commercially viable version of Radical Design's provocations, contributing brightly coloured, geometrically playful furniture and lighting that helped define the group's international visual identity through the early 1980s. His own design sensibility, however, gradually moved away from Memphis's maximalism toward a more restrained, considered functionalism as the decade progressed, reflecting a broader pattern among several of the collective's younger members.\n\nHis most commercially successful and enduring design, the Tolomeo desk lamp, created in 1987 with engineer Giancarlo Fassina for Artemide, used a refined counterweight and pulley mechanism derived from technical drafting lamps to create an elegantly adjustable, almost architectural reading light; it became one of the best-selling lamps in design history and remains in continuous production, widely imitated but rarely matched for its mechanical precision. The lamp's restrained aluminium form stood in deliberate contrast to the loud plastic laminates of his earlier Memphis work, marking his decisive shift toward a quieter design language.\n\nFrom the 1990s onward, De Lucchi increasingly focused on architecture and brand identity work for major corporations, including extensive projects for Deutsche Bank, Enel, Poste Italiane and Intesa Sanpaolo, applying a consistent, humane design sensibility to banking interiors, retail environments and corporate branding at a scale far removed from his early radical furniture experiments. He continues to practise through his Milan studio AMDL Circle, remaining one of the few designers to have moved credibly from the provocations of Radical Design and Memphis through to mainstream corporate architecture over a single, continuous career.",
    timeline: [
      { date: "1951", title: "Born in Ferrara", subtitle: "Ferrara, Italy", description: "Michele De Lucchi is born and studies architecture at the University of Florence." },
      { date: "1975", title: "Joining Cavart", subtitle: "Radical Design beginnings", description: "He graduates into Italy's Radical Design movement, joining the provocative, anti-consumerist collective Cavart." },
      { date: "1978", title: "Joining Alchimia", subtitle: "With Sottsass and Mendini", description: "He joins the Milan design group Alchimia, experimenting with deliberately kitsch materials alongside Ettore Sottsass and Alessandro Mendini." },
      { date: "1981", title: "Founding Member of Memphis", subtitle: "Milan, Italy", description: "He becomes a founding member of the Memphis Group, contributing brightly coloured, geometrically playful furniture and lighting." },
      { date: "1980s", title: "A Gradual Restraint", subtitle: "Moving beyond Memphis", description: "His design sensibility gradually shifts from Memphis's maximalism toward a more considered, restrained functionalism." },
      { date: "1987", title: "The Tolomeo Lamp", subtitle: "With Giancarlo Fassina", description: "Designed for Artemide, his counterweighted desk lamp becomes one of the best-selling lamps in design history." },
      { date: "1990s", title: "Turning to Architecture", subtitle: "A widening practice", description: "He increasingly focuses on architecture and interior design for major corporate clients." },
      { date: "1990s – 2000s", title: "Corporate Identity Projects", subtitle: "Deutsche Bank, Enel, Poste Italiane", description: "He undertakes extensive branding and interior projects for major European banking, utility and postal corporations." },
      { date: "2015", title: "Founding AMDL Circle", subtitle: "Milan, Italy", description: "He consolidates his practice under the studio AMDL Circle, continuing architecture, product and brand design work." },
      { date: "Present", title: "An Ongoing Practice", subtitle: "Milan, Italy", description: "De Lucchi continues to practise, remaining one of the few designers to move credibly from Radical Design provocations to mainstream corporate architecture." },
    ],
  },
]

export default async function seedAdditionalDesignersBatch2({ container }: ExecArgs) {
  const designerModuleService: DesignerModuleService = container.resolve(DESIGNER_MODULE)

  let created = 0
  for (const designer of DESIGNERS) {
    const [existing] = await designerModuleService.listDesigners({ slug: designer.slug })
    if (existing) {
      console.log(`Skipping ${designer.slug}: already exists`)
      continue
    }
    await designerModuleService.createDesigners({
      ...designer,
      timeline: { entries: designer.timeline },
      image_url: null,
      featured: false,
    })
    created += 1
    console.log(`Created designer ${designer.slug}`)
  }

  console.log(`Done. Created ${created}/${DESIGNERS.length} designer(s).`)
}
