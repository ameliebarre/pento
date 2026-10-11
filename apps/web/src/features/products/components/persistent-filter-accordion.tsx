"use client";

import { useState } from "react";

import { Accordion } from "@/components/ui/accordion";
import { OPEN_FILTER_SECTIONS_COOKIE } from "@/features/products/constants";

function saveOpenSections(value: string[]) {
  document.cookie = `${OPEN_FILTER_SECTIONS_COOKIE}=${value.join(",")}; path=/; max-age=31536000; SameSite=Lax`;
}

type PersistentFilterAccordionProps = {
  defaultValue: string[];
  children: React.ReactNode;
};

// Filter clicks are a soft navigation, so this component stays mounted
// across them — the server-computed `defaultValue` (sections that should
// auto-open because they now have an active filter) changes on every
// filter click, but an uncontrolled Accordion only reads `defaultValue`
// once, on mount. Running the Accordion controlled and merging each new
// `defaultValue` into current state during render (React's documented
// pattern for adjusting state when a prop changes, see
// https://react.dev/learn/you-might-not-need-an-effect) is what makes
// auto-expand keep working after the first render, without ever closing a
// section the user opened by hand.
//
// The cookie is written both on this merge and on manual toggle: most
// sections open because they have an active filter (auto-expanded, no
// click on the trigger involved), not because the user clicked the
// accordion header — only saving on `onValueChange` would miss that case.
export function PersistentFilterAccordion({ defaultValue, children }: PersistentFilterAccordionProps) {
  const [prevDefaultValue, setPrevDefaultValue] = useState(defaultValue);
  const [value, setValue] = useState(defaultValue);

  if (defaultValue !== prevDefaultValue) {
    const merged = [...new Set([...value, ...defaultValue])];
    setPrevDefaultValue(defaultValue);
    setValue(merged);
    saveOpenSections(merged);
  }

  const handleValueChange = (next: string[]) => {
    setValue(next);
    saveOpenSections(next);
  };

  return (
    <Accordion multiple value={value} onValueChange={handleValueChange}>
      {children}
    </Accordion>
  );
}
