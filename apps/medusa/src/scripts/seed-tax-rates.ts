/**
 * Seeds the default VAT rate for each tax region already configured in the
 * store (fr, de, gb, dk, se, es, it). None of them had an actual rate set,
 * so automatic tax calculation was silently computing 0% everywhere.
 *
 * Prices stored on products are already configured as tax-exclusive — see
 * the existing price_preference rows for currency_code eur/usd and for the
 * "Europe" region (is_tax_inclusive: false) — so they represent the HT
 * (hors taxes) price, and Medusa adds VAT on top at cart/checkout time to
 * get the TTC price.
 *
 *   npx medusa exec ./src/scripts/seed-tax-rates.ts
 */
import { createTaxRatesWorkflow } from "@medusajs/medusa/core-flows"
import { ContainerRegistrationKeys, MedusaError } from "@medusajs/framework/utils"
import type { ExecArgs } from "@medusajs/framework/types"

// Standard VAT rates as of this writing.
const VAT_RATES_BY_COUNTRY: Record<string, number> = {
  fr: 20,
  de: 19,
  gb: 20,
  dk: 25,
  se: 25,
  es: 21,
  it: 22,
}

export default async function seedTaxRates({ container }: ExecArgs) {
  const query = container.resolve(ContainerRegistrationKeys.QUERY)

  const { data: taxRegions } = await query.graph({
    entity: "tax_region",
    fields: ["id", "country_code"],
  })

  const { data: existingTaxRates } = await query.graph({
    entity: "tax_rate",
    fields: ["id", "tax_region_id", "is_default"],
  })
  const regionsWithDefaultRate = new Set(
    existingTaxRates.filter((rate) => rate.is_default).map((rate) => rate.tax_region_id),
  )

  const toCreate = taxRegions
    .filter((region) => !regionsWithDefaultRate.has(region.id))
    .map((region) => {
      const rate = VAT_RATES_BY_COUNTRY[region.country_code]
      if (rate === undefined) {
        throw new MedusaError(
          MedusaError.Types.NOT_FOUND,
          `No VAT rate configured in this script for country "${region.country_code}" (tax region ${region.id})`,
        )
      }
      return {
        tax_region_id: region.id,
        name: `VAT ${region.country_code.toUpperCase()}`,
        code: `VAT-${region.country_code.toUpperCase()}`,
        rate,
        is_default: true,
      }
    })

  if (toCreate.length === 0) {
    console.log("Every tax region already has a default rate. Nothing to do.")
    return
  }

  await createTaxRatesWorkflow(container).run({ input: toCreate })

  for (const rate of toCreate) {
    console.log(`Created default tax rate ${rate.code} (${rate.rate}%) for ${rate.tax_region_id}`)
  }
  console.log(`Done. Created ${toCreate.length} tax rate(s).`)
}
