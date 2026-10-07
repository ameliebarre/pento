import { headers } from "next/headers";

export async function getClientIp(): Promise<string> {
  const requestHeaders = await headers();
  const forwardedFor = requestHeaders.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();

  return requestHeaders.get("x-real-ip") ?? "unknown";
}
