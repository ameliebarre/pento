import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack(config, { isServer }) {
    // Ensure that splitChunks is properly initialized before modifying cacheGroups
    if (!isServer && config.optimization.splitChunks) {
      config.optimization.splitChunks.cacheGroups = {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      };
    }

    return config;
  },
};

export default nextConfig;
