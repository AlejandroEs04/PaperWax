/*
  Warnings:

  - You are about to drop the column `quantity` on the `RawMaterial` table. All the data in the column will be lost.
  - You are about to drop the column `received_at` on the `RawMaterial` table. All the data in the column will be lost.
  - Added the required column `stock` to the `RawMaterial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RawMaterial" DROP COLUMN "quantity",
DROP COLUMN "received_at",
ADD COLUMN     "stock" INTEGER NOT NULL;
