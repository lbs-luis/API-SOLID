import { Prisma, Store } from "@prisma/client";

export interface IUsersRepository {
  findByManagerId(managerId: string): Promise<Store | null>

  create(data: Prisma.StoreCreateInput): Promise<Store>
}