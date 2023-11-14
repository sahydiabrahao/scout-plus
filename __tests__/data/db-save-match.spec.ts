import { type MatchModel } from '@/domain/protocols/match-model'

import { type SaveMatchModel } from '@/domain/save-match'
import { type SaveMatchRepository } from '@/data/protocols/save-match-repository'
import { DbSaveMatch } from '@/data/db-save-match'
import { type JsonResquest } from '@/domain/protocols/json-request'

const makeFakeResquest = (): JsonResquest => {
  return {
    body: {
      date: 'any_date',
      homeTeamScore: 1,
      awayTeamScore: 1,
      players: [{
        name: 'any_name',
        tshirtNumber: 1,
        labels: [{
          goalInsideTheBox: 1,
          goalOutsideTheBox: 1
        }]
      }]
    }
  }
}

const makeSaveMatchRepository = (): SaveMatchRepository => {
  class SaveMatchRepositorySpy implements SaveMatchRepository {
    async save (saveMatch: SaveMatchModel): Promise<MatchModel> {
      return {
        id: 'any_id',
        data: 'any_data'
      }
    }
  }
  return new SaveMatchRepositorySpy()
}

type SutTypes = {
  sut: DbSaveMatch
  saveMatchRepositorySpy: SaveMatchRepository
}

const makeSut = (): SutTypes => {
  const saveMatchRepositorySpy = makeSaveMatchRepository()
  const sut = new DbSaveMatch(saveMatchRepositorySpy)
  return {
    sut,
    saveMatchRepositorySpy
  }
}

describe('DbSaveMatch', () => {
  test('Must call saveMatchRepository with correts values',async () => {
    const { sut, saveMatchRepositorySpy } = makeSut()
    const newSpy = jest.spyOn(saveMatchRepositorySpy, 'save')
    await sut.save(makeFakeResquest())
    expect(newSpy).toHaveBeenLastCalledWith(makeFakeResquest())
  })

  test('Must throw if saveMatchRepository throw', async () => {
    const { sut, saveMatchRepositorySpy } = makeSut()
    jest.spyOn(saveMatchRepositorySpy, 'save').mockImplementationOnce(() => { throw new Error() })
    const response = sut.save(makeFakeResquest())
    await expect(response).rejects.toThrow()
  })

  test('Must return ID if saveMatchRepository Success', async () => {
    const { sut } = makeSut()
    const response = await sut.save(makeFakeResquest())
    expect(response.id).not.toBeNull()
  })
})
