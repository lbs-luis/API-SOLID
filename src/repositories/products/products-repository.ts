import { prisma } from "@/lib/prisma";
import { IProductRepository } from "./IProductsRepository";
import { Prisma } from "@prisma/client";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { ProductAlreadyExistsError } from "@/use-cases/errors/product-already-exists-error";


export class ProductsRepository implements IProductRepository {
  async getAllProducts(store_custom_id: string) {
    return await prisma.product.findMany()
  }

  async create({ description, bar_code, name, product_custom_id, store_id, quantity }: Prisma.ProductUncheckedCreateInput) {
    const storeWithSameCustomId = await prisma.store.findUnique({
      where: {
        id: store_id
      }
    })
    if (!storeWithSameCustomId) throw new ResourceNotFoundError()
    const productWithSameCustomId = await prisma.product.findUnique({
      where: {
        product_custom_id
      }
    })
    if (productWithSameCustomId) throw new ProductAlreadyExistsError()

    const product = await prisma.product.create({
      data: {
        description,
        name,
        product_custom_id,
        bar_code,
        store_id,
        quantity
      }
    })

    return product
  }
}