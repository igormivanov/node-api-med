import { MedicalDuty } from "@prisma/client";
import { MedicalDutiesRepository } from "../../repositories/interfaces/medical-duties-repository";

interface GetMedicalDutiesListServiceResponse {
  medicalDuties: MedicalDuty[]
}

export class GetMedicalDutiesListService {
  constructor(private medicalDutiesRepository: MedicalDutiesRepository) {}

  async execute(): Promise<GetMedicalDutiesListServiceResponse> {
    const medicalDuties = await this.medicalDutiesRepository.findAll()
    return {medicalDuties};
  }
}