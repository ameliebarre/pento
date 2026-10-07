-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_styleId_fkey";

-- DropForeignKey
ALTER TABLE "Style" DROP CONSTRAINT "Style_coverImageId_fkey";

-- DropIndex
DROP INDEX "Product_styleId_idx";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "styleId",
ADD COLUMN     "movementId" TEXT;

-- DropTable
DROP TABLE "Style";

-- CreateTable
CREATE TABLE "Movement" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "coverImageId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Movement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Movement_slug_key" ON "Movement"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Movement_name_key" ON "Movement"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Movement_coverImageId_key" ON "Movement"("coverImageId");

-- CreateIndex
CREATE INDEX "Product_movementId_idx" ON "Product"("movementId");

-- AddForeignKey
ALTER TABLE "Movement" ADD CONSTRAINT "Movement_coverImageId_fkey" FOREIGN KEY ("coverImageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_movementId_fkey" FOREIGN KEY ("movementId") REFERENCES "Movement"("id") ON DELETE SET NULL ON UPDATE CASCADE;

