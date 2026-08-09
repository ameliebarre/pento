// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Newsletter } from "@/features/home/newsletter";

describe("Newsletter", () => {
  it("renders the heading and the email form", () => {
    render(<Newsletter />);

    expect(screen.getByRole("heading", { name: "Restez inspiré" })).toBeInTheDocument();
    expect(screen.getByLabelText("Adresse e-mail")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "S'inscrire" })).toBeInTheDocument();
  });

  it("lets the user type their email", async () => {
    const user = userEvent.setup();
    render(<Newsletter />);

    const input = screen.getByLabelText("Adresse e-mail");
    await user.type(input, "user@example.com");

    expect(input).toHaveValue("user@example.com");
  });

  it("shows a confirmation message and hides the form after submitting", async () => {
    const user = userEvent.setup();
    render(<Newsletter />);

    await user.type(screen.getByLabelText("Adresse e-mail"), "user@example.com");
    await user.click(screen.getByRole("button", { name: "S'inscrire" }));

    expect(
      await screen.findByText("Merci ! Votre inscription a bien été prise en compte."),
    ).toBeInTheDocument();
    expect(screen.queryByLabelText("Adresse e-mail")).not.toBeInTheDocument();
  });

  it("does not submit when the email field is left empty", async () => {
    const user = userEvent.setup();
    render(<Newsletter />);

    await user.click(screen.getByRole("button", { name: "S'inscrire" }));

    expect(
      screen.queryByText("Merci ! Votre inscription a bien été prise en compte."),
    ).not.toBeInTheDocument();
    expect(screen.getByLabelText("Adresse e-mail")).toBeInTheDocument();
  });
});
