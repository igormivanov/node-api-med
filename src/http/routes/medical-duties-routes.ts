import { FastifyInstance } from "fastify";
import { create } from "../controllers/medical-duties/create";
import { listAll } from "../controllers/medical-duties/list-all";
import { associateUser } from "../controllers/medical-duties/associate-user";
import { verifyJWT } from "../hooks/verify-jwt";

export async function medicalDutiesRoutes(app: FastifyInstance) {
  app.post('/medical-duties', { onRequest: [verifyJWT] },create)
  app.post('/medical-duties/:medicalDutyId/associate',{ onRequest: [verifyJWT] },  associateUser)
  app.get('/medical-duties', { onRequest: [verifyJWT] }, listAll)
}