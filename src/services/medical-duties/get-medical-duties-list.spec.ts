import { beforeEach, describe, expect, it, test } from 'vitest'
import { GetMedicalDutiesListService } from './get-medical-duties-list'
import { InMemoryMedicalDutiesRepository } from '../../repositories/in-memory/in-memory-medical-duties-repository'

let medicalDutiesRepository: InMemoryMedicalDutiesRepository
let getMedicalDutiesListService: GetMedicalDutiesListService

describe('Get Medical Duties List Service', () => {
  beforeEach(() => {
    medicalDutiesRepository = new InMemoryMedicalDutiesRepository()
    getMedicalDutiesListService = new GetMedicalDutiesListService(medicalDutiesRepository)
  })

  it('Should be able to list all medical duties', async () => {

    await medicalDutiesRepository.create({
      hours: 8,
      title: "teste",
      location: "São Paulo",
      vacancies: 1,
    })

    await medicalDutiesRepository.create({
      hours: 8,
      title: "teste2",
      location: "São Paulo",
      vacancies: 1,
    })


    const { medicalDuties } = await getMedicalDutiesListService.execute()

    expect(medicalDuties).toHaveLength(2)
    expect(medicalDuties).toEqual([
      expect.objectContaining({title: 'teste'}),
      expect.objectContaining({title: 'teste2',})
    ])
  })

  
})