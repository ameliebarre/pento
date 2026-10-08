"use client";

import { useActionState } from "react";

import { placeOrderAction } from "@/actions/checkout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Radio, RadioGroup } from "@/components/ui/radio-group";
import { formatPrice } from "@/lib/utils";

import type { MedusaCheckoutCart, MedusaRegionCountry, MedusaShippingOption } from "../types";

type CheckoutFormProps = {
  cart: MedusaCheckoutCart;
  shippingOptions: MedusaShippingOption[];
  countries: MedusaRegionCountry[];
};

export function CheckoutForm({ cart, shippingOptions, countries }: CheckoutFormProps) {
  const [state, formAction, pending] = useActionState(placeOrderAction, { error: null });
  const currency = cart.currency_code.toUpperCase();
  const address = cart.shipping_address;
  const defaultShippingOptionId = cart.shipping_methods[0]?.shipping_option_id ?? shippingOptions[0]?.id;

  return (
    <form action={formAction} className="flex flex-col gap-8">
      <fieldset className="flex flex-col gap-4">
        <legend className="font-heading mb-2 text-lg uppercase">Adresse de livraison</legend>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            defaultValue={cart.email ?? ""}
            className="h-10 rounded-[6px]"
          />
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex flex-1 flex-col gap-2">
            <Label htmlFor="firstName">Prénom</Label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              required
              autoComplete="given-name"
              defaultValue={address?.first_name ?? ""}
              className="h-10 rounded-[6px]"
            />
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <Label htmlFor="lastName">Nom</Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              required
              autoComplete="family-name"
              defaultValue={address?.last_name ?? ""}
              className="h-10 rounded-[6px]"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="address1">Adresse</Label>
          <Input
            id="address1"
            name="address1"
            type="text"
            required
            autoComplete="address-line1"
            defaultValue={address?.address_1 ?? ""}
            className="h-10 rounded-[6px]"
          />
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex flex-1 flex-col gap-2">
            <Label htmlFor="city">Ville</Label>
            <Input
              id="city"
              name="city"
              type="text"
              required
              autoComplete="address-level2"
              defaultValue={address?.city ?? ""}
              className="h-10 rounded-[6px]"
            />
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <Label htmlFor="postalCode">Code postal</Label>
            <Input
              id="postalCode"
              name="postalCode"
              type="text"
              required
              autoComplete="postal-code"
              defaultValue={address?.postal_code ?? ""}
              className="h-10 rounded-[6px]"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex flex-1 flex-col gap-2">
            <Label htmlFor="countryCode">Pays</Label>
            <select
              id="countryCode"
              name="countryCode"
              required
              defaultValue={address?.country_code ?? ""}
              className="border-input focus-visible:border-ring focus-visible:ring-ring/50 h-10 w-full rounded-[6px] border bg-transparent px-2.5 text-sm outline-none focus-visible:ring-3"
            >
              <option value="" disabled>
                Sélectionner un pays
              </option>
              {countries.map((country) => (
                <option key={country.iso_2} value={country.iso_2}>
                  {country.display_name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <Label htmlFor="phone">Téléphone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              defaultValue={address?.phone ?? ""}
              className="h-10 rounded-[6px]"
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-3">
        <legend className="font-heading mb-2 text-lg uppercase">Livraison</legend>
        <RadioGroup name="shippingOptionId" defaultValue={defaultShippingOptionId}>
          {shippingOptions.map((option) => {
            const inputId = `shipping-${option.id}`;
            return (
              <div
                key={option.id}
                className="border-input flex items-center justify-between gap-4 rounded-[6px] border px-4 py-3"
              >
                <div className="flex items-center gap-2">
                  <Radio value={option.id} id={inputId} />
                  <Label htmlFor={inputId} className="font-normal">
                    {option.name}
                  </Label>
                </div>
                <span className="text-sm font-medium">{formatPrice(option.amount, currency)}</span>
              </div>
            );
          })}
        </RadioGroup>
      </fieldset>

      {state.error && (
        <p role="alert" className="text-destructive text-sm">
          {state.error}
        </p>
      )}

      <Button type="submit" disabled={pending} className="h-10 cursor-pointer rounded-[6px]">
        {pending ? "Validation…" : "Confirmer la commande"}
      </Button>
    </form>
  );
}
