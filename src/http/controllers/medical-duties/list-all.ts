import { FastifyReply, FastifyRequest } from "fastify"
import { PrismaMedicalDutiesRepository } from "../../../repositories/prisma-medical-duties-repository"
import { GetMedicalDutiesListService } from "../../../services/medical-duties/get-medical-duties-list"

export async function listAll(_request: FastifyRequest, reply: FastifyReply) {
  try {
    const prismaMedicalDutiesRepository = new PrismaMedicalDutiesRepository()
    const listAllService =  new GetMedicalDutiesListService(prismaMedicalDutiesRepository)

    const medicalDuties = await listAllService.execute()

    return reply.status(200).send(medicalDuties)
  } catch (err) {
    throw err
  }
}