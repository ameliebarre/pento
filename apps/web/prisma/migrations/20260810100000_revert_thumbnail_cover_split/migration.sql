-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_thumbnailImageId_fkey";

-- DropForeignKey
ALTER TABLE "Designer" DROP CONSTRAINT "Designer_coverImageId_fkey";

-- DropForeignKey
ALTER TABLE "Designer" DROP CONSTRAINT "Designer_thumbnailImageId_fkey";

-- DropForeignKey
ALTER TABLE "Manufacturer" DROP CONSTRAINT "Manufacturer_coverImageId_fkey";

-- DropForeignKey
ALTER TABLE "Manufacturer" DROP CONSTRAINT "Manufacturer_thumbnailImageId_fkey";

-- DropForeignKey
ALTER TABLE "Movement" DROP CONSTRAINT "Movement_thumbnailImageId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_thumbnailImageId_fkey";

-- DropIndex
DROP INDEX "Category_thumbnailImageId_key";

-- DropIndex
DROP INDEX "Designer_coverImageId_key";

-- DropIndex
DROP INDEX "Designer_thumbnailImageId_key";

-- DropIndex
DROP INDEX "Manufacturer_coverImageId_key";

-- DropIndex
DROP INDEX "Manufacturer_thumbnailImageId_key";

-- DropIndex
DROP INDEX "Movement_thumbnailImageId_key";

-- DropIndex
DROP INDEX "Product_thumbnailImageId_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "thumbnailImageId";

-- AlterTable
ALTER TABLE "Designer" DROP COLUMN "coverImageId",
DROP COLUMN "thumbnailImageId",
ADD COLUMN     "imageId" TEXT;

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "height",
DROP COLUMN "width",
ALTER COLUMN "alt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Manufacturer" DROP COLUMN "coverImageId",
DROP COLUMN "thumbnailImageId",
ADD COLUMN     "logoId" TEXT;

-- AlterTable
ALTER TABLE "Movement" DROP COLUMN "thumbnailImageId";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "story",
DROP COLUMN "thumbnailImageId";

-- CreateIndex
CREATE UNIQUE INDEX "Designer_imageId_key" ON "Designer"("imageId");

-- CreateIndex
CREATE UNIQUE INDEX "Manufacturer_logoId_key" ON "Manufacturer"("logoId");

-- AddForeignKey
ALTER TABLE "Designer" ADD CONSTRAINT "Designer_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Manufacturer" ADD CONSTRAINT "Manufacturer_logoId_fkey" FOREIGN KEY ("logoId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

