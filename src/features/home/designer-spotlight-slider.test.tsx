// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  DesignerSpotlightSlider,
  type DesignerSlide,
} from "@/components/designer-spotlight-slider";

const SLIDES: DesignerSlide[] = [
  { name: "Pierre Paulin", image: "/images/pierre-paulin.jpg", title: "Titre 1", description: "Description 1" },
  { name: "Andrée Putman", image: "/images/andree-putman.jpg", title: "Titre 2", description: "Description 2" },
  { name: "Ettore Sottsass", image: "/images/ettore-sottsass.jpg", title: "Titre 3", description: "Description 3" },
];

describe("DesignerSpotlightSlider", () => {
  it("renders the first slide by default with the previous button disabled", () => {
    render(<DesignerSpotlightSlider slides={SLIDES} />);

    expect(screen.getByText("Pierre Paulin")).toBeInTheDocument();
    expect(screen.getByText("Titre 1")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Portrait de Pierre Paulin" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Designer précédent" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Designer suivant" })).not.toBeDisabled();
  });

  it("advances to the next slide when clicking the next button", async () => {
    const user = userEvent.setup();
    render(<DesignerSpotlightSlider slides={SLIDES} />);

    await user.click(screen.getByRole("button", { name: "Designer suivant" }));

    expect(await screen.findByText("Andrée Putman")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Designer précédent" })).not.toBeDisabled();
  });

  it("goes back to the previous slide when clicking the previous button", async () => {
    const user = userEvent.setup();
    render(<DesignerSpotlightSlider slides={SLIDES} />);

    await user.click(screen.getByRole("button", { name: "Designer suivant" }));
    await screen.findByText("Andrée Putman");
    await user.click(screen.getByRole("button", { name: "Designer précédent" }));

    expect(await screen.findByText("Pierre Paulin")).toBeInTheDocument();
  });

  it("disables the next button on the last slide", async () => {
    const user = userEvent.setup();
    render(<DesignerSpotlightSlider slides={SLIDES} />);

    await user.click(screen.getByRole("button", { name: "Designer suivant" }));
    await screen.findByText("Andrée Putman");
    await user.click(screen.getByRole("button", { name: "Designer suivant" }));

    expect(await screen.findByText("Ettore Sottsass")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Designer suivant" })).toBeDisabled();
  });

  it("exposes the current slide position for assistive tech", () => {
    render(<DesignerSpotlightSlider slides={SLIDES} />);

    expect(
      screen.getByRole("group", { name: "Pierre Paulin — diapositive 1 sur 3" }),
    ).toBeInTheDocument();
  });
});
