import { MedicalDuty, Prisma } from "@prisma/client";

export interface MedicalDutiesRepository {
  create(data: Prisma.MedicalDutyCreateInput): Promise<MedicalDuty>
  findById(medicalDutyId: string): Promise<MedicalDuty | null> 
  associateUser(userId: string, medicalDutyId: string): void
  findAll(): Promise<MedicalDuty[]>
}