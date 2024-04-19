import { FastifyInstance } from "fastify";
import { register } from "../controllers/users/register";
import { listUsers } from "../controllers/users/list-users";
import { authenticate } from "../controllers/users/authenticate";
import { verifyJWT } from "../hooks/verify-jwt";

export async function usersRoutes(app: FastifyInstance){
  app.post('/users', register)
  app.post('/sessions', authenticate) 
  app.get('/users', { onRequest: [verifyJWT] }, listUsers)
  
}