import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaMedicalDutiesRepository } from "../../../repositories/prisma-medical-duties-repository";
import { CreateMedicalDuty } from "../../../services/medical-duties/create-medical-duty";

export async function create(request: FastifyRequest, reply: FastifyReply ){
  const createBodySchema = z.object({
    title: z.string(),
    vacancies: z.number(),
    description: z.string().nullable(),
    hours: z.number(),
    location: z.string(),
  })

  const {
    title,
    vacancies,
    description,
    hours,
    location
  } = createBodySchema.parse(request.body)

  try {
    const prismaMedicalDutiesRepository = new PrismaMedicalDutiesRepository()
    const createService =  new CreateMedicalDuty(prismaMedicalDutiesRepository)

    await createService.execute({title, vacancies, description, hours, location})

  } catch(err) {
    throw err
  }

  return reply.status(201).send()

}