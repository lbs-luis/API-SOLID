/*
  Warnings:

  - Added the required column `price_in_cents` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "price_in_cents" INTEGER NOT NULL;
