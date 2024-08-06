import { IProductRepository } from "@/repositories/products/IProductsRepository"

interface IServiceRequest {
  product_custom_id: string
}

export class DeleteProductService {
  constructor(private productsRepository: IProductRepository) { }

  async execute({ product_custom_id }: IServiceRequest): Promise<void> {
    await this.productsRepository.delete(product_custom_id)
  }
}