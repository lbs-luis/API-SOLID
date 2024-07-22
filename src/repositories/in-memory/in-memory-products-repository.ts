import { Prisma, Product } from "@prisma/client";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { ProductsRepository } from "../products/products-repository";
import { ProductAlreadyExistsError } from "@/use-cases/errors/product-already-exists-error";

export class InMemoryProductsRepository implements ProductsRepository {
  public registers: Product[] = [];
  public stores: String[] = ['store-0'];



  async getAllProducts(storeId: string) {
    const store = this.stores.find((store) => store === storeId)
    if (!store) throw new ResourceNotFoundError()
    return this.registers.filter((product) => product.store_id === storeId)
  }
  async create({ description, bar_code, name, product_custom_id, store_id, quantity }: Prisma.ProductUncheckedCreateInput) {
    const store = this.stores.find((store) => store === store_id)
    if (!store) throw new ResourceNotFoundError()
    const productWithSameCustomId = this.registers.find((product) => product.product_custom_id === product_custom_id)
    if (productWithSameCustomId) throw new ProductAlreadyExistsError()


    const product: Product = {
      bar_code,
      description,
      name,
      product_custom_id,
      quantity: quantity || 0,
      store_id,
      created_at: new Date(),
      updated_at: new Date(),
      id: `product-${this.registers.length}`
    }

    this.registers.push(product)
    return product
  }
}