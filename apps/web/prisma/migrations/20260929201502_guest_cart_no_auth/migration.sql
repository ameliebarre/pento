-- Carts no longer require an authenticated user: they are identified by a
-- guest token stored in a cookie instead. No existing cart rows to migrate.
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_userId_fkey";
DROP INDEX "Cart_userId_key";
ALTER TABLE "Cart" DROP COLUMN "userId";
ALTER TABLE "Cart" ADD COLUMN "token" TEXT NOT NULL;
CREATE UNIQUE INDEX "Cart_token_key" ON "Cart"("token");
