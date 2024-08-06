-- CreateTable
CREATE TABLE "_OperatedStores" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OperatedStores_AB_unique" ON "_OperatedStores"("A", "B");

-- CreateIndex
CREATE INDEX "_OperatedStores_B_index" ON "_OperatedStores"("B");

-- AddForeignKey
ALTER TABLE "_OperatedStores" ADD CONSTRAINT "_OperatedStores_A_fkey" FOREIGN KEY ("A") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OperatedStores" ADD CONSTRAINT "_OperatedStores_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
