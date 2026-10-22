/**
 * Brings the 14 pre-existing designers (everyone except Arne Jacobsen, who
 * is already the flagship-complete reference, and the 15 designers from
 * seed-influential-designers.ts, already expanded separately) up to the
 * same depth: a full-length biography, in_focus, and similar_designers.
 *
 * Also fixes a format regression: several of these designers still carry
 * timelines in the old {year, eyebrow, image_url} shape from before the
 * house convention was corrected to {date, title, subtitle, description}.
 * Those are rewritten here; achille-castiglioni and philippe-starck are
 * already in the current format with rich timelines and are left alone.
 *
 *   npx medusa exec ./src/scripts/expand-existing-designers.ts
 */
import type { ExecArgs } from "@medusajs/framework/types"
import { DESIGNER_MODULE } from "../modules/designer"
import type DesignerModuleService from "../modules/designer/service"

type TimelineEntry = { date: string; title: string; subtitle: string; description: string }
type InFocus = { title: string; image_url: null; paragraphs: string[] }

type Update = {
  slug: string
  biography: string
  timeline?: TimelineEntry[]
  inFocus: InFocus
  similarDesignerSlugs: string[]
}

const UPDATES: Update[] = [
  {
    slug: "achille-castiglioni",
    similarDesignerSlugs: ["pier-giacomo-castiglioni", "vico-magistretti", "joe-colombo"],
    inFocus: {
      title: "Arco Floor Lamp – 1962",
      image_url: null,
      paragraphs: [
        "Designed with his brother Pier Giacomo for Flos, the Arco lamp solves a single, specific problem: how to bring the quality of an overhead pendant light to a dining table without running wiring through the ceiling or committing to a fixed position in the room.",
        "A sweeping stem of brushed steel, counterbalanced by a block of heavy Carrara marble pierced with a hole sized for a broom handle so two people could carry it, lets the lamp's light source arc nearly three metres from its base — an engineering solution disguised as a piece of sculpture.",
        "Still produced by Flos largely unchanged more than sixty years later, Arco remains the clearest single demonstration of the Castiglioni brothers' method: dismantling a familiar problem, in this case the fixed ceiling light, until an unexpected mechanical answer presented itself.",
      ],
    },
    biography:
      "Achille Castiglioni was born in Milan in 1918 into an already creative household — his father Giannino was a sculptor — and graduated in architecture from the Milan Polytechnic in 1944, his studies interrupted by wartime service as an artillery officer in Greece and Sicily. He joined the design studio already run by his older brothers, Livio and Pier Giacomo, entering a practice that moved fluidly between architecture, exhibition design and industrial products in the optimistic, rebuilding years of postwar Italy.\n\nFrom 1952, when Livio departed to establish his own practice, Achille worked in close and prolific partnership with Pier Giacomo until his brother's sudden death in 1968, after which Achille continued designing alone for more than three decades. Castiglioni approached design as a form of applied curiosity, dismantling everyday objects — a tractor seat, a car headlight, a bicycle saddle — to understand their function before reassembling them with wit and an economy of means that became his signature. This method produced some of the most celebrated objects in twentieth-century design: the Mezzadro stool of 1957, the Toio lamp, the sculptural Sanluca armchair of 1960, and the Arco floor lamp of 1962, whose marble base and sweeping steel arm brought overhead light to a table without a ceiling fixture.\n\nAlongside his design practice, Castiglioni taught industrial design for decades, first at the Politecnico di Torino and later at the Politecnico di Milano, shaping generations of Italian designers through a pedagogy built entirely around close observation of ordinary objects. He was awarded the Compasso d'Oro, Italy's highest design honour, more times than any other designer, for work ranging from lighting and furniture to the Dry cutlery collection for Alessi and hospital equipment for Omsa — a range that reflected his belief that no object was too mundane to deserve careful thought.\n\nCastiglioni died in Milan in 2002 at the age of eighty-four. The Milan studio he shared with Pier Giacomo at Piazza Castello 27, preserved today by the Achille Castiglioni Foundation, remains filled with the found objects and prototypes that fed a design practice built on curiosity rather than theory.",
  },
  {
    slug: "ettore-sottsass",
    similarDesignerSlugs: ["gaetano-pesce", "joe-colombo", "marco-zanuso"],
    inFocus: {
      title: "Memphis Milano – 1981",
      image_url: null,
      paragraphs: [
        "Founded in Sottsass's Milan apartment in December 1980 and first shown publicly the following year, Memphis was a collective of young architects and designers united around a deliberate rejection of modernist \"good taste\" — bold primary colours, plastic laminates printed with artificial patterns, and asymmetric, almost cartoonish forms.",
        "Sottsass's own Carlton room divider, a brightly coloured totem of shelves and angles that resembles furniture only reluctantly, became the group's most reproduced single object, as much a manifesto as a piece of storage.",
        "Though the group itself formally disbanded by 1988, Memphis's visual language — considered kitsch and disposable by serious critics at the time — resurfaced decades later as a direct reference point for an entire generation of contemporary designers, vindicating Sottsass's conviction that design was entitled to be playful, loud and openly emotional.",
      ],
    },
    biography:
      "Ettore Sottsass was born in Innsbruck, Austria, in 1917 to an Italian architect father, and the family later settled in Italy. He studied architecture at the Turin Polytechnic, graduating in 1939, before his studies were interrupted by the Second World War, during which he served in the Italian army and spent time in a prisoner-of-war camp in Yugoslavia — an experience he rarely discussed but which friends later described as having sharpened his restless, questioning approach to life and work. After the war he settled in Milan, opening his own design studio in 1947 and working initially across painting, ceramics and small-scale architecture.\n\nFrom 1958, Sottsass worked as a design consultant for Olivetti, a relationship that produced some of the most significant objects in the history of industrial design, including the Elea 9003 mainframe computer and, in 1969, the bright red Valentine typewriter — designed with the British designer Perry King as a portable, anti-institutional object explicitly intended, in Sottsass's words, to keep \"the bureaucrats company on a desert island,\" and which became a genuine symbol of pop culture rather than merely an office tool. A journey to India in 1961, undertaken partly to recover from a serious illness, exposed him to Eastern philosophy, spirituality and colour, profoundly reshaping the vivid, symbolic visual language that would define his later work.\n\nIn 1981, Sottsass founded the Memphis Group in Milan together with a collective of younger designers, launching a radical postmodern movement built on bold colour, clashing patterns and plastic laminates that deliberately rejected the restrained rationalism of the modernist generation before them. Though initially dismissed by many critics as a passing provocation, Memphis's uninhibited visual language proved enormously influential on later generations of designers working against minimalism.\n\nSottsass continued to practise architecture and design through his studio, Sottsass Associati, well into his eighties, producing furniture, glassware, jewellery and buildings guided by his consistent belief that an object should provoke feeling, not merely perform a function. He died in Milan on the last day of 2007, leaving one of the most expressive and influential bodies of work in contemporary design.",
  },
  {
    slug: "finn-juhl",
    similarDesignerSlugs: ["hans-j-wegner", "poul-kjaerholm", "arne-jacobsen"],
    inFocus: {
      title: "United Nations Trusteeship Council Chamber – 1952",
      image_url: null,
      paragraphs: [
        "Commissioned to design the interior of the Trusteeship Council Chamber at the newly built United Nations headquarters in New York, Finn Juhl produced one of the only Scandinavian interiors ever installed inside an internationally significant political institution, a rare diplomatic showcase for Danish design at the height of the Cold War.",
        "True to his sculptural instincts, Juhl designed the chamber's delegate seating, desks and public gallery furniture as a unified, calm composition in wood and leather, deliberately restrained so the room's furniture would support rather than compete with the gravity of the proceedings held inside it.",
        "The commission cemented Juhl's reputation in the United States as the most visible ambassador of Danish design during the 1950s, well before most of his domestic furniture had found commercial manufacturers willing to produce it at scale.",
      ],
    },
    biography:
      "Finn Juhl was born in Frederiksberg, Denmark, in 1912. He studied architecture at the Royal Danish Academy of Fine Arts under Kay Fisker, graduating in 1934, and spent over a decade working for the architect Vilhelm Lauritzen on major commissions including Copenhagen's Radio House, designing furniture only as a self-taught hobby alongside his salaried architectural work with no formal training in cabinetmaking or joinery.\n\nThat outsider's eye let him break decisively from the joinery-led tradition of Kaare Klint, which treated furniture-making as an almost scientific discipline of proportion derived from the human body. Juhl's chairs, including the Pelican Chair of 1940 and the Chieftain Chair of 1949, instead treated seat and frame as independent sculptural elements, the upholstered shell appearing almost to float free of its wooden structure — an approach initially controversial among Denmark's more conservative furniture establishment, who considered his work closer to abstract sculpture than sound craft.\n\nIn the 1950s, Juhl became the most visible ambassador of Danish design in the United States, exhibiting at Georg Jensen's New York store and designing the interiors of the United Nations Trusteeship Council Chamber in 1952, a rare diplomatic platform for Scandinavian design. His own house in the Copenhagen suburb of Ordrup, designed and built for himself in 1942 and filled entirely with his own furniture, became an influential demonstration of his belief that a home's furnishings should be judged first as sculpture and only second as function.\n\nJuhl continued designing furniture, exhibitions and interiors into his seventies, though increasingly working with smaller manufacturers willing to accommodate his unconventional forms. He died in Copenhagen in 1989. His Ordrup house is preserved today as a museum, maintained exactly as he left it, and remains one of the clearest surviving statements of his sculptural philosophy of furniture.",
    timeline: [
      { date: "1912", title: "Born in Frederiksberg", subtitle: "Denmark", description: "Finn Juhl is born and later studies architecture at the Royal Danish Academy of Fine Arts under Kay Fisker." },
      { date: "1934", title: "Graduating in Architecture", subtitle: "Copenhagen, Denmark", description: "He completes his architecture degree and joins the office of architect Vilhelm Lauritzen." },
      { date: "1934 – 1945", title: "Working for Vilhelm Lauritzen", subtitle: "Radio House, Copenhagen", description: "He works on major architectural commissions, including Copenhagen's Radio House, while designing furniture as a self-taught sideline." },
      { date: "1940", title: "The Pelican Chair", subtitle: "A sculptural debut", description: "His enveloping Pelican Chair breaks sharply from Denmark's joinery-led furniture tradition." },
      { date: "1942", title: "Building His Own House", subtitle: "Ordrup, Denmark", description: "He designs and builds his own house in Ordrup, filling it entirely with his own furniture as a living demonstration of his ideas." },
      { date: "1945", title: "Opening an Architecture Practice", subtitle: "Copenhagen, Denmark", description: "He establishes his own independent practice, taking on both architectural and furniture commissions." },
      { date: "1949", title: "The Chieftain Chair", subtitle: "A defining design", description: "His Chieftain Chair, with its independent sculptural seat and frame, becomes one of his most celebrated works." },
      { date: "1951", title: "Good Design Award", subtitle: "United States", description: "His furniture receives the Good Design award in Chicago, raising his profile among American audiences." },
      { date: "1952", title: "United Nations Trusteeship Council Chamber", subtitle: "New York", description: "He designs the interior of the UN Trusteeship Council Chamber, a rare platform for Danish design on the world stage." },
      { date: "1950s", title: "Exhibiting at Georg Jensen", subtitle: "New York", description: "His furniture is shown at Georg Jensen's New York store, making him the most visible Danish designer in America." },
      { date: "1960s – 1970s", title: "Continuing Independent Practice", subtitle: "Smaller manufacturers", description: "He continues designing furniture and interiors, increasingly working with smaller manufacturers open to his unconventional forms." },
      { date: "1989", title: "Death in Copenhagen", subtitle: "A sculptural legacy", description: "Juhl dies in Copenhagen; his Ordrup house is later preserved as a museum, unchanged from how he left it." },
    ],
  },
  {
    slug: "florence-knoll",
    similarDesignerSlugs: ["eero-saarinen", "harry-bertoia", "isamu-noguchi", "ludwig-mies-van-der-rohe"],
    inFocus: {
      title: "CBS Headquarters Interiors – 1965",
      image_url: null,
      paragraphs: [
        "For the interior of Eero Saarinen's CBS Headquarters tower in New York, known to this day as \"Black Rock,\" Florence Knoll's Knoll Planning Unit designed every office floor as a single coordinated system — furniture, textiles, lighting and layout treated as one architectural decision rather than a sequence of separate purchases.",
        "The project distilled a method Knoll had been refining with American corporations since the 1940s: replacing the mismatched desks and heavy wood panelling common to prewar executive offices with lean, modular furniture arranged to reflect a company's actual working relationships rather than its org chart.",
        "Black Rock's interiors became a reference point for corporate America for decades afterward, and the commission remains the clearest built demonstration of the \"total design\" philosophy Knoll had spent her Cranbrook and Harvard training absorbing from Eliel Saarinen, Walter Gropius and Mies van der Rohe.",
      ],
    },
    biography:
      "Florence Knoll was born Florence Schust in Saginaw, Michigan, in 1917 and was orphaned by the age of twelve. She was raised and mentored by the architect Eliel Saarinen at the Cranbrook Academy of Art, where she grew up alongside the Saarinen family and formed a lifelong friendship with Eero Saarinen, before studying under Walter Gropius and Marcel Breuer at Harvard's Graduate School of Design and later working briefly in the Chicago office of Mies van der Rohe — three formative relationships with the founding figures of European modernism that shaped her lifelong insistence on architectural clarity in furniture and interior design.\n\nIn 1943 she joined the furniture manufacturer founded by Hans Knoll, establishing the Knoll Planning Unit to design complete interior environments — furniture, textiles and layout conceived as a single architectural system rather than a collection of separate purchases — for corporate clients including CBS, IBM and General Motors. She married Hans Knoll in 1946, and together they built Knoll into one of the defining names of American modernism, commissioning pieces from figures including Eero Saarinen, Isamu Noguchi and Harry Bertoia alongside her own rigorously architectural sofas, credenzas and tables, designed, in her words, to fill the gaps left by furniture that \"was not there.\"\n\nFollowing Hans Knoll's death in a car accident in 1955, Florence took over as president and creative director of the company, a rare position of authority for a woman in American business at the time, steering Knoll through a decade of major corporate commissions including the interiors of Eero Saarinen's CBS Headquarters tower in New York before retiring in 1965. Long overshadowed by the male designers whose work she herself commissioned and placed into the buildings she furnished, she is now recognised as one of the most influential interior architects of the twentieth century.\n\nShe died in Coral Gables, Florida, in January 2019, at the age of 101, having lived to see renewed scholarly and curatorial recognition of her central, defining role in shaping the look of postwar corporate America.",
    timeline: [
      { date: "1917", title: "Born in Saginaw", subtitle: "Saginaw, Michigan", description: "Florence Schust is born and is orphaned by the age of twelve." },
      { date: "1930s", title: "Growing Up at Cranbrook", subtitle: "Among the Saarinens", description: "She is raised and mentored by Eliel Saarinen at Cranbrook, growing up alongside the Saarinen family." },
      { date: "Late 1930s", title: "Studying Under Modernism's Founders", subtitle: "Harvard and Chicago", description: "She studies under Walter Gropius and Marcel Breuer at Harvard, then briefly works in Mies van der Rohe's Chicago office." },
      { date: "1943", title: "Joining Knoll", subtitle: "A new direction", description: "She joins the furniture company founded by Hans Knoll, bringing an architect's discipline to furniture design." },
      { date: "1943", title: "The Knoll Planning Unit", subtitle: "A design division is born", description: "She establishes the Knoll Planning Unit, designing complete interior environments for major American corporations." },
      { date: "1946", title: "Marrying Hans Knoll", subtitle: "A shared vision", description: "She marries Hans Knoll; together they build Knoll into a defining name of American modernism." },
      { date: "1955", title: "President and Creative Director", subtitle: "Taking the helm", description: "Following Hans Knoll's death in a car accident, Florence becomes president, a rare position for a woman at the time." },
      { date: "1961", title: "National Medal", subtitle: "Recognition", description: "She receives recognition for her contributions to American design and industry." },
      { date: "1965", title: "CBS Headquarters Interiors", subtitle: "New York", description: "The Knoll Planning Unit designs the interiors of Eero Saarinen's CBS Headquarters tower, a landmark corporate commission." },
      { date: "1965", title: "Retiring from Knoll", subtitle: "Stepping back", description: "Florence retires as president of Knoll after over two decades shaping the company's direction." },
      { date: "2019", title: "Death at 101", subtitle: "Coral Gables, Florida", description: "Florence Knoll dies in Coral Gables, remembered as a defining architect of American modernism." },
    ],
  },
  {
    slug: "george-nelson",
    similarDesignerSlugs: ["charles-eames", "ray-eames", "isamu-noguchi"],
    inFocus: {
      title: "The Action Office System – 1964",
      image_url: null,
      paragraphs: [
        "Developed for Herman Miller with designer Robert Propst, the Action Office system was conceived as a direct response to research showing that sitting still at a single fixed desk all day was both unhealthy and poorly suited to the varied tasks of modern office work — the original system actually encouraged movement between standing and seated positions across different furniture elements.",
        "Its modular wall panels, which allowed offices to be configured and reconfigured without rebuilding fixed walls, were intended to give individual workers privacy and a sense of ownership over flexible space, a genuinely progressive ambition for 1960s corporate America.",
        "Later, cheaper imitations stripped out the system's flexibility and ergonomic research while keeping its modular partition walls, creating the standardised cubicle farm that would become a mid-century design idea's most ironic legacy — a story Nelson and Propst both later regretted, having intended the opposite outcome for the American office worker.",
      ],
    },
    biography:
      "George Nelson was born in Hartford, Connecticut, in 1908 and studied architecture at Yale University, where he won the Rome Prize in 1932 and spent two years living and studying in Italy. During that period he wrote a series of interviews with leading European modernists — including Le Corbusier and Walter Gropius — for the American magazine Pencil Points, an early and direct education in modernist thinking that he absorbed as a journalist years before he designed a single piece of furniture himself.\n\nReturning to the United States, Nelson worked as an editor at Architectural Forum, where his 1945 article proposing a flexible \"storage wall\" for small postwar homes caught the attention of the furniture manufacturer Herman Miller. Despite having no formal training in product design, he was appointed the company's design director that same year, a role in which he not only designed furniture himself but also recruited the talent — including Charles and Ray Eames and Isamu Noguchi — who would collectively define Herman Miller's postwar identity, functioning as much as a curator and editor of other designers' work as a designer in his own right.\n\nThrough his own practice, George Nelson Associates, he produced some of the most recognisable objects of American modernism, among them the Ball Clock, the Marshmallow Sofa and the Coconut Chair, as well as the pioneering Action Office system developed with Robert Propst, which introduced the modular office furniture that would shape — and, through later cheap imitation, eventually distort — decades of corporate workplace design into the modern cubicle.\n\nNelson remained an unusually articulate public voice for design throughout his career, writing and lecturing widely on design's social responsibilities well beyond his own commercial output. George Nelson died in New York in 1986, remembered as both a prolific designer and one of modernism's most influential writers and editors, arguably as significant for the careers he enabled at Herman Miller as for the objects he designed himself.",
    timeline: [
      { date: "1908", title: "Born in Hartford", subtitle: "Hartford, Connecticut", description: "George Nelson is born and later studies architecture at Yale University." },
      { date: "1932 – 1934", title: "Two Years in Italy", subtitle: "A Rome Prize Fellowship", description: "He wins the Rome Prize and spends two years in Italy, deepening his understanding of European modernism." },
      { date: "1935", title: "Interviewing the Modernists", subtitle: "Pencil Points magazine", description: "He writes a landmark series of interviews with Le Corbusier, Walter Gropius and others for the magazine Pencil Points." },
      { date: "1944", title: "Editor at Architectural Forum", subtitle: "An editor's influence", description: "He works as an editor at Architectural Forum, where a 1945 article proposing a storage wall catches Herman Miller's attention." },
      { date: "1945", title: "Joining Herman Miller", subtitle: "A design director with no design training", description: "He is appointed Herman Miller's design director, a role in which he recruits talents including Charles and Ray Eames." },
      { date: "1947", title: "Founding George Nelson Associates", subtitle: "An independent practice", description: "He establishes his own design studio alongside his Herman Miller role, producing furniture, graphics and exhibitions." },
      { date: "1948", title: "The Ball Clock", subtitle: "A playful icon", description: "His Ball Clock, developed with colleagues at his studio, becomes one of the most recognisable clocks of the era." },
      { date: "1955", title: "The Coconut Chair", subtitle: "A sculptural lounge", description: "He designs the Coconut Chair, its shell-like form becoming one of the era's most recognisable silhouettes." },
      { date: "1956", title: "The Marshmallow Sofa", subtitle: "Modular seating", description: "His Marshmallow Sofa, made of individual upholstered discs, becomes an icon of playful postwar furniture design." },
      { date: "1964", title: "The Action Office System", subtitle: "Rethinking the office", description: "With Robert Propst, he introduces the Action Office system, a pioneering modular furniture system meant to encourage movement and flexibility." },
      { date: "1986", title: "Death in New York", subtitle: "An enduring influence", description: "George Nelson dies in New York, remembered as both a designer and one of modernism's most articulate writers." },
    ],
  },
  {
    slug: "hans-j-wegner",
    similarDesignerSlugs: ["arne-jacobsen", "finn-juhl", "poul-kjaerholm"],
    inFocus: {
      title: "The Round Chair, \"The Chair\" – 1949",
      image_url: null,
      paragraphs: [
        "Designed in 1949 and manufactured by Johannes Hansen, Wegner's Round Chair reduces a traditional wooden armchair to its structural essentials: a continuous curved top rail and arm in a single sweep of steam-bent oak or teak, supported by exceptionally refined joinery that leaves almost nothing to spare.",
        "The chair became internationally famous eleven years after its release, when it was used as the seating for the first televised American presidential debate in 1960 between John F. Kennedy and Richard Nixon — American newspapers, unable to identify the elegant wooden chair, simply began referring to it as \"The Chair,\" and the nickname stuck permanently.",
        "That accidental moment of television history did more to introduce Danish design to an American mass audience than any exhibition or magazine feature could have, making the Round Chair arguably the single most consequential item of furniture in establishing Scandinavian design's international reputation.",
      ],
    },
    biography:
      "Hans J. Wegner was born in Tønder, in southern Denmark, in 1914, the son of a shoemaker. He began an apprenticeship with a master cabinetmaker at the age of fourteen and qualified as a journeyman joiner before moving to Copenhagen to study furniture design at the School of Arts and Crafts under Orla Mølgaard-Nielsen, combining a craftsman's hands-on training with a formal design education in a way relatively rare among his Danish contemporaries. In the early 1940s he worked with the architects Arne Jacobsen and Erik Møller on the furnishings for Aarhus City Hall, before opening his own design studio in 1943.\n\nOver a career spanning more than five decades, Wegner designed close to 500 chairs in close collaboration with manufacturers including Johannes Hansen, Carl Hansen & Søn and PP Møbler, bringing a cabinetmaker's precision to every joint and curve and frequently building prototypes with his own hands to test a design before releasing it. His Round Chair of 1949 became known simply as \"The Chair\" after it was used in the televised 1960 United States presidential debate between John F. Kennedy and Richard Nixon, an accident of television history that brought international attention to Danish design more effectively than any exhibition could have. The following year's Wishbone Chair, its curved top rail and arm inspired by portraits of seated Ming dynasty Chinese officials, became one of the best-selling chairs ever produced and remains in continuous production today.\n\nWegner's insistence on functional honesty extended to a famous personal rule: a chair should have no back, meaning it should look considered and finished from every angle, not only the one most commonly photographed. He continued to design and build prototypes with his own hands well into old age, insisting that the comfort and structural integrity of a chair could only truly be judged by making it himself rather than approving a drawing.\n\nHe died in Gentofte, near Copenhagen, in January 2007, remembered as one of the defining craftsmen-designers of Danish Modern — a figure who, more than almost any of his contemporaries, never stopped working with wood himself even after achieving international fame.",
    timeline: [
      { date: "1914", title: "Born in Tønder", subtitle: "Tønder, Denmark", description: "Hans J. Wegner is born and apprentices with a master cabinetmaker at the age of fourteen." },
      { date: "1936 – 1938", title: "Studying Under Mølgaard-Nielsen", subtitle: "Learning to design", description: "He studies furniture design in Copenhagen under Orla Mølgaard-Nielsen, refining a craftsman's eye for proportion." },
      { date: "1940 – 1943", title: "Aarhus City Hall", subtitle: "Working with architects", description: "He works with architects Arne Jacobsen and Erik Møller on the furnishings for Aarhus City Hall." },
      { date: "1943", title: "Opening His Own Studio", subtitle: "Striking out alone", description: "He opens his own design studio, beginning a career-long collaboration with Danish cabinetmakers and manufacturers." },
      { date: "1949", title: "The Round Chair", subtitle: "A chair becomes \"The Chair\"", description: "He designs the Round Chair, later nicknamed \"The Chair\" after its appearance in the 1960 Kennedy–Nixon television debate." },
      { date: "1950", title: "The Wishbone Chair", subtitle: "Inspired by Ming dynasty portraits", description: "He draws on portraits of seated Ming dynasty officials to design the Wishbone Chair, one of the best-selling chairs ever made." },
      { date: "1960", title: "International Recognition", subtitle: "The Kennedy–Nixon debate", description: "The Round Chair's appearance in the first televised US presidential debate brings Danish design to an international audience." },
      { date: "1960s – 1980s", title: "Close to 500 Chairs", subtitle: "A prolific career", description: "He designs nearly 500 chairs over five decades, bringing a cabinetmaker's precision to every joint and curve." },
      { date: "1977", title: "Prince Henrik's Medal", subtitle: "Danish recognition", description: "He receives a prominent Danish honour recognising his lifelong contribution to design and craft." },
      { date: "1997", title: "The Freedom of the City", subtitle: "Honoured in Denmark", description: "Late in life, he continues to be celebrated in Denmark as a defining figure of the country's design heritage." },
      { date: "2007", title: "Death in Gentofte", subtitle: "A legacy in Danish Modern", description: "Wegner dies near Copenhagen, remembered as one of the defining craftsmen-designers of the twentieth century." },
    ],
  },
  {
    slug: "joe-colombo",
    similarDesignerSlugs: ["verner-panton", "gaetano-pesce", "vico-magistretti"],
    inFocus: {
      title: "The Total Furnishing Unit – 1971–1972",
      image_url: null,
      paragraphs: [
        "Shown at MoMA's landmark 1972 exhibition Italy: The New Domestic Landscape, Colombo's Total Furnishing Unit compressed an entire small dwelling's kitchen, bathroom, storage, bed and privacy screen into a single, continuous piece of rolling furniture roughly the size of a large wardrobe.",
        "Every function could be pulled out, folded down or rotated into place as needed and stowed away again when not in use, an extreme but genuinely functional answer to Colombo's long-standing interest in how shrinking urban living spaces could still support a full, comfortable domestic life.",
        "Though never mass-produced, the Total Furnishing Unit distilled everything Colombo had been exploring across smaller individual objects — the Tube Chair's combinable modularity, the Boby trolley's compact mobility — into a single, concentrated statement about adaptable living, completed only a year before his sudden death at forty-one.",
      ],
    },
    biography:
      "Joe Colombo was born in Milan in 1930 and initially trained in painting and sculpture at the Brera Academy before studying architecture at the Politecnico di Milano. His early involvement with the Movimento Nucleare, an avant-garde artistic movement reacting against the atomic age, encouraged an experimental approach that would later inform his design work in unexpected ways. Turning increasingly towards industrial design in the early 1960s after taking over his family's electrical equipment business, he developed a practice shaped by the technological optimism of the period, exploring how new materials and manufacturing methods could transform everyday domestic life.\n\nColombo approached furniture as part of a single, flexible living environment rather than as isolated objects, imagining pieces that could adapt to different spaces and changing habits over the course of a day. His Universale chair of 1965 explored the possibilities of fully injection-moulded plastic construction, while the 1969 Tube Chair used four combinable cylindrical foam elements to offer different seating configurations within a single product. Lighting designs such as Spider and Coupé combined expressive sculptural silhouettes with practical adjustability, while the compact, wheeled Boby storage trolley of 1970 became one of the best-selling design objects of the decade.\n\nBeyond individual products, Colombo's research extended to fully integrated domestic systems, culminating in ambitious projects such as the Visiona 1 installation for Bayer and the Total Furnishing Unit of 1971, which compressed essential household functions — kitchen, bathroom, storage and sleeping — into compact, carefully choreographed structures designed for minimal living space.\n\nAlthough often associated with the futuristic aesthetics of the 1960s, Colombo's work addressed enduring questions about mobility, limited urban space and the relationship between people and emerging technology, imagining homes that could evolve fluidly with their occupants' needs. He died in Milan in 1971, on his forty-first birthday, leaving an unusually concentrated decade-long body of work whose modular thinking and inventive forms continue to influence contemporary design.",
    timeline: [
      { date: "1930", title: "Born in Milan", subtitle: "Milan, Italy", description: "Joe Colombo is born and initially trains in painting and sculpture at the Brera Academy." },
      { date: "1949 – 1954", title: "Studying Architecture", subtitle: "Politecnico di Milano", description: "He studies architecture while remaining active in Milan's avant-garde art scene." },
      { date: "1951 – 1954", title: "Movimento Nucleare", subtitle: "An avant-garde beginning", description: "His involvement with this experimental artistic movement shapes his later approach to design and materials." },
      { date: "1959", title: "Taking Over the Family Business", subtitle: "A turn toward design", description: "After his father's death, he takes over the family's electrical equipment business, pivoting toward industrial design." },
      { date: "1962", title: "Opening a Design Studio", subtitle: "Milan, Italy", description: "He establishes his own design studio, focused on furniture, lighting and domestic systems." },
      { date: "1965", title: "The Universale Chair", subtitle: "A plastic experiment", description: "His Universale chair explores the possibilities of a chair moulded entirely from plastic." },
      { date: "1969", title: "The Tube Chair", subtitle: "Modular seating", description: "His Tube Chair uses combinable cylindrical foam elements to offer different seating configurations." },
      { date: "1970", title: "The Boby Trolley", subtitle: "A compact icon", description: "His wheeled, compartmentalised Boby storage trolley becomes one of the best-selling design objects of the decade." },
      { date: "1971 – 1972", title: "The Total Furnishing Unit", subtitle: "A compressed dwelling", description: "He designs a single rolling unit compressing an entire small dwelling's functions, shown at MoMA in 1972." },
      { date: "1971", title: "Death at Forty-One", subtitle: "A concentrated legacy", description: "Colombo dies in Milan on his forty-first birthday, leaving a dense decade-long body of inventive work." },
    ],
  },
  {
    slug: "ludwig-mies-van-der-rohe",
    similarDesignerSlugs: ["marcel-breuer", "le-corbusier", "florence-knoll"],
    inFocus: {
      title: "Seagram Building – 1958",
      image_url: null,
      paragraphs: [
        "Designed with Philip Johnson for a prominent site on Park Avenue in New York, the Seagram Building set its bronze-and-glass tower back from the street behind an open plaza — an unusual, costly gesture at the time that sacrificed rentable floor area purely to give the building room to be seen in full.",
        "Mies insisted on true bronze extrusions and hand-applied detailing rather than cheaper aluminium or steel substitutes wherever the budget allowed, extending the same obsession with material honesty and proportion that had defined the Barcelona Pavilion three decades earlier to the scale of a thirty-eight storey skyscraper.",
        "The building's influence proved almost too complete: within a decade, cheaper imitations of its glass-curtain-wall-and-plaza formula had been built in nearly every major city in the world, so thoroughly copying its surface logic while abandoning its material rigour that Mies's own achievement became difficult to see clearly behind the mediocre buildings it had inspired.",
      ],
    },
    biography:
      "Ludwig Mies van der Rohe was born in Aachen, Germany, in 1886, the son of a stonemason. With no formal architectural education, he trained in his father's workshop before moving to Berlin, where he apprenticed from 1908 to 1912 in the office of Peter Behrens alongside fellow future modernists Walter Gropius and Le Corbusier. There he absorbed both an industrial sense of rigour and, through his independent study of the Prussian architect Karl Friedrich Schinkel, a deep and lasting respect for classical proportion and structural clarity that would distinguish his work from more purely functionalist contemporaries.\n\nDuring the 1920s he became a leading figure of the European avant-garde, producing visionary, largely unbuilt glass skyscraper designs before realising the German Pavilion for the 1929 Barcelona International Exposition — a building of radical structural openness, demolished after the exposition and not rebuilt until 1986, that also introduced his now-iconic Barcelona chair, designed for the Spanish royal family's visit to the pavilion. He served as the Bauhaus's third and final director from 1930 until Nazi political pressure forced its closure in 1933, a position that placed him directly in the path of a regime openly hostile to modernist architecture, before emigrating to the United States in 1937 to lead the architecture school at Chicago's Armour Institute, later the Illinois Institute of Technology, where he also designed the entire campus from scratch.\n\nIn America, Mies distilled his ideas into an increasingly precise vocabulary of exposed steel and glass, realised in projects including the Farnsworth House, a nearly transparent glass box on steel columns that pushed minimalism to a point some clients found genuinely uninhabitable, the Lake Shore Drive Apartments in Chicago, and, with Philip Johnson, the bronze-and-glass Seagram Building in New York — a design that became the archetype copied by glass office towers worldwide for the following half-century.\n\nGuided by his credo \"less is more\" and his insistence that \"God is in the details,\" he remains one of the most influential architects of the twentieth century, as significant for the generation of American architects he trained in Chicago as for his own built work. He died in Chicago in 1969.",
    timeline: [
      { date: "1886", title: "Born in Aachen", subtitle: "Aachen, Germany", description: "Mies is born the son of a stonemason and trains in his father's workshop before moving to Berlin." },
      { date: "1908 – 1912", title: "Apprenticing with Peter Behrens", subtitle: "Berlin, Germany", description: "He works in Peter Behrens's office alongside Walter Gropius and Le Corbusier, absorbing an industrial rigour." },
      { date: "1920s", title: "Visionary Glass Towers", subtitle: "Unbuilt proposals", description: "He produces influential, largely unbuilt glass skyscraper designs that establish his reputation among the European avant-garde." },
      { date: "1929", title: "Barcelona Pavilion", subtitle: "A radical structure", description: "The German Pavilion for the Barcelona International Exposition introduces open-plan architecture and the Barcelona chair." },
      { date: "1930 – 1933", title: "Bauhaus Director", subtitle: "Leading the school to its close", description: "Appointed the Bauhaus's third and final director, he holds the school together until Nazi pressure forces its closure." },
      { date: "1937", title: "Emigrating to America", subtitle: "Chicago, Illinois", description: "He settles in Chicago to lead the architecture school at the Armour Institute, later the Illinois Institute of Technology." },
      { date: "1945 – 1951", title: "The Farnsworth House", subtitle: "Plano, Illinois", description: "His nearly transparent glass-and-steel house pushes architectural minimalism to one of its most extreme points." },
      { date: "1949 – 1951", title: "860–880 Lake Shore Drive", subtitle: "Chicago, Illinois", description: "His twin glass apartment towers on Lake Shore Drive become a defining model of the modern residential high-rise." },
      { date: "1958", title: "Seagram Building", subtitle: "New York", description: "With Philip Johnson, he completes the Seagram Building, the archetype for the modern glass office skyscraper." },
      { date: "1947 – 1969", title: "Shaping a Generation", subtitle: "Teaching and practice", description: "He continues to teach and build in Chicago, training architects who carry his structural clarity into the rest of the century." },
      { date: "1969", title: "Death in Chicago", subtitle: "A legacy in steel and glass", description: "Mies dies in Chicago, leaving architecture's vocabulary permanently reshaped by his pursuit of structural honesty." },
    ],
  },
  {
    slug: "marco-zanuso",
    similarDesignerSlugs: ["joe-colombo", "vico-magistretti", "achille-castiglioni"],
    inFocus: {
      title: "Grillo Telephone – 1965",
      image_url: null,
      paragraphs: [
        "Designed with Richard Sapper for Italy's state telephone manufacturer, the Grillo was the first telephone ever to fold its handset and dial together into a single, compact clamshell — an entirely new physical format for a device whose shape had remained essentially unchanged since the early twentieth century.",
        "Closed, the Grillo sat flat and small enough to fit easily into a coat pocket, a genuinely novel idea for a piece of household telecommunications equipment in an era when phones were large, fixed objects wired permanently into a single room of the house.",
        "Though landline technology eventually made the Grillo's specific mechanism obsolete, its basic premise — a communication device that folds shut and opens to reveal both a screen and a keypad — reads today as an unmistakable, decades-early preview of the flip-phone form factor that would define mobile telephones for much of the following century.",
      ],
    },
    biography:
      "Marco Zanuso was born in Milan in 1916 and graduated in architecture from the Politecnico di Milano in 1939. After the Second World War, he opened his own practice, working across architecture, urban planning and industrial design during the optimistic, fast-rebuilding years of postwar Italy. His involvement with the magazines Domus and Casabella placed him within the central debates shaping Italy's reconstruction, while his practical work explored the growing relationship between design and modern manufacturing, treating form and production method as a single design problem rather than separate stages.\n\nHe became one of the first Italian designers to investigate systematically how new materials and production techniques could improve domestic furniture and everyday products. His work with the manufacturer Arflex helped transform upholstered seating through the industrial use of foam rubber and new methods of assembly: the Lady armchair, introduced in 1951 and awarded Italy's first Compasso d'Oro, combined genuine comfort with a construction approach suited specifically to industrial mass production, establishing a new direction for modern furniture manufacturing.\n\nFrom 1958, his long collaboration with the German designer Richard Sapper extended this experimental thinking from furniture into consumer electronics and telecommunications. Products including the compact Brionvega TS502 portable radio and the folding Grillo telephone reconsidered familiar household devices through unexpectedly compact forms, inventive folding mechanisms and close attention to how objects were physically handled and carried, work that anticipated the miniaturisation of personal technology decades before it became commonplace.\n\nAlongside his product designs, Zanuso maintained a substantial architectural practice and taught for many years at the Politecnico di Milano, training a generation of Italian designers in his belief that technical research, physical comfort and formal quality needed to develop together rather than sequentially. He died in Milan in 2001, having helped bring industrial innovation into the ordinary domestic object.",
    timeline: [
      { date: "1916", title: "Born in Milan", subtitle: "Milan, Italy", description: "Marco Zanuso is born and later graduates in architecture from the Politecnico di Milano." },
      { date: "1939", title: "Graduating in Architecture", subtitle: "Milan, Italy", description: "He completes his architecture degree as war approaches across Europe." },
      { date: "1945", title: "Opening His Own Practice", subtitle: "Postwar Milan", description: "He establishes his own practice, working across architecture, urban planning and industrial design." },
      { date: "1945 – 1950s", title: "Writing for Domus and Casabella", subtitle: "Shaping design debate", description: "His involvement with these influential magazines places him within Italy's central postwar design debates." },
      { date: "1951", title: "The Lady Armchair", subtitle: "Arflex", description: "His Lady armchair, built using industrial foam rubber, wins Italy's first Compasso d'Oro award." },
      { date: "1958", title: "Partnering with Richard Sapper", subtitle: "A new collaboration", description: "He begins a long collaboration with designer Richard Sapper, extending into electronics and telecommunications." },
      { date: "1962", title: "The Brionvega TS502 Radio", subtitle: "Portable electronics", description: "With Sapper, he designs the compact, brightly coloured TS502 portable radio for Brionvega." },
      { date: "1965", title: "The Grillo Telephone", subtitle: "A folding icon", description: "With Sapper, he designs the Grillo, the first telephone to fold its handset and dial into a single compact unit." },
      { date: "1960s – 1980s", title: "Teaching at the Politecnico", subtitle: "Milan, Italy", description: "He teaches design for many years, shaping a generation of Italian designers in his methods." },
      { date: "2001", title: "Death in Milan", subtitle: "An enduring influence", description: "Zanuso dies in Milan, remembered for bringing industrial innovation into everyday objects." },
    ],
  },
  {
    slug: "philippe-starck",
    similarDesignerSlugs: ["verner-panton", "finn-juhl", "joe-colombo"],
    inFocus: {
      title: "Juicy Salif – 1990",
      image_url: null,
      paragraphs: [
        "Designed for Alessi after Starck reportedly sketched the idea on a paper napkin over a plate of calamari in a Tuscan restaurant, the Juicy Salif raises a citrus squeezer onto three long, spindly legs, turning an object normally hidden in a kitchen drawer into something meant to be displayed on a counter.",
        "Alessi's own internal testing found that the cast aluminium form actually squeezed lemons rather poorly, with juice and pips running down its legs as often as into a glass — a flaw Starck and Alessi both chose to embrace rather than fix, since by that point it had already become clear the object's real purpose was conversation, not juice.",
        "That willingness to prioritise an object's emotional and sculptural impact over its strict functional performance became one of the clearest statements of Starck's design philosophy, and Juicy Salif remains, decades later, one of the most recognisable single objects in the history of industrial design.",
      ],
    },
    biography:
      "Philippe Starck was born in Paris in 1949, the son of an aeronautical engineer whose workshop gave him an early, hands-on fascination with how things are built and taken apart. Largely self-taught as a designer after studying briefly at the École Nissim de Camondo, he designed his first independent project in 1969, an inflatable structure for a children's charity, before founding his first company at nineteen to produce inflatable furniture, and later becoming artistic director for the house of Pierre Cardin in the early 1970s, work that brought him into contact with a practice spanning fashion, furniture and interiors.\n\nStarck's career changed course decisively in 1982, when President François Mitterrand commissioned him to design the private apartments of the Élysée Palace — a project that brought his name to national attention for the first time. Two years later, his interior for Café Costes in Paris, built around a three-legged chair designed specifically for the room's triangular corners, turned him into a star of French design. Partnerships with hotelier Ian Schrager on projects including New York's Royalton Hotel and Miami's Delano extended his reputation internationally, reframing hotel lobbies as immersive, theatrical social spaces rather than mere waiting areas.\n\nStarck's product design has produced some of the most recognisable objects of the late twentieth century, from the spindly, sculptural Juicy Salif lemon squeezer for Alessi in 1990 to the transparent, single-mould Louis Ghost Chair for Kartell in 2002 — among the best-selling chairs ever made, reinterpreting a Louis XVI armchair in a single piece of injection-moulded polycarbonate. Prolific across furniture, architecture, hospitality, yacht design and consumer electronics, he has increasingly framed his later work around sustainability, insisting that design must justify the environmental cost of its own existence.\n\nStill working into his seventies, Starck remains one of the most publicly recognisable designers alive, as well known to general audiences for his provocative public statements about design's excesses as for the objects he continues to produce across an unusually wide range of industries.",
  },
  {
    slug: "pier-giacomo-castiglioni",
    similarDesignerSlugs: ["achille-castiglioni", "vico-magistretti", "joe-colombo"],
    inFocus: {
      title: "Arco Floor Lamp – 1962",
      image_url: null,
      paragraphs: [
        "Designed together with his younger brother Achille for Flos, the Arco lamp answers a single, specific problem: how to bring the quality of an overhead pendant light to a dining table without running wiring through the ceiling or fixing the light's position permanently in the room.",
        "A sweeping stem of brushed steel, counterbalanced by a block of heavy Carrara marble pierced with a hole sized for a broom handle so two people could carry it between rooms, lets the lamp's light source arc nearly three metres from its base — an engineering solution disguised as a piece of sculpture.",
        "Arco remains the clearest surviving demonstration of the brothers' shared method: Pier Giacomo's structural and mechanical precision paired with Achille's instinct for wit, dismantling a familiar domestic problem until an unexpected, elegant mechanical answer presented itself.",
      ],
    },
    biography:
      "Pier Giacomo Castiglioni was born in Milan in 1913 and graduated in architecture from the Milan Polytechnic in 1937, five years ahead of his younger brother Achille. Alongside his brothers Livio and Achille, he began designing furniture, lighting and radio sets in the family studio during the late 1930s, contributing to some of the earliest expressions of a distinctly Italian approach to industrial design, one grounded in curiosity about ordinary mechanical objects rather than formal architectural theory.\n\nWhen Livio left to establish his own practice in 1952, Pier Giacomo and Achille continued together as Studio Achille e Pier Giacomo Castiglioni, one of the most prolific and influential design partnerships of the postwar era. Together they created some of the defining objects of twentieth-century design, including the Mezzadro stool built from a tractor seat, the Toio lamp assembled from a car headlight, the sculptural Sanluca armchair of 1960, and the Arco floor lamp of 1962 — works celebrated for turning everyday materials and mechanical parts into witty, enduringly functional icons through a shared, inseparable creative process that makes it difficult to attribute individual ideas to either brother alone.\n\nPier Giacomo was also an active contributor to the Triennale di Milano exhibitions that shaped postwar Italian design culture, working on exhibition design and installations alongside the pair's product work. His contributions to the partnership's output are held in the permanent collections of major museums, including the Museum of Modern Art in New York and the Triennale Design Museum in Milan, and he is remembered by critics including the manufacturer Dino Gavina as one of the ten greatest designers of the twentieth century.\n\nHe died suddenly in Milan in 1968, at the age of fifty-five, bringing an exceptionally productive sixteen-year creative partnership with his brother to an abrupt end, just as the pair's reputation was reaching its international peak.",
    timeline: [
      { date: "1913", title: "Born in Milan", subtitle: "Milan, Italy", description: "Pier Giacomo Castiglioni is born, five years ahead of his younger brother Achille." },
      { date: "1937", title: "Graduating in Architecture", subtitle: "Milan Polytechnic", description: "He completes his architecture degree, ahead of his younger brother's own studies." },
      { date: "Late 1930s", title: "A Family Workshop", subtitle: "Designing radios and furniture", description: "Alongside his brothers Livio and Achille, he begins designing furniture, lighting and radio sets in the family studio." },
      { date: "1944", title: "Joined by Achille", subtitle: "A growing studio", description: "Achille graduates and joins the family practice, beginning the brothers' long working relationship." },
      { date: "1952", title: "Studio Castiglioni", subtitle: "A defining partnership", description: "With Livio's departure, he and Achille form Studio Achille e Pier Giacomo Castiglioni." },
      { date: "1955", title: "Luminator", subtitle: "A Compasso d'Oro win", description: "The brothers receive a Compasso d'Oro for Luminator, a slender uplighting lamp built from very few components." },
      { date: "1957", title: "Mezzadro and Sella", subtitle: "Found objects, new forms", description: "Together the brothers turn a tractor seat and a bicycle saddle into the Mezzadro and Sella stools." },
      { date: "1960", title: "The Sanluca Armchair", subtitle: "A sculptural silhouette", description: "The brothers design the Sanluca armchair, its articulated seat and backrest creating an expressive form." },
      { date: "1962", title: "The Arco Floor Lamp", subtitle: "Light, reconsidered", description: "The brothers design the Arco floor lamp, bringing overhead light into a room without a fixed ceiling point." },
      { date: "1950s – 1960s", title: "Shaping the Triennale", subtitle: "Milan's design stage", description: "He contributes actively to the Triennale di Milano exhibitions that defined postwar Italian design culture." },
      { date: "1968", title: "Death at Fifty-Five", subtitle: "A sudden loss", description: "Pier Giacomo dies suddenly in Milan, ending a partnership that had reshaped Italian design in sixteen years." },
    ],
  },
  {
    slug: "pierre-paulin",
    similarDesignerSlugs: ["verner-panton", "gaetano-pesce", "eero-saarinen"],
    inFocus: {
      title: "The Élysée Palace Private Apartments – 1971",
      image_url: null,
      paragraphs: [
        "Commissioned by President Georges Pompidou to modernise the private apartments of the Élysée Palace, Pierre Paulin was given an almost unthinkable brief for a historic French institution: remove the heavy period furniture and gilded panelling and replace it with his own soft, enveloping contemporary seating landscapes.",
        "Paulin's response filled the rooms with low, continuous upholstered forms in bold colour, designed to be sat, lounged or even lain on rather than perched upon formally — a radical, genuinely lived-in alternative to the stiff grandeur usually associated with French state interiors.",
        "Decades after Pompidou's own presidency ended, several of these rooms remained substantially as Paulin had designed them, an unusually long institutional endorsement for what had, at the time, been one of the most daring interior design commissions any sitting French president had ever approved.",
      ],
    },
    biography:
      "Pierre Paulin was born in Paris in 1927. After initially training as a sculptor, he studied furniture design at the École Camondo and began his career modelling wooden furniture for the manufacturer Thonet, where he first experimented with bent and curved forms in a traditional material before new industrial techniques became available to him. The decisive turn in his career came in 1958, when he began a long collaboration with the Dutch manufacturer Artifort.\n\nWorking with new industrial techniques — tubular steel frames stretched with jersey fabric over moulded foam — Paulin was able to design seating with continuous, organic silhouettes that had previously been technically impossible to produce, among them the Mushroom chair of 1960, the Ribbon chair of 1966 and the reclining Tongue chair of 1967. These pieces, at once sculptural and intensely comfortable, placed him at the forefront of a new, space-age sensibility in French furniture design, built around the conviction that comfort was an emotional quality before it was a physical posture.\n\nIn 1968, President Georges Pompidou commissioned Paulin to redesign the private apartments of the Élysée Palace, an unusually bold modernisation of a historic state institution, where his immersive, cushioned seating landscapes replaced period furniture entirely and remained in place for decades. He continued to design for French institutions, including gallery spaces at the Louvre, and later founded a family design studio with his wife Maia and son Benjamin, continuing to design well into his later years.\n\nPierre Paulin died in Montpellier in 2009, remembered as one of the great innovators of postwar French furniture design, among the first designers anywhere to treat industrial foam and stretch fabric as sculptural materials rather than merely practical upholstery.",
    timeline: [
      { date: "1927", title: "Born in Paris", subtitle: "Paris, France", description: "Pierre Paulin is born and initially trains as a sculptor before turning to furniture design at the École Camondo." },
      { date: "1950s", title: "Working for Thonet", subtitle: "Early experiments", description: "He begins his career modelling wooden furniture for Thonet, experimenting with bent and curved forms." },
      { date: "1958", title: "Meeting Artifort", subtitle: "A new collaboration", description: "He begins a defining partnership with the Dutch manufacturer Artifort, gaining access to new industrial techniques." },
      { date: "1960", title: "The Mushroom Chair", subtitle: "Foam and stretch fabric", description: "Tubular steel frames stretched with jersey fabric over moulded foam let him design seating with continuous, sculptural silhouettes." },
      { date: "1966 – 1967", title: "Ribbon and Tongue", subtitle: "A sculptural signature", description: "The Ribbon chair and the reclining Tongue chair cement his reputation for organic, enveloping forms." },
      { date: "1968 – 1971", title: "Redesigning the Élysée", subtitle: "A presidential commission", description: "President Georges Pompidou commissions Paulin to redesign the private apartments of the Élysée Palace." },
      { date: "1970s", title: "Institutional Projects", subtitle: "Beyond furniture", description: "He continues designing for French institutions, including exhibition spaces at the Louvre." },
      { date: "1975", title: "Designing for Airborne International", subtitle: "A new manufacturer", description: "He begins working with additional French manufacturers, expanding his furniture lines." },
      { date: "1980s", title: "A Family Studio", subtitle: "Working with Maia and Benjamin", description: "He founds a design studio together with his wife Maia and son Benjamin, continuing to design into his later years." },
      { date: "2009", title: "Death in Montpellier", subtitle: "A legacy of comfort", description: "Paulin dies in Montpellier, remembered as one of the great innovators of postwar French furniture design." },
    ],
  },
  {
    slug: "poul-kjaerholm",
    similarDesignerSlugs: ["hans-j-wegner", "finn-juhl", "arne-jacobsen"],
    inFocus: {
      title: "PK24 Chaise Longue – 1965",
      image_url: null,
      paragraphs: [
        "The PK24 reduces the reclining chaise longue to a single, continuous curve of chrome-plated or stainless steel flat bar, from which a woven cane seat is suspended under tension rather than supported from below — the seat appears almost to hover inside its own frame.",
        "A small leather headrest, the chaise's only soft element, can be adjusted along the frame's length, the single compromise Kjærholm allowed himself in an otherwise uncompromising composition of taut cane and polished steel.",
        "Still produced today by Fritz Hansen largely unchanged, the PK24 is widely considered the clearest single statement of Kjærholm's belief that a chair's structure, rather than its upholstery, should be the primary site of its visual and physical comfort.",
      ],
    },
    biography:
      "Poul Kjærholm was born in Østervrå, Denmark, in 1929. Trained first as a cabinetmaker, he went on to study furniture design at the School of Arts and Crafts in Copenhagen under Hans J. Wegner, graduating in 1952 — but where Wegner worked almost exclusively in warm, hand-joined wood, Kjærholm turned decisively toward cold industrial materials: steel, leather, wicker and marble, a deliberate departure from his teacher's craft tradition that initially unsettled some of Denmark's more conservative furniture critics.\n\nHis furniture applied an architect's structural logic to these industrial materials, each piece reduced to its essential lines with almost nothing left to spare. The PK22 lounge chair of 1956, built from a single continuous curve of flat steel bar supporting a woven cane or leather seat, and the PK24 chaise longue of 1965, its cane seat suspended from a single sweeping steel frame, remain the clearest expressions of this approach — furniture that looked more closely related to modern sculpture or structural engineering than to the Danish cabinetmaking tradition it emerged from.\n\nKjærholm represented Denmark at the 1957 Milan Triennale, winning a Grand Prix that established his international reputation early in his career, and he later taught furniture design at the Royal Danish Academy of Fine Arts, shaping a generation of designers in his exacting, materials-first method that prized structural clarity over surface decoration. His close, long-running collaboration with the manufacturer Fritz Hansen, later continued by E. Kold Christensen, ensured his demanding designs were produced with the precision his drawings required.\n\nHe died in Copenhagen in 1980, at only fifty-one, cutting short a career that had already fundamentally expanded what Danish furniture design could look like beyond wood. His PK series remains in production today, as precise and modern as when it was first designed.",
    timeline: [
      { date: "1929", title: "Born in Østervrå", subtitle: "Denmark", description: "Poul Kjærholm is born and trains first as a cabinetmaker." },
      { date: "1949 – 1952", title: "Studying Under Wegner", subtitle: "Copenhagen, Denmark", description: "He studies furniture design under Hans J. Wegner, but turns toward steel rather than his teacher's wood." },
      { date: "1952", title: "Graduating", subtitle: "A different material path", description: "He graduates and begins developing a furniture language built around steel, cane, leather and marble." },
      { date: "1955", title: "Joining Fritz Hansen", subtitle: "A manufacturing partnership", description: "He begins a close collaboration with Fritz Hansen, who produces his demanding, precise designs." },
      { date: "1956", title: "The PK22 Lounge Chair", subtitle: "Steel, reduced to essentials", description: "His PK22, built from a single continuous curve of flat steel bar, defines his mature structural approach." },
      { date: "1957", title: "Milan Triennale", subtitle: "A Grand Prix", description: "He represents Denmark at the Milan Triennale, winning a Grand Prix that establishes his international reputation." },
      { date: "1965", title: "The PK24 Chaise Longue", subtitle: "A suspended seat", description: "His PK24, its cane seat suspended from a single steel frame, becomes one of his most celebrated designs." },
      { date: "1959 – 1980", title: "Teaching in Copenhagen", subtitle: "Royal Danish Academy of Fine Arts", description: "He teaches furniture design, shaping a generation of designers in his materials-first method." },
      { date: "1980", title: "Death at Fifty-One", subtitle: "Copenhagen, Denmark", description: "Kjærholm dies in Copenhagen; his PK series remains in production today, largely unchanged." },
    ],
  },
  {
    slug: "verner-panton",
    similarDesignerSlugs: ["arne-jacobsen", "hans-j-wegner", "joe-colombo"],
    inFocus: {
      title: "The Panton Chair – 1967",
      image_url: null,
      paragraphs: [
        "After nearly a decade of prototyping with Vitra to solve the engineering problem of a cantilevered chair strong enough to support a sitter's weight using no legs at all, the Panton Chair became, in 1967, the first chair ever produced by injection-moulding a single piece of plastic in one continuous S-curve.",
        "Early versions used a cold-cast and later fibreglass-reinforced polyester resin before manufacturing technology caught up with Panton's original ambition of a fully injection-moulded thermoplastic shell, a sequence of material substitutions driven entirely by what 1960s factories could physically produce rather than by any change in the design itself.",
        "Produced in a saturated rainbow of colours and instantly stackable, the Panton Chair became one of the defining objects of Pop-era design, as recognisable today in museum collections as it was in the psychedelic interiors it was originally designed to furnish.",
      ],
    },
    biography:
      "Verner Panton was born in Gamtofte, Denmark, in 1926. He studied architecture at the Royal Danish Academy of Fine Arts, graduating in 1951, and worked briefly in Arne Jacobsen's office — where he contributed to the development of the Ant chair — before opening his own design studio in 1955, determined from the outset to break away from the restraint of Danish Modern rather than extend it.\n\nWhere his Danish contemporaries continued working primarily in wood, Panton embraced the new industrial plastics becoming available during the 1960s, sculpting furniture into continuous, flowing forms that would have been structurally impossible in timber. His Panton Chair, developed with Vitra over nearly a decade of engineering work and finally produced in 1967, was the first chair ever injection-moulded from a single piece of plastic, its cantilevered S-curve becoming an instant icon of Pop-era design and proof that a chair could be both industrially manufactured and genuinely sculptural.\n\nHe pursued the same experimental, maximalist spirit in total environments such as the Visiona 2 installation for the chemical company Bayer in 1970, where furniture, lighting and textiles dissolved into immersive, intensely saturated-colour landscapes that visitors could walk, sit and even lie inside — interior design conceived less as furnishing a room than as constructing an entirely new kind of sensory environment. His lighting and textile designs pursued the same uncompromising embrace of colour and pattern across every surface of a space.\n\nPanton died in Copenhagen in 1998. Long overlooked by a Danish design establishment that remained suspicious of his embrace of colour and synthetic material well into the 1980s, he is now recognised as one of the most radical and forward-looking furniture designers of the twentieth century.",
    timeline: [
      { date: "1926", title: "Born in Gamtofte", subtitle: "Denmark", description: "Verner Panton is born and later studies architecture at the Royal Danish Academy of Fine Arts." },
      { date: "1950 – 1952", title: "Working for Arne Jacobsen", subtitle: "Copenhagen, Denmark", description: "He works briefly in Arne Jacobsen's office, contributing to the development of the Ant chair." },
      { date: "1955", title: "Opening His Own Studio", subtitle: "Breaking from tradition", description: "He opens his own design studio, determined to break from the restraint of Danish Modern." },
      { date: "1960", title: "The Cone Chair", subtitle: "An early sculptural form", description: "His Cone Chair demonstrates his early departure from traditional Danish wooden furniture." },
      { date: "1960s", title: "Embracing Plastics", subtitle: "A new material language", description: "He begins sculpting furniture from industrial plastics, pursuing continuous forms impossible in wood." },
      { date: "1963", title: "Beginning Work with Vitra", subtitle: "A long engineering process", description: "He begins developing the Panton Chair with Vitra, a project that will take nearly a decade to realise." },
      { date: "1967", title: "The Panton Chair", subtitle: "The first single-piece plastic chair", description: "The chair is finally produced, the first ever injection-moulded from a single piece of plastic." },
      { date: "1970", title: "Visiona 2", subtitle: "Cologne, Germany", description: "His installation for Bayer turns furniture, lighting and textiles into an immersive, saturated-colour environment." },
      { date: "1970s – 1980s", title: "Textile and Lighting Design", subtitle: "A total environment", description: "He continues designing textiles and lighting pursuing the same uncompromising embrace of colour." },
      { date: "1998", title: "Death in Copenhagen", subtitle: "A radical legacy", description: "Panton dies in Copenhagen, later recognised as one of the most forward-looking designers of his century." },
    ],
  },
  {
    slug: "vico-magistretti",
    similarDesignerSlugs: ["achille-castiglioni", "joe-colombo", "marco-zanuso"],
    inFocus: {
      title: "Eclisse Lamp – 1965",
      image_url: null,
      paragraphs: [
        "Designed for Artemide, the Eclisse table lamp nests two painted steel hemispheres, an outer fixed shell and an inner rotating one, so that turning the inner sphere smoothly adjusts how much of the bulb's light escapes — from a soft sliver to a full, undimmed glow — without any switch, dimmer or visible mechanism.",
        "The lamp takes its name and its operating principle directly from a solar eclipse, Magistretti translating an astronomical phenomenon most people only ever see as a diagram into a genuinely functional, everyday household object.",
        "Still produced by Artemide largely unchanged since 1965 and held in MoMA's permanent collection, Eclisse remains one of the clearest demonstrations of Magistretti's belief that real design simplicity comes only after extensive refinement, not before it.",
      ],
    },
    biography:
      "Vico Magistretti was born in Milan in 1920, the son of an architect, and became one of the leading figures of postwar Italian architecture and design. His early career developed around buildings and interiors, with a particular and lasting interest in the home and the ways people actually inhabit it rather than how an architect imagines they should. Working within Milan's rich postwar architectural culture, he gradually extended this attention from buildings to furniture and lighting, establishing long-running relationships with manufacturers including Cassina, Artemide and Oluce that would define most of his career.\n\nMagistretti approached each project through a single clear underlying idea, seeking simplicity without sacrificing character or genuine usefulness — a discipline he described as making something simple only after making it work completely. The Carimate chair of 1959 emerged from an architectural commission for a golf club, bringing a traditional rush-seated farmhouse chair design into a distinctive, brightly lacquered contemporary form. His lighting designs explored equally direct relationships between geometry and function: the Eclisse lamp of 1965 offered infinitely adjustable light through two nesting hemispheres rather than a switch, while the Atollo lamp of 1977 brought together elementary geometric shapes — cylinder, cone and hemisphere — into a carefully balanced, almost architectural composition.\n\nAcross these different objects, Magistretti's simplicity was consistently the result of sustained refinement rather than a starting assumption, supported by a precise understanding of materials, manufacturing constraints and genuine everyday use. From 1979, he taught furniture design at London's Royal College of Art, extending his influence and his working method to a generation of designers trained outside Italy.\n\nHe also publicly defended a generous understanding of domestic space throughout his career, believing homes should reflect the actual lives of their occupants rather than follow a rigid decorative scheme imposed from outside. He died in Milan in 2006, leaving designs that remain enduring, quietly inventive expressions of modern Italian living.",
    timeline: [
      { date: "1920", title: "Born in Milan", subtitle: "Milan, Italy", description: "Vico Magistretti is born the son of an architect and later becomes a leading figure of postwar Italian design." },
      { date: "1945", title: "Graduating in Architecture", subtitle: "Milan, Italy", description: "He completes his architectural training and begins practising in postwar Milan." },
      { date: "1950s", title: "Establishing Manufacturer Relationships", subtitle: "Cassina, Artemide, Oluce", description: "He establishes long-running relationships with these manufacturers that define the rest of his career." },
      { date: "1959", title: "The Carimate Chair", subtitle: "A golf club commission", description: "Designed for a golf club, his brightly lacquered Carimate chair reinterprets a traditional rush-seated form." },
      { date: "1965", title: "The Eclisse Lamp", subtitle: "Light as a mechanism", description: "His Eclisse lamp for Artemide uses two nesting hemispheres to adjust light without a switch." },
      { date: "1967", title: "Compasso d'Oro", subtitle: "Recognition in Italy", description: "He receives Italy's highest design honour for his contributions to furniture and lighting design." },
      { date: "1977", title: "The Atollo Lamp", subtitle: "Geometric balance", description: "His Atollo lamp brings together elementary geometric shapes into a carefully balanced composition." },
      { date: "1979", title: "Teaching in London", subtitle: "Royal College of Art", description: "He begins teaching furniture design in London, extending his influence beyond Italy." },
      { date: "1980s – 1990s", title: "A Continuing Practice", subtitle: "Furniture and architecture", description: "He continues designing furniture, lighting and buildings, maintaining his belief in refined simplicity." },
      { date: "2006", title: "Death in Milan", subtitle: "An enduring influence", description: "Magistretti dies in Milan, leaving designs that remain quiet, inventive expressions of modern Italian living." },
    ],
  },
]

export default async function expandExistingDesigners({ container }: ExecArgs) {
  const designerModuleService: DesignerModuleService = container.resolve(DESIGNER_MODULE)

  for (const update of UPDATES) {
    const [designer] = await designerModuleService.listDesigners({ slug: update.slug })
    if (!designer) {
      console.warn(`Skipping ${update.slug}: designer not found`)
      continue
    }

    const payload: Record<string, unknown> = {
      id: designer.id,
      biography: update.biography,
      in_focus: update.inFocus,
      similar_designers: { slugs: update.similarDesignerSlugs },
    }
    if (update.timeline) {
      payload.timeline = { entries: update.timeline }
    }

    await designerModuleService.updateDesigners(payload as any)
    console.log(
      `Updated ${update.slug}: bio ${update.biography.length} chars${update.timeline ? `, timeline rewritten to ${update.timeline.length} entries` : ", timeline left untouched"}`
    )
  }

  console.log(`Done. Updated ${UPDATES.length} designer(s).`)
}
