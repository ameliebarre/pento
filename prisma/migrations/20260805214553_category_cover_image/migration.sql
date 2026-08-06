-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "coverImageId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Category_coverImageId_key" ON "Category"("coverImageId");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_coverImageId_fkey" FOREIGN KEY ("coverImageId") REFERENCES "Image"("id") ON DELETE SET NULL ON UPDATE CASCADE;

