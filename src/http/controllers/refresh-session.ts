import { FastifyRequest, FastifyReply } from "fastify"

export async function refreshSession(request: FastifyRequest, response: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true })

  const token = await response.jwtSign(
    {}, {
    sign: {
      sub: request.user.sub
    }
  })

  const refreshToken = await response.jwtSign(
    {}, {
    sign: {
      sub: request.user.sub,
      expiresIn: '3d',
    }
  })

  return response
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true
    })
    .status(200)
    .send({ token })
}