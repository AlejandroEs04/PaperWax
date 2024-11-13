-- AlterTable
ALTER TABLE "Process" ALTER COLUMN "end_time" DROP NOT NULL,
ALTER COLUMN "final_weight" DROP NOT NULL,
ALTER COLUMN "finished_product_id" DROP NOT NULL,
ALTER COLUMN "finished_quantity" DROP NOT NULL;
