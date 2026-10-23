/**
 * Third batch (10) of 30 additional designers, matching the Arne Jacobsen
 * quality bar: full-length biography, quote, dates, and a granular career
 * timeline. Movement links and similar_designers are filled by separate
 * scripts once every designer in all three batches exists.
 *
 *   npx medusa exec ./src/scripts/seed-additional-designers-batch3.ts
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
    slug: "franco-albini",
    first_name: "Franco",
    last_name: "Albini",
    nationality: "Italy",
    birth_date: new Date("1905-10-17"),
    death_date: new Date("1977-11-01"),
    quote: "Every object should explain, through its own structure, how and why it exists.",
    biography:
      "Franco Albini was born near Milan in 1905 and graduated in architecture from the Milan Polytechnic in 1929, entering practice during the Italian Rationalist movement's engagement with Fascist-era state architecture, a political context he navigated quietly while developing an increasingly independent design voice through the 1930s and 1940s. Unlike many Italian designers of his generation who moved toward sculptural expressiveness after the war, Albini pursued an almost scientific rigour in both his buildings and his furniture, treating structural logic itself as the primary source of visual interest.\n\nThis approach produced some of the most technically inventive furniture of postwar Italian design: his 1951 Margherita chair for Bonacina appeared to be woven entirely from continuous rattan cane under tension, with no visible internal frame, while his Veliero bookshelf of 1940, suspended from a system of cables and counterweights resembling a ship's rigging, made its own structural engineering the entire visual subject of the piece rather than disguising it behind conventional cabinetry. His 1955 Luisa armchair, built from solid wood with exposed, carefully articulated joinery, won him Italy's Compasso d'Oro award and remains a reference point for Italian furniture craftsmanship.\n\nAlbini's practice extended well beyond furniture into exhibition design and museum installation, where he became particularly influential: his renovation of the Palazzo Bianco and Palazzo Rosso museums in Genoa during the 1950s introduced a then-radical approach to displaying art using minimal, almost invisible structural supports that let individual objects appear to float free of their surroundings, a technique subsequently adopted by museum designers internationally. He also designed the Milan metro system's first line in the 1960s, applying the same structural clarity to public infrastructure that he had developed for furniture and exhibitions.\n\nAlbini continued designing and teaching, holding professorships at the universities of Venice and Milan, shaping a generation of Italian architects and designers in his rigorous, structurally honest method. He died in Milan in 1977, remembered as one of Italian design's most technically disciplined figures, whose furniture consistently made visible the engineering logic that other designers preferred to conceal.",
    timeline: [
      { date: "1905", title: "Born near Milan", subtitle: "Robbiate, Italy", description: "Franco Albini is born and later graduates in architecture from the Milan Polytechnic in 1929." },
      { date: "1930s", title: "Early Rationalist Practice", subtitle: "Milan, Italy", description: "He begins practising during the Italian Rationalist movement's engagement with state architecture." },
      { date: "1940", title: "The Veliero Bookshelf", subtitle: "Structure as subject", description: "His cable-suspended bookshelf, resembling a ship's rigging, makes its own structural engineering the entire visual subject." },
      { date: "1945", title: "Postwar Reconstruction", subtitle: "Milan, Italy", description: "He takes part in Milan's architectural reconstruction efforts following the Second World War." },
      { date: "1951", title: "The Margherita Chair", subtitle: "Woven without a frame", description: "His rattan chair for Bonacina appears woven entirely under tension, with no visible internal structure." },
      { date: "1955", title: "The Luisa Armchair", subtitle: "A Compasso d'Oro win", description: "His solid-wood armchair with exposed, articulated joinery wins Italy's Compasso d'Oro award." },
      { date: "1950s", title: "Palazzo Bianco and Palazzo Rosso", subtitle: "Genoa, Italy", description: "His museum renovations introduce minimal, nearly invisible display supports that let artworks appear to float." },
      { date: "1960s", title: "Milan Metro Line 1", subtitle: "Public infrastructure", description: "He designs the first line of the Milan metro system, applying structural clarity to public infrastructure design." },
      { date: "1960s – 1970s", title: "Teaching in Venice and Milan", subtitle: "A lasting influence", description: "He holds professorships at the universities of Venice and Milan, shaping a generation of Italian designers." },
      { date: "1977", title: "Death in Milan", subtitle: "A disciplined legacy", description: "Albini dies in Milan, remembered for furniture that consistently made visible the engineering logic other designers preferred to conceal." },
    ],
  },
  {
    slug: "carlo-scarpa",
    first_name: "Carlo",
    last_name: "Scarpa",
    nationality: "Italy",
    birth_date: new Date("1906-06-02"),
    death_date: new Date("1978-11-28"),
    quote: "I want to see things, I do not trust anything else.",
    biography:
      "Carlo Scarpa was born in Venice in 1906 and studied drawing at the Accademia di Belle Arti rather than completing a formal architecture degree, a technicality that meant he was never legally permitted to call himself an architect in Italy, despite practising at the highest level of the profession for his entire career. From 1932 he worked as artistic director for the Venini glassworks on the island of Murano, developing new glassmaking techniques including layered, textured surfaces that brought an architect's structural sensibility to a craft tradition normally governed by its own separate guild conventions.\n\nScarpa's architectural reputation rests overwhelmingly on a series of meticulous renovations and museum installations rather than new buildings from scratch, each project revealing an obsessive attention to the joints, thresholds and material transitions between old and new construction. His renovation of the Olivetti Showroom in Venice's Piazza San Marco, completed in 1958, inserted a floating staircase and elaborate mosaic flooring into a modest historic shopfront, transforming a typewriter showroom into one of the most celebrated small interiors in twentieth-century Italian architecture. His decade-long renovation of the Castelvecchio Museum in Verona, completed in 1964, deliberately exposed the building's own layered history — medieval, Renaissance and modern — rather than disguising it behind a uniform restoration.\n\nHis acknowledged masterpiece, the Brion family tomb at San Vito d'Altivole, designed from 1969 until his death and completed posthumously, extended an entire cemetery complex from Scarpa's characteristic vocabulary of stepped concrete, interlocking circular forms and reflecting water, treating a family burial ground with the same material intensity he brought to museum galleries. The project consumed the better part of a decade and remains widely regarded as one of the most complete architectural meditations on memory and mortality built in the twentieth century.\n\nScarpa died in 1978 following a fall down a flight of stairs while visiting Sendai, Japan, an ending some biographers have noted as grimly fitting for an architect whose work was defined above all by an obsessive, almost superstitious attention to the detail of stairs, thresholds and steps. He is buried, at his own design, standing upright and wrapped in linen within the Brion tomb complex he had spent his final years completing.",
    timeline: [
      { date: "1906", title: "Born in Venice", subtitle: "Venice, Italy", description: "Carlo Scarpa is born and studies drawing at Venice's Accademia di Belle Arti." },
      { date: "1926", title: "Graduating in Drawing", subtitle: "Venice, Italy", description: "He completes his studies without a formal architecture degree, a technicality that bars him from legally using the title 'architect' in Italy." },
      { date: "1932", title: "Joining Venini Glassworks", subtitle: "Murano, Italy", description: "He becomes artistic director for the Venini glassworks, developing new layered and textured glassmaking techniques." },
      { date: "1940s", title: "Early Museum Installations", subtitle: "Venice, Italy", description: "He begins developing his influential approach to museum and gallery installation design." },
      { date: "1950s", title: "Teaching in Venice", subtitle: "A parallel career", description: "He teaches at the Venice university of architecture (IUAV), shaping younger Italian architects despite his own lack of a formal degree." },
      { date: "1958", title: "Olivetti Showroom", subtitle: "Venice, Italy", description: "His renovation of a Piazza San Marco shopfront, with its floating staircase and mosaic floor, becomes one of the most celebrated small interiors in Italian architecture." },
      { date: "1956 – 1964", title: "Castelvecchio Museum", subtitle: "Verona, Italy", description: "His decade-long renovation deliberately exposes the museum building's medieval, Renaissance and modern layers of history." },
      { date: "1969", title: "Beginning the Brion Tomb", subtitle: "San Vito d'Altivole, Italy", description: "He begins designing the Brion family tomb, the project that would become his acknowledged masterpiece." },
      { date: "1972", title: "Honorary Degree", subtitle: "A degree recognised late", description: "The University of Venice awards him an honorary degree in architecture, formally recognising a career practised for decades without one." },
      { date: "1978", title: "Death in Sendai", subtitle: "A fall down stairs", description: "Scarpa dies in Japan after a fall down a flight of stairs, an ending some biographers note as fitting for an architect obsessed with thresholds and steps." },
      { date: "1978", title: "Brion Tomb Completed", subtitle: "A posthumous masterpiece", description: "The Brion tomb complex is completed after his death; Scarpa is buried standing within it, by his own design." },
    ],
  },
  {
    slug: "enzo-mari",
    first_name: "Enzo",
    last_name: "Mari",
    nationality: "Italy",
    birth_date: new Date("1932-10-27"),
    death_date: new Date("2020-10-19"),
    quote: "Design is a political act, or it is nothing at all.",
    biography:
      "Enzo Mari was born in Novara, Italy, in 1932 and studied literature and art at Milan's Brera Academy rather than design or architecture, an unconventional background he later credited with keeping him permanently sceptical of the design industry's own assumptions about taste and commercial value, even as he worked prolifically within it. From the late 1950s he began designing for manufacturers including Danese Milano, producing objects distinguished by a severe, almost mathematical rationalism: his Formosa perpetual calendar and 16 Animali wooden puzzle reduced familiar objects to essential geometric components.\n\nMari became one of Italian design's most consistent internal critics, publicly and repeatedly arguing that the design profession served the interests of manufacturers and consumerist culture far more than it served genuine human need, a position that made him a singular, often difficult figure within an industry that frequently celebrated him with its own awards. His most explicit statement of this critique, the 1974 book Autoprogettazione, published a complete set of technical drawings for 19 pieces of furniture that anyone could build themselves from standard wood planks and nails, deliberately giving away for free the kind of design expertise that furniture companies profited from, and refusing to patent or commercially license the designs himself.\n\nDespite this openly anti-commercial position, Mari continued to design extensively for the same manufacturing industry he criticised, producing the Delfina stacking chair, numerous vases and tableware for Danese, and furniture for companies including Driade, winning Italy's Compasso d'Oro award on multiple occasions across his career — an apparent contradiction Mari addressed directly, arguing that working inside the industry while remaining critical of it was more useful than refusing to participate at all. He also maintained an active practice in graphic design and museum curation, including a major 1974 retrospective at Milan's Triennale examining design's relationship to political ideology.\n\nMari continued working and publicly criticising the design industry into his late eighties, remaining an uncomfortable, provocative presence at design fairs and exhibitions that increasingly sought to honour him. He died in Milan in 2020, shortly before the opening of a major retrospective of his work, remembered as one of the few designers to build an entire public career around the conviction that design was never a neutral or purely aesthetic act.",
    timeline: [
      { date: "1932", title: "Born in Novara", subtitle: "Novara, Italy", description: "Enzo Mari is born and studies literature and art at Milan's Brera Academy, rather than design." },
      { date: "1952 – 1956", title: "Studying at the Brera Academy", subtitle: "Milan, Italy", description: "His unconventional background in art and literature shapes a lifelong scepticism toward the design industry's own assumptions." },
      { date: "1957", title: "Beginning Work with Danese", subtitle: "Milan, Italy", description: "He begins a long collaboration with manufacturer Danese Milano, producing severely rationalist objects." },
      { date: "1963", title: "The 16 Animali Puzzle", subtitle: "A geometric reduction", description: "His wooden animal puzzle reduces familiar forms to essential geometric components." },
      { date: "1967", title: "The Formosa Calendar", subtitle: "A design classic", description: "His perpetual wall calendar, built from simple printed cards, becomes one of his most enduring and widely sold objects." },
      { date: "1974", title: "Autoprogettazione", subtitle: "Giving design away", description: "He publishes free technical drawings for furniture anyone can build themselves, a direct critique of the commercial design industry." },
      { date: "1974", title: "Triennale Retrospective", subtitle: "Design and ideology", description: "He curates a major Triennale exhibition examining design's relationship to political ideology." },
      { date: "1970s – 1980s", title: "Continued Commercial Design", subtitle: "A public contradiction", description: "He continues designing commercially for Danese and Driade even while publicly criticising the industry, a tension he addresses directly." },
      { date: "1980s – 1990s", title: "Multiple Compasso d'Oro Awards", subtitle: "Reluctant recognition", description: "He receives Italy's top design honour on multiple occasions, despite his critical stance toward the industry awarding it." },
      { date: "2000s – 2010s", title: "A Provocative Elder Statesman", subtitle: "Milan, Italy", description: "He remains an outspoken, uncomfortable presence at design fairs and exhibitions seeking to honour him." },
      { date: "2020", title: "Death in Milan", subtitle: "A career of conviction", description: "Mari dies in Milan shortly before a major retrospective of his work, remembered for insisting design was never a neutral act." },
    ],
  },
  {
    slug: "mario-bellini",
    first_name: "Mario",
    last_name: "Bellini",
    nationality: "Italy",
    birth_date: new Date("1935-02-01"),
    death_date: null,
    quote: "Design, for me, is the art of giving intelligent form to the objects we live with.",
    biography:
      "Mario Bellini was born in Milan in 1935 and graduated in architecture from the Milan Polytechnic in 1959, entering practice at a moment when Italian design was increasingly defined by close collaboration between architect-designers and ambitious domestic manufacturers. From 1963 he began a two-decade relationship as chief design consultant to Olivetti, the Italian office-equipment manufacturer, designing a long sequence of typewriters, calculators and early computer terminals that applied a sculptor's attention to form to machines previously treated as purely technical objects, work that earned him numerous Compasso d'Oro awards and a reputation as one of Italy's leading industrial designers.\n\nHis furniture design proved equally influential: the 1977 Cab chair for Cassina wrapped a simple tubular steel frame entirely in a tight-fitting, zip-up leather skin, visible stitching included, so that the upholstery itself became the chair's structural expression rather than a separate decorative layer — a design so immediately successful that it remains in continuous production today, nearly five decades after its introduction. His Camaleonda modular sofa system of 1970, built from individually joinable upholstered units that could be freely rearranged into irregular configurations, similarly anticipated later decades' interest in flexible, deconstructed seating.\n\nBellini's practice expanded significantly into architecture from the 1980s onward, including the design of the Tokyo Design Center, an extension to the Deutsches Historisches Museum in Berlin, and a major renovation of the Milan Triennale exhibition building, work that placed him among a select group of Italian designers who moved credibly between product design and large-scale institutional architecture within a single career. He also served for many years as editor of the influential Italian design magazine Domus, a position that placed him, like Gio Ponti before him, at the centre of critical discourse shaping Italian design well beyond his own built and designed output.\n\nBellini's work is held in the permanent collections of major museums worldwide, including a dedicated retrospective at New York's Museum of Modern Art in 1987, an unusually early career honour for a still-practising designer. He continues to practise through his Milan studio into his late eighties, remaining one of the longest continuously active figures in postwar Italian design.",
    timeline: [
      { date: "1935", title: "Born in Milan", subtitle: "Milan, Italy", description: "Mario Bellini is born and graduates in architecture from the Milan Polytechnic in 1959." },
      { date: "1963", title: "Chief Design Consultant to Olivetti", subtitle: "Milan, Italy", description: "He begins a two-decade relationship designing typewriters, calculators and early computer terminals for Olivetti." },
      { date: "1970", title: "The Camaleonda Sofa", subtitle: "Modular flexibility", description: "His sofa system, built from freely joinable upholstered units, anticipates later decades' interest in deconstructed seating." },
      { date: "1977", title: "The Cab Chair", subtitle: "Upholstery as structure", description: "His leather-wrapped steel-frame chair for Cassina makes the upholstery itself the chair's visible structural expression." },
      { date: "1980s", title: "Olivetti Computer Terminals", subtitle: "Industrial design maturity", description: "He continues designing Olivetti's office equipment, now extending to early computer terminals and displays." },
      { date: "1986 – 1991", title: "Editor of Domus", subtitle: "A critical platform", description: "He serves as editor of the influential Italian design magazine Domus, shaping design discourse beyond his own practice." },
      { date: "1987", title: "MoMA Retrospective", subtitle: "New York, United States", description: "The Museum of Modern Art dedicates a retrospective to his work, an unusually early career honour for a still-practising designer." },
      { date: "1990s", title: "Tokyo Design Center", subtitle: "Expanding into architecture", description: "He designs the Tokyo Design Center, extending his practice significantly into large-scale institutional architecture." },
      { date: "1998", title: "Deutsches Historisches Museum Extension", subtitle: "Berlin, Germany", description: "He designs a major glass-and-steel extension to Berlin's historical museum." },
      { date: "2000s", title: "Milan Triennale Renovation", subtitle: "Milan, Italy", description: "He leads a major renovation of the Triennale exhibition building, a venue central to Italian design history." },
      { date: "Present", title: "An Ongoing Practice", subtitle: "Milan, Italy", description: "Bellini continues to practise into his late eighties, remaining one of the longest continuously active figures in postwar Italian design." },
    ],
  },
  {
    slug: "richard-sapper",
    first_name: "Richard",
    last_name: "Sapper",
    nationality: "Germany",
    birth_date: new Date("1932-05-30"),
    death_date: new Date("2015-12-31"),
    quote: "A good designer must be an integrator who can combine technology, ergonomics and aesthetics.",
    biography:
      "Richard Sapper was born in Munich, Germany, in 1932 and studied philosophy, anatomy and engineering before working briefly in the design department of Daimler-Benz, an engineering grounding that distinguished him from the more art-school-trained designers he would go on to collaborate with in Italy. He moved to Milan in 1958 to work in the studio of the architect Gio Ponti, and the following year began what became a two-decade partnership with Italian designer Marco Zanuso, a collaboration that produced some of the most inventive consumer electronics of the postwar era.\n\nWith Zanuso, Sapper designed the Brionvega TS502 portable radio in 1964, its brightly coloured clamshell plastic casing folding shut to conceal the dials entirely, and the Grillo telephone in 1965, the first telephone ever to fold its handset and dial into a single compact unit, both products that applied his engineering training to reconsidering the physical form of everyday electronics well ahead of the miniaturisation trends that would later define consumer technology. Sapper also worked independently for Alessi, IBM, Kartell and Artemide across a career that ranged unusually widely between furniture, lighting, kitchenware and office electronics.\n\nHis best-known solo design, the Tizio desk lamp for Artemide in 1972, passed low-voltage electrical current directly through its slender metal armatures rather than through a conventional cord, eliminating the need for a thick, unsightly wire and allowing the lamp's counterbalanced arms to be engineered remarkably thin — a solution so elegant that the lamp remained in continuous production essentially unchanged for decades. From 1980, Sapper also served as a design consultant to IBM, contributing to the visual language of the ThinkPad laptop line, whose black, minimalist casing and red TrackPoint pointer became one of the most recognisable product designs in corporate computing history.\n\nSapper continued consulting and designing into his eighties, maintaining homes and studios in both Munich and Milan throughout his career and winning Italy's Compasso d'Oro award on numerous occasions. He died in Milan on New Year's Eve 2015, remembered as one of the clearest examples of a designer whose formal engineering training, unusual among his Italian design contemporaries, produced some of the era's most technically inventive consumer objects.",
    timeline: [
      { date: "1932", title: "Born in Munich", subtitle: "Munich, Germany", description: "Richard Sapper is born and studies philosophy, anatomy and engineering before working in Daimler-Benz's design department." },
      { date: "1958", title: "Moving to Milan", subtitle: "Working for Gio Ponti", description: "He relocates to Milan to work in the studio of architect Gio Ponti." },
      { date: "1959", title: "Partnering with Marco Zanuso", subtitle: "A defining collaboration", description: "He begins a two-decade design partnership with Marco Zanuso, producing some of the era's most inventive consumer electronics." },
      { date: "1964", title: "The Brionvega TS502 Radio", subtitle: "With Marco Zanuso", description: "Their folding clamshell portable radio conceals its dials behind a brightly coloured plastic casing." },
      { date: "1965", title: "The Grillo Telephone", subtitle: "A folding first", description: "With Zanuso, he designs the Grillo, the first telephone to fold its handset and dial into a single compact unit." },
      { date: "1972", title: "The Tizio Lamp", subtitle: "Artemide", description: "His desk lamp passes electrical current directly through its slender metal arms, eliminating the need for a visible cord." },
      { date: "1970s", title: "Designing for Alessi and Kartell", subtitle: "A widening practice", description: "He extends his work to kitchenware, furniture and lighting for a range of Italian manufacturers." },
      { date: "1980", title: "Consulting for IBM", subtitle: "A long corporate relationship", description: "He begins consulting for IBM, contributing to the visual language of its computing products." },
      { date: "1992", title: "The IBM ThinkPad", subtitle: "A corporate computing icon", description: "His design contributions help shape the ThinkPad laptop's black, minimalist casing, one of the most recognisable designs in computing history." },
      { date: "1990s – 2000s", title: "Continued Design Practice", subtitle: "Munich and Milan", description: "He continues designing and consulting from studios in both cities, winning Italy's Compasso d'Oro on numerous occasions." },
      { date: "2015", title: "Death in Milan", subtitle: "An engineer's legacy", description: "Sapper dies in Milan on New Year's Eve, remembered for bringing formal engineering training to some of the era's most inventive consumer objects." },
    ],
  },
  {
    slug: "robin-day",
    first_name: "Robin",
    last_name: "Day",
    nationality: "United Kingdom",
    birth_date: new Date("1915-05-25"),
    death_date: new Date("2010-11-09"),
    quote: "A chair should be a quiet, well-mannered object that does its job without fuss.",
    biography:
      "Robin Day was born in High Wycombe, England, a town with a long furniture-making tradition, in 1915 and studied at the Royal College of Art in London, where he met the textile designer Lucienne Conradi, whom he married in 1942; the couple went on to shape British mid-century design from two complementary directions, Robin in furniture and Lucienne in printed textiles. In 1948, Day and his collaborator Clive Latimer won first prize in New York's Museum of Modern Art International Competition for Low-Cost Furniture Design, a result that first announced his furniture career internationally before he had completed a single major commercial design.\n\nDay's long working relationship with the British furniture manufacturer Hille, beginning in the late 1940s, produced some of postwar Britain's most widely distributed furniture, including moulded plywood chairs that brought the lightweight manufacturing techniques pioneered by Charles and Ray Eames to a British context operating under considerably tighter postwar material rationing. His defining achievement came in 1963 with the Polypropylene stacking chair, a single-shell seat injection-moulded from the then-new plastic polypropylene and mounted on simple tubular steel legs: inexpensive, stackable, durable and available in a wide range of colours, it became one of the best-selling chairs ever manufactured, with hundreds of millions produced and sold into schools, offices, hospitals and public buildings across dozens of countries.\n\nUnlike many of his continental European contemporaries who worked primarily for a design-conscious domestic furniture market, Day's most significant commercial success came specifically from institutional and contract furniture — chairs built to survive decades of heavy public use rather than to be admired in a private home — a less glamorous but far larger commercial category that the Polypropylene chair came to dominate for decades. He continued designing seating, storage and lighting for Hille throughout his career, consistently prioritising manufacturing efficiency and durability over stylistic novelty.\n\nDay continued working into his eighties and died in Chichester, England, in 2010. The Polypropylene chair remains in production today, still recognisable in classrooms and waiting rooms worldwide, and stands as one of the most commercially successful single pieces of furniture ever designed, despite remaining considerably less celebrated in design history than contemporaries who sold in far smaller numbers.",
    timeline: [
      { date: "1915", title: "Born in High Wycombe", subtitle: "High Wycombe, England", description: "Robin Day is born in England's traditional furniture-making region and later studies at the Royal College of Art." },
      { date: "1942", title: "Marrying Lucienne Conradi", subtitle: "A parallel design career", description: "He marries textile designer Lucienne Conradi; together they come to shape British mid-century design from furniture and textiles." },
      { date: "1948", title: "MoMA Low-Cost Furniture Competition", subtitle: "New York, United States", description: "With collaborator Clive Latimer, he wins first prize in MoMA's international competition for low-cost furniture design." },
      { date: "Late 1940s", title: "Beginning with Hille", subtitle: "A defining partnership", description: "He begins a long working relationship with British manufacturer Hille that will define the rest of his career." },
      { date: "1950s", title: "Moulded Plywood Chairs", subtitle: "Britain's postwar market", description: "He brings Eames-influenced moulded plywood manufacturing techniques to the constrained British postwar market." },
      { date: "1963", title: "The Polypropylene Chair", subtitle: "A mass-market breakthrough", description: "His single-shell plastic stacking chair becomes one of the best-selling chairs ever manufactured." },
      { date: "1960s – 1980s", title: "Institutional Furniture", subtitle: "Schools, hospitals, offices", description: "The Polypropylene chair and related designs are installed in institutional and public settings across dozens of countries." },
      { date: "1970s", title: "Continued Hille Designs", subtitle: "Seating, storage, lighting", description: "He continues designing a wide range of furniture and lighting for Hille, prioritising manufacturing efficiency over novelty." },
      { date: "1980s – 1990s", title: "Later Recognition", subtitle: "A career reassessed", description: "Design historians increasingly recognise the Polypropylene chair's scale of production as one of furniture history's most significant achievements." },
      { date: "2010", title: "Death in Chichester", subtitle: "A quietly dominant legacy", description: "Day dies in Chichester; the Polypropylene chair remains in production, still ubiquitous in institutional settings worldwide." },
    ],
  },
  {
    slug: "terence-conran",
    first_name: "Terence",
    last_name: "Conran",
    nationality: "United Kingdom",
    birth_date: new Date("1931-10-04"),
    death_date: new Date("2020-09-12"),
    quote: "The design of a thing is not just how it looks, but how it works, and how it makes you feel.",
    biography:
      "Terence Conran was born in Kingston upon Thames, England, in 1931 and studied textile design at the Central School of Art and Design in London before working as a furniture maker and restaurant designer through the 1950s, gaining practical experience across several disciplines before his most significant contribution to British design: identifying a gap between the expensive, design-conscious continental European furniture most British consumers could not afford and the heavy, traditional furniture dominating the mass domestic market.\n\nIn 1964, Conran opened the first Habitat store on London's Fulham Road, selling well-designed, affordably priced furniture and housewares — including flat-pack pieces, Scandinavian-influenced forms and continental kitchenware such as the then-unfamiliar wok and garlic press — directly to a growing generation of young British consumers who had previously had no accessible route to modern design. Habitat expanded rapidly through the following decades, and its retail model of translating good design into mass-market accessibility proved enormously influential, directly shaping later retailers including IKEA's eventual UK expansion.\n\nConran's business interests grew considerably beyond Habitat into a wider retail and restaurant empire: he built the Mothercare and Richard Shops chains into a corporate group, and from the 1980s onward became one of London's most prominent restaurateurs, opening a sequence of large, design-conscious restaurants including Bibendum and Quaglino's that applied his retail design sensibility to hospitality interiors at a significant commercial scale. Throughout, he remained an outspoken public advocate for the idea that good design was a matter of everyday accessibility rather than luxury exclusivity, a conviction that echoed, in a British retail context, the social mission pursued decades earlier by Danish designers such as Børge Mogensen.\n\nIn 1989, Conran founded the Design Museum in London, funding and establishing an institution dedicated to displaying industrial and product design with the same seriousness previously reserved for fine art museums, a project he continued supporting for the rest of his life. He was knighted in 1983 for his services to British design and retail, and died at his home in Berkshire in 2020, remembered as the figure most responsible for bringing modern design into the ordinary British household.",
    timeline: [
      { date: "1931", title: "Born in Kingston upon Thames", subtitle: "England", description: "Terence Conran is born and studies textile design at the Central School of Art and Design in London." },
      { date: "1950s", title: "Early Furniture and Restaurant Work", subtitle: "London, England", description: "He works as a furniture maker and restaurant designer, gaining practical experience across several disciplines." },
      { date: "1964", title: "Opening Habitat", subtitle: "Fulham Road, London", description: "He opens the first Habitat store, selling affordably priced, well-designed furniture and housewares to a new generation of British consumers." },
      { date: "1960s – 1970s", title: "Habitat's Expansion", subtitle: "A retail model proven", description: "Habitat expands rapidly across Britain, proving that good design could be sold accessibly at mass-market scale." },
      { date: "1970s – 1980s", title: "Building a Retail Group", subtitle: "Mothercare, Richard Shops", description: "He expands his business interests into a wider corporate retail group." },
      { date: "1980s", title: "Becoming a Restaurateur", subtitle: "London, England", description: "He opens a sequence of large, design-conscious restaurants, including Bibendum and Quaglino's." },
      { date: "1983", title: "Knighted", subtitle: "A national honour", description: "He is knighted for his services to British design and retail." },
      { date: "1989", title: "Founding the Design Museum", subtitle: "London, England", description: "He founds and funds the Design Museum, dedicated to displaying industrial and product design with museum-level seriousness." },
      { date: "1990s – 2000s", title: "Continued Retail and Restaurant Ventures", subtitle: "A widening empire", description: "He continues expanding his retail and hospitality businesses into the new century." },
      { date: "2020", title: "Death in Berkshire", subtitle: "A democratising legacy", description: "Conran dies at his home in Berkshire, remembered as the figure most responsible for bringing modern design into ordinary British households." },
    ],
  },
  {
    slug: "jasper-morrison",
    first_name: "Jasper",
    last_name: "Morrison",
    nationality: "United Kingdom",
    birth_date: new Date("1959-01-16"),
    death_date: null,
    quote: "Design should be unobtrusive. The best objects disappear into everyday life.",
    biography:
      "Jasper Morrison was born in London in 1959 and studied design at Kingston Polytechnic and the Royal College of Art before a scholarship took him to West Berlin in the mid-1980s, where he encountered a design culture considerably more restrained than the loud, provocative Postmodernism and Memphis-influenced aesthetics then dominant in much of Italian and international design. He opened his own studio in London in 1986, developing an approach built around reducing objects to their most essential, unremarkable form rather than pursuing visual novelty or signature styling.\n\nThis sensibility produced the Thinking Man's Chair for Cappellini in 1987, a quietly sculptural tubular steel armchair whose restrained form drew more attention from the design press for what it deliberately omitted than for any single striking feature, establishing Morrison's reputation as a designer working directly against the decorative excess of his design-school contemporaries. His 1999 Ply Chair and 2000 Air Chair for the Italian manufacturer Magis extended this restraint into mass production: the Air Chair, formed through a single gas-injection plastic moulding process in one continuous piece, achieved genuine structural lightness and low manufacturing cost without any applied decoration whatsoever.\n\nIn the early 2000s, Morrison formalised his design philosophy together with the Japanese designer Naoto Fukasawa under the term \"Super Normal,\" organising joint exhibitions and a co-authored book celebrating overlooked, anonymously designed everyday objects — a bottle opener, a glass, a stapler — that had achieved a kind of unselfconscious perfection through gradual refinement over many years rather than a single inventive gesture, arguing that most design history wrongly celebrated novelty over this quieter, more durable kind of achievement. The philosophy positioned Morrison as a leading figure in what critics termed the \"New Simplicity,\" a reaction against both Memphis-era maximalism and the increasingly sculptural, attention-seeking furniture of the 1990s.\n\nMorrison has continued designing furniture, transport systems and consumer electronics for manufacturers including Vitra, Alessi and Muji, maintaining studios in London, Paris and Tokyo. He remains one of contemporary design's most consistent advocates for restraint, continuing to argue that the most successful objects are often the ones that attract the least attention to themselves.",
    timeline: [
      { date: "1959", title: "Born in London", subtitle: "London, England", description: "Jasper Morrison is born and studies design at Kingston Polytechnic and the Royal College of Art." },
      { date: "1984 – 1985", title: "A Berlin Scholarship", subtitle: "West Berlin, Germany", description: "A scholarship exposes him to a design culture considerably more restrained than prevailing Postmodern and Memphis aesthetics." },
      { date: "1986", title: "Opening His Own Studio", subtitle: "London, England", description: "He establishes his London practice, developing his approach of reducing objects to their essential, unremarkable form." },
      { date: "1987", title: "The Thinking Man's Chair", subtitle: "Cappellini", description: "His restrained tubular steel armchair establishes his reputation as a designer working against decorative excess." },
      { date: "1999", title: "The Ply Chair", subtitle: "Magis", description: "His moulded plywood chair for Magis continues his pursuit of structural simplicity in mass production." },
      { date: "2000", title: "The Air Chair", subtitle: "A single-mould breakthrough", description: "His gas-injection moulded plastic chair for Magis achieves structural lightness in a single continuous piece, without applied decoration." },
      { date: "2000s", title: "Developing \"Super Normal\"", subtitle: "With Naoto Fukasawa", description: "Together with Naoto Fukasawa, he formalises a design philosophy celebrating anonymously refined everyday objects over novelty." },
      { date: "2006", title: "Super Normal Exhibition and Book", subtitle: "A philosophy published", description: "He and Fukasawa present a joint exhibition and book, positioning Morrison within a wider \"New Simplicity\" movement." },
      { date: "2000s – 2010s", title: "Designing for Vitra and Muji", subtitle: "A widening practice", description: "He continues designing furniture, consumer electronics and transport systems for manufacturers including Vitra, Alessi and Muji." },
      { date: "Present", title: "An Ongoing Practice", subtitle: "London, Paris, Tokyo", description: "Morrison continues to maintain studios across three cities, remaining a leading advocate for restraint in contemporary design." },
    ],
  },
  {
    slug: "ron-arad",
    first_name: "Ron",
    last_name: "Arad",
    nationality: "Israel",
    birth_date: new Date("1951-07-24"),
    death_date: null,
    quote: "I don't do style. I do ideas.",
    biography:
      "Ron Arad was born in Tel Aviv, Israel, in 1951 and studied at the Jerusalem Academy of Art before moving to London in 1973 to study architecture at the Architectural Association, a school known for its experimental, theory-driven culture that shaped his later refusal to treat furniture and architecture as separate disciplines. In 1981 he founded his own studio, One Off, in London's Covent Garden, and the same year produced the Rover Chair, an armchair built by bolting a salvaged Rover car seat onto a frame of scaffolding tube — a found-object gesture that announced his career-long interest in reusing industrial materials in unexpected configurations rather than designing conventional furniture from scratch.\n\nArad's furniture consistently treated metal as a material capable of fluid, almost liquid movement: his Well Tempered Chair of 1986 folded tempered spring steel sheets into a seat that flexed and gave under a sitter's weight, while his later Bookworm shelving system, a continuous ribbon of flexible, coloured steel or plastic that could be bent into any shape against a wall, dispensed with fixed shelf positions entirely. These designs were produced both as limited-edition art pieces sold through galleries and, later in his career, through mass-market licensing deals with manufacturers including Kartell and Moroso, allowing Arad to move fluidly between the gallery and the showroom in a way few contemporaries attempted.\n\nBeyond furniture, Arad's architectural practice has produced buildings including the Design Museum Holon in Israel, completed in 2010, its sweeping ribbons of rusted steel cladding extending his furniture's fluid metalwork to the scale of an entire institution, and a range of public sculpture and temporary pavilions internationally. He has also designed products ranging from eyewear to a limited-edition supercar, consistently resisting any single stylistic signature beyond his recurring interest in bent, continuous forms of metal.\n\nArad served as head of the Design Products department at London's Royal College of Art for over a decade, shaping a generation of British design students, and continues to practise through Ron Arad Associates. His work is held in major museum collections worldwide, and he remains one of contemporary design's most prominent figures for refusing to separate sculpture, furniture and architecture into distinct professional categories.",
    timeline: [
      { date: "1951", title: "Born in Tel Aviv", subtitle: "Tel Aviv, Israel", description: "Ron Arad is born and studies at the Jerusalem Academy of Art before moving to London." },
      { date: "1973 – 1979", title: "Studying at the Architectural Association", subtitle: "London, England", description: "He studies architecture at the AA, an experimental school that shapes his refusal to separate furniture from architecture." },
      { date: "1981", title: "Founding One Off", subtitle: "Covent Garden, London", description: "He establishes his own studio and gallery space in London." },
      { date: "1981", title: "The Rover Chair", subtitle: "A found-object debut", description: "His chair, built from a salvaged car seat bolted to scaffolding tube, announces his career-long interest in reused industrial materials." },
      { date: "1986", title: "The Well Tempered Chair", subtitle: "Flexible steel", description: "His chair, built from folded tempered spring steel sheets, flexes and gives under a sitter's weight." },
      { date: "1989", title: "The Bookworm Shelf", subtitle: "A continuous ribbon", description: "His flexible steel shelving system dispenses with fixed shelf positions, bending into any configuration." },
      { date: "1990s", title: "Mass-Market Licensing", subtitle: "Kartell and Moroso", description: "He begins licensing designs for mass production, moving fluidly between limited-edition gallery pieces and manufactured products." },
      { date: "1997 – 2009", title: "Head of Design Products, RCA", subtitle: "London, England", description: "He leads the Design Products department at the Royal College of Art, shaping a generation of British designers." },
      { date: "2010", title: "Design Museum Holon", subtitle: "Holon, Israel", description: "His museum building, clad in sweeping ribbons of rusted steel, extends his furniture's fluid metalwork to architectural scale." },
      { date: "Present", title: "An Ongoing Practice", subtitle: "London, England", description: "Arad continues to practise through Ron Arad Associates, remaining a prominent figure across furniture, architecture and sculpture." },
    ],
  },
  {
    slug: "marc-newson",
    first_name: "Marc",
    last_name: "Newson",
    nationality: "Australia",
    birth_date: new Date("1963-10-20"),
    death_date: null,
    quote: "I'm not interested in fashion. I'm interested in objects that still look right in twenty years.",
    biography:
      "Marc Newson was born in Sydney, Australia, in 1963 and studied sculpture and jewellery design at the Sydney College of the Arts, an unconventional entry point into furniture design that he credited with his lifelong focus on sculptural, continuous form over conventional joinery or construction logic. In 1986, with a grant from the Australia Council, he produced the Lockheed Lounge, a chaise longue whose fibreglass shell was entirely clad in hand-riveted sheets of aluminium, evoking an aircraft fuselage — a labour-intensive, small-batch design that later became one of the most expensive pieces of furniture by a living designer ever sold at auction.\n\nNewson relocated first to Tokyo and then to Paris and London through the 1990s and 2000s, building an unusually wide-ranging practice that moved fluidly between extremely limited-edition art furniture sold through galleries and large-scale industrial design for mass manufacturers, a dual career path that distinguished him from designers committed to either pole exclusively. His industrial design work included luggage for Samsonite, bicycles, kitchen appliances for various manufacturers, and a long engagement with Ford on concept car design, applying the same continuous, biomorphic surfaces visible in his furniture to entirely different product categories and manufacturing processes.\n\nHis most publicly visible design work involved transportation and aviation: Newson redesigned cabin interiors for Qantas, the Australian national airline, and developed concept aircraft interiors for various manufacturers, extending his furniture's sculptural vocabulary to the considerably more technically constrained environment of commercial aviation. He also designed the Ikepod watch brand's product line, applying his smooth, rounded formal language to wearable technology years before smartwatches made such design questions broadly relevant to the wider industry.\n\nFrom 2014, Newson began an informal consulting relationship with Apple's design team under Jony Ive, reportedly contributing to products including the Apple Watch, extending his decades-long interest in applying sculptural, biomorphic design thinking to consumer electronics. He continues to practise internationally, and his furniture, including the Lockheed Lounge, remains held in major museum collections and continues to achieve some of the highest resale prices of any living furniture designer's work.",
    timeline: [
      { date: "1963", title: "Born in Sydney", subtitle: "Sydney, Australia", description: "Marc Newson is born and studies sculpture and jewellery design at the Sydney College of the Arts." },
      { date: "1986", title: "The Lockheed Lounge", subtitle: "A debut icon", description: "Funded by an Australia Council grant, his riveted-aluminium chaise longue becomes his most recognisable design." },
      { date: "1987", title: "Relocating to Tokyo", subtitle: "A new base", description: "He moves to Tokyo, beginning an internationally itinerant career across furniture, industrial design and transport." },
      { date: "1990s", title: "Moving to Paris and London", subtitle: "A widening practice", description: "He continues building a dual career between limited-edition gallery furniture and large-scale industrial design commissions." },
      { date: "1990s", title: "Designing for Samsonite", subtitle: "Industrial design", description: "He designs luggage for Samsonite, applying his sculptural formal language to mass-produced travel goods." },
      { date: "1990s – 2000s", title: "Ford Concept Cars", subtitle: "Automotive design", description: "He contributes to concept car design for Ford, extending his continuous biomorphic surfaces to automotive form." },
      { date: "2000s", title: "Qantas Cabin Interiors", subtitle: "Aviation design", description: "He redesigns cabin interiors for the Australian national airline Qantas, working within aviation's strict technical constraints." },
      { date: "2000s", title: "Ikepod Watches", subtitle: "Wearable design", description: "He designs for the Ikepod watch brand, applying his rounded formal language to wearable technology." },
      { date: "2014", title: "Consulting for Apple", subtitle: "With Jony Ive", description: "He begins an informal consulting relationship with Apple's design team, reportedly contributing to products including the Apple Watch." },
      { date: "Present", title: "An Ongoing Practice", subtitle: "International", description: "Newson continues to practise internationally; his furniture remains among the highest resale-value work of any living designer." },
    ],
  },
]

export default async function seedAdditionalDesignersBatch3({ container }: ExecArgs) {
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
