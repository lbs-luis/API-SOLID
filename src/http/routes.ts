import { FastifyInstance } from "fastify";
import { signUp } from "./controllers/sign-up";
import { signIn } from "./controllers/sign-in";
import { profile } from "./controllers/profile";
import { verifyJWT } from "./middlewares/verify-jwt";
import { refreshSession } from "./controllers/refresh-session";
import { signUpStore } from "./controllers/sign-up-store";
import { signOut } from "./controllers/sign-out";

export async function appRoutes(app: FastifyInstance) {
  app.post('/auth/sign-up', signUp)
  app.post('/auth/sign-up/store', signUpStore)
  app.post('/auth/sign-in', signIn)
  app.get('/auth/sign-out', signOut)
  app.patch('/auth/refresh-session', refreshSession)

  /* Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}