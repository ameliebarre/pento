"use client";

import { useEffect } from "react";

import { Accordion } from "@/components/ui/accordion";
import { OPEN_FILTER_SECTIONS_COOKIE } from "@/features/products/constants";

function saveOpenSections(value: string[]) {
  document.cookie = `${OPEN_FILTER_SECTIONS_COOKIE}=${value.join(",")}; path=/; max-age=31536000; SameSite=Lax`;
}

type PersistentFilterAccordionProps = {
  defaultValue: string[];
  children: React.ReactNode;
};

// Every filter click is a full navigation (see price-filters.tsx for why),
// which remounts this accordion from scratch — so a section that was only
// open because it derived its state from an active filter would otherwise
// snap shut the moment that filter is cleared. Persisting which sections are
// open in a cookie (readable server-side on the next request, unlike
// sessionStorage) lets the server bake the right `defaultValue` into the
// very first render instead of correcting it client-side after a flash.
//
// The cookie is written both on mount and on change: most sections open
// because they have an active filter (auto-expanded, no click on the
// trigger involved), not because the user clicked the accordion header —
// only saving on `onValueChange` would miss that case entirely.
export function PersistentFilterAccordion({ defaultValue, children }: PersistentFilterAccordionProps) {
  useEffect(() => {
    saveOpenSections(defaultValue);
  }, [defaultValue]);

  return (
    <Accordion multiple defaultValue={defaultValue} onValueChange={saveOpenSections}>
      {children}
    </Accordion>
  );
}
