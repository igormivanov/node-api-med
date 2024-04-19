import { $Enums, MedicalDuty, Prisma, User } from "@prisma/client";
import { UsersRepository } from "../interfaces/users-repository";
import { randomUUID } from "crypto";
import { MedicalDutiesRepository } from "../interfaces/medical-duties-repository";

export class InMemoryMedicalDutiesRepository implements MedicalDutiesRepository {

  public items: MedicalDuty[] = []

  async create(data: Prisma.MedicalDutyCreateInput){
    const medicalDuty: MedicalDuty = {
      created_at: new Date(),
      description: data.description ?? "",
      hours: data.hours,
      id: data.id ?? randomUUID(),
      location: data.location,
      title: data.title,
      vacancies: data.vacancies,
      userId: null
    }

    this.items.push(medicalDuty)
    return medicalDuty
  }

  async findById(medicalDutyId: string){
    const medicalDuty = this.items.find((item)  => item.id === medicalDutyId)
    if (!medicalDuty) {
      return null
    }

    return medicalDuty
  }

  async associateUser(userId: string, medicalDutyId: string){
    const medicalDuty = this.items.find((item) =>  item.id === medicalDutyId)
    medicalDuty?.userId == userId;
  }

  async findAll(){
    return this.items
  }
  

  

}