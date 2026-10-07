# Pento — monorepo

Deux applications séparées, déployées indépendamment :

- [`apps/web`](apps/web) — vitrine Next.js + Payload CMS (contenu éditorial uniquement : Hero Banner, Passion for Design...). Voir [apps/web/README.md](apps/web/README.md).
- [`apps/medusa`](apps/medusa) — serveur Medusa pour le e-commerce (produits, pricing, promotions, inventaire, paiement), appelé en service pur par `apps/web`.

## Développement

```bash
npm install
npm run web:dev      # démarre uniquement apps/web
npm run medusa:dev   # démarre uniquement apps/medusa
npm run dev          # démarre les deux en parallèle (Turborepo)
```

Chaque app a son propre `docker-compose.yml` pour sa base Postgres locale (`apps/web` sur le port 5434, `apps/medusa` sur le port 5435) — à démarrer séparément depuis chaque dossier.
