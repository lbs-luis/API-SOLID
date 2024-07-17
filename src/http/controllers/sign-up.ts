import { z } from "zod"
import { FastifyRequest, FastifyReply } from "fastify"
import { RegisterService } from "@/use-cases/register"
import { UsersRepository } from "@/repositories/users/users-repository"
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error"



export async function signUp(request: FastifyRequest, response: FastifyReply) {
  const registBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.union([z.literal("Administrator"), z.literal("Operator")]),
  })
  const { name, email, password, role } = registBodySchema.parse(request.body)

  try {

    const registerService = new RegisterService(new UsersRepository())

    await registerService.execute({ name, email, password, role })

    return response.status(201).send('user created')

  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return response.status(500).send({ error: err.message })
    }

    throw err
  }
}