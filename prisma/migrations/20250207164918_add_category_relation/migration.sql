/*
  Warnings:

  - You are about to drop the column `category` on the `Product` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/

CREATE TABLE "Category" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- Step 2: Create unique indexes for Category
CREATE UNIQUE INDEX "category_name_key" ON "Category"("name");
CREATE UNIQUE INDEX "category_slug_key" ON "Category"("slug");

-- Step 3: Insert a default category (e.g., 'Uncategorized')
INSERT INTO "Category" (id, name, slug) VALUES ('00000000-0000-0000-0000-000000000000', 'Uncategorized', 'uncategorized');

-- Step 4: Alter the Product table
ALTER TABLE "Product" DROP COLUMN "category",
ADD COLUMN "categoryId" UUID NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000';

-- Step 5: Add foreign key constraint
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" 
FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
