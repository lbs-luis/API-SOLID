import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterStoresService } from './register-stores'
import { InMemoryStoresRepository } from '@/repositories/in-memory/in-memory-stores-repository'
import { StoreAlreadyExistsError } from '../errors/store-already-exists-error'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

describe('Register Stores Service', () => {
  let sut: RegisterStoresService
  let inMemoryStoresService: InMemoryStoresRepository
  beforeEach(async () => {
    inMemoryStoresService = new InMemoryStoresRepository()
    sut = new RegisterStoresService(inMemoryStoresService)

    await inMemoryStoresService.create({
      name: 'store-0',
      description: 'Store-0',
      manager_id: 'manager-0',
      store_custom_id: 'Store-0'
    })
  })

  it('should be able to register a new stores', async () => {
    const { store } = await sut.execute({
      name: 'store-1',
      description: 'Store-1',
      manager_id: 'manager-1',
      store_custom_id: 'Store-1'
    })

    expect(store.id).toEqual(expect.any(String))
  })

  it('should not be able to register with same store custom ID', async () => {

    expect(() => sut.execute({
      name: 'store-0',
      description: 'Store-0',
      manager_id: 'manager-0',
      store_custom_id: 'Store-0'
    })
    ).rejects.toBeInstanceOf(StoreAlreadyExistsError)
  })

  it('should not be able to register with a wrong manager ID', async () => {

    expect(() => sut.execute({
      name: 'store-1',
      description: 'Store-1',
      manager_id: 'wrong-manager',
      store_custom_id: 'Store-1'
    })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})