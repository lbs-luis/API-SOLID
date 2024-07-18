import { expect, describe, it, beforeEach } from 'vitest'
import { GetStoresService } from './get-stores'
import { InMemoryStoresRepository } from '@/repositories/in-memory/in-memory-stores-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

describe('Get Stores Service', () => {
  let sut: GetStoresService
  let inMemoryStoresService: InMemoryStoresRepository
  beforeEach(async () => {
    inMemoryStoresService = new InMemoryStoresRepository()
    sut = new GetStoresService(inMemoryStoresService)

    await inMemoryStoresService.create({
      name: 'store-0',
      description: 'Store-0',
      manager_id: 'manager-0',
      store_custom_id: 'Store-0'
    })
  })

  it('should be able to find an store by its custom ID', async () => {
    const { store } = await sut.execute({
      store_custom_id: 'Store-0'
    })

    expect(store?.id).toEqual(expect.any(String))
  })

  it('should not be able to bring a store with a wrong custom id', async () => {
    const { store } = await sut.execute({
      store_custom_id: 'wrong-custom-id'
    })

    expect(store).toBeNull()
  })
})