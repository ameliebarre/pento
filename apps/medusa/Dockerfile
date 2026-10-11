# Builds apps/medusa for production, following Medusa v2's documented
# self-hosting flow: `medusa build` produces a self-contained `.medusa/server`
# directory (its own package.json/package-lock.json) which needs its own
# production install before `medusa start` can run it.

FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/.medusa/server ./
RUN npm install --omit=dev

EXPOSE 9000
CMD ["npm", "run", "start"]
