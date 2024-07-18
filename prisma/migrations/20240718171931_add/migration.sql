/*
  Warnings:

  - A unique constraint covering the columns `[store_custom_id]` on the table `stores` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `store_custom_id` to the `stores` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "stores" ADD COLUMN     "store_custom_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "stores_store_custom_id_key" ON "stores"("store_custom_id");
