import { type MatchModel } from '@/domain/protocols/match-model'

import { type DeleteMatchModel } from '@/domain/delete-match'
import { type DeleteMatchRepository } from '@/data/protocols/delete-match-repository'
import { DbDeleteMatch } from '@/data/db-delete-match'
import { type JsonResquest } from '@/domain/protocols/json-request'

const makeFakeResquest = (): JsonResquest => {
  return {
    body: {
      date: 'any_date'
    }
  }
}

const makeDeleteMatchRepository = (): DeleteMatchRepository => {
  class DeleteMatchRepositorySpy implements DeleteMatchRepository {
    async delete (deleteMatch: DeleteMatchModel): Promise<MatchModel> {
      return {
        id: 'any_id',
        data: 'any_data'
      }
    }
  }
  return new DeleteMatchRepositorySpy()
}

type SutTypes = {
  sut: DbDeleteMatch
  deleteMatchRepositorySpy: DeleteMatchRepository
}

const makeSut = (): SutTypes => {
  const deleteMatchRepositorySpy = makeDeleteMatchRepository()
  const sut = new DbDeleteMatch(deleteMatchRepositorySpy)
  return {
    sut,
    deleteMatchRepositorySpy
  }
}

describe('DbDeleteMatch', () => {
  test('Must call deleteMatchRepository with correts values', async () => {
    const { sut, deleteMatchRepositorySpy } = makeSut()
    const newSpy = jest.spyOn(deleteMatchRepositorySpy, 'delete')
    await sut.delete(makeFakeResquest())
    expect(newSpy).toHaveBeenLastCalledWith(makeFakeResquest())
  })

  test('Must throw if deleteMatchRepository throw', async () => {
    const { sut, deleteMatchRepositorySpy } = makeSut()
    jest.spyOn(deleteMatchRepositorySpy, 'delete').mockImplementationOnce(() => { throw new Error() })
    const response = sut.delete(makeFakeResquest())
    await expect(response).rejects.toThrow()
  })

  test('Must return ID if deleteMatchRepository Success', async () => {
    const { sut } = makeSut()
    const response = await sut.delete(makeFakeResquest())
    expect(response.id).not.toBeNull()
  })
})
