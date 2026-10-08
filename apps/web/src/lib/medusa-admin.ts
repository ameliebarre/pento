const BASE_URL = process.env.MEDUSA_BACKEND_URL || "http://localhost:9000";

// There's no Medusa customer account behind storefront logins (see
// features/account) — admin credentials are used server-side to query
// Medusa's admin API on the signed-in user's behalf instead. The token is
// cached in module scope and only re-fetched on expiry/401, since it's the
// same single admin identity for every request, not a per-user credential.
let cachedToken: string | null = null;

async function login(): Promise<string> {
  const email = process.env.MEDUSA_ADMIN_EMAIL;
  const password = process.env.MEDUSA_ADMIN_PASSWORD;
  if (!email || !password) {
    throw new Error("Set MEDUSA_ADMIN_EMAIL and MEDUSA_ADMIN_PASSWORD to query Medusa's admin API.");
  }

  const response = await fetch(`${BASE_URL}/auth/user/emailpass`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error(`Medusa admin login failed (${response.status})`);
  }

  const { token } = (await response.json()) as { token: string };
  return token;
}

export async function medusaAdminFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  if (!cachedToken) {
    cachedToken = await login();
  }

  const request = (token: string) =>
    fetch(`${BASE_URL}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...init.headers,
      },
    });

  let response = await request(cachedToken);

  if (response.status === 401) {
    cachedToken = await login();
    response = await request(cachedToken);
  }

  if (!response.ok) {
    throw new Error(`${init.method ?? "GET"} ${path} failed (${response.status}): ${await response.text()}`);
  }

  return response.json() as Promise<T>;
}
