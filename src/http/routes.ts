import { FastifyInstance } from "fastify";
import { registerNewUser } from "./controllers/register-new-user";
import { authenticate } from "./controllers/authenticate";
import { profile } from "./controllers/profile";
import { verifyJWT } from "./middlewares/verify-jwt";
import { refreshSession } from "./controllers/refresh-session";
import { registerStoreAndManager } from "./controllers/register-store-and-manager";

export async function appRoutes(app: FastifyInstance) {
  app.post('/sign-up', registerNewUser)
  app.post('/sign-up/store', registerStoreAndManager)
  app.post('/sign-in', authenticate)
  app.patch('/auth/refresh-session', refreshSession)

  /* Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}