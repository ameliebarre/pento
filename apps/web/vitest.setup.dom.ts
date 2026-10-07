import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

// jsdom doesn't implement IntersectionObserver, which Motion's `whileInView`
// (used by the scroll-reveal animations) relies on to detect visibility.
class IntersectionObserverMock implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds: number[] = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

if (typeof window !== "undefined" && !window.IntersectionObserver) {
  window.IntersectionObserver = IntersectionObserverMock as unknown as typeof IntersectionObserver;
}
