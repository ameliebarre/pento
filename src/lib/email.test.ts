import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockSend } = vi.hoisted(() => ({ mockSend: vi.fn() }));
vi.mock("resend", () => ({
  Resend: class {
    emails = { send: mockSend };
  },
}));

import { sendPasswordResetEmail, sendVerificationEmail } from "@/lib/email";

beforeEach(() => {
  mockSend.mockReset();
});

describe("sendPasswordResetEmail", () => {
  it("sends the email with the reset link resolved against AUTH_URL", async () => {
    mockSend.mockResolvedValueOnce({ data: { id: "email_1" }, error: null });

    await sendPasswordResetEmail("user@example.com", "/reset-password?token=abc");

    expect(mockSend).toHaveBeenCalledTimes(1);
    const call = mockSend.mock.calls[0][0];
    expect(call.to).toBe("user@example.com");
    expect(call.subject).toMatch(/mot de passe/i);
    expect(call.html).toContain("/reset-password?token=abc");
  });

  it("accepts an already-absolute URL unchanged", async () => {
    mockSend.mockResolvedValueOnce({ data: { id: "email_2" }, error: null });

    await sendPasswordResetEmail("user@example.com", "https://example.com/reset-password?token=xyz");

    const call = mockSend.mock.calls[0][0];
    expect(call.html).toContain("https://example.com/reset-password?token=xyz");
  });

  it("throws when Resend returns an error", async () => {
    mockSend.mockResolvedValueOnce({ data: null, error: { message: "Invalid API key" } });

    await expect(sendPasswordResetEmail("user@example.com", "/reset-password")).rejects.toThrow(
      "Invalid API key",
    );
  });
});

describe("sendVerificationEmail", () => {
  it("sends the email with the verification link resolved against AUTH_URL", async () => {
    mockSend.mockResolvedValueOnce({ data: { id: "email_3" }, error: null });

    await sendVerificationEmail("user@example.com", "/api/auth/verify-email?token=abc");

    expect(mockSend).toHaveBeenCalledTimes(1);
    const call = mockSend.mock.calls[0][0];
    expect(call.to).toBe("user@example.com");
    expect(call.subject).toMatch(/confirmez/i);
    expect(call.html).toContain("/api/auth/verify-email?token=abc");
  });

  it("throws when Resend returns an error", async () => {
    mockSend.mockResolvedValueOnce({ data: null, error: { message: "Invalid API key" } });

    await expect(
      sendVerificationEmail("user@example.com", "/api/auth/verify-email"),
    ).rejects.toThrow("Invalid API key");
  });
});
