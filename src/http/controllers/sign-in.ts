import { z } from "zod"
import { FastifyRequest, FastifyReply } from "fastify"
import { UsersRepository } from "@/repositories/users/users-repository"
import { AuthenticateService } from "@/use-cases/authenticate"
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error"


export async function signIn(request: FastifyRequest, response: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })
  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateService = new AuthenticateService(new UsersRepository())

    const { user } = await authenticateService.execute({ email, password, })

    const token = await response.jwtSign(
      {}, {
      sign: {
        sub: user.id
      }
    })

    const refreshToken = await response.jwtSign(
      {}, {
      sign: {
        sub: user.id,
        expiresIn: '3d',
      }
    })

    return response.setCookie('refreshToken', refreshToken, { path: '/', secure: true, sameSite: true, httpOnly: true }).status(200).send({ token })

  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return response.status(400).send({ error: err.message })
    }

    throw err
  }
}