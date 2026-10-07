import { spawnSync } from "node:child_process";

// `prisma migrate deploy` intermittently fails with P1002 (timed out
// acquiring the advisory lock) against Neon — even right after the DB has
// been confirmed awake (see wait-for-db.ts). It's transient: retrying the
// same command shortly after has always succeeded in practice, so we do
// that automatically instead of requiring a manual redeploy.
const MAX_ATTEMPTS = 3;
const RETRY_DELAY_MS = 5000;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const result = spawnSync("npx", ["prisma", "migrate", "deploy"], {
      stdio: "inherit",
      shell: process.platform === "win32",
    });

    if (result.status === 0) {
      process.exit(0);
    }

    console.error(`prisma migrate deploy failed (attempt ${attempt}/${MAX_ATTEMPTS}).`);

    if (attempt < MAX_ATTEMPTS) {
      console.log(`Retrying in ${RETRY_DELAY_MS}ms...`);
      await sleep(RETRY_DELAY_MS);
    }
  }

  console.error(`prisma migrate deploy failed after ${MAX_ATTEMPTS} attempts.`);
  process.exit(1);
}

main();
