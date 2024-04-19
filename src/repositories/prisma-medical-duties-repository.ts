import { Prisma } from "@prisma/client";
import { MedicalDutiesRepository } from "./interfaces/medical-duties-repository";
import { prisma } from "../lib/prisma";

export class PrismaMedicalDutiesRepository implements MedicalDutiesRepository{

  async findAll(){
    const medicalDuties = await prisma.medicalDuty.findMany()
    return medicalDuties
  }

  async associateUser(userId: string, medicalDutyId: string){
    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        MedicalDuty: {
          connect: {
            id: medicalDutyId,
          }
        }
      }
    })
  }

  async findById(medicalDutyId: string){
    const medicalDuty = prisma.medicalDuty.findUnique({
      where: {
        id: medicalDutyId,
      }
    })
    return medicalDuty;
  }

  async create(data: Prisma.MedicalDutyCreateInput) {
    const medicalDuty = prisma.medicalDuty.create({data});
    return medicalDuty;
  }
  
}