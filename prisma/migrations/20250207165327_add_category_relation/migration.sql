-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "categoryId" DROP DEFAULT;

-- RenameIndex
ALTER INDEX "category_name_key" RENAME TO "Category_name_key";

-- RenameIndex
ALTER INDEX "category_slug_key" RENAME TO "Category_slug_key";
