import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { RegisterService } from "../../../services/users/register";
import { PrismaUsersRepository } from "../../../repositories/prisma-users-repository";
import { UserAlreadyExistsError } from "../../../services/errors/user-already-exists-error";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    crm: z.string(),
    cnpj: z.string().length(14).regex(/^\d+$/),
    password: z.string().min(6),
    email: z.string().email()
  })

  const { name, crm, cnpj, password, email } = registerBodySchema.parse(request.body);
  
  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const registerService = new RegisterService(prismaUsersRepository)

    await registerService.execute({ name, crm, cnpj, password, email})

  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message})
    }
    throw err
  }

  return reply.status(201).send()
}