import { z } from "zod"
import { FastifyRequest, FastifyReply } from "fastify"
import { RegisterUsersService } from "@/use-cases/register-users/register-users"
import { UsersRepository } from "@/repositories/users/users-repository"
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error"
import { RegisterStoresService } from "@/use-cases/register-stores/register-stores"
import { StoresRepository } from "@/repositories/stores/stores-repository"
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error"
import { StoreAlreadyExistsError } from "@/use-cases/errors/store-already-exists-error"
import { GetStoresService } from "@/use-cases/get-stores/get-stores"



export async function registerStoreAndManager(request: FastifyRequest, response: FastifyReply) {
  const registBodySchema = z.object({
    storeName: z.string(),
    storeDescription: z.string(),
    storeCustomId: z.string().regex(/^[a-zA-Z0-9-_]+$/),
    managerName: z.string(),
    managerEmail: z.string().email(),
    managerPassword: z.string().min(6),
  })
  const { managerEmail, managerName, managerPassword, storeCustomId, storeDescription, storeName } = registBodySchema.parse(request.body)

  try {

    const registerUserService = new RegisterUsersService(new UsersRepository())
    const storesRepository = new StoresRepository()
    const registerStoreService = new RegisterStoresService(storesRepository)
    const getStoresService = new GetStoresService(storesRepository)

    const { store: storeWithSameId } = await getStoresService.execute({ store_custom_id: storeCustomId })
    if (storeWithSameId) throw new StoreAlreadyExistsError()

    const { user } = await registerUserService.execute({ name: managerName, email: managerEmail, password: managerPassword, role: 'ADMIN' })
    const { store } = await registerStoreService.execute({ name: storeName, description: storeDescription, store_custom_id: storeCustomId, manager_id: user.id })

    return response.status(201).send({ user, store })

  } catch (err) {
    if (err instanceof UserAlreadyExistsError || err instanceof ResourceNotFoundError || err instanceof StoreAlreadyExistsError) {
      return response.status(500).send({ error: err.message })
    }

    throw err
  }
}