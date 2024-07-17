import { FastifyRequest, FastifyReply } from "fastify"

export async function profile(request: FastifyRequest, response: FastifyReply) {
  response.status(200)
}