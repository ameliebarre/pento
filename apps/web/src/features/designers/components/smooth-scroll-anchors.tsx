"use client";

import { useEffect } from "react";

/**
 * Scopes smooth scrolling to the designer page's in-page anchor links (the
 * biography CTA and the section nav on the beige background) without
 * changing scroll behaviour site-wide.
 */
export function SmoothScrollAnchors() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("scroll-smooth");
    return () => {
      root.classList.remove("scroll-smooth");
    };
  }, []);

  return null;
}
