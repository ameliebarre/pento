-- The product catalog, cart and orders now live entirely in Medusa
-- (apps/medusa) — see scripts/migrate-catalog-to-medusa.ts in git history
-- for the one-time migration that moved the data over.

DROP TABLE IF EXISTS "OrderItem" CASCADE;
DROP TABLE IF EXISTS "Order" CASCADE;
DROP TABLE IF EXISTS "CartItem" CASCADE;
DROP TABLE IF EXISTS "Cart" CASCADE;
DROP TABLE IF EXISTS "ProductTag" CASCADE;
DROP TABLE IF EXISTS "ProductMaterial" CASCADE;
DROP TABLE IF EXISTS "ProductDesigner" CASCADE;
DROP TABLE IF EXISTS "Product" CASCADE;
DROP TABLE IF EXISTS "Tag" CASCADE;
DROP TABLE IF EXISTS "Material" CASCADE;
DROP TABLE IF EXISTS "Movement" CASCADE;
DROP TABLE IF EXISTS "Manufacturer" CASCADE;
DROP TABLE IF EXISTS "Country" CASCADE;
DROP TABLE IF EXISTS "Designer" CASCADE;
DROP TABLE IF EXISTS "Category" CASCADE;
DROP TABLE IF EXISTS "Image" CASCADE;

DROP TYPE IF EXISTS "OrderStatus";
