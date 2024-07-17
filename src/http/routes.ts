import { FastifyInstance } from "fastify";
import { signUp } from "./controllers/sign-up";
import { signIn } from "./controllers/sign-in";
import { profile } from "./controllers/profile";

export async function appRoutes(app: FastifyInstance) {
  app.post('/auth/sign-up', signUp)
  app.post('/auth/sign-in', signIn)

  /* Authenticated */
  app.get('/me', profile)
}