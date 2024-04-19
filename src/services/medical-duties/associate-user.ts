import { UsersRepository } from '../../repositories/interfaces/users-repository';
import { MedicalDutiesRepository } from '../../repositories/interfaces/medical-duties-repository';
import { InvalidAssociationError } from '../errors/invalid-association-error';

interface AssociateUserServiceRequest {
  userId: string,
  medicalDutyId: string,
}

export class AssociateUserService {
  constructor(
    private usersRepository: UsersRepository,
    private medicalDutiesRepository: MedicalDutiesRepository
  ) {}

  async execute({
    userId,
    medicalDutyId
  }: AssociateUserServiceRequest

){
    
    const user = await this.usersRepository.findById(userId)
    const medicalDuty = await this.medicalDutiesRepository.findById(medicalDutyId);

    if (!user || !medicalDuty) {
      throw new InvalidAssociationError()
    }

    await this.medicalDutiesRepository.associateUser(userId, medicalDutyId)
    
  }
}