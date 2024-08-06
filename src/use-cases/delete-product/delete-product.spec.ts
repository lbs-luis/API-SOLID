import { expect, describe, it, beforeEach } from 'vitest';
import { DeleteProductService } from './delete-product';
import { InMemoryProductsRepository } from '@/repositories/in-memory/in-memory-products-repository';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { ProductAlreadyExistsError } from '@/use-cases/errors/product-already-exists-error';

describe('Delete Product Service', () => {
  let sut: DeleteProductService;
  let inMemoryProductsRepository: InMemoryProductsRepository;

  beforeEach(async () => {
    inMemoryProductsRepository = new InMemoryProductsRepository();
    sut = new DeleteProductService(inMemoryProductsRepository);

    await inMemoryProductsRepository.create({
      bar_code: '000',
      description: 'prod-desc',
      name: 'prod-test-0',
      product_custom_id: 'CUSTOM-TAG',
      store_id: 'store-0',
      quantity: 100,
      price: 100
    });
  });

  it('should be able to delete a product by custom id', async () => {
    await sut.execute({ product_custom_id: 'CUSTOM-TAG' });

    const products = await inMemoryProductsRepository.getAllProducts('store-0');
    expect(products).toHaveLength(0);
  });

  it('should not be able to delete a non-existing product', async () => {
    await expect(sut.execute({ product_custom_id: 'NON-EXISTING-TAG' }))
      .rejects
      .toBeInstanceOf(ResourceNotFoundError);
  });
});
