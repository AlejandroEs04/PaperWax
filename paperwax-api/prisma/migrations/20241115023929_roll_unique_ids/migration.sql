/*
  Warnings:

  - A unique constraint covering the columns `[lot,lot_id]` on the table `RollMaterial` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "RollMaterial_lot_lot_id_key" ON "RollMaterial"("lot", "lot_id");
