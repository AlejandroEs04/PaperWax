/*
  Warnings:

  - The `status` column on the `SaleProduct` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "SaleProductStatus" AS ENUM ('ON_HOLD', 'PRINTING', 'PARAFFIN', 'CUT', 'PACKAGING', 'COMPLETED', 'DELIVERED');

-- AlterTable
ALTER TABLE "SaleProduct" DROP COLUMN "status",
ADD COLUMN     "status" "SaleProductStatus" NOT NULL DEFAULT 'ON_HOLD';
