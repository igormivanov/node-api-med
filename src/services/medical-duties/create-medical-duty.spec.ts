import { beforeEach, describe, expect, it, test } from 'vitest'
import { GetMedicalDutiesListService } from './get-medical-duties-list'
import { InMemoryMedicalDutiesRepository } from '../../repositories/in-memory/in-memory-medical-duties-repository'
import { CreateMedicalDutyService } from './create-medical-duty'

let medicalDutiesRepository: InMemoryMedicalDutiesRepository
let createMedicalDutyService: CreateMedicalDutyService

describe('Create Medical Duty Service', () => {
  beforeEach(() => {
    medicalDutiesRepository = new InMemoryMedicalDutiesRepository()
    createMedicalDutyService = new CreateMedicalDutyService(medicalDutiesRepository)
  })

  it('Should be able to create a medical duty', async () => {

    const { medicalDuty } = await createMedicalDutyService.execute({
      hours: 8,
      title: "teste",
      location: "São Paulo",
      vacancies: 1,
      description: ""
    })

    expect(medicalDuty.id).toEqual(expect.any(String))
  })

  
})