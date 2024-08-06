-- CreateEnum
CREATE TYPE "orderStatus" AS ENUM ('InUse', 'Available');

-- CreateEnum
CREATE TYPE "orderType" AS ENUM ('Intern', 'Personal');

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "items" JSONB NOT NULL,
    "status" "orderStatus" NOT NULL DEFAULT 'Available',
    "type" "orderType" NOT NULL,
    "store_id" TEXT NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
