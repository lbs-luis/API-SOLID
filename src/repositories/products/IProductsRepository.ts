import { Prisma, Product } from "@prisma/client";

export interface IProductRepository {
  getAllProducts(store_custom_id: string): Promise<Product[]>

  create({ description, name, bar_code, product_custom_id, store_id, quantity }: Prisma.ProductUncheckedCreateInput): Promise<Product>
}