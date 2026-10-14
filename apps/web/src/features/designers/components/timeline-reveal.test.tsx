// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TimelineReveal } from "@/features/designers/components/timeline-reveal";
import type { DesignerTimelineEntry } from "@/features/products/medusa-types";

function buildEntries(count: number): DesignerTimelineEntry[] {
  return Array.from({ length: count }, (_, index) => ({
    year: `${1900 + index}`,
    eyebrow: `Eyebrow ${index}`,
    title: `Title ${index}`,
    description: `Description ${index}`,
  }));
}

describe("TimelineReveal", () => {
  it("shows a View more button when there are enough entries to collapse", () => {
    render(<TimelineReveal entries={buildEntries(10)} name="Gio Ponti" />);

    expect(screen.getByRole("button", { name: "View more" })).toBeInTheDocument();
    expect(screen.getByText("Title 0")).toBeInTheDocument();
    expect(screen.getByText("Title 9")).toBeInTheDocument();
  });

  it("hides the View more button once clicked", async () => {
    const user = userEvent.setup();
    render(<TimelineReveal entries={buildEntries(10)} name="Gio Ponti" />);

    await user.click(screen.getByRole("button", { name: "View more" }));

    expect(screen.queryByRole("button", { name: "View more" })).not.toBeInTheDocument();
  });

  it("omits the View more button when there is only one entry", () => {
    render(<TimelineReveal entries={buildEntries(1)} name="Gio Ponti" />);

    expect(screen.queryByRole("button", { name: "View more" })).not.toBeInTheDocument();
  });
});
