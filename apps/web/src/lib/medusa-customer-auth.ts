import { createHmac } from "crypto";

import { medusa } from "@/lib/medusa";

type AccountUser = {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
};

// There's no real password behind a Medusa customer account — better-auth is
// the single source of truth for credentials. This derives a stable secret
// per user from the server-only AUTH_SECRET, instead of storing a second
// password anywhere, so we can transparently authenticate as that user's
// Medusa customer (creating it on first use) without ever asking them for
// one.
function getShadowPassword(userId: string): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET must be set to authenticate with Medusa customer accounts.");
  }
  return createHmac("sha256", secret).update(userId).digest("hex");
}

async function login(email: string, password: string): Promise<string> {
  const { token } = await medusa.client.fetch<{ token: string }>("/auth/customer/emailpass", {
    method: "POST",
    body: { email, password },
  });
  return token;
}

async function registerCustomer(user: AccountUser, password: string): Promise<void> {
  const { token: registrationToken } = await medusa.client.fetch<{ token: string }>(
    "/auth/customer/emailpass/register",
    { method: "POST", body: { email: user.email, password } },
  );

  await medusa.client.fetch("/store/customers", {
    method: "POST",
    headers: { Authorization: `Bearer ${registrationToken}` },
    body: {
      email: user.email,
      first_name: user.firstName ?? undefined,
      last_name: user.lastName ?? undefined,
    },
  });
}

// Returns a Medusa customer auth token for this account, registering the
// Medusa customer on first use. A login failure is assumed to mean the
// customer doesn't exist yet rather than a wrong password, since the
// password is derived deterministically and never changes.
export async function getMedusaCustomerToken(user: AccountUser): Promise<string> {
  const password = getShadowPassword(user.id);

  try {
    return await login(user.email, password);
  } catch {
    await registerCustomer(user, password);
    return login(user.email, password);
  }
}
