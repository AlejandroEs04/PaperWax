/*
  Warnings:

  - You are about to drop the column `raw_material_id` on the `Process` table. All the data in the column will be lost.
  - Added the required column `roll_material_id` to the `Process` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Process" DROP CONSTRAINT "Process_raw_material_id_fkey";

-- AlterTable
ALTER TABLE "Process" DROP COLUMN "raw_material_id",
ADD COLUMN     "roll_material_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Process" ADD CONSTRAINT "Process_roll_material_id_fkey" FOREIGN KEY ("roll_material_id") REFERENCES "RollMaterial"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
