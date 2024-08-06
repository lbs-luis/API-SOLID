/*
  Warnings:

  - You are about to drop the column `product_custom_id` on the `orders` table. All the data in the column will be lost.
  - Added the required column `order_custom_id` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "product_custom_id",
ADD COLUMN     "order_custom_id" TEXT NOT NULL;
