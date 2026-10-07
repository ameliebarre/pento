"use client";

import { motion, useReducedMotion } from "motion/react";

type FiltersPanelProps = {
  // The filters panel is toggled via a full navigation (see price-filters.tsx
  // for why), so every filter click remounts this component — including
  // clicks that just change a selection while the panel was already open.
  // The caller works out (server-side, from the referer) whether this
  // render is a fresh reveal or an already-open panel being re-rendered, so
  // the entrance animation only plays for the former.
  shouldAnimate: boolean;
  children: React.ReactNode;
};

export function FiltersPanel({ shouldAnimate, children }: FiltersPanelProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.aside
      aria-label="Filtres"
      initial={shouldAnimate && !shouldReduceMotion ? { opacity: 0, x: -16 } : false}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="w-full shrink-0 lg:w-56"
    >
      {children}
    </motion.aside>
  );
}
