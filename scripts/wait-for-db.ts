import "dotenv/config";
import { Client } from "pg";

// Neon suspends its compute after a period of inactivity; the first query
// after a suspend has to wait for it to wake up, which can take longer than
// Prisma's fixed 10s advisory-lock timeout during `prisma migrate deploy`
// (surfaces as error P1002). Running a throwaway query here first, with its
// own retries, absorbs that wake-up latency before any migration runs.
const MAX_ATTEMPTS = 10;
const RETRY_DELAY_MS = 3000;

async function ping(): Promise<boolean> {
  const client = new Client({ connectionString: process.env.DATABASE_URL_UNPOOLED });
  try {
    await client.connect();
    await client.query("SELECT 1");
    return true;
  } catch {
    return false;
  } finally {
    await client.end().catch(() => {});
  }
}

async function main() {
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    if (await ping()) {
      console.log(`Database is awake (attempt ${attempt}/${MAX_ATTEMPTS}).`);
      process.exit(0);
    }
    console.log(`Database not ready yet, retrying in ${RETRY_DELAY_MS}ms (attempt ${attempt}/${MAX_ATTEMPTS})...`);
    await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
  }

  console.error("Database did not become ready in time.");
  process.exit(1);
}

main();
