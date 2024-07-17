import { z } from "zod"
import { FastifyRequest, FastifyReply } from "fastify"
import { RegisterService } from "@/services/registerService"
import { UsersRepository } from "@/repositories/users/users-repository"
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error"


export async function register(request: FastifyRequest, response: FastifyReply) {
  const registBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })
  const { name, email, password } = registBodySchema.parse(request.body)

  try {
    const registerService = new RegisterService(UsersRepository)
    await registerService.execute({ name, email, password })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return response.status(500).send({ error: err.message })
    }

  }

  return response.status(201).send('user created')
}