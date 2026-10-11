import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

// Medusa only wires these up automatically for its own managed Cloud
// (EXECUTION_CONTEXT=medusa-cloud) — self-hosting needs the same Redis-backed
// Cache/Event Bus/Workflow Engine/Locking modules registered explicitly, or
// everything silently falls back to in-memory stubs that don't survive a
// restart. Shape copied from @medusajs/utils' own cloud module config.
const redisModules = process.env.REDIS_URL
  ? [
      {
        resolve: "@medusajs/medusa/cache-redis",
        options: { redisUrl: process.env.REDIS_URL },
      },
      {
        resolve: "@medusajs/medusa/event-bus-redis",
        options: {
          redisUrl: process.env.REDIS_URL,
          workerOptions: { concurrency: 1 },
        },
      },
      {
        resolve: "@medusajs/medusa/workflow-engine-redis",
        options: {
          redis: { redisUrl: process.env.REDIS_URL },
        },
      },
      {
        resolve: "@medusajs/medusa/locking",
        options: {
          providers: [
            {
              id: "locking-redis",
              resolve: "@medusajs/medusa/locking-redis",
              is_default: true,
              options: { redisUrl: process.env.REDIS_URL },
            },
          ],
        },
      },
    ]
  : []

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET,
      cookieSecret: process.env.COOKIE_SECRET,
    }
  },
  modules: [
    {
      resolve: "./src/modules/designer",
    },
    {
      resolve: "./src/modules/movement",
    },
    {
      resolve: "./src/modules/material",
    },
    {
      resolve: "./src/modules/manufacturer",
    },
    ...redisModules,
  ],
})
