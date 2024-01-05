const config = require("./config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DB_URI: config.DBI_URI,
    API: config.API,
  },
};

module.exports = nextConfig;
