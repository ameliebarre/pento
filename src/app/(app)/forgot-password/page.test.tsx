// @vitest-environment jsdom

import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock("@/actions/auth", () => ({
  requestPasswordResetAction: vi.fn(),
}));

import { requestPasswordResetAction } from "@/actions/auth";
import ForgotPasswordPage from "@/app/(app)/forgot-password/page";

const mockedAction = vi.mocked(requestPasswordResetAction);

describe("ForgotPasswordPage", () => {
  it("renders the email field and the submit button", () => {
    render(<ForgotPasswordPage />);

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Envoyer le lien" })).toBeInTheDocument();
  });

  it("submits the entered email to requestPasswordResetAction", async () => {
    mockedAction.mockResolvedValueOnce({ success: true });
    const user = userEvent.setup();
    render(<ForgotPasswordPage />);

    await user.type(screen.getByLabelText("Email"), "user@example.com");
    await user.click(screen.getByRole("button", { name: "Envoyer le lien" }));

    await vi.waitFor(() => expect(mockedAction).toHaveBeenCalled());
    const formData = mockedAction.mock.calls[0][1];
    expect(formData.get("email")).toBe("user@example.com");
  });

  it("shows the generic confirmation message and hides the form on success", async () => {
    mockedAction.mockResolvedValueOnce({ success: true });
    const user = userEvent.setup();
    render(<ForgotPasswordPage />);

    await user.type(screen.getByLabelText("Email"), "user@example.com");
    await user.click(screen.getByRole("button", { name: "Envoyer le lien" }));

    expect(
      await screen.findByText(/un lien de réinitialisation vient de lui être envoyé/i),
    ).toBeInTheDocument();
    expect(screen.queryByLabelText("Email")).not.toBeInTheDocument();
  });

  it("shows the error message returned by the action (e.g. rate limiting)", async () => {
    mockedAction.mockResolvedValueOnce({
      error: "Trop de tentatives. Merci de réessayer dans quelques minutes.",
    });
    const user = userEvent.setup();
    render(<ForgotPasswordPage />);

    await user.type(screen.getByLabelText("Email"), "user@example.com");
    await user.click(screen.getByRole("button", { name: "Envoyer le lien" }));

    expect(
      await screen.findByText("Trop de tentatives. Merci de réessayer dans quelques minutes."),
    ).toBeInTheDocument();
  });

  it("shows a pending state while the action is in flight", async () => {
    let resolveAction!: (value: { success: true }) => void;
    mockedAction.mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          resolveAction = resolve;
        }),
    );
    const user = userEvent.setup();
    render(<ForgotPasswordPage />);

    await user.type(screen.getByLabelText("Email"), "user@example.com");
    await user.click(screen.getByRole("button", { name: "Envoyer le lien" }));

    expect(await screen.findByRole("button", { name: "Envoi..." })).toBeDisabled();

    resolveAction({ success: true });
    await screen.findByText(/un lien de réinitialisation vient de lui être envoyé/i);
  });

  it("links back to the login page", () => {
    render(<ForgotPasswordPage />);

    expect(screen.getByRole("link", { name: "Retour à la connexion" })).toHaveAttribute(
      "href",
      "/login",
    );
  });
});
