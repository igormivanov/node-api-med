import { beforeEach, describe, expect, it, test } from 'vitest'
import { GetMedicalDutiesListService } from './get-medical-duties-list'
import { InMemoryMedicalDutiesRepository } from '../../repositories/in-memory/in-memory-medical-duties-repository'
import { CreateMedicalDutyService } from './create-medical-duty'
import { AssociateUserService } from './associate-user'
import { UsersRepository } from '../../repositories/interfaces/users-repository';
import { InMemoryUserRepository } from '../../repositories/in-memory/in-memory-users-repository'

let medicalDutiesRepository: InMemoryMedicalDutiesRepository
let usersRepository: InMemoryUserRepository
let associateUserService: AssociateUserService

describe('Associate User Service', () => {
  beforeEach(() => {
    medicalDutiesRepository = new InMemoryMedicalDutiesRepository()
    usersRepository = new InMemoryUserRepository()
    associateUserService = new AssociateUserService(usersRepository, medicalDutiesRepository)
  })

  it('Should be able to associate a user to the medical duty', async () => {

    const user = await usersRepository.create({
      cnpj: '12345678901234',
      crm: '12345678901235',
      email: 'igor@gmail.com',
      name: "igor",
      password_hash: "123456",
    })

    const medicalDuty = await medicalDutiesRepository.create({
      hours: 8,
      title: "teste",
      location: "São Paulo",
      vacancies: 1,
      description: ""
    })

    await associateUserService.execute({
      medicalDutyId: medicalDuty.id,
      userId: user.id
    })

    expect(medicalDuty.userId).toEqual(user.id)
  })

  
})