import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaUsersRepository } from "../../../repositories/prisma-users-repository";
import { PrismaMedicalDutiesRepository } from "../../../repositories/prisma-medical-duties-repository";
import { InvalidAssociationError } from "../../../services/errors/invalid-association-error";
import { AssociateUserService } from "../../../services/medical-duties/associate-user";

export async function associateUser(request: FastifyRequest, reply: FastifyReply) {

  const associateUserParamsSchema = z.object({
    medicalDutyId: z.string().uuid()
  })

  const { medicalDutyId } = associateUserParamsSchema.parse(request.params)

  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const prismaMedicalDutiesRepository = new PrismaMedicalDutiesRepository()
    const associateUserService = new AssociateUserService(
      prismaUsersRepository,
      prismaMedicalDutiesRepository
    )

    await associateUserService.execute({
      userId: request.user.sub,
      medicalDutyId
    })

  } catch (err) {
    if (err instanceof InvalidAssociationError) {
      return reply.status(409).send({ message: err.message})
    }
    throw err
  }

  return reply.status(200).send()
}