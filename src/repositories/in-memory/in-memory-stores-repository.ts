import { Prisma, Store } from "@prisma/client";
import { StoresRepository } from "../stores/stores-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { StoreAlreadyExistsError } from "@/use-cases/errors/store-already-exists-error";

export class InMemoryStoresRepository implements StoresRepository {
  public registers: Store[] = [];
  public users: String[] = ['manager-0', 'manager-1'];

  async findByCustomId(store_custom_id: string) {
    const store = this.registers.find(register => register.store_custom_id === store_custom_id)
    if (!store) return null
    return store
  }
  async findAllManagerStores(manager_id: string) {
    const stores = this.registers.filter(register => register.manager_id === manager_id)
    return stores
  }
  async create({ description, name, store_custom_id, manager_id }: Prisma.StoreUncheckedCreateInput) {
    const manager = this.users.find(user => user === manager_id)
    if (!manager) throw new ResourceNotFoundError()
    const storeWithSameCustomId = this.registers.find(register => register.store_custom_id === store_custom_id)
    if (storeWithSameCustomId) throw new StoreAlreadyExistsError()

    const store: Store = {
      id: `store-${this.registers.length}`,
      store_custom_id,
      name,
      description,
      manager_id,
      created_at: new Date(),
      updated_at: new Date()
    }

    this.registers.push(store)

    return store
  }

}