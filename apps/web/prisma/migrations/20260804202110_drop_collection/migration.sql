-- DropForeignKey
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_coverImageId_fkey";

-- DropForeignKey
ALTER TABLE "ProductCollection" DROP CONSTRAINT "ProductCollection_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "ProductCollection" DROP CONSTRAINT "ProductCollection_productId_fkey";

-- DropTable
DROP TABLE "Collection";

-- DropTable
DROP TABLE "ProductCollection";

