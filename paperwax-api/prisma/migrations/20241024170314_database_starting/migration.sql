-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'DEVICE', 'QUALITY', 'MANAGMENT');

-- CreateEnum
CREATE TYPE "QualityControlStatus" AS ENUM ('APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ProcessName" AS ENUM ('PRINTING', 'PARAFFIN', 'CUT', 'PACKAGING');

-- CreateTable
CREATE TABLE "ProductType" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "ProductType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type_id" INTEGER NOT NULL,
    "production_folio_start" INTEGER NOT NULL,
    "production_folio_end" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "weight" DECIMAL(65,30) NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RawMaterialType" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "RawMaterialType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RawMaterial" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type_id" INTEGER NOT NULL,
    "lot" TEXT NOT NULL,
    "weight" DECIMAL(65,30) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "received_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RawMaterial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'DEVICE',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QualityControl" (
    "id" SERIAL NOT NULL,
    "process_id" INTEGER NOT NULL,
    "qc_date" TIMESTAMP(3) NOT NULL,
    "inspector_id" INTEGER NOT NULL,
    "qc_notes" TEXT NOT NULL,
    "status" "QualityControlStatus" NOT NULL,

    CONSTRAINT "QualityControl_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Process" (
    "id" SERIAL NOT NULL,
    "name" "ProcessName" NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "raw_material_id" INTEGER NOT NULL,
    "initial_weight" DECIMAL(65,30) NOT NULL,
    "final_weight" DECIMAL(65,30) NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "Process_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "ProductType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RawMaterial" ADD CONSTRAINT "RawMaterial_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "RawMaterialType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QualityControl" ADD CONSTRAINT "QualityControl_process_id_fkey" FOREIGN KEY ("process_id") REFERENCES "Process"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QualityControl" ADD CONSTRAINT "QualityControl_inspector_id_fkey" FOREIGN KEY ("inspector_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Process" ADD CONSTRAINT "Process_raw_material_id_fkey" FOREIGN KEY ("raw_material_id") REFERENCES "RawMaterial"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Process" ADD CONSTRAINT "Process_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
