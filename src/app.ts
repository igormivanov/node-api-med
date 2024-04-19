import fastify from "fastify";
import { usersRoutes } from "./http/routes/users-routes";
import { ZodError } from "zod";
import { medicalDutiesRoutes } from "./http/routes/medical-duties-routes";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(usersRoutes)
app.register(medicalDutiesRoutes)


app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({message: 'Validation error', issues: error.format()})
  }

  return reply.status(500).send({ message: 'Internal server error.' , error: error.message})
})