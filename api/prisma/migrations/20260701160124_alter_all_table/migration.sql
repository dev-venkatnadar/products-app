/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Category_name_key` ON `Category`(`name`);

-- RenameIndex
ALTER TABLE `Product` RENAME INDEX `Product_categoryId_fkey` TO `Product_categoryId_idx`;
