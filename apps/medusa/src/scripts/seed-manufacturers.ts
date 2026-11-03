/**
 * Seeds the initial batch of manufacturers for the catalogue.
 *
 *   npx medusa exec ./src/scripts/seed-manufacturers.ts
 */
import type { ExecArgs } from "@medusajs/framework/types"
import { MANUFACTURER_MODULE } from "../modules/manufacturer"
import type ManufacturerModuleService from "../modules/manufacturer/service"

const MANUFACTURERS = [
  {
    slug: "vitra",
    name: "Vitra",
    country_name: "Suisse",
    website: "https://www.vitra.com",
    history:
      "Fondée en 1950 en Suisse, Vitra a fait le pari audacieux d'importer en Europe les créations du couple Eames avant de devenir elle-même un pôle majeur de création contemporaine. La marque conjugue aujourd'hui recherche, architecture et mobilier avec la même exigence.",
  },
  {
    slug: "knoll",
    name: "Knoll",
    country_name: "États-Unis",
    website: "https://www.knoll.com",
    history:
      "Fondée en 1938 à New York par Hans Knoll, la maison s'impose dès l'après-guerre comme l'éditrice de référence du mobilier moderniste, en produisant notamment les créations de Mies van der Rohe et Eero Saarinen. Aujourd'hui encore, Knoll perpétue cet héritage en rééditant fidèlement les icônes du XXᵉ siècle.",
  },
  {
    slug: "cassina",
    name: "Cassina",
    country_name: "Italie",
    website: "https://www.cassina.com",
    history:
      "Manufacture milanaise fondée en 1927, Cassina s'est imposée comme la gardienne du patrimoine moderniste italien, rééditant les créations de Le Corbusier, Charlotte Perriand et Gio Ponti. Elle demeure une référence pour l'excellence de sa fabrication artisanale.",
  },
  {
    slug: "fritz-hansen",
    name: "Fritz Hansen",
    country_name: "Danemark",
    website: "https://www.fritzhansen.com",
    history:
      "Manufacture danoise fondée en 1872, Fritz Hansen a accompagné l'essor du design scandinave en collaborant avec ses plus grands noms, d'Arne Jacobsen à Hans Wegner. Chaque pièce est produite au Danemark selon un savoir-faire artisanal transmis depuis plus de 150 ans.",
  },
  {
    slug: "carl-hansen-son",
    name: "Carl Hansen & Søn",
    country_name: "Danemark",
    website: "https://www.carlhansen.com/en",
    history:
      "Carl Hansen & Søn est une entreprise familiale danoise spécialisée dans le mobilier, située sur l'île de Fionie au Danemark. L'entreprise est à l'origine de nombreux meubles classiques du mouvement Danish modern et collabore également avec des designers contemporains. Knud Erik Hansen, actuel propriétaire et directeur général, est le petit-fils du fondateur.",
  },
  {
    slug: "b-b-italia",
    name: "B&B Italia",
    country_name: "Italie",
    website: "https://www.bebitalia.com",
    history:
      "Fondée en 1966 à Novedrate sous le nom de C&B Italia par Piero Ambrogio Busnelli, la maison prend son nom actuel en 1973 et s'impose comme pionnière du mobilier en mousse polyuréthane moulée. Elle a notamment produit les créations radicales de Gaetano Pesce, dont le fauteuil Up5&6, avant de collaborer durablement avec Antonio Citterio et Patricia Urquiola.",
  },
  {
    slug: "zanotta",
    name: "Zanotta",
    country_name: "Italie",
    website: "https://www.zanotta.com",
    history:
      "Fondée en 1954 à Nova Milanese par Aurelio Zanotta, la maison devient dans les années 1960 et 1970 l'une des éditrices les plus audacieuses du design radical italien. Elle produit notamment le fauteuil poire Sacco et le fauteuil gonflable Blow, devenus des symboles de cette période expérimentale.",
  },
  {
    slug: "ligne-roset",
    name: "Ligne Roset",
    country_name: "France",
    website: "https://www.ligne-roset.com",
    history:
      "Entreprise familiale française fondée en 1860 à Briord par la famille Roset, elle adopte le nom de Ligne Roset en 1973 au moment du lancement du canapé Togo, imaginé par Michel Ducaroy et devenu depuis l'un des meubles français les plus emblématiques du XXᵉ siècle.",
  },
  {
    slug: "kartell",
    name: "Kartell",
    country_name: "Italie",
    website: "https://www.kartell.com",
    history:
      "Fondée en 1949 près de Milan par Giulio Castelli, Kartell a fait du plastique un matériau noble pour le mobilier, en collaborant avec des designers tels que Anna Castelli Ferrieri, Philippe Starck et Ron Arad. La maison demeure une référence de l'injection plastique appliquée au design.",
  },
  {
    slug: "artek",
    name: "Artek",
    country_name: "Finlande",
    website: "https://www.artek.fi",
    history:
      "Fondée en 1935 à Helsinki par Alvar et Aino Aalto avec Maire Gullichsen et Nils-Gustav Hahl, Artek a été créée pour produire et diffuser le mobilier en bois courbé d'Alvar Aalto, dont le tabouret Stool 60 et la chaise Paimio. La maison reste aujourd'hui l'éditrice de référence du design finlandais moderne.",
  },
]

export default async function seedManufacturers({ container }: ExecArgs) {
  const manufacturerModuleService: ManufacturerModuleService = container.resolve(MANUFACTURER_MODULE)

  let created = 0
  for (const manufacturer of MANUFACTURERS) {
    const [existing] = await manufacturerModuleService.listManufacturers({ slug: manufacturer.slug })
    if (existing) {
      console.log(`Skipping ${manufacturer.slug}: already exists`)
      continue
    }
    await manufacturerModuleService.createManufacturers({ ...manufacturer, logo_url: null })
    created += 1
    console.log(`Created manufacturer ${manufacturer.slug}`)
  }

  console.log(`Done. Created ${created}/${MANUFACTURERS.length} manufacturer(s).`)
}
