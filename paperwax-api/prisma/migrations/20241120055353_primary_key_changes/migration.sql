/*
  Warnings:

  - The primary key for the `SaleProduct` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "SaleProduct" DROP CONSTRAINT "SaleProduct_pkey",
ADD CONSTRAINT "SaleProduct_pkey" PRIMARY KEY ("sale_id", "product_id");
