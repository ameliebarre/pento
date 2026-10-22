/**
 * First batch (10) of 30 additional designers, matching the Arne Jacobsen
 * quality bar: full-length biography, quote, dates, and a granular career
 * timeline. Movement links and similar_designers are filled by separate
 * scripts once every designer in all three batches exists.
 *
 *   npx medusa exec ./src/scripts/seed-additional-designers-batch1.ts
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
    slug: "charles-rennie-mackintosh",
    first_name: "Charles Rennie",
    last_name: "Mackintosh",
    nationality: "Scotland",
    birth_date: new Date("1868-06-07"),
    death_date: new Date("1928-12-10"),
    quote: "There is hope in honest error, none in the icy perfections of the mere stylist.",
    biography:
      "Charles Rennie Mackintosh was born in Glasgow in 1868 and trained as an apprentice architect while attending evening classes at the Glasgow School of Art, where he met the artist Margaret Macdonald, whom he married in 1900 and credited throughout his life as an equal creative partner. Working within the Glasgow firm Honeyman and Keppie, he developed what became known as the Glasgow Style — a distinctly Scottish, more geometric and restrained counterpart to the continental Art Nouveau of Paris and Vienna, built around tall, elongated lines and stylised natural motifs.\n\nHis defining commission, the new building for the Glasgow School of Art, was designed in two phases between 1897 and 1909, its severe stone exterior and wrought-iron ornament concealing a sequence of interiors — most famously the double-height library — that remain among the most studied spaces in modern architecture. Mackintosh extended the same total design philosophy to furniture, designing tall, ladder-backed chairs for Miss Cranston's chain of Glasgow tearooms, including the Willow Tearooms of 1903, where every chair, light fitting and even spoon was conceived specifically for its room.\n\nDespite this acclaim, Mackintosh struggled to sustain a viable practice in Scotland, his uncompromising vision proving difficult for conservative local clients, and after leaving Honeyman and Keppie in 1913 he found increasingly little architectural work. He and Margaret relocated to Suffolk and then the south of France in the 1920s, where he largely abandoned architecture for watercolour painting, producing a celebrated series of landscapes in his final years.\n\nMackintosh died in London in 1928, in relative obscurity and with his architectural career effectively over a decade earlier. His reputation was substantially rebuilt only in the second half of the twentieth century, and the Glasgow School of Art building — badly damaged by two fires in 2014 and 2018 — remains the subject of an ongoing, closely watched restoration.",
    timeline: [
      { date: "1868", title: "Born in Glasgow", subtitle: "Glasgow, Scotland", description: "Charles Rennie Mackintosh is born and later apprentices with the Glasgow architectural firm of John Hutchison." },
      { date: "1884 – 1889", title: "Evening Classes at the Art School", subtitle: "Meeting Margaret Macdonald", description: "He attends evening classes at the Glasgow School of Art, where he meets Margaret Macdonald and her sister Frances, future creative collaborators." },
      { date: "1889", title: "Joining Honeyman and Keppie", subtitle: "Glasgow, Scotland", description: "He joins the architectural practice of Honeyman and Keppie, where he works for over two decades on the firm's major commissions." },
      { date: "1896", title: "Winning the Art School Competition", subtitle: "A defining commission", description: "His design wins the competition to build a new Glasgow School of Art building, his most significant commission." },
      { date: "1897 – 1899", title: "Glasgow School of Art, Phase One", subtitle: "A landmark begins", description: "The first phase of the Glasgow School of Art is constructed, establishing the severe, geometric Glasgow Style." },
      { date: "1900", title: "Marrying Margaret Macdonald", subtitle: "A creative partnership", description: "He marries Margaret Macdonald, whom he credits throughout his career as an equal partner in his decorative and design work." },
      { date: "1903", title: "The Willow Tearooms", subtitle: "Glasgow, Scotland", description: "He designs every element of Miss Cranston's Willow Tearooms, including his tall, ladder-backed chairs, as a single integrated environment." },
      { date: "1907 – 1909", title: "Glasgow School of Art, Phase Two", subtitle: "The library wing", description: "The building's second phase introduces its celebrated double-height library, among the most studied interiors in modern architecture." },
      { date: "1913", title: "Leaving Honeyman and Keppie", subtitle: "A practice in decline", description: "He leaves the firm amid dwindling commissions, finding Scottish clients increasingly resistant to his uncompromising architectural vision." },
      { date: "1915 – 1923", title: "Working in England", subtitle: "Textile and furniture design", description: "Relocating first to London, Mackintosh turns to textile pattern design and small architectural commissions as building work remains scarce." },
      { date: "1923", title: "Moving to the South of France", subtitle: "A turn to painting", description: "He and Margaret relocate to Port-Vendres in the south of France, where he largely abandons architecture for watercolour landscape painting." },
      { date: "1928", title: "Death in London", subtitle: "A quiet end", description: "Mackintosh dies in London in relative obscurity; his architectural reputation is substantially rebuilt only decades later." },
    ],
  },
  {
    slug: "hector-guimard",
    first_name: "Hector",
    last_name: "Guimard",
    nationality: "France",
    birth_date: new Date("1867-03-10"),
    death_date: new Date("1942-05-20"),
    quote: "An edifice must proceed from the ground to the summit as a tree proceeds from its root to its branches.",
    biography:
      "Hector Guimard was born in Lyon in 1867 and studied architecture and decorative arts in Paris, where he began his career designing conventional buildings before a trip to England and Belgium in the early 1890s exposed him to Victor Horta's emerging Art Nouveau architecture in Brussels, an encounter that redirected his entire aesthetic. He returned to Paris convinced that a building's structure and its ornament should grow from the same organic logic, a conviction that found its first full expression in the Castel Béranger apartment building, completed in 1898.\n\nGuimard's defining commission came in 1900, when the Paris Métro company commissioned him to design station entrances for the city's new underground railway. His cast-iron canopies and balustrades, their green-painted ironwork twisting into plant-like tendrils and amber glass panels resembling dragonfly wings, became instantly recognisable civic landmarks and remain, in the surviving examples, some of the most photographed Art Nouveau structures in the world — to the point that \"Guimard\" briefly became a generic French term for the style itself.\n\nGuimard extended this organic vocabulary to furniture, wallpaper and ironwork for private houses across Paris, treating each commission as a single unified artistic statement in the manner of his idol Horta. However, as fashion moved on from Art Nouveau in the years following the First World War, his sinuous style fell rapidly out of critical and commercial favour, and Guimard, who was Jewish and married to the American Jewish painter Adeline Oppenheim, grew increasingly alarmed by the rise of antisemitism in Europe through the 1930s.\n\nIn 1938, with war looming, Guimard and his wife emigrated to New York, where he died in 1942, largely forgotten by the design world that had once celebrated him. Dozens of his original Métro entrances were demolished across the twentieth century before a later conservation movement protected the remaining examples, which today stand among the most recognisable symbols of Belle Époque Paris.",
    timeline: [
      { date: "1867", title: "Born in Lyon", subtitle: "Lyon, France", description: "Hector Guimard is born and later studies architecture and decorative arts in Paris." },
      { date: "1885 – 1894", title: "Early Architectural Training", subtitle: "Paris, France", description: "He studies at Paris's École des Arts Décoratifs and later the École des Beaux-Arts, building a conventional early practice." },
      { date: "1895", title: "Discovering Victor Horta", subtitle: "Brussels, Belgium", description: "A visit to Brussels exposes him to Victor Horta's new Art Nouveau architecture, redirecting his entire aesthetic approach." },
      { date: "1898", title: "Castel Béranger", subtitle: "Paris, France", description: "His apartment building Castel Béranger, uniting organic ornament with structure, becomes his first major Art Nouveau statement and wins a Paris city architecture prize." },
      { date: "1899", title: "Commissioned by the Paris Métro", subtitle: "A civic landmark begins", description: "The Compagnie du Métropolitain commissions Guimard to design station entrances for the new Paris underground railway." },
      { date: "1900", title: "The Métro Entrances Open", subtitle: "Paris, France", description: "His cast-iron, plant-like station entrances open to the public, becoming instantly recognisable symbols of the city." },
      { date: "1900s", title: "A Total Design Practice", subtitle: "Furniture and interiors", description: "He extends his organic style to furniture, wallpaper and ironwork for private Parisian houses, designing each as a unified environment." },
      { date: "1909", title: "Marrying Adeline Oppenheim", subtitle: "A life partnership", description: "He marries the American Jewish painter Adeline Oppenheim, who becomes a close companion through his later career." },
      { date: "1910s – 1920s", title: "Falling Out of Fashion", subtitle: "A style eclipsed", description: "As Art Deco and early modernism rise in popularity, Guimard's organic Art Nouveau style falls rapidly out of critical and commercial favour." },
      { date: "1930s", title: "Rising Alarm in Europe", subtitle: "A gathering threat", description: "As antisemitism spreads across Europe, Guimard, who is Jewish, grows increasingly concerned for his and his wife's safety." },
      { date: "1938", title: "Emigrating to New York", subtitle: "A final move", description: "With war approaching, Guimard and Adeline emigrate to New York, where he lives out his final years in relative obscurity." },
      { date: "1942", title: "Death in New York", subtitle: "A legacy later restored", description: "Guimard dies in New York; his surviving Métro entrances are later protected and celebrated as icons of Art Nouveau Paris." },
    ],
  },
  {
    slug: "antoni-gaudi",
    first_name: "Antoni",
    last_name: "Gaudí",
    nationality: "Spain",
    birth_date: new Date("1852-06-25"),
    death_date: new Date("1926-06-10"),
    quote: "Originality consists in returning to the origin.",
    biography:
      "Antoni Gaudí was born in 1852 in the Catalan region of Spain, the son of a coppersmith, and later credited his father's trade with teaching him to visualise three-dimensional form before he ever drew it on paper. He studied architecture in Barcelona, graduating in 1878 into a city experiencing a cultural and economic revival known as the Renaixença, which fostered Modernisme, a Catalan regional variant of Art Nouveau that fused sinuous natural forms with a distinctly local identity rooted in Gothic and Moorish architectural traditions.\n\nGaudí's early career was shaped decisively by his patron Eusebi Güell, a wealthy industrialist who commissioned the Palau Güell, the Park Güell public gardens, and the crypt of the unfinished Colònia Güell, each project allowing Gaudí to develop structural innovations — including catenary arches and hyperboloid vaults derived from hanging-chain models rather than conventional drafting — that let his buildings achieve startlingly organic, almost skeletal forms without precedent in European architecture. His furniture designs for these same patrons, including sinuous oak chairs and benches for the Casa Calvet and Casa Batlló, extended this structural logic down to the smallest domestic object.\n\nFrom 1883 Gaudí devoted himself increasingly to a single project, the Basílica de la Sagrada Família in Barcelona, a commission he inherited from another architect and pursued with escalating religious devotion for over four decades, funding it through donations rather than a fixed budget and accepting that it would not be completed within his own lifetime. His apartment buildings Casa Batlló and Casa Milà (La Pedrera), completed in the 1900s, brought his organic, almost marine forms to Barcelona's most prominent residential street, their undulating stone façades and wrought-iron balconies drawing both acclaim and ridicule from contemporaries.\n\nIn his final years Gaudí lived an increasingly ascetic, reclusive existence, residing in a small workshop at the Sagrada Família construction site itself. He was struck by a tram in Barcelona in 1926 and, mistaken for a beggar because of his worn clothing, died in hospital days later largely unrecognised by medical staff. The Sagrada Família remains under construction today, a UNESCO World Heritage Site expected to finally reach completion roughly a century after his death.",
    timeline: [
      { date: "1852", title: "Born in Catalonia", subtitle: "Reus or Riudoms, Spain", description: "Antoni Gaudí is born to a family of coppersmiths, a trade he later credits with teaching him to visualise form in three dimensions." },
      { date: "1873 – 1878", title: "Studying Architecture", subtitle: "Barcelona, Spain", description: "He studies architecture in Barcelona during the Catalan cultural revival known as the Renaixença, graduating in 1878." },
      { date: "1878", title: "Meeting Eusebi Güell", subtitle: "A defining patronage", description: "He meets the industrialist Eusebi Güell, who becomes his principal patron for much of his career." },
      { date: "1883", title: "Taking Over the Sagrada Família", subtitle: "Barcelona, Spain", description: "Gaudí inherits the commission for the Sagrada Família basilica, a project he will pursue for the rest of his life." },
      { date: "1886 – 1890", title: "Palau Güell", subtitle: "Barcelona, Spain", description: "He completes the Palau Güell, an opulent townhouse whose parabolic arches and rooftop chimneys reveal his structural experimentation." },
      { date: "1900 – 1914", title: "Park Güell", subtitle: "Barcelona, Spain", description: "He designs the Park Güell public gardens, their mosaic-covered benches and organic stonework among his most recognisable works." },
      { date: "1904 – 1906", title: "Casa Batlló", subtitle: "A marine façade", description: "His renovation of the Casa Batlló gives the building a rippling, almost aquatic stone façade and colourful ceramic-tiled roof." },
      { date: "1906 – 1910", title: "Casa Milà, \"La Pedrera\"", subtitle: "Barcelona, Spain", description: "His apartment building Casa Milà introduces a continuously undulating stone façade and wrought-iron balconies, provoking both acclaim and ridicule." },
      { date: "1910s", title: "Devotion to a Single Project", subtitle: "A narrowing focus", description: "Gaudí increasingly abandons other commissions to concentrate exclusively on the Sagrada Família, funding it through donations." },
      { date: "1925", title: "Moving into the Workshop", subtitle: "A reclusive final chapter", description: "He takes up residence in a small workshop at the Sagrada Família construction site, living an increasingly ascetic life." },
      { date: "1926", title: "Death in Barcelona", subtitle: "A quiet end", description: "Struck by a tram and initially unrecognised, Gaudí dies in hospital days later; the city gives him a funeral attended by thousands." },
      { date: "Ongoing", title: "The Sagrada Família Continues", subtitle: "A century-long construction", description: "Work on the Sagrada Família continues after his death, funded by donations and ticket sales, with completion anticipated roughly a century after he died." },
    ],
  },
  {
    slug: "josef-hoffmann",
    first_name: "Josef",
    last_name: "Hoffmann",
    nationality: "Austria",
    birth_date: new Date("1870-12-15"),
    death_date: new Date("1956-05-07"),
    quote: "I prefer good craftsmanship on simple material to shoddy craftsmanship on rich material.",
    biography:
      "Josef Hoffmann was born in Pirnitz, Moravia (in today's Czech Republic), in 1870 and studied architecture in Vienna under Otto Wagner, the leading figure of Viennese architectural modernism, graduating in 1895 and winning the Prix de Rome the following year. In 1897 he joined a group of artists and architects, including the painter Gustav Klimt, in resigning from Vienna's conservative Künstlerhaus to found the Vienna Secession, a movement seeking a more rational, geometric alternative to the sinuous Art Nouveau then dominant elsewhere in Europe.\n\nIn 1903, together with the designer Koloman Moser and the financial backing of the textile heir Fritz Waerndorfer, Hoffmann co-founded the Wiener Werkstätte, a cooperative workshop of artisans intended to unite architecture, furniture, metalwork, textiles and graphic design under a single coherent standard of craftsmanship, modelled partly on the British Arts and Crafts movement but pursued with a distinctly Viennese geometric discipline. His Purkersdorf Sanatorium of 1904, with its flat roof and cubic, largely unornamented forms, anticipated the architectural language of modernism decades ahead of its wider adoption.\n\nHoffmann's most complete work, the Palais Stoclet in Brussels, built between 1905 and 1911 for the Belgian banker Adolphe Stoclet, allowed him to design every element of a single residence — architecture, furniture, cutlery, and a mosaic frieze by Gustav Klimt — realising the Wiener Werkstätte's total-design ambition at an unprecedented scale and budget. His furniture from this period, including the grid-patterned, reclining Sitzmaschine chair, reduced ornament to a repeated geometric motif rather than the organic curves favoured by contemporaries elsewhere.\n\nThe Wiener Werkstätte struggled financially for much of its existence and was dissolved in 1932 amid the economic pressures of the Depression, though Hoffmann continued to design and teach in Vienna for the rest of his career, including later work for the Austrian pavilion at several international exhibitions. He died in Vienna in 1956, having helped define, alongside his Secession colleagues, a geometric strand of early modernism distinct from both the ornamental Art Nouveau that preceded it and the more severe functionalism that followed.",
    timeline: [
      { date: "1870", title: "Born in Moravia", subtitle: "Pirnitz, Moravia", description: "Josef Hoffmann is born in a region of the Austro-Hungarian Empire now part of the Czech Republic." },
      { date: "1892 – 1895", title: "Studying Under Otto Wagner", subtitle: "Vienna, Austria", description: "He studies architecture at the Vienna Academy under Otto Wagner, the leading figure of Viennese architectural modernism." },
      { date: "1896", title: "Winning the Prix de Rome", subtitle: "A formative recognition", description: "He wins the Prix de Rome, funding a study trip through Italy that deepens his sense of classical proportion." },
      { date: "1897", title: "Founding the Vienna Secession", subtitle: "A rational alternative", description: "With Gustav Klimt and others, he resigns from the conservative Künstlerhaus to found the Vienna Secession." },
      { date: "1903", title: "Founding the Wiener Werkstätte", subtitle: "With Koloman Moser", description: "With Koloman Moser and patron Fritz Waerndorfer, he founds the Wiener Werkstätte, a cooperative workshop uniting architecture and applied arts." },
      { date: "1904", title: "Purkersdorf Sanatorium", subtitle: "Vienna, Austria", description: "His flat-roofed, cubic sanatorium building anticipates the architectural language of modernism decades before its wider adoption." },
      { date: "1905 – 1911", title: "Palais Stoclet", subtitle: "Brussels, Belgium", description: "He designs every element of this Brussels mansion for banker Adolphe Stoclet, including furniture, cutlery and a Klimt mosaic frieze." },
      { date: "1908", title: "The Sitzmaschine Chair", subtitle: "A reclining geometry", description: "His adjustable, grid-patterned Sitzmaschine armchair becomes one of the Wiener Werkstätte's most recognised furniture designs." },
      { date: "1920s", title: "Teaching in Vienna", subtitle: "A lasting influence", description: "He teaches at the Vienna School of Applied Arts, shaping a generation of Austrian designers alongside his own practice." },
      { date: "1932", title: "The Wiener Werkstätte Dissolves", subtitle: "A financial end", description: "Economic pressure from the Depression forces the closure of the Wiener Werkstätte after nearly three decades of production." },
      { date: "1934", title: "Austrian Pavilion, Venice Biennale", subtitle: "International recognition", description: "He continues to design exhibition pavilions and public commissions for Austria into his sixties." },
      { date: "1956", title: "Death in Vienna", subtitle: "A geometric legacy", description: "Hoffmann dies in Vienna, remembered as a central figure in the Vienna Secession's distinct, geometric strand of early modernism." },
    ],
  },
  {
    slug: "koloman-moser",
    first_name: "Koloman",
    last_name: "Moser",
    nationality: "Austria",
    birth_date: new Date("1868-03-30"),
    death_date: new Date("1918-10-18"),
    quote: "I have always aimed to seek out the beautiful in even the most ordinary of objects.",
    biography:
      "Koloman Moser was born in Vienna in 1868 and trained as a painter at the Vienna Academy and the School of Applied Arts, developing early skill as an illustrator and graphic designer before turning to the broader applied arts for which he became known. In 1897 he joined Josef Hoffmann, Gustav Klimt and others in founding the Vienna Secession, contributing extensively to its journal Ver Sacrum, for which he designed covers, typography and layout that helped define the movement's visual identity before he had designed a single piece of furniture.\n\nIn 1903, Moser co-founded the Wiener Werkstätte together with Hoffmann and the financial backing of Fritz Waerndorfer, bringing to the cooperative workshop an unusually wide-ranging talent: he designed furniture, glassware, jewellery, postage stamps, and the stained-glass windows for Otto Wagner's Church of St. Leopold at Steinhof, a psychiatric hospital chapel whose geometric, jewel-toned glass remains one of the most celebrated works of Viennese applied art from the period. His furniture favoured a grid-like, checkerboard patterning — repeated squares inlaid in contrasting wood or paint — that became a recognisable signature distinct from Hoffmann's more architectural geometry.\n\nMoser left the Wiener Werkstätte in 1907, reportedly over financial disagreements and the strain of balancing an increasingly commercial workshop with his own painting career, and devoted his later years primarily to fine art, exhibiting paintings that received considerably less attention than his earlier design work. Despite this comparatively early departure, his contribution to the Werkstätte's identity in its formative years — spanning graphic design, furniture and the decorative arts — proved foundational to the cooperative's reputation.\n\nMoser died in Vienna in 1918, at only fifty, from throat cancer, shortly after many of his Secession-era collaborators, including Klimt, Egon Schiele and Otto Wagner, also died within the same year. His relatively brief and broad career is now recognised as one of the most versatile single contributions to the Vienna Secession's decorative project.",
    timeline: [
      { date: "1868", title: "Born in Vienna", subtitle: "Vienna, Austria", description: "Koloman Moser is born and trains as a painter at the Vienna Academy and School of Applied Arts." },
      { date: "1895", title: "Early Illustration Work", subtitle: "Vienna, Austria", description: "He establishes himself as a graphic designer and illustrator, working for Viennese publications before turning to wider applied arts." },
      { date: "1897", title: "Founding the Vienna Secession", subtitle: "With Klimt and Hoffmann", description: "He joins Gustav Klimt, Josef Hoffmann and others in founding the Vienna Secession, designing for its journal Ver Sacrum." },
      { date: "1899", title: "Teaching at the School of Applied Arts", subtitle: "Vienna, Austria", description: "He is appointed professor at the Vienna School of Applied Arts, teaching alongside his design practice." },
      { date: "1903", title: "Co-founding the Wiener Werkstätte", subtitle: "With Josef Hoffmann", description: "With Hoffmann and patron Fritz Waerndorfer, he co-founds the Wiener Werkstätte cooperative workshop." },
      { date: "1900s", title: "Furniture and Decorative Arts", subtitle: "A checkerboard signature", description: "He designs furniture, glassware and jewellery for the Werkstätte, favouring a recognisable grid and checkerboard patterning." },
      { date: "1904 – 1907", title: "Steinhof Church Windows", subtitle: "Vienna, Austria", description: "He designs the stained-glass windows for Otto Wagner's Church of St. Leopold at Steinhof, among his most celebrated works." },
      { date: "1907", title: "Leaving the Wiener Werkstätte", subtitle: "A financial parting", description: "Moser leaves the Werkstätte amid financial disagreements, turning increasingly toward his own painting career." },
      { date: "1908", title: "Kunstschau Wien", subtitle: "A final major exhibition", description: "He contributes to the Kunstschau Wien exhibition, a late showcase of Viennese applied and fine art before his focus shifts further to painting." },
      { date: "1910s", title: "A Painter's Later Years", subtitle: "Vienna, Austria", description: "He devotes his final decade primarily to painting, exhibiting work that receives less attention than his earlier design career." },
      { date: "1918", title: "Death in Vienna", subtitle: "A year of loss", description: "Moser dies of throat cancer at fifty, the same year as fellow Secession figures Gustav Klimt, Egon Schiele and Otto Wagner." },
    ],
  },
  {
    slug: "gerrit-rietveld",
    first_name: "Gerrit",
    last_name: "Rietveld",
    nationality: "Netherlands",
    birth_date: new Date("1888-06-24"),
    death_date: new Date("1964-06-25"),
    quote: "A new object needs a new way of looking.",
    biography:
      "Gerrit Rietveld was born in Utrecht in 1888, the son of a cabinetmaker, and trained in his father's workshop before opening his own furniture-making business in 1911 with no formal design education. He later studied architecture part-time while continuing his cabinetmaking trade, an unusually hands-on grounding that distinguished him from most of his European modernist contemporaries, who typically approached furniture from architectural theory rather than the workbench.\n\nAround 1917 Rietveld designed the Red and Blue Chair, a seat and backrest of flat, unupholstered wooden boards resolved entirely in straight lines and right angles, later painted in the primary colours associated with the De Stijl movement he joined that same year alongside painters Theo van Doesburg and Piet Mondrian. The chair reduced seating to a diagrammatic structure of intersecting planes, deliberately refusing any curve, upholstery or ornament, and became the clearest three-dimensional expression of De Stijl's painterly theories about pure abstraction and primary colour.\n\nIn 1924, working directly with his client Truus Schröder-Schräder, Rietveld designed the Rietveld Schröder House in Utrecht, his first major architectural work, in which movable partition walls allowed the upstairs floor to be reconfigured between an open-plan living space and separate bedrooms — a radically flexible plan to match the building's De Stijl exterior of sliding planes and primary-coloured accents. The house, still intact today, is recognised as one of the most complete built statements of the movement and was inscribed as a UNESCO World Heritage Site in 2000.\n\nRietveld continued to practise architecture and furniture design for the remainder of his career, including contributions to the Van Gogh Museum in Amsterdam, completed posthumously after his death in Utrecht in 1964. Though De Stijl itself effectively dissolved by the early 1930s, Rietveld's Red and Blue Chair and Schröder House remain two of the most widely reproduced and studied objects in the history of twentieth-century design.",
    timeline: [
      { date: "1888", title: "Born in Utrecht", subtitle: "Utrecht, Netherlands", description: "Gerrit Rietveld is born and trains in his father's cabinetmaking workshop from the age of eleven." },
      { date: "1911", title: "Opening His Own Workshop", subtitle: "Utrecht, Netherlands", description: "He establishes his own furniture-making business, continuing to work with his hands even as he later studies architecture." },
      { date: "1917", title: "The Red and Blue Chair", subtitle: "A diagrammatic design", description: "He designs the Red and Blue Chair, reducing seating to flat, intersecting wooden planes without curve or upholstery." },
      { date: "1919", title: "Joining De Stijl", subtitle: "With van Doesburg and Mondrian", description: "He joins the De Stijl movement, aligning his furniture with the group's theories of pure abstraction and primary colour." },
      { date: "1920s", title: "Furniture as Theory", subtitle: "A growing body of work", description: "He continues designing chairs and furniture built from the same reduced vocabulary of planes and primary colours." },
      { date: "1924", title: "Rietveld Schröder House", subtitle: "Utrecht, Netherlands", description: "Working with client Truus Schröder-Schräder, he completes his first major architectural work, with movable interior walls and a De Stijl exterior." },
      { date: "1928", title: "Joining CIAM", subtitle: "An international modernist network", description: "He becomes a member of the Congrès Internationaux d'Architecture Moderne, connecting him to the wider European modernist movement." },
      { date: "1930s", title: "De Stijl Dissolves", subtitle: "A movement's end", description: "The De Stijl group effectively disbands following the death of founder Theo van Doesburg in 1931, though Rietveld continues designing independently." },
      { date: "1934", title: "Zig-Zag Chair", subtitle: "A structural experiment", description: "He designs the cantilevered Zig-Zag Chair, folded from a single plane of wood without conventional legs." },
      { date: "1950s", title: "Later Architectural Work", subtitle: "Netherlands", description: "He continues practising architecture, including housing and institutional buildings across the Netherlands." },
      { date: "1963", title: "Van Gogh Museum Commission", subtitle: "Amsterdam, Netherlands", description: "He begins designs for the Van Gogh Museum in Amsterdam, a project completed after his death." },
      { date: "1964", title: "Death in Utrecht", subtitle: "A legacy in planes and colour", description: "Rietveld dies in Utrecht; the Van Gogh Museum opens posthumously in 1973, completed by his successors." },
    ],
  },
  {
    slug: "emile-jacques-ruhlmann",
    first_name: "Émile-Jacques",
    last_name: "Ruhlmann",
    nationality: "France",
    birth_date: new Date("1879-08-28"),
    death_date: new Date("1933-11-15"),
    quote: "Only the elite can pay for what is new, and it is they who make it fashionable.",
    biography:
      "Émile-Jacques Ruhlmann was born in Paris in 1879 into a family already running a successful painting and decorating business, which he took over and expanded following his father's death in 1907. Largely self-taught as a furniture designer, he began exhibiting his own pieces at the Salon d'Automne in 1913, developing a style built on rare and costly materials — macassar ebony, amboyna burl, ivory and shagreen — applied with a precision of craftsmanship that set him apart from the more industrial, mass-production ambitions of his modernist contemporaries.\n\nRuhlmann's reputation was established decisively at the 1925 Exposition Internationale des Arts Décoratifs et Industriels Modernes in Paris, the exhibition from which the term Art Deco itself derives, where his Pavillon d'un Collectionneur (Pavilion of a Collector) presented an entire luxurious interior conceived as a single, harmonious whole for an imagined wealthy client. The pavilion's star cabinet, inlaid with ivory in a radiating sunburst pattern, became one of the most reproduced images of the exhibition and established Ruhlmann as Art Deco's foremost furniture designer.\n\nUnlike the pioneers of the Bauhaus or De Stijl working in the same decade, Ruhlmann made no claim to designing for mass production or working-class accessibility; his furniture was built in small numbers by highly skilled cabinetmakers for an exclusive clientele of industrialists, aristocrats and government commissions, and he openly argued that luxury objects, pioneered for the wealthy, would eventually filter down in simplified form to a broader public. His firm, Ruhlmann et Laurent, employed dozens of specialist craftsmen across cabinetmaking, lacquer work, bronze casting and upholstery, organised almost like a atelier of the Ancien Régime rather than a modern factory.\n\nRuhlmann continued to receive prestigious commissions, including interiors for ocean liners and the French state, until his death in Paris in 1933. Art Deco's commercial dominance declined sharply in the following years as the Depression made luxury handcraft commissions increasingly rare, but Ruhlmann's furniture, scarce and painstakingly made, has since become some of the most highly valued French decorative art of the twentieth century at auction.",
    timeline: [
      { date: "1879", title: "Born in Paris", subtitle: "Paris, France", description: "Émile-Jacques Ruhlmann is born into a family running a painting and decorating business." },
      { date: "1907", title: "Taking Over the Family Firm", subtitle: "Paris, France", description: "Following his father's death, he takes over and expands the family decorating business." },
      { date: "1913", title: "First Exhibiting Furniture", subtitle: "Salon d'Automne, Paris", description: "Largely self-taught, he begins exhibiting his own furniture designs at the Salon d'Automne." },
      { date: "1919", title: "Founding Ruhlmann et Laurent", subtitle: "A dedicated workshop", description: "He establishes his furniture-making firm, employing specialist cabinetmakers, lacquer workers and bronze casters." },
      { date: "1920s", title: "Rare Materials, Exacting Craft", subtitle: "A signature style", description: "He develops his mature style built on macassar ebony, ivory inlay and shagreen, aimed at an exclusive wealthy clientele." },
      { date: "1925", title: "Pavillon d'un Collectionneur", subtitle: "Exposition des Arts Décoratifs, Paris", description: "His pavilion at the exhibition that gives Art Deco its name establishes him as the style's foremost furniture designer." },
      { date: "1925", title: "The Sunburst Cabinet", subtitle: "An Art Deco icon", description: "His ivory-inlaid cabinet with a radiating sunburst pattern becomes one of the most reproduced images of the exhibition." },
      { date: "1920s – 1930s", title: "State and Ocean Liner Commissions", subtitle: "A prestigious clientele", description: "He receives commissions from the French state and for luxury ocean liner interiors, extending his reputation internationally." },
      { date: "1929", title: "Exhibiting Alongside Rivals", subtitle: "A changing design landscape", description: "As modernist and functionalist furniture gains ground, Ruhlmann continues to argue that luxury craftsmanship leads taste rather than following it." },
      { date: "1933", title: "Death in Paris", subtitle: "The end of an atelier", description: "Ruhlmann dies in Paris; the Depression soon after makes his model of luxury handcraft increasingly rare in French design." },
      { date: "Later", title: "A Market Rediscovery", subtitle: "An auction legacy", description: "Decades later, Ruhlmann's scarce, meticulously crafted furniture becomes some of the most highly valued French decorative art at auction." },
    ],
  },
  {
    slug: "walter-gropius",
    first_name: "Walter",
    last_name: "Gropius",
    nationality: "Germany",
    birth_date: new Date("1883-05-18"),
    death_date: new Date("1969-07-05"),
    quote: "The ultimate goal of all art is the building.",
    biography:
      "Walter Gropius was born in Berlin in 1883 into a family of architects and studied architecture in Munich and Berlin before working in the office of Peter Behrens from 1908 to 1910, alongside fellow future modernists Ludwig Mies van der Rohe and Le Corbusier, absorbing Behrens's industrial design sensibility before establishing his own practice. His Fagus Factory of 1911, built with partner Adolf Meyer, used a glass curtain wall to dissolve the building's corners entirely, an early and influential statement of industrial modernism years before the term existed.\n\nIn 1919, following service in the First World War, Gropius was appointed director of a newly merged art and applied arts school in Weimar, which he named the Staatliches Bauhaus, founding it on the revolutionary premise that fine art, craft and industrial technology should be taught together rather than as separate disciplines, with students rotating through workshops in furniture, metalwork, weaving and typography under masters including Paul Klee, Wassily Kandinsky and László Moholy-Nagy. Gropius led the school through its relocation to Dessau in 1925, where he personally designed the iconic glass-walled Bauhaus Dessau building that housed it, before resigning the directorship in 1928 to concentrate on his own architectural practice, handing leadership first to Hannes Meyer and later to Mies van der Rohe.\n\nAs the Nazi regime grew increasingly hostile to the Bauhaus's modernist, internationalist ideals, forcing its final closure in 1933, Gropius emigrated first to England and then, in 1937, to the United States, where he became chairman of the department of architecture at Harvard's Graduate School of Design. There he trained a generation of American architects, including Philip Johnson, I. M. Pei and Paul Rudolph, extending the Bauhaus's influence on American building and design practice for decades after the school itself had ceased to exist.\n\nIn 1946 Gropius founded The Architects Collaborative, a Cambridge, Massachusetts firm built explicitly on the Bauhaus's collective, workshop-based working method, completing projects including the Pan Am Building in New York. He died in Boston in 1969, remembered less for any single building than for founding and shaping an institution — the Bauhaus — whose teaching philosophy reshaped architecture and design education worldwide.",
    timeline: [
      { date: "1883", title: "Born in Berlin", subtitle: "Berlin, Germany", description: "Walter Gropius is born into a family of architects and studies architecture in Munich and Berlin." },
      { date: "1908 – 1910", title: "Working for Peter Behrens", subtitle: "Berlin, Germany", description: "He works in Peter Behrens's office alongside Ludwig Mies van der Rohe and Le Corbusier, absorbing an industrial design sensibility." },
      { date: "1911", title: "Fagus Factory", subtitle: "Alfeld, Germany", description: "With partner Adolf Meyer, he designs the Fagus Factory, its glass curtain wall dissolving the building's corners entirely." },
      { date: "1919", title: "Founding the Bauhaus", subtitle: "Weimar, Germany", description: "He founds the Staatliches Bauhaus, uniting fine art, craft and industrial technology in a single curriculum." },
      { date: "1925", title: "Relocating to Dessau", subtitle: "Designing the School Itself", description: "He leads the Bauhaus's move to Dessau, personally designing its iconic glass-walled school building." },
      { date: "1928", title: "Resigning the Directorship", subtitle: "A new chapter", description: "He resigns as Bauhaus director to focus on his own architectural practice, handing leadership to Hannes Meyer." },
      { date: "1934", title: "Emigrating to England", subtitle: "Fleeing Nazi Germany", description: "As the Nazi regime closes the Bauhaus and grows hostile to modernist architecture, Gropius relocates to England." },
      { date: "1937", title: "Harvard Graduate School of Design", subtitle: "Cambridge, Massachusetts", description: "He emigrates to the United States to chair Harvard's architecture department, training a generation of American architects." },
      { date: "1946", title: "Founding The Architects Collaborative", subtitle: "A workshop model renewed", description: "He founds TAC, a Cambridge firm built on the Bauhaus's collective, workshop-based working method." },
      { date: "1958 – 1963", title: "Pan Am Building", subtitle: "New York", description: "TAC, with Gropius, designs the Pan Am Building (now MetLife Building), a prominent addition to the New York skyline." },
      { date: "1969", title: "Death in Boston", subtitle: "An institutional legacy", description: "Gropius dies in Boston, remembered chiefly for founding an institution whose teaching philosophy reshaped design education worldwide." },
    ],
  },
  {
    slug: "wilhelm-wagenfeld",
    first_name: "Wilhelm",
    last_name: "Wagenfeld",
    nationality: "Germany",
    birth_date: new Date("1900-04-15"),
    death_date: new Date("1990-05-28"),
    quote: "Good design does not shout. It serves.",
    biography:
      "Wilhelm Wagenfeld was born in Bremen, Germany, in 1900 and trained first as a silversmith's apprentice before enrolling at the Bauhaus in Weimar in 1923, studying metalworking under László Moholy-Nagy during the school's brief but intensive period of industrial design experimentation. There, in 1924, while still a student, he designed the WG24 table lamp — a clear glass base and opal glass shade reduced to a simple cylinder and sphere — which became known simply as the Bauhaus Lamp and remains one of the school's most reproduced and recognisable single objects.\n\nUnlike many of his Bauhaus contemporaries who moved toward architecture or teaching, Wagenfeld pursued industrial design as a discipline in its own right, working directly within manufacturing companies to design objects intended for genuine mass production rather than the smaller workshop runs typical of applied art. From 1931 he worked with the Jenaer Glaswerk Schott glass manufacturer, designing heat-resistant kitchen glassware that brought Bauhaus functionalist thinking into millions of ordinary German households, followed by a long collaboration with the tableware company WMF from 1954 producing cutlery and glassware built around the same principles of legibility and restraint.\n\nWagenfeld continued working through the Nazi period and the Second World War under considerable professional constraint, as the regime viewed Bauhaus-trained designers with suspicion, but he resumed and substantially expanded his industrial design career in West Germany after 1945, establishing his own design studio in Stuttgart in 1954 and becoming one of the most prolific and publicly recognised industrial designers in postwar Germany, a role that placed him alongside Dieter Rams as a direct link between the Bauhaus's founding generation and Germany's later reputation for rigorous functional design.\n\nHe continued designing glassware, lighting and household objects into his eighties, consistently arguing that good design for everyday use mattered more than singular artistic statements. Wagenfeld died in Stuttgart in 1990, and his Bauhaus Lamp remains in production today, still recognisable nearly a century after a design student first sketched it as a simple composition of glass sphere and cylinder.",
    timeline: [
      { date: "1900", title: "Born in Bremen", subtitle: "Bremen, Germany", description: "Wilhelm Wagenfeld is born and trains first as a silversmith's apprentice." },
      { date: "1923", title: "Enrolling at the Bauhaus", subtitle: "Weimar, Germany", description: "He joins the Bauhaus, studying metalworking under László Moholy-Nagy." },
      { date: "1924", title: "The Bauhaus Lamp", subtitle: "A student's icon", description: "While still a student, he designs the WG24 table lamp, later known simply as the Bauhaus Lamp." },
      { date: "1925 – 1930", title: "Teaching at the Bauhaus", subtitle: "Dessau, Germany", description: "He continues working and teaching metal design at the Bauhaus following its relocation to Dessau." },
      { date: "1931", title: "Joining Jenaer Glaswerk Schott", subtitle: "Industrial glass design", description: "He begins designing heat-resistant kitchen glassware for mass production, bringing Bauhaus principles into German households." },
      { date: "1933", title: "Working Under Constraint", subtitle: "Nazi Germany", description: "As the Bauhaus closes and Bauhaus-trained designers fall under suspicion, Wagenfeld continues his industrial design career under considerable constraint." },
      { date: "1935", title: "Kubus Storage Containers", subtitle: "A modular system", description: "He designs the stackable Kubus glass storage containers, an early example of modular kitchen storage design." },
      { date: "1947", title: "Resuming Full Practice", subtitle: "Postwar Germany", description: "Following the war, he resumes and expands his industrial design career across glass, ceramics and metal manufacturers." },
      { date: "1954", title: "Founding His Own Studio", subtitle: "Stuttgart, Germany", description: "He establishes his own design studio in Stuttgart and begins a long collaboration with tableware manufacturer WMF." },
      { date: "1950s – 1970s", title: "A Prolific Industrial Practice", subtitle: "Glassware, cutlery, lighting", description: "He becomes one of postwar Germany's most prolific industrial designers, producing household objects built on functionalist clarity." },
      { date: "1990", title: "Death in Stuttgart", subtitle: "A design still in production", description: "Wagenfeld dies in Stuttgart; his Bauhaus Lamp remains in production, recognisable nearly a century after he first designed it." },
    ],
  },
  {
    slug: "kaare-klint",
    first_name: "Kaare",
    last_name: "Klint",
    nationality: "Denmark",
    birth_date: new Date("1888-12-15"),
    death_date: new Date("1954-03-28"),
    quote: "There is nothing new under the sun, only continuous development.",
    biography:
      "Kaare Klint was born in Frederiksberg, Denmark, in 1888, the son of the architect P. V. Jensen-Klint, and trained initially as a painter before turning to furniture and architecture under his father's influence. Rather than inventing dramatically new forms, Klint approached furniture design as an almost scientific discipline, closely measuring historical furniture types — English Windsor and Chippendale chairs, Shaker furniture, Egyptian folding stools — and the human body itself, believing that good proportion was a matter of careful study and refinement rather than personal invention.\n\nIn 1924 he founded the furniture department at the Royal Danish Academy of Fine Arts, establishing a teaching method built around precise anthropometric measurement: students were taught to design storage based on the exact dimensions of folded shirts and cutlery, and seating based on measured studies of how the human body actually rested, a rigorous methodology that became the foundation of the Danish furniture design tradition for decades afterward. Klint's own furniture, including the folding Propeller Stool of 1927 and the Church Chair of 1936, reflected this same historically grounded, almost archaeological approach, refining existing furniture typologies rather than rejecting them outright.\n\nAs a teacher, Klint trained or directly influenced nearly every major figure of what later became known as the golden age of Danish design, including Børge Mogensen, Hans J. Wegner and Poul Kjærholm, each of whom inherited his insistence on studying the human body and existing furniture history before attempting a new design. This made Klint less a designer of singular icons than the architect of an entire educational system and design philosophy, one that prized quiet refinement and craftsmanship over stylistic novelty.\n\nKlint continued teaching and designing until his death in Copenhagen in 1954. Though his own furniture remains less internationally famous than that of his students, he is widely credited as the intellectual founder of the Danish Modern tradition, and the furniture department he established at the Royal Danish Academy continues to train designers according to principles he first formulated a century ago.",
    timeline: [
      { date: "1888", title: "Born in Frederiksberg", subtitle: "Denmark", description: "Kaare Klint is born the son of architect P. V. Jensen-Klint and initially trains as a painter." },
      { date: "1910s", title: "Turning to Furniture", subtitle: "Under his father's influence", description: "He turns from painting toward furniture and architecture, developing an interest in historical furniture typologies." },
      { date: "1914", title: "The Faaborg Chair", subtitle: "An early landmark", description: "Designed for the Faaborg Museum, this chair establishes his method of refining historical furniture types through careful study." },
      { date: "1924", title: "Founding the Furniture Department", subtitle: "Royal Danish Academy of Fine Arts", description: "He establishes a furniture design department built on anthropometric measurement and the study of furniture history." },
      { date: "1927", title: "The Propeller Stool", subtitle: "A folding design", description: "His folding stool, inspired partly by Egyptian and campaign furniture, becomes an early example of his historically grounded method." },
      { date: "1930s", title: "Teaching a New Generation", subtitle: "Copenhagen, Denmark", description: "His students at the Academy include Børge Mogensen, Hans J. Wegner and Poul Kjærholm, each shaped by his rigorous methodology." },
      { date: "1933", title: "The Safari Chair", subtitle: "A campaign classic", description: "Based on a traditional folding campaign chair, his Safari Chair becomes one of his most widely produced designs." },
      { date: "1936", title: "The Church Chair", subtitle: "Refining a typology", description: "His Church Chair, designed for Grundtvig's Church in Copenhagen, further demonstrates his method of historical refinement." },
      { date: "1944", title: "Deck Chair", subtitle: "A nautical study", description: "He designs a folding deck chair based on close study of traditional ship furniture proportions." },
      { date: "1944 – 1954", title: "A Defining Decade of Teaching", subtitle: "Shaping Danish design", description: "He continues leading the Academy's furniture department, consolidating the methodology that defines Danish design's golden age." },
      { date: "1954", title: "Death in Copenhagen", subtitle: "An educational legacy", description: "Klint dies in Copenhagen, remembered as the intellectual founder of the Danish Modern tradition and teacher of its defining generation." },
    ],
  },
]

export default async function seedAdditionalDesignersBatch1({ container }: ExecArgs) {
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
