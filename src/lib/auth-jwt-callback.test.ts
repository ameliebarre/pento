import { describe, expect, it } from "vitest";
import bcrypt from "bcryptjs";
import type { JWT } from "next-auth/jwt";

import { jwtCallback } from "@/lib/auth-jwt-callback";
import { prisma } from "@/lib/prisma";

async function createUser(email: string, passwordChangedAt: Date | null = null) {
  const passwordHash = await bcrypt.hash("password123", 10);
  return prisma.user.create({
    data: { email, passwordHash, firstName: "Test", lastName: "User", passwordChangedAt },
  });
}

describe("jwtCallback", () => {
  it("stamps the token from the user on sign-in", async () => {
    const user = await createUser("signin@example.com");
    const token: JWT = {};

    const result = await jwtCallback(token, {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      passwordChangedAt: user.passwordChangedAt,
    });

    expect(result?.id).toBe(user.id);
    expect(result?.firstName).toBe("Test");
    expect(result?.passwordChangedAt).toBeNull();
  });

  it("records passwordChangedAt as an ISO string on sign-in when set", async () => {
    const changedAt = new Date();
    const user = await createUser("signin-changed@example.com", changedAt);
    const token: JWT = {};

    const result = await jwtCallback(token, {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      passwordChangedAt: user.passwordChangedAt,
    });

    expect(result?.passwordChangedAt).toBe(changedAt.toISOString());
  });

  it("returns the token unchanged when it has no id", async () => {
    const token: JWT = { firstName: "Test" };

    const result = await jwtCallback(token);

    expect(result).toBe(token);
  });

  it("keeps the session valid when the password was never changed", async () => {
    const user = await createUser("never-changed@example.com", null);
    const token: JWT = { id: user.id, passwordChangedAt: null };

    const result = await jwtCallback(token);

    expect(result).not.toBeNull();
    expect(result?.id).toBe(user.id);
  });

  it("keeps the session valid when the token is newer than the last password change", async () => {
    const changedAt = new Date(Date.now() - 1000 * 60 * 60);
    const user = await createUser("still-valid@example.com", changedAt);
    const token: JWT = { id: user.id, passwordChangedAt: new Date().toISOString() };

    const result = await jwtCallback(token);

    expect(result).not.toBeNull();
    expect(result?.id).toBe(user.id);
  });

  it("invalidates the session when the password changed after the token was issued", async () => {
    const tokenIssuedAt = new Date(Date.now() - 1000 * 60 * 60);
    const user = await createUser("reset@example.com", new Date());
    const token: JWT = { id: user.id, passwordChangedAt: tokenIssuedAt.toISOString() };

    const result = await jwtCallback(token);

    expect(result).toBeNull();
  });

  it("invalidates legacy tokens issued before this token ever carried passwordChangedAt", async () => {
    const user = await createUser("legacy@example.com", new Date());
    const token: JWT = { id: user.id };

    const result = await jwtCallback(token);

    expect(result).toBeNull();
  });
});
