/*
  Warnings:

  - You are about to drop the column `name` on the `Process` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `production_folio_end` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `production_folio_start` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `type_id` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `lot` on the `RawMaterial` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `RawMaterial` table. All the data in the column will be lost.
  - You are about to drop the `ProductType` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `finished_product_id` to the `Process` table without a default value. This is not possible if the table is not empty.
  - Added the required column `finished_quantity` to the `Process` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Process` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paper_id` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit` to the `RawMaterial` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Units" AS ENUM ('KILOGRAMS', 'LITERS');

-- CreateEnum
CREATE TYPE "RollMaterialStatus" AS ENUM ('AVAIBLE', 'DISABLE', 'INACTIVE');

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_type_id_fkey";

-- AlterTable
ALTER TABLE "Process" DROP COLUMN "name",
ADD COLUMN     "finished_product_id" INTEGER NOT NULL,
ADD COLUMN     "finished_quantity" INTEGER NOT NULL,
ADD COLUMN     "type" "ProcessName" NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "create_at",
DROP COLUMN "production_folio_end",
DROP COLUMN "production_folio_start",
DROP COLUMN "type_id",
DROP COLUMN "weight",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "paper_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "RawMaterial" DROP COLUMN "lot",
DROP COLUMN "weight",
ADD COLUMN     "unit" "Units" NOT NULL;

-- DropTable
DROP TABLE "ProductType";

-- CreateTable
CREATE TABLE "Paper" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Paper_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RollMaterial" (
    "id" SERIAL NOT NULL,
    "material_id" INTEGER NOT NULL,
    "lot" TEXT NOT NULL,
    "lot_id" INTEGER NOT NULL,
    "weight" DECIMAL(65,30) NOT NULL,
    "paper_id" INTEGER NOT NULL,
    "status" "RollMaterialStatus" NOT NULL,

    CONSTRAINT "RollMaterial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaterialUsage" (
    "id" SERIAL NOT NULL,
    "process_id" INTEGER NOT NULL,
    "material_id" INTEGER NOT NULL,
    "roll_id" INTEGER,
    "quantity_used" DECIMAL(65,30) NOT NULL,
    "weight_user" DECIMAL(65,30) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MaterialUsage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_paper_id_fkey" FOREIGN KEY ("paper_id") REFERENCES "Paper"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RollMaterial" ADD CONSTRAINT "RollMaterial_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "RawMaterial"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RollMaterial" ADD CONSTRAINT "RollMaterial_paper_id_fkey" FOREIGN KEY ("paper_id") REFERENCES "Paper"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaterialUsage" ADD CONSTRAINT "MaterialUsage_process_id_fkey" FOREIGN KEY ("process_id") REFERENCES "Process"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaterialUsage" ADD CONSTRAINT "MaterialUsage_material_id_fkey" FOREIGN KEY ("material_id") REFERENCES "RawMaterial"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MaterialUsage" ADD CONSTRAINT "MaterialUsage_roll_id_fkey" FOREIGN KEY ("roll_id") REFERENCES "RollMaterial"("id") ON DELETE SET NULL ON UPDATE CASCADE;
