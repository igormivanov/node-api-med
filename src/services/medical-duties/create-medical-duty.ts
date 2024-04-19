import { MedicalDuty } from '@prisma/client';
import { UsersRepository } from '../../repositories/interfaces/users-repository';
import { MedicalDutiesRepository } from '../../repositories/interfaces/medical-duties-repository';

interface CreateMedicalDutyRequest {
  title: string
  vacancies: number
  description: string | null
  hours: number    
  location: string
}

interface CreateMedicalDutyResponse {
  medicalDuty: MedicalDuty
}

export class CreateMedicalDutyService {
  constructor(private MedicalDutiesRepository: MedicalDutiesRepository) {}

  async execute({
    title,
    vacancies,
    description,
    hours,
    location
  }: CreateMedicalDutyRequest): Promise<CreateMedicalDutyResponse> {
    const medicalDuty = await this.MedicalDutiesRepository.create({
      title,
      vacancies,
      description,
      hours,
      location,
    })

    return {medicalDuty}
  }
}