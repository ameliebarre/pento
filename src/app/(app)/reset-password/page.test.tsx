// @vitest-environment jsdom

import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

const mockSearchParams = vi.fn();
vi.mock("next/navigation", () => ({
  useSearchParams: () => mockSearchParams(),
}));

vi.mock("@/actions/auth", () => ({
  resetPasswordAction: vi.fn(),
}));

import { resetPasswordAction } from "@/actions/auth";
import ResetPasswordPage from "@/app/reset-password/page";

const mockedAction = vi.mocked(resetPasswordAction);

function withToken(token: string | null) {
  mockSearchParams.mockReturnValue(new URLSearchParams(token ? { token } : {}));
}

describe("ResetPasswordPage", () => {
  it("disables submit and warns when there is no token in the URL", () => {
    withToken(null);
    render(<ResetPasswordPage />);

    expect(
      screen.getByText("Lien de réinitialisation manquant ou invalide."),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Mettre à jour le mot de passe" })).toBeDisabled();
  });

  it("submits the token and the new password to resetPasswordAction", async () => {
    withToken("valid-token");
    mockedAction.mockResolvedValueOnce({ success: true });
    const user = userEvent.setup();
    render(<ResetPasswordPage />);

    await user.type(screen.getByLabelText("Nouveau mot de passe"), "newpassword123");
    await user.click(screen.getByRole("button", { name: "Mettre à jour le mot de passe" }));

    await vi.waitFor(() => expect(mockedAction).toHaveBeenCalled());
    const formData = mockedAction.mock.calls[0][1];
    expect(formData.get("token")).toBe("valid-token");
    expect(formData.get("password")).toBe("newpassword123");
  });

  it("shows a confirmation and a login link on success", async () => {
    withToken("valid-token");
    mockedAction.mockResolvedValueOnce({ success: true });
    const user = userEvent.setup();
    render(<ResetPasswordPage />);

    await user.type(screen.getByLabelText("Nouveau mot de passe"), "newpassword123");
    await user.click(screen.getByRole("button", { name: "Mettre à jour le mot de passe" }));

    expect(await screen.findByText("Votre mot de passe a bien été mis à jour.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Se connecter" })).toHaveAttribute("href", "/login");
  });

  it("shows the error message returned by the action", async () => {
    withToken("expired-token");
    mockedAction.mockResolvedValueOnce({
      error: "Ce lien de réinitialisation est invalide ou a expiré.",
    });
    const user = userEvent.setup();
    render(<ResetPasswordPage />);

    await user.type(screen.getByLabelText("Nouveau mot de passe"), "newpassword123");
    await user.click(screen.getByRole("button", { name: "Mettre à jour le mot de passe" }));

    expect(
      await screen.findByText("Ce lien de réinitialisation est invalide ou a expiré."),
    ).toBeInTheDocument();
  });
});
